import { useState } from 'react'
import styles from './sideProjects.module.css'
import Image from 'next/image'
import { PersonalInfo } from '../../../types/PersonalInfo'
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SideProjects({data}: {data: PersonalInfo}) {
  let [isActive, setActive] = useState(false)
  function createMarkup(html: string | TrustedHTML) {
    return {__html: html};
  }

  return (
    <section className={`${styles.sideProjects} ${isActive ? styles.sideProjectsActive : styles.sideProjectsDisabled}`}>
      <button onClick={() => setActive(!isActive)} className={styles.sideProjectsButton}>{isActive ? ( screen.availWidth < 1024 ? "X" : "Início") : "Side-Projects"}</button>
      <div className={`${styles.sideProjectsContentBox}`}>
        <h3>Projetos pessoais</h3>
        <div className={`${styles.scroll}`}>
          <div className={`${styles.sideProjectsContent}`}>
            {
              data.projects.map((item, index) => {
                return (
                  <Link href={`/project/${item.id}`}key={index} className={`${styles.content}`}>
                    {item.image && 
                    <Image className={styles.image} src={item.image[0]} width={400} height={200} alt='Página inicial do projeto' />}
                    <div>
                      <h5>{item.title}</h5>
                      <p dangerouslySetInnerHTML={createMarkup(item.description)}></p>
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>
    </section>
  )
}