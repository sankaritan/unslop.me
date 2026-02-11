import { render } from 'preact';
import { Toolbar } from './toolbar';
import { Modal } from './modal';
import { getPersonas } from '../shared/storage';
import type { Persona, StreamMessage } from '../shared/types';

// Create shadow DOM container
const hostEl = document.createElement('div');
hostEl.id = 'unslop-root';
hostEl.style.cssText = 'all: initial; position: absolute; top: 0; left: 0; z-index: 2147483647; pointer-events: none;';
document.documentElement.appendChild(hostEl);

const shadow = hostEl.attachShadow({ mode: 'open' });
const mountEl = document.createElement('div');
shadow.appendChild(mountEl);

// State
let toolbarVisible = false;
let modalVisible = false;
let selectedText = '';
let toolbarPosition = { x: 0, y: 0 };
let personas: Persona[] = [];
let streamingText = '';
let streamingDone = false;
let streamingError = '';
let activePersona: Persona | null = null;
let selectionTimeout: ReturnType<typeof setTimeout> | null = null;
let activePort: chrome.runtime.Port | null = null;

function renderUI() {
  render(
    <>
      {toolbarVisible && !modalVisible && (
        <Toolbar
          personas={personas}
          position={toolbarPosition}
          onSelect={handlePersonaClick}
        />
      )}
      {modalVisible && (
        <Modal
          persona={activePersona}
          text={streamingText}
          done={streamingDone}
          error={streamingError}
          onClose={closeModal}
          onRetry={handleRetry}
        />
      )}
    </>,
    mountEl,
  );
}

function hideToolbar() {
  toolbarVisible = false;
  renderUI();
}

function closeModal() {
  modalVisible = false;
  streamingText = '';
  streamingDone = false;
  streamingError = '';
  activePersona = null;
  if (activePort) {
    try { activePort.disconnect(); } catch { /* ignore */ }
    activePort = null;
  }
  renderUI();
}

function startStreaming(persona: Persona, text: string) {
  streamingText = '';
  streamingDone = false;
  streamingError = '';
  toolbarVisible = false;
  modalVisible = true;
  activePersona = persona;
  renderUI();

  // Disconnect any existing port
  if (activePort) {
    try { activePort.disconnect(); } catch { /* ignore */ }
  }

  const port = chrome.runtime.connect({ name: 'unslop-stream' });
  activePort = port;

  port.onMessage.addListener((msg: StreamMessage) => {
    if (msg.type === 'STREAM_CHUNK') {
      streamingText += msg.text;
      renderUI();
    } else if (msg.type === 'STREAM_DONE') {
      streamingDone = true;
      renderUI();
    } else if (msg.type === 'STREAM_ERROR') {
      streamingError = msg.error;
      streamingDone = true;
      renderUI();
    }
  });

  port.onDisconnect.addListener(() => {
    if (!streamingDone && !streamingError) {
      // Port disconnected unexpectedly — could be service worker restart
      if (streamingText) {
        streamingDone = true;
      } else {
        streamingError = 'Connection lost. Please try again.';
        streamingDone = true;
      }
      renderUI();
    }
    activePort = null;
  });

  port.postMessage({
    type: 'UNSLOP',
    text,
    personaId: persona.id,
  });
}

function handlePersonaClick(persona: Persona) {
  if (!selectedText.trim()) return;
  startStreaming(persona, selectedText);
}

function handleRetry() {
  if (activePersona && selectedText) {
    startStreaming(activePersona, selectedText);
  }
}

// Check if an event originates from within our shadow DOM
function isInsideUnslop(e: Event): boolean {
  const path = e.composedPath();
  return path.includes(hostEl) || path.includes(mountEl);
}

// Selection detection
document.addEventListener('mouseup', (e) => {
  // Don't trigger if clicking inside our own UI
  if (isInsideUnslop(e)) return;
  // Don't trigger if modal is open
  if (modalVisible) return;

  if (selectionTimeout) clearTimeout(selectionTimeout);

  selectionTimeout = setTimeout(async () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || '';

    if (text.length < 10) {
      hideToolbar();
      return;
    }

    selectedText = text;

    // Load personas fresh each time
    try {
      personas = await getPersonas();
    } catch {
      personas = [];
    }

    if (personas.length === 0) {
      hideToolbar();
      return;
    }

    // Position toolbar near selection
    const range = selection?.getRangeAt(0);
    if (!range) {
      hideToolbar();
      return;
    }
    const rect = range.getBoundingClientRect();

    toolbarPosition = {
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.top + window.scrollY - 8,
    };

    toolbarVisible = true;
    renderUI();
  }, 300);
});

// Dismiss toolbar on click away
document.addEventListener('mousedown', (e) => {
  if (!toolbarVisible) return;
  if (isInsideUnslop(e)) return;
  hideToolbar();
});

// Dismiss on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modalVisible) {
      closeModal();
    } else if (toolbarVisible) {
      hideToolbar();
    }
  }
});

// Dismiss toolbar on scroll
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
window.addEventListener('scroll', () => {
  if (toolbarVisible && !modalVisible) {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      hideToolbar();
    }, 100);
  }
}, { passive: true });
