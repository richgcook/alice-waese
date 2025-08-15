import Lenis from '@studio-freight/lenis'

export const useLenis = () => {

	const grid = ref(null)
	const clone = ref(null)
	let lenis

	onMounted(() => {

		lenis = new Lenis({
			smoothWheel: true,
			smoothTouch: true,
			infinite: true,
		})

		const raf = (time) => {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)

		/*
		setTimeout(() => {
			lenis.scrollTo(0, {
				immediate: true,
			})
			grid.value.classList.add('--ready')
			clone.value.classList.add('--ready')
		}, 100)
		*/
		
	})

	onUnmounted(() => {
		if (lenis) {
			/*
			lenis.scrollTo(0, {
				immediate: true,
			})
			*/
			lenis.destroy()
		}
	})

  return { grid, clone }

}