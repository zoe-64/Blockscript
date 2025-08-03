import startBotCode from "../blockly/code/startBot.mjs";
import startBotStructure from "../blockly/structure/startBot.js";
import printCode from "../blockly/code/print.mjs";
import chatroomConfigStructure from "../blockly/structure/chatroomConfig.js";
import chatroomConfigCode from "../blockly/code/chatroomConfig.mjs";
import spaceEnumStructure from "../blockly/structure/spaceEnum.js";
import spaceEnumCode from "../blockly/code/spaceEnum.mjs";
import roomGameEnumStructure from "../blockly/structure/roomGameEnum.js";
import roomGameEnumCode from "../blockly/code/roomGameEnum.mjs";
import languageEnumStructure from "../blockly/structure/languageEnum.js";
import languageEnumCode from "../blockly/code/languageEnum.mjs";
import blockCategoryEnumStructure from "../blockly/structure/blockCategoryEnum.js";
import blockCategoryEnumCode from "../blockly/code/blockCategoryEnum.mjs";
export function loadBlocks() {
    startBotStructure();
    startBotCode();
    chatroomConfigStructure();
    chatroomConfigCode();
    printCode();
    spaceEnumStructure();
    spaceEnumCode();
    roomGameEnumStructure();
    roomGameEnumCode();
    languageEnumStructure();
    languageEnumCode();
    blockCategoryEnumStructure();
    blockCategoryEnumCode();
}