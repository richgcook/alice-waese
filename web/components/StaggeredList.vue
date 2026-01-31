<template>
	<ul class="staggered-list" :data-layout="layoutVersion">
		<li v-for="(item, index) in items" :key="index" :class="{ '--has-other': item.other }">
			<template v-if="item._type == 'collaboration'">
				<NuxtLink :to="useInternalLinkUrl(item)">
					<div class="inner">
						<h3 class="title">{{ item.titleFormatted ? item.titleFormatted : item.title }}</h3>
					</div>
				</NuxtLink>
			</template>
			<template v-else>
				<NuxtLink :to="item.link" target="_blank">
					<div class="inner">
						<span class="name">{{ item.name }}</span>
						<span class="other" v-if="item.other"><span>&mdash;{{ item.other }}</span></span>
					</div>
				</NuxtLink>
			</template>
		</li>
	</ul>
</template>

<script setup>

const props = defineProps({
	items: Array,
	layoutVersion: {
		type: String,
		default: 'a'
	}
})

</script>

<style lang="scss" scoped>

ul.staggered-list {
	display: grid;
	grid-template-columns: repeat(14, 1fr);
	column-gap: 30px;
	padding: 0 120px;
	margin: 25px 0 120px 0;
	@include media('phone') {
		grid-template-columns: repeat(12, 1fr);
		gap: 2em 0;
		padding: 0 35px;
	}
	&[data-layout="a"] {
		li {
			&:nth-child(12n + 1) { grid-column: 1 / -1; }
			&:nth-child(12n + 2) { grid-column: 2 / -1; }
			&:nth-child(12n + 3) {
				grid-column: 1 / -1;
				a {
					display: flex;
					justify-content: flex-end;
				}
			}
			&:nth-child(12n + 4) { grid-column: 1 / -1; }
			&:nth-child(12n + 5) { grid-column: 7 / -1; }
			&:nth-child(12n + 6) {
				grid-column: 1 / -1;
				a {
					display: flex;
					justify-content: flex-end;
				}
			}
			&:nth-child(12n + 7) { grid-column: 11 / -1; }
			&:nth-child(12n + 8) { grid-column: 3 / -1; }
			&:nth-child(12n + 9) { grid-column: 1 / -1; }
			&:nth-child(12n + 10) { grid-column: 3 / -1; }
			&:nth-child(12n + 11) { 
				grid-column: 1 / -1;
				a {
					display: flex;
					justify-content: flex-end;
				}
			}
			&:nth-child(12n + 12) { grid-column: 3 / -1; }

			@include media('phone') {
				&:nth-child(12n+5) {
					text-align: right !important;
				}
				&:nth-child(12n+6) {
					grid-column: 4 / -1 !important;
					text-align: left !important;
					a {
						display: block;
					}
				}
				&:nth-child(12n+7) {
					text-align: right !important;
				}
				&:nth-child(12n+8) {
					text-align: left !important;
					a {
						display: block;
					}
				}
				&:nth-child(12n+9) {
					text-align: right !important;
				}
				&:nth-child(12n+10) {
					text-align: left !important;
					grid-column: 4 / -1 !important;
					a {
						display: block;
					}
				}
			}

			&:nth-child(odd) {
				@include media('phone') {
					text-align: left;
				}
			}
			&:nth-child(even) {
				@include media('phone') {
					text-align: right;
				}
				&.--has-other {
					@include media('phone') {
						text-align: left;
					}
				}
			}
		}
	}
	&[data-layout="b"] {
		li {
			&:nth-child(20n + 1) { grid-column: 1 / -1; }
			&:nth-child(20n + 2) { grid-column: 3 / -1; }
			&:nth-child(20n + 3) { grid-column: 7 / -1; }
			&:nth-child(20n + 4) { grid-column: 6 / -1; }
			&:nth-child(20n + 5) { grid-column: 4 / -1; }
			&:nth-child(20n + 6) {
				grid-column: 1 / -1;
				display: flex;
				justify-content: flex-end;
			}
			&:nth-child(20n + 7) { grid-column: 5 / -1; }
			&:nth-child(20n + 8) { grid-column: 7 / -1; }
			&:nth-child(20n + 9) { grid-column: 4 / -1; }
			&:nth-child(20n + 10) { grid-column: 1 / -1; }
			&:nth-child(20n + 11) { grid-column: 5 / -1; }
			&:nth-child(20n + 12) { grid-column: 8 / -1; }
			&:nth-child(20n + 13) {
				grid-column: 1 / -1;
				display: flex;
				justify-content: flex-end;
			}
			&:nth-child(20n + 14) { grid-column: 4 / -1; }
			&:nth-child(20n + 15) {
				grid-column: 1 / -1;
				display: flex;
				justify-content: flex-end;
			}
			&:nth-child(20n + 16) { grid-column: 4 / -1; }
			&:nth-child(20n + 17) { grid-column: 1 / -1; }
			&:nth-child(20n + 18) { grid-column: 6 / -1; }
			&:nth-child(20n + 19) {
				grid-column: 1 / -1;
				display: flex;
				justify-content: flex-end;
			}
			&:nth-child(20n + 20) { grid-column: 6 / -1; }

			@include media('phone') {
				&:nth-child(20n + 4) { 
					grid-column: 4 / -1 !important;
					text-align: left !important;
				}
				&:nth-child(20n + 5) { 
					grid-column: 2 / -1 !important;
				}
				&:nth-child(20n + 6) { 
					grid-column: 1 / -1 !important;
					text-align: left !important;
				}
				&:nth-child(20n + 7) { 
					text-align: right !important;
				}
				&:nth-child(20n + 8) { 
					text-align: left !important;
				}
				&:nth-child(20n + 12) { 
					grid-column: 4 / -1 !important;
					text-align: left !important;
				}

			}

			&:nth-child(odd) {
				@include media('phone') {
					display: block;
					text-align: left;
				}
				&.--has-other {
					@include media('phone') {
						text-align: left;
						a {
							text-align: left;
							display: flex;
							justify-content: flex-start;
						}
					}
				}
			}
			&:nth-child(even) {
				@include media('phone') {
					display: block;
					text-align: right;
				}
				&.--has-other {
					@include media('phone') {
						text-align: right;
						a {
							text-align: left;
							display: flex;
							justify-content: flex-end;
						}
					}
				}
			}
		}
	}
	&[data-layout="collaborations"] {
		li {
			white-space: pre-wrap;
			@include media('phone') {
				white-space: normal;
			}
			&:nth-child(12n + 1) {
				grid-column: 1 / -1;
				a {
					display: flex;
					justify-content: flex-end;
					@include media('phone') {
						display: block;
					}
				}
			}
			&:nth-child(12n + 3) { grid-column: 4 / -1; }
			&:nth-child(12n + 4) { grid-column: 3 / -1; }

			&:nth-child(odd) {
				@include media('phone') {
					text-align: right;
				}
			}
			&:nth-child(even) {
				@include media('phone') {
					text-align: left;
				}
			}
		}
	}
	li {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: subgrid;
		font-size: clamp(47px, 6.9vw, 180px);
		line-height: 1.2em;
		letter-spacing: -0.03em;
		@include media('phone') {
			line-height: 1.1em;
			grid-column: 1 / -1 !important;
		}
		a {
			grid-column: 1 / -1;
			&:hover {
				color: var(--color-gold);
			}
			div.inner {
				display: inline-block;
			}
		}
		&.--has-other {
			a {
				@include media('phone') {
					display: block;
				}
				div.inner {
					span.other {
						display: block;
						@include media('phone') {
							display: inline;
						}
					}
				}
			}
		}
	}
}

</style>