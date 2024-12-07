import Chart from 'chart.js';

export const renderChart = (data) => {
    const ctx = document.getElementById('chart').getContext('2d');
    const labels = data.map(item => item.name);
    const prices = data.map(item => item.price);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Token Prices',
                data: prices,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true },
            },
        },
    });
};