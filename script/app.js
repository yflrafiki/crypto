//  // Application State
//         let currentUser = null;
//         let userPortfolio = {
//             balance: 10000.00,
//             holdings: {},
//             totalInvested: 0,
//             transactions: []
//         };

//         let currentTradeType = 'buy';
//         let selectedCrypto = null;

//         // Cryptocurrency data with simulated prices
//         const cryptocurrencies = {
//             'BTC': {
//                 name: 'Bitcoin',
//                 symbol: 'BTC',
//                 price: 45250.00,
//                 change24h: 2.45,
//                 color: '#f7931a',
//                 icon: '₿'
//             },
//             'ETH': {
//                 name: 'Ethereum',
//                 symbol: 'ETH',
//                 price: 3150.00,
//                 change24h: -1.23,
//                 color: '#627eea',
//                 icon: 'Ξ'
//             },
//             'ADA': {
//                 name: 'Cardano',
//                 symbol: 'ADA',
//                 price: 1.25,
//                 change24h: 4.67,
//                 color: '#0033ad',
//                 icon: '₳'
//             },
//             'DOT': {
//                 name: 'Polkadot',
//                 symbol: 'DOT',
//                 price: 22.50,
//                 change24h: -3.12,
//                 color: '#e6007a',
//                 icon: '●'
//             },
//             'LINK': {
//                 name: 'Chainlink',
//                 symbol: 'LINK',
//                 price: 28.75,
//                 change24h: 5.89,
//                 color: '#375bd2',
//                 icon: '⬢'
//             },
//             'SOL': {
//                 name: 'Solana',
//                 symbol: 'SOL',
//                 price: 145.30,
//                 change24h: 7.23,
//                 color: '#14f195',
//                 icon: '◎'
//             }
//         };

//         // Authentication Functions
//         function showRegister() {
//             document.getElementById('loginForm').style.display = 'none';
//             document.getElementById('registerForm').style.display = 'block';
//         }

//         function showLogin() {
//             document.getElementById('registerForm').style.display = 'none';
//             document.getElementById('loginForm').style.display = 'block';
//         }

//         function register() {
//             const name = document.getElementById('regName').value;
//             const email = document.getElementById('regEmail').value;
//             const password = document.getElementById('regPassword').value;

//             if (!name || !email || !password) {
//                 alert('Please fill in all fields');
//                 return;
//             }

//             // Simulate registration
//             currentUser = { name, email };
//             showMainApp();
//         }

//         function login() {
//             const email = document.getElementById('loginEmail').value;
//             const password = document.getElementById('loginPassword').value;

//             if (!email || !password) {
//                 alert('Please fill in all fields');
//                 return;
//             }

//             // Simulate login
//             currentUser = { name: 'Demo User', email };
//             showMainApp();
//         }

//         function logout() {
//             currentUser = null;
//             document.getElementById('authScreen').style.display = 'flex';
//             document.getElementById('mainApp').style.display = 'none';
//         }

//         function showMainApp() {
//             document.getElementById('authScreen').style.display = 'none';
//             document.getElementById('mainApp').style.display = 'block';
//             initializeApp();
//         }

//         // App Initialization
//         function initializeApp() {
//             updatePortfolioDisplay();
//             renderCryptoList();
//             createPortfolioChart();
//             simulatePriceUpdates();
//         }

//         // Navigation
//         function showSection(sectionName) {
//             // Hide all sections
//             document.querySelectorAll('.section').forEach(section => {
//                 section.style.display = 'none';
//             });
            
//             // Show selected section
//             document.getElementById(sectionName).style.display = 'block';
            
//             // Update nav links
//             document.querySelectorAll('.nav-link').forEach(link => {
//                 link.classList.remove('active');
//             });
//             event.target.classList.add('active');

//             // Update content based on section
//             if (sectionName === 'portfolio') {
//                 updatePortfolioHoldings();
//             } else if (sectionName === 'markets' || sectionName === 'trade') {
//                 renderAllMarkets(sectionName);
//             }
//         }

