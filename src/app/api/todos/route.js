import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import mongooseConnect from "@/app/lib/mongoose";

import Task from "../../models/task";

export async function GET() {
  await mongooseConnect();
  const { user } = await getServerSession(authOptions);
  let data = await Task.find({ userID: user.id });
  data = data.map((task) => {
    return {
      _id: task._id,
      task: task.task,
      note: task.note,
      isComplete: task.isComplete,
    };
  });
  return NextResponse.json(data);
}

export async function POST(request) {
  const data = await request.json();
  await mongooseConnect();
  const { userID, task, note, isComplete } = data;
  if (userID && task && note) {
    try {
      const result = await Task.create({ userID, task, note, isComplete });
      console.log(result);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
  return NextResponse.json({ message: "Task saved!" });
}

export async function PATCH(request) {
  const data = await request.json();
  await mongooseConnect();
  const { _id, task, note, isComplete } = data;
  if (task && note) {
    const result = await Task.updateOne(
      { _id: _id },
      { task, note, isComplete }
    );
    return NextResponse.json(result);
  }
}
