<template>
	<div class="collections">

		<!--<VueLenis root :options="lenisOptions">-->

			<div class="collection-layout">
				<h1 class="collection-title">{{ data.collection.titleFull ? data.collection.titleFull : data.collection.title }}</h1>
				<MasonryLayout :items="data.collection.jewellery" context="collections" v-if="data.collection.jewellery?.length" />
				<div class="collection-description" v-if="data.collection.descriptionText?.length">
					<RichText :blocks="data.collection.descriptionText" />
				</div>

				<RandomIllustrationMark 
					v-for="(name, index) in names"
					:key="name"
					:name="name"
					:top="names === 2 ? (index === 2 ? { min: 70, max: 90 } : { min: 30, max: 50 }) : undefined"
					:side="index === 1 ? 'left' : 'right'" 
				/>

			</div>

			<!--
			<div class="collection-layout --clone">
				<h1 class="collection-title">{{ data.collection.titleFull ? data.collection.titleFull : data.collection.title }}</h1>
				<MasonryLayout :items="data.collection.jewellery" context="collections" v-if="data.collection.jewellery?.length" />
				<div class="collection-description" v-if="data.collection.descriptionText?.length">
					<RichText :blocks="data.collection.descriptionText" />
				</div>
			</div>
			-->
			
			<div class="collection-layout" v-for="collection in data.otherCollections" :key="collection._id">
				<h1 class="collection-title">{{ collection.titleFull ? collection.titleFull : collection.title }}</h1>
				<MasonryLayout :items="collection.jewellery" context="collections" v-if="collection.jewellery?.length" />
				<div class="collection-description" v-if="collection.descriptionText?.length">
					<RichText :blocks="collection.descriptionText" />
				</div>
			</div>

		<!--</VueLenis>-->

	</div>
</template>

<script setup>

import { useIllustrationPoolStore } from '~/store/illustrationPool'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

//import { VueLenis, useLenis } from 'lenis/vue'
 
const { $seoQuery, $productQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const useIllustrationPool = useIllustrationPoolStore()
const route = useRoute()

const query = groq`{ 

	"collection": *[_type == "productCollection" && slug.current == $slug] {
		_id, _type, slug, title, titleFull, seo {
			${$seoQuery}
		},
		"jewellery": pageBuilder[] {
			"item": product->{
				${$productQuery},
			},
			mediaOverride {
				image {
					${$imageQuery}
				},
				imageHoverState {
					${$imageQuery}
				},
				"video": video.asset->url,
			},
			settings,
		},
		descriptionText[] {
			${$richTextQuery},
		},
	}[0],

	"otherCollections": *[_type == "productCollection" && _id != *[_type == "productCollection" && slug.current == $slug][0]._id] | order(orderRank) {
    	_id, _type, slug, title, titleFull, seo {
			${$seoQuery}
		},
		"jewellery": pageBuilder[] {
			"item": product->{
				${$productQuery},
			},
			mediaOverride {
				image {
					${$imageQuery}
				},
				imageHoverState {
					${$imageQuery}
				},
				"video": video.asset->url,
			},
			settings,
		},
		descriptionText[] {
			${$richTextQuery},
		},
  	},
	
}`

const { data } = await useSanityQuery(query, { 
	slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.collection)

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

const { count: illustrationCount } = useIllustrationCountByItems(data?.value.collection.jewellery, {
	oneAbove: 5,
	twoAbove: 8,
})

const names = ref([])

watch(
	[() => route.fullPath, illustrationCount],
	([id, count]) => { names.value = useIllustrationPool.assign(id, count) },
	{ immediate: true }
)

const lenisOptions = {
	//smoothWheel: true,
	//smoothTouch: true,
	infinite: true,
	autoRaf: true,
}

//const lenis = useLenis()

gsap.registerPlugin(ScrollTrigger)

const triggers = []

onMounted(() => {

	gsap.utils.toArray('h1.collection-title').forEach((title, index) => {

		if (index === 0) {
			//gsap.set(title, { opacity: 1 })
			//return
		}

		const show = () => gsap.to(title, { opacity: 1, duration: 0.3, overwrite: 'auto' })
        const hide = () => gsap.to(title, { opacity: 0, duration: 0.25, overwrite: 'auto' })

		const st = ScrollTrigger.create({
			trigger: title,
			start: 'top center',
			onEnter: show,
			onEnterBack: show,
			onLeave: hide,
			onLeaveBack: hide,
			markers: true,
        })

		triggers.push(st)

	})

})

onBeforeUnmount(() => {
	triggers.forEach(t => t.kill())
})

</script>

<style lang="scss" scoped>

div.collections {
	display: flex;
	flex-flow: column nowrap;
	row-gap: 250px;
	row-gap: 27.78vh; 
	position: relative;
	@include media('phone') {
		row-gap: 150px;
		row-gap: 20.5vh;
	}
}
div.collection-layout {
	position: relative;
	&.--clone {
		position: relative;
		overflow: hidden;
  		height: 100vh;
		@supports (height: 100dvh) {
			height: 100dvh;
		}
	}
}
h1.collection-title {
	position: absolute;
	top: 0;
	left: 50%;
    transform: translateX(-50%);
	width: calc(100% - (100px * 2));
	padding-top: 25px;
	z-index: 1;
	font-size: clamp(48px, 6.9vw, 100px);
	line-height: 1.2em;
	letter-spacing: -0.03em;
	text-align: center;
	opacity: 0;
	@include media('phone') {
		width: calc(100% - (35px * 2));
	}
}
div.collection-description {
	display: grid;
	grid-template-columns: repeat(21, 1fr);
	gap: 0 20px;
	padding: 0 50px;
	padding: 130px 50px 250px 50px; /* + 120px from the waterfall layout = 250px as per design */
	padding-top: 14.44vh; /* ((130 distance / 900 viewport height) * 100) */
	padding-bottom: 27.78vh; /* ((250 distance / 900 viewport height) * 100) */
	font-family: var(--font-body);
	font-weight: 300;
	font-size: var(--font-size-sm);
	line-height: 2.06em;
	@include media('phone') {
		grid-template-columns: 1fr;
		padding: 0 35px 120px 35px;
	}
	:deep(div.text) {
		grid-column: 8 / span 7;
		max-width: 400px;
    	margin: 0 auto;
		@include media('phone') {
			grid-column: 1 / -1;
		}
	}
}

</style>