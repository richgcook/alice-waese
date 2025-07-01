<template>
	<div class="contact-details">
		<RichText :blocks="data.contactPage.details" />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery } = useNuxtApp()

const query = groq`{ 

	"contactPage": *[_type == "contactPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		details[] {
			${$richTextQuery},
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.contactPage)

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

div.contact-details {
	width: calc((50 / 75) * 100%);
	margin: 0 auto;
}

</style>