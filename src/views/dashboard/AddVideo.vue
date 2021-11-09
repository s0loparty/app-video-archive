<template>
	<div class="container">
		<div class="card">
			<h2 class="title">Добавить видео</h2>

			<div style="display: flex;">
				<section style="flex: 0 0 50%">
					<form @submit.prevent="submit" class="form">
						<div class="form__group">
							<label for="title" class="form__label">Название</label>
							<input v-model="video.title" type="text" id="title" class="form__input">
						</div>
						<div class="form__group">
							<label for="googleLink" class="form__label">Google ссылка на видео</label>
							<input v-model="video.glink" type="text" id="googleLink" class="form__input">
						</div>
						<div class="form__group">
							<label for="source" class="form__label">Прямая ссылка на видео</label>
							<input v-model="video.source" disabled type="text" id="source" class="form__input">
						</div>
						<div class="form__group">
							<label for="googleId" class="form__label">ID google video</label>
							<input v-model="video.gId" disabled type="text" id="googleId" class="form__input">
						</div>
						<div class="form__group">
							<label for="category" class="form__label">Категоиря</label>
							<select v-model="video.categoryId" class="form__input" id="category">
								<option value="-1" selected disabled>Выберите категорию</option>
								<option v-for="(title, idx) in categories" :key="title" :value="idx">{{ title }}</option>
							</select>
						</div>
						<button type="submit">Добавить</button>
					</form>
				</section>
				<section style="flex: 1 0 0">
					<!-- <img :src="video.preview" /> -->
					<h3>{{ video.title }}</h3>
					<!-- <iframe :src="video.source" frameborder="0" width="100%" height="280px"></iframe> -->

					<hr>
					<video :src="video.source" ref="videoTag" width="300" height="300" controls autoplay muted></video>
					<canvas ref="canvasTag"></canvas>
					<hr>

					<p>Категория <strong>{{ categories[video.categoryId] }}</strong></p>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted, watch } from '@vue/runtime-core'

export default {
	setup() {
		const store = useStore()
		const categories = store.getters.getCategories
		const video = reactive({
			title: '',
			preview: '',
			source: '',
			glink: '',
			gId: '',
			categoryId: null
		})
		const videoTag = ref(null)
		const canvasTag = ref(null)

		const createPreview = () => {
			// videoTag.value = document.querySelector("video")
			const ctx = canvasTag.value.getContext("2d")
			videoTag.value.addEventListener('play', function() {
				this.currentTime = 20


				setTimeout(() => ctx.drawImage(videoTag.value, 0, 0, 300, 300), 5000)
				setTimeout(() => ctx.drawImage(videoTag.value, 0, 0, 300, 300), 3000)
				// this.ctx1.getImageData(0, 0, this.width, this.height)
			})
		}

		watch(video, (n, o) => {
			video.title = n.title?.replaceAll('_', ' ').replace('.mp4', '')
			video.source = n.glink.split('/').slice(0, -1).join('/').replace('file/d/', 'u/0/uc?id=')
			video.gId = n.source?.split('?').pop().slice(3)

			if (video.source) {
				createPreview()
			}
		})


		const submit = () => {
			if (!video.title || !video.source || !video.glink || !video.gId || video.categoryId !== 0)
				return alert('Заполните все поля')
			
			// store.dispatch('request/addOneVideo', {...video, views: 0})
			console.log('submit:', video)
		}

		return { video, submit, categories, videoTag, canvasTag }
	}
}
</script>

<style lang="scss" scoped>
.form {
	&__group {margin-bottom: 1rem;}
	&__label {
		display: block;
		margin-bottom: 0.5rem;
	}
	&__input {
		// temp
		width: 90%;

		display: inline-flex;
		box-sizing: border-box;

		background-color: var(--color-white);
		color: #444;
		border: 1px solid #ccc;

		padding: 0 5px;
		min-height: 30px;
		border-radius: 4px;

		transition: all .3s;
		&:focus {
			outline: none;
			border-color: var(--color-secondary);
		}
		&:disabled {
			background-color: var(--body-bg);
			color: var(--color-secondary);
		}
	}
	&__small {
		display: block;
		margin-top: 5px;
	}
}
</style>
