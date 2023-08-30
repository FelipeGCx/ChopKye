<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { CHANNEL_NAME, TIME_DISPLAY_MESSAGE } from "@/config";
import tmi from "tmi.js";
import { Message } from "@/types";
import { keysToCamel } from "@/utils/keysMapping";
import { ProductionProvider } from "@/services/requestAdapter/productionProvider";
import { RequestService } from "@/services/requestAdapter/requestService";
import MessageCard from "@/components/messageCard.vue";
const messages = ref<Message[]>([]);
const usersExcludes = ["streamelements", "nightbot"];
const listMessages = ref<HTMLUListElement>();

onMounted(() => {
  const client = new tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();

  client.on(
    "message",
    async (_channel: any, tags: any, message: string, _self: any) => {
      if (!usersExcludes.includes(tags.username) && !message.startsWith("!")) {
        const url = `users?login=${tags.username}`;
        const user = await getUser(url);
        let newMessage: Message = {
          tags: keysToCamel(tags),
          message: message,
          user:user
        };
        messages.value = [...messages.value, newMessage];
        // setTimeout(() => {
        //   if (listMessages.value) {
        //     listMessages.value.scrollTo({
        //       top: listMessages.value.offsetHeight,
        //       behavior: "smooth",
        //     });
        //   }
        // }, 1000);
      }
    }
  );
});

const getUser = async (url: string) => {
  const requestProvider = new ProductionProvider();
  const requestService = new RequestService(requestProvider);
  const requestResponse = await requestService.getRequest(url);
  return keysToCamel(requestResponse.data[0]);
};

const intervalId = setInterval(() => {
  if (messages.value.length > 0) {
    messages.value.shift()
  }
}, TIME_DISPLAY_MESSAGE);

onUnmounted(() => {
  clearInterval(intervalId)
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
