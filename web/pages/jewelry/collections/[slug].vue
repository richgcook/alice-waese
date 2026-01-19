<template>
	<VueLenis root :options="lenisOptions">
		<div class="collections">

			<h1 v-for="(collection, i) in allCollections" :key="collection._id" class="collection-title" :class="{ '--active': activeIndex === i }">
				{{ collection?.titleFormatted ? collection.titleFormatted : collection?.title }}
			</h1>

			<div class="collection-layout">
				<MasonryLayout :items="data.collection.jewelry" context="collections" v-if="data.collection.jewelry?.length" />
				<div class="collection-description" v-if="data.collection.descriptionText?.length">
					<RichText :blocks="data.collection.descriptionText" />
				</div>
			</div>
			
			<div class="collection-layout" v-for="collection in data.otherCollections" :key="collection._id">
				<MasonryLayout :items="collection.jewelry" context="collections" v-if="collection.jewelry?.length" />
				<div class="collection-description" v-if="collection.descriptionText?.length">
					<RichText :blocks="collection.descriptionText" />
				</div>
			</div>

		</div>
		<div class="collections --clone">

			<h1 v-for="(collection, i) in allCollections" :key="collection._id" class="collection-title" :class="{ '--active': activeIndex === i }">
				{{ collection?.titleFormatted ? collection.titleFormatted : collection?.title }}
			</h1>

			<div class="collection-layout">
				<MasonryLayout :items="data.collection.jewelry" context="collections" v-if="data.collection.jewelry?.length" />
				<div class="collection-description" v-if="data.collection.descriptionText?.length">
					<RichText :blocks="data.collection.descriptionText" />
				</div>
			</div>
			
			<div class="collection-layout" v-for="collection in data.otherCollections" :key="collection._id">
				<MasonryLayout :items="collection.jewelry" context="collections" v-if="collection.jewelry?.length" />
				<div class="collection-description" v-if="collection.descriptionText?.length">
					<RichText :blocks="collection.descriptionText" />
				</div>
			</div>

		</div>
	</VueLenis>
</template>

<script setup>

import { useIllustrationPoolStore } from '~/store/illustrationPool'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { VueLenis, useLenis } from 'lenis/vue'
 
const { $seoQuery, $productQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const useIllustrationPool = useIllustrationPoolStore()
const route = useRoute()

const query = groq`{ 

	"collection": *[_type == "productCollection" && slug.current == $slug] {
		_id, _type, slug, title, titleFormatted, seo {
			${$seoQuery}
		},
		"jewelry": pageBuilder[] {
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
    	_id, _type, slug, title, titleFormatted, seo {
			${$seoQuery}
		},
		"jewelry": pageBuilder[] {
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

const allCollections = computed(() => [
	data?.value.collection,
	...(data?.value.otherCollections || [])
])

/*
const { count: illustrationCount } = useIllustrationCountByItems(data?.value.collection.jewelry, {
	oneAbove: 5,
	twoAbove: 8,
})

const names = ref([])

watch(
	[() => route.fullPath, illustrationCount],
	([id, count]) => { names.value = useIllustrationPool.assign(id, count) },
	{ immediate: true }
)
	*/

const lenisOptions = {
	syncTouch: true,
	infinite: true,
	autoRaf: true,
}

const lenis = useLenis()

gsap.registerPlugin(ScrollTrigger)

const activeIndex = ref(0)
const triggers = []

onMounted(() => {

	const sections = gsap.utils.toArray('div.collection-layout')
  	sections.forEach((section, index) => {

		const start = index === 0 ? 'top-=1 top' : 'top center'
		const next  = sections[index + 1] || null

		const st = ScrollTrigger.create({
			id: `title-band-${index}`,
			trigger: section,
			start,
      		endTrigger: next || section,
        	end: next ? 'top-=100 center+=100' : 'bottom top',
			onEnter: () =>  activeIndex.value = index,
			onEnterBack: () => activeIndex.value = index,
			onLeave: () => activeIndex.value = -1,
			onLeaveBack: () => activeIndex.value = -1,
			invalidateOnRefresh: true,
			//markers: true,
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
	&.--clone {
		position: relative;
		overflow: hidden;
  		height: 100vh;
		@supports (height: 100dvh) {
			height: 100dvh;
		}
	}
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
	position: fixed;
	top: 0;
	left: 50%;
    transform: translateX(-50%);
	width: calc(100% - (100px * 2));
	padding-top: 25px;
	z-index: 1;
	font-size: clamp(48px, 6.9vw, 100px);
	line-height: 1em;
	letter-spacing: -0.02em;
	text-align: center;
	white-space: pre-wrap;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.3s ease;
	&.--active {
		opacity: 1;
		transition: opacity 0.6s ease;
	}
	@include media('phone') {
		width: calc(100% - (35px * 2));
		white-space: normal;
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