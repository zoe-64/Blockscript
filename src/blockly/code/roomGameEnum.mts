import { javascriptGenerator, Order } from "blockly/javascript";
import * as Blockly from "blockly";
export default () => {
    javascriptGenerator.forBlock['room_game_enum'] = function(block: Blockly.Block) {
        const dropdown_room_game = block.getFieldValue('room_game');
        const code = `
        '${dropdown_room_game}'
        `;
        return [code, Order.NONE];
    }
}