
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Project } from "types/PersonalInfo";
import { GET } from "../../services/projects";
import { useRouter } from "next/router";
import Image from "next/image";
import Style from './[projectName].module.css'
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function createMarkup(html: string | TrustedHTML) {
  return {__html: html};
}

const Page = ({ data }: { data: Project }) => {
  const { t } = useTranslation('common')
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }
  
  if (!data) return <h1>Projeto não encontrado</h1>;
  return (
    <section className="container">
      <div className={Style.headerTitle}>
        <button onClick={handleBack}><FaArrowLeft /></button>
        <h2>{t('personal_projects')}</h2>
      </div>
      <Image className={Style.image} src={data.image[0]} width={600} height={300} alt="Imagem do projeto"/>
      <h3 className={Style.title}>{data.title}</h3>
      <p className={Style.description} dangerouslySetInnerHTML={createMarkup(data.description)}></p>
      <a className={Style.button} href={data.repoURL} target="_blank"><button>{t('repository')}</button></a>
    </section>
  )

}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { projectName } = context.params as { projectName: string };
  const locale = context.locale || 'pt';
  const data = await GET(projectName);

  return {
    props: { data,
      ...(await serverSideTranslations(locale, ['common']))
     },
  };
}

export default Page;