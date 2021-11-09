<template>
	<!-- <TheLoader :show="loader"></TheLoader> -->
	<TheHeader></TheHeader>
	
	<main>
		<router-view />
	</main>
</template>

<script>
import { computed, onMounted, ref, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

import TheHeader from "./components/TheHeader.vue"
import TheLoader from './components/TheLoader.vue'

export default {
	// setup() {
	// 	const store = useStore()
	// 	onMounted(async () => await store.dispatch('request/requestVideos'))		
	// },
	components: { TheHeader, TheLoader }
}
</script>
