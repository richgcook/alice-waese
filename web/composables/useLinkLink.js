export const useLinkLink = (link) => {
	if (!link) return null
	if (link.file) { // File link
		return link.file
	} else if (link.internal) { // Internal link
		return useInternalLinkUrl(link.internal)
	}
	return link.external // External link
}