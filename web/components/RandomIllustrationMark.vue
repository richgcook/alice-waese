<template>
	<img :src="`/illustrations/${randomIllustration}.png`" ref="illustration" v-show="ready" />
</template>

<script setup>

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
	top: {
		type: Object,
		default: () => ({ min: 30, max: 90 })
	},
	right: {
		type: Object,
		default: () => ({ min: 100, max: 200 })
	},
	left: {
		type: Object,
		default: () => ({ min: 200, max: 250 })
	},
	topUnit: {
		type: String,
		default: '%'
	},
	side: { 
		type: String, 
		default: 'right' 
	},
})

const illustrations = ['eye', 'hand', 'horse', 'spider']

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const uid = useId()

const randomIllustration = useState(`illu-${uid}-name`, () => illustrations[randInt(0, illustrations.length - 1)])

const randomTop = ref('0')
const randomRight = ref('auto')
const randomLeft  = ref('auto')

const width = computed(() => {
	if (randomIllustration.value == 'eye') {
		return `40px`
	} else if (randomIllustration.value == 'hand') {
		return `40px`
	} else if (randomIllustration.value == 'horse') {
		return `40px`
	} else if (randomIllustration.value == 'spider') {
		return `40px`
	} else {
		return '40px'
	}
})

const ready = ref(false)

gsap.registerPlugin(ScrollTrigger)

const illustration = useTemplateRef('illustration')

onMounted(async () => {

	randomTop.value = `${randInt(props.top.min, props.top.max)}${props.topUnit}`

	if (props.side === 'left') {
		randomLeft.value  = `${randInt(props.left.min, props.left.max)}px`
		randomRight.value = 'auto'
	} else {
		randomRight.value = `${randInt(props.right.min, props.right.max)}px`
		randomLeft.value  = 'auto'
	}

	ready.value = true

	await nextTick() // ensure styles are applied so measurements are correct

	const pageY = () => (window.pageYOffset || document.documentElement.scrollTop || 0)
	const absTop = () => illustration.value.getBoundingClientRect().top + pageY()
	const startPos = () => absTop() - window.innerHeight // when element's top hits bottom of viewport
	const endPos   = () => startPos() + window.innerHeight // run for one viewport height


	gsap.to(illustration.value, {
		y: () => window.innerHeight * -0.8,
		ease: 'none',
		scrollTrigger: {
			start: startPos,
      		end: endPos,
			scrub: true,
			invalidateOnRefresh: true,
			immediateRender: false,
			//markers: true,
		}
	})

})

</script>

<style lang="scss" scoped>

img {
	position: absolute;
	top: v-bind(randomTop);
	right: v-bind(randomRight);
	left:  v-bind(randomLeft);
	width: v-bind(width);
	pointer-events: none;
}

</style>