//CLI: npm install mongoose --save
const mongoose = require('mongoose');
// schemas
const AdminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String
}, {
  versionKey: false,
  collection: 'admin'
});

const SubCategorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  Namecategory: String,
  idcategory: String,
  image: Object
}, { versionKey: false });
const CategorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
}, { versionKey: false });

const CustomerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // username: String,
  password: String,
  username: String,
  phone: Number,
  email: String,
  active: Number,
  image: Object,
  token: String,
  role: String,
  refreshToken: String,
  Gender: String,
  Address: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    phone: Number,
    city: Object,
    districts: Object,
    wards: Object,
    street: String,
  }]
}, { versionKey: false });
const CustomerCartHistorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  customer: CustomerSchema,
  item: Array,
  CreatedAt: Number,
}, { versionKey: false });

const BrandSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  image: Object,
  BrandOrigin: String,
  description: String,
}, { versionKey: false });

const ProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  image: Object,
  cdate: Number,
  quantity: Number,
  description: String,
  descriptionLong: String,
  howUse: String,
  usesFor: String,
  sideEffects: String,
  caption: String,
  Brand: Object,
  SubCategory: Object,

  promotion: {
    startDate: Date,
    endDate: Date,
    discountPercent: Number,
  },
}, { versionKey: false });
const ItemSchema = mongoose.Schema({
  product: ProductSchema,
  quantity: Number
}, { versionKey: false, _id: false });
const OrderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cdate: Number,
  total: Number,
  status: String,
  UserID: String,
  orderType: String,
  items: [ItemSchema],
  orderId: String,
  Address: {
    name: String,
    phone: Number,
    city: Object,
    districts: Object,
    wards: Object,
    street: String,
    note: String
  },
  ShippingMethod: String,
  note: String

}, { versionKey: false });
const CommentsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productID: String,
  customer: CustomerSchema,
  value: String,
  cdate: Number,

}, { versionKey: false });
const BlogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  image: Object,
  valueContent: String,
  valueTitle: String,
  valueShortIntro: String,
  crdate: Date,
  customer: CustomerSchema,

}, { versionKey: false });

const RatingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productID: String,
  customerID: String,
  ratingValue: Number,
  cdate: Number,
}, { versionKey: false });
// models
// const Admin = mongoose.model('Admin', AdminSchema);
// const Category = mongoose.model('Category', CategorySchema);
// const Customer = mongoose.model('Customer', CustomerSchema);
// const Product = mongoose.model('Product', ProductSchema);
// const Order = mongoose.model('Order', OrderSchema);
// const Comments = mongoose.model('Comment', CommetSchema);
// const Rating = mongoose.model('Rating', RatingSchema);


// module.exports = { Category, Customer, Product, Order, Rating, Comments };
const Models = {
  Admin: mongoose.models.Admin || mongoose.model('Admin', AdminSchema),
  Category: mongoose.models.Category || mongoose.model('Category', CategorySchema),
  Customer: mongoose.models.Customer || mongoose.model('Customer', CustomerSchema),
  Product: mongoose.models.Product || mongoose.model('Product', ProductSchema),
  Order: mongoose.models.Order || mongoose.model('Order', OrderSchema),
  Comments: mongoose.models.Comments || mongoose.model('Comments', CommentsSchema),
  Rating: mongoose.models.Rating || mongoose.model('Rating', RatingSchema),
  Brand: mongoose.models.Brand || mongoose.model('Brand', BrandSchema),
  SubCategory: mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema),
  CustomerCartHistory: mongoose.models.CustomerCartHistory || mongoose.model('CustomerCartHistory', CustomerCartHistorySchema),
  Blog: mongoose.models.Blog || mongoose.model('BlogSchema', BlogSchema),
};
module.exports = Models;
