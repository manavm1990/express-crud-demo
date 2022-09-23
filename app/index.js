import express from "express";
import isAuth from "./auth/isAuth";
import itemsRouter from "./item/router";
import config from "./config";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/api/items", itemsRouter);

app.listen(config.port, () => {
  console.info(`App listening at http://localhost:${config.port}`);
});
