"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserViewHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserViewHistory.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  UserViewHistory.init(
    {
      userID: DataTypes.INTEGER,
      movieID: DataTypes.STRING,
      movieTitle: DataTypes.STRING,
      movieSlug: DataTypes.STRING,
      watchedAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserViewHistory",
    }
  );
  return UserViewHistory;
};
