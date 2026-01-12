import { defineType, defineField, defineArrayMember } from 'sanity'
import { LinkIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Press",
	name: "pressPage",
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
			type: 'array',
			title: 'Press',
			name: 'pressLinks',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'Article',
					title: 'article',
					fields: [
						defineField({
							type: 'string',
							title: 'Name',
							name: 'name',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'string',
							title: 'Location/Other',
							name: 'other',
						}),
						defineField({
							type: 'url',
							title: 'Link/URL',
							name: 'link',
							validation: Rule => Rule.required()
						}),
					],
					preview: {
						select: {
							title: 'name',
							other: 'other',
							url: 'link'
						},
						prepare(selection) {
							const { title, other, url } = selection
							return {
								title: other ? `${title} (${other})` : title,
								subtitle: url,
								media: LinkIcon,
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
})  