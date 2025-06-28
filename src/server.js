const express = require("express");
const { config } = require("dotenv");
const { apiRoutes } = require("./routes/API_routes");
const { connectSequelize } = require("./config/sequelize_db_orm");
config();

const app = express();
const port = process.env.LETWATCH_BE_PORT || 4000;
const hostname = process.env.LETWATCH_BE_HOSTNAME;

// config body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Testing Sequelize connection
connectSequelize();

// Routes
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
