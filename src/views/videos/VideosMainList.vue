<template>
	<section class="video">
		<div class="container">
			<div class="video__wrap card">
				<section class="video__header">
					<h2 class="video__header-title title">Все ролики ({{ videos.length }})</h2>
					<Multiselect 
						@change="selectCategory"
						:options="categories"
						:native="false"
						rules="required"
						placeholder="Выберите категорию"
					></Multiselect>
				</section>

				<VideoListVue :videos="videos" :current-categoty="currentCategory"></VideoListVue>
			</div>
		</div>
	</section>
</template>

<script>
import  { provide, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

import VideoListVue from "../../components/VideoList.vue"
import Multiselect from '@vueform/multiselect'

export default {
	setup() {
		const store = useStore()

		const categories = store.getters.getCategories
		const currentCategory = ref(null)
		const videos = store.getters.getVideos

		provide('removeLink', false)

		const selectCategory = name => 
			currentCategory.value = (categories.indexOf(name) !== -1) ? categories.indexOf(name) : null

		return { categories, videos, selectCategory, currentCategory }
	},
	components: { VideoListVue, Multiselect }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
