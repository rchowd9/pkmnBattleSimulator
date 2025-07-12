import { useRoute } from "wouter";
import { Link } from "wouter";
import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { useIsMobile } from "../hooks/use-mobile";

export default function Battle() {
  const [, params] = useRoute("/battle/:id");
  const battleId = params?.id || "1";
  const isMobile = useIsMobile();
  
  // Sound effects state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [battleMusicEnabled, setBattleMusicEnabled] = useState(true);
  const [volume, setVolume] = useState(0.7);

  // Sound effect functions
  const playSound = (soundType: string) => {
    if (!soundEnabled) return;
    
    // Create audio context for sound generation
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    switch (soundType) {
      case 'attack':
        playAttackSound(audioContext);
        break;
      case 'fire':
        playFireSound(audioContext);
        break;
      case 'water':
        playWaterSound(audioContext);
        break;
      case 'electric':
        playElectricSound(audioContext);
        break;
      case 'grass':
        playGrassSound(audioContext);
        break;
      case 'ice':
        playIceSound(audioContext);
        break;
      case 'fighting':
        playFightingSound(audioContext);
        break;
      case 'psychic':
        playPsychicSound(audioContext);
        break;
      case 'ghost':
        playGhostSound(audioContext);
        break;
      case 'steel':
        playSteelSound(audioContext);
        break;
      case 'rock':
        playRockSound(audioContext);
        break;
      case 'ground':
        playGroundSound(audioContext);
        break;
      case 'flying':
        playFlyingSound(audioContext);
        break;
      case 'poison':
        playPoisonSound(audioContext);
        break;
      case 'bug':
        playBugSound(audioContext);
        break;
      case 'dragon':
        playDragonSound(audioContext);
        break;
      case 'dark':
        playDarkSound(audioContext);
        break;
      case 'fairy':
        playFairySound(audioContext);
        break;
      case 'normal':
        playNormalSound(audioContext);
        break;
      case 'mega':
        playMegaSound(audioContext);
        break;
      case 'potion':
        playPotionSound(audioContext);
        break;
      case 'switch':
        playSwitchSound(audioContext);
        break;
      case 'victory':
        playVictorySound(audioContext);
        break;
      case 'defeat':
        playDefeatSound(audioContext);
        break;
      case 'super-effective':
        playSuperEffectiveSound(audioContext);
        break;
      case 'not-very-effective':
        playNotVeryEffectiveSound(audioContext);
        break;
      case 'no-effect':
        playNoEffectSound(audioContext);
        break;
      case 'status':
        playStatusSound(audioContext);
        break;
      case 'faint':
        playFaintSound(audioContext);
        break;
      default:
        playAttackSound(audioContext);
    }
  };

  // Sound generation functions
  const playAttackSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playFireSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playWaterSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(volume * 0.35, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playElectricSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  };

  const playGrassSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(250, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.25);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.25);
  };

  const playIceSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playFightingSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(volume * 0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playPsychicSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(volume * 0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playGhostSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.4);
    
    gainNode.gain.setValueAtTime(volume * 0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  };

  const playSteelSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(volume * 0.35, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  };

  const playRockSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(75, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playGroundSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(160, audioContext.currentTime + 0.25);
    
    gainNode.gain.setValueAtTime(volume * 0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.25);
  };

  const playFlyingSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playPoisonSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(180, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(90, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playBugSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15);
    
    gainNode.gain.setValueAtTime(volume * 0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  };

  const playDragonSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(240, audioContext.currentTime + 0.4);
    
    gainNode.gain.setValueAtTime(volume * 0.35, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  };

  const playDarkSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playFairySound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.25);
    
    gainNode.gain.setValueAtTime(volume * 0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.25);
  };

  const playNormalSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playMegaSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(volume * 0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const playPotionSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(volume * 0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playSwitchSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playVictorySound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Victory fanfare melody
    const notes = [523, 659, 784, 1047, 784, 659, 523, 784]; // C, E, G, C, G, E, C, G
    let currentTime = audioContext.currentTime;
    
    notes.forEach((note, index) => {
      const noteOsc = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      
      noteOsc.connect(noteGain);
      noteGain.connect(audioContext.destination);
      
      noteOsc.frequency.setValueAtTime(note, currentTime);
      noteGain.gain.setValueAtTime(volume * 0.2, currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.2);
      
      noteOsc.start(currentTime);
      noteOsc.stop(currentTime + 0.2);
      
      currentTime += 0.25;
    });
  };

  const playDefeatSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Defeat sound - descending notes
    const notes = [523, 494, 466, 440, 415]; // C, B, A#, A, G#
    let currentTime = audioContext.currentTime;
    
    notes.forEach((note, index) => {
      const noteOsc = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      
      noteOsc.connect(noteGain);
      noteGain.connect(audioContext.destination);
      
      noteOsc.frequency.setValueAtTime(note, currentTime);
      noteGain.gain.setValueAtTime(volume * 0.15, currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.3);
      
      noteOsc.start(currentTime);
      noteOsc.stop(currentTime + 0.3);
      
      currentTime += 0.3;
    });
  };

  const playSuperEffectiveSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playNotVeryEffectiveSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(volume * 0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const playNoEffectSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(75, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(volume * 0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playStatusSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 0.25);
    
    gainNode.gain.setValueAtTime(volume * 0.25, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.25);
  };

  const playFaintSound = (audioContext: AudioContext) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  // Battle music function
  const playBattleMusic = () => {
    if (!battleMusicEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Simple battle music loop
    const battleNotes = [261, 293, 329, 349, 392, 440, 493, 523]; // C major scale
    let currentTime = audioContext.currentTime;
    
    const playNote = (note: number, duration: number) => {
      const noteOsc = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      
      noteOsc.connect(noteGain);
      noteGain.connect(audioContext.destination);
      
      noteOsc.frequency.setValueAtTime(note, currentTime);
      noteGain.gain.setValueAtTime(volume * 0.05, currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);
      
      noteOsc.start(currentTime);
      noteOsc.stop(currentTime + duration);
      
      currentTime += duration;
    };
    
    // Play a short battle theme
    battleNotes.forEach((note, index) => {
      playNote(note, 0.3);
    });
  };

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
  const [trainer1HasMegaEvolved, setTrainer1HasMegaEvolved] = useState(false);
  const [trainer2HasMegaEvolved, setTrainer2HasMegaEvolved] = useState(false);

  // Status effects state
  const [trainer1Status, setTrainer1Status] = useState(Array(6).fill(null));
  const [trainer2Status, setTrainer2Status] = useState(Array(6).fill(null));
  const [trainer1StatusTurns, setTrainer1StatusTurns] = useState(Array(6).fill(0));
  const [trainer2StatusTurns, setTrainer2StatusTurns] = useState(Array(6).fill(0));

  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'pikachu' | 'charizard'>('pikachu');
  const [selectedMove, setSelectedMove] = useState<string>('');
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [showSwapMenu, setShowSwapMenu] = useState(false);
  const [showPotionMenu, setShowPotionMenu] = useState(false);

  // Always sync teams from localStorage on mount/route change
  useEffect(() => {
    const t1 = JSON.parse(localStorage.getItem("trainer1Team") || '["Pikachu","Pikachu","Pikachu","Pikachu","Pikachu","Pikachu"]');
    const t2 = JSON.parse(localStorage.getItem("trainer2Team") || '["Charizard","Charizard","Charizard","Charizard","Charizard","Charizard"]');
    setTrainer1Team(t1);
    setTrainer2Team(t2);
  }, [battleId]);

  // Play battle music when battle starts
  useEffect(() => {
    if (battleMusicEnabled && battleLog.length === 0) {
      // Small delay to let the page load
      const timer = setTimeout(() => {
        playBattleMusic();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [battleMusicEnabled, battleLog.length]);

  // Battle statistics state
  const [battleStats, setBattleStats] = useState({
    totalMovesUsed: 0,
    superEffectiveHits: 0,
    notVeryEffectiveHits: 0,
    noEffectHits: 0,
    criticalHits: 0,
    statusEffectsApplied: 0,
    potionsUsed: 0,
    megaEvolutions: 0,
    pokemonSwitched: 0,
    totalDamageDealt: 0,
    totalDamageTaken: 0,
    battleDuration: 0,
    startTime: Date.now()
  });

  const [, setLocation] = useLocation();

  // Save system functions
  const saveBattleState = () => {
    const battleState = {
      trainer1Team: trainer1TeamState,
      trainer2Team: trainer2TeamState,
      trainer1HP: trainer1HP,
      trainer2HP: trainer2HP,
      trainer1Mega: trainer1Mega,
      trainer2Mega: trainer2Mega,
      trainer1Status: trainer1Status,
      trainer2Status: trainer2Status,
      trainer1StatusTurns: trainer1StatusTurns,
      trainer2StatusTurns: trainer2StatusTurns,
      trainer1Active: trainer1Active,
      trainer2Active: trainer2Active,
      trainer1Potions: trainer1Potions,
      trainer2Potions: trainer2Potions,
      trainer1HasMegaEvolved: trainer1HasMegaEvolved,
      trainer2HasMegaEvolved: trainer2HasMegaEvolved,
      currentTurn: currentTurn,
      battleLog: battleLog,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('savedBattleState', JSON.stringify(battleState));
    setBattleLog(prev => [...prev, 'Battle state saved!']);
  };

  const loadBattleState = () => {
    const savedState = localStorage.getItem('savedBattleState');
    if (savedState) {
      try {
        const battleState = JSON.parse(savedState);
        setTrainer1Team(battleState.trainer1Team);
        setTrainer2Team(battleState.trainer2Team);
        setTrainer1HP(battleState.trainer1HP);
        setTrainer2HP(battleState.trainer2HP);
        setTrainer1Mega(battleState.trainer1Mega);
        setTrainer2Mega(battleState.trainer2Mega);
        setTrainer1Status(battleState.trainer1Status);
        setTrainer2Status(battleState.trainer2Status);
        setTrainer1StatusTurns(battleState.trainer1StatusTurns);
        setTrainer2StatusTurns(battleState.trainer2StatusTurns);
        setTrainer1Active(battleState.trainer1Active);
        setTrainer2Active(battleState.trainer2Active);
        setTrainer1Potions(battleState.trainer1Potions);
        setTrainer2Potions(battleState.trainer2Potions);
        setTrainer1HasMegaEvolved(battleState.trainer1HasMegaEvolved);
        setTrainer2HasMegaEvolved(battleState.trainer2HasMegaEvolved);
        setCurrentTurn(battleState.currentTurn);
        setBattleLog(battleState.battleLog);
        setBattleLog(prev => [...prev, 'Battle state loaded!']);
      } catch (error) {
        setBattleLog(prev => [...prev, 'Failed to load saved battle state.']);
      }
    } else {
      setBattleLog(prev => [...prev, 'No saved battle state found.']);
    }
  };

  const hasSavedBattle = () => {
    return localStorage.getItem('savedBattleState') !== null;
  };

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
    },
    'Snorlax': { 
      types: ['Normal'], 
      moves: ['Body Slam', 'Hyper Beam', 'Earthquake', 'Rock Slide'],
      megaMoves: ['Body Slam', 'Hyper Beam', 'Earthquake', 'Rock Slide']
    },
    'Dragonite': { 
      types: ['Dragon', 'Flying'], 
      moves: ['Dragon Claw', 'Aerial Ace', 'Thunder Wave', 'Fire Punch'],
      megaMoves: ['Dragon Claw', 'Aerial Ace', 'Thunder Wave', 'Fire Punch']
    }
  };

  // Move types - each move has its own type
  const moveTypes: { [key: string]: string } = {
    // Electric moves
    'Thunderbolt': 'Electric',
    'Thunder Wave': 'Electric',
    'Thunder': 'Electric',
    
    // Normal moves
    'Quick Attack': 'Normal',
    'Skull Bash': 'Normal',
    'Hyper Beam': 'Normal',
    'Body Slam': 'Normal',
    
    // Steel moves
    'Iron Tail': 'Steel',
    'Mega Iron Tail': 'Steel',
    'Flash Cannon': 'Steel',
    'Bullet Punch': 'Steel',
    'Iron Head': 'Steel',
    
    // Fire moves
    'Flamethrower': 'Fire',
    'Mega Flamethrower': 'Fire',
    'Fire Punch': 'Fire',
    
    // Flying moves
    'Air Slash': 'Flying',
    'Aerial Ace': 'Flying',
    'Wing Attack': 'Flying',
    
    // Dragon moves
    'Dragon Claw': 'Dragon',
    'Dragon Rage': 'Dragon',
    
    // Ground moves
    'Earthquake': 'Ground',
    
    // Water moves
    'Hydro Pump': 'Water',
    'Mega Hydro Pump': 'Water',
    
    // Ice moves
    'Ice Beam': 'Ice',
    'Ice Punch': 'Ice',
    
    // Grass moves
    'Solar Beam': 'Grass',
    'Mega Solar Beam': 'Grass',
    'Sleep Powder': 'Grass',
    'Energy Ball': 'Grass',
    
    // Poison moves
    'Sludge Bomb': 'Poison',
    
    // Ghost moves
    'Shadow Ball': 'Ghost',
    'Mega Shadow Ball': 'Ghost',
    
    // Psychic moves
    'Psychic': 'Psychic',
    'Mega Psychic': 'Psychic',
    
    // Fighting moves
    'Focus Blast': 'Fighting',
    'Dynamic Punch': 'Fighting',
    'Mega Dynamic Punch': 'Fighting',
    
    // Rock moves
    'Rock Slide': 'Rock',
    
    // Dark moves
    'Crunch': 'Dark',
    
    // Bug moves
    'X-Scissor': 'Bug',
    'Mega X-Scissor': 'Bug'
  };

  const getMoveType = (moveName: string): string => {
    return moveTypes[moveName] || 'Normal';
  };

  // Status-inducing moves and their effects
  const statusMoves: { [key: string]: { status: string; chance: number } } = {
    'Thunder Wave': { status: 'paralyzed', chance: 1.0 }, // Always paralyzes
    'Sludge Bomb': { status: 'poisoned', chance: 0.3 }, // 30% chance to poison
    'Dynamic Punch': { status: 'confused', chance: 0.5 }, // 50% chance to confuse
    'Sleep Powder': { status: 'asleep', chance: 0.75 } // 75% chance to sleep
  };

  const canCauseStatus = (moveName: string): boolean => {
    return moveName in statusMoves;
  };

  const getStatusEffect = (moveName: string): { status: string; chance: number } | null => {
    return statusMoves[moveName] || null;
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
      Normal: 2.0, Ice: 2.0, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2.0, Ghost: 0.0, Steel: 2.0, Dark: 2.0, Fairy: 0.5 
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
    'Scizor': '✂️',
    'Snorlax': '😴',
    'Dragonite': '🐉'
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
  const getActiveStatus = (statusArr: (string | null)[], active: number) => statusArr[active];
  const getActiveStatusTurns = (turnsArr: number[], active: number) => turnsArr[active];

  // Status effect definitions
  const statusEffects = {
    'paralyzed': {
      name: 'Paralyzed',
      chanceToSkip: 0.25, // 25% chance to skip turn
      damagePerTurn: 0,
      maxTurns: -1, // Permanent until cured
      curedBySwitch: true
    },
    'poisoned': {
      name: 'Poisoned',
      chanceToSkip: 0,
      damagePerTurn: 10, // 10 damage per turn
      maxTurns: -1, // Permanent until cured
      curedBySwitch: true
    },
    'asleep': {
      name: 'Asleep',
      chanceToSkip: 1.0, // Always skip turn
      damagePerTurn: 0,
      maxTurns: 3, // Wake up after 3 turns
      curedBySwitch: true
    },
    'confused': {
      name: 'Confused',
      chanceToSkip: 0.33, // 33% chance to hurt self
      damagePerTurn: 0,
      maxTurns: 4, // Confusion lasts 2-5 turns
      curedBySwitch: true
    }
  };

  // Helper function to apply status effects
  const applyStatusEffect = (trainer: 'trainer1' | 'trainer2', pokemonIndex: number, status: string) => {
    const statusSetter = trainer === 'trainer1' ? setTrainer1Status : setTrainer2Status;
    const turnsSetter = trainer === 'trainer1' ? setTrainer1StatusTurns : setTrainer2StatusTurns;
    
    statusSetter(prev => prev.map((s, i) => i === pokemonIndex ? status : s));
    turnsSetter(prev => prev.map((t, i) => i === pokemonIndex ? 0 : t));
    
    const pokemonName = trainer === 'trainer1' ? trainer1TeamState[pokemonIndex] : trainer2TeamState[pokemonIndex];
    setBattleLog(prev => [...prev, `${pokemonName} was ${statusEffects[status as keyof typeof statusEffects].name}!`]);
  };

  // Helper function to process status effects at start of turn
  const processStatusEffects = (trainer: 'trainer1' | 'trainer2', pokemonIndex: number): boolean => {
    const status = trainer === 'trainer1' ? getActiveStatus(trainer1Status, pokemonIndex) : getActiveStatus(trainer2Status, pokemonIndex);
    const turns = trainer === 'trainer1' ? getActiveStatusTurns(trainer1Status, pokemonIndex) : getActiveStatusTurns(trainer2Status, pokemonIndex);
    
    if (!status) return false; // No status effect
    
    const effect = statusEffects[status as keyof typeof statusEffects];
    const pokemonName = trainer === 'trainer1' ? trainer1TeamState[pokemonIndex] : trainer2TeamState[pokemonIndex];
    
    // Check if status should be cured
    if (effect.maxTurns > 0 && turns >= effect.maxTurns) {
      const statusSetter = trainer === 'trainer1' ? setTrainer1Status : setTrainer2Status;
      const turnsSetter = trainer === 'trainer1' ? setTrainer1StatusTurns : setTrainer2StatusTurns;
      
      statusSetter(prev => prev.map((s, i) => i === pokemonIndex ? null : s));
      turnsSetter(prev => prev.map((t, i) => i === pokemonIndex ? 0 : t));
      
      setBattleLog(prev => [...prev, `${pokemonName} is no longer ${effect.name}!`]);
      return false;
    }
    
    // Apply status effect damage
    if (effect.damagePerTurn > 0) {
      const hpSetter = trainer === 'trainer1' ? setTrainer1HP : setTrainer2HP;
      const currentHP = trainer === 'trainer1' ? getActiveHP(trainer1HP, pokemonIndex) : getActiveHP(trainer2HP, pokemonIndex);
      const newHP = Math.max(0, currentHP - effect.damagePerTurn);
      
      hpSetter(prev => prev.map((hp, i) => i === pokemonIndex ? newHP : hp));
      setBattleLog(prev => [...prev, `${pokemonName} took ${effect.damagePerTurn} damage from ${effect.name}!`]);
      
      if (newHP <= 0) {
        setBattleLog(prev => [...prev, `${pokemonName} fainted from ${effect.name}!`]);
        return true; // Pokémon fainted
      }
    }
    
    // Check if turn should be skipped
    if (Math.random() < effect.chanceToSkip) {
      setBattleLog(prev => [...prev, `${pokemonName} is ${effect.name} and can't move!`]);
      return true; // Skip turn
    }
    
    // Increment turn counter
    const turnsSetter = trainer === 'trainer1' ? setTrainer1StatusTurns : setTrainer2StatusTurns;
    turnsSetter(prev => prev.map((t, i) => i === pokemonIndex ? t + 1 : t));
    
    return false; // Continue with turn
  };

  // --- TEAM-BASED BATTLE ACTIONS & FAINTING/SWITCHING LOGIC ---
  // 1. All actions (attack, mega, potion, switching) update the correct Pokémon in the team arrays using the active index.
  // 2. When a Pokémon's HP drops to 0, force a switch (player: swap menu, AI: auto-pick next available).
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
      // Process status effects at start of turn
      if (processStatusEffects('trainer1', trainer1Active)) {
        setCurrentTurn('charizard');
        return; // Turn was skipped due to status effect
      }
      
      const attackName = moveName || getPokemonMove(getActivePokemon(trainer1TeamState, trainer1Active), getActiveMega(trainer1Mega, trainer1Active));
      const attackType = getMoveType(attackName);
      const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer2TeamState, trainer2Active), getActiveMega(trainer2Mega, trainer2Active));
      const effectiveness = getTypeEffectiveness(attackType, defenderTypes);
      const finalDamage = Math.floor(baseDamage * effectiveness);
      
      // Play move sound based on type
      playSound(attackType.toLowerCase());
      
      // Update battle statistics
      setBattleStats(prev => ({
        ...prev,
        totalMovesUsed: prev.totalMovesUsed + 1,
        totalDamageDealt: prev.totalDamageDealt + finalDamage,
        superEffectiveHits: effectiveness > 1.0 ? prev.superEffectiveHits + 1 : prev.superEffectiveHits,
        notVeryEffectiveHits: effectiveness < 1.0 && effectiveness > 0 ? prev.notVeryEffectiveHits + 1 : prev.notVeryEffectiveHits,
        noEffectHits: effectiveness === 0.0 ? prev.noEffectHits + 1 : prev.noEffectHits
      }));
      
      const newHP = Math.max(0, getActiveHP(trainer2HP, trainer2Active) - finalDamage);
      setTrainer2HP(prev => prev.map((hp, i) => i === trainer2Active ? newHP : hp));
      
      let effectivenessMessage = '';
      if (effectiveness === 0.0) {
        effectivenessMessage = ' It has no effect...';
        playSound('no-effect');
      } else if (effectiveness > 1.0) {
        effectivenessMessage = ' It\'s super effective!';
        playSound('super-effective');
      } else if (effectiveness < 1.0) {
        effectivenessMessage = ' It\'s not very effective...';
        playSound('not-very-effective');
      }
      
      setBattleLog(prev => [...prev, `${getActivePokemon(trainer1TeamState, trainer1Active)} uses ${attackName} for ${finalDamage} damage!${effectivenessMessage}`]);
      
      // Check for status effect application
      if (canCauseStatus(attackName)) {
        const statusEffect = getStatusEffect(attackName);
        if (statusEffect && Math.random() < statusEffect.chance) {
          const currentStatus = getActiveStatus(trainer2Status, trainer2Active);
          if (!currentStatus) { // Only apply if no status already
            playSound('status');
            applyStatusEffect('trainer2', trainer2Active, statusEffect.status);
          }
        }
      }
      
      setCurrentTurn('charizard');
      setSelectedMove('');
      setShowMoveMenu(false);
      
      if (newHP <= 0) {
        playSound('faint');
        setBattleLog(prev => [...prev, `${getActivePokemon(trainer2TeamState, trainer2Active)} fainted! ${getActivePokemon(trainer1TeamState, trainer1Active)} wins!`]);
        
        // Check if all Pokémon are fainted for victory/defeat sounds
        const allTrainer2Fainted = trainer2HP.every((hp, i) => i === trainer2Active ? newHP <= 0 : hp <= 0);
        if (allTrainer2Fainted) {
          playSound('victory');
          setBattleLog(prev => [...prev, '🎉 Trainer 1 wins the battle! 🎉']);
        } else {
          setTrainer2Active(prev => (prev + 1) % 6); // Force switch to next Pokémon
        }
      }
    } else {
      // Process status effects at start of turn
      if (processStatusEffects('trainer2', trainer2Active)) {
        setCurrentTurn('pikachu');
        return; // Turn was skipped due to status effect
      }
      
      const attackName = moveName || getPokemonMove(getActivePokemon(trainer2TeamState, trainer2Active), getActiveMega(trainer2Mega, trainer2Active));
      const attackType = getMoveType(attackName);
      const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer1TeamState, trainer1Active), getActiveMega(trainer1Mega, trainer1Active));
      const effectiveness = getTypeEffectiveness(attackType, defenderTypes);
      const finalDamage = Math.floor(baseDamage * effectiveness);
      
      // Play move sound based on type
      playSound(attackType.toLowerCase());
      
      // Update battle statistics
      setBattleStats(prev => ({
        ...prev,
        totalMovesUsed: prev.totalMovesUsed + 1,
        totalDamageDealt: prev.totalDamageDealt + finalDamage,
        superEffectiveHits: effectiveness > 1.0 ? prev.superEffectiveHits + 1 : prev.superEffectiveHits,
        notVeryEffectiveHits: effectiveness < 1.0 && effectiveness > 0 ? prev.notVeryEffectiveHits + 1 : prev.notVeryEffectiveHits,
        noEffectHits: effectiveness === 0.0 ? prev.noEffectHits + 1 : prev.noEffectHits
      }));
      
      const newHP = Math.max(0, getActiveHP(trainer1HP, trainer1Active) - finalDamage);
      setTrainer1HP(prev => prev.map((hp, i) => i === trainer1Active ? newHP : hp));
      
      let effectivenessMessage = '';
      if (effectiveness === 0.0) {
        effectivenessMessage = ' It has no effect...';
        playSound('no-effect');
      } else if (effectiveness > 1.0) {
        effectivenessMessage = ' It\'s super effective!';
        playSound('super-effective');
      } else if (effectiveness < 1.0) {
        effectivenessMessage = ' It\'s not very effective...';
        playSound('not-very-effective');
      }
      
      setBattleLog(prev => [...prev, `${getActivePokemon(trainer2TeamState, trainer2Active)} uses ${attackName} for ${finalDamage} damage!${effectivenessMessage}`]);
      
      // Check for status effect application
      if (canCauseStatus(attackName)) {
        const statusEffect = getStatusEffect(attackName);
        if (statusEffect && Math.random() < statusEffect.chance) {
          const currentStatus = getActiveStatus(trainer1Status, trainer1Active);
          if (!currentStatus) { // Only apply if no status already
            playSound('status');
            applyStatusEffect('trainer1', trainer1Active, statusEffect.status);
          }
        }
      }
      
      setCurrentTurn('pikachu');
      setSelectedMove('');
      setShowMoveMenu(false);
      
      if (newHP <= 0) {
        playSound('faint');
        setBattleLog(prev => [...prev, `${getActivePokemon(trainer1TeamState, trainer1Active)} fainted! ${getActivePokemon(trainer2TeamState, trainer2Active)} wins!`]);
        
        // Check if all Pokémon are fainted for victory/defeat sounds
        const allTrainer1Fainted = trainer1HP.every((hp, i) => i === trainer1Active ? newHP <= 0 : hp <= 0);
        if (allTrainer1Fainted) {
          playSound('defeat');
          setBattleLog(prev => [...prev, '💀 Trainer 2 wins the battle! 💀']);
        } else {
          setTrainer1Active(prev => (prev + 1) % 6); // Force switch to next Pokémon
        }
      }
    }
  };

  // List of Pokémon that can Mega Evolve
  const megaEvolvablePokemon = ['Charizard', 'Blastoise', 'Venusaur', 'Gengar', 'Alakazam'];

  const handleMegaEvolve = () => {
    if (
      currentTurn === 'pikachu' &&
      !trainer1HasMegaEvolved &&
      !getActiveMega(trainer1Mega, trainer1Active) &&
      megaEvolvablePokemon.includes(getActivePokemon(trainer1TeamState, trainer1Active))
    ) {
      playSound('mega');
      setBattleStats(prev => ({ ...prev, megaEvolutions: prev.megaEvolutions + 1 }));
      setTrainer1Mega(prev => prev.map((mega, i) => i === trainer1Active ? true : mega));
      setTrainer1HasMegaEvolved(true);
      setBattleLog(prev => [...prev, `${getActivePokemon(trainer1TeamState, trainer1Active)} Mega Evolves!`]);
      setCurrentTurn('charizard');
    } else if (
      currentTurn === 'charizard' &&
      !trainer2HasMegaEvolved &&
      !getActiveMega(trainer2Mega, trainer2Active) &&
      megaEvolvablePokemon.includes(getActivePokemon(trainer2TeamState, trainer2Active))
    ) {
      playSound('mega');
      setBattleStats(prev => ({ ...prev, megaEvolutions: prev.megaEvolutions + 1 }));
      setTrainer2Mega(prev => prev.map((mega, i) => i === trainer2Active ? true : mega));
      setTrainer2HasMegaEvolved(true);
      setBattleStats(prev => ({ ...prev, megaEvolutions: prev.megaEvolutions + 1 }));
      setBattleLog(prev => [...prev, `${getActivePokemon(trainer2TeamState, trainer2Active)} Mega Evolves!`]);
      setCurrentTurn('pikachu');
    }
  };

  const handleSwapPokemon = (newPokemon: string) => {
    if (currentTurn === 'pikachu') {
      playSound('switch');
      setTrainer1Team((prev: string[]) => prev.map((pokemon: string, i: number) => i === trainer1Active ? newPokemon : pokemon));
      setTrainer1HP((prev: number[]) => prev.map((hp: number, i: number) => i === trainer1Active ? 100 : hp));
      setTrainer1Mega((prev: boolean[]) => prev.map((mega: boolean, i: number) => i === trainer1Active ? false : mega));
      // Cure status effects when switching
      setTrainer1Status((prev: (string | null)[]) => prev.map((status: string | null, i: number) => i === trainer1Active ? null : status));
      setTrainer1StatusTurns((prev: number[]) => prev.map((turns: number, i: number) => i === trainer1Active ? 0 : turns));
      setBattleLog((prev: string[]) => [...prev, `Trainer 1 swaps to ${newPokemon}!`]);
      setCurrentTurn('charizard');
    } else {
      playSound('switch');
      setTrainer2Team((prev: string[]) => prev.map((pokemon: string, i: number) => i === trainer2Active ? newPokemon : pokemon));
      setTrainer2HP((prev: number[]) => prev.map((hp: number, i: number) => i === trainer2Active ? 100 : hp));
      setTrainer2Mega((prev: boolean[]) => prev.map((mega: boolean, i: number) => i === trainer2Active ? false : mega));
      // Cure status effects when switching
      setTrainer2Status((prev: (string | null)[]) => prev.map((status: string | null, i: number) => i === trainer2Active ? null : status));
      setTrainer2StatusTurns((prev: number[]) => prev.map((turns: number, i: number) => i === trainer2Active ? 0 : turns));
      setBattleLog((prev: string[]) => [...prev, `Trainer 2 swaps to ${newPokemon}!`]);
      setCurrentTurn('pikachu');
    }
    setShowSwapMenu(false);
  };

  const handleUsePotion = () => {
    const healAmount = 50; // Potion heals 50 HP
    
    if (currentTurn === 'pikachu' && getActivePotions(trainer1Potions, trainer1Active) > 0) {
      playSound('potion');
      const newHP = Math.min(100, getActiveHP(trainer1HP, trainer1Active) + healAmount);
      setTrainer1HP(prev => prev.map((hp, i) => i === trainer1Active ? newHP : hp));
      setTrainer1Potions(prev => prev.map((pot, i) => i === trainer1Active ? prev[i] - 1 : pot));
      setBattleLog(prev => [...prev, `Trainer 1 uses a Potion! ${getActivePokemon(trainer1TeamState, trainer1Active)} recovers ${healAmount} HP!`]);
      setCurrentTurn('charizard');
    } else if (currentTurn === 'charizard' && getActivePotions(trainer2Potions, trainer2Active) > 0) {
      playSound('potion');
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
    setTrainer1HasMegaEvolved(false);
    setTrainer2HasMegaEvolved(false);
    // Reset status effects
    setTrainer1Status(Array(6).fill(null));
    setTrainer2Status(Array(6).fill(null));
    setTrainer1StatusTurns(Array(6).fill(0));
    setTrainer2StatusTurns(Array(6).fill(0));
    setShowSwapMenu(false);
    setShowMoveMenu(false);
    setSelectedMove('');
  };

  const isGameOver = getActiveHP(trainer1HP, trainer1Active) <= 0 || getActiveHP(trainer2HP, trainer2Active) <= 0;

  // Detect if Trainer 2 is AI
  const trainer2IsAI = localStorage.getItem("trainer2IsAI") === "true";
  
  // Debug log to check AI detection
  console.log('Battle: trainer2IsAI =', trainer2IsAI, 'currentTurn =', currentTurn);

  // AI logic: decide and perform action for Trainer 2
  // --- SMART AI SWITCHING LOGIC (Step 3 Final, Integrated) ---
  useEffect(() => {
    if (!trainer2IsAI || currentTurn !== 'charizard' || isGameOver) return;

    // Read AI settings
    const aiDifficulty = localStorage.getItem('aiDifficulty') || 'Normal';
    const aiPersonality = localStorage.getItem('aiPersonality') || 'Balanced';

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

    // --- AI Difficulty/Personality Logic ---
    // Easy: Random move, rarely switches or uses items
    // Normal: Current smart AI
    // Hard: Prioritizes type, uses items optimally, predicts player
    // Aggressive: Attacks more, rarely switches/heals
    // Defensive: Switches/heals more, less aggressive
    // Balanced: Mix

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

    // Easy AI: random move, rarely switches or uses items
    if (aiDifficulty === 'Easy') {
      if (Math.random() < 0.1 && getActivePotions(trainer2Potions, trainer2Active) > 0) {
        setTimeout(() => handleUsePotion(), 800);
        return;
      }
      if (Math.random() < 0.1 && !getActiveMega(trainer2Mega, trainer2Active) && megaEvolvablePokemon.includes(getActivePokemon(trainer2TeamState, trainer2Active))) {
        setTimeout(() => handleMegaEvolve(), 800);
        return;
      }
      const moves = pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)]?.moves || [];
      const move = moves[Math.floor(Math.random() * moves.length)];
      setTimeout(() => handleAttack(move), 1200);
      return;
    }

    // Hard AI: prioritize type, use items optimally, predict player
    if (aiDifficulty === 'Hard') {
      // If HP low, always use potion if available
      if (getActiveHP(trainer2HP, trainer2Active) <= 50 && getActivePotions(trainer2Potions, trainer2Active) > 0) {
        setTimeout(() => handleUsePotion(), 800);
        return;
      }
      // Always mega evolve if possible
      if (!getActiveMega(trainer2Mega, trainer2Active) && megaEvolvablePokemon.includes(getActivePokemon(trainer2TeamState, trainer2Active))) {
        setTimeout(() => handleMegaEvolve(), 800);
        return;
      }
      // Switch if at type disadvantage
      const playerMoves = pokemonTypesData[getActivePokemon(trainer1TeamState, trainer1Active)]?.moves || [];
      let maxEffectiveness = 0;
      for (const move of playerMoves) {
        const moveType = getMoveType(move);
        const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer2TeamState, trainer2Active), getActiveMega(trainer2Mega, trainer2Active));
        const eff = getTypeEffectiveness(moveType, defenderTypes);
        if (eff > maxEffectiveness) maxEffectiveness = eff;
      }
      if (maxEffectiveness > 1.2) {
        const bestIdx = findBestAISwitch();
        if (bestIdx !== null) {
          setTrainer2Active(bestIdx);
          setBattleLog(prev => [...prev, `AI (Hard) switches to ${getActivePokemon(trainer2TeamState, bestIdx)}!`]);
          setTimeout(() => setCurrentTurn('pikachu'), 800);
          return;
        }
      }
      // Pick move that does most damage
      const moves = pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)]?.megaMoves && getActiveMega(trainer2Mega, trainer2Active)
        ? pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)].megaMoves
        : pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)]?.moves;
      let bestMove = moves?.[0] || '';
      let bestDamage = 0;
      for (const move of moves || []) {
        const moveType = getMoveType(move);
        const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer1TeamState, trainer1Active), getActiveMega(trainer1Mega, trainer1Active));
        const effectiveness = getTypeEffectiveness(moveType, defenderTypes);
        const baseDamage = 20;
        const totalDamage = Math.floor(baseDamage * effectiveness);
        if (totalDamage > bestDamage) {
          bestDamage = totalDamage;
          bestMove = move;
        }
      }
      setTimeout(() => handleAttack(bestMove), 1200);
      return;
    }

    // Personality modifiers
    let switchChance = 0.2, potionChance = 0.2, megaChance = 0.2;
    if (aiPersonality === 'Aggressive') {
      switchChance = 0.05; potionChance = 0.05; megaChance = 0.3;
    } else if (aiPersonality === 'Defensive') {
      switchChance = 0.4; potionChance = 0.4; megaChance = 0.1;
    }

    // Normal/Balanced AI (default)
    // Proactive switch if at severe disadvantage
    const playerMoves = pokemonTypesData[getActivePokemon(trainer1TeamState, trainer1Active)]?.moves || [];
    let maxEffectiveness = 0;
    for (const move of playerMoves) {
      const moveType = getMoveType(move);
      const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer2TeamState, trainer2Active), getActiveMega(trainer2Mega, trainer2Active));
      const eff = getTypeEffectiveness(moveType, defenderTypes);
      if (eff > maxEffectiveness) maxEffectiveness = eff;
    }
    if (maxEffectiveness > 1.5 && Math.random() < switchChance) {
      const bestIdx = findBestAISwitch();
      if (bestIdx !== null) {
        setTrainer2Active(bestIdx);
        setBattleLog(prev => [...prev, `AI switches to ${getActivePokemon(trainer2TeamState, bestIdx)}!`]);
        setTimeout(() => setCurrentTurn('pikachu'), 800);
        return;
      }
    }
    // Use potion if HP is low and potions left
    if (getActiveHP(trainer2HP, trainer2Active) <= 35 && getActivePotions(trainer2Potions, trainer2Active) > 0 && Math.random() < potionChance) {
      setTimeout(() => handleUsePotion(), 800);
      return;
    }
    // Mega Evolve if not already and can mega evolve
    if (!getActiveMega(trainer2Mega, trainer2Active) && megaEvolvablePokemon.includes(getActivePokemon(trainer2TeamState, trainer2Active)) && Math.random() < megaChance) {
      setTimeout(() => handleMegaEvolve(), 800);
      return;
    }
    // Pick the move that does the most damage
    const moves = pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)]?.megaMoves && getActiveMega(trainer2Mega, trainer2Active)
      ? pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)].megaMoves
      : pokemonTypesData[getActivePokemon(trainer2TeamState, trainer2Active)]?.moves;
    let bestMove = moves?.[0] || '';
    let bestDamage = 0;
    for (const move of moves || []) {
      const moveType = getMoveType(move);
      const defenderTypes = getPokemonTypesWithMega(getActivePokemon(trainer1TeamState, trainer1Active), getActiveMega(trainer1Mega, trainer1Active));
      const effectiveness = getTypeEffectiveness(moveType, defenderTypes);
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
    trainer1Active, trainer1TeamState, trainer1Mega, trainer1HP, trainer2Potions, isGameOver,
    setTrainer2Active, setBattleLog, setCurrentTurn,
    getActiveHP, getActivePotions, getActiveMega, getActivePokemon, getPokemonTypesWithMega, getMoveType, getTypeEffectiveness,
    megaEvolvablePokemon, handleUsePotion, handleMegaEvolve, handleAttack,
    trainer1HasMegaEvolved, trainer2HasMegaEvolved
  ]);

  // Add state for ambient sound
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  // Function to play/stop ambient sound
  const playAmbientSound = useCallback(() => {
    if (!ambientEnabled) return;
    if (!ambientAudioRef.current) {
      const audio = new Audio("/ambient-battle.mp3"); // You can use a local or public domain sound
      audio.loop = true;
      audio.volume = volume * 0.2;
      ambientAudioRef.current = audio;
    }
    ambientAudioRef.current.play();
  }, [ambientEnabled, volume]);

  const stopAmbientSound = useCallback(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.pause();
      ambientAudioRef.current.currentTime = 0;
    }
  }, []);

  // Play/stop ambient sound on toggle or volume change
  useEffect(() => {
    if (ambientEnabled) {
      playAmbientSound();
    } else {
      stopAmbientSound();
    }
    return stopAmbientSound;
  }, [ambientEnabled, playAmbientSound, stopAmbientSound]);

  useEffect(() => {
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = volume * 0.2;
    }
  }, [volume]);

  // Add a low HP warning sound effect
  const lowHPWarned = useRef<{[key: string]: boolean}>({});
  const playLowHPWarning = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(volume * 0.5, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(220, audioContext.currentTime + 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  // Watch for low HP on both teams
  useEffect(() => {
    trainer1TeamState.forEach((pokemon, idx) => {
      const hp = trainer1HP[idx];
      if (hp > 0 && hp <= 20 && !lowHPWarned.current[`t1-${idx}`]) {
        playLowHPWarning();
        lowHPWarned.current[`t1-${idx}`] = true;
      }
      if (hp > 20) {
        lowHPWarned.current[`t1-${idx}`] = false;
      }
    });
    trainer2TeamState.forEach((pokemon, idx) => {
      const hp = trainer2HP[idx];
      if (hp > 0 && hp <= 20 && !lowHPWarned.current[`t2-${idx}`]) {
        playLowHPWarning();
        lowHPWarned.current[`t2-${idx}`] = true;
      }
      if (hp > 20) {
        lowHPWarned.current[`t2-${idx}`] = false;
      }
    });
  }, [trainer1HP, trainer2HP, trainer1TeamState, trainer2TeamState]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center p-2">
      <div className={`bg-white rounded-lg shadow-xl ${isMobile ? 'p-4' : 'p-8'} max-w-4xl w-full mx-2`}>
        <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-center text-gray-800 mb-4`}>
          Pokémon Battle #{battleId}
        </h1>
        
        {/* Sound Controls */}
        <div className={`bg-gray-50 rounded-lg ${isMobile ? 'p-3 mb-4' : 'p-4 mb-6'}`}>
          <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-700 mb-3`}>Sound Settings</h3>
          <div className={`flex flex-wrap ${isMobile ? 'gap-2' : 'gap-4'} items-center justify-center`}>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="soundEnabled"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="soundEnabled" className="text-sm font-medium text-gray-700">
                Sound Effects
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="battleMusicEnabled"
                checked={battleMusicEnabled}
                onChange={(e) => setBattleMusicEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="battleMusicEnabled" className="text-sm font-medium text-gray-700">
                Battle Music
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="volume" className="text-sm font-medium text-gray-700">
                Volume:
              </label>
              <input
                type="range"
                id="volume"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600 w-8">{Math.round(volume * 100)}%</span>
            </div>
            
            <button
              onClick={playBattleMusic}
              className={`bg-purple-500 hover:bg-purple-600 text-white font-medium ${isMobile ? 'py-2 px-4 text-base' : 'py-1 px-3 text-sm'} rounded transition-colors`}
            >
              Test Music
            </button>
            
            <button
              onClick={() => playSound('victory')}
              className={`bg-green-500 hover:bg-green-600 text-white font-medium ${isMobile ? 'py-2 px-4 text-base' : 'py-1 px-3 text-sm'} rounded transition-colors`}
            >
              Test Victory
            </button>
            
            <button
              onClick={() => playSound('defeat')}
              className={`bg-red-500 hover:bg-red-600 text-white font-medium ${isMobile ? 'py-2 px-4 text-base' : 'py-1 px-3 text-sm'} rounded transition-colors`}
            >
              Test Defeat
            </button>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="ambientEnabled"
                checked={ambientEnabled}
                onChange={(e) => setAmbientEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ambientEnabled" className="text-sm font-medium text-gray-700">
                Ambient Sound
              </label>
            </div>
          </div>
        </div>
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4 mb-6' : 'md:grid-cols-2 gap-8 mb-8'}`}>
          <div className={`bg-blue-100 rounded-lg ${isMobile ? 'p-4' : 'p-6'}`}>
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-blue-800 mb-4`}>Trainer 1</h2>
            <div className="space-y-2">
              {trainer1TeamState.map((pokemon, index) => (
                <div key={index} className={`bg-white rounded ${isMobile ? 'p-2' : 'p-3'}`}>
                  <p className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                    <span className={`${isMobile ? 'text-xl' : 'text-2xl'} mr-2`}>{getPokemonImage(pokemon)}</span>
                    {pokemon} {getActiveMega(trainer1Mega, index) && <span className="text-purple-600">(Mega)</span>}
                  </p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>HP: {getActiveHP(trainer1HP, index)}/100</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-blue-600`}>Type: {getPokemonTypeWithMega(pokemon, getActiveMega(trainer1Mega, index))}</p>
                  {getActiveStatus(trainer1Status, index) && (
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-red-600 font-semibold`}>
                      Status: {statusEffects[getActiveStatus(trainer1Status, index) as keyof typeof statusEffects]?.name}
                    </p>
                  )}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(getActiveHP(trainer1HP, index) / 100) * 100}%` }}
                    ></div>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-blue-600 mt-1`}>Potions: {getActivePotions(trainer1Potions, index)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`bg-red-100 rounded-lg ${isMobile ? 'p-4' : 'p-6'}`}>
            <h2 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-red-800 mb-4`}>{trainer2IsAI ? 'AI' : 'Trainer 2'}</h2>
            <div className="space-y-2">
              {trainer2TeamState.map((pokemon, index) => (
                <div key={index} className={`bg-white rounded ${isMobile ? 'p-2' : 'p-3'}`}>
                  <p className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                    <span className={`${isMobile ? 'text-xl' : 'text-2xl'} mr-2`}>{getPokemonImage(pokemon)}</span>
                    {pokemon} {getActiveMega(trainer2Mega, index) && <span className="text-purple-600">(Mega)</span>}
                  </p>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>HP: {getActiveHP(trainer2HP, index)}/100</p>
                  <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-blue-600`}>Type: {getPokemonTypeWithMega(pokemon, getActiveMega(trainer2Mega, index))}</p>
                  {getActiveStatus(trainer2Status, index) && (
                    <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-red-600 font-semibold`}>
                      Status: {statusEffects[getActiveStatus(trainer2Status, index) as keyof typeof statusEffects]?.name}
                    </p>
                  )}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(getActiveHP(trainer2HP, index) / 100) * 100}%` }}
                    ></div>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-blue-600 mt-1`}>Potions: {getActivePotions(trainer2Potions, index)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`text-center ${isMobile ? 'space-y-3' : 'space-y-4'}`}>
          <div className="mb-4">
            <p className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-700`}>
              Current Turn: {currentTurn === 'pikachu' ? getActivePokemon(trainer1TeamState, trainer1Active) : (trainer2IsAI ? 'AI' : getActivePokemon(trainer2TeamState, trainer2Active))}
            </p>
          </div>
          
          {!isGameOver && (
            <>
              {currentTurn === 'pikachu' ? (
                <div className={`${isMobile ? 'space-y-3' : 'space-y-2'}`}>
                  <button 
                    onClick={() => setShowMoveMenu(!showMoveMenu)}
                    className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold ${isMobile ? 'py-4 px-6 text-lg' : 'py-3 px-6'} rounded-lg transition-colors w-full`}
                  >
                    Choose Move
                  </button>
                  
                  {showMoveMenu && !isGameOver && (
                    <div className={`bg-yellow-50 rounded-lg ${isMobile ? 'p-3' : 'p-4'} ${isMobile ? 'space-y-3' : 'space-y-2'}`}>
                      <h3 className={`font-semibold text-yellow-800 ${isMobile ? 'text-base' : ''}`}>Choose Move:</h3>
                      {(() => {
                        const currentPokemon = getActivePokemon(trainer1TeamState, trainer1Active);
                        const isMega = getActiveMega(trainer1Mega, trainer1Active);
                        const moves = pokemonTypesData[currentPokemon];
                        const moveList = isMega ? moves?.megaMoves : moves?.moves;
                        
                        return moveList?.map(move => (
                          <button
                            key={move}
                            onClick={() => handleAttack(move)}
                            className={`w-full bg-white hover:bg-yellow-100 text-gray-800 font-medium ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded border transition-colors`}
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
                    className={`bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors w-full`}
                  >
                    Use Potion ({getActivePotions(trainer1Potions, trainer1Active)} left)
                  </button>
                  
                  <button 
                    onClick={handleMegaEvolve}
                    disabled={
                      trainer1HasMegaEvolved || getActiveMega(trainer1Mega, trainer1Active) || !megaEvolvablePokemon.includes(getActivePokemon(trainer1TeamState, trainer1Active))
                    }
                    className={`bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors w-full`}
                  >
                    Mega Evolve
                  </button>
                  
                  <button 
                    onClick={() => setShowSwapMenu(!showSwapMenu)}
                    disabled={
                      trainer1TeamState.filter((_, i) => i !== trainer1Active && trainer1HP[i] > 0).length === 0
                    }
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors w-full
                      ${trainer1TeamState.filter((_, i) => i !== trainer1Active && trainer1HP[i] > 0).length === 0 ? 'disabled:bg-gray-400 cursor-not-allowed opacity-60' : ''}`}
                  >
                    Swap Pokémon
                  </button>
                </div>
              ) : currentTurn === 'charizard' && trainer2IsAI ? (
                <div className={`${isMobile ? 'space-y-3' : 'space-y-2'}`}>
                  <div className={`bg-yellow-100 rounded-lg ${isMobile ? 'p-3' : 'p-4'}`}>
                    <p className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-yellow-800`}>AI is thinking...</p>
                  </div>
                </div>
              ) : (
                <div className={`${isMobile ? 'space-y-3' : 'space-y-2'}`}>
                  <button 
                    onClick={() => setShowMoveMenu(!showMoveMenu)}
                    className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold ${isMobile ? 'py-4 px-6 text-lg' : 'py-3 px-6'} rounded-lg transition-colors w-full`}
                  >
                    Choose Move
                  </button>
                  
                  {showMoveMenu && !isGameOver && (
                    <div className={`bg-yellow-50 rounded-lg ${isMobile ? 'p-3' : 'p-4'} ${isMobile ? 'space-y-3' : 'space-y-2'}`}>
                      <h3 className={`font-semibold text-yellow-800 ${isMobile ? 'text-base' : ''}`}>Choose Move:</h3>
                      {(() => {
                        const currentPokemon = getActivePokemon(trainer2TeamState, trainer2Active);
                        const isMega = getActiveMega(trainer2Mega, trainer2Active);
                        const moves = pokemonTypesData[currentPokemon];
                        const moveList = isMega ? moves?.megaMoves : moves?.moves;
                        
                        return moveList?.map(move => (
                          <button
                            key={move}
                            onClick={() => handleAttack(move)}
                            className={`w-full bg-white hover:bg-yellow-100 text-gray-800 font-medium ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded border transition-colors`}
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
                    className={`bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors w-full`}
                  >
                    Use Potion ({getActivePotions(trainer2Potions, trainer2Active)} left)
                  </button>
                  
                  <button 
                    onClick={handleMegaEvolve}
                    disabled={
                      trainer2HasMegaEvolved || getActiveMega(trainer2Mega, trainer2Active) || !megaEvolvablePokemon.includes(getActivePokemon(trainer2TeamState, trainer2Active))
                    }
                    className={`bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors w-full`}
                  >
                    Mega Evolve
                  </button>
                  
                  <button 
                    onClick={() => setShowSwapMenu(!showSwapMenu)}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors w-full`}
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
              className={`bg-green-500 hover:bg-green-600 text-white font-semibold ${isMobile ? 'py-4 px-6 text-lg' : 'py-3 px-6'} rounded-lg transition-colors`}
            >
              New Battle
            </button>
          )}
          
          {showSwapMenu && !isGameOver && (
            <div className={`bg-blue-50 rounded-lg ${isMobile ? 'p-3' : 'p-4'} ${isMobile ? 'space-y-3' : 'space-y-2'}`}>
              <h3 className={`font-semibold text-blue-800 ${isMobile ? 'text-base' : ''}`}>Choose Pokémon:</h3>
              {trainer1TeamState.map((pokemon, idx) => {
                if (idx === trainer1Active) return null; // Don't show the active Pokémon
                const isFainted = trainer1HP[idx] <= 0;
                return (
                  <button
                    key={pokemon + idx}
                    onClick={() => !isFainted && handleSwapPokemon(pokemon)}
                    disabled={isFainted}
                    className={`w-full bg-white hover:bg-blue-100 text-gray-800 font-medium ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded border transition-colors mb-1
                      ${isFainted ? 'opacity-50 cursor-not-allowed line-through' : ''}`}
                  >
                    {pokemon} {isFainted ? '(Fainted)' : ''}
                  </button>
                );
              })}
            </div>
          )}
          
          {battleLog.length > 0 && (
            <div className={`bg-gray-100 rounded-lg ${isMobile ? 'p-3' : 'p-4'} ${isMobile ? 'max-h-40' : 'max-h-48'} overflow-y-auto`}>
              <h3 className={`font-semibold text-gray-800 mb-2 ${isMobile ? 'text-base' : ''}`}>Battle Log:</h3>
              <div className={`${isMobile ? 'space-y-2' : 'space-y-1'}`}>
                {battleLog.map((log, index) => (
                  <div key={index} className={`flex items-start ${isMobile ? 'space-x-3' : 'space-x-2'}`}>
                    <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 font-mono min-w-[60px]`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className={`${isMobile ? 'text-sm' : 'text-sm'} text-gray-700 flex-1`}>
                      {log.includes('super effective') && (
                        <span className="text-green-600 font-semibold">⚡ {log}</span>
                      )}
                      {log.includes('not very effective') && (
                        <span className="text-red-600 font-semibold">🛡️ {log}</span>
                      )}
                      {log.includes('no effect') && (
                        <span className="text-gray-500 font-semibold">❌ {log}</span>
                      )}
                      {log.includes('Paralyzed') && (
                        <span className="text-yellow-600 font-semibold">⚡ {log}</span>
                      )}
                      {log.includes('Poisoned') && (
                        <span className="text-purple-600 font-semibold">☠️ {log}</span>
                      )}
                      {log.includes('Asleep') && (
                        <span className="text-blue-600 font-semibold">😴 {log}</span>
                      )}
                      {log.includes('Confused') && (
                        <span className="text-orange-600 font-semibold">🌀 {log}</span>
                      )}
                      {log.includes('can\'t move') && (
                        <span className="text-red-600 font-semibold">🚫 {log}</span>
                      )}
                      {log.includes('Battle state saved') && (
                        <span className="text-green-600 font-semibold">💾 {log}</span>
                      )}
                      {log.includes('Battle state loaded') && (
                        <span className="text-blue-600 font-semibold">📂 {log}</span>
                      )}
                      {!log.includes('super effective') && !log.includes('not very effective') && !log.includes('no effect') && 
                       !log.includes('Paralyzed') && !log.includes('Poisoned') && !log.includes('Asleep') && 
                       !log.includes('Confused') && !log.includes('can\'t move') && !log.includes('Battle state') && (
                        <span>{log}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className={`flex ${isMobile ? 'flex-wrap justify-center gap-2' : 'justify-center space-x-4'}`}>
            <button 
              onClick={saveBattleState}
              className={`bg-green-500 hover:bg-green-600 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors`}
            >
              Save Battle
            </button>
            <button 
              onClick={loadBattleState}
              disabled={!hasSavedBattle()}
              className={`bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors`}
            >
              Load Battle
            </button>
            <Link href="/">
              <button className={`bg-gray-500 hover:bg-gray-600 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors`}>
                Back to Home
              </button>
            </Link>
            <Link href="/statistics">
              <button className={`bg-purple-500 hover:bg-purple-600 text-white font-semibold ${isMobile ? 'py-3 px-4 text-base' : 'py-2 px-4'} rounded-lg transition-colors`}>
                View Statistics
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}  
