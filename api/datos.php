<?php
require_once 'modelos.php'; // requerimos el archivo de clases modelo.php

$tabla = new ModeloABM('articulos'); 

$datos = $tabla->seleccionar();
echo $datos;