const express = require("express");
const cors = require("cors");
const fs = require("fs");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT;

let jokesData = [];

app.use(express.static('public'));
app.use(cors());

const getJokes = (res) => {
  try {
    jokesData = JSON.parse(fs.readFileSync("./jokes.json", "utf8"));
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 500, message: "Error reading jokes file"});
  }
}

// Routes
app.get("/status", (req, res) => {
  getJokes(res);
  res.send({status: 200, message: "We are live and joking!"});
});

app.get("/jokes", (req, res) => {
  getJokes(res);
  res.send(jokesData);
});

app.get("/jokes/:id", (req, res) => {
  getJokes(res);
  const requestedJoke = jokesData.find((joke) => joke.id === parseInt(req.params.id))
  if (requestedJoke) res.send(requestedJoke);
  res.status(404).send({status: 404, message: "Joke not found"});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

