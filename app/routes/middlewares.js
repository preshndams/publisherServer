import { json, urlencoded } from "express";
import cors from "cors";

export default (app) => {
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cors());
};
