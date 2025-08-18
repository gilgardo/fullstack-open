// Commented lines for exercises before 3.12

import express from "express";
// import mockPersons from "./data.js";
import morgan from "morgan";
import "dotenv/config";
import Person from "./mongoConfig.js";

// let persons = [...mockPersons];

const PORT = process.env.PORT || 3001;
// const generateId = () => Math.floor(Math.random() * 1000000).toString();

const app = express();
app.use(express.static("dist"));
app.use(express.json());

morgan.token("body", (req) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

const logger = morgan((tokens, req, res) =>
  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    tokens.body(req, res),
  ].join(" ")
);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ message: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ message: error.message });
  }

  next(error);
};

app.use(logger);

app.get("/info", async (request, response, next) => {
  try {
    const count = await Person.countDocuments({});
    const date = new Date();
    response.send(`<div>
      <div>Phonebook has info for ${count} people</div>
      <div>${date.toString()}</div>
      </div>`);
  } catch (error) {
    next(error);
  }
});

/*
Exercises till 3.11

  app.get("/api/persons", (request, response) => {
    response.json(persons);
  });

  app.get("/api/persons/:id", (request, response) => {
    const { id } = request.params;
    const data = persons.find((person) => person.id === id);
  if (!data) return response.status(404).json({ error: "person not found" });
  response.json(data);
});

app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  const deleted = persons.find((person) => person.id === id);
  if (!deleted) return response.status(404).json({ error: "person not found" });
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const data = request.body;
  if (!data || !data.number || !data.name)
    return response.status(400).json({ error: "missing data in the request" });
  const isNameUnique = persons.every((person) => person.name !== data.name);
  const id = generateId();
  if (!isNameUnique)
  return response.status(400).json({ error: "name must be unique" });
  persons = persons.concat({ ...data, id });
  
  response.status(201).json({ ...data, id });
});
*/

// Exercises from 3.13

app.get("/api/persons", async (request, response, next) => {
  try {
    const persons = await Person.find({});
    response.json(persons);
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  const { id } = request.params;
  const { number } = request.body;

  if (!number) {
    return response
      .status(400)
      .json({ message: "missing data in the request" });
  }

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      id,
      { number },
      { new: true, runValidators: true, context: "query" }
    );

    if (!updatedPerson) {
      return response.status(404).json({ message: "person not found" });
    }

    response.status(200).json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons/", async (request, response, next) => {
  const { name, number } = request.body;
  if (!name || !number)
    return response
      .status(400)
      .json({ message: "missing data in the request" });
  const person = new Person({ name, number });

  try {
    const savedPerson = await person.save();
    response.status(201).json(savedPerson);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const result = await Person.findByIdAndDelete(id);
    if (result) {
      return response.status(204).end();
    }
    return response.status(404).json({ message: "person not found" });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
