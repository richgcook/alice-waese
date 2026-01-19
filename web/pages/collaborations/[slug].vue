<template>
	<div class="collaboration">
		<h1 class="title">{{ data.collaboration.titleFormatted ? data.collaboration.titleFormatted : data.collaboration.title }}</h1>
		<MasonryLayout :items="data.collaboration.pageBuilder" context="collaboration" v-if="data.collaboration.pageBuilder?.length" />
		<div class="description" v-if="data.collaboration.descriptionText?.length">
			<RichText :blocks="data.collaboration.descriptionText" />
		</div>
	</div>
</template>

<script setup>

import { useIllustrationPoolStore } from '~/store/illustrationPool'
 
const { $seoQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const useIllustrationPool = useIllustrationPoolStore()
const route = useRoute()

const query = groq`{ 

	"collaboration": *[_type == "collaboration" && slug.current == $slug] {
		_id, _type, slug, title, titleFormatted, seo {
			${$seoQuery}
		},
		pageBuilder[] {
			image {
				${$imageQuery}
			},
			imageHoverState {
				${$imageQuery}
			},
			"video": video.asset->url,
		},
		descriptionText[] {
			${$richTextQuery},
		},	
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
	slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.collaboration)

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

const { count: illustrationCount } = useIllustrationCountByItems(data?.value.collaboration.pageBuilder, {
	oneAbove: 0,
	twoAbove: 8,
})

const names = ref([])

watch(
	[() => route.fullPath, illustrationCount],
	([id, count]) => { names.value = useIllustrationPool.assign(id, count) },
	{ immediate: true }
)

</script>

<style lang="scss" scoped>

h1.title {
	position: fixed;
	top: 0;
	left: 50%;
    transform: translateX(-50%);
	width: calc(100% - (100px * 2));
	padding-top: 25px;
	z-index: 1;
	font-size: clamp(48px, 6.9vw, 100px);
	line-height: 1em;
	letter-spacing: -0.03em;
	text-align: center;
	white-space: pre-wrap;
	@include media('phone') {
		width: calc(100% - (35px * 2));
		white-space: normal;
	}
}

</style>