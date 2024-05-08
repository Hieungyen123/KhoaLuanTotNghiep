const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MyConstants = require('../untils/MyConstants.js');
const cloudinary = require('cloudinary').v2;
const querystring = require('querystring');

// daos
const BlogDao = require('../Models/BlogDao.js')
const CategoryDAO = require('../Models/CategoryDAO.js');
const ProductDAO = require('../Models/ProductDao.js');
const CustomerDAO = require('../Models/customer1DAO.js')
const OrderDAO = require('../Models/OrderDAO.js');
const CommentDao = require('../Models/commentsDao.js');
const subcategoriesDao = require('../Models/subcatoriesDao.js')
const BrandDAO = require('../Models/BrandDao.js')
const RatingDAO = require('../Models/RatingDao.js')
const { uploadCloud, uploadCloudBlog, uploadCloudSubcate, uploadCloudBrand, uploadCloudProduct, uploadCloudUser } = require('../untils/UploadFileImgCloud.js')

//utils
const CryptoUtil = require('../untils/CryptoUtil.js');
const EmailUtil = require('../untils/EmailUtil.js');
const JwtUtil = require('../untils/JwtUnitil.js');


const PayOS = require("@payos/node");
const payos = new PayOS("3b7309fb-505c-435a-bfdd-11778dec2258", "39f5d233-c9bb-4f9d-87d7-b843909acc55", "22cb96fec9fb1a9a2e0b1e9ee50672d037c3d00fd08604351c80c777f8c6fa15");

function generateNonRepeatingNumbers(min, max) {
  const numbers = [];

  // Tạo mảng chứa các số từ min đến max
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  // Xáo trộn mảng sử dụng thuật toán Fisher-Yates
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Trả về 4 số ngẫu nhiên từ đầu mảng
  return numbers.slice(min, max).join(', ');
}



//PayOs
router.post("/paymentpayos", JwtUtil.checkToken, async (req, res) => {
  // console.log('payos', req.body)
  console.log("payos")
  const id = generateNonRepeatingNumbers(1, 6)
  const requestData = {
    orderCode: parseInt(id),
    amount: 3000,
    description: "Thanh toan don hang",
    items: [
      {
        name: "Mì tôm hảo hảo ly",
        quantity: 1,
        price: 1000,
      }
    ],
    cancelUrl: "https://khoaluantotnghiep.onrender.com//home",
    returnUrl: "https://khoaluantotnghiep.onrender.com//done-checkout"
  };
  const paymentLinkData = await payos.createPaymentLink(requestData);
  res.json({ url: paymentLinkData })
});



//MoMo
router.post("/paymentmomo", JwtUtil.checkToken, async (req, res) => {
  console.log('momo', req.body)
  var partnerCode = "MOMO";
  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = "pay with MoMo";
  var redirectUrl = "https://khoaluantotnghiep.onrender.com//done-checkout";
  var ipnUrl = "https://callback.url/notify";
  // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  var amount = req.body.total * 1000;
  var requestType = "captureWallet"
  var extraData = "" //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType
  //puts raw signature
  console.log("--------------------RAW SIGNATURE----------------")
  console.log(rawSignature)
  //signature
  const crypto = require('crypto');
  var signature = crypto.createHmac('sha256', secretkey)
    .update(rawSignature)
    .digest('hex');
  console.log("--------------------SIGNATURE----------------")
  console.log(signature)

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'en'
  });
  //Create the HTTPS objects
  const https = require('https');
  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody)
    }
  }
  //Send the request and get the response
  req = https.request(options, resMoMo => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    resMoMo.setEncoding('utf8');
    resMoMo.on('data', (body) => {
      console.log('Body: ');
      console.log(body);
      console.log('payUrl: ');
      console.log(JSON.parse(body).payUrl);
      // var payUrlres = JSON.parse(body).payUrl;
      // console.log(extraData, partnerCode)
      res.json({ payUrl: JSON.parse(body).payUrl });
      // res.redirect(JSON.parse(body).payUrl)

    });
    resMoMo.on('end', () => {
      console.log('No more data in response.');

    });
  })

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  console.log("Sending....")
  req.write(requestBody);
  req.end();
});