//         // Portfolio Management
//         function updatePortfolioDisplay() {
//             document.getElementById('userBalance').textContent = userPortfolio.balance.toFixed(2);
//             document.getElementById('availableBalance').textContent = userPortfolio.balance.toFixed(2);
//             document.getElementById('totalInvested').textContent = userPortfolio.totalInvested.toFixed(2);
            
//             const totalValue = userPortfolio.balance + calculateHoldingsValue();
//             document.getElementById('portfolioValue').textContent = totalValue.toFixed(2);
            
//             const holdingsCount = Object.keys(userPortfolio.holdings).length;
//             document.getElementById('holdingsCount').textContent = ${holdingsCount} asset${holdingsCount !== 1 ? 's' : ''};
            
//             updatePortfolioChange();
//         }

//         function calculateHoldingsValue() {
//             let totalValue = 0;
//             for (const [symbol, holding] of Object.entries(userPortfolio.holdings)) {
//                 if (cryptocurrencies[symbol]) {
//                     totalValue += holding.quantity * cryptocurrencies[symbol].price;
//                 }
//             }
//             return totalValue;
//         }

//         function updatePortfolioChange() {
//             const totalValue = userPortfolio.balance + calculateHoldingsValue();
//             const initialValue = 10000; // Starting balance
//             const change = totalValue - initialValue;
//             const changePercent = (change / initialValue) * 100;
            
//             const changeElement = document.getElementById('portfolioChange');
//             const dayChangeElement = document.getElementById('dayChange');
            
//             const changeText = ${change >= 0 ? '+' : ''}$${change.toFixed(2)} (${changePercent.toFixed(2)}%);
//             changeElement.textContent = changeText;
//             changeElement.className = change >= 0 ? 'positive' : 'negative';
            
//             dayChangeElement.textContent = ${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%;
//             dayChangeElement.className = changePercent >= 0 ? 'positive' : 'negative';
//         }

//         function updatePortfolioHoldings() {
//             const grid = document.getElementById('holdingsGrid');
            
//             if (Object.keys(userPortfolio.holdings).length === 0) {
//                 grid.innerHTML = 
//                     <p style="text-align: center; color: rgba(255,255,255,0.6); padding: 2rem;">
//                         No holdings yet. Start by buying some cryptocurrency!
//                     </p>
//                 ;
//                 return;
//             }
            
//             grid.innerHTML = '';
            
//             for (const [symbol, holding] of Object.entries(userPortfolio.holdings)) {
//                 const crypto = cryptocurrencies[symbol];
//                 if (!crypto) continue;
                
//                 const currentValue = holding.quantity * crypto.price;
//                 const profitLoss = currentValue - holding.totalCost;
//                 const profitLossPercent = (profitLoss / holding.totalCost) * 100;
                
//                 const holdingElement = document.createElement('div');
//                 holdingElement.className = 'holding-item';
//                 holdingElement.innerHTML = 
//                     <div class="crypto-info">
//                         <div class="crypto-icon" style="background: ${crypto.color}">
//                             ${crypto.icon}
//                         </div>
//                         <div class="crypto-details">
//                             <h3>${crypto.name}</h3>
//                             <div class="crypto-symbol">${holding.quantity.toFixed(8)} ${symbol}</div>
//                         </div>
//                     </div>
//                     <div class="crypto-price">
//                         <div class="price">$${currentValue.toFixed(2)}</div>
//                         <div class="change ${profitLoss >= 0 ? 'positive' : 'negative'}">
//                             ${profitLoss >= 0 ? '+' : ''}$${profitLoss.toFixed(2)} (${profitLossPercent.toFixed(2)}%)
//                         </div>
//                     </div>
//                 ;
                
//                 grid.appendChild(holdingElement);
//             }
//         }

//         // Crypto List Rendering
//         function renderCryptoList() {
//             const container = document.getElementById('cryptoList');
//             renderCryptoItems(container, Object.entries(cryptocurrencies).slice(0, 4), true);
//         }

