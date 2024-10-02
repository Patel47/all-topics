const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// Define the schema
const schema = buildSchema(`
  type Query {
    hello: String
    user(id: Int!): User
    users: [User]
    username(id: Int!): String
  }
  
  type User {
    id: Int
    name: String
    age: Int
    posts: [Post]
  }
  
  type Post {
    id: Int
    title: String
    content: String
  }
`);

// Sample data
const users = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    posts: [{ id: 1, title: "First Post", content: "Hello World" }],
  },
  {
    id: 2,
    name: "Jane Doe",
    age: 25,
    posts: [{ id: 2, title: "Second Post", content: "GraphQL is great!" }],
  },
];

// Define the resolvers (functions to fetch data)
const root = {
  hello: () => "Hello, world!",
  user: ({ id }) => users.find((user) => user.id === id),
  users: () => users,
  username: ({ id }) => {
    let user = users.find((user) => user.id === id);
    return user.name;
  },
};

// Create an express app and add the GraphQL middleware
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables the GraphiQL tool for testing queries
  })
);

// Start the server
app.listen(4000, () =>
  console.log("Server running on http://localhost:4000/graphql")
);
