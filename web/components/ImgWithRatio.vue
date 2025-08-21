<template>
	<div class="image">
		<NuxtImg 
			:src="src" 
			:alt="alt"
			:data-orientation="orientation"
			:sizes="sizes"
			:loading="loading"
			:fetchpriority="priority"
			:preload="preload"
		/>
	</div>
</template>

<script setup>

const props = defineProps({
	src: String,
	alt: String,
	sizes: String,
	orientation: String,
	loading: {
		type: String,
		default: 'lazy'
	},
	priority: {
		type: String,
		default: null
	},
	preload: {
		type: Boolean,
		default: false
	},
	ratio: {
		type: [Number, String],
		default: null
	},
})

</script>

<style scoped lang="scss">

div.image {
	position: relative;
	aspect-ratio: v-bind(ratio);
	img {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
}

</style>