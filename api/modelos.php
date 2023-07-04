<?php
require_once 'config.php';// requerimos el archivo config.php

/* definir la clase principal*/
class modelo {
    //propiedades
    protected $_db;

    //constructor con la conexion a la BD
    public function __construct(){
        $this->_db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        // Si se produce un error de conexion, muestra el error
        if($this->_db->connect_errno) {
            echo 'Fallo al conectar a MySQL: '.$this->_db->connect_error;
            return;
        }
        //establecemos el conjunto de caracteres a utf8
        $this->_db->set_charset(DB_CHARSET);
        $this->_db->query("SET NAMES 'utf8'");
    }
}
/* Fin de la clase principal*/

/* clase ModeloABM basada en la clase principal */

class ModeloABM extends Modelo{
    //propiedades
    private $tabla;          // nombre de la tabla
    private $id = 0;           // id del registro
    private $criterio = '';  //criterio para las consultas
    private $campos = '*';      //lista de campos
    private $orden = 'id';     // campo de ordenamiento
    private $limit ='0';      // cantidad de registros

    //constructor
    public function __construct($t){
        parent::__construct();  // ejecutamos el constructor padre
        $this->tabla= $t;       // asignamos a $tabla el parametro $t
    }

    /* GETTER */
    public function get_tabla(){
        return $this->tabla;
    }

    public function get_id(){
        return $this->id;
    }

    public function get_criterio(){
        return $this->criterio;
    }

    public function get_campos(){
        return $this->campos;
    }

    public function get_limit(){
        return $this->limit;
    }
    
    /* SETTER */
    
    public function set_tabla($tabla){
        $this->tabla = $tabla;
    }

    public function set_id($id){
        $this->id = $id;
    }

    public function set_criterio($criterio){
        $this->criterio = $criterio;
    }

    public function set_campos($campos){
        $this->campos = $campos;
    }

    public function set_orden($orden){
        $this->orden = $orden;
    }

        public function set_limit($limit){
        $this->limit = $limit;
    }

    /*metodo de seleccion de datos */
    public function seleccionar(){
        // SELECT *FROM articulos WHERE criterios ORDER BY campo LIMIT 10
        $sql = "SELECT $this->campos FROM $this->tabla"; //SELECCIONAR $campos DESDE $tabla
        //si el criterio NO es igual a Nada
        if($this->criterio !=''){
            $sql = $sql . " WHERE $this->criterio"; // Donde $criterio
        }
        //agregamos el orden
        $sql .= " ORDER BY $this->orden"; //ORDENADO POR %orden
        // Si $limit es mayor q cero
        if($this->limit > 0){
            // Agragamos el limite
            $sql .= " LIMIT $this->limit";
        }
        //echo $sql. '<br>'; // mostramos las instrucciones sql resultante

        // ejecutamos la consulta y la guardamos en $resultado
        $resultado = $this->_db->query($sql);
        
        //GUARDAMOS LOS DATOS EN UN ARRAY ASOCIATIVO 
        $datos = $resultado->fetch_all(MYSQLI_ASSOC);
        print_r($datos);
        //comvertimos los datos a formato json
        $datos_json = json_encode($datos);
        //print_r($datos_json);
           
        // retornamos los datos JSON
        return $datos_json;

    }

}

?>