<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin-loggedin-check"],
});
const { items, pending } = getItemAll();
</script>

<template>
  <h1>全商品一覧</h1>
  <p v-if="pending">商品読み込み中・・・</p>
  <itemList v-bind:items="items.data" />
</template>