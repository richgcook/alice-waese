<template>
	<div class="container">
		<h2 class="statement">
			<div><span>Alice</span> <span>Waese</span></div>
			<div><span>is</span> <span>an</span> <span>artist</span></div>
			<div>
				<span>based</span> <span>in</span> <span>New</span>
				<div class="details">
					<p>For all inquiries contact<NuxtLink to="mailto:alice@alicewaese.com">alice@alicewaese.com</NuxtLink></p>
				</div>
			</div>
			<div><span>New</span> <span>York.</span></div>
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

div.container {
	@media (orientation: portrait) {
		display: grid;
   		 grid-template-rows: 1fr auto;
		min-height: calc(100vh + 0.265em);
		@supports (min-height: 100dvh) {
			min-height: calc(100dvh + 0.265em);
		}
	}
}
h2.statement {
	position: relative;
	width: 100%;
	padding: 50px;
	display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
	font-size: clamp(75px, 11.5vw, 320px);
	line-height: 1.03em;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	margin-bottom: calc(83px + 50px);
	height: calc(100vh + 0.265em);
	@supports (height: 100dvh) {
		height: calc(100dvh + 0.265em);
	}
	@media (orientation: portrait) {
		padding: 35px;
		padding-bottom: 0;
		justify-content: flex-start;
		margin-bottom: 0;
		height: auto;
		@supports (height: 100dvh) {
			height: auto;
		}
	}
	div {
		display: block;
		&:nth-child(1) {
			span {
				@media (orientation: portrait) {
					display: block;
				}
				&:nth-child(2) {
					@media (orientation: portrait) {
						text-align: right;
					}
				}
			}
		}
		&:nth-child(2) {
			text-align: right;
			@media (orientation: portrait) {
				text-align: left;
			}
			span {
				&:nth-child(3) {
					@media (orientation: portrait) {
						display: block;
						text-align: right;
					}
				}
			}
		}
		&:nth-child(3) {
			position: relative;
			@media (orientation: portrait) {
				display: flex;
				flex-flow: row wrap;
			}
			span {
				&:nth-child(1) {
					@media (orientation: portrait) {
						width: 100%;
					}
				}
				&:nth-child(3) {
					display: none;
					@media (orientation: portrait) {
						display: inline;
						margin-left: auto;
					}
				}
			}
			div.details {
				display: block;
				position: absolute;
				top: 50%;
				right: 0;
				@include max-width-grid-columns(7, 2, '30px', 'width');
				transform: translateY(-84%);
				letter-spacing: normal;
				text-transform: none;
				text-align: left;
				@media (orientation: portrait) {
					display: none;
				}
			}
		}
		&:nth-child(4) {
			text-align: right;
			@media (orientation: portrait) {
				text-align: left;
			}
			span {
				&:nth-child(1) {
					@media (orientation: portrait) {
						display: none;
					}
				}
			}
		}
	}
}
div.details {
	font-size: var(--font-size-base);
	line-height: 2.15em;
	display: none;
	@media (orientation: portrait) {
		display: flex;
        flex-flow: row nowrap;
		justify-content: flex-end;
        padding: 35px;
        padding-top: 0;
	}
	p {
		display: flex;
		flex-flow: column nowrap;
		a {
			text-indent: 30px;
			&:hover {
				color: var(--color-gold);
			}
		}
	}
}

</style>