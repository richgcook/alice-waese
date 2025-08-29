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

const width = computed(() => {
	if (randomIllustration.value == 'eye') {
		return `50px`
	} else if (randomIllustration.value == 'hand') {
		return `80px`
	} else if (randomIllustration.value == 'horse') {
		return `42px`
	} else if (randomIllustration.value == 'spider') {
		return `68px`
	} else {
		return '43px'
	}
})

const ready = ref(false)

gsap.registerPlugin(ScrollTrigger)

const illustration = useTemplateRef('illustration')

onMounted(() => {
	randomTop.value = `${randInt(props.top.min, props.top.max)}${props.topUnit}`
	randomRight.value = `${randInt(props.right.min, props.right.max)}px`

	ready.value = true

	gsap.to(illustration.value, {
		y: () => window.innerHeight * -0.8,   // function evaluated on refresh
		ease: 'none',
		scrollTrigger: {
			trigger: illustration.value,
			start: "0 0",  
			end: "+=500", 
			scrub: true,
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
	width: v-bind(width);
	pointer-events: none;
}

</style>