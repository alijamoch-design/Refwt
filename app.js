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
    BONK: 'https://s2.coinmarketcap.com/static/img/coins/64x64/23095.png',
    TRUMP: 'https://s2.coinmarketcap.com/static/img/coins/64x64/28382.png'
};

// ====== الروابط الثابتة ======
const BOT_LINK = "https://t.me/RealnetworkPaybot/Refi";
const ADMIN_ID = "1653918641";
const DEPOSIT_ADDRESS = "0xbf70420f57342c6Bd4267430D4D3b7E946f09450";
const SWAP_RATE = 500000; // 1 USDT = 500,000 REFI
const REFERRAL_BONUS = 250000; // REFI per referral
const REFI_PRICE = 0.000002; // سعر REFI الثابت

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
    BONK: 'bonk',
    TRUMP: 'official-trump'
};

// خطط الستيكينغ المحسنة
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

// قائمة العملات
const TOP_CRYPTOS = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'TON', name: 'Toncoin' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'PEPE', name: 'Pepe' },
    { symbol: 'BONK', name: 'Bonk' },
    { symbol: 'TRUMP', name: 'Trump Coin' }
];

// جميع العملات المتاحة للاختيار
const ALL_CURRENCIES = [
    { symbol: 'USDT', name: 'Tether', icon: CMC_ICONS.USDT },
    { symbol: 'REFI', name: 'REFI Network', icon: CMC_ICONS.REFI },
    { symbol: 'BNB', name: 'Binance Coin', icon: CMC_ICONS.BNB },
    { symbol: 'BTC', name: 'Bitcoin', icon: CMC_ICONS.BTC },
    { symbol: 'ETH', name: 'Ethereum', icon: CMC_ICONS.ETH },
    { symbol: 'SOL', name: 'Solana', icon: CMC_ICONS.SOL },
    { symbol: 'TON', name: 'Toncoin', icon: CMC_ICONS.TON },
    { symbol: 'ADA', name: 'Cardano', icon: CMC_ICONS.ADA },
    { symbol: 'DOGE', name: 'Dogecoin', icon: CMC_ICONS.DOGE },
    { symbol: 'SHIB', name: 'Shiba Inu', icon: CMC_ICONS.SHIB },
    { symbol: 'PEPE', name: 'Pepe', icon: CMC_ICONS.PEPE },
    { symbol: 'BONK', name: 'Bonk', icon: CMC_ICONS.BONK },
    { symbol: 'TRUMP', name: 'Trump Coin', icon: CMC_ICONS.TRUMP }
];

// ====== State Management ======
let userData = null;
let selectedStakingPlan = STAKING_PLANS[0];
let swapMode = 'usdt-to-refi';
let livePrices = {};
let unreadNotifications = 0;
let currentCurrencySelector = 'pay';
let currentHistoryFilter = 'all';

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
    }, 2000);
    
    loadUserData();
    renderStakingPlans();
    setupScrollListener();
    startLivePrices();
    setupPullToRefresh();
    
    if (isAdmin()) {
        addAdminCrown();
    }
});

// ====== Load User Data ======
async function loadUserData() {
    try {
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
                    ADA: 0,
                    DOGE: 0,
                    SHIB: 0,
                    PEPE: 0,
                    TON: 0,
                    BONK: 0,
                    TRUMP: 0
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
                lastLogin: new Date().toISOString(),
                createdAt: new Date().toISOString()
            };
            localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        }
        
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
            
            setupRealtimeListeners();
        }
        
        updateUI();
        await processReferral();
        updateNotificationBadge();
    } catch (error) {
        console.error("Error loading user data:", error);
        showToast('Error loading data', 'error');
    }
}

// ====== Generate Unique Referral Code ======
function generateReferralCode() {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const userPart = userId.substring(0, 4).toUpperCase();
    return `REF${randomPart}${userPart}`;
}

// ====== Get Full Referral Link ======
function getReferralLink() {
    return `${BOT_LINK}?start=${userData.referralCode}`;
}

