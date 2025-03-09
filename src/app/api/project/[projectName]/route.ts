import { NextResponse } from "next/server"
import Project from "../../../../../models/project"
import connectToDB from "../../../../../mongodb"
import mongoose from "mongoose"

interface getRequest extends Request {
  params: {
    projectName: string; 
  };
}

export async function GET(req: Request, context: getRequest) {
  const { projectName } = context.params
  try {
    await connectToDB()
    
    const data = await Project.findById(projectName);
    return new NextResponse(JSON.stringify(data), {status: 200})
  } catch (error) {
    return new NextResponse("error" + error, {status: 500})
  }
}