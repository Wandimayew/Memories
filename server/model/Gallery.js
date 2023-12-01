import mongoose from "mongoose";
const schema = mongoose.Schema;
const gallery = new schema({
  user: {
    type: schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  detail: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: false,
  },
  file: {
    public_id: {
      type: String,
      required: true,
    },
  },
});

const gallerys = mongoose.model("Gallery", gallery);
export default gallerys;
