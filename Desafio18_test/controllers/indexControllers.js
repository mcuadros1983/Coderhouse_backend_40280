// const args = process.argv;
// const path = require("path");
// const os = require('os');
import logger from '../logger.js';
const loggerConsola = logger.getLogger("default");


const renderIndex = (req, res) => {
  loggerConsola.info('Ingresando al sistema')
  const user = req.user;
  console.log("user", user);
  res.render("index", { user });
};

export { renderIndex };
