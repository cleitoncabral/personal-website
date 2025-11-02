import { NextApiRequest, NextApiResponse } from "next";
import personalInfo from "../../../models/personalInfo";
import connectToDB from "../../../mongodb";
require('../../../models/project');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDB();
    
    const data = await personalInfo.find({}).populate('projects', {
      title: 1,
      description: 1,
      image: 1
    });
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
}
