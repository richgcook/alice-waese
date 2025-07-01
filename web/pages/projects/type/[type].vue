<template>
	<div class="projects-layout" v-if="data?.type.projects?.length">
		<ProjectCard v-for="project in data?.type.projects" :key="project._id" :project="project" />
	</div>
</template>

<script setup>
 
const { $seoQuery, $imageQuery, $projectItemQuery} = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"type": *[_type == "projectType" && slug.current == $type] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		"projects": *[_type == "project" && references(^._id)] | order(orderRank) {
			${$projectItemQuery},
		},
	}[0],

	"projectsPage": *[_type == "projectsPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
	type: route.params.type,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.type)

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
	column-count: 2;
	column-gap: calc(var(--padding-base) * 2);
	&:deep(a.project) {
		page-break-inside: avoid;
		break-inside: avoid-column;
		margin-bottom: calc(var(--padding-base) * 2);

	}
}

</style>