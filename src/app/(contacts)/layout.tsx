'use client';

import MainLayout from '@layouts/main/main.layout';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
