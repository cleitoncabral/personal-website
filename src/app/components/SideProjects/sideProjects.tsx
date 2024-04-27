import { useState } from 'react'
import styles from './sideProjects.module.css'
import ImageTest from '../../../../public/img-test.svg'
import Image from 'next/image'
import { PersonalInfo } from '../../../../types/PersonalInfo'

export default function SideProjects({data}: {data: PersonalInfo}) {
  let [isActive, setActive] = useState(false)
  return (
    <section className={`${styles.sideProjects} ${isActive ? styles.sideProjectsActive : styles.sideProjectsDisabled}`}>
      <button onClick={() => setActive(!isActive)} className={styles.sideProjectsButton}>{isActive ? "Início" : "Side-Projects"}</button>

      <div className={`${styles.sideProjectsContentBox}`}>
        <h3>Projetos pessoais</h3>
        <div className={`${styles.scroll}`}>
          <div className={`${styles.sideProjectsContent}`}>
            {
              data.projects.map((item, index) => {
              return (
                <div key={index} className={`${styles.content}`}>
                  <Image src={item.image} width={400} height={200} alt='Avatar' />
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    </section>
  )
}