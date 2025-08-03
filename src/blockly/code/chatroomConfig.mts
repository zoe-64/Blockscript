import { API_Chatroom } from "bc-bot";
import * as Blockly from "blockly";
import { javascriptGenerator, Order } from "blockly/javascript";
export default () => {

javascriptGenerator.forBlock['room_config'] = function(block: Blockly.Block) {
  const value_name = javascriptGenerator.valueToCode(block, 'name', Order.ATOMIC);
  const value_description = javascriptGenerator.valueToCode(block, 'description', Order.ATOMIC);
  const value_background = javascriptGenerator.valueToCode(block, 'background', Order.ATOMIC);
  const value_private = javascriptGenerator.valueToCode(block, 'private', Order.ATOMIC);
  const value_locked = javascriptGenerator.valueToCode(block, 'locked', Order.ATOMIC);
  const value_access = javascriptGenerator.valueToCode(block, 'access', Order.ATOMIC);
  const value_visibility = javascriptGenerator.valueToCode(block, 'visibility', Order.ATOMIC);
  const value_space = javascriptGenerator.valueToCode(block, 'space', Order.ATOMIC);
  const value_admin = javascriptGenerator.valueToCode(block, 'admin', Order.ATOMIC);
  const value_ban = javascriptGenerator.valueToCode(block, 'ban', Order.ATOMIC);
  const value_limit = javascriptGenerator.valueToCode(block, 'limit', Order.ATOMIC);
  const value_block_category = javascriptGenerator.valueToCode(block, 'block_category', Order.ATOMIC);
  const value_game = javascriptGenerator.valueToCode(block, 'game', Order.ATOMIC);
  const value_language = javascriptGenerator.valueToCode(block, 'language', Order.ATOMIC);
  const value_map_data = javascriptGenerator.valueToCode(block, 'map_data', Order.ATOMIC);

  const code = `
    ({
        Name: ${value_name},
        Description: ${value_description},
        Background: ${value_background},
        Private: ${value_private},
        Locked: ${value_locked},                                
        Access: ${value_access === '' ? '[]' : value_access},
        Visibility: ${value_visibility === '' ? '[]' : value_visibility},
        Space: ${value_space},
        Admin: ${value_admin === '' ? '[]' : value_admin},
        Ban: ${value_ban === '' ? '[]' : value_ban},
        Limit: ${value_limit},
        BlockCategory: ${value_block_category === '' ? '[]' : value_block_category},
        Game: ${value_game},
        Language: ${value_language},
        MapData: ${value_map_data === '' ? 'null' : value_map_data}
    })`
  return [code, Order.NONE];
}

}