<?php
namespace Backend\Controller;

use Backend\Model\CommentTb;
use Backend\Model\MemberTb;
use Backend\Model\MenuCodeTb;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Session\Container;
use Zend\View\Model\ViewModel;

class CommentTbController extends AbstractActionController
{
	protected $_CommentTb;
    protected $_MenuCodeTb;
    protected $_translator;
    protected $_renderer;
    protected $_params;
    protected $_field;
    protected $_status;
    protected $_session;

	public function onDispatch(\Zend\Mvc\MvcEvent $e)
    {
        $this->_params = $e->getRouteMatch()->getParams();
        $e->getRouteMatch()->setParam('active', $this->_params['__CONTROLLER__'].'-'.$this->_params['root_id']);

        $this->_CommentTb = new CommentTb();
        $this->_MenuCodeTb = new MenuCodeTb();
        $this->_session = new Container($this->_params['__CONTROLLER__']);
        $this->_translator = $e->getApplication()->getServiceManager()->get('Translator');
        $this->_renderer = $e->getApplication()->getServiceManager()->get('Zend\View\Renderer\PhpRenderer');
        $this->_field = $this->_MenuCodeTb->getItem(array('id' => $this->_params['root_id']));
        $this->_status = array('0' => 'Chờ duyệt', '1' => 'Đã duyệt', '-1' => 'Không duyệt');

        return parent::onDispatch($e);
    }

