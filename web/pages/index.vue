<template>
	<div>
		<div
			class="landing" 
			@click.once="hideLandingHandler" 
			@touchstart.once="hideLandingHandler" 
			@wheel.once="hideLandingHandler"
			ref="landing" 
			v-if="(landingLandscapeSrc || landingPortraitSrc || data.homePage.landing?.video) && !homeStore.isLandingHidden"
		>
			<video playsinline autoplay loop muted ref="landingVideo" v-if="data.homePage.landing.video">
				<source :src="data.homePage.landing.video" type="video/mp4">
			</video>
			<div class="landing-image" ref="landingImage">
				<NuxtImg 
					v-if="landingLandscapeSrc"
					:src="landingLandscapeSrc" 
					:alt="landingImageAlt"
					sizes="100vw tablet-portrait:100vw"
					loading="eager"
					preload
					data-orientation="landscape"
				/>
				<NuxtImg 
					v-if="landingPortraitSrc"
					:src="landingPortraitSrc" 
					:alt="landingImageAlt"
					sizes="100vw tablet-portrait:100vw"
					loading="eager"
					preload
					data-orientation="portrait"
				/>
			</div>
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

const { $seoQuery, $imageQuery, $internalLinkQuery, $responsiveImageQuery } = useNuxtApp()

const query = groq`{ 

	"homePage": *[_type == "homePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		landing {
			image {
				${$responsiveImageQuery}
			},
			"video": video.asset->url,
		},
		content[] {
			_type,
			_type == "imageBlock" => {
				image {
					${$responsiveImageQuery}
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

const landingResponsiveImage = computed(() => data.value?.homePage?.landing?.image || null)

const { landscapeSrc: landingLandscapeSrc, portraitSrc: landingPortraitSrc, alt: landingImageAlt } = useResponsiveImage(landingResponsiveImage)

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
const landingImage = useTemplateRef('landingImage')
const landingVideo = useTemplateRef('landingVideo')
const landingImageLandscape = useTemplateRef('landingImageLandscape')
const landingImagePortrait = useTemplateRef('landingImagePortrait')
const landingLogoSeed = useTemplateRef('landingLogoSeed')
const landingUnderlay = useTemplateRef('landingUnderlay')

const landingIsHidden = ref(false)

let landingTimeline = null

const hideLandingHandler = () => {
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
	const mediaEl = landingVideo.value || landingImage.value
	if (!mediaEl) return
	landingTimeline.to(mediaEl, {
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
	div.landing-image {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		opacity: 0;
		img, video {
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
			object-fit: cover;
			object-position: center;
			@include orientation-visibility;
		}
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