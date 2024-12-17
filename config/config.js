require("dotenv").config();

const config = {
  appName: process.env.APP_NAME,
  port: process.env.PORT || 3000,
};

module.exports = config;
