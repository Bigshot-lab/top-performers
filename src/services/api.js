export const fetchData = async () => {
    const response = await fetch(`${process.env.API_BASE_URL}/coins/markets`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
};

export const subscribeToWebSocket = (data) => {
    const socket = new WebSocket(process.env.SOCKET_URL);
    socket.onmessage = (event) => {
        const updates = JSON.parse(event.data);
        updates.forEach(update => {
            const coin = data.find(item => item.id === update.s);
            if (coin) {
                coin.price = update.c;
                coin.priceChange = update.P;
                renderTable(data);
            }
        });
    };
};