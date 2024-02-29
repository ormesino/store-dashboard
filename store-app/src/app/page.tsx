'use client';

import { userAtom } from '@/storage/user.storage';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Dashboard from './(dashboard)/layout';
import styles from './page.module.css';

export default function Home() {
  const [userToken, serUserToken] = useAtom(userAtom);
  const { push } = useRouter();

  useEffect(() => {
    if (!userToken) {
      push('/login');
    }
  }, []);

  return (
    <main className={styles.main}>
      <Dashboard />
    </main>
  );
}