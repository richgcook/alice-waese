<template>
	<VueLenis root :options="lenisOptions">
		<div class="collection-layout">
			<h1 class="collection-title">{{ data.collection.titleFull ? data.collection.titleFull : data.collection.title }}</h1>
			<MasonryLayout :items="data.collection.jewellery" context="collections" v-if="data.collection.jewellery?.length" />
			<div class="collection-description" v-if="data.collection.descriptionText?.length">
				<RichText :blocks="data.collection.descriptionText" />
			</div>
		</div>
		<div class="collection-layout --clone">
			<h1 class="collection-title">{{ data.collection.titleFull ? data.collection.titleFull : data.collection.title }}</h1>
			<MasonryLayout :items="data.collection.jewellery" context="collections" v-if="data.collection.jewellery?.length" />
			<div class="collection-description" v-if="data.collection.descriptionText?.length">
				<RichText :blocks="data.collection.descriptionText" />
			</div>
		</div>
		<RandomIllustrationMark />
	</VueLenis>
</template>

<script setup>

import { VueLenis, useLenis } from 'lenis/vue'
 
const { $seoQuery, $productQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"collection": *[_type == "productCollection" && slug.current == $slug] {
		_id, _type, slug, title, titleFull, seo {
			${$seoQuery}
		},
		"jewellery": pageBuilder[] {
			"item": product->{
				${$productQuery},
			},
			mediaOverride {
				image {
					${$imageQuery}
				},
				imageHoverState {
					${$imageQuery}
				},
				"video": video.asset->url,
			},
			settings,
		},
		descriptionText[] {
			${$richTextQuery},
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
	slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.collection)

useHead({
	title: title.value,
	meta: useSeoFields({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

const lenisOptions = {
	//smoothWheel: true,
	//smoothTouch: true,
	infinite: true,
	autoRaf: true,
}

const lenis = useLenis()

onMounted(() => {
	
})

</script>

<style lang="scss" scoped>

div.collection-layout {
	position: relative;
	&.--clone {
		position: relative;
		overflow: hidden;
  		height: 100vh;
		@supports (height: 100dvh) {
			height: 100dvh;
		}
	}
}
h1.collection-title {
	position: absolute;
	top: 25px;
	left: 50%;
    transform: translateX(-50%);
	width: calc(100% - (100px * 2));
	z-index: 1;
	font-size: clamp(48px, 6.9vw, 100px);
	line-height: 1.2em;
	letter-spacing: -0.03em;
	text-align: center;
	@include media('phone') {
		width: calc(100% - (35px * 2));
	}
}
div.collection-description {
	display: grid;
	grid-template-columns: repeat(21, 1fr);
	gap: 0 20px;
	padding: 0 50px;
	padding: 130px 50px 250px 50px; /* + 120px from the waterfall layout = 250px as per design */
	padding-top: 14.44vh; /* ((130 distance / 900 viewport height) * 100) */
	padding-bottom: 27.78vh; /* ((250 distance / 900 viewport height) * 100) */
	font-family: var(--font-body);
	font-weight: 300;
	font-size: var(--font-size-sm);
	line-height: 2.06em;
	@include media('phone') {
		grid-template-columns: 1fr;
		padding: 0 35px 120px 35px;
	}
	:deep(div.text) {
		grid-column: 8 / span 7;
		max-width: 400px;
    	margin: 0 auto;
		@include media('phone') {
			grid-column: 1 / -1;
		}
	}
}

</style>