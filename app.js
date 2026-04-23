// ============================================================================
// REFI NETWORK - COMPLETE VERSION 31.0
// ============================================================================

// ============================================================================
// 1. TELEGRAM WEBAPP INITIALIZATION
// ============================================================================

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation?.();
    console.log("✅ Telegram WebApp initialized");
}

// ============================================================================
// 2. FIREBASE CONFIGURATION
// ============================================================================

const firebaseConfig = {
    apiKey: "AIzaSyCnnmuZNJxkWTw-GjaP0fz6UpS3NZLF0n8",
    authDomain: "realfinanc-22bfd.firebaseapp.com",
    databaseURL: "https://realfinanc-22bfd-default-rtdb.firebaseio.com",
    projectId: "realfinanc-22bfd",
    storageBucket: "realfinanc-22bfd.firebasestorage.app",
    messagingSenderId: "631107346327",
    appId: "1:631107346327:web:2a5405b81783aee7596ed2"
};

let firebaseApp, db;

try {
    if (typeof firebase !== 'undefined') {
        firebaseApp = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("🔥 Firebase initialized successfully");
    }
} catch (error) {
    console.error("Firebase initialization error:", error);
}

// ============================================================================
// 3. TRANSLATION SYSTEM (i18n)
// ============================================================================

const translations = {
    en: {
        'app.name': 'REFI Network',
        'welcome.title': 'Welcome back,',
        'nav.wallet': 'Wallet',
        'nav.swap': 'Swap',
        'nav.earn': 'Earn',
        'nav.staking': 'Staking',
        'nav.referral': 'Referral',
        'actions.deposit': 'Deposit',
        'actions.withdraw': 'Withdraw',
        'actions.history': 'History',
        'actions.p2p': 'P2P',
        'actions.seeAll': 'See All',
        'actions.confirmSwap': 'Confirm Swap',
        'actions.stake': 'Stake USDT',
        'actions.copy': 'Copy',
        'actions.gotIt': 'Got it!',
        'wallet.totalBalance': 'Total Balance',
        'wallet.myAssets': 'My Assets',
        'wallet.topCryptos': 'Top Cryptocurrencies',
        'swap.from': 'From',
        'swap.to': 'To',
        'swap.exchangeRate': 'Exchange Rate',
        'swap.networkFee': 'Network Fee',
        'swap.free': '0 BNB (FREE)',
        'swap.bnbNotAllowed': 'BNB temporarily unavailable',
        'staking.title': 'USDT REWARDS',
        'staking.totalStaked': 'TOTAL STAKED',
        'staking.rewardsEarned': 'REWARDS EARNED',
        'staking.avgReturn': 'AVG. RETURN',
        'staking.amountToStake': 'AMOUNT TO STAKE',
        'staking.estimatedReturn': 'Estimated Return',
        'staking.lockPeriod': 'Lock-up Period',
        'staking.totalAfter': 'Total after staking',
        'staking.activeStakes': 'Active Stakes',
        'staking.missions': 'STAKING MISSIONS',
        'staking.details': 'Staking Details',
        'referral.title': 'EARN USDT',
        'referral.totalReferrals': 'TOTAL REFERRALS',
        'referral.refiEarned': 'REFI EARNED',
        'referral.usdtEarned': 'USDT EARNED',
        'referral.yourLink': 'Your Referral Link',
        'referral.description': 'Share your link and get',
        'referral.description2': 'for every friend who joins. Complete milestones to earn massive USDT rewards!',
        'referral.milestones': 'Referral Milestones',
        'deposit.title': 'Deposit Funds',
        'deposit.selectCurrency': 'Select Currency',
        'deposit.amount': 'Amount',
        'deposit.transactionId': 'Transaction ID',
        'deposit.sendTo': 'Send to this address:',
        'deposit.confirmation': '✓ Blockchain confirmation 1-5 minutes',
        'deposit.submit': 'Submit Deposit',
        'withdraw.title': 'Withdraw Funds',
        'withdraw.selectCurrency': 'Select Currency',
        'withdraw.amount': 'Amount',
        'withdraw.address': 'Wallet Address',
        'withdraw.youReceive': 'You will receive:',
        'withdraw.networkFee': 'Network fee:',
        'withdraw.submit': 'Submit Withdrawal',
        'history.title': 'Transaction History',
        'history.all': 'All',
        'history.deposits': 'Deposits',
        'history.withdrawals': 'Withdrawals',
        'history.swaps': 'Swaps',
        'history.referrals': 'Referrals',
        'history.staking': 'Staking',
        'notifications.title': 'Notifications',
        'currency.select': 'Select Currency',
        'p2p.comingSoon': 'Coming Soon!',
        'p2p.description': 'We\'re working hard to bring you the best P2P trading experience. Stay tuned for exciting updates!',
        'p2p.feature1': 'Trade directly with others',
        'p2p.feature2': 'Best exchange rates',
        'p2p.feature3': 'Secure escrow system',
        'p2p.launching': 'Launching in:',
        'earn.title': 'EARN REFI',
        'earn.totalEarned': 'TOTAL EARNED',
        'earn.adsWatched': 'ADS WATCHED',
        'earn.remaining': 'REMAINING',
        'earn.resetIn': 'RESETS IN',
        'earn.watchAd': 'Watch Ad',
        'earn.perAd': '+10,000 REFI per ad',
        'messages.loading': 'Loading prices...',
        'messages.loadingHistory': 'Loading history...',
        'messages.success': 'Success',
        'messages.error': 'Error',
        'messages.warning': 'Warning',
        'messages.info': 'Info',
        'notif.depositApproved': '✅ Your deposit of {amount} {currency} has been approved!',
        'notif.depositRejected': '❌ Your deposit was rejected. Reason: {reason}',
        'notif.withdrawApproved': '✅ Your withdrawal of {amount} USDT has been approved!',
        'notif.withdrawRejected': '❌ Your withdrawal was rejected. Reason: {reason}',
        'notif.referralBonus': '🎉 Someone joined with your link! You got {amount} REFI!',
        'notif.welcomeBonus': '🎉 Welcome! You got 10,000 REFI bonus!',
        'notif.earnReward': '🎬 +10,000 REFI from watching ad!',
        'error.minDeposit': 'Minimum deposit is {min} {currency}',
        'error.invalidHash': 'Invalid transaction hash. Must start with 0x and be 66 characters',
        'error.hashUsed': 'This transaction hash has already been used',
        'error.insufficientBalance': 'Insufficient {currency} balance',
        'error.minSwap': 'Minimum swap is {min} {currency}',
        'error.enterAmount': 'Please enter a valid amount',
        'success.depositSubmitted': '✅ Deposit request submitted for review! Amount: {amount} {currency}',
        'success.withdrawSubmitted': '✅ Withdrawal request submitted for {amount} USDT',
        'success.swapCompleted': '✅ Swapped {fromAmount} {fromCurrency} to {toAmount} {toCurrency}',
        'success.stakeCompleted': '✅ Successfully staked {amount} USDT!',
        'success.referralCopied': '✅ Referral link copied!',
        'success.addressCopied': '✅ Address copied to clipboard!',
        'notifications.clear_read': 'Clear Read',
        'notifications.clear_all': 'Clear All',
        'notifications.confirm_clear_read': 'Clear {count} read notification(s)? {unread} unread will remain.',
        'notifications.confirm_clear_all': 'Delete all notifications?',
        'notifications.confirm_clear_all_unread': 'Warning: You have {count} unread notifications. Delete all?',
        'notifications.cleared': 'Cleared {count} read notifications',
        'notifications.no_read': 'No read notifications to clear',
        'notifications.no_notifications': 'No notifications'
    },
    ar: {
        'app.name': 'REFI Network',
        'welcome.title': 'أهلاً بعودتك،',
        'nav.wallet': 'المحفظة',
        'nav.swap': 'تحويل',
        'nav.earn': 'اربح',
        'nav.staking': 'تجميد',
        'nav.referral': 'إحالة',
        'actions.deposit': 'إيداع',
        'actions.withdraw': 'سحب',
        'actions.history': 'السجل',
        'actions.p2p': 'P2P',
        'actions.seeAll': 'عرض الكل',
        'actions.confirmSwap': 'تأكيد التحويل',
        'actions.stake': 'تجميد USDT',
        'actions.copy': 'نسخ',
        'actions.gotIt': 'حسناً!',
        'wallet.totalBalance': 'الرصيد الإجمالي',
        'wallet.myAssets': 'أصولي',
        'wallet.topCryptos': 'أفضل العملات',
        'swap.from': 'من',
        'swap.to': 'إلى',
        'swap.exchangeRate': 'سعر الصرف',
        'swap.networkFee': 'رسوم الشبكة',
        'swap.free': '0 BNB (مجاناً)',
        'swap.bnbNotAllowed': 'BNB غير متاح حالياً',
        'staking.title': 'مكافآت USDT',
        'staking.totalStaked': 'إجمالي التجميد',
        'staking.rewardsEarned': 'المكافآت المحققة',
        'staking.avgReturn': 'متوسط العائد',
        'staking.amountToStake': 'المبلغ للتجميد',
        'staking.estimatedReturn': 'العائد المتوقع',
        'staking.lockPeriod': 'مدة التجميد',
        'staking.totalAfter': 'الإجمالي بعد التجميد',
        'staking.activeStakes': 'تجميدات نشطة',
        'staking.missions': 'مهام التجميد',
        'staking.details': 'تفاصيل التجميد',
        'referral.title': 'اربح USDT',
        'referral.totalReferrals': 'إجمالي الإحالات',
        'referral.refiEarned': 'REFI المُكتسبة',
        'referral.usdtEarned': 'USDT المُكتسبة',
        'referral.yourLink': 'رابط الإحالة الخاص بك',
        'referral.description': 'شارك رابطك واحصل على',
        'referral.description2': 'لكل صديق ينضم. أكمل المراحل لتربح مكافآت USDT ضخمة!',
        'referral.milestones': 'مراحل الإحالة',
        'deposit.title': 'إيداع الأموال',
        'deposit.selectCurrency': 'اختر العملة',
        'deposit.amount': 'المبلغ',
        'deposit.transactionId': 'رقم المعاملة',
        'deposit.sendTo': 'أرسل إلى هذا العنوان:',
        'deposit.confirmation': '✓ تأكيد البلوكشين 1-5 دقائق',
        'deposit.submit': 'تقديم الإيداع',
        'withdraw.title': 'سحب الأموال',
        'withdraw.selectCurrency': 'اختر العملة',
        'withdraw.amount': 'المبلغ',
        'withdraw.address': 'عنوان المحفظة',
        'withdraw.youReceive': 'سوف تستلم:',
        'withdraw.networkFee': 'رسوم الشبكة:',
        'withdraw.submit': 'تقديم السحب',
        'history.title': 'سجل المعاملات',
        'history.all': 'الكل',
        'history.deposits': 'إيداعات',
        'history.withdrawals': 'سحوبات',
        'history.swaps': 'تحويلات',
        'history.referrals': 'إحالات',
        'history.staking': 'تجميد',
        'notifications.title': 'الإشعارات',
        'currency.select': 'اختر العملة',
        'p2p.comingSoon': 'قريباً!',
        'p2p.description': 'نحن نعمل بجد لنقدم لك أفضل تجربة تداول P2P. ترقبوا التحديثات المثيرة!',
        'p2p.feature1': 'تداول مباشر مع الآخرين',
        'p2p.feature2': 'أفضل أسعار الصرف',
        'p2p.feature3': 'نظام ضمان آمن',
        'p2p.launching': 'الإطلاق خلال:',
        'earn.title': 'اربح REFI',
        'earn.totalEarned': 'إجمالي الأرباح',
        'earn.adsWatched': 'عدد الإعلانات',
        'earn.remaining': 'المتبقي',
        'earn.resetIn': 'التجديد خلال',
        'earn.watchAd': 'شاهد إعلان',
        'earn.perAd': '+10,000 REFI لكل إعلان',
        'messages.loading': 'جاري تحميل الأسعار...',
        'messages.loadingHistory': 'جاري تحميل السجل...',
        'messages.success': 'نجاح',
        'messages.error': 'خطأ',
        'messages.warning': 'تحذير',
        'messages.info': 'معلومات',
        'notif.depositApproved': '✅ تمت الموافقة على إيداعك {amount} {currency}!',
        'notif.depositRejected': '❌ تم رفض إيداعك. السبب: {reason}',
        'notif.withdrawApproved': '✅ تمت الموافقة على سحبك {amount} USDT!',
        'notif.withdrawRejected': '❌ تم رفض سحبك. السبب: {reason}',
        'notif.referralBonus': '🎉 شخص ما انضم عبر رابطك! حصلت على {amount} REFI!',
        'notif.welcomeBonus': '🎉 مرحباً! حصلت على 10,000 REFI كمكافأة!',
        'notif.earnReward': '🎬 +10,000 REFI من مشاهدة إعلان!',
        'error.minDeposit': 'الحد الأدنى للإيداع هو {min} {currency}',
        'error.invalidHash': 'هاش معاملة غير صالح. يجب أن يبدأ بـ 0x وأن يكون 66 حرفاً',
        'error.hashUsed': 'هذا الهاش مستخدم بالفعل',
        'error.insufficientBalance': 'رصيد {currency} غير كافٍ',
        'error.minSwap': 'الحد الأدنى للتحويل هو {min} {currency}',
        'error.enterAmount': 'الرجاء إدخال مبلغ صحيح',
        'success.depositSubmitted': '✅ تم تقديم طلب الإيداع للمراجعة! المبلغ: {amount} {currency}',
        'success.withdrawSubmitted': '✅ تم تقديم طلب السحب بمبلغ {amount} USDT',
        'success.swapCompleted': '✅ تم تحويل {fromAmount} {fromCurrency} إلى {toAmount} {toCurrency}',
        'success.stakeCompleted': '✅ تم تجميد {amount} USDT بنجاح!',
        'success.referralCopied': '✅ تم نسخ رابط الإحالة!',
        'success.addressCopied': '✅ تم نسخ العنوان إلى الحافظة!',
        'notifications.clear_read': 'حذف المقروء',
        'notifications.clear_all': 'حذف الكل',
        'notifications.confirm_clear_read': 'حذف {count} إشعار مقروء؟ سيبقى {unread} إشعار غير مقروء.',
        'notifications.confirm_clear_all': 'حذف جميع الإشعارات؟',
        'notifications.confirm_clear_all_unread': 'تحذير: لديك {count} إشعار غير مقروء. حذف الكل؟',
        'notifications.cleared': 'تم حذف {count} إشعار مقروء',
        'notifications.no_read': 'لا توجد إشعارات مقروءة للحذف',
        'notifications.no_notifications': 'لا توجد إشعارات'
    }
};

let currentLanguage = localStorage.getItem('preferred_language') || 'en';

function t(key, params = {}) {
    let text = translations[currentLanguage]?.[key] || translations.en[key] || key;

    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });

    return text;
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';

    localStorage.setItem('preferred_language', currentLanguage);

    const flagEl = document.getElementById('currentLanguageFlag');

    if (flagEl) {
        flagEl.textContent = currentLanguage === 'en' ? '🇬🇧' : '🇸🇦';
    }

    if (currentLanguage === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.dir = 'rtl';
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.dir = 'ltr';
    }

    updateAllTexts();
    showToast(t('messages.success'), 'success');
}

function updateAllTexts() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');

        if (key === 'nav.earn') {
            el.textContent = t('nav.earn');
        } else {
            el.textContent = t(key);
        }
    });
}

// ============================================================================
// 4. CURRENCY ICONS
// ============================================================================

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
    TRUMP: 'https://s2.coinmarketcap.com/static/img/coins/64x64/35336.png',
    THB: 'https://s2.coinmarketcap.com/static/img/coins/64x64/21430.png',
    ZDX: 'https://s2.coinmarketcap.com/static/img/coins/64x64/30507.png'
};

// ============================================================================
// 5. DEPOSIT ADDRESSES & MINIMUMS
// ============================================================================

const DEPOSIT_ADDRESSES = {
    REFI: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    USDT: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    BNB: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    ETH: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    SHIB: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    PEPE: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    SOL: '3DjcSVxfeP3u4WcV9KniMH11btgThnoGxcx54dMtbfuR',
    TRX: 'TMSJH4QunFiUAqZ8iLvQDPajs1v4B3e5E6',
    TRUMP: '3DjcSVxfeP3u4WcV9KniMH11btgThnoGxcx54dMtbfuR',
    THB: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450',
    ZDX: '0xbf70420f57342c6Bd4267430D4D3b7E946f09450'
};

const DEPOSIT_MINIMUMS = {
    REFI: 500000,
    USDT: 5,
    BNB: 0.015,
    ETH: 0.005,
    SHIB: 2000000,
    PEPE: 3000000,
    SOL: 0.12,
    TRX: 40,
    TRUMP: 5,
    THB: 50,
    ZDX: 10
};

const DEPOSIT_NOTES = {
    REFI: '✓ Blockchain confirmation 1-15 minutes',
    USDT: '✓ Blockchain confirmation 1-15 minutes',
    BNB: '✓ Blockchain confirmation 1-15 minutes',
    ETH: '✓ Blockchain confirmation 1-15 minutes',
    SHIB: '✓ Blockchain confirmation 1-15 minutes',
    PEPE: '✓ Blockchain confirmation 1-15 minutes',
    SOL: '✓ Blockchain confirmation 1-15 minutes',
    TRX: '✓ Blockchain confirmation 1-15 minutes',
    TRUMP: '✓ Blockchain confirmation 1-15 minutes',
    THB: '✓ Blockchain confirmation 1-15 minutes',
    ZDX: '✓ Blockchain confirmation 1-15 minutes'
};

// ============================================================================
// 6. CONSTANTS
// ============================================================================

const BOT_LINK = "https://t.me/RealnetworkPaybot/Refi";
const ADMIN_ID = "1653918641";
const SWAP_RATE = 500000;
const REFERRAL_BONUS = 250000;
const REFI_PRICE = 0.000002;
const THB_PRICE = 0.0227;

// إعدادات صفحة Earn
const EARN_CONFIG = {
    ADS_PER_CYCLE: 30,
    REWARD_PER_AD: 10000,
    RESET_HOURS: 6,
    MIN_TRANSFER: 500000
};

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
    TRUMP: 'official-trump',
    ZDX: 'zeddex'
};

const STAKING_PLANS = [
    { id: '3days', days: 3, return: 40, name: '3 Days', reward: 5, minAmount: 10 },
    { id: '7days', days: 7, return: 50, name: '7 Days', reward: 20, minAmount: 20 },
    { id: '15days', days: 15, return: 70, name: '15 Days', reward: 30, minAmount: 50 },
    { id: '30days', days: 30, return: 100, name: '30 Days', reward: 50, minAmount: 100 }
];

const STAKING_MISSIONS = [
    { id: '3days', plan: '3 Days', reward: 5, icon: 'fa-clock', claimed: false },
    { id: '7days', plan: '7 Days', reward: 20, icon: 'fa-calendar-week', claimed: false },
    { id: '15days', plan: '15 Days', reward: 30, icon: 'fa-calendar-alt', claimed: false },
    { id: '30days', plan: '30 Days', reward: 50, icon: 'fa-calendar-check', claimed: false }
];

const REFERRAL_MILESTONES = [
    { referrals: 10, reward: 3, unit: 'USDT', icon: 'fa-medal' },
    { referrals: 25, reward: 50, unit: 'USDT', icon: 'fa-medal' },
    { referrals: 50, reward: 120, unit: 'USDT', icon: 'fa-crown' },
    { referrals: 100, reward: 250, unit: 'USDT', icon: 'fa-crown' },
    { referrals: 250, reward: 500, unit: 'USDT', icon: 'fa-gem' }
];

