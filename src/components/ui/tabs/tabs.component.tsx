'use client';

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import style from './tabs.module.scss';

interface Tab {
  title: string;
  path: string;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode;
}

export default function Tabs({ tabs, children }: TabsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className={style.container}>
      <div className={style.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={`tab_${index + 1}`}
            className={`${style.tab} ${pathname === tab.path ? style.active : ''}`}
            onClick={() => handleTabClick(tab.path)}
          >
            <span>{tab.title}</span>
          </div>
        ))}
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}
