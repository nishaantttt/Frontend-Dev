// Q6 – E-Commerce Dashboard: Product Card Fetcher
// File: q6_ecommerce_dashboard_product_fetcher.js

// NOTE: In Node.js, ensure you are using Node 18+ (global fetch) or run in a browser.

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

async function fetchProducts() {
  try {
    console.log("Fetching products from Fake Store API...");

    const response = await fetch(PRODUCTS_API_URL);

    if (!response.ok) {
      // HTTP error (4xx / 5xx)
      throw new Error("Network response was not ok: " + response.status);
    }

    const products = await response.json();

    // Log product details
    products.forEach((product) => {
      console.log("Product:", product.title);
      console.log("Price: $" + product.price);
      console.log("Image:", product.image);
      console.log("-----------");
    });

    // Bonus: Create HTML product cards if running in a browser
    if (typeof document !== "undefined") {
      const container =
        document.getElementById("products") ||
        document.body.appendChild(document.createElement("div"));

      container.id = container.id || "products";

      products.forEach((product) => {
        const card = document.createElement("div");
        card.style.border = "1px solid #ccc";
        card.style.margin = "8px";
        card.style.padding = "8px";
        card.style.width = "220px";

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;
        img.style.maxWidth = "200px";

        const title = document.createElement("h4");
        title.textContent = product.title;

        const price = document.createElement("p");
        price.textContent = "Price: $" + product.price;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        container.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Failed to load products. Please try again.");
    console.error("Detailed error:", error.message);
  }
}

// Uncomment to test:
// fetchProducts();
