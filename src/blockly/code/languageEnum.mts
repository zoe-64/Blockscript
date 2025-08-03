import { javascriptGenerator, Order } from "blockly/javascript";
import * as Blockly from "blockly";
export default () => {
    javascriptGenerator.forBlock['language_enum'] = function(block: Blockly.Block) {
        const dropdown_language = block.getFieldValue('language');
        const code = `
        '${dropdown_language}'
        `;
        return [code, Order.NONE];
    }
}