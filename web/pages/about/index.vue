<template>
	<div class="container">

		<h2 class="statement --landscape">
			<div><span>Alice</span><div class="space">&nbsp;</div><span>Waese</span></div>
			<div><span>is</span><div class="space">&nbsp;</div><span>an</span><div class="space">&nbsp;</div><span>artist</span></div>
			<div>
				<span>based</span><div class="space">&nbsp;</div><span>in</span>
				<div class="details">
					<p>For direct orders & inquiries <span>contact <NuxtLink to="mailto:alice@alicewaese.com">alice@alicewaese.com</NuxtLink></span></p>
				</div>
			</div>
			<div><span>New</span><div class="space">&nbsp;</div><span>York.</span></div>
		</h2>

		<h2 class="statement --portrait">
			<div>Alice</div>
			<div>Waese</div>
			<div>is an</div>
			<div>artist</div>
			<div>based</div>
			<div>in New</div>
			<div>York.</div>
		</h2>

		<div class="details">
			<p>For direct orders & inquiries <span>contact <NuxtLink to="mailto:alice@alicewaese.com">alice@alicewaese.com</NuxtLink></span></p>
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

div.container {
	@media (orientation: portrait) {
		display: grid;
   		grid-template-rows: 1fr auto;
		height: 100svh;
		@supports (height: 100svh) {
			height: 100svh;
		}
		@include media('phone') {
			row-gap: 35px;
		}
	}
}
h2.statement {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	padding: 50px 50px 0 50px;
	display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
	font-size: clamp(69px, 11.5vw, 320px);
	line-height: 1.03em;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	@supports (text-box: trim-both cap text) {
		padding: 50px;
		> div {
			text-box: trim-both cap alphabetic;
			div, span {
				text-box: inherit;
			}
		}
	}
	@include media('phone') {
		letter-spacing: 0.03em;
	}
	&.--portrait {
		position: relative;
		padding: 35px 35px 0 35px;
		height: auto;
		display: none;
		@media (orientation: portrait) {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
		}
		> div {
			&:nth-of-type(2),
			&:nth-of-type(4) {
				text-align: right;
			}
			&:nth-of-type(6) {
				text-align: right;
			}

		}
	}
	&.--landscape {
		@media (orientation: portrait) {
			display: none;
		}
		> div {
			display: block;
			&:nth-of-type(2) {
				text-align: right;
			}
			&:nth-child(3) {
				position: relative;
				display: flex;
				flex-flow: row nowrap;
				div.details {
					flex-grow: 1;
					letter-spacing: 0.04em;
					text-transform: none;
					text-align: left;
					display: flex;
					flex-flow: column nowrap;
					justify-content: center;
					align-items: center;
				}
			}
			&:nth-of-type(4) {
				text-align: right;
				@supports not (text-box: trim-both cap text) {
					@media screen and (min-width: 2500px) {
						margin-bottom: -0.13em;
					}
					@media screen and (min-width: 2000px) and (max-width: 2499px) {
						margin-bottom: -0.1em;
					}
					@media screen and (min-width: 1600px) and (max-width: 1999px) {
						margin-bottom: -0.06em;
					}
				}
			}
		}
	}
	div.space {
		display: inline;
	}
}
div.details {
	font-size: var(--font-size-base);
	line-height: 1.3;
	display: none;
	@media (orientation: portrait) {
		display: flex;
        flex-flow: row nowrap;
		justify-content: flex-end;
        padding: 35px;
        padding-top: 0;
		position: relative;
		top: 6px;
	}
	p {
		display: flex;
		flex-flow: column nowrap;
		row-gap: 0.8em;
		span {
			text-indent: 65px;
			&:hover {
				color: var(--color-gold);
			}
		}
	}
}

</style>