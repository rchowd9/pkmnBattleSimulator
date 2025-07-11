import { useRoute } from "wouter";
import { Link } from "wouter";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";

export default function Battle() {
  const [, params] = useRoute("/battle/:id");
  const battleId = params?.id || "1";
  
  // Load teams from localStorage
  const trainer1Team: string[] = JSON.parse(localStorage.getItem("trainer1Team") || '["Pikachu","Pikachu","Pikachu","Pikachu","Pikachu","Pikachu"]');
  const trainer2Team: string[] = JSON.parse(localStorage.getItem("trainer2Team") || '["Charizard","Charizard","Charizard","Charizard","Charizard","Charizard"]');

  // Add state setters for teams
  const [trainer1TeamState, setTrainer1Team] = useState(trainer1Team);
  const [trainer2TeamState, setTrainer2Team] = useState(trainer2Team);
  // Use trainer1TeamState and trainer2TeamState throughout the file for updates.

  // --- TEAM-BASED STATE & HELPERS ---
  // State for each trainer: team, activeIndex, hp, mega, potions
  // Helper functions for getting/setting active Pokémon, HP, Mega, Potions
  // (This is the foundation for the rest of the refactor.)
  const [trainer1Active, setTrainer1Active] = useState(0);
  const [trainer2Active, setTrainer2Active] = useState(0);
  const [trainer1HP, setTrainer1HP] = useState(Array(6).fill(100));
  const [trainer2HP, setTrainer2HP] = useState(Array(6).fill(100));
  const [trainer1Mega, setTrainer1Mega] = useState(Array(6).fill(false));
  const [trainer2Mega, setTrainer2Mega] = useState(Array(6).fill(false));
  const [trainer1Potions, setTrainer1Potions] = useState(Array(6).fill(3));
  const [trainer2Potions, setTrainer2Potions] = useState(Array(6).fill(3));

  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'pikachu' | 'charizard'>('pikachu');
  const [selectedMove, setSelectedMove] = useState<string>('');
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [showSwapMenu, setShowSwapMenu] = useState(false);
  const [showPotionMenu, setShowPotionMenu] = useState(false);

  const [, setLocation] = useLocation();

  const handleStartBattle = useCallback(() => {
    localStorage.setItem("trainer1Pokemon", trainer1TeamState[trainer1Active]);
    localStorage.setItem("trainer2Pokemon", trainer2TeamState[trainer2Active]);
    setLocation("/battle/1");
  }, [trainer1Active, trainer2Active, setLocation]);

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

  // --- TEAM-BASED STATE & HELPERS ---
  // State for each trainer: team, activeIndex, hp, mega, potions
  // Helper functions for getting/setting active Pokémon, HP, Mega, Potions
  // (This is the foundation for the rest of the refactor.)
  const getActivePokemon = (team: string[], active: number) => team[active];
  const getActiveHP = (hpArr: number[], active: number) => hpArr[active];
  const getActiveMega = (megaArr: boolean[], active: number) => megaArr[active];
  const getActivePotions = (potArr: number[], active: number) => potArr[active];

  // --- TEAM-BASED BATTLE ACTIONS & FAINTING/SWITCHING LOGIC ---
  // 1. All actions (attack, mega, potion, switching) update the correct Pokémon in the team arrays using the active index.
  // 2. When a Pokémon’s HP drops to 0, force a switch (player: swap menu, AI: auto-pick next available).
  // 3. Win/lose logic: game ends when all 6 Pokémon on a team are fainted.
  // (UI and AI updates will follow in the next step.)
  const handleAttack = (moveName?: string) => {
    let baseDamage = Math.floor(Math.random() * 20) + 10; // Random damage between 10-30
    
    // Mega evolution bonus
    if (currentTurn === 'pikachu' && getActiveMega(trainer1Mega, trainer1Active)) {
      baseDamage = Math.floor(baseDamage * 1.5);
    } else if (currentTurn === 'charizard' && getActiveMega(trainer2Mega, trainer2Active)) {
      baseDamage = Math.floor(baseDamage * 1.5);
    }
    
    if (currentTurn === 'pikachu') {
      const attackName = moveName || getPokemonMove(getActivePokemon(trainer1TeamState, trainer1Active), getActiveMega(trainer1Mega, trainer1Active));
      const attackType = getMoveType(attackName);
      const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer2TeamState, trainer2Active), getActiveMega(trainer2Mega, trainer2Active));
      const effectiveness = getTypeEffectiveness(attackType, defenderTypes);
      const finalDamage = Math.floor(baseDamage * effectiveness);
      
      const newHP = Math.max(0, getActiveHP(trainer2HP, trainer2Active) - finalDamage);
      setTrainer2HP(prev => prev.map((hp, i) => i === trainer2Active ? newHP : hp));
      
      let effectivenessMessage = '';
      if (effectiveness === 0.0) {
        effectivenessMessage = ' It has no effect...';
      } else if (effectiveness > 1.0) {
        effectivenessMessage = ' It\'s super effective!';
      } else if (effectiveness < 1.0) {
        effectivenessMessage = ' It\'s not very effective...';
      }
      
      setBattleLog(prev => [...prev, `${getActivePokemon(trainer1TeamState, trainer1Active)} uses ${attackName} for ${finalDamage} damage!${effectivenessMessage}`]);
      setCurrentTurn('charizard');
      setSelectedMove('');
      setShowMoveMenu(false);
      
      if (newHP <= 0) {
        setBattleLog(prev => [...prev, `${getActivePokemon(trainer2TeamState, trainer2Active)} fainted! ${getActivePokemon(trainer1TeamState, trainer1Active)} wins!`]);
        setTrainer2Active(prev => (prev + 1) % 6); // Force switch to next Pokémon
      }
    } else {
      const attackName = moveName || getPokemonMove(getActivePokemon(trainer2TeamState, trainer2Active), getActiveMega(trainer2Mega, trainer2Active));
      const attackType = getMoveType(attackName);
      const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer1TeamState, trainer1Active), getActiveMega(trainer1Mega, trainer1Active));
      const effectiveness = getTypeEffectiveness(attackType, defenderTypes);
      const finalDamage = Math.floor(baseDamage * effectiveness);
      
      const newHP = Math.max(0, getActiveHP(trainer1HP, trainer1Active) - finalDamage);
      setTrainer1HP(prev => prev.map((hp, i) => i === trainer1Active ? newHP : hp));
      
      let effectivenessMessage = '';
      if (effectiveness === 0.0) {
        effectivenessMessage = ' It has no effect...';
      } else if (effectiveness > 1.0) {
        effectivenessMessage = ' It\'s super effective!';
      } else if (effectiveness < 1.0) {
        effectivenessMessage = ' It\'s not very effective...';
      }
      
      setBattleLog(prev => [...prev, `${getActivePokemon(trainer2TeamState, trainer2Active)} uses ${attackName} for ${finalDamage} damage!${effectivenessMessage}`]);
      setCurrentTurn('pikachu');
      setSelectedMove('');
      setShowMoveMenu(false);
      
      if (newHP <= 0) {
        setBattleLog(prev => [...prev, `${getActivePokemon(trainer1TeamState, trainer1Active)} fainted! ${getActivePokemon(trainer2TeamState, trainer2Active)} wins!`]);
        setTrainer1Active(prev => (prev + 1) % 6); // Force switch to next Pokémon
      }
    }
  };

  // List of Pokémon that can Mega Evolve
  const megaEvolvablePokemon = ['Charizard', 'Blastoise', 'Venusaur', 'Gengar', 'Alakazam'];

  const handleMegaEvolve = () => {
    if (currentTurn === 'pikachu' && !getActiveMega(trainer1Mega, trainer1Active) && megaEvolvablePokemon.includes(getActivePokemon(trainer1TeamState, trainer1Active))) {
      setTrainer1Mega(prev => prev.map((mega, i) => i === trainer1Active ? true : mega));
      setBattleLog(prev => [...prev, `${getActivePokemon(trainer1TeamState, trainer1Active)} Mega Evolves!`]);
      setCurrentTurn('charizard');
    } else if (currentTurn === 'charizard' && !getActiveMega(trainer2Mega, trainer2Active) && megaEvolvablePokemon.includes(getActivePokemon(trainer2TeamState, trainer2Active))) {
      setTrainer2Mega(prev => prev.map((mega, i) => i === trainer2Active ? true : mega));
      setBattleLog(prev => [...prev, `${getActivePokemon(trainer2TeamState, trainer2Active)} Mega Evolves!`]);
      setCurrentTurn('pikachu');
    }
  };

  const handleSwapPokemon = (newPokemon: string) => {
    if (currentTurn === 'pikachu') {
      setTrainer1Team((prev: string[]) => prev.map((pokemon: string, i: number) => i === trainer1Active ? newPokemon : pokemon));
      setTrainer1HP((prev: number[]) => prev.map((hp: number, i: number) => i === trainer1Active ? 100 : hp));
      setTrainer1Mega((prev: boolean[]) => prev.map((mega: boolean, i: number) => i === trainer1Active ? false : mega));
      setBattleLog((prev: string[]) => [...prev, `Trainer 1 swaps to ${newPokemon}!`]);
      setCurrentTurn('charizard');
    } else {
      setTrainer2Team((prev: string[]) => prev.map((pokemon: string, i: number) => i === trainer2Active ? newPokemon : pokemon));
      setTrainer2HP((prev: number[]) => prev.map((hp: number, i: number) => i === trainer2Active ? 100 : hp));
      setTrainer2Mega((prev: boolean[]) => prev.map((mega: boolean, i: number) => i === trainer2Active ? false : mega));
      setBattleLog((prev: string[]) => [...prev, `Trainer 2 swaps to ${newPokemon}!`]);
      setCurrentTurn('pikachu');
    }
    setShowSwapMenu(false);
  };

  const handleUsePotion = () => {
    const healAmount = 50; // Potion heals 50 HP
    
    if (currentTurn === 'pikachu' && getActivePotions(trainer1Potions, trainer1Active) > 0) {
      const newHP = Math.min(100, getActiveHP(trainer1HP, trainer1Active) + healAmount);
      setTrainer1HP(prev => prev.map((hp, i) => i === trainer1Active ? newHP : hp));
      setTrainer1Potions(prev => prev.map((pot, i) => i === trainer1Active ? prev[i] - 1 : pot));
      setBattleLog(prev => [...prev, `Trainer 1 uses a Potion! ${getActivePokemon(trainer1TeamState, trainer1Active)} recovers ${healAmount} HP!`]);
      setCurrentTurn('charizard');
    } else if (currentTurn === 'charizard' && getActivePotions(trainer2Potions, trainer2Active) > 0) {
      const newHP = Math.min(100, getActiveHP(trainer2HP, trainer2Active) + healAmount);
      setTrainer2HP(prev => prev.map((hp, i) => i === trainer2Active ? newHP : hp));
      setTrainer2Potions(prev => prev.map((pot, i) => i === trainer2Active ? prev[i] - 1 : pot));
      setBattleLog(prev => [...prev, `Trainer 2 uses a Potion! ${getActivePokemon(trainer2TeamState, trainer2Active)} recovers ${healAmount} HP!`]);
      setCurrentTurn('pikachu');
    }
  };

  const resetBattle = () => {
    setTrainer1HP(Array(6).fill(100));
    setTrainer2HP(Array(6).fill(100));
    setBattleLog([]);
    setCurrentTurn('pikachu');
    setTrainer1Mega(Array(6).fill(false));
    setTrainer2Mega(Array(6).fill(false));
    setTrainer1Team(JSON.parse(localStorage.getItem("trainer1Team") || '["Pikachu","Pikachu","Pikachu","Pikachu","Pikachu","Pikachu"]'));
    setTrainer2Team(JSON.parse(localStorage.getItem("trainer2Team") || '["Charizard","Charizard","Charizard","Charizard","Charizard","Charizard"]'));
    setTrainer1Active(0);
    setTrainer2Active(0);
    setTrainer1Potions(Array(6).fill(3));
    setTrainer2Potions(Array(6).fill(3));
    setShowSwapMenu(false);
    setShowMoveMenu(false);
    setSelectedMove('');
  };

  const isGameOver = getActiveHP(trainer1HP, trainer1Active) <= 0 || getActiveHP(trainer2HP, trainer2Active) <= 0;

  // Detect if Trainer 2 is AI
  const trainer2IsAI = localStorage.getItem("trainer2IsAI") === "true";

  // AI logic: decide and perform action for Trainer 2
  // --- SMART AI SWITCHING LOGIC (Step 3 Final, Integrated) ---
  useEffect(() => {
    if (!trainer2IsAI || currentTurn !== 'charizard') return;

    // Helper: Find best AI switch candidate (least expected damage from player's best move)
    function findBestAISwitch(): number | null {
      let bestIdx: number | null = null;
      let bestScore = Infinity;
      for (let i = 0; i < trainer2TeamState.length; i++) {
        if (getActiveHP(trainer2HP, i) <= 0 || i === trainer2Active) continue; // skip fainted or current
        // Estimate damage from player's best move
        const playerMoves = pokemonTypesData[getActivePokemon(trainer1TeamState, trainer1Active)]?.moves || [];
        let worst = 0;
        for (const move of playerMoves) {
          const moveType = getMoveType(move);
          const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer2TeamState, i), getActiveMega(trainer2Mega, i));
          const eff = getTypeEffectiveness(moveType, defenderTypes);
          if (eff > worst) worst = eff;
        }
        if (worst < bestScore) {
          bestScore = worst;
          bestIdx = i;
        }
      }
      return bestIdx;
    }

    // Forced switch if fainted
    if (getActiveHP(trainer2HP, trainer2Active) <= 0) {
      const bestIdx = findBestAISwitch();
      if (bestIdx !== null) {
        setTrainer2Active(bestIdx);
        setBattleLog(prev => [...prev, `AI switches to ${getActivePokemon(trainer2TeamState, bestIdx)}!`]);
        setTimeout(() => setCurrentTurn('pikachu'), 800);
      } else {
        setBattleLog(prev => [...prev, "AI has no Pokémon left!"]);
      }
      return;
    }

    // Proactive switch if at severe disadvantage
    const playerMoves = pokemonTypesData[getActivePokemon(trainer1TeamState, trainer1Active)]?.moves || [];
    let maxEffectiveness = 0;
    for (const move of playerMoves) {
      const moveType = getMoveType(move);
      const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer2TeamState, trainer2Active), getActiveMega(trainer2Mega, trainer2Active));
      const eff = getTypeEffectiveness(moveType, defenderTypes);
      if (eff > maxEffectiveness) maxEffectiveness = eff;
    }
    if (maxEffectiveness > 1.5) { // threshold for 'severe disadvantage'
      const bestIdx = findBestAISwitch();
      if (bestIdx !== null) {
        setTrainer2Active(bestIdx);
        setBattleLog(prev => [...prev, `AI switches to ${getActivePokemon(trainer2TeamState, bestIdx)}!`]);
        setTimeout(() => setCurrentTurn('pikachu'), 800);
        return;
      }
    }

    // Otherwise, fallback to potion, mega, or best move (existing logic)
    // 1. Use potion if HP is low and potions left
    if (getActiveHP(trainer2HP, trainer2Active) <= 35 && getActivePotions(trainer2Potions, trainer2Active) > 0) {
      setTimeout(() => handleUsePotion(), 800);
      return;
    }
    // 2. Mega Evolve if not already and can mega evolve
    if (!getActiveMega(trainer2Mega, trainer2Active) && megaEvolvablePokemon.includes(getActivePokemon(trainer2TeamState, trainer2Active))) {
      setTimeout(() => handleMegaEvolve(), 800);
      return;
    }
    // 3. Pick the move that does the most damage
    const moves = pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)]?.megaMoves && getActiveMega(trainer2Mega, trainer2Active)
      ? pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)].megaMoves
      : pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)]?.moves;
    let bestMove = moves?.[0] || '';
    let bestDamage = 0;
    for (const move of moves || []) {
      const moveType = getMoveType(move);
      const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer1TeamState, trainer1Active), getActiveMega(trainer1Mega, trainer1Active));
      const effectiveness = getTypeEffectiveness(moveType, defenderTypes);
      // Simulate random base damage (use average)
      const baseDamage = 20;
      const totalDamage = Math.floor(baseDamage * effectiveness);
      if (totalDamage > bestDamage) {
        bestDamage = totalDamage;
        bestMove = move;
      }
    }
    setTimeout(() => handleAttack(bestMove), 1200);
  }, [
    currentTurn, trainer2IsAI, trainer2Active, trainer2HP, trainer2TeamState, trainer2Mega,
    trainer1Active, trainer1TeamState, trainer1Mega, trainer1HP, setTrainer2Active, setBattleLog, setCurrentTurn,
    getActiveHP, getActivePotions, getActiveMega, getActivePokemon, getPokemonTypesWithMega, getMoveType, getTypeEffectiveness,
    megaEvolvablePokemon, handleUsePotion, handleMegaEvolve, handleAttack
  ]);

