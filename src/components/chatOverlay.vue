<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { CHANNEL_NAME, USERS_EXCLUDES } from "@/config";
import tmi from "tmi.js";
import { Message } from "@/types";
import { keysToCamel } from "@/utils/keysMapping";
import { ProductionProvider } from "@/services/requestAdapter/productionProvider";
import { RequestService } from "@/services/requestAdapter/requestService";
import MessageCard from "@/components/messageCard.vue";
const messages = ref<Message[]>([]);
const listMessages = ref<HTMLUListElement>();
const currentTime = ref();

onMounted(() => {
  const client = new tmi.Client({
    channels: [CHANNEL_NAME],
  });

  client.connect();

  client.on(
    "message",
    async (_channel: any, tags: any, message: string, _self: any) => {
      if (!USERS_EXCLUDES.includes(tags.username) && !message.startsWith("!")) {
        const url = `users?login=${tags.username}`;
        const user = await getUser(url);
        let newMessage: Message = {
          tags: keysToCamel(tags),
          message: message,
          user: user,
          time: Date.now(),
        };
        if (messages.value.length > 3) {
          hideMessage();
        }
        messages.value = [...messages.value, newMessage];
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

const currentTimeInterval = setInterval(() => {
  currentTime.value = Date.now();
});

const hideMessage = () => {
  if (messages.value.length > 0) {
    messages.value.shift();
  }
};

onUnmounted(() => {
  clearInterval(currentTimeInterval);
});
</script>

<template>
  <div v-if="messages.length > 0">
    <ul ref="listMessages">
      <li v-for="(message, index) in messages" :key="index">
        <MessageCard
          :message="message"
          :currentTime="currentTime"
          @hideMessage="hideMessage"
        />
      </li>
    </ul>
  </div>
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
