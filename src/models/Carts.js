const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      products: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      inCart: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },

    {
      timestamps: false,
    }
  );
};
