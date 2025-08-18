<template>
	<div>
		<h2 class="statement">
			<div><span>Alice</span> <span>Waese</span></div>
			<div><span>is</span> <span>an</span> <span>artist</span></div>
			<div><span>based</span> <span>in</span> <span>New</span></div>
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
	font-size: clamp(75px, 11.5vw, 320px);
	line-height: 1.03em;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	@media (orientation: portrait) {
		height: calc(100% - 60px);
		width: calc(100% - 60px);
		 justify-content: flex-start;
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
	position: fixed;
	//background-color: red;
	top: 63%;
	@include max-width-grid-columns(7, 5, '20px', 'left', '-30px');
	transform: translateY(-50%);
	font-size: 12px;
	line-height: 2.15em;
	@media (orientation: portrait) {
		top: auto;
		bottom: 19px;
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