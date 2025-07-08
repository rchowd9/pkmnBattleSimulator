import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Pokémon Battle Simulator
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Welcome to the ultimate Pokémon battle experience! Choose your trainers and start battling.
        </p>
        <div className="space-y-4">
          <Link href="/setup">
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Start New Battle
            </button>
          </Link>
          <Link href="/statistics">
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              View Statistics
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
