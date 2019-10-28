import axios from 'axios';
import HandleResponse from './utils/HandleServerResponse';

const   heart_rate_box   =    document.getElementById('heart_rate_box');
const   heart_rate       =    document.getElementById('heart_rate');

function sendSMS (){
	try {      
		axios({
			method: 'post',
			url: '/api/data/warning/sms'
		});

	} catch (error) {
			if (error.response.data.msg) {
                HandleResponse('.sms-response', error.response.data.msg, error.response.status);    
            } else {
                const errorsData = error.response.data.map(data => data.msg);
                HandleResponse('.sms-response', errorsData, error.response.status);
            }   	
	};	
};


function sendMail (){
	try {      
		axios({
			method: 'post',
			url: '/api/data/warning/mail'
		});
		
	} catch (error) {
			if (error.response.data.msg) {
                HandleResponse('.sms-response', error.response.data.msg, error.response.status);    
            } else {
                const errorsData = error.response.data.map(data => data.msg);
                HandleResponse('.sms-response', errorsData, error.response.status);
            }   	
	};	
};

function statusDanger(){
	heart_rate_box.style.backgroundColor 	= '#ffb3b3';
    heart_rate.style.backgroundColor 		= '#ffb3b3';
};

function statusNormal(){
	heart_rate_box.style.backgroundColor 	= 'white';
    heart_rate.style.backgroundColor		= 'white';
};

//Kiểm tra nhịp tim theo lứa tuổi để cảnh báo
export function changeStatusHeart(rate){

	const oldVal = document.getElementById("old");
	const old = oldVal.value;
	console.log(old);
	if (old != '') {
		if (old >= 18 ) {
			if (rate < 60 || rate > 100) {
				statusDanger();
				sendSMS();
				sendMail()
			}
			else {
				statusNormal();
			}
		};

		if (old >= 7 && old < 18) {
			if (rate < 75 || rate > 110) {
				statusDanger();
				sendSMS();
				sendMail()
			}
			else {
				statusNormal();
			}
		};

		if (old >= 2 && old < 7) {
			if (rate < 75 || rate > 120) {
				statusDanger();
				sendSMS();
				sendMail()
			}
			else {
				statusNormal();
			}
		};

		if (old >= 1 && old < 2) {
			if (rate < 80 || rate > 130) {
				statusDanger();
				sendSMS();
				sendMail()
			}
			else {
				statusNormal();
			}
		};	
	}

	
};
