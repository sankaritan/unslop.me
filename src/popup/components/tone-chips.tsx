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
    gap: '6px',
    flexWrap: 'wrap' as const,
  },
  chip: {
    padding: '6px 14px',
    borderRadius: '16px',
    border: '1px solid #2a2a4a',
    background: '#16162a',
    color: '#8b8bbd',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.15s ease',
  },
  chipActive: {
    background: '#4a4ae0',
    borderColor: '#4a4ae0',
    color: '#fff',
  },
};
