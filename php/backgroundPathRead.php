<?php

$filename_array = array();
$dir = '../img/';
$filenames = scandir($dir);
sort($filenames, SORT_NUMERIC);
$file_num = count($filenames);

for($i=0; $i<$file_num; $i++){
    $filename = $filenames[$i];
    if($filename != '.' && $filename != '..'){
        echo $dir.$filename.',';

    }
}

?>