<?php 

include('database.php');

$sql = "SELECT * FROM tasks";
$result = mysqli_query($connection, $sql);

if(!$result) {
    die("Error de consulta" . mysqli_error($connection));
}

$json = array();
while( $row = mysqli_fetch_array($result) ) {
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}

$jsonString = json_encode($json);

echo $jsonString;