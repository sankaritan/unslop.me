import { useState } from 'preact/hooks';
import * as preact from 'preact';

interface Props {
  selected: string;
  onSelect: (emoji: string) => void;
}

const EMOJI_CATEGORIES: { label: string; emojis: string[] }[] = [
  {
    label: 'People',
    emojis: [
      '😎', '🤓', '🧐', '🤠', '👨‍💻', '👩‍💻', '🧑‍💼', '👨‍🔧',
      '🤖', '👻', '🎭', '🦊', '🐻', '🦁', '🐸', '🐵',
      '👾', '🧙', '🧛', '🧟', '🦸', '🦹', '🥷', '🧑‍🎤',
    ],
  },
  {
    label: 'Vibes',
    emojis: [
      '🔥', '💀', '🧹', '⚡', '💎', '🗡️', '🎯', '🚀',
      '💬', '🗣️', '✨', '🌶️', '🧊', '🎪', '🎸', '🏴‍☠️',
      '🌪️', '💥', '🦾', '🧠', '👁️', '🎩', '🃏', '🪄',
    ],
  },
  {
    label: 'Objects',
    emojis: [
      '☕', '🍺', '🥃', '🍕', '📱', '💻', '🎮', '📝',
      '📎', '🔧', '🔨', '⚙️', '🏆', '📦', '🎬', '📢',
    ],
  },
];

export function EmojiPicker({ selected, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={styles.wrapper}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={styles.trigger}
        type="button"
      >
        <span style={styles.selectedEmoji}>{selected}</span>
        <span style={styles.changeText}>Change</span>
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          {EMOJI_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div style={styles.catLabel}>{cat.label}</div>
              <div style={styles.grid}>
                {cat.emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => { onSelect(emoji); setIsOpen(false); }}
                    style={{
                      ...styles.emojiBtn,
                      ...(emoji === selected ? styles.emojiBtnActive : {}),
                    }}
                    type="button"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
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
    gap: '8px',
    padding: '8px 14px',
    background: '#16162a',
    border: '1px solid #2a2a4a',
    borderRadius: '10px',
    cursor: 'pointer',
    color: '#e0e0e0',
  },
  selectedEmoji: {
    fontSize: '28px',
  },
  changeText: {
    fontSize: '12px',
    color: '#6b6b9a',
  },
  dropdown: {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    marginTop: '4px',
    background: '#1a1a2e',
    border: '1px solid #2a2a4a',
    borderRadius: '12px',
    padding: '8px',
    zIndex: 100,
    width: '280px',
    maxHeight: '250px',
    overflowY: 'auto' as const,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  },
  catLabel: {
    fontSize: '10px',
    color: '#6b6b9a',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    padding: '6px 4px 4px',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '2px',
  },
  emojiBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    padding: '4px',
    borderRadius: '6px',
    lineHeight: 1,
  },
  emojiBtnActive: {
    background: '#2a2a4a',
  },
};
