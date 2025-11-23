// Q5 – Frontend Rush: Avoiding Callback Hell
// File: q5_frontend_rush_callback_vs_async_await.js

// ---- VERSION 1: Callback Hell ----

// Each stage uses a callback after 1 second
function design(callback) {
  setTimeout(() => {
    console.log("Stage 1: Design complete");
    callback();
  }, 1000);
}

function build(callback) {
  setTimeout(() => {
    console.log("Stage 2: Build complete");
    callback();
  }, 1000);
}

function test(callback) {
  setTimeout(() => {
    console.log("Stage 3: Test complete");
    callback();
  }, 1000);
}

function deploy(callback) {
  setTimeout(() => {
    console.log("Stage 4: Deploy complete");
    callback();
  }, 1000);
}

function celebrate(callback) {
  setTimeout(() => {
    console.log("Stage 5: Celebrate 🎉");
    callback && callback();
  }, 1000);
}

// Callback Hell chain
function runPipelineWithCallbacks() {
  console.log("Running pipeline with nested callbacks (callback hell):");
  design(() => {
    build(() => {
      test(() => {
        deploy(() => {
          celebrate(() => {
            console.log("Pipeline finished (callback version).");
          });
        });
      });
    });
  });
}

// ---- VERSION 2: async/await ----

// Promise-based versions of each stage
function designAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Stage 1: Design complete");
      resolve();
    }, 1000);
  });
}

function buildAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Stage 2: Build complete");
      resolve();
    }, 1000);
  });
}

function testAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Stage 3: Test complete");
      resolve();
    }, 1000);
  });
}

function deployAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Stage 4: Deploy complete");
      resolve();
    }, 1000);
  });
}

function celebrateAsync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Stage 5: Celebrate 🎉");
      resolve();
    }, 1000);
  });
}

async function runPipelineAsync() {
  console.log("Running pipeline with async/await:");
  await designAsync();
  await buildAsync();
  await testAsync();
  await deployAsync();
  await celebrateAsync();
  console.log("Pipeline finished (async/await version).");
}

// Why async/await is better (summary):
// - No deep nesting, just straight top-to-bottom flow.
// - Easier to read, debug, and add try/catch around the whole pipeline.

// Uncomment to test:
// runPipelineWithCallbacks();
// runPipelineAsync();