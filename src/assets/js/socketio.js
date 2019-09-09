import io from 'socket.io-client';
// XML Http Request instance
import axios from 'axios';

const socket = io();

socket.on('connect', () => {
    console.log('Communication on socket: '+socket.id);
});

socket.on('result', (result) => {
    console.log(result);
});

/**
 * Get connected MAC addresses
 */
document.querySelector("#get-mac").addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        // loading...
        let loading = setInterval(() => {
            console.log('Loading...');
        }, 500);

        const connectedAddresses = await axios({
            method: 'get',
            url: '/data/mac'
        });

        // clear loading...
        clearInterval(loading);
        console.log('Get result, stop loading...');

        console.log(connectedAddresses.data.addresses);
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
            url: '/data/start-python',
            params: {
                add: document.querySelector('#mac-add').value
            }
        });        
        
        // clear loading...
        clearInterval(loading);
        console.log('Get result, stop loading...');
        
        if (startPythonResult.status === 200) {
            const startSocketDataResult = await axios({
                method: 'get',
                url: '/data/socket',
                params: {
                    socketID: socket.id
                }
            })
            
            if (startSocketDataResult.status === 200) {
                console.log('Emit an event to send data to socket');
            }
        } else {
            console.log('no data to fetch');
        }
    } catch (error) {
        console.log(error.response.data);
    }    
});