<template>
	<div class="article">
		<h3><span>{{ article.title }}</span><span>{{ useFormatDate(article.publishedDate, 'MMMM YYYY') }}</span></h3>
		<div class="details" v-if="article.details.length">
			<RichText :blocks="article.details" />
		</div>
		<div class="media">
			<video 
				playsinline autoplay loop muted 
				v-if="article.featuredMedia?.video">
				<source :src="article.featuredMedia?.video" type="video/mp4">
			</video>
			<Img 
				:src="article.featuredMedia?.image.asset.url" 
				:sizes="`
					(max-width: 768px) 100vw, 
					75vw`"
				:alt="article.featuredMedia?.image.alt" 
				:loading="`eager`"
				v-else-if="article.featuredMedia?.image"
			/>
			<div class="caption" v-if="article.featuredMedia.caption?.length">
				<RichText :blocks="article.featuredMedia.caption" />
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	article: Object,
})

</script>

<style lang="scss" scoped>

div.article {
	display: flex;
	flex-flow: column nowrap;
	row-gap: var(--padding-base);
	h3 {
		font-size: 20px;
		font-weight: 700;
		display: flex;
		gap: var(--padding-base);
		width: calc((50 / 75) * 100%);
		margin: 0 auto;
	}
	div.details {
		width: calc((50 / 75) * 100%);
		margin: 0 auto;
	}
	div.media {
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

</style>