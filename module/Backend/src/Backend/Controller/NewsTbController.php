<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Controller\SubController;
use Backend\Model\CommentTb;
use Backend\Model\MenuCodeTb;
use Backend\Model\NewsCatTb;
use Backend\Model\NewsLabelTb;
use Backend\Model\NewsTagTb;
use Backend\Model\NewsSelectTb;
use Backend\Model\NewsTb;
use Backend\Model\ProductCatTb;
use Backend\Model\ProductTb;
use Backend\Model\SectionTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\SortByColumn;
use Backend\View\Helper\SortField;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class NewsTbController extends AbstractActionController
{
    protected $_NewsTb;
    protected $_NewsCatTb;
    protected $_NewsTagTb;
    protected $_MenuCodeTb;
    protected $_SubController;
    protected $_LangMultiTbController;
    protected $_Upload;
    protected $_SortField;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_cate;
    protected $_field;
    protected $_columns;
    protected $_session;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $this->_params['user'] = $this->identity()->username;
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_Upload = new Upload();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_NewsTb = new NewsTb();
        $this->_NewsCatTb = new NewsCatTb();
        $this->_NewsTagTb = new NewsTagTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_SubController = new SubController();
        $this->_session = new Container($this->_params['__CONTROLLER__']);
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_cate = $this->_NewsCatTb->getItem(array('id' => $this->_params['root_id']));
        $this->_field = $this->_cate['define_news'];
        $this->_columns = $this->_field['columns'];
        $this->_field['validate']['required'] = array_merge(
            array('cat_id' => 'Danh mục','name' => $this->_field['name']),
            $this->_field['validate']['required'] ? $this->_field['validate']['required'] : array()
        );
        $this->_field['validate']['translate'] = isset($this->_field['validate']['translate']) ? $this->_field['validate']['translate'] : $this->identity()->langfield;

        // Kiểm tra form nhập liệu
        foreach ($this->_field['validate']['required'] as $name => $title) {
            if ($this->_field[$name] || strpos($name, 'multi_input') > -1 || strpos($name, 'select') > -1) {
                $name = ($this->identity()->lang && (in_array($name, $this->_field['validate']['translate']))) ? 'translate['.$this->identity()->lang.']['.$name.']' : $name;
                $this->_params['checkForm']['required'][$name] = $this->_translator->translate($title);
            }
        }
        if ($this->_field['allow_size_image']) {
            $this->_params['checkForm']['allow_size_image'] = $this->_field['allow_size_image'];
        }
        if ($this->_field['thumbnail']) {
            $this->_params['checkForm']['image']['single']['thumbnail'] = array($this->_translator->translate("Ảnh đại diện"), array('autox30'));
        }
        if ($this->_field['multi_image']) {
            foreach ($this->_field['multi_image'] as $i => $value) {
                $this->_params['checkForm']['image']['multi'][$value['name']] = array($this->_translator->translate($value['label']), array('autox30'));
            }
            array_shift($this->_params['checkForm']['image']['multi']);
        }
        if ($this->_field['multi_file']) {
            $this->_params['checkForm']['file'] = $this->_field['multi_file'];
            array_shift($this->_params['checkForm']['file']);
        }

        // Remove in v4.2
        if ($this->_field['section']) {
            $this->_field['section'] = array_map(function($item) {
                if ($item['label']) {
                    $item['name'] = $this->_renderer->toSlug($item['label']);
                }
                return $item;
            }, $this->_field['section']);
        }

        // Phân quyền
        if ($this->identity()->permission == 1) {
            $permission = array_fill_keys(array_values(array('viewall','view','add','edit','delete','excel','transfer_cate','status')), 1);
        } else {
            $permission = $this->identity()->permission['news'][$this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']];
            if ($this->_field['cat_id']) {
                $permission = $this->identity()->permission['news'][$this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']][$this->_params['__CONTROLLER__']];
            }
        }
        if ($this->_field['status']) {
            $permission['d-status'] = $permission['status'] ? 1 : 0;
            $permission['other'] = $permission['status'] ? 1 : 0;
        } else {
            $permission['status'] = 1;
            $permission['d-status'] = 0;
            $permission['other'] = ($permission['add'] || $permission['edit']) ? 1 : 0;
        }
        $permission['button'] = (($this->_field['copy'] && $permission['add']) || $permission['edit'] || $permission['delete'] || $permission['d-status']) ? 1 : 0;

        $this->_params['permission'] = $permission;
        $e->getRouteMatch()->setParam('permission', $permission);

        $this->_SortField = new SortField($this->_field, $this->_columns, array('permission' => $permission, 'lang' => $this->identity()->lang, 'langlist' => $this->identity()->langlist));

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Danh sách").' '.$this->_translator->translate($this->_cate['name']));
        array_shift($this->_field['special']);
        $data = array(
            '_field' => $this->_field,
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'linkChange' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'change')),
            'columns' => $this->_SortField->getColumns(
                array(array('name' => 'checkall', 'title' => '<label class=\"mt-checkbox mt-checkbox-outline\"><input type=\"checkbox\" class=\"group-checkable\" data-set=\".ht-checkall-rows\"/><span></span></label>', 'table' => 1, 'excel' => 0)),
                array(
                    !$this->_field['display'] && $this->identity()->lang ? array('name' => 'display', 'title' => 'Hiển thị', 'table' => 1, 'excel' => 0, 'data' => $this->identity()->lang && count($this->identity()->langlist) > 1 ? 'display_lang' : 'display') : array(),
                    array('name' => 'button', 'title' => 'Chức năng', 'table' => $this->_field['add'] && $this->_params['permission']['button'], 'excel' => 0))
            ),
        );

        // Danh mục
        if ($this->_field['cat_id']) {
            $data['filter'] = $this->_renderer->cateSortNested(
                $this->_NewsCatTb->listItem(array('root_id' => $this->_params['root_id'], 'columns' => array('id','name','level','parent'))),
                array('parent' => $this->_params['root_id'], 'type' => 'sort')
            );
        }

        // Trạng thái
        if ($this->_field['status'] || $this->_field['draft']) {
            $data['status'] = array(
                array('value' => '1', 'text' => $this->_translator->translate("Đã xuất bản")),
                array('value' => '-1', 'text' => $this->_translator->translate("Không duyệt")),
                array('value' => '0', 'text' => $this->_translator->translate("Chờ duyệt")),
                array('value' => '-2', 'text' => $this->_translator->translate("Bản nháp"))
            );
        }

        if ($this->_field['date_published']) {
            if ($data['status']) {
                array_splice(
                    $data['status'],
                    1, 0,
                    array(array('value' => 'schedule', 'text' => $this->_translator->translate("Chờ xuất bản")))
                );
            } else {
                $data['status'] = array(
                    array('value' => '1', 'text' => $this->_translator->translate("Đã xuất bản")),
                    array('value' => 'schedule', 'text' => $this->_translator->translate("Chờ xuất bản"))
                );
            }
        }

        $post = $this->params()->fromPost();
        if ($this->getRequest()->isPost() && empty($post['draw'])) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($post, 'strlen')));
        }

        // Danh sách
        if (isset($post['draw'])) {
            $query_arrs = array(
                'search' => array(),
                'status' => array(-1, 0, 1),
                'root_id' => $data['query']['cat_id'] ? $data['query']['cat_id'] : $this->_params['root_id'],
                'language' => $this->identity()->lang ? true : false,
                'user_created' => ($data['_params']['permission']['view'] && !$data['_params']['permission']['viewall']) ? $this->_params['user'] : '',
                'joinCate' => !!$this->_field['cat_id']
            );

            // Trạng thái
            if (isset($data['query']['status'])) {
                if ($data['query']['status'] == 'all') {
                    unset($query_arrs['status']);
                } else {
                    $query_arrs['status'] = $data['query']['status'];
                }
            }

            if ($post['order']) {
                $index = $post['order'][0]['column'];
                $column = $post['columns'][$index];
                if ($column['name'] == 'special') {
                    $query_arrs['special'] = array('order' => $post['order'][0]['dir'], 'value' => end(explode('.', $column['data'])));
                } else {
                    $query_arrs['orderby'] = array($column['name'].' '.$post['order'][0]['dir']);
                }
            }
            if ($post['search']['value']) {
                $columns = array();
                foreach ($post['columns'] as $value) {
                    if ($value['searchable'] == 'true') {
                        $columns[] = $value['name'];
                    }
                }
                $columns = array_unique($columns);
                $query_arrs['search'][] = array('columns' => $columns, 'keysearch' => $post['search']['value']);
            }

            $currentItems = $this->_NewsTb->listItem(array_merge($query_arrs, array('offset' => $post['start'], 'limit' => $post['length'])));
            if ($post['start'] == 0) {
                $this->_session->offsetSet('totalRecords', $this->_NewsTb->countItems($query_arrs));
            }

            $aaData = array();
            foreach ($currentItems as $i => $value) {
                $linkField = $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'field','id' => $value['id'],'root_id' => $this->_params['root_id']));
                $linkDelete = $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'delete','id' => $value['id'],'root_id' => $this->_params['root_id']));
                $linkChange = $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'change','id' => $value['id'],'root_id' => $this->_params['root_id']));

                $value['multi_input'] = json_decode($value['multi_input'], true);
                $value['special'] = $value['special'] ? json_decode($value['special'], true) : array();

                $draft = ($this->_params['permission']['status'] || (in_array($value['status'], array(-2, -1, 0)) && $this->_field['status'])) ? 1 : 0;
                $langDislay = array();
                if ($value['l.id']) {
                    // 0: id, 1: display, 2: name
                    $langDislay = array_merge_recursive(
                        array_combine(explode('#@#',$value['l.language']), explode('#@#',$value['l.id'])),
                        array_combine(explode('#@#',$value['l.language']), explode('#@#',$value['l.display'])),
                        array_combine(explode('#@#',$value['l.language']), explode('#@#',$value['l.name']))
                    );
                    $value['name'] = ($langDislay[$this->identity()->lang][2]) ? $langDislay[$this->identity()->lang][2] : $value['name'];
                }

                foreach ($data['columns'] as $column) {
                    if ($column['colvis'] != true) {
                        switch ($column['name']) {
                            case 'checkall':
                                $aaData[$i]['checkall'] = (!$draft) ? '<td></td>' : '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" class="ht-checkall-rows" value="'.$value['id'].'" /><span></span></label>';
                            break;
                            case 'thumbnail':
                                $thumbnail = BE_TEMPLATE.'/layouts/layout/img/noimage.png';
                                if ($value['thumbnail'] && file_exists(ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-',$value['thumbnail'])[0]).'/'.$value['thumbnail'])) {
                                    $thumbnail = PUBLIC_PATH.UPLOAD_IMAGES.date('Y/m',explode('-',$value['thumbnail'])[0]).'/autox30-'.$value['thumbnail'];
                                }
                                $aaData[$i]['thumbnail'] = '<img src="'.$thumbnail.'" height="30px" />';
                            break;
                            case 'cat_id':
                                $aaData[$i]['cat_id'] = $value['cat_name'];
                            break;
                            case 'name':
                                $status = $value['status'] == 1 || (empty($this->_field['draft']) && empty($this->_field['status'])) ? '' : ' — '.array_combine(array_column($data['status'], 'value'), array_column($data['status'], 'text'))[$value['status']];
                                $aaData[$i]['name'] = '<a href="'.$linkField.'">'.$value['name'].'</a><span>'.$status.'</span>';
                            break;
                            case 'multi_input':
                                $name = explode('.', $column['data'])[1];
                                if (is_array($value['multi_input'][$column['orign_name']])) {
                                    $aaData[$i]['multi_input'][$name] = $value['multi_input'][$column['orign_name']]['name'];
                                } else {
                                    $aaData[$i]['multi_input'][$name] = $value['multi_input'][$column['orign_name']];
                                }
                            break;
                            case 'date_created':
                                $aaData[$i]['date_created'] = preg_replace('/^code-.*/', 'admin', $value['user_created']).'<br>'.date('d/m/Y H:i', strtotime($value['date_created']));
                            break;
                            case 'date_updated':
                                $aaData[$i]['date_updated'] = preg_replace('/^code-.*/', 'admin', $value['user_updated']).'<br>'.($value['date_updated'] ? date('d/m/Y H:i', strtotime($value['date_updated'])) : '');
                            break;
                            case 'date_published':
                                $aaData[$i]['date_published'] = ($value['status'] == 1) ? date('d/m/Y H:i', strtotime($value['date_published'])) : '-';
                            break;
                            case 'status':
                                $index = array_search($value['status'], array_column($data['status'], 'value'));
                                if ($value['status'] == 0 && $this->_params['permission']['status']) {
                                    $aaData[$i]['status'] = '<a href="javascript:;" ht-trigger="editable-status" data-placement="bottom" data-pk="'.$linkChange.'" data-value="'.$value['status'].'">'.$data['status'][$index]['text'].'</a>';
                                } else {
                                    $aaData[$i]['status'] = ($value['status'] == 1) ? ((time() > strtotime($value['date_published'])) ? 'Đã xuất bản' : 'Chờ xuất bản') : $data['status'][$index]['text'];
                                }
                            break;
                            case 'sort':
                                $aaData[$i]['sort'] = '<input type="text" name="sort" class="form-control text-center input-sm" onkeydown="_HTChange.sort(this, \''.$linkChange.'\');" value="'.$value['sort'].'" /><span class="text-hide">'.$value['sort'].'</span>';
                            break;
                            case 'special':
                                $name = explode('.', $column['data'])[1];
                                $vl_special = $value['special'][$column['orign_name']] ? 1 : 0;
                                $aaData[$i]['special'][$name] = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" data-special name="'.$column['orign_name'].'" value="'.$vl_special.'" onclick="_HTChange.special(this, \''.$linkChange.'\');" '.(($vl_special) ? 'checked' : '').' /><span class="text-hide">'.$vl_special.'</span></label>';
                            break;
                            case 'display':
                                if ($column['data'] == $column['name']) {
                                    $aaData[$i]['display'] = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="display" value="'.$value['display'].'" onclick="_HTChange.status(this, \'switch\', '.htmlspecialchars(json_encode(array('url' => $linkChange), JSON_UNESCAPED_SLASHES)).');" '.($value['display'] ? 'checked' : '').' /><span class="text-hide">'.$value['display'].'</span></label>';
                                } else {
                                    $aaData[$i]['display_lang'] = '';
                                    foreach ($this->identity()->langlist as $item) {
                                        if ($langDislay[$item[0]]) {
                                            $aaData[$i]['display_lang'] .= '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="display" value="'.$langDislay[$item[0]][1].'" onclick="_HTChange.status(this, \'switch\', '.htmlspecialchars(json_encode(array('url' => $this->url()->fromRoute('admincp',array('controller' => 'lang_multi_tb','action' => 'change','id' => $langDislay[$item[0]][0]))), JSON_UNESCAPED_SLASHES)).');" '.($langDislay[$item[0]][1] ? 'checked' : '').' /><span class="text-hide">'.$langDislay[$item[0]][1].'</span></label>';
                                        }
                                    }
                                }
                            break;
                            case 'button':
                                $button = '';
                                if ($draft) {
                                    if ($this->_field['copy'] && $this->_params['permission']['add']) {
                                        $button .= '<a href="'.$linkField.'?action=copy" class="btn yellow">Copy</a>';
                                    }
                                    if ($this->_params['permission']['edit'] || $this->_params['permission']['d-status']) {
                                        $button .= '<a href="'.$linkField.'" class="btn blue">Sửa</a>';
                                    }
                                    if ($this->_params['permission']['delete'] || $this->_params['permission']['d-status']) {
                                        $button .= '<a href="javascript:;" class="btn red" onclick="_HTDelete.item(\''.$linkDelete.'\');">Xóa</a>';
                                    }
                                }
                                $aaData[$i]['button'] = '<div class="text-center"><div class="btn-group btn-group-sm btn-group-solid">'.$button.'</div></div>';
                            break;
                            default:
                                $aaData[$i][$column['name']] = $value[$column['name']];
                            break;
                        }
                    }
                }
            }

            $response = array(
                "draw" => intval($post['draw']),
                "iTotalRecords" => $this->_session['totalRecords'],
                "iTotalDisplayRecords" => $this->_session['totalRecords'],
                "aaData" => $aaData,
                "pureColumns" => $data['columns'],
                "pureData" => $currentItems,
            );

            echo json_encode($response);
            return $this->getResponse();
        }

        $this->_session->offsetSet('query', $this->params()->fromQuery());

        return new ViewModel($data);
    }

    public function fieldAction()
    {
        $data = array(
            '_field' => $this->_field,
            'sortFields' => $this->_columns['detail'],
            'item' => array(),
            'linkList' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']),
                array('query' => $this->_session['query'])
            )
        );
        // Xóa phần đầu của mảng
        $this->_field = $this->_renderer->removeElementArray($this->_field, array('multi_image','multi_input','multi_file','multi_detail','sub','section','select'));
        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            unset($this->_params['checkForm']['required']['thumbnail']);
            $data['item'] = $this->_NewsTb->getItem(array('id' => $this->_params['id']));
            if ($this->identity()->lang) {
                $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
            }
            if ($this->_field['sub']) {
                $this->_SubController->listItem(array(
                    'field' => $this->_field,
                    'params' => $this->_params,
                    'object' => $this->_NewsTb,
                    'lang' => $this->identity()->lang,
                    'langlist' => $this->identity()->langlist
                ), $data);
            }
            if ($this->_field['tags'] || $this->_field['list_tag_id']) {
                $data['item']['tags'] = array();
                foreach ($this->_NewsTagTb->listItem(array('list_news_id' => $data['item']['id'], 'display' => 1, 'columns' => array('id','name'))) as $value) {
                    $data['item']['tags'][] = $value['name'];
                }
            }

            $list_label_id['list_id'] = explode(',', str_replace(':','',$this->_NewsCatTb->getItem(array('id' => $data['item']['cat_id']))['list_label_id']));

            if ($this->params()->fromQuery()['action'] == 'copy') {
                unset($data['item']['thumbnail'], $data['item']['multi_file'], $data['item']['multi_image'], $this->_params['id']);
            } else {
                $title = $this->_translator->translate("Chỉnh sửa");
            }
        }

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            if($this->_params['post']['comment']) {
                $comment['post']['comment'] = $this->_params['post']['comment'];
                $comment['post']['parent'] = 0;
                $comment['post']['type'] = $this->_params['__CONTROLLER__'];
                $comment['post']['article_id'] = $this->_params['id'];
                $comment['post']['admin_id'] = $this->identity()->id;
                $CommentTb = new CommentTb();
                $CommentTb->saveData(array('post' => $comment['post']));
            } else {
                if ($this->identity()->lang && $this->_params['post']['translate'][$this->identity()->lang]) {
                    // Map dữ liệu của ngôn ngữ mặc định
                    if ($this->_params['post']['translate'][$this->identity()->lang]['multi_input']) {
                        $this->_params['post']['translate'][$this->identity()->lang]['multi_input'] = array_merge(
                            ($this->_params['post']['translate'][$this->identity()->lang]['multi_input']) ? $this->_params['post']['translate'][$this->identity()->lang]['multi_input'] : array(),
                            ($this->_params['post']['multi_input']) ? $this->_params['post']['multi_input'] : array()
                        );
                    }
                    if ($this->_params['post']['translate'][$this->identity()->lang]['multi_detail']) {
                        $this->_params['post']['translate'][$this->identity()->lang]['multi_detail'] = array_merge(
                            ($this->_params['post']['translate'][$this->identity()->lang]['multi_detail']) ? $this->_params['post']['translate'][$this->identity()->lang]['multi_detail'] : array(),
                            ($this->_params['post']['multi_detail']) ? $this->_params['post']['multi_detail'] : array()
                        );
                    }
                    if ($this->_params['post']['translate'][$this->identity()->lang]['multi_image']) {
                        $this->_params['post']['translate'][$this->identity()->lang]['multi_image'] = array_merge_recursive(
                            ($this->_params['post']['translate'][$this->identity()->lang]['multi_image']) ? $this->_params['post']['translate'][$this->identity()->lang]['multi_image'] : array(),
                            ($this->_params['post']['multi_image']) ? $this->_params['post']['multi_image'] : array()
                        );
                    }

                    $this->_params['post'] = array_merge($this->_params['post'], $this->_params['post']['translate'][$this->identity()->lang]);
                }

                $selectErrors = array();
                if ($this->_field['select']) {
                    foreach ($this->_field['select'] as $select) {
                        if (!$select['validate']['duplicate']) continue;

                        $selectIds = array();
                        $selectLabels = array();
                        foreach ($select['fields'] as $i => $value) {
                            if ($i == 0) continue;
                            $selectLabels[] = $value['label'];
                            $selectIds = array_merge(
                                $selectIds,
                                array_filter(array($this->_params['post']['select'][$select['id']][$value['name']]))
                            );
                        }
                        if (max(array_count_values($selectIds)) > 1) {
                            $selectErrors[] = implode(', ', $selectLabels).' không được trùng nhau.';
                        }
                    }

                }

                $validate = new CheckForm($this->_params, array('translate' => $this->identity()->lang));
                if ($validate->isError() == true) {
                    $data['error'] = $validate->getMessagesError();
                    if ($data['item']['multi_image']) {
                        $this->_params['post']['multi_image'] = $data['item']['multi_image'];
                    }
                    if ($data['item']['multi_file']) {
                        $this->_params['post']['multi_file'] = $data['item']['multi_file'];
                    }

                    \Backend\View\Helper\FormatData::multiData($this->_params['post'], array('field' => $this->_field, 'lang' => $this->identity()->lang, 'langlist' => $this->identity()->langlist));
                } elseif (count($selectErrors) > 0) {
                    $data['error'] = $selectErrors;
                } else {
                    // Lấy giá trị trả về.
                    $this->_params = $validate->getData($this->_field);

                    if ($this->_params['checkForm']['image']) {
                        $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field, array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'news'.$this->_params['root_id']);
                    }
                    if ($this->_params['checkForm']['file']) {
                        $this->_Upload->uploadFile($this->_params['post'], $this->_params['checkForm']['file']);
                    }
                    if (empty($this->_params['post']['cat_id'])) {
                        $this->_params['post']['cat_id'] = $this->_params['root_id'];
                    }

                    if ($this->_field['list_select_id']) {
                        $this->_params['post']['list_select_id'] = call_user_func_array('array_merge', array_filter($this->_params['post']['list_select_id']));
                        $NewsSelectTb = new NewsSelectTb();
                        foreach ($NewsSelectTb->listItem(array('display' => 1, 'list_news_cat_id' => $this->_params['root_id'], 'child' => true)) as $value) {
                            if (in_array($value['id'], $this->_params['post']['list_select_id']) && !in_array($value['parent'], $this->_params['post']['list_select_id'])) {
                                $this->_params['post']['list_select_id'][] = $value['parent'];
                            }
                        }
                        if ($this->_params['post']['list_select_id']) {
                            array_unique($this->_params['post']['list_select_id']);
                        } else {
                            $this->_params['post']['list_select_id'] = array();
                        }
                    }

                    $id = $this->_NewsTb->saveData($this->_params, $this->_field);

                    if ($this->identity()->lang) {
                        $this->_params['lang'] = $this->identity()->lang;
                        $this->_params['langlist'] = $this->identity()->langlist;
                        $this->_params['item_id'] = $id;
                        $this->_LangMultiTbController->saveData($this->_params);
                    }
                    if ($this->_field['tags']) {
                        $this->_params['post']['tags'] = explode(',', $this->_params['post']['tags']);
                        foreach ($this->_params['post']['tags'] as $tag) {
                            if ($tag) {
                                $item = $this->_NewsTagTb->getItem(array('name' => $tag));
                                $list_news_id = ($item && $item['list_news_id'])  ? array_unique(array_merge(explode(',', str_replace(':','',$item['list_news_id'])), array($id))) : array($id);
                                $this->_NewsTagTb->saveData(array('id' => ($item) ? $item['id'] : '', 'post' => array('name' => $tag, 'list_news_id' => $list_news_id)));
                            }
                        }
                        if ($this->_params['id']) {
                            $this->_params['post']['tags-delete'] = array_diff($data['item']['tags'], $this->_params['post']['tags']);
                            foreach ($this->_params['post']['tags-delete'] as $tag) {
                                if ($tag) {
                                    $item = $this->_NewsTagTb->getItem(array('name' => $tag));
                                    $list_news_id = array_diff(explode(',', str_replace(':','',$item['list_news_id'])), array($id));
                                    $this->_NewsTagTb->saveData(array('id' => $item['id'], 'post' => array('name' => $tag,'list_news_id' => $list_news_id)));
                                }
                            }
                        }
                    }
                    if ($this->_field['list_tag_id']) {
                        $tags = $this->_NewsTagTb->listItem(array('list_news_id' => $this->_params['id'] ? $this->_params['id'] : 0));
                        $list_tag_id = $tags ? array_column($tags, 'id') : array();
                        $list_tag_id = array_diff($list_tag_id, $this->_params['post']['list_tag_id'] ? $this->_params['post']['list_tag_id'] : array());
                        foreach ($tags as $tag) {
                            if (in_array($tag['id'], $list_tag_id)) {
                                $list_news_id = explode(',', str_replace(':', '', $tag['list_news_id']));
                                $list_news_id = array_diff($list_news_id, array($this->_params['id']));
                                $this->_NewsTagTb->saveData(array('id' => $tag['id'], 'post' => array('list_news_id' => $list_news_id)));
                            }
                        }
                        foreach ($this->_params['post']['list_tag_id'] as $tagId) {
                            $item = $this->_NewsTagTb->getItem(array('id' => $tagId));
                            $list_news_id = ($item && $item['list_news_id'])  ? array_unique(array_merge(explode(',', str_replace(':','',$item['list_news_id'])), array($id))) : array($id);
                            $this->_NewsTagTb->saveData(array('id' => $item['id'], 'post' => array('list_news_id' => $list_news_id)));
                        }
                    }
                    if ($this->_field['sub']) {
                        $this->_SubController->saveData(array(
                            'field' => $this->_field,
                            'params' => $this->_params,
                            'object' => $this->_NewsTb,
                            'lang' => $this->identity()->lang,
                            'langlist' => $this->identity()->langlist,
                            'parent_id' => $id,
                            'prefix' => 'nsub'
                        ));
                    }

                    if ($this->_params['post']['continue']) {
                        $data['continue'] = $this->_params['post']['continue'];
                    } else {
                        return $this->redirect()->toUrl($data['linkList']);
                    }
                }
                $data['item'] = ($data['error']) ? $this->_params['post'] : array();
            }
        }

        // Danh sách danh mục
        $listCate = $this->_renderer->cateSortNested($this->_NewsCatTb->listItem(array('root_id' => $this->_params['root_id'],'columns' => array('id','name','parent','level'))),array('parent' => $this->_params['root_id'], 'type' => 'sort'));

        // Các field và thứ tự hiển thị
        $fields = array(
            'cat_id' => array('label' => 'Danh mục','class' => 'col-md-offset-6 col-md-pull-6', 'list' => $listCate,'required' => true),
            'name','title','description','slug','desc_short','keyword','multi_input','thumbnail','multi_image','multi_file','detail','multi_detail','sub',
            'embed' => array('position' => array(
                'bbot' => $this->_translator->translate("Trên").' </body>',
                'off' => $this->_translator->translate("Tắt")
            ))
        );
        foreach ($this->_field['validate']['exists'] as $name => $rule) {
            if ($this->_field[$name] && !empty($rule)) {
                $this->_params['checkForm']['exists'][$name] = array(
                    'name' => $this->_field[$name],
                    'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'exists')),
                    'condition' => array(
                        'deny_id' => array($this->_params['id']),
                        $rule => ($rule != 'root_id' && $data['item']['cat_id']) ? $data['item']['cat_id'] : $this->_params['root_id']
                    )
                );
                if ($rule != 'root_id') {
                    $fields['cat_id']['attr'][] = 'FormValidation.changeRules(this,\'#form-add\',\''.$name.'\',\''.$rule.'\')';
                }
            }
        }
        if ($this->_field['section']) {
            $SectionTb = new SectionTb();
            $this->_field['list_section_id'] = $this->_field['section'];
            foreach ($this->_field['section'] as $i => $section) {
                $fields['list_section_id']['label'][$i] = array(
                    'field' => 'select',
                    'input' => count($this->_field['section']) == 1,
                    'no_attr_id' => true,
                    'name' => 'list_section_id' . ($section['type'] == 'radio' ? '[]' : ''),
                    'keySort' => 'list_section_id[' . $section['name'] . ']',
                    'label' => $section['label'],
                    'type' => $section['type'],
                    'value' => explode(',', str_replace(':','', $data['item']['list_section_id'])),
                    'list' => array_map(function ($item) {
                        return array('id' => $item['id'], 'name' => $item['menu']);
                    }, $SectionTb->listItem(array('display' => 1, 'list_id' => $section['list_section_id'], 'columns' => array('id', 'menu'))))
                );
            }
        }
        if ($this->_field['list_label_id']) {
            $this->_field['list_label_id'] = is_array($this->_field['list_label_id']) ? $this->_field['list_label_id']['label'] : $this->_field['list_label_id'];
            $NewsLabelTb = new NewsLabelTb();
            $list_label_id['display'] = 1;
            $fields['list_label_id'] = array(
                'type' => 'checkbox',
                'input' => true,
                'value' => explode(',', str_replace(':','', $data['item']['list_label_id'])),
                'list' => $NewsLabelTb->listItem($list_label_id)
            );
            $fields['cat_id']['attr'][] = '_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'label','root_id' => $this->_params['root_id'])),
                'position' => 'list_label_id',
            ), JSON_UNESCAPED_SLASHES)).', _HTChange.select(this))';
        }
        if ($this->_field['date_published'] && ($this->_params['permission']['status'] || $data['item']['status'] > -2)) {
            $fields['date_published'] = array('label' => 'Ngày xuất bản', 'attr' => 'data-date-startdate="'.date('Y-m-d H:i:s').'"');
            if ($data['item']['status'] == 1 && (!empty($data['item']['date_published']) && strtotime($data['item']['date_published']) < time())) {
                $fields['date_published']['disabled'] = true;
            }
        }
        if ($this->_field['tags'] || $this->_field['list_tag_id']) {
            $listTags = $this->_NewsTagTb->listItem(array('display' => 1, 'orderby' => array('name ASC'), 'columns' => array('id','name')));
            $fields['list_tag_id'] = array('list' => $listTags);
            $fields['tags'] = array('list' => $listTags);
        }
        if ($this->_field['list_news_id']) {
            $fields['list_news_id'] = array(
                'type' => 'multi',
                'value' => explode(',', str_replace(':','', $data['item']['list_news_id'])),
                'list' => array(),
                'cate' => array(
                    'list' => array(),
                    'root_id' => implode(',',$this->_field['list_news_id']),
                    'attr' => 'onchange="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'related','id' => $this->_params['id'], 'root_id' => $this->_params['root_id'])),
                                'position' => 'list_news_id',
                            ), JSON_UNESCAPED_SLASHES)).', _HTChange.selectRelated(this, \'list_news_id\'));"'
                )
            );
            if ($this->_field['list_news_ajax']) {
                $fields['list_news_id']['loadData'] = 'onclick="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                    'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'related','id' => $this->_params['id'], 'root_id' => $this->_params['root_id'])),
                                    'position' => 'list_news_id',
                                ), JSON_UNESCAPED_SLASHES)).', '. htmlspecialchars(json_encode(array('cat_related_id' => implode(',', $this->_field['list_news_id']), 'selected' => array_filter($fields['list_news_id']['value'])))) .');"';
                if ($data['item']['list_news_id']) {
                    $fields['list_news_id']['list'] = $this->_NewsTb->listItem(array('list_id' => explode(',', str_replace(':','', $data['item']['list_news_id'])), 'columns' => array('id','name')));
                }
            }
            foreach ($this->_field['list_news_id'] as $id) {
                if (empty($this->_field['list_news_ajax'])) {
                    $fields['list_news_id']['list'] = array_merge(
                        $fields['list_news_id']['list'],
                        $this->_NewsTb->listItem(array('root_id' => $id, 'deny_id' => array($this->_params['id']), 'columns' => array('id','name')))
                    );
                }
                $item = $this->_NewsCatTb->getItem(array('id' => $id,'columns' => array('id','name','parent','level')));
                $fields['list_news_id']['cate']['list'] = array_merge(
                    $fields['list_news_id']['cate']['list'],
                    ($item['level'] > 0 ? $this->_renderer->cateSortNested($this->_NewsCatTb->listItem(array('root_id' => $id,'columns' => array('id','name','parent','level'))), array('parent' => $id, 'type' => 'sort')) : array(array_replace($item, array('level' => 1))))

                );
            }
            if (count($fields['list_news_id']['cate']['list']) == 1) {
                $fields['list_news_id']['cate']['list'] = array();
            }
            $this->_field['list_news_id'] = $this->_field['list_news_title'] ?? 'Chọn '.strtolower($this->_cate['name']).' liên quan';
        }
        if ($this->_field['list_product_id']) {
            $ProductTb = new ProductTb();
            $ProductCatTb = new ProductCatTb();

            $fields['list_product_id'] = array(
                'type' => 'multi',
                'value' => explode(',', str_replace(':','', $data['item']['list_product_id'])),
                'list' => array(),
                'cate' => array(
                    'list' => array(),
                    'root_id' => implode(',',$this->_field['list_product_id']),
                    'attr' => 'onchange="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'relatedProduct','root_id' => $this->_params['root_id'])),
                                'position' => 'list_product_id',
                            ), JSON_UNESCAPED_SLASHES)).', _HTChange.selectRelated(this, \'list_product_id\'));"'
                )
            );
            if ($this->_field['list_product_ajax']) {
                $fields['list_product_id']['loadData'] = 'onclick="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                    'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'relatedProduct','root_id' => $this->_params['root_id'])),
                                    'position' => 'list_product_id',
                                ), JSON_UNESCAPED_SLASHES)).', '. htmlspecialchars(json_encode(array('cat_related_id' => implode(',', $this->_field['list_product_id']), 'selected' => array_filter($fields['list_product_id']['value'])))) .');"';
                if ($data['item']['list_product_id']) {
                    $fields['list_product_id']['list'] = $ProductTb->listItem(array('list_id' => explode(',', str_replace(':','', $data['item']['list_product_id'])), 'columns' => array('id','name')));
                }
            }

            foreach ($this->_field['list_product_id'] as $id) {
                if (empty($this->_field['list_product_ajax'])) {
                    $fields['list_product_id']['list'] = array_merge(
                        $fields['list_product_id']['list'],
                        $ProductTb->listItem(array('root_id' => $id, 'deny_id' => array($this->_params['id']), 'columns' => array('id','name')))
                    );
                }
                $item = $ProductCatTb->getItem(array('id' => $id,'columns' => array('id','name','parent','level')));
                $fields['list_product_id']['cate']['list'] = array_merge(
                    $fields['list_product_id']['cate']['list'],
                    array(array_replace($item, array('level' => 1)))
                );
            }
            if (count($fields['list_product_id']['cate']['list']) == 1) {
                $fields['list_product_id']['cate']['list'] = array();
            }
            $this->_field['list_product_id'] = $this->_field['list_product_title'] ?? 'Chọn sản phẩm liên quan';
        }
        if ($this->_field['list_select_id']) {
            $NewsSelectTb = new NewsSelectTb();
            $selects = $this->_MenuCodeTb->listItem(array('list_id' => $this->_field['list_select_id'], 'columns' => array('id','name','define')));
            foreach ($selects as $i => $select) {
                $select['define'] = json_decode($select['define'], true);
                $fields['list_select_id']['label'][$i] = array(
                    'field' => 'select',
                    'input' => true,
                    'no_attr_id' => true,
                    'label' => $select['name'],
                    'required' => $this->_params['checkForm']['required']['list_select_id{'.$select['id'].'}'] ? true : false,
                    'name' => $select['define']['type'] ? 'list_select_id['.$select['id'].']' : 'list_select_id['.$select['id'].'][]',
                    'type' => $select['define']['type'] ? ($select['define']['parent'] > 0 ? 'group' : 'checkbox') : 'radio',
                    'disabled' => ($select['define']['level'] == 2 && !$select['define']['type']) ? 1 : 0, // 1: mức level
                    'value' => $data['item']['list_select_id'] ? explode(',', str_replace(':','', $data['item']['list_select_id'])) : '',
                    'list' => $this->_renderer->cateSortNested($NewsSelectTb->listItem(array('menu_code_id' => $select['id'],'display' => 1, 'list_product_cat_id' => $this->_params['root_id'])), array('parent' => 0,'type' => ($select['define']['level'] == 2 && !$select['define']['type'] ? 'sort' : 'nested')))
                );
            }
            if ($this->_cate['define_item']['list_select_id']) {
                $this->_cate['define_item']['list_select_id'] = json_decode($this->_cate['define_item']['list_select_id'], true);
                $i = array_search($this->_cate['define_item']['list_select_id']['id'], array_column($selects, 'id'));
                $fields['list_select_id']['label'][$i]['no_attr_id'] = false;
                $fields['list_select_id']['label'][$i]['list'] = array();

                $list_select_id = array_filter(explode(',', str_replace(':','',$item_cate['list_select_id'])));
                if ($list_select_id) {
                    $fields['list_select_id']['label'][$i]['list'] = $NewsSelectTb->listItem(array('menu_code_id' => $selects[$id]['id'], 'parent' => 0, 'columns' => array('id','parent','level','name')));

                    foreach ($fields['list_select_id']['label'][$i]['list'] as $j => $value) {
                        $fields['list_select_id']['label'][$i]['list'][$j]['child'] = $NewsSelectTb->listItem(array('parent' => $value['id'], 'list_id' => $list_select_id, 'columns' => array('id','parent','level','name')));
                        if (empty($fields['list_select_id']['label'][$i]['list'][$j]['child']) && !in_array($value['id'], $list_select_id)) {
                            unset($fields['list_select_id']['label'][$i]['list'][$j]);
                        }
                    }
                }

                $fields['cat_id']['attr'][] = '_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                    'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'select','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])),
                    'position' => 'list_select_id_17',
                ), JSON_UNESCAPED_SLASHES)).', _HTChange.select(this))';
            }

            foreach ($this->_field['sub'] as $i => $value) {
                $input = false;
                foreach ($this->_field['sub'][$i]['define']['list_select_id'] as $j => $select_id) {
                    $select = $this->_MenuCodeTb->getItem(array('id' => $select_id, 'columns' => array('id','name','define')));
                    $this->_field['sub'][$i]['define']['list_select_id'][$j] = array(
                        'field' => 'select',
                        'label' => $select['name'],
                        'name' => $select['define']['type'] ? 'list_select_id' : 'list_select_id[]',
                        'type' => $select['define']['type'] ? ($select['define']['parent'] > 0 ? 'group' : 'checkbox') : 'radio',
                        'required' => $select['define']['required'] ? 1 : 0,
                        'disabled' => ($select['define']['level'] == 2 && !$select['define']['type']) ? 1 : 0, // 1: mức level
                        'list' => $this->_renderer->cateSortNested($NewsSelectTb->listItem(array('menu_code_id' => $select['id'],'display' => 1)), array('parent' => 0,'type' => ($select['define']['level'] == 2 && !$select['define']['type'] ? 'sort' : 'nested')))
                    );
                    if ($this->_field['sub'][$i]['define']['list_select_id'][$j]['type'] != 'radio' && !$input) {
                        $input = true;
                        $this->_field['sub'][$i]['define']['list_select_id'][$j]['input'] = $input;
                    }
                }
            }
        }
        if ($fields['cat_id']['attr']) {
            $fields['cat_id']['attr'] = 'onchange="'.implode(',', $fields['cat_id']['attr']).'"';
        }
        if ($this->_field['special']) {
            $checkboxes = array_filter($this->_field['special'], function($item) {
                return $item['detail'];
            });
            if (!empty($checkboxes)) {
                $fields['special']['label'] = array_map(function($item) use ($data) {
                    return array(
                        'field' => 'checkbox',
                        'name' => 'special['.$item['name'].']',
                        'label' => $item['label'],
                        'note' => $item['note'],
                        'checked' => $data['item']['special'][$item['name']],
                    );
                }, $checkboxes);
            }
        }
        foreach ($fields as $field => $value) {
            $field = is_array($value) ? $field : $value;
            if (!empty($this->_field[$field])) {
                $data['elements'][$field] = array_merge(array(
                    'label' => $this->_field[$field],
                    'name' => $field,
                    'value' => $data['item'][$field]
                ), is_array($value) ? $value : array());
            }
        }

        // Bình luận
        if ($data['_field']['comment'] && $this->_params['id']) {
            $CommentTb = new CommentTb();
            $data['comment']['status'] = array('0' => 'Chờ duyệt', '-1' => 'Không duyệt');
            $data['comment']['list'] = $this->_renderer->cateSortNested(
                $CommentTb->listItem(array(
                    'getChild' => true,
                    'article_id' => $this->_params['id'],
                    'type' => $this->_params['__CONTROLLER__']
                )),
                array('parent' => 0, 'type' => 'nested')
            );

            $SortByColumn = new SortByColumn();
            foreach ($data['comment']['list'] as $i => $value) {
                if($value['child']) {
                    $data['comment']['list'][$i]['child'] = $SortByColumn($value['child'], 'id', 'SORT_ASC');
                }
            }
        }

        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Danh sách").' '.$this->_translator->translate($this->_cate['name']).'/'.$title);
        $data['_params'] = array_merge($this->_params, $this->params()->fromRoute());

        return new ViewModel($data);
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_NewsTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function existsAction()
    {
        if ($this->getRequest()->isPost()) {
            echo $this->_NewsTb->listItem($this->params()->fromPost()) ? true : false;
        }
        return $this->getResponse();
    }

    public function relatedAction()
    {
        $data = array(
            'selected' => $this->params()->fromPost('selected'),
            'list' => $this->params()->fromPost('selected') ? $this->_NewsTb->listItem(array('list_id' => $this->params()->fromPost('selected'), 'columns' => array('id','name'))) : array()
        );

        if ($this->_params['id']) {
            $data['selected'][] = $this->_params['id'];
        }

        foreach (explode(',', $this->params()->fromPost('cat_related_id')) as $root_id) {
            $data['list'] = array_merge($data['list'], $this->_NewsTb->listItem(array('root_id' => $root_id, 'deny_id' => $data['selected'], 'columns' => array('id','name'))));
        }

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function relatedProductAction()
    {
        $ProductTb = new ProductTb();
        $data = array(
            'selected' => $this->params()->fromPost('selected'),
            'list' => $this->params()->fromPost('selected') ? $ProductTb->listItem(array('list_id' => $this->params()->fromPost('selected'), 'columns' => array('id','name'))) : array()
        );

        foreach (explode(',', $this->params()->fromPost('cat_related_id')) as $root_id) {
            $data['list'] = array_merge($data['list'], $ProductTb->listItem(array('root_id' => $root_id, 'deny_id' => $data['selected'], 'columns' => array('id','name'))));
        }

        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function labelAction()
    {
        $item = $this->_NewsCatTb->getItem(array('id' => $this->params()->fromPost('cat_id')));
        $arrs['display'] = 1;
        if ($item) {
            $arrs['list_id'] = explode(',', str_replace(':','',$item['list_label_id']));
        }

        $NewsLabelTb = new NewsLabelTb();
        $data = array('list' => $NewsLabelTb->listItem($arrs));

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                // Xóa item || move hình ảnh qua thư mục uploasd/removes
                $item = $this->_NewsTb->getItem(array('id' => $id));
                $this->_Upload->deleteImage($item, $this->_params['checkForm']['image'], $this->_field);
                $this->_NewsTb->deleteItem(array('id' => $id));
                // Xóa id trong list_news_id của table news_tag_tb
                if ($this->_field['tags'] || $this->_field['list_tag_id']) {
                    foreach ($this->_NewsTagTb->listItem(array('list_news_id' => $id)) as $value) {
                        $this->_NewsTagTb->saveData(array(
                            'id' => $value['id'],
                            'post' => array('list_news_id' => array_diff(explode(',',str_replace(':','',$value['list_news_id'])), array($id)))
                        ));
                    }
                }
                // Xóa comment_tb liên quan
                if ($this->_field['comment']) {
                    $CommentTb = new CommentTb();
                    $CommentTb->deleteItem(array('article_id' => $id, 'type' => $this->_params['__CONTROLLER__']));
                }
                // Xóa ngôn ngữ
                if ($this->identity()->lang) {
                    $this->_LangMultiTbController->deleteItem(array('item_id' => $id, 'type' => $this->_params['__CONTROLLER__']));
                }
                // Xóa sản phẩm phụ
                array_shift($this->_field['sub']);
                if ($this->_field['sub']) {
                    $this->_SubController->deleteItem(array(
                        'field' => $this->_field,
                        'params' => $this->_params,
                        'object' => $this->_NewsTb,
                        'lang' => $this->identity()->lang
                    ));
                }
            }
        }
        return $this->getResponse();
    }

    public function sortfieldAction()
    {
        $type = $this->params()->fromQuery('type');
        $config = $type == 'list'
            ? array('title' => 'Tùy chỉnh cột', 'options' => array('table' => 'Table'))
            : array('title' => 'Sắp xếp dữ liệu', 'options' => array());
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_cate['name']) . '/' . $config['title']);

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkBack' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']),
                array('query' => $this->_session['query'])
            ),
            'onlyAllowSort' => true,
            'pages' => array(
                array(
                    'name' => $type,
                    'fixed' => true,
                    'options' => $config['options'],
                    'columns' => $this->_SortField->getFields($type),
                ),
             ),
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define_news'] = $this->_field;
            $this->_params['post']['define_news']['columns'][$type] = \Backend\View\Helper\Sort::sortByKey($this->params()->fromPost($type));

            $this->_NewsCatTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $view = new ViewModel($data);
        return $view->setTemplate('partials/columns.phtml');
    }

    public function codefieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Danh sách").' '.$this->_translator->translate($this->_cate['name']).'/Cấu hình dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_field,
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define_news'] = $this->params()->fromPost();
            $this->_params['post']['define_news']['validate'] = $this->_field['validate'] ? $this->_field['validate'] : array();
            $this->_params['post']['define_news']['columns'] = $this->_columns ?? array();
            $this->_params['post']['define_news']['cat_id'] = $this->_cate['define_item']['level'];
            $this->_params['post']['define_news']['list_label_id'] = $this->_cate['define_item']['list_label_id'];
            $this->_params['post']['define_news']['special'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_news']['special'], 'order');
            $this->_params['post']['define_news']['multi_input'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_news']['multi_input'], 'order');
            $this->_params['post']['define_news']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_news']['multi_image'], 'order');
            $this->_params['post']['define_news']['multi_detail'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_news']['multi_detail'], 'order');
            $this->_params['post']['define_news']['multi_file'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_news']['multi_file'], 'order');

            // Thêm/xóa hình theo kích thước khi chỉnh sửa kích thước
            if ($data['item']['thumbnail']) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $data['item']['thumbnail'],
                    'sizesNews' => $this->_params['post']['define_news']['thumbnail'],
                    'module' => 'single_news'.$this->_params['id']
                ));
            }
            if ($data['item']['multi_image']) {
                array_shift($this->_field['multi_image']);
                array_shift($this->_params['post']['define_news']['multi_image']);
                foreach ($this->_field['multi_image'] as $i => $value) {
                    $this->_Upload->updateImage(array(
                        'sizesOld' => $value['size'],
                        'sizesNews' => $this->_params['post']['define_news']['multi_image'][$i]['size'],
                        'module' => 'multi_news'.$this->_params['id'].$i
                    ));
                }
                $this->_params['post']['define_news']['multi_image'] = $this->params()->fromPost()['multi_image'];
            }

            // Bài viết con
            $this->_params['post']['define_news'] = array_merge(
                $this->_params['post']['define_news'],
                $this->_SubController->codefield(array(
                    'field' => $this->_field,
                    'params' => $this->_params['post']['define_news'],
                    'parent' => 5,
                    'item' => $data['item'],
                    'active' => 'news_sub-'.$this->_params['root_id'],
                    'image' => 'single_nsub'
                ))
            );

            $this->_NewsCatTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        // Các field và thứ tự hiển thị
        $SectionTb = new SectionTb();
        $MenuCodeTb = new MenuCodeTb();
        $ProductCatTb = new ProductCatTb();
        $listSelects = $MenuCodeTb->listItem(array('parent' => 5,'display' => 1, 'active' => 'news_select_tb'));
        $defines = array(
            'input' => array('name','desc_short','detail','allow_size_image','thumbnail'),
            'option' => array('title','description','keyword','slug','tags','list_tag_id','embed'),
            'action' => array('display','add','delete','sort' => array('default' => 0),'up_date','copy','colvis','transfer_cate','status','draft','date_published','comment'),
            'multi' => array('special','multi_input','multi_image','multi_file','multi_detail',
                'sub' => array(
                    'label' => 'Bài viết con',
                    'field' => array('name','desc_short','detail','thumbnail','multi_input','multi_image')
                ),
                'section' => array(
                    'label' => $MenuCodeTb->getItem(array('id' => 14, 'columns' => array('id','name')))['name'],
                    'list' => array_map(function ($item) {
                        return array('id' => $item['id'], 'name' => $item['menu']);
                    }, $SectionTb->listItem(array('display' => 1, 'columns' => array('id', 'menu')))),
                ),
                'select' => array(
                    'label' => 'Select',
                    'list' => $MenuCodeTb->listItem(array('active' => 'news_select_tb-', 'columns' => array('id','name'))),
                ),
            ),
            'select' => array(
                'list_select_id' => array('list' => array_reduce($listSelects, function($carry = array(), $item) {
                    $carry[$item['id']] = $item['name'];
                    return $carry;
                })),
                'list_news_id' => array(
                    'label' => '',
                    'editable' => array(
                        'name' => 'list_news_title',
                        'value' => $data['item']['list_news_title'] ?? 'Chọn '.strtolower($this->_cate['name']).' liên quan',
                    ),
                    'class' => 'col-md-3',
                    'list' => array_reduce($this->_NewsCatTb->listItem(array('parent' => 0,'columns' => array('id','name'))), function($carry = array(), $item) {
                        $carry[$item['id']] = $item['name'];
                        return $carry;
                    }),
                    'options' => array(
                        array(
                            'type' => 'checkbox',
                            'name' => 'list_news_ajax',
                            'label' => 'Load ajax',
                            'checked' => $data['item']['list_news_ajax']
                        )
                    )
                ),
                'list_product_id' => array(
                    'label' => '',
                    'editable' => array(
                        'name' => 'list_product_title',
                        'value' => $data['item']['list_product_title'] ?? 'Chọn bài viết liên quan',
                    ),
                    'class' => 'col-md-3',
                    'list' => array_reduce($ProductCatTb->listItem(array('parent' => 0,'columns' => array('id','name'))), function($carry = array(), $item) {
                        $carry[$item['id']] = $item['name'];
                        return $carry;
                    }),
                    'options' => array(
                        array(
                            'type' => 'checkbox',
                            'name' => 'list_product_ajax',
                            'label' => 'Load ajax',
                            'checked' => $data['item']['list_product_ajax']
                        )
                    )
                ),
            ),
        );

        foreach ($defines as $group => $fields) {
            foreach ($fields as $field => $value) {
                $field = is_array($value) ? $field : $value;
                $data['elements'][$group][] = array_merge(array(
                    'name' => $field,
                    'value' => $data['item'][$field]
                ), is_array($value) ? $value : array());
            }
        }

        $data['html'] = $this->_renderer->code($data);

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }

    public function codevalidateAction()
    {
        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Danh sách").' '.$this->_translator->translate($this->_cate['name']).'/Định nghĩa dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id'])),
            'required' => array(
                'rules' => $this->_field['validate']['required'],
                'fields' => array(
                    'desc_short' => $this->_field['desc_short'],
                    'title' => $this->_field['title'],
                    'description' => $this->_field['description'],
                    'keyword' => $this->_field['keyword'],
                    'thumbnail' => ($this->_field['thumbnail']) ? 'Ảnh đại diện' : ''
                )
            ),
            'exists' => array(
                'rules' => $this->_field['validate']['exists'] ? $this->_field['validate']['exists'] : array(),
                'options' => array('root_id' => 'Theo menu', 'cat_id' => 'Theo danh mục'),
                'fields' => array('slug' => $this->_field['slug'])
            )
        );

        foreach ($this->_field['multi_input'] as $value) {
            if ($value['label'] && !isset($value['auto'])) {
                $data['required']['fields']['multi_input{'.$value['name'].'}'] = $value['label'];
            }
        }

        if ($this->identity()->lang) {
            $data['translate'] = array(
                'rules' => $this->_field['validate']['translate'],
                'fields' => array(
                    'name' => $this->_field['name'],
                    'desc_short' => $this->_field['desc_short'],
                    'title' => $this->_field['title'],
                    'description' => $this->_field['description'],
                    'keyword' => $this->_field['keyword'],
                    'detail' => $this->_field['detail'],
                    'slug' => $this->_field['slug'],
                    'thumbnail' => ($this->_field['thumbnail']) ? 'Ảnh đại diện' : '',
                )
            );
        }
        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define_news'] = $this->_field;
            $this->_params['post']['define_news']['validate'] = $this->params()->fromPost();
            $this->_params['post']['define_news']['validate']['translate'] = array_key_exists('translate', $this->params()->fromPost()) ?  $this->params()->fromPost('translate') : array();
            $this->_NewsCatTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}