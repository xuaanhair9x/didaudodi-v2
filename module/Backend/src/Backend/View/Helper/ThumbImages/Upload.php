<?php

namespace Backend\View\Helper\ThumbImages;
use Zend\View\Helper\AbstractHelper;
use Backend\View\Helper\ThumbImages\ThumbImages;
use DOMDocument;

class Upload extends AbstractHelper
{
    /**
     * [uploadImage upload và move một hoặc nhiều hình]
     * @param [array] &$post        [Dữ liệu từ $this->_params['post']]
     * @param [array] $inputs       [Thông tin hình ảnh cần upload]
     * @param [array] $define       [Dữ liệu định nghĩa kích thước]
     * @param [array] $data         [Dữ liệu được lấy theo id]
     * @param [string] $module      [<module><root_id>]
     */
    public function uploadImage(&$post, $inputs, $define, $data, $module = null)
    {
        foreach ($inputs as $typeUpload => $arrUpload) {
            $prefix = ($module) ? $typeUpload.'_'.$module : '';
            foreach ($arrUpload as $nameInput => $sizeThumb) {
                if ($typeUpload == 'single') {
                    $hasTranslate = array_filter($define['validate']['translate'], function($val) use ($nameInput) { return $val == $nameInput; });

                    if ($define['lang'] && $hasTranslate) {
                        foreach ($define['listLang'] as $lang) {
                            $files = array_reduce(array_keys($_FILES['translate']), function($acc = array(), $key) use ($nameInput, $lang) {
                                $acc[$key] = $_FILES['translate'][$key][$lang[0]][$nameInput];
                                return $acc;
                            });

                            $post['translate'][$lang[0]][$nameInput] = $this->uploadSingleImage($files, $post['translate'][$lang[0]][$nameInput], $data['translate'][$lang[0]][$nameInput], $define[$nameInput], $sizeThumb[1], $prefix);
                        }

                        $post[$nameInput] = $post['translate'][$define['lang']][$nameInput];
                    } else {
                        $post[$nameInput] = $this->uploadSingleImage($_FILES[$nameInput], $post[$nameInput], $data[$nameInput], $define[$nameInput], $sizeThumb[1], $prefix);
                    }
                }
                if ($typeUpload == 'multi') {
                    $index = array_search($nameInput, array_column($define['multi_image'], 'name'));

                    if ($define['lang'] && ($define['multi_image'][$index]['translate'] || $define['multi_image'][$index]['translate_image'])) {
                        foreach ($define['listLang'] as $lang) {
                            $files = array_reduce(array_keys($_FILES['translate']), function($acc = array(), $key) use ($nameInput, $lang) {
                                $acc[$key] = $_FILES['translate'][$key][$lang[0]]['multi_image'][$nameInput]['thumbnail'];
                                return $acc;
                            });

                            $post['translate'][$lang[0]]['multi_image'][$nameInput] = $this->uploadMultiImage($files, $post['translate'][$lang[0]]['multi_image'][$nameInput], $define['multi_image'][$index]['size'], $sizeThumb, $prefix.$index);
                        }

                        $post['multi_image'][$nameInput] = $post['translate'][$define['lang']]['multi_image'][$nameInput];
                    } else {
                        $files = array_reduce(array_keys($_FILES['multi_image']), function($acc = array(), $key) use ($nameInput) {
                            $acc[$key] = $_FILES['multi_image'][$key][$nameInput]['thumbnail'];
                            return $acc;
                        });

                        $post['multi_image'][$nameInput] = $this->uploadMultiImage($files, $post['multi_image'][$nameInput], $define['multi_image'][$index]['size'], $sizeThumb, $prefix.$index);

                        if ($post['translate'][$define['lang']]['multi_image'][$nameInput]) {
                            $post['translate'][$define['lang']]['multi_image'][$nameInput] = $post['multi_image'][$nameInput];
                        }
                    }
                }
            }
        }
    }