//         function renderAllMarkets(section) {
//             const containerId = section === 'markets' ? 'allMarkets' : 'tradeMarkets';
//             const container = document.getElementById(containerId);
//             renderCryptoItems(container, Object.entries(cryptocurrencies), section === 'trade');
//         }

//         function renderCryptoItems(container, cryptoEntries, clickable = false) {
//             container.innerHTML = '';
            
//             cryptoEntries.forEach(([symbol, crypto]) => {
//                 const item = document.createElement('div');
//                 item.className = 'crypto-item';
//                 if (clickable) {
//                     item.style.cursor = 'pointer';
//                     item.onclick = () => openTradeModal(symbol);
//                 }
                
//                 item.innerHTML = 
//                     <div class="crypto-info">
//                         <div class="crypto-icon" style="background: ${crypto.color}">
//                             ${crypto.icon}
//                         </div>
//                         <div class="crypto-details">
//                             <h3>${crypto.name}</h3>
//                             <div class="crypto-symbol">${symbol}</div>
//                         </div>
//                     </div>
//                     <div class="crypto-price">
//                         <div class="price">${crypto.price.toLocaleString()}</div>
//                         <div class="change ${crypto.change24h >= 0 ? 'positive' : 'negative'}">
//                             ${crypto.change24h >= 0 ? '+' : ''}${crypto.change24h.toFixed(2)}%
//                         </div>
//                     </div>
//                 ;
                
//                 container.appendChild(item);
//             });
//         }

//         // Trading Functions
//         function openTradeModal(symbol) {
//             selectedCrypto = symbol;
//             const crypto = cryptocurrencies[symbol];
            
//             document.getElementById('tradeModalTitle').textContent = Trade ${crypto.name};
//             document.getElementById('tradePricePerCoin').textContent = ${crypto.price.toLocaleString()};
//             document.getElementById('tradeModal').style.display = 'block';
            
//             // Reset form
//             document.getElementById('tradeAmount').value = '';
//             setTradeType('buy');
//             updateTradeSummary();
//         }

//         function closeTradeModal() {
//             document.getElementById('tradeModal').style.display = 'none';
//             selectedCrypto = null;
//         }

//         function setTradeType(type) {
//             currentTradeType = type;
            
//             document.getElementById('buyBtn').classList.remove('active');
//             document.getElementById('sellBtn').classList.remove('active');
//             document.getElementById(${type}Btn).classList.add('active');
            
//             document.getElementById('executeTradeBtn').textContent = type === 'buy' ? 'Buy Now' : 'Sell Now';
            
//             updateTradeSummary();
//         }

//         function setQuickAmount(amount) {
//             const input = document.getElementById('tradeAmount');
            
//             if (amount === 'max') {
//                 if (currentTradeType === 'buy') {
//                     input.value = userPortfolio.balance.toFixed(2);
//                 } else {
//                     const holding = userPortfolio.holdings[selectedCrypto];
//                     if (holding) {
//                         const maxValue = holding.quantity * cryptocurrencies[selectedCrypto].price;
//                         input.value = maxValue.toFixed(2);
//                     }
//                 }
//             } else {
//                 input.value = amount;
//             }
            
//             updateTradeSummary();
//         }

//         function updateTradeSummary() {
//             const amount = parseFloat(document.getElementById('tradeAmount').value) || 0;
            
//             if (selectedCrypto && amount > 0) {
//                 const crypto = cryptocurrencies[selectedCrypto];
//                 const quantity = amount / crypto.price;
                
//                 document.getElementById('tradeQuantity').textContent = quantity.toFixed(8);
//                 document.getElementById('tradeTotal').textContent = ${amount.toFixed(2)};
//             } else {
//                 document.getElementById('tradeQuantity').textContent = '0.00000000';
//                 document.getElementById('tradeTotal').textContent = '$0.00';
//             }
//         }

//         function executeTrade() {
//             const amount = parseFloat(document.getElementById('tradeAmount').value);
            
//             if (!selectedCrypto || !amount || amount <= 0) {
//                 alert('Please enter a valid amount');
//                 return;
//             }

