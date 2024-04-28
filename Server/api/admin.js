const cloudinary = require('cloudinary').v2;
const { uploadCloud, uploadCloudSubcate, uploadCloudBrand, uploadCloudProduct, uploadCloudUser } = require('../untils/UploadFileImgCloud.js')
const express = require('express');
const router = express.Router();
// utils
const JwtUtil = require('../untils/JwtUnitil.js');
// daos
const AdminDAO = require('../Models/adminDao.js');
const CategoryDAO = require('../Models/CategoryDAO.js');
const ProductDAO = require('../Models/ProductDao.js');
const OrderDao = require('../Models/OrderDAO.js')
const CustomerDAO = require('../Models/customer1DAO.js');
const CommentDao = require('../Models/commentsDao.js');
const subcategoriesDao = require('../Models/subcatoriesDao.js')
const EmailUtil = require('../untils/EmailUtil.js');
const BrandDAO = require('../Models/BrandDao.js')
const SubCategoryDAO = require('../Models/subcatoriesDao.js');
const CryptoUtil = require('../untils/CryptoUtil.js');



// login
router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);
    if (admin) {
      const token = JwtUtil.genToken();
      res.json({ success: true, message: 'Authentication successful', token: token });
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
// Brand
router.get('/brand', JwtUtil.checkToken, async function (req, res) {
  const Brand = await BrandDAO.selectAll();
  res.json(Brand)
})
router.post('/brand', JwtUtil.checkToken, uploadCloudBrand.single('file'), async function (req, res) {
  const name = req.body?.name;
  const image = req.file;
  const BrandOrigin = req.body.BrandOrigin;
  const description = req.body.description;
  // console.log(image, name, BrandOrigin, description,)
  const brand = {
    name: name, image: image, description: description, BrandOrigin: BrandOrigin
  };
  try {
    const result = await BrandDAO.insert(brand);
    console.log('thêm brand')
    res.json({ success: true, message: 'Thêm Brand mới thành công' });
  } catch (err) {
    if (image) {
      cloudinary.uploader.destroy(image.filename)
      res.json(err);
    }
  }
});
router.put('/brand/:id', JwtUtil.checkToken, uploadCloudSubcate.single('file'), async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const oldImage = req.body.oldImage;
  const BrandOrigin = req.body.BrandOrigin;
  const description = req.body.description;
  console.log(_id, name, BrandOrigin, description)

  if (req.file) {
    const imagenew = req.file;
    if (imagenew) {
      cloudinary.uploader.destroy(oldImage)
      const brand = {
        _id: _id, name: name, image: imagenew, description: description, BrandOrigin: BrandOrigin
      };
      const result = await BrandDAO.update(brand);
      res.json({ success: true, message: 'Sửa Brand thành công' });
    }
  } else {
    const brand = {
      _id: _id, name: name, description: description, BrandOrigin: BrandOrigin
    };
    const result = await BrandDAO.update(brand);
    res.json({ success: true, message: 'Sửa Brand thành công' });
  }



});

