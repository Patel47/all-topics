
# GraphQL Example: Where to Put Queries in Real-World Scenarios

In a real-world scenario, instead of using GraphiQL (an interactive tool), you would embed your GraphQL queries directly into your application code. Below are examples for how to execute GraphQL queries from your code using different methods.

## 1. Using `fetch` in JavaScript

You can use `fetch` in a frontend application or Node.js backend to send a query to your GraphQL server.

Here’s an example of how to query a user’s name by ID:

```javascript
const fetch = require('node-fetch'); // For Node.js environment

const query = \`
  query {
    user(id: 1) {
      name
    }
  }
\`;

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: query
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Explanation:
- The **query** is written as a string.
- You send this query as a `POST` request to your GraphQL server.
- `fetch` sends the request and handles the response.

## 2. Using Apollo Client (for React)

If you're working with a React app, Apollo Client makes working with GraphQL queries easy.

### Step 1: Install Apollo Client
```bash
npm install @apollo/client graphql
```

### Step 2: Write the query using Apollo Client:

```javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const GET_USER_NAME = gql\`
  query GetUserName($id: Int!) {
    user(id: $id) {
      name
    }
  }
\`;

client
  .query({
    query: GET_USER_NAME,
    variables: { id: 1 }
  })
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
```

### Explanation:
- The query is written using the `gql` tag.
- Apollo Client simplifies the querying process and makes state management easier in React applications.
- This example shows how to send a query with variables.

## 3. Using Axios in Node.js or Frontend

You can use **Axios** to send GraphQL queries in a Node.js or frontend application.

### Step 1: Install Axios:
```bash
npm install axios
```

### Step 2: Write the query using Axios:

```javascript
const axios = require('axios');

const query = \`
  query {
    user(id: 1) {
      name
    }
  }
\`;

axios.post('http://localhost:4000/graphql', {
  query: query,
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});
```

### Explanation:
- Axios allows you to send GraphQL queries similarly to how you would make REST API calls.
- The **query** is sent as part of the `POST` request, and the response is handled in the `.then()` block.

## Conclusion:
In a real-world application, you don’t use GraphiQL but embed GraphQL queries directly into your code using `fetch`, Apollo Client, or Axios. This allows your application to interact with the GraphQL API in a production environment.
