require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_HOST } = process.env;

const CartModel = require("../models/Carts");
const ProductsModel = require("../models/Products");
const TypeModel = require("../models/Types");
const UserModel = require("../models/Users");
const SubtypeModel = require("../models/Subtypes");

const sequelize = new Sequelize(DB_HOST, {
  logging: false,
  native: false,
});

CartModel(sequelize);
ProductsModel(sequelize);
TypeModel(sequelize);
UserModel(sequelize);
SubtypeModel(sequelize);

const { Address, Cart, Product, Type, User, Subtype } = sequelize.models;

//! ----------------------Relaciones---------------------------------

Product.belongsTo(Type);
Type.hasMany(Product);

User.hasOne(Cart, { through: "user_cart", timestamps: false });
Cart.belongsTo(User, { through: "user_cart", timestamps: false });

module.exports = {
  Cart,
  Product,
  Type,
  User,
  Subtype,
  conn: sequelize,
};
