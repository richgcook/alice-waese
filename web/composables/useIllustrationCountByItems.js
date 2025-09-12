export const useIllustrationCountByItems = (items, opts = {}) => {

	const { oneAbove = 8, twoAbove = 20 } = opts

	return {
		count: computed(() => {
			const n = Array.isArray(items) ? items.length : Number(items) || 0
			if (n > twoAbove) return 2
			if (n > oneAbove) return 1
			return 0
		})
	}

}