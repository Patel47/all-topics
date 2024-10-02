# Software Testing Overview

## 1. What is Testing?

Testing is the process of evaluating whether a piece of software (code, application, or system) works as expected. It helps identify bugs, issues, or unexpected behavior before the software is released to users. Testing ensures that the software meets its requirements and functions correctly.

**Example:**
Imagine you’re building a calculator app. Before releasing it, you test the app to ensure that all buttons (like +, -, =, etc.) work as intended.

---

## 2. Unit Testing

Unit testing focuses on testing individual parts (units) of the code, usually functions or methods, to ensure they behave as expected. These tests are done in isolation, meaning no other parts of the application are tested together with the unit being tested.

**Example:**
In a calculator app, a unit test could check whether a function like `add(a, b)` correctly returns the sum of two numbers.

```javascript
// Unit Test Example for add function
function add(a, b) {
  return a + b;
}

// Unit Test for add function
console.assert(add(2, 3) === 5, "Test Failed: 2 + 3 should equal 5");
console.assert(add(-1, 1) === 0, "Test Failed: -1 + 1 should equal 0");
```

---

## 3. Integration Testing

Integration testing focuses on testing how different units (or modules) of the software work together. The goal is to ensure that the components, when integrated, communicate properly and produce the desired result.

**Example:**
In the calculator app, you might have separate functions for addition, subtraction, and displaying results. An integration test would check if pressing "2", "+", "3", and then "=" gives the correct result (5) on the screen.

```javascript
// Integration Test Example for a calculator operation
function calculateExpression(a, b, operator) {
  if (operator === "+") {
    return add(a, b);
  }
  // Other operators like - can be added here
}

// Integration Test
console.assert(
  calculateExpression(2, 3, "+") === 5,
  "Test Failed: 2 + 3 should equal 5"
);
```

---

## 4. Functional Testing

Functional testing focuses on testing the software from the user’s perspective. It ensures that the system works as a whole and performs the tasks it was designed for. It tests the user interface, input, output, and overall behavior without looking at the internal code.

**Example:**
In the calculator app, a functional test would simulate a user pressing the buttons (e.g., pressing "2", "+", "3", "=") and check if the result displayed is correct.

In a browser-based app, this could be done using a tool like Selenium or Cypress, which interacts with the app as a user would.

```javascript
// Pseudocode for Functional Test
simulateButtonClick("2");
simulateButtonClick("+");
simulateButtonClick("3");
simulateButtonClick("=");
assertDisplayedResultIs(5); // The result displayed on the screen should be 5
```

---

## Summary:

- **Testing** ensures your software works as intended.
- **Unit Testing** checks individual pieces of code (like functions).
- **Integration Testing** checks how pieces of code work together.
- **Functional Testing** checks if the entire system works from a user’s perspective.
