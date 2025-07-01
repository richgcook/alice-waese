import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects-store', {
	state: () => {
		return {
			active: false,
			activeProjectId: null,
		}
	},
	actions: {
		setActive() {
			this.active = true
		},
		setInactive() {
			this.active = false
		},
		setActiveProjectId(id) {
			this.activeProjectId = id
		},
		resetActiveProjectId() {
			this.activeProjectId = null
		},
		reset() {
			this.setInactive()
			this.resetActiveProjectId()
		}
	},
	getters: {
		isActive: state => state.active,
		getActiveProjectId: state => state.activeProjectId
	}
})