// Q4 – DevOps Delay: Async Timeout Race
// File: q4_devops_delay_promise_race.js

function serverA() {
  return new Promise((resolve, reject) => {
    console.log("Server A: deployment started...");
    const shouldFail = Math.random() < 0.3;

    setTimeout(() => {
      if (shouldFail) {
        return reject(new Error("Server A failed to deploy."));
      }
      resolve("Server A deployed successfully.");
    }, 2000); // 2 seconds
  });
}

function serverB() {
  return new Promise((resolve, reject) => {
    console.log("Server B: deployment started...");
    const shouldFail = Math.random() < 0.3;

    setTimeout(() => {
      if (shouldFail) {
        return reject(new Error("Server B failed to deploy."));
      }
      resolve("Server B deployed successfully.");
    }, 3000); // 3 seconds
  });
}

// Track completion of all servers
Promise.all([serverA(), serverB()])
  .then((results) => {
    console.log("Deployment completed for all servers.");
    console.log(results);
  })
  .catch((err) => {
    console.error("Deployment error (Promise.all):", err.message);
  });

// Track fastest responder
Promise.race([serverA(), serverB()])
  .then((fastest) => {
    console.log("Fastest response:", fastest);
  })
  .catch((err) => {
    console.error("Fastest response failed (Promise.race):", err.message);
  });
