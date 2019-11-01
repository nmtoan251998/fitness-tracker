import { changeStatusHeart } from './changeStatusHeart';
import axios from 'axios';
import HandleResponse from './utils/HandleServerResponse';

 
function sendSMS (){
    try {      
        axios({
            method: 'post',
            url: '/api/data/warning/sms'
        }); 
        console.log ('sent sms');
    } catch (error) {
            if (error.response.data.msg) {
                HandleResponse('.sms-response', error.response.data.msg, error.response.status);    
            } else {
                const errorsData = error.response.data.map(data => data.msg);
                HandleResponse('.sms-response', errorsData, error.response.status);
            }       
    };  
};




const dps = []; // dataPoints
const chart = new CanvasJS.Chart("ChartContainer", {
    maintainAspectRatio: false,
    title :{
        text: "Heart Beat"
    },
    axisY: {
        includeZero: false
    },      
    data: [{
        type: "line",
        dataPoints: dps,
        xValueType: "dateTime"
    }]
});

let xVal = 0;
let yVal = 0; 
let dataLength = 10; // number of dataPoints visible at any point

// flag check send sms and email
let flag = false;



export const updateChart = function (data) {
    const fat_gramms        =   document.getElementById("fat_gramms");
    const meters            =   document.getElementById("meters");
    const steps             =   document.getElementById("steps");
    const callories         =   document.getElementById("callories");
    const heart_rate        =   document.getElementById("heart_rate");
    const status            =   document.getElementById("status");
    const statusTime        =   document.getElementById("status-time");

    heart_rate.value    =   data.heart_rate;
    steps.value         =   data.steps;
    callories.value     =   data.callories;
    meters.value        =   data.meters;
    fat_gramms.value    =   data.fat_gramms; 
    status.value        =   data.battery_status;
    statusTime.value    =   data.battery_level; 
    
    const check = changeStatusHeart(data.heart_rate);
    
    let i =0; 
    
    if (check == 0 && flag === false) {
        console.log (check);
        //call function send sms
     //   sendSMS();
        i= i++;
        console.log('send sms ' + i);
        flag = true;
    }

    if (check == 1 ) {
        console.log (check);
        console.log ('stop send sms');
        flag = false;
    }

    xVal = data.time;
    yVal = data.heart_rate;
        
    dps.push({
        x: xVal,
        y: yVal
    }); 

    if (dps.length > dataLength) {
        dps.shift();
    }

    chart.render();
};


