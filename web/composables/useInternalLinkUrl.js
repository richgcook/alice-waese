export const useInternalLinkUrl = (page) => {
	const { _type, slug } = page
	if (_type === 'stockistsPage') return `/about/${slug.current}`
	if (_type === 'pressPage') return `/about/${slug.current}`
	if (_type === 'pageA') return `/about/${slug.current}`
	if (_type === 'product') return `/jewelry/${slug.current}`
	if (_type === 'productCategory') return `/jewelry/type/${slug.current}`
	if (_type === 'productCollection') return `/jewelry/collections/${slug.current}`
	if (_type === 'artwork') return `/artwork/${slug.current}`
	if (_type === 'artworkCategory') return `/artwork/type/${slug.current}`
	if (_type === 'collaboration') return `/collaborations/${slug.current}`
	return `/${slug.current}`
}