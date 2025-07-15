const express = require("express");
const { config } = require("dotenv");
const { apiRoutes } = require("./routes/API_routes");
const { configCORS } = require("../src/config/cors");
const cookieParser = require("cookie-parser");
const { connectSequelize } = require("./config/sequelize_db_orm");
config();

const app = express();
const port = process.env.LETWATCH_BE_PORT || 4000;
const hostname = process.env.LETWATCH_BE_HOSTNAME;

configCORS(app);

// config body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config cookie-parser
app.use(cookieParser());

// Testing Sequelize connection
connectSequelize();

// Routes
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
