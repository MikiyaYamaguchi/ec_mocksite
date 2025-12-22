<script setup lang="ts">
import type { AdminUser } from "../../interfaces";

definePageMeta({
  layout: "admin",
});

const config = useRuntimeConfig();

const email = ref("");
const password = ref("");
const pending = ref(false);
const noServerError = ref(true);
const authFailed = ref(false);

const onLoginButtonClick = async (): Promise<void> => {
  const config = useRuntimeConfig();
  pending.value = true;
  authFailed.value = false;
  noServerError.value = true;
  const asyncData = await useFetch(
    `${config.public.ecMockApiUrl}/admin_user/login`,
    {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
      credentials: "include",
    }
  );

  console.log(asyncData.data.value);

  if (
    (asyncData.error.value === null || asyncData.error.value === undefined) &&
    asyncData.data.value != null
  ) {
    const accessToken = useState<string | null>("accessToken");
    accessToken.value = asyncData.data.value.accessToken;
    console.log(asyncData.data.value.accessToken);
    const adminUserState = useState<AdminUser | null>("userInfo");
    if (adminUserState.value != null) {
      adminUserState.value = {
        id: asyncData.data.value.user._id,
        name: asyncData.data.value.user.name,
        email: asyncData.data.value.user.email,
      };
    }
    await navigateTo("/admin");
  } else {
    if (asyncData.error.value?.statusCode === 401) {
      pending.value = false;
      authFailed.value = true;
    } else {
      pending.value = false;
      noServerError.value = false;
    }
  }
};
</script>

<template>
  <h1>ログイン画面</h1>
  <p v-if="pending">ログイン中・・・</p>
  <template v-else>
    <p v-if="authFailed">メールアドレスまたはパスワードが違います。</p>
    <p v-if="noServerError">
      メールアドレスとパスワードを入力してログインしてください。
    </p>
    <p v-else>
      サーバー処理中に障害が発生しました。もう一度ログインを行なってください。
    </p>
    <form v-on:submit.prevent="onLoginButtonClick">
      <dl>
        <dt>メールアドレス</dt>
        <dd><input type="email" v-model="email" required /></dd>
        <dt>パスワード</dt>
        <dd><input type="password" v-model="password" required /></dd>
      </dl>
      <button type="submit">ログイン</button>
    </form>
  </template>
</template>