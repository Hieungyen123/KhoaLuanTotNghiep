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
  SubCategory: [SubCategorySchema]
}, { versionKey: false });

const CustomerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // username: String,
  password: Number,
  username: String,
  phone: Number,
  email: String,
  active: Number,
  image: Object,
  token: String,
  refreshToken: String,
}, { versionKey: false });
const CustomerCartHistorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: CustomerSchema,
  item: Array,
  CreatedAt: Number,
}, { versionKey: false });
const CustomerProductHistorySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: CustomerSchema,
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
const DescProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

}, { versionKey: false });
const ProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  image: Object,
  cdate: Number,
  quantity: Number,
  description: String,
  howUse: String,
  usesFor: String,
  sideEffects: String,
  caption: String,
  Brand: Object,
  SubCategory: Object,
}, { versionKey: false });

const ItemSchema = mongoose.Schema({
  product: ProductSchema,
  quantity: Number
}, { versionKey: false, _id: false });
const Shippingchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  Description: String,
}, { versionKey: false });

const OrderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cdate: Number,
  total: Number,
  status: String,
  customer: CustomerSchema,
  items: [ItemSchema],
  ShippingMethod: Shippingchema,
  Address: String,
}, { versionKey: false });
const CommentsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_ID: Number,
  customer: CustomerSchema,
  content: String,
  cdate: Number,

}, { versionKey: false });

const RatingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: ProductSchema,
  customer: CustomerSchema,
  ratingValue: Number,

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
  Shipping: mongoose.models.Shipping || mongoose.model('Shipping', Shippingchema),
  DescProduct: mongoose.models.DescProduct || mongoose.model('DescProduct', DescProductSchema),
  CustomerProductHistory: mongoose.models.DescProduct || mongoose.model('CustomerProductHistory', CustomerProductHistorySchema),
  CustomerCartHistory: mongoose.models.DescProduct || mongoose.model('CustomerCartHistory', CustomerCartHistorySchema),
};

module.exports = Models;