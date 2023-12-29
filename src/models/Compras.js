const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "Compra",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      cartIds: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};
