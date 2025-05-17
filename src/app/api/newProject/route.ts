import { NextRequest, NextResponse } from "next/server"
import ProjectsDataSchema from "../../../../models/project"
import connectToDB from "../../../../mongodb"
import { NewProject } from "types/PersonalInfo"

export async function POST (request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json()

    const data = await ProjectsDataSchema.create ({
      description: body.description,
      title: body.title,
      image: body.image,
      repoURL: body.repoURL
    })

    return new NextResponse(JSON.stringify(data), {status: 200})

  }
  catch (error) {
    return new NextResponse("error" + error, {status: 500})
  }
}