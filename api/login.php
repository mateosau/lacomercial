<?php
require_once 'modelos.php'; // requerimos el archivo de clases modelo.php
$mensaje = '';
$valores = $_POST; // tomamos los valores que vienen del post en formato json
if($_POST['usuario'] == '' || $_POST ['password'] == ''){
    $mensaje .= "el usuario o la contraseña entan vacios<br>";
    echo json_decode($mensaje);
} else{
    $usuario = "'" . $_POST['usuario'] . "'";
    $password = "'" . $_POST['password'] . "'";

    $usuarios = new ModeloABM('clientes');
    $usuarios->set_criterio("usuario=$usuario AND password=$password");
    $datos = $usuarios->seleccionar();
    if(count(json_decode($datos)) == 0 ){
        $mensaje .= "el usuario o la contraseña no coinciden<br>";
        echo json_decode($mensaje);
    } else{
        echo $datos;
    }
}
?>