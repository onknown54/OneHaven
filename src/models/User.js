import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  supabaseId: { type: String, unique: true, sparse: true, index: true },
  age: Number,
  tags: [String],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("User", userSchema);
