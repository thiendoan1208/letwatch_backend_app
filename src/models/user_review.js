"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserReview.belongsTo(models.User, { foreignKey: "userID" });
    }
  }
  UserReview.init(
    {
      userID: DataTypes.INTEGER,
      description: DataTypes.STRING,
      type: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserReview",
    }
  );
  return UserReview;
};