// category
router.get('/categories', async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  console.log('chạy')
  res.json(categories);

});


// subcategory
router.get('/subcategories/', async function (req, res) {
  const subcategories = await subcategoriesDao.selectAll();
  res.json(subcategories);
});
router.get('/subcategories/:cid', async function (req, res) {
  const subcategories = await subcategoriesDao.selectByIDCategory();
  res.json(subcategories);
});
//Brand
router.get('/brand', async function (req, res) {
  //lấy 10 loại 
  const Brand = await BrandDAO.selectTen();
  res.json(Brand)
})
router.get('/brandAll', async function (req, res) {
  const Brand = await BrandDAO.selectAll();
  res.json(Brand)
})


// product
router.get('/products/new', async function (req, res) {
  const products = await ProductDAO.selectTopNew(11);
  res.json(products);
});
router.get('/products', async function (req, res) {
  const products = await ProductDAO.selectAll();

  const filteredProducts = products.map(product => {
    const { _id, name, price, quantity, image, Brand, SubCategory, promotion, description } = product;
    return { _id, name, price, quantity, image, Brand, SubCategory, promotion, description };
  });
  res.json(filteredProducts);
});
router.get('/products/hot/:cid', async function (req, res) {
  const _cid = req.params.cid;
  console.log(_cid)

  const products = await ProductDAO.selectTopHot(4, _cid);
  const filteredProducts = products.map(product => {
    const { _id, name, price, quantity, image, Brand, SubCategory, promotion, description } = product;
    return { _id, name, price, quantity, image, Brand, SubCategory, promotion, description };
  });
  // console.log(products)
  res.json(filteredProducts);
});
router.get('/products/hot10', async function (req, res) {
  console.log('chayk hot product')
  const products = await ProductDAO.selectTopHot10(10);
  const filteredProducts = products.map(product => {
    const { _id, name, price, quantity, image, Brand, SubCategory, promotion, description } = product;
    return { _id, name, price, quantity, image, Brand, SubCategory, promotion, description };
  });
  console.log(filteredProducts)
  res.json(filteredProducts);
});
router.get('/products/category/:cid', async function (req, res) {
  const _cid = req.params.cid;
  const subcategories = await subcategoriesDao.selectByIDCategory(_cid);
  var products = await ProductDAO.selectByCategoryID(_cid);
  var category = await CategoryDAO.selectByID(_cid)
  const sizePage = 12;
  const noPages = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page)
    curPage = parseInt(req.query.page); // /products?page=xxx
  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);
  // return
  const filteredProducts = products.map(product => {
    const { _id, name, price, quantity, image, Brand, SubCategory, promotion, description } = product;
    return { _id, name, price, quantity, image, Brand, SubCategory, promotion, description };
  });
  const result = { products: filteredProducts, noPages: noPages, curPage: curPage, subcategories: subcategories, category: category };
  res.json(result);
});

router.get('/allproducts', async function (req, res) {
  // get data
  var products = await ProductDAO.selectAll();
  // const categories = await CategoryDAO.selectAll();
  // pagination
  const sizePage = 4;
  const noPages = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page)
    curPage = parseInt(req.query.page); // /products?page=xxx
  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);
  const filteredProducts = products.map(product => {
    const { _id, name, price, quantity, image, Brand, SubCategory, promotion, description } = product;
    return { _id, name, price, quantity, image, Brand, SubCategory, promotion, description };
  });
  // return
  const result = { products: filteredProducts, noPages: noPages, curPage: curPage };
  res.json(result);
});
router.get('/products/subcategory/:cid', async function (req, res) {
  const _cid = req.params.cid;
  // console.log(_cid)
  const subcategories = await subcategoriesDao.selectByID(_cid);
  var products = await ProductDAO.selectBySubCategoryID(_cid);
  // console.log(products)
  // var subcategories = await CategoryDAO.selectByID(_cid)
  const sizePage = 4;
  const noPages = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page)
    curPage = parseInt(req.query.page); // /products?page=xxx
  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);
  // return
  const filteredProducts = products.map(product => {
    const { _id, name, price, quantity, image, Brand, SubCategory, promotion, description } = product;
    return { _id, name, price, quantity, image, Brand, SubCategory, promotion, description };
  });
  const result = { products: filteredProducts, noPages: noPages, curPage: curPage, subcategory: subcategories };

  res.json(result);
});

