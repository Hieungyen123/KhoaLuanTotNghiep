const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const MyConstants = require('../untils/MyConstants.js');

// daos
const CategoryDAO = require('../Models/CategoryDAO.js');
const ProductDAO = require('../Models/ProductDao.js');
const CustomerDAO = require('../Models/customer1DAO.js')
const OrderDAO = require('../Models/OrderDAO.js');
const CommentDao = require('../Models/commentsDao.js');
const subcategoriesDao = require('../Models/subcatoriesDao.js')
const BrandDAO = require('../Models/BrandDao.js')

//utils
const CryptoUtil = require('../untils/CryptoUtil.js');
const EmailUtil = require('../untils/EmailUtil.js');
const JwtUtil = require('../untils/JwtUnitil.js');

// category
router.get('/categories', async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  res.json(categories);
});


// subcategory
router.get('/subcategories', async function (req, res) {
  const subcategories = await subcategoriesDao.selectAll();
  res.json(subcategories);
});
//Brand
router.get('/brand', async function (req, res) {
  //lấy 10 loại 
  const Brand = await BrandDAO.selectTen();
  res.json(Brand)
})


// product
router.get('/products/new', async function (req, res) {
  const products = await ProductDAO.selectTopNew(11);
  res.json(products);
});
router.get('/products/hot/:cid', async function (req, res) {
  const _cid = req.params.cid;
  const products = await ProductDAO.selectTopHot(4, _cid);
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
  const result = { products: products, noPages: noPages, curPage: curPage, categories: categories };
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
  const result = { products: products, noPages: noPages, curPage: curPage, categories: categories };
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
  const result = { products: products, noPages: noPages, curPage: curPage, categories: categories };
  res.json(result);
});

router.get('/products/:id', async function (req, res) {
  const _id = req.params.id;
  const product = await ProductDAO.selectByID(_id);
  const comment = await CommentDao.selectByID(_id);
  res.json(product, comment);
});



//  comments
router.get('/comment', async function (req, res) {
  const comment = await CommentDao.selectAll();
  res.json(comment);
});

router.get('/comment/:id', async function (req, res) {
  const comment = await CommentDao.selectByID(_id);
  res.json(product, comment);
});

router.post('/comment/:id', async function (req, res) {
  const _id = req.params.id;
  console.log(req.body)
  const content = req.body.comment;
  const comment = { content: content, product_ID: _id };
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
    const newCust = { username: username, password: password, email: email, active: 0, token: token };
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
  console.log(req.body)
  const _id = req.body.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 1);
  // console.log(result)
  if (result) {
    res.json(result);
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
router.get('/user', JwtUtil.authenticateToken, async (req, res) => {
  const refreshToken = req.body.refreshToken;
  // console.log(req)
  // const token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log("chạy get token")
  // const customer = await CustomerDAO.selectByID(user.id)
  res.sendStatus(200);


});


router.post('/refreshtoken', (req, res) => {
  const RefreshToken = req.body.refreshToken;
  // console.log('check', RefreshToken)

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

    console.log(customer);
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