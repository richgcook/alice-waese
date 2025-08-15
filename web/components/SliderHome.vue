<template>
	<div class="slider-container" ref="container">
		<div class="viewport" ref="viewport">
			<div class="slider" ref="slider">
				<div v-for="(slide, index) in slides" :key="index" class="slide" :data-settings-position="slide.settings?.position">
					<template v-if="useBlockType(slide._type) === 'image'">
						<Img 
							:src="slide.image.asset?.url"
							:alt="slide.image.alt"
							:loading="`eager`"
							:fetchpriority="`high`"
						/>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

import { useThemeModeStore } from '~/store/themeMode'
import { storeToRefs } from 'pinia'

import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'

const props = defineProps({
	slides: Array,
})

const plugins = computed(() => {
	const basePlugins = [
		Autoplay({
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

const onInit = () => {
	scrollSnaps.value = embla.value.scrollSnapList()
	selectedScrollSnap.value = embla.value.selectedScrollSnap()
	console.log(props.slides[selectedScrollSnap.value].settings?.themeMode)
	themeModeStore.setMode(props.slides[selectedScrollSnap.value].settings?.themeMode || 'light')
}

const onSelect = () => {
	scrollSnaps.value = embla.value.scrollSnapList()
	selectedScrollSnap.value = embla.value.selectedScrollSnap()
	themeModeStore.setMode(props.slides[selectedScrollSnap.value].settings?.themeMode || 'light')
}

onMounted(() => {
	if (embla.value) {
		onInit()
		embla.value.on('select', onSelect)
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
				&[data-settings-position="left"] {
					img {
						grid-column: 1 / span 8;
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
				}
			}
		}
	}
	h1 {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 50%;
		font-size: 128px;
		font-size: clamp(64px, 7vw, 128px);
		line-height: 1.08;
		padding: 0 8%;
		text-align: center;
		@include media('phone') {
			top: 20%;
			width: 100%;
			padding: 0;
		}
	}
	div.caption {
		position: absolute;
		bottom: calc(var(--padding-base) * 2);
		left: 0;
		width: 50%;
		font-size: 14px;
		text-align: center;
		padding: 0 calc(var(--padding-base) * 2);
		@include media('phone') {
			bottom: calc(60% + var(--padding-base));
			width: 100%;
			font-size: 11px;
		}
	}
}

</style>