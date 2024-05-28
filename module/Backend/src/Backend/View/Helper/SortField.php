<?php

namespace Backend\View\Helper;
use Backend\Model\MenuCodeTb;

class SortField
{
    protected $_definedFields;
    protected $_sortedFields;
    protected $_config;
    protected $_columnInfo;

    public function __construct($definedFields, $sortedFields, $config)
	{
        $this->_definedFields = $definedFields;
        $this->_sortedFields = $sortedFields;
        $this->_config = $config;
        $this->setColumnInfo();
	}

    public function getColumns($addBefore = array(), $addAfter = array())
    {
        $columns = array_filter(
            array_merge($addBefore, $this->getFields('list'), $addAfter),
            function($column) {
                return $column['sort'] != '0' && ($column['table'] || $column['excel']);
            }
        );

        return array_map(function($column) {
            $column['type'] = $this->_columnInfo[$column['name']]['type'] ?? 'str';
            $column['colvis'] = $column['excel'] && !$column['table'];
            if ($column['data'] == 'display_lang') {
                $column['title'] = '<span class=\"d-flex justify-content--center\"><span class=\"flex-none\">'.$column['title'].'</span><a href=\"javascript:;\" class=\"tooltips\" data-container=\"body\" title=\"'.$this->_columnInfo[$column['name']]['note'].'\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i></a></span><span><span>' . implode('</span><span>', array_column($this->_config['langlist'], 0)) . '</span></span>';
            } else if ($this->_columnInfo[$column['name']]['note']) {
                $column['title'] = '<div class=\"d-flex justify-content--center\"><span class=\"flex-none\">'.$column['title'].'</span>&nbsp;<a href=\"javascript:;\" class=\"tooltips\" data-container=\"body\" title=\"'.$this->_columnInfo[$column['name']]['note'].'\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i></a></div>';
            }

            preg_match('/(^.*)\[(.*)\]/', $column['name'], $output);
            if (empty($output)) {
                $column['data'] = $column['data'] ?? $column['name'];
            } else {
                $column['searchable'] = true;
                $column['name'] = $output[1];
                $column['orign_name'] = $output[2];
                $column['data'] = $output[1].'.'.str_replace('-', '_', $output[2]);
                if ($output[1] == 'special') {
                    $column['class'] = 'table-show text-center';
                    $column['searchable'] = false;
                    $column['orderable'] = true;
                    $column['title'] = '<div class=\"d-flex justify-content--center\"><span class=\"flex-none\">'.$column['title'].'</span>&nbsp;<a href=\"javascript:;\" class=\"tooltips '.($column['note'] ? '' : 'hidden').'\" data-container=\"body\" title=\"'.$column['note'].'\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i></a></div>';
                }
            }
            return array_merge($column, $this->_columnInfo[$column['name']] ?? array());
        }, $columns);
    }

