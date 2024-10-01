import { NextResponse } from "next/server"
import ProjectsDataSchema from "../../../../../models/projects"
import connectToDB from "../../../../../mongodb"
require('../../../../../models/projects')

interface getRequest extends Request {
  params: Request,
  projectName: String
}

export async function GET(req: Request, context: getRequest) {
  const { params } = context
  console.log('param: ' + params.projectName)
  try {
    await connectToDB()
    const data = await ProjectsDataSchema.findById(params.projectName)

    return new NextResponse(JSON.stringify(data), {status: 200})
  } catch (error) {
    return new NextResponse("error" + error, {status: 500})
  }
}