const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validation: {
      validator: (val) =>
        val.startsWith("http://") || val.startsWith("https://"),
    },
  },
});

module.exports = model("user", userSchema);