router.get('/allproducts', async function (req, res) {
  // get data
  var products = await ProductDAO.selectAll();
  // const categories = await CategoryDAO.selectAll();
  // pagination
  const sizePage = 4;
  const noPages = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page)
    curPage = parseInt(req.query.page); // /products?page=xxx
  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);
  const filteredProducts = products.map(product => {
    const { _id, name, price, quantity, image, Brand, SubCategory, promotion, description } = product;
    return { _id, name, price, quantity, image, Brand, SubCategory, promotion, description };
  });
  // return
  const result = { products: filteredProducts, noPages: noPages, curPage: curPage };
  res.json(result);
});

router.get('/products/searchTop3/:keyword', async function (req, res) {
  const keyword = req.params.keyword;
  console.log(keyword)
  var products = await ProductDAO.selectByKeywordInputSearch(keyword);
  res.json(products);
});
router.get('/products/search/:keyword', async function (req, res) {
  const keyword = req.params.keyword;
  var products = await ProductDAO.selectByKeyword(keyword);
  const categories = await CategoryDAO.selectAll();
  const sizePage = 8;
  const noPages = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page)
    curPage = parseInt(req.query.page);
  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);
  const result = { products: products, noPages: noPages, curPage: curPage, categories: categories };
  res.json(result);
});

router.get('/product/:id', async function (req, res) {
  const _id = req.params.id;
  const product = await ProductDAO.selectByID(_id);
  const comment = await CommentDao.selectByID(_id);
  console.log('lỗi')
  res.json(product);
});


//Rating 
router.get('/rating/:id', async function (req, res) {
  const idProduct = req.params.id;
  // console.log('idProduct', idProduct)
  const result = await RatingDAO.selectByID(idProduct);
  // console.log(result)
  res.json({ result, success: true });
});
router.post('/rating', async function (req, res) {
  console.log(req.body)
  const customerID = req.body.CustomerID;
  const productID = req.body.productID;
  const valueRating = req.body.valueRating;

  const result = await RatingDAO.insert(req.body);
  res.json({ result, success: true });
});
//  comments
router.get('/comment', async function (req, res) {
  const comment = await CommentDao.selectAll();
  res.json(comment);
});

router.get('/comment/:id', async function (req, res) {
  const idProduct = req.params.id;
  // console.log(req.body)
  const comment = await CommentDao.selectByID(idProduct);
  res.json(comment);
});

router.post('/comment/:id', async function (req, res) {
  const idProduct = req.params.id;
  console.log(req.body)
  const value = req.body.value;
  const customer = req.body.customer;
  const now = new Date().getTime();
  const comment = { value: value, customer: customer, productID: idProduct, cdate: now };
  const result = await CommentDao.insert(comment);
  res.json(result);
});


//sSignUp account
router.post('/signup', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  // const name = req.body.name;
  // const phone = req.body.phone;
  const email = req.body.email;
  // const image = req.body.image;

  const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);
  if (dbCust) {
    res.json({ success: false, message: 'Exists username or email' });
  } else {
    const now = new Date().getTime(); // milliseconds
    const token = CryptoUtil.md5(now.toString());
    // const newCust = { username: username, password: password, name: name, phone: phone, email: email, image: image, active: 0, token: token };
    const newCust = { image: {}, username: username, password: password, email: email, active: 0, token: token, role: 0, Gender: 'chưa có thông tin', Address: [] };
    const result = await CustomerDAO.insert(newCust);
    if (result) {
      res.json({ success: true, message: 'Please check email' });
      const send = await EmailUtil.send(email, result._id, token);
    } else {
      res.json({ success: false, message: 'Insert failure' });
    }
  };
});
router.post('/signup-google', async function (req, res) {
  console.log(req.body)
  const username = req.body.username;
  const email = req.body.email;
  const image = req.body.image;
  const accessToken = req.body.token;
  const dbCust = await CustomerDAO.selectByEmail(email);
  if (dbCust) {
    if (!accessToken) {
      return res.status(401).json({ success: false, message: 'Access Token is required' });
    }
    const token = JwtUtil.genToken(dbCust._id.toString());
    const refreshtoken = JwtUtil.genRefreshToken(dbCust._id.toString());
    res.json({ success: true, data: dbCust, token: token, refreshtoken: refreshtoken });
  } else {
    const newCust = { image: { imageUrl: image }, username: username, password: "", email: email, active: 1, role: 0, Gender: 'chưa có thông tin', Address: [] };
    const result = await CustomerDAO.insert(newCust);
    const user = await CustomerDAO.selectByEmail(email);
    const token = JwtUtil.genToken(user._id.toString());
    const refreshtoken = JwtUtil.genRefreshToken(user._id.toString());
    return res.json({ success: true, data: user, token: token, refreshtoken: refreshtoken });
  };
});
//active account
router.post('/active', async function (req, res) {
  console.log(req.body)
  const _id = req.body.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 1);
  // console.log(result)
  if (result) {
    res.json({ success: true, message: 'Tài khoản đã được kích hoạt' });
  } else {
    res.json({ success: false, message: 'không đúng ID hoặc token' });
  }

});

