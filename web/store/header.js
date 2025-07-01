import { defineStore } from 'pinia'

export const useHeaderStore = defineStore('header-store', {
	state: () => {
		return {
			triggerRefresh: false
		}
	},
	actions: {
		refreshScrollTrigger() {
			this.triggerRefresh = !this.triggerRefresh
		}
	},
	getters: {
		getScrollTrigger() {
			return this.triggerRefresh
		}
	}
})