// Q1 – The Startup Morning: Async Coffee Maker
// File: q1_async_coffee.js

// Helper: random delay between 1–2 seconds
function randomDelay() {
  return 1000 + Math.floor(Math.random() * 1000); // 1000–1999 ms
}

// Helper: random failure (about 30% chance)
function shouldFail() {
  return Math.random() < 0.3;
}

function boilWater() {
  return new Promise((resolve, reject) => {
    console.log("Step 1: Boiling water...");
    setTimeout(() => {
      if (shouldFail()) {
        return reject(new Error("Kettle malfunctioned while boiling water."));
      }
      console.log("Water boiled.");
      resolve("Hot water");
    }, randomDelay());
  });
}

function brewCoffee(hotWater) {
  return new Promise((resolve, reject) => {
    console.log("Step 2: Brewing coffee...");
    setTimeout(() => {
      if (shouldFail()) {
        return reject(new Error("Coffee machine jammed while brewing."));
      }
      console.log("Coffee brewed using:", hotWater);
      resolve("Brewed coffee");
    }, randomDelay());
  });
}

function pourCoffee(brewedCoffee) {
  return new Promise((resolve, reject) => {
    console.log("Step 3: Pouring coffee into cup...");
    setTimeout(() => {
      if (shouldFail()) {
        return reject(new Error("Cup slipped while pouring coffee."));
      }
      console.log("Coffee poured:", brewedCoffee);
      resolve("Coffee ready for the team!");
    }, randomDelay());
  });
}

// Promise chaining
boilWater()
  .then((hotWater) => brewCoffee(hotWater))
  .then((brew) => pourCoffee(brew))
  .then((finalMsg) => {
    console.log(finalMsg);
  })
  .catch((err) => {
    console.error("Coffee process failed:", err.message);
  });
