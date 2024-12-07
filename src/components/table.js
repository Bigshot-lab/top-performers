export const renderTable = (data) => {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = data.map(item => `
        <tr>
            <td><img src="${item.logo}" alt="${item.name}" style="width: 50px; height: 50px;" /></td>
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)} USD</td>
            <td>${item.volume.toLocaleString()}</td>
            <td>${item.marketCap.toLocaleString()} USD</td>
            <td>${item.liquidity.toLocaleString()}</td>
            <td class="${item.priceChange > 0 ? 'positive' : 'negative'}">
                ${item.priceChange > 0 ? '+' : ''}${item.priceChange.toFixed(2)}%
            </td>
        </tr>
    `).join('');
};