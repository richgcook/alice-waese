<template>
	<img :src="`/illustrations/${randomIllustration}.png`" ref="illustration" v-show="ready" />
</template>

<script setup>

import { useIllustrationPoolStore } from '~/store/illustrationPool'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
	top: {
		type: Object,
		default: () => ({ min: 30, max: 60 })
	},
	topPhone: {
		type: Object,
		default: () => ({ min: 30, max: 60 })
	},
	topIfOnLeft: {
		type: Object,
		default: () => ({ min: 80, max: 90 })
	},
	topIfOnLeftPhone: {
		type: Object,
		default: () => ({ min: 80, max: 90 })
	},
	right: {
		type: Object,
		default: () => ({ min: 100, max: 200 })
	},
	rightPhone: {
		type: Object,
		default: () => ({ min: 35, max: 50 })
	},
	left: {
		type: Object,
		default: () => ({ min: 200, max: 250 })
	},
	leftPhone: {
		type: Object,
		default: () => ({ min: 100, max: 120 })
	},
	topUnit: {
		type: String,
		default: '%'
	},
	side: { 
		type: String, 
		default: 'right' 
	},
	name: {
		type: String,
		default: null,
	},
	hideOnPhone: {
		type: Boolean,
		default: false,
	},
	onlyShowOnPhone: {
		type: Boolean,
		default: false,
	},
	immediateStart: { 
		type: Boolean, 
		default: false 
	},
})

const illustrationPool = useIllustrationPoolStore()

const randomIllustration = ref(props.name || null)
if (!randomIllustration.value) {
	randomIllustration.value = illustrationPool.drawOne()
}

const randomTop = ref('0')
const randomTopPhone = ref('0')
const randomRight = ref('auto')
const randomRightPhone = ref('auto')
const randomLeft  = ref('auto')
const randomLeftPhone = ref('auto')

const width = computed(() => {
	if (randomIllustration.value == 'bear') {
		return `50px`
	} else if (randomIllustration.value == 'bunny-ears') {
		return `35px`
	} else if (randomIllustration.value == 'cat') {
		return `40px`
	} else if (randomIllustration.value == 'elephant') {
		return `50px`
	} else if (randomIllustration.value == 'figure') {
		return `40px`
	} else if (randomIllustration.value == 'eye') {
		return `38px`
	} else if (randomIllustration.value == 'hand') {
		return `60px`
	} else if (randomIllustration.value == 'horse') {
		return `35px`
	} else if (randomIllustration.value == 'spider') {
		return `43px`
	} else {
		return '40px'
	}
})

const hideOnPhone = computed(() => {
	if (props.hideOnPhone) return `none`
	return `initial`
})

const onlyShowOnPhone = computed(() => {
	if (props.onlyShowOnPhone) return `none`
	return `block`
})

const ready = ref(false)

gsap.registerPlugin(ScrollTrigger)

const illustration = useTemplateRef('illustration')

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

onMounted(async () => {

	if (props.side === 'left') {
		randomTop.value = `${randInt(props.topIfOnLeft.min, props.topIfOnLeft.max)}${props.topUnit}`
		randomTopPhone.value = `${randInt(props.topIfOnLeftPhone.min, props.topIfOnLeftPhone.max)}${props.topUnit}`
		randomLeft.value  = `${randInt(props.left.min, props.left.max)}px`
		randomRight.value = 'auto'
		randomLeftPhone.value  = `${randInt(props.leftPhone.min, props.leftPhone.max)}px`
		randomRightPhone.value = 'auto'
	} else {
		randomTop.value = `${randInt(props.top.min, props.top.max)}${props.topUnit}`
		randomTopPhone.value = `${randInt(props.topPhone.min, props.topPhone.max)}${props.topUnit}`
		randomRight.value = `${randInt(props.right.min, props.right.max)}px`
		randomLeft.value  = 'auto'
		randomRightPhone.value = `${randInt(props.rightPhone.min, props.rightPhone.max)}px`
		randomLeftPhone.value  = 'auto'
	}

	ready.value = true

	await nextTick() // ensure styles are applied so measurements are correct

	const pageY = () => (window.pageYOffset || document.documentElement.scrollTop || 0)
	const absTop = () => illustration.value.getBoundingClientRect().top + pageY()
	const startPos = () => absTop() - window.innerHeight // when element's top hits bottom of viewport
	const endPos   = () => startPos() + window.innerHeight // run for one viewport height

	const stConfig = props.immediateStart
    // Start right away and run for 1 viewport height.
    // Use ScrollTrigger.scroll() so it also works if the page loads mid-scroll.
    ? { start: () => '0 0', end: () => `+=${window.innerHeight}` }
    // Start when element enters viewport (your original numeric logic)
    : { start: startPos, end: endPos }

	gsap.to(illustration.value, {
		y: () => window.innerHeight * -0.8,
		ease: 'none',
		scrollTrigger: {
			...stConfig,
			scrub: true,
			invalidateOnRefresh: true,
			immediateRender: false,
		}
	})

})

</script>

<style lang="scss" scoped>

img {
	display: v-bind('onlyShowOnPhone');
	position: absolute;
	top: v-bind(randomTop);
	right: v-bind(randomRight);
	left: v-bind(randomLeft);
	width: v-bind(width);
	pointer-events: none;
	z-index: 1;
	@include media('phone') {
		display: v-bind('hideOnPhone');
		top: v-bind(randomTopPhone);
		right: v-bind(randomRightPhone);
		left: v-bind(randomLeftPhone);
	}
}

</style>