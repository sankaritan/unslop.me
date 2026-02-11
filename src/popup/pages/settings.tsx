import { useState, useEffect } from 'preact/hooks';
import * as preact from 'preact';
import type { Settings } from '../../shared/types';
import { getSettings, setSettings } from '../../shared/storage';

interface Props {
  onBack: () => void;
}

export function SettingsPage({ onBack }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getSettings().then((s) => {
      setApiKey(s.apiKey);
      if (s.apiKeyValid) setStatus('valid');
    });
  }, []);

  const handleValidate = async () => {
    if (!apiKey.trim()) return;
    setStatus('checking');
    setErrorMsg('');

    const response = await chrome.runtime.sendMessage({
      type: 'VALIDATE_KEY',
      apiKey: apiKey.trim(),
    });

    if (response.valid) {
      setStatus('valid');
      await setSettings({ apiKey: apiKey.trim(), apiKeyValid: true });
    } else {
      setStatus('invalid');
      setErrorMsg(response.error || 'Invalid API key');
      await setSettings({ apiKey: apiKey.trim(), apiKeyValid: false });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <h2 style={styles.title}>Settings</h2>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Gemini API Key</label>
        <div style={styles.inputRow}>
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onInput={(e) => {
              setApiKey((e.target as HTMLInputElement).value);
              setStatus('idle');
            }}
            placeholder="Enter your API key..."
            style={styles.input}
          />
          <button onClick={() => setShowKey(!showKey)} style={styles.toggleBtn}>
            {showKey ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          onClick={handleValidate}
          disabled={!apiKey.trim() || status === 'checking'}
          style={{
            ...styles.validateBtn,
            opacity: !apiKey.trim() || status === 'checking' ? 0.5 : 1,
          }}
        >
          {status === 'checking' ? '⏳ Validating...' : 'Validate & Save'}
        </button>

        {status === 'valid' && (
          <div style={styles.statusValid}>✅ API key is valid</div>
        )}
        {status === 'invalid' && (
          <div style={styles.statusInvalid}>❌ {errorMsg}</div>
        )}

        <p style={styles.hint}>
          Get a free API key from{' '}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener"
            style={styles.link}
          >
            Google AI Studio
          </a>
        </p>
        <p style={styles.hintSmall}>
          Uses Gemini 2.0 Flash — free tier: 15 requests/min, 1500 requests/day
        </p>
      </div>
    </div>
  );
}

const styles: Record<string, preact.JSX.CSSProperties> = {
  container: {
    padding: '0',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 16px 12px',
    borderBottom: '1px solid #2a2a4a',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#8b8bbd',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 0',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#e0e0e0',
  },
  section: {
    padding: '20px 16px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#8b8bbd',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    background: '#16162a',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    color: '#e0e0e0',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'monospace',
  },
  toggleBtn: {
    background: '#16162a',
    border: '1px solid #2a2a4a',
    borderRadius: '8px',
    cursor: 'pointer',
    padding: '0 10px',
    fontSize: '16px',
  },
  validateBtn: {
    width: '100%',
    padding: '10px',
    background: '#4a4ae0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '12px',
  },
  statusValid: {
    padding: '8px 12px',
    background: '#1a3a2a',
    borderRadius: '8px',
    color: '#4ade80',
    fontSize: '13px',
    marginBottom: '12px',
  },
  statusInvalid: {
    padding: '8px 12px',
    background: '#3a1a1a',
    borderRadius: '8px',
    color: '#f87171',
    fontSize: '13px',
    marginBottom: '12px',
  },
  hint: {
    fontSize: '12px',
    color: '#6b6b9a',
    marginTop: '8px',
  },
  hintSmall: {
    fontSize: '11px',
    color: '#4a4a7a',
    marginTop: '4px',
  },
  link: {
    color: '#7b7beb',
    textDecoration: 'none',
  },
};
