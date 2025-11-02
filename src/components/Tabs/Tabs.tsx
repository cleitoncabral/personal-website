import { ReactNode, useState, useEffect } from 'react';
import styles from './tabs.module.css';

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
}

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [prevTab, setPrevTab] = useState(activeTab);

  useEffect(() => {
    if (activeTab !== prevTab) {
      const currentIndex = tabs.findIndex(tab => tab.id === prevTab);
      const newIndex = tabs.findIndex(tab => tab.id === activeTab);
      setDirection(newIndex > currentIndex ? 'right' : 'left');
      setPrevTab(activeTab);
    }
  }, [activeTab, prevTab, tabs]);

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div 
        className={`${styles.tabContent} ${styles[direction]}`}
        key={activeTab}
      >
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