//login
router.post('/login', async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(username,password)
  if (email && password) {
    let customer = await CustomerDAO.selectByEmail(email);

    if (customer) {
      if (customer.active === 1) {
        console.log(customer._id.toString())
        const token = JwtUtil.genToken(customer._id.toString());
        const refreshtoken = JwtUtil.genRefreshToken(customer._id.toString());
        const result = await CustomerDAO.UpdateRefreshToken(customer._id.toString(), customer.token, refreshtoken);
        res.json({ success: true, message: 'Authentication successful', result, token: token, refreshtoken: refreshtoken, customer: customer });
      } else {
        res.json({ success: false, message: 'Account is deactive' });
      }
    } else {
      res.json({ success: false, message: 'Incorrect email or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input email and password' });
  }
});


router.get('/token', JwtUtil.authenticateToken, async (req, res) => {
  const refreshToken = req.body.refreshToken;
  // const token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log("chạy get token")
  // console.log(req.user.id)
  const customer = await CustomerDAO.selectByID(req.user.id)
  return res.json(customer);
});
router.get('/user:id', JwtUtil.checkToken, async (req, res) => {
  console.log("chạy get token")
  const _id = req.params.id;
  const customer = await CustomerDAO.selectByID(_id)
  return res.json(customer);
});


router.post('/refreshtoken', (req, res) => {
  const RefreshToken = req.body.refreshToken;
  console.log('check', RefreshToken)

  if (RefreshToken == null) {
    return res.sendStatus(401); // Unauthorized
  }
  jwt.verify(RefreshToken, MyConstants.JWT_SECRET, async (err, user) => {
    if (err) {
      console.log('lỗi')
      return res.json(false); // Forbidden
    }
    const accessToken = JwtUtil.genToken(user.id);
    const newRefreshToken = JwtUtil.genRefreshToken(user.id);
    const customer = await CustomerDAO.selectByID(user.id)

    // console.log(customer);
    res.json({ accessToken: accessToken, newRefreshToken: newRefreshToken, customer: customer });
  });
});


router.put('/customers/myprofile/profile/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const image = req.body.image;
  const customer = { _id: _id, username: username, password: password, name: name, phone: phone, email: email, image: image };
  const result = await CustomerDAO.update(customer);
  res.json(result);
});

router.post('/checkout', async function (req, res) {
  const now = new Date().getTime(); // milliseconds
  const total = req.body.total;
  const UserID = req.body.UserID;
  const orderType = req.body.orderType;
  const note = req.body.note;
  const orderId = req.body.orderId;
  const items = req.body.items;
  const address = req.body.Address
  const order = { orderId: orderId, note: note, orderType: orderType, cdate: now, total: total, status: 'PENDING', UserID: UserID, items: items, Address: address };
  const result = await OrderDAO.insert(order);
  res.json({ success: true, message: 'Đơn hàng đã được lưu thành công' });
});
router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  console.log(_cid)
  var orders = await OrderDAO.selectByCustID(_cid);
  res.json(orders);
});
router.post('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  console.log('chạy cancel')
  const cid = req.params.cid;
  var orders = await OrderDAO.update(cid, 'Cancel');

  res.json(orders);
});


