<?php

  $file= fopen("./data-1.json","r");
  $data= fread($file,filesize("./data-1.json"));
  $dataArray= json_decode(file_get_contents("./data-1.json"));
  $ciudad=$_POST['ciudad'];
  $tipo= $_POST['tipo'];
  $rangoprecio=$_POST['rangoPrecio'];
  $rango= explode(";",$rangoprecio);
  $Ciudadesarray= array();
  $Tipoarray= array();
  $precioarray=array();
  $precioL="$".$rango[0];
  $precioH="$".$rango[1];

  foreach ($dataArray as $key => $value) {
      if($ciudad==$value->Ciudad){
    array_push($Ciudadesarray,$value);
    }
  }
  foreach ($Ciudadesarray as $key => $value) {
    if($tipo==$value->Tipo)
    {
      array_push($Tipoarray,$value);
    }
  }

  foreach ($Tipoarray as $key => $value) {
    $preciopropiedad=$value->Precio;

    if($precioL<=$value->Precio && $precioH>$value->Precio)
    {
      array_push($precioarray,$value);
    }

}
    echo json_encode($precioarray);

 ?>
