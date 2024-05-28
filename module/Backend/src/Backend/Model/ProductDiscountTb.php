<?php

namespace Backend\Model;

use Frontend\View\Helper\ToSlug;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
Use Zend\Db\Sql\Predicate\Expression;

class ProductDiscountTb extends AbstractTableGateway
{
    protected $table = 'product_discount_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function listItem($params = null)
    {
        $select = new Select();
        $select ->from(array('pd' => $this->table));

        $select->join(
            array('o' => 'orders_tb'),
            new Expression('pd.id = o.discount_id'),
            array('remain' => new Expression('COUNT(o.discount_id)')),
            'left'
        )->group('pd.id');

        if (isset($params['status'])) {
            if ($params['status'] > 0) {
                $select->where->equalTo('pd.status', $params['status']);
                $select->where->nest()
                    ->nest()
                        ->isNull('pd.expired_date')
                        ->isNull('pd.expired_number')
                    ->unnest
                    ->or
                    ->nest()
                        ->isNull('pd.expired_date')
                        ->isNotNull('pd.expired_number')
                    ->unnest
                    ->or
                    ->nest()
                        ->isNotNull('pd.expired_date')
                        ->greaterThan('pd.expired_date', date('Y-m-d H:i:s'))
                    ->unnest
                ->unnest;
                $select->having(new Expression('pd.expired_number > remain OR pd.expired_number IS NULL'));
            } else {
                $select->where->nest()
                    ->nest()
                        ->isNull('pd.expired_date')
                        ->isNotNull('pd.expired_number')
                    ->unnest
                    ->or
                    ->nest()
                        ->isNotNull('pd.expired_date')
                        ->nest()
                            ->isNull('pd.expired_number')
                            ->or
                            ->isNotNull('pd.expired_number')
                        ->unnest
                    ->unnest
                ->unnest;
                $select->having(new Expression('pd.expired_number <= remain OR (pd.expired_number IS NULL AND pd.expired_date < "'.date('Y-m-d H:i:s').'")'));
            }
        }

        $select->where->equalTo('pd.order_id', $params['order_id'] ? $params['order_id'] : 0);
        $select->order(new Expression('pd.auto DESC, pd.id DESC'));
        return $this->selectWith($select)->toArray();
    }

    public function getItem($params = null)
    {
        $select = new Select();
        $select->from(array('pd' => $this->table));
        $select->join(array('o' => 'orders_tb'), 'o.discount_id = pd.id', array('o.order_id' => new Expression('GROUP_CONCAT(o.id SEPARATOR "|")')), 'left');

        if (isset($params['columns'])) {
            $select->columns($params['columns']);
        }

        if (isset($params['allowed_type'])) {
            $select->where->equalTo('allowed_type', $params['allowed_type']);
        }

        $select->where->equalTo('pd.id', $params['id']);
        $result = $this->selectWith($select)->toArray()[0];
        if (   ($result['expired_date'] && strtotime($result['expired_date']) < time())
            || ($result['expired_number'] && ($result['expired_number'] <= $result['remain']))
        ) {
            $result['status'] = 0;
        }

        return $result;
    }

    public function deleteItem($params = null)
    {
        $this->delete('id = '.$params['id']);
    }

    public function saveData($params = null, $config = array())
    {
        $regexPrice = $config['unit'] == 'dollar' ? '/[^0-9.]/' : '/[^0-9]/';

        if (isset($params['post']['sku'])) {
            $data['sku'] = $params['post']['sku'];
        }
        if (isset($params['post']['discount_type'])) {
            $data['discount_type'] = $params['post']['discount_type'];
        }
        if (isset($params['post']['discount_value'])) {
            $data['discount_value'] = preg_replace($regexPrice, '', $params['post']['discount_value']);
        }
        if (isset($params['post']['allowed_type'])) {
            $data['allowed_type'] = $params['post']['allowed_type'];
        }
        if (isset($params['post']['allowed_value'])) {
            $data['allowed_value'] = $params['post']['allowed_value'] ? ':'.implode(':,:', $params['post']['allowed_value']).':' : null;
        }
        if (isset($params['post']['expired_date'])) {
            $data['expired_date'] = $params['post']['expired_date'] ? date('Y-m-d H:i:s', strtotime($params['post']['expired_date'])) : null;
        }
        if (isset($params['post']['expired_number'])) {
            $data['expired_number'] = $params['post']['expired_number'] ? preg_replace('/[^0-9]/', '', $params['post']['expired_number']) : null;
        }
        if (isset($params['post']['order_id'])) {
            $data['order_id'] = $params['post']['order_id'];
        }
        if (isset($params['post']['order_value'])) {
            $data['order_value'] = preg_replace($regexPrice, '', ($params['post']['order_value'] ? $params['post']['order_value'] : 0));
        }
        if (isset($params['post']['status'])) {
            $data['status'] = $params['post']['status'];
            if ($params['post']['status'] == 2) {
                $params['post']['auto'] = 0;
            }
        }

        if ($params['id']) {
            if (isset($params['post']['auto'])) {
                $this->update(array('auto' => 0), 'auto = 1');
                $data['auto'] = $params['post']['auto'];
            }
            $this->update($data,'id = '.$params['id']);
            $increment = $params['id'];
        } else {
            $this->insert($data);
            $increment = $this->getLastInsertValue();
        }

        return $increment;
    }
}