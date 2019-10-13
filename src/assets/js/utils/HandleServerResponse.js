/**
 * Handle response and add response message to UI
 * @param selector - class or id of html element to display messages
 * @param responseData - response data from server
 * @param stausCode - response status code
 */
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
        output += `<li style="list-style-type: none">${responseData}</li>`;
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