const socket = io();

const search = document.querySelector("form [type=search]");

socket.on('connect', function() {
    search.disabled = false;
});

socket.on('result', function(result) {
    console.log(result);
})

document.querySelector("form").addEventListener("submit", function(event){
    fetch("/test/home?socketID=" + encodeURIComponent(socket.id) + "&q=" + encodeURIComponent(search.value));
    event.preventDefault();
});