    public function uploadSingleImage($file, $post, $data, $sizeConfig, $sizeDefault, $prefix)
    {
        if ($file['error']) return $data;

        $thumbnail = '';
        $arrSize['size'] = $sizeConfig ? array_merge(explode(',', $sizeConfig), $sizeDefault) : $sizeDefault;

        if ($post) {
            $thumbnail = $file['name'] = time().'-'.($prefix ? $prefix.'-' : '').$post;
            $this->resizeImage($file, $arrSize);
        }

        $this->moveImage($data, $arrSize);

        return $thumbnail;
    }

    public function uploadMultiImage($file, $post, $sizeConfig, $sizeDefault, $prefix)
    {
        $multiImage = array();
        $arrSize['size'] = $sizeConfig ? array_merge(explode(',', $sizeConfig), $sizeDefault[1]) : $sizeDefault[1];

        foreach ($post['thumbnail'] as $i => $filename) {
            if ($filename || $post['hide'][$i]) {
                $post['thumbnail'][$i] = (($filename) ? $filename : $post['hide'][$i]);
                if ($file['error'][$i] == 0) {
                    $post['thumbnail'][$i] = (time() + 1).'-'.$prefix.'-'.(($filename) ? $filename : $post['hide'][$i]);
                    $arrFile = array(
                        'name' => $post['thumbnail'][$i],
                        'type' => $file['type'][$i],
                        'tmp_name' => $file['tmp_name'][$i],
                        'error' => $file['error'][$i],
                        'size' => $file['size'][$i],
                    );

                    $this->resizeImage($arrFile, $arrSize);
                }
            }
            $multiImage[] = array_merge(
                array(
                    'sort' => $post['sort'][$i] ?? '',
                    'name' => $post['name'][$i] ?? $post['thumbnail'][$i],
                    'thumbnail' => $post['thumbnail'][$i]
                ),
                $post['desc_short'][$i] ? array('desc_short' => $post['desc_short'][$i]) : array(),
                $post['link'][$i] ? array('link' => $post['link'][$i]) : array()
            );
        }

        foreach ($post['delete'] as $filename) {
            $this->moveImage($filename, $arrSize);
        }

        return $multiImage;
    }

    /**
     * [deleteImage di chuyển một hoặc nhiều hình]
     * @param [array] $data        [Dữ liệu lấy theo id]
     * @param [array] $inputs      [Thông tin hình ảnh cần upload]
     * @param [array] $define      [Dữ liệu định nghĩa kích thước]
     */
    public function deleteImage($data, $inputs, $define)
    {
        foreach ($inputs as $type => $arrUpload) {
            foreach ($arrUpload as $name => $sizeDefault) {
                if ($type == 'single') {
                    $arrSize['size'] = ($define) ? array_merge(explode(',',$define[$name]), $sizeThumb[1]) : $sizeThumb[1];
                    $this->moveImage($data[$name], $arrSize);
                }
                if ($type == 'multi') {
                    $index = array_search($name, array_column($define['multi_image'], 'name'));
                    $arrSize['size'] = ($define['multi_image']) ? array_merge(explode(',',$define['multi_image'][$index]['size']), $sizeThumb[1]) : $sizeThumb[1];
                    $data['multi_image'] = (is_array($data['multi_image'])) ? $data['multi_image'] : json_decode($data['multi_image'], true);
                    foreach ($data['multi_image'][$name] as $value) {
                        $this->moveImage($value['thumbnail'], $arrSize);
                    }
                }
            }
        }
    }

    /**
     * [updateImage Update hình khi thay đôi định nghĩa kích thước]
     * @param  [string] $params['sizesOld']     [Kích thước cũ]
     * @param  [string] $params['sizesNews']    [Kích thước mới]
     * @param  [string] $params['module']       [<module><root_id>]
     */
    public function updateImage($params)
    {
        $sizesOld = explode(',', $params['sizesOld']);
        $sizesNews = explode(',', $params['sizesNews']);
        $sizes = array_diff($sizesNews, $sizesOld);

        $dirtoarray = new \Backend\View\Helper\DirToArray();
        $array_flatten = new \Backend\View\Helper\ArrayFlatten();
        $imgs = $array_flatten($dirtoarray(ROOT_PUBLIC.'/'.UPLOAD_IMAGES));
        $matches = preg_grep('/^(\d+)-'.$params['module'].'-/i', $imgs);

        // sizes upload
        if ($sizes) {
            foreach ($matches as $img) {
                $this->resizeImage($img, array('size' => $sizes));
            }
        }

        // sizes move
        if (array_diff($sizesOld, $sizesNews)) {
            foreach ($matches as $img) {
                $this->moveImage($img, array('size' => array_diff($sizesOld, $sizesNews)), true);
            }
        }
    }

