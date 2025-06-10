// DOM Elements
const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const walletInfo = document.getElementById("walletInfo");
const walletAddress = document.getElementById("walletAddress");

// Web Wallet URL
const WEB_WALLET_URL = "https://devnet-wallet.multiversx.com";

// Connect wallet function
function connectWallet() {
    // Redirect to MultiversX web wallet
    const callbackUrl = encodeURIComponent(window.location.href);
    window.location.href = `${WEB_WALLET_URL}/unlock?callbackUrl=${callbackUrl}`;
}

// Disconnect wallet function
function disconnectWallet() {
    // Clear any stored wallet data
    localStorage.removeItem("walletAddress");
    resetUI();
}

// Update UI with wallet info
function updateUI(address) {
    walletAddress.textContent = address;
    walletInfo.style.display = "block";
    connectBtn.style.display = "none";
}

// Reset UI to initial state
function resetUI() {
    walletAddress.textContent = "";
    walletInfo.style.display = "none";
    connectBtn.style.display = "block";
}

// Check for wallet address in URL or localStorage
function checkWalletConnection() {
    const urlParams = new URLSearchParams(window.location.search);
    const address = urlParams.get("address");
    
    if (address) {
        // Store the address
        localStorage.setItem("walletAddress", address);
        // Remove the address from URL
        window.history.replaceState({}, document.title, window.location.pathname);
        updateUI(address);
    } else {
        // Check localStorage
        const storedAddress = localStorage.getItem("walletAddress");
        if (storedAddress) {
            updateUI(storedAddress);
        }
    }
}

// Event Listeners
connectBtn.addEventListener("click", connectWallet);
disconnectBtn.addEventListener("click", disconnectWallet);

// Add click handlers for cards
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        if (!walletAddress.textContent) {
            alert("Please connect your wallet first!");
            return;
        }
        // Add your card click logic here
        console.log(`Card ${card.id} clicked`);
    });
});

// Check for wallet connection on page load
checkWalletConnection(); 