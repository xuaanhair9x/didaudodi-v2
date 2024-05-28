<?php

namespace Backend\View\Helper\Api;
use Zend\View\Helper\AbstractHelper;

class Code extends AbstractHelper
{
    public function __invoke($data)
    {
        $data['linkIndex'] = $this->getView()->getHelperPluginManager()->getServiceLocator()->get('Zend\View\Renderer\PhpRenderer')->url('admincp');



        /* --------- Field Input text  -----------  */

        $menu = '<div class="form-group">
            <label>Tên menu</label>
            <input type="text" name="menu" value="'.$data['item']['menu'].'" class="form-control" />
        </div>';

        $name = '<div class="form-group">
            <label>Tiêu đề </label>
            <input type="text" name="name" class="form-control" value="'.$data['item']['name'].'" />
        </div>';

        $desc_short = '<div class="form-group">
            <label>Mô tả </label>
            <input type="text" name="desc_short" class="form-control" value="'.$data['item']['desc_short'].'" />
        </div>';

        $address = '<div class="form-group">
            <label>Địa chỉ </label>
            <input type="text" name="address" class="form-control" value="'.$data['item']['address'].'" />
        </div>';

        $email = '<div class="form-group">
            <label>Email </label>
            <input type="text" name="email" class="form-control" value="'.$data['item']['email'].'" />
        </div>';

        $logo = '<div class="form-group">
            <label>Logo </label>
            <input type="text" name="logo" class="form-control" value="'.$data['item']['logo'].'" />
        </div>';

        $favicon = '<div class="form-group">
            <label>
                Favicon <a href="javascript:;" class="mt-sweetalert-note" data-html="false" data-message="Chỉ nhập kích thước 16x16"><i class="fa fa-question-circle" aria-hidden="true"></i></a>
            </label>
            <input type="text" name="favicon" class="form-control" value="'.$data['item']['favicon'].'" />
        </div>';

        $social = '<div class="form-group">
            <label>
                Share social <a href="javascript:;" class="mt-sweetalert-note" data-html="false" data-message="Chỉ nhập kích thước 560x292"><i class="fa fa-question-circle" aria-hidden="true"></i></a>
            </label>
            <input type="text" name="image" class="form-control" value="'.$data['item']['image'].'" />
        </div>';

        $url_old = '<div class="form-group">
            <label>Url cần chuyển hướng 301 </label>
            <input type="text" name="url_old" class="form-control" value="'.($data['item']['url_old'] ? $data['item']['url_old'] : 'Url cần chuyển hướng 301').'" />
        </div>';

        $url_new = '<div class="form-group">
            <label>Url đích chuyển đến (gốc) </label>
            <input type="text" name="url_new" class="form-control" value="'.($data['item']['url_new'] ? $data['item']['url_new'] : 'Url đích chuyển đến (gốc)').'" />
        </div>';

        $linkInput = '<div class="form-group">
            <label>Link </label>
            <input type="text" name="link" class="form-control" value="'.$data['item']['link'].'" />
        </div>';

        $allow_size_image = '<div class="form-group">
            <label>
                Dung lượng image
                <a
                    href="javascript:;"
                    class="mt-sweetalert-note"
                    data-message="<div>Định nghĩa dung lượng hình ảnh cho phép upload, chỉ nhập số</div><div><b>Đơn vị tính:</b> Megabytes (MB)</div><div><b>Mặc định:</b> 10MB</div>"
                >
                    <i class="fa fa-question-circle"></i>
                </a>
            </label>
            <input type="text" name="allow_size_image" class="form-control" value="'.$data['item']['allow_size_image'].'" />
        </div>';

        $detail = '<div class="form-group">
            <label>Chi tiết </label>
            <input type="text" name="detail" class="form-control" value="'.$data['item']['detail'].'" />
        </div>';

        $thumbnail = '<div class="form-group">
            <label>Ảnh đại diện (WxH) <a href="javascript:;" class="mt-sweetalert-note" data-message="
                        <div>Kích thước sắp xếp theo giá trị từ
                            <b>lớn -> nhỏ</b>
                        </div>
                        <div>
                            <b>Cú pháp:</b> WxH,WxH,...
                        </div>">
                    <i class="fa fa-question-circle"></i>
                </a>
            </label>
            <input type="text" name="thumbnail" class="form-control" value="'.$data['item']['thumbnail'].'" />
        </div>';

        $sku = '<div class="form-group">
            <label>Mã giảm giá </label>
            <input type="text" name="sku" class="form-control" value="'.$data['item']['sku'].'" />
        </div>';

        $order_value = '<div class="form-group">
            <label>Giá trị đơn hàng </label>
            <input type="text" name="order_value" class="form-control" value="'.$data['item']['order_value'].'" />
        </div>';

        $shipping_fee = '<div class="form-group">
            <label>Phí vận chuyển </label>
            <input type="text" name="shipping_fee" class="form-control" value="'.$data['item']['shipping_fee'].'" />
        </div>';

        $paypal_fee = '<div class="form-group">
            <label>Phí thanh toán </label>
            <input type="text" name="paypal_fee" class="form-control" value="'.$data['item']['paypal_fee'].'" />
        </div>';

        $fullname = '<div class="form-group">
            <label>Khách hàng </label>
            <input type="text" name="fullname" class="form-control" value="'.$data['item']['fullname'].'" />
        </div>';

        $phone = '<div class="form-group">
            <label>Điện thoại </label>
            <input type="text" name="phone" class="form-control" value="'.$data['item']['phone'].'" />
        </div>';

        $content = '<div class="form-group">
            <label>Nội dung liên hệ </label>
            <input type="text" name="content" class="form-control" value="'.$data['item']['content'].'" />
        </div>';

        $type = '<div class="form-group">
            <label>Loại yêu cầu </label>
            <input type="text" name="type" class="form-control" value="'.$data['item']['type'].'" />
        </div>';

        $file = '<div class="form-group">
            <label>File đính kèm </label>
            <input type="text" name="file" class="form-control" value="'.$data['item']['file'].'" />
        </div>';

        $icon = '<div class="form-group">
            <label>Icon fontawesome </label>
            <input type="text" name="icon" class="form-control" value="'.$data['item']['icon'].'">
        </div>';

        $price_market = '<div class="form-group">
            <label>Giá SP </label>
            <input type="text" name="price_market" class="form-control" value="'.$data['item']['price_market'].'" />
        </div>';

        $sku = '<div class="form-group">
            <label>Mã SP </label>
            <input type="text" name="sku" class="form-control" value="'.$data['item']['sku'].'" />
        </div>';



        /* --------- End Field Input  -----------  */




        /* --------- Field Checkbox  -----------  */

        $map = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="map" value="Bản đồ" '.($data['item']['map'] ? 'checked':'').' /><span></span>Bản đồ </label>';

        $onoff = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="display" value="On/Off website" '.($data['item']['display'] ? 'checked':'').' /><span></span>On/Off website
            <a href="javascript:;" class="mt-sweetalert-note" data-message="Chức năng bật/tắt website, không hiển thị nội dung website."><i class="fa fa-question-circle" aria-hidden="true"></i></a>
        </label>';

        $confirmExit = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="confirmExit" value="Confirm exit" '.($data['item']['confirmExit'] ? 'checked':'').' /><span></span>Confirm exit </label>';

        $webp = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="webp" value="Support Webp" '.($data['item']['webp'] ? 'checked':'').' /><span></span>Support Webp </label>';

        $titleSEO = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="title" '.($data['item']['title'] ? 'checked':'').' value="Title SEO" />
        <span></span>Title SEO </label>';

        $descriptionSEO = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="description" '.($data['item']['description'] ? 'checked':'').' value="Description SEO" />
        <span></span>Description SEO </label>';

        $keyword = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="keyword" '.($data['item']['keyword'] ? 'checked':'').' value="Keyword" />
        <span></span>Keyword </label>';

        $slug = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="slug" '.($data['item']['slug'] ? 'checked':'').' value="Slug" />
            <span></span>Slug <a href="javascript:;" class="mt-sweetalert-note" data-message="Cho phép users chỉnh sửa slug bài viết. Slug không được trùng.">
                <i class="fa fa-question-circle"></i>
            </a>
        </label>';

        $tags = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="tags" value="Nhập tags" '.($data['item']['tags'] ? 'checked':'').'><span></span>Nhập tags </label>';

        $list_tag_id = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="list_tag_id" '.($data['item']['list_tag_id'] ? 'checked':'').' value="Tags hiển thị" />
        <span></span>Tags hiển thị </label>';

        $embed = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="embed" '.($data['item']['embed'] ? 'checked':'').' value="Tích hợp mã nhúng" />
        <span></span>Tích hợp mã nhúng </label>';

        $display = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="display" '.($data['item']['display'] ? 'checked':'').' value="Ẩn/Hiện" />
            <span></span>Ẩn/Hiện <a href="javascript:;" class="mt-sweetalert-note" data-message="Nếu website có ngôn ngữ thì tắt chức năng này.">
                <i class="fa fa-question-circle"></i>
            </a>
        </label>';

        $add = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="add" '.($data['item']['add'] ? 'checked':'').' value="Thêm" />
        <span></span>Thêm </label>';

        $delete = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="delete" '.($data['item']['delete'] ? 'checked':'').' value="Xóa" />
        <span></span>Xóa </label>';

        $link = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="link" value="Link" '.($data['item']['link'] ? 'checked':'').' /><span></span>Link
            <a href="javascript:;" class="mt-sweetalert-note" data-message="Trường bắt buộc <b>BẬT</b>"><i class="fa fa-question-circle" aria-hidden="true"></i></a>
        </label>';

        $sort = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="sort" '.($data['item']['sort'] ? 'checked':'').' value="Sắp xếp" />
            <span></span>Sắp xếp <a href="javascript:;" class="mt-sweetalert-note" data-message="Sắp xếp theo giá trị từ
                    <b>nhỏ -> lớn</b>">
                <i class="fa fa-question-circle"></i>
            </a>
        </label>';

        $up = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="up_date" value="UP" '.($data['item']['up_date'] ? 'checked':'').'  /><span></span>UP </label>';

        $copy = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="copy" value="Copy" '.($data['item']['copy'] ? 'checked':'').'  /><span></span>Copy </label>';

        $colvis = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="colvis" value="Tùy chỉnh cột" '.($data['item']['colvis'] ? 'checked':'').'  /><span></span>Tùy chỉnh cột </label>';

        $transfer_cate = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="transfer_cate" value="Chuyển danh mục" '.($data['item']['transfer_cate'] ? 'checked':'').'  /><span></span>Chuyển danh mục </label>';

        $status = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="status" value="Duyệt tin" '.($data['item']['status'] ? 'checked':'').'  /><span></span>Duyệt tin </label>';

        $draft = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="draft" value="Lưu nháp" '.($data['item']['draft'] ? 'checked':'').'  /><span></span>Lưu nháp </label>';

        $date_published = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="date_published" value="Lịch xuất bản" '.($data['item']['date_published'] ? 'checked':'').'  /><span></span>Lịch xuất bản </label>';

        $comment = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="comment" value="Bình luận" '.($data['item']['comment'] ? 'checked':'').'  /><span></span>Bình luận </label>';

        $statusDiscount = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="status" value="Trạng thái" '.($data['item']['status'] ? 'checked':'').' /><span></span>Trạng thái </label>';

        $auto = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="auto" value="Tự động áp dụng" '.($data['item']['auto'] ? 'checked':'').' /><span></span>Tự động áp dụng </label>';

        $order_id = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="order_id" value="Phát sinh theo đơn hàng" '.($data['item']['order_id'] ? 'checked':'').' /><span></span>Phát sinh theo đơn hàng </label>';

        $total = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="total" value="Tổng tiền" '.($data['item']['total'] ? 'checked':'').' /><span></span>Tổng tiền </label>';

        $quantity = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="quantity" value="Số lượng" '.($data['item']['quantity'] ? 'checked':'').' /><span></span>Số lượng </label>';

        $discount = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="discount" value="Mã giảm giá" '.($data['item']['discount'] ? 'checked':'').' /><span></span>Mã giảm giá </label>';

        $reply = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="reply" value="Phản hồi" '.($data['item']['reply'] ? 'checked':'').' /><span></span>Phản hồi </label>';

        $allow_edit_menu = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="allow_edit_menu" value="1" '.($data['item']['allow_edit_menu'] ? 'checked':'').'><span></span>Cho phép chỉnh sửa menu</label>';

        $allow_edit_note = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="allow_edit_note" value="1" '.($data['item']['allow_edit_note'] ? 'checked':'').'><span></span>Cho phép chỉnh sửa ghi chú</label>';

        $list_brand_id = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="list_brand_id" value="'.$data['m_brand']['name'].'" '.($data['item']['list_brand_id'] ? 'checked':'').' /><span></span>'.$data['m_brand']['name'].'</label>';

        $list_select_id = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="list_select_id" value="{&#34;id&#34;:&#34;17&#34;,&#34;name&#34;:&#34;'.$data['m_select']['name'].'&#34;}" '.($data['item']['list_select_id'] ? 'checked':'').' /><span></span>'.$data['m_select']['name'].'</label>';

        $price_discount = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="price_discount" value="Giá KM" '.($data['item']['price_discount'] ? 'checked':'').' /><span></span>Giá KM </label>';

        $price_percent = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="price_percent" value="Tính theo %" '.($data['item']['price_percent'] ? 'checked':'').' /><span></span>Tính theo % </label>';

        $excel = '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="excel" value="Xuất excel" '.($data['item']['excel'] ? 'checked':'').' /><span></span>Xuất excel </label>';

        $editable_price = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="editable_price" value="Chỉnh sửa Giá ở trang danh sách" '.($data['item']['editable_price'] ? 'checked':'').' /><span></span>Chỉnh sửa Giá ở trang danh sách
        </label>';

        $editable_price = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="bulk_price" value="Chỉnh sửa Giá nhiều sản phẩm cùng lúc" '.($data['item']['bulk_price'] ? 'checked':'').' /><span></span>Chỉnh sửa Giá nhiều sản phẩm cùng lúc
        </label>';


        /* ---------  End Field Checkbox  -----------  */




        /* ---------  Field Radio  -----------  */

        $none = '<label class="mt-radio mt-radio-outline">
            <input type="radio" name="icon-link-web" value="none" '.($data['item']['icon-link-web'] == 'none' ? 'checked':'').' />
            <span></span>Không hiển thị
        </label>';

        $listNews = '<label class="mt-radio mt-radio-outline">
            <input type="radio" name="icon-link-web" value="news-list" '.($data['item']['icon-link-web'] == 'news-list' ? 'checked':'').' />
            <span></span>Hiển thị
        </label>';

        $listProduct = '<label class="mt-radio mt-radio-outline">
            <input type="radio" name="icon-link-web" value="news-list" '.($data['item']['icon-link-web'] == 'product-list' ? 'checked':'').' />
            <span></span>Hiển thị
        </label>';

        $widthCategoryNews = '<label class="mt-radio mt-radio-outline">
            <input type="radio" name="icon-link-web" value="news-tag-width-category" '.($data['item']['icon-link-web'] == 'news-tag-width-category' ? 'checked':'').' />
            <span></span>Định dạng url có id danh mục
        </label>';

        $withoutCategoryNews = '<label class="mt-radio mt-radio-outline">
            <input type="radio" name="icon-link-web" value="news-tag-without-category" '.($data['item']['icon-link-web'] == 'news-tag-without-category' ? 'checked':'').' />
            <span></span>Định dạng url không có id danh mục
        </label>';

        $unit = '<div class="form-group">
            <strong>Đơn vị giá: &nbsp;&nbsp;&nbsp;</strong>
            <label class="mt-radio mt-radio-outline">
                <input type="radio" name="unit" value="vnd" '.(!$data['item']['unit'] || $data['item']['unit'] == 'vnd' ? 'checked':'').' />
                <span></span>VND
            </label>
            <label class="mt-radio mt-radio-outline">
                <input type="radio" name="unit" value="dollar" '.($data['item']['unit'] == 'dollar' ? 'checked':'').' />
                <span></span>Dollar
            </label>
            '.($data['_params']['__CONTROLLER__'] == 'order_tb' ? '(<a href="javascript:;" ht-trigger="editable-text" data-title="Thay đổi số thập phân" data-placement="bottom" data-pk="input" data-name="unit-decimal" class="editable editable-click">'.($data['item']['unit-decimal'] ?? 3).'</a>)
                <input type="hidden" name="unit-decimal" value="'.($data['item']['unit-decimal'] ?? 3).'" />':'').'
        </div>';

        $catRadio = '<label class="mt-radio mt-radio-outline">
            <input type="radio" name="cat_id" value="radio" '.($data['item']['cat_id'] == 'radio' || !$data['item']['cat_id'] ? 'checked':'').' />
            <span></span>Chọn một
        </label>';

        $catCheckbox = '<label class="mt-radio mt-radio-outline">
            <input type="radio" name="cat_id" value="checkbox" '.($data['item']['cat_id'] == 'checkbox' ? 'checked':'').' />
            <span></span>Chọn nhiều
        </label>';

        /* ---------  End Field Radio  -----------  */




        /* ---------  Field Select  -----------  */

        $level = '<div class="col-md-2">
            <div class="form-group">
                <label>Cấp danh mục&nbsp;</label>
                <select name="level" class="form-control select2 select2-not-search">
                    <option></option>
                    <option value="0">Bỏ chọn</option>
                    <option '.($data['item']['level'] == 1 || (in_array($data['_params']['__CONTROLLER__'], array('product_select_tb','news_select_tb')) && $data['item']['level'] == 2) ? 'selected':'').' value="'.(in_array($data['_params']['__CONTROLLER__'], array('product_select_tb','news_select_tb')) ? 2 : 1).'">Một cấp</option>
                    '.(!in_array($data['_params']['__CONTROLLER__'], array('product_select_tb','news_select_tb')) ? '<option '.($data['item']['level'] == 2 ? 'selected':'').' value="2">Hai cấp</option><option '.($data['item']['level'] == 3 ? 'selected':'').' value="3">Ba cấp</option>':'').'
                </select>
            </div>
        </div>';

        /* ---------  End Field Select  -----------  */





        /* ---------  Other Field  -----------  */

        // special
        $specialItem = '<div data-repeater-item>
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="label" value="" data-toslug class="form-control form-control--text" placeholder="title" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="name" value="" ht-target="toslug" class="form-control form-control--text" placeholder="name" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="note" value="" class="form-control form-control--text" placeholder="note" style="width: calc(100% - 580px);" />
                            <div class="margin-left-10">Hiển thị ( <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="list" value="checked" checked error-checked-repeater />
                                    <span></span>List </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="detail" value="checked" undefined />
                                    <span></span>Detail </label>)
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline" style="padding: 0px 5px;">
                        <i class="fa fa-close"></i>
                    </a>
                </div>
            </div>
        </div>';

        if($data['item']['special']) {
            foreach ($data['item']['special'] as $i => $value) {
                if($i > 0) {
                    $specialItem .= '<div data-repeater-item>
                        <div class="mt-repeater-item mt-overflow">
                            <div class="mt-repeater-cell">
                                <div class="mt-repeater-box">
                                    <div class="align-items toslug">
                                        <input type="text" name="order" value="'.$value['order'].'" class="form-control form-control--sort" placeholder="sort" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="label" value="'.$value['label'].'" data-toslug class="form-control form-control--text" placeholder="title" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="name" value="'.$value['name'].'" ht-target="toslug" class="form-control form-control--text" placeholder="name" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="note" value="'.$value['note'].'" class="form-control form-control--text" placeholder="note" style="width: calc(100% - 580px);" />
                                        <div class="margin-left-10">Hiển thị (
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="list" value="checked" '.($value['list'] ? 'checked':'').' '.(!$value['list'] && !$value['detail'] ? 'error-checked-repeater':'').' />
                                                <span></span>List
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="detail" value="checked" '.($value['detail'] ? 'checked':'').' />
                                                <span></span>Detail
                                            </label>)
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline" style="padding: 0px 5px;">
                                    <i class="fa fa-close"></i>
                                </a>
                            </div>
                        </div>
                    </div>';
                }
            }
        }

        $special = '<div class="form-group mt-repeater margin-bottom-10">
            <strong>Vị trí hiển thị</strong>
            <a href="javascript:;" class="mt-sweetalert-note" data-message="Đối với danh mục product_cat, news_cat, hiển thị trên vị trí <b>menu</b>, <br> yêu cầu bắt buộc giá trị <b>key</b> là <b>menu</b>.">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
            </a>
            <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add"><i class="fa fa-plus"></i></a>
            <div class="margin-top-10" data-repeater-list="special">'.$specialItem.'</div>
        </div>';


        // multi_input
        $inputItem = '<div data-repeater-item>
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="label" value="" class="form-control form-control--text" placeholder="title" data-toslug />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="name" value="" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                            <div class="margin-left-10">
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="hidden" name="title" value="Tiêu đề" />
                                    <input type="checkbox" name="title" value="Tiêu đề" disabled checked error-checked-repeater />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Tiêu đề</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="desc_short" value="Mô tả" />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Mô tả</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="auto" value="checked" />
                                    <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="translate" value="checked" />
                                    <span></span>Translate <a href="javascript:;" class="mt-sweetalert-note" data-message="Trường cần dịch sang ngôn ngữ khác">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="sort" value="checked" undefined />
                                    <span></span>Sắp xếp </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="disabled" value="checked" undefined />
                                    <span></span>Readonly </label>
                                <br />
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="input" error-checked-repeater />
                                    <span></span>Input </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="input-group-radio-multi" error-checked-repeater />
                                    <span></span>Input group radio multi </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="textarea" />
                                    <span></span>Textarea </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="number" />
                                    <span></span>Number </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="date" />
                                    <span></span>Date </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="time" />
                                    <span></span>Time </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="datetime" />
                                    <span></span>Datetime </label>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                        <i class="fa fa-close"></i>
                    </a>
                </div>
            </div>
        </div>';

        if($data['item']['multi_input']) {
            foreach ($data['item']['multi_input'] as $i => $value) {
                if($i > 0) {
                    $inputItem .= '<div data-repeater-item>
                        <div class="mt-repeater-item mt-overflow">
                            <div class="mt-repeater-cell">
                                <div class="mt-repeater-box">
                                    <div class="align-items toslug">
                                        <input type="text" name="order" value="'.$value['order'].'" class="form-control form-control--sort" placeholder="sort" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="label" value="'.$value['label'].'" class="form-control form-control--text" placeholder="title" data-toslug />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="name" value="'.$value['name'].'" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                                        <div class="margin-left-10">
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="hidden" name="title" value="'.($value['title'] ? $value['title'] : 'Tiêu đề').'" />
                                                <input type="checkbox" name="title" value="'.($value['title'] ? $value['title'] : 'Tiêu đề').'" disabled checked error-checked-repeater />
                                                <span></span>
                                                <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($value['title'] ? $value['title'] : 'Tiêu đề').'</a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="desc_short" value="'.($value['desc_short'] ? $value['desc_short'] : 'Mô tả').'" '.($value['desc_short'] ? 'checked':'').' />
                                                <span></span>
                                                <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($value['desc_short'] ? $value['desc_short'] : 'Mô tả').'</a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="auto" value="checked" '.($value['auto'] == 'checked' ? 'checked':'').' />
                                                <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                </a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="translate" value="checked" '.($value['translate'] == 'checked' ? 'checked':'').' />
                                                <span></span>Translate <a href="javascript:;" class="mt-sweetalert-note" data-message="Trường cần dịch sang ngôn ngữ khác">
                                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                </a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="sort" value="checked" '.($value['sort'] == 'checked' ? 'checked':'').' />
                                                <span></span>Sắp xếp </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="disabled" value="checked" '.($value['disabled'] == 'checked' ? 'checked':'').' />
                                                <span></span>Readonly </label>
                                            <br />
                                            <label class="mt-radio mt-radio-outline">
                                                <input type="radio" name="field" value="input" '.($value['field'] == 'input' ? 'checked error-checked-repeater':'').' />
                                                <span></span>Input </label>
                                            <label class="mt-radio mt-radio-outline">
                                                <input type="radio" name="field" value="input-group-radio-multi" '.($value['field'] == 'input-group-radio-multi' ? 'checked error-checked-repeater':'').' />
                                                <span></span>Input group radio multi </label>
                                            <label class="mt-radio mt-radio-outline">
                                                <input type="radio" name="field" value="textarea" '.($value['field'] == 'textarea' ? 'checked error-checked-repeater':'').' />
                                                <span></span>Textarea </label>
                                            <label class="mt-radio mt-radio-outline">
                                                <input type="radio" name="field" value="number" '.($value['field'] == 'number' ? 'checked error-checked-repeater':'').' />
                                                <span></span>Number </label>
                                            <label class="mt-radio mt-radio-outline">
                                                <input type="radio" name="field" value="date" '.($value['field'] == 'date' ? 'checked error-checked-repeater':'').' />
                                                <span></span>Date </label>
                                            <label class="mt-radio mt-radio-outline">
                                                <input type="radio" name="field" value="time" '.($value['field'] == 'time' ? 'checked error-checked-repeater':'').' />
                                                <span></span>Time </label>
                                            <label class="mt-radio mt-radio-outline">
                                                <input type="radio" name="field" value="datetime" '.($value['field'] == 'datetime' ? 'checked error-checked-repeater':'').' />
                                                <span></span>Datetime </label>
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                                    <i class="fa fa-close"></i>
                                </a>
                            </div>
                        </div>
                    </div>';
                }
            }
        }

        $multi_input = '<div class="form-group mt-repeater margin-bottom-10">
            <strong>Input thêm&nbsp;&nbsp;&nbsp;</strong>
            <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add">
                <i class="fa fa-plus"></i>
            </a>
            <div class="margin-top-10" data-repeater-list="multi_input">'.$inputItem.'</div>
        </div>';


        // multi_image
        $imageItem = '<div data-repeater-item>
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="label" value="" class="form-control form-control--text" placeholder="title" data-toslug />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="name" value="" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="size" value="" class="form-control form-control--text" placeholder="size" />
                            <a href="javascript:;" class="mt-sweetalert-note" data-message="
                                        <div>Kích thước sắp xếp theo giá trị từ
                                            <b>lớn -> nhỏ</b>
                                        </div>
                                        <div>
                                            <b>Cú pháp:</b> WxH,WxH,...
                                        </div>">
                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                            </a>
                            <div class="margin-left-10">
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="note" value="Tiêu đề" />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Tiêu đề</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="desc_short" value="Mô tả" />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Mô tả</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="link" value="Link" />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Link</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="auto" value="checked" />
                                    <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="sort" value="checked" undefined />
                                    <span></span>Sắp xếp </label>
                                <div class="margin-top-10">Translate ( <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="translate" value="checked" />
                                        <span></span>Text <a href="javascript:;" class="mt-sweetalert-note" data-message="Tiêu đề, Mô tả, Link cần dịch sang ngôn ngữ khác">
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="translate_image" value="checked" undefined />
                                        <span></span>Image <a href="javascript:;" class="mt-sweetalert-note" data-message="Hình ảnh cần upload cho ngôn ngữ khác">
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                    </label>)
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                        <i class="fa fa-close"></i>
                    </a>
                </div>
            </div>
        </div>';

        if($data['item']['multi_image']) {
            foreach ($data['item']['multi_image'] as $i => $value) {
                if($i > 0) {
                    $imageItem .= '<div data-repeater-item>
                        <div class="mt-repeater-item mt-overflow">
                            <div class="mt-repeater-cell">
                                <div class="mt-repeater-box">
                                    <div class="align-items toslug">
                                        <input type="text" name="order" value="'.$value['order'].'" class="form-control form-control--sort" placeholder="sort" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="label" value="'.$value['label'].'" class="form-control form-control--text" placeholder="title" data-toslug />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="name" value="'.$value['name'].'" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="size" value="'.$value['size'].'" class="form-control form-control--text" placeholder="size" />
                                        <a href="javascript:;" class="mt-sweetalert-note" data-message="
                                                <div>Kích thước sắp xếp theo giá trị từ
                                                    <b>lớn -> nhỏ</b>
                                                </div>
                                                <div>
                                                    <b>Cú pháp:</b> WxH,WxH,...
                                                </div>">
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                        <div class="margin-left-10">
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="note" value="'.($value['note'] ? $value['note'] : 'Tiêu đề').'" '.($value['note'] ? 'checked' : '').' />
                                                <span></span>
                                                <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($value['note'] ? $value['note'] : 'Tiêu đề').'</a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="desc_short" value="'.($value['desc_short'] ? $value['desc_short'] : 'Mô tả').'" '.($value['desc_short'] ? 'checked' : '').' />
                                                <span></span>
                                                <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($value['desc_short'] ? $value['desc_short'] : 'Mô tả').'</a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="link" value="'.($value['link'] ? $value['link'] : 'Link').'" '.($value['link'] ? 'checked' : '').' />
                                                <span></span>
                                                <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($value['link'] ? $value['link'] : 'Link').'</a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="auto" value="checked" '.($value['auto'] == 'checked' ? 'checked':'').' />
                                                <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                </a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="sort" value="checked" '.($value['sort'] == 'checked' ? 'checked':'').' />
                                                <span></span>Sắp xếp
                                            </label>
                                            <div class="margin-top-10">Translate (
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="translate" value="checked" '.($value['translate'] ? 'checked':'').' />
                                                    <span></span>Text <a href="javascript:;" class="mt-sweetalert-note" data-message="Tiêu đề, Mô tả, Link cần dịch sang ngôn ngữ khác">
                                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                    </a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="translate_image" value="checked" '.($value['translate_image'] ? 'checked':'').' />
                                                    <span></span>Image <a href="javascript:;" class="mt-sweetalert-note" data-message="Hình ảnh cần upload cho ngôn ngữ khác">
                                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                    </a>
                                                </label>)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                                    <i class="fa fa-close"></i>
                                </a>
                            </div>
                        </div>
                    </div>';
                }
            }
        }

        $multi_image = '<div class="form-group mt-repeater margin-bottom-10">
            <strong>Image thêm&nbsp;&nbsp;</strong>
            <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add">
                <i class="fa fa-plus"></i>
            </a>
            <div class="margin-top-10" data-repeater-list="multi_image">'.$imageItem.'</div>
        </div>';


        // multi_file
        $fileItem = '<div data-repeater-item>
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" /><span>&nbsp;-&nbsp;</span>
                            <input type="text" name="label" value="" class="form-control form-control--text" placeholder="title" data-toslug /><span>&nbsp;-&nbsp;</span>
                            <input type="text" name="name" value="" class="form-control form-control--text" placeholder="name" ht-target="toslug" /><span>&nbsp;-&nbsp;</span>
                            <input type="text" name="extensions" value="" class="form-control form-control--text" placeholder="extensions" style="width: 250px;" />
                            <a
                                href="javascript:;"
                                class="mt-sweetalert-note"
                                data-message="Định nghĩa định dạng cho phép tải lên (sẽ ghi đè định dạng mặc định).<br>Mặc định cho phép định dạng: doc, docx, xls, xlsx, pptx, pdf, rar, zip"
                            >
                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                            </a>
                            <div class="margin-left-10">
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="auto" value="checked" undefined /><span></span>Tạo động
                                    <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm"> <i class="fa fa-question-circle" aria-hidden="true"></i></a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline"> <input type="checkbox" name="title" value="checked" undefined /><span></span>Tiêu đề </label>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline"><i class="fa fa-close"></i></a>
                </div>
            </div>
        </div>';

        if($data['item']['multi_file']) {
            foreach ($data['item']['multi_file'] as $i => $value) {
                if($i > 0) {
                    $fileItem .= '<div data-repeater-item>
                        <div class="mt-repeater-item mt-overflow">
                            <div class="mt-repeater-cell">
                                <div class="mt-repeater-box">
                                    <div class="align-items toslug">
                                        <input type="text" name="order" value="'.$value['order'].'" class="form-control form-control--sort" placeholder="sort" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="label" value="'.$value['label'].'" class="form-control form-control--text" placeholder="title" data-toslug />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="name" value="'.$value['name'].'" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="extensions" value="'.$value['extensions'].'" class="form-control form-control--text" placeholder="extensions" style="width: 250px;" />
                                        <a
                                            href="javascript:;"
                                            class="mt-sweetalert-note"
                                            data-message="Định nghĩa định dạng cho phép tải lên (sẽ ghi đè định dạng mặc định).<br>Mặc định cho phép định dạng: doc, docx, xls, xlsx, pptx, pdf, rar, zip"
                                        >
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                        <div class="margin-left-10">
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="auto" value="checked" '.($value['auto'] == 'checked' ? 'checked':'').' />
                                                <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                </a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="title" value="checked" '.($value['title'] == 'checked' ? 'checked':'').' />
                                                <span></span>Tiêu đề
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline"><i class="fa fa-close"></i></a>
                            </div>
                        </div>
                    </div>';
                }
            }
        }

        $multi_file = '<div class="form-group mt-repeater margin-bottom-10">
            <strong>File thêm &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
            <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add">
                <i class="fa fa-plus"></i>
            </a>
            <div class="margin-top-10" data-repeater-list="multi_file">'.$fileItem.'</div>
        </div>';


        // multi_detail
        $detailItem = '<div data-repeater-item>
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="label" value="" class="form-control form-control--text" placeholder="title" data-toslug />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="name" value="" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                            <div class="margin-left-10">
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="size" value="mini" />
                                    <span></span>Mini size </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="auto" value="checked" />
                                    <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="translate" value="checked" />
                                    <span></span>Translate <a href="javascript:;" class="mt-sweetalert-note" data-message="Trường cần dịch sang ngôn ngữ khác">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                </label>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                        <i class="fa fa-close"></i>
                    </a>
                </div>
            </div>
        </div>';

        if($data['item']['multi_detail']) {
            foreach ($data['item']['multi_detail'] as $i => $value) {
                if($i > 0) {
                    $detailItem .= '<div data-repeater-item>
                        <div class="mt-repeater-item mt-overflow">
                            <div class="mt-repeater-cell">
                                <div class="mt-repeater-box">
                                    <div class="align-items toslug">
                                        <input type="text" name="order" value="'.$value['order'].'" class="form-control form-control--sort" placeholder="sort" />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="label" value="'.$value['label'].'" class="form-control form-control--text" placeholder="title" data-toslug />
                                        <span>&nbsp;-&nbsp;</span>
                                        <input type="text" name="name" value="'.$value['name'].'" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                                        <div class="margin-left-10">
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="size" value="mini" '.($value['size'] == 'mini' ? 'checked':'').' />
                                                <span></span>Mini size
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="auto" value="checked" '.($value['auto'] == 'checked' ? 'checked':'').' />
                                                <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                </a>
                                            </label>
                                            <label class="mt-checkbox mt-checkbox-outline">
                                                <input type="checkbox" name="translate" value="checked" '.($value['translate'] == 'checked' ? 'checked':'').' />
                                                <span></span>Translate <a href="javascript:;" class="mt-sweetalert-note" data-message="Trường cần dịch sang ngôn ngữ khác">
                                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                </a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                                    <i class="fa fa-close"></i>
                                </a>
                            </div>
                        </div>
                    </div>';
                }
            }
        }

        $multi_detail = '<div class="form-group mt-repeater margin-bottom-10">
            <strong>Editor thêm&nbsp;&nbsp;</strong>
            <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add">
                <i class="fa fa-plus"></i>
            </a>
            <div class="margin-top-10" data-repeater-list="multi_detail">'.$detailItem.'</div>
        </div>';


        // sub child
        // multi_input sub
        $inputItemSub = '<div data-repeater-item>
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="label" value="" class="form-control form-control--text" placeholder="title" data-toslug />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="name" value="" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                            <div class="margin-left-10">
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="hidden" name="title" value="Tiêu đề" />
                                    <input type="checkbox" name="title" value="Tiêu đề" disabled checked error-checked-repeater />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Tiêu đề</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="desc_short" value="Mô tả" />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Mô tả</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="auto" value="checked" />
                                    <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="translate" value="checked" />
                                    <span></span>Translate <a href="javascript:;" class="mt-sweetalert-note" data-message="Trường cần dịch sang ngôn ngữ khác">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="sort" value="checked" undefined />
                                    <span></span>Sắp xếp </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="disabled" value="checked" undefined />
                                    <span></span>Readonly </label>
                                <br />
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="input" error-checked-repeater />
                                    <span></span>Input </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="textarea" />
                                    <span></span>Textarea </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="number" />
                                    <span></span>Number </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="date" />
                                    <span></span>Date </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="time" />
                                    <span></span>Time </label>
                                <label class="mt-radio mt-radio-outline">
                                    <input type="radio" name="field" value="datetime" />
                                    <span></span>Datetime </label>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                        <i class="fa fa-close"></i>
                    </a>
                </div>
            </div>
        </div>';

        // multi_image sub
        $imageItemSub = '<div data-repeater-item>
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="label" value="" class="form-control form-control--text" placeholder="title" data-toslug />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="name" value="" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="size" value="" class="form-control form-control--text" placeholder="size" />
                            <a href="javascript:;" class="mt-sweetalert-note" data-message="
                                        <div>Kích thước sắp xếp theo giá trị từ
                                            <b>lớn -> nhỏ</b>
                                        </div>
                                        <div>
                                            <b>Cú pháp:</b> WxH,WxH,...
                                        </div>">
                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                            </a>
                            <div class="margin-left-10">
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="note" value="Tiêu đề" />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Tiêu đề</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="desc_short" value="Mô tả" />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Mô tả</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="link" value="Link" />
                                    <span></span>
                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Link</a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="auto" value="checked" />
                                    <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="sort" value="checked" undefined />
                                    <span></span>Sắp xếp </label>
                                <div class="margin-top-10">Translate ( <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="translate" value="checked" />
                                        <span></span>Text <a href="javascript:;" class="mt-sweetalert-note" data-message="Tiêu đề, Mô tả, Link cần dịch sang ngôn ngữ khác">
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="translate_image" value="checked" undefined />
                                        <span></span>Image <a href="javascript:;" class="mt-sweetalert-note" data-message="Hình ảnh cần upload cho ngôn ngữ khác">
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                    </label>)
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                        <i class="fa fa-close"></i>
                    </a>
                </div>
            </div>
        </div>';

        //sub select

        if($data['elements']['select']) {
            $indexSelect = array_search('list_select_id', array_column($data['elements']['select'], 'name'));
            foreach ($data['elements']['select'][$indexSelect]['list'] as $i => $value) {
                $optionSubSelect .= '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="list_select_id]['.$i.'" value="'.$i.'" /><span></span>'.$value.'</label>';
            }

            $subSelectDefault = '<div class="col-md-12">
                <div class="form-group" style="display: flex;">
                    <strong style="flex: none;">Thuộc tính (select)</strong>
                    <div class="config-field">'.$optionSubSelect.'</div>
                </div>
            </div>';
        }

        // sub special
        // special
        $specialSubItem = '<div data-repeater-item>
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="label" value="" data-toslug class="form-control form-control--text" placeholder="title" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="name" value="" ht-target="toslug" class="form-control form-control--text" placeholder="name" />
                            <span>&nbsp;-&nbsp;</span>
                            <input type="text" name="note" value="" class="form-control form-control--text" placeholder="note" style="width: calc(100% - 580px);" />
                            <div class="margin-left-10">Hiển thị ( <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="list" value="checked" checked error-checked-repeater />
                                    <span></span>List </label>
                                <label class="mt-checkbox mt-checkbox-outline">
                                    <input type="checkbox" name="detail" value="checked" undefined />
                                    <span></span>Detail </label>)
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline" style="padding: 0px 5px;">
                        <i class="fa fa-close"></i>
                    </a>
                </div>
            </div>
        </div>';

        // sub item
        $subItem = '<div data-repeater-item class="col-md-12">
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="row align-items toslug">
                            <div class="col-md-1"><input type="text" name="sub_id" class="form-control text-center" placeholder="Id" readonly value="" /></div>
                            <div class="col-md-3"><input type="text" name="label" data-toslug class="form-control" placeholder="Field name" value="" /></div>
                            <div class="col-md-3"><input type="text" name="key" ht-target="toslug" class="form-control" placeholder="Slug" value="" /></div>
                        </div>
                        <div class="headline-1">
                            <hr />
                            <h5 class="headline__title text-uppercase">Trường dữ liệu</h5>
                        </div>
                        <div class="row" data-define="define">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Tiêu đề</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" name="name" class="form-control" value="undefined" />
                                        <div class="flex-none"></div>
                                    </div>
                                </div>
                            </div>
                            '.($data['_params']['__CONTROLLER__'] == 'product_tb' ? '<div class="col-md-2">
                                <div class="form-group">
                                    <label>Mã SP</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" name="sku" class="form-control" value="undefined">
                                        <div class="flex-none "></div>
                                    </div>
                                </div>
                            </div>':'').'
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Mô tả</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" name="desc_short" class="form-control" value="undefined" />
                                        <div class="flex-none"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Chi tiết</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" name="detail" class="form-control" value="undefined">
                                        <div class="flex-none margin-left-5"><label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="detail_size" value="mini"><span></span>Mini size</label></div>
                                    </div>
                                </div>
                            </div>
                            '.(in_array($data['_params']['__CONTROLLER__'], array('html_tb','section_tb')) ? '<div class="col-md-2">
                                <div class="form-group">
                                    <label>Icon fontawesome</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" name="icon" class="form-control" value="undefined">
                                        <div class="flex-none "></div>
                                    </div>
                                </div>
                            </div>':'').'
                            '.($data['_params']['__CONTROLLER__'] == 'product_tb' ? '<div class="col-md-2">
                                <div class="form-group">
                                    <label>Giá SP</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" name="price_market" class="form-control" value="undefined">
                                        <div class="flex-none "></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Giá KM</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" name="price_discount" class="form-control" value="undefined">
                                        <div class="flex-none "></div>
                                    </div>
                                </div>
                            </div>':'').'
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Ảnh đại diện (WxH)</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" name="thumbnail" class="form-control" value="undefined" />
                                        <div class="flex-none"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group inner-repeater mt-repeater margin-bottom-10">
                                    <strong>Input thêm&nbsp;&nbsp;&nbsp;</strong> <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add"><i class="fa fa-plus"></i></a>
                                    <div class="margin-top-10" data-repeater-list="define][multi_input">'.$inputItemSub.'</div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group inner-repeater mt-repeater margin-bottom-10">
                                    <strong>Image thêm&nbsp;&nbsp;&nbsp;</strong> <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add"><i class="fa fa-plus"></i></a>
                                    <div class="margin-top-10" data-repeater-list="define][multi_image">'.$imageItemSub.'</div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group inner-repeater mt-repeater margin-bottom-10">
                                    <strong>Vị trí hiển thị</strong>
                                    <a href="javascript:;" class="mt-sweetalert-note" data-message="Đối với danh mục product_cat, news_cat, hiển thị trên vị trí <b>menu</b>, <br> yêu cầu bắt buộc giá trị <b>key</b> là <b>menu</b>.">
                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                    </a>
                                    <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add"><i class="fa fa-plus"></i></a>
                                    <div class="margin-top-10" data-repeater-list="define][special">'.$specialSubItem.'</div>
                                </div>
                            </div>
                            '.($data['_params']['__CONTROLLER__'] == 'product_tb' ? $subSelectDefault:'').'
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline"><i class="fa fa-close"></i></a>
                </div>
            </div>
        </div>';

        foreach ($data['item']['sub'] as $subX => $value) {
            $addInputItemSub = '<div data-repeater-item>
                <div class="mt-repeater-item mt-overflow">
                    <div class="mt-repeater-cell">
                        <div class="mt-repeater-box">
                            <div class="align-items toslug">
                                <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                                <span>&nbsp;-&nbsp;</span>
                                <input type="text" name="label" value="" class="form-control form-control--text" placeholder="title" data-toslug />
                                <span>&nbsp;-&nbsp;</span>
                                <input type="text" name="name" value="" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                                <div class="margin-left-10">
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="hidden" name="title" value="Tiêu đề" />
                                        <input type="checkbox" name="title" value="Tiêu đề" disabled checked error-checked-repeater />
                                        <span></span>
                                        <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Tiêu đề</a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="desc_short" value="Mô tả" />
                                        <span></span>
                                        <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Mô tả</a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="auto" value="checked" />
                                        <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="translate" value="checked" />
                                        <span></span>Translate <a href="javascript:;" class="mt-sweetalert-note" data-message="Trường cần dịch sang ngôn ngữ khác">
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="sort" value="checked" undefined />
                                        <span></span>Sắp xếp </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="disabled" value="checked" undefined />
                                        <span></span>Readonly </label>
                                    <br />
                                    <label class="mt-radio mt-radio-outline">
                                        <input type="radio" name="field" value="input" error-checked-repeater />
                                        <span></span>Input </label>
                                    <label class="mt-radio mt-radio-outline">
                                        <input type="radio" name="field" value="textarea" />
                                        <span></span>Textarea </label>
                                    <label class="mt-radio mt-radio-outline">
                                        <input type="radio" name="field" value="number" />
                                        <span></span>Number </label>
                                    <label class="mt-radio mt-radio-outline">
                                        <input type="radio" name="field" value="date" />
                                        <span></span>Date </label>
                                    <label class="mt-radio mt-radio-outline">
                                        <input type="radio" name="field" value="time" />
                                        <span></span>Time </label>
                                    <label class="mt-radio mt-radio-outline">
                                        <input type="radio" name="field" value="datetime" />
                                        <span></span>Datetime </label>
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                            <i class="fa fa-close"></i>
                        </a>
                    </div>
                </div>
            </div>';

            $addImageItemSub = '<div data-repeater-item>
                <div class="mt-repeater-item mt-overflow">
                    <div class="mt-repeater-cell">
                        <div class="mt-repeater-box">
                            <div class="align-items toslug">
                                <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                                <span>&nbsp;-&nbsp;</span>
                                <input type="text" name="label" value="" class="form-control form-control--text" placeholder="title" data-toslug />
                                <span>&nbsp;-&nbsp;</span>
                                <input type="text" name="name" value="" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                                <span>&nbsp;-&nbsp;</span>
                                <input type="text" name="size" value="" class="form-control form-control--text" placeholder="size" />
                                <a href="javascript:;" class="mt-sweetalert-note" data-message="
                                            <div>Kích thước sắp xếp theo giá trị từ
                                                <b>lớn -> nhỏ</b>
                                            </div>
                                            <div>
                                                <b>Cú pháp:</b> WxH,WxH,...
                                            </div>">
                                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                                </a>
                                <div class="margin-left-10">
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="note" value="Tiêu đề" />
                                        <span></span>
                                        <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Tiêu đề</a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="desc_short" value="Mô tả" />
                                        <span></span>
                                        <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Mô tả</a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="link" value="Link" />
                                        <span></span>
                                        <a href="javascript:;" data-container="editable-checkbox" data-pk="input">Link</a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="auto" value="checked" />
                                        <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                        </a>
                                    </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="sort" value="checked" undefined />
                                        <span></span>Sắp xếp </label>
                                    <div class="margin-top-10">Translate ( <label class="mt-checkbox mt-checkbox-outline">
                                            <input type="checkbox" name="translate" value="checked" />
                                            <span></span>Text <a href="javascript:;" class="mt-sweetalert-note" data-message="Tiêu đề, Mô tả, Link cần dịch sang ngôn ngữ khác">
                                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                                            </a>
                                        </label>
                                        <label class="mt-checkbox mt-checkbox-outline">
                                            <input type="checkbox" name="translate_image" value="checked" undefined />
                                            <span></span>Image <a href="javascript:;" class="mt-sweetalert-note" data-message="Hình ảnh cần upload cho ngôn ngữ khác">
                                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                                            </a>
                                        </label>)
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                            <i class="fa fa-close"></i>
                        </a>
                    </div>
                </div>
            </div>';

            $addSpecialItemSub = '<div data-repeater-item>
                <div class="mt-repeater-item mt-overflow">
                    <div class="mt-repeater-cell">
                        <div class="mt-repeater-box">
                            <div class="align-items toslug">
                                <input type="text" name="order" value="0" class="form-control form-control--sort" placeholder="sort" />
                                <span>&nbsp;-&nbsp;</span>
                                <input type="text" name="label" value="" data-toslug class="form-control form-control--text" placeholder="title" />
                                <span>&nbsp;-&nbsp;</span>
                                <input type="text" name="name" value="" ht-target="toslug" class="form-control form-control--text" placeholder="name" />
                                <span>&nbsp;-&nbsp;</span>
                                <input type="text" name="note" value="" class="form-control form-control--text" placeholder="note" style="width: calc(100% - 580px);" />
                                <div class="margin-left-10">Hiển thị ( <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="list" value="checked" checked error-checked-repeater />
                                        <span></span>List </label>
                                    <label class="mt-checkbox mt-checkbox-outline">
                                        <input type="checkbox" name="detail" value="checked" undefined />
                                        <span></span>Detail </label>)
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline" style="padding: 0px 5px;">
                            <i class="fa fa-close"></i>
                        </a>
                    </div>
                </div>
            </div>';

            if($subX > 0) {
                foreach ($value['define']['multi_input'] as $inputX => $valueSub) {
                    if($inputX > 0) {
                        $addInputItemSub .= '<div data-repeater-item>
                            <div class="mt-repeater-item mt-overflow">
                                <div class="mt-repeater-cell">
                                    <div class="mt-repeater-box">
                                        <div class="align-items toslug">
                                            <input type="text" name="order" value="'.$valueSub['order'].'" class="form-control form-control--sort" placeholder="sort" />
                                            <span>&nbsp;-&nbsp;</span>
                                            <input type="text" name="label" value="'.$valueSub['label'].'" class="form-control form-control--text" placeholder="title" data-toslug />
                                            <span>&nbsp;-&nbsp;</span>
                                            <input type="text" name="name" value="'.$valueSub['name'].'" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                                            <div class="margin-left-10">
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="hidden" name="title" value="'.($valueSub['title'] ? $valueSub['title'] : 'Tiêu đề').'" />
                                                    <input type="checkbox" name="title" value="'.($valueSub['title'] ? $valueSub['title'] : 'Tiêu đề').'" disabled checked error-checked-repeater />
                                                    <span></span>
                                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($valueSub['title'] ? $valueSub['title'] : 'Tiêu đề').'</a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="desc_short" value="'.($valueSub['desc_short'] ? $valueSub['desc_short'] : 'Mô tả').'" '.($valueSub['desc_short'] ? 'checked':'').' />
                                                    <span></span>
                                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($valueSub['desc_short'] ? $valueSub['desc_short'] : 'Mô tả').'</a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="auto" value="checked" '.($valueSub['auto'] == 'checked' ? 'checked':'').' />
                                                    <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                    </a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="translate" value="checked" '.($valueSub['translate'] == 'checked' ? 'checked':'').' />
                                                    <span></span>Translate <a href="javascript:;" class="mt-sweetalert-note" data-message="Trường cần dịch sang ngôn ngữ khác">
                                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                    </a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="sort" value="checked" '.($valueSub['sort'] == 'checked' ? 'checked':'').' />
                                                    <span></span>Sắp xếp </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="disabled" value="checked" '.($valueSub['disabled'] == 'checked' ? 'checked':'').' />
                                                    <span></span>Readonly </label>
                                                <br />
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="field" value="input" '.($valueSub['field'] == 'input' ? 'checked error-checked-repeater':'').' />
                                                    <span></span>Input </label>
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="field" value="textarea" '.($valueSub['field'] == 'textarea' ? 'checked error-checked-repeater':'').' />
                                                    <span></span>Textarea </label>
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="field" value="number" '.($valueSub['field'] == 'number' ? 'checked error-checked-repeater':'').' />
                                                    <span></span>Number </label>
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="field" value="date" '.($valueSub['field'] == 'date' ? 'checked error-checked-repeater':'').' />
                                                    <span></span>Date </label>
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="field" value="time" '.($valueSub['field'] == 'time' ? 'checked error-checked-repeater':'').' />
                                                    <span></span>Time </label>
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="field" value="datetime" '.($valueSub['field'] == 'datetime' ? 'checked error-checked-repeater':'').' />
                                                    <span></span>Datetime </label>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                                        <i class="fa fa-close"></i>
                                    </a>
                                </div>
                            </div>
                        </div>';
                    }
                }

                foreach ($value['define']['multi_image'] as $imageX => $valueSubImg) {
                    if($imageX > 0) {
                        $addImageItemSub .= '<div data-repeater-item>
                            <div class="mt-repeater-item mt-overflow">
                                <div class="mt-repeater-cell">
                                    <div class="mt-repeater-box">
                                        <div class="align-items toslug">
                                            <input type="text" name="order" value="'.$valueSubImg['order'].'" class="form-control form-control--sort" placeholder="sort" />
                                            <span>&nbsp;-&nbsp;</span>
                                            <input type="text" name="label" value="'.$valueSubImg['label'].'" class="form-control form-control--text" placeholder="title" data-toslug />
                                            <span>&nbsp;-&nbsp;</span>
                                            <input type="text" name="name" value="'.$valueSubImg['name'].'" class="form-control form-control--text" placeholder="name" ht-target="toslug" />
                                            <span>&nbsp;-&nbsp;</span>
                                            <input type="text" name="size" value="'.$valueSubImg['size'].'" class="form-control form-control--text" placeholder="size" />
                                            <a href="javascript:;" class="mt-sweetalert-note" data-message="
                                                    <div>Kích thước sắp xếp theo giá trị từ
                                                        <b>lớn -> nhỏ</b>
                                                    </div>
                                                    <div>
                                                        <b>Cú pháp:</b> WxH,WxH,...
                                                    </div>">
                                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                                            </a>
                                            <div class="margin-left-10">
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="note" value="'.($valueSubImg['note'] ? $valueSubImg['note'] : 'Tiêu đề').'" '.($valueSubImg['note'] ? 'checked' : '').' />
                                                    <span></span>
                                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($valueSubImg['note'] ? $valueSubImg['note'] : 'Tiêu đề').'</a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="desc_short" value="'.($valueSubImg['desc_short'] ? $valueSubImg['desc_short'] : 'Mô tả').'" '.($valueSubImg['desc_short'] ? 'checked' : '').' />
                                                    <span></span>
                                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($valueSubImg['desc_short'] ? $valueSubImg['desc_short'] : 'Mô tả').'</a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="link" value="'.($valueSubImg['link'] ? $valueSubImg['link'] : 'Link').'" '.($valueSubImg['link'] ? 'checked' : '').' />
                                                    <span></span>
                                                    <a href="javascript:;" data-container="editable-checkbox" data-pk="input">'.($valueSubImg['link'] ? $valueSubImg['link'] : 'Link').'</a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="auto" value="checked" '.($valueSubImg['auto'] == 'checked' ? 'checked':'').' />
                                                    <span></span>Tạo động <a href="javascript:;" class="mt-sweetalert-note" data-message="User admin tự thêm">
                                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                    </a>
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="sort" value="checked" '.($valueSubImg['sort'] == 'checked' ? 'checked':'').' />
                                                    <span></span>Sắp xếp
                                                </label>
                                                <div class="margin-top-10">Translate (
                                                    <label class="mt-checkbox mt-checkbox-outline">
                                                        <input type="checkbox" name="translate" value="checked" '.($valueSubImg['translate'] ? 'checked':'').' />
                                                        <span></span>Text <a href="javascript:;" class="mt-sweetalert-note" data-message="Tiêu đề, Mô tả, Link cần dịch sang ngôn ngữ khác">
                                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                        </a>
                                                    </label>
                                                    <label class="mt-checkbox mt-checkbox-outline">
                                                        <input type="checkbox" name="translate_image" value="checked" '.($valueSubImg['translate_image'] ? 'checked':'').' />
                                                        <span></span>Image <a href="javascript:;" class="mt-sweetalert-note" data-message="Hình ảnh cần upload cho ngôn ngữ khác">
                                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                        </a>
                                                    </label>)
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline">
                                        <i class="fa fa-close"></i>
                                    </a>
                                </div>
                            </div>
                        </div>';
                    }
                }

                foreach ($value['define']['special'] as $specialX => $valueSubSpecial) {
                    if($specialX > 0) {
                        $addSpecialItemSub .= '<div data-repeater-item>
                            <div class="mt-repeater-item mt-overflow">
                                <div class="mt-repeater-cell">
                                    <div class="mt-repeater-box">
                                        <div class="align-items toslug">
                                            <input type="text" name="order" value="'.$valueSubSpecial['order'].'" class="form-control form-control--sort" placeholder="sort" />
                                            <span>&nbsp;-&nbsp;</span>
                                            <input type="text" name="label" value="'.$valueSubSpecial['label'].'" data-toslug class="form-control form-control--text" placeholder="title" />
                                            <span>&nbsp;-&nbsp;</span>
                                            <input type="text" name="name" value="'.$valueSubSpecial['name'].'" ht-target="toslug" class="form-control form-control--text" placeholder="name" />
                                            <span>&nbsp;-&nbsp;</span>
                                            <input type="text" name="note" value="'.$valueSubSpecial['note'].'" class="form-control form-control--text" placeholder="note" style="width: calc(100% - 580px);" />
                                            <div class="margin-left-10">Hiển thị (
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="list" value="checked" '.($valueSubSpecial['list'] ? 'checked':'').' '.(!$valueSubSpecial['list'] && !$valueSubSpecial['detail'] ? 'error-checked-repeater':'').' />
                                                    <span></span>List
                                                </label>
                                                <label class="mt-checkbox mt-checkbox-outline">
                                                    <input type="checkbox" name="detail" value="checked" '.($valueSubSpecial['detail'] ? 'checked':'').' />
                                                    <span></span>Detail
                                                </label>)
                                            </div>
                                        </div>
                                    </div>
                                    <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline" style="padding: 0px 5px;">
                                        <i class="fa fa-close"></i>
                                    </a>
                                </div>
                            </div>
                        </div>';
                    }
                }

                $multi_inputSub = '<div class="form-group inner-repeater mt-repeater margin-bottom-10">
                    <strong>Input thêm&nbsp;&nbsp;&nbsp;</strong>
                    <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add">
                        <i class="fa fa-plus"></i>
                    </a>
                    <div class="margin-top-10" data-repeater-list="define][multi_input">'.$addInputItemSub.'</div>
                </div>';

                $multi_imageSub = '<div class="form-group inner-repeater mt-repeater margin-bottom-10">
                    <strong>Image thêm&nbsp;&nbsp;</strong>
                    <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add">
                        <i class="fa fa-plus"></i>
                    </a>
                    <div class="margin-top-10" data-repeater-list="define][multi_image">'.$addImageItemSub.'</div>
                </div>';

                $special_Sub = '<div class="form-group inner-repeater mt-repeater margin-bottom-10">
                    <strong>Vị trí hiển thị</strong>
                    <a href="javascript:;" class="mt-sweetalert-note" data-message="Đối với danh mục product_cat, news_cat, hiển thị trên vị trí <b>menu</b>, <br> yêu cầu bắt buộc giá trị <b>key</b> là <b>menu</b>.">
                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                    </a>
                    <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add"><i class="fa fa-plus"></i></a>
                    <div class="margin-top-10" data-repeater-list="define][special">'.$addSpecialItemSub.'</div>
                </div>';

                if($data['elements']['select']) {
                    $indexSelect = array_search('list_select_id', array_column($data['elements']['select'], 'name'));
                    $optionSubItemSelect = '';
                    foreach ($data['elements']['select'][$indexSelect]['list'] as $subSelect => $subSelectItem) {
                        $optionSubItemSelect .= '<label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="list_select_id]['.$subSelect.'" value="'.$subSelect.'" '.(in_array($subSelect, $value['define']['list_select_id']) ? 'checked':'').' /><span></span>'.$subSelectItem.'</label>';
                    }

                    $subSelected = '<div class="form-group" style="display: flex;">
                        <strong style="flex: none;">Thuộc tính (select)</strong>
                        <div class="config-field">'.$optionSubItemSelect.'</div>
                    </div>';
                }

                $subItem .= '<div data-repeater-item class="col-md-12">
                    <div class="mt-repeater-item mt-overflow">
                        <div class="mt-repeater-cell">
                            <div class="mt-repeater-box">
                                <div class="row align-items toslug">
                                    <div class="col-md-1"><input type="text" name="sub_id" class="form-control text-center" placeholder="Id" readonly value="'.$value['sub_id'].'" /></div>
                                    <div class="col-md-3"><input type="text" name="label" data-toslug class="form-control" placeholder="Field name" value="'.$value['label'].'" /></div>
                                    <div class="col-md-3"><input type="text" name="key" ht-target="toslug" class="form-control" placeholder="Slug" value="'.$value['key'].'" /></div>
                                </div>
                                <div class="headline-1">
                                    <hr />
                                    <h5 class="headline__title text-uppercase">Trường dữ liệu</h5>
                                </div>
                                <div class="row" data-define="define">
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label>Tiêu đề</label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" name="name" class="form-control" value="'.$value['define']['name'].'" />
                                                <div class="flex-none"></div>
                                            </div>
                                        </div>
                                    </div>
                                    '.($data['_params']['__CONTROLLER__'] == 'product_tb' ? '<div class="col-md-2">
                                        <div class="form-group">
                                            <label>Mã SP</label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" name="sku" class="form-control" value="'.$value['define']['sku'].'">
                                                <div class="flex-none "></div>
                                            </div>
                                        </div>
                                    </div>':'').'
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label>Mô tả</label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" name="desc_short" class="form-control" value="'.$value['define']['desc_short'].'" />
                                                <div class="flex-none"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label>Chi tiết</label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" name="detail" class="form-control" value="'.$value['define']['detail'].'">
                                                <div class="flex-none margin-left-5"><label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="detail_size" value="mini" '.($value['define']['detail_size'] == 'mini' ? 'checked':'').'><span></span>Mini size</label></div>
                                            </div>
                                        </div>
                                    </div>
                                    '.(in_array($data['_params']['__CONTROLLER__'], array('html_tb','section_tb')) ? '<div class="col-md-2">
                                        <div class="form-group">
                                            <label>Icon fontawesome</label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" name="icon" class="form-control" value="'.$value['define']['icon'].'">
                                                <div class="flex-none "></div>
                                            </div>
                                        </div>
                                    </div>':'').'
                                    '.($data['_params']['__CONTROLLER__'] == 'product_tb' ? '<div class="col-md-2">
                                        <div class="form-group">
                                            <label>Giá SP</label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" name="price_market" class="form-control" value="'.$value['define']['price_market'].'">
                                                <div class="flex-none "></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label>Giá KM</label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" name="price_discount" class="form-control" value="'.$value['define']['price_discount'].'">
                                                <div class="flex-none "></div>
                                            </div>
                                        </div>
                                    </div>':'').'
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label>Ảnh đại diện (WxH)</label>
                                            <div class="d-flex align-items-center">
                                                <input type="text" name="thumbnail" class="form-control" value="'.$value['define']['thumbnail'].'" />
                                                <div class="flex-none"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">'.$multi_inputSub.'</div>
                                    <div class="col-md-12">'.$multi_imageSub.'</div>
                                    <div class="col-md-12">'.$subSelected.'</div>
                                    <div class="col-md-12">'.$special_Sub.'</div>
                                </div>
                            </div>
                            <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline"><i class="fa fa-close"></i></a>
                        </div>
                    </div>
                </div>';
            }
        }

        $sub = '<div class="form-group mt-repeater margin-bottom-10">
            <strong>
                '.($data['_params']['__CONTROLLER__'] == 'section_tb' ? 'Section' : ($data['_params']['__CONTROLLER__'] == 'news_tb' ? 'Bài viết':'Sản phẩm')).' con <a href="javascript:;" class="mt-sweetalert-note" data-message="Thêm trường khác theo yêu cầu"> <i class="fa fa-question-circle" aria-hidden="true"></i></a>
            </strong>
            <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add"><i class="fa fa-plus"></i></a>
            <div class="row margin-top-10" data-repeater-list="sub">'.$subItem.'</div>
        </div>';


        // list_label_id
        $label = '<label class="mt-checkbox mt-checkbox-outline">
            <input type="checkbox" name="list_label_id[label]" '.($data['item']['list_label_id'] ? 'checked':'').' value="'.$data['m_label']['name'].'" />
            <span></span>'.$data['m_label']['name'].' (
            <label class="mt-radio mt-radio-outline">
                <input type="radio" name="list_label_id[mapping]" '.($data['item']['list_label_id']['mapping'] == 'single' ? 'checked':'').' value="single" '.(!$data['item']['list_label_id'] ? 'disabled':'').' />
                <span></span>Map một <a href="javascript:;" class="mt-sweetalert-note" data-message="
                    <b>Một</b> '.$data['m_label']['name'].' chỉ mapping với
                    <b>một</b> danh mục cấp 1.">
                    <i class="fa fa-question-circle"></i>
                </a>
            </label>
            <label class="mt-radio mt-radio-outline">
                <input type="radio" name="list_label_id[mapping]" '.($data['item']['list_label_id']['mapping'] == 'multi' ? 'checked':'').' value="multi" '.(!$data['item']['list_label_id'] ? 'disabled':'').' />
                <span></span>Map nhiều <a href="javascript:;" class="mt-sweetalert-note" data-message="
                    <b>Một</b> '.$data['m_label']['name'].' mapping với
                    <b>nhiều</b> danh mục cấp 1.">
                    <i class="fa fa-question-circle"></i>
                </a>
            </label> )
        </label>';


        // select list_select_id, list_news_id, list_product_id
        if($data['elements']['select']) {
            $indexNews = array_search('list_news_id', array_column($data['elements']['select'], 'name'));
            $indexProduct = array_search('list_product_id', array_column($data['elements']['select'], 'name'));
            $indexSelect = array_search('list_select_id', array_column($data['elements']['select'], 'name'));

            foreach ($data['elements']['select'][$indexNews]['list'] as $i => $value) {
                $optionNews .= '<option value="'.$i.'" '.(in_array($i, $data['item']['list_news_id']) ? 'selected':'').' >'.$value.'</option>';
            }

            foreach ($data['elements']['select'][$indexProduct]['list'] as $i => $value) {
                $optionProduct .= '<option value="'.$i.'" '.(in_array($i, $data['item']['list_product_id']) ? 'selected':'').' >'.$value.'</option>';
            }

            foreach ($data['elements']['select'][$indexSelect]['list'] as $i => $value) {
                $optionSelect .= '<option value="'.$i.'" '.(in_array($i, $data['item']['list_select_id']) ? 'selected':'').' >'.$value.'</option>';
            }

            $list_news_id = '<div class="col-md-3">
                <div class="form-group">
                    <label>&nbsp;</label>
                    <a href="javascript:;"
                        ht-trigger="editable-text"
                        data-title="Chỉnh sửa tiêu đề"
                        data-placement="bottom"
                        data-pk="input"
                        data-name="list_news_title"
                        class="editable editable-click" data-original-title="" title=""
                    >'.($data['item']['list_news_title'] ? $data['item']['list_news_title'] : 'Chọn tin tức liên quan').'</a>
                    <input type="hidden" name="list_news_title" value="'.($data['item']['list_news_title'] ? $data['item']['list_news_title'] : 'Chọn tin tức liên quan').'" />
                    <div class="define-multiselect-container">
                        <select name="list_news_id[]" class="mt-multiselect btn btn-default" multiple data-filter="false">'.$optionNews.'</select>
                        <div class="multiselect-native-checkbox">
                            <label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="list_news_ajax" value="'.$data['item']['list_news_ajax'].'" '.($data['item']['list_news_ajax'] ? 'checked':'').' /><span></span>Load ajax</label>
                        </div>
                    </div>
                </div>
            </div>';

            $list_product_id = '<div class="col-md-3">
                <div class="form-group">
                    <label>&nbsp;</label>
                    <a href="javascript:;"
                        ht-trigger="editable-text"
                        data-title="Chỉnh sửa tiêu đề"
                        data-placement="bottom"
                        data-pk="input"
                        data-name="list_product_title"
                        class="editable editable-click" data-original-title="" title=""
                    >'.($data['item']['list_product_title'] ? $data['item']['list_product_title'] : 'Chọn sản phẩm liên quan').'</a>
                    <input type="hidden" name="list_product_title" value="'.($data['item']['list_product_title'] ? $data['item']['list_product_title'] : 'Chọn sản phẩm liên quan').'" />
                    <div class="define-multiselect-container">
                        <select name="list_product_id[]" class="mt-multiselect btn btn-default" multiple data-filter="false">'.$optionProduct.'</select>
                        <div class="multiselect-native-checkbox">
                            <label class="mt-checkbox mt-checkbox-outline"><input type="checkbox" name="list_product_ajax" value="'.$data['item']['list_product_ajax'].'" '.($data['item']['list_product_ajax'] ? 'checked':'').' /><span></span>Load ajax</label>
                        </div>
                    </div>
                </div>
            </div>';

            $list_selectCate_id = '<div class="col-md-2">
                <div class="form-group">
                    <label>Thuộc tính (select)&nbsp;</label>
                    <div class="define-multiselect-container">
                        <select name="list_select_id[]" class="mt-multiselect btn btn-default" multiple data-filter="false">
                            '.$optionSelect.'
                        </select>
                        <div class="multiselect-native-checkbox"></div>
                    </div>
                </div>
            </div>';

            if($data['_params']['__CONTROLLER__'] == 'product_discount_tb') {
                $discountOption = '';
                foreach ($data['elements']['select'] as $i => $item) {
                    $optionList = '';
                    foreach ($item['list'] as $j => $option) {
                        $optionList .= '<option value="'.$j.'" '.(in_array($j, $data['item'][$item['name']]) ? 'selected':'').'>'.$option.'</option>';
                    }

                    $discountOption .= '<div class="col-md-2">
                        <div class="form-group">
                            <label>'.$item['label'].'&nbsp;</label>
                            <div class="define-multiselect-container">
                                <span class="multiselect-native-select">
                                    <select name="'.$item['name'].'[]" class="mt-multiselect btn btn-default" '.$item['type'].' data-filter="false">
                                        '.$optionList.'
                                    </select>
                                </span>
                                <div class="multiselect-native-checkbox"></div>
                            </div>
                        </div>
                    </div>';
                }
            }
        }

        if($data['list']) {
            $listCodeList = '';
            foreach ($data['list'] as $i => $value) {
                $listCodeList .= '<tr class="gradeX '.($i % 2 == 0 ? 'odd':'even').'" role="row">
                    <td>'.$value['id'].'</td>
                    <td> <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codefield/id='.$value['id'].'/root_id='.$data['_params']['root_id'].'">'.($value['name'] ? $value['name'] : json_decode($value['define'], true)['menu']).($data['_params']['__CONTROLLER__'] == 'section_tb' ? $value['menu']:'').'</a> </td>
                    '.($data['_params']['__CONTROLLER__'] == 'section_tb' ? '': '<td class="text-center"> '.(json_decode(($value['define_item'] ? $value['define_item'] : $value['define']), true)['action']).' </td>').'
                    <td><input type="text" name="sort" class="form-control text-center input-sm" onkeydown="_HTChange.sort(this, \''.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/change/id='.$value['id'].'/root_id='.$data['_params']['root_id'].'\');" value="'.$value['sort'].'"></td>
                    <td class="text-center">
                        <label class="mt-checkbox mt-checkbox-outline">
                            <input type="checkbox" name="display" value="'.$value['display'].'" '.($value['display'] == 1 ? 'checked':'').' onclick="_HTChange.status(this, \'switch\', {&quot;url&quot;:&quot;'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/change/id='.$value['id'].'/root_id='.$data['_params']['root_id'].'&quot;});">
                            <span class="text-hide">'.$value['display'].'</span>
                        </label>
                    </td>
                    <td>
                        <div class="text-center">
                            <div class="btn-group btn-group-sm btn-group-solid">
                                <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codefield/id='.$value['id'].'/root_id='.$data['_params']['root_id'].'" class="btn blue">Sửa</a>
                                <a href="javascript:;" class="btn red" onclick="_HTDelete.item(\''.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/delete/id='.$value['id'].'/root_id='.$data['_params']['root_id'].'\');">Xóa</a>
                            </div>
                        </div>
                    </td>
                </tr>';
            }
        }


        // choose type Cate
        if($data['elements']['radio']) {
            $indexType = array_search('cat_id', array_column($data['elements']['radio'], 'name'));
            if($data['elements']['radio'][$indexType]['name'] == 'cat_id') {
                $typeCat = '<div class="col-md-12">
                    <div class="form-group">
                        <strong>Kiểu chọn danh mục: &nbsp;&nbsp;&nbsp;</strong>
                        '.$catRadio.$catCheckbox.'
                    </div>
                </div>';
            }
        }

        // multi_field order + contact
        $fieldItem = '<div data-repeater-item="" class="col-md-4">
            <div class="mt-repeater-item mt-overflow">
                <div class="mt-repeater-cell">
                    <div class="mt-repeater-box">
                        <div class="align-items toslug">
                            <input type="text" name="label" data-toslug="" class="form-control" placeholder="Field name" value="" />
                            <input type="text" name="name" ht-target="toslug" class="form-control" placeholder="Key" value="" />
                        </div>
                    </div>
                    <a href="javascript:;" data-repeater-delete="" class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline"><i class="fa fa-close"></i></a>
                </div>
            </div>
        </div>';

        if($data['item']['multi_field']) {
            foreach ($data['item']['multi_field'] as $i => $value) {
                if($i > 0) {
                    $fieldItem .= '<div data-repeater-item="" class="col-md-4">
                        <div class="mt-repeater-item mt-overflow">
                            <div class="mt-repeater-cell">
                                <div class="mt-repeater-box">
                                    <div class="align-items toslug">
                                        <input type="text" name="label" data-toslug="" class="form-control" placeholder="Field name" value="'.$value['label'].'" />
                                        <input type="text" name="name" ht-target="toslug" class="form-control" placeholder="Key" value="'.$value['name'].'" />
                                    </div>
                                </div>
                                <a href="javascript:;" data-repeater-delete="" class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline"><i class="fa fa-close"></i></a>
                            </div>
                        </div>
                    </div>';
                }
            }
        }

        $multi_field = '<div class="form-group mt-repeater margin-bottom-10">
            <strong>Multi field <a href="javascript:;" class="mt-sweetalert-note" data-message="Thêm trường khác theo yêu cầu"> <i class="fa fa-question-circle" aria-hidden="true"></i></a></strong>
            <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add">
                <i class="fa fa-plus"></i>
            </a>
            <div class="row margin-top-10" data-repeater-list="multi_field">'.$fieldItem.'</div>
        </div>';


        // choose section
        if($data['elements']['multi']) {
            $indexSection = array_search('section', array_column($data['elements']['multi'], 'name'));

            foreach ($data['elements']['multi'][$indexSection]['list'] as $i => $value) {
                $optionSection .= '<option value="'.$value['id'].'">'.$value['name'].'</option>';
            }

            $sectionItem = '<div data-repeater-item>
                <div class="mt-repeater-item">
                    <div class="mt-repeater-cell">
                        <div class="mt-repeater-box">
                            <div class="row toslug">
                                <div class="col-md-3"><input type="text" name="label" class="form-control" placeholder="Field name" value="" data-toslug /></div>
                                <div class="col-md-3"><input type="text" name="name" class="form-control" placeholder="Field name" value="" ht-target="toslug" /></div>
                                <div class="col-md-3">
                                    <select name="list_section_id" class="mt-multiselect btn btn-default" multiple data-filter="false">'.$optionSection.'</select>
                                </div>
                                <div class="col-md-3">
                                    <label class="mt-radio mt-radio-outline" style="margin-top: 7px;">
                                        <input type="radio" name="type" value="radio" checked error-checked-repeater /><span></span>Single choice
                                    </label>
                                    <label class="mt-radio mt-radio-outline" style="margin-top: 7px;"><input type="radio" name="type" value="checkbox" /><span></span>Multi choice</label>
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline"><i class="fa fa-close"></i></a>
                    </div>
                </div>
            </div>';

            foreach ($data['item']['section'] as $i => $value) {
                if($i > 0) {
                    $optionSection = '';
                    foreach ($data['elements']['multi'][$indexSection]['list'] as $j => $itemOption) {
                        $optionSection .= '<option value="'.$itemOption['id'].'" '.(in_array($itemOption['id'], $value['list_section_id']) ? 'selected':'').'>'.$itemOption['name'].'</option>';
                    }

                    $sectionItem .= '<div data-repeater-item>
                        <div class="mt-repeater-item">
                            <div class="mt-repeater-cell">
                                <div class="mt-repeater-box">
                                    <div class="row toslug">
                                        <div class="col-md-3"><input type="text" name="label" class="form-control" placeholder="Field name" value="'.$value['label'].'" data-toslug /></div>
                                        <div class="col-md-3"><input type="text" name="name" class="form-control" placeholder="Field name" value="'.$value['name'].'" ht-target="toslug" /></div>
                                        <div class="col-md-3">
                                            <select name="list_section_id" class="mt-multiselect btn btn-default" multiple data-filter="false">
                                                '.$optionSection.'
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <label class="mt-radio mt-radio-outline" style="margin-top: 7px;">
                                                <input type="radio" name="type" value="radio" '.($value['type'] == 'radio' ? 'checked error-checked-repeater':'').' /><span></span>Single choice
                                            </label>
                                            <label class="mt-radio mt-radio-outline" style="margin-top: 7px;"><input type="radio" name="type" value="checkbox" '.($value['type'] == 'checkbox' ? 'checked error-checked-repeater':'').' /><span></span>Multi choice</label>
                                        </div>
                                    </div>
                                </div>
                                <a href="javascript:;" data-repeater-delete class="btn red mt-repeater-delete mt-repeater-del-right mt-repeater-btn-inline"><i class="fa fa-close"></i></a>
                            </div>
                        </div>
                    </div>';
                }
            }
        }

        $section = '<div class="form-group mt-repeater margin-bottom-10">
            <strong>Sections &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
            <a href="javascript:;" data-repeater-create="define" class="btn btn-xs blue mt-repeater-add"><i class="fa fa-plus"></i></a>
            <div class="margin-top-10" data-repeater-list="section">'.$sectionItem.'</div>
        </div>';

        if($data['required']) {
            foreach ($data['required']['fields'] as $key => $field) {
                if(!empty($field)) {
                    $requiredItem .= '<label class="mt-checkbox mt-checkbox-outline margin-bottom-10"> <input type="checkbox" name="required['.$key.']" value="'.$field.'" '.(array_key_exists($key, $data['required']['rules']) ? 'checked' : '').' /><span></span> '.$field.' </label>';
                }
            }

            $required = '<div class="form-group" style="display: flex;">
                <strong style="flex: none;">Bắt buộc:</strong>
                <div class="config-field">'.$requiredItem.'</div>
            </div>';
        }

        if($data['translate']) {
            foreach ($data['translate']['fields'] as $key => $field) {
                if(!empty($field)) {
                    $translateItem .= '<label class="mt-checkbox mt-checkbox-outline margin-bottom-10"> <input type="checkbox" name="translate[]" value="'.$key.'" '.(in_array($key, $data['translate']['rules']) ? 'checked' : '').' /><span></span> '.$field.' </label>';
                }
            }

            $translate = '<div class="form-group" style="display: flex;">
                <strong style="flex: none;">Translate:</strong>
                <div class="config-field">'.$translateItem.'</div>
            </div>';
        }

        if($data['exists']) {
            if(!empty($data['exists']['rules']['sku'])) {
                $existsConfig = '<br><span>- '.$data['exists']['fields']['sku'].': </span>
                <label class="mt-radio mt-radio-outline margin-bottom-10">
                    <input type="radio" name="exists[sku]" value="" '.(empty($data['exists']['rules']['sku']) ? 'checked':'').'><span></span> Không
                </label>
                <label class="mt-radio mt-radio-outline margin-bottom-10">
                    <input type="radio" name="exists[sku]" value="root_id" '.($data['exists']['rules']['sku'] == 'root_id' ? 'checked':'').'><span></span> Theo menu
                </label>
                <label class="mt-radio mt-radio-outline margin-bottom-10">
                    <input type="radio" name="exists[sku]" value="cat_id" '.($data['exists']['rules']['sku'] == 'cat_id' ? 'checked':'').'><span></span> Theo danh mục
                </label>';
            }

            $exists = '<div class="form-group" style="display: flex;">
                <strong style="flex: none;">Tồn tại: </strong>
                <div class="config-field">
                    <span>&nbsp;Kiểm tra dữ liệu là duy nhất</span>
                    '.$existsConfig.'
                </div>
            </div>';
        }


        /* ---------  Other Field  -----------  */


        switch ($data['_params']['__CONTROLLER__']) {
            case 'news_cat_tb':
                if($data['_params']['action'] == 'codelist') {
                    $html = '<div class="page-content" style="min-height: 357px;">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><span>Trang list - code</span></li>
                            </ul>
                        </div>
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Danh sách</div>
                                <div class="actions">
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codefield/root_id='.$data['_params']['root_id'].'" class="btn yellow"><i class="fa fa-plus-square-o"></i> Thêm</a>
                                </div>
                            </div>
                            <div class="portlet-body">
                                <table id="datatable-default" class="table table-striped table-bordered table-hover table-checkable">
                                    <thead>
                                        <tr>
                                            <th class="table-checkall"> ID </th>
                                            <th> Tên menu </th>
                                            <th class="text-center"> Action </th>
                                            <th class="table-sort"> Sắp xếp </th>
                                            <th class="table-show"> Hiển thị  </th>
                                            <th class="table-func"> Chức năng </th>
                                        </tr>
                                    </thead>
                                    <tbody>'.$listCodeList.'</tbody>
                                </table>
                            </div>
                        </div>
                    </div>';
                    $html .= '<script type="text/javascript">
                        $(document).ready(function() {
                            TableDatatables.init({
                                destroy: true,
                                dom: \'\',
                                ordering: false,
                                pageLength: -1,
                            });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codefield') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li>
                                    <a href="'.PUBLIC_PATH.'admin">Trang chủ</a>
                                    <i class="fa fa-circle"></i>
                                </li>
                                <li>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codelist/root_id='.$data['_params']['root_id'].'">Trang list - code</a>
                                    <i class="fa fa-circle"></i>
                                </li>
                                <li>
                                    <span>Cấu hình dữ liệu</span>
                                </li>
                            </ul>
                        </div>
                        <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Thông tin cấu hình</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle">
                                            <i class="fa fa-check-square-o"></i> Lưu </button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codelist/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red">
                                            <i class="fa fa-share"></i> Thoát </a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">
                                        <h4 class="margin-bottom-10 font-red bold">CẤU HÌNH MENU</h4>
                                        <div class="row align-items">
                                            <div class="col-md-3">'.$menu.'</div>
                                            <div class="col-md-2">
                                                <div class="form-group">
                                                    <label>Action</label>
                                                    <select name="action" class="form-control select2 select2-not-search select2-required">
                                                        <option></option>
                                                        <option '.($data['item']['action'] == '21.html' ? 'selected':'').' value="21.html">list21</option>
                                                        <option '.($data['item']['action'] == '22.html' ? 'selected':'').' value="22.html">list22</option>
                                                        <option '.($data['item']['action'] == '23.html' ? 'selected':'').' value="23.html">list23</option>
                                                        <option '.($data['item']['action'] == '24.html' ? 'selected':'').' value="24.html">list24</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-5">'.$label.'</div>
                                        </div>
                                        <hr>
                                        <h4 class="margin-bottom-10 font-red bold">CẤU HÌNH DANH MỤC</h4>
                                        <div class="row">
                                            <div class="row col-md-12">
                                                <div class="col-md-2">'.$name.'</div>
                                                <div class="col-md-2">'.$desc_short.'</div>
                                                <div class="col-md-2">'.$detail.'</div>
                                                <div class="col-md-4">'.$thumbnail.'</div>
                                            </div>
                                            <div class="row col-md-12">
                                                '.$level.'
                                                '.$list_news_id.'
                                                '.$list_product_id.'
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <strong>Hiển thị icon link web: &nbsp;&nbsp;&nbsp;</strong>
                                                    '.$none.$listNews.'
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Tùy chọn:</strong>
                                                    <div class="config-field">'.$titleSEO.$descriptionSEO.$keyword.$slug.$list_tag_id.$embed.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Chức năng:</strong>
                                                    <div class="config-field">
                                                        '.$display.$add.$delete.$sort.'
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">'.$special.'</div>
                                            <div class="col-md-12">'.$multi_input.'</div>
                                            <div class="col-md-12">'.$multi_image.'</div>
                                            <div class="col-md-12">'.$multi_file.'</div>
                                            <div class="col-md-12">'.$multi_detail.'</div>
                                            <div class="col-md-12">'.$section.'</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>';
                    $html .= '<script>
                            $(document).ready(function () {
                                FormEditable.textarea(\'editable-text\', { type: \'text\' });
                            });
                        </script>
                        <script>
                            $(document).ready(function () {
                                FormValidation.submit(\'#form-add\', {
                                    rules: { menu: { required: true }, action: { required: true } }
                                });
                                $(\'select[name="level"]\').change(function () {
                                    if ($(\'input[name="name"]\').val() == \'\' || $(this).val() == 0) {
                                        $(\'input[name="title"], input[name="description"], input[name="keyword"], input[name="display"], input[name="sort"], input[name="add-delete"]\').click();
                                    }
                                    $(\'input[name="name"]\').val(($(this).val() != 0) ? \'Tiêu đề\' : \'\');
                                });

                                $(\'input[name="list_label_id[label]"]\').click(function () {
                                    if ($(this).is(\':checked\')) {
                                        $(\'input[value="single"]\').prop(\'checked\', true);
                                        $(\'input[name="list_label_id[mapping]"]\').prop(\'disabled\', false);
                                    } else {
                                        $(\'input[name="list_label_id[mapping]"]\').prop({ \'checked\': false, disabled: true });
                                    }
                                });
                            });
                        </script>';
                } if($data['_params']['action'] == 'codevalidate') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Định nghĩa dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Định nghĩa dữ liệu</span></li>
                            </ul>
                        </div>
                        <form action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Định nghĩa dữ liệu</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">'.$required.$translate.'</div>
                                </div>
                            </div>
                        </form>
                    </div>';
                }
                break;
            case 'news_tag_tb':
            case 'product_tag_tb':
                $html = '<div class="page-content" style="min-height: 168px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="col-md-2">'.$name.'</div>
                                            <div class="col-md-2">'.$desc_short.'</div>
                                            <div class="col-md-2">'.$detail.'</div>
                                            <div class="col-md-2">'.$thumbnail.'</div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <strong>Hiển thị icon link web: &nbsp;&nbsp;&nbsp;</strong>
                                                '.$none.$widthCategoryNews.$withoutCategoryNews.'
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Tùy chọn:</strong>
                                                <div class="config-field">'.$titleSEO.$descriptionSEO.$keyword.($data['_params']['__CONTROLLER__'] == 'news_tag_tb' ? $slug : '').'</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Chức năng:</strong>
                                                <div class="config-field">'.$display.$add.$delete.$sort.'</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">'.$multi_input.'</div>
                                        <div class="col-md-12">'.$multi_image.'</div>
                                        <div class="col-md-12">'.$multi_detail.'</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'news_label_tb':
            case 'product_label_tb':
            case 'product_brand_tb':
                $html = '<div class="page-content" style="min-height: 607px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="col-md-2">'.$name.'</div>
                                            <div class="col-md-2">'.$desc_short.'</div>
                                            <div class="col-md-2">'.$detail.'</div>
                                            <div class="col-md-4">'.$thumbnail.'</div>
                                        </div>
                                        <div class="row col-md-12">'.$list_news_id.'</div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Tùy chọn:</strong>
                                                <div class="config-field">'.$titleSEO.$descriptionSEO.$keyword.$slug.'</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Chức năng:</strong>
                                                <div class="config-field">'.$display.$add.$delete.$sort.'</div>
                                            </div>
                                        </div>
                                        '.($data['_params']['__CONTROLLER__'] == 'product_brand_tb' ? '<div class="col-md-12">'.$special.'</div>':'').'
                                        <div class="col-md-12">'.$multi_input.'</div>
                                        <div class="col-md-12">'.$multi_image.'</div>
                                        <div class="col-md-12">'.$multi_file.'</div>
                                        <div class="col-md-12">'.$multi_detail.'</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'news_tb':
                if($data['_params']['action'] == 'codefield') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Cấu hình dữ liệu</span></li>
                            </ul>
                        </div>
                        <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Thông tin cấu hình</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="row col-md-12">
                                                <div class="col-md-2">'.$name.'</div>
                                                <div class="col-md-2">'.$desc_short.'</div>
                                                <div class="col-md-2">'.$detail.'</div>
                                                <div class="col-md-2">'.$allow_size_image.'</div>
                                                <div class="col-md-4">'.$thumbnail.'</div>
                                            </div>
                                            <div class="row col-md-12">
                                                '.$list_selectCate_id.'
                                                '.$list_news_id.'
                                                '.$list_product_id.'
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Tùy chọn:</strong>
                                                    <div class="config-field">'.$titleSEO.$descriptionSEO.$keyword.$slug.$tags.$list_tag_id.$embed.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Chức năng:</strong>
                                                    <div class="config-field">
                                                        '.$display.$add.$delete.$sort.$up.$copy.$colvis.$transfer_cate.$status.$draft.$date_published.$comment.'
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">'.$special.'</div>
                                            <div class="col-md-12">'.$multi_input.'</div>
                                            <div class="col-md-12">'.$multi_image.'</div>
                                            <div class="col-md-12">'.$multi_file.'</div>
                                            <div class="col-md-12">'.$multi_detail.'</div>
                                            <div class="col-md-12">'.$section.'</div>
                                            <div class="col-md-12">'.$sub.'</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <script>
                        $(document).ready(function () {
                            FormEditable.textarea("editable-text", { type: "text" });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codevalidate') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Định nghĩa dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Định nghĩa dữ liệu</span></li>
                            </ul>
                        </div>
                        <form action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Định nghĩa dữ liệu</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">'.$required.$translate.'</div>
                                </div>
                            </div>
                        </form>
                    </div>';
                }
                break;
            case 'html_tb':
                if($data['_params']['action'] == 'codelist') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><span>Các trang đơn</span></li>
                            </ul>
                        </div>
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Danh sách</div>
                                <div class="actions">
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codefield/root_id='.$data['_params']['root_id'].'" class="btn yellow"><i class="fa fa-plus-square-o"></i> Thêm</a>
                                </div>
                            </div>
                            <div class="portlet-body">
                                <table id="datatable-default" class="table table-striped table-bordered table-hover table-checkable">
                                    <thead>
                                        <tr>
                                            <th class="table-checkall">ID</th>
                                            <th>Tên menu</th>
                                            <th class="text-center">Action</th>
                                            <th class="table-sort">Sắp xếp</th>
                                            <th class="table-show">Hiển thị</th>
                                            <th class="table-func">Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>'.$listCodeList.'</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <script type="text/javascript">
                        $(document).ready(function () {
                            TableDatatables.init({
                                destroy: true,
                                dom: "",
                                ordering: false,
                                pageLength: -1,
                            });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codefield') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codelist/root_id='.$data['_params']['root_id'].'">Các trang đơn</a><i class="fa fa-circle"></i></li>
                                <li><span>Cấu hình dữ liệu</span></li>
                            </ul>
                        </div>
                        <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Thông tin cấu hình</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codelist/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">
                                        <h4 class="margin-bottom-10 font-red bold">CẤU HÌNH MENU</h4>
                                        <div class="row align-items">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Tên menu</label>
                                                    <input type="text" name="menu" value="'.$data['item']['menu'].'" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-2">
                                                <div class="form-group">
                                                    <label>Action</label>
                                                    <select name="action" class="form-control select2 select2-not-search select2-required">
                                                        <option></option>
                                                        <option value="31.html" '.($data['item']['action'] == '31.html' ? 'selected':'').'>page31</option>
                                                        <option value="32.html" '.($data['item']['action'] == '32.html' ? 'selected':'').'>page32</option>
                                                        <option value="33.html" '.($data['item']['action'] == '33.html' ? 'selected':'').'>page33</option>
                                                        <option value="34.html" '.($data['item']['action'] == '34.html' ? 'selected':'').'>page34</option>
                                                        <option value="36.html" '.($data['item']['action'] == '36.html' ? 'selected':'').'>page36</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-5"></div>
                                        </div>
                                        <hr />
                                        <h4 class="margin-bottom-10 font-red bold">CẤU HÌNH TRƯỜNG DỮ LIỆU</h4>
                                        <div class="row">
                                            <div class="row col-md-12">
                                                <div class="col-md-2">'.$name.'</div>
                                                <div class="col-md-2">'.$desc_short.'</div>
                                                <div class="col-md-2">'.$detail.'</div>
                                                <div class="col-md-4">'.$thumbnail.'</div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">
                                                        Tùy chọn:
                                                        <a href="javascript:;" class="mt-sweetalert-note" data-message="Title SEO, Description SEO, Keyword <b>TẮT</b> khi vị trí ở <b>MENU</b>"><i class="fa fa-question-circle" aria-hidden="true"></i></a>
                                                    </strong>
                                                    <div class="config-field">'.$titleSEO.$descriptionSEO.$keyword.$embed.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Chức năng:</strong>
                                                    <div class="config-field">'.$comment.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">'.$multi_input.'</div>
                                            <div class="col-md-12">'.$multi_image.'</div>
                                            <div class="col-md-12">'.$multi_file.'</div>
                                            <div class="col-md-12">'.$multi_detail.'</div>
                                            <div class="col-md-12">'.$sub.'</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <script>
                        $(document).ready(function () {
                            FormEditable.textarea("editable-text", { type: "text" });
                        });
                    </script>
                    <script>
                        $(document).ready(function () {
                            FormValidation.submit("#form-add", {
                                rules: { menu: { required: true }, action: { required: true } },
                            });
                            $(\'select[name="level"]\').change(function () {
                                if ($(\'input[name="name"]\').val() == "" || $(this).val() == 0) {
                                    $(\'input[name="title"], input[name="description"], input[name="keyword"], input[name="display"], input[name="sort"], input[name="add-delete"]\').click();
                                }
                                $(\'input[name="name"]\').val($(this).val() != 0 ? "Tiêu đề" : "");
                            });

                            $(\'input[name="list_label_id[label]"]\').click(function () {
                                if ($(this).is(":checked")) {
                                    $(\'input[value="single"]\').prop("checked", true);
                                    $(\'input[name="list_label_id[mapping]"]\').prop("disabled", false);
                                } else {
                                    $(\'input[name="list_label_id[mapping]"]\').prop({ checked: false, disabled: true });
                                }
                            });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codevalidate') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Định nghĩa dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Định nghĩa dữ liệu</span></li>
                            </ul>
                        </div>
                        <form action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Định nghĩa dữ liệu</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">'.$required.$translate.'</div>
                                </div>
                            </div>
                        </form>
                    </div>';
                }
                break;
            case 'info_tb':
                if($data['_params']['action'] == 'codefield') {
                    $html = '<div class="page-content" style="min-height: 607px;">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Cấu hình dữ liệu</span></li>
                            </ul>
                        </div>
                        <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Thông tin cấu hình</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/field/id='.$data['_params']['id'].'/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="row col-md-12">
                                                <div class="col-md-2">'.$name.'</div>
                                                <div class="col-md-2">'.$address.'</div>
                                                <div class="col-md-2">'.$email.'</div>
                                                <div class="col-md-2">'.$logo.'</div>
                                                <div class="col-md-2">'.$favicon.'</div>
                                                <div class="col-md-2">'.$social.'</div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Tùy chọn:</strong>
                                                    <div class="config-field">'.$map.$embed.$onoff.$confirmExit.$webp.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">'.$multi_input.'</div>
                                            <div class="col-md-12">'.$multi_image.'</div>
                                            <div class="col-md-12">'.$multi_detail.'</div>
                                            <div class="col-md-12">'.$multi_file.'</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <script>
                        $(document).ready(function () {
                            FormEditable.textarea("editable-text", { type: "text" });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codevalidate') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/field/id='.$data['_params']['id'].'/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Định nghĩa dữ liệu</span></li>
                            </ul>
                        </div>
                        <form action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Định nghĩa dữ liệu</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/field/id='.$data['_params']['id'].'/root_id='.$data['_params']['root_id'].'" class="btn red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">'.$required.$translate.'</div>
                                </div>
                            </div>
                        </form>
                    </div>';
                }
                break;
            case 'menu_public_tb':
                $html = '<div class="page-content" style="min-height: 384px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="col-md-2">'.$name.'</div>
                                            <div class="col-md-2">'.$desc_short.'</div>
                                            <div class="col-md-2">'.$detail.'</div>
                                            <div class="col-md-4">'.$thumbnail.'</div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Tùy chọn:</strong>
                                                <div class="config-field">'.$link.$titleSEO.$descriptionSEO.$keyword.$embed.'</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">'.$special.'</div>
                                        <div class="col-md-12">'.$multi_input.'</div>
                                        <div class="col-md-12">'.$multi_image.'</div>
                                        <div class="col-md-12">'.$multi_detail.'</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'redirect_tb':
                $html = '<div class="page-content" style="min-height: 282px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="col-md-3">'.$url_old.'</div>
                                            <div class="col-md-3">'.$url_new.'</div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Chức năng:</strong>
                                                <div class="config-field">'.$add.$delete.'</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'product_discount_tb':
                $html = '<div class="page-content" style="min-height: 282px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="col-md-2">'.$sku.'</div>
                                            <div class="col-md-2">'.$order_value.'</div>
                                        </div>
                                        <div class="row col-md-12">
                                            '.$discountOption.'
                                        </div>
                                        <div class="col-md-12">'.$unit.'</div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Chức năng:</strong>
                                                <div class="config-field">'.$statusDiscount.$add.$delete.$auto.$order_id.'</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'banner_tb':
                if($data['_params']['action'] == 'codefield') {
                    $html = '<div class="page-content" style="min-height: 288px;">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Cấu hình dữ liệu</span></li>
                            </ul>
                        </div>
                        <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Thông tin cấu hình</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="row col-md-12">
                                                <div class="col-md-2">'.$name.'</div>
                                                <div class="col-md-2">'.$linkInput.'</div>
                                                <div class="col-md-2">'.$desc_short.'</div>
                                                <div class="col-md-4">'.$thumbnail.'</div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Chức năng:</strong>
                                                    <div class="config-field">'.$display.$add.$delete.$sort.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">'.$special.'</div>
                                            <div class="col-md-12">'.$multi_image.'</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <script>
                        $(document).ready(function () {
                            FormEditable.textarea("editable-text", { type: "text" });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codevalidate') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/field/id='.$data['_params']['id'].'/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Định nghĩa dữ liệu</span></li>
                            </ul>
                        </div>
                        <form action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Định nghĩa dữ liệu</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/field/id='.$data['_params']['id'].'/root_id='.$data['_params']['root_id'].'" class="btn red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">'.$required.$translate.'</div>
                                </div>
                            </div>
                        </form>
                    </div>';
                }
                break;
            case 'section_tb':
                if($data['_params']['action'] == 'codelist') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><span>Các trang đơn</span></li>
                            </ul>
                        </div>
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Danh sách</div>
                                <div class="actions">
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codefield/root_id='.$data['_params']['root_id'].'" class="btn yellow"><i class="fa fa-plus-square-o"></i> Thêm</a>
                                </div>
                            </div>
                            <div class="portlet-body">
                                <table id="datatable-default" class="table table-striped table-bordered table-hover table-checkable">
                                    <thead>
                                        <tr>
                                            <th class="table-checkall">ID</th>
                                            <th>Section</th>
                                            <th class="table-sort">Sắp xếp</th>
                                            <th class="table-show">Hiển thị</th>
                                            <th class="table-func">Chức năng</th>
                                        </tr>
                                    </thead>
                                    <tbody>'.$listCodeList.'</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <script type="text/javascript">
                        $(document).ready(function () {
                            TableDatatables.init({
                                destroy: true,
                                dom: "",
                                ordering: false,
                                pageLength: -1,
                            });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codefield') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codelist/root_id='.$data['_params']['root_id'].'">Các trang đơn</a><i class="fa fa-circle"></i></li>
                                <li><span>Cấu hình dữ liệu</span></li>
                            </ul>
                        </div>
                        <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Thông tin cấu hình</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codelist/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">
                                        <h4 class="margin-bottom-10 font-red bold">CẤU HÌNH MENU</h4>
                                        <div class="row align-items">
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Tên section</label>
                                                    <input type="text" name="menu" value="'.$data['item']['menu'].'" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-md-3">'.$allow_edit_menu.'</div>
                                            <div class="col-md-3">'.$allow_edit_note.'</div>
                                        </div>
                                        <hr />
                                        <h4 class="margin-bottom-10 font-red bold">CẤU HÌNH TRƯỜNG DỮ LIỆU</h4>
                                        <div class="row">
                                            <div class="row col-md-12">
                                                <div class="col-md-2">'.$name.'</div>
                                                <div class="col-md-2">'.$desc_short.'</div>
                                                <div class="col-md-2">'.$detail.'</div>
                                                <div class="col-md-2">'.$icon.'</div>
                                                <div class="col-md-4">'.$thumbnail.'</div>
                                            </div>
                                            <div class="col-md-12">'.$special.'</div>
                                            <div class="col-md-12">'.$multi_input.'</div>
                                            <div class="col-md-12">'.$multi_image.'</div>
                                            <div class="col-md-12">'.$multi_file.'</div>
                                            <div class="col-md-12">'.$multi_detail.'</div>
                                            <div class="col-md-12">'.$sub.'</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <script>
                        $(document).ready(function () {
                            FormEditable.textarea("editable-text", { type: "text" });
                        });
                    </script>
                    <script>
                        $(document).ready(function () {
                            FormValidation.submit("#form-add", {
                                rules: { menu: { required: true }, action: { required: true } },
                            });
                            $(\'select[name="level"]\').change(function () {
                                if ($(\'input[name="name"]\').val() == "" || $(this).val() == 0) {
                                    $(\'input[name="title"], input[name="description"], input[name="keyword"], input[name="display"], input[name="sort"], input[name="add-delete"]\').click();
                                }
                                $(\'input[name="name"]\').val($(this).val() != 0 ? "Tiêu đề" : "");
                            });

                            $(\'input[name="list_label_id[label]"]\').click(function () {
                                if ($(this).is(":checked")) {
                                    $(\'input[value="single"]\').prop("checked", true);
                                    $(\'input[name="list_label_id[mapping]"]\').prop("disabled", false);
                                } else {
                                    $(\'input[name="list_label_id[mapping]"]\').prop({ checked: false, disabled: true });
                                }
                            });
                        });
                    </script>';
                }
                break;
            case 'order_tb':
                $html = '<div class="page-content" style="min-height: 389px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list-all/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list-all/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="col-md-2">'.$shipping_fee.'</div>
                                            <div class="col-md-2">'.$paypal_fee.'</div>
                                        </div>
                                        <div class="col-md-12">'.$unit.'</div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Tùy chọn:</strong>
                                                <div class="config-field">'.$total.$quantity.$discount.'</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">'.$multi_field.'</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'contact_tb':
                $html = '<div class="page-content" style="min-height: 337px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="col-md-2">'.$fullname.'</div>
                                            <div class="col-md-2">'.$phone.'</div>
                                            <div class="col-md-2">'.$email.'</div>
                                            <div class="col-md-2">'.$address.'</div>
                                            <div class="col-md-2">'.$content.'</div>
                                            <div class="col-md-2">'.$type.'</div>
                                            <div class="col-md-2">'.$file.'</div>
                                        </div>
                                        <div class="col-md-12">'.$multi_field.'</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'comment_tb':
                $html = '<div class="page-content" style="min-height: 252px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="hide">'.$fullname.'</div>
                                            <div class="hide">'.$email.'</div>
                                            <div class="hide">
                                                <div class="form-group">
                                                    <label>Bình luận </label>
                                                    <input type="text" name="comment" class="form-control" value="Bình luận" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Chức năng:</strong>
                                                <div class="config-field">'.$reply.$status.'</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'product_select_tb':
            case 'news_select_tb':
                $html = '<div class="page-content" style="min-height: 485px;">
                    <div class="page-bar">
                        <ul class="page-breadcrumb">
                            <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                            <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                            <li><span>Cấu hình dữ liệu</span></li>
                        </ul>
                    </div>
                    <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Thông tin cấu hình</div>
                                <div class="actions">
                                    <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                </div>
                            </div>
                            <div class="portlet-body form">
                                <div class="form-body">
                                    <div class="row">
                                        <div class="row col-md-12">
                                            <div class="col-md-2">'.$name.'</div>
                                            <div class="col-md-2">'.$detail.'</div>
                                            <div class="col-md-4">'.$thumbnail.'</div>
                                        </div>
                                        <div class="row col-md-12">'.$level.'</div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <strong>Kiểu chọn: &nbsp;&nbsp;&nbsp;</strong>
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="type" value="0" '.($data['item']['type'] == 0 ? 'checked':'').' />
                                                    <span></span>Chọn một
                                                </label>
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="type" value="1" '.($data['item']['type'] == 1 ? 'checked':'').' />
                                                    <span></span>Chọn nhiều
                                                </label>
                                                <label class="mt-radio mt-radio-outline">
                                                    <input type="radio" name="type" value="2" '.($data['item']['type'] == 2 ? 'checked':'').' />
                                                    <span></span>Admin config
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Tùy chọn:</strong>
                                                <div class="config-field">'.$titleSEO.$descriptionSEO.$keyword.'</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group" style="display: flex;">
                                                <strong style="flex: none;">Chức năng:</strong>
                                                <div class="config-field">'.$display.$add.$delete.$sort.'</div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">'.$multi_input.'</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <script>
                    $(document).ready(function () {
                        FormEditable.textarea("editable-text", { type: "text" });
                    });
                </script>';
                break;
            case 'product_cat_tb':
                if($data['_params']['action'] == 'codelist') {
                    $html = '<div class="page-content" style="min-height: 357px;">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><span>Trang list - code</span></li>
                            </ul>
                        </div>
                        <div class="portlet box blue margin-bottom-0">
                            <div class="portlet-title">
                                <div class="caption">Danh sách</div>
                                <div class="actions">
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codefield/root_id='.$data['_params']['root_id'].'" class="btn yellow"><i class="fa fa-plus-square-o"></i> Thêm</a>
                                </div>
                            </div>
                            <div class="portlet-body">
                                <table id="datatable-default" class="table table-striped table-bordered table-hover table-checkable">
                                    <thead>
                                        <tr>
                                            <th class="table-checkall"> ID </th>
                                            <th> Tên menu </th>
                                            <th class="text-center"> Action </th>
                                            <th class="table-sort"> Sắp xếp </th>
                                            <th class="table-show"> Hiển thị  </th>
                                            <th class="table-func"> Chức năng </th>
                                        </tr>
                                    </thead>
                                    <tbody>'.$listCodeList.'</tbody>
                                </table>
                            </div>
                        </div>
                    </div>';
                    $html .= '<script type="text/javascript">
                        $(document).ready(function() {
                            TableDatatables.init({
                                destroy: true,
                                dom: \'\',
                                ordering: false,
                                pageLength: -1,
                            });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codefield') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li>
                                    <a href="'.PUBLIC_PATH.'admin">Trang chủ</a>
                                    <i class="fa fa-circle"></i>
                                </li>
                                <li>
                                    <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codelist/root_id='.$data['_params']['root_id'].'">Trang list - code</a>
                                    <i class="fa fa-circle"></i>
                                </li>
                                <li>
                                    <span>Cấu hình dữ liệu</span>
                                </li>
                            </ul>
                        </div>
                        <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Thông tin cấu hình</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle">
                                            <i class="fa fa-check-square-o"></i> Lưu </button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/codelist/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red">
                                            <i class="fa fa-share"></i> Thoát </a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">
                                        <h4 class="margin-bottom-10 font-red bold">CẤU HÌNH MENU</h4>
                                        <div class="row align-items">
                                            <div class="col-md-3">'.$menu.'</div>
                                            <div class="col-md-2">
                                                <div class="form-group">
                                                    <label>Action</label>
                                                    <select name="action" class="form-control select2 select2-not-search select2-required">
                                                        <option></option>
                                                        <option value="2.html" '.($data['item']['action'] == '2.html' ? 'selected':'').'>list2</option>
                                                        <option value="11.html" '.($data['item']['action'] == '11.html' ? 'selected':'').'>list11</option>
                                                        <option value="12.html" '.($data['item']['action'] == '12.html' ? 'selected':'').'>list12</option>
                                                        <option value="13.html" '.($data['item']['action'] == '13.html' ? 'selected':'').'>list13</option>
                                                        <option value="14.html" '.($data['item']['action'] == '14.html' ? 'selected':'').'>list14</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-5">'.$list_brand_id.$list_select_id.$label.'</div>
                                        </div>
                                        <hr />
                                        <h4 class="margin-bottom-10 font-red bold">CẤU HÌNH DANH MỤC</h4>
                                        <div class="row">
                                            <div class="row col-md-12">
                                                <div class="col-md-2">'.$name.'</div>
                                                <div class="col-md-2">'.$desc_short.'</div>
                                                <div class="col-md-2">'.$detail.'</div>
                                                <div class="col-md-4">'.$thumbnail.'</div>
                                            </div>
                                            <div class="row col-md-12">'.$level.$list_product_id.$list_news_id.'</div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <strong>Hiển thị icon link web: &nbsp;&nbsp;&nbsp;</strong>
                                                    '.$none.$listProduct.'
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Tùy chọn:</strong>
                                                    <div class="config-field">'.$titleSEO.$descriptionSEO.$keyword.$slug.$list_tag_id.$embed.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Chức năng:</strong>
                                                    <div class="config-field">'.$display.$add.$delete.$sort.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">'.$special.'</div>
                                            <div class="col-md-12">'.$multi_input.'</div>
                                            <div class="col-md-12">'.$multi_image.'</div>
                                            <div class="col-md-12">'.$multi_file.'</div>
                                            <div class="col-md-12">'.$multi_detail.'</div>
                                            <div class="col-md-12">'.$section.'</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <script>
                        $(document).ready(function () {
                            FormEditable.textarea("editable-text", { type: "text" });
                        });
                    </script>
                    <script>
                        $(document).ready(function () {
                            FormValidation.submit("#form-add", {
                                rules: { menu: { required: true }, action: { required: true } },
                            });
                            $(\'select[name="level"]\').change(function () {
                                if ($(\'input[name="name"]\').val() == "" || $(this).val() == 0) {
                                    $(\'input[name="title"], input[name="description"], input[name="keyword"], input[name="display"], input[name="sort"], input[name="add-delete"]\').click();
                                }
                                $(\'input[name="name"]\').val($(this).val() != 0 ? "Tiêu đề" : "");
                            });

                            $(\'input[name="list_label_id[label]"]\').click(function () {
                                if ($(this).is(":checked")) {
                                    $(\'input[value="single"]\').prop("checked", true);
                                    $(\'input[name="list_label_id[mapping]"]\').prop("disabled", false);
                                } else {
                                    $(\'input[name="list_label_id[mapping]"]\').prop({ checked: false, disabled: true });
                                }
                            });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codevalidate') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Định nghĩa dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Định nghĩa dữ liệu</span></li>
                            </ul>
                        </div>
                        <form action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Định nghĩa dữ liệu</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">'.$required.$translate.'</div>
                                </div>
                            </div>
                        </form>
                    </div>';
                }
                break;
            case 'product_tb':
                if($data['_params']['action'] == 'codefield') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Cấu hình dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Cấu hình dữ liệu</span></li>
                            </ul>
                        </div>
                        <form id="form-add" action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Thông tin cấu hình</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn btn-sm red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">
                                        <div class="row">
                                            <div class="row col-md-12">
                                                <div class="col-md-2">'.$name.'</div>
                                                <div class="col-md-2">'.$desc_short.'</div>
                                                <div class="col-md-2">'.$detail.'</div>
                                                <div class="col-md-2">'.$price_market.'</div>
                                                <div class="col-md-2">'.$sku.'</div>
                                                <div class="col-md-2">'.$allow_size_image.'</div>
                                                <div class="col-md-4">'.$thumbnail.'</div>
                                            </div>
                                            <div class="row col-md-12">'.$list_selectCate_id.$list_product_id.$list_news_id.'</div>
                                            '.$typeCat.'
                                            <div class="col-md-12">'.$unit.'</div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Tùy chọn:</strong>
                                                    <div class="config-field">'.$titleSEO.$descriptionSEO.$keyword.$slug.$price_discount.$price_percent.$tags.$list_tag_id.$embed.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group" style="display: flex;">
                                                    <strong style="flex: none;">Chức năng:</strong>
                                                    <div class="config-field">'.$display.$add.$delete.$sort.$up.$copy.$colvis.$excel.$transfer_cate.$comment.$editable_price.$bulk_price.'</div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">'.$special.'</div>
                                            <div class="col-md-12">'.$multi_input.'</div>
                                            <div class="col-md-12">'.$multi_image.'</div>
                                            <div class="col-md-12">'.$multi_file.'</div>
                                            <div class="col-md-12">'.$multi_detail.'</div>
                                            <div class="col-md-12">'.$section.'</div>
                                            <div class="col-md-12">'.$sub.'</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <script>
                        $(document).ready(function () {
                            FormEditable.textarea("editable-text", { type: "text" });
                        });
                    </script>';
                } if($data['_params']['action'] == 'codevalidate') {
                    $html = '<div class="page-content">
                        <div class="page-bar">
                            <ul class="page-breadcrumb">
                                <li><a href="'.PUBLIC_PATH.'admin">Trang chủ</a><i class="fa fa-circle"></i></li>
                                <li><a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'">'.(str_replace('/Định nghĩa dữ liệu','', $data['_params']['title'])).'</a><i class="fa fa-circle"></i></li>
                                <li><span>Định nghĩa dữ liệu</span></li>
                            </ul>
                        </div>
                        <form action="" method="POST" enctype="multipart/form-data">
                            <div class="portlet box blue margin-bottom-0">
                                <div class="portlet-title">
                                    <div class="caption">Định nghĩa dữ liệu</div>
                                    <div class="actions">
                                        <button type="submit" class="btn green-jungle"><i class="fa fa-check-square-o"></i> Lưu</button>
                                        <a href="'.PUBLIC_PATH.'admin/'.$data['_params']['__CONTROLLER__'].'/list/root_id='.$data['_params']['root_id'].'" class="btn red"><i class="fa fa-share"></i> Thoát</a>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    <div class="form-body">'.$required.$translate.$exists.'</div>
                                </div>
                            </div>
                        </form>
                    </div>';
                }
                break;
            default:
                if($data['_params']['action'] == 'login') {
                    $html = '<form id="login-form" class="login-form" action="" method="post" novalidate="novalidate">
                        <h3 class="form-title font-green text-uppercase">Đăng nhập</h3>
                        '.($data['error_login'] ? '<div class="alert alert-danger"><button class="close" data-close="alert"></button><span> '.$data['error_login'].'</span></div>':'').'
                        <div class="form-group'.($data['error_input']['username'] ? ' has-error':'').'">
                            <label class="control-label visible-ie8 visible-ie9">Tài khoản</label>
                            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" name="username" placeholder="Tài khoản" aria-required="true" aria-invalid="false" aria-describedby="username-error"><cite id="username-error" class="h6 help-block">'.str_replace('Username: ','', $data['error_input']['username']).'</cite>

                        </div>
                        <div class="form-group'.($data['error_input']['password'] ? ' has-error':'').'">
                            <label class="control-label visible-ie8 visible-ie9">Mật khẩu</label>
                            <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" name="password" placeholder="Mật khẩu" aria-required="true" aria-invalid="false" aria-describedby="password-error"><cite id="password-error" class="h6 help-block">'.str_replace('Password: ','', $data['error_input']['password']).'</cite>

                        </div>
                        <div class="form-actions">
                            <label class="rememberme check mt-checkbox mt-checkbox-outline"><input type="checkbox" name="rememberPW" value="1">Ghi nhớ mật khẩu<span></span></label>
                            <a href="'.URL.'admin/reset.html" class="forget-password">Quên mật khẩu?</a>
                            <div class="text-center"><button type="submit" class="btn btn-sm green uppercase">Đăng nhập</button></div>
                        </div>
                        <div class="create-account"></div>
                        </form>
                        <script>
                            $(document).ready(function() {
                                $(\'#login-form\').validate({
                                    rules: { username: { required: true }, password: { required: true } },
                                    errorClass: "h6 help-block", // error
                                    highlight: function (element) {
                                        $(element).closest(\'.form-group\').addClass(\'has-error\');
                                        if ($(element)[0].tagName == \'SELECT\') {
                                            if ($(element).next()[0].tagName == \'CITE\') {
                                                $(element).closest(\'.form-group\').append($(element).next()[0].outerHTML);
                                                $(element).next().remove();
                                            }
                                        }
                                    },
                                    unhighlight: function (element) {
                                        $(element).closest(\'.form-group\').removeClass(\'has-error\');
                                    },
                                    success: function (label) {
                                        label.closest(\'.form-group\').removeClass(\'has-error\');
                                    },
                                });
                            });
                        </script>';
                }
        }

        return $html;
    }
}