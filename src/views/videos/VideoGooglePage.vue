<template>
	<section class="video-page">
		<div class="container">
			<div class="video-page__wrap">
				<div v-if="video" class="video-page__content card">
					<div class="video-page__wrap-player">
						<iframe :src="video.source" class="video-page__player" frameborder="0" scrolling="no" allowfullscreen></iframe>
					</div>
				</div>
				<div v-else class="video-page__content card">
					<TheLoaderContent :count="1" el="div"></TheLoaderContent>
				</div>
				<aside class="video-page__sidebar card">
					<VideoHistoryList></VideoHistoryList>
				</aside>
			</div>
		</div>
	</section>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import VideoHistoryList from '../../components/VideoHistoryList.vue'
import TheLoaderContent from '../../components/TheLoaderContent.vue'
import { watch } from '@vue/runtime-core'

export default {
	setup() {
		const store = useStore()
		const route = useRoute()

		const id = ref(route.params.id)
		const video = ref()

		setTimeout(() => video.value = store.getters.getGoogleVideos.find(item => item.id === id.value), 3000)

		watch(video, (n, o) => video.value.source = n.glink?.replaceAll('file/d/', 'u/0/uc?id=')?.replace('/view', ''))

		return { video }
	},
	components: {
		VideoHistoryList,
		TheLoaderContent
	}
}
</script>
