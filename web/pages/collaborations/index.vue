<template>
	<div class="collaborations">
		<ul v-if="data.collaborations?.length">
			<li v-for="collaboration in data.collaborations" :key="collaboration._id">
				<NuxtLink :to="useInternalLinkUrl(collaboration)">{{ collaboration.title }}</NuxtLink>	
			</li>
		</ul>
	</div>
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
    	_id, _type, slug, title, seo {
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
		padding: 0 35px;
	}
	ul {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		row-gap: 6em;
		min-height: calc(100vh - (120px * 2));
		@supports (min-height: 100dvh) {
			min-height: calc(100dvh - (120px * 2));
		}
		div.init-group {
			margin: auto 0;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			row-gap: 6em;
			@include media('phone') {
				row-gap: 2em;
			}
		}
		li {
			font-size: clamp(48px, 6.9vw, 100px);
			line-height: 1em;
			letter-spacing: -0.03em;
			text-align: center;
			a:hover {
				color: var(--color-gold);
			}
		}
	}
}

</style>