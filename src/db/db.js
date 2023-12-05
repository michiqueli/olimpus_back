require('dotenv').config()
const { Sequelize } = require('sequelize')

const { DB_HOST } = process.env


const AdressModel = require('../models/Addresses')
const CartModel = require('../models/Carts')
const ProductsModel = require('../models/Products')
const TypeModel = require('../models/Types')
const UserModel = require('../models/Users')


const sequelize = new Sequelize(
    DB_HOST,
    {
        logging: false,
        native: false,
    }
)

//---------------------------------------------------
//! ----------------------------------------------------------------

AdressModel(sequelize)
CartModel(sequelize)
ProductsModel(sequelize)
TypeModel(sequelize)
UserModel(sequelize)

const { Address, Cart, Product, Type, User } = sequelize.models

//! ----------------------Relaciones---------------------------------
//TODO: Relaciones -->

//!------------------------------------------------------------------
module.exports = {
    Address,
    Cart,
    Product,
    Type,
    User,
    conn: sequelize
}