<template>
	<div class="news-layout">
		<NewsArticleCard v-for="article in data.articles" :article="article" :key="article._id" />
	</div>
</template>

<script setup>

const { $newsArticleQuery } = useNuxtApp()

const query = groq`{ 

	"articles": *[_type == "newsArticle"] | order(publishedDate desc) {
		${$newsArticleQuery},
	},

	"newsPage": *[_type == "newsPage"] {
		_id, _type, title, slug,
	}[0],

}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.newsPage)

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

div.news-layout {
	display: flex;
	flex-flow: column nowrap;
	row-gap: calc(var(--padding-base) * 2);
}

</style>