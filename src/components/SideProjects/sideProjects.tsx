import { useEffect, useState } from 'react'
import styles from './sideProjects.module.css'
import Image from 'next/image'
import { PersonalInfo } from '../../../types/PersonalInfo'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function SideProjects({data}: {data: PersonalInfo}) {
  const { t } = useTranslation("common");
  const router = useRouter();
  let [isActive, setActive] = useState(false)

  function createMarkup(html: string | TrustedHTML) {
    return {__html: html};
  }

  const setConfig = () => {
    setActive(!isActive);
    isActive ? router.replace("/", undefined, { shallow: true }) 
    :
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, sideProjects: "all" }
      },
      undefined,
      {shallow: true}
    ) 
  }

  const { sideProjects } = router.query

  useEffect(() => {
    sideProjects && setActive(true)
  }, [sideProjects])


  return (
    <section className={`${styles.sideProjects} ${isActive ? styles.sideProjectsActive : styles.sideProjectsDisabled}`}>
      <button onClick={setConfig} className={styles.sideProjectsButton}>{isActive ? ( screen.availWidth < 1024 ? "X" : t('home')) : "Side-Projects"}</button>
      <div className={`${styles.sideProjectsContentBox}`}>
        <h3>{t('personal_projects')}</h3>
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
