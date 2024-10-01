import { Project } from "types/PersonalInfo";

import Styles from './sideProjectPage.module.css'
import Image from "next/image";

export default function SideProjectPage ({dataProject}: {dataProject: Project}) {
  function createMarkup(html: string | TrustedHTML) {
    return {__html: html};
  }

  return ( 
  <section className={Styles.container}>
    <h1>{dataProject.title}</h1>
    <div className={Styles.content}>
    {dataProject.image.map((image, index) => <Image key={index} className={Styles.image} src={image} width={400} height={200} alt='Página inicial do projeto' />)}
      {<p dangerouslySetInnerHTML={createMarkup(dataProject.description)}></p>}
    </div>
  </section> )
}