import Tabs from '@components/ui/tabs/tabs.component';

export default async function Template({ children }: { children: React.ReactNode }) {
  const tabs = [
    {
      title: 'All',
      path: '/',
    },
    {
      title: 'Favorites',
      path: '/favorites',
    },
  ];

  return <Tabs tabs={tabs}>{children}</Tabs>;
}
