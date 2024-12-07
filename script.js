const tableBody = document.getElementById("table-body");
const filterDropdown = document.getElementById("filter");

// Fetch data from CoinGecko
async function fetchTokenData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1");
    return response.json();
}

// Render table rows dynamically
function renderTable(data) {
    tableBody.innerHTML = "";

    data.forEach(token => {
        const row = document.createElement("tr");

        const growthClass = parseFloat(token.price_change_percentage_24h) >= 0 ? "price-up" : "price-down";
        const growthIcon = growthClass === "price-up" ? "fas fa-arrow-up" : "fas fa-arrow-down";

        row.innerHTML = `
            <td>${token.type}</td>
            <td><img src="${token.image}" alt="Logo" class="logo"></td>
            <td>${token.name}</td>
            <td>${token.current_price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
            <td class="${growthClass}">
                ${token.price_change_percentage_24h.toFixed(2)}%
                <i class="${growthIcon} price-arrow"></i>
            </td>
            <td>${token.total_volume.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
            <td>${token.market_cap.toLocaleString("en-US", { style: "currency", currency: "USD" })}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Filter tokens based on type
function filterTable(type) {
    fetchTokenData().then(data => {
        const filteredData = type === "all" ? data : data.filter(token => token.type === type);
        renderTable(filteredData);
    });
}

// Fetch and render table data initially
fetchTokenData().then(data => {
    renderTable(data);
});

// Add event listener for filtering
filterDropdown.addEventListener("change", () => {
    const filterType = filterDropdown.value;
    filterTable(filterType);
});