const TOP_CRYPTOS = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'BNB', name: 'Binance Coin' },
    { symbol: 'THB', name: 'Thunder Brawl' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'TRX', name: 'TRON' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'PEPE', name: 'Pepe' },
    { symbol: 'ADA', name: 'Cardano' },
    { symbol: 'DOGE', name: 'Dogecoin' },
    { symbol: 'TON', name: 'Toncoin' },
    { symbol: 'TRUMP', name: 'Trump Coin' },
    { symbol: 'ZDX', name: 'ZedDex' }
];

const SWAP_CURRENCIES = [
    { symbol: 'USDT', name: 'Tether', icon: CMC_ICONS.USDT },
    { symbol: 'REFI', name: 'REFI Network', icon: CMC_ICONS.REFI },
    { symbol: 'THB', name: 'Thunder Brawl', icon: CMC_ICONS.THB },
    { symbol: 'BNB', name: 'Binance Coin', icon: CMC_ICONS.BNB },
    { symbol: 'ETH', name: 'Ethereum', icon: CMC_ICONS.ETH },
    { symbol: 'SOL', name: 'Solana', icon: CMC_ICONS.SOL },
    { symbol: 'SHIB', name: 'Shiba Inu', icon: CMC_ICONS.SHIB },
    { symbol: 'PEPE', name: 'Pepe', icon: CMC_ICONS.PEPE },
    { symbol: 'TRX', name: 'TRON', icon: CMC_ICONS.TRX },
    { symbol: 'TRUMP', name: 'Trump Coin', icon: CMC_ICONS.TRUMP },
    { symbol: 'ZDX', name: 'ZedDex', icon: CMC_ICONS.ZDX }
];

const ALL_ASSETS = [
    { symbol: 'REFI', name: 'REFI Network' },
    { symbol: 'THB', name: 'Thunder Brawl' },
    { symbol: 'ZDX', name: 'ZedDex' },
    { symbol: 'USDT', name: 'Tether' },
    { symbol: 'BNB', name: 'BNB' },
    { symbol: 'ETH', name: 'Ethereum' },
    { symbol: 'SHIB', name: 'Shiba Inu' },
    { symbol: 'PEPE', name: 'Pepe' },
    { symbol: 'SOL', name: 'Solana' },
    { symbol: 'TRX', name: 'TRON' },
    { symbol: 'TRUMP', name: 'Trump Coin' }
];

let currentPage = 'wallet';

// ============================================================================
// 7. STATE MANAGEMENT
// ============================================================================

let userData = null;
let selectedStakingPlan = STAKING_PLANS[0];
let swapMode = 'to-refi';
let livePrices = {};
let unreadNotifications = 0;
let currentCurrencySelector = 'pay';
let currentHistoryFilter = 'all';
let appInitialized = false;
let lastUserLoadTime = 0;
let lastPricesLoadTime = 0;
const USER_CACHE_TIME = 300000;
const PRICES_CACHE_TIME = 10800000;
let lastHistoryCheckTime = 0;
const HISTORY_CACHE_TIME = 600000;

// ============================================================================
// 8. STICKER SYSTEM
// ============================================================================

const WELCOME_STICKERS = [
    '🐸', '🫅', '🥰', '🥳', '💲', '💰', '💸', '💵', '🤪', '😱',
    '😤', '😎', '🤑', '💯', '💖', '👑', '❤️‍🔥', '🫂', '🔥', '🧡',
    '🤑', '🧟', '🎁', '💌', '🎉', '❤️‍🔥', '👑', '🚀', '💟', '🤍'
];

let lastStickerTime = 0;
const STICKER_COOLDOWN = 12 * 60 * 1000;

function showRandomSticker() {
    const now = Date.now();

    if (now - lastStickerTime < STICKER_COOLDOWN) {
        return;
    }

    const stickerElement = document.getElementById('welcomeSticker');

    if (!stickerElement) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * WELCOME_STICKERS.length);
    const randomSticker = WELCOME_STICKERS[randomIndex];

    stickerElement.textContent = randomSticker;
    stickerElement.classList.remove('sticker-pop', 'sticker-shake');

    void stickerElement.offsetWidth;

    stickerElement.classList.add('sticker-pop');

    setTimeout(() => {
        stickerElement.classList.add('sticker-shake');
    }, 200);

    setTimeout(() => {
        stickerElement.classList.remove('sticker-pop', 'sticker-shake');

        setTimeout(() => {
            stickerElement.textContent = '';
        }, 300);
    }, 3000);

    lastStickerTime = now;
    console.log('🎨 Welcome sticker displayed:', randomSticker);
}

// ============================================================================
// 9. USER IDENTIFICATION
// ============================================================================

const userId = tg?.initDataUnsafe?.user?.id?.toString() ||
               localStorage.getItem('refi_user_id') ||
               'guest_' + Math.random().toString(36).substr(2, 9);

const userName = tg?.initDataUnsafe?.user?.first_name || 'REFI User';

localStorage.setItem('refi_user_id', userId);

const userIdEl = document.getElementById('userId');

if (userIdEl) {
    userIdEl.textContent = userName;
}

function hasReferralCode() {
    const urlParams = new URLSearchParams(window.location.search);

    return !!(urlParams.get('startapp') || urlParams.get('ref') || tg?.initDataUnsafe?.start_param);
}

function generateReferralCode() {
    return userId;
}

function getReferralLink() {
    return `${BOT_LINK}?startapp=${userData.referralCode}`;
}

// ============================================================================
// 10. ADMIN SYSTEM
// ============================================================================

let isAdmin = userId === ADMIN_ID;

function checkAdminAndAddCrown() {
    if (!isAdmin) {
        return;
    }

    const addCrown = () => {
        const header = document.querySelector('.header-actions');

        if (!header) {
            return false;
        }

        const existingCrown = document.getElementById('adminCrownBtn');

        if (existingCrown) {
            existingCrown.remove();
        }

        const adminBtn = document.createElement('button');

        adminBtn.id = 'adminCrownBtn';
        adminBtn.className = 'icon-btn';
        adminBtn.innerHTML = '<i class="fa-solid fa-crown" style="color: gold;"></i>';
        adminBtn.onclick = showAdminPanel;
        adminBtn.title = 'Admin Panel';

        const notifBtn = document.getElementById('notificationBtn');

        if (notifBtn) {
            header.insertBefore(adminBtn, notifBtn);
        } else {
            header.appendChild(adminBtn);
        }

        return true;
    };

    if (!addCrown()) {
        setTimeout(addCrown, 500);
    }
}

// ============================================================================
// 11. TRANSACTIONS STORAGE
// ============================================================================

const TRANSACTIONS_KEY = `transactions_${userId}`;

function loadLocalTransactions() {
    try {
        const saved = localStorage.getItem(TRANSACTIONS_KEY);

        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Error loading transactions:", error);

        return [];
    }
}

function saveLocalTransactions(transactions) {
    try {
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (error) {
        console.error("Error saving transactions:", error);
    }
}

function cleanupDuplicateTransactions() {
    const transactions = loadLocalTransactions();
    const uniqueMap = new Map();

    transactions.forEach(tx => {
        const key = tx.firebaseId || `${tx.timestamp}_${tx.type}_${tx.amount}`;

        uniqueMap.set(key, tx);
    });

    const uniqueTransactions = Array.from(uniqueMap.values());

    if (uniqueTransactions.length !== transactions.length) {
        console.log(`🧹 Cleaned up ${transactions.length - uniqueTransactions.length} duplicate transactions`);

        saveLocalTransactions(uniqueTransactions);

        if (userData) {
            userData.transactions = uniqueTransactions;
            localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        }

        if (currentPage === 'history' || document.getElementById('historyModal')?.classList.contains('show')) {
            renderHistory(currentHistoryFilter);
        }
    }
}

// ============================================================================
// 12. ON-DEMAND LISTENERS SYSTEM
// ============================================================================

let activeListeners = new Map();
let listenerTimeouts = new Map();

function startOnDemandListener(collection, docId, callback, timeoutMs = 30000) {
    const listenerId = `${collection}_${docId}`;

    if (activeListeners.has(listenerId)) {
        console.log(`🛑 Stopping previous listener for ${listenerId}`);

        activeListeners.get(listenerId)();
        activeListeners.delete(listenerId);
    }

    if (listenerTimeouts.has(listenerId)) {
        clearTimeout(listenerTimeouts.get(listenerId));
        listenerTimeouts.delete(listenerId);
    }

    console.log(`👂 Starting on-demand listener for ${collection}/${docId}`);

    const unsubscribe = db.collection(collection).doc(docId).onSnapshot((doc) => {
        if (doc.exists) {
            const data = doc.data();

            console.log(`📡 Listener update for ${collection}/${docId}:`, data.status);

            callback(data);

            if (data.status === 'approved' || data.status === 'rejected') {
                console.log(`✅ Final status reached, stopping listener`);

                stopOnDemandListener(listenerId);
            }
        }
    }, (error) => {
        console.error(`❌ Listener error:`, error);

        stopOnDemandListener(listenerId);
    });

    activeListeners.set(listenerId, unsubscribe);

    const timeout = setTimeout(() => {
        console.log(`⏰ Listener timeout for ${collection}/${docId}`);

        stopOnDemandListener(listenerId);
    }, timeoutMs);

    listenerTimeouts.set(listenerId, timeout);
}

function stopOnDemandListener(listenerId) {
    if (activeListeners.has(listenerId)) {
        activeListeners.get(listenerId)();
        activeListeners.delete(listenerId);
    }

    if (listenerTimeouts.has(listenerId)) {
        clearTimeout(listenerTimeouts.get(listenerId));
        listenerTimeouts.delete(listenerId);
    }

    console.log(`🛑 Listener stopped: ${listenerId}`);
}

function stopAllListeners() {
    console.log(`🛑 Stopping all active listeners (${activeListeners.size} listeners)`);

    activeListeners.forEach((unsubscribe) => {
        unsubscribe();
    });

    listenerTimeouts.forEach((timeout) => {
        clearTimeout(timeout);
    });

    activeListeners.clear();
    listenerTimeouts.clear();
}

// ============================================================================
// 13. PENDING TRANSACTIONS CHECKER
// ============================================================================

async function checkPendingTransactions() {
    if (!db || !userData) {
        return;
    }

    const now = Date.now();

    if (now - lastHistoryCheckTime < HISTORY_CACHE_TIME) {
        console.log("📦 Using cached history (less than 10 minutes old)");

        return;
    }

    lastHistoryCheckTime = now;

    console.log("🔍 Checking for updated pending transactions...");

    const localTransactions = loadLocalTransactions();
    const pendingTxs = localTransactions.filter(tx =>
        (tx.type === 'deposit' || tx.type === 'withdraw') &&
        tx.status === 'pending' &&
        tx.firebaseId &&
        !tx.firebaseId.startsWith('temp_')
    );

    if (pendingTxs.length === 0) {
        console.log("✅ No pending transactions to check");

        return;
    }

    console.log(`⏳ Found ${pendingTxs.length} pending transactions, checking status...`);

    let updated = false;

    for (const tx of pendingTxs) {
        try {
            const collection = tx.type === 'deposit' ? 'deposit_requests' : 'withdrawals';
            const docRef = db.collection(collection).doc(tx.firebaseId);
            const docSnap = await docRef.get();

            if (!docSnap.exists) {
                continue;
            }

            const data = docSnap.data();

            if (data.status !== tx.status) {
                console.log(`🔄 Transaction ${tx.firebaseId} status changed: ${tx.status} → ${data.status}`);

                const allTxs = loadLocalTransactions();
                const index = allTxs.findIndex(t => t.firebaseId === tx.firebaseId);

                if (index !== -1) {
                    allTxs[index] = { ...allTxs[index], ...data, status: data.status };

                    saveLocalTransactions(allTxs);

                    if (userData.transactions) {
                        const userIndex = userData.transactions.findIndex(t => t.firebaseId === tx.firebaseId);

                        if (userIndex !== -1) {
                            userData.transactions[userIndex] = { ...userData.transactions[userIndex], ...data, status: data.status };
                        }
                    }

                    if (data.status === 'approved' && tx.type === 'deposit') {
                        userData.balances[tx.currency] = (userData.balances[tx.currency] || 0) + tx.amount;

                        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

                        showToast(`✅ Your ${tx.amount} ${tx.currency} deposit has been approved!`, 'success');
                    }

                    if (data.status === 'rejected' && tx.type === 'withdraw') {
                        userData.balances[tx.currency] = (userData.balances[tx.currency] || 0) + tx.amount;

                        if (tx.fee) {
                            userData.balances[tx.feeCurrency] = (userData.balances[tx.feeCurrency] || 0) + tx.fee;
                        }

                        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

                        showToast(`❌ Your withdrawal was rejected: ${data.reason || 'Unknown reason'}`, 'error');
                    }

                    updated = true;
                }
            }
        } catch (error) {
            console.error(`❌ Error checking transaction ${tx.firebaseId}:`, error);
        }
    }

    if (updated) {
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        if (currentPage === 'history' || document.getElementById('historyModal')?.classList.contains('show')) {
            renderHistory(currentHistoryFilter);
        }

        updateUI();
        showToast('✅ Transaction history updated!', 'success');
    }
}

// ============================================================================
// 14. LOAD USER DATA
// ============================================================================

async function loadUserData(force = false) {
    try {
        console.log("📂 Loading user data for:", userId);

        const now = Date.now();
        const localData = localStorage.getItem(`user_${userId}`);

        if (!force && localData && (now - lastUserLoadTime) < USER_CACHE_TIME) {
            userData = JSON.parse(localData);

            console.log("✅ Using cached user data (less than 5 min old)");

            updateUI();
            updateNotificationBadge();
            checkAdminAndAddCrown();
            updateEarnUI();

            return;
        }

        if (localData) {
            userData = JSON.parse(localData);

            console.log("📦 Using localStorage data while fetching fresh data");
        }

        if (db) {
            console.log("🔥 Loading from Firebase...");

            const userDoc = await db.collection('users').doc(userId).get();

            if (userDoc.exists) {
                const fbData = userDoc.data();

                userData = {
                    ...userData,
                    ...fbData,
                    balances: { ...userData?.balances, ...fbData.balances },
                    notifications: mergeNotifications(userData?.notifications || [], fbData.notifications || [])
                };
            } else if (!userData) {
                console.log("📝 Creating new user");

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
                        TRX: 0,
                        TRUMP: 0,
                        THB: 0,
                        ZDX: 0
                    },
                    referralCode: generateReferralCode(),
                    referredBy: null,
                    referrals: [],
                    referralCount: 0,
                    staking: [],
                    stakingMissions: STAKING_MISSIONS.map(m => ({ ...m, claimed: false })),
                    referralMilestones: REFERRAL_MILESTONES.map(m => ({ ...m, claimed: false })),
                    notifications: [],
                    usedHashes: [],
                    totalRefiEarned: 0,
                    totalUsdtEarned: 0,
                    lastLogin: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                };

                await db.collection('users').doc(userId).set(userData);
            }

            lastUserLoadTime = now;
            localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        }

        userData.transactions = loadLocalTransactions();
        cleanupDuplicateTransactions();

        updateUI();

        if (hasReferralCode()) {
            await processReferral();
        }

        updateNotificationBadge();
        checkAdminAndAddCrown();
        updateEarnUI();
    } catch (error) {
        console.error("❌ Error loading user data:", error);
    }
}

function mergeNotifications(local, firebase) {
    const notificationMap = new Map();

    local.forEach(n => notificationMap.set(n.id, n));

    firebase.forEach(fbNotif => {
        const localNotif = notificationMap.get(fbNotif.id);

        if (localNotif) {
            notificationMap.set(fbNotif.id, { ...fbNotif, read: localNotif.read });
        } else {
            notificationMap.set(fbNotif.id, fbNotif);
        }
    });

    return Array.from(notificationMap.values()).sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );
}

// ============================================================================
// 15. REFERRAL SYSTEM
// ============================================================================

async function processReferral() {
    try {
        console.log("🔍 Checking for referral...");

        const urlParams = new URLSearchParams(window.location.search);
        let referralCode = urlParams.get('start') || urlParams.get('ref');

        if (!referralCode && tg?.initDataUnsafe?.start_param) {
            referralCode = tg.initDataUnsafe.start_param;
        }

        if (!referralCode) {
            console.log("ℹ️ No referral code detected");

            return;
        }

        if (!userData) {
            console.log("⏳ User data not loaded yet, waiting...");

            setTimeout(processReferral, 1000);

            return;
        }

        if (referralCode === userData.referralCode) {
            console.log("⚠️ Cannot refer yourself");

            return;
        }

        if (userData.referredBy) {
            console.log("✅ User already referred by:", userData.referredBy);

            return;
        }

        const pendingReferralKey = `processed_referral_${userId}`;

        if (localStorage.getItem(pendingReferralKey) === referralCode) {
            console.log("⚠️ This referral already processed");

            return;
        }

        console.log("🎯 Processing referral code:", referralCode);

        const referrerId = referralCode;

        if (!referrerId || referrerId === userId) {
            console.log("⚠️ Invalid referrer ID");

            return;
        }

        if (!db) {
            console.log("📦 Firebase not available, saving pending referral");

            localStorage.setItem('pending_referral', referralCode);

            return;
        }

        const referrerDoc = await db.collection('users').doc(referrerId).get();

        if (!referrerDoc.exists) {
            console.log("❌ No referrer found with code:", referralCode);

            return;
        }

        const referrerData = referrerDoc.data();

        if (referrerData.referrals && referrerData.referrals.includes(userId)) {
            console.log("✅ User already in referrer's list");

            return;
        }

        console.log("✅ Valid referrer found:", referrerId);

        const updatedReferrals = [...(referrerData.referrals || []), userId];
        const updatedReferralCount = (referrerData.referralCount || 0) + 1;
        const updatedRefiBalance = (referrerData.balances?.REFI || 0) + REFERRAL_BONUS;

        await db.collection('users').doc(referrerId).update({
            referrals: updatedReferrals,
            referralCount: updatedReferralCount,
            'balances.REFI': updatedRefiBalance,
            totalRefiEarned: (referrerData.totalRefiEarned || 0) + REFERRAL_BONUS,
            lastReferralAt: new Date().toISOString()
        });

        userData.referredBy = referralCode;
        userData.balances.REFI = (userData.balances.REFI || 0) + 10000;

        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        localStorage.setItem(pendingReferralKey, referralCode);

        await db.collection('users').doc(userId).update({
            referredBy: referralCode,
            'balances.REFI': userData.balances.REFI,
            referredAt: new Date().toISOString()
        });

        const welcomeTransaction = {
            userId: userId,
            userName: userName,
            type: 'referral_bonus',
            amount: 10000,
            currency: 'REFI',
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: 'Welcome bonus from referral'
        };

        addTransaction(welcomeTransaction);

        try {
            await db.collection('transactions').add(welcomeTransaction);
        } catch (error) {
            console.error("❌ Error saving welcome transaction to Firebase:", error);
        }

        const referrerTransaction = {
            userId: referrerId,
            type: 'referral_bonus',
            amount: REFERRAL_BONUS,
            currency: 'REFI',
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: `Referral bonus from ${userId} (${userName})`
        };

        try {
            await db.collection('transactions').add(referrerTransaction);
        } catch (error) {
            console.error("❌ Error saving referrer transaction to Firebase:", error);
        }

        await addNotification(referrerId, t('notif.referralBonus', { amount: REFERRAL_BONUS.toLocaleString() }), 'success');
        await addNotification(userId, t('notif.welcomeBonus'), 'success');

        showToast(t('notif.welcomeBonus'), 'success');

        updateUI();

        if (currentPage === 'referral') {
            updateReferralStats();
            renderReferralMilestones();
        }

        console.log("✅ Referral processed successfully!");
    } catch (error) {
        console.error("❌ Error processing referral:", error);
    }
}

