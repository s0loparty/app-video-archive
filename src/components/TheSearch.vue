<template>
	<div class="search">
		<form @submit.prevent>
			<div class="search__wrap">
				<input 
					@input="inputSearchQuery"
					:value="searchQuery"
					class="search__input" 
					type="text" 
					placeholder="Нзвание ролика (Архив In Cor Cadit)"
				/>
				<!-- <button class="search__btn">
					<svg class="search__svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
					</svg>
				</button> -->
				<button 
					@click.prevent="searchQuery = ''" 
					v-show="searchQuery.length" 
					class="search__btn-clear"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6a6a6a" viewBox="0 0 16 16">
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
						<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
					</svg>
				</button>

				<div class="search__result" v-show="searchResults.length">
					<router-link 
						v-for="result in searchResults" :key="result.id"
						:to="'/video/' + result.id" 
						@click="clickOnResultLink"
						class="search__result-item"
					>{{ result.title }} [{{ $store.getters.getCategories[result.categoryId] }}]</router-link>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { watch } from '@vue/runtime-core'

export default {
	setup() {
		const store = useStore()

		const SEARCH_MIN_LENGTH = 1

		const videos = store.getters['firebase/getVideos']
		const searchQuery = ref('')
		const searchResults = ref([])

		watch(searchQuery, (newValue, oldValue) => {
			if (newValue.length >= SEARCH_MIN_LENGTH) {
				searchResults.value = videos
					.filter(video => video.title
						.toLowerCase()
						.indexOf(searchQuery.value.toLowerCase()) !== -1)
			}
			else {
				searchResults.value = []
			}
		})

		// если делать через v-model
		// то на мобилке не покажется результат пока не нажмешь пробел
		const inputSearchQuery = e => searchQuery.value = e.target.value

		const clickOnResultLink = () => {
			searchResults.value = []
			searchQuery.value = ''
		}

		return { searchQuery, searchResults, clickOnResultLink, inputSearchQuery }
	}
}
</script>
