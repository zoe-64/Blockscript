import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';

export default function loadBlocks() {
    
    javascriptGenerator.forBlock['text_print'] = function(block: Blockly.Block) {
        var text = javascriptGenerator.valueToCode(block, 'TEXT', Order.NONE);
        return 'console.log(' + text + ');\n';
    };
}
