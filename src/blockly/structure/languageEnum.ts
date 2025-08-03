import * as Blockly from 'blockly';
export default () => {
Blockly.common.defineBlocks({language_enum: {
    init: function() {
        this.appendDummyInput('_')
        .appendField('Language Option')
        .appendField(new Blockly.FieldDropdown([
            ['English', 'EN'],
            ['Chinese', 'CN'],
            ['Russian', 'RU'],
            ['German', 'DE'],
            ['Spanish', 'ES'],
            ['Ukrainian', 'UA'],
            ['French', 'FR']
            ]), 'language');
        this.setOutput(true, ['room_language', 'String']);
        this.setTooltip('');
        this.setHelpUrl('');
        this.setColour(270);
    }}});
}