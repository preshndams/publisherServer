"use strict";
import { NotFoundError } from "iyasunday";
import db, { uuid } from "../../utils/db";
import Topic from "../topic/model";
import Subscriber from "./model";

export async function create({ topicId }, { url }) {
  return await db.transaction(async (transaction) => {
    let topic = await Topic.findByPk(uuid.toBinary(topicId, 1));
    if (!topic) throw new NotFoundError("Topic not Found");

    await Subscriber.create(
      {
        url,
        topicId,
      },
      { transaction }
    );

    let data = {
      url,
      topic: topic.title,
    };

    return {
      success: true,
      data,
    };
  });
}
