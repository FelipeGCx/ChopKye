<template>
  <ul>
    <li v-for="(badge, index) in Object.keys(props.badges)" :key="index">
      <StaffIcon v-if="badge == STAFF" />
      <BroadcasterIcon v-if="badge == BROADCASTER" />
      <VerifiedIcon v-if="badge == PARTNER" />
      <ModeratorIcon v-if="badge == MODERATOR" />
      <VipIcon v-if="badge == VIP" />
      <TurboIcon v-if="badge == TURBO" />
      <PrimeIcon v-if="badge == SUBSCRIBER" />
      <ArtistIcon v-if="badge == ARTIST" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import {
  ModeratorIcon,
  BroadcasterIcon,
  VerifiedIcon,
  ArtistIcon,
  PrimeIcon,
  StaffIcon,
  TurboIcon,
  VipIcon,
} from "@/assets/icons";
import {
  STAFF,
  BROADCASTER,
  PARTNER,
  MODERATOR,
  VIP,
  TURBO,
  SUBSCRIBER,
  ARTIST,
} from "@/constants";
import { Badges } from "@/types";

interface Props {
  badges: Badges;
}

const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
ul {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  li {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    svg {
      width: 2rem;
      aspect-ratio: 1/1;
      color: var(--sc);
    }
  }
}
</style>
