<?php

namespace Frontend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class ConvertWebpEditor extends AbstractHelper
{
    public function __invoke($detail)
    {
        if (empty(WEBP_EXT)) return $detail;

        $replaces = [];
        $rootPath = str_replace(substr(PUBLIC_PATH, 0, -1), '', ROOT_PUBLIC);
        $searchs = preg_match_all('/<img[^>]*\/>/', $detail, $output) ? $output[0] : array();
        foreach ($searchs as $i => $tagImg) {
            $img = preg_match('/(?<=src=")[^"]*(?=")/', $tagImg, $output) ? $output[0] : '';
            if (exif_imagetype($rootPath.$img) && file_exists($rootPath.$img)) {
                \Backend\View\Helper\ThumbImages\WebpConvert::convert($rootPath.$img);
                $replaces[] = str_replace($img, $img.WEBP_EXT, $tagImg);
            } else {
                unset($searchs[$i]);
            }
        }

        return str_replace($searchs, $replaces, $detail);
    }
}