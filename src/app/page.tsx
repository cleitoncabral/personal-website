'use client'
import useSWR from "swr"
import { PersonalInfo } from "../../types/PersonalInfo"
import PersonalExperience from "./components/PersonalExperience/personalExperience"
import HardSkills from "./components/HardSkills/hardSkills"
import { Source_Code_Pro } from 'next/font/google'
import styles from './page.module.css'
import SideProjects from "./components/SideProjects/sideProjects"

export default function Home() {
  const { data, error, isLoading } = useSWR('http://localhost:3000/api/personal-info', async (url) => {
    const res = await fetch('http://localhost:3000/api/personal-info')
    const data: Array<PersonalInfo> | undefined= await res.json()
    
    return data
  })

  if (error) return <div>falhou em carregar</div>
  if (isLoading) return <div>carregando...</div>
  if (data) return (
    <main className={styles.main}>
      <section className={styles.body}>
        <PersonalExperience data={data[0]} />
        <HardSkills data={data[0]} />
      </section>
      <SideProjects />
    </main>
  )
}