import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { TagIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Collection",
	name: "productCollection",
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
			description: 'Used in menus and navigation',
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
			type: 'string',
			title: 'Full title',
			name: 'titleFull',
			description: 'Full presentational title, used as the large title on the collection page',
		}),
		defineField({
			type: 'pageBuilderA',
			title: 'Content',
			name: 'pageBuilder',
		}),
		defineField({
			type: 'richText',
			title: 'Description',
			name: 'descriptionText',
		}),
		orderRankField(
			{ type: 'productCollection' }
		)
	],
	preview: {
		select: {
			title: 'title'
		},
		prepare({ title }) {
			return {
				title,
				media: TagIcon
			}
		}
	}
})