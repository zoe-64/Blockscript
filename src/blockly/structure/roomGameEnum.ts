
import * as Blockly from 'blockly';
export default () => {
Blockly.common.defineBlocks({room_game_enum: {
  init: function() {
    this.appendDummyInput('_')
      .appendField('Room Game Option')
      .appendField(new Blockly.FieldDropdown([
          ['No Game', ''],
          ['Club Cards', 'ClubCard'],
          ['LARP', 'LARP'],
          ['Magic Battle', 'MagicBattle'],
          ['GGTS', 'GGTS'],
          ['Prison', 'Prison']
        ]), 'room_game');
    this.setOutput(true, ['room_game', 'String']);
    this.setTooltip('');
    this.setHelpUrl('');
    this.setColour(270);
  }
}})}

                    