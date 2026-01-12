import { useFormValue } from 'sanity'

export const DocumentBasedPageBuilderAInput = (props) => {
	const { schemaType, renderDefault } = props
	const documentType = useFormValue(['_type'])

	const allowedTypes = schemaType.of.filter((type) => {

		if (documentType !== 'artworkCategory' && type.name === 'artworkBlock') {
			return false
		}

		const productBlockAllowed = ['productCategory', 'productCollection']
		if (!productBlockAllowed.includes(documentType) && type.name === 'productBlock') {
			return false
		}

		if (documentType !== 'collaboration' && type.name === 'collaborationBlock') {
			return false
		}

		return true
	})

	return renderDefault({
		...props,
		schemaType: {
			...schemaType,
			of: allowedTypes,
		},
	})
}
