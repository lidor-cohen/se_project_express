const { Schema, model } = require("mongoose");
const { isURL, isEmail } = require("validator");
const bcrypt = require("bcryptjs");

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
      validator(val) {
        return isURL(val);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(val) {
        return isEmail(val);
      },
      message: "You must enter a valid Email",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials({
  email,
  password,
}) {
  return this.findOne({ email, password }).then((user) => {
    if (!user) return Promise.reject(new Error("Incorrect email or password"));

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched)
        return Promise.reject(new Error("Incorrect email or password"));

      return user;
    });
  });
};

module.exports = model("user", userSchema);