    public function getFields($type = '')
    {
        $fixedColumn = 1;
        $denyTurnOff = 2;
        $columns = array(array('display' => 1, 'sort' => 0, 'title' => '', 'name' => '', 'table' => 1, 'excel' => 1, 'default' => $fixedColumn));
        $defaultTitle = array(
            'id' => 'ID',
            'cat_id' => 'Danh mục',
            'thumbnail' => 'Ảnh đại diện',
            'list_news_id' => $this->_definedFields['list_news_title'],
            'list_product_id' => $this->_definedFields['list_product_title'],
            'view' => 'Lượt xem',
            'date_created' => 'Người/Ngày đăng',
            'date_updated' => 'Người/Ngày sửa',
            'status' => 'Trạng thái',
        );

        $fields = array('id','cat_id','brand_id','name','title','slug','description','desc_short','keyword','sku','price_market','price_discount','price_percent');
        foreach ($fields as $field) {
            if ($this->_definedFields[$field] || $field == 'id') {
                $title = $defaultTitle[$field] ?? $this->_definedFields[$field];
                $table = in_array($field, array('id', 'name', 'sku')) || in_array($field, array('price_market', 'price_discount')) && $this->_definedFields['editable_price'];
                $columns[] = array('display' => 1, 'sort' => '', 'title' => $title, 'name' => $field, 'table' => $table, 'excel' => 1, 'default' => $fixedColumn);
            }
        }

        foreach ($this->_definedFields['multi_input'] as $value) {
            if (!$value['auto'] && $value['name'] && array_search($value['name'], array_column($columns, 'name')) <= -1) {
                $columns[] = array('display' => 1, 'sort' => '', 'title' => $value['label'], 'name' => 'multi_input['.$value['name'].']', 'table' => 0, 'excel' => 1, 'orderable' => true, 'default' => $fixedColumn);
            }
        }

        $fields = array('view','date_created','date_updated');
        foreach ($fields as $field) {
            $title = $defaultTitle[$field] ?? $this->_definedFields[$field];
            $columns[] = array('display' => 1, 'sort' => '', 'title' => $title, 'name' => $field, 'table' => 0, 'excel' => 1, 'default' => $fixedColumn);
        }

        $fields = array('date_published','status','list_label_id');
        foreach ($fields as $field) {
            if ($this->_definedFields[$field]) {
                $title = $defaultTitle[$field] ?? $this->_definedFields[$field]['label'] ?? $this->_definedFields[$field];
                $columns[] = array('display' => 1, 'sort' => '', 'title' => $title, 'name' => $field, 'table' => 0, 'excel' => 1, 'default' => $fixedColumn);
            }
        }

        foreach ($this->_definedFields['section'] as $i => $value) {
            if ($i == 0) continue;
            $columns[] = array('display' => 1, 'sort' => '', 'title' => $value['label'], 'name' => 'list_section_id['.$value['name'].']', 'table' => 0, 'excel' => 1, 'default' => $denyTurnOff);
        }

        $MenuCodeTb = new MenuCodeTb();
        foreach ($this->_definedFields['list_select_id'] as $id) {
            $select = $MenuCodeTb->getItem(array('id' => $id, 'columns' => array('id', 'name')));
            $columns[] = array('display' => 1, 'sort' => '', 'title' => $select['name'], 'name' => 'list_select_id['.$id.']', 'table' => 0, 'excel' => 1, 'default' => $denyTurnOff);
        }
        foreach ($this->_definedFields['select'] as $i => $select) {
            if ($i === 0) continue;
            foreach ($select['fields'] as $j => $field) {
                if ($j === 0) continue;
                $columns[] = array('display' => 1, 'sort' => '', 'title' => $field['label'], 'name' => 'select['.$select['id'].']['.$field['name'].']', 'table' => 0, 'excel' => 1, 'default' => $denyTurnOff);
            }
        }

        if ($this->_definedFields['thumbnail']) {
            $columns[] = array('display' => 1, 'sort' => '', 'title' => 'Ảnh đại diện', 'name' => 'thumbnail', 'table' => 0, 'excel' => 1, 'default' => $denyTurnOff);
            array_splice($columns, 1, 0, array(array('display' => 1, 'sort' => '', 'title' => 'Ảnh', 'name' => 'thumbnail', 'table' => 1, 'excel' => 0, 'default' => $fixedColumn, 'type' => 'list')));
        }

        foreach (array('multi_image', 'multi_file') as $multi) {
            foreach ($this->_definedFields[$multi] as $value) {
                if (!$value['auto'] && $value['name'] && array_search($value['name'], array_column($columns, 'name')) <= -1) {
                    $columns[] = array('display' => 1, 'sort' => '', 'title' => $value['label'], 'name' => $multi.'['.$value['name'].']', 'table' => 0, 'excel' => 0, 'default' => $denyTurnOff);
                }
            }
        }

        $fields = array('tags','list_tag_id','list_news_id','list_product_id','embed');
        foreach ($fields as $field) {
            if ($this->_definedFields[$field]) {
                $title = $defaultTitle[$field] ?? $this->_definedFields[$field];
                $columns[] = array('display' => 1, 'sort' => '', 'title' => $title, 'name' => $field, 'table' => 0, 'excel' => 0, 'default' => $denyTurnOff);
            }
        }

        foreach (array('multi_input', 'multi_file', 'multi_image', 'sub', 'multi_detail') as $multi) {
            foreach ($this->_definedFields[$multi] as $value) {
                if ($value['auto'] && $value['name'] && array_search($value['name'], array_column($columns, 'name')) <= -1) {
                    $columns[] = array('display' => 1, 'sort' => '', 'title' => $value['label'], 'name' => $multi.'['.$value['name'].']', 'table' => 0, 'excel' => 0, 'default' => $denyTurnOff);
                } else if ($multi == 'sub' && $value['key'] && array_search($value['key'], array_column($columns, 'name')) <= -1) {
                    $columns[] = array('display' => 1, 'sort' => '', 'title' => $value['label'], 'name' => $multi.'['.$value['key'].']', 'table' => 0, 'excel' => 0, 'default' => $denyTurnOff);
                }
            }
        }

        $fields = array('detail');
        foreach ($fields as $field) {
            if ($this->_definedFields[$field]) {
                $title = $defaultTitle[$field] ?? $this->_definedFields[$field];
                $columns[] = array('display' => 1, 'sort' => '', 'title' => $title, 'name' => $field, 'table' => 0, 'excel' => 0, 'default' => $denyTurnOff);
            }
        }

        foreach ($this->_definedFields['multi_detail'] as $value) {
            if (!$value['auto'] && $value['name'] && array_search($value['name'], array_column($columns, 'name')) <= -1) {
                $columns[] = array('display' => 1, 'sort' => '', 'title' => $value['label'], 'name' => 'multi_detail['.$value['name'].']', 'table' => 0, 'excel' => 0, 'default' => $denyTurnOff);
            }
        }

        $listColumns = array_merge(
            array_filter($columns, function($column) use ($fixedColumn) { return $column['default'] == $fixedColumn && !in_array($column['name'], array('list_label_id', 'price_percent')); }),
            empty($this->_config['permission']['other']) ? array() : array_merge(
                $this->_definedFields['sort'] ? array(array('display' => 1, 'sort' => '', 'title' => 'Sắp xếp', 'name' => 'sort', 'table' => 1, 'excel' => 0, 'default' => $fixedColumn)) : array(),
                array_map(function($item) use ($fixedColumn) {
                    return array('display' => 1, 'sort' => '', 'title' => $item['label'], 'name' => 'special[' . $item['name'] . ']', 'table' => 1, 'excel' => 0, 'default' => $fixedColumn, 'note' => $item['note']);
                }, array_filter($this->_definedFields['special'], function($item) { return $item['name'] && ($item['list'] || (!$item['list'] && !$item['detail'])); })),
                $this->_definedFields['display'] ? array(array('display' => 1, 'sort' => '', 'title' => 'Hiển thị', 'name' => 'display', 'data' => $this->_config['lang'] && count($this->_config['langlist']) > 1 ? 'display_lang' : 'display', 'table' => 1, 'excel' => 0, 'default' => $fixedColumn)) : array(),
            ),
        );
        $currentListColumns = array_column($this->_sortedFields['list'], 'name');
        if (!empty($currentListColumns)) {
            $listColumns = array_map(function ($column) use ($currentListColumns) {
                $newData = $column;
                $index = array_search($column['name'], $currentListColumns);
                if ($index > -1) {
                    $newData = array_merge($newData, $this->_sortedFields['list'][$index]);
                    $newData['name'] = $column['name'];
                    $newData['default'] = $column['default'];
                }
                return $newData;
            }, $listColumns);

            $columnsSorting = array_filter($listColumns, function($column) { return $column['sort'] != ''; });
            if ($columnsSorting) {
                $listColumns = array_merge(
                    \Backend\View\Helper\Sort::sortByKey($columnsSorting),
                    array_filter($listColumns, function($column) { return $column['sort'] == ''; })
                );
            }
        }

        $detailColumns = array_filter($columns, function($column) { return $column['type'] != 'list' && !in_array($column['name'], array('id', 'view', 'date_created', 'date_updated', 'status')); });
        $currentDetailColumns = array_column($this->_sortedFields['detail'], 'name');
        if (!empty($currentDetailColumns)) {
            $detailColumns = array_map(function ($column) use ($currentDetailColumns) {
                $index = array_search($column['name'], $currentDetailColumns);
                if ($index > -1) {
                    $column['sort'] = $this->_sortedFields['detail'][$index]['sort'];
                }
                return $column;
            }, $detailColumns);

            $columnsSorting = array_filter($detailColumns, function($column) { return $column['sort'] != ''; });
            if ($columnsSorting) {
                $detailColumns = array_merge(
                    \Backend\View\Helper\Sort::sortByKey($columnsSorting),
                    array_filter($detailColumns, function($column) { return $column['sort'] == ''; })
                );
            }
        }

        switch ($type) {
            case 'list':
                return $listColumns;
            break;
            case 'detail':
                return $detailColumns;
            break;
            default:
                return array(
                    'list' => $listColumns,
                    'detail' => $detailColumns,
                );
            break;
        }
    }

