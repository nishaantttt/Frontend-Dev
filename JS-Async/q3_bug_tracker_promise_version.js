// Q3 – Bug Tracker: Callback to Promise Migration
// File: q3_bug_tracker_promise_version.js

// Original (for reference):
// function fetchBugs(callback) {
//   setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
// }

// Modern Promise-based version
function getBugs() {
  return new Promise((resolve, reject) => {
    console.log("Fetching bugs from server...");
    const shouldFail = Math.random() < 0.3; // ~30% failure chance

    setTimeout(() => {
      if (shouldFail) {
        return reject(new Error("Failed to fetch bugs from API."));
      }

      const bugs = ["UI glitch", "API timeout", "Login failure"];
      resolve(bugs);
    }, 1000);
  });
}

// Usage
getBugs()
  .then((bugs) => {
    console.log("Bugs received:");
    // console.table logs array as a table
    console.table(bugs);
  })
  .catch((err) => {
    console.error("Error:", err.message);
  });