//             const crypto = cryptocurrencies[selectedCrypto];
//             const quantity = amount / crypto.price;

//             if (currentTradeType === 'buy') {
//                 if (amount > userPortfolio.balance) {
//                     alert('Insufficient balance');
//                     return;
//                 }

//                 // Execute buy order
//                 userPortfolio.balance -= amount;
//                 userPortfolio.totalInvested += amount;

//                 if (!userPortfolio.holdings[selectedCrypto]) {
//                     userPortfolio.holdings[selectedCrypto] = {
//                         quantity: 0,
//                         totalCost: 0,
//                         avgPrice: 0
//                     };
//                 }

//                 const holding = userPortfolio.holdings[selectedCrypto];
//                 const newTotalCost = holding.totalCost + amount;
//                 const newQuantity = holding.quantity + quantity;

//                 holding.quantity = newQuantity;
//                 holding.totalCost = newTotalCost;
//                 holding.avgPrice = newTotalCost / newQuantity;

//                 // Add transaction
//                 userPortfolio.transactions.push({
//                     type: 'buy',
//                     symbol: selectedCrypto,
//                     quantity: quantity,
//                     price: crypto.price,
//                     amount: amount,
//                     timestamp: new Date()
//                 });

//                 alert(Successfully bought ${quantity.toFixed(8)} ${selectedCrypto} for ${amount.toFixed(2)});

//             } else {
//                 // Execute sell order
//                 const holding = userPortfolio.holdings[selectedCrypto];
                
//                 if (!holding || quantity > holding.quantity) {
//                     alert('Insufficient holdings');
//                     return;
//                 }

//                 userPortfolio.balance += amount;
                
//                 holding.quantity -= quantity;
//                 const costBasis = (quantity / (holding.quantity + quantity)) * holding.totalCost;
//                 holding.totalCost -= costBasis;
//                 userPortfolio.totalInvested -= costBasis;

//                 if (holding.quantity <= 0) {
//                     delete userPortfolio.holdings[selectedCrypto];
//                 }

//                 // Add transaction
//                 userPortfolio.transactions.push({
//                     type: 'sell',
//                     symbol: selectedCrypto,
//                     quantity: quantity,
//                     price: crypto.price,
//                     amount: amount,
//                     timestamp: new Date()
//                 });

//                 alert(Successfully sold ${quantity.toFixed(8)} ${selectedCrypto} for ${amount.toFixed(2)});
//             }

//             updatePortfolioDisplay();
//             closeTradeModal();
//         }

//         // Chart Creation
//         function createPortfolioChart() {
//             const ctx = document.getElementById('portfolioChart').getContext('2d');
            
//             // Generate sample portfolio data for the last 30 days
//             const dates = [];
//             const values = [];
//             const baseValue = 10000;
            
//             for (let i = 29; i >= 0; i--) {
//                 const date = new Date();
//                 date.setDate(date.getDate() - i);
//                 dates.push(date.toLocaleDateString());
                
//                 // Simulate portfolio growth with some volatility
//                 const randomChange = (Math.random() - 0.5) * 200;
//                 const trendChange = i < 15 ? (15 - i) * 10 : 0; // Upward trend in recent days
//                 values.push(baseValue + randomChange + trendChange);
//             }

