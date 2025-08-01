import { defineType, defineField, defineArrayMember } from 'sanity'
import { ArrowRightIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Stockists",
	name: "stockistsPage",
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
			type: 'array',
			title: 'Stockists',
			name: 'stockists',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'stockist',
					title: 'Stockist',
					fields: [
						defineField({
							type: 'string',
							title: 'Name',
							name: 'name',
							validation: Rule => Rule.required()
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
							url: 'link'
						},
						prepare(selection) {
							const { title, url } = selection
							return {
								title,
								subtitle: url,
								media: ArrowRightIcon,
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