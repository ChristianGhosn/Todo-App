import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  userID: { type: Schema.Types.ObjectId, ref: "Users" },
  task: String,
  note: String,
  isComplete: Boolean,
});

const Task = models.Task || model("Task", taskSchema);
export default Task;
