<script setup lang="ts">
import { onMounted } from "vue";
import { AUTH_TOKEN, BOT_USERNAME, CHANNEL_NAME } from "../config";
import tmi from "tmi.js";

onMounted(() => {
  console.log("no sé");
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

  function onMessageHandler(target: any, _context: any, msg: string, self: any) {
    console.log("llega")
    if (self) {
      return;
    } // Ignore messages from the bot
  
    // Remove whitespace from chat message
    const commandName = msg.trim();
  
    // If the command is known, let's execute it
    if (commandName === "!tic") {
      client.say(target, "tac tou en tu cara");
      console.log(`* Executed ${commandName} command`);
    } else {
      console.log(`* Unknown command ${commandName}`);
    }
  }

  function onConnectedHandler(addr: any, port: any) {
    console.log(`* Connected to ${addr}:${port}`);
  }
});

</script>

<template>
  <div>
    CHATBOT
  </div>
</template>