
# Monolithic Architecture Example

A **monolithic architectural pattern** is a traditional way of building applications where the entire application (frontend, backend, and database) is developed and deployed as a single, tightly connected unit. All the functionalities of the application are part of one large codebase, and they share the same memory space, database, and resources.

## Key Features:
1. **Single Codebase**: The application is developed as one large codebase.
2. **Single Deployment**: All components are deployed together; if one part is updated, the whole application needs to be redeployed.
3. **Tightly Coupled**: All parts of the application are closely interconnected, meaning a change in one part could affect other parts.
4. **Simple to Develop and Test**: It is easy to get started with a monolithic architecture because everything is in one place.
5. **Scalability**: Scaling a monolithic application usually involves replicating the entire system on multiple servers.

### Advantages:
- **Simple Development**: Easy to set up and work on for small to medium-sized applications.
- **Straightforward Testing**: Since everything is in one place, it's easy to test the application as a whole.
- **Easy Deployment**: There is only one unit to deploy.

### Disadvantages:
- **Hard to Scale**: As the application grows, it becomes harder to scale individual parts.
- **Complex to Maintain**: Changes in one part of the application can lead to unintended issues elsewhere.
- **Slower Development**: As the application becomes more complex, it slows down the development process due to its size and tight coupling.

---

## Fully Functional Project Example

Here's a simple Node.js monolithic application that shows how everything is packaged into one app.

### Project Structure:
\`\`\`
monolithic-app/
│
├── app.js                # Main entry point
├── package.json          # Dependencies
│
├── models/               # All database models
│   ├── user.js           # User model
│   └── book.js           # Book model
│
├── routes/               # Application routes
│   ├── userRoutes.js     # User-related routes
│   └── bookRoutes.js     # Book-related routes
│
└── views/                # Frontend views (EJS templates)
    ├── index.ejs
    └── books.ejs
\`\`\`

### Code

#### app.js
\`\`\`javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

// Homepage route
app.get('/', (req, res) => {
    res.render('index');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(\`Server is running on http://localhost:\${PORT}\`);
});
\`\`\`

#### models/user.js
\`\`\`javascript
const users = [];

module.exports = users;
\`\`\`

#### models/book.js
\`\`\`javascript
const books = [];

module.exports = books;
\`\`\`

#### routes/userRoutes.js
\`\`\`javascript
const express = require('express');
const router = express.Router();
const users = require('../models/user');

router.get('/', (req, res) => {
    res.render('index', { users });
});

router.post('/add', (req, res) => {
    const { name } = req.body;
    users.push({ name });
    res.redirect('/users');
});

module.exports = router;
\`\`\`

#### routes/bookRoutes.js
\`\`\`javascript
const express = require('express');
const router = express.Router();
const books = require('../models/book');

router.get('/', (req, res) => {
    res.render('books', { books });
});

router.post('/add', (req, res) => {
    const { title } = req.body;
    books.push({ title });
    res.redirect('/books');
});

module.exports = router;
\`\`\`

#### views/index.ejs
\`\`\`html
<h1>Users List</h1>
<ul>
    <% users.forEach(user => { %>
        <li><%= user.name %></li>
    <% }) %>
</ul>

<form action="/users/add" method="POST">
    <input type="text" name="name" placeholder="Enter user name" required>
    <button type="submit">Add User</button>
</form>

<a href="/books">Go to Books</a>
\`\`\`

#### views/books.ejs
\`\`\`html
<h1>Books List</h1>
<ul>
    <% books.forEach(book => { %>
        <li><%= book.title %></li>
    <% }) %>
</ul>

<form action="/books/add" method="POST">
    <input type="text" name="title" placeholder="Enter book title" required>
    <button type="submit">Add Book</button>
</form>

<a href="/">Go to Users</a>
\`\`\`

---

## How to Run:
1. Install the required dependencies by running:
   \`\`\`bash
   npm install express body-parser ejs
   \`\`\`
2. Run the app:
   \`\`\`bash
   node app.js
   \`\`\`
3. Open \`http://localhost:3000\` in your browser to see the monolithic application in action.

This example showcases how different functionalities like handling users and books are part of the same monolithic system, sharing a single codebase.
