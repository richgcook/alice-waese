<template>
	<div class="masonry-layout" :data-context="context">
		<div class="column" v-for="(col, c) in columns" :key="c">
			<div v-for="item in col" :key="item.item?._id" class="item">
				<NuxtLink :to="useInternalLinkUrl(item.item)" class="media">
					<video 
						playsinline autoplay loop muted 
						v-if="primaryMedia(item)?.type === 'video'">
						<source :src="primaryMedia(item).video" type="video/mp4">
					</video>
					<ImgWithRatio 
						:src="primaryMedia(item).image.asset.url" 
						:sizes="`
							(max-width: 768px) 100vw, 
							50vw`"
						:alt="primaryMedia(item).image.alt" 
						:ratio="primaryMedia(item).image.asset.ratio"
						:class="[ item.settings?.size ? `--${item.settings.size}` : '' ]"
						v-else-if="primaryMedia(item)?.type === 'image'"
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

</script>

<style lang="scss" scoped>

div.masonry-layout {
	display: flex;
	gap: 30px;
	align-items: flex-start;
	padding: 0 calc(50px * 2);
	padding: 0 12vw;
	margin: 0 auto 120px auto;
	&[data-context="collections"] {
		div.column {
			&:nth-child(1) {
				> div.item {
					a.media {
						display: flex;
						flex-flow: row nowrap;
						justify-content: end;
					}
				}
			}
			&:nth-child(2) {
				> div.item {
					&:first-child {
						margin-top: 489px;
						margin-top: 54.33vh; /* ((489 distance / 900 viewport height) * 100) */
					}
				}
			}
		}
	}
	&:not([data-context="collections"]) {
		div.column {
			div.item {
				a.media {
					:deep(div.image) {
						&.--medium {
							width: 100%;
							img {
								width: 75%;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								object-fit: contain;
							}
						}
						&.--small {
							width: 100%;
							img {
								width: 50%;
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
		&:nth-child(2) {
			> div.item {
				&:first-child {
					//margin-top: 489px;
					//margin-top: 54.33vh; /* ((489 distance / 900 viewport height) * 100) */
					margin-top: 45vh;
				}
			}
		}
		div.item {
			a.media {
				:deep(div.image) {
					&.--large {
						width: 100%;
					}
					&.--medium {
						width: 75%;
					}
					&.--small {
						width: 50%;
					}
				}
			}
		}
	}
}

</style>