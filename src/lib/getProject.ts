import connectToDB from '../../mongodb';
import Project from '../../models/project';
import { Project as ProjectType } from 'types/PersonalInfo';
import { slugify } from '../utils/slugify';

/**
 * Busca um projeto específico diretamente do MongoDB
 * Pode buscar por ID ou por título (slug)
 */
export async function getProject(projectIdOrSlug: string): Promise<ProjectType | null> {
  try {
    await connectToDB();
    
    let data;
    
    // Tenta buscar por ID primeiro (se tiver 24 caracteres)
    if (projectIdOrSlug.length === 24) {
      data = await Project.findById(projectIdOrSlug).lean().exec();
    }
    
    // Se não encontrou por ID, busca por título usando slug
    if (!data) {
      const allProjects = await Project.find({}).lean().exec();
      
      // Procura pelo projeto cujo título gera o mesmo slug
      data = allProjects.find((project: any) => {
        const projectSlug = slugify(project.title);
        return projectSlug === projectIdOrSlug;
      });
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