	public function listAction()
	{
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']));

        // Filter
        if ($this->getRequest()->isPost()) {
            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'list','root_id' => $this->_params['root_id']), array('query' => array_filter($this->params()->fromPost(), 'strlen')));
        }

        $columns = $this->_field['define']['columns']['list'];
        if (!$columns) {
            $defaultColumnsList = array('fullname', 'email', 'comment', 'article_name', 'date_created');
            $columns = array();
            foreach ($defaultColumnsList as $i => $name) {
                if ($this->_field['define'][$name] || in_array($name, array('article_name', 'date_created'))) {
                    $title = $this->_field['define'][$name];
                    if (in_array($name, array('article_name', 'date_created'))) {
                        $title = $name == 'article_name' ? 'Bài viết' : 'Ngày tạo';
                    }
                    $columns[] = array('display' => 1, 'sort' => $i + 1, 'title' => $title, 'name' => $name, 'table' => 1);
                }
            }
        }

        $headers = \Backend\View\Helper\Sort::sortByKey(array_filter($columns, function($column) {
            return $column['display'] && $column['sort'] !== '0' && $column['table'];
        }));
        $headersClass = array(
            'fullname' => 'min-width-150',
            'comment' => 'min-width-300 break-comment',
            'article_name' => 'min-width-300',
            'date_created' => 'text-center min-width-150',
        );

        $data = array(
            '_field' => $this->_field['define'],
            '_params' => $this->params()->fromRoute(),
            'query' => $this->params()->fromQuery(),
            'status' => $this->_status,
            'list' => $this->_CommentTb->listItem(array_merge(array('orderby' => array('status ASC, id DESC')), $this->params()->fromQuery())),
            'headers' => array_map(function($header) use ($headersClass) {
                $header['class'] = $headersClass[$header['name']] ?? 'min-width-150';
                return $header;
            }, $headers),
        );

        $this->_session->offsetSet('query', $this->params()->fromQuery());

		$view = new ViewModel($data);
		return $view;
	}

    public function viewAction()
    {
        $data = array(
            '_field' => $this->_field['define'],
            'status' => $this->_status,
            'item' => $this->_CommentTb->getItem(array('id' => $this->_params['id'])),
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

        if ($this->getRequest()->isPost()) {
            $parent = $data['item']['parent'] ? $data['item']['parent'] : $this->_params['id'];
            $this->_params['post'] = $this->params()->fromPost();
            $this->_params['post']['parent'] = $parent;
            $this->_params['post']['type'] = $data['item']['type'];
            $this->_params['post']['article_id'] = $data['item']['article_id'];
            $this->_params['post']['admin_id'] = $this->identity()->id;

            $this->_CommentTb->saveData(array('post' => $this->_params['post']));

            return $this->redirect()->toRoute('admincp',array('controller' => $this->_params['__CONTROLLER__'],'action' => 'view','root_id' => $this->_params['root_id'],'id' => $parent));
        }

        if ($data['_field']['reply']) {
            $data['reply'] = $this->_CommentTb->listItem(array(
                'getChild' => true,
                'parent' => $this->_params['id'],
                'orderby' => array('id ASC')
            ));
        }

        // tính số lượt like, dislike của đánh giá
        $MemberTb = new MemberTb();
        $listMember = $MemberTb->listItem(array('columns' => array('id','like','dislike','status'), 'status' => 1));
        $countLike = $countDislike = 0;
        foreach ($listMember as $member) {
            if(!empty($member['like'])) {
                $like = json_decode($member['like'], true);
                if(in_array($data['item']['id'], $like)) {
                    $countLike++;
                }
            } if(!empty($member['dislike'])) {
                $dislike = json_decode($member['dislike'], true);
                if(in_array($data['item']['id'], $dislike)) {
                    $countDislike++;
                }
            }
        }
        $data['item']['like'] = $countLike;
        $data['item']['dislike'] = $countDislike;

        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']).'/'.$this->_translator->translate("Thông tin chi tiết"));
        $data['_params'] = $this->params()->fromRoute();
        $data['_params']['user'] = $this->identity()->username;

        $view = new ViewModel($data);
        return $view;
    }

    public function changeAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_CommentTb->saveData(array('id' => $id, 'post' => $this->params()->fromPost()));
            }
        }
        return $this->getResponse();
    }

    public function deleteAction()
    {
        if ($this->getRequest()->isPost()) {
            foreach (explode(',',$this->_params['id']) as $id) {
                $this->_CommentTb->deleteItem(array('id' => $id));
            }
        }
        return $this->getResponse();
    }

    public function settingColumnsAction()
    {
        $this->getEvent()->getRouteMatch()->setParam('title', $this->_translator->translate($this->_field['name']) . '/Tùy chỉnh cột');

        $defaultColumnsList = array('fullname', 'email', 'comment', 'article_name', 'date_created');
        $columnsList = $this->_field['define']['columns']['list'] ?? array(
            array('display' => 1, 'sort' => 0, 'title' => '', 'name' => '', 'table' => 1),
            array('display' => $this->_field['define']['fullname'], 'sort' => 1, 'title' => $this->_field['define']['fullname'], 'name' => 'fullname', 'table' => 1),
            array('display' => $this->_field['define']['email'], 'sort' => 2, 'title' => $this->_field['define']['email'], 'name' => 'email', 'table' => 1),
            array('display' => $this->_field['define']['comment'], 'sort' => 3, 'title' => $this->_field['define']['comment'], 'name' => 'comment', 'table' => 1),
            array('display' => 1, 'sort' => 4, 'title' => 'Bài viết', 'name' => 'article_name', 'table' => 1),
            array('display' => 1, 'sort' => 5, 'title' => 'Ngày tạo', 'name' => 'date_created', 'table' => 1),
        );

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
                    'label' => '',
                    'fixed' => true,
                    'options' => array('table' => 'Table'),
                    'columns' => array_map(function ($column) use ($defaultColumnsList, $fixedColumn, $denyTurnOff) {
                        if (in_array($column['name'], $defaultColumnsList)) {
                            $column['default'] = $fixedColumn;
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
            $defines = array('fullname' => '', 'email' => '', 'comment' => '');

            foreach ($defines as $key => $name) {
                $index = array_search($key, array_column($columns['list'], 'name'));
                if ($index > -1 && $columns['list'][$index]['display']) {
                    $defines[$key] = $columns['list'][$index]['title'];
                }
            }

            $this->_params['post']['define'] = array_merge(
                $this->_field['define'],
                $defines
            );

            $this->_params['post']['define']['columns'] = array(
                'list' => array_map(function($column){
                    if (!$column['table']) {
                        $column['colvis'] = true;
                    };
                    return $column;
                }, \Backend\View\Helper\Sort::sortByKey($columns['list'])),
            );

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
            'input' => array('fullname' => array('class' => 'hide'), 'email' => array('class' => 'hide'), 'comment' => array('class' => 'hide')),
            'action' => array('reply','status')
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