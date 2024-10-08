import { NextResponse } from "next/server"
import personalInfo from "../../../../models/personalInfo"
import ProjectsDataSchema from "../../../../models/projects"
import connectToDB from "../../../../mongodb"
require('../../../../models/projects')

async function GET() {
  try {
    await connectToDB()
    const data = await personalInfo.find({}).populate('projects', {title: 1, description: 1, image: 1})
    console.log(data)
    return new NextResponse(JSON.stringify(data), {status: 200})
  } catch (error) {
    return new NextResponse("error" + error, {status: 500})
  }
}

export {
  GET
}
