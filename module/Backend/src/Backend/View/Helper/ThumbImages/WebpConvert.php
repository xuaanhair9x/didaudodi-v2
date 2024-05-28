<?php

namespace Backend\View\Helper\ThumbImages;
use Zend\View\Helper\AbstractHelper;

class WebpConvert extends AbstractHelper
{
    /**
    * Convert image to webp extension
    *
    * @param (string) $file: Path of the image file
    * @param (int) $quality
    *
    * Result: Create file image with webp extension
    * Not supported svg format
    */
    public static function convert($file, $quality = 90)
    {
        // If output file already exists return path
        $output_file = $file . '.webp';
        if (file_exists($output_file)) {
            return $output_file;
        }

        // Check image type && library exists
        if (!exif_imagetype($file) || !function_exists('imagewebp')) {
            return false;
        }

        $file_type = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        $file_types = array('jpeg','jpg','png');

        if (!in_array($file_type, $file_types)) {
            copy($file, $output_file);
            return $output_file;
        }

        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);

        array_unshift($file_types, $file_type);
        $file_types = array_unique($file_types);

        foreach ($file_types as $file_type) {
            switch ($file_type) {
                case 'jpeg':
                case 'jpg':
                    $image = imagecreatefromjpeg($file);
                break;
                case 'png':
                    $image = imagecreatefrompng($file);
                    imagepalettetotruecolor($image);
                    imagealphablending($image, true);
                    imagesavealpha($image, true);
                break;
            }
            if ($image !== false) {
                break;
            }
        }

        // Save the image
        $result = imagewebp($image, $output_file, $quality);

        // Free up memory
        imagedestroy($image);

        return ($result === false) ? false : $output_file;
    }

    /**
    * Convert all image to webp extension
    */
    public static function convertAll(){
        $dirtoarray = new \Backend\View\Helper\DirToArray();
        $array_flatten = new \Backend\View\Helper\ArrayFlatten();
        $imgs = $array_flatten($dirtoarray(ROOT_PUBLIC.'/'.UPLOAD_IMAGES));
        $imgs = preg_grep('/([^.webp])$/i', $imgs);
        foreach ($imgs as $img) {
            preg_match('/^(\d+-)|(-\d+-)/', $img, $times);
            self::convert(ROOT_PUBLIC.'/'.UPLOAD_IMAGES.date('Y/m',str_replace('-', '', $times[0])).'/'.$img);
        }
    }
}