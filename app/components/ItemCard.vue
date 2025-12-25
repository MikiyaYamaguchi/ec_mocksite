<script lang="ts" setup>
import type { Item } from "../interfaces";
const props = defineProps<Item>();
const config = useRuntimeConfig();
</script>

<template>
  <li class="item-wrap">
    <figure>
      <img
        :src="`${config.public.ecMockApiUrl}/uploads/items/${props.img1}`"
        :alt="props?.name"
      />
    </figure>
    <p class="name">{{ props.name }}</p>
    <p class="price">{{ props.price }}円</p>
    <p class="category">{{ props.category }}</p>
    <ul class="tags">
      <li v-for="tag in props.tag" :key="tag">{{ tag }}</li>
    </ul>
  </li>
</template>