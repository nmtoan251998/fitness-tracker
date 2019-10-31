import HandleResponse from './utils/HandleServerResponse';
import axios from 'axios';

$(document).ready(async function(){
		
		try {      
	/*		const getInfor = await axios({
				method: 'get',
				url: '/api/ble/device/:mac'
			});

	//		console.log(getInfor);
			if (getInfor.status === 200) {
				$('#device-serial').empty();
				$('#device-add').empty();
				const serial 	= document.getElementById('device-serial');
				const add 		= document.getElementById('device-add');
				serial.value 	= getInfor.data.serial;
				add.value 		= getInfor.data.macAdd;

			}

			if (getInfor.status === 404) {
				HandleResponse('.infor-response', getInfor.data.msg, getInfor.status);
			}
			
*/
		} catch (error) {
			// handle error response
			console.log(error.response.data);
			if (error.response.data.msg) {
				HandleResponse('.infor-response', error.response.data.msg, error.response.status);
			} else {
				const errorsData = error.response.data.map(data => data.msg);
				HandleResponse('.infor-response', errorsData, error.response.status);
			}
		}		
}); 