"use strict";
import { DataTypes } from "sequelize";
import db, { uuid } from "../../utils/db";
import Topic from "../topic/model";

export const TABLE = "message";

const schema = {
  id: {
    type: "BINARY(16)",
    primaryKey: true,
    get() {
      return uuid.toString(this.getDataValue("id"));
    },
    set(value) {
      this.setDataValue("id", uuid.toBinary(value));
    },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
};

const Message = db.define(TABLE, schema, {
  indexes: [
    {
      fields: ["topicId"],
    },
  ],
});
Message.table = TABLE;

Topic.hasMany(Message, { onDelete: "cascade" });

Message.beforeCreate((value) => {
  if (value) value.id = uuid.toBinary();
  value.topicId = uuid.toBinary(value.topicId);
});

export default Message;
