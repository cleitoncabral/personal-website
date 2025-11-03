import Image from 'next/image';
import { Project } from '../../../types/PersonalInfo';
import { createSafeMarkup } from '../../utils/sanitize';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import styles from './projectDetail.module.css';

type ProjectDetailProps = {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const { t } = useTranslation('common');

  // Validação de imagem
  const imageSrc = project?.image?.[0] && String(project.image[0]).length > 10
    ? String(project.image[0])
    : '/placeholder-project.png';

  return (
    <div className={styles.detailContainer}>
      {/* Botão voltar */}
      <button 
        className={styles.backButton}
        onClick={onBack}
        aria-label="Voltar para lista de projetos"
      >
        <FaArrowLeft />
        <span>{t('back') || 'Voltar'}</span>
      </button>

      {/* Imagem do projeto */}
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          width={1200}
          height={600}
          alt={`Screenshot do projeto ${project.title}`}
          className={styles.projectImage}
          priority
        />
      </div>

      {/* Conteúdo do projeto */}
      <div className={styles.projectContent}>
        <h2 className={styles.title}>{project.title}</h2>
        
        <div 
          className={styles.description}
          dangerouslySetInnerHTML={createSafeMarkup(project.description)}
        />

        {/* Link para repositório */}
        {project.repoURL && (
          <a 
            href={project.repoURL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.repoButton}
          >
            {t('repository') || 'Ver Repositório'}
          </a>
        )}
      </div>
    </div>
  );
}
