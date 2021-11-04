<template>
	<section class="video-page">
		<div class="container">
			<div class="video-page__wrap">
				<div class="video-page__content card">
					<VideoPagePlayerVue 
						:video-url="video.videoUrl" 
						:preview-src="video.previewSrc"
					></VideoPagePlayerVue>

					<VideoPageInfoVue 
						:title="video.title" 
						:views="video.views"
						:category="categoryName"
					></VideoPageInfoVue>

					<!-- share -->
					<div class="share-video">
						<TheShareLinks :share-link="shareLink"></TheShareLinks>
					</div>

					<!-- maybe comments -->
					<!-- <hr>
					<p>comments: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint vero recusandae culpa ducimus sit nulla quasi architecto eaque delectus distinctio, hic dolorum sequi non sapiente suscipit voluptatem, nihil, quaerat tempora.</p> -->
				</div>
				<aside class="video-page__sidebar card">
					<VideoHistoryListVue></VideoHistoryListVue>
				</aside>
			</div>
		</div>
	</section>
</template>

<script>
import { computed, reactive, ref, toRef } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import VideoPagePlayerVue from '../../components/VideoPagePlayer.vue'
import VideoPageInfoVue from '../../components/VideoPageInfo.vue'
import VideoHistoryListVue from '../../components/VideoHistoryList.vue'

import TheShareLinks from '../../components/TheShareLinks'
import { watch } from '@vue/runtime-core'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()

		const shareLink = computed(() => location.origin + route.path)

		const id = computed(() => +route.params.id)
		console.log('id: ', id.value)

		const video = computed(() => store.getters.getVideos?.[id.value -1])
		console.log('video:', video.value)

		const categoryName = computed(() => store.getters.getCategories?.[video.value.categoryId])

		// dynamic title		
		const title = computed(() => video?.value?.title)
		if (title.value) document.title = title.value
		watch(title, (n, o) => n ? document.title = n : store.getters.getTitleApp)
		
		// watch(video, (n, o) => {
		// 	console.log(n);
		// 	store.commit('setTitleApp', n.title ?? store.getters.getTitleApp)
		// })

		// если открыли видео ну допустим по ссылке
		store.commit('localStorage/addVideo', id.value)

		return { video, categoryName, shareLink }
	},
	components: { VideoPageInfoVue, VideoPagePlayerVue, VideoHistoryListVue, TheShareLinks }
}
</script>

<style lang="scss" scoped>
.share-video {
	margin-top: 1.5rem;
	&__title {margin-bottom: 5px;}
}
</style>
