import express from "express";
import mockPersons from "./data.js";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";

let persons = [...mockPersons];
const FRONTEND_ORIGIN = "http://localhost:5173";
const PORT = process.env.PORT || 3001;
const generateId = () => Math.floor(Math.random() * 1000000).toString();

const app = express();
app.use(cors({ origin: FRONTEND_ORIGIN }));
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

app.use(logger);
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(`<div>
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${date.toString()}</div>
    </div>`);
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
