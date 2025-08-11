<template>
	<img :src="`/illustrations/${randomIllustration}.png`" />
</template>

<script setup>

const illustrations = ['eye', 'hand', 'horse', 'spider']

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const uid = useId()

const randomIllustration = useState(`illu-${uid}-name`, () => illustrations[randInt(0, illustrations.length - 1)])
const randomTop = useState(`illu-${uid}-top`, () => `${randInt(30, 90)}%`)
const randomRight = useState(`illu-${uid}-right`, () => `${randInt(100, 200)}px`)

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