router.delete('/brand/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await BrandDAO.delete(_id);
  if (req.body?.image) {
    const image = req.body?.image.filename;
    cloudinary.uploader.destroy(image, function (error, result) {
      if (error) {
        res.json({ success: false, message: 'Ảnh không xóa được' });
      } else {
        res.json({ success: true, message: 'Xóa thành công' });
      }
    });
  }

});
//categories
router.get('/categories', JwtUtil.checkToken, async function (req, res) {
  const categories = await CategoryDAO.selectAll();
  // console.log(categories)
  res.json(categories);
});
router.post('/categories', JwtUtil.checkToken, async function (req, res) {
  const name = req.body.name;
  const category = { name: name };
  const result = await CategoryDAO.insert(category);
  res.json({ success: true, message: 'Thêm mới loại sản phẩm thành công' });
});
router.put('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const name = req.body.name;
  const category = { _id: _id, name: name };
  const result = await CategoryDAO.update(category);
  res.json({ success: true, message: 'Chỉnh sửa thành công' });
});
router.delete('/categories/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const result = await CategoryDAO.delete(_id);
  res.json({ success: true, message: 'Xóa thành công' });
});
// subcate
router.get('/subcategories', JwtUtil.checkToken, async function (req, res) {
  const subcategories = await SubCategoryDAO.selectAll();
  res.json(subcategories);
});
router.post('/subcategories', JwtUtil.checkToken, uploadCloudSubcate.single('file'), async function (req, res) {
  console.log(req.body)
  const name = req.body?.name;
  const Namecategory = req.body?.Namecategory;
  const idcategory = req.body?.idcategory;
  const image = req.file;
  console.log(image, Namecategory, idcategory)
  const subcategory = {
    name: name, image: image, Namecategory: Namecategory, idcategory: idcategory
  };
  try {
    const result = await SubCategoryDAO.insert(subcategory);
    // console.log(result)
    res.json({ success: true, message: 'Thêm loại sản phẩm mới thành công' });
  } catch (err) {
    if (image) {
      cloudinary.uploader.destroy(image.filename)
      res.json({ success: false, message: 'Thêm loại sản phẩm mới thất bại' });
    }
  }
});
router.put('/subcategories/:id', JwtUtil.checkToken, uploadCloudSubcate.single('file'), async function (req, res) {
  const _id = req.params.id;
  const body = req.body
  console.log(req.body)

  const name = req.body.name;
  const Namecategory = req.body?.Namecategory;
  const idcategory = req.body?.idcategory;
  const oldImage = req.body.oldImage;
  const image = req.file
  // const imagenew = req.body.file;
  console.log('hình cũ', oldImage)
  console.log('hình MỚI', image)
  // console.log('NameCate', NameCate)
  const now = new Date().getTime();
  // console.log(JSON.parse(SubCategory))
  if (req.file) {
    const imagenew = req.file;
    if (imagenew) {
      cloudinary.uploader.destroy(oldImage)
      const Subcategory = { _id: _id, name: name, image: imagenew, Namecategory: Namecategory };
      const result = await SubCategoryDAO.update(Subcategory);
      res.json({ success: true, message: 'Sửa loại sản phẩm thành công' });
    }
  } else {
    const Subcategory = { _id: _id, name: name, Namecategory: Namecategory };
    const result = await SubCategoryDAO.update(Subcategory);
    res.json({ success: true, message: 'Sửa loại sản phẩm thành công' });
  }



});
router.delete('/subcategory/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const image = req.body.image.filename;
  console.log(_id, image)
  const result = await SubCategoryDAO.delete(_id);
  cloudinary.uploader.destroy(image, function (error, result) {
    if (error) {
      res.json({ success: false, message: 'Xóa loại sản phẩm thất bại' });
    } else {
      res.json({ success: true, message: 'Xóa loại sản phẩm thành công có xóa cả ảnh' });
    }
  });
  res.json({ success: true, message: 'Xóa loại sản phẩm thành công' });
});
// product
router.get('/products', JwtUtil.checkToken, async function (req, res) {
  // get data
  var products = await ProductDAO.selectAll();
  // pagination
  const sizePage = 4;
  const noPages = Math.ceil(products.length / sizePage);
  var curPage = 1;
  if (req.query.page) curPage = parseInt(req.query.page); // /products?page=xxx
  const offset = (curPage - 1) * sizePage;
  const productsSlice = products.slice(offset, offset + sizePage);
  // return
  const result = { products: products, noPages: noPages, curPage: curPage };
  res.json(result);
});
router.put('/products/promotion', JwtUtil.checkToken, async function (req, res) {
  console.log(req.body)
  const startDate = req.body.startDate
  const endDate = req.body.endDate
  const discountPercent = req.body.discountPercent
  const productID = req.body.product
  const newpromotion = {
    startDate: startDate, endDate: endDate, discountPercent: discountPercent
  }
  const result = await ProductDAO.updatePromotion(newpromotion, productID);
  // console.log(result)
  res.json({ success: true, message: 'thành công Update promotion' });

});
router.post('/products', JwtUtil.checkToken, uploadCloudProduct.single('file'), async function (req, res) {
  // console.log('body', req.body)

  const name = req.body?.name;
  const price = parseInt(req.body?.price);
  const quantity = parseInt(req.body?.quantity);

  const sideEffects = req.body?.sideEffects;
  const usesFor = req.body?.usesFor;
  const description = req.body?.description;
  const descriptionLong = req.body?.descriptionLong;
  const howUse = req.body?.howUse;
  console.log(name, price, quantity)
  if (req.body?.SubCategory) {
    var SubCategory = JSON.parse(req.body?.SubCategory);
  }
  if (req.body?.Brand) {
    var Brand = JSON.parse(req.body?.Brand);
  }
  const Image = req.file;

  const now = new Date().getTime(); // milliseconds
  const product = {
    name: name, price: price, image: Image,
    cdate: now, quantity: quantity, sideEffects: sideEffects, usesFor: usesFor,
    description: description, descriptionLong: descriptionLong, SubCategory: SubCategory, Brand: Brand, howUse: howUse,
    promotion: {}
  };

  try {
    const result = await ProductDAO.insert(product);
    console.log('chay them product')
    // console.log(result)
    res.json({ success: true, message: 'Thêm sản phẩm thành công', result });
  } catch (err) {
    console.log(err)
    if (Image) {
      console.log('lỗi thêm product')
      cloudinary.uploader.destroy(Image.filename)
      res.json({ success: false, message: 'Thêm sản phẩm không thành công' });
    }
  }
});