function copyReferralLink() {
    const link = getReferralLink();

    navigator.clipboard.writeText(link);

    showToast(t('success.referralCopied'), 'success');
    animateElement('.copy-btn', 'pop');
}

function shareReferral() {
    const link = getReferralLink();
    const text = `🚀 Join REFI Network and get 10,000 REFI bonus! Use my link: ${link}`;

    if (tg?.shareToStory) {
        tg.shareToStory(text);
    } else {
        navigator.clipboard.writeText(text);

        showToast(t('messages.success'), 'success');
    }
}

// ============================================================================
// 16. ADD NOTIFICATION
// ============================================================================

async function addNotification(targetUserId, message, type = 'info') {
    if (!db) {
        return;
    }

    const notification = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        message: message,
        type: type,
        read: false,
        timestamp: new Date().toISOString()
    };

    try {
        await db.collection('users').doc(targetUserId).update({
            notifications: firebase.firestore.FieldValue.arrayUnion(notification)
        });

        if (targetUserId === userData?.userId) {
            if (!userData.notifications) {
                userData.notifications = [];
            }

            userData.notifications.push(notification);

            updateNotificationBadge();
            showToast(message, type);
            localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        }

        console.log("✅ Notification added:", notification);
    } catch (error) {
        console.error("❌ Error adding notification:", error);
    }
}

// ============================================================================
// 17. PRICES
// ============================================================================

async function loadPricesOnce() {
    console.log("💰 Loading crypto prices...");

    await fetchLivePrices();
}

async function fetchLivePrices(force = false) {
    const now = Date.now();
    const cachedPrices = localStorage.getItem('live_prices');

    if (!force && cachedPrices && (now - lastPricesLoadTime) < PRICES_CACHE_TIME) {
        const { prices, timestamp } = JSON.parse(cachedPrices);

        livePrices = prices;
        lastPricesLoadTime = timestamp;

        console.log("📦 Using cached prices (less than 3 hours old)");

        updatePrices();

        return;
    }

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

        if (!livePrices.TRUMP) {
            livePrices.TRUMP = { price: 5.00, change: 0 };
        }

        lastPricesLoadTime = now;

        localStorage.setItem('live_prices', JSON.stringify({
            prices: livePrices,
            timestamp: now
        }));

        updatePrices();
    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

function updatePrices() {
    renderTopCryptos();
    renderAssets();
    updateTotalBalance();
}

function refreshPrices() {
    animateElement('.refresh-btn', 'pop');

    fetchLivePrices(true);

    showToast(t('messages.success'), 'success');
}

// ============================================================================
// 18. RENDER FUNCTIONS
// ============================================================================

function renderAssets() {
    const assetsList = document.getElementById('assetsList');

    if (!assetsList || !userData) {
        return;
    }

    const sortedAssets = [...ALL_ASSETS].sort((a, b) => {
        if (a.symbol === 'REFI') return -1;
        if (b.symbol === 'REFI') return 1;
        if (a.symbol === 'THB') return -1;
        if (b.symbol === 'THB') return 1;
        if (a.symbol === 'ZDX') return -1;
        if (b.symbol === 'ZDX') return 1;

        const aBalance = userData.balances[a.symbol] || 0;
        const bBalance = userData.balances[b.symbol] || 0;

        return bBalance - aBalance;
    });

    assetsList.innerHTML = sortedAssets.map(asset => {
        const balance = userData.balances[asset.symbol] || 0;
        let price = 0;

        if (asset.symbol === 'REFI') {
            price = REFI_PRICE;
        } else if (asset.symbol === 'THB') {
            price = THB_PRICE;
        } else {
            price = livePrices[asset.symbol]?.price || 0;
        }

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

    if (!topCryptoList) {
        return;
    }

    if (Object.keys(livePrices).length === 0) {
        topCryptoList.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin-pulse"></i> ' + t('messages.loading') + '</div>';

        return;
    }

    topCryptoList.innerHTML = TOP_CRYPTOS.map(crypto => {
        let priceData;

        if (crypto.symbol === 'THB') {
            priceData = { price: THB_PRICE, change: 0 };
        } else {
            priceData = livePrices[crypto.symbol] || { price: 0, change: 0 };
        }

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

    if (!plansGrid) {
        return;
    }

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

    if (!missionsGrid || !userData) {
        return;
    }

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

    if (!milestonesList || !userData) {
        return;
    }

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
                    ''
                }
            </div>
        `;
    }).join('');
}

// ============================================================================
// 19. HISTORY FUNCTIONS
// ============================================================================

function renderHistory(filter = 'all') {
    const historyList = document.getElementById('historyList');

    if (!historyList) {
        return;
    }

    currentHistoryFilter = filter;

    let transactions = loadLocalTransactions();

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
        const formattedDate = date.toLocaleDateString() + ' ' +
                             date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
        } else if (tx.type === 'earn') {
            icon = 'fa-tv';
            typeClass = 'deposit';
            typeText = 'Earn';
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

function showHistory() {
    currentPage = 'history';

    const modal = document.getElementById('historyModal');
    const header = modal.querySelector('.modal-header');
    let refreshBtn = header.querySelector('.refresh-history-btn');

    if (!refreshBtn) {
        refreshBtn = document.createElement('button');

        refreshBtn.className = 'refresh-history-btn';
        refreshBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';

        refreshBtn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();

            this.querySelector('i').classList.add('fa-spin');

            lastHistoryCheckTime = 0;

            checkPendingTransactions().finally(() => {
                setTimeout(() => {
                    this.querySelector('i').classList.remove('fa-spin');
                }, 1000);
            });
        };

        refreshBtn.style.marginLeft = '10px';
        refreshBtn.style.background = 'transparent';
        refreshBtn.style.border = 'none';
        refreshBtn.style.color = 'var(--pink-1)';
        refreshBtn.style.fontSize = '16px';
        refreshBtn.style.cursor = 'pointer';
        refreshBtn.title = 'Check for updates';

        header.appendChild(refreshBtn);

        console.log("✅ History refresh button added");
    }

    modal.classList.add('show');

    setTimeout(() => {
        checkPendingTransactions();
    }, 500);

    renderHistory('all');
    animateElement('.modal-content', 'slideUpModal');
}

// ============================================================================
// 20. NOTIFICATIONS FUNCTIONS
// ============================================================================

function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');

    if (!notificationsList || !userData) {
        return;
    }

    const notifications = userData.notifications || [];

    let controlsHTML = `
        <div style="display: flex; gap: 10px; margin-bottom: 15px; padding: 0 5px;">
            <button onclick="clearReadNotifications()"
                    style="flex: 1; padding: 8px; background: rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.2); border-radius: 8px; color: var(--quantum-blue); font-size: 12px; cursor: pointer;">
                <i class="fa-regular fa-trash-can"></i> ${t('notifications.clear_read')}
            </button>
            <button onclick="clearAllNotifications()"
                    style="flex: 1; padding: 8px; background: rgba(255,68,68,0.1); border: 1px solid rgba(255,68,68,0.2); border-radius: 8px; color: #ff4444; font-size: 12px; cursor: pointer;">
                <i class="fa-regular fa-bell-slash"></i> ${t('notifications.clear_all')}
            </button>
        </div>
    `;

    if (notifications.length === 0) {
        notificationsList.innerHTML = controlsHTML + `
            <div class="empty-state">
                <i class="fa-regular fa-bell-slash"></i>
                <p>${t('notifications.no_notifications')}</p>
                <span>We'll notify you when something arrives</span>
            </div>
        `;

        return;
    }

    notifications.sort((a, b) => {
        const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : new Date(a.timestamp).getTime();
        const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : new Date(b.timestamp).getTime();

        return timeB - timeA;
    });

    let notificationsHTML = '';

    notifications.forEach(notif => {
        let date = new Date();

        if (notif.timestamp?.toDate) {
            date = notif.timestamp.toDate();
        } else if (notif.timestamp) {
            date = new Date(notif.timestamp);
        }

        const formattedDate = date.toLocaleDateString() + ' ' +
                             date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const unreadClass = notif.read ? '' : 'unread';

        let icon = 'fa-bell';

        if (notif.type === 'success') icon = 'fa-circle-check';
        if (notif.type === 'error') icon = 'fa-circle-xmark';

        notificationsHTML += `
            <div class="notification-item ${unreadClass}" onclick="markNotificationRead('${notif.id}')">
                <div class="notification-header">
                    <span class="notification-title">
                        <i class="fa-regular ${icon}"></i>
                        ${t('notifications.title')}
                    </span>
                    <span class="notification-time">${formattedDate}</span>
                </div>
                <div class="notification-message">
                    ${notif.message}
                </div>
            </div>
        `;
    });

    notificationsList.innerHTML = controlsHTML + notificationsHTML;
}

async function markNotificationRead(notificationId) {
    if (!userData.notifications) {
        return;
    }

    const notification = userData.notifications.find(n => n.id === notificationId);

    if (notification && !notification.read) {
        notification.read = true;

        unreadNotifications--;

        updateNotificationBadge();

        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        if (db) {
            try {
                await db.collection('users').doc(userId).update({
                    notifications: userData.notifications
                });
            } catch (error) {
                console.error("❌ Error updating notification in Firebase:", error);
            }
        }

        renderNotifications();
    }
}

function clearReadNotifications() {
    if (!userData.notifications || userData.notifications.length === 0) {
        showToast(t('notifications.no_notifications'), 'info');

        return;
    }

    const readCount = userData.notifications.filter(n => n.read).length;
    const unreadCount = userData.notifications.filter(n => !n.read).length;

    if (readCount === 0) {
        showToast(t('notifications.no_read'), 'info');

        return;
    }

    if (confirm(t('notifications.confirm_clear_read', { count: readCount, unread: unreadCount }))) {
        userData.notifications = userData.notifications.filter(n => !n.read);

        unreadNotifications = userData.notifications.length;

        updateNotificationBadge();

        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        if (db) {
            db.collection('users').doc(userId).update({
                notifications: userData.notifications
            }).catch(console.error);
        }

        renderNotifications();

        showToast(t('notifications.cleared', { count: readCount }), 'success');
    }
}

function clearAllNotifications() {
    if (!userData.notifications || userData.notifications.length === 0) {
        showToast(t('notifications.no_notifications'), 'info');

        return;
    }

    const unreadCount = userData.notifications.filter(n => !n.read).length;

    if (unreadCount > 0) {
        if (!confirm(t('notifications.confirm_clear_all_unread', { count: unreadCount }))) {
            return;
        }
    } else {
        if (!confirm(t('notifications.confirm_clear_all'))) {
            return;
        }
    }

    userData.notifications = [];

    unreadNotifications = 0;

    updateNotificationBadge();

    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

    if (db) {
        db.collection('users').doc(userId).update({
            notifications: []
        }).catch(console.error);
    }

    renderNotifications();

    showToast(t('notifications.cleared', { count: 'all' }), 'success');
}

function showNotifications() {
    console.log("🔔 Opening notifications modal");

    const modal = document.getElementById('notificationsModal');

    if (!modal) {
        console.error("❌ Notifications modal not found");

        showToast("Notifications modal not found", "error");

        return;
    }

    modal.classList.add('show');

    renderNotifications();
    animateElement('.modal-content', 'slideUpModal');
}

function fixNotificationButton() {
    console.log("🔧 Ensuring notification button works...");

    const notifBtn = document.getElementById('notificationBtn');

    if (notifBtn) {
        const newBtn = notifBtn.cloneNode(true);

        if (notifBtn.parentNode) {
            notifBtn.parentNode.replaceChild(newBtn, notifBtn);
        }

        newBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            console.log("🔔 Notification button clicked");

            showNotifications();
        });

        console.log("✅ Notification button fixed and ready");
    } else {
        console.warn("⚠️ Notification button not found, will retry...");

        setTimeout(fixNotificationButton, 1000);
    }
}

// ============================================================================
// 21. UTILITY FUNCTIONS
// ============================================================================

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
        TRUMP: 'Trump Coin',
        THB: 'Thunder Brawl',
        ZDX: 'ZedDex'
    };

    return names[symbol] || symbol;
}

function formatBalance(balance, symbol) {
    if (symbol === 'REFI' || symbol === 'SHIB' || symbol === 'PEPE' || symbol === 'TRUMP' || symbol === 'THB' || symbol === 'ZDX') {
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
    if (!userData) {
        return;
    }

    let total = 0;

    total += userData.balances.USDT || 0;
    total += (userData.balances.REFI || 0) * REFI_PRICE;
    total += (userData.balances.THB || 0) * THB_PRICE;
    total += (userData.balances.BNB || 0) * (livePrices.BNB?.price || 0);
    total += (userData.balances.BTC || 0) * (livePrices.BTC?.price || 0);
    total += (userData.balances.ETH || 0) * (livePrices.ETH?.price || 0);
    total += (userData.balances.SOL || 0) * (livePrices.SOL?.price || 0);
    total += (userData.balances.TRX || 0) * (livePrices.TRX?.price || 0.25);
    total += (userData.balances.TRUMP || 0) * (livePrices.TRUMP?.price || 5.00);
    total += (userData.balances.ZDX || 0) * (livePrices.ZDX?.price || 0);

    document.getElementById('totalBalance').textContent = '$' + total.toFixed(2);
}

function updateUI() {
    renderAssets();
    updateTotalBalance();
    updateStakingStats();
    updateReferralStats();
    updateSwapBalances();
    updateEarnUI();
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (badge && userData) {
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

function scrollToTop() {
    document.querySelector('.app-container').scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function setupScrollListener() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    const container = document.querySelector('.app-container');

    if (!scrollBtn || !container) {
        return;
    }

    container.addEventListener('scroll', () => {
        if (container.scrollTop > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

// ============================================================================
// 22. NAVIGATION FUNCTIONS
// ============================================================================

function showWallet() {
    currentPage = 'wallet';

    document.getElementById('walletSection').classList.remove('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('earnSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.add('hidden');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(1)').classList.add('active');

    renderAssets();
    updateTotalBalance();
    animateElement('.balance-card', 'pop');

    showRandomSticker();
}

function showSwap() {
    currentPage = 'swap';

    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.remove('hidden');
    document.getElementById('earnSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.add('hidden');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(2)').classList.add('active');

    updateSwapBalances();
    calculateSwap();
    animateElement('.swap-card', 'scaleIn');

    showRandomSticker();
}

function showEarn() {
    currentPage = 'earn';

    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('earnSection').classList.remove('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.add('hidden');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(3)').classList.add('active');

    updateEarnUI();
    animateElement('.earn-stats', 'slideUp');

    showRandomSticker();
}

function showStaking() {
    currentPage = 'staking';

    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('earnSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.remove('hidden');
    document.getElementById('referralSection').classList.add('hidden');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(4)').classList.add('active');

    updateStakingStats();
    renderStakingMissions();
    animateElement('.staking-stats', 'slideUp');

    showRandomSticker();
}

function showReferral() {
    currentPage = 'referral';

    document.getElementById('walletSection').classList.add('hidden');
    document.getElementById('swapSection').classList.add('hidden');
    document.getElementById('earnSection').classList.add('hidden');
    document.getElementById('stakingSection').classList.add('hidden');
    document.getElementById('referralSection').classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector('.nav-item:nth-child(5)').classList.add('active');

    updateReferralStats();
    renderReferralMilestones();
    animateElement('.referral-link-card', 'pop');

    showRandomSticker();
}

// ============================================================================
// 23. STAKING FUNCTIONS
// ============================================================================

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

function updateStakingStats() {
    if (!userData) {
        return;
    }

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

    if (!activeStakes || !userData) {
        return;
    }

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
                    ''
                }
            </div>
        `;
    }).join('');
}

function stakeUSDT() {
    const amount = parseFloat(document.getElementById('stakeAmount').value);

    if (!amount || amount <= 0) {
        showToast(t('error.enterAmount'), 'error');
        animateElement('#stakeAmount', 'shake');

        return;
    }

    if (amount < selectedStakingPlan.minAmount) {
        showToast(`Minimum stake is ${selectedStakingPlan.minAmount} USDT for this plan`, 'error');

        return;
    }

    if (!userData.balances.USDT || userData.balances.USDT < amount) {
        showToast(t('error.insufficientBalance', { currency: 'USDT' }), 'error');

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

    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

    const transaction = {
        userId: userId,
        userName: userName,
        type: 'staking',
        amount: amount,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staked for ${selectedStakingPlan.name}`
    };

    addTransaction(transaction);

    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            staking: userData.staking
        }).catch(console.error);

        db.collection('transactions').add(transaction).catch(console.error);
    }

    showToast(t('success.stakeCompleted', { amount }), 'success');

    document.getElementById('stakeAmount').value = '';

    updateStakingStats();
    renderStakingMissions();
    updateUI();
    animateElement('.confirm-btn', 'pop');
}

function claimStakingReward(startDate) {
    const stake = userData.staking.find(s => s.startDate === startDate);

    if (!stake || stake.claimed) {
        return;
    }

    const reward = stake.amount * stake.plan.return / 100;

    userData.balances.USDT += reward;
    stake.claimed = true;

    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

    const transaction = {
        userId: userId,
        userName: userName,
        type: 'staking',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staking reward for ${stake.plan.name}`
    };

    addTransaction(transaction);

    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            staking: userData.staking
        }).catch(console.error);

        db.collection('transactions').add(transaction).catch(console.error);
    }

    showToast(`Claimed ${reward.toFixed(2)} USDT rewards!`, 'success');

    updateStakingStats();
    updateUI();
}

function claimStakingMission(missionId) {
    const missionIndex = userData.stakingMissions.findIndex(m => m.id === missionId);

    if (missionIndex === -1 || userData.stakingMissions[missionIndex].claimed) {
        return;
    }

    const hasStaked = userData.staking.some(s => s.plan.id === missionId);

    if (!hasStaked) {
        showToast(`You need to complete a ${STAKING_PLANS.find(p => p.id === missionId).name} stake first!`, 'error');

        return;
    }

    const reward = STAKING_PLANS.find(p => p.id === missionId).reward;

    userData.balances.USDT += reward;
    userData.stakingMissions[missionIndex].claimed = true;

    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

    const transaction = {
        userId: userId,
        userName: userName,
        type: 'staking',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Staking mission reward for ${STAKING_PLANS.find(p => p.id === missionId).name}`
    };

    addTransaction(transaction);

    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            stakingMissions: userData.stakingMissions
        }).catch(console.error);

        db.collection('transactions').add(transaction).catch(console.error);
    }

    showToast(`Claimed ${reward} USDT!`, 'success');

    renderStakingMissions();
    updateUI();
    animateElement('.mission-card', 'pop');
}

function claimReferralMilestone(referrals) {
    const milestoneIndex = userData.referralMilestones.findIndex(m => m.referrals === referrals);

    if (milestoneIndex === -1 || userData.referralMilestones[milestoneIndex].claimed) {
        return;
    }

    if (userData.referralCount < referrals) {
        showToast(`You need ${referrals} referrals to claim this!`, 'error');

        return;
    }

    const reward = REFERRAL_MILESTONES.find(m => m.referrals === referrals).reward;

    userData.balances.USDT += reward;
    userData.totalUsdtEarned += reward;
    userData.referralMilestones[milestoneIndex].claimed = true;

    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

    const transaction = {
        userId: userId,
        userName: userName,
        type: 'referral_bonus',
        amount: reward,
        currency: 'USDT',
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Referral milestone: ${referrals} referrals`
    };

    addTransaction(transaction);

    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances,
            totalUsdtEarned: userData.totalUsdtEarned,
            referralMilestones: userData.referralMilestones
        }).catch(console.error);

        db.collection('transactions').add(transaction).catch(console.error);
    }

    showToast(`Claimed ${reward} USDT!`, 'success');

    updateReferralStats();
    renderReferralMilestones();
    updateUI();
    animateElement('.milestone-item', 'pop');
}

