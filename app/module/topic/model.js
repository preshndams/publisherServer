"use strict";
import { DataTypes, NOW } from "sequelize";
import db, { uuid } from "../../utils/db";

export const TABLE = "topic"

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
  title:{
      type:DataTypes.CHAR(20),
      allowNull: false,
      unique: true
  }
};

const Topic = db.define(TABLE, schema);
Topic.table = TABLE;

Topic.beforeCreate((value) => {
  if (value) value.id = uuid.toBinary();
});

export default Topic