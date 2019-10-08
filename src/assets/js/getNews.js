import axios from 'axios';

$(document).ready(async function(){
		
	try {      

		const crawnews = await axios({
			method: 'get',
			url: '/api/news'
		});

		$('#list_news').empty();
		console.log(crawnews);
		crawnews.data.forEach(item => {
	//		console.log(item);
			const output = 	'<div class="col-lg-6 col-md-6 col-sm-6"><img src=' + item.src + 'alt=' +item.alt + ' style="width:400px"></div> <div class="col-lg-6 col-md-6 col-sm-6"> <h4>'+item.title+'</h4><a href=' + item.href + ' class="btn btn-primary">Xem bài viết</a></div><br>';
			$('#list_news').append(output); 
		});

		$('#error').empty();
		if (crawnews.status != 200) {
			const text = '<div class="alert alert-secondary"><h1><strong>' + crawnews.status + '</strong><span>  ' + crawnews.statusText + '</span></h1></div>';
			$('#error').append(text);
		}
	} catch (error) {
		// handle error response
		//console.log(error.response.data);
	}		
}); 	