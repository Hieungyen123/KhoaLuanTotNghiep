require('../untils/MongoUnil');
const Models = require('./module.js');

const BrandDAO = {
    async selectAll() {
        // console.log('lấy brand')
        const query = {};
        const Brand = await Models.Brand.find(query).exec();
        // console.log(Brand)
        return Brand;
    },
    async selectTen() {
        // console.log('lấy brand')
        const query = {};
        const Brand = await Models.Brand.find(query).exec();
        const lastTenBrands = Brand.slice(-10)
        // console.log(Brand.length)
        // console.log(lastTenBrands.length)
        return lastTenBrands;
    },
    async insert(Brand) {
        const mongoose = require('mongoose');
        Brand._id = new mongoose.Types.ObjectId();
        console.log('thêm brand')
        // console.log(Brand)
        const result = await Models.Brand.create(Brand);
        return result;
    },
    async update(Brand) {
        console.log(Brand)
        if (Brand.image) {
            const newvalues = {
                name: Brand.name,
                image: Brand.image,
                BrandOrigin: Brand.BrandOrigin,
                description: Brand.description,
            };
            const result = await Models.Product.findByIdAndUpdate(Brand._id, newvalues, { new: true });
            console.log('newvalues', newvalues, result)
            // return newvalues
            return { message: 'thành công Update cả hình mới ' };
        } else {
            const newvalues = {
                name: Brand.name,
                BrandOrigin: Brand.BrandOrigin,
                description: Brand.description,
            };
            const result = await Models.Brand.findByIdAndUpdate(Brand._id, newvalues, { new: true });
            console.log('newvalues', newvalues, result)
            // return newvalues
            return { message: 'thành công Update không có hình mới ' };
        }
    },
    async delete(_id) {
        const result = await Models.Brand.findOneAndDelete({ _id: _id });
        return result;
    },

    //product
    async selectByID(_id) {
        const Brand = await Models.Brand.findById(_id).exec();
        return Brand;
    }
};
module.exports = BrandDAO;