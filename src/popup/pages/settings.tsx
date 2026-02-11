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
    padding: '20px 20px 16px',
    borderBottom: '2px solid #C8AAAA',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#9F8383',
    cursor: 'pointer',
    fontSize: '15px',
    padding: '4px 0',
    fontWeight: '600',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#574964',
  },
  section: {
    padding: '24px 20px',
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    color: '#574964',
    marginBottom: '10px',
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
    padding: '12px 14px',
    background: 'white',
    border: '2px solid #C8AAAA',
    borderRadius: '10px',
    color: '#574964',
    fontSize: '13px',
    outline: 'none',
    fontFamily: 'monospace',
    fontWeight: '500',
  },
  toggleBtn: {
    background: 'white',
    border: '2px solid #C8AAAA',
    borderRadius: '10px',
    cursor: 'pointer',
    padding: '0 12px',
    fontSize: '18px',
    transition: 'all 0.2s ease',
  },
  validateBtn: {
    width: '100%',
    padding: '12px',
    background: '#574964',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    marginBottom: '12px',
    transition: 'all 0.2s ease',
  },
  statusValid: {
    padding: '10px 14px',
    background: '#E8F5E9',
    borderRadius: '10px',
    color: '#2E7D32',
    fontSize: '13px',
    marginBottom: '12px',
    fontWeight: '600',
    border: '2px solid #81C784',
  },
  statusInvalid: {
    padding: '10px 14px',
    background: '#FFEBEE',
    borderRadius: '10px',
    color: '#C62828',
    fontSize: '13px',
    marginBottom: '12px',
    fontWeight: '600',
    border: '2px solid #E57373',
  },
  hint: {
    fontSize: '13px',
    color: '#9F8383',
    marginTop: '8px',
    lineHeight: '1.5',
  },
  hintSmall: {
    fontSize: '12px',
    color: '#C8AAAA',
    marginTop: '6px',
    lineHeight: '1.5',
  },
  link: {
    color: '#574964',
    textDecoration: 'underline',
    fontWeight: '600',
  },
};
