<script lang="ts" setup>
import UiwUser from "./icons/UiwUser.vue";

const config = useRuntimeConfig();
const adminUserIdCookie = useCookie<string | null>("adminUserId");
const loginActive = ref(false);
const asyncData = await useFetch(
  `${config.public.ecMockApiUrl}/admin_user/single/${adminUserIdCookie.value}`
);
const data = asyncData.data;
const userInfo = data?.value?.data || null;

if (asyncData.error.value == null && asyncData.data.value != null) {
  loginActive.value = true;
}
</script>

<template>
  <header>
    <div class="container">
      <h1>ECモック管理画面</h1>
      <div class="header-right" v-if="loginActive">
        <div class="admin-user-wrap">
          <span class="admin-user-icon-wrap"><UiwUser /></span>
          <p clas="admin-user-name">{{ userInfo.name }}</p>
        </div>
        <div class="header-links">
          <ul>
            <li>
              <NuxtLink v-bind:to="{ name: 'admin-logout' }"
                >ログアウト</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>