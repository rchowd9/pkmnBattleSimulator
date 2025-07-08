import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Statistics() {
  const [stats, setStats] = useState({
    totalBattles: 0,
    wins: 0,
    losses: 0,
    winRate: 0
  });

  // Simulate some battle statistics
  useEffect(() => {
    const totalBattles = Math.floor(Math.random() * 50) + 10;
    const wins = Math.floor(Math.random() * totalBattles) + 1; // Ensure wins can't exceed total battles
    const losses = totalBattles - wins; // Calculate losses to ensure accuracy
    const winRate = Math.round((wins / totalBattles) * 100);
    
    setStats({
      totalBattles,
      wins,
      losses,
      winRate
    });
  }, []);

  const resetStats = () => {
    setStats({
      totalBattles: 0,
      wins: 0,
      losses: 0,
      winRate: 0
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Battle Statistics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Total Battles</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.totalBattles}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">Wins</h2>
            <p className="text-3xl font-bold text-green-600">{stats.wins}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Losses</h2>
            <p className="text-3xl font-bold text-red-600">{stats.losses}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-4">Win Rate</h2>
            <p className="text-3xl font-bold text-yellow-600">{stats.winRate}%</p>
          </div>
        </div>
        <div className="text-center space-y-4">
          <button 
            onClick={resetStats}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Reset Statistics
          </button>
          <Link href="/">
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 