import { FileIcon, StackIcon, TagIcon } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const projectsStructure = (S, context) =>
S.listItem()
	.title('Projects')
	.icon(StackIcon)
	.child(
		S.list()
			.title('Projects')
			.items([
				S.listItem()
				.title('Overview')
				.icon(FileIcon)
				.child(
					S.document()
					.id('projectsPage')
					.schemaType('projectsPage')
					.documentId('projectsPage')
				),
				S.divider(),
				orderableDocumentListDeskItem({
					type: 'project', 
					title: 'Projects',
					icon: StackIcon,
					S, context
				}),
				orderableDocumentListDeskItem({
					type: 'projectType', 
					title: 'Types',
					icon: TagIcon,
					S, context
				})
			])
		)