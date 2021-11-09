<template>
	<section class="video-page">
		<div class="container">
			<div class="video-page__wrap">
				<div v-if="video" class="video-page__content card">
					<VideoPagePlayer 
						:video-url="video.source" 
						:preview-src="video.preview"
					></VideoPagePlayer>

					<VideoPageInfo 
						:title="video.title" 
						:views="video.views"
						:category="categoryName"
					></VideoPageInfo>

					<!-- share -->
					<div class="share-video">
						<TheShareLinks :share-link="shareLink"></TheShareLinks>
					</div>

					<!-- maybe comments -->
					<!-- <hr>
					<p>comments: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint vero recusandae culpa ducimus sit nulla quasi architecto eaque delectus distinctio, hic dolorum sequi non sapiente suscipit voluptatem, nihil, quaerat tempora.</p> -->
				</div>
				<div v-else class="video-page__content card">
					<h3>Нет такого ролика или не удалось получить данные</h3>
				</div>
				<aside class="video-page__sidebar card">
					<VideoPageHistoryList></VideoPageHistoryList>
				</aside>
			</div>
		</div>
	</section>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { onMounted, watch } from '@vue/runtime-core'

import VideoPagePlayer from '../../components/VideoPagePlayer.vue'
import VideoPageInfo from '../../components/VideoPageInfo.vue'
import VideoPageHistoryList from '../../components/VideoPageHistoryList.vue'
import TheShareLinks from '../../components/TheShareLinks'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()

		const shareLink = computed(() => location.origin + route.path) // работает как часики
		const id = computed(() => route.params.id) // работает как часики
		const video = ref(null)
		const categoryName = ref('unknown')

		onMounted(() => {
			video.value = store.getters['firebase/getVideos'].find(i => i.id === id.value)
		})
		watch(video, (n, o) => {
			categoryName.value = store.getters.getCategories[n.categoryId]
		})
		watch(id, (newId, o) => {
			if (!newId) return
			video.value = store.getters['firebase/getVideos'].find(i => i.id === newId)
		})

		store.commit('localStorage/addVideo', id.value)

		/*
		// NEED CHANGE FROM DEFAULT
		const categoryName = computed(() => store.getters.getCategories[0]) // по дефолту всегда Ted En
		const video = ref(null)

		// первая загрузка страницы
		onMounted(async () => {
			video.value = await store.dispatch('request/requestVideoById', id.value)
			await store.dispatch('request/requestAddOneView', { data: video.value, id: id.value })
		})

		// детектим смену id и меняем ролик
		watch(id, async (newId, o) => {
			if (!id.value) return
			
			const videoInStore = computed(() => store.getters['request/getVideos'][newId])
			
			// если не находим видео в общем сотре
			// подгрудаем из бд
			if (!videoInStore.value) {
				video.value = await store.dispatch('request/requestVideoById', newId)
			} else {
				video.value = videoInStore.value
			}

			await store.dispatch('request/requestAddOneView', { data: video.value, id: newId })
		})

		// dynamic title		
		const title = computed(() => video?.value?.title)
		if (title.value) document.title = title.value
		watch(title, (n, o) => n ? document.title = n : store.getters.getTitleApp)

		// если открыли видео ну допустим по ссылке
		store.commit('localStorage/addVideo', id.value)
		*/

		return { 
			video,
			categoryName,
			shareLink
		}
	},
	components: { 
		VideoPageInfo, 
		VideoPagePlayer, 
		VideoPageHistoryList, 
		TheShareLinks
	}
}
</script>

<style lang="scss" scoped>
.share-video {
	margin-top: 1.5rem;
	&__title {margin-bottom: 5px;}
}
</style>
