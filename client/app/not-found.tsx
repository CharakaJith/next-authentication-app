'use client';

import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">404 | Page Not Found</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
          Sorry, the page you are looking for does not exist or is currently unavailable.
        </p>

        <Link href="/">
          <Button className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">Go to Home</Button>
        </Link>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
