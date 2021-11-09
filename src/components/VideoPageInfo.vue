<template>
	<section>
		<h3 v-if="title" class="title title--mx">{{ title }}</h3>
		<Skeletor v-else width="100%" height="35px" style="max-width: 400px" as="div" class="title title--mx"/>
		
		<div class="video-info">
			<div v-if="category" class="video-info__item">Категория <strong>{{ category }}</strong></div>
			<div v-else class="video-info__item">
				<Skeletor width="200px" height="18px" as="div"/>
			</div>
			
			<div v-if="views || views === 0" class="video-info__item">Просмотров <strong>{{ views }}</strong></div>
			<div v-else class="video-info__item">
				<Skeletor width="200px" height="18px" as="div"/>
			</div>
		</div>
	</section>
</template>

<script>
import { Skeletor } from 'vue-skeletor'

export default {
	props: {
		title: {
			type: String,
			required: true
		},
		views: {
			type: Number,
			required: true
		},
		category: {
			type: String,
			required: true,
		}
	},
	components: { Skeletor }
}
</script>

<style lang="scss" scoped>
.video-info {
	border-top: 1px solid var(--body-bg);
	border-bottom: 1px solid var(--body-bg);

	display: grid;
	grid-template-columns: auto auto;
	grid-column-gap: 10px;
	grid-row-gap: 10px;

	padding: 10px 0;

	@media screen and (max-width: 576px) {
		grid-template-columns: auto;
		&__item {
			&:last-child {margin-left: inherit !important;}
		}
	}

	&__item {
		&:last-child {margin-left: auto;}
	}
}
</style>
