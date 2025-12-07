'use client';

import Footer from '@/components/footer';
import NavBar from '@/components/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* navbar */}
      <NavBar />

      {/* main */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">{children}</main>

      {/* footer */}
      <Footer />
    </div>
  );
}
