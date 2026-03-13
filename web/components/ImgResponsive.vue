<template>
	<div>
		<NuxtImg
			v-if="landscapeSrc"
			:src="landscapeSrc"
			:alt="alt"
			:sizes="sizes"
			:loading="loading"
			:fetchpriority="priority"
			:preload="preload"
			data-orientation="landscape"
		/>
		<NuxtImg
			v-if="portraitSrc"
			:src="portraitSrc"
			:alt="alt"
			:sizes="sizes"
			:loading="loading"
			:fetchpriority="priority"
			:preload="preload"
			data-orientation="portrait"
		/>
	</div>
</template>

<script setup>

const props = defineProps({
	image: {
		type: Object,
		default: null,
	},
	sizes: {
		type: String,
		default: '100vw tablet-portrait:100vw',
	},
	loading: {
		type: String,
		default: 'lazy',
	},
	priority: {
		type: String,
		default: null,
	},
	preload: {
		type: Boolean,
		default: false,
	},
})

const responsiveImage = computed(() => props.image || null)

const { landscapeSrc, portraitSrc, alt } = useResponsiveImage(responsiveImage)

</script>

