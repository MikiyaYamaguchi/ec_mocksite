<script lang="ts" setup>
if (process.client) {
  const config = useRuntimeConfig();
  const asyncData = await useFetch(
    `${config.public.ecMockApiUrl}/admin_user/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (asyncData.error.value == null) {
    const adminUserIdCookie = useCookie<string | null>("adminUserId");
    const adminRefreshTokenCookie = useCookie<string | null>(
      "adminRefreshToken"
    );
    adminUserIdCookie.value = null;
    adminRefreshTokenCookie.value = null;
    await navigateTo("/admin/login");
  } else {
    await navigateTo("/admin/");
  }
}
</script>