import type { Persona } from '../shared/types';
import { PERSONA_ICONS } from '../popup/components/persona-icons';

interface Props {
  personas: Persona[];
  position: { x: number; y: number };
  onSelect: (persona: Persona) => void;
}

export function Toolbar({ personas, position, onSelect }: Props) {
  // Determine if toolbar should go below instead of above (if near top of viewport)
  const viewportY = position.y - window.scrollY;
  const showBelow = viewportY < 60;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: showBelow ? `${position.y + 50}px` : `${position.y}px`,
        transform: showBelow ? 'translateX(-50%)' : 'translate(-50%, -100%)',
        zIndex: 2147483647,
        pointerEvents: 'auto',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');
        
        .unslop-toolbar {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          background: #F5F1ED;
          border: 3px solid #C8AAAA;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(87, 73, 100, 0.2);
          animation: unslop-fadein 0.15s ease-out;
          font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .unslop-toolbar-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: none;
          background: white;
          border: 2px solid #C8AAAA;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          padding: 6px;
        }
        .unslop-toolbar-btn:hover {
          background: #FFDAB3;
          border-color: #9F8383;
          transform: scale(1.08);
        }
        .unslop-toolbar-btn:active {
          transform: scale(0.95);
        }
        .unslop-toolbar-icon {
          width: 100%;
          height: 100%;
        }
        .unslop-toolbar-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 12px;
          background: #574964;
          border-radius: 8px;
          color: white;
          font-size: 12px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(87, 73, 100, 0.3);
        }
        .unslop-toolbar-btn:hover .unslop-toolbar-tooltip {
          opacity: 1;
        }
        .unslop-toolbar-divider {
          width: 2px;
          height: 28px;
          background: #C8AAAA;
          margin: 0 4px;
        }
        @keyframes unslop-fadein {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .unslop-toolbar-label {
          font-size: 11px;
          color: #574964;
          padding: 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 700;
          user-select: none;
        }
      `}</style>
      <div class="unslop-toolbar">
        <span class="unslop-toolbar-label">Unslop</span>
        <div class="unslop-toolbar-divider" />
        {personas.map((persona) => {
          const icon = PERSONA_ICONS.find(i => i.id === persona.emoji) || PERSONA_ICONS[0];
          return (
            <button
              key={persona.id}
              class="unslop-toolbar-btn"
              onClick={(e) => { e.stopPropagation(); onSelect(persona); }}
            >
              <div class="unslop-toolbar-icon">{icon.svg}</div>
              <span class="unslop-toolbar-tooltip">{persona.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
