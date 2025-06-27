const { Sequelize, Model } = require("sequelize");
const { config } = require("dotenv");
config();

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  String(process.env.LETWATCH_DB),
  String(process.env.LETWATCH_DB_USER),
  String(process.env.LETWATCH_DB_PASSWORD),
  {
    host: String(process.env.LETWATCH_DB_HOSTNANE),
    port: Number(process.env.LETWATCH_DB_PORT),
    dialect: "mysql",
  }
);

const connectSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  connectSequelize,
};

// LETWATCH_DB_HOSTNANE = localhost;
// LETWATCH_DB_USER = root;
// LETWATCH_DB = letwatch_database;
// LETWATCH_DB_PORT = 8080;
// LETWATCH_DB_PASSWORD = letwatch1208;
