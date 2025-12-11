<template>
	<div>
		<div class="landing" 
			@click.once="hideLandingHandler" 
			@touchstart.once="hideLandingHandler" 
			@wheel.once="hideLandingHandler"
			ref="landing" 
			v-if="(data.homePage.landing?.image?.asset || data.homePage.landing?.video) && !homeStore.isLandingHidden"
		>
			<video playsinline autoplay loop muted ref="landingVideo" v-if="data.homePage.landing.video">
				<source :src="data.homePage.landing.video" type="video/mp4">
			</video>
			<NuxtImg 
				:src="data.homePage.landing.image.assetRef" 
				:alt="data.homePage.landing.image.alt"
				sizes="100vw tablet-portrait:100vw"
				loading="eager"
				preload
				ref="landingImage"
				v-else-if="data.homePage.landing.image?.asset"
			/>
			<LogoSeed class="logo" ref="landingLogoSeed" />
			<div class="underlay" ref="landingUnderlay"></div>
		</div>
		<SliderHome 
			:slides="data.homePage.content" 
			:startPlaying="landingIsHidden"
			v-if="data.homePage.content?.length" 
		/>
	</div>
</template>

<script setup>

import { useHomeStore } from '~/store/home'
import { gsap } from 'gsap'

const { $seoQuery, $imageQuery, $internalLinkQuery } = useNuxtApp()

const query = groq`{ 

	"homePage": *[_type == "homePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		landing {
			image {
				${$imageQuery}
			},
			"video": video.asset->url,
		},
		content[] {
			_type,
			_type == "imageBlock" => {
				image {
					${$imageQuery}
				},
				link {
					"internal": internal.page->{
						${$internalLinkQuery}
					},
					"external": external.url,
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

const homeStore = useHomeStore()

const landing = useTemplateRef('landing')
const landingVideo = useTemplateRef('landingVideo')
const landingImage = useTemplateRef('landingImage')
const landingLogoSeed = useTemplateRef('landingLogoSeed')
const landingUnderlay = useTemplateRef('landingUnderlay')

const landingIsHidden = ref(false)

let landingTimeline = null

const hideLandingHandler = () => {
	console.log('hideLandingHandler')
	gsap.timeline()
	.to(landingLogoSeed.value.$el, {
		opacity: 0,
		duration: 1,
		ease: 'power2.inOut',
	})
	.to(landing.value, {
		transform: 'translateY(-100%)',
		duration: 1.2,
		ease: 'power2.inOut'
	})
	.to(landingUnderlay.value, {
		opacity: 0,
		duration: 1.5,
		onComplete: () => {
			landingIsHidden.value = true
		}
	}, '<0.5')
}

onMounted(() => {
	landingTimeline = gsap.timeline()
	landingTimeline.to(landingVideo.value || landingImage.value.$el, {
		opacity: 1,
		duration: 1,
		ease: 'power2.inOut'
	})
	.to(landingLogoSeed.value.$el, {
		opacity: 1,
		duration: 1,
		ease: 'power2.inOut'
	})
})

</script>

<style lang="scss" scoped>

div.landing {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 30;
	background-color: black;
	img, video {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
		opacity: 0;
	}
	svg.logo {
		position: absolute;
		bottom: 50px;
		left: 50%;
		transform: translateX(-50%);
		height: auto;
		width: 9vw;
		max-width: 175px;
		fill: var(--color-bg);
		opacity: 0;
		@include media('phone') {
			width: 100px;
		}
	}
	div.underlay {
		position: absolute;
		inset: 0;
		background-color: black;
		transform: translateY(100%);
	}
}

</style>