/*
import axios from 'axios';

$(document).ready(async function(){
		
		try {      
			const getInfor = await axios({
				method: 'get',
				url: '/api/ble/'
			});

			console.log(getInfor);
			
			$('#device-serial').empty();
			$('#device-add').empty();
			const serial 	= document.getElementById('device-serial');
			const add 		= document.getElementById('device-add');
			serial.value 	= getInfor.serial;
			add.value 		= getInfor.macAdd;
		} catch (error) {
			// handle error response
			console.log(error.response.data);
		}		
}); */