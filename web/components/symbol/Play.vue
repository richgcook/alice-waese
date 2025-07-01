<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.4 46.44"><polyline points="0 46.45 32.4 23.22 0 0"/></svg>
</template>

<script setup>

const props = defineProps({
	fill: String
})

</script>

<style scoped lang="scss">

svg {
	fill: v-bind(fill);
}

</style>