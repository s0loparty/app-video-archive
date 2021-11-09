<template>
	<section>
		<div v-if="idsLocal.length" style="margin-bottom: 20px;">Вы смотрели</div>
		<div v-else>
			<span>Здесь будет Ваша история просмотров</span>
		</div>

		<div v-if="idsLocal.length">
			<div v-if="videos" class="list">
				<VideoPageHistoryItem 
					v-for="video in videos" 
					:key="video.id"
					:id="video.id"
					:title="video.title"
					:preview="video.preview"
					:category-name="video.categoryName"
				/>
			</div>
			<div v-else class="video">
				<Skeletor v-for="item in 3" :key="item" class="video__item" as="div" />
			</div>
		</div>
	</section>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'

import VideoPageHistoryItem from "./VideoPageHistoryItem.vue"
import { Skeletor } from 'vue-skeletor'
import { onMounted, watch } from '@vue/runtime-core'

export default {
	setup() {
		const store = useStore()
		
		const idsLocal = computed(() => store.getters['localStorage/getHistory'])
		const allVideos = computed(() => store.getters['firebase/getVideos'])
		const videos = ref(null)

		onMounted(() => {
			videos.value = idsLocal.value.map((value, idx, arr) => {
				const v = allVideos.value.find(item => value === item.id)
				return { ...v, categoryName: store.getters.getCategories[v.categoryId] }
			})
		})
		
		/*
		// ПРОВЕРИТЬ НУЖНО ЛИ ЭТО
		// watch(allVideos, async (n, o) => {
		// 	videos.value = await idsLocal.value.map((value, idx, arr) => {
		// 		return n.find(item => item.id === value)
		// 	})
		// })

		onMounted(async () => {
			if (!allVideos.value?.length) {
				watch(allVideos, async (n, o) => {
					videos.value = await idsLocal.value.map((value, idx, arr) => {
						return n.find(item => item.id === value)
					})
				})
			} else {
				videos.value = idsLocal.value.map((value, idx, arr) => {
					return allVideos.value.find(item => item.id === value)
				})
			}
		})

		// watch(videos, (n, o) => {
		// 	console.log('watch videos: ', n)
		// 	videos.value = n.filter(item => (item && item.id.length > 10 ))
		// })
		*/
		
		return { videos, idsLocal }
	},
	components: { VideoPageHistoryItem, Skeletor }
}
</script>

<style lang="scss" scoped>
.list {
	max-height: 465px;
	overflow: auto;
}
.video__item {
	margin-bottom: 20px;
	&:last-child {margin-bottom: 0;}
}
</style>