function updateReferralStats() {
    if (!userData) {
        return;
    }

    document.getElementById('totalReferrals').textContent = userData.referralCount || 0;
    document.getElementById('refiEarned').textContent = ((userData.referralCount || 0) * REFERRAL_BONUS).toLocaleString() + ' REFI';
    document.getElementById('usdtEarned').textContent = (userData.totalUsdtEarned || 0).toFixed(2) + ' USDT';

    const referralLinkInput = document.getElementById('referralLink');

    if (referralLinkInput) {
        referralLinkInput.value = getReferralLink();
    }
}

// ============================================================================
// 24. SWAP FUNCTIONS
// ============================================================================

function updateSwapBalances() {
    if (!userData) {
        return;
    }

    const payCurrency = document.getElementById('payCurrency').textContent;
    const receiveCurrency = document.getElementById('receiveCurrency').textContent;

    document.getElementById('payBalance').textContent = `Balance: ${formatBalance(userData.balances[payCurrency] || 0, payCurrency)}`;
    document.getElementById('receiveBalance').textContent = `Balance: ${formatBalance(userData.balances[receiveCurrency] || 0, receiveCurrency)}`;
}

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
    const payCurrency = document.getElementById('payCurrency').textContent;
    const receiveCurrency = document.getElementById('receiveCurrency').textContent;

    if (currentCurrencySelector === 'pay') {
        if (symbol === 'USDT') {
            showToast('❌ Swapping FROM USDT to other tokens temporarily unavailable', 'warning');

            return;
        }

        document.getElementById('payCurrency').textContent = symbol;
        document.getElementById('payCurrencyIcon').src = getCurrencyIcon(symbol);

        if (symbol === 'USDT') {
            document.getElementById('receiveCurrency').textContent = 'REFI';
            document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.REFI;
            swapMode = 'to-refi';
        } else if (symbol === 'REFI') {
            document.getElementById('receiveCurrency').textContent = 'USDT';
            document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.USDT;
            swapMode = 'to-usdt';
        } else if (symbol === 'THB') {
            document.getElementById('receiveCurrency').textContent = 'USDT';
            document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.USDT;
            swapMode = 'to-usdt';
        } else {
            document.getElementById('receiveCurrency').textContent = 'REFI';
            document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.REFI;
            swapMode = 'to-refi';
        }
    } else {
        if (symbol === 'BNB') {
            showToast(t('swap.bnbNotAllowed'), 'warning');

            return;
        }

        document.getElementById('receiveCurrency').textContent = symbol;
        document.getElementById('receiveCurrencyIcon').src = getCurrencyIcon(symbol);

        if (symbol === 'REFI') {
            swapMode = 'to-refi';
        } else if (symbol === 'USDT') {
            swapMode = 'to-usdt';
        } else if (symbol === 'THB') {
            swapMode = 'to-usdt';
        } else {
            swapMode = 'to-other';
        }
    }

    closeModal('currencySelectorModal');

    updateSwapNote();
    calculateSwap();
    updateSwapBalances();
}

function updateSwapNote() {
    const payCurrency = document.getElementById('payCurrency').textContent;
    const receiveCurrency = document.getElementById('receiveCurrency').textContent;
    const swapNote = document.getElementById('swapNote');
    const swapRate = document.getElementById('swapRate');

    if (payCurrency === 'USDT' && receiveCurrency === 'REFI') {
        swapNote.textContent = 'You can swap USDT to REFI at fixed rate';
        swapRate.textContent = `1 USDT = ${SWAP_RATE.toLocaleString()} REFI`;
    } else if (payCurrency === 'REFI' && receiveCurrency === 'USDT') {
        swapNote.textContent = 'You can swap REFI to USDT at fixed rate';
        swapRate.textContent = `${SWAP_RATE.toLocaleString()} REFI = 1 USDT`;
    } else if (payCurrency === 'USDT' && receiveCurrency === 'THB') {
        swapNote.textContent = 'You can swap USDT to THB at fixed rate';
        swapRate.textContent = `1 USDT = ${(1/THB_PRICE).toFixed(2)} THB`;
    } else if (payCurrency === 'THB' && receiveCurrency === 'USDT') {
        swapNote.textContent = 'You can swap THB to USDT at fixed rate';
        swapRate.textContent = `1 THB = $${THB_PRICE.toFixed(4)}`;
    } else {
        swapNote.textContent = `You can swap ${payCurrency} to ${receiveCurrency} at market rate`;

        const payPrice = payCurrency === 'REFI' ? REFI_PRICE :
                        (payCurrency === 'THB' ? THB_PRICE : (livePrices[payCurrency]?.price || 0));
        const receivePrice = receiveCurrency === 'REFI' ? REFI_PRICE :
                            (receiveCurrency === 'THB' ? THB_PRICE : (livePrices[receiveCurrency]?.price || 0));

        if (payPrice > 0 && receivePrice > 0) {
            const rate = payPrice / receivePrice;

            swapRate.textContent = `1 ${payCurrency} = ${rate.toFixed(6)} ${receiveCurrency}`;
        } else {
            swapRate.textContent = `Rate will be calculated based on current market price`;
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

function flipSwapPair() {
    const payCurrency = document.getElementById('payCurrency').textContent;
    const receiveCurrency = document.getElementById('receiveCurrency').textContent;

    if (receiveCurrency === 'USDT') {
        showToast('❌ Swapping FROM USDT to other tokens Temporarily unavailable', 'warning');

        return;
    }

    if (payCurrency === 'BNB') {
        showToast(t('swap.bnbNotAllowed'), 'warning');

        return;
    }

    document.getElementById('payCurrency').textContent = receiveCurrency;
    document.getElementById('receiveCurrency').textContent = payCurrency;
    document.getElementById('payCurrencyIcon').src = getCurrencyIcon(receiveCurrency);
    document.getElementById('receiveCurrencyIcon').src = getCurrencyIcon(payCurrency);

    if (payCurrency === 'USDT' && receiveCurrency === 'REFI') {
        swapMode = 'to-usdt';
    } else if (payCurrency === 'REFI' && receiveCurrency === 'USDT') {
        swapMode = 'to-refi';
    } else if (payCurrency === 'USDT' && receiveCurrency === 'THB') {
        swapMode = 'to-thb';
    } else if (payCurrency === 'THB' && receiveCurrency === 'USDT') {
        swapMode = 'to-usdt';
    } else if (receiveCurrency === 'REFI') {
        swapMode = 'to-refi';
    } else if (receiveCurrency === 'USDT') {
        swapMode = 'to-usdt';
    } else if (receiveCurrency === 'THB') {
        swapMode = 'to-thb';
    } else {
        swapMode = 'to-other';
    }

    updateSwapNote();
    calculateSwap();
    updateSwapBalances();
    animateElement('.swap-flip-btn', 'pop');
}

function calculateSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value) || 0;
    const payCurrency = document.getElementById('payCurrency').textContent;
    const receiveCurrency = document.getElementById('receiveCurrency').textContent;

    let receiveAmount = 0;

    if (payCurrency === 'THB' && receiveCurrency === 'USDT') {
        receiveAmount = payAmount * THB_PRICE;
    } else if (payCurrency === 'USDT' && receiveCurrency === 'THB') {
        receiveAmount = payAmount / THB_PRICE;
    } else if (payCurrency === 'USDT' && receiveCurrency === 'REFI') {
        receiveAmount = payAmount * SWAP_RATE;
    } else if (payCurrency === 'REFI' && receiveCurrency === 'USDT') {
        receiveAmount = payAmount / SWAP_RATE;
    } else if (receiveCurrency === 'REFI') {
        const payPrice = payCurrency === 'REFI' ? REFI_PRICE :
                        (payCurrency === 'THB' ? THB_PRICE : (livePrices[payCurrency]?.price || 0));

        if (payPrice > 0) {
            const usdValue = payAmount * payPrice;

            receiveAmount = usdValue / REFI_PRICE;
        }
    } else if (payCurrency === 'REFI') {
        const receivePrice = receiveCurrency === 'REFI' ? REFI_PRICE :
                            (receiveCurrency === 'THB' ? THB_PRICE : (livePrices[receiveCurrency]?.price || 0));

        if (receivePrice > 0) {
            const usdValue = payAmount * REFI_PRICE;

            receiveAmount = usdValue / receivePrice;
        }
    } else if (receiveCurrency === 'THB') {
        const payPrice = payCurrency === 'REFI' ? REFI_PRICE :
                        (payCurrency === 'THB' ? THB_PRICE : (livePrices[payCurrency]?.price || 0));

        if (payPrice > 0) {
            const usdValue = payAmount * payPrice;

            receiveAmount = usdValue / THB_PRICE;
        }
    } else if (payCurrency === 'THB') {
        const receivePrice = receiveCurrency === 'REFI' ? REFI_PRICE :
                            (receiveCurrency === 'THB' ? THB_PRICE : (livePrices[receiveCurrency]?.price || 0));

        if (receivePrice > 0) {
            const usdValue = payAmount * THB_PRICE;

            receiveAmount = usdValue / receivePrice;
        }
    } else {
        const payPrice = livePrices[payCurrency]?.price || 0;
        const receivePrice = livePrices[receiveCurrency]?.price || 0;

        if (payPrice > 0 && receivePrice > 0) {
            const usdValue = payAmount * payPrice;

            receiveAmount = usdValue / receivePrice;
        }
    }

    let formattedAmount;

    if (receiveCurrency === 'REFI' || receiveCurrency === 'SHIB' || receiveCurrency === 'PEPE' || receiveCurrency === 'TRUMP' || receiveCurrency === 'THB' || receiveCurrency === 'ZDX') {
        formattedAmount = Math.floor(receiveAmount).toString();
    } else if (receiveCurrency === 'USDT') {
        formattedAmount = receiveAmount.toFixed(2);
    } else {
        formattedAmount = receiveAmount.toFixed(6);
    }

    document.getElementById('receiveAmount').value = formattedAmount;
}

window.setMaxAmount = function() {
    const payCurrency = document.getElementById('payCurrency').textContent;
    const balance = userData.balances[payCurrency] || 0;

    let maxAmount = balance;

    if (payCurrency === 'REFI' || payCurrency === 'SHIB' || payCurrency === 'PEPE' || payCurrency === 'TRUMP' || payCurrency === 'THB' || payCurrency === 'ZDX') {
        document.getElementById('payAmount').value = Math.floor(maxAmount);
    } else if (payCurrency === 'USDT') {
        document.getElementById('payAmount').value = maxAmount.toFixed(2);
    } else {
        document.getElementById('payAmount').value = maxAmount.toFixed(6);
    }

    calculateSwap();
    animateElement('.max-btn', 'pop');
    showToast(`Max amount set: ${formatBalance(maxAmount, payCurrency)}`, 'success');
};

window.swapDirection = function(direction) {
    if (direction === 'down') {
        document.getElementById('payCurrency').textContent = 'USDT';
        document.getElementById('payCurrencyIcon').src = CMC_ICONS.USDT;
        document.getElementById('receiveCurrency').textContent = 'REFI';
        document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.REFI;
        swapMode = 'to-refi';
    } else if (direction === 'up') {
        document.getElementById('payCurrency').textContent = 'REFI';
        document.getElementById('payCurrencyIcon').src = CMC_ICONS.REFI;
        document.getElementById('receiveCurrency').textContent = 'USDT';
        document.getElementById('receiveCurrencyIcon').src = CMC_ICONS.USDT;
        swapMode = 'to-usdt';
    }

    updateSwapNote();
    calculateSwap();
    updateSwapBalances();
    animateElement('.swap-action-btn', 'pop');
};

function confirmSwap() {
    const payAmount = parseFloat(document.getElementById('payAmount').value);
    const payCurrency = document.getElementById('payCurrency').textContent;
    const receiveCurrency = document.getElementById('receiveCurrency').textContent;
    const receiveAmount = parseFloat(document.getElementById('receiveAmount').value);

    if (!payAmount || payAmount <= 0) {
        showToast(t('error.enterAmount'), 'error');
        animateElement('#payAmount', 'shake');

        return;
    }

    if (payCurrency === 'USDT') {
        showToast('❌ Swapping FROM USDT to other tokens temporarily unavailable', 'warning');

        return;
    }

    if (!userData.balances[payCurrency] || userData.balances[payCurrency] < payAmount) {
        showToast(t('error.insufficientBalance', { currency: payCurrency }), 'error');

        return;
    }

    if (payCurrency === 'USDT' && payAmount < 0.01) {
        showToast(t('error.minSwap', { min: '0.01', currency: 'USDT' }), 'error');

        return;
    }

    if (payCurrency === 'REFI' && payAmount < 1000) {
        showToast(t('error.minSwap', { min: '1,000', currency: 'REFI' }), 'error');

        return;
    }

    if (payCurrency === 'THB' && payAmount < 10) {
        showToast(t('error.minSwap', { min: '10', currency: 'THB' }), 'error');

        return;
    }

    userData.balances[payCurrency] -= payAmount;
    userData.balances[receiveCurrency] += receiveAmount;

    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

    const transaction = {
        userId: userId,
        userName: userName,
        type: 'swap',
        amount: payAmount,
        currency: payCurrency,
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: `Swapped to ${receiveAmount} ${receiveCurrency}`
    };

    addTransaction(transaction);

    if (db) {
        db.collection('users').doc(userId).update({
            balances: userData.balances
        }).catch(console.error);

        db.collection('transactions').add(transaction).catch(console.error);
    }

    showToast(t('success.swapCompleted', {
        fromAmount: formatBalance(payAmount, payCurrency),
        fromCurrency: payCurrency,
        toAmount: formatBalance(receiveAmount, receiveCurrency),
        toCurrency: receiveCurrency
    }), 'success');

    document.getElementById('payAmount').value = '1';

    calculateSwap();
    updateSwapBalances();
    updateUI();
    animateElement('#swapBtn', 'pop');
}

// ============================================================================
// 25. ADD TRANSACTION
// ============================================================================

function addTransaction(transaction) {
    try {
        const allTransactions = loadLocalTransactions();

        const exists = allTransactions.some(t =>
            (t.firebaseId && t.firebaseId === transaction.firebaseId) ||
            (t.timestamp === transaction.timestamp &&
             t.type === transaction.type &&
             t.amount === transaction.amount)
        );

        if (exists) {
            console.log("⏭️ Transaction already exists, skipping...");

            return;
        }

        if (!userData.transactions) {
            userData.transactions = [];
        }

        userData.transactions.unshift(transaction);

        allTransactions.unshift(transaction);
        saveLocalTransactions(allTransactions);

        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        if (currentPage === 'history' || document.getElementById('historyModal')?.classList.contains('show')) {
            renderHistory(currentHistoryFilter);
        }

        console.log("✅ Transaction added successfully");

        return true;
    } catch (error) {
        console.error("❌ Error in addTransaction:", error);

        return false;
    }
}

// ============================================================================
// 26. UPDATE TRANSACTION
// ============================================================================

function updateTransaction(updatedTx) {
    try {
        if (userData.transactions) {
            const index = userData.transactions.findIndex(t =>
                t.firebaseId === updatedTx.firebaseId ||
                (t.timestamp === updatedTx.timestamp && t.type === updatedTx.type)
            );

            if (index !== -1) {
                userData.transactions[index] = updatedTx;
            }
        }

        const allTransactions = loadLocalTransactions();
        const index = allTransactions.findIndex(t =>
            t.firebaseId === updatedTx.firebaseId ||
            (t.timestamp === updatedTx.timestamp && t.type === updatedTx.type)
        );

        if (index !== -1) {
            allTransactions[index] = updatedTx;

            saveLocalTransactions(allTransactions);
        }

        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        if (currentPage === 'history' || document.getElementById('historyModal')?.classList.contains('show')) {
            renderHistory(currentHistoryFilter);
        }
    } catch (error) {
        console.error("❌ Error in updateTransaction:", error);
    }
}

// ============================================================================
// 27. DEPOSIT FUNCTIONS
// ============================================================================

function updateDepositInfo() {
    const currency = document.getElementById('depositCurrency').value;
    const depositAddress = document.getElementById('depositAddress');
    const depositIcon = document.getElementById('depositIcon');
    const addressNote = document.getElementById('depositAddressNote');
    const hashHint = document.getElementById('hashFormatHint');

    if (depositIcon) {
        depositIcon.src = getCurrencyIcon(currency);
    }

    depositAddress.textContent = DEPOSIT_ADDRESSES[currency] || DEPOSIT_ADDRESSES.REFI;

    addressNote.innerHTML = `<i class="fa-regular fa-circle-check"></i> <span>${DEPOSIT_NOTES[currency] || '✓ Blockchain confirmation 1-5 minutes'}</span>`;

    let formatText = '';

    const bscNetworks = ['USDT', 'BNB', 'REFI', 'ETH', 'SHIB', 'PEPE', 'THB', 'ZDX'];
    const solanaNetworks = ['SOL', 'TRUMP'];
    const tronNetworks = ['TRX'];

    if (bscNetworks.includes(currency)) {
        formatText = 'BSC/ETH format: 0x... (66 characters)';
    } else if (solanaNetworks.includes(currency)) {
        formatText = 'Solana format: 86-88 characters (no 0x required)';
    } else if (tronNetworks.includes(currency)) {
        formatText = 'TRON format: 64 characters (no 0x required)';
    }

    if (hashHint) {
        hashHint.textContent = formatText;
    }

    const minAmount = DEPOSIT_MINIMUMS[currency] || 0;
    const amountInput = document.getElementById('depositAmount');

    if (currency === 'REFI' || currency === 'SHIB' || currency === 'PEPE' || currency === 'TRUMP' || currency === 'THB' || currency === 'ZDX') {
        amountInput.placeholder = `Min ${minAmount.toLocaleString()} ${currency}`;
        amountInput.step = '1';
    } else if (currency === 'USDT') {
        amountInput.placeholder = `Min ${minAmount} ${currency}`;
        amountInput.step = '0.01';
    } else {
        amountInput.placeholder = `Min ${minAmount} ${currency}`;
        amountInput.step = '0.000001';
    }
}

function copyDepositAddress() {
    const address = document.getElementById('depositAddress').textContent;

    navigator.clipboard.writeText(address);

    showToast(t('success.addressCopied'), 'success');
    animateElement('.copy-address-btn', 'pop');
}

function validateTransactionHashInput() {
    const hashInput = document.getElementById('txnId');
    const currency = document.getElementById('depositCurrency').value;
    const hintEl = document.getElementById('hashValidationHint');
    const submitBtn = document.getElementById('submitDepositBtn');

    if (!hashInput || !hintEl || !submitBtn) {
        return;
    }

    const hash = hashInput.value.trim();

    if (!hash) {
        hintEl.style.display = 'none';
        submitBtn.disabled = true;

        return;
    }

    const strictNetworks = ['USDT', 'BNB', 'REFI', 'ETH', 'SHIB', 'PEPE', 'THB', 'ZDX'];
    const exemptNetworks = ['SOL', 'TRUMP', 'TRX'];

    let isValid = false;
    let message = '';

    if (strictNetworks.includes(currency)) {
        isValid = hash.startsWith('0x') && hash.length === 66;
        message = isValid ?
            '✓ Valid BSC/ETH transaction hash' :
            'Invalid format. Must start with 0x and be 66 characters';
    }

    if (exemptNetworks.includes(currency)) {
        isValid = hash.length >= 10 && hash.length <= 100;
        message = isValid ?
            `✓ ${currency} transaction hash accepted (will be verified manually)` :
            'Transaction hash seems too short';
    }

    const isUsed = userData.usedHashes?.includes(hash.toLowerCase());

    if (!isValid) {
        hintEl.textContent = message;
        hintEl.className = 'hash-validation-hint invalid';
        hintEl.style.display = 'block';
        submitBtn.disabled = true;
    } else if (isUsed) {
        hintEl.textContent = 'This transaction hash has already been used';
        hintEl.className = 'hash-validation-hint invalid';
        hintEl.style.display = 'block';
        submitBtn.disabled = true;
    } else {
        hintEl.textContent = message || '✓ Valid transaction hash';
        hintEl.className = 'hash-validation-hint valid';
        hintEl.style.display = 'block';
        submitBtn.disabled = false;
    }
}

async function submitDeposit() {
    const currency = document.getElementById('depositCurrency').value;
    const amount = parseFloat(document.getElementById('depositAmount').value);
    const txnId = document.getElementById('txnId').value.trim();

    if (!amount || amount <= 0) {
        showToast(t('error.enterAmount'), 'error');

        return;
    }

    if (!txnId) {
        showToast('Please enter transaction ID', 'error');

        return;
    }

    const strictNetworks = ['USDT', 'BNB', 'REFI', 'ETH', 'SHIB', 'PEPE', 'THB', 'ZDX'];

    if (strictNetworks.includes(currency)) {
        if (!txnId.startsWith('0x') || txnId.length !== 66) {
            showToast(t('error.invalidHash'), 'error');

            return;
        }
    }

    if (userData.usedHashes?.includes(txnId.toLowerCase())) {
        showToast(t('error.hashUsed'), 'error');

        return;
    }

    const minAmount = DEPOSIT_MINIMUMS[currency] || 0;

    if (amount < minAmount) {
        showToast(t('error.minDeposit', { min: minAmount.toLocaleString(), currency }), 'error');

        return;
    }

    const depositRequest = {
        customId: 'deposit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId: userId,
        userName: userName,
        currency: currency,
        amount: amount,
        txnId: txnId,
        address: DEPOSIT_ADDRESSES[currency],
        status: 'pending',
        timestamp: new Date().toISOString(),
        type: 'deposit'
    };

    const submitBtn = document.getElementById('submitDepositBtn');

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    try {
        if (!userData.usedHashes) {
            userData.usedHashes = [];
        }

        userData.usedHashes.push(txnId.toLowerCase());

        let firebaseId = null;

        if (db) {
            const docRef = await db.collection('deposit_requests').add(depositRequest);

            console.log("✅ Deposit saved with Firebase ID:", docRef.id);

            firebaseId = docRef.id;

            await db.collection('users').doc(userId).update({
                usedHashes: userData.usedHashes
            });

            await addNotification(ADMIN_ID, `💰 New deposit request: ${amount} ${currency} from ${userId}`, 'info');

            startOnDemandListener('deposit_requests', docRef.id, (data) => {
                console.log("📥 Deposit update received:", data);

                if (data.status === 'approved') {
                    userData.balances[currency] = (userData.balances[currency] || 0) + amount;

                    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

                    addTransaction({
                        ...depositRequest,
                        firebaseId: docRef.id,
                        status: 'approved'
                    });

                    showToast(t('notif.depositApproved', { amount, currency }), 'success');
                    updateUI();
                } else if (data.status === 'rejected') {
                    addTransaction({
                        ...depositRequest,
                        firebaseId: docRef.id,
                        status: 'rejected',
                        reason: data.reason || 'Unknown reason'
                    });

                    showToast(t('notif.depositRejected', { reason: data.reason || 'Unknown reason' }), 'error');
                }
            }, 30000);
        }

        const transactionToAdd = {
            ...depositRequest,
            firebaseId: firebaseId || 'temp_' + Date.now()
        };

        setTimeout(() => {
            addTransaction(transactionToAdd);
        }, 100);

        showToast(t('success.depositSubmitted', { amount, currency }), 'success');

        closeModal('depositModal');

        document.getElementById('depositAmount').value = '';
        document.getElementById('txnId').value = '';

        if (submitBtn) {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Deposit';
            }, 1000);
        }
    } catch (error) {
        console.error("❌ Deposit error:", error);

        showToast('❌ Failed to submit deposit request: ' + error.message, 'error');

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Deposit';
        }
    }
}

