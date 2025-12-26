<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin-loggedin-check"],
});

const config = useRuntimeConfig();
const route = useRoute();
const { item, pending } = getSingleItem(route.params.id);

//swiper関連
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const modules = [Autoplay, Navigation, Pagination];

//バリエーションがある場合の最大金額と最小金額を取得
const prices = computed<number[] | null>(() => {
  const variations = item.value?.data?.variations_prices;
  if (!variations || variations.length == 0) return null;
  return variations.map((v: { value: string; price: number }) => v.price);
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
  <p v-if="pending">読み込み中・・・</p>
  <template v-else>
    <h1>{{ item.data.name }}</h1>
    <p class="price">
      <span v-if="!!prices && !!minPrice && !!maxPrice && minPrice != maxPrice">
        {{ minPrice.toLocaleString() }}円〜{{ maxPrice?.toLocaleString() }}円
      </span>
      <span v-else>{{ item.data.price.toLocaleString() }}円</span>
    </p>
    <p class="stock">在庫数：{{ item.data.stock }}個</p>
    <div class="item-img-slide">
      <div class="relative m-2 mt-4 rounded-md bg-SubBgThemaColor p-2">
        <Swiper
          :slides-per-view="1.5"
          :speed="1000"
          :modules="modules"
          :centered-slides="true"
          :space-between="30"
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
        >
          <SwiperSlide>
            <img
              class="h-auto w-full"
              :src="`${config.public.ecMockApiUrl}/uploads/items/${item.data.img1}`"
            />
          </SwiperSlide>
          <SwiperSlide v-if="item.data.img2">
            <img
              class="h-auto w-full"
              :src="`${config.public.ecMockApiUrl}/uploads/items/${item.data.img2}`"
            />
          </SwiperSlide>
          <SwiperSlide v-if="item.data.img3">
            <img
              class="h-auto w-full"
              :src="`${config.public.ecMockApiUrl}/uploads/items/${item.data.img3}`"
            />
          </SwiperSlide>
        </Swiper>
        <div
          class="swiper-button-prev absolute inset-y-1/2 left-0 z-10 ms-4 flex cursor-pointer items-center justify-center"
        ></div>
        <div
          class="swiper-button-next absolute inset-y-1/2 right-0 z-10 me-4 flex cursor-pointer items-center justify-center"
        ></div>
      </div>
    </div>
    <p v-if="item.data.context" class="context">
      説明文：<br />{{ item.data.context }}
    </p>
    <p v-if="item.data.category" class="category">
      カテゴリー：{{ item.data.category }}
    </p>
    <div v-if="item.data.tag">
      <p style="margin-bottom: 0">タグ：</p>
      <ul class="tag" style="margin-top: 0">
        <li v-for="tag in item.data.tag" :key="tag">{{ tag }}</li>
      </ul>
    </div>
    <div v-if="item.data.variations">
      <p>バリエーション</p>
      <ul>
        <li v-for="variation in item.data.variations" :key="variation.key">
          {{ variation.key }}<br />
          <p class="value">
            <span v-for="(value, index) in variation.values" :key="index"
              ><span v-if="index > 0">・</span>{{ value }}</span
            >
          </p>
        </li>
      </ul>
    </div>
    <div v-if="item.data.variations && item.data.variations_prices">
      <p>バリエーション金額</p>
      <ul>
        <li
          v-for="variations_price in item.data.variations_prices"
          :key="variations_price._id"
        >
          {{ variations_price.value }}：{{
            variations_price.price.toLocaleString()
          }}円
        </li>
      </ul>
    </div>
  </template>
</template>

<style scoped>
.item-img-slide {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
}
.swiper .swiper-slide {
  overflow: hidden;
  height: 0;
  padding-top: 50%;
}
.swiper .swiper-slide img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>