<script setup lang="ts">
import { onMounted } from "vue";
import { AUTH_TOKEN, BOT_USERNAME, CHANNEL_NAME } from "../config";
import tmi from "tmi.js";
import { CommandsService } from "@/services/commands";
import { DONT_TAG } from "@/constants";

onMounted(() => {
  const cmds = new CommandsService();
  const opts = {
    identity: {
      username: BOT_USERNAME,
      password: `oauth:${AUTH_TOKEN}`,
    },
    channels: [CHANNEL_NAME],
  };
  const client = new tmi.client(opts);

  client.on("message", onMessageHandler);
  client.on("connected", onConnectedHandler);
  client.connect();

  function onMessageHandler(target: any, context: any, msg: string, self: any) {
    if (self) {
      return;
    }
    const commandName = msg.trim();
    const responseMsg = cmds.getResponse(commandName);
    if (responseMsg) {
      const cmdKey = cmds.getCommandKey(commandName);
      if (cmdKey) {
        if (!DONT_TAG.includes(cmdKey)) {
          client.say(target, `@${context.username} ${responseMsg}`);
        } else {
          client.say(target, responseMsg);
        }
      }
    }
  }

  function onConnectedHandler(addr: any, port: any) {
    console.log(`* Connected to ${addr}:${port}`);
  }
});
</script>
<template></template>
