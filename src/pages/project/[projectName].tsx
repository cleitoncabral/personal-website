
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Project } from "types/PersonalInfo";
import { GET } from "../../services/projects";
import { useRouter } from "next/router";
import Image from "next/image";
// import Style from './page.module.css'

function createMarkup(html: string | TrustedHTML) {
  return {__html: html};
}

export default function Page({ data }: { data: Project }){
  if (!data) return <h1>Projeto não encontrado</h1>;

  return (
    <section className="container">
      <h2>Projetos pessoais</h2>
      <h3>{data.title}</h3>
      <p dangerouslySetInnerHTML={createMarkup(data.description)}></p>
      <Image src={data.image[0]} width={400} height={200} alt="Imagem do projeto"/>
      <a href={data.repoURL} target="_blank"><button>Repositório</button></a>
    </section>
  )

}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { projectName } = context.params as { projectName: string };
  const data = await GET(projectName);

  return {
    props: { data },
  };
}