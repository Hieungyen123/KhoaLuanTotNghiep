
require('../untils/MongoUnil');
const Models = require('./module.js');

const CommetDao = {
    async selectAll() {
        const comment = await Models.Comments.find();
        return comment;
    },
    async insert(comment) {
        const mongoose = require('mongoose');
        comment._id = new mongoose.Types.ObjectId();
        const result = await Models.Comments.create(comment);
        return { message: 'Cảm ơn bạn đã bình luận' };
    },
    async selectByID(product_id) {
        const comment = await Models.Comments.find({ productID: product_id }).exec();
        return comment;
    },
    async delete(_id) {
        const result = await Models.Comments.findByIdAndRemove(_id);
        return result;
    },
    async update(comment) {
        const newvalues = { content: comment.content };
        const result = await Models.Comments.findByIdAndUpdate(comment._id, newvalues, { new: true });
        return result;
    },



};
module.exports = CommetDao;