// Q8 – Order Processing Flow: Async Retry Mechanism
// File: q8_order_processing_retry.js

// submitOrder() fails 50% of the time
function submitOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() >= 0.5; // 50% chance
      if (success) {
        resolve("Order submitted successfully.");
      } else {
        reject(new Error("Random API failure while submitting order."));
      }
    }, 500); // small delay for each attempt
  });
}

async function processOrder(maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await submitOrder();
      console.log(`Attempt ${attempt}: Success -> ${result}`);
      return; // stop after success
    } catch (err) {
      console.log(`Attempt ${attempt}: Failed -> ${err.message}`);
      if (attempt === maxAttempts) {
        // Last attempt also failed
        throw new Error("Order could not be processed");
      }
      // Otherwise, loop continues for next attempt
    }
  }
}

// Top-level handler with try/catch
(async () => {
  try {
    console.log("Starting order processing with retry logic...");
    await processOrder(3);
    console.log("Order processing completed.");
  } catch (error) {
    console.error("Final error:", error.message);
  }
})();
