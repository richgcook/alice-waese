import { TextAlignLeftIcon, PlayIcon } from '@phosphor-icons/react'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: 'array',
	name: 'pageBuilderB',
	title: 'Content',
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
				defineField({
					type: 'object',
					title: 'Settings',
					name: 'settings',
					fields: [
						defineField({
							type: 'string',
							title: 'Image size',
							name: 'imageSize',
							options: {
								list: [
									{ title: 'Framed', value: 'framed' },
									{ title: 'Fullbleed', value: 'fullbleed' },
								],
							},
							initialValue: 'framed',
						}),
						defineField({
							type: 'themeMode',
							title: 'Theme mode',
							name: 'themeMode',
							hidden: ({ parent }) => parent.imageSize === 'framed',
						}),
					],
				}),
			],
			preview: {
				select: {
					caption: 'caption',
					image: 'image',
					imageSize: 'settings.imageSize',
				},
				prepare(selection) {
					const { caption, image, imageSize } = selection
					const subtitle = () => {
						if (!caption) return imageSize[0].toUpperCase() + imageSize.slice(1)
						if (caption) {
							return caption[0].children[0].text.substring(0, 50) + '...'
						}
					}
					return {
						title: 'Image',
						subtitle: subtitle(),
						media: image
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
				defineField({
					type: 'object',
					title: 'Settings',
					name: 'settings',
					fields: [
						defineField({
							type: 'string',
							title: 'Video size',
							name: 'videoSize',
							options: {
								list: [
									{ title: 'Framed', value: 'framed' },
									{ title: 'Fullbleed', value: 'fullbleed' },
								],
							},
							initialValue: 'framed',
						}),
					],
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