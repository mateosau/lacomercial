<?php
require_once 'modelos.php'; // requerimos el archivo de clases modelo.php
$mensaje = '';

if (isset($_GET['tabla'])) { // si esta seteado el atributo tabla
    $t = $_GET['tabla'];
    $tabla = new ModeloABM($t);// creamos el objeto $tabla

    if(isset($_GET['ID'])){  // si esta seteado el atributo id
        $tabla->set_criterio("id=".$_GET['id']);  // establecemis el criterio
    }

    if (isset($_GET['accion'])) { // Si esta seteado el atributo accion
        switch ($_GET['accion']) {                           //segun la accion
            case 'seleccionar':                                // en caso q sea 'seleccionar'
                $datos = $tabla->seleccionar();                // Ejecutamos el metodo seleccionar()
                echo $datos;                                   // Devolvemps los datos
                break;
            case 'insertar':                                   // En caso q sea 'insetar'
                $valores = $_POST;                             // tomamos los valores de post
                $tabla->insertar($valores);                    // Ejecutamos el metodo insertar()   
                $mensaje .= 'Datos guardados';                 // creamos el mensaje
                echo json_encode($mensaje);                    // mostramos el mensaje
                break;

                case 'actualizar':                             // en casp q sea 'actualizar'
                    $valores = $_POST;                         // Tomamos los valores del post
                    $tabla->actualizar($valores);              // ejecutamos el metodo actualizar()
                    $mensaje .= 'Datos actualizar';             // creamos un mensaje
                    echo json_encode($mensaje);                // mostramos el mensaje
                    break;
        }
    }
}
