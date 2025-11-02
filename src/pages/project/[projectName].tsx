import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import { Project } from "types/PersonalInfo";
import { useRouter } from "next/router";
import Image from "next/image";
import Style from './[projectName].module.css'
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createSafeMarkup } from "../../utils/sanitize";
import { getPersonalData } from "../../lib/getPersonalData";
import { getProject } from "../../lib/getProject";
import { createProjectSlug } from "../../utils/slugify";

const Page = ({ data }: { data: Project | null }) => {
  const { t } = useTranslation('common')
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }
  
  if (!data) {
    return <h1>{t('project_not_found') || 'Projeto não encontrado'}</h1>;
  }

  // Validação de imagem
  const imageSrc = data?.image?.[0] && String(data.image[0]).length > 10
    ? String(data.image[0])
    : '/placeholder-project.png';
    
  return (
    <section className="container">
      <div className={Style.headerTitle}>
        <button onClick={handleBack}><FaArrowLeft /></button>
        <h2>{t('personal_projects')}</h2>
      </div>
      <Image 
        className={Style.image} 
        src={imageSrc}
        width={600} 
        height={300} 
        alt={`Screenshot do projeto ${data.title}`}
      />
      <h3 className={Style.title}>{data.title}</h3>
      <p className={Style.description} dangerouslySetInnerHTML={createSafeMarkup(data.description)}></p>
      <a 
        className={Style.button} 
        href={data.repoURL} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <button>{t('repository')}</button>
      </a>
    </section>
  )
}

// Gera páginas para todos os projetos no build time
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPersonalData();
  const projects = data[0]?.projects || []

  // Gera paths com slugs amigáveis (apenas título, sem ID)
  const paths = projects
    .filter(project => project.title)
    .flatMap((project) => {
      const slug = createProjectSlug(project.title);
      return [
        { params: { projectName: slug }, locale: 'pt' },
        { params: { projectName: slug }, locale: 'en' },
      ];
    });

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { projectName } = context.params as { projectName: string };
  const locale = context.locale || 'pt';

  const data = await getProject(projectName);

  if (!data) {
    return { notFound: true }
  }

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ['common']))
    },
  };
}

export default Page;