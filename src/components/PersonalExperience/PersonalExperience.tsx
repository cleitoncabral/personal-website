import Image from "next/image";
import { PersonalInfo } from "../../../types/PersonalInfo";
import styles from './personalExperience.module.css';

export default function PersonalExperience({data}: {data: PersonalInfo}) {
  return (
    <section className={styles.personalExperience}>
      <div>
        <Image src={data.avatar_image} width={200} height={200} alt='Avatar' priority={true} />
        <h1>{data.name}</h1>
        {
          data.description.map((item, index) => {
            return <h5 key={index}>{item}</h5>
          })
        }
      </div>

      <div>
        <h2 className={styles.title}>Experiência</h2>
        {
          data.experience.map((item, index) => {
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