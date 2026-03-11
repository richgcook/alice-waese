<template>
	<div class="cursor" :style="`transform:matrix(1,0,0,1,${cursorX},${cursorY})`" v-show="getActive">
		<SymbolArrowPrev v-show="getState == 'arrow' && getDirection == 'left'" v-cloak />
		<SymbolArrowNext v-show="getState == 'arrow' && getDirection == 'right'" v-cloak />
	</div>
</template>

<script setup>

import { useThemeModeStore } from '~/store/themeMode'
import { useCursorStore } from '~/store/cursor'
import { storeToRefs } from 'pinia'

const themeModeStore = useThemeModeStore()
const cursorStore = useCursorStore()

const { getState, getActive, getDirection, getX, getY } = storeToRefs(cursorStore)
const { setXY } = cursorStore

const move = (event) => {
	setXY(event.clientX, event.clientY)
}
const cursorX = computed(() => {
	return getX.value - (width.value/2)
})
const cursorY = computed(() => {
	return getY.value - (height.value/2)
})

const height = computed(() => {
	if (getDirection.value === 'down') {
		return 26
	} else {
		return 30
	}
})

const width = computed(() => {
	if (getDirection.value === 'down') {
		return 50
	} else {
		return 72
	}
})

const heightInPx = computed(() => {
	return `${height.value}px`
})
const widthInPx = computed(() => {
	return `${width.value}px`
})

const cursorColor = computed(() => {
	return themeModeStore.getMode === 'dark' ? 'white' : 'black'
})

onMounted(() => {
	document.addEventListener('mousemove', event => {
		move(event)
	})
})

</script>

<style lang="scss" scoped>

div.cursor {
	display: block;
	height: v-bind(heightInPx);
	width: v-bind(widthInPx);
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 666;
	@include is-touch() {
		display: none;
	}
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 100%;
		width: 100%;
		fill: v-bind(cursorColor);
	}
}

</style>