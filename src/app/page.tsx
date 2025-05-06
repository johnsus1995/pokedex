import Link from 'next/link';

export default async function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b  text-center px-4">
      <h1 className="text-4xl sm:text-6xl font-bold text-blue-700 mb-4">Welcome to PokeDex!</h1>
      <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
        Discover, search, and explore your favorite Pokemon, stats, and more.
      </p>
      <p className='className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8'>
        The Ultimate pokemon library.
      </p>
      <Link href="/pokemon" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg text-lg transition">
        Browse Pokemon
      </Link>
    </main>
  );
}
