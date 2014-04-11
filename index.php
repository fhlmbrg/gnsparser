<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>GNSparser</title>
<script src="jquery.js"></script>
<script src="javascript.js"></script>
<link rel="stylesheet" type="text/css" href="style.css" />
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
<!--Google Analytics-->
<?php include_once("googleanalytics.php") ?>
</head>
<body>
<div class="title" align="center">
GNSparser</div>
<div class="subtitle" align="center">The network lab config generator</div>
<div class="content" align="center">
	<div id="drop-files" ondragover="return false">
		Drop your .net file here
	</div>
</div>

<table border="0" width="500" align="center">
<tr><td>

<div class="info" align="left">

<div class="infotitle">How it works:</div>
Build your Dynagen/GNS3 topology then drag and drop your .net file on to the field above. The topology is run through a series of scripts and in return you will receive a ZIP file containing the router configs. All interfaces including a routing protocol has been pre-configured allowing you to focus on a specific routing scenario or feature instead of the initial lab setup.
</div>

</td></tr>
<tr><td>

<div class="info" align="left">

<div class="infotitle">Requirements:</div>
 - Current version support router nodes with point-to-point connections.<br>
 - Use default hostnames (R1, R5, R10 ..). If you need a custom naming scheme apply it afterwards.
<br><br>
A total of <?php include_once("counter.txt");?> lab configurations has been generated automatically freeing networking engineers of <?php $cntfile = file_get_contents("counter.txt");$cntint = (int)$cntfile;$minSaved = ((($cntint * 5)*0.95)-rand(1,$cntint));echo round($minSaved);?> minutes of lab time.
<br><br>
</div>
<br>
<div align="center">

</div>

</td></tr></table>

</body>
</html>

