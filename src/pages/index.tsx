'use client'
import useSWR from "swr"
import { PersonalInfo } from "../../types/PersonalInfo"
import HardSkills from "src/components/HardSkills/HardSkills"
import { Source_Code_Pro } from 'next/font/google'
import '../styles/page.css'
import SideProjects from "src/components/SideProjects/sideProjects"
import Loading from "src/components/Loading/Loading"
import Footer from "src/components/Footer/Footer"
import PersonalExperience from "src/components/PersonalExperience/PersonalExperience"


export default function Home() {
  const key = process.env["API"] + 'api/personal-info'
  const { data, error, isLoading } = useSWR(key, async (url) => {
    const res = await fetch(key)
    const data: Array<PersonalInfo> | undefined= await res.json()
    
    return data
  })

  if (error) return <div>falhou em carregar</div>
  if (isLoading) return <Loading />
  if (data) return (
    <main className='main'>
      <section className='main-content'>
        <PersonalExperience data={data[0]} />
        <HardSkills data={data[0]} />
        <Footer />
      </section>
      <SideProjects data={data[0]} />
    </main>
  )
}
