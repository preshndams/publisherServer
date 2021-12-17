import express from "express";
import Middlewares from "./app/routes/middlewares";
import Routes from "./app/routes";
import db from "./app/utils/db";

const app = express();
const PORT = process.env.APP_PORT;

Middlewares(app);
Routes(app);

(async () => {
  try {
    await db.sync();
    app.listen(PORT, (err) => {
      if (err) {
        console.log("Server connection failed");
        throw err;
      }

      console.log("Connection established on port " + PORT);
    });
  } catch (err) {
    console.log("Database Connection Error");
    throw err;
  }
})();

