require("dotenv").config();
require('./persistence/firebase/connection.js');
require("./config/passport.js");

const express = require("express");
const exphbs = require("express-handlebars");
const MessageContainer = require("./persistence/messagePersistence.js");
const ProductContainer = require("./persistence/productPersistence.js");
const { Server } = require("socket.io");
const { createServer } = require("http");
const morgan = require("morgan");
const passport = require("./config/passport.js");
const { join, format } = require("path");
const indexRoutes = require("./routes/indexRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const minimist = require('minimist')
const cluster = require("cluster")
const os = require('os')  
const logger = require("./logger.js")
const loggerConsola = logger.getLogger("default");
const loggerArchivoWarn = logger.getLogger("archivowarn");
const argsConfig = require('./argsConfig')

const { PORT, MODE } = minimist(process.argv.slice(2), argsConfig.config
)

if (MODE === "CLUSTER" && cluster.isPrimary) {  
  const numCPUs = os.cpus().length
  console.log(`Numero de procesadores ${numCPUs}`)
  console.log(`PID Master: ${process.pid}`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on("exit", worker => {
    console.log(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`)
    cluster.fork()
  })
} else {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  // settings
  app.set("views", join(path.join(__dirname, "views")));

  // config view engine
  const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
  });
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  // middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_ATLAS,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        ttl: 100,
      }),
      secret: "secreta",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // static files
  app.use(express.static(join(__dirname, "public")));

  // routes
  app.use(indexRoutes);
  app.use(userRoutes);

  app.use((req, res, next) => {
    loggerConsola.warn("ruta inexistente")
    loggerArchivoWarn.warn("ruta inexistente")
    return res.status(404).render("404");
  });

  //Carga de productos
  io.on("connection", async function (socket) {
    const productos = await ProductContainer.getAllProducts()
    socket.emit("products", productos);  
    socket.on("newProduct", async (data) => {
      try {
        await ProductContainer.addProduct(data);
        io.sockets.emit("products", await ProductContainer.getAllProducts());
      } catch (error) {
        throw new Error(error?.message);
      }
    });
  });

  //Web Chat
  io.on("connection", async function (socket) {
    socket.emit("messages", await MessageContainer.getAllMessagesNormalized());
    socket.on("newMessage", async (data) => {
      try {
        await MessageContainer.addMessage(data);
        io.sockets.emit("messages", await MessageContainer.getAllMessagesNormalized());
      } catch (error) {
        throw new Error(error?.message);
      }
    });
  });

  const srv = server.listen(PORT, () =>
    console.log(
      `Servidor en puerto ${PORT} - PID ${process.pid} FYH ${new Date().toLocaleString()}`
    )
  );
  srv.on("error", (error) => console.log(`Error en servidor ${server}`));

}



