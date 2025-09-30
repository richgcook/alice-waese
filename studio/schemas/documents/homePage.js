import { defineType, defineField, defineArrayMember } from 'sanity'
import { PAGE_REFERENCES } from '../../constants'

export default defineType({
	type: "document",
	title: "Home",
	name: "homePage",
	fields: [
		defineField({
			type: 'object',
			title: 'Landing',
			name: 'landing',
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
		}),
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
							title: 'Link',
							name: 'link',
							description: 'Optional link for the image',
							fields: [
								defineArrayMember({
									type: 'object',
									title: 'Internal',
									name: 'internal',
									fields: [
										defineField({
											type: 'reference',
											title: 'Page',
											name: 'page',
											to: PAGE_REFERENCES,
											options: { 
												sort: [{ field: 'title', direction: 'asc' }]
											},
										}),
									],
								}),
								defineArrayMember({
									type: 'object',
									title: 'External',
									name: 'external',
									fields: [
										defineField({
											type: 'url',
											title: 'URL',
											name: 'url',
											validation: Rule => Rule.uri({scheme: ['tel', 'mailto', 'http', 'https']}).required()
										})
									],
								})
							],
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
									title: 'Theme mode (desktop)',
									name: 'themeMode',
								}),
								defineField({
									type: 'themeMode',
									title: 'Theme mode (phone)',
									name: 'themeModePhone',
									description: 'Overrides the theme mode on smaller screens if needed',
								}),
							],
						}),
					],
					preview: {
						select: {
							image: 'image',
							settingsPosition: 'settings.position',
						},
						prepare(selection) {
							const { image, settingsPosition } = selection
							return {
								title: 'Image',
								subtitle: settingsPosition === 'left' ? 'Left' : 'Right',
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