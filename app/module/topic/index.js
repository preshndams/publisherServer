import { Router } from "express";
import { joiValidator } from "iyasunday";
import validation from "./validation";
import * as controller from './controller';

const route = Router();

route.post(
    "/topic/create",
    joiValidator(validation.create),
    controller.create
)

route.get(
    "/topic/list",
    controller.list
)


export default route;