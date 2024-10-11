
# API Security Best Practices

## Best Practices

1. **Use HTTPS**: Always use HTTPS to encrypt communications between the client and server. This prevents sensitive data from being exposed to man-in-the-middle attacks.

2. **Authentication and Authorization**:
   - Use **OAuth 2.0** or **JWT** (JSON Web Tokens) for secure authentication.
   - Always check if the authenticated user has permission to access certain resources (authorization).

3. **Rate Limiting**:
   - Implement rate limiting to prevent abuse by limiting the number of API requests per user or IP address within a specific timeframe.

4. **Input Validation**:
   - Validate all incoming data to prevent SQL injections, XSS, and other malicious inputs.
   - Use libraries or frameworks that automatically escape inputs where possible.

5. **Limit Data Exposure**:
   - Return only necessary data in responses to avoid exposing sensitive information.
   - Use parameterized queries or ORM methods to avoid SQL injection risks.

6. **Use API Keys**: 
   - Require API keys to identify the client accessing the API.
   - Ensure that API keys are kept secret and rotated periodically.

7. **CORS (Cross-Origin Resource Sharing)**:
   - Properly configure CORS to allow trusted domains to access the API while blocking others.

8. **Log Activity**: 
   - Log all access to your API, including both successful and unsuccessful attempts, for auditing and monitoring purposes.

9. **Versioning**: 
   - Use versioning (e.g., `/api/v1/`) to avoid breaking clients when updating your API.

10. **Security Headers**:
   - Use security headers like `Content-Security-Policy`, `X-Content-Type-Options`, and `Strict-Transport-Security` to prevent attacks like clickjacking and MIME type sniffing.

## Fully Functional Example (JWT Authentication)

Here is a simple Node.js REST API example that follows some of these best practices using JWT for authentication:

### Step 1: Install Dependencies

```bash
npm init -y
npm install express jsonwebtoken bcryptjs dotenv
```

### Step 2: Create `.env` File

```bash
JWT_SECRET=your_jwt_secret_key
```

### Step 3: Create `server.js` File

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const users = []; // Simple user store (In production, use a database)

// Middleware to check JWT token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Register Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Protected Route
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}! This is your profile.` });
});

// Run server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### Step 4: Run the API

```bash
node server.js
```

### Step 5: Example API Requests

1. **Register** a new user:
   ```bash
   POST http://localhost:3000/register
   Content-Type: application/json
   Body: { "username": "john", "password": "password123" }
   ```

2. **Login** and get a JWT token:
   ```bash
   POST http://localhost:3000/login
   Content-Type: application/json
   Body: { "username": "john", "password": "password123" }
   ```

   Response:
   ```json
   { "token": "your.jwt.token" }
   ```

3. **Access a protected route** with the token:
   ```bash
   GET http://localhost:3000/profile
   Authorization: Bearer your.jwt.token
   ```

### Explanation of Security Features

- **JWT Authentication**: We use JWT tokens to ensure that only authenticated users can access protected routes.
- **Password Hashing**: User passwords are hashed using `bcryptjs` to prevent them from being stored in plain text.
- **Token Expiry**: JWT tokens expire after 1 hour to enhance security.
- **Access Control**: The `authenticateToken` middleware ensures only valid JWT tokens can access protected routes.

