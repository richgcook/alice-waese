export const useIllustrationCount = (opts = {}) => {

	const { twoVh = 2, fourVh = 4, observe } = opts
	const count = ref(0)

	const compute = () => {
		const vh = window.innerHeight || 1
		const doc = Math.max(
			document.documentElement.scrollHeight,
			document.body.scrollHeight,
			document.documentElement.offsetHeight,
			document.body.offsetHeight
		)
		const ratio = doc / vh
		count.value = ratio < twoVh ? 0 : ratio < fourVh ? 1 : 2
	}

	onMounted(async () => {
		await nextTick()
		compute()

		window.addEventListener('resize', compute)
	})

	return {
		count,
		compute
	}

}