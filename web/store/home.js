import { defineStore } from 'pinia'

export const useHomeStore = defineStore({
	id: 'home-store',
	state: () => {
		return {
			hideLanding: false,
		}
	},
	actions: {
		setHideLanding() {
			this.hideLanding = true
		},
	},
	getters: {
		isLandingHidden: state => state.hideLanding
	}
})