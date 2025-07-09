import { HouseIcon, FilesIcon, AtIcon } from '@phosphor-icons/react'

import { productsStructure } from './products'
import { artworksStructure } from './artworks'

import { aboutStructure } from './about'
import { settingsStructure } from './settingsGeneral'

const hiddenDocTypes = listItem => 
	![
		'homePage',
		'settingsGeneral',
		'pressPage',
		'stockistsPage',
		'product',
		'productCategory',
		'productCollection',
		'artwork',
		'artworkCategory',
		'aboutPage',
		'pageA',
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

		productsStructure(S, context),

		artworksStructure(S, context),

		S.documentTypeListItem('pageA').title('Pages').icon(FilesIcon),

		S.divider(),

		settingsStructure(S, context),

		// Filter out docs already defined above
		...S.documentTypeListItems().filter(hiddenDocTypes),
		
	])