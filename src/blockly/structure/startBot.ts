import * as Blockly from 'blockly';
export default () => {
    Blockly.common.defineBlocks({start_bot: {
    init: function() {
        this.appendDummyInput('_')
        .appendField('Start Bot');
        this.appendValueInput('username')
        .setAlign(Blockly.inputs.Align.RIGHT)
        .setCheck('String')
        .appendField('Username');
        this.appendValueInput('password')
        .setAlign(Blockly.inputs.Align.RIGHT)
        .setCheck('String')
        .appendField('Password');
        this.appendDummyInput('_2')
        .appendField('Environment')
        .appendField(new Blockly.FieldDropdown([
            ['Production', 'live'],
            ['Development', 'test']
            ]), 'environment');
        this.setInputsInline(false)
        this.setOutput(true, ['api_connector', 'object']);
        this.setTooltip('Creates a api connection');
        this.setHelpUrl('');
        this.setColour(0);
    }
    }});
}

