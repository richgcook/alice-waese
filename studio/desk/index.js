import { HouseIcon, AtIcon } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

import { projectsStructure } from './projects'
import { aboutStructure } from './about'
import { newsStructure } from './news'
import { settingsStructure } from './settingsGeneral'

const hiddenDocTypes = listItem => 
	![
		'homePage',
		'settingsGeneral',
		'contactPage',
		'projectsPage',
		'project',
		'projectType',
		'aboutPage',
		'aboutSubPageA',
		'newsPage',
		'newsArticle',
	]
.includes(listItem.getId())

export const deskStructure = (S, context) =>

  	S.list()
	.title('Content')
	.items([

		S.listItem()
		.title('Home')
		.icon(HouseIcon)
		.child(
			S.document()
			.id('homePage')
			.schemaType('homePage')
			.documentId('homePage')
		),

		aboutStructure(S, context),

		projectsStructure(S, context),

		newsStructure(S, context),

		S.listItem()
		.title('Contact')
		.icon(AtIcon)
		.child(
			S.document()
			.id('contactPage')
			.schemaType('contactPage')
			.documentId('contactPage')
		),

		S.divider(),

		settingsStructure(S, context),

		// Filter out docs already defined above
		...S.documentTypeListItems().filter(hiddenDocTypes),
		
	])