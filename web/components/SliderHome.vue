<template>
	<div class="slider-container" ref="container">
		<div class="viewport" ref="viewport">
			<div class="slider" ref="slider">
				<div v-for="(slide, index) in slides" :key="index" class="slide" :data-settings-position="slide.settings?.position">
					<template v-if="useBlockType(slide._type) === 'image'">
						<NuxtImg 
							:src="slide.image.assetRef" 
							:alt="slide.image.alt"
							sizes="100vw tablet-portrait:100vw"
							loading="eager"
							preload
							v-if="slide.image?.asset"
						/>
					</template>
					<NuxtLink :to="useLinkLink(slide.link)" class="link" v-if="slide.link"></NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

import { useHomeStore } from '~/store/home'
import { useThemeModeStore } from '~/store/themeMode'

import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'

import { useMediaQuery } from '@vueuse/core'

const props = defineProps({
	slides: Array,
	startPlaying: {
		type: Boolean,
		default: false,
	},
})

const plugins = computed(() => {
	const basePlugins = [
		Autoplay({
			playOnInit: false,
			delay: 4000,
			stopOnInteraction: false,
		}),
		Fade(),
  	]
	return basePlugins
})

const [viewport, embla] = emblaCarouselVue({
	loop: true,
	containScroll: false,
	duration: 70,
	watchDrag: false,
}, plugins.value)

const themeModeStore = useThemeModeStore()

const scrollSnaps = ref([])
const selectedScrollSnap = ref(0)

const isPhone = useMediaQuery('(max-width: 768px)')

const slideTheme = computed(() => {
	return props.slides[selectedScrollSnap.value]?.settings?.themeMode ?? 'light'
})

const slideThemePhone = computed(() => {
	return props.slides[selectedScrollSnap.value]?.settings?.themeModePhone ?? slideTheme.value
})

const effectiveTheme = computed(() => {
	return isPhone.value ? slideThemePhone.value : slideTheme.value
})

const onInit = () => {
	scrollSnaps.value = embla.value.scrollSnapList()
	selectedScrollSnap.value = embla.value.selectedScrollSnap()
	themeModeStore.setMode(effectiveTheme.value)
}

const onSelect = () => {
	scrollSnaps.value = embla.value.scrollSnapList()
	selectedScrollSnap.value = embla.value.selectedScrollSnap()
	themeModeStore.setMode(effectiveTheme.value)
}

watch(effectiveTheme, () => {
	themeModeStore.setMode(effectiveTheme.value)
})

const homeStore = useHomeStore()

let autoplayStartTimeoutId = null
let hasTriggeredInitialAutoplay = false

const startAutoplay = () => {
	if (!embla.value) return
	embla.value.plugins().autoplay.play()
}

watch(() => props.startPlaying, (shouldStart) => {
	if (!embla.value || !shouldStart || hasTriggeredInitialAutoplay) return

	hasTriggeredInitialAutoplay = true
	homeStore.setHideLanding()

	autoplayStartTimeoutId = setTimeout(() => {
		embla.value.scrollNext()
		startAutoplay()
		autoplayStartTimeoutId = null
	}, 4000)
})

onMounted(() => {
	if (embla.value) {
		onInit()
		embla.value.on('select', onSelect)

		if (homeStore.isLandingHidden) {
			embla.value.plugins().autoplay.play()
		}
	}
})

onBeforeUnmount(() => {
	if (autoplayStartTimeoutId) {
		clearTimeout(autoplayStartTimeoutId)
		autoplayStartTimeoutId = null
	}
})

</script>

<style lang="scss" scoped>

div.slider-container {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	div.viewport {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
		touch-action: manipulation;
		div.slider {
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			div.slide {
				flex-shrink: 0;
				display: grid;
				grid-template-columns: repeat(14, 1fr);
				column-gap: 20px;
				position: relative;
				width: 100%;
				height: 100%;
				@include media('phone') {
					grid-template-columns: 1fr;
				}
				&[data-settings-position="left"] {
					img {
						grid-column: 1 / span 8;
						@include media('phone') {
							grid-column: 1 / -1;
						}
					}
				}
				img, video {
					grid-column: 7 / span 8;
					position: absolute;
					top: 50%;
					left: 50%;
					height: 100%;
					width: 100%;
					max-width: none;
					transform: translate(-50%, -50%);
					object-fit: cover;
					@include media('phone') {
						grid-column: 1 / -1;
					}
				}
				a.link {
					position: absolute;
					inset: 0;
					height: 100%;
					width: 100%;
					z-index: 1;
				}
			}
		}
	}
}

</style>