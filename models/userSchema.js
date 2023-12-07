const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "please enter a valid email address",
    },


  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  },
});


userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();

});

userSchema.methods.checkPassword = async function (
  docPassword,
  clientPassword
) {
  console.log(docPassword,'/////docPassword');
  console.log(clientPassword,'/////clientPassword');

  return await bcrypt.compare(docPassword, clientPassword);
};

const User = mongoose.model("User", userSchema); 

module.exports = User;
