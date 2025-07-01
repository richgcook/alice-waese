import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { TagIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Type",
	name: "projectType",
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
		orderRankField(
			{ type: 'projectType' }
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