// import customFetch from "../../composition/useFetch"

export default {
	namespaced: true,

	state: {
		// videos: []
		videos: null
	},
	getters: {
		getVideos(state) {
			return state.videos
		}
	},
	mutations: {
		addVideos(state, payload) {
			state.videos = payload
		},
		addOneVideo(state, video) {
			state.videos.push(video)
		},
		addOneView(state, id) {
			const videoIdx = state.videos.findIndex(item => item.id === id)
			state.videos[videoIdx].views += 1
		}
	},
	actions: {
		async addVideo({ commit }, payload) {
			try {
				const response = await fetch(import.meta.env.VUE_APP_FB_URL + '/videos.json', { 
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload)
				})
				const data = await response.json()

				commit('addVideo', {...payload, id: data.name})
			} catch (error) {
				console.log(error)
			}
		},
		async requestVideos({ commit }) {
			try {
				const response = await fetch(import.meta.env.VUE_APP_FB_URL + '/videos.json', { method: 'GET' })
				const data = await response.json()

				const convertData = Object.keys(data).map(id => ({...data[id], id}))

				commit('addVideos', convertData)
			} catch (error) {
				console.log(error);
			}
		},
		async requestVideoById(_, id) {
			try {
				const response = await fetch(import.meta.env.VUE_APP_FB_URL + `/videos/${id}.json`, { method: 'GET' })
				const data = await response.json()

				return data
			} catch (error) {
				console.log(error);
			}
		},
		async requestAddOneView({ commit }, payload) {
			try {
				payload.data.views += 1
				
				await fetch(import.meta.env.VUE_APP_FB_URL + `/videos/${payload.id}.json`, {
					method: 'PUT',
					// headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload.data)
				})
				commit('addOneView', payload.id)
			} catch (error) {
				console.log(error)
			}
		}
	}
}
