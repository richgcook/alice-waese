export const useEagerSlideLoading = (slideNodes, currentSlideIndex, options = { preloadRange: 2 }) => {

	const processedSlides = new Set()

	const setEagerLoading = (index) => {
		const allSlides = slideNodes()
		const totalSlides = allSlides.length
	
		 // Wrap the index around if it is out of bounds
		const validIndex = (index + totalSlides) % totalSlides
	
		if (!processedSlides.has(validIndex)) {
			const slide = allSlides[validIndex]
			const images = slide.querySelectorAll('img')
	
			if (images?.length) {
				images.forEach(image => {
					image.setAttribute('loading', 'eager')
					// Mark this slide as processed
					processedSlides.add(validIndex)
				})
			}
		}
		
	}

	const setEagerLoadingForClosestSlides = () => {
        const range = options.preloadRange
        for (let i = 1; i <= range; i++) {
            setEagerLoading(currentSlideIndex.value + i)
            setEagerLoading(currentSlideIndex.value - i)
        }
    }

	return {
        setEagerLoadingForClosestSlides,
    }

}