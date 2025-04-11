import express from "express";
import "dotenv/config";
import indexRouter from "./routes/index.router.js";
function initializeApp() {
  const app = express();
  app.use("/api", indexRouter);
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
}

initializeApp();
