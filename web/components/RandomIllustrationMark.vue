<template>
	<img 
		:src="`/illustrations/${randomIllustration}.png`" 
		:style="imgStyle"
		:class="{ '--no-animation': props.preventAnimation }"
		ref="illustration" 
		v-show="ready" 
	/>
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
	preventAnimation: {
		type: Boolean,
		default: false,
	},
})

gsap.registerPlugin(ScrollTrigger)

const illustrationPool = useIllustrationPoolStore()

const randomIllustration = ref(props.name || null)
if (!randomIllustration.value) {
	randomIllustration.value = illustrationPool.drawOne()
}

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const widthMap = {
	'bear': 50,
	'bunny-ears': 35,
	'butterfly': 40,
	'cat': 40,
	'elephant': 43,
	'elephant-figure': 40,
	'figure': 40,
	'eye': 38,
	'hand': 60,
	'horse': 35,
	'spider': 43,
	'__default': 40,
}

const pickWidthPx = (name) => `${(name && widthMap[name]) ?? widthMap.__default}px`

const uid = useId()
const k = (s) => `illu-${uid}-${s}`

const isLeft = props.side === 'left'

const randomTop = useState(k('top'), () =>
  `${randInt(
    (isLeft ? props.topIfOnLeft : props.top).min,
    (isLeft ? props.topIfOnLeft : props.top).max
  )}${props.topUnit}`
)

const randomTopPhone = useState(k('topPhone'), () =>
  `${randInt(
    (isLeft ? props.topIfOnLeftPhone : props.topPhone).min,
    (isLeft ? props.topIfOnLeftPhone : props.topPhone).max
  )}${props.topUnit}`
)

const randomRight = useState(k('right'), () =>
  	isLeft ? 'auto' : `${randInt(props.right.min, props.right.max)}px`
)
const randomRightPhone = useState(k('rightPhone'), () =>
 	isLeft ? 'auto' : `${randInt(props.rightPhone.min, props.rightPhone.max)}px`
)

const randomLeft = useState(k('left'), () =>
	isLeft ? `${randInt(props.left.min, props.left.max)}px` : 'auto'
)
const randomLeftPhone = useState(k('leftPhone'), () =>
	isLeft ? `${randInt(props.leftPhone.min, props.leftPhone.max)}px` : 'auto'
)

const widthPx = useState(k('width'), () => pickWidthPx(randomIllustration.value))

const imgStyle = computed(() => {
	const base = {
		position: props.preventAnimation ? 'fixed' : 'absolute',
		top: randomTop.value,
		right: randomRight.value,
		left: randomLeft.value,
		width: widthPx.value,
		height: 'auto',
		pointerEvents: 'none',
		zIndex: 1,
		display: props.onlyShowOnPhone ? 'none' : 'block'
	}

  return base

})

const ready = ref(false)
const illustration = useTemplateRef('illustration')

const hideOnPhoneCss = computed(() => (props.hideOnPhone ? 'none' : 'initial'))

onMounted(async () => {

	ready.value = true
	await nextTick()

	const pageY = () => (window.pageYOffset || document.documentElement.scrollTop || 0)
	const absTop = () => illustration.value.getBoundingClientRect().top + pageY()
	const startPos = () => absTop() - window.innerHeight // when element's top hits bottom of viewport
	const endPos   = () => startPos() + window.innerHeight // run for one viewport height

	if (props.preventAnimation) return

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
	&.--no-animation {
		position: absolute !important;
	}
	@include media('phone') {
		display: v-bind(hideOnPhoneCss) !important;
		top: v-bind(randomTopPhone) !important;
		right: v-bind(randomRightPhone) !important;
		left: v-bind(randomLeftPhone) !important;
	}
}

</style>