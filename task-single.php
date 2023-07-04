<?php 

include('database.php');

$id = $_POST['id'];

$sql = "SELECT * FROM tasks WHERE id = $id";
$result = mysqli_query($connection, $sql);

if(!$result) {
    die("Error " . mysqli_error($connection));
}

$json = array();
while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}

$jsonString = json_encode($json[0]);
echo $jsonString;