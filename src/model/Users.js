const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      trim: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is Invalid.");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
      required: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('password must not contain "password"');
        }
      },
    },
    address: {
      type: String,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamp: true }
);

//for hiding password and tokens array
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

//generating user token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET_KEY
  );
  //for expiresIn
  /**Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count.
   *  If you use a string be sure you provide the time units (days, hours, etc),
   * otherwise milliseconds unit is used by default ("120" is equal to "120ms"). */
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

//checking email and password for login for /users/login
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

//MIDDLEWARE :hashing the plain text password
userSchema.pre("save", async function (next) {
  //console.log("In the save pre");
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
