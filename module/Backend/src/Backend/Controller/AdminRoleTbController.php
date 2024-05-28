<?php
namespace Backend\Controller;

use Backend\Model\AdminRoleTb;
use Backend\Model\MenuCodeTb;
use Backend\View\Helper\CheckForm;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class AdminRoleTbController extends AbstractActionController
{
    protected $_AdminRoleTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_params;
    protected $_field;
    protected $_module;

    public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_AdminRoleTb = new AdminRoleTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->_field['define'] = array('name' => $this->_translator->translate("Tên nhóm quyền"), 'permission' => $this->_translator->translate("Quyền truy cập"));
        $this->_module = $this->_MenuCodeTb->listItem(array('parent' => 0,'display' => 1,'deny_id' => array(1),'columns' => array('id','name')));
        foreach ($this->_module as $i => $value) {
            $this->_module[$i]['name'] = $this->_translator->translate($value['name']);
        }

        // Kiểm tra form nhập liệu
        $this->_params['checkForm'] = array('required' => array('name' => $this->_translator->translate("Tên nhóm quyền")));

        return parent::onDispatch($e);
    }

    public function listAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));
        $data = array(
            '_params' => $this->params()->fromRoute(),
            'module' => $this->_module,
            'list' => $this->_AdminRoleTb->listItem((!$this->identity()->supper) ? array('deny_id' => array(1)) : '')
        );

        $view = new ViewModel($data);
        return $view;
    }

    public function fieldAction()
    {
        $data = array(
            'item' => array(),
            'linkList' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );
        $title = $this->_translator->translate("Thêm mới");
        if ($this->_params['id']) {
            $title = $this->_translator->translate("Chỉnh sửa");
            $data['item'] = $this->_AdminRoleTb->getItem(array('id' => $this->_params['id']));
        }

        // Thực thi ghi dữ liệu
        if ($this->getRequest()->isPost()) {
            $this->_params['post'] = $this->params()->fromPost();
            $validate = new CheckForm($this->_params);
            if ($validate->isError() == true) {
                $data['error'] = $validate->getMessagesError();
            } else {
                // Lấy giá trị trả về.
                $this->_params = $validate->getData();

                // Lưu dữ liệu
                $this->_AdminRoleTb->saveData($this->_params);
                return $this->redirect()->toUrl($data['linkList']);
            }
            $data['item'] = $data['error'] ? $this->_params['post'] : array();
        }

        // Các field và thứ tự hiển thị
        $fields = array('name');
        foreach ($fields as $field => $value) {
            $field = is_array($value) ? $field : $value;
            if (!empty($this->_field['define'][$field])) {
                $data['elements'][$field] = array_merge(array(
                    'label' => $this->_field['define'][$field],
                    'name' => $field,
                    'value' => $data['item'][$field]
                ), is_array($value) ? $value : array());
            }
        }

        // Thiết lập các tham số cần thiết cho view
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.$title);
        $data['_params'] = $this->params()->fromRoute();

        // Update identity menu_code
        if ($this->params()->fromQuery('permitAdmin')) {
            $view = new ViewModel();
            $view->setTemplate('layout/sidebar.phtml');
            $view->setTerminal(true);
            $html = $this->getServiceLocator()->get('Zend\View\Renderer\PhpRenderer')->render($view);
        }

        $permission = $data['item']['permission'];

        foreach ($this->identity()->menu_code as $i => $value) {
            // Module
            if (!in_array($value['id'], array(1,11,30))) {
                $value['active'] = isset($this->identity()->modules[$value['id']]) ? $this->identity()->modules[$value['id']] : $value['active'];
                $data['menu'][$i] = array(
                    'text' => $value['name'],
                    'icon' => $value['icon'],
                    'state' => array('opened' => true),
                    'data' => array('resource' => $value['active'])
                );
                // Resource
                if (!in_array($value['id'], array(6)) && $value['child']) {
                    foreach ($value['child'] as $j => $vl_child) {
                        if (!in_array($vl_child['id'], array(18,27)) || isset($vl_child['skip'])) {

                            $data['menu'][$i]['children'][] = array(
                                'text' => $vl_child['name'],
                                'data' => array('resource' => $vl_child['active']),
                                'state' => array('selected' => ($vl_child['skip']) ? false : $permission[$value['active']][$vl_child['active']])
                            );
                            // Group resource
                            if ($vl_child['skip']) {
                                $define = json_decode($vl_child['define_'.$value['active']], true);
                                if ($vl_child['child']) {
                                    $data['menu'][$i]['children'][$j]['icon'] = 'icon-folder';
                                    foreach ($vl_child['child'] as $k => $vl_sub) {
                                        $data['menu'][$i]['children'][$j]['children'][$k] = array(
                                            'text' => $vl_sub['name'],
                                            'data' => array('resource' => $vl_sub['active']),
                                            'state' => array('selected' => ($k == 1) ? false : $permission[$value['active']][$vl_child['active']][$vl_sub['active']])
                                        );
                                        if ($k == 1) {
                                            $data['menu'][$i]['children'][$j]['children'][$k]['data']['resource'] = $vl_sub['active'];
                                            $data['menu'][$i]['children'][$j]['children'][$k]['children'] = array(
                                                array(
                                                    'text' => 'Thấy bài viết tất cả users',
                                                    'icon' => 'fa fa-eye',
                                                    'data' => array('resource' => 'viewall'),
                                                    'state' => array('selected' => $permission[$value['active']][$vl_child['active']][$vl_sub['active']]['viewall'])
                                                ),
                                                array(
                                                    'text' => 'Xem bài viết của chính user',
                                                    'icon' => 'fa fa-eye',
                                                    'data' => array('resource' => 'view'),
                                                    'state' => array('selected' => $permission[$value['active']][$vl_child['active']][$vl_sub['active']]['view'])
                                                ),
                                                array(
                                                    'text' => 'Sửa bài viết',
                                                    'icon' => 'fa fa-pencil',
                                                    'data' => array('resource' => 'edit'),
                                                    'state' => array('selected' => $permission[$value['active']][$vl_child['active']][$vl_sub['active']]['edit'])
                                                )
                                            );
                                            if ($define['add']) {
                                                array_splice(
                                                    $data['menu'][$i]['children'][$j]['children'][$k]['children'],
                                                    2, 0,
                                                    array(array(
                                                        'text' => 'Thêm bài viết',
                                                        'icon' => 'fa fa-plus-circle',
                                                        'data' => array('resource' => 'add'),
                                                        'state' => array('selected' => $permission[$value['active']][$vl_child['active']][$vl_sub['active']]['add'])
                                                    ))
                                                );
                                            }
                                            if ($define['delete']) {
                                                $data['menu'][$i]['children'][$j]['children'][$k]['children'][] = array(
                                                    'text' => 'Xóa bài viết',
                                                    'icon' => 'fa fa-trash',
                                                    'data' => array('resource' => 'delete'),
                                                    'state' => array('selected' => $permission[$value['active']][$vl_child['active']][$vl_sub['active']]['delete'])
                                                );
                                            }
                                            if ($define['excel']) {
                                                $data['menu'][$i]['children'][$j]['children'][$k]['children'][] = array(
                                                    'text' => 'Xuất excel',
                                                    'icon' => 'fa fa-download',
                                                    'data' => array('resource' => 'excel'),
                                                    'state' => array('selected' => $permission[$value['active']][$vl_child['active']][$vl_sub['active']]['excel'])
                                                );
                                            }
                                            if ($define['transfer_cate']) {
                                                $data['menu'][$i]['children'][$j]['children'][$k]['children'][] = array(
                                                    'text' => 'Chuyển danh mục',
                                                    'icon' => 'fa fa-exchange',
                                                    'data' => array('resource' => 'transfer_cate'),
                                                    'state' => array('selected' => $permission[$value['active']][$vl_child['active']][$vl_sub['active']]['transfer_cate'])
                                                );
                                            }
                                            if ($define['status']) {
                                                $data['menu'][$i]['children'][$j]['children'][$k]['children'][] = array(
                                                    'text' => 'Duyệt xuất bản',
                                                    'icon' => 'fa fa-newspaper-o',
                                                    'data' => array('resource' => 'status'),
                                                    'state' => array('selected' => $permission[$value['active']][$vl_child['active']][$vl_sub['active']]['status'])
                                                );
                                            }
                                        }
                                    }
                                } elseif (in_array($value['id'], array(4,5))) {
                                    $data['menu'][$i]['children'][$j]['children'] = array(
                                        array(
                                            'text' => 'Thấy bài viết tất cả users',
                                            'icon' => 'fa fa-eye',
                                            'data' => array('resource' => 'viewall'),
                                            'state' => array('selected' => $permission[$value['active']][$vl_child['active']]['viewall'])
                                        ),
                                        array(
                                            'text' => 'Xem bài viết của chính user',
                                            'icon' => 'fa fa-eye',
                                            'data' => array('resource' => 'view'),
                                            'state' => array('selected' => $permission[$value['active']][$vl_child['active']]['view'])
                                        ),
                                        array(
                                            'text' => 'Sửa bài viết',
                                            'icon' => 'fa fa-pencil',
                                            'data' => array('resource' => 'edit'),
                                            'state' => array('selected' => $permission[$value['active']][$vl_child['active']]['edit'])
                                        )
                                    );
                                    if ($define['add']) {
                                        array_splice(
                                            $data['menu'][$i]['children'][$j]['children'],
                                            2, 0,
                                            array(array(
                                                'text' => 'Thêm bài viết',
                                                'icon' => 'fa fa-plus-circle',
                                                'data' => array('resource' => 'add'),
                                                'state' => array('selected' => $permission[$value['active']][$vl_child['active']]['add'])
                                            ))
                                        );
                                    }
                                    if ($define['delete']) {
                                        $data['menu'][$i]['children'][$j]['children'][] = array(
                                            'text' => 'Xóa bài viết',
                                            'icon' => 'fa fa-trash',
                                            'data' => array('resource' => 'delete'),
                                            'state' => array('selected' => $permission[$value['active']][$vl_child['active']]['delete'])
                                        );
                                    }
                                    if ($define['excel']) {
                                        $data['menu'][$i]['children'][$j]['children'][] = array(
                                            'text' => 'Xuất excel',
                                            'icon' => 'fa fa-download',
                                            'data' => array('resource' => 'excel'),
                                            'state' => array('selected' => $permission[$value['active']][$vl_child['active']]['excel'])
                                        );
                                    }
                                    if ($define['transfer_cate']) {
                                        $data['menu'][$i]['children'][$j]['children'][] = array(
                                            'text' => 'Chuyển danh mục',
                                            'icon' => 'fa fa-exchange',
                                            'data' => array('resource' => 'transfer_cate'),
                                            'state' => array('selected' => $permission[$value['active']][$vl_child['active']]['transfer_cate'])
                                        );
                                    }
                                    if ($define['status']) {
                                        $data['menu'][$i]['children'][$j]['children'][] = array(
                                            'text' => 'Duyệt xuất bản',
                                            'icon' => 'fa fa-newspaper-o',
                                            'data' => array('resource' => 'status'),
                                            'state' => array('selected' => $permission[$value['active']][$vl_child['active']]['status'])
                                        );
                                    }
                                }
                            }
                        }
                    }
                } else {
                    $data['menu'][$i]['state']['selected'] = $permission[$value['active']];
                }
            }
        }

        // Thiết lập full quyền cho user admin
        if ($this->params()->fromQuery('permitAdmin')) {
            foreach ($data['menu'] as $value) {
                if ($value['children']) {
                    foreach ($value['children'] as $vl_child) {
                        if ($vl_child['children']) {
                            foreach ($vl_child['children'] as $vl_sub) {
                                if ($vl_sub['children']) {
                                    foreach ($vl_sub['children'] as $vl) {
                                        $rules[$value['data']['resource']][$vl_child['data']['resource']][$vl_sub['data']['resource']][$vl['data']['resource']] = 1;
                                    }
                                } else {
                                    $rules[$value['data']['resource']][$vl_child['data']['resource']][$vl_sub['data']['resource']] = 1;
                                }
                            }
                        } else {
                            $rules[$value['data']['resource']][$vl_child['data']['resource']] = 1;
                        }
                    }
                } else {
                    $rules[$value['data']['resource']] = 1;
                }
            }

            $this->_AdminRoleTb->saveData(array('id' => 1, 'post' => array('permission' => json_encode($rules))));
            return $this->getResponse();
        }

        return new ViewModel($data);
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_AdminRoleTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_AdminRoleTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }
}