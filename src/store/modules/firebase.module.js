export default {
	namespaced: true,

	state: {
		videos: [
			{
				id: "1ARXB6rXO83X0arRLg0qLqHIHd83K_p0F",
				title: "Уроки Освенцима сила наших слов",
				views: 0,
				categoryId: 0,
				source: 'https://drive.google.com/u/0/uc?id=1ARXB6rXO83X0arRLg0qLqHIHd83K_p0F',
				glink: "https://drive.google.com/file/d/1ARXB6rXO83X0arRLg0qLqHIHd83K_p0F/view",
			},
			{
				id: "1UyvZyxGd0_T24z1jy_eS-E34LM096rur",
				title: "Тайны X-хромосомы",
				views: 0,
				categoryId: 0,
				source: 'https://drive.google.com/u/0/uc?id=1UyvZyxGd0_T24z1jy_eS-E34LM096rur',
				glink: "https://drive.google.com/file/d/1UyvZyxGd0_T24z1jy_eS-E34LM096rur/view",
			},
			{
				id: "1BWVujumAQ9s445tNgTGwlMCBaSlx-bSE",
				title: "Сила творческих ограничений",
				views: 0,
				categoryId: 0,
				source: 'https://drive.google.com/u/0/uc?id=1BWVujumAQ9s445tNgTGwlMCBaSlx-bSE',
				glink: "https://drive.google.com/file/d/1BWVujumAQ9s445tNgTGwlMCBaSlx-bSE/view",
			},
			{
				id: "1DekdtUahh20R0oYa95RCiRUu_qgA_t_7",
				title: "Психотерапия",
				views: 0,
				categoryId: 1,
				source: 'https://drive.google.com/u/0/uc?id=1DekdtUahh20R0oYa95RCiRUu_qgA_t_7',
				glink: "https://drive.google.com/file/d/1DekdtUahh20R0oYa95RCiRUu_qgA_t_7/view",
			},
		]
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
				const response = await fetch(process.env.VUE_APP_FB_URL + '/videos.json', { 
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
				const response = await fetch(process.env.VUE_APP_FB_URL + '/videos.json', { method: 'GET' })
				const data = await response.json()

				const convertData = Object.keys(data).map(id => ({...data[id], id}))

				commit('addVideos', convertData)
			} catch (error) {
				console.log(error);
			}
		},
		async requestVideoById(_, id) {
			try {
				const response = await fetch(process.env.VUE_APP_FB_URL + `/videos/${id}.json`, { method: 'GET' })
				const data = await response.json()

				return data
			} catch (error) {
				console.log(error);
			}
		},
		async addOneView({ commit }, payload) {
			try {
				payload.data.views += 1
				
				await fetch(process.env.VUE_APP_FB_URL + `/videos/${payload.id}.json`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload.data)
				})
				commit('addOneView', payload.id)
			} catch (error) {
				console.log(error)
			}
		}
	}
}
