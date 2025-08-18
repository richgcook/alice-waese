<template>
	<header ref="header">
		<h1 class="logo" v-show="showLogo"><NuxtLink to="/"><Logo /></NuxtLink></h1>
		<div class="nav" ref="nav">
			<button class="menu-trigger" @click="navStore.setOpen" v-show="!navStore.isOpen"><img src="/illustrations/bunny.png" /></button>
			<ul class="menu" ref="menu" v-show="navStore.isOpen">
				<li>
					<ul class="sub" v-show="activeSubMenu === 1">
						<li v-for="category in data.productCategories" :key="category._id">
							<NuxtLink :to="useInternalLinkUrl(category)">{{ category.title }}</NuxtLink>
						</li>
						<li v-if="data.productCollections?.length">
							<button @click="activeSubSubMenu ? activeSubSubMenu = null : activeSubSubMenu = 1">Collections</button>
							<ul class="sub" v-show="activeSubSubMenu === 1">
								<li v-for="collection in data.productCollections" :key="collection._id">
									<NuxtLink :to="useInternalLinkUrl(collection)">{{ collection.title }}</NuxtLink>
								</li>
							</ul>
						</li>
					</ul>
					<button @click="activeSubMenu = 1">Jewellery</button>
				</li>
				<li>
					<ul class="sub" v-show="activeSubMenu === 2">
						<li v-for="category in data.artworkCategories" :key="category._id">
							<NuxtLink :to="useInternalLinkUrl(category)">{{ category.title }}</NuxtLink>
						</li>
					</ul>
					<button @click="activeSubMenu = 2">Artworks</button>
				</li>
				<li>
					<ul class="sub" v-show="activeSubMenu === 3">
						<li><NuxtLink :to="useInternalLinkUrl(data.aboutPage)">{{ data.aboutPage.title }}</NuxtLink></li>
						<li><NuxtLink :to="useInternalLinkUrl(data.stockistsPage)">{{ data.stockistsPage.title }}</NuxtLink></li>
						<li><NuxtLink :to="useInternalLinkUrl(data.pressPage)">{{ data.pressPage.title }}</NuxtLink></li>
						<li v-for="page in data.pages" :key="page._id">
							<NuxtLink :to="useInternalLinkUrl(page)">{{ page.title }}</NuxtLink>
						</li>
					</ul>
					<button @click="activeSubMenu = 3">About</button>
				</li>
			</ul>
		</div>
	</header>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
import { useThemeModeStore } from '~/store/themeMode'
import { onClickOutside } from '@vueuse/core'

const config = useRuntimeConfig()

const { $seoQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const query = groq`{ 

	"productCategories": *[_type == "productCategory"] | order(orderRank) {
		_id, _type, title, slug,
	},

	"productCollections": *[_type == "productCollection"] | order(orderRank) {
		_id, _type, title, slug,
	},

	"artworkCategories": *[_type == "artworkCategory"] | order(orderRank) {
		_id, _type, title, slug,
	},

	"aboutPage": *[_type == "aboutPage"] {
		_id, _type, title, slug,
	}[0],

	"stockistsPage": *[_type == "stockistsPage"] {
		_id, _type, title, slug,
	}[0],

	"pressPage": *[_type == "pressPage"] {
		_id, _type, title, slug,
	}[0],

	"pages": *[_type == "pageA"] {
		_id, _type, title, slug,
	},
	
}`
const { data } = await useSanityQuery(query)

const route = useRoute()

const showLogo = computed(() => {
	if (route.name == 'jewellery-collections-slug' || route.name === 'about' || route.name === 'about-stockists' || route.name === 'about-press') return false
	return true
})

const navStore = useNavStore()

const themeModeStore = useThemeModeStore()

const textAndAssetColor = computed(() => {
	if (themeModeStore.getMode == 'dark') {
		return 'white'
	} else {
		return 'black'
	}
})

const invertAssets = computed(() => {
	if (themeModeStore.getMode == 'dark') {
		return 'invert(1)'
	} else {
		return 'invert(0)'
	}
})

const activeSubMenu = ref(null)
const activeSubSubMenu = ref(null)
const navRef = useTemplateRef('nav')

onClickOutside(navRef, () => {
	if (navStore.isOpen) navStore.setClose()
	if (activeSubMenu.value) {
		activeSubMenu.value = null
		activeSubSubMenu.value = null
	}
})

</script>

<style lang="scss" scoped>

header {
	position: fixed;
	z-index: 2;
	color: v-bind(textAndAssetColor);
	h1.logo {
		position: fixed;
		top: 50px;
		left: 50px;
		a {
			display: block;
			height: 27px;
			width: 271px;
			svg {
				display: block;
				height: 100%;
				max-height: 100%;
				width: 100%;
				max-width: 100%;
				fill: v-bind(textAndAssetColor);
			}
		}
	}
	div.nav {
		position: fixed;
		bottom: 50px;
		left: 50px;
		@include max-width-grid-columns(14, 5, '20px', 'width', '-70px');
		@include media('laptop') {
			@include max-width-grid-columns(14, 6, '20px', 'width', '-70px');
		}
		@include media('tablet-landscape') {
			@include max-width-grid-columns(14, 6, '20px', 'width', '-70px');
		}
		button.menu-trigger {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			img {
				width: 43px;
				filter: v-bind(invertAssets);
			}
		}
		ul.menu {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 0.215em 20px;
			justify-content: space-between;
			align-items: flex-end;
			//background-color: red;
			li {
				display: flex;
				flex-flow: column nowrap;
				row-gap: 1.15em;
				font-size: 12px;
				position: relative;
				@include media('desktop-large') {
					font-size: 13px;
					letter-spacing: 0.02em;
				}
				button {
					all: unset;
					box-sizing: border-box;
					cursor: pointer;
				}
				ul.sub {
					display: flex;
					flex-flow: column nowrap;
					row-gap: 1.15em;
					ul.sub {
						padding-left: 20px;
					}
					li a {
						transition: padding-left 0.2s;
						&:hover {
							padding-left: 20px;
						}
					}
				}
			}
		}
	}
}

</style>