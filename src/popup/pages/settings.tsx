import { useState, useEffect } from 'preact/hooks';
import * as preact from 'preact';
import type { Provider, Settings } from '../../shared/types';
import { getSettings, setSettings } from '../../shared/storage';

interface Props {
  onBack: () => void;
}

export function SettingsPage({ onBack }: Props) {
  const [provider, setProvider] = useState<Provider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const [openRouterApiKey, setOpenRouterApiKey] = useState('');
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showOpenRouterKey, setShowOpenRouterKey] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openRouterStatus, setOpenRouterStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [openRouterErrorMsg, setOpenRouterErrorMsg] = useState('');

  useEffect(() => {
    getSettings().then((s) => {
      setProvider(s.provider || (s.testMode ? 'test' : 'gemini'));
      setApiKey(s.apiKey);
      setOpenRouterApiKey(s.openRouterApiKey || '');
      if (s.apiKeyValid) setStatus('valid');
      if (s.openRouterApiKeyValid) setOpenRouterStatus('valid');
    });
  }, []);

  const persistSettings = async (next: Partial<Settings> = {}) => {
    const resolvedProvider = next.provider ?? provider;
    const nextSettings: Settings = {
      provider: resolvedProvider,
      apiKey: next.apiKey ?? apiKey,
      apiKeyValid: next.apiKeyValid ?? status === 'valid',
      openRouterApiKey: next.openRouterApiKey ?? openRouterApiKey,
      openRouterApiKeyValid: next.openRouterApiKeyValid ?? openRouterStatus === 'valid',
      testMode: resolvedProvider === 'test',
    };
    await setSettings(nextSettings);
  };

  const handleValidateGemini = async () => {
    if (!apiKey.trim()) return;
    setStatus('checking');
    setErrorMsg('');

    const response = await chrome.runtime.sendMessage({
      type: 'VALIDATE_KEY',
      apiKey: apiKey.trim(),
      provider: 'gemini',
    });

    if (response.valid) {
      setStatus('valid');
      await persistSettings({ apiKey: apiKey.trim(), apiKeyValid: true });
    } else {
      setStatus('invalid');
      setErrorMsg(response.error || 'Invalid API key');
      await persistSettings({ apiKey: apiKey.trim(), apiKeyValid: false });
    }
  };

  const handleValidateOpenRouter = async () => {
    if (!openRouterApiKey.trim()) return;
    setOpenRouterStatus('checking');
    setOpenRouterErrorMsg('');

    const response = await chrome.runtime.sendMessage({
      type: 'VALIDATE_KEY',
      apiKey: openRouterApiKey.trim(),
      provider: 'openrouter',
    });

    if (response.valid) {
      setOpenRouterStatus('valid');
      await persistSettings({ openRouterApiKey: openRouterApiKey.trim(), openRouterApiKeyValid: true });
    } else {
      setOpenRouterStatus('invalid');
      setOpenRouterErrorMsg(response.error || 'Invalid API key');
      await persistSettings({ openRouterApiKey: openRouterApiKey.trim(), openRouterApiKeyValid: false });
    }
  };

  const handleProviderChange = async (nextProvider: Provider) => {
    setProvider(nextProvider);
    await persistSettings({ provider: nextProvider });
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>← Back</button>
        <h2 style={styles.title}>Settings</h2>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Provider</label>
        <div style={styles.providerToggleRow}>
          <button
            onClick={() => handleProviderChange('gemini')}
            style={{
              ...styles.providerButton,
              ...(provider === 'gemini' ? styles.providerButtonActive : {}),
            }}
          >
            Gemini
          </button>
          <button
            onClick={() => handleProviderChange('openrouter')}
            style={{
              ...styles.providerButton,
              ...(provider === 'openrouter' ? styles.providerButtonActive : {}),
            }}
          >
            OpenRouter
          </button>
          <button
            onClick={() => handleProviderChange('test')}
            style={{
              ...styles.providerButton,
              ...(provider === 'test' ? styles.providerButtonActive : {}),
            }}
          >
            Test Mode
          </button>
        </div>
        {provider === 'test' && (
          <div style={styles.testModeWarning}>
            ⚠️ Test mode is active - API calls are disabled
          </div>
        )}
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <label style={styles.label}>Gemini API Key</label>
        <div style={styles.inputRow}>
          <input
            type={showGeminiKey ? 'text' : 'password'}
            value={apiKey}
            onInput={(e) => {
              setApiKey((e.target as HTMLInputElement).value);
              setStatus('idle');
            }}
            placeholder="Enter your Gemini API key..."
            style={styles.input}
          />
          <button onClick={() => setShowGeminiKey(!showGeminiKey)} style={styles.toggleBtn}>
            {showGeminiKey ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          onClick={handleValidateGemini}
          disabled={!apiKey.trim() || status === 'checking'}
          style={{
            ...styles.validateBtn,
            opacity: !apiKey.trim() || status === 'checking' ? 0.5 : 1,
          }}
        >
          {status === 'checking' ? '⏳ Validating...' : 'Validate & Save Gemini Key'}
        </button>

        {status === 'valid' && (
          <div style={styles.statusValid}>✅ Gemini API key is valid</div>
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
          Uses Gemini 3 Flash — free tier
        </p>
      </div>

      <div style={styles.divider} />

      <div style={styles.section}>
        <label style={styles.label}>OpenRouter API Key</label>
        <div style={styles.inputRow}>
          <input
            type={showOpenRouterKey ? 'text' : 'password'}
            value={openRouterApiKey}
            onInput={(e) => {
              setOpenRouterApiKey((e.target as HTMLInputElement).value);
              setOpenRouterStatus('idle');
            }}
            placeholder="Enter your OpenRouter API key..."
            style={styles.input}
          />
          <button onClick={() => setShowOpenRouterKey(!showOpenRouterKey)} style={styles.toggleBtn}>
            {showOpenRouterKey ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          onClick={handleValidateOpenRouter}
          disabled={!openRouterApiKey.trim() || openRouterStatus === 'checking'}
          style={{
            ...styles.validateBtn,
            opacity: !openRouterApiKey.trim() || openRouterStatus === 'checking' ? 0.5 : 1,
          }}
        >
          {openRouterStatus === 'checking' ? '⏳ Validating...' : 'Validate & Save OpenRouter Key'}
        </button>

        {openRouterStatus === 'valid' && (
          <div style={styles.statusValid}>✅ OpenRouter API key is valid</div>
        )}
        {openRouterStatus === 'invalid' && (
          <div style={styles.statusInvalid}>❌ {openRouterErrorMsg}</div>
        )}

        <p style={styles.hint}>
          Get an API key from{' '}
          <a
            href="https://openrouter.ai/keys"
            target="_blank"
            rel="noopener"
            style={styles.link}
          >
            OpenRouter
          </a>
        </p>
        <p style={styles.hintSmall}>
          Uses openrouter/auto (free tier available)
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
  divider: {
    height: '2px',
    background: '#C8AAAA',
    margin: '0 20px',
  },
  providerToggleRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  providerButton: {
    padding: '10px 12px',
    borderRadius: '999px',
    border: '2px solid #C8AAAA',
    background: '#fff',
    color: '#574964',
    fontWeight: '700',
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.6px',
    cursor: 'pointer',
  },
  providerButtonActive: {
    background: '#574964',
    color: '#fff',
    borderColor: '#574964',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
  },
  toggleTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#574964',
    marginBottom: '4px',
  },
  toggleDescription: {
    fontSize: '12px',
    color: '#9F8383',
    lineHeight: '1.5',
  },
  toggle: {
    width: '52px',
    height: '28px',
    background: '#C8AAAA',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
    position: 'relative' as const,
    transition: 'all 0.3s ease',
    flexShrink: 0,
    padding: 0,
  },
  toggleActive: {
    background: '#574964',
  },
  toggleThumb: {
    width: '22px',
    height: '22px',
    background: 'white',
    borderRadius: '50%',
    position: 'absolute' as const,
    top: '3px',
    left: '3px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(87, 73, 100, 0.2)',
  },
  toggleThumbActive: {
    left: '27px',
  },
  testModeWarning: {
    marginTop: '12px',
    padding: '10px 14px',
    background: '#FFF9E6',
    border: '2px solid #FFDAB3',
    borderRadius: '10px',
    color: '#574964',
    fontSize: '13px',
    fontWeight: '600',
  },
};
