import { PaletteIcon, TagIcon } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const artworksStructure = (S, context) =>
S.listItem()
	.title('Artworks')
	.icon(PaletteIcon)
	.child(
		S.list()
			.title('Artworks')
			.items([
				/*
				S.listItem()
				.title('Overview')
				.icon(FileIcon)
				.child(
					S.document()
					.id('projectsPage')
					.schemaType('projectsPage')
					.documentId('projectsPage')
				),
				*/
				S.divider(),
				S.documentTypeListItem('artwork').title('Artworks').icon(PaletteIcon),
				orderableDocumentListDeskItem({
					type: 'artworkCategory', 
					title: 'Categories',
					icon: TagIcon,
					S, context
				})
			])
		)