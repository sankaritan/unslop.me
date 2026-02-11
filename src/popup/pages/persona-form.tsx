import { useState } from 'preact/hooks';
import * as preact from 'preact';
import type { Persona, TonePreset } from '../../shared/types';
import { addPersona, updatePersona } from '../../shared/storage';
import { IconPicker } from '../components/icon-picker';
import { ToneChips } from '../components/tone-chips';

interface Props {
  persona?: Persona; // If provided, we're editing
  onBack: () => void;
}

export function PersonaForm({ persona, onBack }: Props) {
  const isEditing = !!persona;
  const [name, setName] = useState(persona?.name || '');
  const [emoji, setEmoji] = useState(persona?.emoji || 'casual');
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
          <IconPicker selected={emoji} onSelect={setEmoji} />
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
    padding: '20px 20px 16px',
    borderBottom: '2px solid #C8AAAA',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#9F8383',
    cursor: 'pointer',
    fontSize: '15px',
    padding: '4px 0',
    fontWeight: '600',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#574964',
  },
  form: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#574964',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  input: {
    padding: '12px 14px',
    background: 'white',
    border: '2px solid #C8AAAA',
    borderRadius: '10px',
    color: '#574964',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  textarea: {
    padding: '12px 14px',
    background: 'white',
    border: '2px solid #C8AAAA',
    borderRadius: '10px',
    color: '#574964',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical' as const,
    fontFamily: 'inherit',
    lineHeight: '1.6',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  hint: {
    fontSize: '12px',
    color: '#9F8383',
    lineHeight: '1.5',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '8px',
  },
  cancelBtn: {
    flex: 1,
    padding: '12px',
    background: 'white',
    border: '2px solid #C8AAAA',
    borderRadius: '10px',
    color: '#9F8383',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  saveBtn: {
    flex: 2,
    padding: '12px',
    background: '#574964',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
  },
};
