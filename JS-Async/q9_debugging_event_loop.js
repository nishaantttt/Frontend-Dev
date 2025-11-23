// Q9 – Debugging the Event Loop
// File: q9_debugging_event_loop.js

// Predicted output order BEFORE running:
//
// 1. "Script start"   (synchronous)
// 2. "Script end"     (synchronous)
// 3. "Promise callback"   (microtask)
// 4. "Timeout callback"   (macrotask)
//
// Reason:
// - Synchronous logs run immediately.
// - Promise callbacks go to the microtask queue.
// - setTimeout callbacks go to the macrotask queue.
// - After the main script finishes, the engine flushes microtasks first,
//   then it processes macrotasks like setTimeout.

console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

// After you run it, the actual output order matches the predicted order.
// This confirms that microtasks (Promises) are executed before macrotasks
// (setTimeout) once the current call stack is empty.
