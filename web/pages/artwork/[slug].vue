<template>
	<MediaLayoutA :media="data.artwork.media" :context="data.artwork" v-if="data.artwork.media?.length" />
</template>

<script setup>

const { $artworkQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"artwork": *[_type == "artwork" && slug.current == $slug] {
		${$artworkQuery}
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.artwork)

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



</style>