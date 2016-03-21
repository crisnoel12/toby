/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
	$(document).foundation();

	if(window.location.pathname === '/toby/pictures/'){
		for(var i = 0; i<pictures.length; i++){
			$('#picture-gallery').append("<a class='column medium-3' href=" + pictures[i] + "><img class='galleryImg' src=" + pictures[i] + "></img></a>");
		}
		$("#picture-gallery").lightGallery();
	}

	if(window.location.pathname === '/toby/videos/'){
		for(var i = 0; i<videos.length; i++){
			$('#video-gallery').append("<a href=" + videos[i][0] + "><div class='column medium-4'><img class='galleryVideo' src="+ videos[i][1] +" /><p>"+ videos[i][2] +"</p></div></a>");
		}
		$("#video-gallery").lightGallery();
	}

});
