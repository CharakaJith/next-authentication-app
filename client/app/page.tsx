import NavBar from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* navbar */}
      <NavBar />

      {/* main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="font-bold text-3xl mb-4">Simple NextJS Authentication App</h1>
        <p className="text-lg text-gray-700 max-w-3xl">
          A simple authentication app using Next.js for the frontend and Node.js for the backend.
          <br />
          Supports user authentication with JWT tokens and provides CRUD operations for users.
        </p>
      </main>
    </div>
  );
}
