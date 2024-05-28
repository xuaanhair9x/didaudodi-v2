<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Controller\SubController;
use Backend\Model\CommentTb;
use Backend\Model\MenuCodeTb;
use Backend\Model\NewsCatTb;
use Backend\Model\NewsTb;
use Backend\Model\ProductBrandTb;
use Backend\Model\ProductCatTb;
use Backend\Model\ProductLabelTb;
use Backend\Model\ProductSelectTb;
use Backend\Model\ProductTagTb;
use Backend\Model\ProductTb;
use Backend\Model\SectionTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\SortByColumn;
use Backend\View\Helper\SortField;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class ProductTbController extends AbstractActionController
{
    protected $_ProductTb;
    protected $_ProductCatTb;
    protected $_ProductTagTb;
    protected $_SubController;
    protected $_MenuCodeTb;
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
        $this->_ProductTb = new ProductTb();
        $this->_ProductCatTb = new ProductCatTb();
        $this->_ProductTagTb = new ProductTagTb();
        $this->_SubController = new SubController();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_session = new Container($this->_params['__CONTROLLER__']);
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_cate = $this->_ProductCatTb->getItem(array('id' => $this->_params['root_id']));
        $this->_field = $this->_cate['define_product'];
        $this->_columns = $this->_field['columns'];
        $this->_field['validate']['required'] = array_merge(
            array('cat_id' => 'Danh mục','name' => $this->_field['name']),
            $this->_field['validate']['required'] ? $this->_field['validate']['required'] : array()
        );
        $this->_field['validate']['translate'] = isset($this->_field['validate']['translate']) ? $this->_field['validate']['translate'] : $this->identity()->langfield;
        // Kiểm tra form nhập liệu
        foreach ($this->_field['validate']['required'] as $name => $title) {
            if ($this->_field[$name] || strpos($name, 'multi_input') > -1 || strpos($name, 'list_select_id') > -1) {
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
            $permission = array_fill_keys(array_values(array('viewall','view','add','edit','delete','excel','transfer_cate')), 1);
        } else {
            $permission = $this->identity()->permission['product'][$this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']];
            if ($this->_field['cat_id']) {
                $permission = $this->identity()->permission['product'][$this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']][$this->_params['__CONTROLLER__']];
            }
        }

        $permission['other'] = ($permission['add'] || $permission['edit']) ? 1 : 0;
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
            'linkChange' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'change', 'root_id' => $this->_params['root_id'])),
            'columns' => $this->_SortField->getColumns(
                array(array('name' => 'checkall', 'title' => '<label class=\"mt-checkbox mt-checkbox-outline\"><input type=\"checkbox\" class=\"group-checkable\" data-set=\".ht-checkall-rows\"/><span></span></label>', 'table' => 1, 'excel' => 0)),
                array(
                    !$this->_field['display'] && $this->identity()->lang ? array('name' => 'display', 'title' => 'Hiển thị', 'table' => 1, 'excel' => 0, 'data' => $this->identity()->lang && count($this->identity()->langlist) > 1 ? 'display_lang' : 'display') : array(),
                    array('name' => 'button', 'title' => 'Chức năng', 'table' => $this->_field['add'] && (($this->_field['copy'] && $this->_params['permission']['add']) || $this->_params['permission']['edit'] || $this->_params['permission']['delete']), 'excel' => 0)
                )
            ),
        );

        if ($data['query'] && $data['query']['cat_id'] == 0) {
            return $this->redirect()->toUrl($this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id'])));
        }

        $post = $this->params()->fromPost();

        // Danh mục
        if ($this->_field['cat_id']) {
            $data['filter'] = $this->_renderer->cateSortNested(
                $this->_ProductCatTb->listItem(array('root_id' => $this->_params['root_id'], 'columns' => array('id','name','level','parent'))),
                array('parent' => $this->_params['root_id'], 'type' => 'sort')
            );
            if ($this->getRequest()->isPost() && empty($post['draw'])) {
                return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($post, 'strlen')));
            }
        }

        // Danh sách
        if (isset($post['draw'])) {
            $query_arrs = array(
                'search' => array(),
                'root_id' => $data['query']['cat_id'] ? $data['query']['cat_id'] : $this->_params['root_id'],
                'language' => ($this->identity()->lang) ? true : false,
                'user_created' => ($data['_params']['permission']['view'] && !$data['_params']['permission']['viewall']) ? $this->_params['user'] : '',
                'joinCate' => !!$this->_field['cat_id'],
                'joinBrand' => !!$this->_field['brand_id'],
            );

            if ($this->_field['cat_id'] == 'checkbox' && $data['query']) {
                unset($query_arrs['root_id']);
                $query_arrs['list_cat_id'] = $data['query']['cat_id'];
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

            $currentItems = $this->_ProductTb->listItem(array_merge($query_arrs, array('offset' => $post['start'], 'limit' => $post['length'])));
            if ($post['start'] == 0) {
                $this->_session->offsetSet('totalRecords', $this->_ProductTb->countItems($query_arrs));
            }

            $aaData = array();
            foreach ($currentItems as $i => $value) {
                $linkField = $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'field','id' => $value['id'],'root_id' => $this->_params['root_id']));
                $linkDelete = $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'delete','id' => $value['id'],'root_id' => $this->_params['root_id']));
                $linkChange = $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'change','id' => $value['id'],'root_id' => $this->_params['root_id']));

                $value['multi_input'] = json_decode($value['multi_input'], true);
                $value['special'] = $value['special'] ? json_decode($value['special'], true) : array();
                $value['price_market'] = $value['price_market'] > 0 ? $value['price_market'] : '';
                $value['price_discount'] = $value['price_discount'] > 0 ? $value['price_discount'] : '';

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

                $aaData[$i]['DT_RowId'] = $value['id'];
                foreach ($data['columns'] as $column) {
                    if ($column['colvis'] != true) {
                        switch ($column['name']) {
                            case 'checkall':
                                $aaData[$i]['checkall'] = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" class="ht-checkall-rows" value="'.$value['id'].'" /><span></span></label>';
                            break;
                            case 'thumbnail':
                                $thumbnail = BE_TEMPLATE.'/layouts/layout/img/noimage.png';
                                if ($value['thumbnail'] && file_exists(ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-',$value['thumbnail'])[0]).'/'.$value['thumbnail'])) {
                                    $thumbnail = PUBLIC_PATH.UPLOAD_IMAGES.date('Y/m',explode('-',$value['thumbnail'])[0]).'/autox30-'.$value['thumbnail'];
                                }
                                $aaData[$i]['thumbnail'] = '<img src="'.$thumbnail.'" height="30px" />';
                            break;
                            case 'cat_id':
                                $aaData[$i][$column['name']] = $value['cat_name'];
                            break;
                            case 'brand_id':
                                $aaData[$i][$column['name']] = $value['brand_name'];
                            break;
                            case 'name':
                                $aaData[$i]['name'] = '<a href="'.$linkField.'">'.$value['name'].'</a>';
                            break;
                            case 'price_market':
                                $aaData[$i]['price_market'] = empty($this->_field['editable_price'])
                                    ? number_format($value['price_market'],0,0,',')
                                    : '<a href="javascript:;" ht-trigger="editable-price" data-name="price_market" data-placement="bottom" data-pk="'.(htmlspecialchars(json_encode(array('url' => $linkChange, 'price_discount' => $value['price_discount']), JSON_UNESCAPED_SLASHES))).'" data-title="'.$this->_field['price_market'].'">'.$value['price_market'].'</a>';
                            break;
                            case 'price_discount':
                                $aaData[$i]['price_discount'] = empty($this->_field['editable_price'])
                                    ? number_format($value['price_discount'],0,0,',')
                                    : '<a href="javascript:;" ht-trigger="editable-price" data-name="price_discount" data-placement="bottom" data-pk="'.(htmlspecialchars(json_encode(array('url' => $linkChange, 'price_market' => $value['price_market']), JSON_UNESCAPED_SLASHES))).'" data-title="'.$this->_field['price_discount'].'">'.$value['price_discount'].'</a>';
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
                                if ($this->_field['copy'] && $this->_params['permission']['add']) {
                                    $button .= '<a href="'.$linkField.'?action=copy" class="btn yellow">Copy</a>';
                                }
                                if ($this->_params['permission']['edit']) {
                                    $button .= '<a href="'.$linkField.'" class="btn blue">Sửa</a>';
                                }
                                if ($this->_params['permission']['delete']) {
                                    $button .= '<a href="javascript:;" class="btn red" onclick="_HTDelete.item(\''.$linkDelete.'\');">Xóa</a>';
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

        $view = new ViewModel($data);
        return $view;
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
        $this->_field = $this->_renderer->removeElementArray($this->_field, array('multi_image','multi_input','multi_file','multi_detail','sub','section'));
        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            $title = $this->_translator->translate("Chỉnh sửa");
            unset($this->_params['checkForm']['required']['thumbnail']);
            $data['item'] = $this->_ProductTb->getItem(array('id' => $this->_params['id']));
            $data['item']['price_market'] = $data['item']['price_market'] > 0 ? $data['item']['price_market'] : '';
            $data['item']['price_discount'] = $data['item']['price_discount'] > 0 ? $data['item']['price_discount'] : '';
            $data['item']['price_percent'] = $data['item']['price_percent'] > 0 ? $data['item']['price_percent'] : '';

            if ($this->identity()->lang) {
                $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
            }
            if ($this->_field['sub']) {
                $this->_SubController->listItem(array(
                    'field' => $this->_field,
                    'params' => $this->_params,
                    'object' => $this->_ProductTb,
                    'lang' => $this->identity()->lang,
                    'langlist' => $this->identity()->langlist
                ), $data);
            }
            if ($this->_field['tags'] || $this->_field['list_tag_id']) {
                $data['item']['tags'] = array();
                foreach ($this->_ProductTagTb->listItem(array('list_product_id' => $data['item']['id'], 'display' => 1, 'columns' => array('id','name'))) as $value) {
                    $data['item']['tags'][] = $value['name'];
                }
            }

            $list_brand_id = array();
            $list_label_id = array();
            if ($this->_field['cat_id'] == 'checkbox') {
                $list_cate = $this->_ProductCatTb->listItem(array('list_id' => explode(',', str_replace(':','',$data['item']['list_cat_id']))));

                foreach ($list_cate as $item_cate) {
                    $list_brand_id = array_merge($list_brand_id, explode(',', str_replace(':','',$item_cate['list_brand_id'])));
                    $list_label_id = array_merge($list_label_id, explode(',', str_replace(':','',$item_cate['list_label_id'])));
                }
            } else {
                $item_cate = $this->_ProductCatTb->getItem(array('id' => $data['item']['cat_id']));
                $list_brand_id = explode(',', str_replace(':','',$item_cate['list_brand_id']));
                $list_label_id = explode(',', str_replace(':','',$item_cate['list_label_id']));
            }

            $list_brand_id = array('list_id' => $list_brand_id);
            $list_label_id = array('list_id' => $list_label_id);
            if ($this->params()->fromQuery()['action'] == 'copy') {
                unset($data['item']['thumbnail'], $data['item']['multi_file'], $data['item']['multi_image'], $this->_params['id']);
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
                } else {
                    // Lấy giá trị trả về.
                    $this->_params = $validate->getData($this->_field);

                    if ($this->_params['checkForm']['image']) {
                        $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field, array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'product'.$this->_params['root_id']);
                    }
                    if ($this->_params['checkForm']['file']) {
                        $this->_Upload->uploadFile($this->_params['post'], $this->_params['checkForm']['file']);
                    }
                    if ($this->_field['cat_id'] == 'checkbox') {
                        $this->_params['post']['list_cat_id'] = $this->_params['post']['cat_id'];
                        $this->_params['post']['cat_id'] = $this->_params['root_id'];
                    } else if (empty($this->_params['post']['cat_id'])){
                        $this->_params['post']['cat_id'] = $this->_params['root_id'];
                    }
                    if ($this->_field['list_select_id']) {
                        $this->_params['post']['list_select_id'] = call_user_func_array('array_merge', array_filter($this->_params['post']['list_select_id']));
                        $ProductSelectTb = new ProductSelectTb();
                        foreach ($ProductSelectTb->listItem(array('display' => 1, 'list_product_cat_id' => $this->_params['root_id'], 'child' => true)) as $value) {
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

                    // dev riêng lưu combo
                    if($this->_params['root_id'] == 16) {
                        unset($this->_params['list_product_id']);
                        $listId = $this->_params['post']['sortItem'];
                        asort($listId);
                        $infoCombo = array();
                        foreach ($listId as $idProduct => $sort) {
                            $infoCombo[] = array(
                                'id' => $idProduct,
                                'sort' => $sort,
                                'potitionTop' => $this->_params['post']['potitionTop'][$idProduct],
                                'potitionLeft' => $this->_params['post']['potitionLeft'][$idProduct],
                            );
                        }

                        // đem item không có sort xuống cuối cùng
                        $temp = array();
                        foreach ($infoCombo as $keyCombo => $combo) {
                            if(empty($combo['sort'])) {
                                $temp[] = $combo;
                                unset($infoCombo[$keyCombo]);
                            }
                        }

                        $infoCombo = array_merge($infoCombo, $temp);
                        $this->_params['post']['list_combo_item'] = $infoCombo;
                    }

                    $id = $this->_ProductTb->saveData($this->_params, $this->_field);

                    if ($this->identity()->lang) {
                        $this->_params['lang'] = $this->identity()->lang;
                        $this->_params['langlist'] = $this->identity()->langlist;
                        $this->_params['item_id'] = $id;
                        $this->_LangMultiTbController->saveData($this->_params);
                    }
                    if ($this->_field['tags'] || $this->_field['list_tag_id']) {
                        $this->_params['post']['tags'] = explode(',', $this->_params['post']['tags']);
                        foreach ($this->_params['post']['tags'] as $tag) {
                            if ($tag) {
                                $item = $this->_ProductTagTb->getItem(array('name' => $tag));
                                $list_product_id = ($item && $item['list_product_id'])  ? array_unique(array_merge(explode(',', str_replace(':','',$item['list_product_id'])), array($id))) : array($id);
                                $this->_ProductTagTb->saveData(array('id' => ($item) ? $item['id'] : '', 'post' => array('name' => $tag, 'list_product_id' => $list_product_id)));
                            }
                        }
                        if ($this->_params['id']) {
                            $this->_params['post']['tags-delete'] = array_diff($data['item']['tags'], $this->_params['post']['tags']);
                            foreach ($this->_params['post']['tags-delete'] as $tag) {
                                if ($tag) {
                                    $item = $this->_ProductTagTb->getItem(array('name' => $tag));
                                    $list_product_id = array_diff(explode(',', str_replace(':','',$item['list_product_id'])), array($id));
                                    $this->_ProductTagTb->saveData(array('id' => $item['id'], 'post' => array('name' => $tag,'list_product_id' => $list_product_id)));
                                }
                            }
                        }
                    }
                    if ($this->_field['sub']) {
                        $this->_SubController->saveData(array(
                            'field' => $this->_field,
                            'params' => $this->_params,
                            'object' => $this->_ProductTb,
                            'lang' => $this->identity()->lang,
                            'langlist' => $this->identity()->langlist,
                            'parent_id' => $id,
                            'prefix' => 'psub'
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
        $listCate = $this->_renderer->cateSortNested($this->_ProductCatTb->listItem(array('root_id' => $this->_params['root_id'],'columns' => array('id','name','parent','level'))), array('parent' => $this->_params['root_id'], 'type' => 'sort'));

        // Các field và thứ tự hiển thị
        $fields = array(
            'cat_id' => array('label' => 'Danh mục','class' => 'col-md-offset-6 col-md-pull-6','list' => $listCate, 'required' => true),
            'brand_id','name','title','description','slug','desc_short','keyword','sku',
            'price_market' => array('unit' => $this->_field['unit'] ?? 'vnd'),
            'price_discount' => array('unit' => $this->_field['unit'] ?? 'vnd', 'attr' => 'readonly'),
            'price_percent' => array('attr' => 'readonly'),
            'todo_date' => $this->_field['todo_date'],
            'multi_input','thumbnail','multi_image','multi_file','detail','multi_detail',
            'sub' => array('action' => $this->params()->fromQuery()['action']),
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
            $ProductLabelTb = new ProductLabelTb();
            $list_label_id['display'] = 1;
            $list_label_id['display_lang'] = $this->identity()->lang;
            $fields['list_label_id'] = array(
                'type' => 'checkbox',
                'input' => true,
                'value' => explode(',', str_replace(':','', $data['item']['list_label_id'])),
                'list' => $ProductLabelTb->listItem($list_label_id)
            );

            $fields['cat_id']['attr'][] = '_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'label','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])),
                'position' => 'list_label_id',
            ), JSON_UNESCAPED_SLASHES)).', _HTChange.select(this))';
        }

        $ProductSelectTb = new ProductSelectTb();
        if ($this->_field['list_select_id']) {
            $selects = $this->_MenuCodeTb->listItem(array('list_id' => $this->_field['list_select_id'], 'columns' => array('id','name','define')));
            $typeCheckbox = 1;
            $typeAdminConfig = 2;
            $listSelectId = array();
            if (is_array($data['item']['list_select_id'])) {
                $listSelectId = array_reduce($data['item']['list_select_id'], function ($carry, $item) {
                    return array_merge($carry, array_filter($item));
                }, []);
            } elseif ($data['item']['list_select_id']) {
                $listSelectId = explode(',', str_replace(':','', $data['item']['list_select_id']));
            }

            foreach ($selects as $i => $select) {
                $select['define'] = json_decode($select['define'], true);
                $type = $select['define']['type'] == $typeAdminConfig ? 'mixed' : 'radio';
                if ($select['define']['type'] == $typeCheckbox) {
                    $type = $select['define']['parent'] > 0 ? 'group' : 'checkbox';
                }
                $fields['list_select_id']['label'][$i] = array(
                    'field' => 'select',
                    'input' => true,
                    'no_attr_id' => true,
                    'label' => $select['name'],
                    'required' => $this->_params['checkForm']['required']['list_select_id{'.$select['id'].'}'] ? true : false,
                    'name' => $select['define']['type'] ? 'list_select_id['.$select['id'].']' : 'list_select_id['.$select['id'].'][]',
                    'keySort' => 'list_select_id[' . $select['id'] . ']',
                    'type' => $type,
                    'disabled' => ($select['define']['level'] == 2 && !$select['define']['type']) ? 1 : 0, // 1: mức level
                    'value' => $listSelectId,
                    'list' => $this->_renderer->cateSortNested(
                        $ProductSelectTb->listItem(array(
                            'menu_code_id' => $select['id'],
                            'display' => 1,
                            'display_lang' => $this->identity()->lang,
                            'list_product_cat_id' => $this->_params['root_id']
                        )),
                        array('parent' => 0,'type' => ($select['define']['level'] == 2 && !$select['define']['type'] ? 'sort' : 'nested'))
                    )
                );
            }
            if ($this->_cate['define_item']['list_select_id']) {
                $this->_cate['define_item']['list_select_id'] = json_decode($this->_cate['define_item']['list_select_id'], true);
                $i = array_search($this->_cate['define_item']['list_select_id']['id'], array_column($selects, 'id'));
                $fields['list_select_id']['label'][$i]['no_attr_id'] = false;
                $fields['list_select_id']['label'][$i]['list'] = array();

                $list_select_id = array_filter(explode(',', str_replace(':','',$item_cate['list_select_id'])));
                if ($list_select_id) {
                    $fields['list_select_id']['label'][$i]['list'] = $ProductSelectTb->listItem(array(
                        'menu_code_id' => $selects[$id]['id'],
                        'parent' => 0,
                        'display' => 1,
                        'display_lang' => $this->identity()->lang,
                        'columns' => array('id','parent','level','name','type')
                    ));

                    foreach ($fields['list_select_id']['label'][$i]['list'] as $j => $value) {
                        $fields['list_select_id']['label'][$i]['list'][$j]['child'] = $ProductSelectTb->listItem(array(
                            'parent' => $value['id'],
                            'list_id' => $list_select_id,
                            'display' => 1,
                            'display_lang' => $this->identity()->lang,
                            'columns' => array('id','parent','level','name')
                        ));
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
                    'list' => $this->_renderer->cateSortNested(
                        $ProductSelectTb->listItem(array('menu_code_id' => $select['id'],'display' => 1, 'display_lang' => $this->identity()->lang)),
                        array('parent' => 0,'type' => ($select['define']['level'] == 2 && !$select['define']['type'] ? 'sort' : 'nested'))
                    )
                );
                if ($this->_field['sub'][$i]['define']['list_select_id'][$j]['type'] != 'radio' && !$input) {
                    $input = true;
                    $this->_field['sub'][$i]['define']['list_select_id'][$j]['input'] = $input;
                }
            }
        }
        if ($this->_field['list_product_id']) {
            $fields['list_product_id'] = array(
                'type' => 'multi',
                'value' => explode(',', str_replace(':','', $data['item']['list_product_id'])),
                'list' => array(),
                'cate' => array(
                    'list' => array(),
                    'root_id' => implode(',',$this->_field['list_product_id']),
                    'attr' => 'onchange="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'related','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])),
                                'position' => 'list_product_id',
                            ), JSON_UNESCAPED_SLASHES)).', _HTChange.selectRelated(this, \'list_product_id\'));"'
                )
            );
            if ($this->_field['list_product_ajax']) {
                $fields['list_product_id']['loadData'] = 'onclick="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                    'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'related','id' => $this->_params['id'], 'root_id' => $this->_params['root_id'])),
                                    'position' => 'list_product_id',
                                ), JSON_UNESCAPED_SLASHES)).', '. htmlspecialchars(json_encode(array('isFirst' => true, 'cat_related_id' => implode(',', $this->_field['list_product_id']), 'selected' => array_filter($fields['list_product_id']['value'])))) .');"';
                if ($data['item']['list_product_id']) {
                    $fields['list_product_id']['list'] = $this->_ProductTb->listItem(array('list_id' => explode(',', str_replace(':','', $data['item']['list_product_id'])), 'columns' => array('id','name','price_discount','price_market')));
                }
            }
            foreach ($this->_field['list_product_id'] as $id) {
                if (empty($this->_field['list_product_ajax'])) {
                    $fields['list_product_id']['list'] = array_merge(
                        $fields['list_product_id']['list'],
                        $this->_ProductTb->listItem(array('root_id' => $id, 'deny_id' => array($this->_params['id']), 'columns' => array('id','name','price_discount','price_market')))
                    );
                }
                $item = $this->_ProductCatTb->getItem(array('id' => $id,'columns' => array('id','name','parent','level')));
                $fields['list_product_id']['cate']['list'] = array_merge(
                    $fields['list_product_id']['cate']['list'],
                    ($item['level'] > 0 ? $this->_renderer->cateSortNested($this->_ProductCatTb->listItem(array('root_id' => $id,'columns' => array('id','name','parent','level'))), array('parent' => $id, 'type' => 'sort')) : array(array_replace($item, array('level' => 1))))

                );
            }
            if (count($fields['list_product_id']['cate']['list']) == 1) {
                $fields['list_product_id']['cate']['list'] = array();
            }
            $this->_field['list_product_id'] = $this->_field['list_product_title'] ?? 'Chọn '.strtolower($this->_cate['name']).' liên quan';
        }
        if ($this->_field['list_news_id']) {
            $NewsTb = new NewsTb();
            $NewsCatTb = new NewsCatTb();

            $fields['list_news_id'] = array(
                'type' => 'multi',
                'value' => explode(',', str_replace(':','', $data['item']['list_news_id'])),
                'list' => array(),
                'cate' => array(
                    'list' => array(),
                    'root_id' => implode(',',$this->_field['list_news_id']),
                    'attr' => 'onchange="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'relatedNews','root_id' => $this->_params['root_id'])),
                                'position' => 'list_news_id',
                            ), JSON_UNESCAPED_SLASHES)).', _HTChange.selectRelated(this, \'list_news_id\'));"'
                )
            );
            if ($this->_field['list_news_ajax']) {
                $fields['list_news_id']['loadData'] = 'onclick="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                    'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'relatedNews','root_id' => $this->_params['root_id'])),
                                    'position' => 'list_news_id',
                                ), JSON_UNESCAPED_SLASHES)).', '. htmlspecialchars(json_encode(array('cat_related_id' => implode(',', $this->_field['list_news_id']), 'selected' => array_filter($fields['list_news_id']['value'])))) .');"';
                if ($data['item']['list_news_id']) {
                    $fields['list_news_id']['list'] = $NewsTb->listItem(array('list_id' => explode(',', str_replace(':','', $data['item']['list_news_id'])), 'columns' => array('id','name')));
                }
            }

            foreach ($this->_field['list_news_id'] as $id) {
                if (empty($this->_field['list_news_ajax'])) {
                    $fields['list_news_id']['list'] = array_merge(
                        $fields['list_news_id']['list'],
                        $NewsTb->listItem(array('root_id' => $id, 'deny_id' => array($this->_params['id']), 'columns' => array('id','name')))
                    );
                }
                $item = $NewsCatTb->getItem(array('id' => $id,'columns' => array('id','name','parent','level')));
                $fields['list_news_id']['cate']['list'] = array_merge(
                    $fields['list_news_id']['cate']['list'],
                    array(array_replace($item, array('level' => 1)))
                );
            }
            if (count($fields['list_news_id']['cate']['list']) == 1) {
                $fields['list_news_id']['cate']['list'] = array();
            }
            $this->_field['list_news_id'] = $this->_field['list_news_title'] ?? 'Chọn bài viết liên quan';
        }
        if ($this->_field['brand_id']) {
            $ProductBrandTb = new ProductBrandTb();
            $list_brand_id['display'] = 1;
            $fields['brand_id'] = array('list' => ($this->_params['id'] || !$this->_field['cat_id']) ? $ProductBrandTb->listItem($list_brand_id) : array());
            if ($this->_field['validate']['required']['brand_id']) { $fields['brand_id']['required'] = true; }

            $fields['cat_id']['class'] = '';
            $fields['cat_id']['attr'][] = '_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'brand','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])),
                'position' => 'brand_id',
            ), JSON_UNESCAPED_SLASHES)).', _HTChange.select(this))';
        }
        if ($this->_field['price_discount']) {
            $fields['price_market']['class'] = 'col-md-3';
            $fields['price_discount']['class'] = 'col-md-3';
            if ($this->_field['price_percent']) {
                $fields['price_market']['class'] = 'col-md-2';
                $fields['price_discount']['class'] = 'col-md-2';
                $fields['price_percent']['class'] = 'col-md-2';
            }
            if ($data['item']) {
                unset($fields['price_discount']['attr'], $fields['price_percent']['attr']);
            }
        }
        if ($this->_field['tags'] || $this->_field['list_tag_id']) {
            $listTags = $this->_ProductTagTb->listItem(array('display' => 1, 'orderby' => array('name ASC'), 'columns' => array('id','name')));
            $fields['list_tag_id'] = array('list' => $listTags);
            $fields['tags'] = array('list' => $listTags);
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
                $data['elements'][$field] = array_merge(
                    array(
                        'label' => $this->_field[$field],
                        'name' => $field,
                        'copy' => ($this->params()->fromQuery()['action']) ? true : false,
                        'value' => $data['item'][$field]
                    ),
                    is_array($value) ? $value : array()
                );
            }
        }

        // Điều kiện được chọn nhiều danh mục
        if ($this->_field['cat_id'] == 'checkbox') {
            $data['elements']['cat_id']['type'] = $this->_field['cat_id'];
            $data['elements']['cat_id']['input'] = 'disabled';
            $data['elements']['cat_id']['value'] = explode(',', str_replace(':','', $data['item']['list_cat_id']));
        }

        // Bình luận
        if ($this->_field['comment'] && $this->_params['id']) {
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
                $this->_ProductTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()), $this->_field);
            }
        }
        return $this->getResponse();
    }

    public function bulkPriceAction()
    {
        $params = $this->params()->fromPost();
        if ($this->getRequest()->isPost()) {
            $products = $this->_ProductTb->listItem(array('list_id' => explode(',',$this->_params['id']), 'columns' => array('id', 'name', 'price_market', 'price_discount', 'price_percent')));
            $re = $this->_field['unit'] == 'dollar' ? '/[^0-9.]/' : '/[^0-9]/';
            $number = preg_replace($re, '', $params['number']);

            $error = array(
                'negative' => array(),
                'compare' => array()
            );
            foreach ($products as $i => $product) {
                foreach ($params['price'] as $key_price) {
                    if (empty($products[$i][$key_price])) {
                        continue;
                    }

                    $price = $number;
                    if ($params['ratio'] == 1) {
                        $price = round($products[$i][$key_price] * ($number / 100));
                    }

                    if ($params['type'] == 1) {
                        $products[$i][$key_price] = $products[$i][$key_price] + $price;
                    } else {
                        $products[$i][$key_price] = $products[$i][$key_price] - $price;
                    }
                }

                if ($products[$i]['price_market'] < 0 || $products[$i]['price_discount'] < 0) {
                    $error['negative'][] = $products[$i];
                } else if ($products[$i]['price_market'] > 0 && $products[$i]['price_market'] <= $products[$i]['price_discount']) {
                    $error['compare'][] = $products[$i];
                } else if (!empty($products[$i]['price_discount'])){
                    $products[$i]['price_percent'] = floor(100 - (($products[$i]['price_discount'] * 100) / $products[$i]['price_market']));
                }
            }

            if (count($error['negative']) == 0 && count($error['compare']) == 0) {
                foreach ($products as $product) {
                    $this->_ProductTb->saveData(array('id' => $product['id'], 'post' => $product), $this->_field);
                }
            }

            echo json_encode($error);
        }
        return $this->getResponse();
    }

    public function existsAction()
    {
        if ($this->getRequest()->isPost()) {
            echo $this->_ProductTb->listItem($this->params()->fromPost()) ? true : false;
        }
        return $this->getResponse();
    }

    public function brandAction()
    {
        $catId = $this->params()->fromPost('cat_id');
        $listBrandId = array();
        if (is_array($catId)) {
            $list = $this->_ProductCatTb->listItem(array('list_id' => $catId));
            foreach ($list as $item) {
                $listBrandId = array_merge($listBrandId, explode(',', str_replace(':','',$item['list_brand_id'])));
            }
        } else {
            $item = $this->_ProductCatTb->getItem(array('id' => $catId));
            if ($item) {
                $listBrandId = explode(',', str_replace(':','',$item['list_brand_id']));
            }
        }

        $arrs['display'] = 1;
        if ($listBrandId) {
            $arrs['list_id'] = $listBrandId;
        }

        if ($this->_params['id']) {
            $product = $this->_ProductTb->getItem(array('id' => $this->_params['id']));
        }

        // Danh sách thương hiệu
        $ProductBrandTb = new ProductBrandTb();
        $data = array(
            'list' => $ProductBrandTb->listItem($arrs),
            'brand_id' => $product['brand_id']
        );

        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function relatedAction()
    {
        $data = array(
            'selected' => $this->params()->fromPost('selected'),
            '_params' => $this->_params,
            'list' => $this->params()->fromPost('selected') ? $this->_ProductTb->listItem(array('list_id' => $this->params()->fromPost('selected'), 'columns' => array('id','name','price_discount','price_market'))) : array()
        );

        if ($this->_params['id']) {
            $data['item'] = $this->_ProductTb->getItem(array('id' => $this->_params['id']));
            $data['selected'][] = $this->_params['id'];
        }

        foreach (explode(',', $this->params()->fromPost('cat_related_id')) as $root_id) {
            $cate = $this->_ProductCatTb->getParent(array('child_id' => $root_id,'parent' => 0));
            $cate['define_product'] = json_decode($cate['define_product'], true);
            $key = $cate['define_product']['cat_id'] == 'checkbox' ? 'list_cat_id' : 'root_id';
            if ($this->params()->fromPost('isFirst')) {
                $key = 'root_id';
            }
            $data['list'] = array_merge($data['list'], $this->_ProductTb->listItem(array($key => $root_id, 'deny_id' => $data['selected'], 'columns' => array('id','name','price_discount','price_market'))));
        }

        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function relatedNewsAction()
    {
        $NewsTb = new NewsTb();
        $data = array(
            'selected' => $this->params()->fromPost('selected'),
            'list' => $this->params()->fromPost('selected') ? $NewsTb->listItem(array('list_id' => $this->params()->fromPost('selected'), 'columns' => array('id','name'))) : array()
        );

        foreach (explode(',', $this->params()->fromPost('cat_related_id')) as $root_id) {
            $data['list'] = array_merge($data['list'], $NewsTb->listItem(array('root_id' => $root_id, 'deny_id' => $data['selected'], 'columns' => array('id','name'))));
        }

        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function labelAction()
    {
        $catId = $this->params()->fromPost('cat_id');
        $listLabelId = array();
        if (is_array($catId)) {
            $list = $this->_ProductCatTb->listItem(array('list_id' => $catId));
            foreach ($list as $item) {
                $listLabelId = array_merge($listLabelId, explode(',', str_replace(':','',$item['list_label_id'])));
            }
        } else {
            $item = $this->_ProductCatTb->getItem(array('id' => $catId));
            if ($item) {
                $listLabelId = explode(',', str_replace(':','',$item['list_label_id']));
            }
        }

        $arrs = array(
            'display' => 1,
            'display_lang' => $this->identity()->lang,
        );
        if ($listLabelId) {
            $arrs['list_id'] = $listLabelId;
        }

        if ($this->_params['id']) {
            $product = $this->_ProductTb->getItem(array('id' => $this->_params['id']));
        }

        $ProductLabelTb = new ProductLabelTb();
        $data = array(
            'list' => $ProductLabelTb->listItem($arrs),
            'list_label_id' => explode(',', str_replace(':','',$product['list_label_id']))
        );

        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function selectAction()
    {
        $this->_cate['define_item']['list_select_id'] = json_decode($this->_cate['define_item']['list_select_id'], true);

        $select = $this->_MenuCodeTb->getItem(array('id' => $this->_cate['define_item']['list_select_id']['id'], 'columns' => array('id','name','define')));
        $item = $this->_ProductTb->getItem(array('id' => $this->_params['id'], 'columns' => array('list_select_id')));

        $typeAdminConfig = 2;
        $type = $select['define']['parent'] > 0 ? 'group' : 'checkbox';
        if ($select['define']['type'] == $typeAdminConfig) {
            $type = 'mixed';
        }

        $selects = array(
            'field' => 'select',
            'no_attr_id' => false,
            'label' => $select['name'],
            'name' => 'list_select_id['.$this->_cate['define_item']['list_select_id']['id'].']',
            'type' => $type,
            'value' => explode(',', str_replace(':','',$item['list_select_id'])),
            'list' => array()
        );

        $list_select_id = explode(',', str_replace(':','',$this->_ProductCatTb->getItem(array('id' => $this->params()->fromPost('cat_id'), 'columns' => array('list_select_id')))['list_select_id']));
        if (array_filter($list_select_id)) {
            $ProductSelectTb = new ProductSelectTb();
            $selects['list'] = $ProductSelectTb->listItem(array(
                'menu_code_id' => $select['id'],
                'parent' => 0,
                'display' => 1,
                'display_lang' => $this->identity()->lang,
                'columns' => array('id','parent','level','name','type')
            ));

            foreach ($selects['list'] as $i => $value) {
                $selects['list'][$i]['child'] = $ProductSelectTb->listItem(array(
                    'parent' => $value['id'],
                    'list_id' => $list_select_id,
                    'display' => 1,
                    'display_lang' => $this->identity()->lang,
                    'columns' => array('id','parent','level','name')
                ));
                if (empty($selects['list'][$i]['child']) && !in_array($value['id'], $list_select_id)) {
                    unset($selects['list'][$i]);
                }
            }
        }
        $data = array(
            'menu_code_id' => $this->_cate['define_item']['list_select_id']['id'],
            'elements' => array('list_select_id' => array('label' => array($selects)))
        );

        $view = new ViewModel($data);
        $view->setTerminal(true);
        return $view;
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                // Xóa item || move hình ảnh qua thư mục uploads/removes
                $item = $this->_ProductTb->getItem(array('id' => $id));
                $this->_Upload->deleteImage($item, $this->_params['checkForm']['image'], $this->_field);
                $this->_ProductTb->deleteItem(array('id' => $id));
                // Xóa id trong list_product_id của table product_tag_tb
                if ($this->_field['tags']) {
                    foreach ($this->_ProductTagTb->listItem(array('list_product_id' => $id)) as $value) {
                        $this->_ProductTagTb->saveData(array(
                            'id' => $value['id'],
                            'post' => array('list_product_id' => array_diff(explode(',',str_replace(':','',$value['list_product_id'])), array($id)))
                        ));
                    }
                }
                // Xóa sản phẩm phụ
                array_shift($this->_field['sub']);
                if ($this->_field['sub']) {
                    $this->_SubController->deleteItem(array(
                        'field' => $this->_field,
                        'params' => $this->_params,
                        'object' => $this->_ProductTb,
                        'lang' => $this->identity()->lang
                    ));
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
            }
        }
        return $this->getResponse();
    }

    public function sortfieldAction()
    {
        $type = $this->params()->fromQuery('type');
        $config = $type == 'list'
            ? array('title' => 'Tùy chỉnh cột', 'options' => array('table' => 'Table', 'excel' => 'Excel'))
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
            'denyColumnsExcel' =>  array('thumbnail', 'sort', 'display', 'special'),
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
            $this->_params['post']['define_product'] = $this->_field;
            $this->_params['post']['define_product']['columns'][$type] = \Backend\View\Helper\Sort::sortByKey($this->params()->fromPost($type));

            $this->_ProductCatTb->saveData($this->_params);
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
            'item' => ($this->_cate['define_product']) ? $this->_field : null,
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        // Các field và thứ tự hiển thị
        $SectionTb = new SectionTb();
        $NewsCatTb = new NewsCatTb();
        $listSelects = $this->_MenuCodeTb->listItem(array('parent' => 4,'display' => 1, 'active' => 'product_select_tb'));
        $defines = array(
            'input' => array('name','desc_short','detail','price_market' => array('default' => 1),'sku','allow_size_image','thumbnail'),
            'radio' => array(
                'cat_id' => $this->_cate['define_item']['level'] ? array('label' => 'Kiểu chọn danh mục','list' => array('radio' => 'Chọn một', 'checkbox' => 'Chọn nhiều')) : null,
                'unit' => array('label' => 'Đơn vị giá','list' => array('vnd' => 'VND', 'dollar' => 'Dollar'))
            ),
            'input-group-radio' => array('todo_date'),
            'option' => array('title','description','keyword','slug','price_discount','price_percent','tags','list_tag_id','embed'),
            'action' => array('display','add-delete','sort' => array('default' => 0),'up_date' => array('note' => '<a href="javascript:;" class="mt-sweetalert-note" data-message="Làm cho sản phẩm lên đầu danh sách"><i class="fa fa-question-circle" aria-hidden="true"></i></a>'),'copy','colvis','excel','transfer_cate','comment','editable_price' => array('label' => 'Chỉnh sửa Giá ở trang danh sách'),'bulk_price' => array('label' => 'Chỉnh sửa Giá nhiều sản phẩm cùng lúc')),
            'multi' => array(
                'special','multi_input','multi_image','multi_file','multi_detail',
                'section' => array(
                    'label' => $this->_MenuCodeTb->getItem(array('id' => 14, 'columns' => array('id','name')))['name'],
                    'list' => array_map(function ($item) {
                        return array('id' => $item['id'], 'name' => $item['menu']);
                    }, $SectionTb->listItem(array('display' => 1, 'columns' => array('id', 'menu')))),
                ),
                'sub' => array(
                    'label' => 'Sản phẩn con',
                    'field' => array(
                        'name','sku','desc_short','detail','price_market','price_discount','thumbnail','multi_input','multi_image',
                        'list_select_id' => array_reduce($listSelects, function($carry = array(), $item) {
                            $carry[$item['id']] = $item['name'];
                            return $carry;
                        })
                    )
                ),
            ),
            'select' => array(
                'list_select_id' => array('list' => array_reduce($listSelects, function($carry = array(), $item) {
                    $carry[$item['id']] = $item['name'];
                    return $carry;
                })),
                'list_product_id' => array(
                    'label' => '',
                    'editable' => array(
                        'name' => 'list_product_title',
                        'value' => $data['item']['list_product_title'] ?? 'Chọn '.strtolower($this->_cate['name']).' liên quan',
                    ),
                    'class' => 'col-md-3',
                    'list' => array_reduce($this->_ProductCatTb->listItem(array('parent' => 0,'columns' => array('id','name'))), function($carry = array(), $item) {
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
                'list_news_id' => array(
                    'label' => '',
                    'editable' => array(
                        'name' => 'list_news_title',
                        'value' => $data['item']['list_news_title'] ?? 'Chọn bài viết liên quan',
                    ),
                    'class' => 'col-md-3',
                    'list' => array_reduce($NewsCatTb->listItem(array('parent' => 0,'columns' => array('id','name'))), function($carry = array(), $item) {
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
                )
            ),
        );
        // if($this->identity()->supper == 1) {
        //     echo '<pre style="color:#f00;font-weight:bold;">'; print_r($defines); echo '</pre>';
        // }
        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define_product'] = $this->params()->fromPost();
            $this->_params['post']['define_product']['columns'] = $this->_columns ?? array();
            $this->_params['post']['define_product']['brand_id'] = $this->_cate['define_item']['list_brand_id'];
            $this->_params['post']['define_product']['list_label_id'] = $this->_cate['define_item']['list_label_id'];
            $this->_params['post']['define_product']['validate'] = $this->_field['validate'] ? $this->_field['validate'] : array();
            $this->_params['post']['define_product']['special'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_product']['special'], 'order');
            $this->_params['post']['define_product']['multi_input'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_product']['multi_input'], 'order');
            $this->_params['post']['define_product']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_product']['multi_image'], 'order');
            $this->_params['post']['define_product']['multi_file'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_product']['multi_file'], 'order');
            $this->_params['post']['define_product']['multi_detail'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_product']['multi_detail'], 'order');

            if (count($this->_params['post']['define_product']['sub']) > 1) {
                $subs = array_map(function ($sub) {
                    $sub['define']['unit'] = $this->_params['post']['define_product']['unit'];
                    return $sub;
                }, $this->_params['post']['define_product']['sub']);

                $this->_params['post']['define_product']['sub'] = $subs;
            }

            // Thêm/xóa hình theo kích thước khi chỉnh sửa kích thước
            if ($data['item']['thumbnail']) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $data['item']['thumbnail'],
                    'sizesNews' => $this->_params['post']['define_product']['thumbnail'],
                    'module' => 'single_product'.$this->_params['id']
                ));
            }
            if ($data['item']['multi_image']) {
                array_shift($this->_field['multi_image']);
                array_shift($this->_params['post']['define_product']['multi_image']);
                foreach ($this->_field['multi_image'] as $i => $value) {
                    $this->_Upload->updateImage(array(
                        'sizesOld' => $value['size'],
                        'sizesNews' => $this->_params['post']['define_product']['multi_image'][$i]['size'],
                        'module' => 'multi_product'.$this->_params['id'].$i
                    ));
                }
                $this->_params['post']['define_product']['multi_image'] = $this->params()->fromPost()['multi_image'];
            }

            // Loc label empty
            foreach ($defines['input-group-radio'] as $field) {
                if (empty($this->_params['post']['define_product'][$field]['label'])) {
                    unset($this->_params['post']['define_product'][$field]);
                }
            }

            // Sản phẩm con
            $this->_params['post']['define_product'] = array_merge(
                $this->_params['post']['define_product'],
                $this->_SubController->codefield(array(
                    'field' => $this->_field,
                    'params' => $this->_params['post']['define_product'],
                    'parent' => 4,
                    'item' => $data['item'],
                    'active' => 'product_sub-'.$this->_params['root_id'],
                    'image' => 'single_psub'
                ))
            );

            $this->_ProductCatTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

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
                    'sku' => $this->_field['sku'],
                    'brand_id' => $this->_field['brand_id'],
                    'price_market' => $this->_field['price_market'],
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
                'fields' => array(
                    'slug' => $this->_field['slug'],
                    'sku' => $this->_field['sku']
                )
            )
        );

        foreach ($this->_field['multi_input'] as $value) {
            if ($value['label'] && !isset($value['auto'])) {
                $data['required']['fields']['multi_input{'.$value['name'].'}'] = $value['label'];
            }
        }

        if ($this->_field['list_select_id']) {
            $selects = $this->_MenuCodeTb->listItem(array('list_id' => $this->_field['list_select_id'], 'columns' => array('id','name','define')));
            foreach ($selects as $value) {
                $data['required']['fields']['list_select_id{'.$value['id'].'}'] = $value['name'];
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
                    'sku' => $this->_field['sku'],
                    'price_market' => $this->_field['price_market'],
                    'price_discount' => $this->_field['price_discount'],
                    'thumbnail' => $this->_field['thumbnail'] ? 'Ảnh đại diện' : ''
                )
            );
        }
        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define_product'] = $this->_field;
            $this->_params['post']['define_product']['validate'] = $this->params()->fromPost();
            $this->_params['post']['define_product']['validate']['translate'] = array_key_exists('translate', $this->params()->fromPost()) ?  $this->params()->fromPost('translate') : array();
            $this->_ProductCatTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}