require('../untils/MongoUnil');
const Models = require('../module.js');

const ProductDAO = {
  async selectAll() {
    const products = await Models.Product.find();
    return products;
  },
  async insert(product) {
    const mongoose = require('mongoose');
    product._id = new mongoose.Types.ObjectId();
    const result = await Models.Product.create(product);
    return result;
  },
  async selectByID(_id) {
    const product = await Models.Product.findById(_id).exec();
    return product;
  },
  async update(product) {
    const newvalues = { name: product.name, price: product.price, image: product.image, category: product.category };
    const result = await Models.Product.findByIdAndUpdate(product._id, newvalues, { new: true });
    return result;
  },
  async delete(_id) {
    const result = await Models.Product.findByIdAndRemove(_id);
    return result;
  },
  async selectTopNew(top) {
    const query = {};
    const mysort = { cdate: -1 }; // descending
    const products = await Models.Product.find(query).sort(mysort).limit(top).exec();
    return products;
  },
  async selectTopHot(top) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } }, // descending
      { $limit: top }
    ]).exec();
    var products = [];
    for (const item of items) {
      const product = await ProductDAO.selectByID(item._id);
      products.push(product);
    }
    return products;
  },

  async selectByCatID(_cid) {
    const query = { 'category._id': _cid };
    const products = await Models.Product.find(query).exec();
    return products;
  },
  async selectAll() {
    const query = {};
    const categories = await Models.Product.find(query).exec();
    return categories;
  },
  async selectByKeyword(keyword) {
    const query = { name: { $regex: new RegExp(keyword, "i") } };
    const products = await Models.Product.find(query).exec();
    return products;
  }

};
module.exports = ProductDAO;