// ====== Process Referral (محمي بالكامل) ======
async function processReferral() {
    try {
        console.log("🔍 Checking for referral...");
        
        // استخراج كود الإحالة من مصادر متعددة
        const urlParams = new URLSearchParams(window.location.search);
        let referralCode = urlParams.get('start') || urlParams.get('ref');
        
        // من Telegram WebApp
        if (!referralCode && tg.initDataUnsafe?.start_param) {
            referralCode = tg.initDataUnsafe.start_param;
        }
        
        console.log("📌 Referral code found:", referralCode);
        
        // التحقق من وجود كود إحالة صالح
        if (!referralCode) {
            console.log("❌ No referral code found");
            return;
        }
        
        if (referralCode === userData.referralCode) {
            console.log("❌ Self-referral not allowed");
            return;
        }
        
        if (userData.referredBy) {
            console.log("❌ User already referred by:", userData.referredBy);
            return;
        }
        
        // التحقق من Firebase
        if (!db) {
            console.log("❌ Firebase not available");
            return;
        }
        
        console.log("🔍 Searching for referrer with code:", referralCode);
        
        // البحث عن صاحب كود الإحالة
        const referrerQuery = await db.collection('users')
            .where('referralCode', '==', referralCode)
            .limit(1)
            .get();
        
        if (referrerQuery.empty) {
            console.log("❌ Invalid referral code - no referrer found");
            return;
        }
        
        const referrerDoc = referrerQuery.docs[0];
        const referrerId = referrerDoc.id;
        const referrerData = referrerDoc.data();
        
        console.log("✅ Referrer found:", referrerId);
        
        // منع إحالة النفس (تأكيد إضافي)
        if (referrerId === userId) {
            console.log("❌ Self-referral detected");
            return;
        }
        
        // التحقق من عدم تكرار الإحالة
        if (referrerData.referrals && referrerData.referrals.includes(userId)) {
            console.log("❌ User already referred by this code");
            return;
        }
        
        // ✅ كل شيء تمام - نطبق الإحالة
        console.log("✅ Valid referral! Processing bonus...");
        
        // تحديث بيانات المُحيل
        const updatedReferrals = [...(referrerData.referrals || []), userId];
        const updatedReferralCount = (referrerData.referralCount || 0) + 1;
        const updatedRefiBalance = (referrerData.balances?.REFI || 0) + REFERRAL_BONUS;
        
        await db.collection('users').doc(referrerId).update({
            referrals: updatedReferrals,
            referralCount: updatedReferralCount,
            'balances.REFI': updatedRefiBalance,
            totalRefiEarned: (referrerData.totalRefiEarned || 0) + REFERRAL_BONUS,
            lastReferral: new Date().toISOString()
        });
        
        // تحديث بيانات المستخدم الجديد
        userData.referredBy = referralCode;
        userData.balances.REFI = (userData.balances.REFI || 0) + 10000; // مكافأة ترحيبية
        
        // حفظ في localStorage
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        
        // تحديث في Firebase
        await db.collection('users').doc(userId).update({
            referredBy: referralCode,
            'balances.REFI': userData.balances.REFI
        });
        
        // إضافة معاملة للإحالة
        const referralTransaction = {
            userId: userId,
            type: 'referral',
            amount: 10000,
            currency: 'REFI',
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: `Welcome bonus from referral`
        };
        
        userData.transactions.push(referralTransaction);
        await db.collection('transactions').add(referralTransaction);
        
        // إضافة معاملة للمُحيل
        const referrerTransaction = {
            userId: referrerId,
            type: 'referral',
            amount: REFERRAL_BONUS,
            currency: 'REFI',
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: `Referral bonus from ${userId}`
        };
        await db.collection('transactions').add(referrerTransaction);
        
        // إرسال إشعار للمُحيل
        await addNotification(referrerId, `🎉 Someone joined with your link! You got ${REFERRAL_BONUS.toLocaleString()} REFI!`);
        
        // إضافة إشعار للمستخدم الجديد
        await addNotification(userId, `🎉 Welcome! You got 10,000 REFI bonus from referral!`);
        
        showToast(`🎉 Welcome! You got 10,000 REFI bonus from referral!`, 'success');
        
        // تحديث الواجهة
        updateUI();
        
    } catch (error) {
        console.error("Error processing referral:", error);
    }
}

// ====== Add Notification ======
async function addNotification(userId, message, type = 'info') {
    if (!db) return;
    
    const notification = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        message: message,
        type: type,
        read: false,
        timestamp: new Date().toISOString()
    };
    
    try {
        await db.collection('users').doc(userId).update({
            notifications: firebase.firestore.FieldValue.arrayUnion(notification)
        });
        
        // إذا كانت للمستخدم الحالي، نحدث الواجهة
        if (userId === userData?.userId) {
            userData.notifications = userData.notifications || [];
            userData.notifications.push(notification);
            updateNotificationBadge();
            
            // عرض إشعار فوري للمستخدم
            if (type === 'success') {
                showToast(message, 'success');
            } else if (type === 'error') {
                showToast(message, 'error');
            }
        }
    } catch (error) {
        console.error("Error adding notification:", error);
    }
}

