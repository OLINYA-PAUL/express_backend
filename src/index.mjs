import express from "express";
import { query, validationResult } from "express-validator";
import { mockUsers } from "../constant/constatnt.mjs";
import router from "./user.mjs";

const app = express();
app.use(express.json());
app.use(router);

const findIndexUserById = (request, response, next) => {
  const {
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const foundeUserIndex = mockUsers?.findIndex((user) => user?.id === parsedId);
  console.log(foundeUserIndex);
  if (foundeUserIndex === -1) return response.sendStatus(400);

  request.foundeUserIndex = foundeUserIndex;

  next();
};

app.post("/api/users");

app.get("/api/users/:id");

app.put("/api/users/:id");

app.patch("/api/users/:id");

app.delete("/api/users/:id");

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Running on localHost: ${port}`));
