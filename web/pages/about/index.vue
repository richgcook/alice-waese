<template>
	<div class="container">

		<h2 class="statement --landscape">
			<div><span>Alice</span><div class="space">&nbsp;</div><span>Waese</span></div>
			<div><span>is</span><div class="space">&nbsp;</div><span>an</span><div class="space">&nbsp;</div><span>artist</span></div>
			<div>
				<span>based</span><div class="space">&nbsp;</div><span>in</span>
				<div class="details">
					<p>For all inquiries contact<NuxtLink to="mailto:alice@alicewaese.com">alice@alicewaese.com</NuxtLink></p>
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
		@include media('phone') {
			row-gap: 12px;
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
	font-size: clamp(69px, 11.5vw, 320px);
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
		margin-bottom: 0;
		height: auto;
		@supports (height: 100dvh) {
			height: auto;
		}
	}
	@include media('phone') {
		letter-spacing: 0.03em;
	}
	&.--portrait {
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
			&:nth-of-type(2) {
				font-feature-settings: "ss04";
			}
			&:nth-of-type(7) {
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
			&:nth-of-type(1) {
				span {
					@media (orientation: portrait) {
						display: block;
					}
					&:nth-of-type(2) {
						font-feature-settings: "ss04";
						@media (orientation: portrait) {
							text-align: right;
						}
					}
				}
				div.space {
					@media (orientation: portrait) {
						display: none;
					}
				}
			}
			&:nth-of-type(2) {
				text-align: right;
				@media (orientation: portrait) {
					text-align: left;
				}
				span {
					&:nth-of-type(3) {
						@media (orientation: portrait) {
							display: block;
							text-align: right;
						}
					}
				}
			}
			&:nth-child(3) {
				position: relative;
				display: flex;
				flex-flow: row nowrap;
				@media (orientation: portrait) {
					flex-flow: row wrap;
				}
				span {
					&:nth-of-type(1) {
						@media (orientation: portrait) {
							width: 100%;
						}
					}
				}
				div.space {
					@media (orientation: portrait) {
						display: none;
					}
				}
				div.details {
					flex-grow: 1;
					letter-spacing: normal;
					text-transform: none;
					text-align: left;
					height: 72%;
					display: flex;
					flex-flow: column nowrap;
					justify-content: center;
					align-items: center;
					@media (orientation: portrait) {
						display: none;
					}
				}
			}
			&:nth-of-type(4) {
				text-align: right;
				@media (orientation: portrait) {
					text-align: left;
				}
				div.space {
					@media (orientation: portrait) {
						display: none;
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
			text-indent: 50px;
			&:hover {
				color: var(--color-gold);
			}
		}
	}
}

</style>