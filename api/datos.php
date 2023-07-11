<?php
require_once 'modelos.php'; // requerimos el archivo de clases modelo.php

if (isset($_GET['tabla'])) {
    $t = $_GET['tabla'];

    $tabla = new ModeloABM('$t');

    $datos = $tabla->seleccionar();
    echo $datos;
}
