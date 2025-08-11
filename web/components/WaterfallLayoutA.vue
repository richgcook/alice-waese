<template>
	<div class="waterfall-layout">
		<div v-for="item in items" :key="item.item?._id" class="item">
			<NuxtLink :to="useInternalLinkUrl(item.item)" class="media">
				<video 
					playsinline autoplay loop muted 
					v-if="primaryMedia(item)?.type === 'video'">
					<source :src="primaryMedia(item).video" type="video/mp4">
				</video>
				<Img 
					:src="primaryMedia(item).image.asset.url" 
					:sizes="`
						(max-width: 768px) 100vw, 
						50vw`"
					:alt="primaryMedia(item).image.alt" 
					:style="{ 'width': `${item.settings?.size}%` }"
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
	gap: 0 20px;
	padding: 0 calc(50px * 2);
	margin: 0 auto 120px auto;
	position: relative;
	> div.item {
		a.media {
			display: block;
			aspect-ratio: 4 / 5;
			outline: 1px solid red;
			position: relative;
			img, video {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				max-height: 100%;
				max-width: 100%;
				object-fit: contain
			}
		}
	}
}

</style>