import { useState } from 'react'
import styles from './sideProjects.module.css'
import ImageTest from '../../../../public/img-test.svg'
import Image from 'next/image'

export default function SideProjects() {
  let [isActive, setActive] = useState(false)

  return (
    <section className={`${styles.sideProjects} ${isActive ? styles.sideProjectsActive : styles.sideProjectsDisabled}`}>
      <button onClick={() => setActive(!isActive)} className={styles.sideProjectsButton}>{isActive ? "Início" : "Side-Projects"}</button>

      <div className={`${styles.sideProjectsContentBox}`}>
        <h3>Projetos pessoais</h3>
        <div className={`${styles.scroll}`}>
          <div className={`${styles.sideProjectsContent}`}>
            <div className={`${styles.content}`}>
              <div>
                <Image src={ImageTest} alt='img'/>
              </div>
              <div>
                <h5>Título do projeto</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra, felis a viverra cursus, nunc orci iaculis enim, id malesuada leo eros et arcu. Donec sollicitudin mi vel congue placerat. Donec ex mauris, faucibus eu sollicitudin nec, efficitur at neque. Duis ultrices mattis placerat. Nullam dignissim elit nec diam aliquet tincidunt. Mauris at feugiat arcu. Pellentesque porta viverra porta. Aliquam consectetur ex et lorem finibus fringilla. Praesent elementum et neque nec pharetra. Quisque vitae </p>
              </div>
            </div>
            <div className={`${styles.content}`}>
              <div>
                <Image src={ImageTest} alt='img'/>
              </div>
              <div>
                <h5>Título do projeto</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra, felis a viverra cursus, nunc orci iaculis enim, id malesuada leo eros et arcu. Donec sollicitudin mi vel congue placerat. Donec ex mauris, faucibus eu sollicitudin nec, efficitur at neque. Duis ultrices mattis placerat. Nullam dignissim elit nec diam aliquet tincidunt. Mauris at feugiat arcu. Pellentesque porta viverra porta. Aliquam consectetur ex et lorem finibus fringilla. Praesent elementum et neque nec pharetra. Quisque vitae </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}