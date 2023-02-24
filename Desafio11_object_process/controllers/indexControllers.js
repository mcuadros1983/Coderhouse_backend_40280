const { getMockedItems } = require("../DB/MockApi.js");
const args = process.argv;
const { fork } = require("child_process");
const path = require("path");

const renderIndex = (req, res) => {
  const user = req.user;
  console.log("user", user);
  res.render("index", { user });
};

const getFakeItems = (req, res) => {
  const products = getMockedItems(5);
  res.json(products);
};

const getDatos = (req, res) => {
  //   const products = getMockedItems(5);
  //   res.json(products);
  const argumentos = args.slice(2);
  const plataforma = process.platform;
  const version = process.version;
  const memoria = process.memoryUsage();
  const path = process.cwd();
  const processId = process.pid;
  const carpeta = process.cwd().split("\\").pop();

  const datos = {
    argumentos,
    plataforma,
    version,
    memoria,
    path,
    processId,
    carpeta,
  };
  res.json({ datos });
};

const randoms = (req, res) => {
  let cant = 1e8;
  if (req.query.cant) {
    cant = req.query.cant;
  }
  const computo = fork(path.resolve(__dirname, 'getRandoms.js'))
  computo.on('message', numeros => {
    if(numeros === 'listo') {
      computo.send(cant)
    } else {
      res.json({numeros})
    }
  })
};

module.exports = { renderIndex, getFakeItems, getDatos, randoms };
