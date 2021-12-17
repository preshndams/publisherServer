"use strict";
import { DataTypes } from "sequelize";
import db, { uuid } from "../../utils/db";
import Topic from "../topic/model";

export const TABLE = "subscribers";

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
  url: {
    type: DataTypes.CHAR(50),
    allowNull: false,
    unique: true,
  },
};

const Subscriber = db.define(TABLE, schema, {
  indexes: [
    {
      fields: ["topicId"],
    },
  ],
});
Subscriber.table = TABLE;

Topic.hasMany(Subscriber, { onDelete: "cascade" });

Subscriber.beforeCreate((value) => {
  if (value) value.id = uuid.toBinary();
  value.topicId = uuid.toBinary(value.topicId);
});

export default Subscriber;
