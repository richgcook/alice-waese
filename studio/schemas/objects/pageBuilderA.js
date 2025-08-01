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
					title: 'Settings',
					name: 'settings',
					fields: [
						defineField({
							type: 'number',
							title: 'Size',
							name: 'size',
							description: 'Defines how wide the image should appear in a 5/6 block, as a percentage (50 to 100)',
							initialValue: 100,
							validation: Rule => Rule.min(50).max(100),
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
					title: 'Settings',
					name: 'settings',
					fields: [
						defineField({
							type: 'number',
							title: 'Size',
							name: 'size',
							description: 'Defines how wide the image should appear in its column, as a percentage (50 to 100)',
							initialValue: 100,
							validation: Rule => Rule.min(50).max(100),
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