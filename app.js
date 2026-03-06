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
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// Constants
const ADMIN_ID = 1653918641;
const DEPOSIT_ADDRESS = "0xbf70420f57342c6Bd4267430D4D3b7E946f09450";
const SWAP_RATE = 500000; // 1 USDT = 500000 REFI
const STAKING_PLANS = {
    '3days': { days: 3, return: 40 },
    '7days': { days: 7, return: 50 },
    '15days': { days: 15, return: 70 },
    '30days': { days: 30, return: 100 }
};
const REFERRAL_BONUS = 250000; // REFI per referral
const REFERRAL_MISSIONS = [
    { referrals: 10, reward: 50, claimed: false, unit: 'USDT' },
    { referrals: 25, reward: 120, claimed: false, unit: 'USDT' },
    { referrals: 50, reward: 250, claimed: false, unit: 'USDT' },
    { referrals: 100, reward: 500, claimed: false, unit: 'USDT' },
    { referrals: 250, reward: 1000, claimed: false, unit: 'USDT' }
];

// Fixed prices for top 10 cryptocurrencies
const cryptoPrices = {
    'BTC': 43250.00,
    'ETH': 2250.00,
    'BNB': 310.00,
    'USDT': 1.00,
    'REFI': 0.000002,
    'XRP': 0.55,
    'ADA': 0.35,
    'SOL': 95.00,
    'DOGE': 0.08,
    'DOT': 6.50
};

// State management
let currentUser = null;
let userData = null;

// Initialize Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Set user data from Telegram
const userId = tg.initDataUnsafe?.user?.id || 'guest_' + Math.random().toString(36).substr(2, 9);
document.getElementById('userId').textContent = 'User: ' + userId.substring(0, 8) + '...';

// Load user data on startup
loadUserData();

// Navigation
function showSection(section) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Here you can load different content based on section
    console.log('Showing section:', section);
    
    if (section === 'referral') {
        showReferralSection();
    } else if (section === 'swap') {
        showSwapSection();
    } else if (section === 'staking') {
        showStakingSection();
    }
}

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
                transactions: [],
                missions: REFERRAL_MISSIONS
            };
            localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        }
        
        // Load from Firebase if available
        if (db) {
            const userDoc = await db.collection('users').doc(userId.toString()).get();
            if (userDoc.exists) {
                const fbData = userDoc.data();
                // Merge Firebase data with local data (Firebase takes precedence)
                userData = { ...userData, ...fbData };
                localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
            } else {
                // Save to Firebase
                await db.collection('users').doc(userId.toString()).set(userData);
            }
        }
        
        updateUI();
    } catch (error) {
        console.error("Error loading user data:", error);
        updateUI(); // Still update UI with local data
    }
}

// Update UI
function updateUI() {
    updateCryptoList();
    updateTotalBalance();
}

function updateCryptoList() {
    const cryptoList = document.getElementById('cryptoList');
    const cryptos = ['BTC', 'ETH', 'BNB', 'USDT', 'REFI', 'XRP', 'ADA', 'SOL', 'DOGE', 'DOT'];
    
    cryptoList.innerHTML = cryptos.map(symbol => {
        const price = cryptoPrices[symbol];
        const balance = userData?.balances[symbol] || 0;
        const valueInUSDT = symbol === 'USDT' ? balance : balance * price;
        
        return `
            <div class="crypto-item">
                <div class="crypto-left">
                    <div class="crypto-icon ${symbol.toLowerCase()}">
                        <i class="fas fa-coins"></i>
                    </div>
                    <div class="crypto-info">
                        <h4>${symbol}</h4>
                        <p>${balance.toFixed(8)} ${symbol}</p>
                    </div>
                </div>
                <div class="crypto-right">
                    <div class="crypto-price">$${price.toFixed(6)}</div>
                    <div class="crypto-change">$${valueInUSDT.toFixed(2)}</div>
                </div>
            </div>
        `;
    }).join('');
}

function updateTotalBalance() {
    if (!userData) return;
    
    let total = 0;
    total += userData.balances.USDT || 0;
    total += (userData.balances.REFI || 0) * cryptoPrices.REFI;
    total += (userData.balances.BNB || 0) * cryptoPrices.BNB;
    total += (userData.balances.BTC || 0) * cryptoPrices.BTC;
    total += (userData.balances.ETH || 0) * cryptoPrices.ETH;
    
    document.getElementById('totalBalance').textContent = `$${total.toFixed(2)}`;
}

