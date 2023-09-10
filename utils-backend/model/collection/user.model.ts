import mongoose, { Schema, model, Model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true },
    session: String,
    isActive: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const UserModel: Model<any> = mongoose.models.user || model("user", userSchema);

export default UserModel;
