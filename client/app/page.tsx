import Footer from '@/components/footer';
import NavBar from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* navbar */}
      <NavBar />

      {/* main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-10 text-center cursor-default">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4">Simple NextJS Authentication App</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-md sm:max-w-2xl md:max-w-5xl leading-relaxed">
          A simple authentication app using Next.js for the frontend and Node.js for the backend.
          <br />
          Supports user authentication with JWT tokens and provides CRUD operations for users.
        </p>
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}
