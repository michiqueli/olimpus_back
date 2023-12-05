const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define(
    "usuario",
    {
      id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
