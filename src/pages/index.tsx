import { useState } from 'react';
import { PersonalInfo } from "../../types/PersonalInfo"
import HardSkills from "src/components/HardSkills/HardSkills"
import { useTranslation } from 'next-i18next'
import PersonalExperience from "src/components/PersonalExperience/PersonalExperience"
import Projects from "src/components/Projects/Projects"
import Tabs from "src/components/Tabs/Tabs"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { GetStaticProps } from "next"
import { getPersonalData } from "../lib/getPersonalData"

type HomeProps = {
  data: PersonalInfo;
}

export default function Home({ data }: HomeProps) {
  const { t } = useTranslation('common')
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    {
      id: 'about',
      label: t('home'),
      content: (
        <main className='main'>
          <section className='main-content'>
            <PersonalExperience data={data} />
            <HardSkills data={data} />
          </section>
        </main>
      )
    },
    {
      id: 'projects',
      label: t('personal_projects') || 'Projetos',
      content: <Projects data={data} />
    }
  ];

  return (
    <div className='page-container'>
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  const personalData = await getPersonalData();

  return {
    props: {
      data: personalData[0] || {},
      ...(await serverSideTranslations(locale || 'pt', ['common'])),
    },
  };
}
