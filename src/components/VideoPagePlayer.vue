<template>
	<div class="video-page__wrap-player">
		<div v-if="videoUrl">
			<div class="video-page__preview" :style="{ backgroundImage: `url(${previewSrc})` }"></div>
			<span>Загрузка ...</span>
			<iframe 
				:src="videoUrl" 
				class="video-page__player" 
				frameborder="0" 
				scrolling="no" 
				allowfullscreen
			></iframe>
		</div>
		<div v-else style="position: absolute;top: 0;left: 0;bottom: 0;right: 0;">
			<Skeletor width="100%" height="100%" as="div" />
		</div>
	</div>
</template>

<script>
import { Skeletor } from 'vue-skeletor'

export default {
	props: {
		videoUrl: {
			type: String,
			required: true
		},
		previewSrc: {
			type: String,
			required: false,
			default: null
		}
	},
	components: { Skeletor }
}
</script>
