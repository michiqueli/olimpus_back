const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        isActive:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        rating:{
            type:DataTypes.FLOAT,
            allowNull: false
        },
    },
  )
}