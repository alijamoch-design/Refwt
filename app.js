// ====== Firebase Configuration ======
const firebaseConfig = {
    apiKey: "AIzaSyCnnmuZNJxkWTw-GjaP0fz6UpS3NZLF0n8",
    authDomain: "realfinanc-22bfd.firebaseapp.com",
    databaseURL: "https://realfinanc-22bfd-default-rtdb.firebaseio.com",
    projectId: "realfinanc-22bfd",
    storageBucket: "realfinanc-22bfd.firebasestorage.app",
    messagingSenderId: "631107346327",
    appId: "1:631107346327:web:2a5405b81783aee7596ed2"
};

// ====== Initialize Firebase ======
let firebaseApp, db;
try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    console.log("🔥 Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// ====== أيقونات العملات الرسمية من CoinMarketCap ======
const CMC_ICONS = {
    REFI: 'https://s2.coinmarketcap.com/static/img/coins/64x64/9065.png',
    USDT: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    BNB: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    BTC: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    ETH: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    SOL: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    TON: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png',
    XRP: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
    ADA: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
    DOGE: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
    SHIB: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
    PEPE: 'https://s2.coinmarketcap.com/static/img/coins/64x64/24478.png'
};

// ====== Constants ======
const ADMIN_ID = "1653918641";
const DEPOSIT_ADDRESS = "0xbf70420f57342c6Bd4267430D4D3b7E946f09450";
const SWAP_RATE = 500000; // 1 USDT = 500,000 REFI
const REFERRAL_BONUS = 250000; // REFI per referral
const SYNC_INTERVAL = 3600000; // ساعة واحدة (3600000 ملي ثانية)
const REFI_PRICE = 0.000002; // سعر REFI الثابت

// معرفات العملات في CoinGecko
const CRYPTO_IDS = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    BNB: 'binancecoin',
    USDT: 'tether',
    SOL: 'solana',
    TON: 'the-open-network',
    XRP: 'xrp',
    ADA: 'cardano',
    DOGE: 'dogecoin',
    SHIB: 'shiba-inu',
    PEPE: 'pepe'
};

// خطط الستيكينغ
const STAKING_PLANS = [
    { id: '3days', days: 3, return: 40, name: '3 Days', reward: 5 },
    { id: '7days', days: 7, return: 50, name: '7 Days', reward: 20 },
    { id: '15days', days: 15, return: 70, name: '15 Days', reward: 30 },
    { id: '30days', days: 30, return: 100, name: '30 Days', reward: 50 }
];

// مهام الستيكينغ
const STAKING_MISSIONS = [
    { id: '3days', plan: '3 Days', reward: 5, claimed: false },
    { id: '7days', plan: '7 Days', reward: 20, claimed: false },
    { id: '15days', plan: '15 Days', reward: 30, claimed: false },
    { id: '30days', plan: '30 Days', reward: 50, claimed: false }
];

// مهام الإحالة
const REFERRAL_MILESTONES = [
    { referrals: 10, reward: 50, unit: 'USDT', claimed: false },
    { referrals: 25, reward: 120, unit: 'USDT', claimed: false },
    { referrals: 50, reward: 250, unit: 'USDT', claimed: false },
    { referrals: 100, reward: 500, unit: 'USDT', claimed: false },
    { referrals: 250, reward: 1000, unit: 'USDT', claimed: false }
];

// قائمة العملات العشر
const TOP_CRYPTOS = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'XRP', name: 'Ripple' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'TON', name: 'Toncoin' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'PEPE', name: 'Pepe' }
];

// ====== State Management ======
let userData = null;
let selectedStakingPlan = STAKING_PLANS[0];
let swapMode = 'usdt-to-refi';
let livePrices = {};
let lastSyncTime = Date.now();
let unreadNotifications = 0;

// ====== Initialize Telegram Web App ======
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();
tg.enableClosingConfirmation();

// Get user data from Telegram
const userId = tg.initDataUnsafe?.user?.id?.toString() || 'guest_' + Math.random().toString(36).substr(2, 9);
const userName = tg.initDataUnsafe?.user?.first_name || 'REFI User';
document.getElementById('userId').textContent = userName;

// ====== Initialize App ======
document.addEventListener('DOMContentLoaded', () => {
    // شاشة التحميل
    setTimeout(() => {
        document.getElementById('splashScreen').classList.add('hidden');
        document.getElementById('mainContent').style.display = 'block';
        startPriceUpdates();
    }, 2000);
    
    loadUserData();
    renderStakingPlans();
    renderTopCryptos();
    setupScrollListener();
    
    if (isAdmin()) {
        addAdminCrown();
    }
    
    loadNews();
});

