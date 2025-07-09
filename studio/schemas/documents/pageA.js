import { defineType, defineField, defineArrayMember } from 'sanity'
import { TextTIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Page",
	name: "pageA",
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
		}),
		defineField({
			type: 'slug',
			title: 'Slug',
			name: 'slug',
			options: {
				source: 'title'
			},
		}),
		defineField({
			type: 'array',
			title: 'Content',
			name: 'content',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Text',
					name: 'textBlock',
					fields: [
						defineField({
							type: 'richText',
							title: 'Text',
							name: 'text',
							validation: Rule => Rule.required(),
						}),
					],
					preview: {
						select: {
							text: 'text'
						},
						prepare(selection) {
							const { text } = selection
							return {
								title: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
								media: TextTIcon,
							}
						},
					},
				}),
			]
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	]
})