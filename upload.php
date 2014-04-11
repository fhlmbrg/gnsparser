<?php

if(!@$_POST['value']) die();

//include("upload.php");
// We're putting all our files in a directory called images.
$uploaddir = 'files/';

// The posted data, for reference
$file = $_POST['value'];
$name = $_POST['name'];

// Get the mime
$getMime = explode('.', $name);
$mime = end($getMime);

// Separate out the data
$data = explode(',', $file);

// Encode it correctly
$encodedData = str_replace(' ','+',$data[1]);
$decodedData = base64_decode($encodedData);

// You can use the name given, or create a random name.
// We will create a random name!

//$randomName = substr_replace(sha1(microtime(true)), '', 12).'.'.$mime;
$randomName = substr_replace(sha1(microtime(true)), '', 12);
$randomNameZip = $randomName.".zip";
$randomNameDir = $randomName."/";
$workDir = $uploaddir.$randomNameDir;

exec("mkdir -p ".$uploaddir.$randomNameDir);
exec("mkdir -p ".$uploaddir.$randomNameDir."configs");

sleep(1);

if(file_put_contents($uploaddir.$randomNameDir.$name, $decodedData)) {

	$in = file_get_contents($uploaddir.$randomNameDir.$name);
//	$fileout = $workDir.$cont_hostname."R1.cfg";
	include("parser.php");

	exec("zip -j -r ".$uploaddir.$randomNameDir."lab.zip ".$uploaddir.$randomNameDir."configs/*");

	if(file_get_contents($uploaddir.$randomNameDir."lab.zip")) {
		echo $randomName.":lab.zip:uploaded successfully:success";
	} else {
		echo $randomName.":lab.zip:uploaded successfully";
	}
}
else {
	// Show an error message should something go wrong.
	echo "Something went wrong. Check that the file isn't corrupted";
}


?>
