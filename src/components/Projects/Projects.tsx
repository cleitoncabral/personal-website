import Image from 'next/image';
import Link from 'next/link';
import { PersonalInfo } from '../../../types/PersonalInfo';
import { createSafeMarkup } from '../../utils/sanitize';
import { createProjectSlug } from '../../utils/slugify';
import styles from './projects.module.css';

export default function Projects({ data }: { data: PersonalInfo }) {
  
  return (
    <div className={styles.projectsGrid}>
      {data?.projects?.map((item, index) => {

        const imageSrc = item?.image?.[0] && String(item.image[0]).length > 10
          ? String(item.image[0])
          : '/placeholder-project.png';

        // Cria slug amigável apenas com o título: "nome-do-projeto"
        const projectSlug = createProjectSlug(item.title);

        return (
          <Link href={`/project/${projectSlug}`} key={index} className={styles.projectCard}>
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
          </Link>
        );
      })}
    </div>
  );
}
