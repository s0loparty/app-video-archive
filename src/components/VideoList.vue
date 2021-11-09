<template>
	<section v-if="dataVideos === null" class="video__list">
		<TheLoaderContent :count="4" el="div" />
	</section>
	<section v-else-if="dataVideos?.length" class="video__list">
		<VideoListItem 
			v-for="video in dataVideos" :key="video.id" 
			:id="video.id"
			:title="video.title"
			:categoryName="video.categoryName"
		/>
	</section>
	<span v-else>Нет роликов</span>
</template>

<script>
import { useStore } from 'vuex'

import VideoListItem from "./VideoListItem.vue"
import TheLoaderContent from './TheLoaderContent.vue'
import { computed } from '@vue/reactivity'

export default {
	props: {
		videos: [Array, Boolean]
	},
	setup(props) {
		const store = useStore()

		// только ради названия категории
		// лучше так, чем в item каждый раз трогать стор и искать категорию
		const dataVideos = computed(() => props.videos.map(i =>  {
			return {...i, categoryName: store.getters.getCategories[i.categoryId]}
		}))

		return { dataVideos }
	},
	components: { VideoListItem, TheLoaderContent }
}
</script>
