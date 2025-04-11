const { Schema, model } = require("mongoose");
var { isURL } = require("validator");

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
    validate: {
      validator: function (val) {
        return isURL(val);
      },
      message: "You must enter a valid URL",
    },
  },
});

module.exports = model("user", userSchema);
