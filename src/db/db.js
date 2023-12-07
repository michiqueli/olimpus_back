require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_HOST } = process.env;

const CartModel = require("../models/Carts");
const ProductsModel = require("../models/Products");
const TypeModel = require("../models/Types");
const UserModel = require("../models/Users");
const SubtypeModel = require("../models/Subtypes");
const ReviewModel = require ('../models/Reviews')

const sequelize = new Sequelize(DB_HOST, {
  logging: false,
  native: false,
});

CartModel(sequelize);
ProductsModel(sequelize);
TypeModel(sequelize);
UserModel(sequelize);
SubtypeModel(sequelize);
ReviewModel(sequelize);

const { Cart, Product, Type, User, Subtype, Review } = sequelize.models;

//! ----------------------Relaciones---------------------------------

Product.belongsTo(Type);
Type.hasMany(Product);

Type.hasMany(Subtype, { foreignKey: "name" });
Subtype.belongsTo(Type, { foreignKey: "typeId" });

User.hasOne(Cart, { through: "user_cart", timestamps: false });
Cart.belongsTo(User, { through: "user_cart", timestamps: false });

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)


module.exports = {
  Cart,
  Product,
  Type,
  User,
  Subtype,
  Review,
  conn: sequelize,
};
