<template>
	<StaggeredList :items="data.collaborations" layoutVersion="collaborations" />
</template>

<script setup>
 
const { $seoQuery } = useNuxtApp()

const query = groq`{ 

	"collaborationsPage": *[_type == "collaborationsPage"] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
	}[0],

	"collaborations": *[_type == "collaboration"] | order(orderRank) {
    	_id, _type, slug, title, titleFormatted, seo {
			${$seoQuery}
		},
  	},
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.collaborationsPage)

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

div.collaborations {
	padding: 0 120px;
    margin: 120px 0;
	@include media('phone') {
		padding: 35px;
		margin: 0;
	}
	ul {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		row-gap: 8.5em;
		min-height: calc(100vh - (120px * 2));
		@supports (min-height: 100dvh) {
			min-height: calc(100dvh - (120px * 2));
		}
		@include media('phone') {
			row-gap: 4.5em;
			min-height: calc(100vh - (35px * 2));
			@supports (min-height: 100dvh) {
				min-height: calc(100dvh - (35px * 2));
			}
		}
		li {
			font-size: clamp(48px, 6.9vw, 100px);
			line-height: 1em;
			letter-spacing: -0.03em;
			text-align: center;
			white-space: pre-wrap;
			@supports (text-box: trim-both cap text) {
				text-box: trim-both cap alphabetic;
			}
			@include media('phone') {
				white-space: normal;
			}
			a:hover {
				color: var(--color-gold);
			}
		}
	}
}

</style>