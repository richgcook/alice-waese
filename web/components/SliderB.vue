<template>
	<div class="slider-container" ref="container">
		<div class="viewport" ref="viewport">
			<div class="slider" ref="slider">
				<div v-for="(slide, index) in slides" :key="index" class="slide">
					<Img 
						:src="slide.image.asset?.url"
						:alt="slide.image.alt"
						:loading="`eager`"
						:fetchpriority="`high`"
						@click="imageClick(flattenedMediaContent.find(item => item?.image?.asset?._id === slide.image.asset._id)?.index)"
					/>
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

const props = defineProps({
	slides: Array,
	flattenedMediaContent: Array,
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
}

const emit = defineEmits()

const imageClick = (index) => {
	emit('sliderLightboxGoTo', index)
}

onMounted(() => {
	if (embla.value) {
		embla.value.on('select', onSelect)
		onSelect()
	}
})

</script>

<style lang="scss" scoped>

div.slider-container {
	display: flex;
	flex-flow: column nowrap;
	row-gap: 10px;
	div.viewport {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		touch-action: manipulation;
		height: calc(100vw / 3);
		@include media('phone') {
			height: calc(100vw / 2);
		}
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
				img {
					position: absolute;
					inset: 0;
					height: 100%;
					width: 100%;
					object-fit: contain;
				}
			}
		}
	}
	div.helpers {
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