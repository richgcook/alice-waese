<template>
	<div class="video-embed" :class="{ '--has-poster': poster }">
		<div class="poster" v-show="!playInitiated" v-if="poster">
			<Img :src="poster.asset.url" :alt="poster.alt" />
			<button @click="playInitiated = true"><SymbolPlay /></button>
		</div>
		<div class="embed" ref="embed" v-show="!poster || playInitiated">
			<div v-html="html" ref="embedHtml"></div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	poster: Object,
	html: String,
})

const embed = ref(null)
const embedHtml = ref(null)

const playInitiated = ref(false)

const embedAspectRatio = () => {
	const iframe = embed.value.querySelector('iframe')
	const iframeHeight = iframe.getAttribute('height')
	const iframeWidth = iframe.getAttribute('width')
	if (window.CSS && CSS.supports && CSS.supports('aspect-ratio: 16/9')) {
    	embed.value.style.aspectRatio = `${iframeWidth} / ${iframeHeight}`;
	} else {
    	embed.value.style.paddingBottom = `${(iframeHeight / iframeWidth) * 100}%`;
	}
}

onMounted(() => {
	embedAspectRatio()
})

</script>

<style scoped lang="scss">

div.video-embed {
	div.poster {
		position: relative;
		@supports (aspect-ratio: 1 / 1) {
			aspect-ratio: 16 / 9;
		}
		@supports not (aspect-ratio: 1 / 1) {
			padding-bottom: calc(9 / 16 * 100%);
		}
		overflow: hidden;
		&:after {
			content: '';
			display: block;
			height: 100%;
			width: 100%;
			position: absolute;
			inset: 0;
			background-color: rgba(0, 0, 0, 0.3);
		}
		img {
			object-fit: cover;
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
		}
		button {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			//background-color: white;
			border-radius: 50%;
			height: 70px;
			width: 49px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;
			@include media('phone') {
				height: 50px;
				width: 50px;
			}
			&:hover {
				svg {
					transform: translate(-50%, -50%) scale(1.05);
				}
			}
			svg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				display: block;
				height: 70px;
				width: 49px;
				fill: white;
				transition: transform 500ms;
			}
		}
	}
	div.embed {
		position: relative;
		:deep(iframe) {
			width: 100%;
			&[src*="youtube.com"],
			&[src*="vimeo.com"] {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
	}
}

</style>