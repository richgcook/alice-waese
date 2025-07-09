import { TextAlignLeftIcon, YoutubeLogoIcon, PlayIcon } from '@phosphor-icons/react'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: 'array',
	name: 'pageBuilderC',
	title: 'Page builder',
	of: [
		defineArrayMember({
			type: 'object',
			title: 'Text',
			name: 'textBlock',
			fields: [
				defineField({
					type: 'richText',
					title: 'Text',
					name: 'text',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'object',
					title: 'Settings',
					name: 'settings',
					fields: [
						defineField({
							type: 'string',
							title: 'Number of text columns',
							name: 'textColumnCount',
							options: {
								list: [
									{ title: '1', value: '1' },
									{ title: '2', value: '2' },
								],
							},
							initialValue: '1',
						}),
					],
				}),
			],
			preview: {
				select: {
					text: 'text'
				},
				prepare(selection) {
					const { text } = selection
					return {
						title: 'Text',
						subtitle: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
						media: TextAlignLeftIcon
					}
				}
			}
		}),
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
					type: 'richText',
					title: 'Caption',
					name: 'caption'
				}),
			],
			preview: {
				select: {
					caption: 'caption',
					image: 'image'
				},
				prepare(selection) {
					const { caption, image } = selection
					return {
						title: 'Image',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: image
					}
				},
			},
		}),
		defineArrayMember({
			type: 'object',
			title: 'Images (Grid)',
			name: 'imagesBlock',
			fields: [
				defineField({
					title: 'Images',
					name: 'images',
					type: 'array',
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
										defineField({
											type: 'alt',
											name: 'alt'
										}),
									],
									validation: Rule => Rule.required()
								}),
								defineField({
									type: 'richText',
									title: 'Caption',
									name: 'caption'
								}),
							],
							preview: {
								select: {
									caption: 'caption',
									image: 'image'
								},
								prepare(selection) {
									const { caption, image } = selection
									return {
										title: 'Image',
										subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
										media: image
									}
								}
							}
						}),
					]
				}),
			],
			preview: {
				select: {
					images: 'images',
					media: 'images.0.image'
				},
				prepare(selection) {
					const { images, media } = selection
					const imagesLength = typeof images == 'object' ? Object.keys(images).length : images.length
					return {
						title: `Images (${imagesLength})`,
						media: media
					}
				}
			}
		}),
		defineArrayMember({
			type: 'object',
			title: 'Embed',
			name: 'embedBlock',
			fields: [
				defineField({
					type: 'image',
					title: 'Cover/thumbnail image',
					name: 'coverImage',
					fields: [
						defineField({
							name: 'alt',
							type: 'alt'
						}),
					],
					description: 'This image will be used as a thumbnail for the embed block. If no image is provided, the embed code only will be used.',
				}),
				defineField({
					type: 'text',
					title: 'Embed code',
					name: 'embedCode',
					rows: 6,
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'richText',
					title: 'Caption',
					name: 'caption'
				}),
			],
			preview: {
				select: {
					caption: 'caption',
				},
				prepare(selection) {
					const { caption } = selection
					return {
						title: 'Embed',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: YoutubeLogoIcon
					}
				},
			},
		}),
		defineArrayMember({
			type: 'object',
			title: 'Video',
			name: 'videoBlock',
			fields: [
				defineField({
					type: 'file',
					title: 'Video',
					name: 'video',
					options: {
						accept: '.mp4'
					},
					validation: Rule => Rule.required(),
					description: 'The video will be autoplayed and looped. It will not have sound.',
				}),
				defineField({
					type: 'richText',
					title: 'Caption',
					name: 'caption',
				}),
			],
			preview: {
				select: {
					caption: 'caption',
				},
				prepare(selection) {
					const { caption } = selection
					return {
						title: 'Video',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: PlayIcon
					}
				},
			},
		}),
	]
})