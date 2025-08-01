<template>
	<header ref="header">
		<h1 class="logo" v-show="hideLogo"><NuxtLink to="/">{{ config?.public?.siteTitle }}</NuxtLink></h1>
		<ul class="nav" ref="navElem">
			<li>
				<button @click="activeSubMenu ? activeSubMenu = null : activeSubMenu = 1">Jewellery</button>
				<ul class="sub" v-show="activeSubMenu === 1">
					<li><NuxtLink to="/">Rings</NuxtLink></li>
					<li><NuxtLink to="/">Earrings</NuxtLink></li>
					<li><NuxtLink to="/">Pendants</NuxtLink></li>
					<li><NuxtLink to="/">Bracelets</NuxtLink></li>
					<li><NuxtLink to="/">Pins</NuxtLink></li>
					<li>
						<button @click="activeSubSubMenu ? activeSubSubMenu = null : activeSubSubMenu = 1">Collections</button>
						<ul class="sub" v-show="activeSubSubMenu === 1">
							<li><NuxtLink to="/collections/collection-1">SS25</NuxtLink></li>
							<li><NuxtLink to="/collections/collection-2">SS26</NuxtLink></li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				<ul class="sub" v-show="activeSubMenu === 2">
					<li>Rings</li>
					<li>Earrings</li>
					<li>Pendants</li>
					<li>Bracelets</li>
					<li>Pins</li>
					<li>Collections</li>
				</ul>
				<button @click="activeSubMenu = 2">Artworks</button>
			</li>
			<li><NuxtLink to="/about">About</NuxtLink></li>
		</ul>
	</header>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
import { useThemeModeStore } from '~/store/themeMode'
import { onClickOutside } from '@vueuse/core'

const config = useRuntimeConfig()

const { $seoQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const query = groq`{ 

	"aboutPage": *[_type == "aboutPage"] {
		_id, _type, title, slug,
	}[0],

	"newsPage": *[_type == "newsPage"] {
		_id, _type, title, slug,
	}[0],

	"projectsPage": *[_type == "projectsPage"] {
		_id, _type, title, slug,
	}[0],

	"contactPage": *[_type == "contactPage"] {
		_id, _type, title, slug,
		details[] {
			${$richTextQuery},
		},
	}[0],
	
}`
const { data } = await useSanityQuery(query)

const route = useRoute()

const hideLogo = computed(() => {
	return route.name === 'stockists'
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

const activeSubMenu = ref(null)
const activeSubSubMenu = ref(null)
const navElem = ref(null)

onClickOutside(navElem, () => {
	if (activeSubMenu.value) {
		activeSubMenu.value = null
		activeSubSubMenu.value = null
	}
})

</script>

<style lang="scss" scoped>

header {
	position: fixed;
	z-index: 1;
	color: v-bind(textAndAssetColor);
	h1.logo {
		position: fixed;
		top: 50px;
		left: 50px;
		font-size: 30px;
		font-weight: 700;
	}
	ul.nav {
		position: fixed;
		bottom: 50px;
		left: 50px;
		@include max-width-grid-columns(14, 5, '20px', 'width', '-50px');
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.215em 20px;
		justify-content: space-between;
		align-items: flex-end;
		background-color: red;
		li {
			display: flex;
				flex-flow: column nowrap;
   				row-gap: 1.15em;
			font-size: 12px;
			position: relative;
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

</style>