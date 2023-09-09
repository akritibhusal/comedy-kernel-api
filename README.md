# Comedy Kernel API

Comedy Kernel API is a simple API that serves up corny jokes for a good laugh. This API is designed to provide you with a steady stream of humorous content.

## Table of Contents

- [Comedy Kernel API](#comedy-kernel-api)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
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

## Endpoints

The following endpoints are available:
    GET /jokes: Fetch all jokes
    GET /jokes/:id : Fetch a specific joke
    POST /joke: Create a new joke
    POST /jokes: Bulk create new jokes

## Example Usage

You can make a GET request to `http://localhost:3000/jokes/1` to receive a joke in the following format 🥕:

```json
[
    {
        "id": 1,
        "setup": "What do you call an angry carrot?",
        "punchline": "A steamed veggie."
    }
]
```