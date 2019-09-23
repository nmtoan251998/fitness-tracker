//Lấy danh sách địa chỉ Mac đã kết nối

$(document).ready(function(){
  	$("#get-mac").click(function(){
		$('#list_mac').empty();
  		const listMac = ['a', 'b', 'c'];
  		listMac.forEach(item => {
  			const output = '<a href="/data/start-python?add = item"/>';
  			$('#list_mac').append(output);
  		});
  	});
});