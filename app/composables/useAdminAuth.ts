export const useAdminAuth = () => {
  const refresh = async (): Promise<string> => {
    const config = useRuntimeConfig();
    try {
      const { data, error } = await useFetch<{ accessToken: string }>(
        `${config.public.ecMockApiUrl}/admin_user/refresh`,
        {
          method: "POST",
          credentials: "include",
        }
      )

      if (error.value || !data.value?.accessToken) {
        throw new Error("refresh失敗")
      }

      const accessToken = useState<string | null>("accessToken")
      accessToken.value = data.value.accessToken

      return data.value.accessToken
    } catch (err) {
      console.error("refresh失敗", err)
      throw err
    }
  }

  return { refresh }
}
