require('../untils/MongoUnil');
const Models = require('../Models/module.js');

const ProductDAO = {
  async selectAll() {
    const products = await Models.Product.find().select('-descriptionLong').exec();
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
    if (product.image) {
      const newvalues = {
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity,
        description: product.description,
        sideEffects: product.sideEffects,
        howUse: product.howUse,
        Brand: product.Brand,
        usesFor: product.usesFor,
        SubCategory: product.SubCategory,
        descriptionLong: descriptionLong,
        promotion: {}
      };
      const result = await Models.Product.findByIdAndUpdate(product._id, newvalues, { new: true });
      return { message: 'thành công Update có ảnh mới' };
    } else {
      const newvalues = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        sideEffects: product.sideEffects,
        howUse: product.howUse,
        Brand: product.Brand,
        usesFor: product.usesFor,
        SubCategory: product.SubCategory,
        descriptionLong: descriptionLong,
        promotion: {}
      };
      const result = await Models.Product.findByIdAndUpdate(product._id, newvalues, { new: true });
      // console.log(newvalues, result)
      // return newvalues
      return { message: 'thành công Update không có ảnh mới ' };
    }



  },
  async updatePromotion(promotion, productList) {
    const result = await Models.Product.updateMany({ _id: { $in: productList } }, { promotion: promotion });
    return { message: 'thành công Update promotion' };
  },
  async delete(_id) {
    const result = await Models.Product.findOneAndDelete({ _id: _id });
    return result, 'thành công xóa';
  },
  async selectTopNew(top) {
    const query = {};
    const mysort = { cdate: -1 }; // descending
    const products = await Models.Product.find(query).sort(mysort).limit(top).exec();
    return products;
  },
  async selectTopHot(top, id) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'PENDING' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } }, // descending
      { $limit: top }
    ]).exec();
    var products = [];
    // console.log('items', items)

    for (const item of items) {
      const query = { '_id': item._id, 'SubCategory.idcategory': id };
      const product = await Models.Product.find(query).exec();
      products.push(...product);
    }
    return products;
  },

  async selectByCatID(_cid) {
    const query = { 'category._id': _cid };
    const products = await Models.Product.find(query).exec();
    return products;
  },
  async selectByCategoryID(_cid) {
    const query = { 'SubCategory.idcategory': _cid };
    const products = await Models.Product.find(query).exec();
    return products;
  },
  async selectBySubCategoryID(cid) {

    const query = { 'SubCategory._id': cid };
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
  },
  async selectByKeywordInputSearch(keyword) {
    const query = { name: { $regex: new RegExp(keyword, "i") } };
    const products = await Models.Product.find(query).limit(3).exec();
    return products;
  }

};
module.exports = ProductDAO;