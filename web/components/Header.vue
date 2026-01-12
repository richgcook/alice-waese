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
						<!--
						<li v-if="data.productCollections?.length">
							<button @mouseover="activeSubSubMenu ? activeSubSubMenu = null : activeSubSubMenu = 1">Collections</button>
							<ul class="sub" v-show="activeSubSubMenu === 1">
								<li v-for="collection in data.productCollections" :key="collection._id">
									<NuxtLink :to="useInternalLinkUrl(collection)">{{ collection.title }}</NuxtLink>
								</li>
							</ul>
						</li>
						-->
					</ul>
					<button
						@mouseover="activeSubMenu = 1"
						@click.stop.prevent="onItemPress(1)"
					>Jewelry</button>
				</li>
				<li>
					<ul class="sub" v-show="activeSubMenu === 2">
						<li v-for="collection in data.productCollections" :key="collection._id">
							<NuxtLink :to="useInternalLinkUrl(collection)">{{ collection.title }}</NuxtLink>
						</li>
						<li v-for="category in data.artworkCategories" :key="category._id">
							<NuxtLink :to="useInternalLinkUrl(category)">{{ category.title }}</NuxtLink>
						</li>
						<li v-if="data.collaborationsPage">
							<NuxtLink :to="useInternalLinkUrl(data.collaborationsPage)">{{ data.collaborationsPage.title }}</NuxtLink>
						</li>
					</ul>
					<button
						@mouseover="activeSubMenu = 2"
						@click.stop.prevent="onItemPress(2)"
					>Collections</button>
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
					<button
						@mouseover="activeSubMenu = 3"
						@click.stop.prevent="onItemPress(3)"
					>About</button>
				</li>
				<button class="logo" @click="navStore.setClose"><Logo /></button>
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

	"collaborationsPage": *[_type == "collaborationsPage"] {
		_id, _type, title, slug,
	}[0],

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
	const hiddenLogoRoutes = [
		'jewelry-collections-slug',
		'collaborations',
		'collaborations-slug',
		'about',
		'about-stockists',
		'about-press'
	]
	if (hiddenLogoRoutes.includes(route.name)) return false
	return true
})

const navStore = useNavStore()

/*
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
*/

gsap.registerPlugin(ScrollToPlugin)

const isHoverCapable = useMediaQuery('(hover: hover) and (pointer: fine)')

const activate = (id) => { activeSubMenu.value = id }

const onItemPress = (id) => {
	if (!isHoverCapable.value) {
		activeSubMenu.value = activeSubMenu.value === id ? null : id
	} else {
		activate(id)
	}
}

const { height } = useWindowSize()

let closeTimer

const openNav  = () => {
	if (closeTimer) clearTimeout(closeTimer) // Cancel any pending close
	if (!navStore.isOpen) navStore.setOpen()
}

const closeNav = () => {
	if (!navStore.isOpen) return
	activeSubMenu.value = null
	activeSubSubMenu.value = null
	navStore.setClose()
}

const onTriggerClick = (e) => {
  
	if (!isHoverCapable.value) {
		e.stopPropagation()
		navStore.isOpen ? closeNav() : openNav()
		return
	}

	/*
	if (route.name === 'about') {
		const doc = document.documentElement
		const atBottom   = window.innerHeight + window.scrollY >= doc.scrollHeight - 2
		const hasScrolled = window.scrollY > 2 || atBottom

		if (!hasScrolled) {
			gsap.to(window, {
				duration: 0.3,
				scrollTo: {
					y: doc.scrollHeight - unref(height),
					offsetY: 0
				},
				onComplete: openNav
			})
			return
		}
	}
	*/

	openNav()
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
				//fill: v-bind(textAndAssetColor);
				@include media('phone') {
					height: auto;
					//fill: white !important;
				}
			}
		}
	}
	button.logo {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
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
		//@include max-width-grid-columns(21, 6, '20px', 'width', '0px', '100vw + 100px');
		width: 22.5%;
		max-width: 768px;
		@include media('tablet') {
			//@include max-width-grid-columns(21, 7, '20px', 'width', '0px', '100vw + 100px');
		}
		@include media('phone') {
			width: auto;
			padding: 0 0 30px 35px;
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
						//filter: invert(0) !important;
					}
				}
			}
		}
		button.menu-trigger {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			position: relative;
    		top: 4px;
			@include media('phone') {
				z-index: 1;
			}
			img {
				width: 43px;
				//filter: v-bind(invertAssets);
			}
		}
		ul.menu {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: flex-end;
			//display: grid;
			//grid-template-columns: repeat(3, 1fr);
			//gap: 0.215em 0;
			//justify-content: space-between;
			//align-items: flex-end;
			//color: v-bind(textAndAssetColor);
			@include media('phone') {
				flex-flow: column nowrap;
				justify-content: center;
				align-items: flex-start;
				position: fixed;
				inset: 0;
				height: 100%;
				width: 100%;
				background-color: var(--color-bg);
				color: black !important;
				padding: 85px 35px 75px 35px;
				gap: 2em 0;
			}
			&.fade-enter-active,
			&.fade-leave-active {
				transition: opacity 0.25s;
			}
			&.fade-enter-from,
			&.fade-leave-to {
				opacity: 0;
			}
			li {
				display: flex;
				flex-flow: column nowrap;
				row-gap: 0.8em;
				position: relative;
				white-space: nowrap;
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
					position: absolute;
					bottom: calc(1em + 1.3em);
					display: flex;
					flex-flow: column nowrap;
					row-gap: 0.8em;
					@include media('phone') {
						position: relative;
						bottom: 0;
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