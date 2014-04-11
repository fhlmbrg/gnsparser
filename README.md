The network lab config generator.

## How it works:
Copy the files to a webserver and open up http://<hostname>/index.php

Build your Dynagen/GNS3 topology then drag and drop your .net file on to the field on the webpage. The topology is run through a series of scripts and in return you will receive a ZIP file containing the router configs. All interfaces including a routing protocol has been pre-configured allowing you to focus on a specific routing scenario or feature instead of the initial lab setup.

## Requirements:
* Write access to the folder named "files".
* Current version support router nodes with point-to-point connections.
* Use default hostnames (R1, R5, R10 ..). If you need a custom naming scheme apply it afterwards.

![GNSparser](http://bildr.no/thumb/TFkxOTYy.jpeg)