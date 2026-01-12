import { defineType, defineField, defineArrayMember } from 'sanity'
import { LinkIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Collaborations",
	name: "collaborationsPage",
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
			readOnly: true,
			validation: Rule => Rule.required(),
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})  