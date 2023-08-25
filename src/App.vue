<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CHANNEL_NAME } from "@/config";
import tmi from "tmi.js";
import { Message } from "@/types";
import { keysToCamel } from "./utils/keysMapping";
import MessageCard from "./components/messageCard.vue";
const messages = ref<Message[]>([]);

onMounted(() => {
  const client = new tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();

  client.on("message", (_channel: any, tags: any, message: any, _self: any) => {
    let newMessage: Message = {
      tags: keysToCamel(tags),
      message: message,
    };
    messages.value = [...messages.value, newMessage];
  });
});
</script>

<template>
  <div v-if="messages.length > 0">
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        <MessageCard :message="message"/>
      </li>
    </ul>
  </div>
  a
</template>

<style scoped lang="scss"></style>
