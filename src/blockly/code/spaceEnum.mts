import { javascriptGenerator, Order } from "blockly/javascript";
import * as Blockly from "blockly";
export default () => {
    javascriptGenerator.forBlock['space_enum'] = function(block: Blockly.Block) {
        const dropdown_space = block.getFieldValue('space');
        const code = `
        '${dropdown_space}'
        `;
        return [code, Order.NONE];
    }
}