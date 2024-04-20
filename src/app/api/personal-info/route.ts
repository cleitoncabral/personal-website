import { NextResponse } from "next/server"
import personalInfo from "../../../../models/personalInfo"
import connectToDB from "../../../../mongodb"

export async function GET() {
  try {
    await connectToDB()
    const data = await personalInfo.find({})
    
    return new NextResponse(JSON.stringify(data), {status: 200})
  } catch (error) {
    return new NextResponse("error" + error, {status: 500})
  }
}
