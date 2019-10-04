// XML Http Request instance
import axios from 'axios';

$(document).ready(function(){
	/**
	 * Get connected MAC addresses
	 */
	$("#get-mac").click(async function(){
		event.preventDefault();
		
		try {      
			const connectedAddresses = await axios({
				method: 'get',
				url: '/api/ble/mac'
			});

			// remove duplicate elements from array
			const macAddresses = [...new Set([...connectedAddresses.data.addresses])];
			$('#list_mac').empty();
			macAddresses.forEach(item => {
				const output = '<li><a class="mac_add" href="/data/start-python?add='+ item +'">'+item+'</a></li>';
				$('#list_mac').append(output);
			});

			$(".mac_add").on('click', (event) => {
				event.preventDefault();
				
				// leave this to me
				const macAddPattern =  /(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2})/;
				const macAdd = event.target.textContent.match(macAddPattern)[0].trim();
			});
			
		} catch (error) {
			// handle error response
			console.log(error.response.data);
		}		
	}); 	
});