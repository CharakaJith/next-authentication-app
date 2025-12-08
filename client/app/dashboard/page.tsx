'use client';

import Footer from '@/components/footer';
import NavBar from '@/components/navbar';
import { checkAuth } from '@/src/util/checkAuth';
import type { FC } from 'react';

const DashboardPage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* navbar */}
      <NavBar />

      {/* main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default checkAuth(DashboardPage);