//             new Chart(ctx, {
//                 type: 'line',
//                 data: {
//                     labels: dates,
//                     datasets: [{
//                         label: 'Portfolio Value',
//                         data: values,
//                         borderColor: '#00d4ff',
//                         backgroundColor: 'rgba(0, 212, 255, 0.1)',
//                         borderWidth: 3,
//                         fill: true,
//                         tension: 0.4,
//                         pointRadius: 0,
//                         pointHoverRadius: 6,
//                         pointHoverBackgroundColor: '#00d4ff',
//                         pointHoverBorderColor: '#ffffff',
//                         pointHoverBorderWidth: 2
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     maintainAspectRatio: false,
//                     interaction: {
//                         intersect: false,
//                         mode: 'index'
//                     },
//                     plugins: {
//                         legend: {
//                             display: false
//                         },
//                         tooltip: {
//                             backgroundColor: 'rgba(15, 15, 35, 0.9)',
//                             titleColor: '#ffffff',
//                             bodyColor: '#ffffff',
//                             borderColor: '#00d4ff',
//                             borderWidth: 1,
//                             cornerRadius: 8,
//                             displayColors: false,
//                             callbacks: {
//                                 label: function(context) {
//                                     return ${context.parsed.y.toFixed(2)};
//                                 }
//                             }
//                         }
//                     },
//                     scales: {
//                         x: {
//                             display: false
//                         },
//                         y: {
//                             display: false
//                         }
//                     },
//                     elements: {
//                         point: {
//                             radius: 0
//                         }
//                     }
//                 }
//             });
//         }

//         // Price Simulation
//         function simulatePriceUpdates() {
//             setInterval(() => {
//                 // Update crypto prices with realistic volatility
//                 for (const [symbol, crypto] of Object.entries(cryptocurrencies)) {
//                     const volatility = 0.02; // 2% max change per update
//                     const change = (Math.random() - 0.5) * volatility;
//                     const newPrice = crypto.price * (1 + change);
                    
//                     crypto.price = Math.max(newPrice, crypto.price * 0.8); // Prevent crashes below 20%
//                     crypto.change24h += change * 100; // Update 24h change
                    
//                     // Keep 24h change realistic
//                     crypto.change24h = Math.max(-15, Math.min(15, crypto.change24h));
//                 }
                
//                 // Update displays
//                 updatePortfolioDisplay();
                
//                 // Update crypto lists if visible
//                 const currentSection = document.querySelector('.section:not([style*="display: none"])');
//                 if (currentSection) {
//                     const sectionId = currentSection.id;
//                     if (sectionId === 'dashboard') {
//                         renderCryptoList();
//                     } else if (sectionId === 'markets' || sectionId === 'trade') {
//                         renderAllMarkets(sectionId);
//                     } else if (sectionId === 'portfolio') {
//                         updatePortfolioHoldings();
//                     }
//                 }
                
//                 // Update trade modal if open
//                 if (selectedCrypto && document.getElementById('tradeModal').style.display === 'block') {
//                     const crypto = cryptocurrencies[selectedCrypto];
//                     document.getElementById('tradePricePerCoin').textContent = ${crypto.price.toLocaleString()};
//                     updateTradeSummary();
//                 }
                
//             }, 3000); // Update every 3 seconds
//         }

//         // Event Listeners
//         document.getElementById('tradeAmount').addEventListener('input', updateTradeSummary);

//         // Close modal when clicking outside
//         document.getElementById('tradeModal').addEventListener('click', function(e) {
//             if (e.target === this) {
//                 closeTradeModal();
//             }
//         });

//         // Handle Enter key in trade amount input
//         document.getElementById('tradeAmount').addEventListener('keypress', function(e) {
//             if (e.key === 'Enter') {
//                 executeTrade();
//             }
//         });

//         // Initialize app on page load
//         window.addEventListener('load', function() {
//             // Demo mode - auto login for demonstration
//             setTimeout(() => {
//                 if (!currentUser) {
//                     document.getElementById('loginEmail').value = 'demo@cryptovault.com';
//                     document.getElementById('loginPassword').value = 'demo123';
//                 }
//             }, 1000);
//         });

//         // Add some sample data for demonstration
//         function loadDemoData() {
//             // Add some sample holdings for demo purposes
//             userPortfolio.holdings = {
//                 'BTC': {
//                     quantity: 0.1,
//                     totalCost: 4000,
//                     avgPrice: 40000
//                 },
//                 'ETH': {
//                     quantity: 2.5,
//                     totalCost: 7000,
//                     avgPrice: 2800
//                 }
//             };
//             userPortfolio.balance = 5000;
//             userPortfolio.totalInvested = 11000;
//             updatePortfolioDisplay();
//         }

//         // Uncomment the line below to load demo portfolio data
//         // loadDemoData();