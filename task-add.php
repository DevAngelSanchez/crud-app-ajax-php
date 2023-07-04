<?php 

include('database.php');

if(isset($_POST['name']) && isset($_POST['description'])){
    $name = $_POST['name'];
    $description = $_POST['description'];

    $sql = "INSERT into tasks(name, description) VALUES('$name', '$description')";
    $result = mysqli_query($connection, $sql);
    if(!$result) {
        die("La consulta ha fallado");
    }
    echo "Task added successfully";
}