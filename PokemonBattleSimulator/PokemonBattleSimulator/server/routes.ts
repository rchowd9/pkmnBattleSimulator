import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTrainerSchema, insertPokemonSchema, insertBattleSchema, insertBattleStateSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Trainers endpoints
  app.get("/api/trainers", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (userId) {
        const trainers = await storage.getTrainersByUserId(parseInt(userId));
        res.json(trainers);
      } else {
        res.status(400).json({ message: "User ID is required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trainers" });
    }
  });

  app.post("/api/trainers", async (req, res) => {
    try {
      const trainerData = insertTrainerSchema.parse(req.body);
      const trainer = await storage.createTrainer(trainerData);
      res.json(trainer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid trainer data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create trainer" });
      }
    }
  });

  app.get("/api/trainers/:id", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.id);
      const trainer = await storage.getTrainer(trainerId);
      if (!trainer) {
        res.status(404).json({ message: "Trainer not found" });
      } else {
        res.json(trainer);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trainer" });
    }
  });

  app.patch("/api/trainers/:id", async (req, res) => {
    try {
      const trainerId = parseInt(req.params.id);
      const updates = req.body;
      const trainer = await storage.updateTrainer(trainerId, updates);
      res.json(trainer);
    } catch (error) {
      res.status(500).json({ message: "Failed to update trainer" });
    }
  });

  // Pokemon endpoints
  app.get("/api/pokemon", async (req, res) => {
    try {
      const trainerId = req.query.trainerId as string;
      if (trainerId) {
        const pokemon = await storage.getPokemonByTrainerId(parseInt(trainerId));
        res.json(pokemon);
      } else {
        res.status(400).json({ message: "Trainer ID is required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Pokemon" });
    }
  });

  app.post("/api/pokemon", async (req, res) => {
    try {
      const pokemonData = insertPokemonSchema.parse(req.body);
      const pokemon = await storage.createPokemon(pokemonData);
      res.json(pokemon);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid Pokemon data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create Pokemon" });
      }
    }
  });

  app.get("/api/pokemon/:id", async (req, res) => {
    try {
      const pokemonId = parseInt(req.params.id);
      const pokemon = await storage.getPokemon(pokemonId);
      if (!pokemon) {
        res.status(404).json({ message: "Pokemon not found" });
      } else {
        res.json(pokemon);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Pokemon" });
    }
  });

  app.patch("/api/pokemon/:id", async (req, res) => {
    try {
      const pokemonId = parseInt(req.params.id);
      const updates = req.body;
      const pokemon = await storage.updatePokemon(pokemonId, updates);
      res.json(pokemon);
    } catch (error) {
      res.status(500).json({ message: "Failed to update Pokemon" });
    }
  });

  // Battle endpoints
  app.get("/api/battles", async (req, res) => {
    try {
      const trainerId = req.query.trainerId as string;
      if (trainerId) {
        const battles = await storage.getBattlesByTrainerId(parseInt(trainerId));
        res.json(battles);
      } else {
        res.status(400).json({ message: "Trainer ID is required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch battles" });
    }
  });

  app.post("/api/battles", async (req, res) => {
    try {
      const battleData = insertBattleSchema.parse(req.body);
      const battle = await storage.createBattle(battleData);
      res.json(battle);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid battle data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create battle" });
      }
    }
  });

  app.get("/api/battles/:id", async (req, res) => {
    try {
      const battleId = parseInt(req.params.id);
      const battle = await storage.getBattle(battleId);
      if (!battle) {
        res.status(404).json({ message: "Battle not found" });
      } else {
        res.json(battle);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch battle" });
    }
  });

  app.patch("/api/battles/:id", async (req, res) => {
    try {
      const battleId = parseInt(req.params.id);
      const updates = req.body;
      const battle = await storage.updateBattle(battleId, updates);
      res.json(battle);
    } catch (error) {
      res.status(500).json({ message: "Failed to update battle" });
    }
  });

  // Battle state endpoints
  app.get("/api/battles/:id/state", async (req, res) => {
    try {
      const battleId = parseInt(req.params.id);
      const battleState = await storage.getBattleState(battleId);
      if (!battleState) {
        res.status(404).json({ message: "Battle state not found" });
      } else {
        res.json(battleState);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch battle state" });
    }
  });

  app.post("/api/battles/:id/state", async (req, res) => {
    try {
      const battleId = parseInt(req.params.id);
      const stateData = insertBattleStateSchema.parse({ ...req.body, battleId });
      const battleState = await storage.createBattleState(stateData);
      res.json(battleState);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid battle state data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create battle state" });
      }
    }
  });

  app.patch("/api/battles/:id/state", async (req, res) => {
    try {
      const battleId = parseInt(req.params.id);
      const updates = req.body;
      const battleState = await storage.updateBattleState(battleId, updates);
      res.json(battleState);
    } catch (error) {
      res.status(500).json({ message: "Failed to update battle state" });
    }
  });

  // Battle actions
  app.post("/api/battles/:id/move", async (req, res) => {
    try {
      const battleId = parseInt(req.params.id);
      const { trainerId, pokemonId, moveIndex } = req.body;
      
      // Get current battle state
      const battleState = await storage.getBattleState(battleId);
      if (!battleState) {
        res.status(404).json({ message: "Battle state not found" });
        return;
      }

      // Get Pokemon and move data
      const pokemon = await storage.getPokemon(pokemonId);
      if (!pokemon) {
        res.status(404).json({ message: "Pokemon not found" });
        return;
      }

      const moves = pokemon.moves as any[];
      const selectedMove = moves[moveIndex];
      if (!selectedMove) {
        res.status(400).json({ message: "Invalid move index" });
        return;
      }

      // Calculate damage and update battle state
      const damage = Math.floor(Math.random() * selectedMove.power * 0.5) + Math.floor(selectedMove.power * 0.5);
      
      let updatedState;
      if (pokemonId === battleState.pokemon1Id) {
        updatedState = {
          pokemon2Health: Math.max(0, (battleState.pokemon2Health || 0) - damage),
          currentTurn: 'trainer2',
          lastMove: { pokemon: pokemonId, move: selectedMove, damage },
        };
      } else {
        updatedState = {
          pokemon1Health: Math.max(0, (battleState.pokemon1Health || 0) - damage),
          currentTurn: 'trainer1',
          lastMove: { pokemon: pokemonId, move: selectedMove, damage },
        };
      }

      const newBattleState = await storage.updateBattleState(battleId, updatedState);
      res.json(newBattleState);
    } catch (error) {
      res.status(500).json({ message: "Failed to execute move" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
