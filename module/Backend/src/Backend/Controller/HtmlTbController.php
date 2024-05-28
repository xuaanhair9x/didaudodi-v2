<?php
namespace Backend\Controller;

use Backend\Controller\LangMultiTbController;
use Backend\Controller\SubController;
use Backend\Model\CommentTb;
use Backend\Model\HtmlTb;
use Backend\Model\LangMultiTb;
use Backend\Model\MenuPublicTb;
use Backend\View\Helper\CheckForm;
use Backend\View\Helper\SortByColumn;
use Backend\View\Helper\SortField;
use Backend\View\Helper\ThumbImages\Upload;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class HtmlTbController extends AbstractActionController
{
    protected $_HtmlTb;
    protected $_MenuPublicTb;
    protected $_SubController;
    protected $_LangMultiTbController;
    protected $_Upload;
    protected $_SortField;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_Upload = new Upload();
        $this->_HtmlTb = new HtmlTb();
        $this->_MenuPublicTb = new MenuPublicTb();
        $this->_SubController = new SubController();
        $this->_LangMultiTbController = new LangMultiTbController();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');

        if ($this->_params['id']) {
            $this->_field = $this->_HtmlTb->getItem(array('id' => $this->_params['id']))['define'];
            $this->_columns = $this->_field['columns'];
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

        $this->_SortField = new SortField($this->_field, $this->_columns, array('lang' => $this->identity()->lang, 'langlist' => $this->identity()->langlist));

        return parent::onDispatch($e);
    }

    public function fieldAction()
    {
        $data = array(
            '_field' => $this->_field,
            'sortFields' => $this->_columns['detail'],
            'item' => $this->_HtmlTb->getItem(array('id' => $this->_params['id']))
        );

        // Dữ liệu translate
        if ($this->identity()->lang) {
            $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
        }

        // Xóa phần đầu của mảng
        $this->_field = $this->_renderer->removeElementArray($this->_field, array('multi_image','multi_input','multi_file','multi_detail','sub'));

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

                    // Xử lý ảnh
                    if ($this->_params['checkForm']['image']) {
                        $this->_Upload->uploadImage($this->_params['post'], $this->_params['checkForm']['image'], array_merge($this->_field, array('listLang' => $this->identity()->langlist, 'lang' => $this->identity()->lang)), $data['item'], 'html'.$this->_params['id']);
                    }
                    // Xử lý file
                    if ($this->_params['checkForm']['file']) {
                        $this->_Upload->uploadFile($this->_params['post'], $this->_params['checkForm']['file']);
                    }
                    // Lưu dữ liệu
                    $id = $this->_HtmlTb->saveData($this->_params, $this->_field);
                    $data['success'] = $this->_translator->translate("Bạn đã chỉnh sửa thành công!");

                    // Lưu dữ liệu translate
                    if ($this->identity()->lang) {
                        $this->_params['lang'] = $this->identity()->lang;
                        $this->_params['langlist'] = $this->identity()->langlist;
                        $this->_params['item_id'] = $id;
                        $this->_params['display'] = 'all';
                        $this->_LangMultiTbController->saveData($this->_params);
                    }

                    // Xử lý dữ liệu bài viết con
                    if ($this->_field['sub']) {
                        $this->_SubController->saveData(array(
                            'field' => $this->_field,
                            'params' => $this->_params,
                            'object' => $this->_HtmlTb,
                            'lang' => $this->identity()->lang,
                            'langlist' => $this->identity()->langlist,
                            'parent_id' => $id,
                            'prefix' => 'hsub'
                        ));
                    }
                }

                // Load lại dữ liêu sau khi lưu
                if ($data['error']) {
                    $data['item'] = $this->_params['post'];
                } else {
                    $data['item'] = $this->_HtmlTb->getItem(array('id' => $this->_params['id']));
                    if ($this->identity()->lang) {
                        $data['item']['translate'] = $this->_LangMultiTbController->listItem($this->_params);
                    }
                }
            }
        }

        // Bài viết con
        if ($this->_field['sub']) {
            $this->_SubController->listItem(array(
                'field' => $this->_field,
                'params' => $this->_params,
                'object' => $this->_HtmlTb,
                'lang' => $this->identity()->lang,
                'langlist' => $this->identity()->langlist
            ), $data);
        }

        // Các field và thứ tự hiển thị
        $fields = array(
            'name','title','description','desc_short','keyword','multi_input','thumbnail','multi_image','multi_file','detail','multi_detail','sub',
            'embed' => array('position' => array(
                'bbot' => $this->_translator->translate("Trên").' </body>',
                'off' => $this->_translator->translate("Tắt")
            ))
        );

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
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['menu']));
        $data['_params'] = array_merge($this->_params, $this->params()->fromRoute());

        // Gọi view và hiển thị dữ liệu
        $view = new ViewModel($data);
        return $view;
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_HtmlTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                // Xóa item || move hình ảnh qua thư mục uploads/removes
                $item = $this->_HtmlTb->getItem(array('id' => $id));
                $this->_Upload->deleteImage($item, $this->_params['checkForm']['image'], $this->_field);
                $this->_HtmlTb->deleteItem(array('id' => $id));
                // Xóa menu_public_tb liên quan
                $menu = $this->_MenuPublicTb->getItem(array('active' => 'html-page-'.$id, 'link' => '-'.$id.'-'.$this->_field['action']));
                if ($menu) {
                    $this->_MenuPublicTb->deleteItem(array('id' => $menu['id']));
                }
                // Xóa comment_tb liên quan
                if ($this->_field['comment']) {
                    $CommentTb = new CommentTb();
                    $CommentTb->deleteItem(array('article_id' => $id, 'type' => $this->_params['__CONTROLLER__']));
                }
                // Xóa ngôn ngữ liên quan
                if ($this->identity()->lang) {
                    $this->_LangMultiTbController->deleteItem(array('item_id' => $id, 'type' => $this->_params['__CONTROLLER__']));
                    if ($menu) {
                        $this->_LangMultiTbController->deleteItem(array('item_id' => $menu['id'], 'type' => 'menu_public_tb'));
                    }
                }
                // Xóa sản phẩm phụ
                array_shift($this->_field['sub']);
                if ($this->_field['sub']) {
                    $this->_SubController->deleteItem(array(
                        'field' => $this->_field,
                        'params' => $this->_params,
                        'object' => $this->_HtmlTb,
                        'lang' => $this->identity()->lang
                    ));
                }
            }
        }
        return $this->getResponse();
    }

    public function sortfieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_field['menu'] . '/Sắp xếp dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkBack' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'],'action' => 'field','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])
            ),
            'onlyAllowSort' => true,
            'pages' => array(
                array(
                    'name' => 'detail',
                    'fixed' => true,
                    'columns' => $this->_SortField->getFields('detail'),
                ),
             ),
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['post']['define'] = $this->_field;
            $this->_params['post']['define']['columns']['detail'] = \Backend\View\Helper\Sort::sortByKey($this->params()->fromPost('detail'));

            $this->_HtmlTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $view = new ViewModel($data);
        return $view->setTemplate('partials/columns.phtml');
    }

    public function codelistAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', 'Các trang đơn');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'list' => $this->_HtmlTb->listItem(array('columns' => array('id', 'sort', 'display', 'define')))
        );

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }

    public function codefieldAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', 'Các trang đơn/Cấu hình dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_field ? $this->_field : array(),
            'action' => array('31.html'=>'page31','32.html'=>'page32','33.html'=>'page33','34.html'=>'page34','36.html'=>'page36'),
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => $this->_params['id'] ? 'field' : 'codelist','id' => $this->_params['id'],'root_id' => $this->_params['root_id']))
        );

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post']['define'] = $this->params()->fromPost();
            $this->_params['post']['define']['columns'] = $this->_columns ?? array();
            $this->_params['post']['define']['validate'] = $this->_field['validate'] ? $this->_field['validate'] : array();
            $this->_params['post']['define']['multi_input'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_input'], 'order');
            $this->_params['post']['define']['multi_image'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_image'], 'order');
            $this->_params['post']['define']['multi_detail'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_detail'], 'order');
            $this->_params['post']['define']['multi_file'] = \Backend\View\Helper\Sort::sortByKey($this->_params['post']['define']['multi_file'], 'order');

            // Thêm/xóa hình theo kích thước khi chỉnh sửa kích thước
            if ($data['item']['thumbnail']) {
                $this->_Upload->updateImage(array(
                    'sizesOld' => $data['item']['thumbnail'],
                    'sizesNews' => $this->_params['post']['define']['thumbnail'],
                    'module' => 'single_html'.$this->_params['id']
                ));
            }
            if ($data['item']['multi_image']) {
                array_shift($this->_field['multi_image']);
                array_shift($this->_params['post']['define']['multi_image']);
                foreach ($this->_field['multi_image'] as $i => $value) {
                    $this->_Upload->updateImage(array(
                        'sizesOld' => $value['size'],
                        'sizesNews' => $this->_params['post']['define']['multi_image'][$i]['size'],
                        'module' => 'multi_html'.$this->_params['id'].$i
                    ));
                }
                $this->_params['post']['define']['multi_image'] = $this->params()->fromPost()['multi_image'];
            }

            // Bài viết con
            $this->_params['post']['define'] = array_merge(
                $this->_params['post']['define'],
                $this->_SubController->codefield(array(
                    'field' => $this->_field,
                    'params' => $this->_params['post']['define'],
                    'parent' => 19,
                    'item' => $data['item'],
                    'active' => 'html_sub-'.$this->_params['root_id'],
                    'image' => 'single_hsub'
                ))
            );

            // Lưu dữ liệu
            $id = $this->_HtmlTb->saveData($this->_params);

            // Thêm/sửa menu_public_tb
            $arrs = array();
            $arrs['post'] = array(
                'name' => $this->_params['post']['define']['menu'],
                'link' => $this->_renderer->toSlug($this->_params['post']['define']['menu']).'-'.$id.'-'.$this->_params['post']['define']['action'],
            );
            $menu = ($this->_params['id']) ? $this->_MenuPublicTb->getItem(array('active' => 'html-page-'.$id,'parent' => 0)) : '';
            if ($menu) {
                $arrs['id'] = $menu['id'];
                // Deny update data when invalid format link or name not equal
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
                $arrs['post']['active'] = 'html-page-'.$id;
                $arrs['post']['title'] = $arrs['post']['description'] = $arrs['post']['keyword'] = $this->_params['post']['define']['menu'];
            }
            $this->_MenuPublicTb->saveData($arrs);

            return $this->redirect()->toUrl($data['linkBack']);
        }

        $defines = array(
            'input' => array('name','desc_short','detail','thumbnail'),
            'option' => array(
                'label' => array(
                    'label' => 'Tùy chọn: <a href="javascript:;" class="mt-sweetalert-note" data-message="Title SEO, Description SEO, Keyword <b>TẮT</b> khi vị trí ở <b>MENU</b>"><i class="fa fa-question-circle" aria-hidden="true"></i></a>'
                ),
                'title' => array('default' => 0),
                'description' => array('default' => 0),
                'keyword' => array('default' => 0),
                'embed'
            ),
            'action' => array('comment'),
            'multi' => array('multi_input','multi_image','multi_detail','multi_file',
                'sub' => array(
                    'label' => 'Bài viết con',
                    'field' => array('name','desc_short','detail','icon','thumbnail','multi_input','multi_image')
                )
            )
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
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_field['menu'].' '.$this->_translator->translate($this->_cate['name']).'/Định nghĩa dữ liệu');

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'field','id' => $this->_params['id'],'root_id' => $this->_params['root_id'])),
            'required' => array(
                'rules' => $this->_field['validate']['required'],
                'fields' => array(
                    'desc_short' => $this->_field['desc_short'],
                    'title' => $this->_field['title'],
                    'description' => $this->_field['description'],
                    'keyword' => $this->_field['keyword'],
                    'thumbnail' => ($this->_field['thumbnail']) ? 'Ảnh đại diện' : ''
                )
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
                    'thumbnail' => ($this->_field['thumbnail']) ? 'Ảnh đại diện' : ''
                )
            );
        }
        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post']['define'] = $this->_field;
            $this->_params['post']['define']['validate'] = $this->params()->fromPost();
            $this->_params['post']['define']['validate']['translate'] = array_key_exists('translate', $this->params()->fromPost()) ?  $this->params()->fromPost('translate') : array();
            $this->_HtmlTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}