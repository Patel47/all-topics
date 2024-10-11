
# Database Normalization

## What is Database Normalization?

Database normalization is the process of structuring a relational database to reduce redundancy and ensure data integrity. The goal is to divide larger tables into smaller, more manageable ones and link them using relationships, ensuring that the data is stored logically and consistently.

### Why Normalize Data?
1. **Avoid data duplication**: By splitting data into related tables, you avoid having the same data repeated in different places.
2. **Ensure data consistency**: Updates only need to happen in one place, reducing the risk of having outdated information.
3. **Improved query performance**: Properly structured data can speed up certain database operations.

### Normalization Levels:
Normalization typically follows these "normal forms" (NF), each with stricter rules:

#### 1. First Normal Form (1NF)
- All table entries must contain atomic values (i.e., values that can't be broken down further).
- Each record (row) must be unique.

Example:

| OrderID | CustomerName | Items           |
|---------|--------------|-----------------|
| 1       | John Doe     | Apple, Banana   |
| 2       | Jane Smith   | Banana, Orange  |

This violates 1NF because "Items" holds multiple values in one cell. To normalize it:

| OrderID | CustomerName | Item   |
|---------|--------------|--------|
| 1       | John Doe     | Apple  |
| 1       | John Doe     | Banana |
| 2       | Jane Smith   | Banana |
| 2       | Jane Smith   | Orange |

#### 2. Second Normal Form (2NF)
- It must be in 1NF.
- Remove partial dependencies, meaning that non-key columns must depend on the entire primary key, not part of it.

Example:

| OrderID | CustomerID | CustomerName | Item   |
|---------|------------|--------------|--------|
| 1       | 101        | John Doe     | Apple  |
| 1       | 101        | John Doe     | Banana |
| 2       | 102        | Jane Smith   | Banana |
| 2       | 102        | Jane Smith   | Orange |

In this case, the "CustomerName" depends only on "CustomerID," not "OrderID." To normalize:

**Customer Table**:

| CustomerID | CustomerName |
|------------|--------------|
| 101        | John Doe     |
| 102        | Jane Smith   |

**Order Table**:

| OrderID | CustomerID |
|---------|------------|
| 1       | 101        |
| 2       | 102        |

**Order Items Table**:

| OrderID | Item   |
|---------|--------|
| 1       | Apple  |
| 1       | Banana |
| 2       | Banana |
| 2       | Orange |

#### 3. Third Normal Form (3NF)
- It must be in 2NF.
- Remove transitive dependencies (columns that depend on non-primary key columns).

Example:

| OrderID | CustomerID | CustomerName | City     |
|---------|------------|--------------|----------|
| 1       | 101        | John Doe     | New York |
| 2       | 102        | Jane Smith   | London   |

Here, "City" depends on "CustomerName," not on the primary key. To normalize:

**Customer Table**:

| CustomerID | CustomerName | City     |
|------------|--------------|----------|
| 101        | John Doe     | New York |
| 102        | Jane Smith   | London   |

**Order Table**:

| OrderID | CustomerID |
|---------|------------|
| 1       | 101        |
| 2       | 102        |

### Fully Functional Example

Let’s create a simple database to demonstrate normalization in a Node.js app using SQLite.

#### Step 1: Install SQLite

```bash
npm install sqlite3
```

#### Step 2: Create a Node.js Script

```javascript
const sqlite3 = require('sqlite3').verbose();

// Create a new database
let db = new sqlite3.Database(':memory:');

// Create Customer table (3NF)
db.serialize(() => {
    db.run(\`CREATE TABLE Customer (
        CustomerID INTEGER PRIMARY KEY,
        CustomerName TEXT,
        City TEXT
    )\`);

    db.run(\`CREATE TABLE Orders (
        OrderID INTEGER PRIMARY KEY,
        CustomerID INTEGER,
        FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
    )\`);

    db.run(\`CREATE TABLE OrderItems (
        OrderItemID INTEGER PRIMARY KEY,
        OrderID INTEGER,
        Item TEXT,
        FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
    )\`);

    // Insert data
    db.run(\`INSERT INTO Customer (CustomerName, City) VALUES ('John Doe', 'New York')\`);
    db.run(\`INSERT INTO Customer (CustomerName, City) VALUES ('Jane Smith', 'London')\`);
    
    db.run(\`INSERT INTO Orders (CustomerID) VALUES (1)\`); // John Doe's Order
    db.run(\`INSERT INTO Orders (CustomerID) VALUES (2)\`); // Jane Smith's Order
    
    db.run(\`INSERT INTO OrderItems (OrderID, Item) VALUES (1, 'Apple')\`);
    db.run(\`INSERT INTO OrderItems (OrderID, Item) VALUES (1, 'Banana')\`);
    db.run(\`INSERT INTO OrderItems (OrderID, Item) VALUES (2, 'Orange')\`);

    // Fetch and display data
    db.each("SELECT Customer.CustomerName, OrderItems.Item FROM Customer JOIN Orders ON Customer.CustomerID = Orders.CustomerID JOIN OrderItems ON Orders.OrderID = OrderItems.OrderID", (err, row) => {
        console.log(\`\${row.CustomerName} ordered \${row.Item}\`);
    });
});

db.close();
```

This script demonstrates the normalized database with separate tables for customers, orders, and order items. Each table has been designed to meet 3NF standards.
