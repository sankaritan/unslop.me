export interface Persona {
  id: string;
  name: string;
  emoji: string;
  tonePresets: TonePreset[];
  customInstructions: string;
  createdAt: number;
  order: number;
}

export type TonePreset = 'casual' | 'blunt' | 'sarcastic' | 'friendly';

export const TONE_PRESET_LABELS: Record<TonePreset, string> = {
  casual: 'Casual',
  blunt: 'Blunt',
  sarcastic: 'Sarcastic',
  friendly: 'Friendly',
};

export const TONE_PRESET_DESCRIPTIONS: Record<TonePreset, string> = {
  casual: 'Relaxed and conversational, like texting a coworker you\'re friends with',
  blunt: 'Very direct, short sentences, no fluff, gets straight to the point',
  sarcastic: 'Dry wit, slightly tongue-in-cheek, occasional ironic remarks',
  friendly: 'Warm and supportive, uses encouraging language, team-player energy',
};

export interface Settings {
  apiKey: string;
  apiKeyValid: boolean;
}

export const DEFAULT_PERSONA: Persona = {
  id: 'default',
  name: 'Generic Unslop',
  emoji: '🧹',
  tonePresets: ['casual'],
  customInstructions: '',
  createdAt: 0,
  order: 0,
};

// Message types for communication between content script and background
export interface UnslopRequest {
  type: 'UNSLOP';
  text: string;
  personaId: string;
}

export interface StreamChunk {
  type: 'STREAM_CHUNK';
  text: string;
}

export interface StreamDone {
  type: 'STREAM_DONE';
}

export interface StreamError {
  type: 'STREAM_ERROR';
  error: string;
}

export interface ValidateKeyRequest {
  type: 'VALIDATE_KEY';
  apiKey: string;
}

export interface ValidateKeyResponse {
  type: 'VALIDATE_KEY_RESPONSE';
  valid: boolean;
  error?: string;
}

export type BackgroundMessage = UnslopRequest | ValidateKeyRequest;
export type StreamMessage = StreamChunk | StreamDone | StreamError;
