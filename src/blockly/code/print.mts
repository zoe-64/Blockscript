import { javascriptGenerator, Order } from "blockly/javascript";
import * as Blockly from "blockly";
export default () => {
    javascriptGenerator.forBlock['text_print'] = function(block: Blockly.Block) {
        var text = javascriptGenerator.valueToCode(block, 'TEXT', Order.NONE);
        return 'console.log(' + text + ');\n';
    };
}