// Firebase Configuration
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
let firebaseApp, db, auth;
try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    console.log("🔥 Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// Constants
const ADMIN_ID = 1653918641;
const DEPOSIT_ADDRESS = "0xbf70420f57342c6Bd4267430D4D3b7E946f09450";
const SWAP_RATE = 500000; // 1 USDT = 500,000 REFI
const REFERRAL_BONUS = 250000; // REFI per referral

// Staking Plans
const STAKING_PLANS = [
    { id: '3days', days: 3, return: 40, name: '3 Days', reward: 5 },
    { id: '7days', days: 7, return: 50, name: '7 Days', reward: 20 },
    { id: '15days', days: 15, return: 70, name: '15 Days', reward: 30 },
    { id: '30days', days: 30, return: 100, name: '30 Days', reward: 50 }
];

// Staking Missions
const STAKING_MISSIONS = [
    { id: '3days', plan: '3 Days', reward: 5, claimed: false },
    { id: '7days', plan: '7 Days', reward: 20, claimed: false },
    { id: '15days', plan: '15 Days', reward: 30, claimed: false },
    { id: '30days', plan: '30 Days', reward: 50, claimed: false }
];

// Referral Milestones
const REFERRAL_MILESTONES = [
    { referrals: 10, reward: 50, unit: 'USDT', claimed: false },
    { referrals: 25, reward: 120, unit: 'USDT', claimed: false },
    { referrals: 50, reward: 250, unit: 'USDT', claimed: false },
    { referrals: 100, reward: 500, unit: 'USDT', claimed: false },
    { referrals: 250, reward: 1000, unit: 'USDT', claimed: false }
];

// Fixed prices for top cryptocurrencies
const CRYPTO_PRICES = {
    'REFI': 0.000002,
    'USDT': 1.00,
    'BNB': 310.00,
    'BTC': 43250.00,
    'ETH': 2250.00,
    'XRP': 0.55,
    'ADA': 0.35,
    'SOL': 95.00,
    'DOGE': 0.08,
    'DOT': 6.50
};

// State management
let currentUser = null;
let userData = null;
let selectedStakingPlan = STAKING_PLANS[0];
let swapMode = 'usdt-to-refi'; // 'usdt-to-refi' or 'refi-to-usdt'

// Initialize Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();
tg.enableClosingConfirmation();

// Get user data from Telegram
const userId = tg.initDataUnsafe?.user?.id?.toString() || 'guest_' + Math.random().toString(36).substr(2, 9);
document.getElementById('userId').textContent = tg.initDataUnsafe?.user?.first_name || 'REFI User';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    renderAssets();
    renderStakingPlans();
    renderStakingMissions();
    renderReferralMilestones();
    updateTotalBalance();
});

// Load user data from localStorage and Firebase
async function loadUserData() {
    try {
        // Load from localStorage first
        const localData = localStorage.getItem(`user_${userId}`);
        if (localData) {
            userData = JSON.parse(localData);
        } else {
            // Initialize new user
            userData = {
                userId: userId,
                balances: {
                    REFI: 0,
                    USDT: 0,
                    BNB: 0,
                    BTC: 0,
                    ETH: 0,
                    XRP: 0,
                    ADA: 0,
                    SOL: 0,
                    DOGE: 0,
                    DOT: 0
                },
                referralCode: generateReferralCode(),
                referredBy: null,
                referrals: [],
                referralCount: 0,
                staking: [],
                stakingMissions: STAKING_MISSIONS.map(m => ({ ...m, claimed: false })),
                referralMilestones: REFERRAL_MILESTONES.map(m => ({ ...m, claimed: false })),
                transactions: [],
                totalRefiEarned: 0,
                totalUsdtEarned: 0
            };
            localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        }
        
        // Load from Firebase if available
        if (db) {
            const userDoc = await db.collection('users').doc(userId).get();
            if (userDoc.exists) {
                const fbData = userDoc.data();
                userData = { ...userData, ...fbData };
                localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
            } else {
                await db.collection('users').doc(userId).set(userData);
            }
        }
        
        updateUI();
        checkReferral();
    } catch (error) {
        console.error("Error loading user data:", error);
    }
}

// Generate referral code
function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase() + userId.substring(0, 4);
}

// Update UI
function updateUI() {
    updateTotalBalance();
    updateStakingStats();
    updateReferralStats();
    updateSwapBalances();
    renderAssets();
}

