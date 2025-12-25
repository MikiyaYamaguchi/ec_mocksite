<script lang="ts" setup>
import type { Item } from "../interfaces";
defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul class="item-list">
    <ItemCard
      v-for="item in items"
      :key="item.name"
      v-bind:_id="item._id"
      v-bind:name="item.name"
      v-bind:price="item.price"
      v-bind:img1="item.img1"
      v-bind:stock="item.stock"
      v-bind:category="item.category"
      v-bind:tag="item.tag"
    />
  </ul>
</template>