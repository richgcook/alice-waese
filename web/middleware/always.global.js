// Preview branch: only homepage + /about are public

export default defineNuxtRouteMiddleware((to) => {
	const path = to.path.replace(/\/$/, '') || '/'
	if (path === '/' || path === '/about') return
	return navigateTo('/')
})
