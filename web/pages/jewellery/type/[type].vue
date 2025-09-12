<template>
	<div class="page-layout" ref="pageRoot">
		<MasonryLayout :items="data.type.jewellery" v-if="data.type.jewellery?.length" />
    	<RandomIllustrationMark 
			v-for="(n, i) in illustrationCount"
      		:key="i"
			:top="illustrationCount === 2 ? (i === 1 ? { min: 70, max: 90 } : { min: 30, max: 50 }) : undefined"
      		:side="i === 1 ? 'left' : 'right'" 
		/>
	</div>
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

const pageRoot = useTemplateRef('pageRoot')

const { count: illustrationCount } = useIllustrationCount({
	twoVh: 2, // < 200vh → 0
	fourVh: 4, // 200–400vh → 1
	observe: () => pageRoot.value
})

</script>

<style lang="scss" scoped>

div.page-layout {
	position: relative;
}

</style>