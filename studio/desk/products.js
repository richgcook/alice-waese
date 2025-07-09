import { CardsThreeIcon, SketchLogoIcon, TagIcon } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const productsStructure = (S, context) =>
S.listItem()
	.title('Jewellery')
	.icon(SketchLogoIcon)
	.child(
		S.list()
			.title('Jewellery')
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
				S.documentTypeListItem('product').title('Jewellery').icon(SketchLogoIcon),
				orderableDocumentListDeskItem({
					type: 'productCategory', 
					title: 'Categories',
					icon: TagIcon,
					S, context
				}),
				S.divider(),
				orderableDocumentListDeskItem({
					type: 'productCollection', 
					title: 'Collections',
					icon: CardsThreeIcon,
					S, context
				}),
			])
		)