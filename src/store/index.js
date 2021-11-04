import { createStore } from 'vuex'

import localStorageModule from './modules/localStorage.module'
import requestModule from './modules/request.module'

import dataVideos from './data/videos.json'
import dataСategories from './data/categories.json'

export default createStore({
	state: {
		categories: dataСategories,
		videos: dataVideos,
		mobileMenu: false,
		titleApp: 'Архив In Cor Cadit'
	},
	getters: {
		getCategories(state) {
			return state.categories
		},
		getVideos(state) {
			return state.videos
		},
		mobileMenu(state) {
			return state.mobileMenu
		},
		getTitleApp(state) {
			return state.titleApp
		}
	},
	mutations: {
		addVideoView(state, id) {
			state.videos[id -1].views++
		},
		toggleMobileMenu(state) {
			state.mobileMenu = !state.mobileMenu
		},
		setTitleApp(state, title) {
			state.titleApp = title
		}
	},
	actions: {},
	modules: {
		localStorage: localStorageModule,
		request: requestModule
	}
})
