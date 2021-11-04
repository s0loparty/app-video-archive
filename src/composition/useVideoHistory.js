import { useStore } from 'vuex'

export function useVideoHistory() {
	const store = useStore()

	const historyIds = store.getters['localStorage/getHistory']
	
	const removeVideo = id => {
		
	}
}
