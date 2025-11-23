// Q7 – The Lazy Loader: Promise Combinator Practice
// File: q7_lazy_loader_allsettled.js

// Original base functions, modified to allow random failure
function loadProfile() {
  return new Promise((resolve, reject) => {
    const shouldFail = Math.random() < 0.3; // 30% chance to fail
    setTimeout(() => {
      if (shouldFail) {
        return reject("Profile failed to load");
      }
      resolve("Profile Loaded");
    }, 2000);
  });
}

function loadPosts() {
  return new Promise((resolve, reject) => {
    const shouldFail = Math.random() < 0.3;
    setTimeout(() => {
      if (shouldFail) {
        return reject("Posts failed to load");
      }
      resolve("Posts Loaded");
    }, 1500);
  });
}

function loadMessages() {
  return new Promise((resolve, reject) => {
    const shouldFail = Math.random() < 0.3;
    setTimeout(() => {
      if (shouldFail) {
        return reject("Messages failed to load");
      }
      resolve("Messages Loaded");
    }, 1000);
  });
}

function loadDashboard() {
  const startTime = Date.now();
  console.log("Loading dashboard sections...");

  Promise.allSettled([loadProfile(), loadPosts(), loadMessages()])
    .then((results) => {
      const endTime = Date.now();
      const totalTimeMs = endTime - startTime;

      console.log("AllSettled results:");
      results.forEach((result, index) => {
        const moduleName =
          index === 0 ? "Profile" : index === 1 ? "Posts" : "Messages";

        if (result.status === "fulfilled") {
          console.log(`${moduleName}: SUCCESS ->`, result.value);
        } else {
          console.log(`${moduleName}: FAILED ->`, result.reason);
        }
      });

      console.log(`Total time taken: ${totalTimeMs} ms`);
    })
    .catch((err) => {
      // With allSettled, this .catch will almost never trigger,
      // because allSettled always resolves. But keep it for safety.
      console.error("Unexpected error:", err);
    });
}

// Uncomment to test:
// loadDashboard();
