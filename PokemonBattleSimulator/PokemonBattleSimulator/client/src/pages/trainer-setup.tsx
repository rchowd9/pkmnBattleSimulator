import { Link } from "wouter";
import { useState } from "react";

export default function TrainerSetup() {
  const [trainer1Name, setTrainer1Name] = useState("Ash");
  const [trainer2Name, setTrainer2Name] = useState("Gary");
  const [trainer1Pokemon, setTrainer1Pokemon] = useState("Pikachu");
  const [trainer2Pokemon, setTrainer2Pokemon] = useState("Charizard");
  const [showTrainer1Config, setShowTrainer1Config] = useState(false);
  const [showTrainer2Config, setShowTrainer2Config] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Trainer Setup
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Configure your trainers and their Pokémon teams.
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">Current Setup:</h3>
            <p className="text-sm text-gray-600">Trainer 1: {trainer1Name} with {trainer1Pokemon}</p>
            <p className="text-sm text-gray-600">Trainer 2: {trainer2Name} with {trainer2Pokemon}</p>
          </div>
          
          <button 
            onClick={() => setShowTrainer1Config(!showTrainer1Config)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Configure Trainer 1
          </button>
          
          {showTrainer1Config && (
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <input
                type="text"
                value={trainer1Name}
                onChange={(e) => setTrainer1Name(e.target.value)}
                placeholder="Trainer 1 Name"
                className="w-full p-2 border rounded"
              />
              <select
                value={trainer1Pokemon}
                onChange={(e) => setTrainer1Pokemon(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Pikachu">Pikachu</option>
                <option value="Charizard">Charizard</option>
                <option value="Blastoise">Blastoise</option>
                <option value="Venusaur">Venusaur</option>
                <option value="Gyarados">Gyarados</option>
              </select>
            </div>
          )}
          
          <button 
            onClick={() => setShowTrainer2Config(!showTrainer2Config)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Configure Trainer 2
          </button>
          
          {showTrainer2Config && (
            <div className="bg-red-50 rounded-lg p-4 space-y-3">
              <input
                type="text"
                value={trainer2Name}
                onChange={(e) => setTrainer2Name(e.target.value)}
                placeholder="Trainer 2 Name"
                className="w-full p-2 border rounded"
              />
              <select
                value={trainer2Pokemon}
                onChange={(e) => setTrainer2Pokemon(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="Charizard">Charizard</option>
                <option value="Pikachu">Pikachu</option>
                <option value="Blastoise">Blastoise</option>
                <option value="Venusaur">Venusaur</option>
                <option value="Gyarados">Gyarados</option>
              </select>
            </div>
          )}
          
          <Link href="/battle/1">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Start Battle
            </button>
          </Link>
          <Link href="/">
            <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 