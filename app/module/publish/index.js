import { Router } from "express";
import { joiValidator } from "iyasunday";
import validation from "./validation";
import * as controller from "./controller";

const route = Router();

route.post(
  "/publish/:topicId",
  joiValidator(validation.create),
  controller.create
);

route.get(
  "/publish/message",
  joiValidator(validation.viewMessage),
  controller.viewMessage
);

export default route;
