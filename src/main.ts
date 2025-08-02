import * as Blockly from 'blockly';

import toolbox from './toolbox';
import { javascriptGenerator } from 'blockly/javascript';
import loadBlocks from './loadBlocks.js';

let eventSource = new EventSource('http://localhost:3000/api/console-stream');
const output = document.getElementById('output')!;
const saveWorkspaceButton = document.getElementById('saveWorkspace')!;
const loadWorkspaceButton = document.getElementById('loadWorkspace')!;

eventSource.addEventListener('connected', (e) => {
  console.log('SSE connected:', e.data);
});

eventSource.addEventListener('log', (e: any) => {
  output.innerHTML += `<p class="log">${e.data}</p>`;
});
eventSource.addEventListener('warn', (e: any) => {
  output.innerHTML += `<p class="warn">${e.data}</p>`;
});

eventSource.addEventListener('error', (e: any) => {
  output.innerHTML += `<p class="error">${e.data}</p>`;
});


async function runCode(code: string) {
  await fetch('/api/run-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
}
eventSource.onerror = (e) => {
  console.error('SSE error:', e);
  // Reconnect logic (exponential backoff recommended)
  setTimeout(() => {
    eventSource.close();
    eventSource = new EventSource('http://localhost:3000/api/console-stream');
  }, 1000);
};

function setupExportButton(workspace: Blockly.WorkspaceSvg) {
  const button = document.createElement('button');
  button.textContent = 'Run Code';
  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '1000';
  document.body.appendChild(button);

  button.addEventListener('click', async () => {
    const code = javascriptGenerator.workspaceToCode(workspace);
    output.innerText = '';
    runCode(code); 
  });
}

function saveWorkspace() {
  const workspace = Blockly.getMainWorkspace();
  const json = Blockly.serialization.workspaces.save(workspace);
  localStorage.setItem('savedWorkspace', JSON.stringify(json));
  console.log('Workspace saved:', json);
}
function loadWorkspace() {
  const jsonText = localStorage.getItem('savedWorkspace');
  if (jsonText) {
    const json = JSON.parse(jsonText);
    Blockly.serialization.workspaces.load(json, Blockly.getMainWorkspace());
    console.log('Workspace loaded!');
  } else {
    console.warn('No saved workspace found.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
  });
  setupExportButton(workspace);
  loadBlocks();
  saveWorkspaceButton.addEventListener('click', saveWorkspace);
  loadWorkspaceButton.addEventListener('click', loadWorkspace);
});

