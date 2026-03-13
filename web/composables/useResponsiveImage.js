export const useResponsiveImage = (responsiveImageRef, opts = {}) => {
	const landscapeSrc = computed(() => {
		const responsiveImage = unref(responsiveImageRef)
		if (!responsiveImage) return null

		return responsiveImage.imageLandscape?.assetRef || responsiveImage.imagePortrait?.assetRef || null
	})

	const portraitSrc = computed(() => {
		const responsiveImage = unref(responsiveImageRef)
		if (!responsiveImage) return null

		return responsiveImage.imagePortrait?.assetRef || responsiveImage.imageLandscape?.assetRef || null
	})

	const alt = computed(() => {
		const responsiveImage = unref(responsiveImageRef)
		if (!responsiveImage) return ''

		return responsiveImage.imageLandscape?.alt || responsiveImage.imagePortrait?.alt || ''
	})

	return {
		landscapeSrc,
		portraitSrc,
		alt,
	}
}

