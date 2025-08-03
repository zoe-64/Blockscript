import * as Blockly from 'blockly';

import toolbox from './toolbox';
import {shadowBlockConversionChangeListener} from '@blockly/shadow-block-converter';
import {loadBlocks} from './loadBlocks.js';

let eventSource = new EventSource('http://localhost:3000/api/console-stream');

const output = document.getElementById('output')!;
const saveWorkspaceButton = document.getElementById('saveWorkspace')!;
const loadWorkspaceButton = document.getElementById('loadWorkspace')!;

function parseCodeLog(log: string, level: "warn" | "error" | "log") {
  const lines = log.split('\\n');
  return lines.map(line => {
    const p = document.createElement('p');
    p.className = level;
    p.textContent = line;
    return p;
  });
}

eventSource.addEventListener('connected', (e) => {
  console.log('SSE connected:', e.data);
});
eventSource.addEventListener('log', (e: any) => {
  const lines = parseCodeLog(e.data, 'log');
  lines.map(line => output.appendChild(line));
});
eventSource.addEventListener('warn', (e: any) => {
  const lines = parseCodeLog(e.data, 'warn');
  lines.map(line => output.appendChild(line));
});
eventSource.addEventListener('error', (e: any) => {
  const lines = parseCodeLog(e.data, 'error');
  lines.map(line => output.appendChild(line));
});
eventSource.onerror = (e) => {
  console.error('SSE error:', e);

  setTimeout(() => {
    eventSource.close();
    eventSource = new EventSource('http://localhost:3000/api/console-stream');
  }, 1000);
};


async function runWorkspace(workspace: string) {
  await fetch('/api/run-workspace', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workspaceJSON: workspace }),
  });
}

function runWorkspaceButton() {
  const button = document.createElement('button');
  button.textContent = 'Run Code';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '1000';
  document.body.appendChild(button);

  button.addEventListener('click', async () => {
    output.innerHTML = '';
    const workspace = Blockly.getMainWorkspace();
    const workspaceJson = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
    runWorkspace(workspaceJson);
  });
}

function saveWorkspace() {
  const workspace = Blockly.getMainWorkspace();
  const json = Blockly.serialization.workspaces.save(workspace);
  localStorage.setItem('savedWorkspace', JSON.stringify(json));
}
function loadWorkspace() {
  const jsonText = localStorage.getItem('savedWorkspace');
  if (jsonText) {
    const json = JSON.parse(jsonText);
    Blockly.serialization.workspaces.load(json, Blockly.getMainWorkspace());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
  });
  workspace.addChangeListener(shadowBlockConversionChangeListener);
  runWorkspaceButton();
  loadBlocks();
  saveWorkspaceButton.addEventListener('click', saveWorkspace);
  loadWorkspaceButton.addEventListener('click', loadWorkspace);
});

