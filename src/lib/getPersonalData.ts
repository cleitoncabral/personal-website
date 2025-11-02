import connectToDB from '../../mongodb';
import personalInfo from '../../models/personalInfo';
import '../../models/project'; // Importa o modelo Project para registrá-lo
import { PersonalInfo } from 'types/PersonalInfo';

/**
 * Busca dados pessoais diretamente do MongoDB
 * Usado em getStaticProps/getStaticPaths para evitar chamadas HTTP durante build
 */
export async function getPersonalData(): Promise<PersonalInfo[]> {
  try {
    await connectToDB();
    
    const data = await personalInfo
      .find({})
      .populate('projects', {
        _id: 1, // Importante: inclui o _id
        title: 1,
        description: 1,
        image: 1,
        repoURL: 1,
      })
      .lean() // Retorna objetos JS puros (melhor para serialização)
      .exec();

    // Converte _id para id manualmente
    const serializedData = JSON.parse(JSON.stringify(data));
    
    // Transforma _id em id para cada projeto
    serializedData.forEach((info: any) => {
      if (info.projects) {
        info.projects = info.projects.map((project: any) => ({
          ...project,
          id: project._id?.toString() || project._id,
        }));
      }
    });

    return serializedData;
  } catch (error) {
    console.error('Error fetching personal data:', error);
    return [];
  }
}
