<script setup lang="ts">
import { ProductionProvider } from "@/services/requestAdapter/productionProvider";
import { RequestService } from "@/services/requestAdapter/requestService";
import BadgesList from "@/components/badgesList.vue";
import { Message, User } from "@/types";
import { keysToCamel } from "@/utils/keysMapping";
import { onMounted, ref } from "vue";

interface Props {
  message: Message;
}

const props = defineProps<Props>();
const user = ref<User>();
const messageBox = ref<HTMLElement | null>(null);
const heightBox = ref<number | null>(null);
const widthBox = ref<number | null>(null);
const path = props.message.tags.id;

const getUser = async (url: string) => {
  const requestProvider = new ProductionProvider();
  const requestService = new RequestService(requestProvider);
  const requestResponse = await requestService.getRequest(url);
  if (requestResponse.data) {
    user.value = keysToCamel(requestResponse.data[0]);
  }
};

onMounted(async () => {
  const url = `users?login=${props.message.tags.username}`;
  await getUser(url);
  if (messageBox.value) {
    heightBox.value = messageBox.value.clientHeight;
    widthBox.value = messageBox.value.clientWidth;
  }
});
</script>

<template>
  <div v-if="user" class="card">
    <picture>
      <svg viewBox="0 0 100 100">
        <path
          id="imagePath"
          d="M 0 0 H 65 L 100 35 V 100 H 35 L 0 65 Z"
          fill="none"
        />
        <defs>
          <clipPath id="clipPathId">
            <use xlink:href="#imagePath" />
          </clipPath>
        </defs>
        <use
          xlink:href="#imagePath"
          stroke="currentColor"
          fill="none"
          clip-path="url(#clipPathId)"
        />
      </svg>
      <img :src="user.profileImageUrl" width="300" height="300" />
    </picture>
    <h2 class="name">{{ props.message.tags.displayName }}</h2>
    <div class="badges">
      <BadgesList :badges="props.message.tags.badges" />
    </div>
    <div class="bar">
      <div class="line"></div>
    </div>
    <div class="message" ref="messageBox">
      <p class="content">{{ props.message.message }}</p>
      <svg
        :viewBox="`0 0 ${widthBox} ${heightBox}`"
        v-if="widthBox && heightBox"
      >
        <path
          :id="path"
          :d="`M 0 0 H ${
            widthBox - 12.32
          } L ${widthBox} 12.32 V ${heightBox} H 12.32 L 0 ${
            heightBox - 12.32
          } Z`"
        />
        <defs>
          <clipPath :id="`clipPathId${path}`">
            <use :xlink:href="`#${path}`" />
          </clipPath>
        </defs>
        <use
          :xlink:href="`#${path}`"
          stroke="currentColor"
          fill="none"
          :clip-path="`url(#clipPathId${path})`"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  width: 100%;
  gap: 0.6rem;
  picture {
    width: 3rem;
    aspect-ratio: 1/1;
    position: relative;
    display: block;
    grid-area: 1/1;
    svg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
      stroke-width: 1.5rem;
      color:var(--sc);
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      clip-path: polygon(0% 0%, 65% 0%, 100% 35%, 100% 100%, 35% 100%, 0% 65%);
    }
  }
  .name {
    grid-area: 1/2;
    font-size: 1.8rem;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    line-height: 1.1;
  }
  .badges {
    grid-area: 1/3/1/4;
    display: inline;
  }
  .bar {
    width: 100%;
    grid-area: 2/1/3/2;
    display: inline;
    position: relative;
    .line {
      position: absolute;
      width: calc(100% + 1rem);
      background-color: var(--sc);
      height: calc(100% + 0.8rem);
      bottom: 0;
      left: 0;
      clip-path: polygon(
        0% 0%,
        0.8rem 0.8rem,
        calc(100% - 1rem) 0.8rem,
        calc(100% - 1rem) calc(100% - 0.9rem),
        100% 100%,
        0 100%
      );
      z-index: 1;
    }
  }
  .message {
    display: inline;
    grid-area: 2/2/2/4;
    position: relative;
    padding: 0.8rem 1.2rem;
    .content {
      font-size: 1.4rem;
      font-weight: 500;
      position: relative;
      z-index: 2;
    }

    svg {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      stroke-width: 0.4rem;
      top: 0;
      left: 0;
      color: var(--sc);
      fill: var(--pc);
    }
    &::after {
      content: "";
      background-color: var(--sc);
      border-radius: 0.4rem;
      position: absolute;
      right: 0;
      top: 0;
      width: 0.5rem;
      aspect-ratio: 1/1;
      z-index: 1;
    }
  }
}
</style>
