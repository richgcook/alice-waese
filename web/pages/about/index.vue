<template>
	<div>
		<h2 class="statement">
			<span>Alice Waese</span>
			<span>is an artist</span>
			<span>based in</span>
			<span>New York.</span>
		</h2>
		<div class="details">
			<p>For all inquiries contact<NuxtLink to="mailto:alice@alicewaese.com">alice@alicewaese.com</NuxtLink></p>
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $pageBuilderAQuery, $imageQuery, $richTextQuery } = useNuxtApp()

const query = groq`{

	"aboutPage": *[_type == "aboutPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.aboutPage)

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

h2.statement {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: calc(100% - (25px * 2));
	width: calc(100% - (50px * 2));
	display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
	font-size: clamp(75px, 11.12vw, 160px);
	line-height: 1.03em;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	span {
		display: block;
		&:nth-child(2),
		&:nth-child(4) {
			text-align: right;
		}
	}
}
div.details {
	position: fixed;
	//background-color: red;
	@include max-width-grid-columns(7, 1, '20px', 'width');
	top: 63%;
	@include max-width-grid-columns(7, 5, '20px', 'left', '-30px');
	transform: translateY(-50%);
	font-size: 12px;
	line-height: 2.15em;
	@include media('tablet-portrait') {
		@include max-width-grid-columns(7, 2, '20px', 'width', '-30px');
	}
	p {
		display: flex;
		flex-flow: column nowrap;
		a {
			align-self: flex-end;
			&:hover {
				color: var(--color-gold);
			}
		}
	}
}

</style>