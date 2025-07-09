import { useRoute } from "wouter";
import { Link } from "wouter";
import { useState } from "react";
import { useCallback } from "react";
import { useLocation } from "wouter";

export default function Battle() {
  const [, params] = useRoute("/battle/:id");
  const battleId = params?.id || "1";
  
  const [pikachuHP, setPikachuHP] = useState(100);
  const [charizardHP, setCharizardHP] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'pikachu' | 'charizard'>('pikachu');
  const [pikachuMega, setPikachuMega] = useState(false);
  const [charizardMega, setCharizardMega] = useState(false);
  const [pikachuPokemon, setPikachuPokemon] = useState(localStorage.getItem("trainer1Pokemon") || 'Pikachu');
  const [charizardPokemon, setCharizardPokemon] = useState(localStorage.getItem("trainer2Pokemon") || 'Charizard');
  const [showSwapMenu, setShowSwapMenu] = useState(false);
  const [pikachuPotions, setPikachuPotions] = useState(3);
  const [charizardPotions, setCharizardPotions] = useState(3);
  const [showPotionMenu, setShowPotionMenu] = useState(false);

  const [, setLocation] = useLocation();

  const handleStartBattle = useCallback(() => {
    localStorage.setItem("trainer1Pokemon", pikachuPokemon);
    localStorage.setItem("trainer2Pokemon", charizardPokemon);
    setLocation("/battle/1");
  }, [pikachuPokemon, charizardPokemon, setLocation]);

  // Pokémon moves mapping
  const pokemonMoves: { [key: string]: { normal: string; mega: string } } = {
    'Pikachu': { normal: 'Thunderbolt', mega: 'Thunderbolt' },
    'Charizard': { normal: 'Flamethrower', mega: 'Mega Flamethrower' },
    'Blastoise': { normal: 'Hydro Pump', mega: 'Mega Hydro Pump' },
    'Venusaur': { normal: 'Solar Beam', mega: 'Mega Solar Beam' },
    'Gyarados': { normal: 'Hydro Pump', mega: 'Mega Hydro Pump' }
  };

  const getPokemonMove = (pokemonName: string, isMega: boolean) => {
    const moves = pokemonMoves[pokemonName];
    if (!moves) {
      return isMega ? 'Mega Attack' : 'Tackle'; // Default moves for unknown Pokémon
    }
    return isMega ? moves.mega : moves.normal;
  };

  const handleAttack = () => {
    let baseDamage = Math.floor(Math.random() * 20) + 10; // Random damage between 10-30
    
    // Mega evolution bonus
    if (currentTurn === 'pikachu' && pikachuMega) {
      baseDamage = Math.floor(baseDamage * 1.5);
    } else if (currentTurn === 'charizard' && charizardMega) {
      baseDamage = Math.floor(baseDamage * 1.5);
    }
    
    if (currentTurn === 'pikachu') {
      const newHP = Math.max(0, charizardHP - baseDamage);
      setCharizardHP(newHP);
      const attackName = getPokemonMove(pikachuPokemon, pikachuMega);
      setBattleLog(prev => [...prev, `${pikachuPokemon} uses ${attackName} for ${baseDamage} damage!`]);
      setCurrentTurn('charizard');
      
      if (newHP <= 0) {
        setBattleLog(prev => [...prev, `${charizardPokemon} fainted! ${pikachuPokemon} wins!`]);
      }
    } else {
      const newHP = Math.max(0, pikachuHP - baseDamage);
      setPikachuHP(newHP);
      const attackName = getPokemonMove(charizardPokemon, charizardMega);
      setBattleLog(prev => [...prev, `${charizardPokemon} uses ${attackName} for ${baseDamage} damage!`]);
      setCurrentTurn('pikachu');
      
      if (newHP <= 0) {
        setBattleLog(prev => [...prev, `${pikachuPokemon} fainted! ${charizardPokemon} wins!`]);
      }
    }
  };

  // List of Pokémon that can Mega Evolve
  const megaEvolvablePokemon = ['Charizard', 'Blastoise', 'Venusaur', 'Gyarados'];

  const handleMegaEvolve = () => {
    if (currentTurn === 'pikachu' && !pikachuMega && megaEvolvablePokemon.includes(pikachuPokemon)) {
      setPikachuMega(true);
      setBattleLog(prev => [...prev, `${pikachuPokemon} Mega Evolves!`]);
      setCurrentTurn('charizard');
    } else if (currentTurn === 'charizard' && !charizardMega && megaEvolvablePokemon.includes(charizardPokemon)) {
      setCharizardMega(true);
      setBattleLog(prev => [...prev, `${charizardPokemon} Mega Evolves!`]);
      setCurrentTurn('pikachu');
    }
  };

  const handleSwapPokemon = (newPokemon: string) => {
    if (currentTurn === 'pikachu') {
      setPikachuPokemon(newPokemon);
      setPikachuHP(100);
      setPikachuMega(false);
      setBattleLog(prev => [...prev, `Trainer 1 swaps to ${newPokemon}!`]);
      setCurrentTurn('charizard');
    } else {
      setCharizardPokemon(newPokemon);
      setCharizardHP(100);
      setCharizardMega(false);
      setBattleLog(prev => [...prev, `Trainer 2 swaps to ${newPokemon}!`]);
      setCurrentTurn('pikachu');
    }
    setShowSwapMenu(false);
  };

  const handleUsePotion = () => {
    const healAmount = 50; // Potion heals 50 HP
    
    if (currentTurn === 'pikachu' && pikachuPotions > 0) {
      const newHP = Math.min(100, pikachuHP + healAmount);
      setPikachuHP(newHP);
      setPikachuPotions(prev => prev - 1);
      setBattleLog(prev => [...prev, `Trainer 1 uses a Potion! ${pikachuPokemon} recovers ${healAmount} HP!`]);
      setCurrentTurn('charizard');
    } else if (currentTurn === 'charizard' && charizardPotions > 0) {
      const newHP = Math.min(100, charizardHP + healAmount);
      setCharizardHP(newHP);
      setCharizardPotions(prev => prev - 1);
      setBattleLog(prev => [...prev, `Trainer 2 uses a Potion! ${charizardPokemon} recovers ${healAmount} HP!`]);
      setCurrentTurn('pikachu');
    }
  };

  const resetBattle = () => {
    setPikachuHP(100);
    setCharizardHP(100);
    setBattleLog([]);
    setCurrentTurn('pikachu');
    setPikachuMega(false);
    setCharizardMega(false);
    setPikachuPokemon('Pikachu');
    setCharizardPokemon('Charizard');
    setShowSwapMenu(false);
    setPikachuPotions(3);
    setCharizardPotions(3);
    setShowPotionMenu(false);
  };

  const isGameOver = pikachuHP <= 0 || charizardHP <= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Pokémon Battle #{battleId}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-blue-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Trainer 1</h2>
            <div className="space-y-2">
              <div className="bg-white rounded p-3">
                <p className="font-medium">
                  {pikachuPokemon} {pikachuMega && <span className="text-purple-600">(Mega)</span>}
                </p>
                <p className="text-sm text-gray-600">HP: {pikachuHP}/100</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(pikachuHP / 100) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600 mt-1">Potions: {pikachuPotions}</p>
              </div>
            </div>
          </div>
          <div className="bg-red-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Trainer 2</h2>
            <div className="space-y-2">
              <div className="bg-white rounded p-3">
                <p className="font-medium">
                  {charizardPokemon} {charizardMega && <span className="text-purple-600">(Mega)</span>}
                </p>
                <p className="text-sm text-gray-600">HP: {charizardHP}/100</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(charizardHP / 100) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-blue-600 mt-1">Potions: {charizardPotions}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center space-y-4">
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Current Turn: {currentTurn === 'pikachu' ? pikachuPokemon : charizardPokemon}
            </p>
          </div>
          
          {!isGameOver ? (
            <div className="space-y-2">
              <button 
                onClick={handleAttack}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
              >
                Attack
              </button>
              
              <button 
                onClick={handleUsePotion}
                disabled={(currentTurn === 'pikachu' && pikachuPotions === 0) || (currentTurn === 'charizard' && charizardPotions === 0)}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
              >
                Use Potion ({currentTurn === 'pikachu' ? pikachuPotions : charizardPotions} left)
              </button>
              
              <button 
                onClick={handleMegaEvolve}
                disabled={
                  (currentTurn === 'pikachu' && (pikachuMega || !megaEvolvablePokemon.includes(pikachuPokemon))) || 
                  (currentTurn === 'charizard' && (charizardMega || !megaEvolvablePokemon.includes(charizardPokemon)))
                }
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
              >
                Mega Evolve
              </button>
              
              <button 
                onClick={() => setShowSwapMenu(!showSwapMenu)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
              >
                Swap Pokémon
              </button>
            </div>
          ) : (
            <button 
              onClick={resetBattle}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              New Battle
            </button>
          )}
          
          {showSwapMenu && !isGameOver && (
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-blue-800">Choose Pokémon:</h3>
              {['Pikachu', 'Charizard', 'Blastoise', 'Venusaur', 'Gyarados'].map(pokemon => (
                <button
                  key={pokemon}
                  onClick={() => handleSwapPokemon(pokemon)}
                  className="w-full bg-white hover:bg-blue-100 text-gray-800 font-medium py-2 px-4 rounded border transition-colors"
                >
                  {pokemon}
                </button>
              ))}
            </div>
          )}
          
          {battleLog.length > 0 && (
            <div className="bg-gray-100 rounded-lg p-4 max-h-32 overflow-y-auto">
              <h3 className="font-semibold text-gray-800 mb-2">Battle Log:</h3>
              {battleLog.map((log, index) => (
                <p key={index} className="text-sm text-gray-600">{log}</p>
              ))}
            </div>
          )}
          
          <div className="flex justify-center space-x-4">
            <Link href="/">
              <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                Back to Home
              </button>
            </Link>
            <Link href="/statistics">
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                View Statistics
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
