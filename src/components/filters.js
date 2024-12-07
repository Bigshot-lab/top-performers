export const setupFilters = (data) => {
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');

    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const filteredData = data.filter(item => item.category === selectedCategory || selectedCategory === 'all');
        renderTable(filteredData);
    });

    dateFilter.addEventListener('change', () => {
        const [startDate, endDate] = dateFilter.value.split(' - ');
        const filteredData = data.filter(item => {
            const date = new Date(item.date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });
        renderTable(filteredData);
    });
};