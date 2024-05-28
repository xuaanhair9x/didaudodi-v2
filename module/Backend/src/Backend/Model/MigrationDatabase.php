<?php

namespace Backend\Model;

use Zend\Db\Sql\Ddl;
use Zend\Db\Sql\Ddl\Column;
use Zend\Db\Sql\Ddl\Constraint;
use Zend\Db\TableGateway\AbstractTableGateway;
use Zend\Db\TableGateway\Feature;
use Zend\Ldap\Converter\Exception;

class MigrationDatabase extends AbstractTableGateway
{
    protected $table = '';

    public function __construct()
    {
        $this->featureSet = new Feature\FeatureSet();
        $this->featureSet->addFeature(new Feature\GlobalAdapterFeature());
        $this->initialize();
    }

    protected function checkTableIsNotExists($table) {
        return $this->adapter->query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '".$table."'", $this->adapter::QUERY_MODE_EXECUTE)->count() == 0;
    }

    protected function checkColumnIsNotExists($table, $column) {
        return $this->adapter->query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '".$table."' AND COLUMN_NAME = '".$column."'", $this->adapter::QUERY_MODE_EXECUTE)->count() == 0;
    }

    protected function execute($table, $isCreateTable = true) {
        $sql = $this->sql->getSqlStringForSqlObject($table) . ($isCreateTable ? ' CHARSET=utf8' : '');
        $this->adapter->query($sql, $this->adapter::QUERY_MODE_EXECUTE);
    }

    public function all()
    {
        $this->sectionTb();
        $this->productTb();
        $this->productCatTb();
        $this->productLabelTb();
        $this->productSelectTb();
        $this->newsTb();
        $this->newsCatTb();
        $this->adminTb();
        $this->memberTb();
        $this->menuPublicTb();
        $this->commentTb();
    }

    public function sectionTb()
    {
        try {
            $table = 'section_tb';
            $isNotExists = $this->checkTableIsNotExists($table);

            if ($isNotExists) {
                // Cretae Table
                $createTable = new Ddl\CreateTable($table);
                $createTable->addColumn(new Column\Integer('id', false, NULL, array('autoincrement' => true)))->addConstraint(new Constraint\PrimaryKey('id'));
                $this->execute($createTable);

                // Create columns
                $colummns = array(
                    array('name' => 'parent', 'type' => 'integer'),
                    array('name' => 'menu_code_id', 'type' => 'integer'),
                    array('name' => 'name', 'type' => 'varchar', 'length' => 500),
                    array('name' => 'thumbnail', 'type' => 'varchar', 'length' => 500),
                    array('name' => 'icon', 'type' => 'varchar', 'length' => 255),
                    array('name' => 'desc_short', 'type' => 'varchar', 'length' => 1000),
                    array('name' => 'display', 'type' => 'integer', 'default' => 1),
                    array('name' => 'sort', 'type' => 'integer'),
                    array('name' => 'detail', 'type' => 'text'),
                    array('name' => 'special', 'type' => 'text'),
                    array('name' => 'multi_image', 'type' => 'text'),
                    array('name' => 'multi_input', 'type' => 'text'),
                    array('name' => 'multi_detail', 'type' => 'text'),
                    array('name' => 'multi_file', 'type' => 'text'),
                    array('name' => 'define', 'type' => 'text'),
                    array('name' => 'menu', 'type' => 'varchar','length' => 500),
                );

                $this->addColumn($table, $colummns);
            } else {
                $colummns = array(
                    array('name' => 'special', 'type' => 'text'),
                );
                $this->addColumn($table, $colummns);
            }
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function productTb()
    {
        try {
            $table = 'product_tb';
            $colummns = array(
                array('name' => 'list_section_id', 'type' => 'varchar', 'length' => 500)
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function productCatTb()
    {
        try {
            $table = 'product_cat_tb';
            $colummns = array(
                array('name' => 'list_section_id', 'type' => 'varchar', 'length' => 500),
                array('name' => 'list_news_id', 'type' => 'varchar', 'length' => 500),
                array('name' => 'list_product_id', 'type' => 'varchar', 'length' => 500)
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function productLabelTb()
    {
        try {
            $table = 'product_label_tb';
            $colummns = array(
                array('name' => 'special', 'type' => 'text'),
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function productSelectTb()
    {
        try {
            $table = 'product_select_tb';
            $colummns = array(
                array('name' => 'type', 'type' => 'integer')
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function newsTb()
    {
        try {
            $table = 'news_tb';
            $colummns = array(
                array('name' => 'list_section_id', 'type' => 'varchar', 'length' => 500),
                array('name' => 'list_select_id', 'type' => 'varchar', 'length' => 500),
                //array('name' => 'select', 'type' => 'text')
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function newsCatTb()
    {
        try {
            $table = 'news_cat_tb';
            $colummns = array(
                array('name' => 'list_section_id', 'type' => 'varchar', 'length' => 500),
                array('name' => 'list_news_id', 'type' => 'varchar', 'length' => 500),
                array('name' => 'list_product_id', 'type' => 'varchar', 'length' => 500)
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function adminTb()
    {
        try {
            $table = 'admin_tb';
            $colummns = array(
                array('name' => 'thumbnail', 'type' => 'varchar', 'length' => 500),
                array('name' => 'desc_short', 'type' => 'varchar', 'length' => 500)
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function memberTb()
    {
        try {
            $table = 'member_tb';
            $colummns = array(
                array('name' => 'thumbnail', 'type' => 'varchar', 'length' => 500)
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function menuPublicTb()
    {
        try {
            $table = 'menu_public_tb';
            $colummns = array(
                array('name' => 'special', 'type' => 'text'),
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    public function commentTb()
    {
        try {
            $table = 'comment_tb';
            $colummns = array(
                array('name' => 'star', 'type' => 'integer', 'default' => 0),
                array('name' => 'multi_image', 'type' => 'text'),
            );

            $this->addColumn($table, $colummns);
        } catch (\Exception $e) {
            throw new Exception\ConverterException($e->getMessage(), $e->getCode(), $e);
        }
    }

    private function addColumn($table, $colummns)
    {
        $newColumns = array_filter($colummns, function($colummn) use ($table) {
            return !!$this->checkColumnIsNotExists($table, $colummn['name']);
        });

        if ($newColumns) {
            $alterTable = new Ddl\AlterTable($table);

            foreach ($newColumns as $colummn) {
                switch ($colummn['type']) {
                    case 'varchar':
                        $alterTable->addColumn(new Column\Varchar($colummn['name'], $colummn['length'], true));
                        break;
                    case 'text':
                        $alterTable->addColumn(new Column\Text($colummn['name'], null, true));
                        break;
                    case 'integer':
                        $default = $colummn['default'] ?? NULL;
                        $nullable = $default === NULL;
                        $alterTable->addColumn(new Column\Integer($colummn['name'], $nullable, $default));
                        break;

                }
            }

            $this->execute($alterTable, false);
        }
    }
}