// ====== Load User Data ======
async function loadUserData() {
    try {
        // Load from localStorage
        const localData = localStorage.getItem(`user_${userId}`);
        if (localData) {
            userData = JSON.parse(localData);
        } else {
            // Initialize new user
            userData = {
                userId: userId,
                userName: userName,
                balances: {
                    REFI: 0,
                    USDT: 0,
                    BNB: 0,
                    BTC: 0,
                    ETH: 0,
                    SOL: 0,
                    XRP: 0,
                    ADA: 0,
                    DOGE: 0,
                    SHIB: 0,
                    PEPE: 0,
                    TON: 0
                },
                referralCode: generateReferralCode(),
                referredBy: null,
                referrals: [],
                referralCount: 0,
                staking: [],
                stakingMissions: STAKING_MISSIONS.map(m => ({ ...m, claimed: false })),
                referralMilestones: REFERRAL_MILESTONES.map(m => ({ ...m, claimed: false })),
                transactions: [],
                notifications: [],
                totalRefiEarned: 0,
                totalUsdtEarned: 0,
                lastLogin: new Date().toISOString()
            };
            localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        }
        
        // Load from Firebase
        if (db) {
            const userDoc = await db.collection('users').doc(userId).get();
            if (userDoc.exists) {
                const fbData = userDoc.data();
                userData = { 
                    ...userData, 
                    ...fbData,
                    balances: fbData.balances || userData.balances
                };
                localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
            } else {
                await db.collection('users').doc(userId).set(userData);
            }
            
            // استماع للتغييرات في الوقت الفعلي
            setupRealtimeListeners();
        }
        
        updateUI();
        checkReferral();
        updateNotificationBadge();
    } catch (error) {
        console.error("Error loading user data:", error);
        showToast('Error loading data', 'error');
    }
}

// ====== Setup Realtime Listeners ======
function setupRealtimeListeners() {
    if (!db) return;
    
    // استماع لتغييرات رصيد المستخدم
    db.collection('users').doc(userId).onSnapshot((doc) => {
        if (doc.exists) {
            const fbData = doc.data();
            if (fbData.balances) {
                userData.balances = fbData.balances;
                localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
                updateUI();
            }
        }
    });
    
    // استماع للمعاملات الجديدة
    db.collection('transactions')
        .where('userId', '==', userId)
        .where('status', '==', 'approved')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const tx = change.doc.data();
                    showToast(`Transaction ${tx.type} approved!`, 'success');
                    loadUserData(); // إعادة تحميل البيانات
                }
            });
        });
}

// ====== Generate Referral Code ======
function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase() + userId.substring(0, 4);
}

// ====== Update UI ======
function updateUI() {
    renderAssets();
    updateTotalBalance();
    updateStakingStats();
    updateReferralStats();
    updateSwapBalances();
}

