import { defineType, defineField, defineArrayMember } from 'sanity'
import { ArrowSquareInIcon, ArrowSquareOutIcon, FileArrowDownIcon } from '@phosphor-icons/react'
import { PAGE_REFERENCES } from '../../constants'

export default defineType({
	type: 'document',
	title: 'General settings',
	name: 'settingsGeneral',
	fields: [
		defineField({
			type: 'array',
			title: 'Footer links',
			name: 'footerItems',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Internal link',
					name: 'internalLink',
					fields: [
						defineField({
							type: 'reference',
							title: 'Page',
							name: 'page',
							to: PAGE_REFERENCES,
						}),
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
							description: 'If no label is provided, the page title will be used',
						}),
					],
					preview: {
						select: {
							pageTitle: 'page.title',
							label: 'label',
						},
						prepare(selection) {
							const { pageTitle, label } = selection
							return {
								title: label || pageTitle,
								subtitle: 'Internal',
								media: ArrowSquareInIcon
							}
						}
					},
				}),
				defineArrayMember({
					type: 'object',
					title: 'External link',
					name: 'externalLink',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'url',
							title: 'URL',
							name: 'url',
							validation: Rule => Rule.uri({scheme: ['tel', 'mailto', 'http', 'https']}).required()
						})
					],
					preview: {
						select: {
							label: 'label',
						},
						prepare(selection) {
							const { label } = selection
							return {
								title: label,
								subtitle: 'External',
								media: ArrowSquareOutIcon,
							}
						}
					},
				}),
				defineArrayMember({
					type: 'object',
					title: 'File',
					name: 'fileUpload',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'file',
							title: 'File',
							name: 'file',
							validation: Rule => Rule.required()
						}),
					],
					preview: {
						select: {
							label: 'label',
						},
						prepare(selection) {
							const { label } = selection
							return {
								title: label,
								subtitle: 'File',
								media: FileArrowDownIcon,
							}
						}
					},
				}),
			],
			validation: Rule => Rule.unique()
		}),
	]
})