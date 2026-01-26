import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

// Load header and footer
loadHeaderFooter();

// Create and generate alert
const a = new Alert(
  document.getElementById("atemp"),
  document.getElementById("alertHolder"),
);
a.generateAlert();
