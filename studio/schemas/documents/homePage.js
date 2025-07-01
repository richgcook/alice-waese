import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Home",
	name: "homePage",
	fields: [
		defineField({
			type: 'pageBuilderB',
			title: 'Landing content',
			name: 'landingContent',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Home'
			}
		}
	}
})