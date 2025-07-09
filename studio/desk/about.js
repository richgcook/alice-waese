import { FilesIcon, FileIcon, QuestionMarkIcon, BasketIcon, NewspaperClippingIcon } from '@phosphor-icons/react'
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
				.title('About')
				.icon(QuestionMarkIcon)
				.child(
					S.document()
					.id('aboutPage')
					.schemaType('aboutPage')
					.documentId('aboutPage')
				),
				S.listItem()
				.title('Stockists')
				.icon(BasketIcon)
				.child(
					S.document()
					.id('stockistsPage')
					.schemaType('stockistsPage')
					.documentId('stockistsPage')
				),
				S.listItem()
				.title('Press')
				.icon(NewspaperClippingIcon)
				.child(
					S.document()
					.id('pressPage')
					.schemaType('pressPage')
					.documentId('pressPage')
				),
			])
		)