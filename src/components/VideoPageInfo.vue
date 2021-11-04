<template>
	<h3 class="title title--mx">{{ title }}</h3>
	<div class="video-info">
		<div class="video-info__item">
			Категория <strong>{{ category }}</strong>
		</div>
		<div class="video-info__item">
			Просмотров <strong>{{ views }}</strong>
		</div>
	</div>
</template>

<script>
import { computed } from '@vue/reactivity'
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		views: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		}
	}
}
</script>

<style lang="scss" scoped>
.video-info {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;

	padding: 10px 0;
	// margin-bottom: 1.5rem;

	border-top: 1px solid var(--body-bg);
	border-bottom: 1px solid var(--body-bg);

	&__item {
		margin: 0 10px;
		&:first-child {margin-left: 0;}
		&:last-child {margin: 0;}
	}
}
</style>
