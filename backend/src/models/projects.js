const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachments: [
      {
        type: {
          type: String,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    collabrates: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    visible: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
    thumbnail: {
      type: String,
    },
    video: {
      type: String,
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
