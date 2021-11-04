<template>
	<router-link :to="'/video/' + video.id" class="item">
		<div class="item__preview" :style="`background-image: url(${video.previewSrc});`"></div>
		<div class="item__title">{{ video.title }}</div>
		<div class="item__category">{{ category }}</div>
	</router-link>
</template>

<script>
import { useStore } from 'vuex'

export default {
	props: {
		id: {
			type: Number || String,
			required: true
		}
	},
	setup(props) {
		const store = useStore()

		const id = props.id
		const video = store.getters.getVideos?.[id -1]
		const category = store.getters.getCategories[video.categoryId]

		return { video, category }
	}
}
</script>

<style lang="scss" scoped>
.item {
   position: relative;
   width: 100%;
   height: 140px;

	display: block;

   text-decoration: none;
   overflow: hidden;
   border-radius: 4px;

	margin-bottom: 20px;
	&:last-child {margin-bottom: 0;}

   &:hover &__preview {
      transform: scale(1.1);
   }
   &:hover &__category {
      bottom: 0;
   }

   &__preview {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;

      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;

      transition: all 0.5s;
   }
   &__title {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;

      padding: 5px;
      font-size: 14px;
      color: var(--color-white);
      background-color: #44444475;
   }
   &__category {
      position: absolute;
      bottom: -100%;
      left: 0;
      right: 0;

      padding: 5px;
      font-size: 14px;
      color: var(--color-white);
      background-color: #00000075;
      transition: bottom 0.2s;
   }
}
</style>
