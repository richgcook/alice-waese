<template>
	<div class="media-layout">
		<div v-for="(item, index) in media" :key="index" class="item" :data-orientation="item?.image?.asset?.orientation">
			<template v-if="useBlockType(item._type) == 'image'">
				<div class="image-block">
					<ImgWithRatio 
						:src="item.image.asset.url" 
						:sizes="`
							(max-width: 768px) 100vw, 
							50vw`"
						:alt="item.image.alt" 
						:ratio="item.image.asset.ratio"
						v-if="item"
					/>
				</div>
			</template>
			<div class="caption" :class="{ '--has-text': item.caption?.length }">
				<h3 class="title">{{ context.title }}</h3>
				<RichText :blocks="item.caption" v-if="item.caption?.length" />
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	media: Array,
	context: Object,
})

</script>

<style lang="scss" scoped>

div.media-layout {
	div.item {
		position: relative;
		//min-height: 100vh;
		//background-color: cyan;
		//outline: 1px solid red;
		display: grid;
		grid-template-columns: repeat(28, 1fr);
		column-gap: 20px;
		//grid-template-columns: minmax(56.04%, 72.92%) auto;
		&[data-orientation="portrait"] {
			//grid-template-columns: minmax(auto, 56.04%) auto;
			div.image-block {
				grid-column: 1 / span 16;
			}
			div.caption {
				grid-column: span 12;
			}
		}
		div.image-block {
			grid-column: 1 / span 21;
		}
		div.caption {
			grid-column: span 7;
			display: grid;
			grid-template-columns: subgrid;
			row-gap: 1.5em;
			align-content: flex-end;
			padding-bottom: 50px;
			font-size: 12px;
			&.--has-text {
				:deep(div.text) {
					grid-column: 3 / -1;
				}
			}
			h3.title {
				grid-column: 2 / -1;
				text-transform: uppercase;
			}
			:deep(div.text) {
				grid-column: 2 / -1;
			}
		}
	}
}

</style>