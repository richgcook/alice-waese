import { FileIcon, UsersThreeIcon } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const collaborationsStructure = (S, context) =>
S.listItem()
	.title('Collaborations')
	.icon(UsersThreeIcon)
	.child(
		S.list()
			.title('Collaborations')
			.items([
				S.listItem()
				.title('Overview')
				.icon(FileIcon)
				.child(
					S.document()
					.id('collaborationsPage')
					.schemaType('collaborationsPage')
					.documentId('collaborationsPage')
				),
				S.divider(),
				S.documentTypeListItem('collaboration').title('Collaborations').icon(UsersThreeIcon),
			])
		)