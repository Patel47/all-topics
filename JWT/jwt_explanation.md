
# JWT (JSON Web Token) - Simple Explanation

## What is JWT?
JWT (JSON Web Token) is a way to securely transmit information between two parties (like a client and a server). It is often used for authentication, where the server gives the client a token after the user logs in, and the client uses that token to prove their identity for future requests.

## Structure of JWT
A JWT consists of three parts:
1. **Header**: Contains the type of token (JWT) and the signing algorithm (like HMAC SHA256).
2. **Payload**: Contains the actual data, often user information like a user ID.
3. **Signature**: A hash of the header and payload, created using a secret key known to the server.

These three parts are separated by dots (`.`) and are base64 encoded. Here's a basic JWT:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## Steps for JWT Authentication:
1. **User Logs In**: The user sends their login credentials to the server.
2. **Server Creates JWT**: If the credentials are valid, the server creates a JWT and sends it to the client.
3. **Client Stores JWT**: The client stores the token (usually in localStorage or cookies).
4. **Client Sends JWT for Future Requests**: For each subsequent request, the client includes the JWT, typically in the `Authorization` header.
5. **Server Verifies JWT**: The server verifies the token’s signature and checks the payload to authorize the request.

## Example: Simple JWT Authentication with Node.js and Express

### Required Packages:
Install the necessary packages:
```bash
npm install express jsonwebtoken body-parser
```

### Sample Code:

```javascript
// Import the required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parse JSON request bodies

const SECRET_KEY = 'your_secret_key'; // Use a strong secret key in production

// Sample user data (you can replace this with your database)
const users = [
  { id: 1, username: 'john', password: 'password123' },
  { id: 2, username: 'jane', password: 'password456' }
];

// Login route to generate JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Find user by username and password
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  // Send token to the client
  res.json({ token });
});

// Protected route (requires token)
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  // Verify token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid, return protected data
    res.json({ message: 'This is protected data', user: decoded });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Steps:
1. **Login**: Send a POST request to `/login` with the correct username and password. The server responds with a JWT token.
2. **Access Protected Route**: Use this JWT token in the `Authorization` header to access the `/protected` route. If the token is valid, you'll get a response with protected data.

**Example Request with Token:**
```http
GET /protected HTTP/1.1
Authorization: your_jwt_token_here
```

This is a simple guide to JWT with a sample code that demonstrates the core ideas of how it works. Feel free to dive deeper into its usage in production!