    /**
     * [resizeImage Upload hình ảnh]
     * @param  [array] $arrFile [Dữ liệu $_FILES]
     * @param  [array] $sizes   [Kích thước hình ảnh cần resize]
     * - Có 3 kiểu resize hình
     *   + Resize theo chiều dài (width)
     *   + Resize theo chiều cao (height)
     *   + Resize theo 2 chiều
     * - Chú thích
     *   + $wh[0]: chiều dài (width)
     *   + $wh[1]: chiều cao (height)
     */
    public function resizeImage($arrFile, $sizes)
    {
        $handle = new ThumbImages($arrFile, 'vn_VN');
        if ($handle->uploaded) {
            $file_name = $arrFile;
            $dir_dest = ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-',$file_name)[0]).'/';

            if (is_array($arrFile)) {
                $file_name = $arrFile['name'];
                $dir_dest = $this->createFolder(UPLOAD_IMAGES);
                $handle->Process($dir_dest);
                if (defined('WEBP_CONVERT') && !empty(WEBP_CONVERT)) {
                    \Backend\View\Helper\ThumbImages\WebpConvert::convert($handle->file_dst_pathname);
                }
            }

            if (end(explode('.', $file_name)) == 'svg') {
                $this->resizeImageSvg($dir_dest, $file_name, $sizes);
            } else {
                $file_name = $this->removeExtension($file_name);
                foreach ($sizes['size'] as $size){
                    $wh = explode("x",$size);
                    if ($wh[0] == 'auto') {
                        $handle->image_ratio_x      = true;
                        $handle->image_y            = $wh[1];
                    } else if ($wh[1] == 'auto') {
                        $handle->image_ratio_y      = true;
                        $handle->image_x            = $wh[0];
                    } else {
                        if ($wh[2] == 'fi') {
                            $handle->image_ratio_fill   = true;
                            $handle->image_y            = $wh[1];
                        } else {
                            $handle->image_ratio_y      = true;
                        }
                        $handle->image_x            = $wh[0];
                    }
                    $handle->file_new_name_body = $wh[0].'x'.$wh[1].'-'.$file_name;
                    $handle->image_resize = true;
                    $handle->Process($dir_dest);
                    if (defined('WEBP_CONVERT') && !empty(WEBP_CONVERT)) {
                        \Backend\View\Helper\ThumbImages\WebpConvert::convert($handle->file_dst_pathname);
                    }
                }
            }
        } else {
            echo '<br />' . 'Error: ' . $handle->error . '';
        }
    }

    public function resizeImageSvg($path, $filename, $sizes)
    {
        $dom = new DOMDocument('1.0', 'utf-8');
        $dom->load($path.$filename);
        $svg = $dom->documentElement;

        if (!$svg->hasAttribute('viewBox')) {
            $pattern = '/^(\d*\.\d+|\d+)(px)?$/';
            $interpretable = preg_match( $pattern, $svg->getAttribute('width'), $width ) &&
                            preg_match( $pattern, $svg->getAttribute('height'), $height );

             if ( $interpretable ) {
                $view_box = implode(' ', [0, 0, $width[0], $height[0]]);
                $svg->setAttribute('viewBox', $view_box);
            } else {
                throw new Exception("viewBox is dependent on environment");
            }
        }

        foreach ($sizes['size'] as $size){
            $wh = explode("x",$size);
            $width = $wh[0];
            $height = $wh[1];
            $newFilename = $wh[0].'x'.$wh[1].'-'.$filename;

            $svg->setAttribute('width', $width);
            $svg->setAttribute('height', $height);
            $dom->save($path.$newFilename);

            // Not supported convert webp
            // if (defined('WEBP_CONVERT') && !empty(WEBP_CONVERT)) {
            //     \Backend\View\Helper\ThumbImages\WebpConvert::convert($path.$newFilename);
            // }
        }
    }

