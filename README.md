# 🧹 Unslop.me

A Chrome extension that converts the AI-slop your collegues routinely send you in work chat to something they would actually say IRL.

## What does it do?

*It's 2PM. Mark keep sending you messages that consist of perfectly aligned bullet points, set of well-crafted emojis, bolded text for clever emphasis and flawless grammar. This looks good, except when you last talked to Mark, you get something like "dunno mate, i guess we better do something bout that prezentation right" at best.*

*You miss the old Mark...*

Not to worry, now you can create Mark's persona and unslop his perfect, corporate buzzword-laden, ChatGPT-flavored messages back to its original glorious form.

Highlight any text on any webpage, pick a persona you've created for your collegues (or use the default "Generic Unslop"), and instantly get a more natural version — powered by Google's Gemini Flash. Create your own Google API key and save it to settings.

### Features

- 🎭 **Custom Personas** — Create personas that match how specific people actually write (with tone presets and custom style instructions)
- 🚀 **Works Everywhere** — Select text on any webpage (Slack, Teams, Google Docs, emails, etc.)
- ⚡ **Streaming Responses** — See text appear in real-time as the AI generates it
- 🎨 **Clean UI** — Dark-themed floating toolbar and modal that never conflicts with page styles (Shadow DOM isolation)
- 🆓 **Free Tier Friendly** — Uses Gemini 2.0 Flash (15 requests/min, 1500/day on free tier)
- 📋 **One-Click Copy** — Instantly copy the humanized text to clipboard

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Chrome (or Chromium-based browser)
- A free [Google AI Studio](https://aistudio.google.com/apikey) API key

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/unslop.git
   cd unslop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```
   This creates a `dist/` folder with the compiled extension.

4. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions`
   - Enable **Developer mode** (toggle in top-right corner)
   - Click **Load unpacked**
   - Select the `dist/` folder from this project

5. **Configure your API key**
   - Click the Unslop extension icon in your Chrome toolbar
   - Click the ⚙️ Settings icon
   - Paste your [Google AI Studio API key](https://aistudio.google.com/apikey)
   - Click **Validate & Save**

---

## 🎯 How to Use

### Basic Usage

1. **Highlight text** on any webpage (at least 10 characters)
2. **Wait 300ms** — a floating toolbar appears with persona emoji buttons
3. **Click a persona** — the toolbar disappears and a modal opens
4. **Watch text stream in** — the humanized version appears token-by-token
5. **Copy the result** — click the 📋 Copy button

### Creating Personas

Personas let you convert text to match how specific people write.

1. Click the extension icon → **+ Add Persona**
2. **Choose an emoji icon** (visual identifier for quick selection)
3. **Enter a name** (e.g., "Dave from Marketing", "My Boss")
4. **Select tone presets** (optional):
   - **Casual** — Relaxed, conversational, like texting a friend
   - **Blunt** — Direct, short sentences, no fluff
   - **Sarcastic** — Dry wit, tongue-in-cheek remarks
   - **Friendly** — Warm, supportive, team-player energy
5. **Add custom instructions** (optional):
   - Examples: "Always misspells 'definitely' as 'definately'", "Never uses exclamation marks", "Very direct and to the point"
6. **Save** — persona appears in the toolbar when you select text

**Tone presets and custom instructions are combined** — so you can pick "Casual" + "never uses question marks" to get both behaviors.

---

## 🛠️ Development

### Project Structure

```
unslop/
├── src/
│   ├── background/
│   │   └── service-worker.ts       # Background service worker (API calls)
│   ├── content/
│   │   ├── content-script.tsx      # Injected script (selection detection)
│   │   ├── toolbar.tsx             # Floating persona toolbar
│   │   └── modal.tsx               # Result modal with streaming text
│   ├── popup/
│   │   ├── popup.tsx               # Extension popup entry
│   │   ├── pages/
│   │   │   ├── persona-list.tsx    # Persona management list
│   │   │   ├── persona-form.tsx    # Create/edit persona form
│   │   │   └── settings.tsx        # API key configuration
│   │   └── components/
│   │       ├── emoji-picker.tsx    # Emoji selector component
│   │       └── tone-chips.tsx      # Tone preset chips
│   ├── shared/
│   │   ├── types.ts                # TypeScript interfaces
│   │   ├── storage.ts              # Chrome storage wrapper
│   │   ├── gemini-api.ts           # Gemini API client (streaming)
│   │   └── prompts.ts              # Prompt templates
│   └── manifest.json               # Chrome extension manifest
├── public/
│   └── icons/                      # Extension icons
├── dist/                           # Built extension (generated)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── PLAN.md                         # Detailed implementation plan
```

### Tech Stack

- **Preact** — Lightweight React alternative for UI
- **TypeScript** — Type safety
- **Vite** — Fast build tool
- **CRXJS** — Vite plugin for Chrome extensions (Manifest V3)
- **Gemini 2.0 Flash** — Google's fast, free-tier-friendly LLM

### Available Scripts

```bash
npm run dev      # Start development mode with hot reload
npm run build    # Build production extension to dist/
npm run preview  # Preview production build
```

### Development Workflow

1. **Make changes** to source files in `src/`
2. **Run `npm run dev`** for hot-reload development
3. **Reload extension** in `chrome://extensions` (or use the reload button if using dev mode)
4. **Test changes** by selecting text on any webpage

### Architecture Notes

- **Shadow DOM isolation** — Content script UI (toolbar + modal) is rendered inside a Shadow DOM to prevent CSS conflicts with host pages
- **Port-based messaging** — Content script connects to background service worker via `chrome.runtime.connect()` for streaming responses
- **SSE parsing** — Gemini's `streamGenerateContent?alt=sse` endpoint returns Server-Sent Events which are parsed token-by-token
- **Manifest V3** — Uses modern Chrome extension architecture with service workers instead of background pages

---

## 🎨 Customization

### Changing the Default Persona

The default "🧹 Generic Unslop" persona is defined in `src/shared/types.ts`:

```typescript
export const DEFAULT_PERSONA: Persona = {
  id: 'default',
  name: 'Generic Unslop',
  emoji: '🧹',
  tonePresets: ['casual'],
  customInstructions: '',
  createdAt: 0,
  order: 0,
};
```

### Customizing the System Prompt

The base unslopping instructions are in `src/shared/prompts.ts`:

```typescript
const SYSTEM_PROMPT = `You are a text rewriter. Your job is to take corporate, AI-generated, or overly polished text and rewrite it to sound natural, human, and authentic.

Rules:
- Keep the same meaning and key information
- Remove corporate buzzwords, filler phrases, and AI-isms
- Make it sound like a real person typed it quickly
- Don't add information that wasn't in the original
- Match the length roughly
- Output ONLY the rewritten text, nothing else`;
```

Edit this to change how all personas process text.

### Adding New Tone Presets

In `src/shared/types.ts`, add to the `TonePreset` type and descriptions:

```typescript
export type TonePreset = 'casual' | 'blunt' | 'sarcastic' | 'friendly' | 'your-new-tone';

export const TONE_PRESET_DESCRIPTIONS: Record<TonePreset, string> = {
  // ... existing presets
  'your-new-tone': 'Description sent to the AI',
};
```

Then add the label in `TONE_PRESET_LABELS`.

---

## 📝 API Usage & Costs

This extension uses **Google Gemini 3.0 Flash** via the Gemini API.

---

## 🐛 Troubleshooting

### Extension icon doesn't appear
- Make sure Developer Mode is enabled in `chrome://extensions`
- Check that the extension is enabled (toggle should be blue)
- Try reloading the extension

### Toolbar doesn't show when selecting text
- Ensure you've selected at least 10 characters
- Wait ~300ms after releasing the mouse button
- Check that you have at least one persona configured
- Make sure your API key is set and validated

### API errors
- **"No API key configured"** → Go to Settings and add your Gemini API key
- **"Rate limit exceeded"** → You've hit the 15/min or 1500/day limit. Wait and try again.
- **"Invalid API key"** → Generate a new key at [Google AI Studio](https://aistudio.google.com/apikey)
- **"Connection lost"** → Network issue or service worker restarted. Click Retry.

### Streaming stops mid-response
- This is usually a service worker restart (Chrome limitation). Click the 🔄 Retry button.
- If it persists, check your network connection or API key validity.

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🙏 Acknowledgments

- Built with [Preact](https://preactjs.com/) and [Vite](https://vitejs.dev/)
- Uses [Google Gemini API](https://ai.google.dev/gemini-api/docs)
- Inspired by the need to make AI-generated text sound human again

