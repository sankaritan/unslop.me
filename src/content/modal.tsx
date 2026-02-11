import { useState } from 'preact/hooks';
import type { Persona } from '../shared/types';

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
        .unslop-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2147483647;
          animation: unslop-overlay-in 0.2s ease-out;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          pointer-events: auto;
        }
        .unslop-modal {
          background: #1a1a2e;
          border: 1px solid #2a2a4a;
          border-radius: 16px;
          width: 560px;
          max-width: 90vw;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
          animation: unslop-modal-in 0.25s ease-out;
        }
        .unslop-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #2a2a4a;
        }
        .unslop-modal-persona {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .unslop-modal-emoji {
          font-size: 28px;
          line-height: 1;
        }
        .unslop-modal-name {
          font-size: 15px;
          font-weight: 600;
          color: #e0e0e0;
        }
        .unslop-modal-status {
          font-size: 11px;
          color: #6b6b9a;
          margin-top: 2px;
        }
        .unslop-modal-close {
          width: 32px;
          height: 32px;
          border: none;
          background: #16162a;
          border-radius: 8px;
          color: #6b6b9a;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease, color 0.15s ease;
          line-height: 1;
          padding: 0;
        }
        .unslop-modal-close:hover {
          background: #2a2a4a;
          color: #e0e0e0;
        }
        .unslop-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          min-height: 120px;
        }
        .unslop-modal-text {
          font-size: 15px;
          line-height: 1.7;
          color: #d0d0e8;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .unslop-modal-cursor {
          display: inline-block;
          width: 2px;
          height: 18px;
          background: #7b7beb;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: unslop-blink 0.8s step-end infinite;
        }
        .unslop-modal-loading {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b6b9a;
          font-size: 14px;
        }
        .unslop-modal-dots {
          display: flex;
          gap: 4px;
        }
        .unslop-modal-dots span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #4a4ae0;
          border-radius: 50%;
          animation: unslop-bounce 1.2s ease-in-out infinite;
        }
        .unslop-modal-dots span:nth-child(2) { animation-delay: 0.15s; }
        .unslop-modal-dots span:nth-child(3) { animation-delay: 0.3s; }
        .unslop-modal-error {
          padding: 14px 16px;
          background: #2a1020;
          border: 1px solid #4a2030;
          border-radius: 10px;
          color: #f87171;
          font-size: 13px;
          line-height: 1.5;
        }
        .unslop-modal-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          padding: 12px 20px;
          border-top: 1px solid #2a2a4a;
        }
        .unslop-modal-btn {
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.15s ease;
          font-family: inherit;
        }
        .unslop-modal-btn-copy {
          background: #4a4ae0;
          color: #fff;
        }
        .unslop-modal-btn-copy:hover {
          background: #5a5af0;
        }
        .unslop-modal-btn-copy:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .unslop-modal-btn-copied {
          background: #2a6a3a;
          color: #4ade80;
        }
        .unslop-modal-btn-retry {
          background: #16162a;
          border: 1px solid #2a2a4a;
          color: #8b8bbd;
        }
        .unslop-modal-btn-retry:hover {
          background: #2a2a4a;
          color: #e0e0e0;
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
              <span class="unslop-modal-emoji">{persona?.emoji || '🧹'}</span>
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
