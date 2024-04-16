
require('../untils/MongoUnil');
const Models = require('./module.js')

const CustomerDAO = {
  async selectByUsernameOrEmail(username, email) {
    const query = { $or: [{ username: username }, { email: email }] };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },
  async UpdateRefreshToken(_id, token, RefreshToken) {
    const query = { _id: _id, token: token };
    const newvalues = { refreshToken: RefreshToken };
    const result = await Models.Customer.findOneAndUpdate(query, newvalues, { new: true });
    return result;
  },
  async insert(customer) {
    const mongoose = require('mongoose');
    customer._id = new mongoose.Types.ObjectId();
    const result = await Models.Customer.create(customer);
    return result;
  },
  async active(_id, token, active) {
    const query = { _id: _id, token: token };
    const newvalues = { active: active };
    const result = await Models.Customer.findOneAndUpdate(query, newvalues, { new: true });
    return result;
  },
  async selectByEmail(email) {
    const query = { email: email };
    const customer = await Models.Customer.findOne(query);
    return customer;
  },

  async update(customer) {
    if (customer.image) {
      const newvalues = {
        username: customer.username,
        password: customer.password,
        image: customer.image,
        phone: customer.phone,
        email: customer.email,
        role: customer.role,
      };
      const result = await Models.Customer.findByIdAndUpdate(customer._id, newvalues, { new: true });
      return { message: 'thành công Sửa user có ảnh mới' };
    } else {
      const newvalues = {
        username: customer.username,
        password: customer.password,
        phone: customer.phone,
        email: customer.email,
        active: customer.active,
        role: customer.role,
      };
      const result = await Models.Customer.findByIdAndUpdate(customer._id, newvalues, { new: true });
      // console.log(newvalues, result)
      // return newvalues
      return { message: 'thành công Sửa user có ảnh mới' };
    }
  },
  async selectAll() {
    const query = {};
    const customers = await Models.Customer.find(query).exec();
    return customers;
  },
  async selectByID(_id) {
    const customer = await Models.Customer.findById(_id).exec();
    return customer;
  },
  async DeleteByID(_id) {
    const result = await Models.Customer.findOneAndDelete({ _id: _id }).exec();
    return result;
  }

};
module.exports = CustomerDAO;