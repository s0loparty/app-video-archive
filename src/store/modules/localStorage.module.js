export default {
	namespaced: true,

	state: {
		videoHistory: JSON.parse(localStorage.getItem('videoHistory') ?? '[]')
	},
	getters: {
		getHistory(state) {
			return state.videoHistory
			// return state.videoHistory.sort((a, b) => b - a).reverse()
		}
	},
	mutations: {
		addVideo(state, id) {
			// проверку на валидный id
			if (state.videoHistory.includes(id)) return
			else if (!id || id.lenght < 10) return

			state.videoHistory.push(id)			
			this.commit('localStorage/updateLocalStorage')
		},
		removeVideo(state, id) {
			state.videoHistory.splice(state.videoHistory.findIndex(v => v === id), 1)
			this.commit('localStorage/updateLocalStorage')
		},
		clearHistory(state) {
			state.videoHistory = []
			localStorage.removeItem('videoHistory')
		},
		updateLocalStorage(state) {
			localStorage.setItem('videoHistory', JSON.stringify(state.videoHistory))
		}
	}
}
