import { useState } from 'preact/hooks';
import * as preact from 'preact';
import { PERSONA_ICONS, type PersonaIcon } from './persona-icons';

interface Props {
  selected: string;
  onSelect: (iconId: string) => void;
}

export function IconPicker({ selected, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const selectedIcon = PERSONA_ICONS.find(i => i.id === selected) || PERSONA_ICONS[0];

  return (
    <div style={styles.wrapper}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.trigger}
        type="button"
      >
        <div style={styles.selectedIcon}>{selectedIcon.svg}</div>
        <span style={styles.changeText}>Change</span>
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.grid}>
            {PERSONA_ICONS.map((icon) => (
              <button
                key={icon.id}
                onClick={() => { onSelect(icon.id); setIsOpen(false); }}
                onMouseEnter={() => setHoveredIcon(icon.id)}
                onMouseLeave={() => setHoveredIcon(null)}
                style={{
                  ...styles.iconBtn,
                  ...(icon.id === selected ? styles.iconBtnActive : {}),
                }}
                type="button"
              >
                <div style={styles.iconWrapper}>{icon.svg}</div>
                {hoveredIcon === icon.id && (
                  <span style={styles.tooltip}>{icon.name}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, preact.JSX.CSSProperties> = {
  wrapper: {
    position: 'relative' as const,
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    background: 'white',
    border: '2px solid #C8AAAA',
    borderRadius: '12px',
    cursor: 'pointer',
    color: '#574964',
    transition: 'all 0.2s ease',
  },
  selectedIcon: {
    width: '32px',
    height: '32px',
  },
  changeText: {
    fontSize: '13px',
    color: '#9F8383',
    fontWeight: '600',
  },
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    marginTop: '8px',
    background: 'white',
    border: '2px solid #C8AAAA',
    borderRadius: '16px',
    padding: '12px',
    zIndex: 100,
    width: '280px',
    boxShadow: '0 8px 32px rgba(87, 73, 100, 0.15)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
  },
  iconBtn: {
    background: '#F5F1ED',
    border: '2px solid transparent',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '10px',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  iconBtnActive: {
    background: '#FFDAB3',
    borderColor: '#9F8383',
  },
  iconWrapper: {
    width: '36px',
    height: '36px',
  },
  tooltip: {
    position: 'absolute' as const,
    top: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#574964',
    color: 'white',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '600',
    whiteSpace: 'nowrap' as const,
    pointerEvents: 'none' as const,
    zIndex: 200,
    boxShadow: '0 2px 8px rgba(87, 73, 100, 0.3)',
  },
};
