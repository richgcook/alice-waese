export const useNewsArticlesYearRanges = (newsArticles) => {

	const generateYearRanges = () => {
		// Extract years from the articles
		let years = newsArticles.map(article => article.publishedDate.split('-')[0])

		// Deduplicate and sort in descending order
		years = [...new Set(years)].sort((a, b) => b - a)

		const currentYear = new Date().getFullYear()

		// Build ranges
		const ranges = []
		let tempRange = []

		years.forEach((year, index) => {
			if (Number(year) === currentYear) {
				// If the year is the current year, add it directly
				ranges.push({
					title: year,
					slug: year
				})
			} else {
				tempRange.push(year)

				// Create a range for every pair of years or at the end of the list
				if (tempRange.length === 2 || index === years.length - 1) {
					if (tempRange.length === 1) {
						ranges.push({
							title: tempRange[0], // Single year without a range
							slug: tempRange[0]
						})
					} else {
						ranges.push({
							title: `${tempRange[0]}–${tempRange[1]}`,
							slug: `${tempRange[0]}-${tempRange[1]}`
						})
					}
						tempRange = [] // Reset the temp range
					}
				}
			}
		)

		return ranges
	}
  
	// Get the most recent year or range
	// Needed for /news redirect
	const getMostRecentYearOrYearRange = () => {
		const ranges = generateYearRanges()
		return ranges.length > 0 ? ranges[0] : null // Return the first item (most recent year/range)
	}
  
	return {
		generateYearRanges,
		getMostRecentYearOrYearRange
	}
  }
  