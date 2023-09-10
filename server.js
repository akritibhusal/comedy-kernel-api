import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Supabase
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

const server = new ApolloServer({
  typeDefs: gql`
    type Status {
      status: Int
      message: String!
    }

    input JokeInput {
      setup: String!
      punchline: String!
    }

    type Joke {
      id: Int
      setup: String!
      punchline: String!
    }

    type Query {
      hello: String
      status: Status
      jokes: [Joke]
      joke(id: Int!): [Joke]
    }

    type Mutation {
      addJokes(jokes: [JokeInput]): [Joke]
      deleteJoke(id: Int!): Joke
    }
  `,
  resolvers: {
    Query: {
      hello: () => "Hello world!",
      status: () => {
        return {
          status: 200,
          message: "We are live and joking!",
        };
      },
      jokes: async () => {
        const { data, error } = await supabase.from("jokes").select();

        if (error) {
          throw new Error(error);
        }
        return data;
      },
      joke: async (parent, args) => {
        const { data, error } = await supabase
          .from("jokes")
          .select()
          .eq("id", args.id);

        if (error) {
          throw new Error(error);
        }
        if (!data.length) {
          throw new Error("Joke not found");
        }
        return data;
      },
    },
    Mutation: {
      addJokes: async (parent, args) => {
        const jokesList = args.jokes.map((joke) => {
          return { setup: joke.setup, punchline: joke.punchline };
        });
        const { data, error } = await supabase
          .from("jokes")
          .insert(jokesList)
          .select();
        if (error) {
          throw new Error(error);
        }
        return data;
      },
      deleteJoke: async (parent, args) => {
        const { data, error } = await supabase
          .from("jokes")
          .delete()
          .match({ id: args.id })
          .select();
        if (error) {
          throw new Error(error);
        }
        return data;
      },
    },
  },
});

await server.start();
server.applyMiddleware({ app });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.listen(port, () => {
  console.log(`Listening at port :${port}, JK!`);
});
