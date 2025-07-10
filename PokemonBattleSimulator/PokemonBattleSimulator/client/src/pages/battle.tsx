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
  const [selectedMove, setSelectedMove] = useState<string>('');
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  const [, setLocation] = useLocation();

  const handleStartBattle = useCallback(() => {
    localStorage.setItem("trainer1Pokemon", pikachuPokemon);
    localStorage.setItem("trainer2Pokemon", charizardPokemon);
    setLocation("/battle/1");
  }, [pikachuPokemon, charizardPokemon, setLocation]);

  // Pokémon types and moves mapping
  const pokemonData: { [key: string]: { type: string; moves: { normal: string; mega: string } } } = {
    'Pikachu': { type: 'Electric', moves: { normal: 'Thunderbolt', mega: 'Thunderbolt' } },
    'Charizard': { type: 'Fire', moves: { normal: 'Flamethrower', mega: 'Mega Flamethrower' } },
    'Blastoise': { type: 'Water', moves: { normal: 'Hydro Pump', mega: 'Mega Hydro Pump' } },
    'Venusaur': { type: 'Grass', moves: { normal: 'Solar Beam', mega: 'Mega Solar Beam' } },
    'Gyarados': { type: 'Water', moves: { normal: 'Hydro Pump', mega: 'Mega Hydro Pump' } }
  };

  // Extended Pokémon data with multiple moves and dual types
  const pokemonMovesData: { [key: string]: { type: string; moves: string[]; megaMoves: string[] } } = {
    'Pikachu': { 
      type: 'Electric', 
      moves: ['Thunderbolt', 'Quick Attack', 'Thunder Wave', 'Iron Tail'],
      megaMoves: ['Thunderbolt', 'Quick Attack', 'Thunder Wave', 'Iron Tail']
    },
    'Charizard': { 
      type: 'Fire', 
      moves: ['Flamethrower', 'Air Slash', 'Dragon Claw', 'Earthquake'],
      megaMoves: ['Mega Flamethrower', 'Air Slash', 'Dragon Claw', 'Earthquake']
    },
    'Blastoise': { 
      type: 'Water', 
      moves: ['Hydro Pump', 'Ice Beam', 'Skull Bash', 'Flash Cannon'],
      megaMoves: ['Mega Hydro Pump', 'Ice Beam', 'Skull Bash', 'Flash Cannon']
    },
    'Venusaur': { 
      type: 'Grass', 
      moves: ['Solar Beam', 'Sludge Bomb', 'Earthquake', 'Sleep Powder'],
      megaMoves: ['Mega Solar Beam', 'Sludge Bomb', 'Earthquake', 'Sleep Powder']
    },
    'Gyarados': { 
      type: 'Water', 
      moves: ['Hydro Pump', 'Dragon Rage', 'Hyper Beam', 'Thunder'],
      megaMoves: ['Mega Hydro Pump', 'Dragon Rage', 'Hyper Beam', 'Thunder']
    }
  };

  // Pokémon data with dual types support and Mega Evolution typings
  // Note: Most Mega Evolutions don't change types, only Charizard X and Gyarados do
  const pokemonTypesData: { [key: string]: { types: string[]; megaTypes?: string[]; moves: string[]; megaMoves: string[] } } = {
    'Pikachu': { 
      types: ['Electric'], 
      moves: ['Thunderbolt', 'Quick Attack', 'Thunder Wave', 'Iron Tail'],
      megaMoves: ['Thunderbolt', 'Quick Attack', 'Thunder Wave', 'Iron Tail']
    },
    'Charizard': { 
      types: ['Fire', 'Flying'], 
      megaTypes: ['Fire', 'Dragon'], // Mega Charizard X becomes Fire/Dragon
      moves: ['Flamethrower', 'Air Slash', 'Dragon Claw', 'Earthquake'],
      megaMoves: ['Mega Flamethrower', 'Air Slash', 'Dragon Claw', 'Earthquake']
    },
    'Blastoise': { 
      types: ['Water'], 
      moves: ['Hydro Pump', 'Ice Beam', 'Skull Bash', 'Flash Cannon'],
      megaMoves: ['Mega Hydro Pump', 'Ice Beam', 'Skull Bash', 'Flash Cannon']
    },
    'Venusaur': { 
      types: ['Grass', 'Poison'], 
      moves: ['Solar Beam', 'Sludge Bomb', 'Earthquake', 'Sleep Powder'],
      megaMoves: ['Mega Solar Beam', 'Sludge Bomb', 'Earthquake', 'Sleep Powder']
    },
    'Gyarados': { 
      types: ['Water', 'Flying'], 
      megaTypes: ['Water', 'Dark'], // Mega Gyarados becomes Water/Dark
      moves: ['Hydro Pump', 'Dragon Rage', 'Hyper Beam', 'Thunder'],
      megaMoves: ['Mega Hydro Pump', 'Dragon Rage', 'Hyper Beam', 'Thunder']
    },
    'Gengar': { 
      types: ['Ghost', 'Poison'], 
      moves: ['Shadow Ball', 'Sludge Bomb', 'Psychic', 'Thunderbolt'],
      megaMoves: ['Mega Shadow Ball', 'Sludge Bomb', 'Psychic', 'Thunderbolt']
    },
    'Alakazam': { 
      types: ['Psychic'], 
      moves: ['Psychic', 'Shadow Ball', 'Focus Blast', 'Energy Ball'],
      megaMoves: ['Mega Psychic', 'Shadow Ball', 'Focus Blast', 'Energy Ball']
    },
    'Machamp': { 
      types: ['Fighting'], 
      moves: ['Dynamic Punch', 'Rock Slide', 'Earthquake', 'Ice Punch'],
      megaMoves: ['Mega Dynamic Punch', 'Rock Slide', 'Earthquake', 'Ice Punch']
    },
    'Steelix': { 
      types: ['Steel', 'Ground'], 
      moves: ['Iron Tail', 'Earthquake', 'Rock Slide', 'Crunch'],
      megaMoves: ['Mega Iron Tail', 'Earthquake', 'Rock Slide', 'Crunch']
    },
    'Scizor': { 
      types: ['Bug', 'Steel'], 
      moves: ['X-Scissor', 'Bullet Punch', 'Iron Head', 'Wing Attack'],
      megaMoves: ['Mega X-Scissor', 'Bullet Punch', 'Iron Head', 'Wing Attack']
    }
  };

  // Move types - each move has its own type
  const moveTypes: { [key: string]: string } = {
    // Pikachu moves
    'Thunderbolt': 'Electric',
    'Quick Attack': 'Normal',
    'Thunder Wave': 'Electric',
    'Iron Tail': 'Steel',
    
    // Charizard moves
    'Flamethrower': 'Fire',
    'Mega Flamethrower': 'Fire',
    'Air Slash': 'Flying',
    'Dragon Claw': 'Dragon',
    'Earthquake': 'Ground',
    
    // Blastoise moves
    'Hydro Pump': 'Water',
    'Mega Hydro Pump': 'Water',
    'Ice Beam': 'Ice',
    'Skull Bash': 'Normal',
    'Flash Cannon': 'Steel',
    
    // Venusaur moves
    'Solar Beam': 'Grass',
    'Mega Solar Beam': 'Grass',
    'Sludge Bomb': 'Poison',
    'Sleep Powder': 'Grass',
    
    // Gyarados moves
    'Dragon Rage': 'Dragon',
    'Hyper Beam': 'Normal',
    'Thunder': 'Electric',
    
    // Gengar moves
    'Shadow Ball': 'Ghost',
    'Mega Shadow Ball': 'Ghost',
    
    // Alakazam moves
    'Focus Blast': 'Fighting',
    'Energy Ball': 'Grass',
    
    // Machamp moves
    'Dynamic Punch': 'Fighting',
    'Mega Dynamic Punch': 'Fighting',
    'Rock Slide': 'Rock',
    'Ice Punch': 'Ice',
    
    // Steelix moves
    'Mega Iron Tail': 'Steel',
    'Crunch': 'Dark',
    
    // Scizor moves
    'X-Scissor': 'Bug',
    'Mega X-Scissor': 'Bug',
    'Bullet Punch': 'Steel',
    'Iron Head': 'Steel',
    'Wing Attack': 'Flying'
  };

  const getMoveType = (moveName: string): string => {
    return moveTypes[moveName] || 'Normal';
  };

  // Type effectiveness chart - based on official Bulbapedia type chart
  const typeEffectiveness: { [key: string]: { [key: string]: number } } = {
    'Normal': { 
      Rock: 0.5, Ghost: 0.0, Steel: 0.5 
    },
    'Fire': { 
      Fire: 0.5, Water: 0.5, Grass: 2.0, Ice: 2.0, Bug: 2.0, Rock: 0.5, Dragon: 0.5, Steel: 2.0 
    },
    'Water': { 
      Fire: 2.0, Water: 0.5, Grass: 0.5, Ground: 2.0, Rock: 2.0, Dragon: 0.5 
    },
    'Electric': { 
      Water: 2.0, Electric: 0.5, Grass: 0.5, Ground: 0.0, Flying: 2.0, Dragon: 0.5 
    },
    'Grass': { 
      Fire: 0.5, Water: 2.0, Grass: 0.5, Poison: 0.5, Ground: 2.0, Flying: 0.5, Bug: 0.5, Rock: 2.0, Dragon: 0.5, Steel: 0.5 
    },
    'Ice': { 
      Fire: 0.5, Water: 0.5, Grass: 2.0, Ice: 0.5, Ground: 2.0, Flying: 2.0, Dragon: 2.0, Steel: 0.5 
    },
    'Fighting': { 
      Normal: 2.0, Ice: 2.0, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2.0, Ghost: 0.0, Steel: 2.0, Fairy: 0.5 
    },
    'Poison': { 
      Grass: 2.0, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0.0, Fairy: 2.0 
    },
    'Ground': { 
      Fire: 2.0, Electric: 2.0, Grass: 0.5, Poison: 2.0, Flying: 0.0, Bug: 0.5, Rock: 2.0, Steel: 2.0 
    },
    'Flying': { 
      Electric: 0.5, Grass: 2.0, Fighting: 2.0, Bug: 2.0, Rock: 0.5, Steel: 0.5 
    },
    'Psychic': { 
      Fighting: 2.0, Poison: 2.0, Psychic: 0.5, Dark: 0.0, Steel: 0.5 
    },
    'Bug': { 
      Fire: 0.5, Grass: 2.0, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2.0, Ghost: 0.5, Steel: 0.5, Dark: 2.0, Fairy: 0.5 
    },
    'Rock': { 
      Fire: 2.0, Ice: 2.0, Fighting: 0.5, Ground: 0.5, Flying: 2.0, Bug: 2.0, Steel: 0.5 
    },
    'Ghost': { 
      Normal: 0.0, Psychic: 2.0, Ghost: 2.0, Dark: 0.5 
    },
    'Dragon': { 
      Dragon: 2.0, Steel: 0.5, Fairy: 0.0 
    },
    'Dark': { 
      Fighting: 0.5, Psychic: 2.0, Ghost: 2.0, Dark: 0.5, Fairy: 0.5 
    },
    'Steel': { 
      Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2.0, Rock: 2.0, Steel: 0.5, Fairy: 2.0 
    },
    'Fairy': { 
      Fighting: 2.0, Poison: 0.5, Dragon: 2.0, Dark: 2.0, Steel: 0.5 
    }
  };

  // Calculate type effectiveness for dual types
  const getTypeEffectiveness = (attackType: string, defenderTypes: string[]): number => {
    if (defenderTypes.length === 0) return 1.0;
    
    let totalEffectiveness = 1.0;
    
    for (const defenderType of defenderTypes) {
      const effectiveness = typeEffectiveness[attackType]?.[defenderType] || 1.0;
      totalEffectiveness *= effectiveness;
    }
    
    return totalEffectiveness;
  };

  const getPokemonMove = (pokemonName: string, isMega: boolean) => {
    const pokemon = pokemonData[pokemonName];
    if (!pokemon) {
      return isMega ? 'Mega Attack' : 'Tackle'; // Default moves for unknown Pokémon
    }
    return isMega ? pokemon.moves.mega : pokemon.moves.normal;
  };

  const getPokemonTypes = (pokemonName: string): string[] => {
    return pokemonTypesData[pokemonName]?.types || ['Normal'];
  };

  const getPokemonType = (pokemonName: string) => {
    const types = getPokemonTypes(pokemonName);
    return types.join('/');
  };

  // Get Pokémon types considering Mega Evolution state
  const getPokemonTypesWithMega = (pokemonName: string, isMega: boolean): string[] => {
    const pokemon = pokemonTypesData[pokemonName];
    if (!pokemon) return ['Normal'];
    
    if (isMega && pokemon.megaTypes) {
      return pokemon.megaTypes;
    }
    return pokemon.types;
  };

  const getPokemonTypeWithMega = (pokemonName: string, isMega: boolean) => {
    const types = getPokemonTypesWithMega(pokemonName, isMega);
    return types.join('/');
  };

  // Pokémon images (using emoji as placeholders)
  const pokemonImages: { [key: string]: string } = {
    'Pikachu': '⚡',
    'Charizard': '🔥',
    'Blastoise': '💧',
    'Venusaur': '🌿',
    'Gyarados': '🐉',
    'Gengar': '👻',
    'Alakazam': '🧠',
    'Machamp': '💪',
    'Steelix': '🔗',
    'Scizor': '✂️'
  };

  const getPokemonImage = (pokemonName: string) => {
    return pokemonImages[pokemonName] || '❓';
  };

  const handleAttack = (moveName?: string) => {
    let baseDamage = Math.floor(Math.random() * 20) + 10; // Random damage between 10-30
    
    // Mega evolution bonus
    if (currentTurn === 'pikachu' && pikachuMega) {
      baseDamage = Math.floor(baseDamage * 1.5);
    } else if (currentTurn === 'charizard' && charizardMega) {
      baseDamage = Math.floor(baseDamage * 1.5);
    }
    
    if (currentTurn === 'pikachu') {
      const attackName = moveName || getPokemonMove(pikachuPokemon, pikachuMega);
      const attackType = getMoveType(attackName);
      const defenderTypes = getPokemonTypesWithMega(charizardPokemon, charizardMega);
      const effectiveness = getTypeEffectiveness(attackType, defenderTypes);
      const finalDamage = Math.floor(baseDamage * effectiveness);
      
      const newHP = Math.max(0, charizardHP - finalDamage);
      setCharizardHP(newHP);
      
      let effectivenessMessage = '';
      if (effectiveness === 0.0) {
        effectivenessMessage = ' It has no effect...';
      } else if (effectiveness > 1.0) {
        effectivenessMessage = ' It\'s super effective!';
      } else if (effectiveness < 1.0) {
        effectivenessMessage = ' It\'s not very effective...';
      }
      
      setBattleLog(prev => [...prev, `${pikachuPokemon} uses ${attackName} for ${finalDamage} damage!${effectivenessMessage}`]);
      setCurrentTurn('charizard');
      setSelectedMove('');
      setShowMoveMenu(false);
      
      if (newHP <= 0) {
        setBattleLog(prev => [...prev, `${charizardPokemon} fainted! ${pikachuPokemon} wins!`]);
      }
    } else {
      const attackName = moveName || getPokemonMove(charizardPokemon, charizardMega);
      const attackType = getMoveType(attackName);
      const defenderTypes = getPokemonTypesWithMega(pikachuPokemon, pikachuMega);
      const effectiveness = getTypeEffectiveness(attackType, defenderTypes);
      const finalDamage = Math.floor(baseDamage * effectiveness);
      
      const newHP = Math.max(0, pikachuHP - finalDamage);
      setPikachuHP(newHP);
      
      let effectivenessMessage = '';
      if (effectiveness === 0.0) {
        effectivenessMessage = ' It has no effect...';
      } else if (effectiveness > 1.0) {
        effectivenessMessage = ' It\'s super effective!';
      } else if (effectiveness < 1.0) {
        effectivenessMessage = ' It\'s not very effective...';
      }
      
      setBattleLog(prev => [...prev, `${charizardPokemon} uses ${attackName} for ${finalDamage} damage!${effectivenessMessage}`]);
      setCurrentTurn('pikachu');
      setSelectedMove('');
      setShowMoveMenu(false);
      
      if (newHP <= 0) {
        setBattleLog(prev => [...prev, `${pikachuPokemon} fainted! ${charizardPokemon} wins!`]);
      }
    }
  };

  // List of Pokémon that can Mega Evolve
  const megaEvolvablePokemon = ['Charizard', 'Blastoise', 'Venusaur', 'Gyarados', 'Gengar', 'Alakazam', 'Machamp', 'Steelix', 'Scizor'];

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
    setShowMoveMenu(false);
    setSelectedMove('');
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
                  <span className="text-2xl mr-2">{getPokemonImage(pikachuPokemon)}</span>
                  {pikachuPokemon} {pikachuMega && <span className="text-purple-600">(Mega)</span>}
                </p>
                <p className="text-sm text-gray-600">HP: {pikachuHP}/100</p>
                <p className="text-xs text-blue-600">Type: {getPokemonTypeWithMega(pikachuPokemon, pikachuMega)}</p>
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
                  <span className="text-2xl mr-2">{getPokemonImage(charizardPokemon)}</span>
                  {charizardPokemon} {charizardMega && <span className="text-purple-600">(Mega)</span>}
                </p>
                <p className="text-sm text-gray-600">HP: {charizardHP}/100</p>
                <p className="text-xs text-blue-600">Type: {getPokemonTypeWithMega(charizardPokemon, charizardMega)}</p>
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
                onClick={() => setShowMoveMenu(!showMoveMenu)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
              >
                Choose Move
              </button>
              
              {showMoveMenu && !isGameOver && (
                <div className="bg-yellow-50 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-yellow-800">Choose Move:</h3>
                  {(() => {
                    const currentPokemon = currentTurn === 'pikachu' ? pikachuPokemon : charizardPokemon;
                    const isMega = currentTurn === 'pikachu' ? pikachuMega : charizardMega;
                    const moves = pokemonTypesData[currentPokemon];
                    const moveList = isMega ? moves?.megaMoves : moves?.moves;
                    
                    return moveList?.map(move => (
                      <button
                        key={move}
                        onClick={() => handleAttack(move)}
                        className="w-full bg-white hover:bg-yellow-100 text-gray-800 font-medium py-2 px-4 rounded border transition-colors"
                      >
                        {move}
                      </button>
                    )) || [];
                  })()}
                </div>
              )}
              
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
              {['Pikachu', 'Charizard', 'Blastoise', 'Venusaur', 'Gyarados', 'Gengar', 'Alakazam', 'Machamp', 'Steelix', 'Scizor'].map(pokemon => (
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
            <div className="bg-gray-100 rounded-lg p-4 max-h-48 overflow-y-auto">
              <h3 className="font-semibold text-gray-800 mb-2">Battle Log:</h3>
              <div className="space-y-1">
                {battleLog.map((log, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-xs text-gray-500 font-mono min-w-[60px]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-gray-700 flex-1">
                      {log.includes('super effective') && (
                        <span className="text-green-600 font-semibold">⚡ {log}</span>
                      )}
                      {log.includes('not very effective') && (
                        <span className="text-red-600 font-semibold">🛡️ {log}</span>
                      )}
                      {log.includes('no effect') && (
                        <span className="text-gray-500 font-semibold">❌ {log}</span>
                      )}
                      {!log.includes('super effective') && !log.includes('not very effective') && !log.includes('no effect') && (
                        <span>{log}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
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
