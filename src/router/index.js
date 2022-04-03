import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import VideosMainList from '@/views/videos/VideosMainList.vue'
import VideoPage from '@/views/videos/VideoPage.vue'
import VideoHistory from '@/views/videos/VideoHistory.vue'

import Dashboard from '@/views/dashboard/Dashboard.vue'
import DashboardAuth from '@/views/dashboard/Auth.vue'
import DashboardAddVideo from '@/views/dashboard/AddVideo.vue'

import Error404 from '@/views/404.vue'

const routes = [
	{
		path: '/',
		name: 'videos',
		meta: { title: store.getters.getTitleApp },
		component: VideosMainList
	},
	{
		path: '/video/:id',
		name: 'video-page',
		component: VideoPage
	},
	{
		path: '/my-history',
		name: 'my-video-history',
		meta: { title: 'История просмотров' },
		component: VideoHistory
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		meta: { title: 'Dashboard' },
		component: Dashboard,
		children: [
			{ path: '', redirect: '/' },
			{ path: 'auth', name: 'auth', component: DashboardAuth },
			{ path: 'add-video', name: 'add-video', component: DashboardAddVideo },
		]
	},
	{ 
		path: '/:pathMatch(.*)*', 
		name: '404',
		component: Error404,
		// component: () => import('../views/404.vue'),
		meta: {
			title: 'Ошибка 404'
		}
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,

	// https://next.router.vuejs.org/guide/advanced/scroll-behavior.html#scroll-behavior
	scrollBehavior(to, from, savedPosition) {
		const obj = { behavior: 'smooth', top: 0 }
		return savedPosition ?? obj
	}
})

router.beforeEach((to, from, next) => {
	
	// mainTitle
	// document.title = to.meta.title ?? store.getters.getTitleApp
	// document.title = to.meta.title && computed(() => store.getters.getTitleApp).value
	document.title = to.meta.title ?? store.getters.getTitleApp
	// console.log('document.title:', store.getters.getTitleApp)
	
	// off mobile menu
	if (store.getters.mobileMenu) {
		store.commit('toggleMobileMenu')
	}

	// для страницы с видео если id или ролик по id не найдены
	if (to.name === 'video-page') {
		const id = to.params.id
		// const video = store.getters.getVideos?.[id -1]

		if (!id /*|| !video*/) {
			return next('/404')
		}
	}

	next()
})

export default router
