import { Link, useLocation } from "wouter";
import { useState, useCallback, useEffect } from "react";

export default function TrainerSetup() {
  const [trainer1Name, setTrainer1Name] = useState("Ash");
  const [trainer2Name, setTrainer2Name] = useState("Gary");
  const [trainer1Pokemon, setTrainer1Pokemon] = useState("Pikachu");
  const [trainer2Pokemon, setTrainer2Pokemon] = useState("Charizard");
  const [showTrainer1Config, setShowTrainer1Config] = useState(false);
  const [showTrainer2Config, setShowTrainer2Config] = useState(false);
  const [trainer2IsAI, setTrainer2IsAI] = useState(false);
  const [, setLocation] = useLocation();

  const allowedPokemon = ["Pikachu", "Charizard", "Blastoise", "Venusaur", "Gengar", "Alakazam"];
  const [trainer1Team, setTrainer1Team] = useState(Array(6).fill("Pikachu"));
  const [trainer2Team, setTrainer2Team] = useState(Array(6).fill("Charizard"));

  // Prevent duplicate picks in a team
  const handleTeamChange = (
    teamSetter: React.Dispatch<React.SetStateAction<string[]>>,
    team: string[],
    idx: number,
    value: string
  ) => {
    if (team.includes(value)) return;
    const newTeam = [...team];
    newTeam[idx] = value;
    teamSetter(newTeam);
  };

  // If AI, generate random team on start that doesn't overlap with player's team and has no duplicates
  const getRandomTeam = () => {
    const playerSet = new Set(trainer1Team);
    // Exclude all Pokémon in the player's team
    let available = allowedPokemon.filter(p => !playerSet.has(p));
    // If not enough unique Pokémon, fill with remaining allowedPokemon (but no duplicates in AI team)
    const aiTeam: string[] = [];
    let pool = [...available];
    while (aiTeam.length < 6) {
      if (pool.length === 0) {
        // Add back allowedPokemon not already in aiTeam
        pool = allowedPokemon.filter(p => !aiTeam.includes(p) && !playerSet.has(p));
        if (pool.length === 0) break; // Should never happen with 6 allowedPokemon
      }
      const idx = Math.floor(Math.random() * pool.length);
      aiTeam.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return aiTeam;
  };

  useEffect(() => {
    if (trainer2IsAI) {
      const aiTeam = getRandomTeam();
      setTrainer2Team(aiTeam);
      console.log('AI team generated:', aiTeam); // Debug log
    }
  }, [trainer2IsAI, trainer1Team]);

  const handleStartBattle = useCallback(() => {
    localStorage.setItem("trainer1Team", JSON.stringify(trainer1Team));
    localStorage.setItem("trainer2Team", JSON.stringify(trainer2Team));
    localStorage.setItem("trainer1Pokemon", trainer1Team[0]);
    localStorage.setItem("trainer2Pokemon", trainer2Team[0]);
    localStorage.setItem("trainer2IsAI", trainer2IsAI ? "true" : "false");
    console.log('Starting battle with AI:', trainer2IsAI); // Debug log
    setLocation("/battle/1");
  }, [trainer1Team, trainer2Team, trainer2IsAI, setLocation]);

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
              <div className="grid grid-cols-2 gap-2">
                {trainer1Team.map((poke, idx) => (
                  <select
                    key={idx}
                    value={poke}
                    onChange={e => handleTeamChange(setTrainer1Team, trainer1Team, idx, e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    {allowedPokemon.map(p => (
                      <option key={p} value={p} disabled={trainer1Team.includes(p) && poke !== p}>{p}</option>
                    ))}
                  </select>
                ))}
              </div>
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
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={trainer2IsAI}
                  onChange={e => {
                    setTrainer2IsAI(e.target.checked);
                    if (e.target.checked) setTrainer2Name('AI');
                  }}
                />
                <span>AI Opponent</span>
              </label>
              <input
                type="text"
                value={trainer2Name}
                onChange={(e) => setTrainer2Name(e.target.value)}
                placeholder="Trainer 2 Name"
                className="w-full p-2 border rounded"
                disabled={trainer2IsAI}
              />
              {!trainer2IsAI && (
                <div className="grid grid-cols-2 gap-2">
                  {trainer2Team.map((poke, idx) => (
                    <select
                      key={idx}
                      value={poke}
                      onChange={e => handleTeamChange(setTrainer2Team, trainer2Team, idx, e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {allowedPokemon.map(p => (
                        <option key={p} value={p} disabled={trainer2Team.includes(p) && poke !== p}>{p}</option>
                      ))}
                    </select>
                  ))}
                </div>
              )}
            </div>
          )}
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            onClick={handleStartBattle}
          >
            Start Battle
          </button>
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