// ============================================================================
// 28. WITHDRAW FUNCTIONS
// ============================================================================

function checkWithdrawFee() {
    const currency = document.getElementById('withdrawCurrency').value;
    const feeWarning = document.getElementById('feeWarning');
    const feeWarningText = document.getElementById('feeWarningText');
    const networkFee = document.getElementById('networkFee');
    const receiveAmount = document.getElementById('receiveAmount_');
    const amount = parseFloat(document.getElementById('withdrawAmount').value) || 0;

    updateWithdrawIcon();

    if (currency === 'USDT') {
        feeWarning.classList.remove('hidden');
        feeWarningText.textContent = 'USDT withdrawal requires 0.00016 BNB fee';
        networkFee.textContent = '0.00016 BNB';

        if (receiveAmount) {
            receiveAmount.textContent = amount.toFixed(2) + ' USDT';
        }
    } else if (currency === 'BNB') {
        feeWarning.classList.remove('hidden');
        feeWarningText.textContent = 'BNB withdrawal requires 0.0005 BNB fee';
        networkFee.textContent = '0.0005 BNB';

        if (receiveAmount) {
            receiveAmount.textContent = (amount - 0.0005).toFixed(4) + ' BNB';
        }
    } else {
        feeWarning.classList.add('hidden');
        networkFee.textContent = '0 BNB';

        if (receiveAmount) {
            receiveAmount.textContent = amount.toFixed(6) + ' ' + currency;
        }
    }
}

function updateWithdrawIcon() {
    const currency = document.getElementById('withdrawCurrency').value;
    const icon = document.getElementById('withdrawIcon');

    if (icon) {
        icon.src = getCurrencyIcon(currency);
    }
}

function validateWithdrawAddressInput() {
    const addressInput = document.getElementById('walletAddress');
    const hintEl = document.getElementById('withdrawAddressHint');
    const submitBtn = document.getElementById('submitWithdrawBtn');

    if (!addressInput || !hintEl || !submitBtn) {
        return;
    }

    const address = addressInput.value.trim();

    if (!address) {
        hintEl.style.display = 'none';
        submitBtn.disabled = true;

        return;
    }

    const isValid = address.startsWith('0x') && address.length === 42;

    if (!isValid) {
        hintEl.textContent = 'Invalid address. Must start with 0x and be 42 characters';
        hintEl.className = 'address-validation-hint invalid';
        hintEl.style.display = 'block';
        submitBtn.disabled = true;
    } else {
        hintEl.textContent = '✓ Valid address';
        hintEl.className = 'address-validation-hint valid';
        hintEl.style.display = 'block';
        submitBtn.disabled = false;
    }
}

async function submitWithdraw() {
    if (userData && userData.withdrawBlocked === true) {
        showToast('⛔ Your account is permanently blocked from withdrawals. Contact support.', 'error');

        return;
    }

    const currency = document.getElementById('withdrawCurrency').value;
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    const address = document.getElementById('walletAddress').value.trim();

    if (!amount || amount <= 0 || !address) {
        showToast('Please fill all fields', 'error');

        return;
    }

    if (!address.startsWith('0x') || address.length !== 42) {
        showToast('Invalid wallet address', 'error');

        return;
    }

    const minAmounts = {
        USDT: 10,
        REFI: 2500000,
        BNB: 0.02
    };

    const minForCurrency = minAmounts[currency];

    if (minForCurrency && amount < minForCurrency) {
        showToast(`Minimum withdrawal is ${minForCurrency} ${currency}`, 'error');

        return;
    }

    if (!userData.balances[currency] || userData.balances[currency] < amount) {
        showToast(`Insufficient ${currency} balance`, 'error');

        return;
    }

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

    const submitBtn = document.getElementById('submitWithdrawBtn');

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    userData.balances[currency] -= amount;

    if (fee > 0) {
        userData.balances[feeCurrency] -= fee;
    }

    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

    const withdrawRequest = {
        customId: 'withdraw_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId: userId,
        userName: userName,
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
        let firebaseId = null;

        if (db) {
            const docRef = await db.collection('withdrawals').add(withdrawRequest);

            console.log("✅ Withdrawal saved with Firebase ID:", docRef.id);

            firebaseId = docRef.id;

            await db.collection('users').doc(userId).update({
                balances: userData.balances
            });

            await addNotification(ADMIN_ID, `💸 New withdrawal request: ${amount} ${currency} from ${userId}`, 'info');

            startOnDemandListener('withdrawals', docRef.id, (data) => {
                console.log("📤 Withdrawal update received:", data);

                if (data.status === 'approved') {
                    addTransaction({
                        ...withdrawRequest,
                        firebaseId: docRef.id,
                        status: 'approved'
                    });

                    showToast(`✅ Your withdrawal of ${amount} ${currency} has been approved!`, 'success');
                } else if (data.status === 'rejected') {
                    userData.balances[currency] += amount;

                    if (fee > 0) {
                        userData.balances[feeCurrency] += fee;
                    }

                    localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

                    addTransaction({
                        ...withdrawRequest,
                        firebaseId: docRef.id,
                        status: 'rejected',
                        reason: data.reason || 'Unknown reason'
                    });

                    showToast(`❌ Your withdrawal was rejected: ${data.reason || 'Unknown reason'}`, 'error');
                    updateUI();
                }
            }, 30000);
        }

        const transactionToAdd = {
            ...withdrawRequest,
            firebaseId: firebaseId || 'temp_' + Date.now()
        };

        setTimeout(() => {
            addTransaction(transactionToAdd);
        }, 100);

        showToast(`✅ Withdrawal request submitted for ${amount} ${currency}`, 'success');

        closeModal('withdrawModal');

        document.getElementById('withdrawAmount').value = '';
        document.getElementById('walletAddress').value = '';

        updateUI();

        if (submitBtn) {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Withdrawal';
            }, 1000);
        }
    } catch (error) {
        console.error("❌ Withdraw error:", error);

        showToast('❌ Failed to submit withdrawal request: ' + error.message, 'error');

        userData.balances[currency] += amount;

        if (fee > 0) {
            userData.balances[feeCurrency] += fee;
        }

        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Withdrawal';
        }
    }
}

// ============================================================================
// 29. ADMIN FUNCTIONS
// ============================================================================

function showAdminPanel() {
    if (!isAdmin) {
        showToast('Access denied', 'error');

        return;
    }

    document.getElementById('adminPanel').classList.remove('hidden');

    loadAdminData();
}

function closeAdminPanel() {
    document.getElementById('adminPanel').classList.add('hidden');

    stopAllListeners();
}

async function loadAdminData() {
    if (!db) {
        return;
    }

    try {
        const [depositsSnapshot, withdrawalsSnapshot] = await Promise.all([
            db.collection('deposit_requests').where('status', '==', 'pending').get(),
            db.collection('withdrawals').where('status', '==', 'pending').get()
        ]);

        const pendingCount = depositsSnapshot.size + withdrawalsSnapshot.size;

        document.getElementById('totalUsers').textContent = '...';
        document.getElementById('pendingCount').textContent = pendingCount;
        document.getElementById('approvedCount').textContent = '...';
        document.getElementById('totalReferralsCount').textContent = '...';

        const adminContent = document.getElementById('adminContent');

        adminContent.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <i class="fa-solid fa-hand-pointer" style="font-size: 48px; color: var(--pink-1);"></i>
                <p style="margin: 20px 0; color: var(--text-secondary);">اضغط على زر التحديث لعرض الطلبات</p>
                <button onclick="refreshAdminPanel()" class="admin-approve-btn" style="width: auto; padding: 10px 20px; margin: 0 auto;">
                    <i class="fa-solid fa-rotate-right"></i> تحديث
                </button>
            </div>
        `;
    } catch (error) {
        console.error("Error loading admin data:", error);

        showToast('Error loading admin data', 'error');
    }
}

async function showAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));

    event.target.classList.add('active');

    currentAdminTab = tab;

    const adminContent = document.getElementById('adminContent');

    adminContent.innerHTML = `
        <div style="text-align: center; padding: 30px;">
            <i class="fa-solid fa-hand-pointer" style="font-size: 48px; color: var(--pink-1);"></i>
            <p style="margin: 20px 0; color: var(--text-secondary);">اضغط على زر التحديث لعرض الطلبات</p>
            <button onclick="refreshAdminPanel()" class="admin-approve-btn" style="width: auto; padding: 10px 20px; margin: 0 auto;">
                <i class="fa-solid fa-rotate-right"></i> تحديث
            </button>
        </div>
    `;
}

window.refreshAdminPanel = async function() {
    if (!isAdmin) {
        return;
    }

    console.log("🔄 Manually refreshing admin panel...");

    const refreshBtn = document.getElementById('adminRefreshBtn');

    if (refreshBtn) {
        refreshBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    }

    const adminContent = document.getElementById('adminContent');

    adminContent.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</div>';

    try {
        const activeTab = document.querySelector('.admin-tab.active')?.textContent.toLowerCase().includes('deposit') ? 'deposits' : 'withdrawals';

        let query;
        let collectionName;

        if (activeTab === 'deposits') {
            collectionName = 'deposit_requests';
            query = db.collection(collectionName).where('status', '==', 'pending');
        } else {
            collectionName = 'withdrawals';
            query = db.collection(collectionName).where('status', '==', 'pending');
        }

        const snapshot = await query.get();

        if (snapshot.empty) {
            adminContent.innerHTML = '<div class="empty-state">No pending transactions found</div>';

            return;
        }

        const userIds = [];
        const transactions = [];

        snapshot.forEach(doc => {
            const tx = { firebaseId: doc.id, ...doc.data() };

            transactions.push(tx);

            if (tx.userId && !userIds.includes(tx.userId)) {
                userIds.push(tx.userId);
            }
        });

        const referralCounts = {};

        if (userIds.length > 0) {
            const chunks = [];

            for (let i = 0; i < userIds.length; i += 30) {
                chunks.push(userIds.slice(i, i + 30));
            }

            for (const chunk of chunks) {
                const usersSnapshot = await db.collection('users').where('userId', 'in', chunk).get();

                usersSnapshot.forEach(doc => {
                    const userData = doc.data();

                    referralCounts[userData.userId] = userData.referralCount || 0;
                });
            }
        }

        let html = '';

        transactions.forEach(tx => {
            const referralCount = referralCounts[tx.userId] || 0;

            html += renderAdminTransactionCard(tx, activeTab, referralCount);
        });

        adminContent.innerHTML = html;

        showToast('Admin panel refreshed', 'success');
    } catch (error) {
        console.error("❌ Error refreshing admin panel:", error);

        adminContent.innerHTML = '<div class="empty-state">Error loading transactions</div>';
    } finally {
        if (refreshBtn) {
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
            }, 500);
        }
    }
};

function renderAdminTransactionCard(tx, tab, referralCount = 0) {
    const date = new Date(tx.timestamp);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    const telegramId = tx.userId || 'N/A';
    const displayUserId = tx.userName ? `${tx.userName}` : telegramId.substring(0, 8);

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
                    <span class="admin-tx-value">${displayUserId}</span>
                </div>
                <div class="admin-tx-row">
                    <span class="admin-tx-label">Telegram ID:</span>
                    <div class="admin-address-container" style="flex-direction: column; align-items: flex-start; gap: 5px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <code style="font-size: 12px; word-break: break-all;">${telegramId}</code>
                            <button class="admin-copy-btn" onclick="copyToClipboard('${telegramId}')" title="Copy Telegram ID">
                                <i class="fa-regular fa-copy"></i>
                            </button>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; font-size: 11px; background: rgba(0,212,255,0.1); padding: 4px 8px; border-radius: 20px;">
                            <i class="fa-solid fa-users" style="color: var(--pink-1);"></i>
                            <span style="color: var(--text-secondary);">Total Referrals:</span>
                            <strong style="color: var(--pink-1);">${referralCount.toLocaleString()}</strong>
                        </div>
                    </div>
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
            <div class="admin-tx-actions">
                <button class="admin-approve-btn" onclick="approveTransaction('${tx.firebaseId}', '${tx.userId}', '${tx.type}', '${tx.currency}', ${tx.amount}, ${tx.fee || 0}, '${tx.feeCurrency || 'BNB'}')">
                    <i class="fa-regular fa-circle-check"></i> Approve
                </button>
                <button class="admin-reject-btn" onclick="rejectTransaction('${tx.firebaseId}', '${tx.userId}', '${tx.type}')">
                    <i class="fa-regular fa-circle-xmark"></i> Reject
                </button>
            </div>
        </div>
    `;
}

async function approveTransaction(firebaseId, targetUserId, type, currency, amount, fee, feeCurrency) {
    if (!isAdmin || !db) {
        showToast('❌ Admin access required', 'error');

        return;
    }

    try {
        console.log("🔍 Approving transaction with Firebase ID:", firebaseId);

        let collectionName = '';

        if (type === 'deposit') {
            collectionName = 'deposit_requests';
        } else if (type === 'withdraw') {
            collectionName = 'withdrawals';
        } else {
            collectionName = 'transactions';
        }

        const docRef = db.collection(collectionName).doc(firebaseId);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            showToast(`❌ ${type} request not found`, 'error');

            return;
        }

        await docRef.update({
            status: 'approved',
            approvedAt: firebase.firestore.FieldValue.serverTimestamp(),
            approvedBy: 'admin'
        });

        if (type === 'deposit') {
            await db.collection('users').doc(targetUserId).update({
                [`balances.${currency}`]: firebase.firestore.FieldValue.increment(amount)
            });

            if (targetUserId === userId) {
                userData.balances[currency] = (userData.balances[currency] || 0) + amount;

                localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
                updateUI();
            }

            await addNotification(targetUserId, t('notif.depositApproved', { amount, currency }), 'success');
        } else if (type === 'withdraw') {
            const feeText = fee > 0 ? ` (Fee: ${fee} ${feeCurrency})` : '';

            await addNotification(targetUserId, `✅ Your withdrawal of ${amount} ${currency} has been approved${feeText}!`, 'success');
        }

        showToast('✅ Transaction approved!', 'success');
    } catch (error) {
        console.error("❌ Error approving transaction:", error);

        showToast('❌ Error approving transaction: ' + error.message, 'error');
    }
}

async function rejectDepositRequest(firebaseId) {
    if (!isAdmin || !db) {
        showToast('❌ Admin access required', 'error');

        return;
    }

    const reason = prompt("Enter rejection reason:", "Invalid transaction hash");

    if (!reason) {
        return;
    }

    try {
        const depositRef = db.collection('deposit_requests').doc(firebaseId);
        const depositSnap = await depositRef.get();

        if (!depositSnap.exists) {
            showToast('❌ Deposit request not found', 'error');

            return;
        }

        const depositData = depositSnap.data();

        await depositRef.update({
            status: 'rejected',
            rejectionReason: reason,
            rejectedAt: firebase.firestore.FieldValue.serverTimestamp(),
            rejectedBy: 'admin'
        });

        await addNotification(depositData.userId,
            `❌ Your deposit of ${depositData.amount} ${depositData.currency} was rejected. Reason: ${reason}`,
            'error');

        showToast('✅ Deposit rejected', 'success');
    } catch (error) {
        console.error("❌ Error rejecting deposit:", error);

        showToast('❌ Error: ' + error.message, 'error');
    }
}

