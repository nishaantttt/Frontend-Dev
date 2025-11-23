// Q2 – Task Scheduler: Micro vs Macro Challenge
// File: q2_task_scheduler_micro_vs_macro.js

// Expected log order (before you run it):
// 1. "Start"         (synchronous)
// 2. "Synchronous log inside code" (synchronous)
// 3. "End"           (synchronous)
// 4. "Promise then (microtask)"
// 5. "setTimeout callback (macrotask)"
//
// Reason (in short):
// - All synchronous code runs first.
// - Then the event loop processes the microtask queue (Promises).
// - After microtasks, it processes macrotasks (like setTimeout).

console.log("Start");

setTimeout(() => {
  console.log("setTimeout callback (macrotask)");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise then (microtask)");
  });

console.log("Synchronous log inside code");
console.log("End");

// Explanation in comments:
// - Even though setTimeout has 0ms delay, it goes into the macrotask queue.
// - Promise.then callbacks go into the microtask queue.
// - After the main script finishes, the JS engine:
//   1. Flushes all microtasks.
//   2. Then processes macrotasks (timers, I/O, etc).
