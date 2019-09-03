
const   heart_rate_box   =    document.getElementById('heart_rate_box');
const   heart_rate       =    document.getElementById('heart_rate');

export function changeStatusHeart(rate){
	
    if (rate > 100) {
         heart_rate_box.style.backgroundColor = '#ffb3b3';
         heart_rate.style.backgroundColor = '#ffb3b3';
         }
     else {
         heart_rate_box.style.backgroundColor = 'white';
         heart_rate.style.backgroundColor = 'white';
     }
};
