<?php
namespace Backend\View\Helper;
use Zend\View\Helper\AbstractHelper;

class FormatData extends AbstractHelper
{
    public static function multiData(&$data, $config)
    {
        $fieldMultis = array('multi_input','multi_detail');

        foreach ($fieldMultis as $fieldMulti) {
            foreach ($config['field'][$fieldMulti] as $define) {
                if ($define['auto']) {
                    array_shift($data[$fieldMulti][$define['name']]);
                    foreach ($config['langlist'] as $lang) {
                        array_shift($data['translate'][$lang[0]][$fieldMulti][$define['name']]);
                    }
                }
            }
        }

        foreach ($config['field']['sub'] as $defineSub) {
            array_shift($data['sub'][$defineSub['key']]);
            foreach ($defineSub['define']['multi_input'] as $defineInput) {
                if ($defineInput['auto']) {
                    foreach ($data['sub'][$defineSub['key']] as $i => $value) {
                        if ($config['lang']) {
                            $dataTranslate = $value['translate'][$config['lang']];
                            if ($dataTranslate) {
                                $dataTranslate['multi_input'] = array_merge($dataTranslate['multi_input'] ?? array(), $value['multi_input'] ?? array());
                                $dataTranslate = array_merge($value, $dataTranslate);
                                $value = $dataTranslate;
                                unset($dataTranslate['translate']);
                                $value['translate'][$config['lang']] = $dataTranslate;
                                $data['sub'][$defineSub['key']][$i] = $value;
                            }
                            foreach ($config['langlist'] as $lang) {
                                array_shift($value['translate'][$lang[0]]['multi_input'][$defineInput['name']]);
                                $data['translate'][$lang[0]]['sub'][$defineSub['key']][$i] = $value['translate'][$lang[0]];
                            }
                            unset($value['translate']);
                        }
                        array_shift($value['multi_input'][$defineInput['name']]);
                        $data['sub'][$defineSub['key']][$i] = array_merge($value, array('multi_input' => json_encode($value['multi_input'], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE)));
                    }
                }
            }
        }
    }
}