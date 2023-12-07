const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("Cart", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.STRING,
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
    },
    {
      timestamps: false,
    }
  );
};
