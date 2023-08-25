<script setup lang="ts">
import { ProductionProvider } from "@/services/requestAdapter/productionProvider";
import { RequestService } from "@/services/requestAdapter/requestService";
import { Message, User } from "@/types";
import { keysToCamel } from "@/utils/keysMapping";
import { onMounted, ref } from "vue";

interface Props {
  message: Message;
}

const props = defineProps<Props>();
const user = ref<User>();

const getUser = async (url: string) => {
  const requestProvider = new ProductionProvider();
  const requestService = new RequestService(requestProvider);
  const requestResponse = await requestService.getRequest(url);
  if (requestResponse.data) {
    user.value = keysToCamel(requestResponse.data[0]);
  }
};

onMounted(() => {
  const url = `users?login=${props.message.tags.username}`;
  getUser(url);
});
</script>

<template>
  <div v-if="user">
    <img :src="user.profileImageUrl" width="300" height="300" />
    <h1>{{ props.message.tags.displayName }}</h1>
    <p>{{ props.message.message }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