router.put('/products/:id', JwtUtil.checkToken, uploadCloudProduct.single('file'), async function (req, res) {
  const _id = req.params.id;
  const body = req.body
  // console.log(req.body)
  const price = req.body.price;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const sideEffects = req.body.sideEffects;
  const SubCategory = JSON.parse(req.body.SubCategory);
  const Brand = JSON.parse(req.body.Brand);
  const usesFor = req.body.usesFor;
  const oldImage = req.body.oldImage;
  const image = req.file
  // const imagenew = req.body.file;
  // console.log('hình cũ', oldImage)
  // console.log('hình mới', image)
  const now = new Date().getTime();
  // console.log(JSON.parse(SubCategory))
  if (req.file) {
    const imagenew = req.file;
    if (imagenew) {
      cloudinary.uploader.destroy(oldImage)
      const product = { _id: _id, name: name, price: price, image: imagenew, cdate: now, quantity: quantity, description: description, sideEffects: sideEffects, SubCategory: SubCategory, Brand: Brand, usesFor: usesFor };
      const result = await ProductDAO.update(product);
      res.json({ success: true, message: 'Sửa sản phẩm thành công' });
    }
  } else {
    const product = { _id: _id, name: name, price: price, cdate: now, quantity: quantity, description: description, sideEffects: sideEffects, SubCategory: SubCategory, Brand: Brand, usesFor: usesFor };
    const result = await ProductDAO.update(product);
    res.json({ success: true, message: 'Sửa sản phẩm thành công' });

  }



});

router.delete('/products/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  if (req.body.image) {
    const image = req.body.image.filename;
    cloudinary.uploader.destroy(image, function (error, result) {
      if (error) {
        res.json({ success: false, message: 'Xóa sản phẩm không thành công' });

      } else {
        res.json({ success: true, message: 'Xóa sản phẩm thành công' });

      }
    });
  }
  const resultProduct = await ProductDAO.delete(_id);
  res.json({ success: false, message: 'Xóa sản phẩm thành công' });

});


// ORDERs
router.get('/orders', JwtUtil.checkToken, async function (req, res) {
  // const _cid = req.params.cid;
  // var ordersid = await OrderDao.selectByCustID(_cid);
  var orders2 = await OrderDao.selectAll1();
  var orders = await OrderDao.selectAll1();

  // return
  const result = { orders: orders, ordersAll: orders2 };
  res.json({ success: true, message: 'Xóa thành công' });

});

