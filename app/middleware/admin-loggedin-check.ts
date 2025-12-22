import type { AdminUser } from "../interfaces";

export default defineNuxtRouteMiddleware(
	async(to, from) => {

		const adminUserIdCookie = useCookie<string | null>("adminUserId")
		const accessToken = useState<string | null>("accessToken")
		const adminUserState = useState<AdminUser | null>("userInfo")
		const { refresh } = useAdminAuth()

		if (!adminUserIdCookie.value && !adminUserState.value?.id) {
			return navigateTo("/admin/login")
		}

		if (process.server) return

		if (accessToken.value) {
			return
		}

		try {
			await refresh()
		} catch {
			return navigateTo("/admin/login")
		}
	}
)