// Render assets list
function renderAssets() {
    const assetsList = document.getElementById('assetsList');
    if (!assetsList || !userData) return;
    
    const assets = [
        { symbol: 'REFI', name: 'REFI Network', change: '+0.5%', icon: 'refi' },
        { symbol: 'USDT', name: 'Tether', change: '0%', icon: 'usdt' },
        { symbol: 'BNB', name: 'BNB', change: '+1.2%', icon: 'bnb' }
    ];
    
    assetsList.innerHTML = assets.map(asset => {
        const balance = userData.balances[asset.symbol] || 0;
        const price = CRYPTO_PRICES[asset.symbol] || 0;
        const value = asset.symbol === 'USDT' ? balance : balance * price;
        
        return `
            <div class="asset-item">
                <div class="asset-left">
                    <div class="asset-icon icon-${asset.icon}">
                        ${asset.symbol.charAt(0)}
                    </div>
                    <div class="asset-info">
                        <h4>${asset.name}</h4>
                        <p>
                            ${asset.symbol}  
                            <span class="asset-change">${asset.change}</span>
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

// Format balance
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

// Format number
function formatNumber(num) {
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
}

// Update total balance
function updateTotalBalance() {
    if (!userData) return;
    
    let total = 0;
    total += userData.balances.USDT || 0;
    total += (userData.balances.REFI || 0) * CRYPTO_PRICES.REFI;
    total += (userData.balances.BNB || 0) * CRYPTO_PRICES.BNB;
    
    document.getElementById('totalBalance').textContent = '$' + total.toFixed(2);
}

// Navigation functions
function showWallet() {
    document.getElementById('walletSection').classList.remove('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(1)').classList.add('active');
    
    renderAssets();
    updateTotalBalance();
}

function showSwap() {
    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.remove('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(2)').classList.add('active');
    
    updateSwapBalances();
}

function showStaking() {
    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.remove('hidden');
    document.getElementById('referralSection').classList.add('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(3)').classList.add('active');
    
    updateStakingUI();
}

function showReferral() {
    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.remove('hidden');
    
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(4)').classList.add('active');
    
    updateReferralUI();
}

// Render staking plans
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

// Render staking missions
function renderStakingMissions() {
    const missionsGrid = document.getElementById('stakingMissions');
    if (!missionsGrid || !userData) return;
    
    missionsGrid.innerHTML = userData.stakingMissions.map(mission => {
        const completed = mission.claimed;
        return `
            <div class="mission-card">
                <div class="mission-info">
                    <h4>First ${mission.plan} Stake</h4>
                    <p>Complete your first ${mission.plan} staking</p>
                </div>
                <div class="mission-reward">${mission.reward} USDT</div>
                <button class="claim-btn ${completed ? 'completed' : ''}" 
                        onclick="claimStakingMission('${mission.id}')"
                        ${completed ? 'disabled' : ''}>
                    ${completed ? 'Claimed' : 'Claim'}
                </button>
            </div>
        `;
    }).join('');
}

// Render referral milestones
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

// Select staking plan
function selectStakingPlan(planId) {
    selectedStakingPlan = STAKING_PLANS.find(p => p.id === planId);
    renderStakingPlans();
    document.getElementById('lockPeriod').textContent = selectedStakingPlan.name;
    calculateStakingReturn();
}

// Calculate staking return
function calculateStakingReturn() {
    const amount = parseFloat(document.getElementById('stakeAmount').value) || 0;
    const return_amount = (amount * selectedStakingPlan.return) / 100;
    document.getElementById('estimatedReturn').textContent = return_amount.toFixed(2) + ' USDT';
}

// Stake USDT
function stakeUSDT() {
    const amount = parseFloat(document.getElementById('stakeAmount').value);
    
    if (!amount || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (!userData.balances.USDT || userData.balances.USDT < amount) {
        showNotification('Insufficient USDT balance', 'error');
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
    
    // Check staking missions
    userData.stakingMissions = userData.stakingMissions.map(mission => {
        if (mission.id === selectedStakingPlan.id && !mission.claimed) {
            // Mark as completed but not claimed yet
            mission.completed = true;
        }
        return mission;
    });
    
    // Save
    saveUserData();
    
    showNotification(`Successfully staked ${amount} USDT for ${selectedStakingPlan.days} days!`, 'success');
    updateStakingUI();
}

// Claim staking mission
function claimStakingMission(missionId) {
    const mission = userData.stakingMissions.find(m => m.id === missionId);
    
    if (!mission || mission.claimed) return;
    
    // Check if user has completed this staking plan
    const hasStaked = userData.staking.some(s => s.plan.id === missionId);
    
    if (!hasStaked) {
        showNotification(`You need to complete a ${mission.plan} stake first!`, 'error');
        return;
    }
    
    // Add reward
    userData.balances.USDT += mission.reward;
    mission.claimed = true;
    
    saveUserData();
    showNotification(`Claimed ${mission.reward} USDT!`, 'success');
    renderStakingMissions();
    updateUI();
}

// Claim referral milestone
function claimReferralMilestone(referrals) {
    const milestone = userData.referralMilestones.find(m => m.referrals === referrals);
    
    if (!milestone || milestone.claimed) return;
    
    if (userData.referralCount < referrals) {
        showNotification(`You need ${referrals} referrals to claim this!`, 'error');
        return;
    }
    
    // Add reward
    userData.balances.USDT += milestone.reward;
    userData.totalUsdtEarned += milestone.reward;
    milestone.claimed = true;
    
    saveUserData();
    showNotification(`Claimed ${milestone.reward} USDT!`, 'success');
    updateReferralUI();
    updateUI();
}

// Swap functions
function togglePayCurrency() {
    if (swapMode === 'usdt-to-refi') {
        swapMode = 'refi-to-usdt';
        document.getElementById('payCurrency').textContent = 'REFI';
        document.getElementById('receiveCurrency').textContent = 'USDT';
    } else {
        swapMode = 'usdt-to-refi';
        document.getElementById('payCurrency').textContent = 'USDT';
        document.getElementById('receiveCurrency').textContent = 'REFI';
    }
    calculateSwap();
    updateSwapBalances();
}

function toggleReceiveCurrency() {
    togglePayCurrency();
}

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
}

function confirmSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value);
    
    if (!payAmount || payAmount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (swapMode === 'usdt-to-refi') {
        // USDT to REFI
        if (!userData.balances.USDT || userData.balances.USDT < payAmount) {
            showNotification('Insufficient USDT balance', 'error');
            return;
        }
        
        const receiveAmount = payAmount * SWAP_RATE;
        userData.balances.USDT -= payAmount;
        userData.balances.REFI += receiveAmount;
        
        showNotification(`Swapped $${payAmount} USDT to ${receiveAmount.toLocaleString()} REFI`, 'success');
    } else {
        // REFI to USDT
        if (!userData.balances.REFI || userData.balances.REFI < payAmount) {
            showNotification('Insufficient REFI balance', 'error');
            return;
        }
        
        // Check BNB fee
        if (!userData.balances.BNB || userData.balances.BNB < 0.00016) {
            showNotification('You need 0.00016 BNB for swap fee', 'error');
            return;
        }
        
        const receiveAmount = payAmount / SWAP_RATE;
        userData.balances.REFI -= payAmount;
        userData.balances.USDT += receiveAmount;
        userData.balances.BNB -= 0.00016;
        
        showNotification(`Swapped ${payAmount.toLocaleString()} REFI to $${receiveAmount.toFixed(2)} USDT`, 'success');
    }
    
    saveUserData();
    document.getElementById('payAmount').value = '';
    document.getElementById('receiveAmount').value = '';
    updateSwapBalances();
    updateUI();
}

// Update staking stats
function updateStakingStats() {
    if (!userData) return;
    
    const totalStaked = userData.staking.reduce((sum, stake) => sum + stake.amount, 0);
    document.getElementById('totalStaked').textContent = totalStaked.toFixed(2) + ' USDT';
    
    // Calculate rewards (simplified)
    const rewards = userData.staking.reduce((sum, stake) => {
        if (new Date(stake.endDate) < new Date() && !stake.claimed) {
            return sum + (stake.amount * stake.plan.return / 100);
        }
        return sum;
    }, 0);
    
    document.getElementById('rewardsEarned').textContent = rewards.toFixed(2) + ' USDT';
    document.getElementById('stakeBalance').textContent = `Balance: $${userData.balances.USDT?.toFixed(2) || '0.00'} USDT`;
}

// Update referral stats
function updateReferralStats() {
    if (!userData) return;
    
    document.getElementById('totalReferrals').textContent = userData.referralCount || 0;
    document.getElementById('refiEarned').textContent = (userData.referralCount * REFERRAL_BONUS).toLocaleString() + ' REFI';
    document.getElementById('usdtEarned').textContent = userData.totalUsdtEarned?.toFixed(2) + ' USDT' || '0.00 USDT';
    
    const baseUrl = window.location.href.split('?')[0];
    document.getElementById('referralLink').textContent = `${baseUrl}?ref=${userData.referralCode}`;
}

// Update staking UI
function updateStakingUI() {
    updateStakingStats();
    renderStakingMissions();
}

// Update referral UI
function updateReferralUI() {
    updateReferralStats();
    renderReferralMilestones();
}

// Check for referral in URL
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
                    
                    // Update localStorage for referrer if they're online
                    localStorage.setItem(`user_${referrerId}`, JSON.stringify(referrerData));
                });
            });
        }
        
        saveUserData();
    }
}

// Copy referral link
function copyReferralLink() {
    const link = document.getElementById('referralLink').textContent;
    navigator.clipboard.writeText(link);
    showNotification('Referral link copied!', 'success');
}

// Modal functions
function showDepositModal() {
    document.getElementById('depositModal').classList.add('show');
}

function showWithdrawModal() {
    document.getElementById('withdrawModal').classList.add('show');
    checkWithdrawFee();
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function copyAddress() {
    navigator.clipboard.writeText(DEPOSIT_ADDRESS);
    showNotification('Address copied to clipboard!', 'success');
}

function updateDepositMin() {
    const currency = document.getElementById('depositCurrency').value;
    const amountInput = document.getElementById('depositAmount');
    
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
    
    if (currency === 'USDT') {
        feeWarning.classList.remove('hidden');
    } else {
        feeWarning.classList.add('hidden');
    }
}

// Submit deposit
async function submitDeposit() {
    const currency = document.getElementById('depositCurrency').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const txnId = document.getElementById('txnId').value;
    
    // Validation
    if (!amount || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    if (!txnId) {
        showNotification('Please enter transaction ID', 'error');
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
        showNotification(`Minimum deposit is ${minAmount} ${currency}`, 'error');
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
        }
        
        userData.transactions.push(depositRequest);
        saveUserData();
        
        showNotification('Deposit request submitted! Waiting for admin approval.', 'success');
        closeModal('depositModal');
        
        // Notify admin via Telegram
        if (tg.sendData) {
            tg.sendData(JSON.stringify({
                type: 'new_deposit',
                userId: userId,
                amount: amount,
                currency: currency
            }));
        }
    } catch (error) {
        console.error("Deposit error:", error);
        showNotification('Failed to submit deposit request', 'error');
    }
}

// Submit withdraw
async function submitWithdraw() {
    const currency = document.getElementById('withdrawCurrency').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('walletAddress').value;
    
    if (!amount || amount <= 0 || !address) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    // Check balance
    if (!userData.balances[currency] || userData.balances[currency] < amount) {
        showNotification(`Insufficient ${currency} balance`, 'error');
        return;
    }
    
    // Check BNB fee for USDT withdrawal
    if (currency === 'USDT') {
        if (!userData.balances.BNB || userData.balances.BNB < 0.00016) {
            showNotification('You need 0.00016 BNB for withdrawal fee', 'error');
            return;
        }
        
        // Deduct fee
        userData.balances.BNB -= 0.00016;
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
        }
        
        // Temporarily deduct from balance
        userData.balances[currency] -= amount;
        userData.transactions.push(withdrawRequest);
        saveUserData();
        
        showNotification('Withdrawal request submitted! Waiting for admin approval.', 'success');
        closeModal('withdrawModal');
        
        // Notify admin
        if (tg.sendData) {
            tg.sendData(JSON.stringify({
                type: 'new_withdraw',
                userId: userId,
                amount: amount,
                currency: currency
            }));
        }
    } catch (error) {
        console.error("Withdraw error:", error);
        showNotification('Failed to submit withdrawal request', 'error');
    }
}

// Save user data
function saveUserData() {
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    
    if (db) {
        db.collection('users').doc(userId).set(userData, { merge: true })
            .catch(error => console.error("Error saving to Firebase:", error));
    }
}

// Show notification
function showNotification(message, type = 'info') {
    tg.showPopup({
        title: type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info',
        message: message,
        buttons: [{ type: 'ok' }]
    });
}

// Show history
function showHistory() {
    // Implement history view
    showNotification('History feature coming soon!', 'info');
}

// Show receive modal
function showReceiveModal() {
    // Implement receive modal
    showNotification('Receive feature coming soon!', 'info');
}

// Show all assets
function showAllAssets() {
    // Implement all assets view
    showNotification('All assets view coming soon!', 'info');
}

// Show notifications
function showNotifications() {
    showNotification('No new notifications', 'info');
}

// Show settings
function showSettings() {
    showNotification('Settings coming soon!', 'info');
}

// Admin panel (only for admin)
function isAdmin() {
    return userId === ADMIN_ID.toString();
}

// Check for admin
if (isAdmin()) {
    // Add admin badge to header
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
        showNotification('Access denied', 'error');
        return;
    }
    
    if (db) {
        db.collection('transactions').where('status', '==', 'pending').get()
            .then(snapshot => {
                const pending = [];
                snapshot.forEach(doc => pending.push({ id: doc.id, ...doc.data() }));
                
                let message = 'Pending Transactions:\n\n';
                pending.forEach(tx => {
                    message += `${tx.type.toUpperCase()}: ${tx.amount} ${tx.currency} - User: ${tx.userId}\n`;
                });
                message += pending.length === 0 ? 'No pending transactions' : '';
                
                tg.showPopup({
                    title: 'Admin Panel',
                    message: message,
                    buttons: [
                        { type: 'default', text: 'Approve All' },
                        { type: 'cancel' }
                    ]
                });
            });
    }
}
