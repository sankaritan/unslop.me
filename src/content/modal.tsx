import { useState } from 'preact/hooks';
import type { Persona } from '../shared/types';
import { PERSONA_ICONS } from '../popup/components/persona-icons';

interface Props {
  persona: Persona | null;
  text: string;
  done: boolean;
  error: string;
  onClose: () => void;
  onRetry: () => void;
}

export function Modal({ persona, text, done, error, onClose, onRetry }: Props) {
  const [copied, setCopied] = useState(false);
  const icon = persona ? (PERSONA_ICONS.find(i => i.id === persona.emoji) || PERSONA_ICONS[0]) : PERSONA_ICONS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');
        
        .unslop-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(87, 73, 100, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2147483647;
          animation: unslop-overlay-in 0.2s ease-out;
          font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          pointer-events: auto;
        }
        .unslop-modal {
          background: #F5F1ED;
          border: 3px solid #C8AAAA;
          border-radius: 20px;
          width: 560px;
          max-width: 90vw;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 64px rgba(87, 73, 100, 0.3);
          animation: unslop-modal-in 0.25s ease-out;
        }
        .unslop-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 2px solid #C8AAAA;
        }
        .unslop-modal-persona {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .unslop-modal-icon {
          width: 40px;
          height: 40px;
        }
        .unslop-modal-name {
          font-size: 16px;
          font-weight: 700;
          color: #574964;
        }
        .unslop-modal-status {
          font-size: 12px;
          color: #9F8383;
          margin-top: 2px;
          font-weight: 600;
        }
        .unslop-modal-close {
          width: 36px;
          height: 36px;
          border: none;
          background: white;
          border: 2px solid #C8AAAA;
          border-radius: 10px;
          color: #9F8383;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          line-height: 1;
          padding: 0;
          font-weight: 700;
        }
        .unslop-modal-close:hover {
          background: #FFDAB3;
          color: #574964;
        }
        .unslop-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          min-height: 120px;
        }
        .unslop-modal-text {
          font-size: 15px;
          line-height: 1.7;
          color: #574964;
          white-space: pre-wrap;
          word-wrap: break-word;
          font-weight: 500;
        }
        .unslop-modal-cursor {
          display: inline-block;
          width: 2px;
          height: 18px;
          background: #574964;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: unslop-blink 0.8s step-end infinite;
        }
        .unslop-modal-loading {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #9F8383;
          font-size: 14px;
          font-weight: 600;
        }
        .unslop-modal-dots {
          display: flex;
          gap: 6px;
        }
        .unslop-modal-dots span {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #574964;
          border-radius: 50%;
          animation: unslop-bounce 1.2s ease-in-out infinite;
        }
        .unslop-modal-dots span:nth-child(2) { animation-delay: 0.15s; }
        .unslop-modal-dots span:nth-child(3) { animation-delay: 0.3s; }
        .unslop-modal-error {
          padding: 16px 18px;
          background: #FFEBEE;
          border: 2px solid #E57373;
          border-radius: 12px;
          color: #C62828;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 600;
        }
        .unslop-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding: 16px 24px;
          border-top: 2px solid #C8AAAA;
        }
        .unslop-modal-btn {
          padding: 10px 24px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .unslop-modal-btn-copy {
          background: #574964;
          color: #fff;
        }
        .unslop-modal-btn-copy:hover {
          background: #6a5a78;
        }
        .unslop-modal-btn-copy:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .unslop-modal-btn-copied {
          background: #81C784;
          color: #1B5E20;
        }
        .unslop-modal-btn-retry {
          background: white;
          border: 2px solid #C8AAAA;
          color: #9F8383;
        }
        .unslop-modal-btn-retry:hover {
          background: #FFDAB3;
          color: #574964;
        }
        @keyframes unslop-overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes unslop-modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes unslop-blink {
          50% { opacity: 0; }
        }
        @keyframes unslop-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div class="unslop-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div class="unslop-modal">
          <div class="unslop-modal-header">
            <div class="unslop-modal-persona">
              <div class="unslop-modal-icon">{icon.svg}</div>
              <div>
                <div class="unslop-modal-name">{persona?.name || 'Unslopping'}</div>
                <div class="unslop-modal-status">
                  {error ? 'Error' : done ? 'Complete' : 'Generating...'}
                </div>
              </div>
            </div>
            <button class="unslop-modal-close" onClick={onClose}>✕</button>
          </div>

          <div class="unslop-modal-body">
            {error ? (
              <div class="unslop-modal-error">{error}</div>
            ) : text ? (
              <div class="unslop-modal-text">
                {text}
                {!done && <span class="unslop-modal-cursor" />}
              </div>
            ) : (
              <div class="unslop-modal-loading">
                <div class="unslop-modal-dots">
                  <span /><span /><span />
                </div>
                Unslopping your text...
              </div>
            )}
          </div>

          <div class="unslop-modal-footer">
            {error && (
              <button class="unslop-modal-btn unslop-modal-btn-retry" onClick={onRetry}>
                🔄 Retry
              </button>
            )}
            <button
              class={`unslop-modal-btn ${copied ? 'unslop-modal-btn-copied' : 'unslop-modal-btn-copy'}`}
              onClick={handleCopy}
              disabled={!text || !done}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
