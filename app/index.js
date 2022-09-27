import express from "express";
import isAuth from "./auth/isAuth";
import itemsRouter from "./item/router";
import config from "./config";
import usersRouter from "./user/router";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use(isAuth);

app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);

app.use((_, res, __) => {
  res.status(404).send("Not Found");
});

app.listen(config.port, () => {
  console.info(`App listening at http://localhost:${config.port}`);
});
