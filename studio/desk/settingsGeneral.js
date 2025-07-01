import { GearIcon } from '@phosphor-icons/react'

export const settingsStructure = (S, context) =>
S.listItem()
	.title('Settings')
	.icon(GearIcon)
		.child(
			S.list()
				.title('Settings')
				.items([
					S.listItem()
						.title('General')
						.icon(GearIcon)
						.child(
							S.editor()
								.id('settingsGeneral')
								.schemaType('settingsGeneral')
								.documentId('settingsGeneral')
								.title('General')
						)
				])
		)