router.put('/customers/:id', JwtUtil.checkToken, uploadCloudUser.single('file'), async function (req, res) {
  const _id = req.params.id;
  const body = req.body
  console.log(body, _id)
  const oldImage = req.body?.oldImage;
  const username = req.body.username;
  const gender = req.body.gender

  console.log(gender)
  const image = req.body.file
  // console.log(req.body)
  console.log(req.file)
  if (req.file) {
    const imagenew = req.file;
    if (imagenew) {
      if (oldImage !== "") {
        cloudinary.uploader.destroy(oldImage)
      }
      const newCust = { _id: _id, image: imagenew, username: username, Gender: gender };
      const result = await CustomerDAO.updateClientCustomer(newCust);
      res.json({ success: true, message: 'Update user thành công' });
    }
  } else {
    const newCust = { _id: _id, username: username, Gender: gender };
    const result = await CustomerDAO.updateClientCustomer(newCust);
    res.json({ success: true, message: 'Update user thành công ' });
  }
});
router.put('/customers/changepass/:id', JwtUtil.checkToken, uploadCloudUser.single('file'), async function (req, res) {
  const _id = req.params.id;
  const body = req.body
  console.log(body, _id)
  const NewPass = req.body?.newpass;

  const newCust = { _id: _id, password: NewPass };
  const result = await CustomerDAO.updateClientCustomerPassWord(newCust);
  res.json({ success: true, message: result });
});
router.post('/customers/address/:id', JwtUtil.checkToken, uploadCloudUser.single('file'), async function (req, res) {
  const body = req.body
  const _id = req.params.id;
  console.log(body)
  const city = JSON.parse(body?.city)
  const districts = JSON.parse(body?.districts)
  const wards = JSON.parse(body?.wards)
  const street = JSON.parse(body?.street)
  const name = body?.name;
  const phone = body?.phone;

  const newCust = { _id: _id, name: name, phone: phone, street: street, wards: wards, districts: districts, city: city };
  const result = await CustomerDAO.PostAddress(newCust, _id);
  res.json({ success: true, message: result });
});
router.put('/customers/address/:id', JwtUtil.checkToken, uploadCloudUser.single('file'), async function (req, res) {
  const body = req.body
  const _idcustomer = req.params.id;
  console.log(body)
  const city = JSON.parse(body?.city)
  const districts = JSON.parse(body?.districts)
  const wards = JSON.parse(body?.wards)
  const street = JSON.parse(body?.street)
  const name = body?.name;
  const idAddress = body?._id;
  const phone = body?.phone;

  const newCust = { name: name, phone: phone, street: street, wards: wards, districts: districts, city: city };
  const result = await CustomerDAO.PutUpdateAddress(newCust, _idcustomer, idAddress);
  res.json({ success: true, message: result });
});



router.post('/blog', JwtUtil.checkToken, uploadCloudBlog.single('file'), async function (req, res) {
  const body = req.body

  // console.log(body)
  const user = JSON.parse(body.customer)
  const value = body.value
  const valueTitle = body.valueTitle
  const valueShortIntro = body.valueShortIntro
  const now = new Date().getTime(); // milliseconds
  try {
    if (req.file) {
      const image = req.file
      const newBlog = { image: image, valueContent: value, valueTitle: valueTitle, valueShortIntro: valueShortIntro, crdate: now, customer: user }
      const result = await BlogDao.insert(newBlog);
      res.json({ success: true, message: result });
    }

  } catch (err) {
    if (req.file) {
      cloudinary.uploader.destroy(req.file.filename)
      res.json({ success: false, message: 'lỗi rồi' });
    }
  }

});
router.get('/blog', async function (req, res) {
  console.log('chạy')
  const result = await BlogDao.selectAll();
  res.json(result);

})
router.get('/blog/:cid', JwtUtil.checkToken, async function (req, res) {
  const _idcustomer = req.params.cid;
  console.log(_idcustomer)
  const result = await BlogDao.selectByID(_idcustomer);
  res.json(result);

})
router.get('/blogdetail/:id', async function (req, res) {
  const idblog = req.params.id;
  const result = await BlogDao.selectOneByID(idblog);
  res.json(result);

})


module.exports = router;
