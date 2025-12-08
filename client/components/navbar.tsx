'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';

const NavBar: React.FC = () => {
  // get user state from redux
  const { isAuthenticated, info } = useSelector((state: RootState) => state.userAuth);

  return (
    <nav className="flex items-center justify-between bg-white text-gray-900 px-4 py-3 md:px-8 lg:px-10">
      {/* logo */}
      <Link href="/">
        <Image src="/images/logo-full.png" alt="Logo" className="object-contain" width={160} height={40} />
      </Link>

      {/* buttons and user info section */}
      <div className="flex gap-2 text-sm sm:text-base md:text-lg items-center">
        {isAuthenticated && info ? (
          // user info
          <>
            <div className="w-16 h-16 rounded-full bg-green-600 border-2 border-green-900 text-white font-bold flex items-center justify-center text-3xl cursor-default">
              {`${info.firstName.charAt(0)}${info.lastName.charAt(0)}`}
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