// ====== Copy Referral Link ======
function copyReferralLink() {
    const link = getReferralLink();
    navigator.clipboard.writeText(link);
    showToast('✅ Referral link copied!', 'success');
    animateElement('.copy-btn', 'pop');
}

// ====== Share Referral ======
function shareReferral() {
    const link = getReferralLink();
    const text = `🚀 Join REFI Network and get 10,000 REFI bonus! Use my link: ${link}`;
    
    if (tg.shareToStory) {
        tg.shareToStory(text);
    } else {
        navigator.clipboard.writeText(text);
        showToast('📋 Referral message copied!', 'success');
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
            
            // تحديث الإشعارات
            if (fbData.notifications) {
                const oldCount = unreadNotifications;
                userData.notifications = fbData.notifications;
                unreadNotifications = fbData.notifications.filter(n => !n.read).length;
                if (oldCount !== unreadNotifications) {
                    updateNotificationBadge();
                }
            }
        }
    });
    
    // استماع للمعاملات الجديدة
    db.collection('transactions')
        .where('userId', '==', userId)
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const tx = change.doc.data();
                    if (tx.status === 'approved' || tx.status === 'completed') {
                        addNotification(userId, `✅ Your ${tx.type} of ${tx.amount} ${tx.currency} has been approved!`, 'success');
                    } else if (tx.status === 'rejected') {
                        const reason = tx.reason || 'No reason provided';
                        addNotification(userId, `❌ Your ${tx.type} of ${tx.amount} ${tx.currency} was rejected. Reason: ${reason}`, 'error');
                    }
                }
            });
            loadUserData(); // إعادة تحميل البيانات
        });
}

// ====== Start Live Prices ======
function startLivePrices() {
    fetchLivePrices();
    setInterval(fetchLivePrices, 60000); // كل دقيقة
}

// ====== Fetch Live Prices ======
async function fetchLivePrices() {
    try {
        const ids = Object.values(CRYPTO_IDS).join(',');
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();
        
        for (const [symbol, id] of Object.entries(CRYPTO_IDS)) {
            if (data[id]) {
                livePrices[symbol] = {
                    price: data[id].usd,
                    change: data[id].usd_24h_change || 0
                };
            }
        }
        
        renderTopCryptos();
        renderAssets();
        updateTotalBalance();
    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

// ====== Refresh Prices ======
function refreshPrices() {
    animateElement('.refresh-btn', 'pop');
    fetchLivePrices();
    showToast('Prices updated!', 'success');
}

// ====== Setup Pull to Refresh ======
function setupPullToRefresh() {
    const container = document.querySelector('.app-container');
    let startY = 0;
    
    container.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    container.addEventListener('touchmove', (e) => {
        if (container.scrollTop === 0 && e.touches[0].clientY - startY > 50) {
            // سحب لأسفل
            showToast('Release to refresh', 'info');
        }
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        if (container.scrollTop === 0 && e.changedTouches[0].clientY - startY > 50) {
            refreshPrices();
            loadUserData();
        }
    });
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
            <div class="plan-min">Min: ${plan.minAmount} USDT</div>
        </div>
    `).join('');
}

// ====== Render Staking Missions ======
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

// ====== Render Referral Milestones ======
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

// ====== Render History ======
function renderHistory(filter = 'all') {
    const historyList = document.getElementById('historyList');
    if (!historyList || !userData) return;
    
    currentHistoryFilter = filter;
    
    let transactions = [...userData.transactions].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );
    
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
        } else if (tx.type === 'referral') {
            icon = 'fa-users';
            typeClass = 'referral';
            typeText = 'Referral Bonus';
        } else if (tx.type === 'staking') {
            icon = 'fa-lock';
            typeClass = 'staking';
            typeText = 'Staking Reward';
        } else if (tx.type === 'swap') {
            icon = 'fa-arrow-right-arrow-left';
            typeClass = 'swap';
            typeText = 'Swap';
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
                ${tx.txnId ? `<div style="font-size: 10px; color: var(--text-tertiary); margin-top: 5px;">ID: ${tx.txnId.substring(0, 16)}...</div>` : ''}
                ${tx.address ? `<div style="font-size: 10px; color: var(--text-tertiary); margin-top: 5px;">To: ${tx.address.substring(0, 16)}...</div>` : ''}
                ${tx.reason ? `<div style="font-size: 10px; color: var(--danger); margin-top: 5px;">Reason: ${tx.reason}</div>` : ''}
            </div>
        `;
    }).join('');
}

