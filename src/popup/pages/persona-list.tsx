import { useState, useEffect } from 'preact/hooks';
import * as preact from 'preact';
import type { Persona } from '../../shared/types';
import { getPersonas, deletePersona } from '../../shared/storage';
import { PERSONA_ICONS } from '../components/persona-icons';

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
        {personas.map((persona) => {
          const icon = PERSONA_ICONS.find(i => i.id === persona.emoji) || PERSONA_ICONS[0];
          return (
            <div key={persona.id} style={styles.card}>
              <div style={styles.cardLeft}>
                <div style={styles.iconContainer}>{icon.svg}</div>
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
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="#9F8383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 4H13M5 4V3C5 2.5 5.5 2 6 2H10C10.5 2 11 2.5 11 3V4M6 7V12M10 7V12M4 4L5 13C5 13.5 5.5 14 6 14H10C10.5 14 11 13.5 11 13L12 4" stroke="#9F8383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </button>
                  )
                )}
              </div>
            </div>
          );
        })}
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
    padding: '20px 20px 12px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logo: {
    fontSize: '28px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#574964',
  },
  settingsBtn: {
    background: 'white',
    border: '2px solid #C8AAAA',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '10px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  subtitle: {
    padding: '0 20px 16px',
    fontSize: '13px',
    color: '#9F8383',
    borderBottom: '2px solid #C8AAAA',
  },
  list: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '12px 20px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px',
    margin: '8px 0',
    background: 'white',
    borderRadius: '14px',
    border: '2px solid #C8AAAA',
    transition: 'all 0.2s ease',
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    minWidth: 0,
  },
  iconContainer: {
    width: '40px',
    height: '40px',
    flexShrink: 0,
  },
  cardInfo: {
    minWidth: 0,
  },
  cardName: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#574964',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  badge: {
    fontSize: '10px',
    padding: '3px 8px',
    background: '#FFDAB3',
    borderRadius: '6px',
    color: '#574964',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    fontWeight: '700',
  },
  toneRow: {
    display: 'flex',
    gap: '6px',
    marginTop: '6px',
    flexWrap: 'wrap' as const,
  },
  tonePill: {
    fontSize: '11px',
    padding: '3px 10px',
    background: '#F5F1ED',
    borderRadius: '12px',
    color: '#9F8383',
    textTransform: 'capitalize' as const,
    fontWeight: '600',
  },
  cardActions: {
    display: 'flex',
    gap: '6px',
    flexShrink: 0,
    alignItems: 'center',
  },
  actionBtn: {
    background: '#F5F1ED',
    border: '2px solid transparent',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  confirmRow: {
    display: 'flex',
    gap: '6px',
  },
  confirmYes: {
    padding: '6px 12px',
    background: '#FFE5E5',
    border: '2px solid #FF6B6B',
    borderRadius: '8px',
    color: '#FF6B6B',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
  },
  confirmNo: {
    padding: '6px 12px',
    background: 'white',
    border: '2px solid #C8AAAA',
    borderRadius: '8px',
    color: '#9F8383',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  addBtn: {
    margin: '8px 20px 20px',
    padding: '14px',
    background: '#574964',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
  },
};
