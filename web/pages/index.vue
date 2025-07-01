<template>
	<div>
		<div class="landing" ref="landing">
			<div class="layout" :data-image-size="randomLandingBlock?.settings?.imageSize" :data-video-size="randomLandingBlock?.settings?.videoSize" @click="skipLanding" ref="landingLayout" v-if="randomLandingBlock">
				
				<Img
					:src="randomLandingBlock?.image.asset.url" 
					:alt="randomLandingBlock?.image.alt"
					:loading="`eager`"
					:fetchpriority="`high`"
					v-if="useBlockType(randomLandingBlock?._type) == 'image'"
				/>

				<video playsinline loop muted autoplay v-else-if="useBlockType(randomLandingBlock?._type) == 'video'">
					<source :src="randomLandingBlock.video" type="video/mp4">
				</video>

				<div class="text-block" v-if="useBlockType(randomLandingBlock?._type) == 'text'">
					<RichText :blocks="randomLandingBlock?.text" />
				</div>

				<div class="caption" v-if="randomLandingBlock?.caption?.length">
					<RichText :blocks="randomLandingBlock?.caption" />
				</div>
			</div>
		</div>

		<div class="content" ref="content">
			<div class="news-layout" v-if="data.newsArticles?.length">
				<NewsArticleCard v-for="article in data.newsArticles" :article="article" :key="article._id" />
			</div>
		</div>

	</div>
</template>

<script setup>

import { lock, unlock } from 'tua-body-scroll-lock'
import { gsap } from 'gsap'

const { $seoQuery, $richTextQuery, $imageQuery, $newsArticleQuery } = useNuxtApp()

const query = groq`{ 

	"homePage": *[_type == "homePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		landingContent[] {
			_type,
			_type == "imageBlock" => {
				image {
					${$imageQuery}
				},
				caption[] {
					${$richTextQuery}
				},
				settings,
			},
			_type == "videoBlock" => {
				"video": video.asset->url,
				caption[] {
					${$richTextQuery}
				},
				settings,
			},
			_type == "textBlock" => {
				text[] {
					${$richTextQuery}
				},
			},
		}
	}[0],

	"newsArticles": *[_type == "newsArticle"] | order(publishedDate desc) {
		${$newsArticleQuery},
	},
	
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

const landing = ref(null)
const landingLayout = ref(null)
const content = ref(null)

const skipLanding = () => {
	gsap.to(landing.value, {
		yPercent: '-100',
		duration: 1,
		onComplete: () => {
			unlock(landing.value)
		}
	})
}

const randomLandingBlock = ref(null)

const textAndAssetColor = computed(() => {
	if (randomLandingBlock?.value?.settings?.themeMode == 'dark') {
		return 'white'
	} else {
		return 'black'
	}
})

onMounted(() => {

	lock(landing.value)

	const landingContent = data.value?.homePage?.landingContent || []
	randomLandingBlock.value = landingContent.length ? landingContent[Math.floor(Math.random() * landingContent.length)] : null

})

</script>

<style lang="scss" scoped>

div.landing {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
	z-index: 9;
	background-color: white;
	div.layout {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
		background-color: white;
		&[data-image-size="framed"],
		&[data-video-size="framed"] {
			img, video {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				object-fit: contain;
				height: calc(100% - ((70px * 2) + (var(--padding-base) * 2) + (1.2em)));
				width: 75%;
			}
		}
		&[data-image-size="fullbleed"],
		&[data-video-size="fullbleed"] {
			img, video {
				object-fit: cover;
				height: 100%;
				width: 100%;
			}
		}
		img, video {
			position: absolute;
			inset: 0;
		}
		div.text-block {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;
			width: 100%;
			max-width: 640px;
			padding: 0 var(--padding-base);
			font-size: 30px;
			font-weight: 700;
			text-align: center;
		}
		div.caption {
			position: absolute;
			bottom: var(--padding-base);
			left: 50%;
			transform: translateX(-50%);
			z-index: 1;
			font-size: 20px;
			font-weight: 700;
			text-align: center;
			width: 100%;
			max-width: 1200px;
			color: v-bind('textAndAssetColor');
		}
	}
}
div.content {
	div.news-layout {
		display: flex;
		flex-flow: column nowrap;
		row-gap: calc(var(--padding-base) * 2);
	}
}

</style>