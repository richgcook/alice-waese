<template>
	<div id="app">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
import { useThemeModeStore } from '~/store/themeMode'
import { useCursorStore } from '~/store/cursor'
import { useProjectsStore } from '~/store/projects'

const config = useRuntimeConfig()
const route = useRoute()
const navStore = useNavStore()
const themeModeStore = useThemeModeStore()
const cursorStore = useCursorStore()
const projectsStore = useProjectsStore()

useHead({
	titleTemplate: (titleChunk) => {
		if (titleChunk) {
			if (titleChunk == config.public.siteTitle) return config.public.siteTitle
			return `${titleChunk} → ${config.public.siteTitle}`
		} else {
			config.siteTitle
		}
	},
})

// Having to add this watcher to close the nav when the route changes
// Middleware fires before the route changes (or at least too early for this)
watch(() => route.path, (newRoute) => {
	
	navStore.setClose()

	cursorStore.reset()

	themeModeStore.resetMode()

	projectsStore.reset()

}, { immediate: true })

</script>

<style lang="scss">

div#app {
	cursor: url('/cursor-black.svg') 0 0, auto;
	a, button {
		cursor: url('/cursor-black.svg') 0 0, auto;
	}
}

</style>