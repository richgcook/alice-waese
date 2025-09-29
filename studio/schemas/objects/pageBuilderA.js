import { TextAlignLeftIcon, YoutubeLogoIcon, PlayIcon } from '@phosphor-icons/react'
import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentBasedPageBuilderAInput } from '../../components/DocumentBasedPageBuilderAInput'

export default defineType({
	type: 'array',
	name: 'pageBuilderA',
	title: 'Content',
	of: [
		defineArrayMember({
			type: 'object',
			title: 'Jewellery',
			name: 'productBlock',
			fields: [
				defineArrayMember({
					type: 'reference',
					title: 'Item',
					name: 'product',
					to: [{ type: 'product' }],
					validation: Rule => Rule.required(),
				}),
				defineField({
					type: 'object',
					title: 'Media',
					name: 'mediaOverride',
					description: "If you want to a) use a custom image/video instead of the product's primary image or b) add a hover state image",
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
							type: 'image',
							title: 'Image (hover state)',
							name: 'imageHoverState',
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
					type: 'object',
					title: 'Settings',
					name: 'settings',
					fields: [
						defineField({
							type: 'string',
							title: 'Size',
							name: 'size',
							options: {
								list: [
									{ title: 'Large', value: 'large' },
									{ title: 'Medium', value: 'medium' },
									{ title: 'Small', value: 'small' },
								]
							},
							initialValue: 'large',
							description: 'Defines how wide the image should appear in a 5/6 block',
							initialValue: 100,
							validation: Rule => Rule.required(),
						}),
					],
				}),
			],
			preview: {
				select: {
					title: 'product.title',
					image: 'product.primaryMedia.image',
				},
				prepare(selection) {
					const { title, image } = selection
					return {
						title,
						subtitle: 'Jewellery',
						media: image ? image : PlayIcon,
					}
				},
			},
		}),
		defineArrayMember({
			type: 'object',
			title: 'Artwork',
			name: 'artworkBlock',
			fields: [
				defineArrayMember({
					type: 'reference',
					title: 'Item',
					name: 'artwork',
					to: [{ type: 'artwork' }],
					validation: Rule => Rule.required(),
				}),
				defineField({
					type: 'object',
					title: 'Media',
					name: 'mediaOverride',
					description: "If you want to use a custom image instead of the artwork's primary image",
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
					type: 'object',
					title: 'Settings',
					name: 'settings',
					fields: [
						defineField({
							type: 'string',
							title: 'Size',
							name: 'size',
							options: {
								list: [
									{ title: 'Large', value: 'large' },
									{ title: 'Medium', value: 'medium' },
									{ title: 'Small', value: 'small' },
								]
							},
							initialValue: 'large',
							description: 'Defines how wide the image should appear in its column',
							initialValue: 100,
							validation: Rule => Rule.required(),
						}),
					],
				}),
			],
			preview: {
				select: {
					title: 'artwork.title',
					image: 'artwork.primaryMedia.image',
				},
				prepare(selection) {
					const { title, image } = selection
					return {
						title,
						subtitle: 'Artwork',
						media: image ? image : PlayIcon,
					}
				},
			},
		}),
	],
	components: {
    	input: DocumentBasedPageBuilderAInput,
    },
})