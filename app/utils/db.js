"use strict";
import Sequelize from "sequelize";
import { v1 as uuidV1, validate as UUIDValidaton } from "uuid";

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const uuid = {
  toBinary: (uuid) => {
    if (!uuid) uuid = uuidV1();
    else if (typeof uuid !== "string" && Buffer.isBuffer(uuid)) return uuid;
    const buf = Buffer.from(uuid.replace(/-/g, ""), "hex");
    return Buffer.concat([
      buf.slice(6, 8),
      buf.slice(4, 6),
      buf.slice(0, 4),
      buf.slice(8, 16),
    ]);
  },
  toString: (binary) => {
    if (!binary) throw new Error("Kindly supply binary UUID value");
    if (typeof binary === "string") return binary;
    return [
      binary.toString("hex", 4, 8),
      binary.toString("hex", 2, 4),
      binary.toString("hex", 0, 2),
      binary.toString("hex", 8, 10),
      binary.toString("hex", 10, 16),
    ].join("-");
  },
  
  get: () => uuidV1(),
  isValid: (uuid) => UUIDValidaton(uuid),
  mysqlUUID: (field) => [
    Sequelize.fn("BIN_TO_UUID", Sequelize.col(field), 1),
    field,
  ],
};

export const DB_TABLES = {
  TOPIC: "topic",
  TOPIC_SUBSCRIBER: "topic_subscribers",
  MESSAGE: "message"
};

export default db;
