import { useContext } from "react";

import Button from "./button";
import TodoContext from "../context/todo";

const TaskForm = () => {
  const { task, setTask, note, setNote, saveTask, cancelTaskEdit } =
    useContext(TodoContext);

  return (
    <div className="my-4 mx-2 px-5 py-4 border rounded-2xl h-fit">
      <form>
        <h1>Task</h1>
        <div className="flex-row">
          <div className="my-2">
            <input
              className="border rounded-lg px-3 py-1 w-full"
              type="text"
              placeholder="Task..."
              name="task"
              id="task"
              onChange={({ currentTarget }) => setTask(currentTarget.value)}
              value={task}
            />
          </div>
          <div className="my-2">
            <input
              className="border rounded-lg px-3 py-1 w-full"
              type="text"
              placeholder="Note..."
              name="note"
              id="note"
              onChange={({ currentTarget }) => setNote(currentTarget.value)}
              value={note}
            />
          </div>
        </div>
        <div className="flex-row gap-2">
          <Button
            type="submit"
            className="px-2 py-1 my-2 rounded-full bg-blue-600 text-white w-full drop-shadow"
            label="Save Task"
            onClick={saveTask}
          />
          <Button
            type="button"
            className="px-2 py-1 mb-2 rounded-full border border-blue-600 text-blue-600 w-full drop-shadow"
            label="Cancel"
            onClick={cancelTaskEdit}
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
