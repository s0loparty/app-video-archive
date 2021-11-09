import { createStore, createLogger } from 'vuex'

import localStorageModule from './modules/localStorage.module'
import requestModule from './modules/request.module'
import firebaseModule from './modules/firebase.module'

export default createStore({
	plugins: process.env.NODE_ENV !== 'production' ? [createLogger()]: [],
	state: {
		categories: ['Ted Ed', 'School of Life'],
		mobileMenu: false,
		titleApp: 'Архив In Cor Cadit'
	},
	getters: {
		getCategories(state) {
			return state.categories
		},
		mobileMenu(state) {
			return state.mobileMenu
		},
		getTitleApp(state) {
			return state.titleApp
		}
	},
	mutations: {
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
		request: requestModule,
		firebase: firebaseModule
	}
})
