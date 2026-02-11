import { render } from 'preact';
import { useState } from 'preact/hooks';
import { PersonaList } from './pages/persona-list';
import { PersonaForm } from './pages/persona-form';
import { SettingsPage } from './pages/settings';
import type { Persona } from '../shared/types';

type Page = 
  | { view: 'list' }
  | { view: 'settings' }
  | { view: 'form'; persona?: Persona };

function App() {
  const [page, setPage] = useState<Page>({ view: 'list' });

  return (
    <div style={{ minHeight: '480px', display: 'flex', flexDirection: 'column' }}>
      {page.view === 'list' && (
        <PersonaList
          onSettings={() => setPage({ view: 'settings' })}
          onAdd={() => setPage({ view: 'form' })}
          onEdit={(persona) => setPage({ view: 'form', persona })}
        />
      )}
      {page.view === 'settings' && (
        <SettingsPage onBack={() => setPage({ view: 'list' })} />
      )}
      {page.view === 'form' && (
        <PersonaForm
          persona={page.persona}
          onBack={() => setPage({ view: 'list' })}
        />
      )}
    </div>
  );
}

render(<App />, document.getElementById('app')!);
