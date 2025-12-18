
export default defineNuxtRouteMiddleware(
	(to, from) => {
		const adminUserId = useCookie<string | null>("AdminUserId")
		if (!adminUserId.value) {
			return navigateTo("/admin/login")
		}
	}
)