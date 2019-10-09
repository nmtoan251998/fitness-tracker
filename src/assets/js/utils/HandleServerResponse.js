
export default (selector, responseData, statusCode) => {    
    const messageContainer = document.querySelector(selector);    

    messageContainer.innerHTML = '';
    messageContainer.style.display = 'block';
    if (messageContainer.classList.contains('alert-danger')) {
        messageContainer.classList.remove('alert-danger');
    }
    if (messageContainer.classList.contains('alert-success')) {
        messageContainer.classList.remove('alert-success');
    }

    let output = '';

    if (typeof responseData === 'string') {
        output += `<li>${responseData}</li>`;
    } else {
        responseData.forEach(msg => {
            output += `<li>${msg}</li>`;        
        }); 
    }       

    messageContainer.innerHTML = output;
    if (statusCode >= 200 && statusCode <= 299) {            
        messageContainer.classList.add('alert-success');
    } else if (statusCode >= 400) {            
        messageContainer.classList.add('alert-danger');
        
    } 
}