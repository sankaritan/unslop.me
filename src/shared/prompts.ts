import { Persona, TONE_PRESET_DESCRIPTIONS } from './types';

const SYSTEM_PROMPT = `You are a text rewriter. Your job is to take corporate, AI-generated, or overly polished text and rewrite it to sound natural, human, and authentic.

Rules:
- Keep the same meaning and key information
- Remove corporate buzzwords, filler phrases, and AI-isms (e.g. "leverage", "synergy", "I hope this message finds you well", "please don't hesitate to", "I'd be happy to")
- Make it sound like a real person typed it quickly in a chat or email
- Don't add information that wasn't in the original
- Match the length roughly (don't make it significantly longer or shorter)
- Do NOT use markdown formatting, bullet points, or headers unless the original had them
- Output ONLY the rewritten text, nothing else — no preamble, no explanation`;

export function buildSystemPrompt(persona: Persona): string {
  let prompt = SYSTEM_PROMPT;

  const hasPresets = persona.tonePresets.length > 0;
  const hasCustom = persona.customInstructions.trim().length > 0;

  if (hasPresets || hasCustom) {
    prompt += '\n\nAdditionally, write in this specific style:';

    if (hasPresets) {
      const toneDescriptions = persona.tonePresets
        .map(t => `- ${TONE_PRESET_DESCRIPTIONS[t]}`)
        .join('\n');
      prompt += `\n\nTone:\n${toneDescriptions}`;
    }

    if (hasCustom) {
      prompt += `\n\nSpecific style instructions:\n${persona.customInstructions}`;
    }
  }

  return prompt;
}

export function buildUserMessage(text: string): string {
  return `Text to rewrite:\n"""\n${text}\n"""`;
}

export function buildPrompt(text: string, persona: Persona): string {
  const systemPrompt = buildSystemPrompt(persona);
  const userMessage = buildUserMessage(text);
  return `${systemPrompt}\n\n${userMessage}`;
}
