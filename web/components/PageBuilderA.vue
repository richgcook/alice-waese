<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<div v-if="useBlockType(block._type) == 'text'" :data-settings-columns="block.settings?.textColumnCount">
				<RichText :blocks="block.text" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'image'">
				<ImgWithRatio 
					:src="block.image.asset.url" 
					:sizes="`(max-width: 768px) 100vw, 50vw`"
					:alt="block.image.alt" 
					:ratio="block.image.asset.ratio"
					@click="imageClick(flattenedMediaContent.find(item => item.image?.asset?._id === block.image.asset._id)?.index)"
				/>
				<div class="caption" v-if="block.caption?.length">
					<RichText :blocks="block.caption" />
				</div>
			</div>

			<div v-else-if="useBlockType(block._type) == 'images' && block.images?.length">
				<div class="grid">
					<div v-for="(item, index) in block.images" :key="index" class="item">
						<ImgWithRatio 
							:src="item.image.asset.url" 
							:sizes="`(max-width: 768px) 100vw, 50vw`"
							:alt="item.image.alt" 
							:ratio="item.image.asset.ratio"
							@click="imageClick(flattenedMediaContent.find(image => image.image?.asset?._id === item.image.asset._id)?.index)"
						/>
						<div class="caption" v-if="item.caption?.length">
							<RichText :blocks="item.caption" />
						</div>
					</div>
				</div>
			</div>

			<div v-else-if="useBlockType(block._type) == 'embed'">
				<VideoEmbed :poster="block.coverImage" :html="block.embedCode" />
				<div class="caption" v-if="block.caption?.length">
					<RichText :blocks="block.caption" />
				</div>
			</div>

			<div v-else-if="useBlockType(block._type) == 'video'">
				<video playsinline loop muted autoplay @click="imageClick(flattenedMediaContent.find(item => item.video?._id === block.video._id)?.index)">
					<source :src="block.video.url" type="video/mp4">
				</video>
				<div class="caption" v-if="block.caption?.length">
					<RichText :blocks="block.caption" />
				</div>
			</div>

		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	content: Array,
	flattenedMediaContent: Array,
})

const emit = defineEmits()

const imageClick = (index) => {
	emit('sliderLightboxGoTo', index)
}

</script>

<style lang="scss" scoped>

div.blocks-layout {
	display: flex;
	flex-flow: column nowrap;
	row-gap: calc(var(--padding-base) * 2);
	> div.block {
		&[data-type="text"] {
			width: calc((50 / 75) * 100%);
			margin: 0 auto;
			> div[data-settings-columns="2"] {
				column-count: 2;
				column-gap: calc(var(--padding-base) * 2);
			}
		}
		&[data-type="image"] {
			width: calc((65 / 75) * 100%);
			margin: 0 auto;
			> div {
				display: flex;
				flex-flow: column nowrap;
				row-gap: 10px;
				:deep(div.image) {
					cursor: pointer;
				}
				div.caption {
					font-size: 12px;
				}
			}
		}
		&[data-type="images"] {
			width: calc((65 / 75) * 100%);
			margin: 0 auto;
			div.grid {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: var(--padding-base);
				div.item {
					display: flex;
					flex-flow: column nowrap;
					row-gap: 10px;
					:deep(div.image) {
						cursor: pointer;
					}
					div.caption {
						font-size: 12px;
					}
				}
			}
		}
		&[data-type="embed"] {
			width: calc((65 / 75) * 100%);
			margin: 0 auto;
			> div {
				display: flex;
				flex-flow: column nowrap;
				row-gap: 10px;
				div.caption {
					font-size: 12px;
				}
			}
		}
		&[data-type="video"] {
			width: calc((65 / 75) * 100%);
			margin: 0 auto;
			> div {
				display: flex;
				flex-flow: column nowrap;
				row-gap: 10px;
				video {
					cursor: pointer;
				}
				div.caption {
					font-size: 12px;
				}
			}
		}
	}
}

</style>