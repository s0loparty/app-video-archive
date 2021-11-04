<template>
   <router-link :to="'/video/' + video.id" @click="openVideo" class="video__item">
		<!-- <img 
			:style="`background-image: url(${video.preview});`" 
			:class="['video__preview', {'video__preview--default-image': !previewStatus}]" 
		/> -->
		<img 
			:style="`background-image: url(${video.preview});`" 
			class="video__preview"
		/>
      <div class="video__title">{{ video.title }}</div>
      <div class="video__category">{{ video.category }}</div>
		<a v-if="removeLink" @click.stop="removeVideo(video.id)" class="video__remove-link" href="#" title="Удалить из истории">x</a>
   </router-link>
</template>

<script>
import { computed, inject, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
	props: {
		id: {
			type: Number || String,
			required: true,
		
		},
		preview: {
			type: String,
			required: false,
			default: 'https://via.placeholder.com/250x140'
		},
		video: {
			type: String,
			required: true,
			validator(v) {
				return v.split(':').includes('http') || v.split(':').includes('https')
			}
		},
		title: {
			type: String,
			required: true,
		},
		category: {
			type: Number,
			required: false,
			defalut: 0
		}
	},
	setup(props) {
		const store = useStore()

		const video = {
			id: props.id,
			preview: props.preview,
			videoSrc: props.video,
			title: props.title,
			category: computed(() => store.getters.getCategories[props.category]).value
		}

		const openVideo = () => {
			store.commit('addVideoView', video.id)
			store.commit('localStorage/addVideo', video.id)
		}

		const removeVideo = id => store.commit('localStorage/removeVideo', id)

		const previewStatus = ref(null)
		onMounted(() => {
			fetch(props.preview)
				.then(response => previewStatus.value = response.ok)
		})

		return { 
			video, 
			openVideo, 
			removeLink: inject('removeLink'),
			removeVideo,
			previewStatus
		}
	}
}
</script>

<style scoped>
img[lazy=loading] {
	background: blue;
}
img[lazy=error] {
	background-image: url('https://via.placeholder.com/250x140') !important;
	background: red;
}
img[lazy=loaded] {
	background: green;
}
</style>
