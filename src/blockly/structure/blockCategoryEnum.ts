
import * as Blockly from 'blockly';
export default () => {
    Blockly.common.defineBlocks({block_category_enum: {
    init: function() {
        this.appendDummyInput('_')
        .appendField('Block Category Option')
        .appendField(new Blockly.FieldDropdown([
            ['Medical', 'Medical'],
            ['Extreme', 'Extreme'],
            ['Pony', 'Pony'],
            ['SciFi', 'SciFi'],
            ['ABDL', 'ABDL'],
            ['Fantasy', 'Fantasy'],
            ['Leashing', 'Leashing'],
            ['Photos', 'Photos'],
            ['Arousal', 'Arousal']
            ]), 'block_category');
        this.setOutput(true, ['block_category', 'String']);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(270);
    }
}})}
                    