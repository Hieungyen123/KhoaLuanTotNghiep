const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors');

// import AccountModel
// const CustomerSchema = require('./models/module.js')
// const path = require('path')
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

// app.use('/public', express.static(path.join( '/public')))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})
var path = require('path');
// console.log('__dirname',__dirname)
// '/admin' serve the files at client-admin/build/* as static files
// app.use('/admin', express.static(path.resolve(__dirname, '../admin/public')));
// app.get('admin/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../admin/public', 'index.html'))
// });
// // '/' serve the files at client-customer/build/* as static files
// app.use('/', express.static(path.resolve(__dirname, '../customer/public')));
// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../customer/public', 'index.html'));
// });
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/customer', require('./api/customer.js'));
// app.use('/api/auth', require('./api/refeshToken.js'));





// var path = require('path');
// // console.log('__dirname',__dirname)
// // '/admin' serve the files at client-admin/build/* as static files
// app.use('/admin', express.static(path.resolve(__dirname, '../admin/public')));
// app.get('admin/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../admin/public', 'index.html'))
// });
// // '/' serve the files at client-customer/build/* as static files
// app.use('/', express.static(path.resolve(__dirname, '../customer/public')));
// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../customer/public', 'index.html'));
// });

app.get('/home', (req, res) => {
    // Phân tích URL callback từ MoMo
    const queryObject = url.parse(req.url, true).query;

    // Trích xuất các thông tin từ query parameters
    const partnerCode = queryObject.partnerCode;
    const orderId = queryObject.orderId;
    const requestId = queryObject.requestId;
    const amount = queryObject.amount;
    // ... trích xuất các thông tin khác

    // In các thông tin ra console
    console.log('partnerCode:', partnerCode);
    console.log('orderId:', orderId);
    console.log('requestId:', requestId);
    console.log('amount:', amount);
    // ... in các thông tin khác

    // Phản hồi thành công cho MoMo
    res.status(200).end();
});
app.post('/payment/webhook', (req, res) => {
    // Lấy dữ liệu từ thông báo MoMo
    const responseData = req.body;
    console.log('thanh toán không thành')
    // Kiểm tra kết quả thanh toán
    if (responseData.errorCode === 0 && responseData.status === 0) {
        // Thanh toán thành công, lưu dữ liệu vào cơ sở dữ liệu
        const paymentData = {
            // Trích xuất thông tin thanh toán từ responseData và lưu vào paymentData
        };

        // Lưu paymentData vào cơ sở dữ liệu
        // Sử dụng thư viện hoặc truy vấn cơ sở dữ liệu trong ngôn ngữ bạn sử dụng

        // Trả về phản hồi thành công cho MoMo
        console.log('thanh toán thành công')
    } else {
        // Thanh toán không thành công, xử lý theo logic của bạn
        console.log('thanh toán không thành')
        res.status(200).send('OK');
    }
});
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
