import { javascriptGenerator, Order } from "blockly/javascript";
import * as Blockly from "blockly";
export default () => {
    javascriptGenerator.forBlock['start_bot'] = function(block: Blockly.Block) {
    const value_username = javascriptGenerator.valueToCode(block, 'username', Order.ATOMIC);
    const value_password = javascriptGenerator.valueToCode(block, 'password', Order.ATOMIC);
    const dropdown_environment = block.getFieldValue('environment');
    
    const backendServers = {
        live: "https://bondage-club-server.herokuapp.com/",
        test: "https://bondage-club-server-test.herokuapp.com/",
    }
    const code = `
    API_Connector(${backendServers[dropdown_environment]},${value_username},${value_password},'${dropdown_environment}');
    `;
    return [code, Order.NONE];
    }
}