import { javascriptGenerator, Order } from "blockly/javascript";
import * as Blockly from "blockly";
export default () => {
    javascriptGenerator.forBlock['block_category_enum'] = function(block: Blockly.Block) {
        const dropdown_block_category = block.getFieldValue('block_category');
        const code = `
        '${dropdown_block_category}'
        `;
        return [code, Order.NONE];
    }
}