import { useStore } from 'vuex'

import { computed } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

export function useMobileMenu() {
	const store = useStore()

	const isOpen = computed(() => store.getters.mobileMenu)

	const body = document.body
	watch(isOpen, v => v ? body.classList.add('overflow-y') : body.classList.remove('overflow-y'))

	return {
		toggleMenu: () => store.commit('toggleMobileMenu'), 
		isOpen: isOpen
	}
}
