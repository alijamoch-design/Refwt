// ============================================
// REFI WALLET - PROFESSIONAL VERSION 10.0
// Built on the solid foundation of VIP Mining
// All features: Deposits, Withdrawals, Swaps, Staking, Referrals
// Optimized storage: localStorage for speed, Firebase for financials only
// ============================================

// ============================================
// 1. TELEGRAM WEBAPP INITIALIZATION
// ============================================
let tg = null;
try {
    tg = window.Telegram.WebApp;
    if (tg) {
        tg.ready();
        tg.expand();
        console.log("✅ Telegram WebApp initialized");
    }
} catch (e) {
    console.log("⚠️ Not in Telegram environment");
}

// ============================================
// 2. FIREBASE CONFIGURATION
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyCnnmuZNJxkWTw-GjaP0fz6UpS3NZLF0n8",
    authDomain: "realfinanc-22bfd.firebaseapp.com",
    databaseURL: "https://realfinanc-22bfd-default-rtdb.firebaseio.com",
    projectId: "realfinanc-22bfd",
    storageBucket: "realfinanc-22bfd.firebasestorage.app",
    messagingSenderId: "631107346327",
    appId: "1:631107346327:web:2a5405b81783aee7596ed2"
};

// Initialize Firebase
let firebaseApp, db;
if (typeof firebase !== 'undefined') {
    try {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("✅ Firebase initialized");
    } catch (error) {
        console.error("❌ Firebase error:", error);
    }
}

// ============================================
// 3. CONSTANTS & CONFIGURATION
// ============================================
const ADMIN_ID = "1653918641";
const BOT_LINK = "https://t.me/RealnetworkPaybot/Refi";
const SWAP_RATE = 500000; // 1 USDT = 500,000 REFI
const REFERRAL_BONUS = 250000; // REFI per referral
const REFI_PRICE = 0.000002; // سعر REFI الثابت

// أيقونات العملات
const CMC_ICONS = {
    REFI: 'https://s2.coinmarketcap.com/static/img/coins/128x128/9065.png',
    USDT: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    BNB: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    BTC: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    ETH: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    SOL: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    TON: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png',
    ADA: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
    DOGE: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
    SHIB: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5994.png',
    PEPE: 'https://s2.coinmarketcap.com/static/img/coins/64x64/24478.png',
    TRX: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png',
    TRUMP: 'https://s2.coinmarketcap.com/static/img/coins/64x64/35336.png'
};

// عناوين الإيداع
const DEPOSIT_ADDRESSES = {
    REFI: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    USDT: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    BNB: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    ETH: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    SHIB: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    PEPE: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    SOL: '3DjcSVxfeP3u4WcV9KniMH11btgThnoGxcx54dMtbfuR',
    TRX: 'TMSJH4QunFiUAqZ8iLvQDPajs1v4B3e5E6',
    TRUMP: '3DjcSVxfeP3u4WcV9KniMH11btgThnoGxcx54dMtbfuR'
};

// الحدود الدنيا للإيداع
const DEPOSIT_MINIMUMS = {
    REFI: 500000,
    USDT: 10,
    BNB: 0.02,
    ETH: 0.005,
    SHIB: 2000000,
    PEPE: 3000000,
    SOL: 0.12,
    TRX: 40,
    TRUMP: 5
};

// رسوم السحب
const WITHDRAWAL_FEES = {
    REFI: 0,
    USDT: 0.00016,
    BNB: 0.0005
};

// الحد الأدنى لطول TXID
const MIN_TX_LENGTH = 64;

// معرفات العملات في CoinGecko
const CRYPTO_IDS = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    BNB: 'binancecoin',
    USDT: 'tether',
    SOL: 'solana',
    TON: 'the-open-network',
    ADA: 'cardano',
    DOGE: 'dogecoin',
    SHIB: 'shiba-inu',
    PEPE: 'pepe',
    TRX: 'tron',
    TRUMP: 'official-trump'
};

// خطط الستيكينغ
const STAKING_PLANS = [
    { 
        id: '3days', 
        days: 3, 
        return: 40, 
        name: '3 Days', 
        reward: 5,
        minAmount: 10,
        description: 'Short term stake with quick returns'
    },
    { 
        id: '7days', 
        days: 7, 
        return: 50, 
        name: '7 Days', 
        reward: 20,
        minAmount: 20,
        description: 'Weekly staking with higher rewards'
    },
    { 
        id: '15days', 
        days: 15, 
        return: 70, 
        name: '15 Days', 
        reward: 30,
        minAmount: 50,
        description: 'Bi-weekly stake for serious earners'
    },
    { 
        id: '30days', 
        days: 30, 
        return: 100, 
        name: '30 Days', 
        reward: 50,
        minAmount: 100,
        description: 'Maximum returns for long-term holders'
    }
];

// مهام الستيكينغ
const STAKING_MISSIONS = [
    { id: '3days', plan: '3 Days', reward: 5, icon: 'fa-clock', claimed: false },
    { id: '7days', plan: '7 Days', reward: 20, icon: 'fa-calendar-week', claimed: false },
    { id: '15days', plan: '15 Days', reward: 30, icon: 'fa-calendar-alt', claimed: false },
    { id: '30days', plan: '30 Days', reward: 50, icon: 'fa-calendar-check', claimed: false }
];

// مهام الإحالة
const REFERRAL_MILESTONES = [
    { referrals: 10, reward: 50, unit: 'USDT', icon: 'fa-medal' },
    { referrals: 25, reward: 120, unit: 'USDT', icon: 'fa-medal' },
    { referrals: 50, reward: 250, unit: 'USDT', icon: 'fa-crown' },
    { referrals: 100, reward: 500, unit: 'USDT', icon: 'fa-crown' },
    { referrals: 250, reward: 1000, unit: 'USDT', icon: 'fa-gem' }
];

// قائمة العملات للعرض
const TOP_CRYPTOS = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'TRX', name: 'TRON' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'PEPE', name: 'Pepe' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'TON', name: 'Toncoin' },
    { symbol: 'TRUMP', name: 'Trump Coin' }
];

// العملات المتاحة للسواب
const SWAP_CURRENCIES = [
    { symbol: 'USDT', name: 'Tether', icon: CMC_ICONS.USDT },
    { symbol: 'REFI', name: 'REFI Network', icon: CMC_ICONS.REFI },
    { symbol: 'ETH', name: 'Ethereum', icon: CMC_ICONS.ETH },
    { symbol: 'BNB', name: 'Binance Coin', icon: CMC_ICONS.BNB },
    { symbol: 'SOL', name: 'Solana', icon: CMC_ICONS.SOL },
    { symbol: 'SHIB', name: 'Shiba Inu', icon: CMC_ICONS.SHIB },
    { symbol: 'PEPE', name: 'Pepe', icon: CMC_ICONS.PEPE },
    { symbol: 'TRX', name: 'TRON', icon: CMC_ICONS.TRX },
    { symbol: 'TRUMP', name: 'Trump Coin', icon: CMC_ICONS.TRUMP }
];

// قائمة الأصول
const ALL_ASSETS = [
    { symbol: 'REFI', name: 'REFI Network' },
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'BNB', name: 'BNB' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'PEPE', name: 'Pepe' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'TRX', name: 'TRON' },
    { symbol: 'TRUMP', name: 'Trump Coin' }
];

// ============================================
// 4. STATE MANAGEMENT
// ============================================
let userData = {
    userId: null,
    userName: 'REFI User',
    balances: {
        REFI: 0,
        USDT: 0,
        BNB: 0,
        BTC: 0,
        ETH: 0,
        SOL: 0,
        ADA: 0,
        DOGE: 0,
        SHIB: 0,
        PEPE: 0,
        TON: 0,
        TRX: 0,
        TRUMP: 0
    },
    referralCode: null,
    referredBy: null,
    referrals: [],
    referralCount: 0,
    staking: [],
    stakingMissions: [],
    referralMilestones: [],
    transactions: [],
    notifications: [],
    totalRefiEarned: 0,
    totalUsdtEarned: 0,
    lastSaveTime: Date.now(),
    createdAt: null,
    isInitialized: false
};

let walletData = {
    pendingDeposits: [],
    pendingWithdrawals: [],
    usedTransactions: [],
    depositHistory: [],
    withdrawalHistory: []
};

let livePrices = {};
let unreadNotifications = 0;
let selectedStakingPlan = STAKING_PLANS[0];
let swapDirection = 'to-refi';
let appInitialized = false;
let lastFirebaseSaveTime = Date.now();

// ============================================
// 5. INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // إضافة التاج للمشرف فوراً
    setTimeout(() => {
        checkAdminAndAddCrown();
    }, 300);
    
    // إخفاء شاشة التحميل بعد 3 ثواني كحد أقصى
    const forceHideSplash = setTimeout(() => {
        hideSplashScreen();
    }, 3000);
    
    // بدء التطبيق
    initApp().finally(() => {
        clearTimeout(forceHideSplash);
        hideSplashScreen();
    });
});

