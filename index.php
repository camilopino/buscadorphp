<?php

  $file= fopen("./data-1.json","r");
  $data= fread($file,filesize("./data-1.json"));
  $dataArray= json_decode(file_get_contents('./data-1.json'));
  echo json_encode($dataArray);
  fclose($file);

 ?>
