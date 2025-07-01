<template>
	<div class="projects-layout" v-if="data?.projects?.length">
		<ProjectCard v-for="project in data?.projects" :key="project._id" :project="project" />
	</div>
</template>

<script setup>
 
const { $seoQuery, $imageQuery, $projectItemQuery} = useNuxtApp()

const query = groq`{ 

	"projects": *[_type == "project"] | order(orderRank) {
		${$projectItemQuery},
	},

	"projectsPage": *[_type == "projectsPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.projectsPage)

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

div.projects-layout {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: calc(var(--padding-base) * 2) var(--padding-base);
}

</style>