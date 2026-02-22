import app from "./src/app.js";

if (typeof app !== "function") {
  throw new Error("Express app export is invalid");
}

console.log("Server smoke test passed");
