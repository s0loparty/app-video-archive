<template>
   <div class="video__list">
		<VideoListItemVue 
			v-for="video in videosFiltred" :key="video.id" 
			:id="video.id"
			:preview="video.previewSrc"
			:video="video.videoUrl"
			:title="video.title"
			:category="video.categoryId"
		/>
   </div>
</template>

<script>
import { computed } from '@vue/reactivity'

import VideoListItemVue from "./VideoListItem.vue"

export default {
	props: {
		videos: {
			type: Array,
			required: true
		},
		currentCategoty: {
			type: Number,
			required: false,
			default: null
		}
	},
	setup(props) {
		const videosFiltred = computed(() => (props.currentCategoty === null) 
			? props.videos
			: props.videos.filter(item => item.categoryId === props.currentCategoty)
		)

		return { videosFiltred }
	},
	components: { VideoListItemVue }
}
</script>
