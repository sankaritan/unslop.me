# Agent Guide for Unslop.me Chrome Extension

This guide provides coding agents with essential information about build commands, code style, architecture patterns, and conventions used in this Chrome extension project.

## Project Overview

**Unslop.me** is a Chrome Manifest V3 extension that uses Google Gemini API to convert AI-generated text into natural, human-sounding messages. Built with Preact, TypeScript, and Vite.

**Tech Stack:**
- **Preact** — Lightweight React alternative for UI components
- **TypeScript** — Strict type safety enabled
- **Vite + CRXJS** — Fast bundler with Chrome extension plugin
- **Chrome APIs** — Storage, runtime messaging, content scripts
- **Gemini 3 Flash Lite** — Google's LLM for text transformation

## Build, Dev & Test Commands

### Development
```bash
npm run dev      # Start dev mode with hot reload (watch mode)
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

### Testing Changes
1. Run `npm run dev` for hot-reload development
2. Go to `chrome://extensions` in Chrome
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** and select the `dist/` folder
5. After code changes, click the refresh icon on the extension card
6. Test by selecting text on any webpage

### No Automated Tests
- **There are no Jest/Vitest test files or test scripts in this project**
- Testing is manual — use the extension in Chrome to verify changes
- Use **Test Mode** in Settings (⚙️) to enable mock API responses for UI testing without consuming API credits

## Project Structure

```
src/
├── background/
│   └── service-worker.ts       # Background worker (API calls, messaging)
├── content/
│   ├── content-script.tsx      # Injected script (text selection detection)
│   ├── toolbar.tsx             # Floating persona selector toolbar
│   └── modal.tsx               # Streaming result modal with copy button
├── popup/
│   ├── popup.tsx               # Extension popup entry point
│   ├── pages/
│   │   ├── persona-list.tsx    # Persona management list
│   │   ├── persona-form.tsx    # Create/edit persona form
│   │   └── settings.tsx        # API key & test mode settings
│   └── components/
│       ├── icon-picker.tsx     # Icon selector for personas
│       ├── emoji-picker.tsx    # Emoji picker component
│       ├── tone-chips.tsx      # Tone preset chips
│       └── persona-icons.tsx   # Icon definitions
└── shared/
    ├── types.ts                # TypeScript interfaces & types
    ├── storage.ts              # Chrome storage wrapper functions
    ├── gemini-api.ts           # Gemini streaming API client
    ├── prompts.ts              # Prompt templates
    └── mock-responses.ts       # Mock streaming for test mode
```

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled** — All strict TypeScript checks are on
- **Target:** ES2020
- **Module:** ESNext with bundler resolution
- **JSX:** `react-jsx` with `jsxImportSource: "preact"`
- **Path aliases:** `@/*` maps to `./src/*`
- **No unused locals/parameters checks disabled** — Feel free to leave unused vars temporarily

### Imports

**Order:**
1. External libraries (`preact`, `preact/hooks`)
2. Chrome APIs (usually inline: `chrome.storage.local`, etc.)
3. Type imports (`type { ... } from '...'`)
4. Local shared utilities (`@/shared/...` or `../shared/...`)
5. Local components (`./components/...`, `./pages/...`)

**Examples:**
```typescript
// Good
import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import type { Persona, Settings } from '@/shared/types';
import { getPersonas, setPersonas } from '@/shared/storage';
import { Toolbar } from './toolbar';

// Avoid default imports for types
import { Persona } from '../shared/types';  // ❌ Not used in this codebase
import type { Persona } from '../shared/types';  // ✅ Preferred
```

### Naming Conventions

- **Components:** PascalCase, exported as named functions
  ```typescript
  export function PersonaForm({ persona, onBack }: Props) { ... }
  ```
- **Files:** kebab-case for everything (e.g., `persona-form.tsx`, `service-worker.ts`)
- **Interfaces:** PascalCase, no `I` prefix
  ```typescript
  export interface Persona { ... }
  export interface Settings { ... }
  ```
- **Props interfaces:** Use `Props` or `{ComponentName}Props`
- **Constants:** UPPER_SNAKE_CASE for config values
  ```typescript
  const STORAGE_KEYS = { PERSONAS: 'personas', SETTINGS: 'settings' } as const;
  ```
- **Functions:** camelCase (e.g., `getPersonas`, `handleSave`)

### Types & Interfaces

- **Always define prop types explicitly:**
  ```typescript
  interface Props {
    persona?: Persona;  // Optional props use ?
    onBack: () => void;
  }
  ```
- **Use `type` for unions, `interface` for object shapes:**
  ```typescript
  export type TonePreset = 'casual' | 'blunt' | 'sarcastic' | 'friendly';
  export interface Persona { id: string; name: string; ... }
  ```
- **Message types for chrome.runtime communication:**
  ```typescript
  export type BackgroundMessage = UnslopRequest | ValidateKeyRequest;
  export type StreamMessage = StreamChunk | StreamDone | StreamError;
  ```

### Formatting & Style

- **No ESLint or Prettier config** — Follow existing code patterns
- **Indentation:** 2 spaces (no tabs)
- **Quotes:** Single quotes for strings, double quotes in JSX attributes
- **Semicolons:** Always use them
- **Max line length:** ~100-120 chars (not enforced, but keep it readable)
- **Trailing commas:** Use them in multiline arrays/objects
- **Async/await:** Preferred over `.then()` chains

**Example:**
```typescript
const personas = await getPersonas();
const filtered = personas.filter(p => p.id !== id);
await setPersonas(filtered);
```

## Questions?

Refer to:
- `README.md` for user-facing docs
- `src/manifest.json` for extension permissions & config
- `vite.config.ts` for build configuration
- Existing code patterns in `src/` directories