router.put('/orders/status/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const newStatus = req.body.status;
  const result = await OrderDao.update(_id, newStatus);
  res.json(result);
});

// cusstomer
router.post('/customers/singup', JwtUtil.checkToken, uploadCloudProduct.single('file'), async function (req, res) {

  const username = req.body.username;
  const password = req.body.password;
  const active = req.body.active;
  const phone = req.body.phone;
  const email = req.body.email;
  const role = req.body.role;
  console.log('body', req.body)
  const Image = req.file;
  const dbCust = await CustomerDAO.selectByUsernameOrEmail(username, email);
  if (dbCust) {
    res.json({ success: false, message: 'Exists username or email' });
  } else {
    const now = new Date().getTime(); // milliseconds
    const token = CryptoUtil.md5(now.toString());
    try {
      if (Image) {
        const newCust = { role: role, image: Image, username: username, password: password, phone: phone, email: email, active: active, token: token };
        const result = await CustomerDAO.insert(newCust);
        res.json({ success: true, message: 'Thêm người dùng thành công', result });
      } else {
        const newCust = { role: role, image: Image, username: username, password: password, phone: phone, email: email, active: active, token: token };
        const result = await CustomerDAO.insert(newCust);
        res.json({ success: true, message: 'Thêm người dùng thành công', result });
      }
    } catch (err) {
      if (Image) {
        cloudinary.uploader.destroy(Image.filename)
        res.json({ success: false, message: 'Thêm người dùng không thành công', result });
      }
    }
  };
});

router.delete('/customers/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const resultProduct = await CustomerDAO.DeleteByID(_id);
  res.json({ success: true, message: 'Xóa người dùng thành công' });


});

router.get('/customers', JwtUtil.checkToken, async function (req, res) {
  const customers = await CustomerDAO.selectAll();
  res.json(customers);
});
router.put('/customers/:id', JwtUtil.checkToken, uploadCloudUser.single('file'), async function (req, res) {
  const _id = req.params.id;
  const body = req.body
  const email = req.body.email;
  const password = req.body.password;
  const active = req.body.active;
  const role = req.body.role;
  const oldImage = req.body.oldImage;
  const username = req.body.username;
  const phone = req.body.phone;

  console.log(req.body)
  console.log(req.file)
  const now = new Date().getTime();
  if (req.file) {
    const imagenew = req.file;
    if (imagenew) {
      if (oldImage !== "") {
        cloudinary.uploader.destroy(oldImage)
      }
      const newCust = { _id: _id, role: role, image: imagenew, username: username, password: password, phone: phone, email: email, active: active };
      const result = await CustomerDAO.update(newCust);
      res.json({ success: true, message: 'Update user thành công' });
    }
  } else {
    const newCust = { _id: _id, role: role, username: username, password: password, phone: phone, email: email, active: active };
    const result = await CustomerDAO.update(newCust);
    res.json({ success: true, message: 'Update user không thành công ' });

  }
});


router.get('/orders/customer/:cid', JwtUtil.checkToken, async function (req, res) {
  const _cid = req.params.cid;
  const orders = await OrderDao.selectByCustID(_cid);
  res.json(orders);
});

router.put('/customers/deactive/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const token = req.body.token;
  const result = await CustomerDAO.active(_id, token, 0);
  res.json(result);
});

router.get('/customers/sendmail/:id', JwtUtil.checkToken, async function (req, res) {
  const _id = req.params.id;
  const cust = await CustomerDAO.selectByID(_id);

  if (cust) {
    const send = await EmailUtil.send(cust.email, cust._id, cust.token);
    if (send) {
      res.json({ success: true, message: 'Please check email' });
    } else {
      res.json({ success: false, message: 'Email failure' });
    }
  } else {
    res.json({ success: false, message: 'Not exists customer' });
  }
});




module.exports = router;