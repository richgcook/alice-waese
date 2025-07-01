import { defineType, defineField } from 'sanity'
import { PlayIcon } from '@phosphor-icons/react'


export default defineType({
	type: "document",
	title: "Article",
	name: "newsArticle",
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
			type: 'date',
			title: 'Published date',
			name: 'publishedDate',
			options: {
				dateFormat: 'DD.MM.YYYY',
				calendarTodayLabel: 'Today'
			},
			validation: Rule => Rule.required(),
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
				defineField({
					type: 'richText',
					title: 'Caption',
					name: 'caption',
				})
			],
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'richText',
			title: 'Details',
			name: 'details',
			validation: Rule => Rule.required()
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
	preview: {
		select: {
			title: 'title',
			publishedDate: 'publishedDate',
			media: 'featuredMedia.image',
		},
		prepare(selection) {
			const { title, publishedDate, media } = selection
			const monthAndYear = new Date(publishedDate).toLocaleString('default', {
				month: 'long',
				year: 'numeric'
			})
			return {
				title: title,
				subtitle: monthAndYear,
				media: media ? media : PlayIcon,
			}
		}
	},
})