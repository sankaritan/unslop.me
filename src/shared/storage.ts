import { Persona, Settings, DEFAULT_PERSONA } from './types';

const STORAGE_KEYS = {
  PERSONAS: 'personas',
  SETTINGS: 'settings',
} as const;

export async function getPersonas(): Promise<Persona[]> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.PERSONAS);
  const personas = result[STORAGE_KEYS.PERSONAS] as Persona[] | undefined;
  if (!personas || personas.length === 0) {
    // Initialize with default persona
    await setPersonas([DEFAULT_PERSONA]);
    return [DEFAULT_PERSONA];
  }
  return personas;
}

export async function setPersonas(personas: Persona[]): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.PERSONAS]: personas });
}

export async function addPersona(persona: Omit<Persona, 'id' | 'createdAt' | 'order'>): Promise<Persona> {
  const personas = await getPersonas();
  const newPersona: Persona = {
    ...persona,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    order: personas.length,
  };
  personas.push(newPersona);
  await setPersonas(personas);
  return newPersona;
}

export async function updatePersona(id: string, updates: Partial<Omit<Persona, 'id' | 'createdAt'>>): Promise<void> {
  const personas = await getPersonas();
  const index = personas.findIndex(p => p.id === id);
  if (index === -1) throw new Error(`Persona ${id} not found`);
  personas[index] = { ...personas[index], ...updates };
  await setPersonas(personas);
}

export async function deletePersona(id: string): Promise<void> {
  if (id === 'default') throw new Error('Cannot delete default persona');
  const personas = await getPersonas();
  const filtered = personas.filter(p => p.id !== id);
  await setPersonas(filtered);
}

export async function getPersonaById(id: string): Promise<Persona | undefined> {
  const personas = await getPersonas();
  return personas.find(p => p.id === id);
}

export async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.SETTINGS);
  return result[STORAGE_KEYS.SETTINGS] as Settings || { apiKey: '', apiKeyValid: false, testMode: false };
}

export async function setSettings(settings: Settings): Promise<void> {
  await chrome.storage.local.set({ [STORAGE_KEYS.SETTINGS]: settings });
}
