const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "Payment",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      current: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payername: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      state: {
        type: DataTypes.ENUM("Pendiente", "Aprobado", "Rechazado"),
        defaultValue: "Pendiente",
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
