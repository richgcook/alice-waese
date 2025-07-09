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