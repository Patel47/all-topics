
# Microservices Architecture Example

A **microservices architectural pattern** is a method of designing software systems where the application is broken down into smaller, independent services that work together. Each service focuses on a specific functionality (like user management, order processing, etc.) and can be developed, deployed, and scaled independently.

## Key Features:
1. **Independent Services**: The application is divided into smaller services, each responsible for a specific feature or function.
2. **Loose Coupling**: Each microservice operates independently and communicates with other services over a network, often using APIs.
3. **Technology Flexibility**: Different microservices can be built using different programming languages, databases, or technologies.
4. **Independent Deployment**: You can deploy, update, and scale each microservice separately without affecting others.
5. **Fault Isolation**: A failure in one microservice doesn’t bring down the whole system.

### Advantages:
- **Scalability**: Each microservice can be scaled independently.
- **Flexibility in Development**: Different teams can work on different services using the most suitable technology.
- **Resilience**: The system can continue to function even if one service fails.
- **Faster Deployment**: Individual services can be updated and deployed without the need to redeploy the entire application.

### Disadvantages:
- **Complexity**: Managing multiple services, databases, and communications can be more complex.
- **Network Latency**: Since services communicate over a network, there can be some performance overhead.
- **Testing Difficulty**: It can be harder to test the whole system because of the number of independent components.

---

## Fully Functional Example

Let’s build a **microservices-based application** where we have two services:
- **User Service**: Manages user data.
- **Product Service**: Manages product information.

These services will communicate with each other using HTTP requests.

### Project Structure:
\`\`\`
microservices-app/
│
├── user-service/
│   ├── app.js                # User service entry point
│   └── routes/userRoutes.js   # User routes
│
├── product-service/
│   ├── app.js                # Product service entry point
│   └── routes/productRoutes.js # Product routes
│
└── package.json              # Shared dependencies (if any)
\`\`\`

---

### Code

#### 1. User Service (user-service/app.js)
\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];

// Fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.json(user);
});

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});
\`\`\`

#### 2. Product Service (product-service/app.js)
\`\`\`javascript
const express = require('express');
const axios = require('axios');  // To make HTTP requests to the User Service
const app = express();

app.use(express.json());

let products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Phone' }
];

// Fetch all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Add a new product
app.post('/products', (req, res) => {
  const product = req.body;
  products.push(product);
  res.json(product);
});

// Fetch users from User Service
app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

app.listen(3002, () => {
  console.log('Product Service running on port 3002');
});
\`\`\`

---

### How to Run:
1. Install dependencies for both services:
   \`\`\`bash
   npm install express axios
   \`\`\`
2. Run the **User Service**:
   \`\`\`bash
   cd user-service
   node app.js
   \`\`\`
3. Run the **Product Service**:
   \`\`\`bash
   cd product-service
   node app.js
   \`\`\`
4. Access the services:
   - User Service: \`http://localhost:3001/users\`
   - Product Service: \`http://localhost:3002/products\`
   - To fetch users from the Product Service: \`http://localhost:3002/users\`

This is a basic example of microservices communicating via HTTP, where each service is independent, making the system more modular and scalable.
