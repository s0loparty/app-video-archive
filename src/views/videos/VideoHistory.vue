<template>
	<section class="video">
		<div class="container">
			<div class="video__wrap card">
				<section class="video__header">
					<h2 class="video__header-title title">Ролики которые Вы смотрели</h2>
					<Multiselect 
						v-model="currentCategoryId"
						:options="categories"
						:native="false"
						label="name"
						rules="required"
						placeholder="Выберите категорию"
					></Multiselect>
				</section>
				
				<VideoList v-if="videosHistoryFiltred.length" :videos="videosHistoryFiltred"></VideoList>
				<div v-else class="video__wrap card">История просмотров пуста</div>
			</div>
		</div>
	</section>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted, provide, watch } from '@vue/runtime-core'

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

		const idsLocal = computed(() => store.getters['localStorage/getHistory'])
		const allVideos = computed(() => store.getters['firebase/getVideos'])		
		
		const videosHistory = ref(idsLocal.value.map(value => {
			return allVideos.value.find(item => item.id === value)
		}))

		const videosHistoryFiltred = ref(videosHistory.value)
		
		// onMounted(() => {
			// videosHistory.value = idsLocal.value.map(value => {
			// 	return allVideos.value.find(item => item.id === value)
			// })
		// })

		// фильтр роликов
		watch(currentCategoryId, (catId, o) => {
			videosHistoryFiltred.value = (catId !== null) 
				? videosHistory.value.filter(v => v.categoryId === catId) 
				: videosHistory.value
		})

		/* 
		watch(allVideos, async (n, o) => {
			videosHistory.value = await idsLocal.map((value, idx, arr) => {
				return n.find(item => item.id === value)
			})
		})

		onMounted(async () => {
			if (!allVideos.value?.length) {
				await store.dispatch('request/requestVideos')

				watch(allVideos, async (n, o) => {
					videosHistory.value = await idsLocal.map((value, idx, arr) => {
						return n.find(item => item.id === value)
					})
				})
			} else {
				videosHistory.value = idsLocal.map((value, idx, arr) => {
					return allVideos.value.find(item => item.id === value)
				})
			}
		})

		const selectCategory = name => 
			currentCategory.value = (categories.indexOf(name) !== -1) ? categories.indexOf(name) : null
		
		*/
		
		provide('removeLink', true)


		return { 
			videosHistory, 
			videosHistoryFiltred,
			categories, 
			currentCategoryId, 
		}
	},
	components: { VideoList, Multiselect }
}
</script>
