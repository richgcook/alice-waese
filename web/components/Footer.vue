<template>
	<footer :class="{ '--no-top-margin': noTopMargin }">
		<div class="container">
			<ul class="items" v-if="data.settings.footerItems?.length">
				<li v-for="(item, index) in data.settings.footerItems" :key="index">
					<template v-if="item._type == 'internalLink' || item._type == 'externalLink'">
						<NuxtLink :to="useLinkLink(item)">{{ item.label ? item.label : item.page?.title }}</NuxtLink>
					</template>
				</li>
				<li>&copy; {{ new Date().getFullYear() }}</li>
			</ul>
		</div>
	</footer>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"settings": *[_type == "settingsGeneral"] {
		footerItems[] {
			_type,
			_type == "internalLink" => @->{
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			},
			_type == "externalLink" => {
				label, url
			},
		}
	}[0]
	
}`

const { data } = await useSanityQuery(query)

const config = useRuntimeConfig()

const route = useRoute()

const noTopMargin = computed(() => {
    return route.name == 'work'
})

</script>

<style lang="scss" scoped>

footer {
	margin-top: 160px;
	@include media('phone') {
		margin-top: 80px;
	}
	&:before {
		content: '';
		display: block;
		height: 1px;
		width: 100%;
		background-color: black;
	}
	&.--no-top-margin {
		margin-top: 0;
	}
	div.container {
		font-size: 16px;
		padding: calc(var(--padding-base) / 2);
		max-width: var(--site-max-width);
		margin: 0 auto;
		@include media('phone') {
			grid-template-columns: repeat(4, 1fr);
			gap: var(--padding-base);
		}
		ul.items {
			display: flex;
			flex-flow: row nowrap;
			column-gap: var(--padding-base);
			justify-content: center;
		}
	}
}

</style>