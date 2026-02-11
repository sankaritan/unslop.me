import type { Persona } from '../shared/types';

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
        .unslop-toolbar {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 4px 6px;
          background: #1a1a2e;
          border: 1px solid #2a2a4a;
          border-radius: 12px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
          animation: unslop-fadein 0.15s ease-out;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .unslop-toolbar-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          background: transparent;
          border-radius: 8px;
          cursor: pointer;
          font-size: 22px;
          transition: background 0.1s ease, transform 0.1s ease;
          position: relative;
          line-height: 1;
          padding: 0;
        }
        .unslop-toolbar-btn:hover {
          background: #2a2a4a;
          transform: scale(1.1);
        }
        .unslop-toolbar-btn:active {
          transform: scale(0.95);
        }
        .unslop-toolbar-tooltip {
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 10px;
          background: #0d0d1a;
          border: 1px solid #2a2a4a;
          border-radius: 6px;
          color: #c0c0e0;
          font-size: 11px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s ease;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .unslop-toolbar-btn:hover .unslop-toolbar-tooltip {
          opacity: 1;
        }
        .unslop-toolbar-divider {
          width: 1px;
          height: 24px;
          background: #2a2a4a;
          margin: 0 2px;
        }
        @keyframes unslop-fadein {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .unslop-toolbar-label {
          font-size: 10px;
          color: #6b6b9a;
          padding: 0 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
          user-select: none;
        }
      `}</style>
      <div class="unslop-toolbar">
        <span class="unslop-toolbar-label">Unslop</span>
        <div class="unslop-toolbar-divider" />
        {personas.map((persona) => (
          <button
            key={persona.id}
            class="unslop-toolbar-btn"
            onClick={(e) => { e.stopPropagation(); onSelect(persona); }}
          >
            {persona.emoji}
            <span class="unslop-toolbar-tooltip">{persona.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
