const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Address", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
