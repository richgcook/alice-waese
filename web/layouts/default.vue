<template>
	<div>
		<Header />
		<Cursor />
		<div class="layout">
			<div>
				<slot />
			</div>
		</div>
		<Footer />
	</div>
</template>

<style lang="scss" scoped>

div.layout {
	display: grid;
	grid-template-columns: 1fr 75vw 1fr;
	column-gap: calc(var(--padding-base) * 2);
	align-items: flex-start;
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
	}
	> div {
		grid-column: 2 / span 1;
		margin-top: calc(70px + (var(--padding-base) * 2));
		@include media('phone') {
			//
		}
	}
}

</style>