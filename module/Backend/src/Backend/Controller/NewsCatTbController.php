<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Model\MenuCodeTb;
use Backend\Model\MenuPublicTb;
use Backend\Model\NewsTb;
use Backend\Model\NewsCatTb;
use Backend\Model\NewsLabelTb;
use Backend\Model\NewsTagTb;
use Backend\Model\SectionTb;
use Backend\Model\ProductTb;
use Backend\Model\ProductCatTb;
use Backend\Model\LangMultiTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Session\Container;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class NewsCatTbController extends AbstractActionController
{
    protected $_NewsCatTb;
    protected $_NewsTagTb;
    protected $_MenuPublicTb;
    protected $_LangMultiTbController;
    protected $_Upload;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;
    protected $_session;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', 'news_tb-'.$this->_params['root_id']);
        $id = (!preg_match('/^code/', $this->_params['action'], $matches)) ? $this->_params['root_id'] : $this->_params['id'];

        $this->_Upload = new Upload();
        $this->_NewsCatTb = new NewsCatTb();
        $this->_NewsTagTb = new NewsTagTb();
        $this->_MenuPublicTb = new MenuPublicTb();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_session = new Container($this->_params['__CONTROLLER__']);
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');

        if ($id) {
            $this->_field = $this->_NewsCatTb->getItem(array('id' => $id))['define_item'];
            $this->_field['icon-link-web'] = $this->_field['icon-link-web'] ?? 'none';
            $this->_field['validate']['required'] = array_merge(
                array('name' => $this->_field['name']),
                $this->_field['validate']['required'] ? $this->_field['validate']['required'] : array()
            );
            $this->_field['validate']['translate'] = isset($this->_field['validate']['translate']) ? $this->_field['validate']['translate'] : $this->identity()->langfield;
            // Kiểm tra form nhập liệu
            foreach ($this->_field['validate']['required'] as $name => $title) {
                if ($this->_field[$name] || strpos($name, 'multi_input') > -1) {
                    $name = ($this->identity()->lang && (in_array($name, $this->_field['validate']['translate']))) ? 'translate['.$this->identity()->lang.']['.$name.']' : $name;
                    $this->_params['checkForm']['required'][$name] = $this->_translator->translate($title);
                }
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
        }

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $data = array('_field' => $this->_field);
        $data['_field']['special'] = array_filter($data['_field']['special'], function($item) { return $item['name'] && ($item['list'] || (!$item['list'] && !$item['detail'])); });

        // Lọc danh mục
        if ($this->_field['level'] > 1) {
            $data['filter'] = $this->_NewsCatTb->listItem(array('root_id' => $this->_params['root_id'],'level' => '< 2'));
            if ($this->getRequest()->isPost()) {
                return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
            }
            if ($this->getRequest()->isGet()) {
                $data['query'] = $this->params()->fromQuery();
            }
        }

        $data['list'] = $this->_renderer->cateSortNested(
            $this->_NewsCatTb->listItem(array(
                'root_id' => $data['query']['parent'] ? $data['query']['parent'] : $this->_params['root_id'],
                'count' => true,
                'language' => ($this->identity()->lang) ? true : false
            )),
            array('parent' => $data['query']['parent'] ? $data['query']['parent'] : $this->_params['root_id'], 'type' => 'sort')
        );

        if ($this->_field['icon-link-web'] != 'none') {
            $config = $this->getServiceLocator()->get('Config');
            $router = array_shift(array_filter($config['router']['routes'], function ($v){
                return $v['key'] == $this->_field['icon-link-web'] && $v['options']['defaults']['action'] == 'list'.array_shift(explode('.', $this->_field['action']));
            }));
            if ($router) {
                $data['router'] = array(
                    'spec' => $router['options']['spec'],
                    'params' => array('%format%' => $router['format'])
                );
            } else {
                $data['_field']['icon-link-web'] = 'none';
            }
        }

        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Danh mục").' '.$this->_translator->translate($this->_field['menu']));
        $data['_params'] = $this->params()->fromRoute();

        $this->_session->offsetSet('query', $this->params()->fromQuery());

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view;
    }

    public function fieldAction()
    {
        // Xóa phần đầu của mảng
        $this->_field = $this->_renderer->removeElementArray($this->_field, array('multi_image','multi_input','multi_file','multi_detail','section'));

        $data = array(
            '_field' => $this->_field,
            'item' => array(),
            'linkList' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']),
                array('query' => $this->_session['query'])
            )
        );
        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            $title = $this->_translator->translate("Chỉnh sửa");
            unset($this->_params['checkForm']['required']['thumbnail']);
            $data['item'] = $this->_NewsCatTb->getItem(array('id' => $this->_params['id']));
            // Dữ liệu translate
            if ($this->identity()->lang) {
                $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
            }
            // Danh sách id phân loại của danh mục cấp cha
            if ($data['item']['parent'] != $this->_params['root_id']) {
                $list_label_id = array('list_id' => explode(',', str_replace(':','',$this->_NewsCatTb->getItem(array('id' => $data['item']['parent']))['list_label_id'])));
            } else {
                $list_label_id = array('list_id' => explode(',', str_replace(':','',$data['item']['list_label_id'])), 'status' => 0);
            }
        } else {
            $list_label_id = array('status' => 0);
        }

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
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
                if ($data['item']['level']) {
                    $this->_params['post']['level'] = $data['item']['level'];
                }
                \Backend\View\Helper\FormatData::multiData($this->_params['post'], array('field' => $this->_field, 'lang' => $this->identity()->lang, 'langlist' => $this->identity()->langlist));
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData($this->_field);

                // Xử lý ảnh
                if ($this->_params['checkForm']['image']) {
                    $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field, array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'newscat'.$this->_params['id']);
                }
                // Xử lý file
                if ($this->_params['checkForm']['file']) {
                    $this->_Upload->uploadFile($this->_params['post'], $this->_params['checkForm']['file']);
                }
                $this->_params['post']['parent'] = ($this->_params['post']['parent']) ? $this->_params['post']['parent'] : $this->_params['root_id'];
                if ($this->_field['level']) {
                    $level = $this->_NewsCatTb->getItem(array('id' => $this->_params['post']['parent'], 'columns' => array('id','parent','level')));
                    $this->_params['post']['level'] = ($level['parent'] > 0) ? ($level['level'] + 1) : 1;
                }
                if (isset($this->_params['post']['list_label_id']) && $this->_params['post']['level'] == 1) {
                    // Chỉ thay đổi khi danh mục là cấp 1
                    $NewsLabelTb = new NewsLabelTb();
                    foreach ($this->_params['post']['list_label_id']  as $id) {
                        $NewsLabelTb->saveData(array('id' => $id, 'post' => array('status' => 1)));
                    }
                    // Xóa phân loại đã được map với danh mục cấp con
                    if ($this->_params['id'] && $data['item']['list_label_id']) {
                        $labelIDs = explode(',', str_replace(':','',$data['item']['list_label_id']));
                        $labelIDs = array_diff($labelIDs, ($this->_params['post']['list_label_id']) ? $this->_params['post']['list_label_id'] : array());
                        if ($labelIDs) {
                            $list_cat = $this->_NewsCatTb->listItem(array('root_id' => $this->_params['id'], 'list_label_id' => $labelIDs));
                            foreach ($list_cat as $value) {
                                $value['list_label_id'] = array_diff(explode(',', str_replace(':','',$value['list_label_id'])), $labelIDs);
                                $this->_NewsCatTb->saveData(array('id' => $value['id'],'post' => array('list_label_id' => $value['list_label_id'])));
                            }
                            foreach ($labelIDs as $id) {
                                $NewsLabelTb->saveData(array('id' => $id, 'post' => array('status' => 0)));
                            }
                        }
                    }
                }

                // Lưu dữ liệu
                $id = $this->_NewsCatTb->saveData($this->_params, $this->_field);

                // Thêm/sửa menu_public_tb
                $menuParent = $this->_MenuPublicTb->getItem(array('active' => 'news-list-'.$this->_params['root_id'], 'link' => '-'.$this->_params['post']['parent'].'-'.$this->_field['action']));
                $menu = ($this->_params['id']) ? $this->_MenuPublicTb->getItem(array('active' => 'news-list-'.$this->_params['root_id'], 'link' => '-'.$id.'-'.$this->_field['action'])) : '';

                $arrs['post'] = $this->_params['post'];
                $arrs['post']['active'] = $menuParent['active'];
                $arrs['post']['parent'] = $menuParent['id'];
                $arrs['post']['link'] = ($this->_params['post']['slug'] ? $this->_params['post']['slug'] : $this->_renderer->toSlug($this->_params['post']['name'])).'-'.$id.'-'.$this->_field['action'];
                $arrs['post']['fixed'] = 1;
                if ($menu) {
                    $arrs['id'] = $menu['id'];
                }
                $arrs['item_id'] = $this->_MenuPublicTb->saveData($arrs);

                // Lưu dữ liệu translate
                if ($this->identity()->lang) {
                    $this->_params['lang'] = $arrs['lang'] = $this->identity()->lang;
                    $this->_params['langlist'] = $arrs['langlist'] = $this->identity()->langlist;
                    $this->_params['item_id'] = $id;
                    $this->_LangMultiTbController->saveData($this->_params);
                    // Lưu dữ liệu translate cho menu_public_tb
                    $arrs['__CONTROLLER__'] = 'menu_public_tb';
                    $arrs['post']['action'] = $this->_field['action'];
                    $arrs['display'] = 'all';
                    $arrs['menu_link_id'] = $id;
                    $this->_LangMultiTbController->saveData($arrs);
                }

                if ($this->_params['post']['continue']) {
                    $data['continue'] = $this->_params['post']['continue'];
                } else {
                    return $this->redirect()->toUrl($data['linkList']);
                }
            }
            $data['item'] = ($data['error']) ? $this->_params['post'] : array();
        }

        // Danh sách danh mục
        $listCate = $this->_renderer->cateSortNested(
            $this->_NewsCatTb->listItem(array(
                'root_id' => $this->_params['root_id'],
                'columns' => array('id','name','parent','level'),
                'level' => '< '.($data['item']['level'] ? $data['item']['level'] : $this->_field['level']),
                'deny_id' => ($this->_params['id']) ? array($this->_params['id']) : ''
            )),
            array('parent' => $this->_params['root_id'], 'type' => 'sort')
        );

        // Danh sách tags
        if ($this->_field['list_tag_id']) {
            $listTags = $this->_NewsTagTb->listItem(array('display' => 1, 'orderby' => array('name ASC'), 'columns' => array('id','name')));
        }

        // Các field và thứ tự hiển thị
        $fields = array(
            'parent' => array('label' => 'Danh mục','class' => 'col-md-offset-6 col-md-pull-6', 'list' => $listCate),
            'name','title','description','slug','desc_short','keyword','multi_input','thumbnail','multi_image','multi_file',
            'list_tag_id' => array('list' => $listTags),
            'detail','multi_detail',
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
                        $rule => ($rule != 'root_id' && $data['item']['parent']) ? $data['item']['parent'] : $this->_params['root_id']
                    )
                );
                if ($rule != 'root_id') {
                    $fields['parent']['attr'][] = 'FormValidation.changeRules(this,\'#form-add\',\''.$name.'\',\''.$rule.'\')';
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
            if (is_array($this->_field['list_label_id'])) {
                if (($this->_field['list_label_id']['mapping'] == 'multi') && (empty($data['item']) || $data['item']['level'] == 1)) {
                    $list_label_id = array();
                }
                $this->_field['list_label_id'] = $this->_field['list_label_id']['label'];
            }
            $NewsLabelTb = new NewsLabelTb();
            $fields['list_label_id'] = array(
                'type' => 'checkbox',
                'input' => true,
                'value' => explode(',', str_replace(':','',$data['item']['list_label_id'])),
                'list' => $NewsLabelTb->listItem(array_merge(array('display' => 1), $list_label_id))
            );
            $fields['parent']['attr'][] = '_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'label','root_id' => $this->_params['root_id'])),
                'position' => 'list_label_id',
            ), JSON_UNESCAPED_SLASHES)).', _HTChange.select(this))';
        }
        if ($this->_field['list_news_id']) {
            $NewsTb = new NewsTb();
            $fields['list_news_id'] = array(
                'type' => 'multi',
                'value' => explode(',', str_replace(':','', $data['item']['list_news_id'])),
                'list' => array(),
                'cate' => array(
                    'list' => array(),
                    'root_id' => implode(',',$this->_field['list_news_id']),
                    'attr' => 'onchange="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'relatedNews','id' => $this->_params['id'], 'root_id' => $this->_params['root_id'])),
                                'position' => 'list_news_id',
                            ), JSON_UNESCAPED_SLASHES)).', _HTChange.selectRelated(this, \'list_news_id\'));"'
                )
            );
            if ($this->_field['list_news_ajax']) {
                $fields['list_news_id']['loadData'] = 'onclick="_HTHelper.loadHtml('.htmlspecialchars(json_encode(array(
                                    'url' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'relatedNews','id' => $this->_params['id'], 'root_id' => $this->_params['root_id'])),
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
        if ($fields['parent']['attr']) {
            $fields['parent']['attr'] = 'onchange="'.implode(', ', $fields['parent']['attr']).'"';
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

        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate("Danh mục").' '.$this->_translator->translate($this->_field['menu']).'/'.$title);
        $data['_params'] = array_merge($this->_params, $this->params()->fromRoute());

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view->setTemplate('backend/field.phtml');
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            $post = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_NewsCatTb->saveData(array('id' => $id, 'post' => $post));
                if (isset($post['sort']) || isset($post['special'])) {
                    // sort || display menu_public_tb liên quan
                    $menu = $this->_MenuPublicTb->getItem(array('active' => 'news-list-'.$this->_params['root_id'],'link' => '-'.$id.'-'.$this->_field['action']));
                    if ($menu) {
                        if (isset($post['special']['menu'])) {
                            $post['display'] = $post['special']['menu'];
                        }
                        $this->_MenuPublicTb->saveData(array('id' => $menu['id'],'post' => $post));
                    }
                }
            }
        }
        return $this->getResponse();
    }

    public function existsAction()
    {
        if ($this->getRequest()->isPost()) {
            echo $this->_NewsCatTb->listItem($this->params()->fromPost()) ? true : false;
        }
        return $this->getResponse();
    }

    public function labelAction()
    {
        $data = array();
        $item = $this->_NewsCatTb->getItem(array('id' => $this->params()->fromPost('parent')));
        $arrs['display'] = 1;
        if ($item) {
            $arrs['list_id'] = explode(',', str_replace(':','',$item['list_label_id']));
            $data['selected'] = explode(',', str_replace(':','',$item['list_label_id']));
        } else {
            $arrs['status'] = 0;
        }

        // Danh sách thương hiệu
        $NewsLabelTb = new NewsLabelTb();
        $data['list'] = $NewsLabelTb->listItem($arrs);

        // Gọi view và hiển thị dữ liệu
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

        if ($this->_params['id']) {
            $data['selected'][] = $this->_params['id'];
        }

        foreach (explode(',', $this->params()->fromPost('cat_related_id')) as $root_id) {
            $data['list'] = array_merge($data['list'], $NewsTb->listItem(array('root_id' => $root_id, 'deny_id' => $data['selected'], 'columns' => array('id','name'))));
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

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            foreach (explode(',',$this->_params['id']) as $id) {
                if ($this->_params['post']['check']) {
                    $check = $this->_NewsCatTb->listItem(array('check' => $id,'count' => true));
                    echo (count($check) == 1 && $check[0]['count'] == 0) ? 0 : 1;
                } else {
                    // Xóa item || move hình ảnh qua thư mục uploads/removes
                    $item = $this->_NewsCatTb->getItem(array('id' => $id));
                    $this->_Upload->deleteImage($item, $this->_params['checkForm']['image'], $this->_field);
                    $this->_NewsCatTb->deleteItem(array('id' => $id));
                    // Thay đổi trang thái news_label_tb
                    if ($item['level'] == 1) {
                        $NewsLabelTb = new NewsLabelTb();
                        foreach (explode(',', str_replace(':','',$item['list_label_id'])) as $label_id) {
                            if($label_id) {
                                $NewsLabelTb->saveData(array('id' => $label_id, 'post' => array('status' => 0)));
                            }
                        }
                    }
                    // Xóa menu_public_tb liên quan
                    $menu = $this->_MenuPublicTb->getItem(array(
                        'active' => 'news-list-'.(($this->_params['root_id'] == 18) ? $id : $this->_params['root_id']),
                        'link' => '-'.$id.'-'.$this->_field['action']));
                    if ($menu) {
                        $this->_MenuPublicTb->deleteItem(array('id' => $menu['id']));
                    }
                    // Xóa ngôn ngữ
                    if ($this->identity()->lang) {
                        $this->_LangMultiTbController->deleteItem(array('item_id' => $id, 'type' => $this->_params['__CONTROLLER__']));
                        if ($menu) {
                            $this->_LangMultiTbController->deleteItem(array('item_id' => $menu['id'], 'type' => 'menu_public_tb'));
                        }
                    }
                }
            }
        }
        return $this->getResponse();
    }

    public function codelistAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', 'Trang list - code');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_NewsCatTb->listItem(array('parent' => 0)
        ));

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }

    public function codefieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', 'Trang list - code/Cấu hình dữ liệu');

        $MenuCodeTb = new MenuCodeTb();
        $data = array(
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_field ? $this->_field : array(),
            'm_label' => $MenuCodeTb->getItem(array('id' => 33, 'columns' => array('id','name'))),
            'action' => array('21.html'=>'list21','22.html'=>'list22','23.html'=>'list23','24.html'=>'list24'),
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => $this->_params['id'] ? 'list' : 'codelist','root_id' => $this->_params['id'] ? $this->_params['id'] : $this->_params['root_id']))
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post']['define_item'] = $this->params()->fromPost();
            $this->_params['post']['define_item']['validate'] = $this->_field['validate'] ? $this->_field['validate'] : array();
            $this->_params['post']['define_item']['special'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_item']['special'], 'order');
            $this->_params['post']['define_item']['multi_input'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_item']['multi_input'], 'order');
            $this->_params['post']['define_item']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_item']['multi_image'], 'order');
            $this->_params['post']['define_item']['multi_detail'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_item']['multi_detail'], 'order');
            $this->_params['post']['define_item']['multi_file'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define_item']['multi_file'], 'order');

            $this->_params['post']['name'] = $this->_params['post']['define_item']['menu'];
            $this->_params['post']['level'] = $this->_params['post']['define_item']['level'];
            if ($this->_params['post']['level'] > 1) {
                $this->_params['post']['define_item']['parent'] = $this->_params['post']['level'];
            }

            // Thêm/xóa hình theo kích thước khi chỉnh sửa kích thước
            if ($data['item']['thumbnail']) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $data['item']['thumbnail'],
                    'sizesNews' => $this->_params['post']['define_item']['thumbnail'],
                    'module' => 'single_newscat'.$this->_params['id']
                ));
            }
            if ($data['item']['multi_image']) {
                array_shift($this->_field['multi_image']);
                array_shift($this->_params['post']['define_item']['multi_image']);
                foreach ($this->_field['multi_image'] as $i => $value) {
                    $this->_Upload->updateImage(array(
                        'sizesOld' => $value['size'],
                        'sizesNews' => $this->_params['post']['define_item']['multi_image'][$i]['size'],
                        'module' => 'multi_newscat'.$this->_params['id'].$i
                    ));
                }
                $this->_params['post']['define_item']['multi_image'] = $this->params()->fromPost()['multi_image'];
            }

            // Lưu dữ liệu
            $id = $this->_NewsCatTb->saveData($this->_params);

            // Thêm/sửa menu_public_tb
            $arrs['post'] = array(
                'name' => $this->_params['post']['name'],
                'level' => $this->_params['post']['define_item']['level'],
                'link' => $this->_renderer->toSlug($this->_params['post']['name']).'-'.$id.'-'.$this->_params['post']['define_item']['action'],
            );
            $menu = ($this->_params['id']) ? $this->_MenuPublicTb->getItem(array('active' => 'news-list-'.$id,'parent' => 0)) : '';
            if ($menu) {
                // Change link based on config action for child menu
                if ($this->_params['post']['define_item']['action'] != $this->_field['action']) {
                    foreach ($this->_MenuPublicTb->listItem(array('active' => 'news-list-'.$id)) as $value) {
                        $this->_MenuPublicTb->saveData(array('id' => $value['id'], 'post' => array('link' => str_replace($this->_field['action'], $this->_params['post']['define_item']['action'], $value['link']))));
                    }
                }

                // Deny update data when invalid format link or name not equal
                $arrs['id'] = $menu['id'];
                preg_match('/(\d+)-(\d+\.html)$/', $menu['link'], $matches);
                if ($menu['name'] != $data['item']['menu'] || empty($matches)) {
                    $arrs['post']['link'] = $menu['link'];
                    $arrs['post']['name'] = $menu['name'];
                }
                // Lưu dữ liệu translate
                if ($this->identity()->lang) {
                    $LangMultiTb = new LangMultiTb();
                    $menu['translate'] = $LangMultiTb->getItem(array('item_id' => $menu['id'],'type' => 'menu_public_tb', 'language' => $this->identity()->lang));
                    if ($menu['translate']) {
                        $menu['translate']['translate'] = json_decode($menu['translate']['translate'], true);
                        $menu['translate']['translate']['name'] = $arrs['post']['name'];
                        $menu['translate']['translate']['link'] = $arrs['post']['link'];
                        $menu['translate']['translate']['slug'] = $this->_renderer->toSlug($this->_params['post']['name']);
                        $menu['translate']['translate']['slugLang'][$this->identity()->lang] = $this->_renderer->toSlug($this->_params['post']['name']);

                        $LangMultiTb->saveData(array(
                            'id' => $menu['translate']['id'],
                            'post' => array(
                                'name' => $arrs['post']['name'],
                                'translate' => json_encode($menu['translate']['translate'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE)
                            )
                        ));
                    }
                }
            } else {
                $arrs['post']['active'] = 'news-list-'.$id;
                $arrs['post']['title'] = $arrs['post']['description'] = $arrs['post']['keyword'] = $this->_params['post']['name'];
            }
            $this->_MenuPublicTb->saveData($arrs);

            return $this->redirect()->toUrl($data['linkBack']);
        }

        // Các field và thứ tự hiển thị
        $SectionTb = new SectionTb();
        $ProductCatTb = new ProductCatTb();
        $defines = array(
            'input' => array('name','desc_short','detail','thumbnail'),
            'radio' => array('icon-link-web' => array('label' => 'Hiển thị icon link web','list' => array('none' => 'Không hiển thị', 'news-list' => 'Hiển thị'))),
            'option' => array('title','description','keyword','slug','list_tag_id','embed'),
            'action' => array('display','sort','add-delete'),
            'select' => array(
                'level',
                'list_news_id' => array(
                    'label' => '',
                    'editable' => array(
                        'name' => 'list_news_title',
                        'value' => $data['item']['list_news_title'] ?? 'Chọn bài viết liên quan',
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
                        'value' => $data['item']['list_product_title'] ?? 'Chọn sản phẩm liên quan',
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
            'multi' => array(
                'special','multi_input','multi_image','multi_file','multi_detail',
                'section' => array(
                    'label' => $MenuCodeTb->getItem(array('id' => 14, 'columns' => array('id','name')))['name'],
                    'list' => array_map(function ($item) {
                        return array('id' => $item['id'], 'name' => $item['menu']);
                    }, $SectionTb->listItem(array('display' => 1, 'columns' => array('id', 'menu')))),
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
                'options' => array('root_id' => 'Theo menu', 'parent' => 'Theo danh mục'),
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
                    'thumbnail' => $this->_field['thumbnail'] ? 'Ảnh đại diện' : ''
                )
            );
        }
        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define_item'] = $this->_field;
            $this->_params['post']['define_item']['validate'] = $this->params()->fromPost();
            $this->_params['post']['define_item']['validate']['translate'] = array_key_exists('translate', $this->params()->fromPost()) ?  $this->params()->fromPost('translate') : array();
            $this->_NewsCatTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}