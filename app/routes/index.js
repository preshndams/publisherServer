"use strict";
import { errorMessage } from "iyasunday";
import Topic from "../module/topic";
import Subscriber from '../module/subscribe';
import Publish from '../module/publish'

export default (app) => {
  app.use("/", Topic);
  app.use("/", Subscriber)
  app.use("/", Publish)

  //error Handler
  app.use((err, req, res, next) => {
    if (!err) next();
    res.status(err.status || err.httpStatusCode || 500).json(errorMessage(err));
  });

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: `Requested route ( ${req.get("HOST")}${
        req.originalUrl
      } ) not found`,
      service: `${process.env.APP_NAME}`,
    });
  });
};
