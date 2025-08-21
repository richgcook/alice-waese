<template>
	<NuxtLink :to="useInternalLinkUrl(reference)">
		<slot />
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	reference: Object,
})

</script>

<style lang="scss" scoped>

a {
	color: currentColor;
}

</style>