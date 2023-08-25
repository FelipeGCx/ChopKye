<script setup lang="ts">
import { Message } from "@/types";

interface Props {
  message: Message;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <h1>{{ props.message.tags.displayName }}</h1>
    <p>{{ props.message.message }}</p>
  </div>
</template>

<style scoped lang="scss"></style>
