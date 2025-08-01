<template>
	<SliderHome :slides="data.homePage.content" v-if="data.homePage.content?.length" />
</template>

<script setup>

const { $seoQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"homePage": *[_type == "homePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		content[] {
			_type,
			_type == "imageBlock" => {
				image {
					${$imageQuery}
				},
				settings,
			},
			_type == "videoBlock" => {
				"video": video.asset->url,
				settings,
			},
		}
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.homePage)

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