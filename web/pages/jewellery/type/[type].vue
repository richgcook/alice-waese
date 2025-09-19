<template>
	<div class="page-layout">
		<MasonryLayout :items="data.type.jewellery" v-if="data.type.jewellery?.length" />
    	<RandomIllustrationMark 
			v-for="(name, index) in names"
      		:key="name"
			:name="name"
			:top="names === 2 ? (index === 2 ? { min: 70, max: 90 } : { min: 30, max: 50 }) : undefined"
      		:side="index === 1 ? 'left' : 'right'" 
		/>
	</div>
</template>

<script setup>

import { useIllustrationPoolStore } from '~/store/illustrationPool'

const { $seoQuery, $productQuery } = useNuxtApp()

const useIllustrationPool = useIllustrationPoolStore()
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

const { count: illustrationCount } = useIllustrationCountByItems(data?.value.type.jewellery, {
	oneAbove: 5,
	twoAbove: 8,
})

const names = ref([])

watch(
	[() => route.fullPath, illustrationCount],
	([id, count]) => { names.value = useIllustrationPool.assign(id, count) },
	{ immediate: true }
)

</script>

<style lang="scss" scoped>

div.page-layout {
	position: relative;
}

</style>