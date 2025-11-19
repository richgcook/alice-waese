import { CardsThreeIcon, SketchLogoIcon, TagIcon } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const productsStructure = (S, context) =>
S.listItem()
	.title('Jewelry')
	.icon(SketchLogoIcon)
	.child(
		S.list()
			.title('Jewelry')
			.items([
				S.divider(),
				S.documentTypeListItem('product').title('Jewelry').icon(SketchLogoIcon),
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