<template>
	<div>
		<div class="titles">
			<h1 class="title">{{ data.project.title }}<span v-if="data.project.numeralArabic">{{ useConvertToArabicNumerals(data.project.numeralArabic) }}</span></h1>
			<h2 class="subtitle" v-if="data.project.subtitle">{{ data.project.subtitle }}</h2>
		</div>
		<PageBuilderA :content="data.project.pageBuilder" :flattenedMediaContent="flattenedMediaContent" v-if="data.project.pageBuilder?.length" @sliderLightboxGoTo="sliderLightboxGoTo" />
		<SliderA :slides="flattenedMediaContent" :currentSliderLightboxIndex="currentSliderLightboxIndex" v-show="sliderLightboxOpen" @close="closeSliderLightbox" v-if="flattenedMediaContent?.length" />
	</div>
</template>

<script setup>

const { $projectItemQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"project": *[_type == "project" && slug.current == $slug] {
		${$projectItemQuery}
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.project)

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

const flattenedMediaContent = computed(() => {
	let index = 0
	if (!data?.value.project?.pageBuilder?.length) return []
	return data?.value.project.pageBuilder.flatMap(block => {
    	if (useBlockType(block._type) === 'image' && block.image?.asset) {
      		return [{ image: block.image, caption: block.caption, index: index++ }]
    	}
    	if (useBlockType(block._type) === 'images' && block.images?.length) {
      		return block.images.map(image => ({ image: image.image, caption: image.caption, index: index++ }))
    	}
		if (useBlockType(block._type) === 'video' && block.video?._id) {
	  		return [{ video: block.video, caption: block.caption, index: index++ }]
		}
    	return []
  	})
})

const sliderLightboxOpen = ref(false)
const currentSliderLightboxIndex = ref(0)

const sliderLightboxGoTo = (index) => {
	currentSliderLightboxIndex.value = index
	sliderLightboxOpen.value = true
}

const closeSliderLightbox = () => {
	sliderLightboxOpen.value = false
}

</script>

<style lang="scss" scoped>

div.titles {
	display: flex;
	flex-flow: column nowrap;
	row-gap: 10px;
	text-align: center;
	margin-bottom: var(--padding-base);
	h1 {
		font-size: 30px;
		font-weight: 700;
		display: flex;
		column-gap: 1ch;
		justify-content: center;
		span {
			font-family: var(--font-arabic);
			font-size: 1.35em; // 25px
			line-height: 1;
		}
	}
}

</style>