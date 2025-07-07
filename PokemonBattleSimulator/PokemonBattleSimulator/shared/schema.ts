import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for basic user management
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").unique(),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Trainers table
export const trainers = pgTable("trainers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  badges: integer("badges").default(0),
  wins: integer("wins").default(0),
  losses: integer("losses").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Pokemon table
export const pokemon = pgTable("pokemon", {
  id: serial("id").primaryKey(),
  trainerId: integer("trainer_id").references(() => trainers.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  health: integer("health").notNull(),
  maxHealth: integer("max_health").notNull(),
  isMegaEvolved: boolean("is_mega_evolved").default(false),
  moves: jsonb("moves").notNull(), // Array of Move objects
  createdAt: timestamp("created_at").defaultNow(),
});

// Battles table
export const battles = pgTable("battles", {
  id: serial("id").primaryKey(),
  trainer1Id: integer("trainer1_id").references(() => trainers.id),
  trainer2Id: integer("trainer2_id").references(() => trainers.id),
  winnerId: integer("winner_id").references(() => trainers.id),
  battleLog: jsonb("battle_log").notNull(), // Array of battle log entries
  status: text("status").notNull(), // 'active', 'completed', 'abandoned'
  turn: integer("turn").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Battle states for real-time battles
export const battleStates = pgTable("battle_states", {
  id: serial("id").primaryKey(),
  battleId: integer("battle_id").references(() => battles.id),
  pokemon1Id: integer("pokemon1_id").references(() => pokemon.id),
  pokemon2Id: integer("pokemon2_id").references(() => pokemon.id),
  pokemon1Health: integer("pokemon1_health"),
  pokemon2Health: integer("pokemon2_health"),
  currentTurn: text("current_turn"), // 'trainer1' or 'trainer2'
  lastMove: jsonb("last_move"), // Last move performed
  statusEffects: jsonb("status_effects"), // Status effects on each Pokemon
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Move type definition for TypeScript
export const moveSchema = z.object({
  name: z.string(),
  type: z.string(),
  power: z.number().min(0).max(100),
  accuracy: z.number().min(1).max(100),
  isSpecial: z.boolean(),
});

// Insert and select schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertTrainerSchema = createInsertSchema(trainers).omit({ id: true, createdAt: true });
export const insertPokemonSchema = createInsertSchema(pokemon).omit({ id: true, createdAt: true });
export const insertBattleSchema = createInsertSchema(battles).omit({ id: true, createdAt: true, completedAt: true });
export const insertBattleStateSchema = createInsertSchema(battleStates).omit({ id: true, updatedAt: true });

// Types
export type User = typeof users.$inferSelect;
export type Trainer = typeof trainers.$inferSelect;
export type Pokemon = typeof pokemon.$inferSelect;
export type Battle = typeof battles.$inferSelect;
export type BattleState = typeof battleStates.$inferSelect;
export type Move = z.infer<typeof moveSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTrainer = z.infer<typeof insertTrainerSchema>;
export type InsertPokemon = z.infer<typeof insertPokemonSchema>;
export type InsertBattle = z.infer<typeof insertBattleSchema>;
export type InsertBattleState = z.infer<typeof insertBattleStateSchema>;

// Battle log entry type
export type BattleLogEntry = {
  turn: number;
  message: string;
  type: 'move' | 'damage' | 'status' | 'system';
  timestamp: Date;
};
