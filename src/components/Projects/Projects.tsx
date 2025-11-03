import Image from 'next/image';
import { PersonalInfo, Project } from '../../../types/PersonalInfo';
import { createSafeMarkup } from '../../utils/sanitize';
import styles from './projects.module.css';

type ProjectsProps = {
  data: PersonalInfo;
  onProjectClick: (project: Project) => void;
}

export default function Projects({ data, onProjectClick }: ProjectsProps) {
  
  return (
    <div className={styles.projectsGrid}>
      {data?.projects?.map((item, index) => {

        const imageSrc = item?.image?.[0] && String(item.image[0]).length > 10
          ? String(item.image[0])
          : '/placeholder-project.png';

        return (
          <div 
            key={index} 
            className={styles.projectCard}
            onClick={() => onProjectClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onProjectClick(item);
              }
            }}
          >
            <Image
              className={styles.projectImage}
              src={imageSrc}
              width={400}
              height={200}
              alt={`Screenshot do projeto ${item.title}`}
            />
            <div className={styles.projectInfo}>
              <h3>{item.title}</h3>
              <div 
                className={styles.projectDescription}
                dangerouslySetInnerHTML={createSafeMarkup(item.description)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
