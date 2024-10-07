
# ACID Properties in Databases

**ACID** is a set of properties that ensure reliable transactions in a database. A transaction is a group of operations that must either succeed completely or fail completely. The ACID properties ensure that transactions are handled safely, consistently, and reliably.

## What does ACID stand for?
- **A**tomicity
- **C**onsistency
- **I**solation
- **D**urability

---

### 1. Atomicity
**Atomicity** ensures that a transaction is all or nothing. Either all operations in the transaction succeed, or none of them do. If any part of the transaction fails, the entire transaction is rolled back, and the database remains unchanged.

#### Example:
When transferring money between two bank accounts:
- Step 1: Deduct money from the savings account.
- Step 2: Add money to the checking account.

If either of these steps fails, the whole transaction is rolled back, ensuring no partial transaction occurs.

---

### 2. Consistency
**Consistency** ensures that a transaction brings the database from one valid state to another. The database must follow rules like constraints and triggers before and after the transaction to maintain integrity.

#### Example:
If the bank has a rule that the total money in all accounts must remain constant, this rule is enforced during the transaction. If the rule is violated, the transaction will fail.

---

### 3. Isolation
**Isolation** ensures that multiple transactions can occur at the same time without affecting each other. Each transaction must appear as if it is the only one being processed, even if multiple transactions are happening in parallel.

#### Example:
If two people try to withdraw money from the same account at the same time, **Isolation** makes sure that both withdrawals are processed separately without interfering with each other.

---

### 4. Durability
**Durability** guarantees that once a transaction has been committed, it will remain in the database, even in the event of a system crash. The data is permanently saved.

#### Example:
After transferring money between two accounts, even if the system crashes or power is lost, the transferred money remains in the accounts.

---

## Code Example: ACID in Action (Using SQL)

```sql
START TRANSACTION;

-- Step 1: Deduct money from savings account
UPDATE accounts
SET balance = balance - 500
WHERE account_number = '123456'; -- Savings Account

-- Step 2: Add money to checking account
UPDATE accounts
SET balance = balance + 500
WHERE account_number = '654321'; -- Checking Account

-- Step 3: Commit the transaction (makes the changes permanent)
COMMIT;
```

- **START TRANSACTION**: Marks the beginning of the transaction.
- **UPDATE**: Deducts money from one account and adds it to another.
- **COMMIT**: If both steps succeed, the transaction is committed and changes are saved permanently.
- If any step fails, the transaction can be rolled back to ensure **Atomicity**.

---

## Conclusion
ACID properties ensure that databases handle transactions in a reliable, consistent, and safe manner. They prevent problems like half-completed operations, data corruption, or conflicting transactions, ensuring the database remains stable and trustworthy.