// --- SMART AI SWITCHING LOGIC (Step 3 Final) ---
// 1. When the AI’s active Pokémon faints, scan for the best available non-fainted Pokémon (highest HP or best type matchup) and switch.
// 2. On its turn, if at a severe type disadvantage, proactively switch to a better matchup.
// 3. Otherwise, use potion, mega, or best move as before.
// (This completes Step 3.)
// ... (rest of the implementation will follow) ...

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
              {trainer1TeamState.map((pokemon, index) => (
                <div key={index} className="bg-white rounded p-3">
                  <p className="font-medium">
                    <span className="text-2xl mr-2">{getPokemonImage(pokemon)}</span>
                    {pokemon} {getActiveMega(trainer1Mega, index) && <span className="text-purple-600">(Mega)</span>}
                  </p>
                  <p className="text-sm text-gray-600">HP: {getActiveHP(trainer1HP, index)}/100</p>
                  <p className="text-xs text-blue-600">Type: {getPokemonTypeWithMega(pokemon, getActiveMega(trainer1Mega, index))}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(getActiveHP(trainer1HP, index) / 100) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Potions: {getActivePotions(trainer1Potions, index)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">{trainer2IsAI ? 'AI' : 'Trainer 2'}</h2>
            <div className="space-y-2">
              {trainer2TeamState.map((pokemon, index) => (
                <div key={index} className="bg-white rounded p-3">
                  <p className="font-medium">
                    <span className="text-2xl mr-2">{getPokemonImage(pokemon)}</span>
                    {pokemon} {getActiveMega(trainer2Mega, index) && <span className="text-purple-600">(Mega)</span>}
                  </p>
                  <p className="text-sm text-gray-600">HP: {getActiveHP(trainer2HP, index)}/100</p>
                  <p className="text-xs text-blue-600">Type: {getPokemonTypeWithMega(pokemon, getActiveMega(trainer2Mega, index))}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(getActiveHP(trainer2HP, index) / 100) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Potions: {getActivePotions(trainer2Potions, index)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center space-y-4">
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Current Turn: {currentTurn === 'pikachu' ? getActivePokemon(trainer1TeamState, trainer1Active) : (trainer2IsAI ? 'AI' : getActivePokemon(trainer2TeamState, trainer2Active))}
            </p>
          </div>
          
          {!isGameOver && (
            <>
              {currentTurn === 'pikachu' ? (
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
                        const currentPokemon = getActivePokemon(trainer1TeamState, trainer1Active);
                        const isMega = getActiveMega(trainer1Mega, trainer1Active);
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
                    disabled={getActivePotions(trainer1Potions, trainer1Active) === 0}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
                  >
                    Use Potion ({getActivePotions(trainer1Potions, trainer1Active)} left)
                  </button>
                  
                  <button 
                    onClick={handleMegaEvolve}
                    disabled={getActiveMega(trainer1Mega, trainer1Active) || !megaEvolvablePokemon.includes(getActivePokemon(trainer1TeamState, trainer1Active))}
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
              ) : currentTurn === 'charizard' && trainer2IsAI ? (
                <div className="space-y-2">
                  <div className="bg-yellow-100 rounded-lg p-4">
                    <p className="text-lg font-semibold text-yellow-800">AI is thinking...</p>
                  </div>
                </div>
              ) : (
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
                        const currentPokemon = getActivePokemon(trainer2TeamState, trainer2Active);
                        const isMega = getActiveMega(trainer2Mega, trainer2Active);
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
                    disabled={getActivePotions(trainer2Potions, trainer2Active) === 0}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full"
                  >
                    Use Potion ({getActivePotions(trainer2Potions, trainer2Active)} left)
                  </button>
                  
                  <button 
                    onClick={handleMegaEvolve}
                    disabled={getActiveMega(trainer2Mega, trainer2Active) || !megaEvolvablePokemon.includes(getActivePokemon(trainer2TeamState, trainer2Active))}
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
              )}
            </>
          )}
          
          {isGameOver && (
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
              {['Pikachu', 'Charizard', 'Blastoise', 'Venusaur', 'Gengar', 'Alakazam'].map(pokemon => (
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
