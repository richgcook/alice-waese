import { defineStore } from 'pinia'

const ALL = ['bear', 'bunny-ears', 'butterfly', 'cat', 'elephant', 'elephant-figure', 'eye', 'figure', 'hand', 'horse', 'spider']

export const useIllustrationPoolStore = defineStore('illustration-pool-store', {
	state: () => {
		return {
			all: ALL, // master list
			pool: [], // current shuffled queue
			last: null, // last served (to avoid immediate repeat on reshuffle),
			byPage: {},
		}
	},
	actions: {
		_shuffleAll() {
		// fresh shuffle of ALL
		this.pool = this.all.slice()
		for (let i = this.pool.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[this.pool[i], this.pool[j]] = [this.pool[j], this.pool[i]]
		}
		// avoid immediate repeat of last if possible
		if (this.last && this.pool.length > 1 && this.pool[0] === this.last) {
			;[this.pool[0], this.pool[1]] = [this.pool[1], this.pool[0]]
		}
		},
		_ensurePool() {
			if (!this.pool.length) this._shuffleAll()
		},
		drawOne() {
			this._ensurePool()
			const name = this.pool.shift()
			this.last = name
			return name
		},
		drawMany(n) {
			const out = []
			for (let i = 0; i < n; i++) out.push(this.drawOne())
			return out
		},
		assign(pageId, count) {
      		const existing = this.byPage[pageId] || []
      		if (existing.length < count) {
        		const need = count - existing.length
        		this.byPage[pageId] = existing.concat(this.drawMany(need))
      		} else if (existing.length > count) {
        		this.byPage[pageId] = existing.slice(0, count) // keep first N stable
      		}
      		return this.byPage[pageId]
    	},
    	clearPage(pageId) { 
			delete this.byPage[pageId] 
		},
	},
	getters: {
		//
	}
})