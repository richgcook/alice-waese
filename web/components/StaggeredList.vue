<template>
	<ul class="staggered-list">
		<li v-for="(item, index) in items" :key="index">
			<NuxtLink :to="item.link" target="_blank">{{ item.name }}</NuxtLink>
		</li>
	</ul>
</template>

<script setup>

const props = defineProps({
	items: Array,
})

</script>

<style lang="scss" scoped>

ul.staggered-list {
	display: flex;
	flex-flow: column nowrap;
	padding: 0 120px;
	margin: 25px 0 120px 0;
	@include media('phone') {
		padding: 0 30px;
	}
	$indent-map: (
		0: 0,
		1: 2,
		2: 4,
		3: 6,
		4: 4,
		5: 2
	);
	$indent-map-phone: (
		0: 0,
		1: 1,
		2: 2,
		3: 3,
		4: 2,
		5: 1
	);
	@for $i from 1 through 30 {
		$step: ($i - 1) % 6;
		$indent: map-get($indent-map, $step);
		li {
			&:nth-child(#{$i}) {
				text-indent: #{$indent}ch;
			}
		}
	}
	@include media('phone') {
		@for $i from 1 through 30 {
			$step: ($i - 1) % 6;
			$indent: map-get($indent-map-phone, $step);
			li {
				&:nth-child(#{$i}) {
					text-indent: #{$indent}ch;
				}
			}
		}
	}
	li {
		font-size: clamp(48px, 6.9vw, 100px);
		line-height: 1.2em;
		letter-spacing: 0.03em;
		a {
			&:hover {
				color: var(--color-gold);
			}
		}
	}
}

</style>