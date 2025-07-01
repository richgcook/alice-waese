import { defineType, defineField } from 'sanity'

export default defineType({
	type: 'object',
	title: 'Hero',
	name: 'hero',
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
})