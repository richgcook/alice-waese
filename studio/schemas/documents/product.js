import { defineType, defineField, defineArrayMember } from 'sanity'
import { PlayIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Product",
	name: "product",
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'slug',
			title: 'Slug',
			name: 'slug',
			options: {
				source: 'title'
			},
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'object',
			title: 'Primary image or video',
			name: 'primaryMedia',
			fields: [
				defineField({
					type: 'image',
					title: 'Image',
					name: 'image',
					fields: [
						defineField({
							type: 'alt',
							name: 'alt'
						})
					],
				}),
				defineField({
					type: 'file',
					title: 'Video',
					name: 'video',
					options: {
						accept: 'video/*'
					},
				}),
			],
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'array',
			title: 'Categories',
			name: 'categories',
			of: [{
				type: 'reference',
				to: [{ type: 'productCategory' }]
			}],
		}),
		defineField({
			type: 'richText',
			title: 'Description',
			name: 'description',
		}),
		defineField({
			type: 'array',
			title: 'Images',
			name: 'media',
			validation: Rule => Rule.required().min(1),
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Image',
					name: 'imageBlock',
					fields: [
						defineField({
							type: 'image',
							title: 'Image',
							name: 'image',
							fields: [
								defineField({
									type: 'alt',
									name: 'alt'
								})
							],
						}),
					],
					preview: {
						select: {
							image: 'image',
							imageFilename: 'image.asset.originalFilename'
						},
						prepare({ image, imageFilename }) {
							return {
								title: 'Image',
								subtitle: imageFilename,
								media: image,
							}
						}
					}
				}),
			],
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'primaryMedia.image'
		},
		prepare({ title, media }) {
			return {
				title,
				media: media ? media : PlayIcon,
			}
		}
	}
})