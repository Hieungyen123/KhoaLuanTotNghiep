
require('../untils/MongoUnil');
const Models = require('./module.js');

const RatingDao = {
    async selectAll() {
        const rating = await Models.Rating.find();
        return rating;
    },
    async insert(rating) {
        const mongoose = require('mongoose');
        rating._id = new mongoose.Types.ObjectId();
        const result = await Models.Rating.create(rating);
        return { message: 'Cảm ơn bạn đã đánh giá' };
    },
    async selectByID(product_id) {
        const rating = await Models.Rating.find({ productID: product_id }).exec();
        return rating;
    },
    async delete(_id) {
        const result = await Models.Rating.findByIdAndRemove(_id);
        return result;
    },



};
module.exports = RatingDao;