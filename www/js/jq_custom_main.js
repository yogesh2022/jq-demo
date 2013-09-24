$(document).on('pagebeforeshow', '#home', function(){
	// once the dom is loaded fire the custom JS code from here
	getJSONDatafromFile();
});

// Get JSON File from Local Folder or call data from external link
function getJSONDatafromFile(){
	var urlJSON = "sampleJSONData/rss_data.json";
	$.ajax({
		url : urlJSON,
		type : "GET",
		dataType : "json",
		success : function(data) {
			//alert(data);
			var resultData = data;
			buildRSSLayout(resultData);
		},
		error : function(data) {
			alert('A network error prevented this operation, try again later');
		}
	});
}

function buildRSSLayout(dataJson){
	var data = dataJson;
	if(!data || data==undefined || data=='' || data==null){
		$('#rssData').html('<p>A network error prevented this operation, try again later.</p>');
	}else{
		var newPages = '';
		var htmldata = '<ul id="mylist" data-role="listview">';
		for(var key in data){
			htmldata += '<li><a href="#page_'+key+'" data-transition="slide"><img src="'+data[key].imgThumbPath+'"/><h2>'+data[key].rssTitle+'</h2><p>'+data[key].rssDescriptionShort+'</p></a></li>';
			
			newPages = "<div data-role='page' id='page_"+key+"'>" + // Creating a new page
					"<div data-role=header>" + // add header to the page
					"<a data-iconpos='left' data-icon='back' href='#' data-role='button' data-rel='back'>Back</a><h1>Dynamic Page</h1>" + // add back button
					"</div>" +
					"<div data-role=content>" +
					"<h2>"+data[key].rssTitle+"</h2>" +
					"<img src="+data[key].imgThumbPath+" />"+
					"<p>"+data[key].rssDescriptionFull+"</p>" +
					"</div>" + // content of the page
					"<div id='footer_page_home' data-role='footer' data-position='fixed'><h5>copyright 2013  GSPANN</h5></div>" + // footer 
					"</div>"; // page end
			
			var newPage = $(newPages);
			newPage.appendTo($.mobile.pageContainer);
		}
		htmldata += '</ul>';
		$('#rssData').html(htmldata);
	}
	$('#mylist').listview().listview('refresh');
}