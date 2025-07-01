import { defineType } from 'sanity'

export default defineType({
	type: 'string',
	title: 'Theme mode',
	name: 'themeMode',
	options: {
		list: [
			{ title: 'Black', value: 'light' },
			{ title: 'White', value: 'dark' },
		]
	},
	initialValue: 'light',
	description: 'Black text/assets or white text/assets'
})