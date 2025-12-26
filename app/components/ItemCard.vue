<script lang="ts" setup>
import type { Item } from "../interfaces";
const props = defineProps<Item>();
const config = useRuntimeConfig();

console.log(props);

//バリエーションがある場合の最大金額と最小金額を取得
const prices = computed<number[] | null>(() => {
  const variations = props.variations_prices;
  if (!variations || variations.length === 0) return null;
  return variations.map((v) => v.price);
});

const minPrice = computed<number | null>(() => {
  if (!prices.value) return null;
  return Math.min(...prices.value);
});

const maxPrice = computed<number | null>(() => {
  if (!prices.value) return null;
  return Math.max(...prices.value);
});
</script>

<template>
  <li class="item-wrap">
    <NuxtLink v-bind:to="{ name: 'admin-item-id', params: { id: props._id } }">
      <figure>
        <img
          :src="`${config.public.ecMockApiUrl}/uploads/items/${props.img1}`"
          :alt="props?.name"
        />
      </figure>
      <p class="name">{{ props.name }}</p>
      <p class="price">
        <span
          v-if="!!prices && !!minPrice && !!maxPrice && minPrice != maxPrice"
        >
          {{ minPrice.toLocaleString() }}円〜{{ maxPrice?.toLocaleString() }}円
        </span>
        <span v-else>{{ props.price.toLocaleString() }}円</span>
      </p>
      <p class="category">{{ props.category }}</p>
      <ul class="tags">
        <li v-for="tag in props.tag" :key="tag">{{ tag }}</li>
      </ul>
    </NuxtLink>
  </li>
</template>