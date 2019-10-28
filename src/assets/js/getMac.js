// XML Http Request instance
import axios from 'axios';
import HandleResponse from './utils/HandleServerResponse';

export const renderConnectedMacAddresses = () => {
	$("#get-mac").click(async function () {
		event.preventDefault();

		try {
			const connectedAddresses = await axios({
				method: 'get',
				url: '/api/ble/mac'
			});
			// remove duplicate elements from array
			if (connectedAddresses.status === 200) {
				const macAddresses = [...new Set([...connectedAddresses.data.addresses])];
				$('#list_mac').empty();
				macAddresses.forEach(item => {
					const output = '<li><a class="mac_add" href="/data/start-python?add=' + item + '">' + item + '</a></li>';
					$('#list_mac').append(output);
				});				

				$(".mac_add").on('click', async (event) => {
					event.preventDefault();

					// leave this to me
					const macAddPattern = /(([a-zA-Z0-9]{2}:){5})([a-zA-Z0-9]{2})/;
					const macAdd = event.target.textContent.match(macAddPattern)[0].trim();

					// const startPythonResult = await axios({
					// 	method: 'get',
					// 	url: '/api/ble/start-python',
					// 	params: {
					// 		add: macAdd,
					// 		socketID: socketId
					// 	}
					// });
				});
			}


		} catch (error) {
			if (error.response.data.msg) {
				HandleResponse('.mac-response', error.response.data.msg, error.response.status);
			} else {
				const errorsData = error.response.data.map(data => data.msg);
				HandleResponse('.mac-response', errorsData, error.response.status);
			}
		}
	});
}