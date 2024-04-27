
require('../untils/MongoUnil');
const Models = require('./module.js')
var mongoose = require('mongoose');
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
    customer._id = new mongoose.Types.ObjectId();
    const result = await Models.Customer.create(customer);
    return result;
  },
  async active(_id, token, active) {
    console.log(_id)
    const query = { _id: _id, token: token };
    const newvalues = { active: active };
    try {
      const result = await Models.Customer.findOneAndUpdate(query, newvalues, { new: true });
      if (!result) {
        return { message: 'không tìm thấy user' }
      }
      return result
    } catch (err) {
      return err;
    }


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
  async updateClientCustomer(customer) {
    if (customer.image) {
      const newvalues = {
        username: customer.username,
        Gender: customer.Gender,
        image: customer.image,
      };
      const result = await Models.Customer.findByIdAndUpdate(customer._id, newvalues, { new: true });
      return { message: 'thành công Sửa user có ảnh mới' };
    } else {
      const newvalues = {
        username: customer.username,
        Gender: customer.Gender,
      };
      const result = await Models.Customer.findByIdAndUpdate(customer._id, newvalues, { new: true });
      // console.log(newvalues, result)
      // return newvalues
      return { message: 'thành công Sửa user' };
    }
  },
  async updateClientCustomerPassWord(customer) {
    const newvalues = {
      password: customer.password,
    };
    const result = await Models.Customer.findByIdAndUpdate(customer._id, newvalues, { new: true });
    return { message: 'Cập nhật thành công mật khẩu' };
  },
  async PostAddress(address, id) {
    address._idAddress = new mongoose.Types.ObjectId();
    const result = await Models.Customer.findByIdAndUpdate(id, { $push: { Address: address } }, { new: true });
    console.log(result)
    return { message: 'Thêm thành công địa chỉ' };
  },
  async PutUpdateAddress(address, idcustomer, idAddress) {
    try {
      const result = await Models.Customer.findOneAndUpdate(
        { _id: idcustomer, 'Address._idAddress': idAddress }, // Tìm khách hàng với ID và Address ID tương ứng
        {
          $set: {
            'Address.$.name': address.name,
            'Address.$.phone': address.phone,
            'Address.$.city': address.city,
            'Address.$.districts': address.districts,
            'Address.$.wards': address.wards,
            'Address.$.street': address.street,
          }
        }, // Cập nhật đối tượng Address trong mảng Address
        { new: true }
      );
      console.log('lỗi không tìm thấy');
      return { message: 'Cập nhật địa chỉ thành công' };
    } catch (error) {
      console.log('lỗi')
      // Xử lý lỗi nếu có
      return { error: 'Đã xảy ra lỗi trong quá trình cập nhật địa chỉ' };
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