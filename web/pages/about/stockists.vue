<template>
	<StaggeredList :items="data.stockistsPage?.stockists" />
</template>

<script setup>

const { $seoQuery } = useNuxtApp()

const query = groq`{

	"stockistsPage": *[_type == "stockistsPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		stockists[] {
			name, other, link,
		}
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.stockistsPage)

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