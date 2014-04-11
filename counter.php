<?php

if($_GET["success"] == 1) {
	$count = file_get_contents("counter.txt");
        $count = trim($count);
        $count = $count + 1;
        $fl = fopen("counter.txt","w+");
        fwrite($fl,$count);
        fclose($fl);
	include_once("googleanalytics.php");
} else {
	die();
}
?>
