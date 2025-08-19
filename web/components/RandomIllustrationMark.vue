<template>
	<img :src="`/illustrations/${randomIllustration}.png`" ref="illustration" v-show="ready" />
</template>

<script setup>

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
	top: {
		type: Object,
		default: () => ({ min: 30, max: 90 })
	},
	right: {
		type: Object,
		default: () => ({ min: 100, max: 200 })
	},
	topUnit: {
		type: String,
		default: '%'
  }
})

const illustrations = ['eye', 'hand', 'horse', 'spider']

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const uid = useId()

const randomIllustration = useState(`illu-${uid}-name`, () => illustrations[randInt(0, illustrations.length - 1)])

const randomTop = ref('0')
const randomRight = ref('0')

const ready = ref(false)

gsap.registerPlugin(ScrollTrigger)

const illustration = useTemplateRef('illustration')

onMounted(() => {
	randomTop.value = `${randInt(props.top.min, props.top.max)}${props.topUnit}`
	randomRight.value = `${randInt(props.right.min, props.right.max)}px`

	ready.value = true

	const travel = 200

	gsap.to(illustration.value, {
		y: () => window.innerHeight * -0.8,   // function evaluated on refresh
		ease: 'none',
		scrollTrigger: {
			trigger: illustration.value,
			start: "0 0",  
			end: "+=500", 
			scrub: true,
			//markers: true,
			invalidateOnRefresh: true,
			immediateRender: false // also helps avoid initial snap
		}
	})

})

</script>

<style lang="scss" scoped>

img {
	position: absolute;
	top: v-bind(randomTop);
	right: v-bind(randomRight);
	width: 43px;
	pointer-events: none;
}

</style>