const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
app.use(cors());
app.use(express.json());

const OWNER_NUMBER = '201557785842@c.us'; // رقم صاحب البراند
const ORDERS_FILE = path.join(__dirname, 'orders.json');

// تجهيز كلاينت الواتساب
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ]
  }
});

client.on('qr', (qr) => {
  console.log('اسكان الكود من واتساب (الأجهزة المرتبطة):');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('واتساب جاهز ومتصل');
});

client.initialize();

// دالة لحفظ الطلب في ملف orders.json
function saveOrder(orderData) {
  let orders = [];
  if (fs.existsSync(ORDERS_FILE)) {
    const fileContent = fs.readFileSync(ORDERS_FILE, 'utf-8');
    orders = fileContent ? JSON.parse(fileContent) : [];
  }
  orders.push({
    ...orderData,
    date: new Date().toLocaleString('en-EG'),
  });
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

// الـ endpoint اللي الفرونت اند هيبعت عليه الطلب
app.post('/api/order', async (req, res) => {
  try {
    const { name, phone, order } = req.body;

    if (!name || !phone || !order) {
      return res.status(400).json({ success: false, message: 'بيانات ناقصة' });
    }

    // 1. حفظ الطلب في الملف
    saveOrder({ name, phone, order });

    // 2. إرسال رسالة واتساب لصاحب البراند
    const message = `طلب جديد
الاسم: ${name}
الرقم: ${phone}
الطلب: ${order}`;

    await client.sendMessage(OWNER_NUMBER, message);

    res.json({ success: true, message: 'الطلب وصل بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'حصل خطأ في السيرفر' });
  }
});

// endpoint اختياري لمشاهدة كل الطلبات المحفوظة (للمراجعة فقط)
app.get('/api/orders', (req, res) => {
  if (!fs.existsSync(ORDERS_FILE)) {
    return res.json([]);
  }
  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  res.json(orders);
});

app.listen(3000, () => {
  console.log('السيرفر شغال على http://localhost:3000');
});