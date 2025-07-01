<template>
	<NuxtLink :to="useInternalLinkUrl(reference)" :class="{ '--has-symbol': symbolArrow }">
		<SymbolArrowNextLong v-if="symbolArrow" />
		<slot />
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	reference: Object,
	symbolArrow: Boolean,
})

</script>

<style lang="scss" scoped>

a {
	color: currentColor;
	&.--has-symbol {
		font-size: var(--font-size-base-sm);
		font-weight: 500;
		letter-spacing: normal;
		display: inline-flex;
		align-items: baseline;
		column-gap: 0.75ch;
		svg {
			height: 13px;
			fill: currentColor;
			display: inline-flex;
			margin-left: 0.75ch;
			@include media('phone') {
				height: 9px;
			}
		}
	}
}

</style>