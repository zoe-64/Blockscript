import startBot from '../blockly/structure/startBot';
import chatroomConfig from '../blockly/structure/chatroomConfig';
import spaceEnum from '../blockly/structure/spaceEnum';
import roomGameEnum from '../blockly/structure/roomGameEnum';
import languageEnum from '../blockly/structure/languageEnum';
import blockCategoryEnum from '../blockly/structure/blockCategoryEnum';
export function loadBlocks() {
    startBot();
    chatroomConfig();
    spaceEnum();
    roomGameEnum();
    languageEnum();
    blockCategoryEnum();
}


