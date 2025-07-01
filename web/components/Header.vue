<template>
	<header ref="header">
		<h1 class="logo"><NuxtLink to="/">{{ config?.public?.siteTitle }}</NuxtLink></h1>
		<button @click="navStore.setOpen()" class="nav-trigger" v-show="!navIsOpen">
			<span></span><span></span><span></span>
		</button>
		<ul class="nav" v-show="navIsOpen">
			<li v-if="data.aboutPage"><NuxtLink :to="useInternalLinkUrl(data.aboutPage)">{{ data.aboutPage.title }}</NuxtLink></li>
			<li v-if="data.newsPage"><NuxtLink :to="useInternalLinkUrl(data.newsPage)">{{ data.newsPage.title }}</NuxtLink></li>
			<li v-if="data.projectsPage"><NuxtLink :to="useInternalLinkUrl(data.projectsPage)">{{ data.projectsPage.title }}</NuxtLink></li>
			<li v-if="data.contactPage"><NuxtLink :to="useInternalLinkUrl(data.contactPage)">{{ data.contactPage.title }}</NuxtLink></li>
		</ul>
	</header>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
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

const navStore = useNavStore()

const { isOpen: navIsOpen } = storeToRefs(navStore)

const header = ref(null)

onClickOutside(header, () => navStore.setClose())

</script>

<style lang="scss" scoped>

header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	margin: 0 auto;
	padding: calc(var(--padding-base) / 2) var(--padding-base);
	text-align: center;
	z-index: 10;
	background-color: white;
	border-bottom: 1px solid black;
	h1.logo {
		font-size: 30px;
		font-weight: 700;
	}
	button.nav-trigger {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		position: absolute;
		top: 50%;
		left: var(--padding-base);
		width: 38px;
		height: 18px;
		transform: translateY(-50%);
		span {
			position: absolute;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: black;
			&:nth-child(1) {
				top: 0;
			}
			&:nth-child(2) {
				top: 50%;
				transform: translateY(-50%);
			}
			&:nth-child(3) {
				bottom: 0;
			}
		}
	}
	ul.nav {
		position: absolute;
		top: 50%;
		left: var(--padding-base);
		transform: translateY(-50%);
		display: flex;
		flex-flow: row nowrap;
		column-gap: 20px;
	}
}

</style>