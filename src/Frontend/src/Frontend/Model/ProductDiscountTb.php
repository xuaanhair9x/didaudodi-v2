<?php

namespace Frontend\Model;
use Zend\Db\Sql\Predicate\Expression;
use Zend\Db\Sql\Select;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;

class ProductDiscountTb extends AbstractTableGateway
{
    protected $table = 'product_discount_tb';

    public function __construct()
    {
   		$this->featureSet = new Feature\FeatureSet();
   		$this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
    	$this->initialize();
    }

    public function getItem($params = null)
    {
   		$select = new Select();
   		$select ->from(array('pd' => $this->table));

        if (!empty($params['columns'])) {
            $select->columns($params['columns']);
        }

        $select->join(
            array('o' => 'orders_tb'),
            new Expression('pd.id = o.discount_id'),
            array('remain' => new Expression('COUNT(o.discount_id)')),
            'left'
        )->group('pd.id');

        if (isset($params['auto'])) {
            $select->where->equalTo('pd.auto', 1);
            $select->where->nest()
                            ->or->greaterThan('pd.expired_date', date('Y-m-d H:i:s'))
                            ->or->isNull('pd.expired_date')
                        ->unnest;
        } else {
            if($params['sku']) {
                $select->where->equalTo('pd.sku', $params['sku']);
            } else {
                $select->where->equalTo('pd.id', $params['id']);
            }
        }

        $select->limit(1)->offset(0);

   		return $this->selectWith($select)->toArray()[0];
    }
}