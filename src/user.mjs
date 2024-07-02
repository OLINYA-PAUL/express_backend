import { Router } from "express";
import { matchedData, query, validationResult } from "express-validator";
import { mockUsers } from "../constant/constatnt.mjs";
mockUsers;

const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("")
    .isLength({ min: 5, max: 20 })
    .withMessage("value must be atleast from 5-20 charcaters"),
  (request, response) => {
    const result = validationResult(request);
    if (result.isEmpty()) {
      return res.send(`Hello, ${req.query.filter}!`);
    }

    const data = matchedData(request);
    const {
      query: { filter, value },
    } = request;
    // if (!filter && !value) return response.send(mockUsers);
    if (filter && value)
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );

    return response.send(mockUsers);
  }
);

router.post("/api/users", findIndexUserById, (request, response) => {
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

router.get(
  "/api/users/:id",
  findIndexUserById,
  query("filter").isString().notEmpty(),
  (request, response) => {
    const result = validationResult(request);

    if (result.isEmpty()) {
      return res.send(`Hello, ${req.query.filter}!`);
    }

    console.log(result);

    const { foundeUserIndex } = request;
    const findUser = mockUsers[foundeUserIndex];
    console.log(findUser);
    if (!findUser) return response.sendStatus(404);

    return response.send(findUser);
  }
);

router.put("/api/users/:id", findIndexUserById, (request, response) => {
  console.log(request.body);
  const { body, foundeUserIndex } = request;

  mockUsers[foundeUserIndex] = { id: mockUsers[foundeUserIndex].id, ...body };

  return response.sendStatus(200);
});

router.patch("/api/users/:id", findIndexUserById, (request, response) => {
  console.log(request.body);
  const { body, foundeUserIndex } = request;
  mockUsers[foundeUserIndex] = { ...mockUsers[foundeUserIndex], ...body };

  return response.sendStatus(200);
});

router.delete("/api/users:/id", findIndexUserById, (request, response) => {
  const { foundeUserIndex } = request;
  mockUsers.splice(foundeUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
