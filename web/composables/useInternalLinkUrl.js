export const useInternalLinkUrl = (page) => {
	const { _type, slug } = page
	if (_type === 'stockistsPage') return `/about/${slug.current}`
	if (_type === 'pressPage') return `/about/${slug.current}`
	if (_type === 'pageA') return `/about/${slug.current}`
	if (_type === 'product') return `/jewellery/${slug.current}`
	if (_type === 'productCategory') return `/jewellery/type/${slug.current}`
	if (_type === 'productCollection') return `/jewellery/collections/${slug.current}`
	if (_type === 'artwork') return `/artworks/${slug.current}`
	if (_type === 'artworkCategory') return `/artworks/type/${slug.current}`
	return `/${slug.current}`
}