require('../untils/MongoUnil');
const Models = require('./module.js');

const BlogDao = {
    async selectAll() {
        // console.log('lấy brand')
        const query = {};
        const Blog = await Models.Blog.find(query).exec();
        // console.log(Brand)
        return Blog;
    },
    async selectTen() {
        // console.log('lấy brand')
        const query = {};
        const Blog = await Models.Blog.find(query).exec();
        const lastTenBrands = Brand.slice(-10)
        // console.log(Brand.length)
        // console.log(lastTenBrands.length)
        return lastTenBrands;
    },
    async insert(Blog) {
        const mongoose = require('mongoose');
        Blog._id = new mongoose.Types.ObjectId();
        console.log('thêm Blog')
        // console.log(Brand)
        const result = await Models.Blog.create(Blog);
        return 'thêm thành công';
    },
    async update(Blog) {
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
        const result = await Models.Blog.findOneAndDelete({ _id: _id });
        return result;
    },

    //product
    async selectByID(_idCustomer) {
        const Blog = await Models.Blog.find({ 'customer._id': _idCustomer }).exec();
        return Blog;
    },
    async selectOneByID(idblog) {
        const Blog = await Models.Blog.findOne({ '_id': idblog }).exec();
        return Blog;
    }
};
module.exports = BlogDao;