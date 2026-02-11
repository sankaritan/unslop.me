import * as preact from 'preact';
import { TonePreset, TONE_PRESET_LABELS } from '../../shared/types';

interface Props {
  selected: TonePreset[];
  onChange: (presets: TonePreset[]) => void;
}

const ALL_PRESETS: TonePreset[] = ['casual', 'blunt', 'sarcastic', 'friendly'];

export function ToneChips({ selected, onChange }: Props) {
  const toggle = (preset: TonePreset) => {
    if (selected.includes(preset)) {
      onChange(selected.filter(p => p !== preset));
    } else {
      onChange([...selected, preset]);
    }
  };

  return (
    <div style={styles.container}>
      {ALL_PRESETS.map((preset) => {
        const isActive = selected.includes(preset);
        return (
          <button
            key={preset}
            onClick={() => toggle(preset)}
            style={{
              ...styles.chip,
              ...(isActive ? styles.chipActive : {}),
            }}
            type="button"
          >
            {TONE_PRESET_LABELS[preset]}
          </button>
        );
      })}
    </div>
  );
}

const styles: Record<string, preact.JSX.CSSProperties> = {
  container: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  chip: {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '2px solid #C8AAAA',
    background: 'white',
    color: '#9F8383',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  chipActive: {
    background: '#574964',
    borderColor: '#574964',
    color: '#fff',
  },
};
