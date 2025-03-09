
import { GET } from "../../services/projects";
import { useState } from "react";
import { useRouter } from "next/router";
// import Style from './page.module.css'

type PageProps = {
  projectName: String
}

export default function Page({ params }: {params: PageProps}){
  const router = useRouter()
  console.log(params)
  const { projectName } = router.query
  GET(projectName)
  
  return (
    <section>
      <h2>Projetos pessoais</h2>
    </section>
  )

}