import { useParams, useSearchParams } from "next/navigation";
import { GET } from "src/app/api/project/[projectName]/route";
import SideProjectPage from "src/app/components/SideProjectPage/sideProjectPage";
import useSWR from "swr";
import { Project } from "types/PersonalInfo";
import Style from './page.module.css'

type PageProps = {
  projectName: string
}

async function getProject(slug: string) {
  const key = process.env["API"] + 'api/project/' + slug
  
  const res = await fetch(key)
  const data: Project | undefined = await res.json()
  return data
}

export default async function Page({ params }: {params: PageProps}){
  const data = await getProject(params.projectName)

  return (
    <section className={Style.projectPage}>
      <h2>Projetos pessoais</h2>
      {
        data && <SideProjectPage dataProject={data} />
      }
      
    </section>
  )
}