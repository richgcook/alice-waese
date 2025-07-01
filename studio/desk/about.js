import { FilesIcon, FileIcon, QuestionMarkIcon } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const aboutStructure = (S, context) =>
S.listItem()
	.title('About')
	.icon(QuestionMarkIcon)
	.child(
		S.list()
			.title('About')
			.items([
				S.listItem()
				.title('Overview')
				.icon(FileIcon)
				.child(
					S.document()
					.id('aboutPage')
					.schemaType('aboutPage')
					.documentId('aboutPage')
				),
				S.divider(),
				orderableDocumentListDeskItem({
					type: 'aboutSubPageA', 
					title: 'Pages',
					icon: FilesIcon,
					S, context
				}),
			])
		)