import CommandResponses from "./responses.json";
import Commands from "./commands.json";
import { commandResponse, command } from "@/types";
export class CommandsService {
  responses: commandResponse = CommandResponses;
  commands: command[] = Commands;

  getResponse(command: string): string | null {
    const commandKey = this.getCommandKey(command);
    let response = null;
    if (commandKey) {
      if (Object.keys(this.responses).includes(commandKey)) {
        response = this.responses[commandKey].response;
      }
    }
    return response;
  }

  getCommandKey(command: string): string | null {
    let key = null;
    for (const k in this.commands) {
      const keyElement = this.commands[k];
      if (keyElement.keywords.includes(command.toLocaleLowerCase())) {
        key = keyElement.key;
        console.log(key);
        break;
      }
    }
    return key;
  }
}
