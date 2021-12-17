import { Router } from "express";
import { joiValidator } from "iyasunday";
import validation from "./validation";
import * as controller from "./controller";

const route = Router();

route.post(
  "/subscribe/:topicId",
  joiValidator(validation.create),
  controller.create
);

export default route;
