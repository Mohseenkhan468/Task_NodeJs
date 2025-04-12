import express from "express";
import "dotenv/config";
import indexRouter from "./routes/index.router.js";
import { errorHandler } from "./middlewares/error.handler.middleware.js";
function initializeApp() {
  const app = express();
  app.use(express.json())
  app.use("/api", indexRouter);
  app.use(errorHandler)
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
}

initializeApp();