function hideSplashScreen() {
    const splash = document.getElementById('splashScreen');
    if (splash && !splash.classList.contains('hidden')) {
        splash.classList.add('hidden');
    }
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.style.display = 'block';
    }
}

async function initApp() {
    if (appInitialized) return;
    
    try {
        console.log("🚀 Initializing REFI Wallet...");
        
        await setupUser();
        await loadUserData();
        await loadPricesOnce();
        
        renderStakingPlans();
        renderAssets();
        renderTopCryptos();
        renderReferralMilestones();
        updateUI();
        
        setupRealtimeListeners();
        setupAutoSave();
        checkForReferral();
        
        appInitialized = true;
        console.log("✅ App initialized successfully");
        
    } catch (error) {
        console.error("❌ Error initializing app:", error);
    }
}

async function setupUser() {
    console.log("👤 Setting up user...");
    
    let telegramUser = null;
    if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
        telegramUser = tg.initDataUnsafe.user;
        console.log("📱 Telegram user found:", telegramUser.id);
    }
    
    if (telegramUser) {
        userData.userId = telegramUser.id.toString();
        userData.userName = telegramUser.first_name || 'REFI User';
    } else {
        const savedUserId = localStorage.getItem('refi_user_id');
        userData.userId = savedUserId || 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
        userData.userName = 'REFI User';
        
        if (!savedUserId) {
            localStorage.setItem('refi_user_id', userData.userId);
        }
    }
    
    document.getElementById('userId').textContent = userData.userName;
    
    if (!userData.referralCode) {
        userData.referralCode = generateReferralCode();
    }
    
    console.log("✅ User setup complete:", userData.userId);
}

function generateReferralCode() {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const userPart = userData.userId.substring(0, 4).toUpperCase();
    return `REF${randomPart}${userPart}`;
}

function getReferralLink() {
    return `${BOT_LINK}?start=${userData.referralCode}`;
}

// ============================================
// 6. DATA LOADING & SAVING (localStorage first)
// ============================================
async function loadUserData() {
    console.log("📂 Loading user data...");
    
    try {
        // Load from localStorage first
        const storageKey = `refi_user_${userData.userId}`;
        const savedData = localStorage.getItem(storageKey);
        
        if (savedData) {
            const parsed = JSON.parse(savedData);
            
            // Merge saved data with default structure
            userData = {
                ...userData,
                ...parsed,
                balances: { ...userData.balances, ...parsed.balances }
            };
            
            console.log("✅ Loaded from localStorage");
        } else {
            // Initialize new user
            userData.createdAt = new Date().toISOString();
            userData.stakingMissions = STAKING_MISSIONS.map(m => ({ ...m, claimed: false }));
            userData.referralMilestones = REFERRAL_MILESTONES.map(m => ({ ...m, claimed: false }));
            saveUserData();
            console.log("📝 New user created");
        }
        
        // Load wallet data
        const walletKey = `refi_wallet_${userData.userId}`;
        const savedWallet = localStorage.getItem(walletKey);
        if (savedWallet) {
            walletData = { ...walletData, ...JSON.parse(savedWallet) };
        }
        
        // Update UI with loaded data
        updateUI();
        
    } catch (error) {
        console.error("❌ Error loading user data:", error);
    }
}

function saveUserData() {
    if (!userData.userId) return;
    
    try {
        const storageKey = `refi_user_${userData.userId}`;
        userData.lastSaveTime = Date.now();
        
        localStorage.setItem(storageKey, JSON.stringify(userData));
        
        // Save wallet data
        const walletKey = `refi_wallet_${userData.userId}`;
        localStorage.setItem(walletKey, JSON.stringify(walletData));
        
        console.log("💾 Data saved locally");
        
    } catch (error) {
        console.error("❌ Error saving user data:", error);
    }
}

function setupAutoSave() {
    // Auto-save every 5 minutes
    setInterval(() => {
        if (userData.userId) {
            saveUserData();
            
            // Save to Firebase every hour
            const now = Date.now();
            if (db && now - lastFirebaseSaveTime > 3600000) { // 1 hour
                syncToFirebase();
                lastFirebaseSaveTime = now;
            }
        }
    }, 300000); // 5 minutes
}

