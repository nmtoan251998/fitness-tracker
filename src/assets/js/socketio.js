import io from 'socket.io-client';
// XML Http Request instance
import axios from 'axios';

import { updateChart } from './renderData';

const socket = io();

socket.on('connect', () => {
    socket.on('result', (result) => {
        updateChart(result);
    });

    socket.on('exit-process', (msg) => {
        socket.close();        
    });
});

/**
 * Start python script to read data from BLE device
 * and emit event to a socket listener to handle
 * data received from python
 */
$("#render-data").on("submit", async (event) => {
    event.preventDefault();
    try {
        $("#spinner").addClass("spinner-border spinner-border-sm");
        $('#mac-add').attr('disabled', true);
        $('#btn_connect').prop('disabled', true);        
        
        const startPythonResult = await axios({
            method: 'get',
            url: '/api/ble/start-python',
            params: {
                add: document.querySelector('#mac-add').value,
                socketID: socket.id
            }
        });        

        // handle successful response
        console.log(startPythonResult);

        $("#spinner").removeClass("spinner-border spinner-border-sm");
        $('#btn_connect').prop('disabled', false);
        console.log('Get result, stop loading...');

        setTimeout(() => {
            socket.emit('meomeo', 'meomeo')
        }, 5000)
    } catch (error) {
        // handle error response
        console.log(error.response.data);
    }    
});