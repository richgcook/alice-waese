import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { PlayIcon } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Project",
	name: "project",
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
			type: 'number',
			title: 'Numeral (Arabic)',
			name: 'numeralArabic',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'text',
			title: 'Subtitle',
			name: 'subtitle',
			rows: 2,
			description: 'Optional',
		}),
		defineField({
			type: 'object',
			title: 'Featured media',
			name: 'featuredMedia',
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
			title: 'Type(s)',
			name: 'types',
			of: [{
				type: 'reference',
				to: [{ type: 'projectType' }]
			}],
		}),
		defineField({
			type: 'pageBuilderA',
			title: 'Content',
			name: 'pageBuilder',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
		orderRankField(
			{ type: 'project' }
		)
	],
	preview: {
		select: {
			title: 'title',
			media: 'featuredMedia.image'
		},
		prepare({ title, media }) {
			return {
				title,
				media: media ? media : PlayIcon,
			}
		}
	}
})