async function rejectWithdrawalRequest(firebaseId) {
    if (!isAdmin || !db) {
        showToast('❌ Admin access required', 'error');

        return;
    }

    const reason = prompt("Enter rejection reason:", "Insufficient balance or invalid address");

    if (!reason) {
        return;
    }

    try {
        const withdrawalRef = db.collection('withdrawals').doc(firebaseId);
        const withdrawalSnap = await withdrawalRef.get();

        if (!withdrawalSnap.exists) {
            showToast('❌ Withdrawal request not found', 'error');

            return;
        }

        const withdrawalData = withdrawalSnap.data();

        await withdrawalRef.update({
            status: 'rejected',
            rejectionReason: reason,
            rejectedAt: firebase.firestore.FieldValue.serverTimestamp(),
            rejectedBy: 'admin'
        });

        const updates = {};

        updates[`balances.${withdrawalData.currency}`] = firebase.firestore.FieldValue.increment(withdrawalData.amount);

        if (withdrawalData.fee) {
            updates[`balances.${withdrawalData.feeCurrency}`] = firebase.firestore.FieldValue.increment(withdrawalData.fee);
        }

        await db.collection('users').doc(withdrawalData.userId).update(updates);

        await addNotification(withdrawalData.userId,
            `❌ Your withdrawal of ${withdrawalData.amount} ${withdrawalData.currency} was rejected. Reason: ${reason}`,
            'error');

        showToast('✅ Withdrawal rejected', 'success');
    } catch (error) {
        console.error("❌ Error rejecting withdrawal:", error);

        showToast('❌ Error: ' + error.message, 'error');
    }
}

function rejectTransaction(firebaseId, targetUserId, type) {
    if (type === 'deposit') {
        rejectDepositRequest(firebaseId);
    } else if (type === 'withdraw') {
        rejectWithdrawalRequest(firebaseId);
    } else {
        showToast('❌ Unsupported transaction type', 'error');
    }
}

async function blockUserWithdrawals(targetUserId) {
    if (!isAdmin) {
        showToast('❌ Access denied. Admin only.', 'error');

        return;
    }

    if (!confirm(`⚠️⚠️⚠️ PERMANENT ACTION WARNING ⚠️⚠️⚠️\n\nAre you ABSOLUTELY sure you want to permanently block this user from withdrawals?\n\nTHIS ACTION CANNOT BE UNDONE!`)) {
        return;
    }

    try {
        if (db) {
            await db.collection('users').doc(targetUserId).update({
                withdrawBlocked: true,
                withdrawBlockedAt: firebase.firestore.FieldValue.serverTimestamp(),
                withdrawBlockedBy: ADMIN_ID,
                withdrawBlockedPermanent: true,
                withdrawBlockedReason: 'Admin action - permanent block'
            });
        }

        if (targetUserId === userId) {
            userData.withdrawBlocked = true;
            userData.withdrawBlockedPermanent = true;

            localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
        }

        showToast('✅ User has been PERMANENTLY blocked from withdrawals', 'success');

        await adminLoadUser();
    } catch (error) {
        console.error("❌ Error blocking user:", error);

        showToast('❌ Failed to block user: ' + error.message, 'error');
    }
}

let currentManageUserId = null;

const originalShowAdminPanel = showAdminPanel;

showAdminPanel = function() {
    originalShowAdminPanel();

    setTimeout(() => {
        const adminHeader = document.querySelector('#adminPanel .admin-header');

        if (adminHeader && !document.getElementById('adminUserManageBtn')) {
            const userManageBtn = document.createElement('button');

            userManageBtn.id = 'adminUserManageBtn';
            userManageBtn.className = 'admin-tab';
            userManageBtn.innerHTML = '<i class="fa-solid fa-user-gear"></i> Manage Users';
            userManageBtn.onclick = showUserManagementInterface;
            userManageBtn.style.background = 'linear-gradient(135deg, var(--pink-1), var(--quantum-blue))';

            adminHeader.appendChild(userManageBtn);
        }
    }, 100);
};

function showUserManagementInterface() {
    const adminContent = document.getElementById('adminContent');

    adminContent.innerHTML = `
        <div style="padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <i class="fa-solid fa-user-plus" style="font-size: 48px; color: var(--pink-1);"></i>
                <h3 style="margin-top: 10px;">User Management</h3>
                <p style="color: var(--text-secondary);">Enter Telegram User ID to manage balance and view stats</p>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="adminUserIdInput" placeholder="Enter User ID (e.g., 1653918641)"
                       style="flex: 1; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 12px; color: white; font-size: 16px;">
                <button id="adminSearchBtn" style="background: var(--quantum-blue); border: none; padding: 0 20px; border-radius: 12px; cursor: pointer; font-size: 16px;">
                    <i class="fa-solid fa-magnifying-glass"></i> Search
                </button>
            </div>

            <div id="adminUserStats" style="display: none;"></div>
        </div>
    `;

    const searchBtn = document.getElementById('adminSearchBtn');

    if (searchBtn) {
        searchBtn.onclick = adminLoadUser;
    }

    const inputField = document.getElementById('adminUserIdInput');

    if (inputField) {
        inputField.onkeypress = function(e) {
            if (e.key === 'Enter') {
                adminLoadUser();
            }
        };
    }
}