// ====== Render Assets ======
function renderAssets() {
    const assetsList = document.getElementById('assetsList');
    if (!assetsList || !userData) return;
    
    const assets = [
        { symbol: 'REFI', name: 'REFI Network' },
        { symbol: 'USDT', name: 'Tether' },
        { symbol: 'BNB', name: 'BNB' }
    ];
    
    assetsList.innerHTML = assets.map(asset => {
        const balance = userData.balances[asset.symbol] || 0;
        const price = asset.symbol === 'REFI' ? REFI_PRICE : (livePrices[asset.symbol]?.price || 0);
        const value = asset.symbol === 'USDT' ? balance : balance * price;
        const change = livePrices[asset.symbol]?.change || 0;
        const changeClass = change >= 0 ? 'positive' : 'negative';
        const changeSymbol = change >= 0 ? '+' : '';
        
        return `
            <div class="asset-item" onclick="showAssetDetails('${asset.symbol}')">
                <div class="asset-left">
                    <img src="${CMC_ICONS[asset.symbol]}" class="asset-icon-img" alt="${asset.symbol}">
                    <div class="asset-info">
                        <h4>${asset.name}</h4>
                        <p>
                            ${asset.symbol}  
                            <span class="asset-change ${changeClass}">${changeSymbol}${change.toFixed(2)}%</span>
                        </p>
                    </div>
                </div>
                <div class="asset-right">
                    <div class="asset-balance">${formatBalance(balance, asset.symbol)}</div>
                    <div class="asset-value">$${formatNumber(value)}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ====== Render Top Cryptos ======
async function renderTopCryptos() {
    const topCryptoList = document.getElementById('topCryptoList');
    if (!topCryptoList) return;
    
    topCryptoList.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading prices...</div>';
    
    await fetchLivePrices();
    
    topCryptoList.innerHTML = TOP_CRYPTOS.map(crypto => {
        const priceData = livePrices[crypto.symbol] || { price: 0, change: 0 };
        const changeClass = priceData.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = priceData.change >= 0 ? '+' : '';
        
        return `
            <div class="crypto-item" onclick="showCryptoDetails('${crypto.symbol}')">
                <div class="crypto-left">
                    <img src="${CMC_ICONS[crypto.symbol]}" class="crypto-icon-img" alt="${crypto.symbol}">
                    <div class="crypto-info">
                        <h4>${crypto.name}</h4>
                        <p>${crypto.symbol}</p>
                    </div>
                </div>
                <div class="crypto-right">
                    <div class="crypto-price">$${formatNumber(priceData.price)}</div>
                    <div class="crypto-change ${changeClass}">${changeSymbol}${priceData.change.toFixed(2)}%</div>
                </div>
            </div>
        `;
    }).join('');
}

// ====== Render Staking Plans ======
function renderStakingPlans() {
    const plansGrid = document.getElementById('plansGrid');
    if (!plansGrid) return;
    
    plansGrid.innerHTML = STAKING_PLANS.map(plan => `
        <div class="plan-card ${selectedStakingPlan.id === plan.id ? 'selected' : ''}" onclick="selectStakingPlan('${plan.id}')">
            <div class="plan-days">${plan.name}</div>
            <div class="plan-return">+${plan.return}%</div>
            <div class="plan-label">Return</div>
        </div>
    `).join('');
}

// ====== Render Staking Missions ======
function renderStakingMissions() {
    const missionsGrid = document.getElementById('stakingMissions');
    if (!missionsGrid || !userData) return;
    
    missionsGrid.innerHTML = userData.stakingMissions.map(mission => {
        const completed = mission.claimed;
        const hasStaked = userData.staking.some(s => s.plan.id === mission.id);
        const canClaim = hasStaked && !mission.claimed;
        
        return `
            <div class="mission-card">
                <div class="mission-info">
                    <h4>First ${mission.plan} Stake</h4>
                    <p>Complete your first ${mission.plan} staking</p>
                </div>
                <div class="mission-reward">${mission.reward} USDT</div>
                ${canClaim ? 
                    `<button class="claim-btn" onclick="claimStakingMission('${mission.id}')">Claim</button>` :
                    completed ?
                    `<button class="claim-btn completed" disabled>Claimed</button>` :
                    `<button class="claim-btn" disabled>Locked</button>`
                }
            </div>
        `;
    }).join('');
}

// ====== Render Referral Milestones ======
function renderReferralMilestones() {
    const milestonesList = document.getElementById('milestonesList');
    if (!milestonesList || !userData) return;
    
    milestonesList.innerHTML = userData.referralMilestones.map(milestone => {
        const progress = Math.min((userData.referralCount / milestone.referrals) * 100, 100);
        const canClaim = userData.referralCount >= milestone.referrals && !milestone.claimed;
        
        return `
            <div class="milestone-item">
                <div class="milestone-header">
                    <span class="milestone-referrals">${milestone.referrals} Referrals</span>
                    <span class="milestone-reward">${milestone.reward} ${milestone.unit}</span>
                </div>
                <div class="milestone-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">${userData.referralCount}/${milestone.referrals}</span>
                </div>
                ${canClaim ? 
                    `<button class="claim-btn" onclick="claimReferralMilestone(${milestone.referrals})" style="margin-top: 10px; width: 100%;">Claim Reward</button>` : 
                    milestone.claimed ? 
                    '<p style="color: var(--success); text-align: center; margin-top: 10px;">✓ Claimed</p>' : 
                    ''}
            </div>
        `;
    }).join('');
}

// ====== Fetch Live Prices from CoinGecko ======
async function fetchLivePrices() {
    try {
        const ids = Object.values(CRYPTO_IDS).join(',');
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();
        
        // تحويل البيانات
        for (const [symbol, id] of Object.entries(CRYPTO_IDS)) {
            if (data[id]) {
                livePrices[symbol] = {
                    price: data[id].usd,
                    change: data[id].usd_24h_change || 0
                };
            }
        }
        
        // تحديث الواجهة
        renderTopCryptos();
        renderAssets();
        updateTotalBalance();
        
        return livePrices;
    } catch (error) {
        console.error("Error fetching prices:", error);
        return {};
    }
}

// ====== Start Price Updates (كل دقيقة) ======
function startPriceUpdates() {
    fetchLivePrices(); // تحديث فوري
    setInterval(fetchLivePrices, 60000); // كل دقيقة
}

// ====== Format Balance ======
function formatBalance(balance, symbol) {
    if (symbol === 'REFI') {
        return balance.toLocaleString() + ' REFI';
    } else if (symbol === 'USDT') {
        return '$' + balance.toFixed(2);
    } else if (symbol === 'BNB') {
        return balance.toFixed(4) + ' BNB';
    }
    return balance.toString();
}

// ====== Format Number ======
function formatNumber(num) {
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    if (num < 0.0001) return num.toFixed(8);
    if (num < 0.01) return num.toFixed(6);
    return num.toFixed(2);
}

// ====== Update Total Balance ======
function updateTotalBalance() {
    if (!userData) return;
    
    let total = 0;
    total += userData.balances.USDT || 0;
    total += (userData.balances.REFI || 0) * REFI_PRICE;
    total += (userData.balances.BNB || 0) * (livePrices.BNB?.price || 0);
    total += (userData.balances.BTC || 0) * (livePrices.BTC?.price || 0);
    total += (userData.balances.ETH || 0) * (livePrices.ETH?.price || 0);
    
    document.getElementById('totalBalance').textContent = '$' + total.toFixed(2);
}

// ====== Update Staking Stats ======
function updateStakingStats() {
    if (!userData) return;
    
    const totalStaked = userData.staking.reduce((sum, stake) => sum + stake.amount, 0);
    document.getElementById('totalStaked').textContent = totalStaked.toFixed(2) + ' USDT';
    
    // Calculate rewards
    const rewards = userData.staking.reduce((sum, stake) => {
        if (new Date(stake.endDate) < new Date() && !stake.claimed) {
            return sum + (stake.amount * stake.plan.return / 100);
        }
        return sum;
    }, 0);
    
    document.getElementById('rewardsEarned').textContent = rewards.toFixed(2) + ' USDT';
    document.getElementById('stakeBalance').textContent = `Balance: $${userData.balances.USDT?.toFixed(2) || '0.00'} USDT`;
    document.getElementById('activeStakesCount').textContent = userData.staking.length;
    
    // Average return
    if (userData.staking.length > 0) {
        const avgReturn = userData.staking.reduce((sum, stake) => sum + stake.plan.return, 0) / userData.staking.length;
        document.getElementById('avgReturn').textContent = avgReturn.toFixed(0) + '%';
    }
    
    // Render active stakes
    renderActiveStakes();
}

// ====== Render Active Stakes ======
function renderActiveStakes() {
    const activeStakes = document.getElementById('activeStakes');
    if (!activeStakes || !userData) return;
    
    if (userData.staking.length === 0) {
        activeStakes.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No active stakes</p>';
        return;
    }
    
    activeStakes.innerHTML = userData.staking.map(stake => {
        const endDate = new Date(stake.endDate);
        const now = new Date();
        const daysLeft = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
        
        return `
            <div class="stake-item">
                <div class="stake-header">
                    <span class="stake-plan">${stake.plan.name}</span>
                    <span class="stake-amount">${stake.amount} USDT</span>
                </div>
                <div class="stake-details">
                    <span>Return: +${stake.plan.return}%</span>
                    <span>${daysLeft} days left</span>
                </div>
            </div>
        `;
    }).join('');
}

// ====== Update Referral Stats ======
function updateReferralStats() {
    if (!userData) return;
    
    document.getElementById('totalReferrals').textContent = userData.referralCount || 0;
    document.getElementById('refiEarned').textContent = (userData.referralCount * REFERRAL_BONUS).toLocaleString() + ' REFI';
    document.getElementById('usdtEarned').textContent = userData.totalUsdtEarned?.toFixed(2) + ' USDT' || '0.00 USDT';
    
    const baseUrl = window.location.href.split('?')[0];
    document.getElementById('referralLink').value = `${baseUrl}?ref=${userData.referralCode}`;
}

// ====== Update Swap Balances ======
function updateSwapBalances() {
    if (!userData) return;
    
    if (swapMode === 'usdt-to-refi') {
        document.getElementById('payBalance').textContent = `Balance: $${userData.balances.USDT?.toFixed(2) || '0.00'} USDT`;
        document.getElementById('receiveBalance').textContent = `Balance: ${userData.balances.REFI?.toLocaleString() || '0'} REFI`;
    } else {
        document.getElementById('payBalance').textContent = `Balance: ${userData.balances.REFI?.toLocaleString() || '0'} REFI`;
        document.getElementById('receiveBalance').textContent = `Balance: $${userData.balances.USDT?.toFixed(2) || '0.00'} USDT`;
    }
}

// ====== Update Notification Badge ======
function updateNotificationBadge() {
    const badge = document.querySelector('.badge');
    if (badge) {
        unreadNotifications = userData?.notifications?.filter(n => !n.read).length || 0;
        badge.textContent = unreadNotifications;
        if (unreadNotifications === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'block';
        }
    }
}

// ====== Navigation Functions ======
function showWallet() {
    document.getElementById('walletSection').classList.remove('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(1)').classList.add('active');
    
    renderAssets();
    updateTotalBalance();
    animateElement('.balance-card', 'pop');
}

function showSwap() {
    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.remove('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(2)').classList.add('active');
    
    updateSwapBalances();
    calculateSwap();
    animateElement('.swap-card', 'scaleIn');
}

function showStaking() {
    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.remove('hidden');
    document.getElementById('referralSection').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(3)').classList.add('active');
    
    updateStakingStats();
    renderStakingMissions();
    animateElement('.staking-stats', 'slideUp');
}

function showReferral() {
    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(4)').classList.add('active');
    
    updateReferralStats();
    renderReferralMilestones();
    animateElement('.referral-link-card', 'pop');
}

// ====== Animate Element ======
function animateElement(selector, animationClass) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, 500);
    }
}

// ====== Select Staking Plan ======
function selectStakingPlan(planId) {
    selectedStakingPlan = STAKING_PLANS.find(p => p.id === planId);
    renderStakingPlans();
    document.getElementById('lockPeriod').textContent = selectedStakingPlan.name;
    calculateStakingReturn();
    animateElement('.plan-card.selected', 'pop');
}

// ====== Calculate Staking Return ======
function calculateStakingReturn() {
    const amount = parseFloat(document.getElementById('stakeAmount').value) || 0;
    const return_amount = (amount * selectedStakingPlan.return) / 100;
    const total = amount + return_amount;
    
    document.getElementById('estimatedReturn').textContent = return_amount.toFixed(2) + ' USDT';
    document.getElementById('totalAfterStaking').textContent = total.toFixed(2) + ' USDT';
}

// ====== Stake USDT ======
function stakeUSDT() {
    const amount = parseFloat(document.getElementById('stakeAmount').value);
    
    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        animateElement('#stakeAmount', 'shake');
        return;
    }
    
    if (!userData.balances.USDT || userData.balances.USDT < amount) {
        showToast('Insufficient USDT balance', 'error');
        animateElement('#stakeAmount', 'shake');
        return;
    }
    
    // Create stake
    const stake = {
        plan: selectedStakingPlan,
        amount: amount,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + selectedStakingPlan.days * 24 * 60 * 60 * 1000).toISOString(),
        claimed: false
    };
    
    // Deduct USDT and add stake
    userData.balances.USDT -= amount;
    userData.staking.push(stake);
    
    // Save to Firebase (real-time)
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            staking: userData.staking
        });
    }
    
    // Save to localStorage
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    showToast(`Successfully staked ${amount} USDT for ${selectedStakingPlan.days} days!`, 'success');
    document.getElementById('stakeAmount').value = '';
    updateStakingStats();
    renderStakingMissions();
    updateUI();
    animateElement('.confirm-btn', 'pop');
}

// ====== Claim Staking Mission ======
function claimStakingMission(missionId) {
    const mission = userData.stakingMissions.find(m => m.id === missionId);
    
    if (!mission || mission.claimed) return;
    
    // Check if user has completed this staking plan
    const hasStaked = userData.staking.some(s => s.plan.id === missionId);
    
    if (!hasStaked) {
        showToast(`You need to complete a ${mission.plan} stake first!`, 'error');
        return;
    }
    
    // Add reward
    userData.balances.USDT += mission.reward;
    mission.claimed = true;
    
    // Save to Firebase
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            stakingMissions: userData.stakingMissions
        });
    }
    
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    showToast(`Claimed ${mission.reward} USDT!`, 'success');
    renderStakingMissions();
    updateUI();
    animateElement('.mission-card', 'pop');
}

// ====== Claim Referral Milestone ======
function claimReferralMilestone(referrals) {
    const milestone = userData.referralMilestones.find(m => m.referrals === referrals);
    
    if (!milestone || milestone.claimed) return;
    
    if (userData.referralCount < referrals) {
        showToast(`You need ${referrals} referrals to claim this!`, 'error');
        return;
    }
    
    // Add reward
    userData.balances.USDT += milestone.reward;
    userData.totalUsdtEarned += milestone.reward;
    milestone.claimed = true;
    
    // Save to Firebase
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            totalUsdtEarned: userData.totalUsdtEarned,
            referralMilestones: userData.referralMilestones
        });
    }
    
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    showToast(`Claimed ${milestone.reward} USDT!`, 'success');
    updateReferralStats();
    renderReferralMilestones();
    updateUI();
    animateElement('.milestone-item', 'pop');
}

// ====== Toggle Pay Currency ======
function togglePayCurrency() {
    if (swapMode === 'usdt-to-refi') {
        swapMode = 'refi-to-usdt';
        document.getElementById('payCurrency').textContent = 'REFI';
        document.getElementById('receiveCurrency').textContent = 'USDT';
        document.getElementById('payCurrencyIcon').src = CMC_ICONS.REFI;
        document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.USDT;
    } else {
        swapMode = 'usdt-to-refi';
        document.getElementById('payCurrency').textContent = 'USDT';
        document.getElementById('receiveCurrency').textContent = 'REFI';
        document.getElementById('payCurrencyIcon').src = CMC_ICONS.USDT;
        document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.REFI;
    }
    calculateSwap();
    updateSwapBalances();
    animateElement('.currency-selector', 'pop');
}

function toggleReceiveCurrency() {
    togglePayCurrency();
}

// ====== Calculate Swap ======
function calculateSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value) || 0;
    
    if (swapMode === 'usdt-to-refi') {
        const receiveAmount = payAmount * SWAP_RATE;
        document.getElementById('receiveAmount').value = receiveAmount.toFixed(0);
        document.getElementById('swapFee').textContent = 'Free';
    } else {
        const receiveAmount = payAmount / SWAP_RATE;
        document.getElementById('receiveAmount').value = receiveAmount.toFixed(6);
        document.getElementById('swapFee').textContent = '0.00016 BNB';
    }
    
    // Update REFI price
    document.getElementById('refiPrice').textContent = '$' + REFI_PRICE;
}

// ====== Confirm Swap ======
function confirmSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value);
    
    if (!payAmount || payAmount <= 0) {
        showToast('Please enter a valid amount', 'error');
        animateElement('#payAmount', 'shake');
        return;
    }
    
    if (swapMode === 'usdt-to-refi') {
        // USDT to REFI
        if (!userData.balances.USDT || userData.balances.USDT < payAmount) {
            showToast('Insufficient USDT balance', 'error');
            return;
        }
        
        const receiveAmount = payAmount * SWAP_RATE;
        userData.balances.USDT -= payAmount;
        userData.balances.REFI += receiveAmount;
        
        showToast(`Swapped $${payAmount} USDT to ${receiveAmount.toLocaleString()} REFI`, 'success');
    } else {
        // REFI to USDT
        if (!userData.balances.REFI || userData.balances.REFI < payAmount) {
            showToast('Insufficient REFI balance', 'error');
            return;
        }
        
        // Check BNB fee
        if (!userData.balances.BNB || userData.balances.BNB < 0.00016) {
            showToast('You need 0.00016 BNB for swap fee', 'error');
            return;
        }
        
        const receiveAmount = payAmount / SWAP_RATE;
        userData.balances.REFI -= payAmount;
        userData.balances.USDT += receiveAmount;
        userData.balances.BNB -= 0.00016;
        
        showToast(`Swapped ${payAmount.toLocaleString()} REFI to $${receiveAmount.toFixed(2)} USDT`, 'success');
    }
    
    // Save to Firebase
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances
        });
    }
    
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    document.getElementById('payAmount').value = '1';
    calculateSwap();
    updateSwapBalances();
    updateUI();
    animateElement('#swapBtn', 'pop');
}

// ====== P2P Function ======
function showP2P() {
    document.getElementById('p2pModal').classList.add('show');
    animateElement('.p2p-icon', 'pulse');
    
    // Countdown timer
    const countdown = document.getElementById('p2pCountdown');
    if (countdown) {
        countdown.textContent = '7 days';
    }
}

// ====== Copy Referral Link ======
function copyReferralLink() {
    const link = document.getElementById('referralLink');
    link.select();
    navigator.clipboard.writeText(link.value);
    showToast('Referral link copied!', 'success');
    animateElement('.copy-btn', 'pop');
}

// ====== Share Referral ======
function shareReferral() {
    const link = document.getElementById('referralLink').value;
    const text = `🚀 Join REFI Network and get 250,000 REFI bonus! Use my referral link: ${link}`;
    
    if (tg.shareToStory) {
        tg.shareToStory(text);
    } else {
        navigator.clipboard.writeText(text);
        showToast('Referral message copied!', 'success');
    }
}

// ====== Check Referral in URL ======
function checkReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    
    if (ref && ref !== userData.referralCode && !userData.referredBy) {
        // This user was referred
        userData.referredBy = ref;
        
        // Find referrer and give them bonus
        if (db) {
            db.collection('users').where('referralCode', '==', ref).get().then(snapshot => {
                snapshot.forEach(doc => {
                    const referrerData = doc.data();
                    const referrerId = doc.id;
                    
                    // Give referral bonus
                    referrerData.balances.REFI = (referrerData.balances.REFI || 0) + REFERRAL_BONUS;
                    referrerData.referrals = referrerData.referrals || [];
                    referrerData.referrals.push(userId);
                    referrerData.referralCount = (referrerData.referralCount || 0) + 1;
                    referrerData.totalRefiEarned = (referrerData.totalRefiEarned || 0) + REFERRAL_BONUS;
                    
                    db.collection('users').doc(referrerId).update({
                        balances: referrerData.balances,
                        referrals: referrerData.referrals,
                        referralCount: referrerData.referralCount,
                        totalRefiEarned: referrerData.totalRefiEarned
                    });
                    
                    // Notify referrer
                    addNotification(referrerId, `Someone joined with your link! You got 250,000 REFI!`);
                });
            });
        }
        
        // Give welcome bonus to new user
        userData.balances.REFI = (userData.balances.REFI || 0) + 10000;
        showToast('Welcome! You got 10,000 REFI bonus!', 'success');
        
        saveUserData();
    }
}

// ====== Add Notification ======
async function addNotification(userId, message) {
    if (!db) return;
    
    const notification = {
        message: message,
        read: false,
        timestamp: new Date().toISOString()
    };
    
    await db.collection('users').doc(userId).update({
        notifications: firebase.firestore.FieldValue.arrayUnion(notification)
    });
}

// ====== Modal Functions ======
function showDepositModal() {
    document.getElementById('depositModal').classList.add('show');
    updateDepositIcon();
    animateElement('.modal-content', 'slideUpModal');
}

function showWithdrawModal() {
    document.getElementById('withdrawModal').classList.add('show');
    checkWithdrawFee();
    updateWithdrawIcon();
    animateElement('.modal-content', 'slideUpModal');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function updateDepositIcon() {
    const currency = document.getElementById('depositCurrency').value;
    const icon = document.getElementById('depositIcon');
    icon.src = CMC_ICONS[currency];
}

function updateWithdrawIcon() {
    const currency = document.getElementById('withdrawCurrency').value;
    const icon = document.getElementById('withdrawIcon');
    icon.src = CMC_ICONS[currency];
}

function copyAddress() {
    navigator.clipboard.writeText(DEPOSIT_ADDRESS);
    showToast('Address copied to clipboard!', 'success');
    animateElement('.copy-btn-small', 'pop');
}

function updateDepositMin() {
    const currency = document.getElementById('depositCurrency').value;
    const amountInput = document.getElementById('depositAmount');
    updateDepositIcon();
    
    if (currency === 'REFI') {
        amountInput.placeholder = 'Min 500,000 REFI';
    } else if (currency === 'USDT') {
        amountInput.placeholder = 'Min 10 USDT';
    } else if (currency === 'BNB') {
        amountInput.placeholder = 'Min 0.02 BNB';
    }
}

function checkWithdrawFee() {
    const currency = document.getElementById('withdrawCurrency').value;
    const feeWarning = document.getElementById('feeWarning');
    const networkFee = document.getElementById('networkFee');
    const receiveAmount = document.getElementById('receiveAmount_');
    const amount = parseFloat(document.getElementById('withdrawAmount').value) || 0;
    
    updateWithdrawIcon();
    
    if (currency === 'USDT') {
        feeWarning.classList.remove('hidden');
        networkFee.textContent = '0.00016 BNB';
        receiveAmount.textContent = (amount - 0).toFixed(2) + ' USDT';
    } else {
        feeWarning.classList.add('hidden');
        networkFee.textContent = '0 BNB';
        receiveAmount.textContent = amount.toFixed(6) + ' ' + currency;
    }
}

// ====== Submit Deposit ======
async function submitDeposit() {
    const currency = document.getElementById('depositCurrency').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const txnId = document.getElementById('txnId').value;
    
    // Validation
    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }
    
    if (!txnId) {
        showToast('Please enter transaction ID', 'error');
        return;
    }
    
    // Check minimum
    let minAmount;
    switch(currency) {
        case 'REFI': minAmount = 500000; break;
        case 'USDT': minAmount = 10; break;
        case 'BNB': minAmount = 0.02; break;
    }
    
    if (amount < minAmount) {
        showToast(`Minimum deposit is ${minAmount} ${currency}`, 'error');
        return;
    }
    
    // Create deposit request
    const depositRequest = {
        userId: userId,
        currency: currency,
        amount: amount,
        txnId: txnId,
        status: 'pending',
        timestamp: new Date().toISOString(),
        type: 'deposit'
    };
    
    try {
        if (db) {
            await db.collection('transactions').add(depositRequest);
            
            // Notify admin
            await db.collection('notifications').add({
                userId: ADMIN_ID,
                message: `New deposit request: ${amount} ${currency} from ${userId}`,
                type: 'admin',
                read: false,
                timestamp: new Date().toISOString()
            });
        }
        
        userData.transactions.push(depositRequest);
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        
        showToast('Deposit request submitted! Waiting for admin approval.', 'success');
        closeModal('depositModal');
        
        // Clear form
        document.getElementById('depositAmount').value = '';
        document.getElementById('txnId').value = '';
    } catch (error) {
        console.error("Deposit error:", error);
        showToast('Failed to submit deposit request', 'error');
    }
}

// ====== Submit Withdraw ======
async function submitWithdraw() {
    const currency = document.getElementById('withdrawCurrency').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('walletAddress').value;
    
    if (!amount || amount <= 0 || !address) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    // Check balance
    if (!userData.balances[currency] || userData.balances[currency] < amount) {
        showToast(`Insufficient ${currency} balance`, 'error');
        return;
    }
    
    // Check BNB fee for USDT withdrawal
    if (currency === 'USDT') {
        if (!userData.balances.BNB || userData.balances.BNB < 0.00016) {
            showToast('You need 0.00016 BNB for withdrawal fee', 'error');
            return;
        }
    }
    
    // Create withdrawal request
    const withdrawRequest = {
        userId: userId,
        currency: currency,
        amount: amount,
        address: address,
        status: 'pending',
        timestamp: new Date().toISOString(),
        type: 'withdraw'
    };
    
    try {
        if (db) {
            await db.collection('transactions').add(withdrawRequest);
            
            // Notify admin
            await db.collection('notifications').add({
                userId: ADMIN_ID,
                message: `New withdrawal request: ${amount} ${currency} from ${userId}`,
                type: 'admin',
                read: false,
                timestamp: new Date().toISOString()
            });
        }
        
        showToast('Withdrawal request submitted! Waiting for admin approval.', 'success');
        closeModal('withdrawModal');
        
        // Clear form
        document.getElementById('withdrawAmount').value = '';
        document.getElementById('walletAddress').value = '';
    } catch (error) {
        console.error("Withdraw error:", error);
        showToast('Failed to submit withdrawal request', 'error');
    }
}

// ====== Save User Data ======
function saveUserData() {
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    if (db) {
        db.collection('users').doc(userId).set(userData, { merge: true })
            .catch(error => console.error("Error saving to Firebase:", error));
    }
}

// ====== Show Toast ======
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    
    // Change icon based on type
    const icon = toast.querySelector('i');
    if (type === 'success') {
        icon.className = 'fa-regular fa-circle-check';
    } else if (type === 'error') {
        icon.className = 'fa-regular fa-circle-xmark';
    } else {
        icon.className = 'fa-regular fa-circle-info';
    }
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ====== Load News ======
async function loadNews() {
    const newsTicker = document.getElementById('newsTicker');
    if (!newsTicker) return;
    
    const news = [
        "🔥 REFI Network hits 100,000 users!",
        "📈 Bitcoin surges past $50,000",
        "💎 New staking rewards available",
        "🚀 P2P trading coming soon",
        "🎁 Referral bonuses increased"
    ];
    
    let index = 0;
    setInterval(() => {
        newsTicker.textContent = news[index];
        index = (index + 1) % news.length;
    }, 5000);
}

// ====== Setup Scroll Listener ======
function setupScrollListener() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    const container = document.querySelector('.app-container');
    
    container.addEventListener('scroll', () => {
        if (container.scrollTop > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

function scrollToTop() {
    document.querySelector('.app-container').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ====== History ======
function showHistory() {
    showToast('Transaction history coming soon!', 'info');
}

// ====== Show All Assets ======
function showAllAssets() {
    showToast('All assets view coming soon!', 'info');
}

// ====== Notifications ======
function showNotifications() {
    if (unreadNotifications === 0) {
        showToast('No new notifications', 'info');
    } else {
        showToast(`You have ${unreadNotifications} unread notifications`, 'info');
        // Mark as read
        if (userData.notifications) {
            userData.notifications.forEach(n => n.read = true);
            unreadNotifications = 0;
            updateNotificationBadge();
            saveUserData();
        }
    }
}

// ====== Settings ======
function showSettings() {
    showToast('Settings coming soon!', 'info');
}

// ====== Asset Details ======
function showAssetDetails(symbol) {
    const balance = userData.balances[symbol] || 0;
    const price = symbol === 'REFI' ? REFI_PRICE : (livePrices[symbol]?.price || 0);
    const value = symbol === 'USDT' ? balance : balance * price;
    
    showToast(`${symbol}: ${formatBalance(balance, symbol)} ($${formatNumber(value)})`, 'info');
}

// ====== Crypto Details ======
function showCryptoDetails(symbol) {
    const price = livePrices[symbol]?.price || 0;
    const change = livePrices[symbol]?.change || 0;
    const changeSymbol = change >= 0 ? '+' : '';
    
    showToast(`${symbol}: $${formatNumber(price)} (${changeSymbol}${change.toFixed(2)}%)`, 'info');
}

// ====== Staking Details ======
function showStakingDetails(type) {
    const modal = document.getElementById('stakingDetailsModal');
    const body = document.getElementById('stakingDetailsBody');
    
    if (type === 'total') {
        body.innerHTML = `
            <h4>Total Staked</h4>
            <p style="font-size: 24px; color: var(--pink-1); margin: 20px 0;">${document.getElementById('totalStaked').textContent}</p>
            <p>Your staked amount earns rewards based on the plan you choose.</p>
        `;
    } else if (type === 'rewards') {
        body.innerHTML = `
            <h4>Rewards Earned</h4>
            <p style="font-size: 24px; color: var(--pink-1); margin: 20px 0;">${document.getElementById('rewardsEarned').textContent}</p>
            <p>Rewards are calculated daily and can be claimed after the staking period ends.</p>
        `;
    } else if (type === 'avg') {
        body.innerHTML = `
            <h4>Average Return</h4>
            <p style="font-size: 24px; color: var(--pink-1); margin: 20px 0;">${document.getElementById('avgReturn').textContent}</p>
            <p>Your average return across all active stakes.</p>
        `;
    }
    
    modal.classList.add('show');
}

// ====== Admin Functions ======
function isAdmin() {
    return userId === ADMIN_ID;
}

function addAdminCrown() {
    setTimeout(() => {
        const header = document.querySelector('.header-actions');
        if (header) {
            const adminBtn = document.createElement('button');
            adminBtn.className = 'icon-btn';
            adminBtn.innerHTML = '<i class="fa-solid fa-crown" style="color: gold;"></i>';
            adminBtn.onclick = showAdminPanel;
            header.appendChild(adminBtn);
        }
    }, 1000);
}

function showAdminPanel() {
    if (!isAdmin()) {
        showToast('Access denied', 'error');
        return;
    }
    
    if (db) {
        db.collection('transactions').where('status', '==', 'pending').get()
            .then(snapshot => {
                const pending = [];
                snapshot.forEach(doc => pending.push({ id: doc.id, ...doc.data() }));
                
                let message = '📋 PENDING TRANSACTIONS:\n\n';
                if (pending.length === 0) {
                    message += 'No pending transactions';
                } else {
                    pending.forEach(tx => {
                        message += `${tx.type.toUpperCase()}: ${tx.amount} ${tx.currency}\n`;
                        message += `User: ${tx.userId}\n`;
                        message += `ID: ${tx.txnId || tx.address}\n`;
                        message += `Date: ${new Date(tx.timestamp).toLocaleString()}\n`;
                        message += '──────────────────\n';
                    });
                }
                
                tg.showPopup({
                    title: '👑 Admin Panel',
                    message: message,
                    buttons: [
                        { type: 'default', text: 'Refresh' },
                        { type: 'cancel', text: 'Close' }
                    ]
                }, (btnId) => {
                    if (btnId === 'ok') {
                        showAdminPanel();
                    }
                });
            });
    }
}
