<template>
	<NuxtLink :to="useInternalLinkUrl(project)" class="project" :data-context="context">
		<div class="media">
			<video playsinline autoplay loop muted v-if="project.featuredMedia?.video">
				<source :src="project.featuredMedia?.video" type="video/mp4">
			</video>
			<Img 
				:src="project.featuredMedia?.image.asset.url" 
				:sizes="`
					(max-width: 768px) 100vw, 
					(min-width: 768px) and (max-width: 1023px) 50vw, 
					33vw`"
				:alt="project.featuredMedia?.image.alt" 
				:loading="`eager`"
				v-else-if="project.featuredMedia?.image"
			/>
			<div class="overlay" v-if="project.types?.length">
				<ul>
					<li v-for="type in project.types" :key="type._id">{{ type.title }}</li>
				</ul>
			</div>
		</div>
		<h3><span class="title">{{ project.title }}</span><span class="number" v-if="project.numeralArabic">{{ useConvertToArabicNumerals(project.numeralArabic) }}</span></h3>
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	project: Object,
	context: String,
})

</script>

<style lang="scss" scoped>

a.project {
	display: grid;
	row-gap: 10px;
	align-content: flex-start;
	position: relative;
	&:hover {
		div.media {
			div.overlay {
				opacity: 1;
			}
		}
	}
	div.media {
		aspect-ratio: 1 / 1;
		position: relative;
		img, video {
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
			object-fit: contain;
		}
		div.overlay {
			position: absolute;
			inset: 0;
			background-color: white;
			height: 100%;
			width: 100%;
			opacity: 0;
			ul {
				position: absolute;
				top: 50%;
				left: 0;
				width: 100%;
				transform: translateY(-50%);
				display: flex;
				flex-flow: column nowrap;
				li {
					font-size: 36px;
					text-align: center;
				}
			}
		}
	}
	h3 {
		font-size: 18px;
		span.title {
			padding-right: 1ch;
		}
		span.number {
			font-family: var(--font-arabic);
			font-size: 1.35em; // 25px
			line-height: 1;
		}
	}
}

</style>