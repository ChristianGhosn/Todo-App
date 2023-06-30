import { NextResponse } from "next/server";
import mongooseConnect from "@/app/lib/mongoose";

import Task from "@/app/models/task";

export async function DELETE(request) {
  const id = request.url.split("/")[5];
  const result = await Task.deleteOne({ _id: id });
  if (result.acknowledged === true && result.deletedCount === 1) {
    return NextResponse.json(result);
  }
}
