import { Pipeline, Tabs } from '@components/';
import type React from 'react';
import { useState } from 'react';
import { ProfileTab } from './tabs';
import styles from './styles/Account.module.scss';

export const PersonalAccountContainer: React.FC = () => {
  
  const tabs = [
    { id: "profile", label: "Профиль" },
    { id: "finances", label: "Финансы" },
    { id: "settings", label: "Настройки" },
  ];
  
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <>
      <Pipeline >
        <Tabs tabs={tabs} currentTab={activeTab} onChange={setActiveTab} className={styles.tabs}/>
      </Pipeline>
      <div className={activeTab === "profile" ? styles.pageContainer : styles.hiddenTab}>
        <ProfileTab/>
      </div>
      <div className={activeTab === "finances" ? styles.pageContainer : styles.hiddenTab}>
        2
      </div>
      <div className={activeTab === "settings" ? styles.pageContainer : styles.hiddenTab}>
        3
      </div>
    </>
  )
}
