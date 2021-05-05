const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  exercises: [{ description: String, duration: Number, date: Date }],
});

module.exports = { User: model("User", userSchema) };
