<template>
	<div class="sections">
		<div class="section --init" v-if="data?.aboutPage?.featuredImage?.image?.asset">
			<div class="featured-image">
				<ImgWithRatio 
					:src="data.aboutPage.featuredImage.image.asset.url" 
					:sizes="`(max-width: 768px) 100vw, 50vw`"
					:alt="data.aboutPage.featuredImage.image.alt" 
					:ratio="data.aboutPage.featuredImage.image.asset.ratio"
				/>
				<div class="caption" v-if="data.aboutPage.featuredImage.caption?.length">
					<RichText :blocks="data.aboutPage.featuredImage.caption" />
				</div>
			</div>
		</div>
		<div v-for="(page, index) in data?.aboutSubPageA" :key="page._id" class="section">
			<h3 :id="`about-${page.slug?.current}`" class="title">{{ page.title }}</h3>
			<PageBuilderA :content="page.pageBuilder" />
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $pageBuilderAQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const query = groq`{

	"aboutSubPageA": *[_type == "aboutSubPageA"] | order(orderRank) {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		pageBuilder[] {
			${$pageBuilderAQuery}
		},
	},

	"aboutPage": *[_type == "aboutPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		featuredImage {
			image {
				${$imageQuery}
			},
			caption[] {
				${$richTextQuery}
			}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.aboutPage)

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

div.sections {
	display: flex;
	flex-flow: column nowrap;
	row-gap: calc(var(--padding-base) * 3);
	div.section {
		display: flex;
		flex-flow: column nowrap;
		row-gap: var(--padding-base);
		&.--init {
			div.featured-image {
				display: flex;
				flex-flow: column nowrap;
				row-gap: 10px;
				width: calc((40 / 75) * 100%);
				margin: 0 auto;
				div.caption {
					font-size: 12px;
				}
			}
		}
		> h3.title {
			font-size: 24px;
			font-weight: 700;
			width: calc((50 / 75) * 100%);
			margin: 0 auto;
		}
	}
}

</style>