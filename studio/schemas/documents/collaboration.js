import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { UsersThreeIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Collaboration",
	name: "collaboration",
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
			{ type: 'collaboration' }
		)
	],
	preview: {
		select: {
			title: 'title'
		},
		prepare({ title }) {
			return {
				title,
				media: UsersThreeIcon
			}
		}
	}
})