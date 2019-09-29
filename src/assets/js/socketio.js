import io from 'socket.io-client';
// XML Http Request instance
import axios from 'axios';

import { updateChart } from './rederData';

const socket = io();

socket.on('connect', () => {
    socket.on('result', (result) => {
        console.log(result);
        updateChart(result);
    });

    socket.on('exit-process', (msg) => {
        socket.close();        
    });
});

/**
 * Get connected MAC addresses
 */
document.querySelector("#get-mac").addEventListener("click", async (event) => {    
    event.preventDefault();
    
    $("#btn_connect").click(function(){
        $("#spinner").addClass("spinner-border spinner-border-sm");
        $('#btn_connect').prop('disabled', true);
    });

    try {      
        // loading...
        let loading = setInterval(() => {
            console.log('Loading...');
        }, 500);

        const connectedAddresses = await axios({
            method: 'get',
            url: '/ble/mac'
        });

        // clear loading...
        clearInterval(loading);
        console.log('Get result, stop loading...');
        console.log(connectedAddresses.data.addresses);

        $("#spinner").removeClass("spinner-border spinner-border-sm");
        $('#btn_connect').prop('disabled', false);
        
    } catch (error) {
        console.log(error);
    }    
});

/**
 * Start python script to read data from BLE device
 * and emit event to a socket listener to handle
 * data received from python
 */
document.querySelector("#render-data").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {  
        // loading...
        let loading = setInterval(() => {
            console.log('Loading...');
        }, 500);
        
        const startPythonResult = await axios({
            method: 'get',
            url: '/ble/start-python',
            params: {
                add: document.querySelector('#mac-add').value,
                socketID: socket.id
            }
        });

        console.log(startPythonResult);
        
        // clear loading...
        clearInterval(loading);
        console.log('Get result, stop loading...');
    } catch (error) {
        console.log(error.response.data);
    }    
});