async function syncToFirebase() {
    if (!db || !userData.userId) return;
    
    try {
        const userRef = db.collection('users').doc(userData.userId);
        await userRef.set({
            userId: userData.userId,
            userName: userData.userName,
            balances: userData.balances,
            referralCode: userData.referralCode,
            referredBy: userData.referredBy,
            referrals: userData.referrals,
            referralCount: userData.referralCount,
            staking: userData.staking,
            totalRefiEarned: userData.totalRefiEarned,
            totalUsdtEarned: userData.totalUsdtEarned,
            lastSync: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        console.log("✅ Synced to Firebase");
    } catch (error) {
        console.error("❌ Firebase sync error:", error);
    }
}

// ============================================
// 7. PRICE LOADING (once per session)
// ============================================
async function loadPricesOnce() {
    try {
        const cachedPrices = localStorage.getItem('cachedPrices');
        if (cachedPrices) {
            const { data, timestamp } = JSON.parse(cachedPrices);
            if (Date.now() - timestamp < 3600000) { // 1 hour
                livePrices = data;
                renderTopCryptos();
                renderAssets();
                updateTotalBalance();
                console.log("📦 Loaded prices from cache");
                return;
            }
        }
    } catch (e) {
        console.error("Error loading cached prices:", e);
    }
    
    await fetchLivePrices();
}

async function fetchLivePrices() {
    try {
        const ids = Object.values(CRYPTO_IDS).join(',');
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        
        for (const [symbol, id] of Object.entries(CRYPTO_IDS)) {
            if (data[id]) {
                livePrices[symbol] = {
                    price: data[id].usd,
                    change: data[id].usd_24h_change || 0
                };
            }
        }
        
        localStorage.setItem('cachedPrices', JSON.stringify({
            data: livePrices,
            timestamp: Date.now()
        }));
        
        renderTopCryptos();
        renderAssets();
        updateTotalBalance();
        
    } catch (error) {
        console.error("Error fetching prices:", error);
        setDefaultPrices();
    }
}

function setDefaultPrices() {
    const defaultPrices = {
        BTC: { price: 43250.00, change: 0 },
        ETH: { price: 2250.00, change: 0 },
        BNB: { price: 310.00, change: 0 },
        SOL: { price: 95.00, change: 0 },
        TRX: { price: 0.25, change: 0 },
        SHIB: { price: 0.00001, change: 0 },
        PEPE: { price: 0.000001, change: 0 },
        TON: { price: 2.15, change: 0 },
        DOGE: { price: 0.08, change: 0 },
        ADA: { price: 0.35, change: 0 },
        TRUMP: { price: 5.00, change: 0 }
    };
    
    livePrices = defaultPrices;
    renderTopCryptos();
    renderAssets();
    updateTotalBalance();
}

function refreshPrices() {
    animateElement('.refresh-btn', 'pop');
    fetchLivePrices();
    showToast('Prices updated!', 'success');
}

// ============================================
// 8. UI RENDERING FUNCTIONS
// ============================================
function updateUI() {
    renderAssets();
    updateTotalBalance();
    updateStakingStats();
    updateReferralStats();
    updateSwapBalances();
    updateNotificationBadge();
}

function renderAssets() {
    const assetsList = document.getElementById('assetsList');
    if (!assetsList || !userData) return;
    
    // Sort: REFI first, then by balance
    const sortedAssets = [...ALL_ASSETS].sort((a, b) => {
        if (a.symbol === 'REFI') return -1;
        if (b.symbol === 'REFI') return 1;
        const aBalance = userData.balances[a.symbol] || 0;
        const bBalance = userData.balances[b.symbol] || 0;
        return bBalance - aBalance;
    });
    
    assetsList.innerHTML = sortedAssets.map(asset => {
        const balance = userData.balances[asset.symbol] || 0;
        const price = asset.symbol === 'REFI' ? REFI_PRICE : (livePrices[asset.symbol]?.price || 0);
        const value = asset.symbol === 'USDT' ? balance : balance * price;
        const change = livePrices[asset.symbol]?.change || 0;
        const changeClass = change >= 0 ? 'positive' : 'negative';
        const changeSymbol = change >= 0 ? '+' : '';
        
        return `
            <div class="asset-item" onclick="showAssetDetails('${asset.symbol}')">
                <div class="asset-left">
                    <img src="${getCurrencyIcon(asset.symbol)}" class="asset-icon-img" alt="${asset.symbol}">
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

function renderTopCryptos() {
    const topCryptoList = document.getElementById('topCryptoList');
    if (!topCryptoList) return;
    
    if (Object.keys(livePrices).length === 0) {
        topCryptoList.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin-pulse"></i> Loading prices...</div>';
        return;
    }
    
    topCryptoList.innerHTML = TOP_CRYPTOS.map(crypto => {
        const priceData = livePrices[crypto.symbol] || { price: 0, change: 0 };
        const changeClass = priceData.change >= 0 ? 'positive' : 'negative';
        const changeSymbol = priceData.change >= 0 ? '+' : '';
        
        return `
            <div class="crypto-item" onclick="showCryptoDetails('${crypto.symbol}')">
                <div class="crypto-left">
                    <img src="${getCurrencyIcon(crypto.symbol)}" class="crypto-icon-img" alt="${crypto.symbol}">
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

function renderStakingPlans() {
    const plansGrid = document.getElementById('plansGrid');
    if (!plansGrid) return;
    
    plansGrid.innerHTML = STAKING_PLANS.map(plan => `
        <div class="plan-card ${selectedStakingPlan.id === plan.id ? 'selected' : ''}" onclick="selectStakingPlan('${plan.id}')">
            <div class="plan-days">${plan.name}</div>
            <div class="plan-return">+${plan.return}%</div>
            <div class="plan-label">Return</div>
            <div class="plan-min">Min: ${plan.minAmount} USDT</div>
        </div>
    `).join('');
}

function renderStakingMissions() {
    const missionsGrid = document.getElementById('stakingMissions');
    if (!missionsGrid || !userData) return;
    
    missionsGrid.innerHTML = userData.stakingMissions.map(mission => {
        const hasStaked = userData.staking.some(s => s.plan.id === mission.id);
        const canClaim = hasStaked && !mission.claimed;
        const missionPlan = STAKING_PLANS.find(p => p.id === mission.id);
        
        return `
            <div class="mission-card">
                <div class="mission-info">
                    <i class="fa-regular ${mission.icon}"></i>
                    <div>
                        <h4>First ${mission.plan} Stake</h4>
                        <p>Stake ${missionPlan?.minAmount || 10} USDT or more</p>
                    </div>
                </div>
                <div class="mission-reward">${mission.reward} USDT</div>
                ${canClaim ? 
                    `<button class="claim-btn" onclick="claimStakingMission('${mission.id}')">Claim</button>` :
                    mission.claimed ?
                    `<button class="claim-btn completed" disabled>Claimed</button>` :
                    `<button class="claim-btn" disabled style="opacity:0.5;">Locked</button>`
                }
            </div>
        `;
    }).join('');
}

function renderReferralMilestones() {
    const milestonesList = document.getElementById('milestonesList');
    if (!milestonesList || !userData) return;
    
    milestonesList.innerHTML = REFERRAL_MILESTONES.map(milestone => {
        const progress = Math.min((userData.referralCount / milestone.referrals) * 100, 100);
        const canClaim = userData.referralCount >= milestone.referrals && 
                        !userData.referralMilestones.find(m => m.referrals === milestone.referrals)?.claimed;
        const isClaimed = userData.referralMilestones.find(m => m.referrals === milestone.referrals)?.claimed;
        
        return `
            <div class="milestone-item">
                <div class="milestone-header">
                    <span class="milestone-referrals">
                        <i class="fa-regular ${milestone.icon}"></i>
                        ${milestone.referrals} Referrals
                    </span>
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
                    isClaimed ? 
                    '<p style="color: var(--success); text-align: center; margin-top: 10px;">✓ Claimed</p>' : 
                    ''}
            </div>
        `;
    }).join('');
}

function renderHistory(filter = 'all') {
    const historyList = document.getElementById('historyList');
    if (!historyList || !userData) return;
    
    let transactions = [...userData.transactions]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (filter !== 'all') {
        transactions = transactions.filter(tx => tx.type === filter);
    }
    
    if (transactions.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-clock"></i>
                <p>No transactions yet</p>
                <span>Your transactions will appear here</span>
            </div>
        `;
        return;
    }
    
    historyList.innerHTML = transactions.map(tx => {
        const date = new Date(tx.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let icon = 'fa-circle-down';
        let typeClass = 'deposit';
        let typeText = 'Deposit';
        
        if (tx.type === 'withdraw') {
            icon = 'fa-circle-up';
            typeClass = 'withdraw';
            typeText = 'Withdrawal';
        } else if (tx.type === 'swap') {
            icon = 'fa-arrow-right-arrow-left';
            typeClass = 'swap';
            typeText = 'Swap';
        } else if (tx.type === 'referral_bonus') {
            icon = 'fa-users';
            typeClass = 'referral';
            typeText = 'Referral Bonus';
        } else if (tx.type === 'staking') {
            icon = 'fa-lock';
            typeClass = 'staking';
            typeText = 'Staking';
        }
        
        let statusClass = 'completed';
        let statusText = 'Completed';
        
        if (tx.status === 'pending') {
            statusClass = 'pending';
            statusText = 'Pending';
        } else if (tx.status === 'rejected') {
            statusClass = 'rejected';
            statusText = 'Rejected';
        }
        
        return `
            <div class="history-item">
                <div class="history-item-header">
                    <div class="history-type ${typeClass}">
                        <i class="fa-regular ${icon}"></i>
                        <span>${typeText}</span>
                    </div>
                    <span class="history-status ${statusClass}">${statusText}</span>
                </div>
                <div class="history-details">
                    <span class="history-amount">${tx.amount} ${tx.currency}</span>
                    <span class="history-date">${formattedDate}</span>
                </div>
                ${tx.details ? `<div style="font-size: 11px; color: var(--text-secondary); margin-top: 5px;">${tx.details}</div>` : ''}
                ${tx.txnId ? `<div style="font-size: 10px; color: var(--text-tertiary); margin-top: 5px;">ID: ${tx.txnId.substring(0, 16)}...</div>` : ''}
                ${tx.reason ? `<div style="font-size: 10px; color: var(--danger); margin-top: 5px;">Reason: ${tx.reason}</div>` : ''}
            </div>
        `;
    }).join('');
}

function filterHistory(filter) {
    document.querySelectorAll('.history-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    renderHistory(filter);
}

function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    if (!notificationsList || !userData) return;
    
    const notifications = userData.notifications || [];
    
    if (notifications.length === 0) {
        notificationsList.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-bell-slash"></i>
                <p>No notifications yet</p>
                <span>We'll notify you when something arrives</span>
            </div>
        `;
        return;
    }
    
    notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    notificationsList.innerHTML = notifications.map(notif => {
        const date = new Date(notif.timestamp);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const unreadClass = notif.read ? '' : 'unread';
        
        let icon = 'fa-bell';
        if (notif.type === 'success') icon = 'fa-circle-check';
        if (notif.type === 'error') icon = 'fa-circle-xmark';
        
        return `
            <div class="notification-item ${unreadClass}" onclick="markNotificationRead('${notif.id}')">
                <div class="notification-header">
                    <span class="notification-title">
                        <i class="fa-regular ${icon}"></i>
                        Notification
                    </span>
                    <span class="notification-time">${formattedDate}</span>
                </div>
                <div class="notification-message">
                    ${notif.message}
                </div>
            </div>
        `;
    }).join('');
}

function markNotificationRead(notificationId) {
    if (!userData.notifications) return;
    
    const notification = userData.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
        notification.read = true;
        unreadNotifications--;
        updateNotificationBadge();
        saveUserData();
        renderNotifications();
    }
}

// ============================================
// 9. UTILITY FUNCTIONS
// ============================================
function getCurrencyIcon(symbol) {
    return CMC_ICONS[symbol] || CMC_ICONS.REFI;
}

function getCurrencyName(symbol) {
    const names = {
        REFI: 'REFI Network',
        USDT: 'Tether',
        BNB: 'BNB',
        BTC: 'Bitcoin',
        ETH: 'Ethereum',
        SOL: 'Solana',
        ADA: 'Cardano',
        DOGE: 'Dogecoin',
        SHIB: 'Shiba Inu',
        PEPE: 'Pepe',
        TON: 'Toncoin',
        TRX: 'TRON',
        TRUMP: 'Trump Coin'
    };
    return names[symbol] || symbol;
}

function formatBalance(balance, symbol) {
    if (symbol === 'REFI' || symbol === 'SHIB' || symbol === 'PEPE' || symbol === 'TRUMP') {
        return balance.toLocaleString() + ' ' + symbol;
    } else if (symbol === 'USDT') {
        return '$' + balance.toFixed(2);
    } else if (symbol === 'BNB' || symbol === 'ETH' || symbol === 'SOL' || symbol === 'TRX') {
        return balance.toFixed(4) + ' ' + symbol;
    }
    return balance.toString();
}

function formatNumber(num) {
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    if (num < 0.0001) return num.toFixed(8);
    if (num < 0.01) return num.toFixed(6);
    return num.toFixed(2);
}

function updateTotalBalance() {
    let total = 0;
    total += userData.balances.USDT || 0;
    total += (userData.balances.REFI || 0) * REFI_PRICE;
    total += (userData.balances.BNB || 0) * (livePrices.BNB?.price || 0);
    total += (userData.balances.ETH || 0) * (livePrices.ETH?.price || 0);
    total += (userData.balances.SOL || 0) * (livePrices.SOL?.price || 0);
    total += (userData.balances.TRX || 0) * (livePrices.TRX?.price || 0.25);
    total += (userData.balances.TRUMP || 0) * (livePrices.TRUMP?.price || 5.00);
    
    document.getElementById('totalBalance').textContent = '$' + total.toFixed(2);
}

function updateStakingStats() {
    const totalStaked = userData.staking.reduce((sum, stake) => sum + stake.amount, 0);
    document.getElementById('totalStaked').textContent = totalStaked.toFixed(2) + ' USDT';
    
    const now = new Date();
    const rewards = userData.staking.reduce((sum, stake) => {
        const endDate = new Date(stake.endDate);
        if (endDate < now && !stake.claimed) {
            return sum + (stake.amount * stake.plan.return / 100);
        }
        return sum;
    }, 0);
    
    document.getElementById('rewardsEarned').textContent = rewards.toFixed(2) + ' USDT';
    document.getElementById('stakeBalance').textContent = `Balance: $${(userData.balances.USDT || 0).toFixed(2)} USDT`;
    document.getElementById('activeStakesCount').textContent = userData.staking.length;
    
    if (userData.staking.length > 0) {
        const avgReturn = userData.staking.reduce((sum, stake) => sum + stake.plan.return, 0) / userData.staking.length;
        document.getElementById('avgReturn').textContent = avgReturn.toFixed(0) + '%';
    }
    
    renderActiveStakes();
}

function renderActiveStakes() {
    const activeStakes = document.getElementById('activeStakes');
    if (!activeStakes) return;
    
    if (userData.staking.length === 0) {
        activeStakes.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No active stakes</p>';
        return;
    }
    
    const now = new Date();
    activeStakes.innerHTML = userData.staking.map(stake => {
        const endDate = new Date(stake.endDate);
        const daysLeft = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
        const isComplete = endDate < now;
        const reward = stake.amount * stake.plan.return / 100;
        
        return `
            <div class="stake-item ${isComplete ? 'complete' : ''}">
                <div class="stake-header">
                    <span class="stake-plan">${stake.plan.name}</span>
                    <span class="stake-amount">${stake.amount} USDT</span>
                </div>
                <div class="stake-details">
                    <span>Return: +${stake.plan.return}% (${reward.toFixed(2)} USDT)</span>
                    <span>${isComplete ? 'Complete!' : daysLeft + ' days left'}</span>
                </div>
                ${isComplete && !stake.claimed ? 
                    '<button class="claim-btn" style="margin-top: 10px;" onclick="claimStakingReward(\'' + stake.startDate + '\')">Claim Rewards</button>' : 
                    ''}
            </div>
        `;
    }).join('');
}

function updateReferralStats() {
    document.getElementById('totalReferrals').textContent = userData.referralCount || 0;
    document.getElementById('refiEarned').textContent = ((userData.referralCount || 0) * REFERRAL_BONUS).toLocaleString() + ' REFI';
    document.getElementById('usdtEarned').textContent = (userData.totalUsdtEarned || 0).toFixed(2) + ' USDT';
    
    const referralLinkInput = document.getElementById('referralLink');
    if (referralLinkInput) {
        referralLinkInput.value = getReferralLink();
    }
}

function updateSwapBalances() {
    const payCurrency = document.getElementById('payCurrency').textContent;
    document.getElementById('payBalance').textContent = `Balance: ${formatBalance(userData.balances[payCurrency] || 0, payCurrency)}`;
}

function updateNotificationBadge() {
    const badge = document.querySelector('.badge');
    if (badge) {
        unreadNotifications = userData.notifications?.filter(n => !n.read).length || 0;
        badge.textContent = unreadNotifications;
        badge.style.display = unreadNotifications > 0 ? 'block' : 'none';
    }
}

function animateElement(selector, animationClass) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, 500);
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    
    const icon = toast.querySelector('i');
    if (type === 'success') {
        icon.className = 'fa-regular fa-circle-check';
    } else if (type === 'error') {
        icon.className = 'fa-regular fa-circle-xmark';
    } else if (type === 'warning') {
        icon.className = 'fa-regular fa-circle-exclamation';
    } else {
        icon.className = 'fa-regular fa-circle-info';
    }
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
}

// ============================================
// 10. DEPOSIT SYSTEM (محسن من VIP Mining)
// ============================================
function showDepositModal() {
    document.getElementById('depositModal').classList.add('show');
    updateDepositInfo();
    animateElement('.modal-content', 'slideUpModal');
}

function updateDepositInfo() {
    const currency = document.getElementById('depositCurrency').value;
    const amountInput = document.getElementById('depositAmount');
    const depositAddress = document.getElementById('depositAddress');
    const depositIcon = document.getElementById('depositIcon');
    const addressNote = document.getElementById('depositAddressNote');
    
    if (depositIcon) depositIcon.src = getCurrencyIcon(currency);
    depositAddress.textContent = DEPOSIT_ADDRESSES[currency] || DEPOSIT_ADDRESSES.REFI;
    addressNote.innerHTML = `<i class="fa-regular fa-circle-check"></i> <span>✓ Blockchain confirmation 1-5 minutes</span>`;
    
    const minAmount = DEPOSIT_MINIMUMS[currency] || 0;
    if (currency === 'REFI' || currency === 'SHIB' || currency === 'PEPE' || currency === 'TRUMP') {
        amountInput.placeholder = `Min ${minAmount.toLocaleString()} ${currency}`;
    } else {
        amountInput.placeholder = `Min ${minAmount} ${currency}`;
    }
}

function copyDepositAddress() {
    const address = document.getElementById('depositAddress').textContent;
    navigator.clipboard.writeText(address);
    showToast('Address copied to clipboard!', 'success');
    animateElement('.copy-address-btn', 'pop');
}

// ✅ دالة الإيداع المحسنة (مثل VIP Mining)
async function submitDeposit() {
    const currency = document.getElementById('depositCurrency').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const txnId = document.getElementById('txnId').value.trim();
    
    // 1. تعطيل الزر مؤقتاً
    const submitBtn = document.querySelector('.modal-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
    
    try {
        // 2. التحقق من المدخلات
        if (!amount || amount <= 0) {
            showToast('Please enter a valid amount', 'error');
            enableSubmitButton(submitBtn);
            return;
        }
        
        if (!txnId) {
            showToast('Please enter transaction ID', 'error');
            enableSubmitButton(submitBtn);
            return;
        }
        
        // 3. التحقق من الطول (TXID عادة 64+ حرف)
        if (txnId.length < MIN_TX_LENGTH) {
            showToast('Invalid transaction ID (too short)', 'error');
            enableSubmitButton(submitBtn);
            return;
        }
        
        // 4. التحقق من التكرار (منع استخدام نفس TXID مرتين)
        const usedBefore = walletData.usedTransactions.includes(txnId.toLowerCase());
        if (usedBefore) {
            showToast('This transaction ID has already been used', 'error');
            enableSubmitButton(submitBtn);
            return;
        }
        
        // 5. التحقق من الحد الأدنى
        const minAmount = DEPOSIT_MINIMUMS[currency] || 0;
        if (amount < minAmount) {
            showToast(`Minimum deposit is ${minAmount} ${currency}`, 'error');
            enableSubmitButton(submitBtn);
            return;
        }
        
        // 6. إنشاء طلب الإيداع
        const depositRequest = {
            id: 'dep_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            userId: userData.userId,
            username: userData.userName,
            currency: currency,
            amount: amount,
            txnId: txnId,
            address: DEPOSIT_ADDRESSES[currency],
            status: 'pending',
            timestamp: new Date().toISOString(),
            type: 'deposit'
        };
        
        // 7. حفظ محلياً أولاً (ضمان عدم فقدان الطلب)
        walletData.pendingDeposits.push(depositRequest);
        walletData.usedTransactions.push(txnId.toLowerCase());
        
        if (!userData.transactions) userData.transactions = [];
        userData.transactions.push(depositRequest);
        
        saveUserData();
        
        // 8. حفظ في Firebase (في الخلفية)
        if (db) {
            try {
                await db.collection('transactions').add(depositRequest);
                await addNotification(ADMIN_ID, `💰 New deposit request: ${amount} ${currency} from ${userData.userId}`, 'info');
                console.log("✅ Deposit saved to Firebase");
            } catch (error) {
                console.error("Firebase error:", error);
                // حتى لو فشل Firebase، الطلب محفوظ محلياً
            }
        }
        
        // 9. رسالة نجاح
        showToast('Deposit request submitted! Waiting for admin approval.', 'success');
        closeModal('depositModal');
        
        // 10. تفعيل الزر مرة أخرى
        enableSubmitButton(submitBtn);
        
    } catch (error) {
        console.error("Deposit error:", error);
        showToast('Failed to submit deposit request', 'error');
        enableSubmitButton(submitBtn);
    }
}

function enableSubmitButton(btn) {
    setTimeout(() => {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-regular fa-circle-down"></i> Submit Deposit';
        }
    }, 1000);
}

// ============================================
// 11. WITHDRAWAL SYSTEM (مع حجز الرصيد)
// ============================================
function showWithdrawModal() {
    document.getElementById('withdrawModal').classList.add('show');
    checkWithdrawFee();
    updateWithdrawIcon();
    animateElement('.modal-content', 'slideUpModal');
}

function checkWithdrawFee() {
    const currency = document.getElementById('withdrawCurrency').value;
    const feeWarning = document.getElementById('feeWarning');
    const feeWarningText = document.getElementById('feeWarningText');
    const networkFee = document.getElementById('networkFee');
    const receiveAmount = document.getElementById('receiveAmount_');
    const amount = parseFloat(document.getElementById('withdrawAmount').value) || 0;
    
    updateWithdrawIcon();
    
    const fee = WITHDRAWAL_FEES[currency] || 0;
    
    if (fee > 0) {
        feeWarning.classList.remove('hidden');
        feeWarningText.textContent = `${currency} withdrawal requires ${fee} BNB fee`;
        networkFee.textContent = fee + ' BNB';
        if (receiveAmount) receiveAmount.textContent = amount.toFixed(6) + ' ' + currency;
    } else {
        feeWarning.classList.add('hidden');
        networkFee.textContent = '0 BNB';
        if (receiveAmount) receiveAmount.textContent = amount.toFixed(6) + ' ' + currency;
    }
}

function updateWithdrawIcon() {
    const currency = document.getElementById('withdrawCurrency').value;
    const icon = document.getElementById('withdrawIcon');
    if (icon) icon.src = getCurrencyIcon(currency);
}

// ✅ دالة السحب المحسنة (مع حجز الرصيد)
async function submitWithdraw() {
    const currency = document.getElementById('withdrawCurrency').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('walletAddress').value.trim();
    
    // 1. تعطيل الزر مؤقتاً
    const submitBtn = document.querySelector('#withdrawModal .modal-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
    
    try {
        // 2. التحقق من المدخلات
        if (!amount || amount <= 0 || !address) {
            showToast('Please fill all fields', 'error');
            enableWithdrawButton(submitBtn);
            return;
        }
        
        // 3. التحقق من الرصيد
        if (!userData.balances[currency] || userData.balances[currency] < amount) {
            showToast(`Insufficient ${currency} balance`, 'error');
            enableWithdrawButton(submitBtn);
            return;
        }
        
        // 4. التحقق من الرسوم
        const fee = WITHDRAWAL_FEES[currency] || 0;
        if (fee > 0 && (!userData.balances.BNB || userData.balances.BNB < fee)) {
            showToast(`You need ${fee} BNB for withdrawal fee`, 'error');
            enableWithdrawButton(submitBtn);
            return;
        }
        
        // 5. حجز الرصيد (خصم فوري)
        const originalBalance = userData.balances[currency];
        const originalBnbBalance = userData.balances.BNB;
        
        userData.balances[currency] -= amount;
        if (fee > 0) {
            userData.balances.BNB -= fee;
        }
        
        // 6. إنشاء طلب السحب
        const withdrawRequest = {
            id: 'wd_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            userId: userData.userId,
            username: userData.userName,
            currency: currency,
            amount: amount,
            address: address,
            fee: fee,
            feeCurrency: 'BNB',
            status: 'pending',
            timestamp: new Date().toISOString(),
            type: 'withdraw'
        };
        
        // 7. حفظ محلياً
        walletData.pendingWithdrawals.push(withdrawRequest);
        userData.transactions.push(withdrawRequest);
        saveUserData();
        
        // 8. حفظ في Firebase
        if (db) {
            try {
                await db.collection('transactions').add(withdrawRequest);
                await addNotification(ADMIN_ID, `💸 New withdrawal request: ${amount} ${currency} from ${userData.userId}`, 'info');
                console.log("✅ Withdrawal saved to Firebase");
            } catch (error) {
                console.error("Firebase error:", error);
            }
        }
        
        // 9. تحديث الواجهة
        updateUI();
        showToast('Withdrawal request submitted! Waiting for admin approval.', 'success');
        closeModal('withdrawModal');
        
        enableWithdrawButton(submitBtn);
        
    } catch (error) {
        console.error("Withdraw error:", error);
        showToast('Failed to submit withdrawal request', 'error');
        enableWithdrawButton(submitBtn);
    }
}

function enableWithdrawButton(btn) {
    setTimeout(() => {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-regular fa-circle-up"></i> Submit Withdrawal';
        }
    }, 1000);
}

// ============================================
// 12. SWAP SYSTEM
// ============================================
function showCurrencySelector(type) {
    currentCurrencySelector = type;
    const modal = document.getElementById('currencySelectorModal');
    const currencyList = document.getElementById('currencyList');
    
    currencyList.innerHTML = SWAP_CURRENCIES.map(curr => `
        <div class="currency-list-item" onclick="selectCurrency('${curr.symbol}')">
            <img src="${curr.icon}" alt="${curr.symbol}">
            <div class="currency-list-info">
                <h4>${curr.name}</h4>
                <p>${curr.symbol}</p>
            </div>
        </div>
    `).join('');
    
    modal.classList.add('show');
}

function selectCurrency(symbol) {
    if (currentCurrencySelector === 'pay') {
        document.getElementById('payCurrency').textContent = symbol;
        document.getElementById('payCurrencyIcon').src = getCurrencyIcon(symbol);
        
        // العملة المستقبلة ثابتة: REFI
        document.getElementById('receiveCurrency').textContent = 'REFI';
        document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.REFI;
    }
    
    closeModal('currencySelectorModal');
    updateSwapNote();
    calculateSwap();
    updateSwapBalances();
}

function updateSwapNote() {
    const payCurrency = document.getElementById('payCurrency').textContent;
    const swapNote = document.getElementById('swapNote');
    const swapRate = document.getElementById('swapRate');
    
    if (payCurrency === 'USDT') {
        swapNote.textContent = 'Swap USDT to REFI at fixed rate';
        swapRate.textContent = `1 USDT = ${SWAP_RATE.toLocaleString()} REFI`;
    } else {
        swapNote.textContent = `Swap ${payCurrency} to REFI at market rate`;
        const payPrice = payCurrency === 'REFI' ? REFI_PRICE : (livePrices[payCurrency]?.price || 0);
        
        if (payPrice > 0) {
            const rate = payPrice / REFI_PRICE;
            swapRate.textContent = `1 ${payCurrency} = ${rate.toFixed(0)} REFI`;
        } else {
            swapRate.textContent = 'Rate will be calculated based on current market price';
        }
    }
}

function filterCurrencies() {
    const searchTerm = document.getElementById('currencySearch').value.toLowerCase();
    const currencyList = document.getElementById('currencyList');
    
    const filtered = SWAP_CURRENCIES.filter(curr => 
        curr.name.toLowerCase().includes(searchTerm) || 
        curr.symbol.toLowerCase().includes(searchTerm)
    );
    
    currencyList.innerHTML = filtered.map(curr => `
        <div class="currency-list-item" onclick="selectCurrency('${curr.symbol}')">
            <img src="${curr.icon}" alt="${curr.symbol}">
            <div class="currency-list-info">
                <h4>${curr.name}</h4>
                <p>${curr.symbol}</p>
            </div>
        </div>
    `).join('');
}

function calculateSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value) || 0;
    const payCurrency = document.getElementById('payCurrency').textContent;
    
    if (payCurrency === 'USDT') {
        const receiveAmount = payAmount * SWAP_RATE;
        document.getElementById('receiveAmount').value = receiveAmount.toFixed(0);
    } else {
        const payPrice = payCurrency === 'REFI' ? REFI_PRICE : (livePrices[payCurrency]?.price || 0);
        
        if (payPrice > 0) {
            const receiveAmount = (payAmount * payPrice) / REFI_PRICE;
            document.getElementById('receiveAmount').value = receiveAmount.toFixed(0);
        } else {
            document.getElementById('receiveAmount').value = '0';
        }
    }
}

function confirmSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value);
    const payCurrency = document.getElementById('payCurrency').textContent;
    const receiveAmount = parseFloat(document.getElementById('receiveAmount').value);
    
    if (!payAmount || payAmount <= 0) {
        showToast('Please enter a valid amount', 'error');
        animateElement('#payAmount', 'shake');
        return;
    }
    
    if (!userData.balances[payCurrency] || userData.balances[payCurrency] < payAmount) {
        showToast(`Insufficient ${payCurrency} balance`, 'error');
        return;
    }
    
    // Execute swap
    userData.balances[payCurrency] -= payAmount;
    userData.balances.REFI += receiveAmount;
    
    const transaction = {
        id: 'swap_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId: userData.userId,
        type: 'swap',
        amount: payAmount,
        currency: payCurrency,
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Swapped to ${receiveAmount} REFI`
    };
    
    userData.transactions.push(transaction);
    saveUserData();
    
    // Save to Firebase (optional)
    if (db) {
        db.collection('transactions').add(transaction).catch(e => console.log(e));
    }
    
    showToast(`Swapped ${payAmount} ${payCurrency} to ${receiveAmount} REFI`, 'success');
    
    document.getElementById('payAmount').value = '1';
    calculateSwap();
    updateSwapBalances();
    updateUI();
    animateElement('#swapBtn', 'pop');
}

function setMaxAmount() {
    const payCurrency = document.getElementById('payCurrency').textContent;
    const balance = userData.balances[payCurrency] || 0;
    document.getElementById('payAmount').value = balance;
    calculateSwap();
    animateElement('.max-btn', 'pop');
}

function swapDirection(direction) {
    if (direction === 'down') {
        document.getElementById('payCurrency').textContent = 'USDT';
        document.getElementById('payCurrencyIcon').src = CMC_ICONS.USDT;
        document.getElementById('receiveCurrency').textContent = 'REFI';
        document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.REFI;
    } else if (direction === 'up') {
        document.getElementById('payCurrency').textContent = 'REFI';
        document.getElementById('payCurrencyIcon').src = CMC_ICONS.REFI;
        document.getElementById('receiveCurrency').textContent = 'USDT';
        document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.USDT;
    }
    
    updateSwapNote();
    calculateSwap();
    updateSwapBalances();
    animateElement('.swap-action-btn', 'pop');
}

// ============================================
// 13. STAKING SYSTEM
// ============================================
function selectStakingPlan(planId) {
    selectedStakingPlan = STAKING_PLANS.find(p => p.id === planId);
    renderStakingPlans();
    document.getElementById('lockPeriod').textContent = selectedStakingPlan.name;
    calculateStakingReturn();
    animateElement('.plan-card.selected', 'pop');
}

function calculateStakingReturn() {
    const amount = parseFloat(document.getElementById('stakeAmount').value) || 0;
    const returnAmount = (amount * selectedStakingPlan.return) / 100;
    const total = amount + returnAmount;
    
    document.getElementById('estimatedReturn').textContent = returnAmount.toFixed(2) + ' USDT';
    document.getElementById('totalAfterStaking').textContent = total.toFixed(2) + ' USDT';
}

function stakeUSDT() {
    const amount = parseFloat(document.getElementById('stakeAmount').value);
    
    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        animateElement('#stakeAmount', 'shake');
        return;
    }
    
    if (amount < selectedStakingPlan.minAmount) {
        showToast(`Minimum stake is ${selectedStakingPlan.minAmount} USDT for this plan`, 'error');
        return;
    }
    
    if (!userData.balances.USDT || userData.balances.USDT < amount) {
        showToast('Insufficient USDT balance', 'error');
        return;
    }
    
    const stake = {
        plan: selectedStakingPlan,
        amount: amount,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + selectedStakingPlan.days * 24 * 60 * 60 * 1000).toISOString(),
        claimed: false
    };
    
    userData.balances.USDT -= amount;
    userData.staking.push(stake);
    
    const transaction = {
        id: 'stake_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId: userData.userId,
        type: 'staking',
        amount: amount,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staked for ${selectedStakingPlan.name}`
    };
    
    userData.transactions.push(transaction);
    saveUserData();
    
    if (db) {
        db.collection('transactions').add(transaction).catch(e => console.log(e));
    }
    
    showToast(`Successfully staked ${amount} USDT for ${selectedStakingPlan.days} days!`, 'success');
    document.getElementById('stakeAmount').value = '';
    updateStakingStats();
    renderStakingMissions();
    updateUI();
    animateElement('.confirm-btn', 'pop');
}

