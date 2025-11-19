<template>
	<MediaLayoutA :media="data.product.media" :context="data.product" v-if="data.product.media?.length" />
</template>

<script setup>

const { $productQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"product": *[_type == "product" && slug.current == $slug] {
		${$productQuery}
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.product)

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