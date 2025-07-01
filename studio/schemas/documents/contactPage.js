import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Contact",
	name: "contactPage",
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
			type: 'richText',
			title: 'Details',
			name: 'details',
			validation: Rule => Rule.required(),
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})  