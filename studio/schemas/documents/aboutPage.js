import { defineType, defineField } from 'sanity'

export default defineType({
	type: "document",
	title: "About",
	name: "aboutPage",
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
			title: 'Featured image',
			name: 'featuredImage',
			fields: [
				defineField({
					type: 'image',
					title: 'Image',
					name: 'image',
					fields: [
						{
							type: 'alt',
							name: 'alt'
						}
					]
				}),
				defineField({
					type: 'richText',
					title: 'Caption',
					name: 'caption',
				})
			]
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})  