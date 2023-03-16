import express from "express";
import * as MySQLConnector from "./services/mysqlConnector.js";
import {
  addImage,
  getImage,
  getAllImages,
} from "./controllers/imagesController.js";
import { checkStatus } from "./controllers/statusController.js";

const app = express();
const port = 8393;

// create database pool
MySQLConnector.init();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.route("/downloadImage").post(addImage);
app.route("/status/:id").get(checkStatus);
app.route("/getImage/:id").get(getImage);
app.route("/getAllImages").get(getAllImages);

app.listen(port, () => {
  console.log(`REST API listening at http://localhost:${port}`);
});
