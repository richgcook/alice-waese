<template>
	<div class="media-layout" :data-layout="media[0].image?.asset?.orientation">
		<div class="media">
			<div v-for="(item, index) in media" :key="index" class="item" :data-orientation="item?.image?.asset?.orientation">
				<template v-if="useBlockType(item._type) == 'image'">
					<div class="image-block">
						<NuxtImg 
							:src="item.image.assetRef" 
							:alt="item.image.alt"
							sizes="100vw tablet-portrait:80vw"
							loading="eager"
							preload
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
	@include media('phone') {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr auto;
		row-gap: 35px;
		//align-items: end;
		padding: calc(85px + 35px) 0;
		height: 100vh;
		@supports (height: 100dvh) {
			height: 100dvh;
		}
	}
	&[data-layout="portrait"] {
		div.media {
			grid-column: 1 / span 16;
			@include media('phone') {
				grid-column: 1 / -1;
			}
		}
		div.caption {
			grid-column: span 12;
			@include media('phone') {
				grid-column: 1 / -1;
			}
		}
	}
	&[data-layout="landscape"] {
		div.media {
			grid-column: 1 / span 21;
			@include media('phone') {
				grid-column: 1 / -1;
			}
		}
		div.caption {
			grid-column: span 7;
			@include media('phone') {
				grid-column: 1 / -1;
			}
		}
	}
	div.media {
		@include media('phone') {
			//aspect-ratio: 2 / 3;
			position: relative;
			overflow-y: auto;
		}
		div.item {
			position: sticky;
			top: 0;
			min-height: 100vh;
			@supports (min-height: 100dvh) {
				min-height: 100dvh;
			}
			@include media('phone') {
				height: 100%;
				min-height: 0;
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
		row-gap: 1em;
		align-items: flex-end;
		align-content: flex-end;
		padding-bottom: 50px;
		padding-left: 30px;
		height: 100vh;
		@supports (height: 100dvh) {
			height: 100dvh;
		}
		@include media('phone') {
			position: relative;
			height: auto;
			padding: 0 35px;
			//text-align: center;
		}
		&.--has-text {
			@include media('phone') {
				//max-width: 80%;
				//margin: 0 auto;
				text-align: left;
			}
			:deep(div.text) {
				padding-left: 50px;
			}
		}
		h3.title {
			text-transform: uppercase;
		}
	}
}

</style>