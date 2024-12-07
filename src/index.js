import { fetchData, subscribeToWebSocket } from './services/api.js';
import { renderTable } from './components/table.js';
import { renderChart } from './components/chart.js';
import { setupFilters } from './components/filters.js';

document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    renderTable(data);
    renderChart(data);
    setupFilters(data);
    subscribeToWebSocket(data);
});