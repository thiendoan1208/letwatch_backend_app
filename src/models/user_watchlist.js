"use strict";
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserWatchList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserWatchList.belongsTo(models.User, {foreignKey: "userID"});
    }
  }
  UserWatchList.init(
    {
      userID: DataTypes.INTEGER,
      movieID: DataTypes.STRING,
      movieTitle: DataTypes.STRING,
      movieSlug: DataTypes.STRING,
      moviePoster: DataTypes.STRING,
      addedAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserWatchList",
    }
  );
  return UserWatchList;
};
