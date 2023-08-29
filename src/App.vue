<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CHANNEL_NAME } from "@/config";
import tmi from "tmi.js";
import { Message } from "@/types";
import { keysToCamel } from "@/utils/keysMapping";
import MessageCard from "@/components/messageCard.vue";
const messages = ref<Message[]>([]);
const usersExcludes = ["chopkye", "streamelements", "nightbot"];
const listMessages = ref<HTMLUListElement>();

onMounted(() => {
  const client = new tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();

  client.on(
    "message",
    (_channel: any, tags: any, message: string, _self: any) => {
      if (!usersExcludes.includes(tags.username) && !message.startsWith("!")) {
        let newMessage: Message = {
          tags: keysToCamel(tags),
          message: message,
        };
        messages.value = [...messages.value, newMessage];
        setTimeout(() => {
          if (listMessages.value) {
            listMessages.value.scrollTo({
              top: listMessages.value.offsetHeight,
              behavior: "smooth",
            });
          }
        }, 1000);
      }
    }
  );
});
</script>

<template>
  <div v-if="messages.length > 0">
    <ul ref="listMessages">
      <li v-for="(message, index) in messages" :key="index">
        <MessageCard :message="message" />
      </li>
    </ul>
  </div>
  <RouterView />
</template>

<style scoped lang="scss">
ul {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
}
</style>
