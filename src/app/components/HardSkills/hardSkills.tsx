import { PersonalInfo } from "../../../../types/PersonalInfo";
import styles from './hardSkills.module.css'

export default function HardSkills ({data}: {data: PersonalInfo}){
  return (
    <section className={styles.hardSkills}>
      <h2 className={styles.title}>HABILIDADES TÉCNICAS</h2>
      {data.hard_skills.map((item, index) => {
        if (index == 1) {
           let slipItem = item.split("\n")
           return <p className={styles.paragraph} key={index}>{slipItem.map((span, index) => <span className={styles.span} key={index}>{span}</span>)}</p>
         }
         
        return <p  className={styles.paragraph} key={index}>{item}</p>
      })}
    </section>
  )
}