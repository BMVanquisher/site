<?php
$postdata = file_get_contents("php://input");
file_put_contents('news.json', $postdata);
echo json_encode($postdata);
?>