const seoQuery = `
	metaTitle, metaDescription,
	"shareImage": shareImage.asset->url
`

const internalLinkQuery = `
	_id, _type, title, slug, seo {
		${seoQuery}
	},
`

const richTextQuery = `
	...,
	markDefs[] {
		...,
		_type == "internalLink" => {
			"reference": @.reference->{
				${internalLinkQuery}
			},
			symbolArrow,
		},
		_type == "fileUploadLink" => {
			"file": file.asset->{
				url, extension, size
			},
			symbolArrow,
		},
	}
`

const imageQuery = `
	alt,
	"assetRef": asset._ref,
	asset->{
		_id,
		url,
		"height": metadata.dimensions.height,
		"width": metadata.dimensions.width,
		"orientation": select(
			metadata.dimensions.height == metadata.dimensions.width => "square",
			metadata.dimensions.height > metadata.dimensions.width => "portrait",
			"landscape"
		),
		"ratio": metadata.dimensions.aspectRatio
	}
`

const pageBuilderAQuery = `
	_type,
	_type == "textBlock" => {
		text[] {
			${richTextQuery}
		},
		settings,
	},
	_type == "imageBlock" => {
		image {
			${imageQuery}
		},
		caption[] {
			${richTextQuery}
		},
	},
	_type == "imagesBlock" => {
		images[] {
			image {
				${imageQuery}
			},
			caption[] {
				${richTextQuery}
			},
		},
		settings,
	},
	_type == "embedBlock" => {
		embedCode,
		coverImage {
			${imageQuery}
		},
		caption[] {
			${richTextQuery}
		},
	},
	_type == "videoBlock" => {
		"video": video.asset->{
			_id, url, mimeType, extension
		},
		caption[] {
			${richTextQuery}
		},
	}
`

const productQuery = `
	_id, _type, title, slug, seo {
		${seoQuery}
	},
	primaryMedia {
		image {
			${imageQuery}
		},
		"video": video.asset->url,
	},
	description[] {
		${richTextQuery}
	},
	media[] {
		_type,
		_type == "imageBlock" => {
			image {
				${imageQuery}
			},
		}
	}
`

const artworkQuery = `
	_id, _type, title, slug, seo {
		${seoQuery}
	},
	primaryMedia {
		image {
			${imageQuery}
		},
		"video": video.asset->url,
	},
	description[] {
		${richTextQuery}
	},
	media[] {
		_type,
		_type == "imageBlock" => {
			image {
				${imageQuery}
			},
		}
	}
`

const newsArticleQuery = `
	_id, _type, title, slug, seo {
		${seoQuery}
	},
	publishedDate,
	details[] {
		${richTextQuery},
	},
	featuredMedia {
		image {
			${imageQuery}
		},
		"video": video.asset->url,
		caption[] {
			${richTextQuery}
		},
	}
`

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('seoQuery', seoQuery)
	nuxtApp.provide('internalLinkQuery', internalLinkQuery)
	nuxtApp.provide('richTextQuery', richTextQuery)
	nuxtApp.provide('imageQuery', imageQuery)
	nuxtApp.provide('pageBuilderAQuery', pageBuilderAQuery)
	nuxtApp.provide('productQuery', productQuery)
	nuxtApp.provide('artworkQuery', artworkQuery)
	nuxtApp.provide('newsArticleQuery', newsArticleQuery)
})