<?php 

include('database.php');

$search = $_POST['search'];

if(!empty($search)){
    $sql = "SELECT * FROM tasks WHERE name LIKE '$search%'";
    $result = mysqli_query($connection, $sql);
    if(!$result) {
        die('Error de consulta' . mysqli_error($connection));
    }

    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id']
        );
    }

    $jsonString = json_encode($json);

    echo $jsonString;
}