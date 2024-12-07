const tableBody = document.getElementById("table-body");
const searchInput = document.getElementById("search");
const marketCapFilter = document.getElementById("market-cap");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const paginationContainer = document.getElementById("pagination-container");

let allData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 10;

// Fetch data from CoinGecko
async function fetchTokenData(page = 1) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}`);
    const data = await response.json();
    allData = [...allData, ...data];
    renderTable(allData);
}

// Render table rows dynamically
function renderTable(data) {
    tableBody.innerHTML = "";

    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).forEach(token => {
        const growthClass = parseFloat(token.price_change_percentage_24h) >= 0 ? "price-up" : "price-down";
        const growthIcon = growthClass === "price-up" ? "fas fa-arrow-up" : "fas fa-arrow-down";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${token.type || "Token"}</td>
            <td><img src="${token.image}" alt="Logo" class="logo"></td>
            <td>${token.name} (${token.symbol.toUpperCase()})</td>
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

    updatePagination(data.length);
}

// Filter data based on search and other filters
function filterData() {
    let filtered = allData;

    // Filter by search term
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(token => token.name.toLowerCase().includes(searchTerm) || token.symbol.toLowerCase().includes(searchTerm));
    }

    // Filter by market cap
    const marketCap = marketCapFilter.value;
    if (marketCap !== "all") {
        filtered = filtered.filter(token => {
            const cap = token.market_cap;
            return (
                (marketCap === "large" && cap > 10_000_000_000) ||
                (marketCap === "mid" && cap <= 10_000_000_000 && cap >= 1_000_000_000) ||
                (marketCap === "small" && cap < 1_000_000_000)
            );
        });
    }

    // Filter by price range
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Number.MAX_SAFE_INTEGER;
    filtered = filtered.filter(token => token.current_price >= minPrice && token.current_price <= maxPrice);

    filteredData = filtered;
    renderTable(filteredData);
}

// Update pagination controls
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add(i === currentPage ? "active" : "");
        button.addEventListener("click", () => {
            currentPage = i;
            renderTable(filteredData.length ? filteredData : allData);
        });
        paginationContainer.appendChild(button);
    }
}

// Event listeners
searchInput.addEventListener("input", filterData);
marketCapFilter.addEventListener("change", filterData);
minPriceInput.addEventListener("input", filterData);
maxPriceInput.addEventListener("input", filterData);

// Fetch initial data
fetchTokenData();