import axios from 'axios';

$(document).ready(async function(){
		
		try {      
			const crawnews = await axios({
				method: 'get',
				url: '/api/news/craw'
			});

			console.log(crawnews);

			$('#list_news').empty();
			crawnews.forEach(item => {
				const output = 	' <div class="card" style="width:400px"> ' +
    								' <img class="card-img-top" src=' + item.src + 'alt='+item.alt + 'style="width:100%">' +
    								' <div class="card-body">'
      									' <h4 class="card-title">' + item.title + '</h4>' +
      									' <a href=' + item.href + ' class="btn btn-primary">Xem bài viết</a>' +
    								' </div>' +
  								' </div>'
				$('#list_news').append(output);
			});
		} catch (error) {
			// handle error response
			console.log(error.response.data);
		}		
}); 	