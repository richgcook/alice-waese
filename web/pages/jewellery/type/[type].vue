<template>
	<WaterfallLayout :items="data.type.jewellery" v-if="data.type.jewellery?.length" />
</template>

<script setup>
 
const { $seoQuery, $productQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"type": *[_type == "productCategory" && slug.current == $type] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		"jewellery": pageBuilder[] {
			"item": product->{
				${$productQuery},
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

</script>