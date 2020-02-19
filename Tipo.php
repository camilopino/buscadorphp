<?php

  $file= fopen("./data-1.json","r");
  $data= fread($file,filesize("./data-1.json"));
  $dataArray= json_decode(file_get_contents('./data-1.json'));
  $arreglo=json_encode($dataArray);
  echo $arreglo;

 ?>
