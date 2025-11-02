import Image from "next/image";
import { PersonalInfo } from "../../../types/PersonalInfo";
import styles from './personalExperience.module.css';

export default function PersonalExperience({data}: {data: PersonalInfo}) {
  // Validação de segurança para avatar
  const avatarSrc = data?.avatar_image && String(data.avatar_image).length > 10 
    ? String(data.avatar_image) 
    : '/placeholder-avatar.png';

  return (
    <section className={styles.personalExperience}>
      <div>
        <Image 
          src={avatarSrc} 
          width={200} 
          height={200} 
          alt={`${data?.name || 'User'} avatar`} 
          priority={true} 
          className={styles.avatar}
        />
        <h1>{data?.name || 'Nome não disponível'}</h1>
        {
          data?.description?.map((item, index) => {
            return <h5 key={index}>{item}</h5>
          })
        }
      </div>

      <div>
        <h2 className={styles.title}>Experiência</h2>
        {
          data?.experience?.map((item, index) => {
            return (
              <div className={styles.experience} key={index}>
                <h3>{item.title}</h3>
                <h5>{item.date_time}</h5>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}