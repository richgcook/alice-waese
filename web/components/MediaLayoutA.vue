<template>
	<div class="media-layout" :data-layout="media[0].image?.asset?.orientation">
		<div class="media">
			<div v-for="(item, index) in media" :key="index" class="item" :data-orientation="item?.image?.asset?.orientation">
				<template v-if="useBlockType(item._type) == 'image'">
					<div class="image-block">
						<Img 
							:src="item.image.asset.url" 
							:alt="item.image.alt" 
							:ratio="item.image.asset.ratio"
							v-if="item.image?.asset"
						/>
					</div>
				</template>
			</div>
		</div>
		<div class="caption" :class="{ '--has-text': context.description?.length }">
			<h3 class="title">{{ context.title }}</h3>
			<RichText :blocks="context.description" v-if="context.description?.length" />
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
	display: grid;
	grid-template-columns: repeat(28, 1fr);
	column-gap: 20px;
	position: relative;
	&[data-layout="portrait"] {
		div.media {
			grid-column: 1 / span 16;
		}
		div.caption {
			grid-column: span 12;
		}
	}
	&[data-layout="landscape"] {
		div.media {
			grid-column: 1 / span 21;
		}
		div.caption {
			grid-column: span 7;
		}
	}
	div.media {
		div.item {
			position: sticky;
			top: 0;
			min-height: 100vh;
			@supports (min-height: 100dvh) {
				min-height: 100dvh;
			}
			div.image-block {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				img {
					position: absolute;
					inset: 0;
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			}
		}
	}
	div.caption {
		align-self: flex-start;
		position: sticky;
    	top: 0;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: 1.5em;
		align-items: flex-end;
		align-content: flex-end;
		padding-bottom: 50px;
		font-size: 12px;
		height: 100vh;
		@supports (height: 100dvh) {
			height: 100dvh;
		}
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

</style>