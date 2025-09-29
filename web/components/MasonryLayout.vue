<template>
	<div class="masonry-layout" :data-context="context">
		<div class="column" v-for="(col, c) in columns" :key="c">
			<div v-for="(item, i) in col" :key="item.item?._id" class="item" :class="phoneItemPlacementClass(item, c, i)">
				<NuxtLink :to="useInternalLinkUrl(item.item)" class="media" :class="{ '--has-hover': item.mediaOverride?.imageHoverState?.asset }">
					<video 
						playsinline autoplay loop muted 
						v-if="primaryMedia(item)?.type === 'video'">
						<source :src="primaryMedia(item).video" type="video/mp4">
					</video>
					<ImgWithRatio 
						:src="primaryMedia(item).image.assetRef" 
						:alt="primaryMedia(item).image.alt" 
						:sizes="`100vw tablet-portrait:50vw`"
						:ratio="primaryMedia(item).image.asset.ratio"
						:class="[ item.settings?.size ? `--${item.settings.size}` : '' ]"
						v-else-if="primaryMedia(item)?.type === 'image'"
					/>
					<ImgWithRatio 
						:src="item.mediaOverride?.imageHoverState.assetRef" 
						:alt="item.mediaOverride?.imageHoverState.alt" 
						:sizes="`100vw tablet-portrait:50vw`"
						:ratio="primaryMedia(item).image.asset.ratio"
						:class="[ item.settings?.size ? `--${item.settings.size}` : '', '--hover' ]"
						v-if="primaryMedia(item)?.type === 'image' && item.mediaOverride?.imageHoverState?.asset"
					/>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	items: Array,
	context: String,
})

const primaryMedia = (item) => {

	if (!item?.item) return null

	if (item.mediaOverride) {
		if (item.mediaOverride.video) {
			return {
				type: 'video',
				video: item.mediaOverride.video
			}
		}
		if (item.mediaOverride.image?.asset) {
			return {
				type: 'image',
				image: item.mediaOverride.image
			}
		}
	}

	if (item.item.primaryMedia) {
		if (item.item.primaryMedia.video) {
			return {
				type: 'video',
				video: item.item.primaryMedia.video
			}
		}
		if (item.item.primaryMedia.image?.asset) {
			return {
				type: 'image',
				image: item.item.primaryMedia.image
			}
		}
	}

	return null

}

const { columns } = useMasonryColumns(props.items, 2)

// Only these sizes get placement classes for phone
const placementPattern = ['--left', '--right', '--center']
// Cycle pattern for qualifying items
const qualifySet = new Set(['small', 'medium'])

const itemPlacementByIndex = computed(() => {

	const cols = columns.value ?? []
	const result = cols.map(col => Array((col ?? []).length).fill(''))

	let seq = 0
	cols.forEach((col, c) => {
		col.forEach((item, i) => {
			const size = item?.settings?.size
			if (qualifySet.has(size)) {
				result[c][i] = placementPattern[seq % placementPattern.length]
				seq++
			}
		})
	})
	return result
})

const phoneItemPlacementClass = (item, c, i) => {
	const size = item?.settings?.size
	if (!qualifySet.has(size)) return []
	return [itemPlacementByIndex.value[c]?.[i] ?? '']
}

</script>

<style lang="scss" scoped>

div.masonry-layout {
	display: flex;
	gap: 30px;
	align-items: flex-start;
	padding: 0 calc(50px * 2);
	padding: 0 12vw;
	margin: 0 auto 120px auto;
	@include media('phone') {
		flex-flow: column nowrap;
		row-gap: calc(27.78vh/2);
		padding: 0;
	}
	&[data-context="collections"] {
		div.column {
			&:nth-child(1) {
				> div.item {
					a.media {
						display: flex;
						flex-flow: row nowrap;
						justify-content: flex-end;
						@include media('phone') {
							justify-content: start;
						}
					}
				}
			}
			&:nth-child(2) {
				> div.item {
					&:first-child {
						margin-top: 489px;
						margin-top: 54.33vh; /* ((489 distance / 900 viewport height) * 100) */
						@include media('phone') {
							margin-top: 0;
						}
					}
				}
			}
			div.item {
				&.--center {
					a.media {
						@include media('phone') {
							display: flex;
							flex-flow: row nowrap;
							justify-content: center;
						}
					}
				}
				&.--right {
					a.media {
						@include media('phone') {
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-end;
						}
					}
				}
			}
		}
	}
	&:not([data-context="collections"]) {
		div.column {
			div.item {
				&.--left {
					a.media {
						:deep(div.image) {
							&.--small,
							&.--medium {
								margin: 0 auto;
								@include media('phone') {
									margin: 0;
								}
							}
						}
					}
				}
				&.--right {
					a.media {
						:deep(div.image) {
							&.--small,
							&.--medium {
								margin: 0 auto;
								@include media('phone') {
									margin: 0 0 0 auto;
								}
							}
						}
					}
				}
				&.--center {
					a.media {
						:deep(div.image) {
							&.--small,
							&.--medium {
								@include media('phone') {
									width: 60%;
								}
							}
						}
					}
				}
				a.media {
					:deep(div.image) {
						margin: 0 auto;
						&.--medium {
							img {
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								object-fit: contain;
							}
						}
						&.--small {
							img {
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								object-fit: contain;
							}
						}
					}
				}
			}
		}
	}
	div.column {
		flex: 1 1 0;
  		min-width: 0;
		display: flex;
		flex-flow: column nowrap;
		row-gap: 250px;
		row-gap: 27.78vh;  /* ((250 distance / 900 viewport height) * 100) */
		position: relative;
		@include media('phone') {
			row-gap: 150px;
			row-gap: 20.5vh;
		}
		@include media('phone') {
			flex: none;
			width: 100%;
		}
		&:nth-child(1) {
			> div.item {
				&:nth-child(1) {
					a.media {
						:deep(div.image) {
							&.--large {
								@include media('phone') {
									aspect-ratio: auto;
									height: 100vh;
									@supports (height: 100svh) {
										height: 100svh;
									}
								}
							}
						}
					}
				}
			}
		}
		&:nth-child(2) {
			> div.item {
				&:first-child {
					//margin-top: 489px;
					//margin-top: 54.33vh; /* ((489 distance / 900 viewport height) * 100) */
					margin-top: 45vh;
					@include media('phone') {
						margin-top: 0;
					}
				}
			}
		}
		div.item {
			a.media {
				position: relative;
				&.--has-hover {
					@include isNotTouch() {
						&:hover {
							:deep(div.image) {
								&.--hover {
									opacity: 1;
								}
							}
						}
					}
				}
				:deep(div.image) {
					&.--large {
						width: 100%;
					}
					&.--medium {
						width: 75%;
						@include media('phone') {
							width: 85%;
						}
					}
					&.--small {
						width: 60%;
						@include media('phone') {
							width: 75%;
						}
					}
					&.--hover {
						position: absolute;
						inset: 0;
						opacity: 0;
						z-index: 1;
						pointer-events: none;
						transition: opacity 0.3s;
					}
				}
			}
		}
	}
}

</style>