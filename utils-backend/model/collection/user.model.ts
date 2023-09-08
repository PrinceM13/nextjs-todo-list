import mongoose, { Schema, model, Model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  session: String,
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now }
});

export const UserModel: Model<any> = mongoose.models.user || model("user", userSchema);

export default UserModel;
