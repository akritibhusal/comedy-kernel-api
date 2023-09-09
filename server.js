const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const options = {
  auth: {
    persistSession: true,
    storageKey: "supabase",
  },
};

const supabase = createClient(
  process.env.DB_HOST,
  process.env.API_KEY,
  options
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

/**
 * Routes
 */
app.get("/status", (req, res) => {
  res.send({ status: 200, message: "We are live and joking!" });
});

app.get("/jokes", async (req, res) => {
  const { data, error } = await supabase.from("jokes").select();

  if (error) {
    res.status(500).send({ status: 500, message: error });
  }

  res.send(data);
});

app.get("/jokes/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("jokes")
    .select()
    .eq("id", req.params.id);

  if (error) {
    res.status(500).send({ status: 500, message: error });
  }
  if (!data.length) {
    res.status(404).send({ status: 404, message: "Joke not found" });
  }
  res.send(data);
});

app.post("/joke", async (req, res) => {
  const { error } = await supabase
    .from("jokes")
    .insert({ setup: req.body.setup, punchline: req.body.punchline });
  if (error) {
    res.status(500).send({ status: 500, message: error });
  }
  res.send({ status: 200, message: "Joke added" });
});

app.post("/jokes", async (req, res) => {
  // TODO: Validate the request body using zod or joi
  const jokesList = req.body.map((joke) => {
    return { setup: joke.setup, punchline: joke.punchline };
  });
  const { error } = await supabase.from("jokes").insert(jokesList);
  if (error) {
    res.status(500).send({ status: 500, message: error });
  }
  res.send({ status: 200, message: "Jokes added 👏" });
});

app.listen(port, () => {
  console.log(`Listening at port :${port}, JK!`);
});
