import * as Blockly from 'blockly';
import toolbox from './toolbox';
document.addEventListener('DOMContentLoaded', () => {
  const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
  });
});