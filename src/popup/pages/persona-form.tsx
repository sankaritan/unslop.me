import { useState } from 'preact/hooks';
import * as preact from 'preact';
import type { Persona, TonePreset } from '../../shared/types';
import { addPersona, updatePersona } from '../../shared/storage';
import { EmojiPicker } from '../components/emoji-picker';
import { ToneChips } from '../components/tone-chips';

interface Props {
  persona?: Persona; // If provided, we're editing
  onBack: () => void;
}

export function PersonaForm({ persona, onBack }: Props) {
  const isEditing = !!persona;
  const [name, setName] = useState(persona?.name || '');
  const [emoji, setEmoji] = useState(persona?.emoji || '😎');
  const [tonePresets, setTonePresets] = useState<TonePreset[]>(persona?.tonePresets || []);
  const [instructions, setInstructions] = useState(persona?.customInstructions || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);

    try {
      if (isEditing && persona) {
        await updatePersona(persona.id, {
          name: name.trim(),
          emoji,
          tonePresets,
          customInstructions: instructions.trim(),
        });
      } else {
        await addPersona({
          name: name.trim(),
          emoji,
          tonePresets,
          customInstructions: instructions.trim(),
        });
      }
      onBack();
    } catch (err) {
      console.error('Failed to save persona:', err);
      setSaving(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <h2 style={styles.title}>{isEditing ? 'Edit Persona' : 'New Persona'}</h2>
      </div>

      <div style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Icon</label>
          <EmojiPicker selected={emoji} onSelect={setEmoji} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            placeholder="e.g., Dave from Marketing"
            style={styles.input}
            maxLength={40}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Tone</label>
          <ToneChips selected={tonePresets} onChange={setTonePresets} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Custom Instructions</label>
          <textarea
            value={instructions}
            onInput={(e) => setInstructions((e.target as HTMLTextAreaElement).value)}
            placeholder={"e.g., Always misspells 'definitely' as 'definately', never uses exclamation marks, very direct..."}
            style={styles.textarea}
            rows={4}
          />
          <div style={styles.hint}>
            Describe how this person writes. These instructions are combined with the tone presets above.
          </div>
        </div>

        <div style={styles.actions}>
          <button onClick={onBack} style={styles.cancelBtn}>Cancel</button>
          <button
            onClick={handleSave}
            disabled={!name.trim() || saving}
            style={{
              ...styles.saveBtn,
              opacity: !name.trim() || saving ? 0.5 : 1,
            }}
          >
            {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Persona'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, preact.JSX.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 16px 12px',
    borderBottom: '1px solid #2a2a4a',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#8b8bbd',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 0',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#e0e0e0',
  },
  form: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#8b8bbd',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  input: {
    padding: '10px 12px',
    background: '#16162a',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    color: '#e0e0e0',
    fontSize: '14px',
    outline: 'none',
  },
  textarea: {
    padding: '10px 12px',
    background: '#16162a',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    color: '#e0e0e0',
    fontSize: '13px',
    outline: 'none',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    lineHeight: '1.5',
  },
  hint: {
    fontSize: '11px',
    color: '#4a4a7a',
  },
  actions: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
  },
  cancelBtn: {
    flex: 1,
    padding: '10px',
    background: '#16162a',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    color: '#8b8bbd',
    cursor: 'pointer',
    fontSize: '14px',
  },
  saveBtn: {
    flex: 2,
    padding: '10px',
    background: '#4a4ae0',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};
