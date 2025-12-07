'use client';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700 py-4 text-center mt-auto">
      &copy; {new Date().getFullYear()} Jith. All rights reserved.
    </footer>
  );
};

export default Footer;
