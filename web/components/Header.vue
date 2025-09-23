<template>
	<header ref="header">
		<h1 class="logo" v-show="showLogo"><NuxtLink to="/"><Logo /></NuxtLink></h1>
		<div class="nav" :class="{ '--open': navStore.isOpen }" ref="nav" @pointerenter="onEnter" @pointerleave="onLeave">
			<button class="menu-trigger" @click="onTriggerClick"><img src="/illustrations/bunny.png" /></button>
			<ul class="menu" ref="menu" v-show="navStore.isOpen">
				<li>
					<ul class="sub" v-show="activeSubMenu === 1">
						<li v-for="category in data.productCategories" :key="category._id">
							<NuxtLink :to="useInternalLinkUrl(category)">{{ category.title }}</NuxtLink>
						</li>
						<li v-if="data.productCollections?.length">
							<button @mouseover="activeSubSubMenu ? activeSubSubMenu = null : activeSubSubMenu = 1">Collections</button>
							<ul class="sub" v-show="activeSubSubMenu === 1">
								<li v-for="collection in data.productCollections" :key="collection._id">
									<NuxtLink :to="useInternalLinkUrl(collection)">{{ collection.title }}</NuxtLink>
								</li>
							</ul>
						</li>
					</ul>
					<button @mouseover="activeSubMenu = 1">Jewellery</button>
				</li>
				<li>
					<ul class="sub" v-show="activeSubMenu === 2">
						<li v-for="category in data.artworkCategories" :key="category._id">
							<NuxtLink :to="useInternalLinkUrl(category)">{{ category.title }}</NuxtLink>
						</li>
					</ul>
					<button @mouseover="activeSubMenu = 2">Artworks</button>
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
					<button @mouseover="activeSubMenu = 3">About</button>
				</li>
				<NuxtLink to="/" class="logo"><Logo /></NuxtLink>
			</ul>
		</div>
	</header>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
import { useThemeModeStore } from '~/store/themeMode'
import { onClickOutside, useWindowSize, useMediaQuery } from '@vueuse/core'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

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

gsap.registerPlugin(ScrollToPlugin)

// Toggle on phone
const openMenu = () => {

	if (window.matchMedia('(max-width: 767px)').matches) {
		console.log('test 2')
		if (navStore.isOpen) {
			console.log('test 2.5')
			navStore.setClose()
		} else {
			navStore.setOpen()
			console.log('test 3')
		}
	} else {
		console.log('test 4')
		if (route.name === 'about') {
			console.log('test 5')
			const doc = document.documentElement
			const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2
			const hasScrolled = window.scrollY > 2 || atBottom

			if (!hasScrolled) {
				const { height } = useWindowSize()

				gsap.to(window, { 
					duration: 0.3,
					scrollTo: { 
						y: doc.scrollHeight - height.value,
						offsetY: 0
					},
					onComplete() {
						navStore.setOpen()
					}
				})
				return
			}
		}
		navStore.setOpen()
	}
}

const isHoverCapable = useMediaQuery('(hover: hover) and (pointer: fine)')

let closeTimer

const openNav  = () => navStore.setOpen()
const closeNav = () => {
	if (!navStore.isOpen) return
	activeSubMenu.value = null
	activeSubSubMenu.value = null
	navStore.setClose()
}

const onTriggerClick = (e) => {
  // Phone/tablet (no reliable hover): toggle on click
  if (!isHoverCapable.value) {
    e.stopPropagation() // prevent bubbling that might trigger outside/leave logic
    navStore.isOpen ? closeNav() : openNav()
  }
  else {
	if (route.name === 'about') {
		const doc = document.documentElement
		const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2
		const hasScrolled = window.scrollY > 2 || atBottom

		if (!hasScrolled) {
				const { height } = useWindowSize()

				gsap.to(window, { 
					duration: 0.3,
					scrollTo: { 
						y: doc.scrollHeight - height.value,
						offsetY: 0
					},
					onComplete() {
						openNav()
					}
				})
				return
			}

	} else {
    	openNav()
	}
  }
}

const onEnter = () => {
	if (closeTimer) clearTimeout(closeTimer)
}

const onLeave = (e) => {
	if (!isHoverCapable.value) return
	const to = e.relatedTarget
	if (to && navRef.value?.contains(to)) return
	closeTimer = setTimeout(closeNav, 120)
}

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

watch(() => route.path, () => {
	activeSubMenu.value = null
	activeSubSubMenu.value = null
})

</script>

<style lang="scss" scoped>

header {
	position: fixed;
	z-index: 2;
	h1.logo {
		position: fixed;
		top: 50px;
		left: 50px;
		@include media('phone') {
			left: 0;
			width: 100%;
			padding: 0 35px;
		}
		a {
			display: block;
			height: 27px;
			width: 271px;
			@include media('phone') {
				height: auto;
				width: 100%;
			}
			svg {
				display: block;
				height: 100%;
				max-height: 100%;
				width: 100%;
				max-width: 100%;
				fill: v-bind(textAndAssetColor);
				@include media('phone') {
					height: auto;
					//fill: white !important;
				}
			}
		}
	}
	a.logo {
		position: absolute;
		top: 50px;
		left: 0;
		width: 100%;
		padding: 0 35px;
		display: none;
		@include media('phone') {
			display: block;
		}
		svg {
			display: block;
			height: auto;
			max-height: 100%;
			width: 100%;
			max-width: 100%;
			fill: black;
		}
	}
	div.nav {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 0 0 50px 50px;
		width: 445px;
		@include media('phone') {
			padding: 0 0 35px 35px;
		}
		&.--open {
			button.menu-trigger {
				opacity: 0;
				pointer-events: none;
				@include media('phone') {
					opacity: 1;
					pointer-events: all;
				}
				img {
					@include media('phone') {
						filter: invert(0) !important;
					}
				}
			}
		}
		button.menu-trigger {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			@include media('phone') {
				position: relative;
				z-index: 1;
			}
			img {
				width: 43px;
				filter: v-bind(invertAssets);
			}
		}
		ul.menu {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 0.215em 0;
			justify-content: space-between;
			align-items: flex-end;
			color: v-bind(textAndAssetColor);
			@include media('phone') {
				display: flex;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: flex-start;
				position: fixed;
				inset: 0;
				height: 100%;
				width: 100%;
				background-color: var(--color-bg);
				color: black !important;
				padding: 35px;
				gap: 2.5em 0;
			}
			li {
				display: flex;
				flex-flow: column nowrap;
				row-gap: 1.15em;
				position: relative;
				@include media('phone') {
					display: grid;
				}
				button {
					all: unset;
					box-sizing: border-box;
					cursor: pointer;
					@include media('phone') {
						grid-row: 1;
					}
				}
				ul.sub {
					display: flex;
					flex-flow: column nowrap;
					row-gap: 1.15em;
					@include media('phone') {
						padding-left: 80px;
					}
					ul.sub {
						padding-left: 20px;
						@include media('phone') {
							padding-left: 0;
							display: flex;
							flex-flow: row wrap;
							column-gap: 20px;
						}
					}
					li a {
						transition: padding-left 0.2s;
						@include isNotTouch() {
							&:hover {
								padding-left: 20px;
							}
						}
					}
				}
			}
		}
	}
}

</style>