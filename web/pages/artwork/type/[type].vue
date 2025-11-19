<template>
	<div class="page-layout">
		<MasonryLayout :items="data.type.artworks" v-if="data.type.artworks?.length" />
		<RandomIllustrationMark 
			v-for="i in illustrationCount"
      		:key="i"
			:top="illustrationCount === 2 ? (i === 2 ? { min: 70, max: 90 } : { min: 30, max: 50 }) : undefined"
      		:side="i === 2 ? 'left' : 'right'" 
		/>
	</div>
</template>

<script setup>

import { useIllustrationPoolStore } from '~/store/illustrationPool'
 
const { $seoQuery, $artworkQuery, $imageQuery } = useNuxtApp()

const useIllustrationPool = useIllustrationPoolStore()
const route = useRoute()

const query = groq`{ 

	"type": *[_type == "artworkCategory" && slug.current == $type] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		"artworks": pageBuilder[] {
			"item": artwork->{
				${$artworkQuery},
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
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
	type: route.params.type,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.type)

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

const { count: illustrationCount } = useIllustrationCountByItems(data?.value.type.artworks, {
	oneAbove: 5,
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

div.page-layout {
	position: relative;
}

</style>