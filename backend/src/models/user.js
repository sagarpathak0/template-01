const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const generateUsername = require("../utils/usernameGen");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    gender: {
      type: String,
    },
    uid: {
      type: String,
    },
    projectsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    friendsId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    username: {
      type: String,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

    if (!user.profilePic) {
      const genderPrefix = user.gender === "male" ? "boy" : "girl";
      user.profilePic = `https://avatar.iran.liara.run/public/${genderPrefix}?username=${user.username}`;
    }

    if (!user.username) {
      user.username = generateUsername(this.email, this.name);
    }
    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
