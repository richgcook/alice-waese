<template>
	<div class="collection-layout">
		<h1 class="collection-title">{{ data.collection.titleFull ? data.collection.titleFull : data.collection.title }}</h1>
		<MasonryLayout :items="data.collection.jewellery" v-if="data.collection.jewellery?.length" />
		<div class="collection-description" v-if="data.collection.descriptionText?.length">
			<RichText :blocks="data.collection.descriptionText" />
		</div>
	</div>
</template>

<script setup>
 
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

</script>

<style lang="scss" scoped>

h1.collection-title {
	position: absolute;
	top: 25px;
	left: 50%;
    transform: translateX(-50%);
	width: calc(100% - (100px * 2));
	z-index: 1;
	font-size: clamp(48px, 6.9vw, 100px);
	line-height: 1.2em;
	letter-spacing: 0.03em;
	text-align: center;
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
	font-size: 10px;
	line-height: 2.06em;
	:deep(div.text) {
		grid-column: 8 / span 7;
		max-width: 400px;
    	margin: 0 auto;
	}
}

</style>