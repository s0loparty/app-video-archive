<template>
	<section class="video">
		<div class="container">
			<div class="video__wrap card">
				<section class="video__header">
					<h2 class="title">Ролики которые Вы смотрели</h2>
					<p v-if="!videos.length" style="margin-bottom: 0;">История просмотров пуста</p>
				</section>
				<VideoListVue :videos="videos"></VideoListVue>
			</div>
		</div>
	</section>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { provide } from '@vue/runtime-core'

import VideoListVue from "../../components/VideoList.vue"

export default {
	setup() {
		const store = useStore()

		const allVideos = ref(store.getters.getVideos)
		const historyIds = ref(store.getters['localStorage/getHistory'])

		const videos = computed(() => {
			return historyIds.value.map((value, idx, arr) => {
				return allVideos.value.find(item => item.id == value)
			})
		})
		
		// const videos = ref([])
		// videos.value = historyIds.value.map((value, idx, arr) => {
		// 	return allVideos.value.find(item => item.id == value)
		// })

		provide('removeLink', true)

		// console.log(videos.value)

		return { videos }
	},
	components: { VideoListVue }
}
</script>
