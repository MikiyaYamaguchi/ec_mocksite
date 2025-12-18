import type { AdminUser } from "~/interfaces"

export default defineNuxtRouteMiddleware(
	(to, from) => {
		const adminUserIdCookie = useCookie<string | null>("AdminUserId")
		const adminUserState = useState<AdminUser | null>("userInfo")
		if (!adminUserIdCookie.value && !adminUserState.value?.id) {
			return navigateTo("/admin/login")
		}
	}
)