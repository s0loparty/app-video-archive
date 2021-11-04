<template>
	<div @click="toggleMenu" :class="['mobile-nav', { 'is-open':isOpen }]">
		<span></span>
		<span></span>
		<span></span>
	</div>
</template>

<script>
import { useMobileMenu } from '@/composition/useMobileMenu'

export default {
	setup() {
		const mobileMenu = useMobileMenu()

		return {
			isOpen: mobileMenu.isOpen,
			toggleMenu: () => mobileMenu.toggleMenu()
		}
	}
}
</script>
