import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Home",
	name: "homePage",
	fields: [
		defineField({
			type: 'array',
			title: 'Content',
			name: 'content',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Image',
					name: 'imageBlock',
					fields: [
						defineField({
							type: 'image',
							title: 'Image',
							name: 'image',
							fields: [
								{
									type: 'alt',
									name: 'alt'
								}
							],
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'object',
							title: 'Settings',
							name: 'settings',
							fields: [
								defineField({
									type: 'string',
									title: 'Position',
									name: 'position',
									options: {
										list: [
											{ title: 'Left', value: 'left' },
											{ title: 'Right', value: 'right' },
										],
									},
									initialValue: 'left',
								}),
								defineField({
									type: 'themeMode',
									title: 'Theme mode',
									name: 'themeMode',
								}),
							],
						}),
					],
					preview: {
						select: {
							image: 'image'
						},
						prepare(selection) {
							const { image } = selection
							return {
								title: 'Image',
								media: image
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
	],
	preview: {
		prepare() {
			return {
				title: 'Home'
			}
		}
	}
})