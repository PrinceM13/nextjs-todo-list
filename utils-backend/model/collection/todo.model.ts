import mongoose, { Schema, Model, Types } from "mongoose";

const todoSchema = new Schema(
  {
    topic: { type: String, required: true },
    detail: String,
    dueDate: String,
    member: [
      {
        user_id: { type: Types.ObjectId },
        name: { type: String }
      }
    ],
    status: { type: Boolean, default: false },
    view: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const TodoModel: Model<any> = mongoose.models.todo || mongoose.model("todo", todoSchema);

export default TodoModel;