// ====== Filter History ======
function filterHistory(filter) {
    document.querySelectorAll('.history-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    renderHistory(filter);
}

// ====== Render Notifications ======
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
    
    // ترتيب من الأحدث للأقدم
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

// ====== Mark Notification as Read ======
async function markNotificationRead(notificationId) {
    if (!userData.notifications) return;
    
    const notification = userData.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
        notification.read = true;
        unreadNotifications--;
        updateNotificationBadge();
        
        if (db) {
            await db.collection('users').doc(userId).update({
                notifications: userData.notifications
            });
        }
        
        renderNotifications();
    }
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
    
    const now = new Date();
    const rewards = userData.staking.reduce((sum, stake) => {
        const endDate = new Date(stake.endDate);
        if (endDate < now && !stake.claimed) {
            return sum + (stake.amount * stake.plan.return / 100);
        }
        return sum;
    }, 0);
    
    document.getElementById('rewardsEarned').textContent = rewards.toFixed(2) + ' USDT';
    document.getElementById('stakeBalance').textContent = `Balance: $${userData.balances.USDT?.toFixed(2) || '0.00'} USDT`;
    document.getElementById('activeStakesCount').textContent = userData.staking.length;
    
    if (userData.staking.length > 0) {
        const avgReturn = userData.staking.reduce((sum, stake) => sum + stake.plan.return, 0) / userData.staking.length;
        document.getElementById('avgReturn').textContent = avgReturn.toFixed(0) + '%';
    }
    
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

// ====== Claim Staking Reward ======
function claimStakingReward(startDate) {
    const stake = userData.staking.find(s => s.startDate === startDate);
    if (!stake || stake.claimed) return;
    
    const reward = stake.amount * stake.plan.return / 100;
    userData.balances.USDT += reward;
    stake.claimed = true;
    
    // إضافة معاملة
    const transaction = {
        userId: userId,
        type: 'staking',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staking reward for ${stake.plan.name}`
    };
    
    userData.transactions.push(transaction);
    
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            staking: userData.staking,
            transactions: userData.transactions
        });
        db.collection('transactions').add(transaction);
    }
    
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    showToast(`Claimed ${reward.toFixed(2)} USDT rewards!`, 'success');
    updateStakingStats();
    updateUI();
}

// ====== Update Referral Stats ======
function updateReferralStats() {
    if (!userData) return;
    
    document.getElementById('totalReferrals').textContent = userData.referralCount || 0;
    document.getElementById('refiEarned').textContent = ((userData.referralCount || 0) * REFERRAL_BONUS).toLocaleString() + ' REFI';
    document.getElementById('usdtEarned').textContent = (userData.totalUsdtEarned || 0).toFixed(2) + ' USDT';
    
    const referralLinkInput = document.getElementById('referralLink');
    if (referralLinkInput) {
        referralLinkInput.value = getReferralLink();
    }
}

// ====== Update Swap Balances ======
function updateSwapBalances() {
    if (!userData) return;
    
    if (swapMode === 'usdt-to-refi') {
        document.getElementById('payBalance').textContent = `Balance: $${(userData.balances.USDT || 0).toFixed(2)} USDT`;
        document.getElementById('receiveBalance').textContent = `Balance: ${(userData.balances.REFI || 0).toLocaleString()} REFI`;
    } else {
        document.getElementById('payBalance').textContent = `Balance: ${(userData.balances.REFI || 0).toLocaleString()} REFI`;
        document.getElementById('receiveBalance').textContent = `Balance: $${(userData.balances.USDT || 0).toFixed(2)} USDT`;
    }
}

// ====== Update Notification Badge ======
function updateNotificationBadge() {
    const badge = document.querySelector('.badge');
    if (badge && userData) {
        unreadNotifications = userData.notifications?.filter(n => !n.read).length || 0;
        badge.textContent = unreadNotifications;
        badge.style.display = unreadNotifications > 0 ? 'block' : 'none';
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
    const returnAmount = (amount * selectedStakingPlan.return) / 100;
    const total = amount + returnAmount;
    
    document.getElementById('estimatedReturn').textContent = returnAmount.toFixed(2) + ' USDT';
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
    
    // إضافة معاملة
    const transaction = {
        userId: userId,
        type: 'staking',
        amount: amount,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staked for ${selectedStakingPlan.name}`
    };
    
    userData.transactions.push(transaction);
    
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            staking: userData.staking,
            transactions: userData.transactions
        });
        db.collection('transactions').add(transaction);
    }
    
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
    
    // إضافة معاملة
    const transaction = {
        userId: userId,
        type: 'staking',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staking mission reward for ${STAKING_PLANS.find(p => p.id === missionId).name}`
    };
    
    userData.transactions.push(transaction);
    
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            stakingMissions: userData.stakingMissions,
            transactions: userData.transactions
        });
        db.collection('transactions').add(transaction);
    }
    
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    showToast(`Claimed ${reward} USDT!`, 'success');
    renderStakingMissions();
    updateUI();
    animateElement('.mission-card', 'pop');
}

// ====== Claim Referral Milestone ======
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
    
    // إضافة معاملة
    const transaction = {
        userId: userId,
        type: 'referral',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Referral milestone: ${referrals} referrals`
    };
    
    userData.transactions.push(transaction);
    
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            totalUsdtEarned: userData.totalUsdtEarned,
            referralMilestones: userData.referralMilestones,
            transactions: userData.transactions
        });
        db.collection('transactions').add(transaction);
    }
    
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    showToast(`Claimed ${reward} USDT!`, 'success');
    updateReferralStats();
    renderReferralMilestones();
    updateUI();
    animateElement('.milestone-item', 'pop');
}

