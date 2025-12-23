<script lang="ts" setup>
import UiwUser from "./icons/UiwUser.vue";

const config = useRuntimeConfig();
const adminUserIdCookie = useCookie<string | null>("adminUserId");

const userInfo = ref<any>(null);
const loginActive = ref(false);

const adminUserFetch = async () => {
  if (adminUserIdCookie.value) {
    const asyncData = await useFetch(
      `${config.public.ecMockApiUrl}/admin_user/single/${adminUserIdCookie.value}`
    );
    const data = asyncData.data;
    userInfo.value = data.value?.data || null;
    loginActive.value = !!userInfo.value;
  } else {
    loginActive.value = false;
  }
};

adminUserFetch();

watch(adminUserIdCookie, () => {
  adminUserFetch();
});
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