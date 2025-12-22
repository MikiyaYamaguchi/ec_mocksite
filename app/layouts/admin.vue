<script setup lang="ts">
import type { AdminUser } from "../interfaces";
useState<string>("accessToken", (): string => {
  const accessTokenInit = "";
  return accessTokenInit;
});
useState<AdminUser>("userInfo", (): AdminUser => {
  const userInfoInit = {
    id: "",
    name: "",
    email: "",
  };
  return userInfoInit;
});
</script>

<template>
  <AdminHeader />
  <main>
    <slot />
  </main>
  <AdminFooter />
</template>