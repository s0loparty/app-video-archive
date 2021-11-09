<template>
	<div v-if="!show" class="loader">
		<div class="loader__wrap">
			<div class="loader__content">Загрузка контента ...</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		show: {
			type: Boolean,
			requred: true,
		}
	}
}
</script>

<style lang="scss" scoped>
.loader {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 999;

	&__wrap {
		width: 100%;
		height: 100%;
		background: var(--body-bg);

		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__content {
		font-size: 20px;
		font-weight: bold;
	}
}
</style>
