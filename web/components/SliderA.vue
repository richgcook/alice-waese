<template>
	<div class="slider-container" ref="container">
		<button class="close" @click="close"><SymbolClose /></button>
		<div class="viewport" ref="viewport" @mousemove="pointerMove" @pointerenter="pointerEnter" @pointerleave="pointerLeave">
			<div class="slider" ref="slider">

				<div v-for="(slide, index) in slides" :key="index" class="slide" @click="onSlideClick">

					<Img 
						:src="slide.image.asset?.url"
						:alt="slide.image.alt"
						v-if="slide.image"
					/>

					<video playsinline autoplay loop muted v-else-if="slide.video">
						<source :src="slide.video.url" type="video/mp4">
					</video>

				</div>
			</div>
		</div>
		<div class="helpers">
			<div class="counter">{{ selectedScrollSnap + 1 }} / {{ scrollSnaps.length }}</div>
			<div class="caption" v-if="slides[selectedScrollSnap].caption">
				<RichText :blocks="slides[selectedScrollSnap].caption" />
			</div>
		</div>
	</div>
</template>

<script setup>

import emblaCarouselVue from 'embla-carousel-vue'
import { useCursorStore } from '~/store/cursor'

const props = defineProps({
	slides: Array,
	currentSliderLightboxIndex: Number,
})

const slider = ref(null)

const plugins = computed(() => {
	const basePlugins = [
		//
  	]
	return basePlugins
})

const [viewport, embla] = emblaCarouselVue({
	loop: true,
}, plugins.value)

const selectedScrollSnap = ref(0)
const scrollSnaps = ref([])

const onSelect = () => {
	selectedScrollSnap.value = embla.value.selectedScrollSnap()
	scrollSnaps.value = embla.value.scrollSnapList()

	console.log('slides', props.slides[selectedScrollSnap.value])

}

const isCursorOnLeft = (event) => {
	const bounds = viewport.value.getBoundingClientRect()
	const relativeX = event.clientX - bounds.left
	return relativeX < viewport.value.offsetWidth / 2
}

const onSlideClick = (event) => {
	if (isCursorOnLeft(event)) {
		embla.value.scrollPrev()
	} else {
		embla.value.scrollNext()
	}
}

const emit = defineEmits()

const close = () => {
	emit('close')
}

const cursorStore = useCursorStore()

const pointerMove = (event) => {
	const isOverExcludedChild = event.target.closest('[data-cursor="off"]')
	if (isOverExcludedChild) {
		cursorStore.turnOff()
	} else {
		cursorStore.turnOn()
	}
	if (isCursorOnLeft(event)) {
		cursorStore.setDirection('left')
		cursorStore.setState('arrow')
	} else {
		cursorStore.setDirection('right')
		cursorStore.setState('arrow')
	}
}

const pointerEnter = (event) => {
	if (event.pointerType !== 'mouse') return
	cursorStore.turnOn()
}

const pointerLeave = (event) => {
	if (event.pointerType !== 'mouse') return
	cursorStore.turnOff()
}

watch(() => props.currentSliderLightboxIndex, (index) => {
	embla.value.scrollTo(index, true)
})

onMounted(() => {
	if (embla.value) {
		embla.value.on('select', onSelect)
		onSelect()
	}
})

</script>

<style lang="scss" scoped>

div.slider-container {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	row-gap: 10px;
	background-color: white;
	z-index: 30;
	div.viewport {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: calc(100% - ((var(--padding-base) * 4) + (40px * 2)));
		width: 100%;
		overflow: hidden;
		touch-action: manipulation;
		cursor: none;
		div.slider {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			div.slide {
				flex-shrink: 0;
				position: relative;
				width: 100%;
				height: 100%;
				img, video {
					position: absolute;
					top: 50%;
					left: 50%;
					height: 100%;
					width: calc(100% - ((var(--padding-base) * 4) + (40px * 2)));
					transform: translate(-50%, -50%);
					max-width: none;
					object-fit: contain;
				}
			}
		}
	}
	button.close {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		position: absolute;
		top: var(--padding-base);
		right: var(--padding-base);
		z-index: 10;
		svg {
			height: 40px;
			width: 40px;
		}
	}
	div.helpers {
		position: absolute;
		bottom: var(--padding-base);
		left: 0;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		column-gap: calc(var(--padding-base) / 2);
		justify-content: center;
		font-size: 12px;
		div.counter {
			flex-shrink: 0;
		}
	}
}

</style>