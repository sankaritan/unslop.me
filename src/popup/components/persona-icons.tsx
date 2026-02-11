import * as preact from 'preact';

export interface PersonaIcon {
  id: string;
  name: string;
  svg: preact.ComponentChildren;
}

// Color palette - neutral blue-gray tone
const PRIMARY = '#8B9DC3';      // Main face color
const DARK = '#3D5A80';          // Features color
const ACCENT = '#A3B8D8';        // Secondary/highlight color

// Custom SVG persona head icons - highly distinguishable designs
export const PERSONA_ICONS: PersonaIcon[] = [
  {
    id: 'casual',
    name: 'Casual',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Round head with baseball cap */}
        <circle cx="50" cy="55" r="35" fill={PRIMARY}/>
        <path d="M 15 55 Q 15 20 50 20 Q 85 20 85 55" fill={DARK}/>
        <ellipse cx="50" cy="20" rx="40" ry="8" fill={DARK}/>
        <circle cx="38" cy="52" r="4" fill={DARK}/>
        <circle cx="62" cy="52" r="4" fill={DARK}/>
        <path d="M 40 68 Q 50 74 60 68" stroke={DARK} stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'professional',
    name: 'Professional',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Square head with tie */}
        <rect x="25" y="25" width="50" height="55" rx="8" fill={PRIMARY}/>
        <rect x="28" y="38" width="16" height="14" rx="2" fill="white" stroke={DARK} stroke-width="2"/>
        <rect x="56" y="38" width="16" height="14" rx="2" fill="white" stroke={DARK} stroke-width="2"/>
        <line x1="44" y1="45" x2="56" y2="45" stroke={DARK} stroke-width="2"/>
        <path d="M 45 68 L 55 68" stroke={DARK} stroke-width="2.5" stroke-linecap="round"/>
        {/* Tie */}
        <path d="M 50 80 L 45 95 L 50 100 L 55 95 Z" fill={DARK}/>
        <rect x="48" y="75" width="4" height="8" fill={DARK}/>
      </svg>
    ),
  },
  {
    id: 'friendly',
    name: 'Friendly',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wide smiling head with rosy cheeks */}
        <ellipse cx="50" cy="50" rx="40" ry="35" fill={PRIMARY}/>
        <circle cx="35" cy="45" r="6" fill={DARK}/>
        <circle cx="65" cy="45" r="6" fill={DARK}/>
        <path d="M 25 60 Q 50 80 75 60" stroke={DARK} stroke-width="4" stroke-linecap="round" fill="none"/>
        {/* Rosy cheeks */}
        <circle cx="25" cy="55" r="8" fill={ACCENT} opacity="0.5"/>
        <circle cx="75" cy="55" r="8" fill={ACCENT} opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: 'creative',
    name: 'Creative',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Messy spiky hair all around */}
        <circle cx="50" cy="50" r="32" fill={PRIMARY}/>
        {/* Spiky hair - 12 spikes around the head */}
        <path d="M 50 15 L 52 25 L 48 25 Z" fill={DARK}/>
        <path d="M 72 22 L 68 30 L 65 26 Z" fill={DARK}/>
        <path d="M 85 40 L 76 42 L 75 37 Z" fill={DARK}/>
        <path d="M 88 58 L 78 56 L 80 52 Z" fill={DARK}/>
        <path d="M 78 75 L 72 68 L 75 65 Z" fill={DARK}/>
        <path d="M 28 75 L 28 68 L 25 65 Z" fill={DARK}/>
        <path d="M 12 58 L 22 56 L 20 52 Z" fill={DARK}/>
        <path d="M 15 40 L 24 42 L 25 37 Z" fill={DARK}/>
        <path d="M 28 22 L 32 30 L 35 26 Z" fill={DARK}/>
        <circle cx="42" cy="48" r="3" fill={DARK}/>
        <circle cx="58" cy="48" r="3" fill={DARK}/>
        <circle cx="50" cy="62" r="2" fill={DARK}/>
      </svg>
    ),
  },
  {
    id: 'quirky',
    name: 'Quirky',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Asymmetric head with antenna */}
        <ellipse cx="48" cy="52" rx="35" ry="38" fill={PRIMARY}/>
        {/* Antenna */}
        <line x1="48" y1="14" x2="48" y2="20" stroke={DARK} stroke-width="3"/>
        <circle cx="48" cy="10" r="5" fill={ACCENT}/>
        {/* Mismatched eyes */}
        <circle cx="36" cy="45" r="7" fill={DARK}/>
        <rect x="56" y="48" width="10" height="10" fill={DARK}/>
        {/* Wavy mouth */}
        <path d="M 30 68 Q 38 72 46 68 Q 54 64 62 68" stroke={DARK} stroke-width="3" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'wise',
    name: 'Wise',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Oval head with beard */}
        <ellipse cx="50" cy="45" rx="35" ry="38" fill={PRIMARY}/>
        {/* Beard */}
        <path d="M 20 60 Q 35 75 50 78 Q 65 75 80 60 L 75 55 Q 65 62 50 64 Q 35 62 25 55 Z" fill={DARK}/>
        {/* Wise eyebrows */}
        <path d="M 28 35 Q 35 30 42 32" stroke={DARK} stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 72 35 Q 65 30 58 32" stroke={DARK} stroke-width="3" stroke-linecap="round" fill="none"/>
        <circle cx="35" cy="42" r="3" fill={DARK}/>
        <circle cx="65" cy="42" r="3" fill={DARK}/>
      </svg>
    ),
  },
  {
    id: 'energetic',
    name: 'Energetic',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head with lightning bolt hair */}
        <circle cx="50" cy="55" r="33" fill={PRIMARY}/>
        {/* Lightning bolt hair */}
        <path d="M 45 22 L 38 35 L 45 35 L 40 48 L 50 35 L 44 35 L 50 22 Z" fill={ACCENT}/>
        <path d="M 60 22 L 53 35 L 60 35 L 55 48 L 65 35 L 59 35 L 65 22 Z" fill={ACCENT}/>
        {/* Excited eyes */}
        <circle cx="38" cy="52" r="7" fill={DARK}/>
        <circle cx="62" cy="52" r="7" fill={DARK}/>
        <circle cx="36" cy="50" r="3" fill="white"/>
        <circle cx="60" cy="50" r="3" fill="white"/>
        {/* Big smile */}
        <path d="M 32 68 Q 50 82 68 68" stroke={DARK} stroke-width="4" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'mysterious',
    name: 'Mysterious',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head with hood/shadow */}
        <circle cx="50" cy="55" r="30" fill={PRIMARY}/>
        <path d="M 20 55 Q 20 15 50 15 Q 80 15 80 55" fill={DARK} opacity="0.7"/>
        {/* Just eyes visible */}
        <circle cx="38" cy="50" r="4" fill={ACCENT}/>
        <circle cx="62" cy="50" r="4" fill={ACCENT}/>
        {/* Subtle smirk */}
        <path d="M 42 68 Q 50 65 58 68" stroke={ACCENT} stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'cheerful',
    name: 'Cheerful',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head with flower crown */}
        <circle cx="50" cy="55" r="35" fill={PRIMARY}/>
        {/* Flower crown */}
        <circle cx="30" cy="25" r="6" fill={ACCENT}/>
        <circle cx="45" cy="20" r="6" fill={ACCENT}/>
        <circle cx="55" cy="20" r="6" fill={ACCENT}/>
        <circle cx="70" cy="25" r="6" fill={ACCENT}/>
        <circle cx="28" cy="25" r="2" fill={DARK}/>
        <circle cx="45" cy="20" r="2" fill={DARK}/>
        <circle cx="55" cy="20" r="2" fill={DARK}/>
        <circle cx="72" cy="25" r="2" fill={DARK}/>
        {/* Happy curved eyes */}
        <path d="M 32 48 Q 38 44 44 48" stroke={DARK} stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 56 48 Q 62 44 68 48" stroke={DARK} stroke-width="3" stroke-linecap="round" fill="none"/>
        {/* Giant smile */}
        <path d="M 28 62 Q 50 82 72 62" stroke={DARK} stroke-width="4" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'thoughtful',
    name: 'Thoughtful',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Head with thought bubbles */}
        <circle cx="50" cy="55" r="33" fill={PRIMARY}/>
        {/* Thought bubbles */}
        <circle cx="72" cy="25" r="8" fill={ACCENT} opacity="0.8"/>
        <circle cx="82" cy="18" r="6" fill={ACCENT} opacity="0.6"/>
        <circle cx="88" cy="12" r="4" fill={ACCENT} opacity="0.4"/>
        {/* Concentrated expression */}
        <path d="M 32 42 Q 38 38 44 40" stroke={DARK} stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 56 40 Q 62 38 68 42" stroke={DARK} stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle cx="37" cy="48" r="3" fill={DARK}/>
        <circle cx="63" cy="48" r="3" fill={DARK}/>
        {/* Neutral mouth */}
        <path d="M 40 68 L 60 68" stroke={DARK} stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    ),
  },
];
