# Comedy Kernel API

Comedy Kernel API is a simple API that serves up corny jokes for a good laugh. This API is designed to provide you with a steady stream of humorous content.

## Table of Contents

- [Comedy Kernel API](#comedy-kernel-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Queries](#queries)
  - [Mutations](#mutations)
  - [Example Usage](#example-usage)

## Installation

To get started with the Comedy Kernel API, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:akritibhusal/comedy-kernel-api.git
   cd comedy-kernel-api
   ```

2. Install the required dependencies:

    ```bash
    npm install
    ````

3. Create a `.env` file in the root directory and configure it with your Supabase credentials. 
   You can use the provided `.env.example` as a template.

4. Start the server:
    - For production:
    ```bash
    npm start
    ```

    - For development:
    ```bash
    npm run dev
    ```

5. The API should now be running on `http://localhost:3000` by default.

## Usage

The Comedy Kernel API provides a simple interface to fetch jokes. You can use this API to integrate jokes into your applications, websites, or simply fetch a joke for some quick humor.

## Queries

The API supports the following queries:
  status: Fetches the status of the API
  jokes: Fetches all jokes
  joke(id): Fetches a specific joke


## Mutations

The API supports the following mutations:
  addJokes: Adds a new joke
  deleteJoke(id): Deletes a specific joke

## Example Usage

You can make a GET request to `http://localhost:3000/` to receive a joke in the following format 🥕:

Example query:
```graphql
    query {
      jokes {
        setup
        punchline
      }
    }
```

Example response:
```json
{
  "data": {
    "jokes": [
      {
        "setup": "What do you call an angry carrot?",
        "punchline": "A steamed veggie."
      }
    ]
  }
}
```