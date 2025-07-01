<template>
	<div class="news-layout">
		<div v-for="article in data.articles" :key="article._id" class="article">
			<h3><span>{{ article.title }}</span><span>{{ useFormatDate(article.publishedDate, 'MMMM YYYY') }}</span></h3>
			<RichText :blocks="article.details" v-if="article.details.length" />
			<div class="featured-image" v-if="article.featuredImage?.image?.asset">
				<ImgWithRatio 
					:src="article.featuredImage.image.asset.url" 
					:sizes="`(max-width: 768px) 100vw, 50vw`"
					:alt="article.featuredImage.image.alt" 
					:ratio="article.featuredImage.image.asset.ratio"
				/>
				<div class="caption" v-if="article.featuredImage.caption?.length">
					<RichText :blocks="article.featuredImage.caption" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

import { useNavStore } from '~/store/nav'

const { $seoQuery, $newsArticleQuery } = useNuxtApp()

const route = useRoute()

const yearParam = route.params.year
let startYear, endYear

if (yearParam.includes('-')) {
	// Range of years
	const years = yearParam.split('-')
	startYear = Math.min(...years.map(Number)).toString()
	endYear = (Math.max(...years.map(Number)) + 1).toString()
} else {
	// Single year
	startYear = Number(yearParam).toString()
	endYear = (Number(yearParam) + 1).toString()
}

const query = groq`{ 

	"articles": *[
		_type == "newsArticle" && 
		dateTime(publishedDate + "T00:00:00Z") >= dateTime($startYear + "-01-01T00:00:00Z") &&
      	dateTime(publishedDate + "T00:00:00Z") < dateTime($endYear + "-01-01T00:00:00Z")
	] | order(publishedDate desc) {
		${$newsArticleQuery}
	},

	"newsPage": *[_type == "newsPage"] {
		_id, _type, title, slug,
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    startYear,
	endYear
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.newsPage)

const yearParamFormattedAsTitle = computed(() => {
	return yearParam.replace('-', '–')
})

const updatedTitleForNews = computed(() => {
	return `${title.value} → ${yearParamFormattedAsTitle.value}`
})

useHead({
	title: updatedTitleForNews.value,
	meta: useSeoFields({
		title: updatedTitleForNews.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

</script>


<style lang="scss" scoped>

div.news-layout {
	display: flex;
	flex-flow: column nowrap;
	row-gap: calc(var(--padding-base) * 2);
}
div.article {
	display: flex;
	flex-flow: column nowrap;
	row-gap: var(--padding-base);
	h3 {
		font-size: 20px;
		font-weight: 700;
		text-align: center;
		display: flex;
		justify-content: center;
		gap: var(--padding-base);
		width: calc((50 / 75) * 100%);
		margin: 0 auto;
	}
	:deep(div.text) {
		width: calc((50 / 75) * 100%);
		margin: 0 auto;
	}
	div.featured-image {
		display: flex;
		flex-flow: column nowrap;
		row-gap: 10px;
		width: calc((40 / 75) * 100%);
		margin: 0 auto;
		div.caption {
			font-size: 12px;
			text-align: center;
		}
	}
}

</style>