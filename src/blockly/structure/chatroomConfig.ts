import * as Blockly from "blockly";
export default () => {
  Blockly.common.defineBlocks({
    room_config: {
      init: function () {
        this.appendDummyInput("_").appendField("Create Room Config");
        this.appendValueInput("name")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("String")
          .appendField("Name");
        this.appendValueInput("description")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("String")
          .appendField("Description");
        this.appendValueInput("background")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("String")
          .appendField("Background");
        this.appendValueInput("private")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("Boolean")
          .appendField("Private");
        this.appendValueInput("locked")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("Boolean")
          .appendField("Locked");
        this.appendValueInput("access")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("Array")
          .appendField("Access");
        this.appendValueInput("visibility")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("Array")
          .appendField("Visibility");
        this.appendValueInput("space")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("room_space")
          .appendField("Space");
        this.appendValueInput("admin")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("Array")
          .appendField("Admin");
        this.appendValueInput("ban")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("Array")
          .appendField("Ban");
        this.appendValueInput("limit")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("Number")
          .appendField("Limit");
        this.appendValueInput("block_category")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("Array")
          .appendField("Block Category");
        this.appendValueInput("game")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("room_game")
          .appendField("Game");
        this.appendValueInput("language")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("room_language")
          .appendField("Language");
        this.appendValueInput("map_data")
          .setAlign(Blockly.inputs.Align.RIGHT)
          .setCheck("map_data")
          .appendField("Map Data");
        this.setInputsInline(false);
        this.setOutput(true, ["room_config", "object"]);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setColour(0);
      },
    },
    // 
  
  })
};