async function adminLoadUser() {
    const targetUserId = document.getElementById('adminUserIdInput').value.trim();
    const statsDiv = document.getElementById('adminUserStats');

    if (!targetUserId) {
        showToast('Please enter User ID', 'error');

        statsDiv.style.display = 'none';

        return;
    }

    statsDiv.style.display = 'block';
    statsDiv.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin"></i> Loading user data...</div>';

    try {
        const userDoc = await db.collection('users').doc(targetUserId).get();

        if (!userDoc.exists) {
            statsDiv.innerHTML = `
                <div style="text-align: center; color: var(--danger); padding: 30px; background: rgba(255,68,68,0.1); border-radius: 16px;">
                    <i class="fa-solid fa-user-slash" style="font-size: 32px;"></i>
                    <p style="margin-top: 10px;">❌ User not found!<br><small>Check the User ID and try again</small></p>
                </div>
            `;

            return;
        }

        const user = userDoc.data();

        currentManageUserId = targetUserId;

        const now = new Date();
        const activeStakes = (user.staking || []).filter(s => new Date(s.endDate) > now);

        statsDiv.innerHTML = `
            <div style="background: rgba(255,255,255,0.05); border-radius: 16px; padding: 15px; margin-top: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4 style="margin: 0;">👤 ${user.userName || 'User'}</h4>
                    <div class="admin-address-container">
                        <span style="font-size: 12px; color: var(--text-secondary);">🆔 ${targetUserId}</span>
                        <button class="admin-copy-btn" onclick="copyToClipboard('${targetUserId}')" title="Copy Telegram ID">
                            <i class="fa-regular fa-copy"></i>
                        </button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                    <div style="background: rgba(0,212,255,0.1); border-radius: 12px; padding: 10px; text-align: center;">
                        <div style="font-size: 20px;">👥</div>
                        <div style="font-weight: bold;">${user.referralCount || 0}</div>
                        <div style="font-size: 11px; color: var(--text-secondary);">Referrals</div>
                    </div>
                    <div style="background: rgba(0,212,255,0.1); border-radius: 12px; padding: 10px; text-align: center;">
                        <div style="font-size: 20px;">🔒</div>
                        <div style="font-weight: bold;">${activeStakes.length}</div>
                        <div style="font-size: 11px; color: var(--text-secondary);">Active Stakes</div>
                    </div>
                </div>

                ${activeStakes.length > 0 ? `
                <details style="margin-bottom: 15px;">
                    <summary style="cursor: pointer; color: var(--quantum-blue); padding: 5px 0;">📋 Staking Plans (${activeStakes.length})</summary>
                    <div style="margin-top: 8px; padding-left: 10px; border-left: 2px solid var(--quantum-blue);">
                        ${activeStakes.map(s => `<small>• ${s.plan.name}: ${s.amount} USDT (+${s.plan.return}% return)</small><br>`).join('')}
                    </div>
                </details>
                ` : ''}

                <hr style="margin: 15px 0; border-color: rgba(255,255,255,0.1);">

                <h4 style="margin-bottom: 10px;">💰 Balances</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px;">
                    ${Object.entries(user.balances || {}).filter(([_, v]) => v > 0).map(([c, v]) => `
                        <span style="background: rgba(255,255,255,0.1); border-radius: 20px; padding: 4px 10px; font-size: 12px;">
                            <strong>${c}</strong>: ${c === 'USDT' ? v.toFixed(2) : v.toLocaleString()}
                        </span>
                    `).join('') || '<span style="color: var(--text-secondary);">No balances</span>'}
                </div>

                <hr style="margin: 15px 0; border-color: rgba(255,255,255,0.1);">

                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button onclick="adminAddBalance()" style="flex:1; background: #10b981; border: none; padding: 10px; border-radius: 8px; color: white; cursor: pointer;">
                        ➕ Add Balance
                    </button>
                    <button onclick="adminRemoveBalance()" style="flex:1; background: #ef4444; border: none; padding: 10px; border-radius: 8px; color: white; cursor: pointer;">
                        ➖ Remove Balance
                    </button>
                </div>

                <div style="margin-top: 15px;">
                    ${user.withdrawBlocked ? `
                        <div style="background: rgba(239,68,68,0.2); border-radius: 12px; padding: 10px; text-align: center; margin-bottom: 10px;">
                            <i class="fa-solid fa-ban"></i> ⚠️ USER IS <strong>PERMANENTLY BLOCKED</strong> FROM WITHDRAWALS
                            <div style="font-size: 11px; margin-top: 5px;">This action cannot be reversed</div>
                        </div>
                    ` : `
                        <button onclick="blockUserWithdrawals('${targetUserId}')" style="width:100%; background: #ef4444; border: none; padding: 10px; border-radius: 8px; color: white; cursor: pointer; margin-bottom: 10px;">
                            <i class="fa-solid fa-ban"></i> 🔒 PERMANENTLY BLOCK FROM WITHDRAWALS
                        </button>
                    `}
                    <div style="font-size: 11px; color: var(--text-secondary); text-align: center; padding: 8px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                        <i class="fa-regular fa-circle-info"></i> ⚠️ WARNING: This action is PERMANENT and cannot be undone
                    </div>
                </div>

                <div style="margin-top: 10px;">
                    <button onclick="adminRefreshUserData()" style="width:100%; background: rgba(0,212,255,0.2); border: 1px solid var(--quantum-blue); padding: 10px; border-radius: 8px; cursor: pointer;">
                        <i class="fa-solid fa-rotate-right"></i> Refresh
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading user:', error);

        statsDiv.innerHTML = `
            <div style="text-align: center; color: var(--danger); padding: 20px; background: rgba(255,68,68,0.1); border-radius: 16px;">
                ❌ Error loading user data<br><small>${error.message}</small>
            </div>
        `;
    }
}

async function adminAddBalance() {
    if (!isAdmin || !currentManageUserId) {
        return;
    }

    const currency = prompt('Currency (USDT, REFI, BNB, etc.):', 'USDT');

    if (!currency) {
        return;
    }

    const amount = parseFloat(prompt(`Amount to ADD (${currency}):`, '0'));

    if (isNaN(amount) || amount <= 0) {
        showToast('Invalid amount', 'error');

        return;
    }

    try {
        await db.collection('users').doc(currentManageUserId).update({
            [`balances.${currency}`]: firebase.firestore.FieldValue.increment(amount)
        });

        await db.collection('transactions').add({
            userId: currentManageUserId,
            type: 'admin_add',
            amount: amount,
            currency: currency,
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: `Admin added ${amount} ${currency}`
        });

        showToast(`✅ Added ${amount} ${currency} to user`, 'success');

        adminLoadUser();
    } catch (error) {
        console.error('Error adding balance:', error);

        showToast('Error adding balance', 'error');
    }
}

async function adminRemoveBalance() {
    if (!isAdmin || !currentManageUserId) {
        return;
    }

    const currency = prompt('Currency (USDT, REFI, BNB, etc.):', 'USDT');

    if (!currency) {
        return;
    }

    const amount = parseFloat(prompt(`Amount to REMOVE (${currency}):`, '0'));

    if (isNaN(amount) || amount <= 0) {
        showToast('Invalid amount', 'error');

        return;
    }

    try {
        await db.collection('users').doc(currentManageUserId).update({
            [`balances.${currency}`]: firebase.firestore.FieldValue.increment(-amount)
        });

        await db.collection('transactions').add({
            userId: currentManageUserId,
            type: 'admin_remove',
            amount: amount,
            currency: currency,
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: `Admin removed ${amount} ${currency}`
        });

        showToast(`✅ Removed ${amount} ${currency} from user`, 'success');

        adminLoadUser();
    } catch (error) {
        console.error('Error removing balance:', error);

        showToast('Error removing balance', 'error');
    }
}

async function adminRefreshUserData() {
    if (currentManageUserId) {
        await adminLoadUser();
    }
}

async function showUsersCount() {
    if (!isAdmin) {
        showToast('Access denied', 'error');

        return;
    }

    const adminContent = document.getElementById('adminContent');

    adminContent.innerHTML = '<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin"></i> Loading users count...</div>';

    try {
        const usersSnapshot = await db.collection('users').get();
        const totalUsers = usersSnapshot.size;

        adminContent.innerHTML = `
            <div style="text-align: center; padding: 30px;">
                <i class="fa-solid fa-users" style="font-size: 48px; color: var(--pink-1);"></i>
                <h1 style="font-size: 48px; margin: 20px 0; color: var(--quantum-blue);">${totalUsers.toLocaleString()}</h1>
                <p style="color: var(--text-secondary);">Total Registered Users</p>
                <button onclick="showUsersCount()" style="margin-top: 20px; background: transparent; border: 1px solid var(--quantum-blue); padding: 8px 20px; border-radius: 8px; cursor: pointer;">
                    <i class="fa-solid fa-rotate-right"></i> Refresh
                </button>
            </div>
        `;

        showToast(`📊 Total users: ${totalUsers}`, 'success');
    } catch (error) {
        console.error('Error getting users count:', error);

        adminContent.innerHTML = `
            <div style="text-align: center; color: var(--danger); padding: 30px;">
                <i class="fa-solid fa-exclamation-triangle" style="font-size: 48px;"></i>
                <p>Error loading users count</p>
                <button onclick="showUsersCount()" style="margin-top: 20px; background: transparent; border: 1px solid var(--danger); padding: 8px 20px; border-radius: 8px; cursor: pointer;">
                    Try Again
                </button>
            </div>
        `;
    }
}

// ============================================================================
// 30. MODAL FUNCTIONS
// ============================================================================

function showDepositModal() {
    document.getElementById('depositModal').classList.add('show');

    updateDepositInfo();
    animateElement('.modal-content', 'slideUpModal');
}

function showWithdrawModal() {
    document.getElementById('withdrawModal').classList.add('show');

    checkWithdrawFee();
    updateWithdrawIcon();
    animateElement('.modal-content', 'slideUpModal');
}

function showP2P() {
    document.getElementById('p2pModal').classList.add('show');

    animateElement('.p2p-icon', 'pulse');

    const countdown = document.getElementById('p2pCountdown');

    if (countdown) {
        countdown.textContent = '90 days';
    }
}

function showAllAssets() {
    showToast('All assets view coming soon!', 'info');
}

function showAssetDetails(symbol) {
    const balance = userData.balances[symbol] || 0;
    const price = symbol === 'REFI' ? REFI_PRICE :
                 (symbol === 'THB' ? THB_PRICE : (livePrices[symbol]?.price || 0));
    const value = symbol === 'USDT' ? balance : balance * price;

    showToast(`${symbol}: ${formatBalance(balance, symbol)} ($${formatNumber(value)})`, 'info');
}

function showCryptoDetails(symbol) {
    let price, change;

    if (symbol === 'THB') {
        price = THB_PRICE;
        change = 0;
    } else {
        price = livePrices[symbol]?.price || 0;
        change = livePrices[symbol]?.change || 0;
    }

    const changeSymbol = change >= 0 ? '+' : '';

    showToast(`${symbol}: $${formatNumber(price)} (${changeSymbol}${change.toFixed(2)}%)`, 'info');
}

function showStakingDetails(type) {
    const modal = document.getElementById('stakingDetailsModal');
    const body = document.getElementById('stakingDetailsBody');

    if (!modal || !body) {
        return;
    }

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

    if (modalId === 'historyModal') {
        currentPage = 'wallet';
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);

    showToast('Copied to clipboard!', 'success');
}

// ============================================================================
// 31. FLOATING NOTIFICATIONS
// ============================================================================

let notificationTimeouts = [];

function initFloatingNotifications() {
    console.log("🔔 Initializing floating notifications...");

    startFloatingNotifications();
}

function startFloatingNotifications() {
    const schedules = [
        16000, 24000, 90000, 260000, 20000, 30000, 480000, 14000, 50000, 360000,
        18000, 60000, 420000, 22000, 70000, 390000, 17000, 56000, 330000, 19000,
        44000, 300000, 21000, 76000, 450000, 23000, 84000, 270000, 25000, 62000
    ];

    let scheduleIndex = 0;

    function showNextNotification() {
        const notifications = FLOATING_NOTIFICATIONS;
        const randomIndex = Math.floor(Math.random() * notifications.length);
        const notification = notifications[randomIndex];

        showFloatingToast(notification);

        const nextDelay = schedules[scheduleIndex % schedules.length];

        scheduleIndex++;

        notificationTimeouts.push(setTimeout(showNextNotification, nextDelay));
    }

    setTimeout(showNextNotification, 3000);
}

function showFloatingToast(message) {
    let toast = document.getElementById('floatingToast');

    if (!toast) {
        toast = document.createElement('div');

        toast.id = 'floatingToast';
        toast.className = 'floating-toast';

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

function stopFloatingNotifications() {
    notificationTimeouts.forEach(timeout => clearTimeout(timeout));

    notificationTimeouts = [];

    const toast = document.getElementById('floatingToast');

    if (toast) {
        toast.classList.remove('show');
    }
}

const FLOATING_NOTIFICATIONS = [
    "💸 Withdrawal • 0x3f...a2d1 • 12 USDT",
    "💸 Withdrawal • 0x8b...c4e9 • 18 USDT",
    "💸 Withdrawal • 0x7d...f1b3 • 24 USDT",
    "💸 Withdrawal • 0x2a...e7f8 • 31 USDT",
    "💸 Withdrawal • 0x9c...b5d2 • 38 USDT",
    "💸 Withdrawal • 0x5f...a3c7 • 45 USDT",
    "💸 Withdrawal • 0x1e...d9b4 • 52 USDT",
    "💸 Withdrawal • 0x4b...f2e6 • 59 USDT",
    "💸 Withdrawal • 0x6d...c8a1 • 66 USDT",
    "💸 Withdrawal • 0x3a...e5b9 • 73 USDT",
    "💸 Withdrawal • 0x8f...d2c4 • 81 USDT",
    "💸 Withdrawal • 0x2c...b7f3 • 89 USDT",
    "💸 Withdrawal • 0x7e...a1d8 • 97 USDT",
    "💸 Withdrawal • 0x9b...f4c2 • 105 USDT",
    "💸 Withdrawal • 0x5a...e3b7 • 114 USDT",
    "💸 Withdrawal • 0x1f...d8c5 • 123 USDT",
    "💸 Withdrawal • 0x3d...b2a9 • 132 USDT",
    "💸 Withdrawal • 0x6c...f7e4 • 141 USDT",
    "💸 Withdrawal • 0x2e...a5b8 • 151 USDT",
    "💸 Withdrawal • 0x8a...d3c6 • 161 USDT",
    "💸 Withdrawal • 0x4f...b2d7 • 172 USDT",
    "💸 Withdrawal • 0x7b...e9c3 • 183 USDT",
    "💸 Withdrawal • 0x1a...f5d8 • 194 USDT",
    "💸 Withdrawal • 0x9e...c2b4 • 206 USDT",
    "💸 Withdrawal • 0x5c...d7a1 • 218 USDT",
    "💸 Withdrawal • 0x2b...f8e3 • 231 USDT",
    "💸 Withdrawal • 0x6a...d4c9 • 244 USDT",
    "💸 Withdrawal • 0x3f...b7a2 • 257 USDT",
    "💸 Withdrawal • 0x8d...e1f5 • 271 USDT",
    "💸 Withdrawal • 0x4c...a9b3 • 285 USDT",
    "💸 Withdrawal • 0x1b...f3d7 • 299 USDT",
    "💸 Withdrawal • 0x7e...c2a5 • 314 USDT",
    "💸 Withdrawal • 0x9a...d6b8 • 329 USDT",
    "💸 Withdrawal • 0x5d...e4c1 • 345 USDT",
    "💸 Withdrawal • 0x2f...b9a4 • 361 USDT",
    "💸 Withdrawal • 0x8c...f1e7 • 378 USDT",
    "💸 Withdrawal • 0x3e...a7d2 • 395 USDT",
    "💸 Withdrawal • 0x6b...c5f9 • 413 USDT",
    "💸 Withdrawal • 0x4a...d3e8 • 431 USDT",
    "💸 Withdrawal • 0x9f...b2c6 • 449 USDT",
    "💸 Withdrawal • 0x1c...f4a7 • 468 USDT",
    "💸 Withdrawal • 0x7a...d2e5 • 487 USDT",
    "💸 Withdrawal • 0x5b...c8f1 • 507 USDT",
    "💸 Withdrawal • 0x2d...b5a8 • 527 USDT",
    "💸 Withdrawal • 0x8e...f3c7 • 548 USDT",
    "💸 Withdrawal • 0x4f...a1d9 • 569 USDT",
    "💸 Withdrawal • 0x6c...e2b4 • 591 USDT",
    "💸 Withdrawal • 0x3b...d7f2 • 613 USDT",
    "💸 Withdrawal • 0x9a...c4e6 • 636 USDT",
    "💸 Withdrawal • 0x1e...f8b3 • 659 USDT",
    "💸 Withdrawal • 0x7d...a5c9 • 683 USDT",
    "💸 Withdrawal • 0x5f...b2d1 • 707 USDT",
    "💸 Withdrawal • 0x2a...c7e4 • 732 USDT",
    "💸 Withdrawal • 0x8b...f1d6 • 757 USDT",
    "💸 Withdrawal • 0x3c...a9b5 • 783 USDT",
    "💸 Withdrawal • 0x6d...e2f8 • 809 USDT",
    "💸 Withdrawal • 0x9e...b3c1 • 836 USDT",
    "💸 Withdrawal • 0x1f...a4d7 • 863 USDT",
    "💸 Withdrawal • 0x4b...c8e2 • 891 USDT",
    "💸 Withdrawal • 0x7c...d9f4 • 919 USDT",
    "💸 Withdrawal • 0x2f...e6a3 • 948 USDT",
    "💸 Withdrawal • 0x8a...b7c5 • 977 USDT",
    "💸 Withdrawal • 0x5e...d1f9 • 1,007 USDT",
    "💸 Withdrawal • 0x3d...c2a7 • 1,037 USDT",
    "💸 Withdrawal • 0x6a...f4b8 • 1,068 USDT",
    "💸 Withdrawal • 0x9c...e5d2 • 1,099 USDT",
    "💸 Withdrawal • 0x2b...a8f6 • 1,131 USDT",
    "💸 Withdrawal • 0x7f...c3e9 • 1,163 USDT",
    "💰 Deposit • 0x3f...a2d1 • 150 USDT",
    "💰 Deposit • 0x8b...c4e9 • 275 USDT",
    "💰 Deposit • 0x7d...f1b3 • 420 USDT",
    "💰 Deposit • 0x2a...e7f8 • 580 USDT",
    "💰 Deposit • 0x9c...b5d2 • 750 USDT",
    "💰 Deposit • 0x5f...a3c7 • 930 USDT",
    "💰 Deposit • 0x1e...d9b4 • 1,120 USDT",
    "💰 Deposit • 0x4b...f2e6 • 1,320 USDT",
    "💰 Deposit • 0x6d...c8a1 • 1,530 USDT",
    "💰 Deposit • 0x3a...e5b9 • 1,750 USDT",
    "💰 Deposit • 0x8f...d2c4 • 1,980 USDT",
    "💰 Deposit • 0x2c...b7f3 • 2,220 USDT",
    "💰 Deposit • 0x7e...a1d8 • 2,470 USDT",
    "💰 Deposit • 0x9b...f4c2 • 2,730 USDT",
    "💰 Deposit • 0x5a...e3b7 • 1,000 USDT",
    "💰 Deposit • 0x1f...d8c5 • 3,280 USDT",
    "💰 Deposit • 0x3d...b2a9 • 1,570 USDT",
    "💰 Deposit • 0x6c...f7e4 • 1,870 USDT",
    "💰 Deposit • 0x2e...a5b8 • 2,180 USDT",
    "💰 Deposit • 0x8a...d3c6 • 2,500 USDT",
    "💰 Deposit • 0x4f...b2d7 • 1,830 USDT",
    "💰 Deposit • 0x7b...e9c3 • 5,170 USDT",
    "💰 Deposit • 0x1a...f5d8 • 1,520 USDT",
    "💰 Deposit • 0x9e...c2b4 • 5,880 USDT",
    "💰 Deposit • 0x5c...d7a1 • 1,250 USDT",
    "💰 Deposit • 0x2b...f8e3 • 1,630 USDT",
    "💰 Deposit • 0x6a...d4c9 • 2,020 USDT",
    "💰 Deposit • 0x3f...b7a2 • 4,420 USDT",
    "💰 Deposit • 0x8d...e1f5 • 2,830 USDT",
    "💰 Deposit • 0x4c...a9b3 • 1,250 USDT",
    "💸 Withdrawal • 0x8f...d2c4 • 860 USDT",
    "💸 Withdrawal • 0x2c...b7f3 • 620 USDT",
    "💸 Withdrawal • 0x7e...a1d8 • 210 USDT",
    "💸 Withdrawal • 0x9b...f4c2 • 80 USDT",
    "💸 Withdrawal • 0x5a...e3b7 • 0.16 BNB",
    "💸 Withdrawal • 0x1f...d8c5 • 0.21 BNB",
    "💸 Withdrawal • 0x3d...b2a9 • 0.27 BNB",
    "💸 Withdrawal • 0x6c...f7e4 • 0.34 BNB",
    "💸 Withdrawal • 0x2e...a5b8 • 0.42 BNB",
    "💸 Withdrawal • 0x8a...d3c6 • 0.51 BNB",
    "💸 Withdrawal • 0x4f...b2d7 • 0.61 BNB",
    "💸 Withdrawal • 0x7b...e9c3 • 0.72 BNB",
    "💸 Withdrawal • 0x1a...f5d8 • 0.84 BNB",
    "💸 Withdrawal • 0x9e...c2b4 • 0.97 BNB",
    "💸 Withdrawal • 0x5c...d7a1 • 1,744 USDT",
    "💸 Withdrawal • 0x2b...f8e3 • 800 USDT",
    "💸 Withdrawal • 0x6a...d4c9 • 1,050 USDT",
    "💸 Withdrawal • 0x3f...b7a2 • 425 USDT",
    "💸 Withdrawal • 0x8d...e1f5 • 47.28 USDT",
    "💸 Withdrawal • 0x4c...a9b3 • 99.80 USDT",
    "💸 Withdrawal • 0x1b...f3d7 • 311.90 USDT",
    "💸 Withdrawal • 0x7e...c2a5 • 877 USDT",
    "💸 Withdrawal • 0x9a...d6b8 • 11,000 USDT",
    "💸 Withdrawal • 0x5d...e4c1 • 609 USDT",
    "💸 Withdrawal • 0x2f...b9a4 • 42 USDT",
    "💸 Withdrawal • 0x8c...f1e7 • 10 USDT",
    "💸 Withdrawal • 0x3e...a7d2 • 39 USDT",
    "💸 Withdrawal • 0x6b...c5f9 • 28.66 USDT",
    "💸 Withdrawal • 0x4a...d3e8 • 2,100 USDT",
    "💸 Withdrawal • 0x9f...b2c6 • 88.11 USDT",
    "💸 Withdrawal • 0x1c...f4a7 • 20 USDT",
    "💸 Withdrawal • 0x7a...d2e5 • 7,200 USDT",
    "💸 Withdrawal • 0x5b...c8f1 • 67 USDT",
    "💸 Withdrawal • 0x2d...b5a8 • 206 USDT",
    "💸 Withdrawal • 0x8e...f3c7 • 900 USDT",
    "💸 Withdrawal • 0x4f...a1d9 • 6 USDT",
    "💸 Withdrawal • 0x6c...e2b4 • 440.33 USDT",
    "💸 Withdrawal • 0x3b...d7f2 • 7.09 USDT",
    "💸 Withdrawal • 0x9a...c4e6 • 22 USDT",
    "💸 Withdrawal • 0x1e...f8b3 • 30.18 USDT",
    "💸 Withdrawal • 0x7d...a5c9 • 18.26 USDT",
    "💸 Withdrawal • 0x5f...b2d1 • 28.67 USDT",
    "💸 Withdrawal • 0x2a...c7e4 • 19.09 USDT",
    "💸 Withdrawal • 0x8b...f1d6 • 94.52 USDT",
    "💸 Withdrawal • 0x3c...a9b5 • 94.96 USDT",
    "💸 Withdrawal • 0x6d...e2f8 • 102.41 USDT",
    "💸 Withdrawal • 0x9e...b3c1 • 10.87 USDT",
    "💸 Withdrawal • 0x1f...a4d7 • 211.34 USDT",
    "💸 Withdrawal • 0x4b...c8e2 • 611.82 USDT",
    "💸 Withdrawal • 0x7c...d9f4 • 120.40 USDT",
    "💰 Deposit • 0x8f...d2c4 • 0.15 BNB",
    "💰 Deposit • 0x2c...b7f3 • 0.28 BNB",
    "💰 Deposit • 0x7e...a1d8 • 0.42 BNB",
    "💰 Deposit • 0x9b...f4c2 • 0.58 BNB",
    "💰 Deposit • 0x5a...e3b7 • 0.75 BNB",
    "💰 Deposit • 0x1f...d8c5 • 0.02 BNB",
    "💰 Deposit • 0x3d...b2a9 • 0.02109 BNB",
    "💰 Deposit • 0x6c...f7e4 • 0.08 BNB",
    "💰 Deposit • 0x2e...a5b8 • 0.02 BNB",
    "💰 Deposit • 0x8a...d3c6 • 0.054 BNB",
    "💰 Deposit • 0x4f...b2d7 • 0.07 BNB",
    "💰 Deposit • 0x7b...e9c3 • 1 BNB",
    "💰 Deposit • 0x1a...f5d8 • 0.0101 BNB",
    "💰 Deposit • 0x9e...c2b4 • 0.03 BNB",
    "💰 Deposit • 0x5c...d7a1 • 0.1506 BNB",
    "💰 Deposit • 0x2b...f8e3 • 0.02207 BNB",
    "💰 Deposit • 0x6a...d4c9 • 1 BNB",
    "💰 Deposit • 0x3f...b7a2 • 0.0922 BNB",
    "💰 Deposit • 0x8d...e1f5 • 0.02075 BNB",
    "💰 Deposit • 0x4c...a9b3 • 0.0265 BNB",
    "💰 Deposit • 0x1b...f3d7 • 1 BNB",
    "💰 Deposit • 0x7e...c2a5 • 0.75 BNB",
    "💰 Deposit • 0x9a...d6b8 • 0.025 BNB",
    "💰 Deposit • 0x5d...e4c1 • 1 BNB",
    "💰 Deposit • 0x2f...b9a4 • 0.44 BNB",
    "💰 Deposit • 0x8c...f1e7 • 0.02 BNB",
    "💰 Deposit • 0x3e...a7d2 • 0.11 BNB",
    "💰 Deposit • 0x6b...c5f9 • 0.02 BNB",
    "💰 Deposit • 0x4a...d3e8 • 0.34 BNB",
    "💰 Deposit • 0x9f...b2c6 • 0.88 BNB",
    "💰 Deposit • 0x3f...a2d1 • 10,250,000 REFI",
    "💰 Deposit • 0x8b...c4e9 • 18,850,000 REFI",
    "💰 Deposit • 0x7d...f1b3 • 201,400,000 REFI",
    "💰 Deposit • 0x2a...e7f8 • 29,950,000 REFI",
    "💰 Deposit • 0x9c...b5d2 • 30,500,000 REFI",
    "💰 Deposit • 0x5f...a3c7 • 48,100,000 REFI",
    "💰 Deposit • 0x1e...d9b4 • 48,750,000 REFI",
    "💰 Deposit • 0x4b...f2e6 • 50,400,000 REFI",
    "💰 Deposit • 0x6d...c8a1 • 61,100,000 REFI",
    "💰 Deposit • 0x3a...e5b9 • 86,800,000 REFI",
    "💰 Deposit • 0x8f...d2c4 • 67,500,000 REFI",
    "💰 Deposit • 0x2c...b7f3 • 81,300,000 REFI",
    "💰 Deposit • 0x7e...a1d8 • 91,100,000 REFI",
    "💰 Deposit • 0x9b...f4c2 • 29,900,000 REFI",
    "💰 Deposit • 0x5a...e3b7 • 10,800,000 REFI",
    "💰 Deposit • 0x1f...d8c5 • 11,700,000 REFI",
    "💰 Deposit • 0x3d...b2a9 • 12,600,000 REFI",
    "💰 Deposit • 0x6c...f7e4 • 13,500,000 REFI",
    "💰 Deposit • 0x2e...a5b8 • 14,500,000 REFI",
    "💰 Deposit • 0x8a...d3c6 • 15,500,000 REFI",
    "💰 Deposit • 0x4f...b2d7 • 16,500,000 REFI",
    "💰 Deposit • 0x7b...e9c3 • 17,600,000 REFI",
    "💰 Deposit • 0x1a...f5d8 • 187,700,000 REFI",
    "💰 Deposit • 0x9e...c2b4 • 19,800,000 REFI",
    "💰 Deposit • 0x5c...d7a1 • 21,000,000 REFI",
    "💰 Deposit • 0x2b...f8e3 • 22,200,000 REFI",
    "💰 Deposit • 0x6a...d4c9 • 23,400,000 REFI",
    "💰 Deposit • 0x3f...b7a2 • 242,700,000 REFI",
    "💰 Deposit • 0x8d...e1f5 • 26,000,000 REFI",
    "💰 Deposit • 0x4c...a9b3 • 27,300,000 REFI",
    "💰 Deposit • 0x1b...f3d7 • 28,700,000 REFI",
    "💰 Deposit • 0x7e...c2a5 • 30,100,000 REFI",
    "💰 Deposit • 0x9a...d6b8 • 31,500,000 REFI",
    "💰 Deposit • 0x5d...e4c1 • 33,000,000 REFI",
    "💰 Deposit • 0x2f...b9a4 • 340,500,000 REFI",
    "💰 Deposit • 0x8c...f1e7 • 36,000,000 REFI",
    "💰 Deposit • 0x3e...a7d2 • 370,600,000 REFI",
    "💰 Deposit • 0x6b...c5f9 • 39,200,000 REFI",
    "💰 Deposit • 0x4a...d3e8 • 40,800,000 REFI",
    "💰 Deposit • 0x9f...b2c6 • 42,500,000 REFI",
    "💰 Deposit • 0x1c...f4a7 • 44,200,000 REFI",
    "💰 Deposit • 0x7a...d2e5 • 45,900,000 REFI",
    "💰 Deposit • 0x5b...c8f1 • 47,700,000 REFI",
    "💰 Deposit • 0x2d...b5a8 • 49,500,000 REFI",
    "💰 Deposit • 0x8e...f3c7 • 51,300,000 REFI",
    "💰 Deposit • 0x4f...a1d9 • 53,200,000 REFI",
    "💰 Deposit • 0x6c...e2b4 • 55,100,000 REFI",
    "💰 Deposit • 0x3b...d7f2 • 57,000,000 REFI",
    "💰 Deposit • 0x9a...c4e6 • 59,000,000 REFI",
    "💰 Deposit • 0x1e...f8b3 • 61,000,000 REFI",
    "💰 Deposit • 0x3f...a2d1 • 1,200 THB",
    "💰 Deposit • 0x8b...c4e9 • 6,800 THB",
    "💰 Deposit • 0x7d...f1b3 • 2,500 THB",
    "💰 Deposit • 0x2a...e7f8 • 10,300 THB",
    "💰 Deposit • 0x9c...b5d2 • 12,600 THB",
    "💰 Deposit • 0x5f...a3c7 • 14,900 THB",
    "💰 Deposit • 0x1e...d9b4 • 7,200 THB",
    "💰 Deposit • 0x4b...f2e6 • 19,500 THB",
    "💰 Deposit • 0x6d...c8a1 • 21,800 THB",
    "💰 Deposit • 0x3a...e5b9 • 24,100 THB",
    "💰 Deposit • 0x8f...d2c4 • 26,400 THB",
    "💰 Deposit • 0x2c...b7f3 • 28,700 THB",
    "💰 Deposit • 0x7e...a1d8 • 31,000 THB",
    "💰 Deposit • 0x9b...f4c2 • 33,300 THB",
    "💰 Deposit • 0x5a...e3b7 • 35,600 THB",
    "💰 Deposit • 0x1f...d8c5 • 37,900 THB",
    "💰 Deposit • 0x3d...b2a9 • 40,200 THB",
    "💰 Deposit • 0x6c...f7e4 • 2,500 THB",
    "💰 Deposit • 0x2e...a5b8 • 44,800 THB",
    "💰 Deposit • 0x8a...d3c6 • 47,100 THB",
    "💰 Deposit • 0x4f...b2d7 • 9,400 THB",
    "💰 Deposit • 0x7b...e9c3 • 51,700 THB",
    "💰 Deposit • 0x1a...f5d8 • 4,000 THB",
    "💰 Deposit • 0x9e...c2b4 • 56,300 THB",
    "💰 Deposit • 0x5c...d7a1 • 58,600 THB",
    "💰 Deposit • 0x2b...f8e3 • 60,900 THB",
    "💰 Deposit • 0x6a...d4c9 • 63,200 THB",
    "💰 Deposit • 0x3f...b7a2 • 65,500 THB",
    "💰 Deposit • 0x8d...e1f5 • 67,800 THB",
    "💰 Deposit • 0x4c...a9b3 • 70,100 THB",
    "💰 Deposit • 0x1b...f3d7 • 72,400 THB",
    "💰 Deposit • 0x7e...c2a5 • 74,700 THB",
    "💰 Deposit • 0x9a...d6b8 • 77,000 THB",
    "💰 Deposit • 0x5d...e4c1 • 79,300 THB",
    "💰 Deposit • 0x2f...b9a4 • 8,600 THB",
    "💰 Deposit • 0x8c...f1e7 • 83,900 THB",
    "💰 Deposit • 0x3e...a7d2 • 6,200 THB",
    "💰 Deposit • 0x6b...c5f9 • 88,500 THB",
    "💰 Deposit • 0x4a...d3e8 • 90,800 THB",
    "💰 Deposit • 0x9f...b2c6 • 9,100 THB",
    "💰 Deposit • 0x1c...f4a7 • 95,400 THB",
    "💰 Deposit • 0x7a...d2e5 • 7,700 THB",
    "💰 Deposit • 0x5b...c8f1 • 100,000 THB",
    "💰 Deposit • 0x2d...b5a8 • 102,300 THB",
    "💰 Deposit • 0x8e...f3c7 • 104,600 THB",
    "💰 Deposit • 0x4f...a1d9 • 106,900 THB",
    "💰 Deposit • 0x6c...e2b4 • 109,200 THB",
    "💰 Deposit • 0x3b...d7f2 • 111,500 THB",
    "💰 Deposit • 0x9a...c4e6 • 113,800 THB",
    "💰 Deposit • 0x1e...f8b3 • 116,100 THB",
    "💰 Deposit • 0x3f...a2d1 • 12 ZDX",
    "💰 Deposit • 0x8b...c4e9 • 18 ZDX",
    "💰 Deposit • 0x7d...f1b3 • 24 ZDX",
    "💰 Deposit • 0x2a...e7f8 • 31 ZDX",
    "💰 Deposit • 0x9c...b5d2 • 38 ZDX",
    "💰 Deposit • 0x5f...a3c7 • 45 ZDX",
    "💰 Deposit • 0x1e...d9b4 • 52 ZDX",
    "💰 Deposit • 0x4b...f2e6 • 59 ZDX",
    "💰 Deposit • 0x6d...c8a1 • 66 ZDX",
    "💰 Deposit • 0x3a...e5b9 • 73 ZDX",
    "💰 Deposit • 0x8f...d2c4 • 81 ZDX",
    "💰 Deposit • 0x2c...b7f3 • 89 ZDX",
    "💰 Deposit • 0x7e...a1d8 • 97 ZDX",
    "💰 Deposit • 0x9b...f4c2 • 105 ZDX",
    "💰 Deposit • 0x5a...e3b7 • 114 ZDX",
    "💰 Deposit • 0x1f...d8c5 • 123 ZDX",
    "💰 Deposit • 0x3d...b2a9 • 132 ZDX",
    "💰 Deposit • 0x6c...f7e4 • 141 ZDX",
    "💰 Deposit • 0x2e...a5b8 • 151 ZDX",
    "💰 Deposit • 0x8a...d3c6 • 161 ZDX",
    "💰 Deposit • 0x4f...b2d7 • 172 ZDX",
    "💰 Deposit • 0x7b...e9c3 • 183 ZDX",
    "💰 Deposit • 0x1a...f5d8 • 194 ZDX",
    "💰 Deposit • 0x9e...c2b4 • 206 ZDX",
    "💰 Deposit • 0x5c...d7a1 • 218 ZDX",
    "💰 Deposit • 0x2b...f8e3 • 231 ZDX",
    "💰 Deposit • 0x6a...d4c9 • 244 ZDX",
    "💰 Deposit • 0x3f...b7a2 • 257 ZDX"
];

// ============================================================================
// 31.5 AD PLATFORMS - قائمة المنصات الإعلانية (للدمج)
// ============================================================================

// قائمة المنصات الإعلانية
const AD_PLATFORMS = [
    {
        name: 'Monetag',
        show: () => {
            if (typeof show_10895553 === 'function') {
                return show_10895553();
            }
            return Promise.reject('Monetag not ready');
        }
    },
    {
        name: 'AdsGram',
        init: () => {
            if (!window.AdsgramController && window.Adsgram) {
                window.AdsgramController = window.Adsgram.init({
                    blockId: "int-28433"
                });
            }
        },
        show: () => {
            if (!window.AdsgramController && window.Adsgram) {
                window.AdsgramController = window.Adsgram.init({
                    blockId: "int-28433"
                });
            }
            if (window.AdsgramController && typeof window.AdsgramController.show === 'function') {
                return window.AdsgramController.show();
            }
            return Promise.reject('AdsGram not ready');
        }
    },
    {
    name: 'Adsterra',
    show: () => {
        return new Promise((resolve) => {
            // إنشاء div مخفي لتشغيل الإعلان
            const div = document.createElement('div');
            div.id = 'container-ec29551cda213c0df9d222191d9fbbce';
            div.style.display = 'none';
            document.body.appendChild(div);
            
            // تشغيل الإعلان
            const script = document.createElement('script');
            script.src = 'https://pl29224593.profitablecpmratenetwork.com/ec29551cda213c0df9d222191d9fbbce/invoke.js';
            script.async = true;
            document.body.appendChild(script);
            
            // بعد 5 ثوانٍ، نعتبر الإعلان قد شوهد
            setTimeout(() => {
                resolve(); // ✅ نضيف المكافأة
            }, 5000);
        });
    }
}
// ============================================================================
// 32. EARN SYSTEM - COMPLETE WITH PENDING BALANCE & CLAIM
// ============================================================================

const EARN_KEY = `earn_${userId}`;

function loadEarnData() {
    const defaultData = {
        pendingBalance: 0,
        totalClaimed: 0,
        watchedCount: 0,
        lastResetTime: Date.now(),
        lastWatchTime: 0
    };

    const saved = localStorage.getItem(EARN_KEY);

    if (saved) {
        try {
            const data = JSON.parse(saved);
            const hoursSinceReset = (Date.now() - data.lastResetTime) / (1000 * 60 * 60);

            if (hoursSinceReset >= EARN_CONFIG.RESET_HOURS && data.watchedCount > 0) {
                return {
                    ...defaultData,
                    pendingBalance: data.pendingBalance,
                    totalClaimed: data.totalClaimed,
                    lastResetTime: Date.now()
                };
            }

            return data;
        } catch (error) {
            console.error("Error loading earn data:", error);
        }
    }

    return defaultData;
}

function saveEarnData(data) {
    localStorage.setItem(EARN_KEY, JSON.stringify(data));

    if (userData) {
        userData.earnData = data;
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    }
}

function updateEarnUI() {
    const earnData = loadEarnData();
    const remaining = Math.max(0, EARN_CONFIG.ADS_PER_CYCLE - earnData.watchedCount);
    const progressPercent = Math.min(100, (earnData.pendingBalance / EARN_CONFIG.MIN_TRANSFER) * 100);

    const pendingBalanceEl = document.getElementById('earnPendingBalance');
    const watchedCountEl = document.getElementById('earnWatchedCount');
    const remainingEl = document.getElementById('earnRemaining');
    const resetTimeEl = document.getElementById('earnResetTime');
    const progressFillEl = document.getElementById('earnProgressFill');
    const progressTextEl = document.getElementById('earnProgressText');
    const claimBtn = document.getElementById('claimEarnBtn');

    if (pendingBalanceEl) {
        pendingBalanceEl.textContent = `${earnData.pendingBalance.toLocaleString()} REFI`;
    }

    if (watchedCountEl) {
        watchedCountEl.textContent = `${earnData.watchedCount} / ${EARN_CONFIG.ADS_PER_CYCLE}`;
    }

    if (remainingEl) {
        remainingEl.textContent = `${remaining} remaining`;
    }

    if (progressFillEl) {
        progressFillEl.style.width = `${progressPercent}%`;
    }

    if (progressTextEl) {
        if (earnData.pendingBalance >= EARN_CONFIG.MIN_TRANSFER) {
            progressTextEl.textContent = `✅ You've reached the minimum! Click CLAIM to transfer.`;
            progressTextEl.style.color = '#10b981';
        } else {
            const needed = EARN_CONFIG.MIN_TRANSFER - earnData.pendingBalance;
            progressTextEl.textContent = `🎯 Need ${needed.toLocaleString()} more REFI to claim`;
            progressTextEl.style.color = 'var(--text-secondary)';
        }
    }

    if (claimBtn) {
        if (earnData.pendingBalance >= EARN_CONFIG.MIN_TRANSFER) {
            claimBtn.style.display = 'flex';
            claimBtn.disabled = false;
            claimBtn.style.opacity = '1';
        } else {
            claimBtn.style.display = 'none';
        }
    }

    const timeSinceReset = Date.now() - earnData.lastResetTime;
    const timeRemainingMs = Math.max(0, (EARN_CONFIG.RESET_HOURS * 60 * 60 * 1000) - timeSinceReset);
    const hoursRemaining = Math.floor(timeRemainingMs / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemainingMs % (1000 * 60 * 60)) / (1000 * 60));
    const resetTimeString = `${hoursRemaining}h ${minutesRemaining}m`;

    if (resetTimeEl) {
        resetTimeEl.textContent = resetTimeString;
    }

    const watchBtn = document.getElementById('watchAdBtn');

    if (watchBtn) {
        if (earnData.watchedCount >= EARN_CONFIG.ADS_PER_CYCLE) {
            watchBtn.disabled = true;
            watchBtn.style.opacity = '0.6';
            watchBtn.innerHTML = '<i class="fa-regular fa-clock"></i> <span>Limit reached</span> <i class="fa-regular fa-hourglass-half"></i>';
        } else {
            watchBtn.disabled = false;
            watchBtn.style.opacity = '1';
            watchBtn.innerHTML = '<i class="fa-regular fa-tv"></i> <span>' + t('earn.watchAd') + '</span> <i class="fa-regular fa-coins"></i>';
        }
    }
}

