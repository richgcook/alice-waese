import { FileIcon, ArticleIcon } from '@phosphor-icons/react'

export const newsStructure = (S, context) =>
S.listItem()
	.title('News')
	.icon(ArticleIcon)
	.child(
		S.list()
			.title('News')
			.items([
				S.listItem()
				.title('Overview')
				.icon(FileIcon)
				.child(
					S.document()
					.id('newsPage')
					.schemaType('newsPage')
					.documentId('newsPage')
				),
				S.divider(),
				S.documentTypeListItem('newsArticle').title('Articles').icon(ArticleIcon),
			])
		)