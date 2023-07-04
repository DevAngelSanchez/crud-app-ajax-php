<?php 

include('database.php');

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];

$sql = "UPDATE tasks SET name = '$name', description = '$description' WHERE id = '$id'";

$result = mysqli_query($connection, $sql);

if(!$result){
    die("Error en la query");
}

echo "Task update successfully";