<template>
	<Skeletor v-for="item in count" :key="item" :class="classes" :as="el"></Skeletor>
</template>

<script>
import { Skeletor } from "vue-skeletor"

export default {
	props: {
		count: {
			type: Number,
			required: false,
			default: 1
		},
		classes: {
			type: Array,
			required: false,
			default: ['video__item']
		},
		el: {
			type: String,
			required: false,
			default: 'div'
		}
	},
	// setup() {
	// },
	components: { Skeletor }
}
</script>
