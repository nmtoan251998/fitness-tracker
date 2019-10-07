import axios from 'axios';

$(document).ready(async function(){
		
	try {      

		const crawnews = await axios({
			method: 'get',
			url: '/api/news'
		});

		$('#list_news').empty();
	//	console.log(crawnews.data);
		crawnews.data.forEach(item => {
			console.log(item);
			const output = 	'<div class="media"> <img src=' + item.src + 'alt=' +item.alt + 'class="align-self-start mr-8" style="width:400px"> <div class="media-body"> <h4>'+item.title+'</h4><a href=' + item.href + ' class="btn btn-primary">Xem bài viết</a></div></div><br>'

			$('#list_news').append(output); 
		});
	} catch (error) {
		// handle error response
		//console.log(error.response.data);
	}		
}); 	