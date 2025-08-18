<template>
	<div class="page-layout">
		<div class="content">
			<div v-for="(block, index) in data.pageA.content" :key="index">
				<template v-if="useBlockType(block._type) === 'text'">
					<RichText :blocks="block.text" />
				</template>
			</div>
		</div>
		<div class="extra" v-if="data.pageA.colophon?.length">
			<RichText :blocks="data.pageA.colophon" />
		</div>
		<RandomIllustrationMark :top="{ min: 30, max: 65 }" :topUnit="`vh`" />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"pageA": *[_type == "pageA" && slug.current == $slug] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		content[] {
			_type,
			_type == "textBlock" => {
				text[] {
					${$richTextQuery}
				},
			},
		},
		colophon[] {
			${$richTextQuery},
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.pageA)

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

div.page-layout {
	display: grid;
	grid-template-columns: repeat(21, 1fr);
	gap: 0 20px;
	padding: 0 50px;
	margin: 62px auto 120px auto;
	font-family: var(--font-body);
	font-weight: 300;
	font-size: 10px;
	line-height: 2.06em;
	position: relative;
	div.content {
		grid-column: 8 / span 7;
	}
	div.extra {
		@include max-width-grid-columns(21, 4, '20px', 'width');
		position: fixed;
		bottom: 50px;
		right: 50px;
	}
}

</style>