function claimStakingReward(startDate) {
    const stake = userData.staking.find(s => s.startDate === startDate);
    if (!stake || stake.claimed) return;
    
    const reward = stake.amount * stake.plan.return / 100;
    userData.balances.USDT += reward;
    stake.claimed = true;
    
    const transaction = {
        id: 'reward_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId: userData.userId,
        type: 'staking',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staking reward for ${stake.plan.name}`
    };
    
    userData.transactions.push(transaction);
    saveUserData();
    
    if (db) {
        db.collection('transactions').add(transaction).catch(e => console.log(e));
    }
    
    showToast(`Claimed ${reward.toFixed(2)} USDT rewards!`, 'success');
    updateStakingStats();
    updateUI();
}

function claimStakingMission(missionId) {
    const missionIndex = userData.stakingMissions.findIndex(m => m.id === missionId);
    if (missionIndex === -1 || userData.stakingMissions[missionIndex].claimed) return;
    
    const hasStaked = userData.staking.some(s => s.plan.id === missionId);
    if (!hasStaked) {
        showToast(`You need to complete a ${STAKING_PLANS.find(p => p.id === missionId).name} stake first!`, 'error');
        return;
    }
    
    const reward = STAKING_PLANS.find(p => p.id === missionId).reward;
    userData.balances.USDT += reward;
    userData.stakingMissions[missionIndex].claimed = true;
    
    const transaction = {
        id: 'mission_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId: userData.userId,
        type: 'staking',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staking mission reward for ${STAKING_PLANS.find(p => p.id === missionId).name}`
    };
    
    userData.transactions.push(transaction);
    saveUserData();
    
    if (db) {
        db.collection('transactions').add(transaction).catch(e => console.log(e));
    }
    
    showToast(`Claimed ${reward} USDT!`, 'success');
    renderStakingMissions();
    updateUI();
    animateElement('.mission-card', 'pop');
}

