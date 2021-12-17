"use strict";
import db from "../../utils/db";
import Topic from "./model";

export async function create({ title }) {
  return await db.transaction(async (transaction) => {
    await Topic.create(
      {
        title,
      },
      { transaction }
    );

    return {
      success: true,
      message: "Topic created ",
    };
  });
}

export async function list() {
  return await db.transaction(async (transaction) => {
    let data = await Topic.findAll();

    return {
      success: true,
      data,
    };
  });
}
