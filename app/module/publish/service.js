"use strict";
import { NotFoundError, ValidationError } from "iyasunday";
import db, { uuid } from "../../utils/db";
import Topic from "../topic/model";
import Message from "../publish/model";
import Subscriber from "../subscribe/model";

export async function create({ topicId }, { message }) {
  return await db.transaction(async (transaction) => {
    let topic = await Topic.findByPk(uuid.toBinary(topicId, 1));
    if (!topic) throw new NotFoundError("Topic not Found");

    await Message.create(
      {
        message,
        topicId,
      },
      { transaction }
    );

    return {
      success: true,
      message: "Message Published Successfully",
    };
  });
}

export async function viewMessage({ link }) {
  try{
    let topic = await db.query(
      `
      SELECT 
      BIN_TO_UUID(${"t1.topicId"}, 1)topicId, t1.url, t2.title
      FROM subscribers t1
      LEFT JOIN topics t2
      ON t1.topicId = t2.id
      where t1.url = '${link}'
    `,
      { type: db.QueryTypes.SELECT }
    );

    if (topic == "") throw new NotFoundError("Not subscribed to a topic");

    let data = await db.query(
      `
      SELECT t1.message, t2.title, t3.url, t1.createdAt
      FROM messages t1
      LEFT JOIN topics t2
      ON t1.topicId = t2.id
      LEFT JOIN subscribers t3
      ON t3.topicId = t1.topicId
      WHERE t3.url = '${link}'
      GROUP BY t1.id

    `,
      { type: db.QueryTypes.SELECT }
    );

    return {
      success: true,
      data,
    };
  }catch(err){
    throw err;
  }
}
