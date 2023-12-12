require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_HOST } = process.env;

const CartModel = require("../models/Carts");
const ProductsModel = require("../models/Products");
const TypeModel = require("../models/Types");
const UserModel = require("../models/Users");
const SubtypeModel = require("../models/Subtypes");
const ReviewModel = require("../models/Reviews");
const CompraModel = require("../models/Compras");
const PaymentModel = require("../models/Payments");

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
CompraModel(sequelize);
PaymentModel(sequelize);

const { Cart, Product, Type, User, Subtype, Review, Compra, Payment } =
  sequelize.models;

//! ----------------------Relaciones---------------------------------

Product.belongsTo(Type);
Product.belongsTo(Subtype)
Type.hasMany(Product);
Subtype.hasMany(Product)
Type.hasMany(Subtype)
Subtype.belongsTo(Type)

User.hasOne(Cart, { through: "user_cart", timestamps: false });
Cart.belongsTo(User, { through: "user_cart", timestamps: false });

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

Compra.belongsTo(User, { foreignKey: "usuarioId" }); //Establece que una compra pertenece a un usuario y utiliza la clave foránea "usuarioId".
User.hasMany(Compra, { foreignKey: "usuarioId" }); //Establece que un usuario puede tener muchas compras y utiliza la clave foránea "usuarioId".

Payment.belongsTo(User, { foreignKey: "usuarioId" }); //Establece que un pago pertenece a un usuario y utiliza la clave foránea "usuarioId".
User.hasMany(Payment, { foreignKey: "usuarioId" }); // Establece que un usuario puede tener muchos pagos y utiliza la clave foránea "usuarioId".

Payment.belongsTo(Compra, { foreignKey: "compraId" }); //Establece que un pago pertenece a una compra y utiliza la clave foránea "compraId".
Compra.hasMany(Payment, { foreignKey: "compraId" }); //Establece que una compra puede tener muchos pagos y utiliza la clave foránea "compraId".

Product.belongsToMany(Compra, {
  through: "CompraProducto",
  foreignKey: "productoId",
}); //Establece que un producto puede pertenecer a muchas compras a través de la tabla intermedia "CompraProducto", utilizando la clave foránea "productoId".
Compra.belongsToMany(Product, {
  through: "CompraProducto",
  foreignKey: "compraId",
}); //Establece que una compra puede contener muchos productos a través de la tabla intermedia "CompraProducto", utilizando la clave foránea "compraId".

module.exports = {
  Cart,
  Product,
  Type,
  User,
  Subtype,
  Review,
  Compra,
  Payment,
  conn: sequelize,
};
