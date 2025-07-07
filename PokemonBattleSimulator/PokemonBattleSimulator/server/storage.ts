import { 
  users, trainers, pokemon, battles, battleStates,
  type User, type Trainer, type Pokemon, type Battle, type BattleState,
  type InsertUser, type InsertTrainer, type InsertPokemon, type InsertBattle, type InsertBattleState
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Trainer operations
  getTrainer(id: number): Promise<Trainer | undefined>;
  getTrainersByUserId(userId: number): Promise<Trainer[]>;
  createTrainer(trainer: InsertTrainer): Promise<Trainer>;
  updateTrainer(id: number, updates: Partial<Trainer>): Promise<Trainer>;
  
  // Pokemon operations
  getPokemon(id: number): Promise<Pokemon | undefined>;
  getPokemonByTrainerId(trainerId: number): Promise<Pokemon[]>;
  createPokemon(pokemon: InsertPokemon): Promise<Pokemon>;
  updatePokemon(id: number, updates: Partial<Pokemon>): Promise<Pokemon>;
  
  // Battle operations
  getBattle(id: number): Promise<Battle | undefined>;
  getBattlesByTrainerId(trainerId: number): Promise<Battle[]>;
  createBattle(battle: InsertBattle): Promise<Battle>;
  updateBattle(id: number, updates: Partial<Battle>): Promise<Battle>;
  
  // Battle state operations
  getBattleState(battleId: number): Promise<BattleState | undefined>;
  createBattleState(battleState: InsertBattleState): Promise<BattleState>;
  updateBattleState(battleId: number, updates: Partial<BattleState>): Promise<BattleState>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private trainers: Map<number, Trainer> = new Map();
  private pokemon: Map<number, Pokemon> = new Map();
  private battles: Map<number, Battle> = new Map();
  private battleStates: Map<number, BattleState> = new Map();
  
  private currentUserId = 1;
  private currentTrainerId = 1;
  private currentPokemonId = 1;
  private currentBattleId = 1;
  private currentBattleStateId = 1;

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.currentUserId++,
      ...insertUser,
      createdAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Trainer operations
  async getTrainer(id: number): Promise<Trainer | undefined> {
    return this.trainers.get(id);
  }

  async getTrainersByUserId(userId: number): Promise<Trainer[]> {
    return Array.from(this.trainers.values()).filter(t => t.userId === userId);
  }

  async createTrainer(insertTrainer: InsertTrainer): Promise<Trainer> {
    const trainer: Trainer = {
      id: this.currentTrainerId++,
      ...insertTrainer,
      createdAt: new Date(),
    };
    this.trainers.set(trainer.id, trainer);
    return trainer;
  }

  async updateTrainer(id: number, updates: Partial<Trainer>): Promise<Trainer> {
    const trainer = this.trainers.get(id);
    if (!trainer) throw new Error('Trainer not found');
    
    const updatedTrainer = { ...trainer, ...updates };
    this.trainers.set(id, updatedTrainer);
    return updatedTrainer;
  }

  // Pokemon operations
  async getPokemon(id: number): Promise<Pokemon | undefined> {
    return this.pokemon.get(id);
  }

  async getPokemonByTrainerId(trainerId: number): Promise<Pokemon[]> {
    return Array.from(this.pokemon.values()).filter(p => p.trainerId === trainerId);
  }

  async createPokemon(insertPokemon: InsertPokemon): Promise<Pokemon> {
    const pokemon: Pokemon = {
      id: this.currentPokemonId++,
      ...insertPokemon,
      createdAt: new Date(),
    };
    this.pokemon.set(pokemon.id, pokemon);
    return pokemon;
  }

  async updatePokemon(id: number, updates: Partial<Pokemon>): Promise<Pokemon> {
    const pokemon = this.pokemon.get(id);
    if (!pokemon) throw new Error('Pokemon not found');
    
    const updatedPokemon = { ...pokemon, ...updates };
    this.pokemon.set(id, updatedPokemon);
    return updatedPokemon;
  }

  // Battle operations
  async getBattle(id: number): Promise<Battle | undefined> {
    return this.battles.get(id);
  }

  async getBattlesByTrainerId(trainerId: number): Promise<Battle[]> {
    return Array.from(this.battles.values()).filter(
      b => b.trainer1Id === trainerId || b.trainer2Id === trainerId
    );
  }

  async createBattle(insertBattle: InsertBattle): Promise<Battle> {
    const battle: Battle = {
      id: this.currentBattleId++,
      ...insertBattle,
      createdAt: new Date(),
      completedAt: null,
    };
    this.battles.set(battle.id, battle);
    return battle;
  }

  async updateBattle(id: number, updates: Partial<Battle>): Promise<Battle> {
    const battle = this.battles.get(id);
    if (!battle) throw new Error('Battle not found');
    
    const updatedBattle = { ...battle, ...updates };
    this.battles.set(id, updatedBattle);
    return updatedBattle;
  }

  // Battle state operations
  async getBattleState(battleId: number): Promise<BattleState | undefined> {
    return Array.from(this.battleStates.values()).find(bs => bs.battleId === battleId);
  }

  async createBattleState(insertBattleState: InsertBattleState): Promise<BattleState> {
    const battleState: BattleState = {
      id: this.currentBattleStateId++,
      ...insertBattleState,
      updatedAt: new Date(),
    };
    this.battleStates.set(battleState.id, battleState);
    return battleState;
  }

  async updateBattleState(battleId: number, updates: Partial<BattleState>): Promise<BattleState> {
    const battleState = Array.from(this.battleStates.values()).find(bs => bs.battleId === battleId);
    if (!battleState) throw new Error('Battle state not found');
    
    const updatedBattleState = { ...battleState, ...updates, updatedAt: new Date() };
    this.battleStates.set(battleState.id, updatedBattleState);
    return updatedBattleState;
  }
}

export const storage = new MemStorage();
