import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl">
            Welcome to <span className="text-blue-600">AuthSystem</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A secure and modern authentication boilerplate built with Next.js, PostgreSQL, and bcrypt.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-md border border-blue-100 hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
