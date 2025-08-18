<template>
	<div class="waterfall-layout">
		<div v-for="item in items" :key="item.item?._id" class="item">
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
		<RandomIllustrationMark />
	</div>
</template>

<script setup>

const props = defineProps({
	items: Array
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

</script>

<style lang="scss" scoped>

div.waterfall-layout {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 250px 30px;
	row-gap: 27.78vh 30px; /* ((250 distance / 900 viewport height) * 100) */
	padding: 0 calc(50px * 2);
	margin: 0 auto 120px auto;
	position: relative;
	> div.item {
		&:nth-child(2) {
			margin-top: 111px;
			margin-top: 12.33vh; /* ((111 distance / 900 viewport height) * 100) */
		}
		a.media {
			:deep(div.image) {
				//outline: 1px solid red;
				&.--medium {
					img {
						width: 75%;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						object-fit: contain;
					}
				}
				&.--small {
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

</style>