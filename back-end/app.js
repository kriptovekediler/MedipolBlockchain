const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5001;
const morganMiddleware = require("./apis/middleware/morgan");

const Logger = require("./services/logger");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

require("./models/denouncement");
require("./models/user");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.options("*", cors());
app.use(morganMiddleware);

app.use(require("./apis"));

const connect = () => {
  const uri = process.env.DB_URL;

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    Logger.info("server has been connected to the db server");
    app.listen(port, () => {
      Logger.info(`artion server is running at port ${port}`);
    });
  });
};

connect();
