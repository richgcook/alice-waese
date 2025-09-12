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
 
const { $seoQuery, $artworkQuery } = useNuxtApp()

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
	oneAbove: 8,
	twoAbove: 30,
})

</script>

<style lang="scss" scoped>

div.page-layout {
	position: relative;
}

</style>