function addEarnReward() {
    if (!userData) {
        console.error("User data not loaded");
        return false;
    }

    let earnData = loadEarnData();
    const rewardAmount = EARN_CONFIG.REWARD_PER_AD;

    earnData.pendingBalance += rewardAmount;
    earnData.watchedCount++;

    saveEarnData(earnData);
    updateEarnUI();

    showToast(`🎬 +${rewardAmount.toLocaleString()} REFI added to pending balance!`, 'success');

    return true;
}

function checkAndResetEarnCycle() {
    let earnData = loadEarnData();
    const hoursSinceReset = (Date.now() - earnData.lastResetTime) / (1000 * 60 * 60);

    if (hoursSinceReset >= EARN_CONFIG.RESET_HOURS && earnData.watchedCount > 0) {
        earnData.watchedCount = 0;
        earnData.lastResetTime = Date.now();
        saveEarnData(earnData);

        showToast(`✨ Ads reset! You can watch ${EARN_CONFIG.ADS_PER_CYCLE} more ads!`, 'success');
        updateEarnUI();

        return true;
    }

    return false;
}

async function claimEarnReward() {
    let earnData = loadEarnData();

    if (earnData.pendingBalance < EARN_CONFIG.MIN_TRANSFER) {
        const needed = EARN_CONFIG.MIN_TRANSFER - earnData.pendingBalance;
        showToast(`❌ You need ${needed.toLocaleString()} more REFI to claim!`, 'warning');
        return;
    }

    const claimAmount = earnData.pendingBalance;

    const claimBtn = document.getElementById('claimEarnBtn');

    if (claimBtn) {
        claimBtn.disabled = true;
        claimBtn.style.opacity = '0.6';
        claimBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
    }

    try {
        if (db) {
            await db.collection('users').doc(userId).update({
                'balances.REFI': firebase.firestore.FieldValue.increment(claimAmount)
            });
            console.log(`✅ Firebase updated: +${claimAmount} REFI to wallet`);
        }

        userData.balances.REFI = (userData.balances.REFI || 0) + claimAmount;
        earnData.totalClaimed += claimAmount;
        earnData.pendingBalance = 0;

        saveEarnData(earnData);
        localStorage.setItem(`user_${userId}`, JSON.stringify(userData));

        const transaction = {
            userId: userId,
            userName: userName,
            type: 'earn',
            amount: claimAmount,
            currency: 'REFI',
            status: 'completed',
            timestamp: new Date().toISOString(),
            details: `Claimed from Earn (${earnData.totalClaimed.toLocaleString()} total claimed)`
        };

        addTransaction(transaction);

        updateUI();
        updateEarnUI();

        showToast(`🎉 Success! ${claimAmount.toLocaleString()} REFI transferred to your wallet!`, 'success');

    } catch (error) {
        console.error("Claim error:", error);
        showToast("❌ Failed to claim. Please try again.", "error");
    } finally {
        if (claimBtn) {
            claimBtn.disabled = false;
            claimBtn.style.opacity = '1';
            claimBtn.innerHTML = '<i class="fa-regular fa-gem"></i> <span>CLAIM ' + EARN_CONFIG.MIN_TRANSFER.toLocaleString() + ' REFI</span> <i class="fa-regular fa-arrow-right-to-bracket"></i>';
        }
    }
}

async function watchAd() {
    let earnData = loadEarnData();

    checkAndResetEarnCycle();
    earnData = loadEarnData();

    if (earnData.watchedCount >= EARN_CONFIG.ADS_PER_CYCLE) {
        showToast(`You've reached the limit of ${EARN_CONFIG.ADS_PER_CYCLE} ads. Please wait for reset.`, 'warning');
        return;
    }

    const now = Date.now();

    if (now - earnData.lastWatchTime < 5000) {
        showToast("Please wait a few seconds before watching another ad", "warning");
        return;
    }

    earnData.lastWatchTime = now;
    saveEarnData(earnData);

    const watchBtn = document.getElementById('watchAdBtn');

    if (watchBtn) {
        watchBtn.disabled = true;
        watchBtn.style.opacity = '0.6';
    }

    for (const platform of AD_PLATFORMS) {
        if (platform.init) {
            try {
                platform.init();
            } catch (error) {
                console.log(`${platform.name} init failed:`, error);
            }
        }
    }

    const shuffledPlatforms = [...AD_PLATFORMS].sort(() => Math.random() - 0.5);

    let adShown = false;
    let lastError = null;

    for (const platform of shuffledPlatforms) {
        try {
            console.log(`📢 Trying to show ad from: ${platform.name}`);

            if (platform.init) {
                platform.init();
            }

            await platform.show();

            console.log(`✅ Ad shown successfully from: ${platform.name}`);
            adShown = true;
            break;

        } catch (error) {
            console.log(`❌ Failed to show ad from ${platform.name}:`, error);
            lastError = error;
        }
    }

    if (adShown) {
        addEarnReward();
        updateEarnUI();
        showToast(`✅ Ad watched! +${EARN_CONFIG.REWARD_PER_AD.toLocaleString()} REFI added to pending balance!`, 'success');
    } else {
        console.error("All ad platforms failed:", lastError);
        showToast("No ads available. Please try again later.", "error");
    }

    if (watchBtn) {
        watchBtn.disabled = false;
        watchBtn.style.opacity = '1';
    }
}

// ============================================================================
// 33. INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    if (currentLanguage === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.dir = 'rtl';

        document.getElementById('currentLanguageFlag').textContent = '🇸🇦';
    } else {
        document.getElementById('currentLanguageFlag').textContent = '🇬🇧';
    }

    updateAllTexts();

    setTimeout(checkAdminAndAddCrown, 300);

    setTimeout(() => {
        const splash = document.getElementById('splashScreen');

        if (splash) {
            splash.classList.add('hidden');
        }

        document.getElementById('mainContent').style.display = 'block';

        initFloatingNotifications();

        setTimeout(() => {
            showRandomSticker();
        }, 500);
    }, 2000);

    setTimeout(fixNotificationButton, 1500);

    initApp();
});

async function initApp() {
    if (appInitialized) {
        return;
    }

    try {
        console.log("🚀 Initializing app...");

        await loadUserData();
        await loadPricesOnce();

        renderStakingPlans();
        renderAssets();
        renderTopCryptos();
        updateTotalBalance();
        updateReferralStats();
        setupScrollListener();

        updateEarnUI();

        // ✅ عرض نافذة الإطلاق (مرة واحدة فقط)
        showLaunchPopup();

        appInitialized = true;

        console.log("✅ App initialized successfully");
        console.log("✅ Earn System: 30 ads per 6 hours, 10,000 REFI per ad");
        console.log("✅ All features preserved");
    } catch (error) {
        console.error("❌ Error initializing app:", error);
    }
}

let currentAdminTab = 'deposits';

// ============================================================================
// 33.5 LAUNCH POPUP FUNCTIONS
// ============================================================================

function closeLaunchPopup() {
    const popup = document.getElementById('launchPopup');
    if (popup) {
        popup.classList.remove('show');
    }
}

function showLaunchPopup() {
    if (!localStorage.getItem('launchPopupShown')) {
        setTimeout(() => {
            const popup = document.getElementById('launchPopup');
            if (popup) {
                popup.classList.add('show');
                localStorage.setItem('launchPopupShown', 'true');
                
                let countdown = 10;
                const countdownEl = document.getElementById('popupCountdown');
                if (countdownEl) {
                    const interval = setInterval(() => {
                        countdown--;
                        if (countdownEl) countdownEl.textContent = countdown;
                        if (countdown <= 0) {
                            clearInterval(interval);
                            closeLaunchPopup();
                        }
                    }, 1000);
                }
            }
        }, 1000);
    }
}

// ============================================================================
// 34. EXPORT FUNCTIONS
// ============================================================================

window.showWallet = showWallet;
window.showSwap = showSwap;
window.showEarn = showEarn;
window.showStaking = showStaking;
window.showReferral = showReferral;
window.showDepositModal = showDepositModal;
window.showWithdrawModal = showWithdrawModal;
window.showHistory = showHistory;
window.showNotifications = showNotifications;
window.showP2P = showP2P;
window.showAllAssets = showAllAssets;
window.showAssetDetails = showAssetDetails;
window.showCryptoDetails = showCryptoDetails;
window.showStakingDetails = showStakingDetails;
window.showCurrencySelector = showCurrencySelector;
window.showAdminPanel = showAdminPanel;
window.closeModal = closeModal;
window.closeAdminPanel = closeAdminPanel;
window.filterHistory = filterHistory;
window.refreshPrices = refreshPrices;
window.selectCurrency = selectCurrency;
window.filterCurrencies = filterCurrencies;
window.flipSwapPair = flipSwapPair;
window.calculateSwap = calculateSwap;
window.confirmSwap = confirmSwap;
window.setMaxAmount = setMaxAmount;
window.swapDirection = swapDirection;
window.selectStakingPlan = selectStakingPlan;
window.calculateStakingReturn = calculateStakingReturn;
window.stakeUSDT = stakeUSDT;
window.claimStakingReward = claimStakingReward;
window.claimStakingMission = claimStakingMission;
window.claimReferralMilestone = claimReferralMilestone;
window.copyReferralLink = copyReferralLink;
window.shareReferral = shareReferral;
window.copyDepositAddress = copyDepositAddress;
window.submitDeposit = submitDeposit;
window.checkWithdrawFee = checkWithdrawFee;
window.submitWithdraw = submitWithdraw;
window.validateTransactionHashInput = validateTransactionHashInput;
window.validateWithdrawAddressInput = validateWithdrawAddressInput;
window.toggleLanguage = toggleLanguage;
window.scrollToTop = scrollToTop;
window.checkPendingTransactions = checkPendingTransactions;
window.clearReadNotifications = clearReadNotifications;
window.clearAllNotifications = clearAllNotifications;
window.showAdminTab = showAdminTab;
window.approveTransaction = approveTransaction;
window.rejectTransaction = rejectTransaction;
window.rejectDepositRequest = rejectDepositRequest;
window.rejectWithdrawalRequest = rejectWithdrawalRequest;
window.copyToClipboard = copyToClipboard;
window.refreshAdminPanel = refreshAdminPanel;
window.showUserManagementInterface = showUserManagementInterface;
window.adminLoadUser = adminLoadUser;
window.adminAddBalance = adminAddBalance;
window.adminRemoveBalance = adminRemoveBalance;
window.adminRefreshUserData = adminRefreshUserData;
window.showUsersCount = showUsersCount;

// ✅ دوال Earn الجديدة
window.watchAd = watchAd;
window.claimEarnReward = claimEarnReward;

// ✅ دالة إغلاق نافذة الإطلاق
window.closeLaunchPopup = closeLaunchPopup;

// ============================================================================
// 35. FINAL LOGS
// ============================================================================

console.log("✅ REFI Network v31.0 - COMPLETE");
console.log("✅ Earn: 30 ads / 6 hours / 10,000 REFI per ad / Min Claim: 500,000 REFI");
console.log("✅ Ready for deployment");
