'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-white text-gray-900 px-4 py-3 md:px-8 lg:px-10">
      {/* logo */}
      <Link href="/">
        <Image src="/images/logo-full.png" alt="Logo" className="object-contain" width={160} height={40} />
      </Link>

      {/* buttons */}
      <div className="flex gap-2 text-sm sm:text-base md:text-lg">
        {/* login button */}
        <Link href="/auth/login">
          <Button className="w-[70px] h-8 sm:w-20 sm:h-9 md:w-[84px] md:h-10 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            Login
          </Button>
        </Link>

        {/* register button */}
        <Link href="/auth/register">
          <Button className="w-[70px] h-8 sm:w-20 sm:h-9 md:w-[84px] md:h-10 bg-gray-600 text-white hover:bg-gray-700 cursor-pointer">
            Register
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
