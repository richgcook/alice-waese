<template>
	<div>
		<Transition name="slide-up">
			<div class="landing" 
				@click="hideLanding = true" 
				@touchstart="hideLanding = true" 
				@wheel="hideLanding = true"
				v-show="!hideLanding" 
				ref="landing" 
				v-if="data.homePage.landing.image?.asset || data.homePage.landing.video"
			>
				<video playsinline autoplay loop muted v-if="data.homePage.landing.video">
					<source :src="data.homePage.landing.video" type="video/mp4">
				</video>
				<NuxtImg 
					:src="data.homePage.landing.image.assetRef" 
					:alt="data.homePage.landing.image.alt"
					sizes="100vw tablet-portrait:100vw"
					loading="eager"
					preload
					v-else-if="data.homePage.landing.image?.asset"
				/>

				<LogoSeed class="logo" v-cloak />
			</div>
		</Transition>
		<SliderHome 
			:slides="data.homePage.content" 
			:startPlaying="hideLanding"
			v-if="data.homePage.content?.length" 
		/>
	</div>
</template>

<script setup>

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

const hideLanding = ref(false)

</script>

<style lang="scss" scoped>

div.landing {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	z-index: 30;
	cursor: pointer;
	&.slide-up-enter-active,
	&.slide-up-leave-active {
		transition: transform 0.5s ease-out;
	}
	&.slide-up-enter-from,
	&.slide-up-leave-to {
		transform: translateY(-100%);
	}
	img, video {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
	}
	svg.logo {
		position: absolute;
		bottom: 50px;
		left: 50%;
		transform: translateX(-50%);
		height: auto;
		width: 9vw;
		fill: var(--color-bg);
	}
}

</style>