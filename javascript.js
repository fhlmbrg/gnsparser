// Based on the File Uploader at http://www.inserthtml.com/2012/08/file-uploader/

$(document).ready(function() {
	
	// Makes sure the dataTransfer information is sent when we
	// Drop the item in the drop box.
	jQuery.event.props.push('dataTransfer');
	
	var z = -40;
	// The number of images to display
	var maxFiles = 1;
	var errMessage = 0;
	
	// Get all of the data URIs and put them in an array
	var dataArray = [];
	
	// Bind the drop event to the dropzone.
	$('#drop-files').bind('drop', function(e) {
			
		// Stop the default action, which is to redirect the page
		// To the dropped file		
		var files = e.dataTransfer.files;
		
		// Show the upload holder
		$('#uploaded-holder').show();
		
		// For each file
		$.each(files, function(index, file) {
			
			$('#drop-files').html('Uploading..');
			
			// Some error messaging
			if (!files[index].name.match(/\.(net)$/i)) {

				$('#drop-files').html('ERROR');
				setTimeout(restartFiles, 3000);
				return false;
			}
			
			
			// Start a new instance of FileReader
			var fileReader = new FileReader();
				
				// When the filereader loads initiate a function
				fileReader.onload = (function(file) {
					
					return function(e) { 
						
						// Push the data URI into an array
						dataArray.push({name : file.name, value : this.result});

                $("#loading").hide();
                var totalPercent = 100 / dataArray.length;
                var x = 0;
                var y = 0;

                $('#loading-content').html('Uploading '+dataArray[0].name);

                $.each(dataArray, function(index, file) {

			$('#drop-files').html('Analyzing topology..');

                        $.post('upload.php', dataArray[index], function(data) {

                                var fileName = dataArray[index].name;
                                ++x;

                                // Change the bar to represent how much has loaded
                                $('#loading-bar .loading-color').css({'width' : totalPercent*(x)+'%'});

                                if(totalPercent*(x) == 100) {
                                        // Show the upload is complete
                                        $('#loading-content').html('Uploading Complete!');

                                        // Reset everything when the loading is completed
                                        setTimeout(restartFiles, 3000);

                                } else if(totalPercent*(x) < 100) {

                                        // Show that the files are uploading
                                        $('#loading-content').html('Uploading '+fileName);

                                }

                                // Show a message showing the file URL.
                                var dataSplit = data.split(':');
                                if(dataSplit[2] == 'uploaded successfully') {

				if(dataSplit[3] == 'success') {

					$('#drop-files').html('Have fun!<iframe width="1" height="1" frameborder="0" src="counter.php?success=1"></iframe><iframe width="1" height="1" frameborder="0" src="files/'+dataSplit[0]+'/lab.zip"></iframe>');
//					setTimeout(restartFiles, 5000);
setTimeout(function(){
$('#drop-files').html('Drop your .net file here');
}, 5000);

				} else {

					$('#drop-files').html('Failed.<br>ID: '+dataSplit[0]+'<br><a href="javascript:location.reload(true);">Reload</a><iframe width="1" height="1" frameborder="0" src="files/'+dataSplit[0]+'/lab.zip"></iframe>');
					setTimeout(restartFiles, 10000);

				}
                                        // Add things to local storage 
                                        if(window.localStorage.length == 0) {
                                                y = 0;
                                        } else {
                                                y = window.localStorage.length;
                                        }


                                } else {
					return false;
                                }
			});
                });

                return false;
					}; 
					
				})(files[index]);
				
			// For data URI purposes
			fileReader.readAsDataURL(file);
	
		});
		

	});
	
	function restartFiles() {
	
//		$('#drop-files').html('Drop your .net file here');		
		
		// And finally, empty the array/set z to -40
		dataArray.length = 0;
		z = -40;
		
		return false;
	}

	// Just some styling for the drop file container.
	$('#drop-files').bind('dragenter', function() {
		$(this).css({'box-shadow' : 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', 'border' : '2px dashed #000000'});
		return false;
	});
	
	$('#drop-files').bind('drop', function() {
		$(this).css({'box-shadow' : 'none', 'border' : '2px dashed rgba(0,0,0,0.1)'});
		return false;
	});
	
	$('#dropped-files #upload-button .delete').click(restartFiles);
	
	// Append the localstorage the the uploaded files section
	$('#uploaded-files').hide();
});
