const express = require('express');
const router = express.Router();
// daos
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDao.js');
const CustomerDAO = require('../models/customer1DAO')
const OrderDAO = require('../models/OrderDAO');
//utils
const CryptoUtil = require('../untils/CryptoUtil');
const EmailUtil = require('../untils/EmailUtil');

const JwtUtil = require('../untils/JwtUnitil.js');

// category
router.get('/categories', async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});
// product
router.get('/products/new', async function (req, res) {
  const products = await ProductDAO.selectTopNew(11);
  res.json(products);
});
router.get('/products/hot', async function (req, res) {
  const products = await ProductDAO.selectTopHot(3);
  console.log(products)
  res.json(products);
});


router.get('/products/category/:cid', async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  const _cid = req.params.cid;
  var products = await ProductDAO.selectByCatID(_cid);
  
  const sizePage = 8;
  const noPages = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page)
    curPage = parseInt(req.query.page); // /products?page=xxx
  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);
  // return
  const result = { products: products, noPages: noPages, curPage: curPage ,categories: categories};
  res.json(result);
});

router.get('/products/category', async function (req, res) {
  // get data
  var products = await ProductDAO.selectAll();
  const categories = await CategoryDAO.selectAll();
  // pagination
  const sizePage = 8;
  const noPages = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page)
    curPage = parseInt(req.query.page); // /products?page=xxx
  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);
  // return
  const result = { products: products, noPages: noPages, curPage: curPage , categories: categories};
  res.json(result);
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
  const result = { products: products, noPages: noPages, curPage: curPage , categories: categories};  
  res.json(result);
});

router.get('/products/:id', async function (req, res) {
  const _id = req.params.id;
  const product = await ProductDAO.selectByID(_id);
  res.json(product);
});

//sSignUp account
router.post('/signup', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const image = req.body.image;

  
  const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);
  if (dbCust) {
    res.json({ success: false, message: 'Exists username or email' });
  } else {
    const now = new Date().getTime(); // milliseconds
    const token = CryptoUtil.md5(now.toString());
    const newCust = { username: username, password: password, name: name, phone: phone, email: email, image: image, active: 0, token: token};
    const result = await CustomerDAO.insert(newCust);
    if (result) {
      const send = await EmailUtil.send(email, result._id, token);
      if (send) {
        res.json({ success: true, message: 'Please check email' });
      } else {
        res.json({ success: false, message: 'Email failure' });
      }
    } else {
      res.json({ success: false, message: 'Insert failure' });
    }
  };
});

//active account
router.post('/active', async function (req, res) {
  const _id = req.body.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 1);
  // console.log(result)
  if(result) {
    res.json(result);
  } else {
    res.json({ success: false, message: 'không đúng ID hoặc token' });
  }
  
});

//login
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  // console.log(username,password)
  if (username && password) {
    const customer = await CustomerDAO.selectByUsernameAndPassword(username, password);
    if (customer) {
      if (customer.active === 1) {
        const token = JwtUtil.genToken();
        res.json({ success: true, message: 'Authentication successful', token: token, customer: customer });
      } else {
        res.json({ success: false, message: 'Account is deactive' });
      }
    } else {
      res.json({ success: false, message: 'Incorrect username or password' });
    }
  } else {
    res.json({ success: false, message: 'Please input username and password' });
  }
});
router.get('/token', JwtUtil.checkToken, function (req, res) {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  res.json({ success: true, message: 'Token is valid', token: token });
});


router.put('/customers/myprofile/profile/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const image = req.body.image;
  const customer = { _id: _id, username: username, password: password, name: name, phone: phone, email: email , image: image};
  const result = await CustomerDAO.update(customer);
  res.json(result);
});

router.post('/checkout', JwtUtil.checkToken, async function (req, res) {
  const now = new Date().getTime(); // milliseconds
  const total = req.body.total;
  const items = req.body.items;
  const customer = req.body.customer;
  const address = req.body.address
  const order = { cdate: now, total: total, status: 'PENDING', customer: customer, items: items, Address: address };
  const result = await OrderDAO.insert(order);
  res.json(result);
});
router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  var orders = await OrderDAO.selectByCustID(_cid);

  const sizePage = 4; 
  const noPages = Math.ceil(orders.length / sizePage);
  var curPage = 1;
  if (req.query.page)
    curPage = parseInt(req.query.page);
  const offset = (curPage - 1) * sizePage;
  orders = orders.slice(offset, offset + sizePage);
  const result = { orders: orders, noPages: noPages, curPage: curPage };  
  res.json(result);
});

module.exports = router;