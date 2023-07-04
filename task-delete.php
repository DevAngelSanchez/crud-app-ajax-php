<?php 

include('database.php');

if(isset($_POST['id'])){
    $id = $_POST['id'];

    $sql = "DELETE FROM tasks WHERE id = $id";
    $result = mysqli_query($connection, $sql);
    if(!$result){
        die('Error de consulta' . mysqli_error($connection));
    }

    echo "task deleted successfully";
}    