    /**
     * [moveImage di chuyển hình ảnh qua thư mục khác]
     * @param  [string] $filename       [Tên hình ảnh]
     * @param  [array] $sizes           [Kích thước hình]
     * @param  [bool] $keep_root        [Giữ lại file gốc]
     */
    public function moveImage($filename,$sizes,$keep_root = false)
    {
        $pathFolder = ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',explode('-',$filename)[0]).'/';
        $pathFile = $pathFolder.$filename;

        if (!$filename || !file_exists($pathFile)) return;

        if (file_exists($pathFile) && !$keep_root) {
            rename($pathFile, ROOT_PUBLIC.'/'.UPLOAD_REMOVES.$filename);
            unlink($pathFile);
            if (file_exists($pathFile.'.webp')) {
                rename($pathFile, ROOT_PUBLIC.'/'.UPLOAD_REMOVES.$filename.'.webp');
                unlink($pathFile.'.webp');
            }
        }
        foreach ($sizes['size'] as $size){
            $wh = explode("x",$size);
            $name = $wh[0].'x'.$wh[1].'-'.$filename;
            $pathFile = $pathFolder.$name;
            if (file_exists($pathFile)) {
                rename($pathFile, ROOT_PUBLIC.'/'.UPLOAD_REMOVES.$name);
                unlink($pathFile);
                if (file_exists($pathFile.'.webp')) {
                    rename($pathFile, ROOT_PUBLIC.'/'.UPLOAD_REMOVES.$name.'.webp');
                    unlink($pathFile.'.webp');
                }
            }
        }
    }

    /**
     * [uploadFile Upload file lên server]
     * @param [array] &$post       [Dữ liệu từ $this->_params['post']
     * @param [array] $inputs      [Thông tin file cần upload]
     */
    public function uploadFile(&$post, $inputs)
    {
        $path = $this->createFolder(UPLOAD_FILES);
        foreach ($inputs as $value) {
            $arrFile = array();
            foreach ($post['multi_file'][$value['name']]['file'] as $i => $file) {
                if ($file && $_FILES['multi_file']['name'][$value['name']]['file'][$i]) {
                    $post['multi_file'][$value['name']]['file'][$i] = (time() + $i).'-'.$file;
                    move_uploaded_file(
                        $_FILES['multi_file']['tmp_name'][$value['name']]['file'][$i],
                        $path.$post['multi_file'][$value['name']]['file'][$i]
                    );
                } else {
                    $post['multi_file'][$value['name']]['file'][$i] = $post['multi_file'][$value['name']]['hide'][$i];
                }
                $arrFile[] = array(
                    'name' => $post['multi_file'][$value['name']]['name'][$i],
                    'file' => $post['multi_file'][$value['name']]['file'][$i]
                );
            }
            $post['multi_file'][$value['name']] = $arrFile;
        }
    }

    /**
     * [createFolder Tạo thứ mục Năm/Tháng]
     * @param  [string] $path [Đường dẫn thư mục muốn tạo]
     * @return [string]       [Đường dẫn thư mục với thứ mục Năm/Tháng]
     */
    public function createFolder($path)
    {
        //Tạo thư mục chứa hình ảnh theo Năm
        $pathFolder = ROOT_PUBLIC.'/'.$path.date('Y',time());
        mkdir($pathFolder);
        // Tạo thư mục chứa hình ảnh theo Tháng
        $pathFolder = $pathFolder.'/'.date('m',time());
        mkdir($pathFolder);
        return $pathFolder.'/';
    }

    /**
     * [removeExtension]
     * @param  [string] $filename [Tên file cần xoá extension ex: abc.def.jpg]
     * @return [string] [Tên đã được bỏ đi .<extension> ex: abc.def]
     */
    public function removeExtension($filename)
    {
        $filename = substr($filename, 0 , (strrpos($filename, ".")));
        return $filename;
    }

    public static function renameExtension($filename)
    {
        $extens = substr($filename,(strrpos($filename, ".")));
        return str_replace($extens, strtolower($extens), $filename);
    }
}
?>