<template>
	<section>
		<div v-if="videosIds.length" style="margin-bottom: 15px;">
			<span>Вы смотрели</span>
			<a @click.prevent="clearHistory" href="#" style="float: right">Clear</a>
		</div>
		<div v-else>
			<span>Здесь будет Ваша история просмотров</span>
		</div>

		<div class="list">
			<VideoPageHistoryItem v-for="videoId in videosIds" :key="videoId" :id="videoId" />
		</div>
	</section>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

import VideoPageHistoryItem from "./VideoPageHistoryItem.vue"

export default {
	setup() {
		const store = useStore()
		
		const clearHistory = () => store.commit('localStorage/clearHistory')
		const videosIds = computed(() => store.getters['localStorage/getHistory'])
		
		return { videosIds, clearHistory }
	},
	components: { VideoPageHistoryItem }
}
</script>

<style lang="scss" scoped>
.list {
	max-height: 460px;
	overflow: auto;
}
</style>
