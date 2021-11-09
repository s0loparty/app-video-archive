<template>
	<section class="video">
		<div class="container">
			<div class="video__wrap card">
				<section class="video__header">
					<h2 class="video__header-title title">Все ролики</h2>
					<Multiselect 
						v-model="currentCategoryId"
						:options="categories"
						:native="false"
						label="name"
						rules="required"
						placeholder="Выберите категорию"
					></Multiselect>
				</section>

				<VideoList :videos="dataVideos"></VideoList>
			</div>
		</div>
	</section>
</template>

<script>
import  { computed, provide, ref, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

import VideoList from "../../components/VideoList.vue"
import Multiselect from '@vueform/multiselect'

export default {
	setup() {
		const store = useStore()

		const categories = computed(() => store.getters.getCategories.map((item, idx) => {
			return { value: idx, name: item}
		}))
		const currentCategoryId = ref(null)
		// const currentCategoryName = ref(null)
		const allVideos = computed(() => store.getters['firebase/getVideos'])
		const dataVideos = ref(allVideos.value)

		// фильтр роликов
		watch(currentCategoryId, (catId, o) => {
			dataVideos.value = (catId !== null) ? allVideos.value.filter(v => v.categoryId === catId) : allVideos.value
			// currentCategoryName.value = categories.value.find(i => i.value === currentCategoryId.value)?.name ?? null
		})

		provide('removeLink', false)

		return { 
			categories, 
			dataVideos, 
			currentCategoryId, 
			// currentCategoryName,
		}
	},
	components: { VideoList, Multiselect }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
