
//funcion mostrarTodos
function mostrarTodos(){
  var vecespresionado=0;
$("#mostrarTodos").on("click",function(){
  vecespresionado++;
  if(vecespresionado==1){
  $.ajax({
    url: "./index.php",
    success: function(data){
     var datos= JSON.parse(data);
      //console.log(datos);
      $("#tabla").remove()
      $("#contenedorG").append("<table id= tabla></table>")
      $("#tabla").append("<thead><tr id=cabezatabla></tr></thead>")
      var encabezado= ["Id","Direccion","Ciudad","Telefono","Codigo_Postal","Tipo","Precio"]
      $("#tabla").append("<tbody id=cuerpo></tbody>")
      for(var i=0;i<=6;i++)
      {
        $("#cabezatabla").append("<td>"+encabezado[i]+"</td>")
      }
      for(var items of datos)
      {
        $("#cuerpo")
        .append(`<tr>
          <td>${items.Id}</td>
          <td>${items.Direccion}</td>
          <td>${items.Ciudad}</td>
          <td>${items.Telefono}</td>
          <td>${items.Codigo_Postal}</td>
          <td>${items.Tipo}</td>
          <td>${items.Precio}</td>
          </tr>`)
      }

    }
  })}
  else if (vecespresionado>1) {
    alert("ya se muestran todos los datos");
  }
})
}
//funcion filtro de Ciudad
function filtroCiudad(){
  $.ajax({
    url:"./ciudades.php"
  }).done(function(data){
    var datos= JSON.parse(data);

    var ciudades= []
    for (var i=0;i<datos.length;i++)
    {
      var items= datos[i];
      var c= items.Ciudad;
      ciudades.push(c);
    }
    ciudades=ciudades.filter(function (x,i,a) {
      return a.indexOf(x) == i;
    });

    for(var i=0; i<ciudades.length;i++){
          $("#selectCiudad").append(`<option value= ${ciudades[i]} selected>${ciudades[i]}</option>`)
    }
  })
}

//funcion flitro Tipo
function filtrotipo(){
  $.ajax({
    url:"./Tipo.php"
  }).done(function(data){
    var datos= JSON.parse(data);
     var tipo= []
    for (var i=0;i<datos.length;i++)
    {
      var items= datos[i];
      var c= items.Tipo;
      tipo.push(c);
    }
    tipo=tipo.filter(function (x,i,a) {
      return a.indexOf(x) == i;
    });
    for(var i=0; i<tipo.length;i++){
          $("#selectTipo").append("<option value="+tipo[i]+" selected>"+tipo[i]+"</option>")//`<option value=${tipo[i]} selected>${tipo[i]}</option>`

    }
  })
}

//funcion buscar por ciudad y o tipo
function buscartipociudad(){
  $("#formulario").submit(function(event){
    var ciudad= $("#selectCiudad").val();
    var tipo=$("#selectTipo").val();
    var rangoPrecio=$("#rangoPrecio").val();

    event.preventDefault();
    $.ajax({
      url:"./busqueda.php",
      type: "POST",
      dataType: "html",
      data: {ciudad: ciudad, tipo: tipo, rangoPrecio: rangoPrecio},
    }).done(function(data)
      {
        var datos=JSON.parse(data);
        $("#tabla").remove()
        $("#contenedorG").append("<table id= tabla></table>")
        $("#tabla").append("<thead><tr id=cabezatabla></tr></thead>")
        var encabezado= ["Id","Direccion","Ciudad","Telefono","Codigo_Postal","Tipo","Precio"]
        $("#tabla").append("<tbody id=cuerpo></tbody>")
        for(var i=0;i<=6;i++)
        {
          $("#cabezatabla").append("<td>"+encabezado[i]+"</td>")
        }
        for(var items of datos)
        {
          $("#cuerpo")
          .append(`<tr>
            <td>${items.Id}</td>
            <td>${items.Direccion}</td>
            <td>${items.Ciudad}</td>
            <td>${items.Telefono}</td>
            <td>${items.Codigo_Postal}</td>
            <td>${items.Tipo}</td>
            <td>${items.Precio}</td>
            </tr>`)
        }
      })
  })
}



//funcion principal
$(function(){
$("select").css("display","block");

buscartipociudad();
filtrotipo();
filtroCiudad();
mostrarTodos();
})
