import { NextApiRequest, NextApiResponse } from "next";
import ProjectsDataSchema from "../../../models/project";
import connectToDB from "../../../mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDB();
    
    const { description, title, image, repoURL } = req.body;

    if (!description || !title || !image || !repoURL) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const data = await ProjectsDataSchema.create({
      description,
      title,
      image,
      repoURL
    });

    return res.status(201).json(data);
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Internal server error', error: String(error) });
  }
}
