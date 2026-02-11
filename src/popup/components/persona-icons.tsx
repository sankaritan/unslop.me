import * as preact from 'preact';

export interface PersonaIcon {
  id: string;
  name: string;
  svg: preact.ComponentChildren;
}

// Custom SVG persona head icons
export const PERSONA_ICONS: PersonaIcon[] = [
  {
    id: 'casual',
    name: 'Casual',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#C8AAAA"/>
        <circle cx="35" cy="45" r="4" fill="#574964"/>
        <circle cx="65" cy="45" r="4" fill="#574964"/>
        <path d="M 35 65 Q 50 72 65 65" stroke="#574964" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 30 30 Q 35 25 40 30" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 60 30 Q 65 25 70 30" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'professional',
    name: 'Professional',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#9F8383"/>
        <rect x="28" y="35" width="18" height="12" rx="2" fill="none" stroke="#574964" stroke-width="2"/>
        <rect x="54" y="35" width="18" height="12" rx="2" fill="none" stroke="#574964" stroke-width="2"/>
        <line x1="46" y1="41" x2="54" y2="41" stroke="#574964" stroke-width="2"/>
        <path d="M 35 63 L 65 63" stroke="#574964" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    ),
  },
  {
    id: 'friendly',
    name: 'Friendly',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="55" rx="45" ry="42" fill="#FFDAB3"/>
        <circle cx="38" cy="48" r="5" fill="#574964"/>
        <circle cx="62" cy="48" r="5" fill="#574964"/>
        <path d="M 30 65 Q 50 78 70 65" stroke="#574964" stroke-width="3" stroke-linecap="round" fill="none"/>
        <circle cx="28" cy="48" r="8" fill="#FFDAB3" opacity="0.6"/>
        <circle cx="72" cy="48" r="8" fill="#FFDAB3" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 'creative',
    name: 'Creative',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 5 L 55 25 L 50 10 L 45 25 Z" fill="#574964"/>
        <path d="M 75 20 L 65 35 L 70 25 L 55 30 Z" fill="#574964"/>
        <path d="M 25 20 L 35 35 L 30 25 L 45 30 Z" fill="#574964"/>
        <circle cx="50" cy="50" r="40" fill="#C8AAAA"/>
        <path d="M 35 48 L 40 43 L 35 38" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 65 48 L 60 43 L 65 38" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle cx="50" cy="67" r="3" fill="#574964"/>
      </svg>
    ),
  },
  {
    id: 'quirky',
    name: 'Quirky',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="50" rx="42" ry="45" fill="#9F8383"/>
        <circle cx="37" cy="42" r="6" fill="#574964"/>
        <circle cx="63" cy="50" r="4" fill="#574964"/>
        <path d="M 32 65 Q 40 68 48 65 Q 55 62 63 68" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <line x1="28" y1="30" x2="35" y2="35" stroke="#574964" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="70" y1="35" x2="75" y2="28" stroke="#574964" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    ),
  },
  {
    id: 'wise',
    name: 'Wise',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#C8AAAA"/>
        <path d="M 30 42 Q 40 38 50 42" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 70 42 Q 60 38 50 42" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle cx="35" cy="48" r="3" fill="#574964"/>
        <circle cx="65" cy="48" r="3" fill="#574964"/>
        <path d="M 38 68 Q 50 63 62 68" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'energetic',
    name: 'Energetic',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#FFDAB3"/>
        <circle cx="38" cy="45" r="6" fill="#574964"/>
        <circle cx="62" cy="45" r="6" fill="#574964"/>
        <circle cx="36" cy="43" r="2" fill="white"/>
        <circle cx="60" cy="43" r="2" fill="white"/>
        <path d="M 35 65 Q 50 75 65 65" stroke="#574964" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <path d="M 25 32 Q 30 22 35 32" stroke="#574964" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M 65 32 Q 70 22 75 32" stroke="#574964" stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'mysterious',
    name: 'Mysterious',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#574964"/>
        <path d="M 32 45 L 42 45" stroke="#9F8383" stroke-width="3" stroke-linecap="round"/>
        <path d="M 58 45 L 68 45" stroke="#9F8383" stroke-width="3" stroke-linecap="round"/>
        <path d="M 40 65 Q 50 60 60 65" stroke="#9F8383" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 'cheerful',
    name: 'Cheerful',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#FFDAB3"/>
        <path d="M 32 42 Q 37 36 42 42" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 58 42 Q 63 36 68 42" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle cx="37" cy="48" r="4" fill="#574964"/>
        <circle cx="63" cy="48" r="4" fill="#574964"/>
        <path d="M 32 62 Q 50 78 68 62" stroke="#574964" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <circle cx="22" cy="62" r="3" fill="#9F8383"/>
        <circle cx="78" cy="62" r="3" fill="#9F8383"/>
      </svg>
    ),
  },
  {
    id: 'thoughtful',
    name: 'Thoughtful',
    svg: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#9F8383"/>
        <path d="M 30 38 Q 38 34 46 38" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M 54 38 Q 62 34 70 38" stroke="#574964" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <circle cx="36" cy="46" r="3" fill="#574964"/>
        <circle cx="64" cy="46" r="3" fill="#574964"/>
        <ellipse cx="50" cy="66" rx="12" ry="3" fill="#574964" opacity="0.3"/>
        <line x1="44" y1="28" x2="48" y2="22" stroke="#574964" stroke-width="2" stroke-linecap="round"/>
        <line x1="52" y1="25" x2="56" y2="20" stroke="#574964" stroke-width="2" stroke-linecap="round"/>
        <line x1="56" y1="28" x2="60" y2="24" stroke="#574964" stroke-width="2" stroke-linecap="round"/>
      </svg>
    ),
  },
];
