<template>
	<div class="video-page__wrap-player">
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
</template>

<script>
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
	}
}
</script>
