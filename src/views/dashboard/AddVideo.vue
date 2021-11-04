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
							<label for="previewSrc" class="form__label">Ссылка на превью (Постер для форума)</label>
							<input v-model="video.preview" type="text" id="previewSrc" class="form__input">
						</div>
						<div class="form__group">
							<label for="videoSrc" class="form__label">Ссылка на видео (Код для вставки)</label>
							<input v-model="video.source" type="text" id="videoSrc" class="form__input">
						</div>
						<div class="form__group">
							<label for="category" class="form__label">Категоиря</label>
							<select v-model="video.categoryId" class="form__input" id="category">
								<option value="-1" selected disabled>Выберите категорию</option>
								<option v-for="(title, idx) in categories" :key="title" :value="idx">{{ title }}</option>
							</select>
						</div>
						<button type="submit" :disabled="!checkIsOkey">Добавить</button>
						<button @click="check" type="button">Проверить</button>
					</form>
				</section>
				<section>
					<img :src="video.preview" />
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quas dignissimos illum, quidem sit numquam pariatur tempore et. Tempora laudantium quia alias deleniti dolorem quis. Repudiandae ea laudantium, beatae ipsam vel voluptas adipisci similique nulla voluptates. Facilis velit quibusdam repellat sunt quaerat enim, neque sit labore dolorum nesciunt, nam voluptatum?</p>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
	setup() {
		const store = useStore()
		const video = reactive({
			title: '',
			preview: '',
			source: '',
			categoryId: -1
		})
		const checkIsOkey = ref(false)

		const check = () => {
			if (!video.title || !video.preview || !video.source || video.categoryId === -1) {
				return alert('Заполни все поля!')
			}

			// Ловушка_перфекционизма_The_School_of_Life.mp4
			// можно еще удалять категорию из названия
			video.title = video.title
				?.split('.')
				?.shift()
				?.replaceAll('_', ' ')

			// [url=https://radikal.ru/video/kxwdt1BOcOv][img]https://poster4.radikal.ru/2111/13/2fdf10d477fe.jpg[/img][/url]
			video.preview = video.preview
				?.split('[img]').pop()
				?.replaceAll('[/img][/url]', '')

			// <iframe width="640" height="360" src="https://radikal.ru/vf/kxwdt1BOcOv" frameborder="0" scrolling="no" allowfullscreen></iframe>
			video.source = video.source?.match(/https:\/\/[^\s\Z]+/g)?.pop()?.replaceAll('"', '')

			store.getters.getCategories.forEach(item => {
				if (video.title.indexOf(item) !== -1) {
					video.title = video.title.replaceAll(item, '').trim()
				}
			})

			// if vse ok
			checkIsOkey.value = true
		}

		const submit = e => {
			console.log('submit form => video info:', video)
		}

		return { 
			video, submit, check, checkIsOkey,
			categories: store.getters.getCategories
		}
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
	}
	&__small {
		display: block;
		margin-top: 5px;
	}
}
</style>
