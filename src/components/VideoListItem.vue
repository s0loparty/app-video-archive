<template>
	<router-link :to="{ name: 'video-page', params: { id } }" class="video__item">
		<div :style="`background-image: url(${preview});`" loading="lazy" class="video__preview"></div>
      <div class="video__title">{{ title }}</div>
      <div class="video__category">{{ categoryName }}</div>
		
		<a 
			v-if="removeLink" 
			@click.stop="$store.commit('localStorage/removeVideo', id)" 
			class="video__remove-link" 
			href="#" 
			title="Удалить из истории"
		>x</a>
   </router-link>
</template>

<script>
import { inject } from '@vue/runtime-core'

export default {
	props: {
		id: {
			type: String,
			required: true,
		
		},
		preview: {
			type: String,
			required: false,
			default: 'https://via.placeholder.com/250x140'
		},
		title: {
			type: String,
			required: true,
		},
		categoryName: {
			type: String,
			required: true
		}
	},
	setup() {
		return { 
			removeLink: inject('removeLink'),
		}
	}
}
</script>
