<script lang="ts" setup>
import UiwUser from "./icons/UiwUser.vue";

const config = useRuntimeConfig();
const adminUserIdCookie = useCookie<string | null>("adminUserId");
const asyncData = await useFetch(
  `${config.public.ecMockApiUrl}/admin_user/single/${adminUserIdCookie.value}`
);
const data = asyncData.data;
const userInfo = data?.value?.data || null;
</script>

<template>
  <header>
    <div class="container">
      <h1>ECモック管理画面</h1>
      <div class="admin-user-wrap">
        <span class="admin-user-icon-wrap"><UiwUser /></span>
        <p clas="admin-user-name">{{ userInfo.name }}</p>
      </div>
    </div>
  </header>
</template>