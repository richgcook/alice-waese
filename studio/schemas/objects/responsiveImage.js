import { defineType, defineField } from 'sanity'

export default defineType({
	type: 'object',
	title: 'Responsive image',
	name: 'responsiveImage',
	fields: [
		defineField({
			type: 'image',
			title: 'Image',
			name: 'imageLandscape',
			options: {
				collapsible: false,
				collapsed: false,
			},
			fields: [
				defineField({
					type: 'alt',
					name: 'alt',
				}),
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			type: 'image',
			title: 'Phone (portrait) image',
			name: 'imagePortrait',
			fields: [
				defineField({
					type: 'alt',
					name: 'alt',
				}),
			],
		}),
	],
})
