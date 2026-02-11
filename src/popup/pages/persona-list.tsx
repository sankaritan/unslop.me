import { useState, useEffect } from 'preact/hooks';
import * as preact from 'preact';
import type { Persona } from '../../shared/types';
import { getPersonas, deletePersona } from '../../shared/storage';

interface Props {
  onSettings: () => void;
  onAdd: () => void;
  onEdit: (persona: Persona) => void;
}

export function PersonaList({ onSettings, onAdd, onEdit }: Props) {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);

  const loadPersonas = async () => {
    const p = await getPersonas();
    setPersonas(p);
  };

  useEffect(() => { loadPersonas(); }, []);

  const handleDelete = async (id: string) => {
    if (confirmingDelete !== id) {
      setConfirmingDelete(id);
      return;
    }
    await deletePersona(id);
    setConfirmingDelete(null);
    await loadPersonas();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>🧹</span>
          <h1 style={styles.title}>Unslop</h1>
        </div>
        <button onClick={onSettings} style={styles.settingsBtn} title="Settings">
          ⚙️
        </button>
      </div>

      <div style={styles.subtitle}>
        Highlight sloppy AI text → pick a persona → get human text
      </div>

      <div style={styles.list}>
        {personas.map((persona) => (
          <div key={persona.id} style={styles.card}>
            <div style={styles.cardLeft}>
              <span style={styles.emoji}>{persona.emoji}</span>
              <div style={styles.cardInfo}>
                <div style={styles.cardName}>
                  {persona.name}
                  {persona.id === 'default' && (
                    <span style={styles.badge}>Default</span>
                  )}
                </div>
                {persona.tonePresets.length > 0 && (
                  <div style={styles.toneRow}>
                    {persona.tonePresets.map((t) => (
                      <span key={t} style={styles.tonePill}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={styles.cardActions}>
              <button onClick={() => onEdit(persona)} style={styles.actionBtn} title="Edit">
                ✏️
              </button>
              {persona.id !== 'default' && (
                confirmingDelete === persona.id ? (
                  <div style={styles.confirmRow}>
                    <button
                      onClick={() => handleDelete(persona.id)}
                      style={styles.confirmYes}
                      title="Confirm delete"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmingDelete(null)}
                      style={styles.confirmNo}
                      title="Cancel"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleDelete(persona.id)} style={styles.actionBtn} title="Delete">
                    🗑️
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={onAdd} style={styles.addBtn}>
        + Add Persona
      </button>
    </div>
  );
}

const styles: Record<string, preact.JSX.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 16px 8px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logo: {
    fontSize: '24px',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#e0e0e0',
  },
  settingsBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '6px',
  },
  subtitle: {
    padding: '0 16px 16px',
    fontSize: '12px',
    color: '#6b6b9a',
    borderBottom: '1px solid #2a2a4a',
  },
  list: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '8px 16px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px',
    margin: '6px 0',
    background: '#16162a',
    borderRadius: '10px',
    border: '1px solid #2a2a4a',
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  emoji: {
    fontSize: '28px',
    flexShrink: 0,
  },
  cardInfo: {
    minWidth: 0,
  },
  cardName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  badge: {
    fontSize: '10px',
    padding: '2px 6px',
    background: '#2a2a4a',
    borderRadius: '4px',
    color: '#8b8bbd',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    fontWeight: '600',
  },
  toneRow: {
    display: 'flex',
    gap: '4px',
    marginTop: '4px',
    flexWrap: 'wrap' as const,
  },
  tonePill: {
    fontSize: '10px',
    padding: '2px 8px',
    background: '#252545',
    borderRadius: '10px',
    color: '#7b7beb',
    textTransform: 'capitalize' as const,
  },
  cardActions: {
    display: 'flex',
    gap: '4px',
    flexShrink: 0,
    alignItems: 'center',
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 6px',
    borderRadius: '6px',
    opacity: 0.6,
  },
  confirmRow: {
    display: 'flex',
    gap: '4px',
  },
  confirmYes: {
    padding: '2px 8px',
    background: '#4a1a1a',
    border: '1px solid #6a2a2a',
    borderRadius: '4px',
    color: '#f87171',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '600',
  },
  confirmNo: {
    padding: '2px 8px',
    background: '#16162a',
    border: '1px solid #2a2a4a',
    borderRadius: '4px',
    color: '#8b8bbd',
    cursor: 'pointer',
    fontSize: '11px',
  },
  addBtn: {
    margin: '8px 16px 16px',
    padding: '12px',
    background: '#4a4ae0',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
};
