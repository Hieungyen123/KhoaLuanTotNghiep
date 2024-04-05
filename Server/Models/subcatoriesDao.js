require('../untils/MongoUnil');
const Models = require('./module.js');

const SubCategoryDAO = {
    async selectAll() {
        const query = {};
        const subcategory = await Models.SubCategory.find(query).exec();
        return subcategory;
    },
    async insert(subcategory) {
        const mongoose = require('mongoose');
        subcategory._id = new mongoose.Types.ObjectId();
        const result = await Models.SubCategory.create(subcategory);
        return result;
    },
    async update(subcategory) {
        if (subcategory.image) {
            const newvalues = {
                name: subcategory.name,
                image: subcategory.image,
                Namecategory: subcategory.Namecategory,
                idcategory: subcategory.idcategory
            };
            const result = await Models.Product.findByIdAndUpdate(subcategory._id, newvalues, { new: true });
            console.log(newvalues, result)
            // return newvalues
            return { message: 'thành công Update cả hình mới ' };
        } else {
            const newvalues = {
                name: subcategory.name,
                Namecategory: subcategory.Namecategory,
                idcategory: subcategory.idcategory

            };
            const result = await Models.SubCategory.findByIdAndUpdate(subcategory._id, newvalues, { new: true });
            console.log(newvalues, result)
            // return newvalues
            return { message: 'thành công Update không có hình mới ' };
        }



    },
    async delete(_id) {
        const result = await Models.SubCategory.findOneAndDelete({ _id: _id });
        return result, 'thành công xóa';
    },


    //product
    async selectByID(_id) {
        const SubCategory = await Models.SubCategory.findById(_id).exec();
        return SubCategory;
    }
};
module.exports = SubCategoryDAO;