// ============================================
// 14. REFERRAL SYSTEM
// ============================================
function copyReferralLink() {
    const link = getReferralLink();
    navigator.clipboard.writeText(link);
    showToast('✅ Referral link copied!', 'success');
    animateElement('.copy-btn', 'pop');
}

function shareReferral() {
    const link = getReferralLink();
    const text = `🚀 Join REFI Network and get 10,000 REFI bonus! Use my link: ${link}`;
    
    if (tg && tg.shareToStory) {
        tg.shareToStory(text);
    } else {
        navigator.clipboard.writeText(text);
        showToast('📋 Referral message copied!', 'success');
    }
}

async function processReferral() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        let referralCode = urlParams.get('start') || urlParams.get('ref');
        
        if (!referralCode && tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param) {
            referralCode = tg.initDataUnsafe.start_param;
        }
        
        if (!referralCode || referralCode === userData.referralCode || userData.referredBy) {
            return;
        }
        
        if (!db) return;
        
        const referrerQuery = await db.collection('users')
            .where('referralCode', '==', referralCode)
            .limit(1)
            .get();
        
        if (referrerQuery.empty) return;
        
        const referrerDoc = referrerQuery.docs[0];
        const referrerId = referrerDoc.id;
        const referrerData = referrerDoc.data();
        
        if (referrerId === userData.userId) return;
        if (referrerData.referrals && referrerData.referrals.includes(userData.userId)) return;
        
        // Update referrer
        const updatedReferrals = [...(referrerData.referrals || []), userData.userId];
        const updatedReferralCount = (referrerData.referralCount || 0) + 1;
        const updatedRefiBalance = (referrerData.balances?.REFI || 0) + REFERRAL_BONUS;
        
        await db.collection('users').doc(referrerId).update({
            referrals: updatedReferrals,
            referralCount: updatedReferralCount,
            'balances.REFI': updatedRefiBalance,
            totalRefiEarned: (referrerData.totalRefiEarned || 0) + REFERRAL_BONUS
        });
        
        // Update current user
        userData.referredBy = referralCode;
        userData.balances.REFI = (userData.balances.REFI || 0) + 10000;
        
        const referralTx = {
            id: 'ref_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            userId: userData.userId,
            type: 'referral_bonus',
            amount: 10000,
            currency: 'REFI',
            status: 'completed',
            timestamp: new Date().toISOString()
        };
        
        userData.transactions.push(referralTx);
        saveUserData();
        
        await db.collection('transactions').add(referralTx);
        
        await addNotification(referrerId, `🎉 Someone joined with your link! You got ${REFERRAL_BONUS.toLocaleString()} REFI!`, 'success');
        await addNotification(userData.userId, `🎉 Welcome! You got 10,000 REFI bonus!`, 'success');
        
        showToast(`🎉 Welcome! You got 10,000 REFI bonus!`, 'success');
        updateUI();
        
    } catch (error) {
        console.error("Error processing referral:", error);
    }
}

function checkForReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    let referralCode = urlParams.get('start') || urlParams.get('ref');
    
    if (!referralCode && tg && tg.initDataUnsafe && tg.initDataUnsafe.start_param) {
        referralCode = tg.initDataUnsafe.start_param;
    }
    
    if (referralCode && referralCode !== userData.referralCode && !userData.referredBy) {
        console.log("🔗 Referral detected:", referralCode);
        processReferral();
    }
}

