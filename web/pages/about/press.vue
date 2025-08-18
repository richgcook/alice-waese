<template>
	<StaggeredList :items="data.pressPage?.pressLinks" :layoutVersion="`b`" />
</template>

<script setup>

const { $seoQuery } = useNuxtApp()

const query = groq`{

	"pressPage": *[_type == "pressPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		pressLinks[] {
			name, link,
		}
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.pressPage)

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