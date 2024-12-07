// Sample data (replace with real API calls)
const tokenData = [
    {
        type: "Token",
        logo: "https://via.placeholder.com/40",
        name: "Bitcoin",
        price: "$37,000",
        growth: "+5%",
        growthClass: "price-up",
        volume: "$20,000,000",
        marketCap: "$700,000,000"
    },
    {
        type: "Meme Coin",
        logo: "https://via.placeholder.com/40",
        name: "DogeCoin",
        price: "$0.064",
        growth: "-2%",
        growthClass: "price-down",
        volume: "$1,000,000",
        marketCap: "$10,000,000"
    },
    {
        type: "Token",
        logo: "https://via.placeholder.com/40",
        name: "Ethereum",
        price: "$2,400",
        growth: "+3%",
        growthClass: "price-up",
        volume: "$15,000,000",
        marketCap: "$300,000,000"
    },
    {
        type: "Meme Coin",
        logo: "https://via.placeholder.com/40",
        name: "Shiba Inu",
        price: "$0.00001",
        growth: "+8%",
        growthClass: "price-up",
        volume: "$2,000,000",
        marketCap: "$50,000,000"
    },
];

// Dynamically populate table rows
const tableBody = document.getElementById("table-body");

tokenData.forEach(token => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${token.type}</td>
        <td><img src="${token.logo}" alt="Logo" class="logo"></td>
        <td>${token.name}</td>
        <td>${token.price}</td>
        <td class="${token.growthClass}">${token.growth}</td>
        <td>${token.volume}</td>
        <td>${token.marketCap}</td>
    `;

    tableBody.appendChild(row);
});