    public function setColumnInfo ($info = array())
    {
        $this->_columnInfo = array_merge(
            array(
                'checkall' => array('class' => 'table-checkall'),
                'thumbnail' => array('class' => 'text-center table-thumbnail'),
                'cat_id' => array('class' => 'min-width-200', 'orderable' => true),
                'id' => array('class' => 'min-width-40', 'orderable' => true, 'searchable' => true, 'type' => 'n'),
                'name' => array('class' => 'min-width-300', 'orderable' => true, 'searchable' => true),
                'slug' => array('class' => 'min-width-300', 'searchable' => true),
                'title' => array('class' => 'min-width-300', 'searchable' => true),
                'description' => array('class' => 'min-width-500', 'searchable' => true),
                'keyword' => array('class' => 'min-width-300', 'searchable' => true),
                'desc_short' => array('class' => 'min-width-500', 'searchable' => true),
                'sku' => array('class' => 'min-width-100', 'orderable' => true, 'searchable' => true),
                'price_market' => array('class' => 'min-width-70', 'orderable' => true, 'searchable' => true, 'type' => 'n'),
                'price_discount' => array('class' => 'min-width-70', 'orderable' => true, 'searchable' => true, 'type' => 'n'),
                'view' => array('orderable' => true, 'type' => 'n'),
                'date_created' => array('class' => 'text-center min-width-150', 'orderable' => true),
                'date_updated' => array('class' => 'text-center min-width-150', 'orderable' => true),
                'date_published' => array('class' => 'text-center min-width-120', 'orderable' => true),
                'status' => array('class' => 'text-center min-width-100', 'orderable' => true),
                'sort' => array('class' => 'table-sort', 'orderable' => true, 'note' => 'Đánh số để sắp xếp thứ tự hiển thị theo ý muốn. Nguyên tắc số nhỏ hơn sẽ nằm phía trên.'),
                'display' => array('class' => 'table-lang text-center', 'orderable' => true, 'note' => 'Tick chọn để hiển thị trên website, bỏ tick để ẩn đi'),
                'button' => array('class' => 'table-func '.(($this->_definedFields['copy'] && $this->_config['permission']['add']) ? 'copy' : '')),
            ),
            $info
        );
    }
}