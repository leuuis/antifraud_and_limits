# antifraud_and_limits

Proyecto TypeScript para la lógica de detección de fraude y límites de gasto.

## Requisitos

- Node.js 24
- npm

## Inicializar el entorno con Node 24

Si usas `nvm`, ejecuta estos comandos en la raíz del proyecto:

```bash
nvm install 24
nvm use 24
npm install
```

Si ya tienes `nvm` instalado y Node 24 configurado globalmente, puedes simplemente ejecutar:

```bash
node -v
npm install
```

> Verifica que la versión de Node sea 24.x antes de continuar.

## Ejecutar los tests

Para correr la suite de pruebas:

```bash
npm test
```

También puedes ejecutar Vitest directamente:

```bash
npx vitest run
```

Modo observador durante desarrollo:

```bash
npx vitest
```

## Estructura principal

```txt
antifraud_and_limits/
├── fraudDetectorSystem.ts
├── fraudDetectorSystemInterface.ts
├── specs/
│   └── fraudDetectorSystem.test.ts
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Notas

- El proyecto usa TypeScript + Vitest.
- La prueba principal se ejecuta con `npm test`.
- Si aparece un error de dependencias, vuelve a ejecutar `npm install` dentro del proyecto.

---
## ⏱️ Coding Excercise 
* **Architecture Style:** Progressive Fraud Detection and Limits System with Automated Unit Tests.

## 📋 LEVEL 1: Transaction Recording & Balances

### Description
Your task is to implement a core infrastructure subsystem for real-time fraud detection that processes user expenditures. Initially, the system contains no transaction history.

Implement the following two operations:
* `addTransaction(userId: string, amount: number): number` — Should register a new transaction with a positive integer `amount` for the specified `userId`. It must calculate and return the **total cumulative balance** spent by this user *after* the new transaction is recorded.
* `getBalance(userId: string): number` — Should look up the specified `userId` and return their current total cumulative balance. If the user does not exist in the system or has no recorded transactions, this method must return `0`.

### Examples
```typescript
addTransaction("user_A", 10)  // returns 10  -> user_A state: [10] (Total: 10)
addTransaction("user_A", 50)  // returns 60  -> user_A state: [10, 50] (Total: 60)
addTransaction("user_B", 100) // returns 100 -> user_B state: [100] (Total: 100)
getBalance("user_A")          // returns 60
getBalance("user_C")          // returns 0   (user does not exist)
```

---

## 📋 LEVEL 2: User Median Spend (Progressive Unlocked 🔓)

### Description
The system now needs to support statistical risk analysis by monitoring individual user spending habits. You must calculate the median of the transactions stored for a given user.

Implement the following operation:
* `getMedianSpent(userId: string): number | null` — Should return the median transaction value for the specified `userId` after all of their personal transactions are sorted in ascending order.
  * **Even Length Rule:** If the user has an even number of transactions, the **leftmost integer** from the two middle values must be returned.
  * **Empty State Rule:** If the user does not exist or has no transactions, the method must return `null`.
  * *Note:* This calculation must not corrupt or permanently change the chronological order of the transaction log inside your system.

### Examples
```typescript
// Assuming user_X has no prior transactions
getMedianSpent("user_X")   // returns null

addTransaction("user_X", 50)
addTransaction("user_X", 10)
addTransaction("user_X", 100) 
// Chronological: [50, 10, 100] | Sorted sequence: [10, 50, 100] (Odd length)
getMedianSpent("user_X")   // returns 50 (The absolute middle element)

addTransaction("user_X", 40)
// Chronological: [50, 10, 100, 40] | Sorted sequence: [10, 40, 50, 100] (Even length)
// Middle pair: 40 and 50. Leftmost is 40.
getMedianSpent("user_X")   // returns 40
```

---

## 📋 LEVEL 3: Top VIP Spenders (Progressive Unlocked 🔓)

### Description
To detect high-profile volume accounts and cross-reference system thresholds, the platform requires a tracking utility to extract the top consumers across the entire global system state.

Implement the following operation:
* `getTopSpenders(k: number): string[]` — Should evaluate all unique users currently registered in the system and return an array containing the `userId` strings of the top `k` users who have the **highest total cumulative balance**.
  * **Tie-Breaking Rule:** If two or more users have identical total cumulative balances, they must be sorted **alphabetically (lexicographically ascending, A to Z)** by their `userId`.
  * **Boundaries:** If `k` is greater than the total number of unique users in the system, return all unique users sorted according to the criteria above.

### Examples
```typescript
// System State:
// user_A total balance: 50
// user_B total balance: 150
// user_C total balance: 50

getTopSpenders(1) // returns ["user_B"] (Absolute highest spender)
getTopSpenders(3) // returns ["user_B", "user_A", "user_C"] 
                  // Note: user_A and user_C tied at 50, so "user_A" comes before "user_C" alphabetically.
```

## 📋 LEVEL 4: Transaction Expiry & Rolling Fraud Windows (Progressive Unlocked 🔓)

### Description
To prevent stale data from triggering false fraud alerts, the infrastructure layer must now support an automatic Time-To-Live (TTL) expiration mechanism. Every transaction will now include a `timestamp` integer (representing epoch milliseconds). 

A transaction is considered "Active" only if it was recorded within the last **X milliseconds** relative to the current query's timestamp. Any transaction older than the allowed window must be ignored in all balance, median, and top spender calculations.

Modify the existing system to support the following updated and new operations:

* `addTransactionWithTime(userId: string, amount: number, timestamp: number): number` — Registers a transaction. Before returning the total cumulative balance, it must drop/expire any transactions for this user that are older than `timestamp - 60000` (1-minute rolling window). Returns the updated active balance.
* `getTopSpendersAtTime(k: number, currentTimestamp: number): string[]` — Returns the top `k` spenders considering **ONLY** the transactions across the entire system that are currently active (age <= 60,000ms relative to `currentTimestamp`). Ties are still broken alphabetically.

## 🚀 Key Takeaways & Performance Optimizations

This repository was developed as a progressive coding challenge to simulate production-grade financial systems. Below are the key architectural decisions and performance optimizations implemented throughout the levels:

* **Data Structure Selection:** Utilized Native JavaScript `Map` objects for O(1) lookups when tracking cumulative balances and transaction history per user, ensuring the system remains scalable under a high volume of concurrent data.
* **Algorithmic Efficiency:** Maintained a strict worst-case time complexity of \(O(n \log n)\) across statistical operations. For instance, the user median spend evaluation was engineered to handle sorting boundaries safely without corrupting chronological transaction logs.
* **Pipeline Optimization:** Boosted runtime performance during data manipulation by strategic method chaining. Reordered execution flows—such as triggering slicing boundaries before mapping operations—to ensure the application processes the minimum possible payload in memory.
* **Enterprise-Grade Testing:** Implemented a robust automated testing suite using `Vitest` to enforce strict regression control, validate edge cases (such as tied spending balances and empty states), and guarantee structural integrity.
