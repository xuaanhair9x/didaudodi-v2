<?php
namespace Backend\Controller;

use Backend\Model\ContactTb;
use Backend\Model\MenuCodeTb;
use Zend\Session\Container;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class ContactTbController extends AbstractActionController
{
	protected $_ContactTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;
    protected $_session;

	public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_ContactTb = new ContactTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_session = new Container($this->_params['__CONTROLLER__']);
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));

        return parent::onDispatch($e);
    }

	public function listAction()
	{
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        // Filter
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        array_shift($this->_field['define']['multi_field']);

        $columns = $this->_field['define']['columns']['list'];
        if (!$columns) {
            $defaultColumnsList = array('fullname', 'phone', 'email', 'address', 'type', 'file', 'content');
            $columns = array();
            foreach ($defaultColumnsList as $i => $name) {
                if ($this->_field['define'][$name]) {
                    $sort = $name == 'content' ? 99 : $i + 1;
                    $columns[] = array('display' => 1, 'sort' => $sort, 'title' => $this->_field['define'][$name], 'name' => $name, 'table' => 1, 'excel' => 1);
                }
            }
            foreach ($this->_field['define']['multi_field'] as $j => $value) {
                    $columns[] = array('display' => 1, 'sort' => $j + $i, 'title' => $value['label'], 'name' => $value['name'], 'table' => 1, 'excel' => 1);
            }
            $columns[] = array('display' => 1, 'sort' => 100, 'title' => 'Ngày tạo', 'name' => 'date_created', 'table' => 1, 'excel' => 1);
        }

        $headers = \Backend\View\Helper\Sort::sortByKey(array_filter($columns, function($column) {
            return $column['display'] && $column['sort'] !== '0' && ($column['table'] || $column['excel']);
        }));
        $headersClass = array(
            'fullname' => 'min-width-150',
            'address' => 'min-width-300',
            'content' => 'min-width-300',
            'date_created' => 'text-center min-width-150',
        );


        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'headers' => array_map(function($header) use ($headersClass) {
                $header['class'] = $headersClass[$header['name']] ?? 'min-width-150';
                return $header;
            }, $headers),
            'list' => $this->_ContactTb->listItem(array_merge(array('menu_code_id' => $this->_params['root_id']), $this->params()->fromQuery())),
            'status' => array(
                array('value' => '0', 'text' => $this->_translator->translate("Chưa duyệt")),
                array('value' => '1', 'text' => $this->_translator->translate("Đã duyệt"))
            )
        );

        $this->_session->offsetSet('query', $this->params()->fromQuery());

		$view = new ViewModel($data);
		return $view;
	}

    public function viewAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.$this->_translator->translate("Thông tin chi tiết"));

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'item' => $this->_ContactTb->getItem(array('id' => $this->_params['id'])),
            'linkList' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'], 'action' => 'list', 'root_id' => $this->_params['root_id']),
                array('query' => $this->_session['query'])
            ),
            'linkChange' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'], 'action' => 'change', 'id' => $this->_params['id'])
            ),
        );

        $view = new ViewModel($data);
        return $view;
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_ContactTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_ContactTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }

    public function settingColumnsAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']) . '/Tùy chỉnh cột');

        $defaultColumnsList = array('fullname', 'phone', 'email', 'address', 'type', 'file', 'content', 'date_created');
        $columnsList = $this->_field['define']['columns']['list'] ?? array(
            array('display' => 1, 'sort' => 0, 'title' => '', 'name' => '', 'table' => 1, 'excel' => 1),
            array('display' => $this->_field['define']['fullname'], 'sort' => 1, 'title' => $this->_field['define']['fullname'], 'name' => 'fullname', 'table' => 1, 'excel' => 1),
            array('display' => $this->_field['define']['phone'], 'sort' => 2, 'title' => $this->_field['define']['phone'], 'name' => 'phone', 'table' => 1, 'excel' => 1),
            array('display' => $this->_field['define']['email'], 'sort' => 3, 'title' => $this->_field['define']['email'], 'name' => 'email', 'table' => 1, 'excel' => 1),
            array('display' => $this->_field['define']['address'], 'sort' => 4, 'title' => $this->_field['define']['address'], 'name' => 'address', 'table' => 1, 'excel' => 1),
            array('display' => $this->_field['define']['content'], 'sort' => 5, 'title' => $this->_field['define']['content'], 'name' => 'content', 'table' => 1, 'excel' => 1),
            array('display' => 1, 'sort' => 6, 'title' => 'Ngày tạo', 'name' => 'date_created', 'table' => 1, 'excel' => 1),
            array('display' => $this->_field['define']['type'], 'sort' => '', 'title' => $this->_field['define']['type'], 'name' => 'type', 'table' => 1, 'excel' => 1),
            array('display' => $this->_field['define']['file'], 'sort' => '', 'title' => $this->_field['define']['file'], 'name' => 'file', 'table' => 1, 'excel' => 1),
        );

        // Remove after up version 4v2
        foreach ($this->_field['define']['multi_field'] as $value) {
            if ($value['name'] && array_search($value['name'], array_column($columnsList, 'name')) <= -1) {
                $columnsList[] = array('display' => 1, 'sort' => '', 'title' => $value['label'], 'name' => $value['name'], 'table' => 1, 'excel' => 1);
            }
        }

        $fixedColumn = 1;
        $denyTurnOff = 2;

        $data = array(
            '_params' => $this->params()->fromRoute(),
            'linkBack' => $this->url()->fromRoute(
                'admincp',
                array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']),
                array('query' => $this->_session['query'])
            ),
            'pages' => array(
                array(
                    'name' => 'list',
                    'label' => 'Trang danh sách',
                    // 'fixed' => true,
                    'options' => array('table' => 'Table', 'excel' => 'Excel'),
                    'columns' => array_map(function ($column) use ($defaultColumnsList, $fixedColumn, $denyTurnOff) {
                        if (in_array($column['name'], $defaultColumnsList)) {
                            $column['default'] = in_array($column['name'], array('fullname')) ? $denyTurnOff : $fixedColumn;
                        }
                        return $column;
                    }, $columnsList),
                ),
             ),
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->_field['define'];

            $columns = $this->params()->fromPost();
            $defines = array('fullname' => '', 'phone' => '', 'email' => '', 'address' => '', 'type' => '', 'file' => '', 'content' => '');

            foreach ($defines as $key => $name) {
                $index = array_search($key, array_column($columns['list'], 'name'));
                if ($index > -1 && $columns['list'][$index]['display']) {
                    $defines[$key] = $columns['list'][$index]['title'];
                }
            }

            // Remove after up version 4v2
            $defines['multi_field'] = array(array('label' => '', 'name' => ''));
            foreach ($columns['list'] as $value) {
                if ($value['name'] && !in_array($value['name'], $defaultColumnsList)) {
                    $defines['multi_field'][] = array('label' => $value['title'], 'name' => $value['name']);
                }
            }

            $this->_params['post']['define'] = array_merge(
                $this->_field['define'],
                $defines
            );

            $this->_params['post']['define']['columns'] = array(
                'list' => array_map(function($column){
                    if ($column['excel'] && !$column['table']) {
                        $column['colvis'] = true;
                    };
                    return $column;
                }, \Backend\View\Helper\Sort::sortByKey($columns['list'])),
            );

            // unset($this->_params['post']['define']['columns']);

            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toUrl($data['linkBack']);
        }

        $view = new ViewModel($data);
        return $view->setTemplate('partials/columns.phtml');
    }

    public function codefieldAction()
    {
        $data = array(
            'item' => $this->_field['define'],
            'linkBack' => $this->url()->fromRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']))
        );

        if ($this->getRequest()->isPost()) {
            $this->_params['id'] = $this->_params['root_id'];
            $this->_params['post']['define'] = $this->params()->fromPost();
            if ($this->_field['define']['columns']) {
                $this->_params['post']['define']['columns'] = $this->_field['define']['columns'];
            }
            $this->_MenuCodeTb->saveData($this->_params);
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']));
        }

        // Các field và thứ tự hiển thị
        $defines = array(
            'input' => array('fullname','phone','email','address','content','type','file'),
            'multi' => array('multi_field')
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

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/Cấu hình dữ liệu');
        $data['_params'] = $this->params()->fromRoute();

        $data['html'] = $this->_renderer->code($data);

        $view = new ViewModel($data);
        return $view->setTemplate('backend/code.phtml');
    }
}