// Modal functions
function showDepositModal() {
    document.getElementById('depositModal').classList.add('show');
}

function showWithdrawModal() {
    document.getElementById('withdrawModal').classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

function copyAddress() {
    navigator.clipboard.writeText(DEPOSIT_ADDRESS);
    tg.showPopup({
        title: 'Success',
        message: 'Address copied to clipboard!',
        buttons: [{ type: 'ok' }]
    });
}

function updateDepositMin() {
    const currency = document.getElementById('depositCurrency').value;
    const amountInput = document.getElementById('depositAmount');
    
    if (currency === 'REFI') {
        amountInput.min = 500000;
        amountInput.placeholder = 'Min 500,000 REFI';
    } else if (currency === 'USDT') {
        amountInput.min = 10;
        amountInput.placeholder = 'Min 10 USDT';
    } else if (currency === 'BNB') {
        amountInput.min = 0.02;
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

// Submit functions
async function submitDeposit() {
    const currency = document.getElementById('depositCurrency').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const txnId = document.getElementById('txnId').value;
    
    // Validate
    if (!amount || amount <= 0) {
        tg.showPopup({
            title: 'Error',
            message: 'Please enter a valid amount',
            buttons: [{ type: 'cancel' }]
        });
        return;
    }
    
    if (!txnId) {
        tg.showPopup({
            title: 'Error',
            message: 'Please enter transaction ID',
            buttons: [{ type: 'cancel' }]
        });
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
        tg.showPopup({
            title: 'Error',
            message: `Minimum deposit is ${minAmount} ${currency}`,
            buttons: [{ type: 'cancel' }]
        });
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
        
        // Save to local
        userData.transactions.push(depositRequest);
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        
        tg.showPopup({
            title: 'Success',
            message: 'Deposit request submitted! Waiting for admin approval.',
            buttons: [{ type: 'ok' }]
        });
        
        closeModal('depositModal');
    } catch (error) {
        console.error("Deposit error:", error);
        tg.showPopup({
            title: 'Error',
            message: 'Failed to submit deposit request',
            buttons: [{ type: 'cancel' }]
        });
    }
}

async function submitWithdraw() {
    const currency = document.getElementById('withdrawCurrency').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('walletAddress').value;
    
    if (!amount || amount <= 0 || !address) {
        tg.showPopup({
            title: 'Error',
            message: 'Please fill all fields',
            buttons: [{ type: 'cancel' }]
        });
        return;
    }
    
    // Check balance
    if (!userData.balances[currency] || userData.balances[currency] < amount) {
        tg.showPopup({
            title: 'Error',
            message: `Insufficient ${currency} balance`,
            buttons: [{ type: 'cancel' }]
        });
        return;
    }
    
    // Check BNB fee for USDT withdrawal
    if (currency === 'USDT') {
        if (!userData.balances.BNB || userData.balances.BNB < 0.00016) {
            tg.showPopup({
                title: 'Error',
                message: 'You need 0.00016 BNB for withdrawal fee',
                buttons: [{ type: 'cancel' }]
            });
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
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        
        tg.showPopup({
            title: 'Success',
            message: 'Withdrawal request submitted! Waiting for admin approval.',
            buttons: [{ type: 'ok' }]
        });
        
        closeModal('withdrawModal');
        updateUI();
    } catch (error) {
        console.error("Withdraw error:", error);
        tg.showPopup({
            title: 'Error',
            message: 'Failed to submit withdrawal request',
            buttons: [{ type: 'cancel' }]
        });
    }
}

// Referral functions
function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase() + userId.substring(0, 4);
}

function showReferralSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="header">
            <div class="user-info">
                <i class="fas fa-user-circle"></i>
                <span>Referral Program</span>
            </div>
            <div class="notifications">
                <i class="fas fa-times" onclick="location.reload()"></i>
            </div>
        </div>
        
        <div class="balance-card">
            <div class="balance-label">Your Referral Code</div>
            <div class="balance-amount" style="font-size: 24px;">${userData.referralCode}</div>
            <div class="balance-actions">
                <button class="action-btn" onclick="copyReferralCode()">
                    <i class="far fa-copy"></i> Copy Code
                </button>
                <button class="action-btn" onclick="shareReferral()">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
        
        <div class="section-title">
            <h3>Referral Stats</h3>
        </div>
        
        <div style="padding: 0 20px; margin-bottom: 20px;">
            <div style="background: var(--card-bg); padding: 20px; border-radius: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span>Total Referrals:</span>
                    <span style="color: var(--accent-pink); font-weight: bold;">${userData.referralCount || 0}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>Total Earned:</span>
                    <span style="color: var(--accent-pink); font-weight: bold;">${(userData.referralCount || 0) * 250000} REFI</span>
                </div>
            </div>
        </div>
        
        <div class="section-title">
            <h3>Referral Missions</h3>
        </div>
        
        <div style="padding: 0 20px;" id="missionsList">
            ${userData.missions.map(mission => `
                <div style="background: var(--card-bg); padding: 15px; border-radius: 16px; margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h4 style="margin-bottom: 5px;">Refer ${mission.referrals} People</h4>
                            <p style="color: var(--text-secondary);">Reward: ${mission.reward} ${mission.unit}</p>
                        </div>
                        ${mission.claimed ? 
                            '<span style="color: var(--success);">✓ Claimed</span>' :
                            (userData.referralCount >= mission.referrals ? 
                                '<button class="action-btn" onclick="claimMission(' + mission.referrals + ')">Claim</button>' :
                                '<span style="color: var(--warning);">' + (mission.referrals - (userData.referralCount || 0)) + ' left</span>'
                            )
                        }
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function copyReferralCode() {
    navigator.clipboard.writeText(userData.referralCode);
    tg.showPopup({
        title: 'Success',
        message: 'Referral code copied!',
        buttons: [{ type: 'ok' }]
    });
}

function shareReferral() {
    const text = `Join FEFI Network Wallet and get 250,000 REFI bonus! Use my referral code: ${userData.referralCode}`;
    
    if (tg.shareToStory) {
        tg.shareToStory(text);
    } else {
        navigator.clipboard.writeText(text);
        tg.showPopup({
            title: 'Copied!',
            message: 'Referral message copied to clipboard!',
            buttons: [{ type: 'ok' }]
        });
    }
}

function claimMission(referrals) {
    const mission = userData.missions.find(m => m.referrals === referrals);
    if (mission && !mission.claimed && userData.referralCount >= referrals) {
        // Add reward
        userData.balances.USDT += mission.reward;
        mission.claimed = true;
        
        // Save
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        if (db) {
            db.collection('users').doc(userId.toString()).update({
                balances: userData.balances,
                missions: userData.missions
            });
        }
        
        tg.showPopup({
            title: 'Success!',
            message: `You claimed ${mission.reward} USDT!`,
            buttons: [{ type: 'ok' }]
        });
        
        showReferralSection();
    }
}

// Swap functions
function showSwapSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="header">
            <div class="user-info">
                <i class="fas fa-user-circle"></i>
                <span>Swap</span>
            </div>
            <div class="notifications">
                <i class="fas fa-times" onclick="location.reload()"></i>
            </div>
        </div>
        
        <div style="padding: 20px;">
            <div style="background: var(--card-bg); padding: 20px; border-radius: 20px;">
                <div class="form-group">
                    <label>From</label>
                    <select id="fromCurrency">
                        <option value="USDT">USDT</option>
                        <option value="REFI">REFI</option>
                    </select>
                </div>
                
                <div style="text-align: center; margin: 20px 0;">
                    <i class="fas fa-arrow-down" style="color: var(--accent-pink); font-size: 24px;"></i>
                </div>
                
                <div class="form-group">
                    <label>To</label>
                    <select id="toCurrency">
                        <option value="REFI">REFI</option>
                        <option value="USDT">USDT</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Amount</label>
                    <input type="number" id="swapAmount" placeholder="Enter amount" oninput="calculateSwapOutput()">
                </div>
                
                <div class="form-group">
                    <label>You'll receive</label>
                    <input type="text" id="swapOutput" readonly disabled>
                </div>
                
                <div id="swapFeeInfo" style="background: var(--bg-primary); padding: 15px; border-radius: 12px; margin: 20px 0;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>Rate:</span>
                        <span>1 USDT = 500,000 REFI</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                        <span>Fee:</span>
                        <span id="swapFee">0 BNB</span>
                    </div>
                </div>
                
                <button class="submit-btn" onclick="executeSwap()">Swap</button>
            </div>
        </div>
    `;
    
    // Add event listener for fromCurrency change
    document.getElementById('fromCurrency').addEventListener('change', updateSwapCurrencies);
}

function updateSwapCurrencies() {
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency');
    
    if (from === 'USDT') {
        to.value = 'REFI';
    } else {
        to.value = 'USDT';
    }
    
    calculateSwapOutput();
}

function calculateSwapOutput() {
    const from = document.getElementById('fromCurrency').value;
    const amount = parseFloat(document.getElementById('swapAmount').value) || 0;
    const output = document.getElementById('swapOutput');
    const feeInfo = document.getElementById('swapFee');
    
    if (from === 'USDT') {
        // USDT to REFI
        output.value = amount * SWAP_RATE + ' REFI';
        feeInfo.textContent = '0 BNB';
    } else {
        // REFI to USDT
        output.value = amount / SWAP_RATE + ' USDT';
        feeInfo.textContent = '0.00016 BNB';
    }
}

function executeSwap() {
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('swapAmount').value);
    
    if (!amount || amount <= 0) {
        tg.showPopup({
            title: 'Error',
            message: 'Please enter a valid amount',
            buttons: [{ type: 'cancel' }]
        });
        return;
    }
    
    // Check balance
    if (!userData.balances[from] || userData.balances[from] < amount) {
        tg.showPopup({
            title: 'Error',
            message: `Insufficient ${from} balance`,
            buttons: [{ type: 'cancel' }]
        });
        return;
    }
    
    // Check fee for REFI to USDT
    if (from === 'REFI') {
        if (!userData.balances.BNB || userData.balances.BNB < 0.00016) {
            tg.showPopup({
                title: 'Error',
                message: 'You need 0.00016 BNB for swap fee',
                buttons: [{ type: 'cancel' }]
            });
            return;
        }
        userData.balances.BNB -= 0.00016;
    }
    
    // Calculate output
    let outputAmount;
    if (from === 'USDT') {
        outputAmount = amount * SWAP_RATE;
    } else {
        outputAmount = amount / SWAP_RATE;
    }
    
    // Execute swap
    userData.balances[from] -= amount;
    userData.balances[to] += outputAmount;
    
    // Save
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    if (db) {
        db.collection('users').doc(userId.toString()).update({
            balances: userData.balances
        });
    }
    
    tg.showPopup({
        title: 'Success',
        message: `Swapped ${amount} ${from} to ${outputAmount.toFixed(8)} ${to}`,
        buttons: [{ type: 'ok' }]
    });
    
    location.reload();
}

// Staking functions
function showStakingSection() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="header">
            <div class="user-info">
                <i class="fas fa-user-circle"></i>
                <span>Staking</span>
            </div>
            <div class="notifications">
                <i class="fas fa-times" onclick="location.reload()"></i>
            </div>
        </div>
        
        <div style="padding: 20px;">
            <div style="background: linear-gradient(135deg, #2a1a2a 0%, #1a1a2a 100%); padding: 20px; border-radius: 20px; margin-bottom: 20px;">
                <h3 style="color: var(--accent-pink); margin-bottom: 10px;">Your Staked USDT</h3>
                <p style="font-size: 28px; font-weight: bold;">${calculateTotalStaked()} USDT</p>
            </div>
            
            <div class="section-title">
                <h3>Staking Plans (USDT Only)</h3>
            </div>
            
            <div style="display: grid; gap: 15px;">
                ${Object.entries(STAKING_PLANS).map(([key, plan]) => `
                    <div style="background: var(--card-bg); padding: 20px; border-radius: 20px; border: 1px solid var(--border-color);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                            <div>
                                <h3 style="color: var(--accent-pink);">${plan.days} Days</h3>
                                <p style="color: var(--text-secondary);">${plan.return}% Return</p>
                            </div>
                            <i class="fas fa-lock" style="color: var(--accent-pink); font-size: 24px;"></i>
                        </div>
                        
                        <div class="form-group">
                            <input type="number" id="stake_${key}" placeholder="Enter USDT amount">
                        </div>
                        
                        <button class="submit-btn" onclick="stakeUSDT('${key}')">Stake USDT</button>
                    </div>
                `).join('')}
            </div>
            
            <div class="section-title" style="margin-top: 30px;">
                <h3>Active Stakes</h3>
            </div>
            
            <div id="activeStakes">
                ${userData.staking && userData.staking.length > 0 ? 
                    userData.staking.map(stake => `
                        <div style="background: var(--card-bg); padding: 15px; border-radius: 16px; margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between;">
                                <div>
                                    <h4>${stake.plan.days} Days Plan</h4>
                                    <p>Staked: ${stake.amount} USDT</p>
                                    <p>Return: ${stake.return}% (${stake.amount * stake.return/100} USDT)</p>
                                </div>
                                <div style="text-align: right;">
                                    <span style="color: var(--success);">Active</span>
                                    <p style="font-size: 12px; color: var(--text-secondary);">
                                        Ends: ${new Date(stake.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `).join('') : 
                    '<p style="text-align: center; color: var(--text-secondary);">No active stakes</p>'
                }
            </div>
        </div>
    `;
}

function calculateTotalStaked() {
    if (!userData.staking) return 0;
    return userData.staking.reduce((total, stake) => total + stake.amount, 0);
}

function stakeUSDT(planKey) {
    const amount = parseFloat(document.getElementById(`stake_${planKey}`).value);
    const plan = STAKING_PLANS[planKey];
    
    if (!amount || amount <= 0) {
        tg.showPopup({
            title: 'Error',
            message: 'Please enter a valid amount',
            buttons: [{ type: 'cancel' }]
        });
        return;
    }
    
    // Check USDT balance
    if (!userData.balances.USDT || userData.balances.USDT < amount) {
        tg.showPopup({
            title: 'Error',
            message: 'Insufficient USDT balance',
            buttons: [{ type: 'cancel' }]
        });
        return;
    }
    
    // Create stake
    const stake = {
        plan: plan,
        amount: amount,
        return: plan.return,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + plan.days * 24 * 60 * 60 * 1000).toISOString(),
        claimed: false
    };
    
    // Deduct USDT and add stake
    userData.balances.USDT -= amount;
    if (!userData.staking) userData.staking = [];
    userData.staking.push(stake);
    
    // Save
    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    if (db) {
        db.collection('users').doc(userId.toString()).update({
            balances: userData.balances,
            staking: userData.staking
        });
    }
    
    tg.showPopup({
        title: 'Success!',
        message: `Staked ${amount} USDT for ${plan.days} days!`,
        buttons: [{ type: 'ok' }]
    });
    
    showStakingSection();
}

// Admin panel functions
function isAdmin() {
    return userId.toString() === ADMIN_ID.toString();
}

// Check for admin access
if (isAdmin()) {
    // Add admin button to header
    setTimeout(() => {
        const header = document.querySelector('.header');
        if (header) {
            const adminBtn = document.createElement('div');
            adminBtn.innerHTML = '<i class="fas fa-crown" style="color: gold; margin-left: 10px; cursor: pointer;" onclick="showAdminPanel()"></i>';
            header.querySelector('.notifications').appendChild(adminBtn);
        }
    }, 1000);
}

function showAdminPanel() {
    if (!isAdmin()) {
        tg.showPopup({
            title: 'Access Denied',
            message: 'You are not authorized to access admin panel',
            buttons: [{ type: 'ok' }]
        });
        return;
    }
    
    // Load pending transactions from Firebase
    if (db) {
        db.collection('transactions').where('status', '==', 'pending').get()
            .then(snapshot => {
                const pending = [];
                snapshot.forEach(doc => pending.push({ id: doc.id, ...doc.data() }));
                
                // Show admin panel
                const mainContent = document.getElementById('mainContent');
                mainContent.innerHTML = `
                    <div class="header">
                        <div class="user-info">
                            <i class="fas fa-crown" style="color: gold;"></i>
                            <span>Admin Panel</span>
                        </div>
                        <div class="notifications">
                            <i class="fas fa-times" onclick="location.reload()"></i>
                        </div>
                    </div>
                    
                    <div style="padding: 20px;">
                        <h3>Pending Transactions (${pending.length})</h3>
                        
                        ${pending.map(tx => `
                            <div style="background: var(--card-bg); padding: 15px; border-radius: 16px; margin: 10px 0;">
                                <p><strong>User:</strong> ${tx.userId}</p>
                                <p><strong>Type:</strong> ${tx.type}</p>
                                <p><strong>Currency:</strong> ${tx.currency}</p>
                                <p><strong>Amount:</strong> ${tx.amount}</p>
                                ${tx.txnId ? `<p><strong>TXID:</strong> ${tx.txnId}</p>` : ''}
                                ${tx.address ? `<p><strong>Address:</strong> ${tx.address}</p>` : ''}
                                <div style="display: flex; gap: 10px; margin-top: 10px;">
                                    <button class="action-btn" style="background: var(--success);" onclick="approveTransaction('${tx.id}', '${tx.userId}', '${tx.type}', '${tx.currency}', ${tx.amount})">
                                        Approve
                                    </button>
                                    <button class="action-btn" style="background: var(--danger);" onclick="rejectTransaction('${tx.id}')">
                                        Reject
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                        
                        ${pending.length === 0 ? '<p>No pending transactions</p>' : ''}
                    </div>
                    
                    <div style="padding: 20px;">
                        <h3>Manual Controls</h3>
                        <div style="background: var(--card-bg); padding: 20px; border-radius: 16px;">
                            <div class="form-group">
                                <label>User ID</label>
                                <input type="text" id="adminUserId" placeholder="Enter user ID">
                            </div>
                            <div class="form-group">
                                <label>Currency</label>
                                <select id="adminCurrency">
                                    <option value="REFI">REFI</option>
                                    <option value="USDT">USDT</option>
                                    <option value="BNB">BNB</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Amount</label>
                                <input type="number" id="adminAmount" placeholder="Enter amount">
                            </div>
                            <button class="submit-btn" onclick="manualCredit()">Credit User</button>
                        </div>
                    </div>
                `;
            });
    }
}

function approveTransaction(txId, userId, type, currency, amount) {
    if (db) {
        // Update transaction status
        db.collection('transactions').doc(txId).update({
            status: 'approved',
            approvedAt: new Date().toISOString()
        });
        
        if (type === 'deposit') {
            // Credit user
            db.collection('users').doc(userId).get().then(doc => {
                if (doc.exists) {
                    const userBalances = doc.data().balances || {};
                    userBalances[currency] = (userBalances[currency] || 0) + amount;
                    
                    db.collection('users').doc(userId).update({
                        balances: userBalances
                    });
                }
            });
        }
        
        tg.showPopup({
            title: 'Success',
            message: 'Transaction approved!',
            buttons: [{ type: 'ok' }]
        });
        
        showAdminPanel();
    }
}

function rejectTransaction(txId) {
    if (db) {
        db.collection('transactions').doc(txId).update({
            status: 'rejected',
            rejectedAt: new Date().toISOString()
        });
        
        tg.showPopup({
            title: 'Success',
            message: 'Transaction rejected!',
            buttons: [{ type: 'ok' }]
        });
        
        showAdminPanel();
    }
}

function manualCredit() {
    const targetUserId = document.getElementById('adminUserId').value;
    const currency = document.getElementById('adminCurrency').value;
    const amount = parseFloat(document.getElementById('adminAmount').value);
    
    if (!targetUserId || !amount || amount <= 0) {
        tg.showPopup({
            title: 'Error',
            message: 'Please fill all fields',
            buttons: [{ type: 'cancel' }]
        });
        return;
    }
    
    if (db) {
        db.collection('users').doc(targetUserId).get().then(doc => {
            if (doc.exists) {
                const userBalances = doc.data().balances || {};
                userBalances[currency] = (userBalances[currency] || 0) + amount;
                
                db.collection('users').doc(targetUserId).update({
                    balances: userBalances
                }).then(() => {
                    tg.showPopup({
                        title: 'Success',
                        message: `Credited ${amount} ${currency} to user ${targetUserId}`,
                        buttons: [{ type: 'ok' }]
                    });
                });
            } else {
                tg.showPopup({
                    title: 'Error',
                    message: 'User not found',
                    buttons: [{ type: 'cancel' }]
                });
            }
        });
    }
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
                    
                    db.collection('users').doc(referrerId).update({
                        balances: referrerData.balances,
                        referrals: referrerData.referrals,
                        referralCount: referrerData.referralCount
                    });
                });
            });
        }
        
        // Save
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    }
}

// Initialize
checkReferral();
