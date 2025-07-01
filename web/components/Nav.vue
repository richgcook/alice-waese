<template>
	<nav class="main" :class="{ '--open': navStore.isOpen }">
		<button class="trigger">Menu</button>
		<ul class="menu">
			<li v-if="data.aboutPage"><NuxtLink :to="useInternalLinkUrl(data.aboutPage)">{{ data.aboutPage.title }}</NuxtLink>
				<ul v-show="route.name == data.aboutPage.slug?.current">
					<li v-for="page in data.aboutSubPageA" :key="page._id">
						<button @click="scrollTo(`#about-${page.slug?.current}`)">{{ page.title }}</button>
					</li>
				</ul>
			</li>
			<li v-if="data.newsPage"><NuxtLink :to="useInternalLinkUrl(data.newsPage)">{{ data.newsPage.title }}</NuxtLink>
				<ul v-show="route.name == data.newsPage.slug?.current || route.name == 'news-year'">
					<li v-for="(range, index) in generateNewsYearRanges()" :key="index">
						<NuxtLink :to="`/news/${range.slug}`">{{ range.title }}</NuxtLink>
					</li>
				</ul>
			</li>
			<li v-if="data.projectsPage"><NuxtLink :to="useInternalLinkUrl(data.projectsPage)">{{ data.projectsPage.title }}</NuxtLink>
				<ul v-show="route.name == data.projectsPage.slug?.current || route.name == 'projects-type-type'">
					<li v-for="type in data.projectTypes" :key="type._id">
						<NuxtLink :to="useInternalLinkUrl(type)">{{ type.title }}</NuxtLink>
					</li>
				</ul>
			</li>
			<li v-if="data.contactPage"><NuxtLink :to="useInternalLinkUrl(data.contactPage)">{{ data.contactPage.title }}</NuxtLink></li>
		</ul>
	</nav>
</template>

<script setup>

import { useNavStore } from '~/store/nav'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

const { $seoQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const query = groq`{ 

	"aboutSubPageA": *[_type == "aboutSubPageA"] | order(orderRank) {
		_id, _type, title, slug,
	},

	"aboutPage": *[_type == "aboutPage"] {
		_id, _type, title, slug,
	}[0],

	"newsArticles": *[_type == "newsArticle"] | order(publishedDate desc) {
		publishedDate,
	},

	"newsPage": *[_type == "newsPage"] {
		_id, _type, title, slug,
	}[0],

	"projectsPage": *[_type == "projectsPage"] {
		_id, _type, title, slug,
	}[0],

	"projectTypes": *[_type == "projectType" && _id in *[_type == "project"].types[]._ref] | order(orderRank) {
		_id, _type, title, slug
	},

	"contactPage": *[_type == "contactPage"] {
		_id, _type, title, slug,
		details[] {
			${$richTextQuery},
		},
	}[0],
	
}`
const { data } = await useSanityQuery(query)

const navStore = useNavStore()

const { generateYearRanges: generateNewsYearRanges } = useNewsArticlesYearRanges(data.value.newsArticles)

const route = useRoute()

gsap.registerPlugin(ScrollToPlugin)

const scrollTo = (target) => {
	gsap.to(window, {
		duration: 1.5,
		scrollTo: {
			y: target,
			offsetY: 90,
		},
		ease: 'power2.inOut'
	})
}

</script>

<style lang="scss" scoped>

nav.main {
	position: fixed;
	top: 29px;
	overflow: auto;
	font-size: 20px;
	font-weight: 700;
	z-index: 4;
	//background-color: red;
	@include media('phone') {
		//	
	}
	button.trigger {
		all: unset;
		cursor: pointer;
		box-sizing: border-box;
	}
	ul.menu {
		margin-top: 10px;
		li {
			ul {
				padding-left: var(--padding-base);
				li {
					font-weight: 400;
					button {
						all: unset;
						box-sizing: border-box;
						cursor: pointer;
					}
				}
			}
		}
	}
}

</style>