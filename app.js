// --- تهيئة Firebase ---
const firebaseConfig = {
    apiKey: "AIzaSyCnnmuZNJxkWTw-GjaP0fz6UpS3NZLF0n8",
    authDomain: "realfinanc-22bfd.firebaseapp.com",
    projectId: "realfinanc-22bfd",
    storageBucket: "realfinanc-22bfd.appspot.com",
    messagingSenderId: "305118774780",
    appId: "1:305118774780:web:863c042918805f9659ec4d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- نظام الاستثمار ---
const plans = [
    { id: 1, name: 'خطة 7 أيام', roi: '10.5%', days: 7 },
    { id: 2, name: 'خطة 15 يوم', roi: '25%', days: 15 },
    { id: 3, name: 'خطة 30 يوم', roi: '60%', days: 30 }
];

// --- الوظائف الرئيسية ---
function showTab(tab) {
    const content = document.getElementById('content');
    if (tab === 'wallet') {
        content.innerHTML = `
            <div class="card">
                <p>إجمالي الرصيد</p>
                <div class="balance-val">$0.00 <small style="font-size:12px;color:#909090">USDT</small></div>
                <button class="btn" onclick="alert('الإيداع متاح قريباً')">إيداع</button>
            </div>
        `;
    } else if (tab === 'staking') {
        let plansHtml = plans.map(p => `
            <div class="plan-box">
                <div><strong>${p.name}</strong><br><small>ربح إجمالي: ${p.roi}</small></div>
                <button onclick="invest(${p.id})" style="background:var(--primary); border:none; border-radius:5px; padding:5px 15px;">ابدأ</button>
            </div>
        `).join('');
        content.innerHTML = `<div class="card"><h3>خطط التخزين الذكي</h3>${plansHtml}</div>`;
    } else if (tab === 'referral') {
        // توليد كود إحالة وهمي للمثال (يجب ربطه بـ UID المستخدم لاحقاً)
        const myCode = "REF-" + Math.floor(Math.random() * 9000 + 1000);
        const refLink = `https://t.me/RealnetworkPaybot/Refi?startapp=${myCode}`;
        content.innerHTML = `
            <div class="card">
                <h3>برنامج الإحالة</h3>
                <p>شارك رابطك واحصل على 5% من أرباح إحالاتك</p>
                <div style="background:#0b0e11; padding:10px; border-radius:5px; word-break:break-all; margin:10px 0;">${refLink}</div>
                <button class="btn" onclick="copyText('${refLink}')">نسخ رابط الإحالة</button>
            </div>
        `;
    } else if (tab === 'swap') {
        content.innerHTML = `<div class="card"><h3>التبديل السريع</h3><p>خدمة التبديل بين USDT و REFI ستتوفر قريباً.</p></div>`;
    }
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("تم نسخ الرابط بنجاح!");
}

function invest(id) {
    alert("جاري معالجة طلب الاستثمار للخطة رقم " + id);
}

// تشغيل التطبيق
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        showTab('wallet');
    }, 1500);
};
