<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin-loggedin-check"],
});
const config = useRuntimeConfig();
const { items, pending } = getItemAll();
</script>

<template>
  <h1>全商品一覧</h1>
  <p v-if="pending">商品読み込み中・・・</p>
  <ul class="item-list" v-else>
    <li class="item-wrap" v-for="item in items.data" :key="item.name">
      <figure>
        <img
          :src="`${config.public.ecMockApiUrl}/uploads/items/${item.img1}`"
          :alt="item.name"
        />
      </figure>
      <p class="name">{{ item.name }}</p>
      <p class="price">{{ item.price }}円</p>
      <p class="category">{{ item.category }}</p>
      <ul class="tags">
        <li v-for="tag in item.tag" :key="tag">{{ tag }}</li>
      </ul>
    </li>
  </ul>
</template>