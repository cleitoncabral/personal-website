import connectToDB from '../../mongodb';
import Project from '../../models/project';
import { Project as ProjectType } from 'types/PersonalInfo';

/**
 * Busca um projeto específico diretamente do MongoDB
 * Busca por slug (rápido com índice) ou por ID
 */
export async function getProject(slugOrId: string): Promise<ProjectType | null> {
  try {
    await connectToDB();
    
    let data;
    
    // Tenta buscar por ID primeiro (se tiver 24 caracteres - ObjectId)
    if (slugOrId.length === 24 && /^[0-9a-fA-F]{24}$/.test(slugOrId)) {
      data = await Project.findById(slugOrId).lean().exec();
    }
    
    // Se não encontrou por ID, busca por slug (RÁPIDO - usa índice)
    if (!data) {
      data = await Project.findOne({ slug: slugOrId }).lean().exec();
    }

    if (!data) {
      return null;
    }

    // Converte para formato serializável e adiciona campo 'id'
    const serialized = JSON.parse(JSON.stringify(data));
    return {
      ...serialized,
      id: serialized._id?.toString() || serialized._id,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}
