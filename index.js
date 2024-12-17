const app = require("./app");
const config = require("./config/config");
const { appName, port } = config;

app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});