// ====== Show Currency Selector ======
function showCurrencySelector(type) {
    currentCurrencySelector = type;
    const modal = document.getElementById('currencySelectorModal');
    const currencyList = document.getElementById('currencyList');
    
    currencyList.innerHTML = ALL_CURRENCIES.map(curr => `
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

// ====== Select Currency ======
function selectCurrency(symbol) {
    if (currentCurrencySelector === 'pay') {
        document.getElementById('payCurrency').textContent = symbol;
        document.getElementById('payCurrencyIcon').src = CMC_ICONS[symbol];
        
        // تحديث وضع السواب
        if (symbol === 'USDT') {
            swapMode = 'usdt-to-refi';
            document.getElementById('receiveCurrency').textContent = 'REFI';
            document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.REFI;
        } else if (symbol === 'REFI') {
            swapMode = 'refi-to-usdt';
            document.getElementById('receiveCurrency').textContent = 'USDT';
            document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.USDT;
        }
    } else {
        document.getElementById('receiveCurrency').textContent = symbol;
        document.getElementById('receiveCurrencyIcon').src = CMC_ICONS[symbol];
        
        // تحديث وضع السواب
        if (symbol === 'USDT') {
            swapMode = 'refi-to-usdt';
            document.getElementById('payCurrency').textContent = 'REFI';
            document.getElementById('payCurrencyIcon').src = CMC_ICONS.REFI;
        } else if (symbol === 'REFI') {
            swapMode = 'usdt-to-refi';
            document.getElementById('payCurrency').textContent = 'USDT';
            document.getElementById('payCurrencyIcon').src = CMC_ICONS.USDT;
        }
    }
    
    closeModal('currencySelectorModal');
    calculateSwap();
    updateSwapBalances();
}

// ====== Filter Currencies ======
function filterCurrencies() {
    const searchTerm = document.getElementById('currencySearch').value.toLowerCase();
    const currencyList = document.getElementById('currencyList');
    
    const filtered = ALL_CURRENCIES.filter(curr => 
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

// ====== Flip Swap Pair ======
function flipSwapPair() {
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
    animateElement('.swap-flip-btn', 'pop');
}

// ====== Calculate Swap ======
function calculateSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value) || 0;
    
    if (swapMode === 'usdt-to-refi') {
        const receiveAmount = payAmount * SWAP_RATE;
        document.getElementById('receiveAmount').value = receiveAmount.toFixed(0);
    } else {
        const receiveAmount = payAmount / SWAP_RATE;
        document.getElementById('receiveAmount').value = receiveAmount.toFixed(6);
    }
    
    document.getElementById('refiPrice').textContent = '$' + REFI_PRICE;
}

// ====== Confirm Swap (معفى من الرسوم) ======
function confirmSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value);
    
    if (!payAmount || payAmount <= 0) {
        showToast('Please enter a valid amount', 'error');
        animateElement('#payAmount', 'shake');
        return;
    }
    
    if (swapMode === 'usdt-to-refi') {
        // USDT to REFI - مجاني
        if (!userData.balances.USDT || userData.balances.USDT < payAmount) {
            showToast('Insufficient USDT balance', 'error');
            return;
        }
        
        const receiveAmount = payAmount * SWAP_RATE;
        userData.balances.USDT -= payAmount;
        userData.balances.REFI += receiveAmount;
        
        // إضافة معاملة
        const transaction = {
            userId: userId,
            type: 'swap',
            amount: payAmount,
            currency: 'USDT',
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: `Swapped to ${receiveAmount.toLocaleString()} REFI`
        };
        
        userData.transactions.push(transaction);
        
        showToast(`Swapped $${payAmount} USDT to ${receiveAmount.toLocaleString()} REFI`, 'success');
    } else {
        // REFI to USDT - مجاني أيضاً (حسب طلبك)
        if (!userData.balances.REFI || userData.balances.REFI < payAmount) {
            showToast('Insufficient REFI balance', 'error');
            return;
        }
        
        const receiveAmount = payAmount / SWAP_RATE;
        userData.balances.REFI -= payAmount;
        userData.balances.USDT += receiveAmount;
        
        // إضافة معاملة
        const transaction = {
            userId: userId,
            type: 'swap',
            amount: payAmount,
            currency: 'REFI',
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: `Swapped to $${receiveAmount.toFixed(2)} USDT`
        };
        
        userData.transactions.push(transaction);
        
        showToast(`Swapped ${payAmount.toLocaleString()} REFI to $${receiveAmount.toFixed(2)} USDT`, 'success');
    }
    
    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            transactions: userData.transactions
        });
        db.collection('transactions').add(transaction);
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
    
    const countdown = document.getElementById('p2pCountdown');
    if (countdown) {
        countdown.textContent = '7 days';
    }
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

function showHistory() {
    document.getElementById('historyModal').classList.add('show');
    renderHistory('all');
    animateElement('.modal-content', 'slideUpModal');
}

function showNotifications() {
    document.getElementById('notificationsModal').classList.add('show');
    renderNotifications();
    animateElement('.modal-content', 'slideUpModal');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function updateDepositIcon() {
    const currency = document.getElementById('depositCurrency').value;
    const icon = document.getElementById('depositIcon');
    if (icon) icon.src = CMC_ICONS[currency];
}

function updateWithdrawIcon() {
    const currency = document.getElementById('withdrawCurrency').value;
    const icon = document.getElementById('withdrawIcon');
    if (icon) icon.src = CMC_ICONS[currency];
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

// ====== دالة فحص رسوم السحب المعدلة ======
function checkWithdrawFee() {
    const currency = document.getElementById('withdrawCurrency').value;
    const feeWarning = document.getElementById('feeWarning');
    const networkFee = document.getElementById('networkFee');
    const receiveAmount = document.getElementById('receiveAmount_');
    const amount = parseFloat(document.getElementById('withdrawAmount').value) || 0;
    
    updateWithdrawIcon();
    
    // رسوم السحب حسب العملة
    if (currency === 'USDT') {
        feeWarning.classList.remove('hidden');
        feeWarning.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> USDT withdrawal requires 0.00016 BNB fee';
        networkFee.textContent = '0.00016 BNB';
        if (receiveAmount) receiveAmount.textContent = amount.toFixed(2) + ' USDT';
    } else if (currency === 'BNB') {
        feeWarning.classList.remove('hidden');
        feeWarning.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> BNB withdrawal requires 0.0005 BNB fee';
        networkFee.textContent = '0.0005 BNB';
        if (receiveAmount) receiveAmount.textContent = amount.toFixed(4) + ' BNB';
    } else {
        feeWarning.classList.add('hidden');
        networkFee.textContent = '0 BNB';
        if (receiveAmount) receiveAmount.textContent = amount.toFixed(6) + ' ' + currency;
    }
}

// ====== Submit Deposit ======
async function submitDeposit() {
    const currency = document.getElementById('depositCurrency').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const txnId = document.getElementById('txnId').value;
    
    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'error');
        return;
    }
    
    if (!txnId) {
        showToast('Please enter transaction ID', 'error');
        return;
    }
    
    let minAmount;
    switch(currency) {
        case 'REFI': minAmount = 500000; break;
        case 'USDT': minAmount = 10; break;
        case 'BNB': minAmount = 0.02; break;
        default: minAmount = 0;
    }
    
    if (amount < minAmount) {
        showToast(`Minimum deposit is ${minAmount} ${currency}`, 'error');
        return;
    }
    
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
            await addNotification(ADMIN_ID, `💰 New deposit request: ${amount} ${currency} from ${userId}`, 'info');
        }
        
        userData.transactions.push(depositRequest);
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        
        showToast('Deposit request submitted! Waiting for admin approval.', 'success');
        closeModal('depositModal');
        
        document.getElementById('depositAmount').value = '';
        document.getElementById('txnId').value = '';
    } catch (error) {
        console.error("Deposit error:", error);
        showToast('Failed to submit deposit request', 'error');
    }
}

// ====== Submit Withdraw (مع خصم الرسوم) ======
async function submitWithdraw() {
    const currency = document.getElementById('withdrawCurrency').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('walletAddress').value;
    
    if (!amount || amount <= 0 || !address) {
        showToast('Please fill all fields', 'error');
        return;
    }
    
    if (!userData.balances[currency] || userData.balances[currency] < amount) {
        showToast(`Insufficient ${currency} balance`, 'error');
        return;
    }
    
    // التحقق من رسوم السحب
    let fee = 0;
    let feeCurrency = 'BNB';
    
    if (currency === 'USDT') {
        fee = 0.00016;
        if (!userData.balances.BNB || userData.balances.BNB < fee) {
            showToast(`You need ${fee} BNB for withdrawal fee`, 'error');
            return;
        }
    } else if (currency === 'BNB') {
        fee = 0.0005;
        if (!userData.balances.BNB || userData.balances.BNB < (amount + fee)) {
            showToast(`Insufficient BNB balance including fee`, 'error');
            return;
        }
    }
    
    const withdrawRequest = {
        userId: userId,
        currency: currency,
        amount: amount,
        address: address,
        fee: fee,
        feeCurrency: feeCurrency,
        status: 'pending',
        timestamp: new Date().toISOString(),
        type: 'withdraw'
    };
    
    try {
        if (db) {
            await db.collection('transactions').add(withdrawRequest);
            await addNotification(ADMIN_ID, `💸 New withdrawal request: ${amount} ${currency} from ${userId}`, 'info');
        }
        
        showToast('Withdrawal request submitted! Waiting for admin approval.', 'success');
        closeModal('withdrawModal');
        
        document.getElementById('withdrawAmount').value = '';
        document.getElementById('walletAddress').value = '';
    } catch (error) {
        console.error("Withdraw error:", error);
        showToast('Failed to submit withdrawal request', 'error');
    }
}

// ====== Show Toast ======
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
    } else {
        icon.className = 'fa-regular fa-circle-info';
    }
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ====== Setup Scroll Listener ======
function setupScrollListener() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    const container = document.querySelector('.app-container');
    
    if (!scrollBtn || !container) return;
    
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

// ====== Show All Assets ======
function showAllAssets() {
    showToast('All assets view coming soon!', 'info');
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

// ====== Admin Functions المحسنة ======
function isAdmin() {
    return userId === ADMIN_ID;
}

function addAdminCrown() {
    setTimeout(() => {
        const header = document.querySelector('.header-actions');
        if (header) {
            // إزالة أي تاج موجود مسبقاً
            const existingCrown = document.getElementById('adminCrownBtn');
            if (existingCrown) existingCrown.remove();
            
            const adminBtn = document.createElement('button');
            adminBtn.id = 'adminCrownBtn';
            adminBtn.className = 'icon-btn';
            adminBtn.innerHTML = '<i class="fa-solid fa-crown" style="color: gold;"></i>';
            adminBtn.onclick = showAdminPanel;
            header.appendChild(adminBtn);
            console.log("👑 Admin crown added");
        }
    }, 1500);
}

// ====== Admin Panel المحسنة ======
function showAdminPanel() {
    if (!isAdmin()) {
        showToast('Access denied', 'error');
        return;
    }
    
    console.log("👑 Opening admin panel...");
    
    if (!db) {
        showToast('Firebase not connected', 'error');
        return;
    }
    
    // جلب جميع المعاملات المعلقة
    db.collection('transactions').where('status', '==', 'pending').get()
        .then(snapshot => {
            const pending = [];
            snapshot.forEach(doc => {
                pending.push({ id: doc.id, ...doc.data() });
            });
            
            if (pending.length === 0) {
                tg.showPopup({
                    title: '👑 Admin Panel',
                    message: 'No pending transactions',
                    buttons: [{ type: 'close' }]
                });
                return;
            }
            
            // عرض كل معاملة مع خيارات الموافقة/الرفض
            showTransactionActions(pending, 0);
        })
        .catch(error => {
            console.error("Error loading admin panel:", error);
            showToast('Error loading transactions: ' + error.message, 'error');
            
            tg.showPopup({
                title: '❌ Error',
                message: 'Failed to load transactions. Check console.',
                buttons: [{ type: 'close' }]
            });
        });
}

// ====== عرض المعاملات مع خيارات الموافقة/الرفض ======
function showTransactionActions(transactions, index) {
    if (index >= transactions.length) {
        tg.showPopup({
            title: '✅ Done',
            message: 'All transactions processed!',
            buttons: [{ type: 'close' }]
        });
        return;
    }
    
    const tx = transactions[index];
    const message = `
📋 **Transaction ${index + 1}/${transactions.length}**

Type: ${tx.type.toUpperCase()}
Amount: ${tx.amount} ${tx.currency}
User: ${tx.userId}
Time: ${new Date(tx.timestamp).toLocaleString()}
${tx.txnId ? `TXID: ${tx.txnId}` : ''}
${tx.address ? `Address: ${tx.address}` : ''}
${tx.fee ? `Fee: ${tx.fee} ${tx.feeCurrency}` : ''}
    `;
    
    tg.showPopup({
        title: '👑 Admin Action Required',
        message: message,
        buttons: [
            { type: 'default', text: '✅ Approve', id: 'approve' },
            { type: 'default', text: '❌ Reject', id: 'reject' },
            { type: 'cancel', text: '⏭️ Skip' }
        ]
    }, (btnId) => {
        if (btnId === 'approve') {
            approveTransaction(tx.id, tx.userId, tx.type, tx.currency, tx.amount, tx.fee, tx.feeCurrency);
            setTimeout(() => showTransactionActions(transactions, index + 1), 500);
        } else if (btnId === 'reject') {
            promptRejectReason(tx.id, tx.userId);
            setTimeout(() => showTransactionActions(transactions, index + 1), 500);
        } else {
            // Skip
            showTransactionActions(transactions, index + 1);
        }
    });
}

// ====== الموافقة على المعاملة ======
async function approveTransaction(txId, targetUserId, type, currency, amount, fee, feeCurrency) {
    try {
        // تحديث حالة المعاملة
        await db.collection('transactions').doc(txId).update({
            status: 'approved',
            approvedAt: new Date().toISOString()
        });
        
        if (type === 'deposit') {
            // إضافة الرصيد للمستخدم
            const userRef = db.collection('users').doc(targetUserId);
            await userRef.update({
                [`balances.${currency}`]: firebase.firestore.FieldValue.increment(amount)
            });
            
            await addNotification(targetUserId, `✅ Your deposit of ${amount} ${currency} has been approved!`, 'success');
            
        } else if (type === 'withdraw') {
            // خصم الرصيد والرسوم
            const userRef = db.collection('users').doc(targetUserId);
            
            // خصم المبلغ المسحوب
            await userRef.update({
                [`balances.${currency}`]: firebase.firestore.FieldValue.increment(-amount)
            });
            
            // خصم الرسوم إذا موجودة
            if (fee && feeCurrency) {
                await userRef.update({
                    [`balances.${feeCurrency}`]: firebase.firestore.FieldValue.increment(-fee)
                });
            }
            
            const feeText = fee ? ` (Fee: ${fee} ${feeCurrency})` : '';
            await addNotification(targetUserId, `✅ Your withdrawal of ${amount} ${currency} has been approved${feeText}!`, 'success');
        }
        
        showToast(`Transaction approved!`, 'success');
        
    } catch (error) {
        console.error("Error approving transaction:", error);
        showToast('Error approving transaction', 'error');
    }
}

// ====== طلب سبب الرفض ======
function promptRejectReason(txId, targetUserId) {
    tg.showPopup({
        title: '❌ Reject Transaction',
        message: 'Please enter reason for rejection:',
        buttons: [
            { type: 'default', text: 'Invalid TXID' },
            { type: 'default', text: 'Wrong amount' },
            { type: 'default', text: 'Suspicious activity' },
            { type: 'cancel', text: 'Cancel' }
        ]
    }, (btnId) => {
        let reason = 'No reason provided';
        if (btnId === 'ok') reason = 'Invalid TXID';
        else if (btnId === 'ok_2') reason = 'Wrong amount';
        else if (btnId === 'ok_3') reason = 'Suspicious activity';
        else return;
        
        rejectTransaction(txId, targetUserId, reason);
    });
}

// ====== رفض المعاملة ======
async function rejectTransaction(txId, targetUserId, reason) {
    try {
        await db.collection('transactions').doc(txId).update({
            status: 'rejected',
            reason: reason,
            rejectedAt: new Date().toISOString()
        });
        
        await addNotification(targetUserId, `❌ Your transaction was rejected. Reason: ${reason}`, 'error');
        
        showToast(`Transaction rejected!`, 'success');
        
    } catch (error) {
        console.error("Error rejecting transaction:", error);
        showToast('Error rejecting transaction', 'error');
    }
}
