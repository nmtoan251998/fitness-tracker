//Lấy danh sách địa chỉ Mac đã kết nối

$(document).ready(function(){
  	$("#get-mac").click(function(){
		$('#list_mac').empty();
  		const listMac = ['a', 'b', 'c'];
  		listMac.forEach(item => {
  			const output = '<li>'+ item + '</li>';
  			$('#list_mac').append(output);
  		});
  	});
});