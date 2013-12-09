<?php 
define("__DB_NAME__", "qqpp");
define("__DB_HOST__", "localhost:3306");
define("__DB_USER__","root");
define("__DB_PASSWORD__","");
require_once "./db.class.php";
$db = new MYSQL(__DB_NAME__,__DB_USER__,__DB_PASSWORD__,__DB_HOST__);

 ?>