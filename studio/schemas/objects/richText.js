import { ArrowSquareInIcon, ArrowSquareOutIcon, FileArrowDownIcon } from '@phosphor-icons/react'
import { PAGE_REFERENCES } from '../../constants'

export default {
	type: 'array',
	title: 'Text',
	name: 'richText',
	of: [
		{ 
			type: 'block',
			styles: [
				{ 
					title: 'Normal', 
					value: 'normal',
				},
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' }
			],
			marks: {
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' },
				],
				annotations: [
					{
						name: 'internalLink',
						type: 'object',
						title: 'Internal link',
						icon: ArrowSquareInIcon,
						fields: [
							{
								name: 'reference',
								type: 'reference',
								title: 'Reference',
								to: PAGE_REFERENCES,
							},
						],
					},
					{
						name: 'link',
						type: 'object',
						title: 'External link',
						icon: ArrowSquareOutIcon,
						fields: [
							{
								name: 'href',
								type: 'url',
								title: 'URL',
								validation: Rule => Rule.uri({
									scheme: ['https', 'http', 'mailto', 'tel']
								})
							},
							{
								title: 'Open in new tab',
								name: 'blank',
								type: 'boolean'
							},
						],
					},
					{
						name: 'fileUploadLink',
						type: 'object',
						title: 'File upload',
						icon: FileArrowDownIcon,
						fields: [
							{
								type: 'file',
								title: 'File upload',
								name: 'file'
							},
						],
					},
				]
			}
		}
	]
}