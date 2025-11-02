import { NextApiRequest, NextApiResponse } from "next";
import Project from "../../../../models/project";
import connectToDB from "../../../../mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { projectName } = req.query;

  if (!projectName || typeof projectName !== 'string') {
    return res.status(400).json({ message: 'Invalid project ID' });
  }

  try {
    await connectToDB();
    
    const data = await Project.findById(projectName);
    
    if (!data) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
}
