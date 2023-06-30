"use client";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

import Button from "./components/button";
import TaskForm from "./components/taskForm";
import TaskList from "./components/taskList";
import TodoContext from "./context/todo";

export default function Home() {
  const { data: session } = useSession();
  const [reloadCount, setReloadCount] = useState(0);
  const [editingTask, setEditingTask] = useState({ state: false, id: "" });
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");

  const saveTask = (e) => {
    e.preventDefault();
    if (editingTask.state) {
      const updatedTask = { _id: editingTask.id, task, note };
      axios.patch("api/todos", updatedTask).then(() => {
        setReloadCount(reloadCount + 1);
        setTask("");
        setNote("");
        setEditingTask({ state: false, id: "" });
      });
    } else {
      axios
        .post("/api/todos", {
          userID: session.user.id,
          task,
          note,
          isComplete: false,
        })
        .then(() => {
          setReloadCount(reloadCount + 1);
          setTask("");
          setNote("");
        });
    }
  };

  const completeTask = (e) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    let task = tasks.filter((task) => {
      return task._id === id;
    });

    task[0].isComplete = task[0].isComplete ? false : true;
    axios
      .patch("api/todos", task[0])
      .then(({ data }) => {
        return data;
      })
      .then((result) => {
        if (result.acknowledged && result.modifiedCount === 1) {
          setReloadCount((prev) => prev + 1);
        }
      });
  };

  const deleteTask = (e) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    axios.delete(`/api/todos/${id}`).then(({ data }) => {
      if (data.acknowledged && data.deletedCount === 1) {
        setReloadCount((prev) => prev + 1);
      }
    });
  };

  const editTask = (e) => {
    const { id } = e.currentTarget;
    setEditingTask({ state: true, id: id });
    let task = tasks.filter((task) => {
      return task._id === id;
    })[0];
    setTask(task.task);
    setNote(task.note);
  };

  const cancelTaskEdit = () => {
    setNote("");
    setTask("");
    if (editingTask.state) {
      setEditingTask({ state: false, id: "" });
    }
  };

  if (session) {
    return (
      <div className="h-screen">
        <TodoContext.Provider
          value={{
            reloadCount,
            setReloadCount,
            tasks,
            setTasks,
            task,
            setTask,
            note,
            setNote,
            editingTask,
            setEditingTask,
            saveTask,
            completeTask,
            deleteTask,
            editTask,
            cancelTaskEdit,
          }}
        >
          <div className="md:grid md:grid-cols-12 h-full">
            <div className="col-span-5">
              <TaskForm />
            </div>
            <div className="col-span-7">
              <TaskList />
            </div>
          </div>
        </TodoContext.Provider>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-full flex items-center">
        <div className=" w-full text-center">
          <Button
            className="px-4 py-2 bg-blue-600 text-white rounded-full drop-shadow hover:drop-shadow-lg"
            onClick={() => signIn("google")}
            label="Sign in with Google"
            type="submit"
          />
        </div>
      </div>
    );
  }
}
