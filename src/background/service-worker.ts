import { getSettings, getPersonaById } from '../shared/storage';
import { buildPrompt } from '../shared/prompts';
import { validateApiKey, streamGenerate } from '../shared/gemini-api';
import { mockStreamResponse } from '../shared/mock-responses';
import type { BackgroundMessage, ValidateKeyResponse } from '../shared/types';

// Handle long-lived connections for streaming
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'unslop-stream') return;

  port.onMessage.addListener(async (msg: BackgroundMessage) => {
    if (msg.type === 'UNSLOP') {
      try {
        const settings = await getSettings();

        // Check if test mode is enabled
        if (settings.testMode) {
          // Use mock streaming response
          const generator = mockStreamResponse(msg.text);
          for await (const char of generator) {
            try {
              port.postMessage({ type: 'STREAM_CHUNK', text: char });
            } catch {
              // Port closed, stop streaming
              break;
            }
          }
          try {
            port.postMessage({ type: 'STREAM_DONE' });
          } catch { /* port closed */ }
          return;
        }

        if (!settings.apiKey) {
          port.postMessage({ type: 'STREAM_ERROR', error: 'No API key configured. Click the Unslop extension icon to set one up.' });
          return;
        }

        const persona = await getPersonaById(msg.personaId);
        if (!persona) {
          port.postMessage({ type: 'STREAM_ERROR', error: 'Persona not found.' });
          return;
        }

        const prompt = buildPrompt(msg.text, persona);

        await streamGenerate(
          settings.apiKey,
          prompt,
          (text) => {
            try { port.postMessage({ type: 'STREAM_CHUNK', text }); } catch { /* port closed */ }
          },
          () => {
            try { port.postMessage({ type: 'STREAM_DONE' }); } catch { /* port closed */ }
          },
          (error) => {
            try { port.postMessage({ type: 'STREAM_ERROR', error }); } catch { /* port closed */ }
          },
        );
      } catch (err) {
        try {
          port.postMessage({ type: 'STREAM_ERROR', error: `Unexpected error: ${(err as Error).message}` });
        } catch { /* port closed */ }
      }
    }
  });
});

// Handle one-shot messages (key validation)
chrome.runtime.onMessage.addListener((msg: BackgroundMessage, _sender, sendResponse) => {
  if (msg.type === 'VALIDATE_KEY') {
    validateApiKey(msg.apiKey).then((result) => {
      const response: ValidateKeyResponse = {
        type: 'VALIDATE_KEY_RESPONSE',
        valid: result.valid,
        error: result.error,
      };
      sendResponse(response);
    });
    return true; // Keep message channel open for async response
  }
});