function claimReferralMilestone(referrals) {
    const milestoneIndex = userData.referralMilestones.findIndex(m => m.referrals === referrals);
    if (milestoneIndex === -1 || userData.referralMilestones[milestoneIndex].claimed) return;
    
    if (userData.referralCount < referrals) {
        showToast(`You need ${referrals} referrals to claim this!`, 'error');
        return;
    }
    
    const reward = REFERRAL_MILESTONES.find(m => m.referrals === referrals).reward;
    userData.balances.USDT += reward;
    userData.totalUsdtEarned += reward;
    userData.referralMilestones[milestoneIndex].claimed = true;
    
    const transaction = {
        id: 'refmil_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId: userData.userId,
        type: 'referral_bonus',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Referral milestone: ${referrals} referrals`
    };
    
    userData.transactions.push(transaction);
    saveUserData();
    
    if (db) {
        db.collection('transactions').add(transaction).catch(e => console.log(e));
    }
    
    showToast(`Claimed ${reward} USDT!`, 'success');
    updateReferralStats();
    renderReferralMilestones();
    updateUI();
    animateElement('.milestone-item', 'pop');
}

// ============================================
// 15. NOTIFICATION SYSTEM
// ============================================
async function addNotification(userId, message, type = 'info') {
    if (!db) return;
    
    const notification = {
        id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        userId: userId,
        message: message,
        type: type,
        read: false,
        timestamp: new Date().toISOString()
    };
    
    try {
        await db.collection('users').doc(userId).update({
            notifications: firebase.firestore.FieldValue.arrayUnion(notification)
        });
        
        if (userId === userData.userId) {
            userData.notifications = userData.notifications || [];
            userData.notifications.push(notification);
            saveUserData();
            updateNotificationBadge();
            showToast(message, type);
        }
    } catch (error) {
        console.error("Error adding notification:", error);
    }
}

function showNotifications() {
    document.getElementById('notificationsModal').classList.add('show');
    renderNotifications();
    animateElement('.modal-content', 'slideUpModal');
}

// ============================================
// 16. ADMIN SYSTEM
// ============================================
function isAdmin() {
    return userData.userId === ADMIN_ID;
}

function checkAdminAndAddCrown() {
    console.log("🔍 Checking admin status...");
    console.log("User ID:", userData.userId);
    console.log("Admin ID:", ADMIN_ID);
    console.log("Is admin?", userData.userId === ADMIN_ID);
    
    if (userData.userId === ADMIN_ID) {
        console.log("👑 Admin confirmed! Adding crown...");
        addAdminCrown();
    }
}

function addAdminCrown() {
    const tryAddCrown = () => {
        const header = document.querySelector('.header-actions');
        if (!header) return false;
        
        const existingCrown = document.getElementById('adminCrownBtn');
        if (existingCrown) existingCrown.remove();
        
        const adminBtn = document.createElement('button');
        adminBtn.id = 'adminCrownBtn';
        adminBtn.className = 'icon-btn';
        adminBtn.innerHTML = '<i class="fa-solid fa-crown" style="color: gold;"></i>';
        adminBtn.onclick = showAdminPanel;
        adminBtn.title = 'Admin Panel';
        header.appendChild(adminBtn);
        
        console.log("✅ Admin crown added");
        return true;
    };
    
    if (tryAddCrown()) return;
    
    // Retry up to 5 times
    let attempts = 0;
    const interval = setInterval(() => {
        attempts++;
        if (tryAddCrown() || attempts >= 5) {
            clearInterval(interval);
        }
    }, 500);
}

function showAdminPanel() {
    if (!isAdmin()) {
        showToast('Access denied', 'error');
        return;
    }
    
    document.getElementById('adminPanel').classList.remove('hidden');
    loadAdminData();
}

function closeAdminPanel() {
    document.getElementById('adminPanel').classList.add('hidden');
}

async function loadAdminData() {
    if (!db) return;
    
    try {
        const usersSnapshot = await db.collection('users').get();
        const totalUsers = usersSnapshot.size;
        
        const transactionsSnapshot = await db.collection('transactions').get();
        const pendingCount = transactionsSnapshot.docs.filter(d => d.data().status === 'pending').length;
        const approvedCount = transactionsSnapshot.docs.filter(d => d.data().status === 'approved' || d.data().status === 'completed').length;
        
        const referralsCount = usersSnapshot.docs.reduce((sum, doc) => sum + (doc.data().referralCount || 0), 0);
        
        document.getElementById('totalUsers').textContent = totalUsers;
        document.getElementById('pendingCount').textContent = pendingCount;
        document.getElementById('approvedCount').textContent = approvedCount;
        document.getElementById('totalReferralsCount').textContent = referralsCount;
        
        showAdminTab('deposits');
        
    } catch (error) {
        console.error("Error loading admin data:", error);
        showToast('Error loading admin data', 'error');
    }
}

async function showAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    const adminContent = document.getElementById('adminContent');
    
    if (!db) {
        adminContent.innerHTML = '<div class="empty-state">Firebase not connected</div>';
        return;
    }
    
    try {
        let query;
        if (tab === 'deposits') {
            query = db.collection('transactions').where('type', '==', 'deposit').where('status', '==', 'pending');
        } else if (tab === 'withdrawals') {
            query = db.collection('transactions').where('type', '==', 'withdraw').where('status', '==', 'pending');
        } else if (tab === 'completed') {
            query = db.collection('transactions').where('status', 'in', ['approved', 'completed']);
        } else if (tab === 'rejected') {
            query = db.collection('transactions').where('status', '==', 'rejected');
        }
        
        const snapshot = await query.limit(50).get();
        
        if (snapshot.empty) {
            adminContent.innerHTML = '<div class="empty-state">No transactions found</div>';
            return;
        }
        
        let html = '';
        snapshot.forEach(doc => {
            const tx = { id: doc.id, ...doc.data() };
            html += renderAdminTransactionCard(tx, tab);
        });
        
        adminContent.innerHTML = html;
        
    } catch (error) {
        console.error("Error loading admin tab:", error);
        adminContent.innerHTML = '<div class="empty-state">Error loading transactions</div>';
    }
}

function renderAdminTransactionCard(tx, tab) {
    const date = new Date(tx.timestamp);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    
    let actionButtons = '';
    if (tab === 'deposits' || tab === 'withdrawals') {
        actionButtons = `
            <div class="admin-tx-actions">
                <button class="admin-approve-btn" onclick="approveTransaction('${tx.id}', '${tx.userId}', '${tx.type}', '${tx.currency}', ${tx.amount}, ${tx.fee || 0}, '${tx.feeCurrency || 'BNB'}')">
                    <i class="fa-regular fa-circle-check"></i> Approve
                </button>
                <button class="admin-reject-btn" onclick="rejectTransaction('${tx.id}', '${tx.userId}', '${tx.type}', '${tx.currency}', ${tx.amount}, ${tx.fee || 0}, '${tx.feeCurrency || 'BNB'}')">
                    <i class="fa-regular fa-circle-xmark"></i> Reject
                </button>
            </div>
        `;
    }
    
    return `
        <div class="admin-transaction-card">
            <div class="admin-tx-header">
                <div class="admin-tx-type ${tx.type}">
                    <i class="fa-regular ${tx.type === 'deposit' ? 'fa-circle-down' : 'fa-circle-up'}"></i>
                    <span>${tx.type.toUpperCase()}</span>
                </div>
                <span class="admin-tx-status ${tx.status}">${tx.status}</span>
            </div>
            <div class="admin-tx-details">
                <div class="admin-tx-row">
                    <span class="admin-tx-label">User:</span>
                    <span class="admin-tx-value">${tx.userId?.substring(0, 8)}...</span>
                </div>
                <div class="admin-tx-row">
                    <span class="admin-tx-label">Amount:</span>
                    <span class="admin-tx-value">${tx.amount} ${tx.currency}</span>
                </div>
                ${tx.txnId ? `
                <div class="admin-tx-row">
                    <span class="admin-tx-label">TXID:</span>
                    <div class="admin-address-container">
                        <code>${tx.txnId.substring(0, 16)}...</code>
                        <button class="admin-copy-btn" onclick="copyToClipboard('${tx.txnId}')">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </div>` : ''}
                ${tx.address ? `
                <div class="admin-tx-row">
                    <span class="admin-tx-label">Address:</span>
                    <div class="admin-address-container">
                        <code>${tx.address.substring(0, 16)}...</code>
                        <button class="admin-copy-btn" onclick="copyToClipboard('${tx.address}')">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </div>` : ''}
                ${tx.fee ? `
                <div class="admin-tx-row">
                    <span class="admin-tx-label">Fee:</span>
                    <span class="admin-tx-value">${tx.fee} ${tx.feeCurrency}</span>
                </div>` : ''}
                <div class="admin-tx-row">
                    <span class="admin-tx-label">Time:</span>
                    <span class="admin-tx-value">${formattedDate}</span>
                </div>
            </div>
            ${actionButtons}
        </div>
    `;
}

// ✅ دالة الموافقة على المعاملة
async function approveTransaction(txId, targetUserId, type, currency, amount, fee, feeCurrency) {
    try {
        console.log("Approving transaction:", txId);
        
        const txRef = db.collection('transactions').doc(txId);
        await txRef.update({
            status: 'approved',
            approvedAt: new Date().toISOString()
        });
        
        if (type === 'deposit') {
            await db.collection('users').doc(targetUserId).update({
                [`balances.${currency}`]: firebase.firestore.FieldValue.increment(amount)
            });
            await addNotification(targetUserId, `✅ Your deposit of ${amount} ${currency} has been approved!`, 'success');
            
        } else if (type === 'withdraw') {
            // Withdrawal - balance already reserved, just notify
            const feeText = fee > 0 ? ` (Fee: ${fee} ${feeCurrency})` : '';
            await addNotification(targetUserId, `✅ Your withdrawal of ${amount} ${currency} has been approved${feeText}!`, 'success');
        }
        
        showToast('Transaction approved!', 'success');
        
        const activeTab = document.querySelector('.admin-tab.active').textContent.toLowerCase();
        showAdminTab(activeTab);
        
    } catch (error) {
        console.error("Error approving transaction:", error);
        showToast('Error approving transaction: ' + error.message, 'error');
    }
}

// ✅ دالة رفض المعاملة (مع إعادة الرصيد للسحب)
async function rejectTransaction(txId, targetUserId, type, currency, amount, fee, feeCurrency) {
    try {
        console.log("Rejecting transaction:", txId);
        
        const reason = prompt('Enter rejection reason:', 'Invalid request');
        if (reason === null) return;
        
        const txRef = db.collection('transactions').doc(txId);
        await txRef.update({
            status: 'rejected',
            reason: reason,
            rejectedAt: new Date().toISOString()
        });
        
        // Return balance for rejected withdrawals
        if (type === 'withdraw') {
            await db.collection('users').doc(targetUserId).update({
                [`balances.${currency}`]: firebase.firestore.FieldValue.increment(amount)
            });
            if (fee > 0) {
                await db.collection('users').doc(targetUserId).update({
                    [`balances.${feeCurrency}`]: firebase.firestore.FieldValue.increment(fee)
                });
            }
        }
        
        await addNotification(targetUserId, `❌ Your ${type} was rejected. Reason: ${reason}`, 'error');
        
        showToast('Transaction rejected!', 'success');
        
        const activeTab = document.querySelector('.admin-tab.active').textContent.toLowerCase();
        showAdminTab(activeTab);
        
    } catch (error) {
        console.error("Error rejecting transaction:", error);
        showToast('Error rejecting transaction', 'error');
    }
}

// ============================================
// 17. REALTIME LISTENERS (للطلبات المعلقة فقط)
// ============================================
function setupRealtimeListeners() {
    if (!db || !userData.userId) return;
    
    console.log("👂 Setting up real-time listeners for financial transactions...");
    
    // Listen for deposit status changes
    db.collection('transactions')
        .where('userId', '==', userData.userId)
        .where('status', 'in', ['approved', 'rejected'])
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'modified') {
                    const tx = change.doc.data();
                    
                    if (tx.status === 'approved') {
                        if (tx.type === 'deposit') {
                            userData.balances[tx.currency] = (userData.balances[tx.currency] || 0) + tx.amount;
                            showToast(`✅ Deposit of ${tx.amount} ${tx.currency} approved!`, 'success');
                        } else if (tx.type === 'withdraw') {
                            showToast(`✅ Withdrawal of ${tx.amount} ${tx.currency} approved!`, 'success');
                        }
                    } else if (tx.status === 'rejected') {
                        showToast(`❌ Your ${tx.type} was rejected. Reason: ${tx.reason || 'No reason'}`, 'error');
                        
                        // Return balance for rejected withdrawals
                        if (tx.type === 'withdraw') {
                            userData.balances[tx.currency] = (userData.balances[tx.currency] || 0) + tx.amount;
                            if (tx.fee > 0) {
                                userData.balances[tx.feeCurrency] = (userData.balances[tx.feeCurrency] || 0) + tx.fee;
                            }
                        }
                    }
                    
                    // Update transaction in local array
                    const txIndex = userData.transactions.findIndex(t => t.id === tx.id);
                    if (txIndex >= 0) {
                        userData.transactions[txIndex] = tx;
                    } else {
                        userData.transactions.push(tx);
                    }
                    
                    saveUserData();
                    updateUI();
                }
            });
        });
}

// ============================================
// 18. NAVIGATION FUNCTIONS
// ============================================
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
    
    // Set default values
    document.getElementById('payCurrency').textContent = 'USDT';
    document.getElementById('payCurrencyIcon').src = CMC_ICONS.USDT;
    document.getElementById('receiveCurrency').textContent = 'REFI';
    document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.REFI;
    
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

function showHistory() {
    document.getElementById('historyModal').classList.add('show');
    renderHistory('all');
    animateElement('.modal-content', 'slideUpModal');
}

function showP2P() {
    document.getElementById('p2pModal').classList.add('show');
    animateElement('.p2p-icon', 'pulse');
    document.getElementById('p2pCountdown').textContent = '7 days';
}

function showAllAssets() {
    showToast('All assets view coming soon!', 'info');
}

function showAssetDetails(symbol) {
    const balance = userData.balances[symbol] || 0;
    const price = symbol === 'REFI' ? REFI_PRICE : (livePrices[symbol]?.price || 0);
    const value = symbol === 'USDT' ? balance : balance * price;
    
    showToast(`${symbol}: ${formatBalance(balance, symbol)} ($${formatNumber(value)})`, 'info');
}

function showCryptoDetails(symbol) {
    const price = livePrices[symbol]?.price || 0;
    const change = livePrices[symbol]?.change || 0;
    const changeSymbol = change >= 0 ? '+' : '';
    
    showToast(`${symbol}: $${formatNumber(price)} (${changeSymbol}${change.toFixed(2)}%)`, 'info');
}

function showStakingDetails(type) {
    const modal = document.getElementById('stakingDetailsModal');
    const body = document.getElementById('stakingDetailsBody');
    
    if (!modal || !body) return;
    
    if (type === 'total') {
        body.innerHTML = `
            <h4>Total Staked</h4>
            <p style="font-size: 24px; color: var(--pink-1); margin: 20px 0;">${document.getElementById('totalStaked').textContent}</p>
            <p>Your staked amount earns rewards based on the plan you choose.</p>
            <p style="margin-top: 15px; color: var(--text-secondary);">Rewards are calculated and credited after the staking period ends.</p>
        `;
    } else if (type === 'rewards') {
        body.innerHTML = `
            <h4>Rewards Earned</h4>
            <p style="font-size: 24px; color: var(--pink-1); margin: 20px 0;">${document.getElementById('rewardsEarned').textContent}</p>
            <p>Available rewards from completed stakes.</p>
            <p style="margin-top: 15px; color: var(--text-secondary);">Claim your rewards from the Active Stakes section.</p>
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

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function scrollToTop() {
    document.querySelector('.app-container').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// 19. EXPORT FUNCTIONS TO WINDOW
// ============================================
window.showWallet = showWallet;
window.showSwap = showSwap;
window.showStaking = showStaking;
window.showReferral = showReferral;
window.showDepositModal = showDepositModal;
window.showWithdrawModal = showWithdrawModal;
window.showHistory = showHistory;
window.showP2P = showP2P;
window.showNotifications = showNotifications;
window.showCurrencySelector = showCurrencySelector;
window.selectCurrency = selectCurrency;
window.filterCurrencies = filterCurrencies;
window.calculateSwap = calculateSwap;
window.confirmSwap = confirmSwap;
window.setMaxAmount = setMaxAmount;
window.swapDirection = swapDirection;
window.updateDepositInfo = updateDepositInfo;
window.copyDepositAddress = copyDepositAddress;
window.submitDeposit = submitDeposit;
window.checkWithdrawFee = checkWithdrawFee;
window.submitWithdraw = submitWithdraw;
window.updateWithdrawIcon = updateWithdrawIcon;
window.refreshPrices = refreshPrices;
window.filterHistory = filterHistory;
window.closeModal = closeModal;
window.scrollToTop = scrollToTop;
window.showAllAssets = showAllAssets;
window.showAssetDetails = showAssetDetails;
window.showCryptoDetails = showCryptoDetails;
window.showStakingDetails = showStakingDetails;
window.selectStakingPlan = selectStakingPlan;
window.calculateStakingReturn = calculateStakingReturn;
window.stakeUSDT = stakeUSDT;
window.claimStakingReward = claimStakingReward;
window.claimStakingMission = claimStakingMission;
window.copyReferralLink = copyReferralLink;
window.shareReferral = shareReferral;
window.claimReferralMilestone = claimReferralMilestone;
window.closeAdminPanel = closeAdminPanel;
window.showAdminTab = showAdminTab;
window.approveTransaction = approveTransaction;
window.rejectTransaction = rejectTransaction;
window.copyToClipboard = copyToClipboard;

console.log("✅ REFI Wallet v10.0 loaded successfully!");
