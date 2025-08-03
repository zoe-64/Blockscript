
import * as Blockly from 'blockly';
export default () => {
    Blockly.common.defineBlocks({space_enum:{
    init: function() {
        this.appendDummyInput('_')
        .appendField('Space Option')
        .appendField(new Blockly.FieldDropdown([
            ['Male-only', 'M'],
            ['Mixed', 'X'],
            ['Female-only', ''],
            ['Asylum', 'Asylum']
            ]), 'space');
        this.setOutput(true, ['room_space', 'String']);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(270);
    }
    }});
}