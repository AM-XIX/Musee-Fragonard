<?php 
// Autoriser n'importe quel site web à récupérer en Javascript des données de cette API :
header("Access-Control-Allow-Origin: *");

// Fournir un résultat en JSON :
header('content-type:application/json');

$bdd=  new PDO('mysql:host=localhost;dbname=musee_veterinaire', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));

$sth = $dbh->prepare("SELECT nom, couleur FROM fruit");
$sth->execute();

/* Récupération de toutes les lignes d'un jeu de résultats */
print("Récupération de toutes les lignes d'un jeu de résultats :\n");
$result = $sth->fetchAll();
print_r($result);
?>