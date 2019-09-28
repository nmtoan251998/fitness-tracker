//Lấy danh sách địa chỉ Mac đã kết nối
$(document).ready(function(){
  	$("#get-mac").click(function(){
  		listMac=['30:52:CB:86:B6:B0','CE:36:72:D8:4F:64', '9C:5C:F9:19:A5:DB','EC:79:71:75:7E:8F']
		$('#list_mac').empty();
  		listMac.forEach(item => {
  			const output = '<li><a href="/data/start-python?add='+ item +'">'+item+'</a></li>';
  			$('#list_mac').append(output);
  		});
  		$("li a").prop('disabled', true);
  	});
});