import app from "./src/app.js";
import CONFIG from "./src/config/config.js";

app.listen(CONFIG.PORT, () =>
  console.log(`Server running on port ${CONFIG.PORT}`)
);
