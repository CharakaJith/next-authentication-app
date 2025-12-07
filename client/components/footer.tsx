'use client';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 py-4 text-center mt-auto rounded-t-full">
      &copy; {new Date().getFullYear()} Jith. All rights reserved.
    </footer>
  );
};

export default Footer;
