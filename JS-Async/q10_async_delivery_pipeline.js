// Q10 – The Final Delivery: Async Pipeline Debugger
// File: q10_async_delivery_pipeline.js

// Helper: random delay between 1–2 seconds
function randomDelay() {
  return 1000 + Math.floor(Math.random() * 1000);
}

// Helper: random failure (30% chance)
function shouldFail() {
  return Math.random() < 0.3;
}

// Each step returns a Promise with random delay and possible failure.
// Comments explain how async + event loop work.

function takeOrder() {
  return new Promise((resolve, reject) => {
    console.log("Step 1: Taking order...");
    setTimeout(() => {
      if (shouldFail()) {
        return reject(new Error("Failed to take order."));
      }
      console.log("Step 1: Order taken");
      resolve();
    }, randomDelay());
  });
}

function prepare() {
  return new Promise((resolve, reject) => {
    console.log("Step 2: Preparing food...");
    setTimeout(() => {
      if (shouldFail()) {
        return reject(new Error("Failed to prepare food."));
      }
      console.log("Step 2: Food prepared");
      resolve();
    }, randomDelay());
  });
}

function pack() {
  return new Promise((resolve, reject) => {
    console.log("Step 3: Packing order...");
    setTimeout(() => {
      if (shouldFail()) {
        return reject(new Error("Failed to pack order."));
      }
      console.log("Step 3: Package ready");
      resolve();
    }, randomDelay());
  });
}

function dispatch() {
  return new Promise((resolve, reject) => {
    console.log("Step 4: Dispatching order...");
    setTimeout(() => {
      if (shouldFail()) {
        return reject(new Error("Failed to dispatch order."));
      }
      console.log("Step 4: Out for delivery");
      resolve();
    }, randomDelay());
  });
}

function deliver() {
  return new Promise((resolve, reject) => {
    console.log("Step 5: Delivering order...");
    setTimeout(() => {
      if (shouldFail()) {
        return reject(new Error("Failed to deliver order."));
      }
      console.log("Step 5: Delivery completed!");
      resolve();
    }, randomDelay());
  });
}

// runPipeline uses async/await to keep the flow linear and readable.
// Even though each step is asynchronous (setTimeout -> event loop),
// async/await lets us "pause" at each step until the Promise resolves/rejects.
//
// Control flow explanation:
// - JS executes runPipeline() until it hits an 'await', then:
//   * It schedules the rest of the function as a microtask.
//   * The Promise being awaited will resolve/reject later (after setTimeout).
// - While waiting, the main thread is free (non-blocking).
// - When the Promise settles, its resolution/rejection is queued as a microtask;
//   then the rest of runPipeline continues.

async function runPipeline() {
  console.log("Start Pipeline");

  try {
    await takeOrder();
    await prepare();
    await pack();
    await dispatch();
    await deliver();

    console.log("Delivery completed! (All steps succeeded)");
  } catch (error) {
    console.error("Pipeline failed!", error.message);
  }
}

// Uncomment to test:
// runPipeline();

