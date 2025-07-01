export const useInternalLinkUrl = (page) => {
	const { _type, slug } = page
	if (_type === 'project') return `/projects/${slug.current}`
	if (_type === 'projectType') return `/projects/type/${slug.current}`
	return `/${slug.current}`
}