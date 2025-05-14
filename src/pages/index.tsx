'use client'
import useSWR from "swr"
import { PersonalInfo } from "../../types/PersonalInfo"
import HardSkills from "src/components/HardSkills/HardSkills"
import { useTranslation } from 'next-i18next'
import '../styles/page.css'
import SideProjects from "src/components/SideProjects/sideProjects"
import Loading from "src/components/Loading/Loading"
import PersonalExperience from "src/components/PersonalExperience/PersonalExperience"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Home() {
  const key = process.env["NEXT_PUBLIC_API"] + 'api/personal-info'
  const { data, error, isLoading } = useSWR(key, async (url) => {
    const res = await fetch(url)
    const data: Array<PersonalInfo> | undefined = await res.json()
    return data
  })

  const { t } = useTranslation('common')

  if (error) return <div>{t('error_loading')}</div>
  if (isLoading) return <Loading />
  if (data) return (
    <main className='main'>
      <section className='main-content'>
        <PersonalExperience data={data[0]} />
        <HardSkills data={data[0]} />
      </section>
      <SideProjects data={data[0]} />
    </main>
  )
}

// teste

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
